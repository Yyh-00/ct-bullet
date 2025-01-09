<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BulButton'
});
</script>

<script setup lang="ts">
import { hello } from '@ct-bullet-ui/shared';

const props = withDefaults(
  defineProps<{
    text?: string;
  }>(),
  {
    text: 'hello world'
  }
);

function clickHandler() {
  hello(props.text);
}
</script>

<template>
  <div class="bul-button">
    <el-button type="primary" @click="clickHandler">el-button1</el-button>
  </div>
</template>

<style lang="scss" scoped>
@use '../../theme-chalk/src/button/button';
</style>
