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
      <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
        {{ section.content }}
      </p>

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
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            {{ subsection.content }}
          </p>

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
</script>
