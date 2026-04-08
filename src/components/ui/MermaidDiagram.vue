<template>
  <div ref="mermaidContainer" class="mermaid-diagram my-4">
    <pre class="mermaid">{{ code }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  code: string;
}>();

const mermaidContainer = ref<HTMLDivElement>();

onMounted(async () => {
  if (typeof window !== 'undefined') {
    const mermaid = await import('mermaid');
    mermaid.default.initialize({
      startOnLoad: false,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
      securityLevel: 'loose',
    });
    
    if (mermaidContainer.value) {
      const element = mermaidContainer.value.querySelector('.mermaid');
      if (element) {
        await mermaid.default.run({ nodes: [element as HTMLElement] });
      }
    }
  }
});
</script>

<style scoped>
.mermaid-diagram {
  overflow-x: auto;
}

.mermaid-diagram :deep(svg) {
  max-width: 100%;
  height: auto;
}
</style>
