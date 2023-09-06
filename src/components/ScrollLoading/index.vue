<script setup lang="ts">
import { ref, onMounted} from 'vue'

// 需要的参数，是否显示加载、数据数量
const prop = defineProps(['isShow', 'count'])
// 触发父组件的更新函数
const emit = defineEmits(['loading'])

// 监听用户是否滑动结束
const loading = ref(); // loading元素
onMounted(() => {
  const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          emit('loading')
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