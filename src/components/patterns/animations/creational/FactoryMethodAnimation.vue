<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-8">点击不同工厂创建对应的产品</div>
    
    <div class="flex items-center gap-8">
      <!-- Creator 抽象类 -->
      <div class="w-40 h-28 border-2 border-dashed border-slate-400 rounded-xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800">
        <span class="text-sm font-medium text-slate-500">Creator</span>
        <span class="text-xs text-slate-400 mt-1">(抽象类)</span>
      </div>
      
      <!-- 继承箭头 -->
      <div class="flex flex-col items-center">
        <svg class="w-8 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 32 48">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v32M16 36l-8-8M16 36l8-8"/>
        </svg>
        <span class="text-xs text-slate-400">extends</span>
      </div>
      
      <!-- 具体工厂 -->
      <div class="flex flex-col gap-4">
        <button 
          v-for="type in ['A', 'B']" 
          :key="type"
          @click="createProduct(type)"
          class="w-40 h-16 border-2 rounded-xl flex flex-col items-center justify-center text-sm transition-all duration-300"
          :class="selectedFactory === type ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg' : 'border-slate-300 hover:border-slate-400 bg-white dark:bg-slate-800'"
          :disabled="isAnimating"
        >
          <span class="font-medium">ConcreteCreator{{ type }}</span>
          <span class="text-xs text-slate-400 mt-1">factoryMethod()</span>
        </button>
      </div>
      
      <!-- 创建箭头 -->
      <div class="flex flex-col items-center">
        <svg 
          class="w-12 h-12 transition-all duration-500"
          :class="selectedFactory ? 'text-green-500' : 'text-slate-300'"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 48 48"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 24h24M36 24l-8-8M36 24l-8 8"/>
          <circle 
            v-if="isAnimating"
            cx="36" 
            cy="24" 
            r="4" 
            fill="currentColor"
            class="animate-ping"
          />
        </svg>
        <span class="text-xs text-slate-400">creates</span>
      </div>
      
      <!-- 产品 -->
      <div class="w-44 h-36 border-2 border-dashed border-slate-400 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
        <div 
          v-if="selectedProduct"
          class="absolute inset-0 flex items-center justify-center transition-all duration-500"
          :class="showProduct ? 'opacity-100 scale-100' : 'opacity-0 scale-50'"
        >
          <div 
            class="w-32 h-24 rounded-xl flex flex-col items-center justify-center shadow-lg"
            :class="selectedProduct === 'A' ? 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/30 border-2 border-blue-400' : 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/30 border-2 border-purple-400'"
          >
            <span class="text-2xl mb-1">{{ selectedProduct === 'A' ? '📦' : '🎁' }}</span>
            <span class="text-sm font-bold" :class="selectedProduct === 'A' ? 'text-blue-700' : 'text-purple-700'">
              Product{{ selectedProduct }}
            </span>
          </div>
        </div>
        <span v-else class="text-sm text-slate-400">等待创建...</span>
      </div>
    </div>
    
    <!-- 产品类型说明 -->
    <div class="mt-8 flex gap-8">
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 rounded bg-blue-400"></div>
        <span class="text-sm text-slate-500">Product A 类型</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 rounded bg-purple-400"></div>
        <span class="text-sm text-slate-500">Product B 类型</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFactoryMethodAnimation } from '@/composables/usePatternAnimation';

const { selectedFactory, selectedProduct, showProduct, isAnimating, createProduct } = useFactoryMethodAnimation();
</script>
