<template>
  <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          推荐学习路径
        </h2>
        <p class="text-slate-600 dark:text-slate-400">
          按照科学的顺序学习，循序渐进掌握设计模式
        </p>
      </div>

      <!-- 学习路径时间线 -->
      <div class="relative">
        <!-- 桌面端连接线 -->
        <div class="absolute top-6 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 hidden md:block" style="margin: 0 3rem;"></div>

        <!-- 路径节点 -->
        <div class="flex flex-col md:flex-row items-start md:items-start justify-between gap-4 md:gap-2">
          <!-- 开始节点 -->
          <div class="shrink-0 flex md:flex-col items-center gap-3 md:gap-4 md:w-20">
            <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold z-10 relative">
              <FlagIcon class="w-6 h-6" />
            </div>
            <div class="md:text-center">
              <div class="text-sm font-medium text-slate-600 dark:text-slate-400 md:hidden">开始</div>
            </div>
          </div>

          <!-- 模式节点 -->
          <template v-for="(patternId, index) in learningPath" :key="patternId">
            <div 
              class="shrink-0 flex md:flex-col items-center gap-3 md:gap-4 md:w-20 cursor-pointer group"
              @click="navigateToPattern(patternId)"
            >
              <div 
                class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold z-10 relative transition-all duration-300 group-hover:scale-110"
                :class="getNodeClass(patternId)"
              >
                <span v-if="isLearned(patternId)">
                  <CheckIcon class="w-6 h-6" />
                </span>
                <span v-else-if="isCurrent(patternId)">
                  <PlayIcon class="w-5 h-5 ml-0.5" />
                </span>
                <span v-else class="text-sm">{{ index + 1 }}</span>
              </div>
              <div class="md:text-center md:mt-2">
                <div class="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors leading-tight">
                  {{ getPatternName(patternId) }}
                </div>
                <div class="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                  {{ getPatternStatus(patternId) }}
                </div>
              </div>
            </div>
          </template>

          <!-- 目标节点 -->
          <div class="shrink-0 flex md:flex-col items-center gap-3 md:gap-4 md:w-20">
            <div class="w-12 h-12 rounded-full bg-linear-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white z-10 relative">
              <TrophyIcon class="w-6 h-6" />
            </div>
            <div class="md:text-center">
              <div class="text-sm font-medium text-slate-600 dark:text-slate-400 md:hidden">目标</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 查看完整路径按钮 -->
      <div class="mt-16 text-center">
        <a 
          href="/learning-path"
          class="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-full hover:shadow-lg transition-all duration-300"
        >
          <MapIcon class="w-5 h-5" />
          查看完整学习路径
          <ArrowRightIcon class="w-4 h-4" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Flag, Check, Play, Trophy, Map, ArrowRight } from 'lucide-vue-next';
import { useLearningStats } from '@/composables/useLearningStats';
import { patternNames } from '@/data/patterns';

const { stats, isLearned: checkLearned } = useLearningStats();

// 推荐学习路径（前7个作为示例）
const learningPath = [
  'singleton',
  'factory-method',
  'abstract-factory',
  'builder',
  'prototype',
  'adapter',
  'bridge',
];

// 获取节点样式
function getNodeClass(patternId: string) {
  if (isLearned(patternId)) {
    return 'bg-green-500';
  } else if (isCurrent(patternId)) {
    return 'bg-blue-500 animate-pulse';
  } else {
    return 'bg-slate-300 dark:bg-slate-600';
  }
}

// 检查是否已学习
function isLearned(patternId: string) {
  return checkLearned.value(patternId);
}

// 检查是否是当前推荐学习的
function isCurrent(patternId: string) {
  // 找到第一个未学习的模式
  const firstUnlearned = learningPath.find(id => !isLearned(id));
  return firstUnlearned === patternId;
}

// 获取模式名称
function getPatternName(patternId: string) {
  return patternNames[patternId] || patternId;
}

// 获取模式状态文本
function getPatternStatus(patternId: string) {
  if (isLearned(patternId)) {
    return '已完成';
  } else if (isCurrent(patternId)) {
    return '推荐学习';
  } else {
    return '待学习';
  }
}

function navigateToPattern(patternId: string) {
  window.location.href = `/patterns/${patternId}`;
}

const FlagIcon = Flag;
const CheckIcon = Check;
const PlayIcon = Play;
const TrophyIcon = Trophy;
const MapIcon = Map;
const ArrowRightIcon = ArrowRight;
</script>
