<template>
  <div class="nav-header">
    <el-image src="/favicon.ico" class="brand-logo" alt="online-edu" />
    <ul class="nav">
      <router-link class="link" to="/" active-class="active">
        <el-tooltip content="首页" placement="bottom" effect="dark">
          <li>
            <el-icon><HomeFilled /></el-icon>
          </li>
        </el-tooltip>
      </router-link>
      <router-link class="link" to="/courses" active-class="active">
        <el-tooltip content="课程" placement="bottom" effect="dark">
          <li>
            <el-icon><Reading /></el-icon>
          </li>
        </el-tooltip>
      </router-link>
      <router-link class="link" to="/stats" active-class="active">
        <el-tooltip content="统计" placement="bottom" effect="dark">
          <li>
            <el-icon><Histogram /></el-icon>
          </li>
        </el-tooltip>
      </router-link>
      <router-link class="link" to="/notice" active-class="active">
        <el-tooltip content="通知" placement="bottom" effect="dark">
          <li>
            <el-badge is-dot class="badge-item">
              <el-icon><Bell /></el-icon>
            </el-badge>
          </li>
        </el-tooltip>
      </router-link>
      <router-link class="link" to="/mine" active-class="active">
        <el-tooltip content="我的" placement="bottom" effect="dark">
          <li>
            <el-image 
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" 
              class="user-avatar-img" 
            />
          </li>
        </el-tooltip>
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { HomeFilled, Reading, Histogram, Bell } from '@element-plus/icons-vue';
</script>

<style scoped>
.nav-header {
  width: 100%;
  height: 50px;
  background-color: #000;
  border-bottom: solid 1px #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  box-sizing: border-box;
}

.brand-logo {
  width: 32px;
  height: 32px;
  user-select: none;
}

.nav {
  display: flex;
  align-items: center;
  padding-left: 0;
  margin: 0;
  list-style: none;
}

.nav .link {
  text-decoration: none;
  margin-left: 35px;
}

.nav .link li {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #AAA;
  cursor: pointer;
  transition: color 0.3s;
}

.nav .link li .el-icon {
  font-size: 24px;
}

.nav .link.active li {
  color: #0097FF;
}

.nav .link:hover li {
  color: #FFF;
}

.badge-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar-img {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #555;
}
</style>