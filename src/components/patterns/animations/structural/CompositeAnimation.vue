<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">统一处理单个对象和组合对象</div>
    
    <div class="flex items-start gap-10">
      <!-- 树形结构 -->
      <div class="flex flex-col items-center">
        <div 
          class="w-32 h-16 border-2 rounded-xl flex flex-col items-center justify-center mb-4 cursor-pointer transition-all duration-300"
          :class="selectedNode === 'root' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg' : 'border-slate-400 bg-slate-100 dark:bg-slate-800'"
          @click="selectNode('root')"
        >
          <span class="text-sm font-bold">📁 Root</span>
          <span class="text-xs text-slate-400">Composite</span>
        </div>
        
        <div class="flex gap-4">
          <div class="flex flex-col items-center">
            <div 
              class="w-28 h-14 border-2 rounded-lg flex items-center justify-center mb-3 cursor-pointer transition-all duration-300"
              :class="selectedNode === 'folder1' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg' : 'border-slate-400 bg-slate-100 dark:bg-slate-800'"
              @click="selectNode('folder1')"
            >
              <span class="text-sm">📁 Folder1</span>
            </div>
            <div class="flex gap-2">
              <div 
                v-for="file in ['file1', 'file2']" 
                :key="file"
                class="w-20 h-10 border rounded flex items-center justify-center text-xs cursor-pointer transition-all duration-300"
                :class="selectedNode === file ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-300 bg-white dark:bg-slate-800'"
                @click="selectNode(file)"
              >
                📄 {{ file }}
              </div>
            </div>
          </div>
          
          <div class="flex flex-col items-center">
            <div 
              class="w-28 h-14 border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300"
              :class="selectedNode === 'file3' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg' : 'border-slate-300 bg-slate-100 dark:bg-slate-800'"
              @click="selectNode('file3')"
            >
              <span class="text-sm">📄 File3</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 操作面板 -->
      <div class="w-48 flex flex-col gap-3">
        <div class="text-xs text-slate-400 text-center font-medium">统一操作</div>
        <button 
          @click="executeOperation('size')"
          class="px-4 py-2 border rounded-lg text-sm hover:bg-slate-50 transition-colors"
          :class="operationResult ? 'border-green-500 text-green-700' : 'border-slate-300'"
        >
          计算大小
        </button>
        <button 
          @click="executeOperation('display')"
          class="px-4 py-2 border rounded-lg text-sm hover:bg-slate-50 transition-colors"
          :class="operationResult ? 'border-green-500 text-green-700' : 'border-slate-300'"
        >
          显示结构
        </button>
        
        <div 
          v-if="operationResult"
          class="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm text-green-700 animate-fade-in"
        >
          {{ operationResult }}
        </div>
      </div>
    </div>
    
    <!-- 说明 -->
    <div class="mt-6 text-center text-sm max-w-md">
      <p class="text-slate-500">
        点击树中的节点，然后执行操作。组合模式让文件和文件夹可以被统一处理。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCompositeAnimation } from '@/composables/usePatternAnimation';

const { selectedNode, operationResult, selectNode, executeOperation } = useCompositeAnimation();
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
