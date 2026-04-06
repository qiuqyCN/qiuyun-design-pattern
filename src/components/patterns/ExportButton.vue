<template>
  <div class="flex items-center gap-2">
    <!-- 复制按钮 -->
    <button
      @click="handleCopy"
      :disabled="copied"
      class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
      :title="copied ? '已复制' : '复制 Markdown'"
    >
      <svg v-if="!copied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
      </svg>
      <svg v-else class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"/>
      </svg>
    </button>

    <!-- 下载按钮 -->
    <button
      @click="handleDownload"
      class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
      title="下载 Markdown"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DesignPattern } from '@/types/pattern';
import { useExportMarkdown } from '@/composables/useExportMarkdown';

const props = defineProps<{
  pattern: DesignPattern;
}>();

const copied = ref(false);
const { copyToClipboard, downloadAsFile } = useExportMarkdown(props.pattern);

async function handleCopy() {
  try {
    await copyToClipboard();
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (error) {
    console.error('复制失败:', error);
    alert('复制失败，请手动复制');
  }
}

function handleDownload() {
  try {
    downloadAsFile();
  } catch (error) {
    console.error('下载失败:', error);
    alert('下载失败');
  }
}
</script>
