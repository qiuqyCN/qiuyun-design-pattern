<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">定义算法骨架，子类实现步骤</div>
    
    <div class="flex items-start gap-8">
      <!-- 算法选择 -->
      <div class="flex flex-col gap-3">
        <div class="text-xs text-slate-400 text-center font-medium">选择算法</div>
        <button 
          v-for="algo in ['DataMinerPDF', 'DataMinerCSV']" 
          :key="algo"
          @click="selectTemplateAlgorithm(algo)"
          class="w-36 h-14 border-2 rounded-lg text-sm transition-all duration-300"
          :class="selectedTemplateAlgo === algo ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg' : 'border-slate-300 hover:border-slate-400 bg-white dark:bg-slate-800'"
        >
          {{ algo }}
        </button>
      </div>
      
      <!-- 算法步骤 -->
      <div class="flex flex-col gap-2">
        <div class="text-xs text-slate-400 text-center font-medium">算法步骤</div>
        <div 
          v-for="(step, index) in templateSteps" 
          :key="step"
          class="w-48 h-10 rounded-lg flex items-center px-4 text-sm transition-all duration-500 border-2"
          :class="templateStepIndex > index ? 'border-green-400 bg-green-50 text-green-700' : 
                  templateStepIndex === index && isTemplateRunning ? 'border-blue-400 bg-blue-50 text-blue-700' :
                  'border-slate-200 bg-slate-100 text-slate-400'"
        >
          <span class="mr-2">{{ templateStepIndex > index ? '✓' : templateStepIndex === index && isTemplateRunning ? '▶' : '○' }}</span>
          {{ step }}
          <span v-if="step === 'parseFile()' && selectedTemplateAlgo" class="ml-auto text-xs text-slate-400">
            {{ selectedTemplateAlgo === 'DataMinerPDF' ? 'PDF' : 'CSV' }}
          </span>
        </div>
      </div>
      
      <!-- 控制 -->
      <div class="flex flex-col items-center pt-8">
        <button 
          @click="runTemplateMethod"
          class="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:opacity-80 transition-all disabled:opacity-50"
          :disabled="!selectedTemplateAlgo || isTemplateRunning"
        >
          {{ isTemplateRunning ? '执行中...' : '执行算法' }}
        </button>
        <button 
          @click="resetTemplate"
          class="mt-2 text-xs text-slate-400 hover:text-slate-600"
        >
          重置
        </button>
      </div>
    </div>
    
    <!-- 说明 -->
    <div class="mt-6 text-center text-sm max-w-md">
      <p v-if="!selectedTemplateAlgo" class="text-slate-400">
        选择算法，观察模板方法如何定义骨架，具体步骤由子类实现
      </p>
      <p v-else class="text-slate-500">
        parseFile() 是抽象方法，由 {{ selectedTemplateAlgo }} 具体实现
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTemplateMethodAnimation } from '@/composables/usePatternAnimation';

const { selectedTemplateAlgo, templateSteps, templateStepIndex, isTemplateRunning, selectTemplateAlgorithm, runTemplateMethod, resetTemplate } = useTemplateMethodAnimation();
</script>
