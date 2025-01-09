<script setup lang="ts">
import { ref, } from 'vue';

const isCodeShow = ref(false);
</script>

<template>
    <div class="demo">
        <div class="p20">
            <slot name="demo" />
        </div>
        <div class="demo-operators common-text">
            <el-icon title="查看源代码" @click="isCodeShow = !isCodeShow">
                <Document />
            </el-icon>
        </div>
        <div v-if="isCodeShow" class="demo-code">
            <slot name="code" />
            <div class="text-center" @click="isCodeShow = false">
                <a href="javascript:;" class="hide-code common-text">隐藏源代码</a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.demo {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    .demo-operators {
        display: flex;
        justify-content: flex-end;
        padding: 12px;
        border-top: 1px solid #dcdfe6;
        i {
            cursor: pointer;
            +i {
                margin-left: 16px;
            }
        }
    }
    .hide-code {
        cursor: pointer;
        text-decoration: none;
    }
}
</style>
