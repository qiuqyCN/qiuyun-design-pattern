<template>
  <div class="rounded-lg overflow-hidden bg-slate-900">
    <!-- 窗口标题栏 -->
    <div class="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
      <div class="flex items-center gap-2">
        <div class="flex gap-1.5">
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span class="ml-3 text-xs text-slate-400 font-mono">{{ filename }}</span>
      </div>
      <button 
        @click="copyCode"
        class="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <svg v-if="!copied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        {{ copied ? '已复制' : '复制' }}
      </button>
    </div>
    
    <!-- 代码内容 -->
    <div class="overflow-x-auto">
      <div class="p-4 text-sm" v-html="highlightedCode"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { codeToHtml } from 'shiki';

const props = defineProps<{
  code: string;
  language: string;
}>();

const highlightedCode = ref('');
const copied = ref(false);

const filename = computed(() => {
  const extMap: Record<string, string> = {
    typescript: 'example.ts',
    java: 'Example.java',
    go: 'example.go',
    python: 'example.py',
    cpp: 'example.cpp',
  };
  return extMap[props.language] || 'example.txt';
});

async function highlight() {
  try {
    highlightedCode.value = await codeToHtml(props.code, {
      lang: props.language === 'cpp' ? 'cpp' : props.language,
      theme: 'github-dark',
    });
  } catch (e) {
    // 如果语言不支持，使用纯文本
    highlightedCode.value = `<pre class="text-slate-300"><code>${escapeHtml(props.code)}</code></pre>`;
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function copyCode() {
  navigator.clipboard.writeText(props.code);
  copied.value = true;
  setTimeout(() => copied.value = false, 2000);
}

onMounted(() => {
  highlight();
});
</script>

<style scoped>
/* Shiki 主题覆盖 */
:deep(.shiki) {
  background: transparent !important;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

:deep(.shiki code) {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 13px;
  line-height: 1.6;
}
</style>
