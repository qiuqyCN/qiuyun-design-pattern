import { ref, computed } from 'vue';
import type { LearningStatistics, DailyRecord } from '@/types/pattern';

const STORAGE_KEY = 'qiuyun-learning-stats';

// 默认统计状态
const defaultStats: LearningStatistics = {
  totalPatterns: 23,
  learnedPatterns: 0,
  completedPercentage: 0,
  streakDays: 0,
  longestStreak: 0,
  lastLearnedDate: '',
  totalLearningTime: 0,
  patternLearningTime: {},
  categoryProgress: {
    creational: { total: 5, learned: 0 },
    structural: { total: 7, learned: 0 },
    behavioral: { total: 11, learned: 0 },
  },
  recentLearned: [],
  dailyRecords: [],
};

// 从 localStorage 加载数据
function loadStats(): LearningStatistics {
  if (typeof window === 'undefined') return defaultStats;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return { ...defaultStats, ...JSON.parse(stored) };
    } catch {
      return defaultStats;
    }
  }
  return defaultStats;
}

// 保存到 localStorage
function saveStats(stats: LearningStatistics) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

// 检查是否是同一天
function isSameDay(date1: string, date2: string): boolean {
  return date1 === date2;
}

// 获取今天的日期字符串
function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

// 获取昨天日期字符串
function getYesterday(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

export function useLearningStats() {
  const stats = ref<LearningStatistics>(loadStats());

  // 计算属性
  const isLearned = computed(() => (patternId: string) => {
    return stats.value.recentLearned.includes(patternId);
  });

  const todayLearned = computed(() => {
    const today = getToday();
    const todayRecord = stats.value.dailyRecords.find(r => r.date === today);
    return todayRecord?.patternsLearned.length || 0;
  });

  // 标记模式为已学习
  function markAsLearned(patternId: string, category: 'creational' | 'structural' | 'behavioral') {
    const today = getToday();
    
    // 如果已经学习过，不重复计算
    if (stats.value.recentLearned.includes(patternId)) {
      return;
    }

    // 更新最近学习列表
    stats.value.recentLearned.unshift(patternId);
    if (stats.value.recentLearned.length > 10) {
      stats.value.recentLearned = stats.value.recentLearned.slice(0, 10);
    }

    // 更新分类进度
    stats.value.categoryProgress[category].learned++;

    // 更新总学习数
    stats.value.learnedPatterns = stats.value.recentLearned.length;
    stats.value.completedPercentage = Math.round(
      (stats.value.learnedPatterns / stats.value.totalPatterns) * 100
    );

    // 更新每日记录
    let todayRecord = stats.value.dailyRecords.find(r => r.date === today);
    if (!todayRecord) {
      todayRecord = { date: today, patternsLearned: [], learningTime: 0 };
      stats.value.dailyRecords.push(todayRecord);
    }
    todayRecord.patternsLearned.push(patternId);

    // 更新连续学习天数
    updateStreak(today);

    // 更新最后学习日期
    stats.value.lastLearnedDate = today;

    saveStats(stats.value);
  }

  // 更新连续学习天数
  function updateStreak(today: string) {
    const lastDate = stats.value.lastLearnedDate;
    
    if (!lastDate) {
      stats.value.streakDays = 1;
    } else if (isSameDay(lastDate, today)) {
      // 同一天，不增加
      return;
    } else if (lastDate === getYesterday()) {
      // 昨天学习过，连续天数+1
      stats.value.streakDays++;
    } else {
      // 中断过，重新计算
      stats.value.streakDays = 1;
    }

    // 更新最长连续记录
    if (stats.value.streakDays > stats.value.longestStreak) {
      stats.value.longestStreak = stats.value.streakDays;
    }
  }

  // 记录学习时长
  function recordLearningTime(patternId: string, minutes: number) {
    stats.value.totalLearningTime += minutes;
    
    if (!stats.value.patternLearningTime[patternId]) {
      stats.value.patternLearningTime[patternId] = 0;
    }
    stats.value.patternLearningTime[patternId] += minutes;

    // 更新今日记录的学习时长
    const today = getToday();
    const todayRecord = stats.value.dailyRecords.find(r => r.date === today);
    if (todayRecord) {
      todayRecord.learningTime += minutes;
    }

    saveStats(stats.value);
  }

  // 获取学习热力图数据
  function getHeatmapData(days: number = 365): Array<{ date: string; count: number }> {
    const result = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const record = stats.value.dailyRecords.find(r => r.date === dateStr);
      result.push({
        date: dateStr,
        count: record?.patternsLearned.length || 0,
      });
    }
    
    return result;
  }

  // 导出数据
  function exportData(): string {
    return JSON.stringify(stats.value, null, 2);
  }

  // 导入数据
  function importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      stats.value = { ...defaultStats, ...data };
      saveStats(stats.value);
      return true;
    } catch {
      return false;
    }
  }

  // 重置数据
  function resetData() {
    stats.value = { ...defaultStats };
    saveStats(stats.value);
  }

  return {
    stats,
    isLearned,
    todayLearned,
    markAsLearned,
    recordLearningTime,
    getHeatmapData,
    exportData,
    importData,
    resetData,
  };
}
