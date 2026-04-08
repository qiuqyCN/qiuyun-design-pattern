import type { DesignPattern } from '@/types/pattern';
import { categoryNames, difficultyLabels, frequencyLabels } from '@/data/categories';

export function useExportMarkdown(pattern: DesignPattern) {
  function generateMarkdown(): string {
    const sections = [
      generateHeader(),
      generateOverview(),
      generateStructure(),
      generateAnalogy(),
      generateImplementation(),
      generateExamples(),
      generateRelatedPatterns(),
    ];
    return sections.filter(Boolean).join('\n\n---\n\n');
  }

  function generateHeader(): string {
    const lines = [
      `# ${pattern.name} (${pattern.nameEn})`,
      '',
      `> ${pattern.intent}`,
      '',
      `**分类**：${categoryNames[pattern.category] || pattern.category}`,
      `**难度**：${difficultyLabels[pattern.difficulty] || pattern.difficulty}`,
      `**使用频率**：${frequencyLabels[pattern.frequency] || pattern.frequency}`,
    ];
    return lines.join('\n');
  }

  function generateOverview(): string {
    const lines = [
      '## 概述',
      '',
      pattern.description,
    ];

    if (pattern.applicability && pattern.applicability.length > 0) {
      lines.push('', '### 适用场景', '');
      pattern.applicability.forEach(item => {
        lines.push(`- ${item}`);
      });
    }

    if (pattern.pros && pattern.pros.length > 0) {
      lines.push('', '### 优点', '');
      pattern.pros.forEach(pro => {
        lines.push(`- ${pro}`);
      });
    }

    if (pattern.cons && pattern.cons.length > 0) {
      lines.push('', '### 缺点', '');
      pattern.cons.forEach(con => {
        lines.push(`- ${con}`);
      });
    }

    return lines.join('\n');
  }

  function generateStructure(): string {
    const lines = ['## 结构'];

    if (pattern.structure) {
      // 添加类图（优先使用mermaidDiagram，如果没有则使用classDiagram）
      const diagram = pattern.structure.mermaidDiagram || pattern.structure.classDiagram;
      if (diagram) {
        lines.push('', '### 类图', '', '```mermaid', diagram.trim(), '```');
      }

      // 添加核心角色说明
      if (pattern.structure.animationSteps && pattern.structure.animationSteps.length > 0) {
        lines.push('', '### 核心角色', '');
        pattern.structure.animationSteps.forEach((step, index) => {
          lines.push(`${index + 1}. **${step.title}**：${step.description}`);
        });
      }
    }

    return lines.join('\n');
  }

  function generateAnalogy(): string {
    if (!pattern.analogy) return '';

    const lines = [
      '## 生活类比',
      '',
      `### ${pattern.analogy.title}`,
      '',
      pattern.analogy.description,
    ];

    if (pattern.analogy.scenarios && pattern.analogy.scenarios.length > 0) {
      lines.push('', '**场景示例**：', '');
      pattern.analogy.scenarios.forEach(scenario => {
        lines.push(`- **${scenario.title}**：${scenario.description}`);
      });
    }

    return lines.join('\n');
  }

  function generateImplementation(): string {
    const lines = ['## 代码实现'];
    const impl = pattern.implementation;

    // if (impl.typescript) {
    //   lines.push('', '### TypeScript', '', '```typescript', impl.typescript, '```');
    // }
    if (impl.java) {
      lines.push('', '### Java', '', '```java', impl.java, '```');
    }
    // if (impl.python) {
    //   lines.push('', '### Python', '', '```python', impl.python, '```');
    // }
    // if (impl.go) {
    //   lines.push('', '### Go', '', '```go', impl.go, '```');
    // }
    // if (impl.cpp) {
    //   lines.push('', '### C++', '', '```cpp', impl.cpp, '```');
    // }

    return lines.join('\n');
  }

  function generateExamples(): string {
    if (!pattern.realWorldExamples || pattern.realWorldExamples.length === 0) return '';

    const lines = ['## 实际应用', ''];

    pattern.realWorldExamples.forEach((example, index) => {
      lines.push(`### ${index + 1}. ${example.title}`);
      lines.push('', example.description);
      if (example.source) {
        lines.push('', `> 来源：${example.source}`);
      }
      if (example.codeSnippet) {
        lines.push('', '```', example.codeSnippet, '```');
      }
      lines.push('');
    });

    return lines.join('\n').trim();
  }

  function generateRelatedPatterns(): string {
    if (!pattern.relatedPatterns || pattern.relatedPatterns.length === 0) return '';

    const lines = ['## 相关模式', ''];
    pattern.relatedPatterns.forEach(id => {
      lines.push(`- [${id}](https://patterns.qiuyun.dev/patterns/${id})`);
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
    a.download = `${pattern.id}.md`;
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
