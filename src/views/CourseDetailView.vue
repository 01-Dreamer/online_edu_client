<template>
  <div class="course-detail-container">
    <el-card shadow="never" class="admin-style-card">
      <template #header>
        <div class="page-header">
          <div class="header-left">
            <el-image :src="course.cover" class="header-cover" fit="cover" />
            <span class="page-title">{{ course.title }}</span>
          </div>
          <el-radio-group v-model="activeTab" size="large">
            <el-radio-button label="详情" value="details" />
            <el-radio-button label="章节" value="chapters" />
            <el-radio-button label="作业" value="homework" />
            <el-radio-button label="讨论" value="discussion" />
          </el-radio-group>
        </div>
      </template>

      <div class="view-content">
        <div v-if="activeTab === 'details'" class="details-view">
          <div class="summary-section">
            <div class="price-display">
              <span class="label">价格：</span>
              <span class="value price">￥{{ course.price }}</span>
            </div>
            
            <div class="stats-row">
              <div class="stat-item">
                <span class="label">教师ID：</span>
                <span class="value">{{ course.userId }}</span>
              </div>
              <div class="stat-item">
                <span class="label">学生：</span>
                <span class="value">{{ course.studentCount }}</span>
              </div>
              <div class="stat-item">
                <span class="label">讨论：</span>
                <span class="value">{{ course.postCount }}</span>
              </div>
              <div class="stat-item">
                <span class="label">评价：</span>
                <div class="value like-dislike-box">
                  <div class="action-item" @click="handleLike(course.id)">
                    <el-icon class="text-success"><CaretTop /></el-icon>
                    <span class="text-success">{{ course.likeCount }}</span>
                  </div>
                  <span class="divider">/</span>
                  <div class="action-item" @click="handleDislike(course.id)">
                    <el-icon class="text-danger"><CaretBottom /></el-icon>
                    <span class="text-danger">{{ course.dislikeCount }}</span>
                  </div>
                </div>
              </div>
              <div class="stat-item">
                <span class="label">状态：</span>
                <span class="value">{{ course.status === 1 ? '进行中' : '待上架' }}</span>
              </div>
            </div>
          </div>

          <el-divider />

          <div class="description-section">
            <div class="section-title">课程简介</div>
            <p class="desc-text">{{ course.description }}</p>
            <div class="meta-info">创建于：{{ course.createTime }}</div>
          </div>
        </div>

        <div v-if="activeTab === 'chapters'" class="table-wrapper">
          <el-table :data="chapters" border stripe style="width: 100%">
            <el-table-column type="expand">
              <template #default="props">
                <div class="expand-content">
                  <div class="sub-section">
                    <div class="sub-title">视频资源</div>
                    <el-table :data="props.row.videos" size="small" border>
                      <el-table-column label="序号" width="60" align="center">
                        <template #default="vScope">
                          {{ vScope.$index + 1 }}
                        </template>
                      </el-table-column>
                      <el-table-column prop="duration" label="时长" width="100" align="center">
                        <template #default="vScope">
                          {{ formatDuration(vScope.row.duration) }}
                        </template>
                      </el-table-column>
                      <el-table-column prop="view_count" label="播放量" width="100" align="center" />
                      <el-table-column label="操作" align="center">
                        <template #default="vScope">
                          <el-button type="primary" size="small" plain @click="handleWatch(vScope.row.id)">观看</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>

                  <div class="sub-section">
                    <div class="sub-title">课件附件</div>
                    <el-table :data="props.row.attachments" size="small" border>
                      <el-table-column label="序号" width="60" align="center">
                        <template #default="aScope">
                          {{ aScope.$index + 1 }}
                        </template>
                      </el-table-column>
                      <el-table-column prop="name" label="附件名称" align="center" />
                      <el-table-column label="操作" width="120" align="center">
                        <template #default="aScope">
                          <el-button type="success" size="small" plain @click="handleDownload(aScope.row.id)">下载</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="序号" width="80" align="center">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="title" label="章节标题" min-width="180" align="center" />
            <el-table-column prop="description" label="内容概要" min-width="250" align="center" show-overflow-tooltip />
          </el-table>
        </div>

        <div v-if="activeTab === 'homework'" class="table-wrapper">
          <el-table :data="tasks" border stripe style="width: 100%">
            <el-table-column type="expand">
              <template #default="props">
                <div class="expand-content">
                  <div class="sub-section">
                    <div class="sub-title">提交记录汇总</div>
                    <el-table :data="props.row.submissions" size="small" border>
                      <el-table-column prop="userId" label="学生ID" width="100" align="center" />
                      <el-table-column prop="content" label="提交内容" min-width="200" align="center" show-overflow-tooltip />
                      <el-table-column prop="score" label="评分" width="80" align="center">
                        <template #default="sScope">
                          <span v-if="sScope.row.score !== null">{{ sScope.row.score }}</span>
                          <span v-else style="color: #909399">-</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="状态" width="100" align="center">
                        <template #default="sScope">
                          <el-tag size="small" :type="sScope.row.status === 1 ? 'success' : 'warning'">
                            {{ sScope.row.status === 1 ? '已通过' : '待批改' }}
                          </el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column prop="createTime" label="提交日期" width="160" align="center" />
                    </el-table>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="序号" width="80" align="center">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="title" label="任务标题" min-width="150" align="center" />
            <el-table-column prop="content" label="任务要求" min-width="200" align="center" show-overflow-tooltip />
            <el-table-column prop="deadline" label="截止日期" width="180" align="center" />
            <el-table-column label="操作" width="120" align="center">
              <template #default="scope">
                <el-button type="primary" size="small" @click="handleTaskSubmit(scope.row.id)">提交作业</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div v-if="activeTab === 'discussion'" class="table-wrapper">
          <el-table :data="posts" border stripe style="width: 100%">
            <el-table-column type="expand">
              <template #default="props">
                <div class="expand-content">
                  <div class="sub-section">
                    <div class="sub-title">全部回复</div>
                    <el-table :data="props.row.replies" size="small" border>
                      <el-table-column prop="userId" label="用户ID" width="100" align="center" />
                      <el-table-column prop="content" label="回复内容" min-width="200" align="center" />
                      <el-table-column label="评价" width="150" align="center">
                        <template #default="rScope">
                          <div class="like-dislike-box">
                            <div class="action-item" @click="handleReplyLike(rScope.row.id)">
                              <el-icon class="text-success"><CaretTop /></el-icon>
                              <span class="text-success">{{ rScope.row.likeCount }}</span>
                            </div>
                            <span class="divider">/</span>
                            <div class="action-item" @click="handleReplyDislike(rScope.row.id)">
                              <el-icon class="text-danger"><CaretBottom /></el-icon>
                              <span class="text-danger">{{ rScope.row.dislikeCount }}</span>
                            </div>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="createTime" label="时间" width="160" align="center" />
                    </el-table>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="标题" min-width="200" align="center">
              <template #default="scope">
                <el-tag v-if="scope.row.top" size="small" type="danger" style="margin-right: 5px;">置顶</el-tag>
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="userId" label="发布人ID" width="100" align="center" />
            <el-table-column prop="replyCount" label="回复数" width="100" align="center" />
            <el-table-column label="评价" width="150" align="center">
              <template #default="scope">
                <div class="like-dislike-box">
                  <div class="action-item" @click="handlePostLike(scope.row.id)">
                    <el-icon class="text-success"><CaretTop /></el-icon>
                    <span class="text-success">{{ scope.row.likeCount }}</span>
                  </div>
                  <span class="divider">/</span>
                  <div class="action-item" @click="handlePostDislike(scope.row.id)">
                    <el-icon class="text-danger"><CaretBottom /></el-icon>
                    <span class="text-danger">{{ scope.row.dislikeCount }}</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="发布时间" width="170" align="center" />
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { CaretTop, CaretBottom } from '@element-plus/icons-vue';

const activeTab = ref('details');

const course = reactive({
  id: 1,
  userId: 101,
  title: 'Vue 3 + TypeScript 企业级架构实战',
  description: '本课程旨在帮助开发者掌握 Vue 3 生态系统的核心技术，涵盖 Composition API、Vue Router、Pinia 以及组件化开发实战。',
  cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
  price: 299.00,
  studentCount: 1250,
  postCount: 45,
  likeCount: 892,
  dislikeCount: 12,
  createTime: '2023-10-01 14:00:00',
  status: 1
});

const chapters = ref([
  { 
    id: 101, 
    title: '课程介绍与开发环境准备', 
    description: '讲解 Node.js 环境配置以及 Vite 项目的初始化流程。',
    videos: [
      { id: 201, duration: 365, view_count: 1200 },
      { id: 202, duration: 840, view_count: 850 }
    ],
    attachments: [
      { id: 301, name: '开发环境搭建文档.pdf' },
      { id: 302, name: '项目源代码.zip' }
    ]
  }
]);

const tasks = ref([
  {
    id: 401,
    title: 'Vue实战：Todo-List 开发',
    content: '使用 Composition API 实现一个具备增删查改功能的待办事项列表。',
    deadline: '2023-12-31 23:59:59',
    submissions: [
      { id: 501, userId: 201, content: '已经提交至GitHub仓库。', score: 85, status: 1, createTime: '2023-12-28 10:00:00' }
    ]
  }
]);

const posts = ref([
  {
    id: 601,
    courseId: 1,
    userId: 201,
    title: '关于 Composition API 的一点思考',
    content: '在大型项目中使用组合式 API 确实能够显著提高代码的可读性。',
    top: 1,
    replyCount: 2,
    likeCount: 15,
    dislikeCount: 0,
    createTime: '2023-12-28 10:00:00',
    replies: [
      { id: 701, postId: 601, userId: 205, content: '非常赞同，尤其是逻辑复用方面。', likeCount: 3, dislikeCount: 0, createTime: '2023-12-28 11:00:00' },
      { id: 702, postId: 601, userId: 206, content: '学习了！', likeCount: 1, dislikeCount: 0, createTime: '2023-12-28 11:30:00' }
    ]
  },
  {
    id: 602,
    courseId: 1,
    userId: 203,
    title: '环境搭建遇到 404',
    content: '请问各位同学，npm install 总是报错怎么解决？',
    top: 0,
    replyCount: 0,
    likeCount: 2,
    dislikeCount: 1,
    createTime: '2023-12-28 14:00:00',
    replies: []
  }
]);

const handleLike = (id: number) => {
  console.log('赞课程 ID:', id);
};

const handleDislike = (id: number) => {
  console.log('踩课程 ID:', id);
};

const handlePostLike = (id: number) => {
  console.log('赞帖子 ID:', id);
};

const handlePostDislike = (id: number) => {
  console.log('踩帖子 ID:', id);
};

const handleReplyLike = (id: number) => {
  console.log('赞回复 ID:', id);
};

const handleReplyDislike = (id: number) => {
  console.log('踩回复 ID:', id);
};

const formatDuration = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
};

const handleWatch = (id: number) => {
  console.log('Watch Video ID:', id);
};

const handleDownload = (id: number) => {
  console.log('Download Attachment ID:', id);
};

const handleTaskSubmit = (id: number) => {
  console.log('Submit Homework for Task ID:', id);
};
</script>

<style scoped>
.admin-style-card {
  min-height: 500px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-cover {
  width: 56px;
  height: 32px;
  border-radius: 4px;
}

.page-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.view-content {
  padding: 10px 0;
}

.summary-section {
  padding: 10px 0;
}

.price-display {
  margin-bottom: 20px;
}

.price-display .label {
  font-size: 14px;
  color: #666;
}

.price-display .price {
  font-size: 24px;
  font-weight: bold;
  color: #f56c6c;
}

.stats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.stat-item {
  font-size: 14px;
  display: flex;
  align-items: center;
}

.stat-item .label {
  color: #909399;
}

.stat-item .value {
  color: #303133;
  font-weight: 500;
}

.like-dislike-box {
  display: flex;
  align-items: center;
}

.action-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 4px;
}

.action-item:hover .el-icon {
  transform: scale(1.2);
}

.divider {
  margin: 0 8px;
  color: #ccc;
}

.text-success { color: #67c23a; font-size: 16px; }
.text-danger { color: #f56c6c; font-size: 16px; }

.description-section {
  margin-top: 10px;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.desc-text {
  font-size: 14px;
  line-height: 1.6;
  color: #606266;
  margin-bottom: 20px;
}

.meta-info {
  font-size: 12px;
  color: #a8abb2;
}

.table-wrapper {
  width: 100%;
}

.expand-content {
  padding: 10px 40px;
  background-color: #fcfcfc;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sub-section {
  width: 100%;
}

.sub-title {
  font-size: 13px;
  font-weight: bold;
  color: #409eff;
  margin-bottom: 10px;
  border-left: 3px solid #409eff;
  padding-left: 8px;
}
</style>