<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">适配器转换接口</div>
    
    <div class="flex items-center gap-8">
      <!-- 客户端 -->
      <div class="w-28 h-24 border-2 border-slate-600 rounded-xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800">
        <span class="text-sm font-medium">Client</span>
        <span class="text-xs text-slate-400 mt-1">expects</span>
      </div>
      
      <!-- 目标接口 -->
      <div class="w-28 h-24 border-2 border-blue-400 rounded-xl flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-900/20">
        <span class="text-sm font-medium text-blue-700">Target</span>
        <span class="text-xs text-blue-400 mt-1">Interface</span>
      </div>
      
      <!-- 适配器 -->
      <div 
        class="w-32 h-28 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-500 cursor-pointer"
        :class="adapterActive ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg' : 'border-slate-300 bg-slate-100 dark:bg-slate-800'"
        @click="toggleAdapter"
      >
        <span class="text-sm font-medium">Adapter</span>
        <span class="text-xs text-slate-400 mt-1">converts</span>
        <div class="text-lg mt-1">{{ adapterActive ? '🔌' : '⚪' }}</div>
      </div>
      
      <!-- 被适配者 -->
      <div 
        class="w-28 h-24 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-500"
        :class="adapterActive ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20' : 'border-slate-300 bg-slate-100 dark:bg-slate-800'"
      >
        <span class="text-sm font-medium" :class="adapterActive ? 'text-amber-700' : ''">Adaptee</span>
        <span class="text-xs text-slate-400 mt-1">existing</span>
      </div>
    </div>
    
    <!-- 说明 -->
    <div class="mt-8 text-center text-sm max-w-md">
      <p v-if="!adapterActive" class="text-slate-400">点击适配器激活接口转换</p>
      <p v-else class="text-green-600 font-medium">
        ✓ 适配器将 Target 接口调用转换为 Adaptee 能理解的请求
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdapterAnimation } from '@/composables/usePatternAnimation';

const { adapterActive, toggleAdapter } = useAdapterAnimation();
</script>
