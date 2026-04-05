<template>
  <div class="space-y-16">
    <!-- 概述 -->
    <section id="overview">
      <h2 class="text-2xl font-light text-slate-900 dark:text-white mb-6">概述</h2>
      <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
        {{ pattern.description }}
      </p>
      
      <!-- 适用场景 -->
      <div class="mb-8">
        <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-4">适用场景</h3>
        <ul class="space-y-2">
          <li v-for="(item, index) in pattern.applicability" :key="index" class="flex items-start gap-3 text-slate-600 dark:text-slate-400">
            <span class="text-slate-400 mt-1">•</span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>

      <!-- 优缺点 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-4">优点</h3>
          <ul class="space-y-2">
            <li v-for="(item, index) in pattern.pros" :key="index" class="flex items-start gap-3 text-slate-600 dark:text-slate-400">
              <span class="text-green-500 mt-1">+</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-4">缺点</h3>
          <ul class="space-y-2">
            <li v-for="(item, index) in pattern.cons" :key="index" class="flex items-start gap-3 text-slate-600 dark:text-slate-400">
              <span class="text-orange-500 mt-1">−</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 结构 -->
    <section id="structure" class="pt-8 border-t border-slate-100 dark:border-slate-800">
      <h2 class="text-2xl font-light text-slate-900 dark:text-white mb-6">结构</h2>
      <ClassDiagram :pattern-id="pattern.id" :mermaid-diagram="pattern.structure.mermaidDiagram" />
    </section>

    <!-- 交互演示 -->
    <section id="animation" class="pt-8 border-t border-slate-100 dark:border-slate-800">
      <h2 class="text-2xl font-light text-slate-900 dark:text-white mb-6">交互演示</h2>
      <PatternAnimation :pattern-id="pattern.id" />
    </section>

    <!-- 生活类比 -->
    <section id="analogy" class="pt-8 border-t border-slate-100 dark:border-slate-800">
      <h2 class="text-2xl font-light text-slate-900 dark:text-white mb-6">生活类比</h2>
      <p class="text-slate-600 dark:text-slate-400 mb-6">{{ pattern.analogy.description }}</p>
      <div class="space-y-4">
        <div v-for="scenario in pattern.analogy.scenarios" :key="scenario.id" class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg">
          <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-2">{{ scenario.title }}</h3>
          <p class="text-slate-600 dark:text-slate-400">{{ scenario.description }}</p>
        </div>
      </div>
    </section>

    <!-- 代码实现 -->
    <section id="implementation" class="pt-8 border-t border-slate-100 dark:border-slate-800">
      <h2 class="text-2xl font-light text-slate-900 dark:text-white mb-6">代码实现</h2>
      
      <!-- 语言切换 -->
      <div class="flex gap-2 mb-6">
        <button
          v-for="lang in languages"
          :key="lang.id"
          @click="currentLanguage = lang.id"
          class="px-4 py-2 text-sm border transition-colors"
          :class="currentLanguage === lang.id 
            ? 'border-slate-900 dark:border-white bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500'"
        >
          {{ lang.name }}
        </button>
      </div>

      <!-- 代码展示 - 使用 CodeBlock 组件 -->
      <CodeBlock :key="currentLanguage" :code="currentCode" :language="currentLanguage" />
    </section>

    <!-- 实际应用 -->
    <section id="examples" class="pt-8 border-t border-slate-100 dark:border-slate-800">
      <h2 class="text-2xl font-light text-slate-900 dark:text-white mb-6">实际应用</h2>
      <div class="space-y-6">
        <div v-for="(example, index) in pattern.realWorldExamples" :key="index" class="border-l-2 border-slate-200 dark:border-slate-700 pl-6">
          <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-2">{{ example.title }}</h3>
          <p class="text-slate-600 dark:text-slate-400 mb-3">{{ example.description }}</p>
          <div v-if="example.codeSnippet" class="mt-4">
            <CodeBlock :code="example.codeSnippet" language="java" />
          </div>
        </div>
      </div>
    </section>

    <!-- 练习 -->
    <section id="quiz" class="pt-8 border-t border-slate-100 dark:border-slate-800">
      <h2 class="text-2xl font-light text-slate-900 dark:text-white mb-6">练习</h2>
      <div class="space-y-8">
        <div v-for="(question, index) in pattern.quiz" :key="question.id" class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg">
          <div class="flex items-start gap-4 mb-4">
            <span class="text-sm text-slate-400">{{ index + 1 }}</span>
            <h3 class="text-lg font-medium text-slate-900 dark:text-white">{{ question.question }}</h3>
          </div>
          <div class="space-y-2 ml-8">
            <button
              v-for="(option, optIndex) in question.options"
              :key="optIndex"
              @click="selectAnswer(question.id, optIndex)"
              class="w-full text-left px-4 py-3 border transition-colors"
              :class="getOptionClass(question.id, optIndex)"
            >
              {{ option }}
            </button>
          </div>
          <div v-if="showExplanation[question.id]" class="mt-4 ml-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p class="text-sm text-slate-600 dark:text-slate-400">{{ question.explanation }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 相关模式 -->
    <section id="related" class="pt-8 border-t border-slate-100 dark:border-slate-800">
      <h2 class="text-2xl font-light text-slate-900 dark:text-white mb-6">相关模式</h2>
      <div class="flex flex-wrap gap-3">
        <a
          v-for="relatedId in pattern.relatedPatterns"
          :key="relatedId"
          :href="`/patterns/${relatedId}`"
          class="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          {{ getPatternName(relatedId) }}
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { DesignPattern } from '@/types/pattern';
import { patternNames } from '@/data/patterns';
import CodeBlock from './CodeBlock.vue';
import ClassDiagram from './ClassDiagram.vue';
import PatternAnimation from './PatternAnimation.vue';

const props = defineProps<{
  pattern: DesignPattern;
}>();

const languages = [
  { id: 'java', name: 'Java' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'go', name: 'Go' },
  { id: 'python', name: 'Python' },
  { id: 'cpp', name: 'C++' },
];

const currentLanguage = ref('java');

const currentCode = computed(() => {
  const impl = props.pattern.implementation;
  switch (currentLanguage.value) {
    case 'typescript': return impl.typescript;
    case 'java': return impl.java || '// Java 实现暂未提供';
    case 'go': return impl.go || '// Go 实现暂未提供';
    case 'python': return impl.python || '// Python 实现暂未提供';
    case 'cpp': return impl.cpp || '// C++ 实现暂未提供';
    default: return impl.typescript;
  }
});

// 测验状态
const selectedAnswers = ref<Record<string, number>>({});
const showExplanation = ref<Record<string, boolean>>({});

function selectAnswer(questionId: string, optionIndex: number) {
  selectedAnswers.value[questionId] = optionIndex;
  showExplanation.value[questionId] = true;
}

function getOptionClass(questionId: string, optionIndex: number): string {
  const selected = selectedAnswers.value[questionId];
  if (selected === undefined) {
    return 'border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500';
  }
  
  const question = props.pattern.quiz.find(q => q.id === questionId);
  if (!question) return '';
  
  const isCorrect = optionIndex === question.correctAnswer;
  const isSelected = optionIndex === selected;
  
  if (isSelected && isCorrect) {
    return 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
  } else if (isSelected && !isCorrect) {
    return 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
  } else if (isCorrect) {
    return 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
  }
  
  return 'border-slate-200 dark:border-slate-700 opacity-50';
}

function getPatternName(id: string): string {
  return patternNames[id] || id;
}
</script>
