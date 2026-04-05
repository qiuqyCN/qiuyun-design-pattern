<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-8">观察单例模式如何确保只有一个实例存在</div>
    
    <div class="flex items-center gap-12 mb-8">
      <!-- 多个客户端 -->
      <div class="flex flex-col gap-4">
        <div 
          v-for="i in 3" 
          :key="i"
          class="w-28 h-16 border-2 rounded-lg flex items-center justify-center transition-all duration-500"
          :class="activeClient === i ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg' : 'border-slate-300 bg-slate-50 dark:bg-slate-800'"
        >
          <span class="text-sm font-medium">Client {{ i }}</span>
        </div>
      </div>
      
      <!-- 请求箭头组 -->
      <div class="flex flex-col gap-4">
        <div 
          v-for="i in 3" 
          :key="i"
          class="w-20 h-16 flex items-center justify-center relative"
        >
          <svg 
            class="w-16 h-8 transition-opacity duration-300"
            :class="activeClient === i ? 'opacity-100' : 'opacity-20'"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 64 32"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 16h48M52 16l-8-8M52 16l-8 8"
              :class="activeClient === i ? 'text-blue-500' : 'text-slate-400'"
            >
              <animate 
                v-if="activeClient === i"
                attributeName="stroke-dasharray" 
                values="0,100;100,0" 
                dur="0.8s" 
                repeatCount="1"
              />
            </path>
          </svg>
          <div 
            class="absolute -top-2 text-xs transition-opacity duration-300"
            :class="activeClient === i ? 'opacity-100 text-blue-500' : 'opacity-0'"
          >
            getInstance()
          </div>
        </div>
      </div>
      
      <!-- Singleton -->
      <div class="relative">
        <div 
          class="w-44 h-32 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-500 shadow-lg"
          :class="instanceCreated ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20' : 'border-slate-400 bg-slate-100 dark:bg-slate-800'"
        >
          <span class="text-lg font-bold mb-3">Singleton</span>
          <div 
            class="w-14 h-14 rounded-full border-3 flex items-center justify-center text-xl font-bold transition-all duration-500"
            :class="instanceCreated ? 'border-green-500 bg-green-500 text-white scale-100 shadow-lg' : 'border-slate-300 scale-0'"
          >
            1
          </div>
        </div>
        <div 
          class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium transition-all duration-500 whitespace-nowrap"
          :class="instanceCreated ? 'opacity-100 text-green-600' : 'opacity-0'"
        >
          ✓ 唯一实例
        </div>
      </div>
      
      <!-- 返回箭头 -->
      <div class="flex flex-col gap-4">
        <div 
          v-for="i in 3" 
          :key="i"
          class="w-20 h-16 flex items-center justify-center"
        >
          <svg 
            class="w-16 h-8 transition-all duration-500"
            :class="returnedClient === i ? 'opacity-100' : 'opacity-0'"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 64 32"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M60 16H12M12 16l8-8M12 16l8 8"
              class="text-green-500"
            />
          </svg>
        </div>
      </div>
      
      <!-- 实例引用 -->
      <div class="flex flex-col gap-4">
        <div 
          v-for="i in 3" 
          :key="i"
          class="w-24 h-16 rounded-lg flex items-center justify-center text-sm transition-all duration-500"
          :class="returnedClient === i ? 'bg-green-100 dark:bg-green-900/30 text-green-700 border border-green-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'"
        >
          <span v-if="returnedClient === i">instance</span>
          <span v-else>null</span>
        </div>
      </div>
    </div>
    
    <!-- 控制按钮 -->
    <button 
      @click="runAnimation"
      class="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:opacity-80 transition-all disabled:opacity-50"
      :disabled="isAnimating"
    >
      {{ isAnimating ? '演示运行中...' : '开始演示' }}
    </button>
    
    <!-- 说明 -->
    <div class="mt-8 text-center">
      <p class="text-sm text-slate-500 dark:text-slate-400 max-w-lg">
        <span v-if="!instanceCreated" class="text-slate-400">点击开始演示，观察三个客户端如何获取同一个实例</span>
        <span v-else class="text-green-600 font-medium">
          所有客户端获取的都是同一个实例，内存中只有一份对象
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSingletonAnimation } from '@/composables/usePatternAnimation';

const { isAnimating, instanceCreated, activeClient, returnedClient, runAnimation } = useSingletonAnimation();
</script>
