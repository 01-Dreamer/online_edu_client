<template>
  <div class="profile-container">
    <div class="profile-wrapper">
      <el-card class="info-card" shadow="never">
        <div class="header">
          <el-avatar :size="80" :src="user.avatar" />
          <div class="basic-info">
            <h2 class="nickname">{{ user.nickname }}</h2>
            <p class="email">{{ user.email }}</p>
          </div>
        </div>
        <div class="bio-section">
          <p class="bio">{{ user.description || '暂无个人简介' }}</p>
        </div>
      </el-card>

      <el-card class="auth-card" shadow="never">
        <template #header>
          <div class="card-title">认证信息</div>
        </template>
        <div class="auth-item">
          <div class="label">YNU认证</div>
          <div class="value">
            <template v-if="user.number">
              <el-tag type="success" size="small">已认证</el-tag>
              <span class="auth-detail">{{ user.number }} - {{ user.realName }}</span>
            </template>
            <el-tag v-else type="info" size="small">未认证</el-tag>
          </div>
        </div>
        <div class="auth-item">
          <div class="label">教师认证</div>
          <div class="value">
            <el-tag type="success" size="small">已认证</el-tag>
          </div>
        </div>
        <div class="auth-item">
          <div class="label">管理员认证</div>
          <div class="value">
            <el-tag type="success" size="small">已认证</el-tag>
          </div>
        </div>
      </el-card>

      <el-card class="course-list-card" shadow="never">
        <template #header>
          <div class="card-title">已购课程</div>
        </template>
        <div v-for="item in purchasedCourses" :key="item.id" class="mini-course-item">
          <el-image :src="item.cover" class="mini-cover" fit="cover" />
          <div class="mini-info">
            <div class="mini-title-row">
              <span class="mini-title">{{ item.title }}</span>
              <el-tag :type="item.status === 1 ? 'success' : 'info'" size="small" effect="plain">
                {{ item.status === 1 ? '进行中' : '待上架' }}
              </el-tag>
            </div>
            <div class="mini-meta">
              <span class="stat-item green"><el-icon><CaretTop /></el-icon>{{ item.likeCount }}</span>
              <span class="stat-item red"><el-icon><CaretBottom /></el-icon>{{ item.dislikeCount }}</span>
              <span class="date"><el-icon><Clock /></el-icon>{{ item.createTime }}</span>
            </div>
          </div>
        </div>
        <el-empty v-if="purchasedCourses.length === 0" :image-size="60" description="暂无已购课程" />
      </el-card>

      <el-card class="course-list-card" shadow="never">
        <template #header>
          <div class="card-title">教授课程</div>
        </template>
        <div v-for="item in taughtCourses" :key="item.id" class="mini-course-item">
          <el-image :src="item.cover" class="mini-cover" fit="cover" />
          <div class="mini-info">
            <div class="mini-title-row">
              <span class="mini-title">{{ item.title }}</span>
              <el-tag :type="item.status === 1 ? 'success' : 'info'" size="small" effect="plain">
                {{ item.status === 1 ? '进行中' : '待上架' }}
              </el-tag>
            </div>
            <div class="mini-meta">
              <span class="stat-item green"><el-icon><CaretTop /></el-icon>{{ item.likeCount }}</span>
              <span class="stat-item red"><el-icon><CaretBottom /></el-icon>{{ item.dislikeCount }}</span>
              <span class="date"><el-icon><Clock /></el-icon>{{ item.createTime }}</span>
            </div>
          </div>
        </div>
        <el-empty v-if="taughtCourses.length === 0" :image-size="60" description="暂无教授课程" />
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { CaretTop, CaretBottom, Clock } from '@element-plus/icons-vue';

const user = reactive({
  id: 1,
  email: 'example@ynu.edu.cn',
  number: 20230001,
  realName: '张三',
  nickname: '云大学子',
  description: '热爱学习，追求卓越。',
  avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  createTime: '2023-09-01',
  status: 1
});

const purchasedCourses = ref([
  {
    id: 101,
    title: 'Vue 3 + TypeScript 核心实战训练营',
    cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&q=80',
    likeCount: 125,
    dislikeCount: 2,
    createTime: '2023-11-15',
    status: 1
  },
  {
    id: 102,
    title: '深入理解计算机网络原理',
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&q=80',
    likeCount: 88,
    dislikeCount: 0,
    createTime: '2023-12-01',
    status: 1
  }
]);

const taughtCourses = ref([
  {
    id: 201,
    title: 'Spring Boot 微服务架构从入门到精通',
    cover: 'https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?w=200&q=80',
    likeCount: 1540,
    dislikeCount: 5,
    createTime: '2023-08-20',
    status: 1
  },
  {
    id: 202,
    title: '人工智能导论（新课筹备中）',
    cover: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&q=80',
    likeCount: 0,
    dislikeCount: 0,
    createTime: '2023-12-25',
    status: 0
  }
]);
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.profile-wrapper {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
}

.nickname {
  margin: 0;
  font-size: 24px;
  color: #303133;
}

.email {
  margin: 5px 0 0;
  color: #909399;
}

.bio {
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.auth-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
}

.auth-item:last-child {
  margin-bottom: 0;
}

.label {
  width: 120px;
  color: #606266;
}

.value {
  display: flex;
  align-items: center;
  gap: 12px;
}

.auth-detail {
  color: #303133;
  font-weight: 500;
}

.mini-course-item {
  display: flex;
  gap: 15px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.mini-course-item:last-child {
  border-bottom: none;
}

.mini-cover {
  width: 100px;
  height: 56px;
  border-radius: 4px;
  flex-shrink: 0;
}

.mini-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mini-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.mini-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.mini-meta {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 12px;
  color: #909399;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 3px;
}

.green { color: #67c23a; }
.red { color: #f56c6c; }

.date {
  display: flex;
  align-items: center;
  gap: 4px;
}

:deep(.el-card__header) {
  padding: 15px 20px;
  background-color: #fafafa;
}

:deep(.el-card__body) {
  padding: 15px 20px;
}
</style>