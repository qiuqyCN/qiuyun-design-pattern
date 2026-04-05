<template>
  <section class="py-24 px-6 md:px-12 lg:px-24 border-t border-slate-100 dark:border-slate-800">
    <div class="max-w-6xl mx-auto">
      <!-- 标题 -->
      <div class="mb-16">
        <span class="text-xs tracking-widest text-slate-400 uppercase block mb-4">Learning Path</span>
        <h2 class="text-2xl md:text-3xl font-light text-slate-900 dark:text-white">推荐学习路径</h2>
      </div>

      <!-- 路径列表 -->
      <div class="space-y-0">
        <div 
          v-for="(patternId, index) in learningPath" 
          :key="patternId"
          class="group flex items-center gap-6 md:gap-12 py-4 border-b border-slate-100 dark:border-slate-800"
        >
          <span class="text-xs text-slate-400 w-6">{{ String(index + 1).padStart(2, '0') }}</span>
          <div class="flex-1 flex items-center justify-between">
            <a 
              :href="`/patterns/${patternId}`"
              class="text-base md:text-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {{ getPatternName(patternId) }}
            </a>
            <span 
              v-if="isLearned(patternId)"
              class="text-xs text-slate-400"
            >
              已完成
            </span>
            <span 
              v-else-if="isCurrent(patternId)"
              class="text-xs text-slate-900 dark:text-white"
            >
              当前
            </span>
          </div>
        </div>
      </div>

      <!-- 查看全部 -->
      <div class="mt-12">
        <a 
          href="/learning-path"
          class="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          查看完整路径
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLearningStats } from '@/composables/useLearningStats';
import { patternNames } from '@/data/patterns';

const { isLearned: checkLearned } = useLearningStats();

const learningPath = [
  'singleton',
  'factory-method',
  'abstract-factory',
  'builder',
  'prototype',
  'adapter',
  'bridge',
];

function isLearned(patternId: string) {
  return checkLearned.value(patternId);
}

function isCurrent(patternId: string) {
  const firstUnlearned = learningPath.find(id => !isLearned(id));
  return firstUnlearned === patternId;
}

function getPatternName(patternId: string) {
  return patternNames[patternId] || patternId;
}
</script>
