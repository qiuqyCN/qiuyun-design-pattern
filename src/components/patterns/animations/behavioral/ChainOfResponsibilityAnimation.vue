<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">将请求沿处理链传递</div>
    
    <div class="flex items-center gap-4">
      <!-- 请求 -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-slate-400 mb-2">请求</div>
        <div class="flex flex-col gap-2">
          <button 
            v-for="level in ['Low', 'Medium', 'High']" 
            :key="level"
            @click="sendChainRequest(level)"
            class="w-24 h-12 border-2 rounded-lg text-sm transition-all duration-300"
            :class="chainRequestLevel === level ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg' : 'border-slate-300 hover:border-slate-400 bg-white dark:bg-slate-800'"
            :disabled="isChainProcessing"
          >
            {{ level }}
          </button>
        </div>
      </div>
      
      <!-- 处理链 -->
      <div class="flex items-center">
        <div 
          v-for="(handler, index) in ['HandlerA', 'HandlerB', 'HandlerC']" 
          :key="handler"
          class="flex items-center"
        >
          <div 
            class="w-28 h-20 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-500"
            :class="chainActiveIndex === index ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg' : 
                    chainActiveIndex > index ? 'border-slate-300 bg-slate-100 dark:bg-slate-800 opacity-50' : 
                    'border-slate-400 bg-slate-100 dark:bg-slate-800'"
          >
            <span class="text-sm font-medium">{{ handler }}</span>
            <span class="text-xs text-slate-400">{{ ['Low', 'Medium', 'High'][index] }}</span>
          </div>
          <svg 
            v-if="index < 2"
            class="w-8 h-8 mx-2 transition-all duration-300"
            :class="chainActiveIndex === index ? 'text-green-500' : 'text-slate-300'"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 32 32"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16h16M24 16l-6-6M24 16l-6 6"/>
          </svg>
        </div>
      </div>
      
      <!-- 结果 -->
      <div class="w-32 h-24 border-2 border-dashed border-slate-400 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800">
        <div v-if="chainResult" class="text-center animate-fade-in">
          <div class="text-2xl mb-1">✓</div>
          <div class="text-sm font-medium text-green-600">{{ chainResult }}</div>
        </div>
        <span v-else class="text-sm text-slate-400">等待处理...</span>
      </div>
    </div>
    
    <!-- 说明 -->
    <div class="mt-6 text-center text-sm max-w-md">
      <p v-if="!chainResult" class="text-slate-400">
        选择请求级别，观察它如何在处理链中找到合适的处理器
      </p>
      <p v-else class="text-green-600 font-medium">
        {{ chainResult }} 处理了这个请求
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChainOfResponsibilityAnimation } from '@/composables/usePatternAnimation';

const { chainRequestLevel, chainActiveIndex, chainResult, isChainProcessing, sendChainRequest } = useChainOfResponsibilityAnimation();
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
