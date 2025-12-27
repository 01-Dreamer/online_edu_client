<template>
  <div class="app-container">
    <NavBar />
    <main class="main-body">
      <div class="content-wrapper">
        <el-card class="main-card" shadow="never">
          <router-view />
        </el-card>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #F0F2F5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

#app {
  width: 100%;
}
</style>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-body {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.content-wrapper {
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  box-sizing: border-box;
}

.main-card {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  min-height: calc(100vh - 124px);
}

:deep(.el-card__body) {
  padding: 20px;
}
</style>