<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">动态添加功能装饰</div>
    
    <div class="flex items-center gap-6">
      <!-- 基础组件 -->
      <div class="flex flex-col items-center">
        <div 
          class="w-28 h-28 rounded-xl flex flex-col items-center justify-center border-2 transition-all duration-500 cursor-pointer"
          :class="baseComponent ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-300 border-dashed bg-slate-50 dark:bg-slate-800'"
          @click="addBaseComponent"
        >
          <div class="text-3xl mb-2">{{ baseComponent ? '📄' : '➕' }}</div>
          <div class="text-sm font-medium">{{ baseComponent ? 'TextView' : 'Base' }}</div>
        </div>
      </div>
      
      <!-- 装饰器选择 -->
      <div class="flex flex-col gap-2">
        <div class="text-xs text-slate-400 text-center mb-1">添加装饰</div>
        <button 
          v-for="decorator in ['Border', 'Scroll', 'Shadow']" 
          :key="decorator"
          @click="addDecorator(decorator)"
          class="w-28 h-10 border rounded-lg text-xs transition-all duration-300 disabled:opacity-30"
          :class="activeDecorators.includes(decorator) ? 
            'border-green-500 bg-green-50 text-green-700' : 
            'border-slate-300 hover:border-slate-400 bg-white dark:bg-slate-800'"
          :disabled="!baseComponent || activeDecorators.includes(decorator)"
        >
          {{ decorator }}
        </button>
        <button 
          v-if="activeDecorators.length > 0"
          @click="resetDecorators"
          class="w-28 h-8 text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          重置
        </button>
      </div>
      
      <!-- 最终效果 -->
      <div 
        class="w-40 h-40 rounded-xl flex flex-col items-center justify-center transition-all duration-500 border-3"
        :class="getDecoratorClasses()"
      >
        <div class="text-4xl mb-2">📄</div>
        <div class="text-xs text-center">
          <div v-if="!baseComponent">点击左侧添加基础组件</div>
          <div v-else>
            <div>TextView</div>
            <div v-if="activeDecorators.length > 0" class="text-[10px] mt-1 text-slate-500">
              + {{ activeDecorators.join(', ') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDecoratorAnimation } from '@/composables/usePatternAnimation';

const { baseComponent, activeDecorators, addBaseComponent, addDecorator, resetDecorators, getDecoratorClasses } = useDecoratorAnimation();
</script>

<style scoped>
.border-3 {
  border-width: 3px;
}
</style>
