<template>
  <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-12">
        <div>
          <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            热门设计模式
          </h2>
          <p class="text-slate-600 dark:text-slate-400">
            最常用、最值得学习的经典模式
          </p>
        </div>
        <a 
          href="/patterns"
          class="hidden sm:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          查看全部
          <ArrowRightIcon class="w-4 h-4" />
        </a>
      </div>

      <!-- 横向滚动列表 -->
      <div class="relative">
        <div 
          ref="scrollContainer"
          class="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
          style="scroll-behavior: smooth; -webkit-overflow-scrolling: touch;"
        >
          <div 
            v-for="pattern in popularPatterns" 
            :key="pattern.id"
            class="shrink-0 w-72 bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            @click="navigateToPattern(pattern.id)"
          >
            <!-- 头部 -->
            <div class="flex items-start justify-between mb-4">
              <div 
                class="w-12 h-12 rounded-xl flex items-center justify-center"
                :style="{ backgroundColor: getCategoryColor(pattern.category) + '15' }"
              >
                <span class="text-2xl">{{ getPatternEmoji(pattern.id) }}</span>
              </div>
              <div class="flex items-center gap-1">
                <StarIcon 
                  v-for="i in 5" 
                  :key="i"
                  class="w-4 h-4"
                  :class="i <= getFrequencyStars(pattern.frequency) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'"
                />
              </div>
            </div>

            <!-- 内容 -->
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
              {{ pattern.name }}
            </h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
              {{ pattern.intent }}
            </p>

            <!-- 标签 -->
            <div class="flex items-center gap-2">
              <span 
                class="px-2 py-1 text-xs rounded-full"
                :style="{ 
                  backgroundColor: getCategoryColor(pattern.category) + '15',
                  color: getCategoryColor(pattern.category)
                }"
              >
                {{ getCategoryName(pattern.category) }}
              </span>
              <span class="px-2 py-1 text-xs rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                {{ getDifficultyLabel(pattern.difficulty) }}
              </span>
            </div>
          </div>
        </div>

        <!-- 滚动提示 -->
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-full bg-linear-to-l from-white dark:from-slate-900 to-transparent pointer-events-none"></div>
      </div>

      <!-- 移动端查看全部链接 -->
      <div class="mt-6 text-center sm:hidden">
        <a 
          href="/patterns"
          class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          查看全部模式
          <ArrowRightIcon class="w-4 h-4" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Star, ArrowRight } from 'lucide-vue-next';
import { getPopularPatterns } from '@/data/patterns';
import { categories, difficultyLabels } from '@/data/categories';
import type { DesignPattern } from '@/types/pattern';

const popularPatterns = getPopularPatterns(6);

const categoryColorMap: Record<string, string> = {
  creational: '#3B82F6',
  structural: '#10B981',
  behavioral: '#8B5CF6',
};

const patternEmojiMap: Record<string, string> = {
  singleton: '🔒',
  'factory-method': '🏭',
  observer: '👁️',
  strategy: '🎯',
  decorator: '🎀',
  adapter: '🔌',
};

function getCategoryColor(category: string) {
  return categoryColorMap[category] || '#6B7280';
}

function getCategoryName(category: string) {
  const cat = categories.find(c => c.id === category);
  return cat?.name || category;
}

function getDifficultyLabel(difficulty: string) {
  return difficultyLabels[difficulty] || difficulty;
}

function getFrequencyStars(frequency: string) {
  const map: Record<string, number> = { high: 5, medium: 3, low: 1 };
  return map[frequency] || 3;
}

function getPatternEmoji(patternId: string) {
  return patternEmojiMap[patternId] || '📦';
}

function navigateToPattern(patternId: string) {
  window.location.href = `/patterns/${patternId}`;
}

const ArrowRightIcon = ArrowRight;
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
