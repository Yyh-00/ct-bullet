<script setup lang="ts">
import { hello } from '@ct-bullet-ui/shared';

const props = withDefaults(
  defineProps<{
    text?: string;
  }>(),
  {
    text: 'World1wwsssss'
  }
);

function clickHandler() {
  hello(props.text);
}
</script>

<template>
  <el-button type="primary" @click="clickHandler">el-button1</el-button>
</template>

<style lang="scss" scoped>
@use '../../theme-chalk/src/button/button';
</style>
