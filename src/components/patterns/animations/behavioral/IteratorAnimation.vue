<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">顺序访问聚合对象元素</div>
    
    <div class="flex items-center gap-10">
      <!-- 集合 -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-slate-400 mb-2 font-medium">Collection</div>
        <div class="flex gap-2">
          <div 
            v-for="(item, index) in iteratorItems" 
            :key="index"
            class="w-14 h-14 border-2 rounded-lg flex items-center justify-center text-lg transition-all duration-500"
            :class="iteratorIndex === index ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg scale-110' : 
                    iteratorIndex > index ? 'border-slate-300 bg-slate-100 opacity-50' : 
                    'border-slate-400 bg-white dark:bg-slate-800'"
          >
            {{ item }}
          </div>
        </div>
      </div>
      
      <!-- 迭代器 -->
      <div class="flex flex-col items-center">
        <div class="w-32 h-24 border-2 border-blue-400 rounded-xl flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-900/20">
          <span class="text-sm font-medium text-blue-700">Iterator</span>
          <span class="text-xs text-blue-400 mt-1">index: {{ iteratorIndex }}</span>
          <span class="text-xs text-blue-400">hasNext: {{ iteratorIndex < iteratorItems.length }}</span>
        </div>
      </div>
    </div>
    
    <!-- 控制按钮 -->
    <div class="mt-8 flex gap-4">
      <button 
        @click="iteratorNext"
        class="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:opacity-80 transition-all disabled:opacity-50"
        :disabled="iteratorIndex >= iteratorItems.length"
      >
        next()
      </button>
      <button 
        @click="resetIterator"
        class="px-6 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors"
      >
        reset()
      </button>
    </div>
    
    <!-- 当前元素 -->
    <div class="mt-6 text-center">
      <span class="text-sm text-slate-500">当前元素: </span>
      <span class="text-lg font-medium text-green-600">
        {{ iteratorIndex > 0 && iteratorIndex <= iteratorItems.length ? iteratorItems[iteratorIndex - 1] : '无' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIteratorAnimation } from '@/composables/usePatternAnimation';

const { iteratorItems, iteratorIndex, iteratorNext, resetIterator } = useIteratorAnimation();
</script>
