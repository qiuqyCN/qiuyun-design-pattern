<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">封装对象间的交互</div>
    
    <div class="flex items-center gap-8">
      <!-- 同事组件 -->
      <div class="flex flex-col gap-3">
        <div 
          v-for="colleague in ['Button', 'TextBox', 'ListBox']" 
          :key="colleague"
          class="w-28 h-14 border-2 rounded-lg flex items-center justify-center text-sm transition-all duration-300 cursor-pointer"
          :class="activeColleague === colleague ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg' : 'border-slate-300 bg-white dark:bg-slate-800 hover:border-slate-400'"
          @click="interactWithColleague(colleague)"
        >
          {{ colleague }}
        </div>
      </div>
      
      <!-- 交互箭头 -->
      <div class="flex flex-col items-center">
        <svg 
          class="w-16 h-16 transition-all duration-500"
          :class="mediatorActive ? 'text-green-500' : 'text-slate-300'"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 64 64"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 32h32M48 32l-8-8M48 32l-8 8"/>
        </svg>
        <span class="text-xs text-slate-400">通过中介</span>
      </div>
      
      <!-- 中介者 -->
      <div 
        class="w-36 h-36 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-500"
        :class="mediatorActive ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg' : 'border-slate-600 bg-slate-100 dark:bg-slate-800'"
      >
        <span class="text-sm font-bold">Mediator</span>
        <span class="text-xs text-slate-400 mt-1">Dialog</span>
        <div class="text-2xl mt-2">🤝</div>
      </div>
      
      <!-- 交互结果 -->
      <div class="w-40 h-32 border-2 border-dashed border-slate-400 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800">
        <div v-if="mediatorMessage" class="text-center animate-fade-in">
          <div class="text-sm text-green-600 font-medium">{{ mediatorMessage }}</div>
        </div>
        <span v-else class="text-sm text-slate-400">点击左侧组件</span>
      </div>
    </div>
    
    <!-- 说明 -->
    <div class="mt-6 text-center text-sm max-w-md">
      <p v-if="!mediatorMessage" class="text-slate-400">
        点击组件观察中介者如何协调组件间的交互
      </p>
      <p v-else class="text-slate-500">
        组件不直接通信，而是通过中介者协调
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMediatorAnimation } from '@/composables/usePatternAnimation';

const { activeColleague, mediatorActive, mediatorMessage, interactWithColleague } = useMediatorAnimation();
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
