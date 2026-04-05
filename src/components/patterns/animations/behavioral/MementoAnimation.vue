<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">捕获和恢复对象状态</div>
    
    <div class="flex items-start gap-8">
      <!-- 原发器 -->
      <div class="flex flex-col items-center">
        <div class="w-36 h-32 border-2 border-slate-600 rounded-xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800">
          <span class="text-sm font-bold">Originator</span>
          <span class="text-xs text-slate-400 mt-1">TextEditor</span>
          <div class="mt-3 px-4 py-2 bg-white dark:bg-slate-700 rounded border text-sm">
            "{{ editorContent }}"
          </div>
        </div>
        <div class="mt-4 flex gap-2">
          <button 
            @click="editContent"
            class="px-4 py-2 border rounded-lg text-sm hover:bg-slate-50 transition-colors"
          >
            编辑内容
          </button>
        </div>
      </div>
      
      <!-- 操作 -->
      <div class="flex flex-col items-center pt-8">
        <button 
          @click="saveMemento"
          class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors mb-3"
        >
          💾 保存状态
        </button>
        <button 
          @click="restoreMemento"
          class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors disabled:opacity-50"
          :disabled="mementos.length === 0"
        >
          ↩️ 恢复状态
        </button>
      </div>
      
      <!-- 备忘录列表 -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-slate-400 mb-2 font-medium">备忘录历史</div>
        <div class="flex flex-col gap-2 max-h-40 overflow-y-auto">
          <div 
            v-for="(mem, index) in mementos" 
            :key="index"
            class="w-32 h-10 border rounded-lg flex items-center justify-center text-xs transition-all duration-300"
            :class="currentMementoIndex === index ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-300 bg-white dark:bg-slate-800'"
          >
            {{ mem }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- 说明 -->
    <div class="mt-6 text-center text-sm max-w-md">
      <p class="text-slate-500">
        编辑内容后保存状态，可以随时恢复到之前的状态
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMementoAnimation } from '@/composables/usePatternAnimation';

const { editorContent, mementos, currentMementoIndex, editContent, saveMemento, restoreMemento } = useMementoAnimation();
</script>
