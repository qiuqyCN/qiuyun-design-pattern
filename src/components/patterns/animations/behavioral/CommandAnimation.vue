<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">将请求封装为对象</div>
    
    <div class="flex items-start gap-8">
      <!-- 调用者 -->
      <div class="flex flex-col items-center">
        <div class="w-28 h-20 border-2 border-slate-600 rounded-xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800">
          <span class="text-sm font-bold">Invoker</span>
          <span class="text-xs text-slate-400">Remote</span>
        </div>
      </div>
      
      <!-- 命令队列 -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-slate-400 mb-2 font-medium">命令队列</div>
        <div class="flex flex-col gap-2 mb-4">
          <div 
            v-for="(cmd, index) in commandQueue" 
            :key="index"
            class="w-32 h-10 border rounded-lg flex items-center justify-center text-xs transition-all duration-300"
            :class="currentCommandIndex === index ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-300 bg-white dark:bg-slate-800'"
          >
            {{ cmd }}
          </div>
        </div>
        <div class="flex gap-2">
          <button 
            v-for="cmd in ['LightOn', 'LightOff', 'FanOn']" 
            :key="cmd"
            @click="addCommand(cmd)"
            class="px-3 py-1 border rounded text-xs hover:bg-slate-50 transition-colors"
            :disabled="commandQueue.length >= 4"
          >
            +{{ cmd }}
          </button>
        </div>
      </div>
      
      <!-- 执行 -->
      <div class="flex flex-col items-center pt-8">
        <button 
          @click="executeCommands"
          class="px-6 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors disabled:opacity-50"
          :disabled="isExecutingCommands || commandQueue.length === 0"
        >
          {{ isExecutingCommands ? '执行中...' : '执行全部' }}
        </button>
        <button 
          @click="clearCommands"
          class="mt-2 text-xs text-slate-400 hover:text-slate-600"
        >
          清空队列
        </button>
      </div>
      
      <!-- 接收者 -->
      <div class="w-32 h-32 border-2 border-slate-400 rounded-xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800">
        <span class="text-xs text-slate-400 mb-2">Receiver</span>
        <div class="text-3xl transition-all duration-300">
          {{ receiverState === 'on' ? '💡' : receiverState === 'fan' ? '🌀' : '⚫' }}
        </div>
        <span class="text-xs mt-2" :class="receiverState !== 'off' ? 'text-green-600' : 'text-slate-400'">
          {{ receiverState === 'on' ? 'Light ON' : receiverState === 'fan' ? 'Fan ON' : 'OFF' }}
        </span>
      </div>
    </div>
    
    <!-- 说明 -->
    <div class="mt-6 text-center text-sm max-w-md">
      <p class="text-slate-500">
        添加命令到队列，然后执行。命令模式将请求的发送者和接收者解耦。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommandAnimation } from '@/composables/usePatternAnimation';

const { commandQueue, currentCommandIndex, isExecutingCommands, receiverState, addCommand, executeCommands, clearCommands } = useCommandAnimation();
</script>
