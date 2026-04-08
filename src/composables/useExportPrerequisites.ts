import { prerequisiteSections } from '@/data/prerequisites';

export function useExportPrerequisites() {
  function generateMarkdown(): string {
    const lines: string[] = [];
    
    // 标题
    lines.push('# 设计模式前置知识');
    lines.push('');
    lines.push('> 学习设计模式前需要掌握的基础知识');
    lines.push('');
    
    prerequisiteSections.forEach((section, index) => {
      // 章节标题
      lines.push(`## ${index + 1}. ${section.title}`);
      lines.push('');
      lines.push(section.content);
      lines.push('');
      
      // 子章节
      if (section.subsections) {
        section.subsections.forEach((subsection, subIndex) => {
          lines.push(`### ${subsection.title}`);
          lines.push('');
          lines.push(subsection.content);
          lines.push('');
          
          if (subsection.code) {
            lines.push('```java');
            lines.push(subsection.code);
            lines.push('```');
            lines.push('');
          }
          
          if (subsection.mermaid) {
            lines.push('```mermaid');
            lines.push(subsection.mermaid);
            lines.push('```');
            lines.push('');
          }
        });
      }
      
      if (index < prerequisiteSections.length - 1) {
        lines.push('---');
        lines.push('');
      }
    });
    
    return lines.join('\n');
  }

  async function copyToClipboard(): Promise<void> {
    const markdown = generateMarkdown();
    await navigator.clipboard.writeText(markdown);
  }

  function downloadAsFile(): void {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prerequisites.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return {
    generateMarkdown,
    copyToClipboard,
    downloadAsFile,
  };
}
