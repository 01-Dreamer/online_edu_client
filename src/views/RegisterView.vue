<template>
  <div class="register-container">
    <div class="register-box">
      <h2 class="register-title">用户注册</h2>
      <el-form :model="register_form" label-position="top">
        <el-form-item label="邮箱">
          <el-input 
            v-model="register_form.email" 
            placeholder="请输入邮箱"
            prefix-icon="Message"
          />
        </el-form-item>

        <el-form-item label="密码">
          <el-input 
            v-model="register_form.password" 
            type="password" 
            placeholder="请输入密码" 
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item label="确认密码">
          <el-input 
            v-model="register_form.confirm_password" 
            type="password" 
            placeholder="请再次输入密码" 
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item label="验证码">
          <div class="captcha-row">
            <el-input 
              v-model="register_form.captcha" 
              placeholder="邮箱验证码" 
              class="captcha-input"
            />
            <el-button type="primary" plain class="captcha-btn" @click="getEmailCode">
              获取邮箱验证码
            </el-button>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="register-btn" @click="register">
            注册
          </el-button>
          <el-button class="login-link-btn" @click="goLogin">
            去登录
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
const register_form = reactive({
  email: '',
  password: '',
  confirm_password: '',
  captcha: ''
});

const getEmailCode = () => {
  console.log('get code for:', register_form.email);
};

const register = () => {
  console.log('register:', register_form);
};

const goLogin = () => {
  router.push({ name: 'login' });
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.register-box {
  width: 100%;
  max-width: 360px;
}

.register-title {
  text-align: center;
  margin-bottom: 25px;
  font-size: 24px;
  color: #333;
  font-weight: 600;
}

.captcha-row {
  display: flex;
  gap: 10px;
  width: 100%;
}

.captcha-input {
  flex: 1;
}

.captcha-btn {
  width: 130px;
  padding: 0 10px;
  font-size: 13px;
}

.register-btn {
  width: 100%;
  height: 40px;
  font-size: 16px;
  background-color: #0097FF;
  border-color: #0097FF;
  margin-bottom: 12px;
}

.register-btn:hover {
  background-color: #33adff;
  border-color: #33adff;
}

.login-link-btn {
  width: 100%;
  height: 40px;
  font-size: 14px;
  color: #666;
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  margin-left: 0 !important;
}

.login-link-btn:hover {
  color: #0097FF;
  background-color: #fff;
  border-color: #0097FF;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  padding-bottom: 4px;
}
</style>