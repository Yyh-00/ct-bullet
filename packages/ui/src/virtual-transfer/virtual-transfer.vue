<template>
  <div class="container">
    <div class="box mr40">
      <div class="title-box">
        <div class="check-all">
          <el-checkbox
            v-if="_selectFilterPrev.length"
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            class="ml10 mr5"
            @change="onCheckAllChange"
          ></el-checkbox>
          <span>{{ props.title[0] }}</span>
        </div>
        <div class="num-box">
          <span>{{ selectedData.length }}</span>
          /
          <span>{{ props.data.length }}</span>
          项
        </div>
      </div>
      <div v-if="filterable" class="search-box">
        <div class="search-item" style="width: 100%">
          <el-input
            v-model.trim="_searchValPrev"
            :placeholder="props.filterPlaceholder"
            clearable
            @input="initPrev"
            @clear="initPrev"
          >
            <template #append>
              <el-icon :size="16" color="#b2b2b2"><Search /></el-icon>
            </template>
          </el-input>
        </div>
      </div>
      <el-scrollbar
        class="data-box prev-wrap"
        :style="{ height: props.height + 'px' }"
        @scroll="onScrollPrev"
      >
        <div :style="{ height: _listHeightPrev + 'px' }">
          <div :style="{ transform: _getTransformPrev }">
            <div
              v-for="(item, index) in _visibleDataPrev"
              :key="index"
              class="data-item"
              :style="{ height: itemHeight + 'px' }"
            >
              <el-checkbox
                v-model="item._checked"
                class="mr5"
                :disabled="readonly"
                @change="onCheckChange(item)"
              />
              <el-tooltip
                :content="formatLabel(item)"
                effect="light"
                placement="bottom"
                trigger="click"
              >
                <span :class="[{ active: item._checked }, 'ellipsis']">
                  {{ formatLabel(item) }}
                </span>
              </el-tooltip>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="box">
      <div class="title-box">
        <div>{{ props.title[1] }}</div>
        <div class="num-box">
          <span>{{ selectedData.length }}</span>
          /
          <span>{{ selectedData.length }}</span>
          项
        </div>
      </div>
      <div v-if="filterable" class="search-box">
        <div class="search-item" style="width: 100%">
          <el-input
            v-model.trim="_searchValNext"
            :placeholder="props.filterPlaceholder"
            clearable
            @clear="initNext"
          >
            <template #append>
              <el-icon :size="16" color="#b2b2b2"><Search /></el-icon>
            </template>
          </el-input>
        </div>
      </div>
      <el-scrollbar
        class="data-box next-wrap mt12"
        :style="{ height: props.height + 'px' }"
        @scroll="onScrollNext"
      >
        <div :style="{ height: _listHeightNext + 'px' }">
          <div :style="{ transform: _getTransformNext }">
            <div
              v-for="(item, index) in _visibleDataNext"
              :key="index"
              :style="{ height: itemHeight + 'px' }"
            >
              <el-tag
                type="primary"
                disable-transitions
                :closable="!readonly"
                @close="onTagClose(item[props.option.value])"
              >
                {{ formatLabel(item) }}
              </el-tag>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BulVirtualTransfer'
});
</script>

<script lang="ts" setup>
import { ref, watch, computed, nextTick } from 'vue';
import { useVirtualList } from '@ct-bullet/hooks';

const props = withDefaults(
  defineProps<{
    modelValue: any; // 选中项绑定值
    data: any; // 数据源
    option?: { label: Array<string>; value: string }; // 自定义选项标签
    height?: number; // 虚拟框高度
    itemHeight?: number; // 列表项高度
    title?: Array<string>; // 自定义列表标题
    filterable?: boolean; // 是否可搜索
    filterPlaceholder?: string; // 	搜索框占位符
    readonly?: boolean; // 是否只读
  }>(),
  {
    option: () => {
      return { label: ['label'], value: 'value' };
    },
    itemHeight: 30,
    height: 300,
    title: () => ['待选列表', '已选列表'],
    filterable: false,
    filterPlaceholder: '请输入',
    readonly: false
  }
);
/**
 *
 * 公共数据
 *
 */
const emits = defineEmits(['update:modelValue']);
const _selectedData = ref<Array<any>>([]); // 选中数据,用于反显选中数据
const selectedData = ref<Array<any>>([]); // 选中数据,预传出数据
const checkAll = ref(false); // 全选状态
const isIndeterminate = ref(false); // 半选状态
const _dataMap: any = []; // 源数据映射
// 数据更新
const updateValue = () => {
  emits('update:modelValue', selectedData.value);
};
// 格式化标签
const formatLabel = (item: any) => {
  let _label = '';

  props.option.label.forEach((key) => {
    if (item[key]) {
      _label += item[key];
      return;
    }
    _label += key;
  });

  return _label;
};
// 初始化全选框状态
const resetCheckAllStatus = () => {
  checkAll.value = false;
  isIndeterminate.value = false;
};
// 全选框状态监听回调 val:待选过滤数据
const watchCheckAllStatusCB = (val: any = _selectFilterPrev.value) => {
  nextTick(() => {
    const { value: valueKey } = props.option;
    const _obj: any = {};
    const _checkedData: any = [];

    val.forEach((item: any) => {
      _obj[item[valueKey]] = item;
    });
    (props.modelValue || []).forEach((_item: any) => {
      if (_obj[_item]) {
        _checkedData.push(_obj[_item]);
      }
    });
    if (_checkedData.length === val.length) {
      checkAll.value = true;
    } else {
      checkAll.value = false;
    }

    isIndeterminate.value = _checkedData.length > 0 && _checkedData.length < val.length;
  });
};
// 全选事件
const onCheckAllChange = (value: boolean) => {
  const _arr = _selectFilterPrev.value.map((item: any) => {
    if (value) {
      item._checked = true;
    } else {
      item._checked = false;
    }

    return item[props.option.value];
  });

  if (value) {
    selectedData.value = [...new Set([...selectedData.value, ..._arr])];
  } else {
    selectedData.value = selectedData.value.filter((item: any) => !_arr.includes(item));
  }
  updateValue();
  watchCheckAllStatusCB();
};
// 监听 modelValue
watch(
  () => props.modelValue,
  (newVal) => {
    const { value: valueKey } = props.option;

    _selectedData.value = []; // 初始化清空选中数据
    resetCheckAllStatus();
    if (!newVal || !newVal.length || !props.data.length) {
      selectedData.value = [];
      return;
    }
    selectedData.value = newVal;
    nextTick(() => {
      const _obj: any = {};
      const _val = JSON.parse(JSON.stringify(newVal));
      let _p: any = _val.shift(); // 初始指针

      // 初始化获取
      if (!_dataMap.legnth) {
        props.data.forEach((item: any) => {
          _obj[item[valueKey]] = item;
        });
        _dataMap.push(_obj);
      }
      while (_p) {
        props.data.some((item: any) => {
          if (!_dataMap[0][_p]) {
            console.log(_p, '未找到');

            _p = _val.shift();
            return true;
          }
          // 待选列表反显
          if (_p && item[valueKey] === _p) {
            item._checked = true;
            _p = _val.shift();
          }
        });
      }
      // 已选列表反显
      newVal.map((_item: any) => {
        if (_dataMap[0][_item]) {
          _selectedData.value.push(_dataMap[0][_item]);
        }
      });
    });
  },
  { deep: true, immediate: true }
);
//监听 初始化新增 _checked 状态
watch(
  () => props.data,
  (newVal) => {
    if (!newVal || !newVal.length) return;
    newVal.forEach((item: any) => {
      item._checked = false;
    });
  }
);
/**
 *
 * 待选列表数据
 *
 */
const _searchValPrev = ref(''); // 搜索条件
// 筛选后数据
const _selectFilterPrev = computed(() => {
  return props.data.filter((item: any) => formatLabel(item).includes(_searchValPrev.value));
});
watch(
  () => _selectFilterPrev.value,
  (newVal) => {
    if (!newVal || !newVal.length) return;
    watchCheckAllStatusCB(newVal);
  }
);
const {
  listHeight: _listHeightPrev,
  getTransform: _getTransformPrev,
  visibleData: _visibleDataPrev,
  onScroll: onScrollPrev,
  init: _initPrev
} = useVirtualList({
  data: _selectFilterPrev,
  height: props.height,
  itemHeight: props.itemHeight
});
// 数据初始化
const initPrev = () => {
  resetCheckAllStatus();
  _initPrev();
  nextTick(() => {
    (document.querySelector('.prev-wrap .el-scrollbar__wrap') as Element).scrollTop = 0;
  });
};
// 未选中数据监听事件
const onCheckChange = (item: any) => {
  const { value: valueKey } = props.option;

  if (!item._checked) {
    const _index = selectedData.value.findIndex((_item) => _item === item[valueKey]);
    selectedData.value.splice(_index, 1);
  } else {
    selectedData.value.push(item[valueKey]);
  }
  updateValue();
  watchCheckAllStatusCB();
};
/**
 *
 * 已选列表数据
 *
 */
const _searchValNext = ref(''); // 已选中数据的搜索条件
// 筛选后数据
const _selectFilterNext = computed(() => {
  return _selectedData.value.filter((item: any) => {
    return formatLabel(item).includes(_searchValNext.value);
  });
});
const {
  listHeight: _listHeightNext,
  getTransform: _getTransformNext,
  visibleData: _visibleDataNext,
  onScroll: onScrollNext,
  init: _initPNext
} = useVirtualList({
  data: _selectFilterNext,
  height: props.height,
  itemHeight: props.itemHeight
});
// 数据初始化
const initNext = () => {
  _initPNext();
  nextTick(() => {
    (document.querySelector('.next-wrap .el-scrollbar__wrap') as Element).scrollTop = 0;
  });
};
// 选中数据删除
const onTagClose = (id: number) => {
  const { value: valueKey } = props.option;

  // 取消选中
  props.data.forEach((item: any) => {
    if (item[valueKey] === id) {
      item._checked = false;
    }
  });
  selectedData.value.splice(
    selectedData.value.findIndex((item: number) => {
      if (item == id) return true;
    }),
    1
  );
  updateValue();
  watchCheckAllStatusCB();
};

initPrev();
initNext();
</script>

<style scoped lang="scss">
@use './virtual-transfer.scss';
</style>
