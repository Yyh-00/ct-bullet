// 搭配 elementPlus 的 el-scrollbar 使用，因为用到它封装过后的scroll事件
import { ref, computed } from 'vue';
import type { ComputedRef } from 'vue';

type typeParems = {
  data: any; // 数据源
  height: number;
  itemHeight: number;
};
type TypeReturnValues = {
  listHeight: ComputedRef<number>; // 列表实际高度
  getTransform: ComputedRef<string>; // 偏移量
  visibleData: any; // 实际显示数据
  onScroll: any; //滚动事件
  init: any; //滚动事件
};

export default function useVirtualList(params: typeParems): TypeReturnValues {
  const { data, height, itemHeight } = params;
  const startOffset = ref(0); // 偏移量
  const startIndex = ref(0); // 起始索引
  const endIndex = ref(0); // 结束索引
  // 列表总高度
  const listHeight = computed(() => data.value.length * itemHeight);
  //可显示的列表项数
  const visibleCount = computed(() => Math.ceil(height / itemHeight));
  // 偏移量对应的style
  const getTransform = computed(() => `translateY(${startOffset.value}px)`);
  //获取真实显示列表数据
  const visibleData = computed(() => {
    return data.value.slice(
      startIndex.value,
      Math.min(endIndex.value, data.value.length)
    );
  });
  // 滚动事件
  const onScroll = (val: { scrollLeft: number; scrollTop: number }) => {
    startIndex.value = Math.floor(val.scrollTop / itemHeight); //此时的开始索引
    endIndex.value = startIndex.value + visibleCount.value; //此时的结束索引
    startOffset.value = val.scrollTop - (val.scrollTop % itemHeight); //此时的偏移量
  };

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
    init,
  };
}
