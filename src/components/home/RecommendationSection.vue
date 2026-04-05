<template>
  <section class="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          今日推荐
        </h2>
        <p class="text-slate-600 dark:text-slate-400">
          为你精选的学习内容
        </p>
      </div>

      <!-- 推荐卡片 -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-700">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <!-- 左侧图标 -->
          <div class="shrink-0">
            <div 
              class="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl"
              :style="{ backgroundColor: getCategoryColor(recommendedPattern.category) + '15' }"
            >
              {{ getPatternEmoji(recommendedPattern.id) }}
            </div>
          </div>

          <!-- 右侧内容 -->
          <div class="flex-1 text-center md:text-left">
            <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
              <span 
                class="px-3 py-1 text-sm rounded-full"
                :style="{ 
                  backgroundColor: getCategoryColor(recommendedPattern.category) + '15',
                  color: getCategoryColor(recommendedPattern.category)
                }"
              >
                {{ getCategoryName(recommendedPattern.category) }}
              </span>
              <span class="px-3 py-1 text-sm rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                {{ getDifficultyLabel(recommendedPattern.difficulty) }}
              </span>
            </div>

            <h3 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {{ recommendedPattern.name }}
            </h3>

            <p class="text-slate-600 dark:text-slate-400 text-lg mb-6 leading-relaxed">
              "{{ recommendedPattern.intent }}"
            </p>

            <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button 
                @click="navigateToPattern(recommendedPattern.id)"
                class="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
              >
                立即学习
              </button>
              <button 
                @click="refreshRecommendation"
                class="px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300"
              >
                <RefreshIcon class="w-4 h-4 inline mr-2" />
                换一个
              </button>
              <button 
                @click="toggleFavorite"
                class="px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300"
                :class="isFavorite ? 'text-red-500' : 'text-slate-400'"
              >
                <HeartIcon class="w-5 h-5" :class="isFavorite ? 'fill-current' : ''" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 学习提示 -->
      <div class="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
        <div class="flex items-start gap-4">
          <div class="shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <LightbulbIcon class="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-1">
              💡 学习建议
            </h4>
            <p class="text-blue-700 dark:text-blue-300">
              {{ learningTip }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { RefreshCw, Heart, Lightbulb } from 'lucide-vue-next';
import { patterns } from '@/data/patterns';
import { categories, difficultyLabels } from '@/data/categories';
import { useLearningStats } from '@/composables/useLearningStats';

const { stats } = useLearningStats();

const categoryColorMap: Record<string, string> = {
  creational: '#3B82F6',
  structural: '#10B981',
  behavioral: '#8B5CF6',
};

const patternEmojiMap: Record<string, string> = {
  singleton: '🔒',
  'factory-method': '🏭',
  'abstract-factory': '🏢',
  builder: '🔨',
  prototype: '📋',
};

// 获取未学习的模式
const unlearnedPatterns = computed(() => {
  return patterns.filter(p => !stats.value.recentLearned.includes(p.id));
});

// 当前推荐的索引
const currentIndex = ref(0);

// 推荐的模式
const recommendedPattern = computed(() => {
  const list = unlearnedPatterns.value.length > 0 ? unlearnedPatterns.value : patterns;
  return list[currentIndex.value % list.length];
});

// 是否收藏
const isFavorite = ref(false);

// 学习提示
const learningTip = computed(() => {
  const creationalLearned = stats.value.categoryProgress.creational.learned;
  const structuralLearned = stats.value.categoryProgress.structural.learned;
  const behavioralLearned = stats.value.categoryProgress.behavioral.learned;
  
  if (stats.value.learnedPatterns === 0) {
    return '建议从创建型模式开始学习，单例模式和工厂模式是很好的入门选择。';
  } else if (creationalLearned < 5) {
    return `你已经学习了 ${creationalLearned} 个创建型模式，建议继续完成创建型模式的学习。`;
  } else if (structuralLearned < 7) {
    return '你已经掌握了创建型模式，建议接下来学习结构型模式。';
  } else if (behavioralLearned < 11) {
    return '你已经掌握了结构型模式，建议接下来学习行为型模式。';
  } else {
    return '太棒了！你已经学习了所有设计模式，建议通过交互练习巩固知识。';
  }
});

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

function getPatternEmoji(patternId: string) {
  return patternEmojiMap[patternId] || '📦';
}

function navigateToPattern(patternId: string) {
  window.location.href = `/patterns/${patternId}`;
}

function refreshRecommendation() {
  currentIndex.value++;
  isFavorite.value = false;
}

function toggleFavorite() {
  isFavorite.value = !isFavorite.value;
}

const RefreshIcon = RefreshCw;
const HeartIcon = Heart;
const LightbulbIcon = Lightbulb;
</script>
