<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">运行时切换不同算法策略</div>
    
    <div class="flex items-center gap-10">
      <!-- 策略选择 -->
      <div class="flex flex-col gap-3">
        <div class="text-xs text-slate-400 text-center mb-2 font-medium">选择策略</div>
        <button 
          v-for="strategy in ['BubbleSort', 'QuickSort', 'MergeSort']" 
          :key="strategy"
          @click="selectStrategy(strategy)"
          class="w-36 h-14 border-2 rounded-lg flex items-center justify-center text-sm transition-all duration-300"
          :class="selectedStrategy === strategy ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg' : 'border-slate-300 hover:border-slate-400 bg-white dark:bg-slate-800'"
        >
          {{ strategy }}
        </button>
      </div>
      
      <!-- 箭头 -->
      <div class="flex flex-col items-center">
        <svg 
          class="w-16 h-16 transition-all duration-500"
          :class="selectedStrategy ? 'text-green-500' : 'text-slate-300'"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 64 64"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 32h32M48 32l-8-8M48 32l-8 8"/>
        </svg>
        <span class="text-xs text-slate-400">execute()</span>
      </div>
      
      <!-- 上下文/执行结果 -->
      <div class="w-48 h-40 border-2 border-slate-400 rounded-xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800">
        <span class="text-sm font-medium mb-4">Context</span>
        <div 
          v-if="selectedStrategy"
          class="w-36 h-20 rounded-lg flex flex-col items-center justify-center transition-all duration-500"
          :class="strategyResults[selectedStrategy].color"
        >
          <div class="text-2xl mb-1">{{ strategyResults[selectedStrategy].icon }}</div>
          <div class="text-xs font-medium">{{ strategyResults[selectedStrategy].time }}</div>
        </div>
        <span v-else class="text-sm text-slate-400">等待选择...</span>
      </div>
    </div>
    
    <!-- 复杂度说明 -->
    <div v-if="selectedStrategy" class="mt-6 text-center">
      <p class="text-sm" :class="strategyResults[selectedStrategy].textColor">
        {{ strategyResults[selectedStrategy].description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStrategyAnimation } from '@/composables/usePatternAnimation';

const { selectedStrategy, strategyResults, selectStrategy } = useStrategyAnimation();
</script>
