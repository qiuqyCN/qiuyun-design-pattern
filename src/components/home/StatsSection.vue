<template>
  <section id="stats-section" class="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
    <div class="max-w-6xl mx-auto">
      <!-- 标题 -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          学习概览
        </h2>
        <p class="text-slate-600 dark:text-slate-400">
          追踪你的学习进度，保持学习动力
        </p>
      </div>

      <!-- 统计卡片 -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- 已学习 -->
        <div class="group relative bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <BookOpenIcon class="w-6 h-6 text-white" />
            </div>
            <span class="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded-full">
              目标 23
            </span>
          </div>
          <div class="relative">
            <div class="text-3xl font-bold text-slate-900 dark:text-white mb-1">
              <span ref="learnedCount">0</span>/23
            </div>
            <div class="text-sm text-slate-600 dark:text-slate-400">已学习</div>
          </div>
          <!-- 环形进度 -->
          <div class="absolute top-4 right-4 w-16 h-16 opacity-20">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                class="text-blue-200"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
              />
              <path
                ref="learnedCircle"
                class="text-blue-500 transition-all duration-1000"
                stroke-dasharray="0, 100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
              />
            </svg>
          </div>
        </div>

        <!-- 连续学习 -->
        <div class="group relative bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <FlameIcon class="w-6 h-6 text-white" />
            </div>
            <span v-if="stats.streakDays > 0" class="text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/50 px-2 py-1 rounded-full animate-pulse">
              连续中
            </span>
          </div>
          <div class="text-3xl font-bold text-slate-900 dark:text-white mb-1">
            <span ref="streakCount">0</span>天
          </div>
          <div class="text-sm text-slate-600 dark:text-slate-400">连续学习</div>
          <div v-if="stats.longestStreak > 0" class="mt-2 text-xs text-slate-500 dark:text-slate-500">
            最长记录: {{ stats.longestStreak }}天
          </div>
        </div>

        <!-- 完成进度 -->
        <div class="group relative bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-6 border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <TargetIcon class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="text-3xl font-bold text-slate-900 dark:text-white mb-1">
            <span ref="percentageCount">0</span>%
          </div>
          <div class="text-sm text-slate-600 dark:text-slate-400">完成进度</div>
          <!-- 进度条 -->
          <div class="mt-3 h-2 bg-green-200 dark:bg-green-900/50 rounded-full overflow-hidden">
            <div 
              ref="progressBar"
              class="h-full bg-green-500 rounded-full transition-all duration-1000"
              style="width: 0%"
            ></div>
          </div>
        </div>

        <!-- 学习时长 -->
        <div class="group relative bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <ClockIcon class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="text-3xl font-bold text-slate-900 dark:text-white mb-1">
            <span ref="timeCount">0</span>
            <span class="text-lg">分钟</span>
          </div>
          <div class="text-sm text-slate-600 dark:text-slate-400">学习时长</div>
          <div v-if="stats.totalLearningTime >= 60" class="mt-2 text-xs text-slate-500 dark:text-slate-500">
            约 {{ Math.floor(stats.totalLearningTime / 60) }} 小时
          </div>
        </div>
      </div>

      <!-- 分类进度 -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="category in categoryProgress" 
          :key="category.id"
          class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <div 
                class="w-10 h-10 rounded-lg flex items-center justify-center"
                :style="{ backgroundColor: category.color + '20' }"
              >
                <component 
                  :is="getCategoryIcon(category.icon)" 
                  class="w-5 h-5"
                  :style="{ color: category.color }"
                />
              </div>
              <div>
                <div class="font-semibold text-slate-900 dark:text-white">{{ category.name }}</div>
                <div class="text-xs text-slate-500">{{ category.learned }}/{{ category.total }} 已学</div>
              </div>
            </div>
            <div class="text-lg font-bold" :style="{ color: category.color }">
              {{ Math.round((category.learned / category.total) * 100) }}%
            </div>
          </div>
          <div class="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              class="h-full rounded-full transition-all duration-1000"
              :style="{ 
                width: `${(category.learned / category.total) * 100}%`,
                backgroundColor: category.color 
              }"
            ></div>
          </div>
        </div>
      </div>

      <!-- 查看详情按钮 -->
      <div class="mt-10 text-center">
        <a 
          href="/statistics"
          class="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-full hover:shadow-lg transition-all duration-300"
        >
          <BarChart3Icon class="w-5 h-5" />
          查看详细统计
          <ArrowRightIcon class="w-4 h-4" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { 
  BookOpen, 
  Flame, 
  Target, 
  Clock, 
  BarChart3, 
  ArrowRight,
  Building2,
  Puzzle,
  Theater
} from 'lucide-vue-next';
import { useLearningStats } from '@/composables/useLearningStats';
import { categories } from '@/data/categories';

const { stats } = useLearningStats();

// 图标映射
const iconMap: Record<string, any> = {
  Building2: Building2,
  Puzzle: Puzzle,
  Theater: Theater,
};

function getCategoryIcon(iconName: string) {
  return iconMap[iconName] || Building2;
}

// 分类进度数据
const categoryProgress = computed(() => {
  return categories.map(cat => ({
    ...cat,
    learned: stats.value.categoryProgress[cat.id].learned,
  }));
});

// 动画 refs
const learnedCount = ref<HTMLSpanElement | null>(null);
const streakCount = ref<HTMLSpanElement | null>(null);
const percentageCount = ref<HTMLSpanElement | null>(null);
const timeCount = ref<HTMLSpanElement | null>(null);
const progressBar = ref<HTMLDivElement | null>(null);
const learnedCircle = ref<SVGPathElement | null>(null);

// 数字动画
function animateNumber(element: HTMLSpanElement | null, target: number, duration: number = 1000) {
  if (!element) return;
  
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // 使用 easeOutQuart 缓动函数
    const easeProgress = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (target - start) * easeProgress);
    
    element.textContent = current.toString();
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// 观察器，当元素进入视口时触发动画
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 触发数字动画
        animateNumber(learnedCount.value, stats.value.learnedPatterns);
        animateNumber(streakCount.value, stats.value.streakDays);
        animateNumber(percentageCount.value, stats.value.completedPercentage);
        animateNumber(timeCount.value, stats.value.totalLearningTime);
        
        // 进度条动画
        if (progressBar.value) {
          setTimeout(() => {
            progressBar.value!.style.width = `${stats.value.completedPercentage}%`;
          }, 100);
        }
        
        // 环形进度动画
        if (learnedCircle.value) {
          const percentage = (stats.value.learnedPatterns / 23) * 100;
          setTimeout(() => {
            learnedCircle.value!.setAttribute('stroke-dasharray', `${percentage}, 100`);
          }, 100);
        }
        
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const section = document.getElementById('stats-section');
  if (section) {
    observer.observe(section);
  }
});

// 图标
const BookOpenIcon = BookOpen;
const FlameIcon = Flame;
const TargetIcon = Target;
const ClockIcon = Clock;
const BarChart3Icon = BarChart3;
const ArrowRightIcon = ArrowRight;
</script>
