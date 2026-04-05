<template>
  <section class="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          三种设计模式分类
        </h2>
        <p class="text-slate-600 dark:text-slate-400">
          根据 GoF 设计模式，分为创建型、结构型和行为型三大类
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
          @click="navigateToCategory(category.id)"
        >
          <!-- 图标 -->
          <div 
            class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
            :style="{ backgroundColor: category.color + '15' }"
          >
            <component 
              :is="getCategoryIcon(category.icon)" 
              class="w-8 h-8"
              :style="{ color: category.color }"
            />
          </div>

          <!-- 内容 -->
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {{ category.name }}
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">
            {{ category.nameEn }}
          </p>
          <p class="text-slate-600 dark:text-slate-400 text-sm mb-6">
            {{ category.description }}
          </p>

          <!-- 进度 -->
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm text-slate-500">
              {{ getLearnedCount(category.id) }}/{{ category.count }} 已学
            </span>
            <span 
              class="text-sm font-semibold"
              :style="{ color: category.color }"
            >
              {{ Math.round((getLearnedCount(category.id) / category.count) * 100) }}%
            </span>
          </div>

          <!-- 进度条 -->
          <div class="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-6">
            <div 
              class="h-full rounded-full transition-all duration-500"
              :style="{ 
                width: `${(getLearnedCount(category.id) / category.count) * 100}%`,
                backgroundColor: category.color 
              }"
            ></div>
          </div>

          <!-- 按钮 -->
          <div class="flex items-center text-sm font-medium" :style="{ color: category.color }">
            探索 {{ category.name }}
            <ArrowRightIcon class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Building2, Puzzle, Theater, ArrowRight } from 'lucide-vue-next';
import { categories } from '@/data/categories';
import { useLearningStats } from '@/composables/useLearningStats';

const { stats } = useLearningStats();

const iconMap: Record<string, any> = {
  Building2: Building2,
  Puzzle: Puzzle,
  Theater: Theater,
};

function getCategoryIcon(iconName: string) {
  return iconMap[iconName] || Building2;
}

function getLearnedCount(categoryId: string) {
  return stats.value.categoryProgress[categoryId as keyof typeof stats.value.categoryProgress]?.learned || 0;
}

function navigateToCategory(categoryId: string) {
  window.location.href = `/patterns?category=${categoryId}`;
}

const ArrowRightIcon = ArrowRight;
</script>
