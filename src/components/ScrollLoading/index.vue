<script setup lang="ts">
import {ref, onMounted} from 'vue'

// 需要的参数，是否显示加载、数据数量
const prop = defineProps(['isShow', 'count'])
// 触发父组件的更新函数
const emit = defineEmits(['loading'])

// 监听用户是否滑动结束
const loading = ref(); // loading元素
onMounted(() => {
  const observer = new IntersectionObserver(
      entries => {
        // 如果进入视图
        if (entries[0].isIntersecting) {
          emit('loading'); // 触发父组件的加载函数
          observer.disconnect();  // 取消监听，1秒后再次监听是否在视图内
          setTimeout(() => {
            try {
              observer.observe(loading.value)
            } catch (err) {
            //   隐藏控制台找不到DOM报错
            }
          }, 2000)
        }
      }
  )
  observer.observe(loading.value)
})
</script>

<template>
  <!--    加载的动画 -->
  <div ref="loading" v-show="prop.isShow">
    <el-icon class="is-loading">
      <Loading/>
    </el-icon>
  </div>
  <!--    加载完成 -->
  <el-divider v-show="!prop.isShow">
    <el-text size="small" type="info">加载结束，共{{ prop.count }}条结果</el-text>
  </el-divider>
</template>

<style scoped>

</style>