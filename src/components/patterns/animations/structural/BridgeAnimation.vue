<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">分离抽象与实现，独立变化</div>
    
    <div class="flex items-center gap-8">
      <!-- 抽象层 -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-slate-400 mb-2 font-medium">Abstraction</div>
        <div class="flex flex-col gap-3">
          <button 
            v-for="remote in ['TV', 'Radio']" 
            :key="remote"
            @click="selectAbstraction(remote)"
            class="w-28 h-14 border-2 rounded-lg flex items-center justify-center text-sm transition-all duration-300"
            :class="selectedAbstraction === remote ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg' : 'border-slate-300 hover:border-slate-400 bg-white dark:bg-slate-800'"
          >
            {{ remote }}Remote
          </button>
        </div>
      </div>
      
      <!-- 桥接连接 -->
      <div class="flex flex-col items-center">
        <svg 
          class="w-16 h-16 transition-all duration-500"
          :class="selectedAbstraction ? 'text-green-500' : 'text-slate-300'"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 64 64"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 32h32M48 32l-8-8M48 32l-8 8"/>
          <text x="32" y="52" text-anchor="middle" font-size="10" fill="currentColor">bridge</text>
        </svg>
      </div>
      
      <!-- 实现层 -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-slate-400 mb-2 font-medium">Implementation</div>
        <div class="flex flex-col gap-3">
          <button 
            v-for="device in ['Sony', 'Samsung']" 
            :key="device"
            @click="selectImplementation(device)"
            class="w-28 h-14 border-2 rounded-lg flex items-center justify-center text-sm transition-all duration-300"
            :class="selectedImplementation === device ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg' : 'border-slate-300 hover:border-slate-400 bg-white dark:bg-slate-800'"
          >
            {{ device }}
          </button>
        </div>
      </div>
      
      <!-- 结果 -->
      <div class="w-40 h-32 border-2 border-slate-400 rounded-xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800">
        <span class="text-xs text-slate-400 mb-2">组合结果</span>
        <div 
          v-if="selectedAbstraction && selectedImplementation"
          class="text-center animate-fade-in"
        >
          <div class="text-3xl mb-2">📱</div>
          <div class="text-sm font-medium text-green-600">
            {{ selectedAbstraction }} + {{ selectedImplementation }}
          </div>
        </div>
        <span v-else class="text-sm text-slate-400">选择组合...</span>
      </div>
    </div>
    
    <!-- 说明 -->
    <div class="mt-6 text-center text-sm max-w-md">
      <p v-if="!selectedAbstraction || !selectedImplementation" class="text-slate-400">
        分别从左右两侧选择抽象和实现进行组合
      </p>
      <p v-else class="text-green-600 font-medium">
        ✓ 桥接模式让遥控器类型和设备品牌可以独立扩展
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBridgeAnimation } from '@/composables/usePatternAnimation';

const { selectedAbstraction, selectedImplementation, selectAbstraction, selectImplementation } = useBridgeAnimation();
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
