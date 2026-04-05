<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-8">通过克隆创建新对象</div>
    
    <div class="flex items-center gap-12">
      <!-- 原始对象 -->
      <div class="flex flex-col items-center">
        <div 
          class="w-36 h-36 rounded-xl flex flex-col items-center justify-center border-3 transition-all duration-500 cursor-pointer"
          :class="originalObject ? 'border-blue-500 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 shadow-lg' : 'border-slate-300 border-dashed bg-slate-50 dark:bg-slate-800 hover:border-slate-400'"
          @click="createOriginal"
        >
          <div class="text-4xl mb-2">{{ originalObject ? '📄' : '➕' }}</div>
          <div class="text-sm font-bold">{{ originalObject ? 'Original' : 'Create' }}</div>
          <div v-if="originalObject" class="text-xs text-slate-400 mt-1">Prototype</div>
        </div>
      </div>
      
      <!-- 克隆控制 -->
      <div class="flex flex-col items-center">
        <button 
          v-if="originalObject && clones.length < 4"
          @click="cloneObject"
          class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 mb-4"
          :disabled="isCloning"
        >
          {{ isCloning ? '⏳ 克隆中...' : '🔀 克隆 +' }}
        </button>
        <svg 
          class="w-20 h-8 transition-all duration-500"
          :class="originalObject ? 'text-green-500' : 'text-slate-300'"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 80 32"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16h64M68 16l-8-8M68 16l-8 8"/>
        </svg>
        <div class="text-xs text-slate-400 mt-2">clone()</div>
      </div>
      
      <!-- 克隆对象 -->
      <div class="flex flex-col gap-3">
        <div 
          v-for="(clone, index) in clones" 
          :key="clone.id"
          class="w-32 h-24 rounded-xl flex flex-col items-center justify-center border-2 border-green-400 bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 shadow-md animate-slide-in"
        >
          <div class="text-2xl">📄</div>
          <div class="text-xs font-medium text-green-700">Clone {{ index + 1 }}</div>
        </div>
        <div 
          v-for="i in (4 - clones.length)" 
          :key="`empty-${i}`"
          class="w-32 h-24 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center"
        >
          <span class="text-xs text-slate-300">Empty</span>
        </div>
      </div>
    </div>
    
    <!-- 说明 -->
    <div class="mt-8 text-center text-sm max-w-md">
      <p v-if="!originalObject" class="text-slate-400">点击左侧创建原型对象</p>
      <p v-else-if="clones.length === 0" class="text-slate-500">点击"克隆 +" 按钮创建对象的独立副本</p>
      <p v-else class="text-green-600 font-medium">
        ✓ 已创建 {{ clones.length }} 个克隆对象，每个都是原型的独立副本
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePrototypeAnimation } from '@/composables/usePatternAnimation';

const { originalObject, clones, isCloning, createOriginal, cloneObject } = usePrototypeAnimation();
</script>

<style scoped>
.border-3 {
  border-width: 3px;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-20px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.animate-slide-in {
  animation: slide-in 0.4s ease-out;
}
</style>
