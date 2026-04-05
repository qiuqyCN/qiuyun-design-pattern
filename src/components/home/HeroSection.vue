<template>
  <section class="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 relative overflow-hidden">
    <!-- 背景装饰元素 -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- 左上角装饰圆 -->
      <div class="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-slate-100 to-transparent dark:from-slate-800/30 opacity-50 blur-3xl animate-pulse-slow"></div>
      <!-- 右下角装饰圆 -->
      <div class="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-slate-100 to-transparent dark:from-slate-800/30 opacity-50 blur-3xl animate-pulse-slow" style="animation-delay: 1s;"></div>
      
      <!-- 悬浮代码片段装饰 -->
      <div class="absolute top-1/4 right-[10%] opacity-10 dark:opacity-5 animate-float" style="animation-delay: 0s;">
        <pre class="text-xs font-mono text-slate-400">
class Singleton {
  static instance;
  getInstance() {
    return this.instance;
  }
}</pre>
      </div>
      <div class="absolute bottom-1/3 right-[5%] opacity-10 dark:opacity-5 animate-float" style="animation-delay: 2s;">
        <pre class="text-xs font-mono text-slate-400">
interface Observer {
  update(data: any): void;
}</pre>
      </div>
      <div class="absolute top-1/3 left-[5%] opacity-10 dark:opacity-5 animate-float" style="animation-delay: 1s;">
        <pre class="text-xs font-mono text-slate-400">
abstract class Factory {
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

      <!-- 副标题 -->
      <p class="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-12 max-w-2xl opacity-0 animate-fade-in-up" style="animation-delay: 0.5s; animation-fill-mode: forwards;">
        23 种经典设计模式，以清晰、优雅的方式呈现。让复杂变得简单，让学习成为享受。
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
// 极简主义，无需复杂逻辑
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
