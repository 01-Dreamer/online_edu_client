<template>
  <div class="admin-container">
    <el-card shadow="never" class="admin-card">
      <template #header>
        <div class="admin-header">
          <span class="title">管理员控制台</span>
          <el-radio-group v-model="activeView" size="large">
            <el-radio-button label="用户列表" value="users" />
            <el-radio-button label="课程列表" value="courses" />
            <el-radio-button label="认证列表" value="auth" />
            <el-radio-button label="审核列表" value="audit" />
          </el-radio-group>
        </div>
      </template>

      <div class="view-content">
        <div v-if="activeView === 'users'" class="table-wrapper">
          <el-table :data="users" border stripe style="width: 100%">
            <el-table-column label="ID" width="70" align="center">
              <template #default="scope">
                <span 
                  style="cursor: pointer; color: #409eff" 
                  @click="handleIdClick(scope.row.id)"
                >
                  {{ scope.row.id }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="头像" width="70" align="center">
              <template #default="scope">
                <el-avatar :size="32" :src="scope.row.avatar" />
              </template>
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" width="110" align="center" show-overflow-tooltip />
            <el-table-column prop="number" label="学号" width="110" align="center" />
            <el-table-column prop="realName" label="真实姓名" width="100" align="center" />
            <el-table-column prop="email" label="邮箱" min-width="160" align="center" show-overflow-tooltip />
            <el-table-column prop="createTime" label="注册时间" width="160" align="center" />
            <el-table-column label="状态" width="90" align="center">
              <template #default="scope">
                <el-tag 
                  :type="scope.row.status === 1 ? 'success' : 'danger'" 
                  style="cursor: pointer"
                  @click="handleIdClick(scope.row.id)"
                >
                  {{ scope.row.status === 1 ? '启用' : '禁用' }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
        
        <div v-if="activeView === 'courses'" class="table-wrapper">
          <el-table :data="courses" border stripe style="width: 100%">
            <el-table-column prop="id" label="ID" width="70" align="center">
              <template #default="scope">
                <span 
                  style="cursor: pointer; color: #409eff" 
                  @click="handleIdClick(scope.row.id)"
                >
                  {{ scope.row.id }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="userId" label="教师ID" width="90" align="center" />
            <el-table-column label="封面" width="110" align="center">
              <template #default="scope">
                <el-image 
                  :src="scope.row.cover" 
                  fit="cover" 
                  style="width: 80px; height: 45px; border-radius: 4px"
                />
              </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" min-width="160" align="center" show-overflow-tooltip />
            <el-table-column prop="description" label="描述" min-width="200" align="center" show-overflow-tooltip />
            <el-table-column prop="price" label="价格" width="90" align="center">
              <template #default="scope">
                <span style="color: #f56c6c; font-weight: bold">￥{{ scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="90" align="center">
              <template #default="scope">
                <el-tag 
                  :type="scope.row.status === 1 ? 'success' : 'info'" 
                  style="cursor: pointer"
                  @click="handleIdClick(scope.row.id)"
                >
                  {{ scope.row.status === 1 ? '进行中' : '待上架' }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div v-if="activeView === 'auth'" class="table-wrapper">
          <el-table :data="roleApplications" border stripe style="width: 100%">
            <el-table-column prop="id" label="ID" width="70" align="center" />
            <el-table-column prop="userId" label="申请者ID" width="90" align="center" />
            <el-table-column label="申请角色" width="100" align="center">
              <template #default="scope">
                <el-tag effect="plain">{{ formatRole(scope.row.roleId) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="applyReason" label="申请理由" min-width="140" align="center" show-overflow-tooltip />
            <el-table-column label="凭证" width="90" align="center">
              <template #default="scope">
                <el-image 
                  :src="scope.row.certUrl" 
                  :preview-src-list="[scope.row.certUrl]"
                  preview-teleported
                  fit="cover" 
                  style="width: 60px; height: 40px; border-radius: 4px"
                />
              </template>
            </el-table-column>
            <el-table-column prop="applyTime" label="申请时间" width="160" align="center" />
            <el-table-column prop="auditReason" label="审核理由" min-width="140" align="center" show-overflow-tooltip />
            <el-table-column label="操作/状态" width="150" align="center">
              <template #default="scope">
                <div v-if="scope.row.status === 0">
                  <el-button type="success" size="small" @click="handleAction(scope.row.id)">同意</el-button>
                  <el-button type="danger" size="small" @click="handleAction(scope.row.id)">拒绝</el-button>
                </div>
                <el-tag v-else-if="scope.row.status === 1" type="success">已通过</el-tag>
                <el-tag v-else-if="scope.row.status === 2" type="danger">已驳回</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div v-if="activeView === 'audit'" class="table-wrapper">
          <el-table :data="auditTexts" border stripe style="width: 100%">
            <el-table-column prop="id" label="ID" width="70" align="center">
              <template #default="scope">
                <span 
                  style="cursor: pointer; color: #409eff" 
                  @click="handleIdClick(scope.row.id)"
                >
                  {{ scope.row.id }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="courseId" label="课程ID" width="90" align="center" />
            <el-table-column prop="userId" label="发布者ID" width="90" align="center" />
            <el-table-column label="类型" width="80" align="center">
              <template #default="scope">
                {{ formatAuditType(scope.row.type) }}
              </template>
            </el-table-column>
            <el-table-column prop="content" label="内容" min-width="160" align="center" show-overflow-tooltip />
            <el-table-column prop="createTime" label="发布时间" width="160" align="center" />
            <el-table-column prop="auditReason" label="审核理由" min-width="140" align="center" show-overflow-tooltip />
            <el-table-column label="操作/状态" width="150" align="center">
              <template #default="scope">
                <div v-if="scope.row.status === 0">
                  <el-button type="success" size="small" @click="handleAction(scope.row.id)">通过</el-button>
                  <el-button type="danger" size="small" @click="handleAction(scope.row.id)">删除</el-button>
                </div>
                <el-tag v-else-if="scope.row.status === 1" type="success">已通过</el-tag>
                <el-tag v-else-if="scope.row.status === 2" type="danger">已删除</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeView = ref('users');

const users = ref([
  {
    id: 1,
    email: 'test01@ynu.edu.cn',
    number: 20230001,
    realName: '张三',
    nickname: '小张',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    createTime: '2023-12-27 10:00:00',
    status: 1
  },
  {
    id: 2,
    email: 'test02@ynu.edu.cn',
    number: 20230002,
    realName: '李四',
    nickname: '老李',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    createTime: '2023-12-28 14:20:00',
    status: 0
  }
]);

const courses = ref([
  {
    id: 1,
    userId: 101,
    title: 'Vue 3 高级组件开发实战',
    description: '深入浅出 Vue 3 核心原理，掌握 Composition API，构建企业级组件库。',
    cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80',
    price: 199.00,
    status: 1
  },
  {
    id: 2,
    userId: 102,
    title: 'Java 微服务分布式架构',
    description: '基于 Spring Cloud Alibaba 体系，涵盖 Gateway、Nacos 等解决方案。',
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80',
    price: 299.00,
    status: 0
  }
]);

const roleApplications = ref([
  {
    id: 1001,
    userId: 1,
    roleId: 2,
    applyReason: '本人拥有5年开发经验，申请教师资格发布前端课程。',
    certUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?w=200&q=80',
    applyTime: '2023-12-28 15:00:00',
    auditReason: '',
    status: 0
  },
  {
    id: 1002,
    userId: 2,
    roleId: 3,
    applyReason: '申请管理员权限，负责社区日常内容维护。',
    certUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&q=80',
    applyTime: '2023-12-28 16:30:00',
    auditReason: '符合社区共建标准，予以通过。',
    status: 1
  }
]);

const auditTexts = ref([
  {
    id: 5001,
    courseId: 1,
    userId: 1,
    type: 2,
    content: '这节课讲得太好啦！',
    createTime: '2023-12-28 17:00:00',
    auditReason: '',
    status: 0
  },
  {
    id: 5002,
    courseId: 1,
    userId: 2,
    type: 0,
    content: '关于 Vue3 生命周期的一点思考',
    createTime: '2023-12-28 12:30:00',
    auditReason: '内容客观专业，符合规范。',
    status: 1
  }
]);

const formatRole = (roleId: number) => {
  const roles: Record<number, string> = { 1: '学生', 2: '教师', 3: '管理员' };
  return roles[roleId] || '未知';
};

const formatAuditType = (type: number) => {
  const types: Record<number, string> = { 0: '帖子', 1: '回复', 2: '弹幕' };
  return types[type] || '未知';
};

const handleIdClick = (id: number) => {
  console.log(id);
};

const handleAction = (id: number) => {
  console.log(id);
};
</script>

<style scoped>
.admin-container {
  padding: 10px;
}

.admin-card {
  min-height: 600px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.view-content {
  padding: 20px 0;
}

.table-wrapper {
  width: 100%;
}
</style>