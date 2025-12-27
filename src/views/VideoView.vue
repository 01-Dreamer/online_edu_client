<template>
  <div class="video-detail-container">
    <div class="video-header">
      <h1 class="video-title">测试视频：弹幕效果演示 (兼容渲染模式)</h1>
      <div class="video-meta">
        <el-tag size="small" effect="dark" type="info">MP4</el-tag>
        <span class="meta-item">播放量：1,024</span>
        <span class="meta-item">状态：<el-text type="success">兼容引擎已就绪</el-text></span>
      </div>
    </div>

    <div class="player-section" ref="video_wrapper">
      <!-- 播放器容器 -->
      <div ref="player_container" class="dplayer-instance"></div>
      
      <!-- 自定义弹幕舞台 (覆盖在播放器上) -->
      <div class="custom-danmaku-stage" ref="danmaku_stage"></div>
      
      <div v-if="has_error" class="error-overlay">
        <el-icon :size="48"><VideoPlay /></el-icon>
        <p>视频加载失败</p>
        <el-button type="primary" size="small" @click="retry">重试</el-button>
      </div>
    </div>

    <div class="video-description">
      <el-tabs v-model="active_name">
        <el-tab-pane label="简介" name="info">
          <div class="description-text">
            <p><el-badge is-dot type="success">修复说明：</el-badge></p>
            <p>1. <strong>自研渲染引擎</strong>：绕过了 DPlayer 必须依赖 API 才能启动弹幕的 Bug。</p>
            <p>2. <strong>性能优化</strong>：使用 CSS3 硬件加速，支持满屏弹幕不掉帧。</p>
            
            <div style="margin-top: 15px; display: flex; gap: 10px;">
              <el-button type="primary" @click="shootDanmaku('这是一条手动测试弹幕！🚀')">
                发射测试弹幕
              </el-button>
              <el-button type="warning" @click="burstMode">
                压力测试 (瞬间满屏)
              </el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { VideoPlay } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
// @ts-ignore
import DPlayer from 'dplayer';

const player_container = ref<HTMLElement | null>(null);
const danmaku_stage = ref<HTMLElement | null>(null);
const active_name = ref('info');
const has_error = ref(false);

let dp: any = null;
let mock_timer: any = null;

const danmaku_pool = [
  "前方高能！", "666666", "学会了，很有用", "太强了！", 
  "打卡学习", "这个弹幕效果真赞", "Vue3 赛高", "yyds",
  "终于看到弹幕动了", "代码写得真优雅", "成都校区发来贺电"
];

const colors = ['#ffffff', '#ff4d4f', '#52c41a', '#1890ff', '#fadb14', '#eb2f96', '#13c2c2'];

/**
 * 核心逻辑：手动向 DOM 注入弹幕并执行 CSS 动画
 */
const shootDanmaku = (text?: string, isUser = false) => {
  if (!danmaku_stage.value || (dp && dp.video.paused && !isUser)) return;

  const content = text || danmaku_pool[Math.floor(Math.random() * danmaku_pool.length)];
  const color = isUser ? '#52c41a' : colors[Math.floor(Math.random() * colors.length)];

  // 创建弹幕节点
  const el = document.createElement('div');
  el.className = 'manual-danmaku-item';
  el.innerText = content;
  el.style.color = color;
  
  // 随机高度 (10% - 80%)
  const top = Math.floor(Math.random() * 70) + 10;
  el.style.top = `${top}%`;

  danmaku_stage.value.appendChild(el);

  // 动画结束后销毁
  el.addEventListener('animationend', () => {
    el.remove();
  });
};

const burstMode = () => {
  for (let i = 0; i < 15; i++) {
    setTimeout(() => shootDanmaku(), i * 100);
  }
};

const initPlayer = () => {
  if (!player_container.value) return;
  
  has_error.value = false;

  dp = new DPlayer({
    container: player_container.value,
    autoplay: false,
    video: {
      url: 'https://zxydata.oss-cn-chengdu.aliyuncs.com/online-edu/test.mp4',
      type: 'auto',
      crossOrigin: 'anonymous'
    }
    // 不在这里配置 danmaku 字段，完全由我们手动控制
  });

  dp.on('play', () => {
    if (mock_timer) clearInterval(mock_timer);
    mock_timer = setInterval(() => shootDanmaku(), 1500);
  });

  dp.on('pause', () => {
    if (mock_timer) clearInterval(mock_timer);
  });
};

const retry = () => {
  if (dp) dp.destroy();
  initPlayer();
};

onMounted(() => {
  nextTick(() => initPlayer());
});

onBeforeUnmount(() => {
  if (mock_timer) clearInterval(mock_timer);
  if (dp) dp.destroy();
});
</script>

<style scoped>
.video-detail-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

.video-header { margin-bottom: 20px; }
.video-title { font-size: 22px; color: #1a1a1a; margin-bottom: 10px; font-weight: 600; }
.video-meta { display: flex; align-items: center; gap: 16px; font-size: 13px; color: #909399; }

.player-section {
  width: 100%;
  background-color: #000;
  border-radius: 8px;
  overflow: hidden;
  position: relative; /* 必须为 relative 以便弹幕绝对定位 */
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.dplayer-instance {
  width: 100%;
  aspect-ratio: 16 / 9;
}

/* --- 自定义弹幕舞台 --- */
.custom-danmaku-stage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 60px); /* 避开控制栏 */
  pointer-events: none; /* 确保不影响点击播放器 */
  z-index: 5;
  overflow: hidden;
}

/* 弹幕单条样式 */
:deep(.manual-danmaku-item) {
  position: absolute;
  left: 100%;
  white-space: nowrap;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 1px 1px 2px #000, 0 0 1px #000;
  will-change: transform;
  animation: danmaku-move 8s linear forwards;
  user-select: none;
}

@keyframes danmaku-move {
  from { transform: translateX(0); }
  to { transform: translateX(-2500px); } /* 确保穿过整个屏幕 */
}

.error-overlay {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.8); display: flex; flex-direction: column;
  justify-content: center; align-items: center; color: #fff; z-index: 10;
}

.video-description { margin-top: 24px; }
.description-text { padding: 10px 0; color: #606266; line-height: 1.8; font-size: 14px; }
</style>