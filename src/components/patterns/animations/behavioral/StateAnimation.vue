<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">对象在状态改变时改变行为</div>
    
    <div class="flex items-center gap-10">
      <!-- 上下文 -->
      <div class="w-40 h-36 border-2 border-slate-600 rounded-xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800">
        <span class="text-sm font-bold">Context</span>
        <span class="text-xs text-slate-400 mt-1">Document</span>
        <div class="mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
             :class="currentState === 'Draft' ? 'bg-slate-200' : 
                     currentState === 'Moderation' ? 'bg-yellow-100 text-yellow-700' : 
                     'bg-green-100 text-green-700'">
          状态: {{ currentState }}
        </div>
      </div>
      
      <!-- 状态转换 -->
      <div class="flex flex-col gap-3">
        <div class="text-xs text-slate-400 text-center font-medium">状态转换</div>
        <button 
          v-for="state in ['Draft', 'Moderation', 'Published']" 
          :key="state"
          @click="changeState(state)"
          class="w-32 h-12 border-2 rounded-lg text-sm transition-all duration-300"
          :class="currentState === state ? 
            (state === 'Draft' ? 'border-slate-500 bg-slate-100' : 
             state === 'Moderation' ? 'border-yellow-500 bg-yellow-50 text-yellow-700' : 
             'border-green-500 bg-green-50 text-green-700 shadow-lg') : 
            'border-slate-300 hover:border-slate-400 bg-white dark:bg-slate-800'"
        >
          {{ state }}
        </button>
      </div>
      
      <!-- 行为展示 -->
      <div class="w-44 h-36 border-2 border-dashed border-slate-400 rounded-xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800">
        <span class="text-xs text-slate-400 mb-2">当前行为</span>
        <div class="text-center">
          <div class="text-2xl mb-2">{{ stateBehaviors[currentState].icon }}</div>
          <div class="text-sm font-medium" :class="stateBehaviors[currentState].color">
            {{ stateBehaviors[currentState].action }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- 说明 -->
    <div class="mt-6 text-center text-sm max-w-md">
      <p class="text-slate-500">
        点击状态按钮，观察同一方法在不同状态下的不同行为
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStateAnimation } from '@/composables/usePatternAnimation';

const { currentState, stateBehaviors, changeState } = useStateAnimation();
</script>
