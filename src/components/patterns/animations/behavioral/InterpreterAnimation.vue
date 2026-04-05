<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">为语言创建解释器</div>
    
    <div class="flex items-start gap-8">
      <!-- 表达式输入 -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-slate-400 mb-2 font-medium">输入表达式</div>
        <div class="flex gap-2 mb-4">
          <button 
            v-for="token in ['1', '+', '2', '*', '3']" 
            :key="token"
            @click="addInterpreterToken(token)"
            class="w-10 h-10 border rounded-lg text-lg transition-all duration-300 hover:bg-slate-50"
            :class="interpreterExpression.includes(token) ? 'border-blue-400 bg-blue-50' : 'border-slate-300'"
          >
            {{ token }}
          </button>
        </div>
        <div class="w-48 h-12 border-2 border-slate-400 rounded-lg flex items-center justify-center bg-slate-50 dark:bg-slate-800 mb-4">
          <span class="text-lg font-mono">{{ interpreterExpression || '...' }}</span>
        </div>
        <button 
          @click="clearInterpreter"
          class="text-xs text-slate-400 hover:text-slate-600"
        >
          清空
        </button>
      </div>
      
      <!-- 语法树 -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-slate-400 mb-2 font-medium">语法树</div>
        <div v-if="interpreterExpression" class="flex flex-col items-center animate-fade-in">
          <div class="w-20 h-10 border-2 border-green-400 rounded-lg flex items-center justify-center text-sm bg-green-50 text-green-700">
            +
          </div>
          <div class="flex gap-4 mt-2">
            <div class="w-16 h-10 border rounded-lg flex items-center justify-center text-sm bg-slate-100">1</div>
            <div class="w-16 h-10 border-2 border-blue-400 rounded-lg flex items-center justify-center text-sm bg-blue-50 text-blue-700">
              *
            </div>
          </div>
          <div class="flex gap-4 mt-2 ml-16">
            <div class="w-14 h-8 border rounded-lg flex items-center justify-center text-xs bg-slate-100">2</div>
            <div class="w-14 h-8 border rounded-lg flex items-center justify-center text-xs bg-slate-100">3</div>
          </div>
        </div>
        <div v-else class="w-32 h-32 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center">
          <span class="text-xs text-slate-400">等待输入</span>
        </div>
      </div>
      
      <!-- 解释执行 -->
      <div class="flex flex-col items-center pt-8">
        <button 
          @click="interpretExpression"
          class="px-6 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          :disabled="!interpreterExpression || isInterpreting"
        >
          {{ isInterpreting ? '解释中...' : '解释执行' }}
        </button>
        <div 
          v-if="interpreterResult !== null"
          class="mt-4 w-24 h-24 border-2 border-green-500 rounded-xl flex flex-col items-center justify-center bg-green-50 animate-pop-in"
        >
          <span class="text-xs text-slate-500">结果</span>
          <span class="text-3xl font-bold text-green-600">{{ interpreterResult }}</span>
        </div>
      </div>
    </div>
    
    <!-- 说明 -->
    <div class="mt-6 text-center text-sm max-w-md">
      <p class="text-slate-500">
        输入表达式，解释器将其解析为语法树并计算结果
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInterpreterAnimation } from '@/composables/usePatternAnimation';

const { interpreterExpression, isInterpreting, interpreterResult, addInterpreterToken, clearInterpreter, interpretExpression } = useInterpreterAnimation();
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

@keyframes pop-in {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}
.animate-pop-in {
  animation: pop-in 0.3s ease-out;
}
</style>
