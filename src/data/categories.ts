import type { CategoryConfig } from '@/types/pattern';

export const categories: CategoryConfig[] = [
  {
    id: 'creational',
    name: '创建型模式',
    nameEn: 'Creational Patterns',
    icon: 'Building2',
    description: '关注对象的创建机制，帮助系统独立于对象的创建、组合和表示',
    color: '#3B82F6', // 蓝色
    count: 5,
  },
  {
    id: 'structural',
    name: '结构型模式',
    nameEn: 'Structural Patterns',
    icon: 'Puzzle',
    description: '关注类和对象的组合，形成更大的结构同时保持灵活性',
    color: '#10B981', // 绿色
    count: 7,
  },
  {
    id: 'behavioral',
    name: '行为型模式',
    nameEn: 'Behavioral Patterns',
    icon: 'Theater',
    description: '关注对象之间的通信和职责分配，定义对象间的交互方式',
    color: '#8B5CF6', // 紫色
    count: 11,
  },
];

export const categoryNames: Record<string, string> = {
  creational: '创建型',
  structural: '结构型',
  behavioral: '行为型',
};

export const difficultyLabels: Record<string, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
};

export const frequencyLabels: Record<string, string> = {
  high: '高频',
  medium: '中频',
  low: '低频',
};
