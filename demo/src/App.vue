<template>
  <div :style="{ height: boxHeight + 'px', overflow: 'scroll' }" @scroll="onScroll">
    <div :style="{ height: listHeight + 'px' }">
      <div :style="{ transform: getTransform }">
        <div
          v-for="(item, index) in visibleData"
          :key="index"
          :style="{ height: itemHeight + 'px' }"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useVirtualList } from '@ct-bullet/hooks';

const boxHeight = 300;
const itemHeight = 30;

const data = new Array(100000).fill(0).map((item, index) => {
  return {
    id: index,
    name: `name${index}`
  };
});
const { listHeight, getTransform, visibleData, onScroll } = useVirtualList({
  data: data,
  height: boxHeight,
  itemHeight: itemHeight
});
</script>
