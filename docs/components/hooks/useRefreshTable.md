# useRefreshTable

集成刷新首页表格逻辑

::: danger WARNING
Search 组件中必须暴露出以下search，setLoading方法，在 hooks 中会被使用，否则会报错
::: details 查看Search 组件相关源码

```js
import { ref } from 'vue';
import type { TypeSearchInfo } from '@/types/main';
import { cloneDeep } from 'lodash-es';

const emit = defineEmits(['search']);
const serchCondiation = ref<TypeSearchInfo>({});
const loading = ref(false);

const search = (): void => {
  const _serchCondiation = cloneDeep(serchCondiation.value);

  emit('search', _serchCondiation);
};

const setLoading = (val: boolean) => {
  loading.value = val;
};

defineExpose({
  search,
  setLoading
});
```

:::

::: details 查看源码

```js
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import type { Ref } from 'vue';

type TypeAnyObject = {
  [propName: string]: any;
};

type TypeDataMap = {
  data: string;
  code: string;
};

type TypePaginationMap = {
  pageSize: string;
  pageIndex: string;
};

type TypeFunction = (...args: any[]) => any;

// options
type TypeOptions = {
  Bus: any; // 当前事件总线实例
  ajax: any; // 请求 promise 必填
  pagination: TypeAnyObject | null; //分页数据 必填
  paginationMap: TypePaginationMap; //分页映射
  dataMap: TypeDataMap; //数据映射
  code: number; //code 成功值
  searchRef: Ref | null; //searchRef 使用 必须带 search setLoading方法
  initData: boolean; //初始化数据
  searchData: TypeAnyObject | null; //无搜索项使用
  beforeFormat: TypeFunction | null; //上传前参数格式化
  complete: TypeFunction | null; //请求完成事件
  success: TypeFunction | null; //请求成功事件
  bindEvent: string; //刷新事件名称
};

// 返回值
type TypeReturnValues = {
  loading: Ref<boolean>;
  tableData: Ref<object>; // 获取列表接口 data
  onSearch: (searchValue: any) => void; // 搜索 Search 组件 search 事件
  onPageSizeChange: (size: number) => void; // 表格 Table 组件 page-change 事件
  onPageChange: (index: number) => void;
  searchDataHistory: any; // 搜索条件，用于导出参数
};

/**
 * @function useRefreshTable {首页 index.vue 中应用于搜索的逻辑整理}
 * @param  {TypeOptions}
 * @return {TypeReturnValues}
 *
 * 耦合点：1.刷新表格事件默认为 ut-refresh
 */
export default function useRefreshTable(params: any): TypeReturnValues {
  const config: TypeOptions = {
    Bus: {},
    ajax: null,
    searchRef: null,
    pagination: null,
    paginationMap: { pageSize: 'PageSize', pageIndex: 'PageIndex' },
    dataMap: {
      data: 'Data',
      code: 'Code'
    },
    code: 0,
    searchData: null,
    initData: true,
    beforeFormat: null,
    complete: null,
    success: null,
    bindEvent: 'ut-refresh'
  };
  const options = Object.assign(config, params);
  const loading = ref(false);
  const tableData = ref<any>([]);
  const searchDataHistory = ref<any>({}); // 历史搜索条件
  const paginationDefault = options.pagination || {
    [options.paginationMap.pageIndex]: 1,
    [options.paginationMap.pageSize]: 10
  };
  const pagination: any = { ...paginationDefault };
  const onSearch = (searchValue: any) => {
    searchDataHistory.value = JSON.parse(JSON.stringify(searchValue));
    pagination[options.paginationMap.pageIndex] = 1;
    refreshTable(searchValue);
  };
  const setTableLoading = (type: boolean) => {
    loading.value = type;
  };
  const setSearchLoading = (type: boolean) => {
    if (!options.searchRef) {
      return;
    }
    options.searchRef.value?.setLoading(type);
  };
  //刷新表格数据
  const refreshTable = (data?: any) => {
    if (!options.ajax) {
      return;
    }
    setTableLoading(true);
    const dataMap = options.dataMap;
    const newData = data ? data : searchDataHistory.value;
    let prames =
      options.searchData && !options.searchRef
        ? options.searchData
        : {
            ...newData,
            ...pagination
          };

    if (options.beforeFormat) {
      prames = options.beforeFormat(prames);
    }
    options
      .ajax(prames)
      .then((res: any) => {
        if (res[dataMap.code] === options.code) {
          tableData.value = res[dataMap.data];
        }
        options.success && options.success(res);
      })
      .catch(() => {
        tableData.value = [];
      })
      .finally(() => {
        setTableLoading(false);
        setSearchLoading(false);
        options.complete && options.complete();
      });
  };

  const onPageSizeChange = (size: number) => {
    if (size > 0) {
      pagination[options.paginationMap.pageSize] = size;
    }

    refreshTable();
  };

  // 表格切换页面
  const onPageChange = (pageIndex: number) => {
    if (pageIndex > 0) {
      pagination[options.paginationMap.pageIndex] = pageIndex;
    }

    refreshTable();
  };
  // 初始化获取列表
  const initData = () => {
    if (options.initData) {
      onMounted(() => {
        if (!options.searchRef) {
          refreshTable(options.searchData);
          return;
        }
        nextTick(() => {
          options.searchRef.value?.search();
        });
      });
    }
  };

  // 添加/编辑 页触发表格刷新
  const bindBusEvent = () => {
    config.Bus.on(options.bindEvent, (index: number = 0) => {
      onPageChange(index);
    });
  };

  onBeforeUnmount(() => {
    config.Bus.off(options.bindEvent);
  });

  bindBusEvent();
  initData();
  return {
    searchDataHistory,
    loading,
    tableData,
    onSearch,
    onPageSizeChange,
    onPageChange
  };
}

```

:::

## 示例

### 有搜索项

```js
import { useRefreshTable } from 'ct-bullet';
import Bus from '@/assets/js/bus'; // 项目中封装好的统一的事件总线

const { onSearch, loading, tableData, onPageChange, onPageSizeChange } = useRefreshTable({
  Bus,
  ajax: apiGetList,
  searchRef
});
```

### 无搜索项

```js
import { useRefreshTable } from 'ct-bullet';
import Bus from '@/assets/js/bus'; // 项目中封装好的统一的事件总线

const { loading, tableData, onPageChange, onPageSizeChange } = useRefreshTable({
  Bus,
  ajax: apiGetList,
  searchData: { pageIndex: 1, pageSize: 10 }
});
```

### 刷新页面

```js
// 页码 pageIndex = 0 或者 不传，本页刷新
// 'ut-refresh' 是自定义的事件名称
Bus.emit('ut-refresh', pageIndex);
```

## 入参属性

### 类型声明

::: details 显示类型声明

```js
import type { Emitter } from 'mitt';
import type { Ref } from 'vue';

type Events = {
  [propName: string]: any;
};

type TypeBus = Emitter<Events>;

type TypeAnyObject = {
  [propName: string]: any;
};

type TypePaginationMap = {
  pageSize: string;
  pageIndex: string;
};

type TypeDataMap = {
  data: string;
  code: string;
};

type TypeFunction = (...args: any[]) => any;
```

:::

| 属性名        |               说明               |      必填      |       类型        |                       默认值                       |
| ------------- | :------------------------------: | :------------: | :---------------: | :------------------------------------------------: |
| Bus           | 当前项目中封装好的统一的事件总线 |       是       | Emitter< Events > |                         —                          |
| ajax          |         获取表格数据请求         |       是       |      promise      |                         —                          |
| searchRef     |        当前搜索组件的 ref        | 有搜索项时必填 |        Ref        |                         —                          |
| pagination    |             分页参数             |       否       |   TypeAnyObject   |            `{PageSize:10,PageIndex:1}`             |
| paginationMap |           分页参数属性           |       否       | TypePaginationMap | `{ pageSize: 'PageSize', pageIndex: 'PageIndex' }` |
| dataMap       |             返回参数             |       否       |    TypeDataMap    |          `{ data: 'Data', code: 'Code' }`          |
| code          |        接口返回状态成功值        |       否       |      number       |                         0                          |
| initData      |        初始化获取列表数据        |       否       |      boolean      |                        true                        |
| searchData    |      无搜索是提供的搜索参数      |  无搜索项必填  |   TypeAnyObject   |                        true                        |
| bindEvent     |          自定义刷新事件          |       否       |      string       |                     ut-refresh                     |
| beforeFormat  |       请求前参数格式化回调       |       否       |   TypeFunction    |                         —                          |
| complete      |         请求完成事件回调         |       否       |   TypeFunction    |                         —                          |
| success       |         请求成功事件回调         |       否       |   TypeFunction    |                         —                          |

## 返参属性

### 类型声明

::: details 显示类型声明

```js
type TypeAnyObject = {
  [propName: string]: any;
};

type TypeReturnValues = {
    loading: Ref<boolean>;
    tableData: Ref<object>;
    onSearch: (searchValue: any) => void;
    onPageSizeChange: (size: number) => void;
    onPageChange: (index: number) => void;
    searchDataHistory: any;
};
```

:::

| 属性名            |              说明               |              类型              | 默认值 |
| ----------------- | :-----------------------------: | :----------------------------: | :----: |
| loading           |           表格loading           |         Ref< boolean >         | false  |
| tableData         |            表格data             |         TypeAnyObject          |  `{}`  |
| searchDataHistory |     搜索条件，用于导出参数      |         TypeAnyObject          |  `{}`  |
| onSearch          |  搜索 Search 组件 search 事件   | ` (searchValue: any) => void;` |        |
| onPageSizeChange  | Table 组件 pagesize-change 事件 |   ` (size: number) => void;`   |        |
| onPageChange      |   Table 组件 page-change 事件   |  ` (index: number) => void;`   |        |
