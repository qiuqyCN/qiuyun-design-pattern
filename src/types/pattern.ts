// 设计模式分类
export type PatternCategory = 'creational' | 'structural' | 'behavioral';

// 难度等级
export type Difficulty = 'easy' | 'medium' | 'hard';

// 使用频率
export type Frequency = 'high' | 'medium' | 'low';

// 设计模式数据接口
export interface DesignPattern {
  id: string;
  name: string;
  nameEn: string;
  category: PatternCategory;
  difficulty: Difficulty;
  frequency: Frequency;
  intent: string;
  description: string;
  applicability: string[];
  pros: string[];
  cons: string[];
  analogy: {
    title: string;
    description: string;
    scenarios: AnalogyScenario[];
  };
  structure: {
    classDiagram: string;
    mermaidDiagram?: string;
    animationSteps: AnimationStep[];
  };
  implementation: {
    typescript: string;
    java?: string;
    go?: string;
    python?: string;
    cpp?: string;
  };
  realWorldExamples: RealWorldExample[];
  relatedPatterns: string[];
  quiz: QuizQuestion[];
}

// 生活类比场景
export interface AnalogyScenario {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// 动画步骤
export interface AnimationStep {
  id: string;
  title: string;
  description: string;
  duration: number;
  elements: AnimatedElement[];
  connections?: Connection[];
}

// 动画元素
export interface AnimatedElement {
  id: string;
  type: 'class' | 'interface' | 'abstract';
  name: string;
  properties?: string[];
  methods?: string[];
  x: number;
  y: number;
}

// 连接关系
export interface Connection {
  from: string;
  to: string;
  type: 'inheritance' | 'implementation' | 'association' | 'dependency' | 'composition' | 'aggregation';
  label?: string;
}

// 实际应用案例
export interface RealWorldExample {
  title: string;
  description: string;
  source: string;
  codeSnippet?: string;
}

// 测验题目
export interface QuizQuestion {
  id: string;
  type: 'single' | 'multiple' | 'boolean';
  question: string;
  options: string[];
  correctAnswer: number | number[];
  explanation: string;
}

// 学习统计
export interface LearningStatistics {
  totalPatterns: number;
  learnedPatterns: number;
  completedPercentage: number;
  streakDays: number;
  longestStreak: number;
  lastLearnedDate: string;
  totalLearningTime: number;
  patternLearningTime: Record<string, number>;
  categoryProgress: {
    creational: { total: number; learned: number };
    structural: { total: number; learned: number };
    behavioral: { total: number; learned: number };
  };
  recentLearned: string[];
  dailyRecords: DailyRecord[];
}

// 每日学习记录
export interface DailyRecord {
  date: string;
  patternsLearned: string[];
  learningTime: number;
}

// 分类配置
export interface CategoryConfig {
  id: PatternCategory;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  color: string;
  count: number;
}
