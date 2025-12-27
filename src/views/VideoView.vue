<template>
  <div class="video-detail-container">
    <div class="video-header">
      <h1 class="video-title">测试视频：阿里云 OSS 分段加载示例</h1>
      <div class="video-meta">
        <el-tag size="small" effect="dark" type="info">MP4</el-tag>
        <span class="meta-item">播放量：1,024</span>
        <span class="meta-item">发布于：2023-12-27</span>
      </div>
    </div>

    <div class="player-section">
      <div ref="player_container" class="dplayer-instance"></div>
      
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
            <p><strong>弹幕调试模式已开启：</strong></p>
            <p>1. <strong>请打开控制台 (F12)</strong>：查看以 <code>[DPlayer Debug]</code> 开头的日志。</p>
            <p>2. <strong>点击播放</strong>：观察控制台是否在循环打印“尝试绘制弹幕”。</p>
            <el-button type="primary" size="small" @click="manualTest" style="margin-top: 10px;">
              点击此手动发送并查看控制台反馈
            </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="评论 (0)" name="comments">
          <el-empty description="暂无评论" />
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
const active_name = ref('info');
const has_error = ref(false);
let dp: any = null;
let mock_timer: any = null;

const mock_danmaku_pool = [
  "前方高能！",
  "66666666",
  "老师讲得真好，受教了",
  "打卡学习，坚持就是胜利",
  "Vue 3 + DPlayer 组合非常流畅",
  "代码写得真优雅",
  "阿里云 OSS 确实很稳",
  "终于加载出来了！"
];

const drawDanmaku = (text?: string, color = '#ffffff') => {
  if (dp && dp.danmaku) {
    const content = text || mock_danmaku_pool[Math.floor(Math.random() * mock_danmaku_pool.length)];
    
    // 调试日志
    console.log('[DPlayer Debug] 准备绘制弹幕:', {
      content,
      isPaused: dp.video.paused,
      danmakuShowing: dp.danmaku.showing
    });

    try {
      dp.danmaku.draw({
        text: content,
        color: color,
        type: 'right'
      });
    } catch (e) {
      console.error('[DPlayer Debug] 绘制弹幕时发生错误:', e);
    }
  } else {
    console.warn('[DPlayer Debug] 弹幕对象不可用，无法绘制');
  }
};

const manualTest = () => {
  console.log('[DPlayer Debug] 执行手动测试...');
  if (dp && dp.video.paused) {
    ElMessage.warning('请先播放视频，否则弹幕无法移动');
  }
  drawDanmaku("手动测试：弹幕强制注入成功！", "#00ff00");
};

const initPlayer = () => {
  if (!player_container.value) return;
  
  console.log('[DPlayer Debug] 正在初始化播放器...');
  has_error.value = false;

  dp = new DPlayer({
    container: player_container.value,
    autoplay: false,
    screenshot: true,
    preload: 'auto',
    video: {
      url: 'https://zxydata.oss-cn-chengdu.aliyuncs.com/online-edu/test.mp4',
      type: 'auto',
      crossOrigin: 'anonymous'
    },
    danmaku: {
      id: 'debug-session-' + Date.now(),
      api: 'https://api.prprpr.me/dplayer/',
      user: 'DebugUser',
      bottom: '15%',
      unlimited: true,
      addition: [
        {
          text: '系统：弹幕引擎初始化日志开启',
          color: '#00ff00',
          type: 'right'
        }
      ]
    }
  });

  // 检查引擎初始化情况
  console.log('[DPlayer Debug] 播放器实例:', dp);
  console.log('[DPlayer Debug] 弹幕引擎对象:', dp.danmaku);

  // 强制显示弹幕
  dp.danmaku.show();

  dp.on('error', (err: any) => {
    console.error('[DPlayer Debug] 视频/弹幕加载错误:', err);
    has_error.value = true;
  });

  dp.on('loadedmetadata', () => {
    console.log('[DPlayer Debug] 视频元数据已加载，强制唤醒弹幕层');
    dp.danmaku.show();
  });

  dp.on('play', () => {
    console.log('[DPlayer Debug] 视频开始播放，启动模拟定时器');
    startMockTimer();
  });

  dp.on('pause', () => {
    console.log('[DPlayer Debug] 视频已暂停');
    if (mock_timer) clearInterval(mock_timer);
  });

  dp.on('danmaku_send', (data: any) => {
    console.log('[DPlayer Debug] 监听到用户发送弹幕事件:', data);
    ElMessage.success('发送成功');
  });
};

const startMockTimer = () => {
  if (mock_timer) clearInterval(mock_timer);
  mock_timer = setInterval(() => {
    if (dp && !dp.video.paused) {
      drawDanmaku();
    }
  }, 3000);
};

const retry = () => {
  console.log('[DPlayer Debug] 执行重试...');
  if (dp) dp.destroy();
  initPlayer();
};

onMounted(() => {
  nextTick(() => {
    initPlayer();
  });
});

onBeforeUnmount(() => {
  if (mock_timer) clearInterval(mock_timer);
  if (dp) {
    dp.destroy();
  }
});
</script>

<style scoped>
.video-detail-container {
  width: 100%;
}

.video-header {
  margin-bottom: 20px;
}

.video-title {
  font-size: 22px;
  color: #1a1a1a;
  margin: 0 0 10px 0;
  font-weight: 600;
}

.video-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px;
  color: #909399;
}

.player-section {
  width: 100%;
  background-color: #000;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  position: relative;
}

.dplayer-instance {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index: 10;
}

.video-description {
  margin-top: 24px;
}

.description-text {
  padding: 10px 0;
  color: #606266;
  line-height: 1.8;
  font-size: 14px;
}

:deep(.el-tabs__item) {
  font-size: 16px;
  font-weight: 600;
}

:deep(.el-tabs__active-bar) {
  background-color: #0097FF;
}

:deep(.el-tabs__item.is-active) {
  color: #0097FF;
}

/* 强制显示弹幕层，并增加层级 */
:deep(.dplayer-danmaku) {
  display: block !important;
  opacity: 1 !important;
  z-index: 10 !important;
}

/* 弹幕文字样式优化 */
:deep(.dplayer-danmaku-item) {
  font-size: 24px !important;
  font-weight: bold !important;
  text-shadow: 1px 1px 2px #000 !important;
}

/* 隐藏弹幕加载失败提示 */
:deep(.dplayer-notice) {
  display: none !important;
}
</style>