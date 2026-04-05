<template>
  <div class="px-6 md:px-12 lg:px-24 py-12">
    <div class="max-w-6xl mx-auto">
      <!-- 页面标题 -->
      <div class="mb-12">
        <span class="text-xs tracking-widest text-slate-400 uppercase block mb-4">All Patterns</span>
        <h1 class="text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-4">设计模式</h1>
        <p class="text-slate-500 dark:text-slate-400">探索 23 种经典设计模式，掌握软件设计的艺术</p>
      </div>

      <!-- 搜索和筛选 -->
      <div class="mb-12 space-y-6">
        <!-- 搜索框 -->
        <div class="relative max-w-md">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索设计模式..."
            class="w-full px-4 py-3 bg-transparent border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
          />
          <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        <!-- 分类筛选 -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="toggleCategory(cat.id)"
            class="px-4 py-2 text-sm border transition-colors"
            :class="selectedCategories.includes(cat.id) 
              ? 'border-slate-900 dark:border-white bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500'"
          >
            {{ cat.name }}
          </button>
          <button
            v-if="selectedCategories.length > 0"
            @click="clearFilters"
            class="px-4 py-2 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            清除筛选
          </button>
        </div>
      </div>

      <!-- 统计信息 -->
      <div class="mb-8 text-sm text-slate-500">
        共 {{ filteredPatterns.length }} 个设计模式
      </div>

      <!-- 模式列表 -->
      <div class="space-y-0">
        <a
          v-for="pattern in filteredPatterns"
          :key="pattern.id"
          :href="`/patterns/${pattern.id}`"
          class="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
        >
          <div class="flex items-baseline gap-6 md:gap-12 mb-2 md:mb-0">
            <span class="text-xs text-slate-400 w-6">{{ getPatternNumber(pattern.id) }}</span>
            <div>
              <h3 class="text-lg md:text-xl font-normal text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                {{ pattern.name }}
              </h3>
              <p class="text-sm text-slate-500 mt-1">{{ pattern.nameEn }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4 md:gap-8">
            <span class="text-xs text-slate-400">{{ getCategoryName(pattern.category) }}</span>
            <span class="text-xs text-slate-400">{{ getDifficultyLabel(pattern.difficulty) }}</span>
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

      <!-- 空状态 -->
      <div v-if="filteredPatterns.length === 0" class="py-24 text-center">
        <p class="text-slate-500 dark:text-slate-400">没有找到匹配的设计模式</p>
        <button 
          @click="clearFilters"
          class="mt-4 text-sm text-slate-900 dark:text-white hover:underline"
        >
          清除筛选条件
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { patterns } from '@/data/patterns';
import { categories, difficultyLabels, categoryNames } from '@/data/categories';

const searchQuery = ref('');
const selectedCategories = ref<string[]>([]);

const filteredPatterns = computed(() => {
  let result = patterns;

  // 分类筛选
  if (selectedCategories.value.length > 0) {
    result = result.filter(p => selectedCategories.value.includes(p.category));
  }

  // 搜索筛选
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.nameEn.toLowerCase().includes(query) ||
      p.intent.toLowerCase().includes(query)
    );
  }

  return result;
});

function toggleCategory(categoryId: string) {
  const index = selectedCategories.value.indexOf(categoryId);
  if (index > -1) {
    selectedCategories.value.splice(index, 1);
  } else {
    selectedCategories.value.push(categoryId);
  }
}

function clearFilters() {
  selectedCategories.value = [];
  searchQuery.value = '';
}

function getPatternNumber(patternId: string): string {
  const index = patterns.findIndex(p => p.id === patternId);
  return String(index + 1).padStart(2, '0');
}

function getCategoryName(category: string): string {
  return categoryNames[category] || category;
}

function getDifficultyLabel(difficulty: string): string {
  return difficultyLabels[difficulty] || difficulty;
}
</script>
