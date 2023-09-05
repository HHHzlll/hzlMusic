<template>
  <!-- 普通列表样式 -->
  <div class="container" v-if="!prop.type">
    <el-card v-for="item in prop.list" :key="item.id"
             @dblclick="addWaitingPlaylist(prop.list, item)">
      <el-image class="img" :src="item.al.picUrl + '?param=60y60'" lazy/>
      <svg-icon icon-class="playMusic"/>
      <div class="info">
        <el-text size="large">{{ item.name }}</el-text>
        <br>
        <!--        歌曲标签-->
        <el-tag type="danger" size="small" v-if="item.reason">
          {{ item.reason }}
        </el-tag>
        <el-tag type="danger" size="small" v-if="item.fee">
          {{ item.fee === 0 ? '免费' : '' }}
          {{ item.fee === 1 ? 'VIP' : '' }}
          {{ item.fee === 4 ? '专辑' : '' }}
          {{ item.fee === 8 ? '试听' : '' }}
        </el-tag>
        <!--        作者名-->
        <el-text size="small" type="info" v-for="(i, index) in item.ar" :key="i.id" truncated>
          {{ index + 1 === item.ar.length ? i.name : i.name + ' / ' }}
        </el-text>
      </div>
    </el-card>
  </div>

  <!-- 轮播图样式 -->
  <el-carousel :autoplay="false" :loop="false" arrow="always" trigger="click" indicator-position="none"
               v-if="prop.type === 'carousel'">
    <el-carousel-item v-for="(item, index) in list" :key="index">
      <el-card v-for="i in item" @dblclick="addWaitingPlaylist(prop.list, i)">
        <el-image class="img" :src="i.al.picUrl + '?param=60y60'" lazy/>
        <svg-icon icon-class="playMusic"/>
        <div class="info">
          <el-text size="large">{{ i.name }}</el-text>
          <br>
          <el-tag type="danger" size="small" v-if="i.reason">
            {{ i.reason }}
          </el-tag>
          <el-tag type="danger" size="small" v-if="i.fee">
            {{ i.fee === 0 ? '免费' : '' }}
            {{ i.fee === 1 ? 'VIP' : '' }}
            {{ i.fee === 4 ? '专辑' : '' }}
            {{ i.fee === 8 ? '试听' : '' }}
          </el-tag>
          <el-text size="small" type="info" v-for="(j, index) in i.ar" :key="j.id" truncated
                   style="vertical-align: middle">
            {{ index + 1 === i.ar.length ? j.name : j.name + '&nbsp;/&nbsp;' }}
          </el-text>
        </div>
      </el-card>
    </el-carousel-item>
  </el-carousel>

  <!--  table 样式-->
  <el-table :data="prop.list" v-if="prop.type === 'table'" @row-dblclick="addWaitingPlaylist(prop.list, $event)"
            empty-text="正在加载...">
    <el-table-column v-if="!prop.clearIndex" type="index" label="#" width="50px"/>
    <el-table-column label="标题" min-width="400px">
      <template #default="scope">
        <div class="musicTitle">
          <el-image lazy :src="scope.row.al.picUrl + '?param=50y50'"/>
          <div>
            <el-text size="large">{{ scope.row.name }}</el-text>
            <br>
            <el-tag type="danger" size="small" v-if="scope.row.fee">
              {{ scope.row.fee === 0 ? '免费' : '' }}
              {{ scope.row.fee === 1 ? 'VIP' : '' }}
              {{ scope.row.fee === 4 ? '专辑' : '' }}
              {{ scope.row.fee === 8 ? '试听' : '' }}
            </el-tag>
            <el-text size="small" type="info" v-for="(item, index) in scope.row.ar" :key="item.id">
              {{ index + 1 === scope.row.ar.length ? item.name : item.name + ' / ' }}
            </el-text>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="al.name" label="专辑" width="400px"/>
    <el-table-column label="时长" width="100px">
      <template #default="scope">
        <el-text type="info">{{ formatMilliseconds(scope.row.dt) }}</el-text>
      </template>
    </el-table-column>
  </el-table>

</template>

<script setup lang="ts">
import {addWaitingPlaylist} from "@/utils/playlist";
import {Ref} from "vue";
import {formatMilliseconds} from "@/utils/function.ts";
/*
list: 渲染列表
type：渲染样式， 默认 | 轮播 | 表格
clearIndex: 去除表格的序号
*/
const prop: any = defineProps(['list', 'type', 'clearIndex'])

const list: Ref<any> = ref([])
if (prop.type === 'carousel') {
  const carouselSize = 12;  // 轮播图的单页大小
  for (let i = 0; i < Math.ceil(prop.list.length / carouselSize); i++) {
    list.value.push(prop.list.slice(i * carouselSize, (i + 1) * carouselSize));
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.el-carousel__item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.el-card {
  width: 25%;
  height: calc(60px + 2rem);
  /* margin: 0 1rem 1rem 0; */
  box-shadow: none;
  border: none;
  background: var(--bg-color);
  cursor: pointer;
  border-radius: 5px;
}

.el-card :deep(.el-card__body) {
  display: flex;
  padding: 1rem;
  position: relative;
}

.svg-icon {
  position: absolute;
  font-size: 40px;
  color: #FFF;
  left: calc(1rem + 10px);
  top: calc(1rem + 10px);
  opacity: 0;
  transition: opacity .3s;
}

.img {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  margin-right: 1rem;
}

.info {
  position: relative;
  width: calc(100% - 60px);
  height: 100%;
}

.el-card:hover {
  background: #F0F3F6;
}

.el-card:hover .svg-icon {
  opacity: 1;
}

.el-tag {
  margin-right: 5px;
}


.musicTitle {
  display: flex;
}

.musicTitle .el-image {
  border-radius: 8px;
  margin-right: .5rem;
}

.el-table__inner-wrapper {
  background-color: var(--bg-color);
}
</style>