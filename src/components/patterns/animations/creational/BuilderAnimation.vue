<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">分步骤构建复杂对象</div>
    
    <div class="flex items-start gap-8">
      <!-- Director -->
      <div class="flex flex-col items-center">
        <div class="w-32 h-24 border-2 border-slate-600 dark:border-slate-400 rounded-xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 shadow-sm">
          <span class="text-sm font-bold">Director</span>
          <span class="text-xs text-slate-400 mt-1">construct()</span>
        </div>
        <button 
          @click="buildStep"
          class="mt-4 px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:opacity-80 transition-all disabled:opacity-50"
          :disabled="buildProgress >= 3 || isBuilding"
        >
          {{ buildProgress >= 3 ? '✓ 完成' : isBuilding ? '构建中...' : '下一步' }}
        </button>
        <button 
          v-if="buildProgress >= 3"
          @click="resetBuild"
          class="mt-2 text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          重新演示
        </button>
      </div>
      
      <!-- 构建步骤 -->
      <div class="flex flex-col gap-3 pt-2">
        <div 
          v-for="(step, index) in buildSteps" 
          :key="step"
          class="w-44 h-12 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-500 border-2"
          :class="buildProgress > index ? 
            'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 text-green-700 border-green-400 shadow-sm' : 
            'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200'"
        >
          <span v-if="buildProgress > index" class="mr-2 text-green-500">✓</span>
          <span v-else class="mr-2 text-slate-300">○</span>
          {{ step }}
        </div>
      </div>
      
      <!-- 箭头 -->
      <div class="flex items-center pt-12">
        <svg 
          class="w-12 h-16 transition-all duration-500"
          :class="buildProgress >= 3 ? 'text-green-500' : 'text-slate-300'"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 48 64"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M24 8v48M24 56l-8-8M24 56l8-8"/>
        </svg>
      </div>
      
      <!-- 最终产品 -->
      <div class="pt-4">
        <div 
          class="w-36 h-36 rounded-xl flex flex-col items-center justify-center transition-all duration-700 border-3"
          :class="buildProgress >= 3 ? 
            'bg-gradient-to-br from-green-400 to-green-500 text-white border-green-600 scale-100 shadow-xl' : 
            'bg-slate-200 dark:bg-slate-700 text-slate-400 border-slate-300 scale-90'"
        >
          <div class="text-4xl mb-2 transition-all duration-500" :class="buildProgress >= 3 ? 'scale-110' : 'scale-100'">
            {{ buildProgress >= 3 ? '🏠' : '🏗️' }}
          </div>
          <div class="text-xs font-medium">
            {{ buildProgress >= 3 ? 'House Ready!' : 'Building...' }}
          </div>
          <div v-if="buildProgress >= 3" class="text-[10px] mt-1 opacity-80">
            100% Complete
          </div>
        </div>
      </div>
    </div>
    
    <!-- 进度条 -->
    <div class="mt-8 w-96 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
      <div 
        class="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
        :style="{ width: `${(buildProgress / 3) * 100}%` }"
      ></div>
    </div>
    <div class="mt-2 text-xs text-slate-400">
      构建进度: {{ Math.round((buildProgress / 3) * 100) }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBuilderAnimation } from '@/composables/usePatternAnimation';

const { buildProgress, isBuilding, buildSteps, buildStep, resetBuild } = useBuilderAnimation();
</script>

<style scoped>
.border-3 {
  border-width: 3px;
}
</style>
