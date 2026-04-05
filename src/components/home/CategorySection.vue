<template>
  <section id="patterns" class="py-24 px-6 md:px-12 lg:px-24 border-t border-slate-100 dark:border-slate-800">
    <div class="max-w-6xl mx-auto">
      <!-- 标题 -->
      <div class="mb-16">
        <span class="text-xs tracking-widest text-slate-400 uppercase block mb-4">Categories</span>
        <h2 class="text-2xl md:text-3xl font-light text-slate-900 dark:text-white">设计模式分类</h2>
      </div>

      <!-- 分类列表 -->
      <div class="space-y-0">
        <a 
          v-for="(category, index) in categories" 
          :key="category.id"
          :href="`/patterns?category=${category.id}`"
          class="group flex items-center justify-between py-6 border-b border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
        >
          <div class="flex items-baseline gap-6 md:gap-12">
            <span class="text-xs text-slate-400 w-6">0{{ index + 1 }}</span>
            <div>
              <h3 class="text-lg md:text-xl font-normal text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                {{ category.name }}
              </h3>
              <p class="text-sm text-slate-500 mt-1 hidden md:block">{{ category.description }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-sm text-slate-400">{{ category.count }} 种模式</span>
            <svg 
              class="w-5 h-5 text-slate-300 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { categories } from '@/data/categories';
</script>
