<template>
  <div class="space-y-16">
    <section
      v-for="section in sections"
      :key="section.id"
      :id="section.id"
      class="scroll-mt-32"
    >
      <h2 class="text-2xl font-light text-slate-900 dark:text-white mb-4">
        {{ section.title }}
      </h2>
      <div 
        class="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 prerequisite-content"
        v-html="renderMarkdown(section.content)"
      />

      <div
        v-if="section.subsections"
        class="space-y-8"
      >
        <div
          v-for="(subsection, index) in section.subsections"
          :key="index"
          class="border-l-2 border-slate-200 dark:border-slate-700 pl-6"
        >
          <h3 class="text-lg font-medium text-slate-800 dark:text-slate-200 mb-3">
            {{ subsection.title }}
          </h3>
          <div 
            class="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 prerequisite-content"
            v-html="renderMarkdown(subsection.content)"
          />

          <CodeBlock
            v-if="subsection.code"
            :code="subsection.code"
            :language="subsection.language || 'java'"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { PrerequisiteSection } from '@/data/prerequisites';
import CodeBlock from '@/components/patterns/CodeBlock.vue';

interface Props {
  sections: PrerequisiteSection[];
}

defineProps<Props>();

// 简单的 Markdown 渲染函数
function renderMarkdown(text: string): string {
  if (!text) return '';
  
  return text
    // 处理换行
    .replace(/\n/g, '<br>')
    // 处理粗体 **text**
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // 处理斜体 *text*
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // 处理行内代码 `code`
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-sm font-mono">$1</code>');
}
</script>

<style>
.prerequisite-content br {
  display: block;
  content: "";
  margin-top: 0.5rem;
}
</style>
