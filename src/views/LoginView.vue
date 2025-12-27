<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">用户登录</h2>
      <el-form :model="login_form" label-position="top">
        <el-form-item label="邮箱">
          <el-input 
            v-model="login_form.email" 
            placeholder="请输入邮箱"
            prefix-icon="Message"
          />
        </el-form-item>

        <el-form-item label="密码">
          <el-input 
            v-model="login_form.password" 
            type="password" 
            placeholder="请输入密码" 
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item label="验证码">
          <div class="captcha-row">
            <el-input 
              v-model="login_form.captcha" 
              placeholder="验证码" 
              class="captcha-input"
            />
            <el-image 
              src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/240c067e41db45719945a6039578f141~tplv-k3u1fbpfcp-zoom-1.image" 
              class="captcha-img"
              fit="cover"
            />
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login">
            登录
          </el-button>
          <el-button class="goRegister-btn" @click="goRegister">
            去注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const login_form = reactive({
  email: '',
  password: '',
  captcha: ''
});

const login = () => {
  console.log('login:', login_form);
};

const goRegister = () => {
    router.push({ name: 'register' });
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
}

.login-box {
  width: 100%;
  max-width: 360px;
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
  font-weight: 600;
}

.captcha-row {
  display: flex;
  gap: 12px;
  width: 100%;
}

.captcha-input {
  flex: 1;
}

.captcha-img {
  width: 120px;
  height: 32px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}

.login-btn {
  width: 100%;
  height: 40px;
  font-size: 16px;
  background-color: #0097FF;
  border-color: #0097FF;
  margin-bottom: 12px;
}

.login-btn:hover {
  background-color: #33adff;
  border-color: #33adff;
}

.goRegister-btn {
  width: 100%;
  height: 40px;
  font-size: 14px;
  color: #666;
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  margin-left: 0 !important;
}

.goRegister-btn:hover {
  color: #0097FF;
  background-color: #fff;
  border-color: #0097FF;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  padding-bottom: 4px;
}
</style>