<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">分离算法与对象结构</div>
    
    <div class="flex items-start gap-8">
      <!-- 元素结构 -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-slate-400 mb-2 font-medium">元素结构</div>
        <div class="flex flex-col gap-2">
          <div 
            v-for="element in ['City', 'Industry', 'Sight']" 
            :key="element"
            class="w-28 h-12 border-2 rounded-lg flex items-center justify-center text-sm transition-all duration-300"
            :class="activeVisitorElement === element ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg' : 'border-slate-300 bg-white dark:bg-slate-800'"
          >
            {{ element }}
          </div>
        </div>
      </div>
      
      <!-- 访问者 -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-slate-400 mb-2 font-medium">访问者</div>
        <div class="flex flex-col gap-2 mb-4">
          <button 
            v-for="visitor in ['ExportVisitor', 'XMLVisitor']" 
            :key="visitor"
            @click="selectVisitor(visitor)"
            class="w-32 h-12 border-2 rounded-lg text-sm transition-all duration-300"
            :class="selectedVisitor === visitor ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg' : 'border-slate-300 hover:border-slate-400 bg-white dark:bg-slate-800'"
          >
            {{ visitor }}
          </button>
        </div>
        <button 
          @click="executeVisitor"
          class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors disabled:opacity-50"
          :disabled="!selectedVisitor || isVisitorRunning"
        >
          {{ isVisitorRunning ? '访问中...' : '执行访问' }}
        </button>
      </div>
      
      <!-- 结果 -->
      <div class="w-44 h-40 border-2 border-dashed border-slate-400 rounded-xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800">
        <span class="text-xs text-slate-400 mb-2">访问结果</span>
        <div v-if="visitorResult" class="text-center animate-fade-in">
          <div class="text-2xl mb-2">{{ visitorResult.icon }}</div>
          <div class="text-sm font-medium text-green-600">{{ visitorResult.text }}</div>
        </div>
        <span v-else class="text-sm text-slate-400">等待执行...</span>
      </div>
    </div>
    
    <!-- 说明 -->
    <div class="mt-6 text-center text-sm max-w-md">
      <p v-if="!visitorResult" class="text-slate-400">
        选择访问者并执行，观察如何在不改变元素类的情况下添加新操作
      </p>
      <p v-else class="text-slate-500">
        访问者模式将操作从元素类中分离出来
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVisitorAnimation } from '@/composables/usePatternAnimation';

const { activeVisitorElement, selectedVisitor, isVisitorRunning, visitorResult, selectVisitor, executeVisitor } = useVisitorAnimation();
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
