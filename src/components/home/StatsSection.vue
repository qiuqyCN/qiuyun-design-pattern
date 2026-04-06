<template>
  <section id="stats" class="py-24 px-6 md:px-12 lg:px-24 border-t border-slate-100 dark:border-slate-800">
    <div class="max-w-6xl mx-auto">
      <!-- 标题 -->
      <div class="mb-16">
        <span class="text-xs tracking-widest text-slate-400 uppercase block mb-4">Progress</span>
        <h2 class="text-2xl md:text-3xl font-light text-slate-900 dark:text-white">学习进度</h2>
      </div>

      <!-- 统计数字 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <div>
          <div class="text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-2">
            {{ isClient ? stats.learnedPatterns : 0 }}<span class="text-slate-300">/</span>23
          </div>
          <div class="text-sm text-slate-500">已学习</div>
        </div>
        <div>
          <div class="text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-2">
            {{ isClient ? stats.completedPercentage : 0 }}%
          </div>
          <div class="text-sm text-slate-500">完成度</div>
        </div>
        <div>
          <div class="text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-2">
            {{ isClient ? stats.streakDays : 0 }}
          </div>
          <div class="text-sm text-slate-500">连续学习(天)</div>
        </div>
        <div>
          <div class="text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-2">
            {{ isClient ? Math.floor(stats.totalLearningTime / 60) : 0 }}h
          </div>
          <div class="text-sm text-slate-500">学习时长</div>
        </div>
      </div>

      <!-- 分类进度 -->
      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="cat in categoryStats" :key="cat.id" class="group">
          <div class="flex justify-between items-baseline mb-3">
            <span class="text-sm text-slate-600 dark:text-slate-400">{{ cat.name }}</span>
            <span class="text-xs text-slate-400">{{ cat.learned }}/{{ cat.total }}</span>
          </div>
          <div class="h-px bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
            <div 
              class="absolute inset-y-0 left-0 bg-slate-900 dark:bg-white transition-all duration-700"
              :style="{ width: isClient ? `${(cat.learned / cat.total) * 100}%` : '0%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useLearningStats } from '@/composables/useLearningStats';
import { categories } from '@/data/categories';

const { stats } = useLearningStats();
const isClient = ref(false);

onMounted(() => {
  isClient.value = true;
});

const categoryStats = computed(() => {
  return categories.map(cat => ({
    ...cat,
    total: cat.count,
    learned: isClient.value ? stats.value.categoryProgress[cat.id].learned : 0,
  }));
});
</script>
