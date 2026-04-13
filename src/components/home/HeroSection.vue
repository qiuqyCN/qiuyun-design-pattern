<template>
  <section class="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 relative overflow-hidden">
    <!-- 背景装饰元素 -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- 左上角装饰圆 -->
      <div class="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-linear-to-br from-slate-100 to-transparent dark:from-slate-800/30 opacity-50 blur-3xl animate-pulse-slow"></div>
      <!-- 右下角装饰圆 -->
      <div class="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-linear-to-tl from-slate-100 to-transparent dark:from-slate-800/30 opacity-50 blur-3xl animate-pulse-slow" style="animation-delay: 1s;"></div>
      
      <!-- 悬浮代码片段装饰 -->
      <div class="absolute top-1/4 right-[10%] opacity-60 dark:opacity-50 animate-float" style="animation-delay: 0s;">
        <pre class="text-xs font-mono text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/60 px-4 py-3 rounded-lg backdrop-blur-sm border border-slate-300/60 dark:border-slate-600/40 shadow-md">class Singleton {
  static instance;
  getInstance() {
    return this.instance;
  }
}</pre>
      </div>
      <div class="absolute bottom-1/3 right-[5%] opacity-60 dark:opacity-50 animate-float" style="animation-delay: 2s;">
        <pre class="text-xs font-mono text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/60 px-4 py-3 rounded-lg backdrop-blur-sm border border-slate-300/60 dark:border-slate-600/40 shadow-md">interface Observer {
  update(data: any): void;
}</pre>
      </div>
      <div class="absolute top-1/3 left-[5%] opacity-60 dark:opacity-50 animate-float" style="animation-delay: 1s;">
        <pre class="text-xs font-mono text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/60 px-4 py-3 rounded-lg backdrop-blur-sm border border-slate-300/60 dark:border-slate-600/40 shadow-md">abstract class Factory {
  abstract createProduct();
}</pre>
      </div>
    </div>

    <div class="max-w-4xl mx-auto w-full relative z-10">
      <!-- 标签 -->
      <div class="mb-8 opacity-0 animate-fade-in-up" style="animation-delay: 0.1s; animation-fill-mode: forwards;">
        <span class="text-xs tracking-widest text-slate-400 uppercase">Design Patterns</span>
      </div>

      <!-- 主标题 -->
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 dark:text-white leading-tight mb-6 opacity-0 animate-fade-in-up" style="animation-delay: 0.3s; animation-fill-mode: forwards;">
        秋云设计模式
      </h1>

      <!-- 副标题 - 打字机效果 -->
      <p 
        class="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-12 max-w-2xl"
        @click="skipTyping"
      >
        <span>{{ displayedText }}</span>
        <span 
          v-if="isTyping" 
          class="inline-block w-0.5 h-5 bg-slate-400 dark:bg-slate-500 ml-1 animate-pulse"
        ></span>
      </p>

      <!-- 操作按钮 -->
      <div class="flex flex-wrap gap-4 opacity-0 animate-fade-in-up" style="animation-delay: 0.7s; animation-fill-mode: forwards;">
        <a 
          href="#patterns"
          class="group inline-flex items-center px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-700 dark:hover:bg-slate-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        >
          开始学习
          <svg class="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
        <a 
          href="#stats"
          class="group inline-flex items-center px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
        >
          查看进度
          <svg class="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </a>
      </div>

      <!-- 前置知识提示 -->
      <div class="mt-6 opacity-0 animate-fade-in-up" style="animation-delay: 0.8s; animation-fill-mode: forwards;">
        <a 
          href="/prerequisites" 
          class="inline-flex items-center text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
          零基础？先了解前置知识
        </a>
      </div>

      <!-- 滚动提示 -->
      <div class="mt-24 opacity-0 animate-fade-in-up" style="animation-delay: 0.9s; animation-fill-mode: forwards;">
        <a href="#stats" class="group inline-flex items-center text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          <span class="mr-2">向下滚动</span>
          <svg class="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const fullText = '23 种经典设计模式，以清晰、优雅的方式呈现。让复杂变得简单，让学习成为享受。';
const displayedText = ref('');
const isTyping = ref(true);
let intervalId: number | null = null;

function startTyping() {
  let index = 0;
  intervalId = window.setInterval(() => {
    if (index < fullText.length) {
      displayedText.value += fullText[index];
      index++;
    } else {
      isTyping.value = false;
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }
  }, 60); // 60ms/字，约 1.5 秒打完
}

function skipTyping() {
  if (isTyping.value) {
    isTyping.value = false;
    displayedText.value = fullText;
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
}

onMounted(() => {
  // 延迟开始打字效果，等待渐入动画完成
  setTimeout(() => {
    startTyping();
  }, 800);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<style scoped>
/* 渐入动画 */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
}

/* 缓慢脉冲动画 */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

/* 悬浮动画 */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
