<template>
  <div>
    <!-- 总体统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <!-- 已学习 -->
      <div class="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
        <div class="text-sm text-slate-500 dark:text-slate-400 mb-2">已学习</div>
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-light">{{ stats.learnedPatterns }}</span>
          <span class="text-slate-400">/ {{ stats.totalPatterns }}</span>
        </div>
        <div class="mt-4 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            class="h-full bg-green-500 rounded-full transition-all duration-500" 
            :style="{ width: `${stats.completedPercentage}%` }"
          ></div>
        </div>
      </div>

      <!-- 连续学习 -->
      <div class="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
        <div class="text-sm text-slate-500 dark:text-slate-400 mb-2">连续学习</div>
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-light">{{ stats.streakDays }}</span>
          <span class="text-slate-400">天</span>
        </div>
        <div class="mt-4 flex gap-1">
          <div 
            v-for="i in 7" 
            :key="i"
            class="flex-1 h-8 rounded transition-colors duration-300"
            :class="i <= Math.min(stats.streakDays, 7) ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-800'"
          ></div>
        </div>
      </div>

      <!-- 学习时长 -->
      <div class="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
        <div class="text-sm text-slate-500 dark:text-slate-400 mb-2">学习时长</div>
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-light">{{ Math.floor(stats.totalLearningTime) }}</span>
          <span class="text-slate-400">分钟</span>
        </div>
        <div class="mt-4 text-xs text-slate-400">
          今日学习 {{ todayLearningTime }} 分钟
        </div>
      </div>

      <!-- 完成进度 -->
      <div class="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
        <div class="text-sm text-slate-500 dark:text-slate-400 mb-2">完成进度</div>
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-light">{{ stats.completedPercentage }}</span>
          <span class="text-slate-400">%</span>
        </div>
        <div class="mt-4 text-xs text-slate-400">
          目标: 掌握全部 {{ stats.totalPatterns }} 种模式
        </div>
      </div>
    </div>

    <!-- 分类进度 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
      <div 
        v-for="(cat, key) in categoryProgressList" 
        :key="key"
        class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-medium">{{ cat.name }}</h3>
          <span class="text-sm text-slate-400">{{ cat.total }} 个</span>
        </div>
        <div class="space-y-3">
          <div 
            v-for="pattern in cat.patterns" 
            :key="pattern.id"
            class="flex items-center justify-between"
          >
            <a :href="`/patterns/${pattern.id}`" class="text-sm hover:text-blue-500 transition-colors">
              {{ pattern.name }}
            </a>
            <button
              @click="toggleLearned(pattern.id, key as PatternCategory)"
              class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all"
              :class="isPatternLearned(pattern.id) 
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                : 'border-slate-200 dark:border-slate-700 hover:border-green-500'"
            >
              <svg 
                class="w-3 h-3 text-green-500 transition-opacity"
                :class="isPatternLearned(pattern.id) ? 'opacity-100' : 'opacity-0'"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLearningStats } from '@/composables/useLearningStats';
import { patterns } from '@/data/patterns';
import type { PatternCategory } from '@/types/pattern';

const { stats, markAsLearned, isLearned } = useLearningStats();

// 分类名称映射
const categoryNames: Record<PatternCategory, string> = {
  creational: '创建型模式',
  structural: '结构型模式',
  behavioral: '行为型模式',
};

// 今日学习时长
const todayLearningTime = computed(() => {
  const today = new Date().toISOString().split('T')[0];
  const todayRecord = stats.value.dailyRecords.find(r => r.date === today);
  return todayRecord?.learningTime || 0;
});

// 分类进度列表
const categoryProgressList = computed(() => {
  const result: Record<string, { name: string; total: number; patterns: typeof patterns }> = {};
  
  (['creational', 'structural', 'behavioral'] as PatternCategory[]).forEach(cat => {
    result[cat] = {
      name: categoryNames[cat],
      total: stats.value.categoryProgress[cat].total,
      patterns: patterns.filter(p => p.category === cat),
    };
  });
  
  return result;
});

// 检查模式是否已学习
function isPatternLearned(patternId: string): boolean {
  return isLearned.value(patternId);
}

// 切换学习状态
function toggleLearned(patternId: string, category: PatternCategory) {
  if (isPatternLearned(patternId)) {
    // 取消学习 - 需要重置数据
    // 这里简化处理，实际应该提供取消学习的功能
    console.log('取消学习功能需要在 useLearningStats 中实现');
  } else {
    markAsLearned(patternId, category);
  }
}
</script>
