<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">选择工厂创建完整的产品族</div>
    
    <div class="flex items-center gap-10">
      <!-- 工厂选择 -->
      <div class="flex flex-col gap-4">
        <div class="text-xs text-slate-400 text-center mb-2 font-medium">选择工厂</div>
        <button 
          v-for="family in ['Modern', 'Victorian']" 
          :key="family"
          @click="selectFamily(family)"
          class="w-40 h-20 border-2 rounded-xl flex flex-col items-center justify-center text-sm transition-all duration-300"
          :class="selectedFamily === family ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg' : 'border-slate-300 hover:border-slate-400 bg-white dark:bg-slate-800'"
        >
          <span class="font-bold">{{ family }}</span>
          <span class="text-xs text-slate-400 mt-1">Factory</span>
        </button>
      </div>
      
      <!-- 创建箭头 -->
      <div class="flex flex-col items-center">
        <svg 
          class="w-16 h-16 transition-all duration-500"
          :class="selectedFamily ? 'text-green-500' : 'text-slate-300'"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 64 64"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 32h32M48 32l-8-8M48 32l-8 8"/>
          <circle 
            v-if="isCreating"
            cx="48" 
            cy="32" 
            r="6" 
            fill="currentColor"
            class="animate-ping"
          />
        </svg>
        <span class="text-xs text-slate-400 mt-2">creates family</span>
      </div>
      
      <!-- 产品族 -->
      <div class="flex flex-col gap-3">
        <div class="text-xs text-slate-400 text-center mb-2 font-medium">产品族</div>
        <div 
          v-for="(product, index) in ['Chair', 'Sofa', 'Table']" 
          :key="product"
          class="w-36 h-14 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-500 border-2"
          :class="selectedFamily ? 
            (selectedFamily === 'Modern' ? 
              'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-700 border-blue-300 shadow-sm' : 
              'bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 text-amber-700 border-amber-300 shadow-sm'
            ) : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200'"
          :style="{ transitionDelay: `${index * 150}ms` }"
        >
          <span class="mr-2">{{ selectedFamily === 'Modern' ? ['🪑', '🛋️', '🪑'][index] : ['🪑', '🛋️', '🪑'][index] }}</span>
          {{ selectedFamily || 'Product' }}{{ product }}
        </div>
      </div>
    </div>
    
    <!-- 说明 -->
    <div class="mt-8 text-center text-sm max-w-lg">
      <p v-if="!selectedFamily" class="text-slate-400">选择工厂，观察如何创建一系列风格一致的产品族</p>
      <p v-else :class="selectedFamily === 'Modern' ? 'text-blue-600' : 'text-amber-600'" class="font-medium">
        {{ selectedFamily === 'Modern' ? '现代风格' : '维多利亚风格' }}工厂创建了完整的产品族，确保风格一致
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAbstractFactoryAnimation } from '@/composables/usePatternAnimation';

const { selectedFamily, isCreating, selectFamily } = useAbstractFactoryAnimation();
</script>
