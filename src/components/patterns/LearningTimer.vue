<template>
  <!-- 学习计时器组件 - 无UI，仅记录时间 -->
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useLearningStats } from '@/composables/useLearningStats';

const props = defineProps<{
  patternId: string;
}>();

const { recordLearningTime } = useLearningStats();
let startTime: number = 0;
let intervalId: number | null = null;

// 记录学习时长（每5分钟记录一次）
function recordInterval() {
  const now = Date.now();
  const elapsedMinutes = Math.floor((now - startTime) / 60000);
  
  if (elapsedMinutes >= 5) {
    recordLearningTime(props.patternId, 5);
    startTime = now; // 重置计时
  }
}

// 页面可见性变化处理
function handleVisibilityChange() {
  if (document.hidden) {
    // 页面隐藏时，记录已学习的时间
    const elapsedMinutes = Math.floor((Date.now() - startTime) / 60000);
    if (elapsedMinutes > 0) {
      recordLearningTime(props.patternId, elapsedMinutes);
    }
  } else {
    // 页面显示时，重新开始计时
    startTime = Date.now();
  }
}

onMounted(() => {
  startTime = Date.now();
  
  // 每5分钟记录一次
  intervalId = window.setInterval(recordInterval, 5 * 60 * 1000);
  
  // 监听页面可见性变化
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onUnmounted(() => {
  // 组件卸载时记录学习时长
  if (startTime > 0) {
    const elapsedMinutes = Math.floor((Date.now() - startTime) / 60000);
    if (elapsedMinutes > 0) {
      recordLearningTime(props.patternId, elapsedMinutes);
    }
  }
  
  // 清理定时器
  if (intervalId) {
    clearInterval(intervalId);
  }
  
  // 移除事件监听
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});
</script>
