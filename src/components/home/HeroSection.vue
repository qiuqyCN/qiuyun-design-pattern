<template>
  <section class="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24">
    <div class="max-w-4xl mx-auto w-full">
      <!-- 标签 -->
      <div class="mb-8">
        <span class="text-xs tracking-widest text-slate-400 uppercase">Design Patterns</span>
      </div>

      <!-- 主标题 -->
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 dark:text-white leading-tight mb-6">
        秋云设计模式
      </h1>

      <!-- 副标题 -->
      <p class="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-12 max-w-2xl">
        23 种经典设计模式，以清晰、优雅的方式呈现。让复杂变得简单，让学习成为享受。
      </p>

      <!-- 操作按钮 -->
      <div class="flex flex-wrap gap-4">
        <a 
          href="#patterns"
          class="inline-flex items-center px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors"
        >
          开始学习
        </a>
        <a 
          href="#stats"
          class="inline-flex items-center px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
        >
          查看进度
        </a>
      </div>

      <!-- 滚动提示 -->
      <div class="mt-24">
        <a href="#stats" class="inline-flex items-center text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
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
