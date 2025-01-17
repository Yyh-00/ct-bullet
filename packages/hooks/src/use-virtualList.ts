import { ref, computed } from 'vue';
import type { ComputedRef } from 'vue';

type typeParems = {
  data: any;
  height: number;
  itemHeight: number;
};
type TypeReturnValues = {
  listHeight: ComputedRef<number>;
  getTransform: ComputedRef<string>;
  visibleData: any;
  onScroll: any;
  init: any;
};

export default function useVirtualList(params: typeParems): TypeReturnValues {
  const { data, height, itemHeight } = params;
  const startOffset = ref(0); // 偏移量
  const startIndex = ref(0); // 起始索引
  const endIndex = ref(0); // 结束索引
  const listHeight = computed(() => data.length * itemHeight); // 列表总高度
  const visibleCount = computed(() => Math.ceil(height / itemHeight)); //可显示的列表项数
  const getTransform = computed(() => `translateY(${startOffset.value}px)`); // 偏移量对应的style
  const visibleData = computed(() => {
    return data.slice(startIndex.value, Math.min(endIndex.value, data.length));
  }); //获取真实显示列表数据

  // 滚动事件
  const onScroll = (val: any) => {
    const scrollTop = val?.scrollTop || val.target.scrollTop;

    startIndex.value = Math.floor(scrollTop / itemHeight); //此时的开始索引
    endIndex.value = startIndex.value + visibleCount.value; //此时的结束索引
    startOffset.value = scrollTop - (scrollTop % itemHeight); //此时的偏移量
  };

  // 初始化事件
  const init = () => {
    startIndex.value = 0;
    endIndex.value = startIndex.value + visibleCount.value;
  };

  init();
  return {
    listHeight,
    getTransform,
    visibleData,
    onScroll,
    init
  };
}
