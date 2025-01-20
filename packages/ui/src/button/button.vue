<template>
  <div class="bul-button">
    <el-button type="primary" @click="clickHandler">bul-button1</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BulButton'
});
</script>

<script setup lang="ts">
import { downloadFileLocal } from '@ct-bullet/shared';

function clickHandler() {
  const data = [
    ['Name', '中文', 'City'],
    ['Alice', '25', 'New York']
  ];

  downloadFileLocal(data);
}
</script>

<style lang="scss" scoped>
@use './button.scss';
</style>
