<template>
  <div class="not-found-container">
    <el-empty
      image-size="200"
      description="页面不存在"
    >
      <template #image>
        <div class="error-code">404</div>
      </template>
      <el-button type="primary" @click="goHome">
        返回首页
      </el-button>
    </el-empty>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.error-code {
  font-size: 80px;
  font-weight: 900;
  color: #f5f7fa;
  text-shadow: 2px 2px 0px #409eff, 4px 4px 0px #d9ecff;
  user-select: none;
  margin-bottom: 20px;
}

:deep(.el-empty__description) {
  margin-top: 20px;
}

:deep(.el-empty__description p) {
  font-size: 16px;
  color: #606266;
}
</style>