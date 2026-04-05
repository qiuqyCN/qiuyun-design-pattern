<template>
  <section class="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          特色功能
        </h2>
        <p class="text-slate-600 dark:text-slate-400">
          多种学习方式，让设计模式学习更加高效有趣
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 动画演示 -->
        <div class="group bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <FilmIcon class="w-8 h-8 text-blue-600" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">
            动画演示
          </h3>
          <p class="text-slate-600 dark:text-slate-400 mb-4">
            通过可视化动画直观理解设计模式的结构和执行流程，告别晦涩的类图
          </p>
          <ul class="space-y-2 text-sm text-slate-500 dark:text-slate-500">
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              交互式类图可视化
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              分步骤动画播放
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              可拖拽的节点设计
            </li>
          </ul>
        </div>

        <!-- 交互练习 -->
        <div class="group bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Gamepad2Icon class="w-8 h-8 text-purple-600" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">
            交互练习
          </h3>
          <p class="text-slate-600 dark:text-slate-400 mb-4">
            通过小测验、代码填空、模式识别等多种练习方式巩固学习成果
          </p>
          <ul class="space-y-2 text-sm text-slate-500 dark:text-slate-500">
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              即时反馈与解析
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              代码填空练习
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              模式识别挑战
            </li>
          </ul>
        </div>

        <!-- 学习统计 -->
        <div class="group bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <BarChart3Icon class="w-8 h-8 text-green-600" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">
            学习统计
          </h3>
          <p class="text-slate-600 dark:text-slate-400 mb-4">
            追踪学习进度，记录学习时长，通过热力图可视化学习习惯
          </p>
          <ul class="space-y-2 text-sm text-slate-500 dark:text-slate-500">
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              学习进度追踪
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              学习热力图
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              连续学习记录
            </li>
          </ul>
        </div>
      </div>

      <!-- 多语言支持 -->
      <div class="mt-16 bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="shrink-0">
            <div class="w-20 h-20 bg-linear-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-2xl flex items-center justify-center">
              <Code2Icon class="w-10 h-10 text-orange-600" />
            </div>
          </div>
          <div class="flex-1 text-center md:text-left">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              多语言代码实现
            </h3>
            <p class="text-slate-600 dark:text-slate-400 mb-4">
              每个设计模式都提供 TypeScript、Java、Go、Python、C++ 五种语言的实现，满足不同开发者的需求
            </p>
            <div class="flex flex-wrap justify-center md:justify-start gap-3">
              <span class="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium">TypeScript</span>
              <span class="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg font-medium">Java</span>
              <span class="px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-lg font-medium">Go</span>
              <span class="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg font-medium">Python</span>
              <span class="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium">C++</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Film, Gamepad2, BarChart3, Code2, Check } from 'lucide-vue-next';

const FilmIcon = Film;
const Gamepad2Icon = Gamepad2;
const BarChart3Icon = BarChart3;
const Code2Icon = Code2;
const CheckIcon = Check;
</script>
