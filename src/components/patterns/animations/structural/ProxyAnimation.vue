<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">代理控制对真实对象的访问</div>
    
    <div class="flex items-center gap-8">
      <!-- 客户端 -->
      <div class="w-24 h-20 border-2 border-slate-600 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800">
        <span class="text-sm font-medium">Client</span>
      </div>
      
      <!-- 请求箭头 -->
      <div class="flex flex-col items-center">
        <svg 
          class="w-12 h-8 transition-all duration-500"
          :class="proxyActive ? 'text-blue-500' : 'text-slate-300'"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 48 32"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16h32M36 16l-8-8M36 16l-8 8"/>
        </svg>
      </div>
      
      <!-- 代理 -->
      <div 
        class="w-32 h-28 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-500 cursor-pointer"
        :class="proxyActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg' : 'border-slate-400 bg-slate-100 dark:bg-slate-800'"
        @click="toggleProxy"
      >
        <span class="text-sm font-bold">Proxy</span>
        <div class="flex gap-1 mt-2">
          <span class="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded">check</span>
          <span class="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded">log</span>
        </div>
      </div>
      
      <!-- 真实主题 -->
      <div 
        class="w-32 h-28 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-500"
        :class="realSubjectLoaded ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-slate-300 bg-slate-100 dark:bg-slate-800'"
      >
        <span class="text-sm font-medium">RealSubject</span>
        <div class="text-2xl mt-1">{{ realSubjectLoaded ? '📂' : '💤' }}</div>
        <span class="text-[10px] text-slate-400">{{ realSubjectLoaded ? 'loaded' : 'lazy' }}</span>
      </div>
    </div>
    
    <!-- 控制按钮 -->
    <button 
      @click="accessThroughProxy"
      class="mt-8 px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:opacity-80 transition-all"
      :disabled="isAccessing"
    >
      {{ isAccessing ? '访问中...' : '通过代理访问' }}
    </button>
    
    <!-- 说明 -->
    <div class="mt-6 text-center text-sm max-w-md">
      <p v-if="!proxyActive" class="text-slate-400">点击"通过代理访问"观察代理如何控制对真实对象的访问</p>
      <p v-else-if="!realSubjectLoaded" class="text-blue-600">代理正在执行预处理和权限检查...</p>
      <p v-else class="text-green-600 font-medium">
        ✓ 代理完成检查后，延迟加载并访问真实对象
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProxyAnimation } from '@/composables/usePatternAnimation';

const { proxyActive, realSubjectLoaded, isAccessing, accessThroughProxy, toggleProxy } = useProxyAnimation();
</script>
