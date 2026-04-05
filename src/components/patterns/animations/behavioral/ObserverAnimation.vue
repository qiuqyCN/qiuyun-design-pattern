<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">观察订阅-发布机制如何工作</div>
    
    <div class="flex items-center gap-12">
      <!-- 主题/发布者 -->
      <div class="flex flex-col items-center">
        <div 
          class="w-40 h-32 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-500"
          :class="subjectState ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg' : 'border-slate-400 bg-slate-100 dark:bg-slate-800'"
        >
          <span class="text-lg font-bold mb-2">Subject</span>
          <div class="text-2xl mb-1">📰</div>
          <div class="text-xs text-slate-500">State: {{ subjectState || 'idle' }}</div>
        </div>
        <button 
          @click="updateSubject"
          class="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
          :disabled="isNotifying"
        >
          {{ isNotifying ? '通知中...' : '更新状态' }}
        </button>
      </div>
      
      <!-- 通知箭头 -->
      <div class="flex flex-col items-center">
        <svg 
          class="w-16 h-16 transition-all duration-500"
          :class="isNotifying ? 'text-blue-500' : 'text-slate-300'"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 64 64"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 32h32M48 32l-8-8M48 32l-8 8"/>
          <circle 
            v-if="isNotifying"
            cx="48" 
            cy="32" 
            r="6" 
            fill="currentColor"
            class="animate-ping"
          />
        </svg>
        <span class="text-xs text-slate-400">notify()</span>
      </div>
      
      <!-- 观察者列表 -->
      <div class="flex flex-col gap-3">
        <div class="text-xs text-slate-400 text-center mb-2 font-medium">Observers</div>
        <div 
          v-for="(observer, index) in observers" 
          :key="index"
          class="w-36 h-14 rounded-lg flex items-center justify-center text-sm transition-all duration-500 border-2"
          :class="observer.notified ? 
            'bg-linear-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 text-green-700 border-green-400 shadow-sm' : 
            'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200'"
        >
          <span class="mr-2">{{ observer.notified ? '✓' : '○' }}</span>
          Observer {{ index + 1 }}
        </div>
      </div>
    </div>
    
    <!-- 订阅/取消订阅控制 -->
    <div class="mt-8 flex gap-4">
      <button 
        @click="subscribeObserver"
        class="px-4 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors"
        :disabled="observers.length >= 4"
      >
        + 订阅
      </button>
      <button 
        @click="unsubscribeObserver"
        class="px-4 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors"
        :disabled="observers.length <= 0"
      >
        - 取消订阅
      </button>
    </div>
    
    <!-- 说明 -->
    <div class="mt-6 text-center text-sm max-w-md">
      <p class="text-slate-500">点击"更新状态"观察主题如何通知所有订阅的观察者</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useObserverAnimation } from '@/composables/usePatternAnimation';

const { subjectState, isNotifying, observers, updateSubject, subscribeObserver, unsubscribeObserver } = useObserverAnimation();
</script>
