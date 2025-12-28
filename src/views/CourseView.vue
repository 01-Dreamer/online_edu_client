<template>
  <div class="course-list-page">
    <div class="search-bar">
      <el-input v-model="searchQuery" placeholder="搜索课程..." class="input-with-select">
        <template #append>
          <el-button :icon="Search" />
        </template>
      </el-input>
    </div>

    <div class="list-container">
      <el-card 
        v-for="course in courses" 
        :key="course.id" 
        class="course-horizontal-card" 
        shadow="hover"
        @click="handleCourseClick(course.id)"
      >
        <div class="card-body">
          <div class="course-cover-box">
            <el-image :src="course.cover" fit="cover" class="course-image">
              <template #error>
                <div class="image-slot">
                  <el-icon><Picture /></el-icon>
                </div>
              </template>
            </el-image>
          </div>
          
          <div class="course-info-box">
            <div class="info-top">
              <h2 class="course-title">{{ course.title }}</h2>
              <div class="course-price">￥{{ course.price }}</div>
            </div>
            
            <p class="course-description">{{ course.description }}</p>
            
            <div class="info-bottom">
              <div class="stats-group">
                <span class="stat-item">
                  <el-icon><User /></el-icon>
                  {{ course.studentCount }} 人学习
                </span>
                <span class="stat-item like">
                  <el-icon><CaretTop /></el-icon>
                  {{ course.likeCount }}
                </span>
                <span class="stat-item dislike">
                  <el-icon><CaretBottom /></el-icon>
                  {{ course.dislikeCount }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <div class="pagination-box">
      <el-pagination background layout="prev, pager, next" :total="courses.length" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search, Picture, User, CaretTop, CaretBottom } from '@element-plus/icons-vue'

const searchQuery = ref('')

const courses = ref([
  {
    id: 1,
    title: 'Vue 3 高级组件开发实战',
    description: '深入浅出 Vue 3 核心原理，掌握 Composition API、渲染函数及插件开发，构建企业级组件库。',
    cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80',
    price: 199.00,
    studentCount: 1540,
    likeCount: 890,
    dislikeCount: 5
  },
  {
    id: 2,
    title: 'Java 微服务分布式架构',
    description: '基于 Spring Cloud Alibaba 体系，涵盖 Gateway、Nacos、Sentinel 及 Seata 分布式事务解决方案。',
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80',
    price: 299.00,
    studentCount: 2100,
    likeCount: 1240,
    dislikeCount: 12
  },
  {
    id: 3,
    title: 'Python 数据分析与机器学习',
    description: '使用 Pandas, Numpy 进行数据清洗，结合 Scikit-learn 构建经典机器学习模型，解决实际业务问题。',
    cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80',
    price: 159.00,
    studentCount: 3200,
    likeCount: 2300,
    dislikeCount: 45
  }
])

const handleCourseClick = (id: number) => {
  console.log(id)
}
</script>

<style scoped>
.course-list-page {
  width: 100%;
}

.search-bar {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.input-with-select {
  max-width: 600px;
}

.course-horizontal-card {
  margin-bottom: 16px;
  border: 1px solid #f0f0f0;
  cursor: pointer;
}

.card-body {
  display: flex;
  gap: 20px;
}

.course-cover-box {
  width: 240px;
  height: 135px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
}

.course-image {
  width: 100%;
  height: 100%;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 30px;
}

.course-info-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px 0;
}

.info-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.course-title {
  margin: 0;
  font-size: 18px;
  color: #1a1a1a;
  font-weight: 600;
}

.course-price {
  font-size: 20px;
  color: #f56c6c;
  font-weight: bold;
}

.course-description {
  margin: 8px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.info-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats-group {
  display: flex;
  gap: 20px;
  font-size: 13px;
  color: #909399;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.like {
  color: #67c23a;
}

.dislike {
  color: #f56c6c;
}

.pagination-box {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .card-body {
    flex-direction: column;
  }
  .course-cover-box {
    width: 100%;
    height: auto;
    aspect-ratio: 16/9;
  }
}
</style>