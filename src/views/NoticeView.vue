<template>
  <div class="notification-page">
    <div class="page-header">
      <el-icon><Bell /></el-icon>
      <span>系统通知</span>
    </div>

    <div class="notification-list">
      <div 
        v-for="item in notifications" 
        :key="item.id" 
        class="notification-card"
      >
        <div class="card-top">
          <span class="notification-title">{{ item.title }}</span>
          <span class="notification-time">{{ item.createTime }}</span>
        </div>
        <div class="notification-content">
          {{ item.content }}
        </div>
      </div>
      
      <el-empty v-if="notifications.length === 0" description="暂无通知" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Bell } from '@element-plus/icons-vue';

const notifications = ref([
  {
    id: 1,
    title: '课程更新提醒',
    content: '你关注的《Vue 3 核心实战》已更新至第 10 章节，请及时查看。',
    createTime: '2023-12-27 10:00:00'
  },
  {
    id: 2,
    title: '系统维护公告',
    content: '为了提供更好的服务，系统将于今晚 00:00 进行例行维护，预计耗时 2 小时。',
    createTime: '2023-12-26 18:30:00'
  },
  {
    id: 3,
    title: '欢迎加入在线课堂',
    content: '恭喜你注册成功！在这里你可以开启你的学习之旅。',
    createTime: '2023-12-25 09:00:00'
  }
]);
</script>

<style scoped>
.notification-page {
  width: 100%;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notification-card {
  padding: 16px;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  transition: all 0.2s;
}

.notification-card:hover {
  border-color: #409eff;
  background-color: #fafafa;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.notification-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.notification-time {
  font-size: 12px;
  color: #999;
}

.notification-content {
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
}
</style>