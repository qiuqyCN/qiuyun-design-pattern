import type { DesignPattern } from '@/types/pattern';
import { singletonPattern } from './singleton';

// 所有设计模式数据
export const patterns: DesignPattern[] = [
  singletonPattern,
  // 后续添加更多模式...
];

// 按分类获取模式
export function getPatternsByCategory(category: string): DesignPattern[] {
  return patterns.filter(p => p.category === category);
}

// 按ID获取模式
export function getPatternById(id: string): DesignPattern | undefined {
  return patterns.find(p => p.id === id);
}

// 获取热门模式（按使用频率）
export function getPopularPatterns(limit: number = 6): DesignPattern[] {
  const frequencyOrder = { high: 3, medium: 2, low: 1 };
  return [...patterns]
    .sort((a, b) => frequencyOrder[b.frequency] - frequencyOrder[a.frequency])
    .slice(0, limit);
}

// 搜索模式
export function searchPatterns(query: string): DesignPattern[] {
  const lowercaseQuery = query.toLowerCase();
  return patterns.filter(p => 
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.nameEn.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.intent.toLowerCase().includes(lowercaseQuery)
  );
}

// 按难度筛选
export function filterByDifficulty(difficulty: string): DesignPattern[] {
  return patterns.filter(p => p.difficulty === difficulty);
}

// 导出所有模式ID（用于学习路径）
export const patternIds = patterns.map(p => p.id);

// 导出模式名称映射
export const patternNames: Record<string, string> = patterns.reduce((acc, p) => {
  acc[p.id] = p.name;
  return acc;
}, {} as Record<string, string>);
