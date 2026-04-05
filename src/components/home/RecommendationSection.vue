<template>
  <section class="py-24 px-6 md:px-12 lg:px-24 border-t border-slate-100 dark:border-slate-800">
    <div class="max-w-6xl mx-auto">
      <!-- 标题 -->
      <div class="mb-16">
        <span class="text-xs tracking-widest text-slate-400 uppercase block mb-4">Recommendation</span>
        <h2 class="text-2xl md:text-3xl font-light text-slate-900 dark:text-white">今日推荐</h2>
      </div>

      <!-- 推荐内容 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        <!-- 左侧：推荐模式 -->
        <div>
          <div class="flex items-center gap-4 mb-6">
            <span class="text-xs text-slate-400">{{ getCategoryName(recommendedPattern.category) }}</span>
            <span class="text-xs text-slate-400">{{ getDifficultyLabel(recommendedPattern.difficulty) }}</span>
          </div>
          <h3 class="text-2xl md:text-3xl font-light text-slate-900 dark:text-white mb-4">
            {{ recommendedPattern.name }}
          </h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            {{ recommendedPattern.intent }}
          </p>
          <div class="flex items-center gap-4">
            <a 
              :href="`/patterns/${recommendedPattern.id}`"
              class="inline-flex items-center px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors"
            >
              开始学习
            </a>
            <button 
              @click="refreshRecommendation"
              class="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              换一个
            </button>
          </div>
        </div>

        <!-- 右侧：学习建议 -->
        <div class="lg:border-l lg:border-slate-200 dark:lg:border-slate-800 lg:pl-12">
          <h4 class="text-sm font-medium text-slate-900 dark:text-white mb-4">学习建议</h4>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            {{ learningTip }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { patterns } from '@/data/patterns';
import { categories, difficultyLabels } from '@/data/categories';
import { useLearningStats } from '@/composables/useLearningStats';

const { stats } = useLearningStats();

const unlearnedPatterns = computed(() => {
  return patterns.filter(p => !stats.value.recentLearned.includes(p.id));
});

const currentIndex = ref(0);

const recommendedPattern = computed(() => {
  const list = unlearnedPatterns.value.length > 0 ? unlearnedPatterns.value : patterns;
  return list[currentIndex.value % list.length];
});

function getCategoryName(category: string) {
  const cat = categories.find(c => c.id === category);
  return cat?.name || category;
}

function getDifficultyLabel(difficulty: string) {
  return difficultyLabels[difficulty] || difficulty;
}

const learningTip = computed(() => {
  const creationalLearned = stats.value.categoryProgress.creational.learned;
  const structuralLearned = stats.value.categoryProgress.structural.learned;
  
  if (stats.value.learnedPatterns === 0) {
    return '建议从创建型模式开始学习，单例模式和工厂模式是很好的入门选择。';
  } else if (creationalLearned < 5) {
    return `你已经学习了 ${creationalLearned} 个创建型模式，建议继续完成创建型模式的学习。`;
  } else if (structuralLearned < 7) {
    return '你已经掌握了创建型模式，建议接下来学习结构型模式。';
  } else {
    return '太棒了！你已经学习了所有设计模式，建议通过交互练习巩固知识。';
  }
});

function refreshRecommendation() {
  currentIndex.value++;
}
</script>
