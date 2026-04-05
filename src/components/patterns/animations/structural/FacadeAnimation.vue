<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">为复杂子系统提供简化接口</div>
    
    <div class="flex items-center gap-8">
      <!-- 客户端 -->
      <div class="w-24 h-20 border-2 border-slate-600 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800">
        <span class="text-sm font-medium">Client</span>
      </div>
      
      <!-- 简化调用 -->
      <div class="flex flex-col items-center">
        <svg 
          class="w-16 h-8 transition-all duration-500"
          :class="facadeActive ? 'text-green-500' : 'text-slate-300'"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 64 32"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16h56M60 16l-8-8M60 16l-8 8"/>
        </svg>
        <span class="text-xs text-slate-400">简化调用</span>
      </div>
      
      <!-- 外观 -->
      <div 
        class="w-32 h-28 border-2 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-500"
        :class="facadeActive ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg' : 'border-slate-400 bg-slate-100 dark:bg-slate-800'"
        @click="activateFacade"
      >
        <span class="text-sm font-bold">Facade</span>
        <span class="text-xs text-slate-400 mt-1">简化接口</span>
        <div class="text-2xl mt-1">🏠</div>
      </div>
      
      <!-- 复杂子系统 -->
      <div class="flex flex-col gap-2">
        <div 
          v-for="(sub, index) in ['SubsystemA', 'SubsystemB', 'SubsystemC']" 
          :key="sub"
          class="w-28 h-12 border rounded-lg flex items-center justify-center text-xs transition-all duration-500"
          :class="subsystemsActive[index] ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-slate-300 bg-slate-100 dark:bg-slate-800 text-slate-400'"
        >
          {{ sub }}
        </div>
      </div>
    </div>
    
    <!-- 控制按钮 -->
    <button 
      @click="activateFacade"
      class="mt-8 px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:opacity-80 transition-all"
      :disabled="isFacadeOperating"
    >
      {{ isFacadeOperating ? '操作中...' : '一键操作' }}
    </button>
    
    <!-- 说明 -->
    <div class="mt-6 text-center text-sm max-w-md">
      <p v-if="!facadeActive" class="text-slate-400">
        点击"一键操作"，外观模式会协调所有子系统完成复杂操作
      </p>
      <p v-else class="text-green-600 font-medium">
        ✓ 外观封装了复杂的子系统调用，客户端只需简单调用
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFacadeAnimation } from '@/composables/usePatternAnimation';

const { facadeActive, isFacadeOperating, subsystemsActive, activateFacade } = useFacadeAnimation();
</script>
