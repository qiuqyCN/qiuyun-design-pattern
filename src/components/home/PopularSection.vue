<template>
  <section class="py-24 px-6 md:px-12 lg:px-24 border-t border-slate-100 dark:border-slate-800">
    <div class="max-w-6xl mx-auto">
      <!-- 标题 -->
      <div class="mb-16 flex items-end justify-between">
        <div>
          <span class="text-xs tracking-widest text-slate-400 uppercase block mb-4">Popular</span>
          <h2 class="text-2xl md:text-3xl font-light text-slate-900 dark:text-white">热门模式</h2>
        </div>
        <a href="/patterns" class="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
          查看全部
        </a>
      </div>

      <!-- 模式网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800">
        <a 
          v-for="pattern in popularPatterns" 
          :key="pattern.id"
          :href="`/patterns/${pattern.id}`"
          class="group bg-white dark:bg-slate-900 p-8 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div class="flex items-start justify-between mb-4">
            <span class="text-xs text-slate-400">{{ getCategoryName(pattern.category) }}</span>
            <span class="text-xs text-slate-400">{{ getDifficultyLabel(pattern.difficulty) }}</span>
          </div>
          <h3 class="text-lg font-normal text-slate-900 dark:text-white mb-2 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
            {{ pattern.name }}
          </h3>
          <p class="text-sm text-slate-500 line-clamp-2">{{ pattern.intent }}</p>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getPopularPatterns } from '@/data/patterns';
import { categories, difficultyLabels } from '@/data/categories';

const popularPatterns = getPopularPatterns(6);

function getCategoryName(category: string) {
  const cat = categories.find(c => c.id === category);
  return cat?.name || category;
}

function getDifficultyLabel(difficulty: string) {
  return difficultyLabels[difficulty] || difficulty;
}
</script>
