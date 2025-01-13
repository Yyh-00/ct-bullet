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
import { hello } from '@ct-bullet/shared';

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

<style lang="scss" scoped>
@use './button.scss';
</style>
