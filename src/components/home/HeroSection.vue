<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- 背景动画 -->
    <div class="absolute inset-0 bg-linear-to-b from-sky-400/20 via-blue-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <!-- 云朵粒子 -->
      <canvas ref="cloudCanvas" class="absolute inset-0 w-full h-full opacity-60"></canvas>
      
      <!-- 装饰圆圈 -->
      <div class="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <!-- 主要内容 -->
    <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <!-- Logo 图标 -->
      <div class="mb-8 flex justify-center">
        <div class="relative">
          <div class="w-24 h-24 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float">
            <CloudCodeIcon class="w-14 h-14 text-white" />
          </div>
          <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
            <span class="text-sm font-bold text-yellow-900">23</span>
          </div>
        </div>
      </div>

      <!-- 品牌名称 -->
      <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
        <span class="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          秋云设计模式
        </span>
      </h1>
      
      <p class="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 mb-2 font-medium">
        Qiuyun Design Patterns
      </p>

      <!-- 打字机标语 -->
      <div class="h-8 mb-10">
        <p class="text-lg text-slate-500 dark:text-slate-400">
          <span ref="typewriterText"></span>
          <span class="animate-blink">|</span>
        </p>
      </div>

      <!-- 操作按钮 -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button 
          @click="scrollToContent"
          class="group relative px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <span class="relative z-10 flex items-center gap-2">
            <RocketIcon class="w-5 h-5 group-hover:animate-bounce" />
            开始探索
          </span>
          <div class="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        
        <button 
          @click="scrollToStats"
          class="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-full shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
        >
          <ChartIcon class="w-5 h-5" />
          查看学习进度
        </button>
      </div>

      <!-- 特性标签 -->
      <div class="mt-12 flex flex-wrap justify-center gap-3">
        <span class="px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full text-sm text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
          <FilmIcon class="w-4 h-4 text-blue-500" />
          动画演示
        </span>
        <span class="px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full text-sm text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
          <CodeIcon class="w-4 h-4 text-green-500" />
          多语言代码
        </span>
        <span class="px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full text-sm text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
          <GamepadIcon class="w-4 h-4 text-purple-500" />
          交互练习
        </span>
      </div>
    </div>

    <!-- 滚动提示 -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <button @click="scrollToContent" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
        <ChevronDownIcon class="w-8 h-8" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { 
  Cloud, 
  Code2, 
  Rocket, 
  BarChart3, 
  Film, 
  Gamepad2, 
  ChevronDown 
} from 'lucide-vue-next';

// 图标组件
const CloudCodeIcon = Cloud;
const CodeIcon = Code2;
const RocketIcon = Rocket;
const ChartIcon = BarChart3;
const FilmIcon = Film;
const GamepadIcon = Gamepad2;
const ChevronDownIcon = ChevronDown;

const cloudCanvas = ref<HTMLCanvasElement | null>(null);
const typewriterText = ref<HTMLSpanElement | null>(null);

// 打字机效果
const fullText = '23种经典设计模式，动画辅助学习，让设计模式不再晦涩难懂';
let currentIndex = 0;
let typewriterInterval: number | null = null;

function startTypewriter() {
  if (!typewriterText.value) return;
  
  typewriterInterval = window.setInterval(() => {
    if (currentIndex < fullText.length) {
      typewriterText.value!.textContent += fullText[currentIndex];
      currentIndex++;
    } else {
      // 完成后等待一段时间重新开始
      setTimeout(() => {
        if (typewriterText.value) {
          typewriterText.value.textContent = '';
          currentIndex = 0;
        }
      }, 3000);
    }
  }, 100);
}

// 云朵动画
function initCloudAnimation() {
  const canvas = cloudCanvas.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // 云朵粒子
  interface Cloud {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
  }

  const clouds: Cloud[] = [];
  for (let i = 0; i < 15; i++) {
    clouds.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.6,
      size: 30 + Math.random() * 50,
      speed: 0.2 + Math.random() * 0.3,
      opacity: 0.1 + Math.random() * 0.2,
    });
  }

  let animationId: number;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    clouds.forEach((cloud) => {
      // 绘制云朵
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`;
      
      // 简单的云朵形状（多个圆组合）
      ctx.arc(cloud.x, cloud.y, cloud.size * 0.5, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.size * 0.3, cloud.y - cloud.size * 0.2, cloud.size * 0.4, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.size * 0.6, cloud.y, cloud.size * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // 移动云朵
      cloud.x += cloud.speed;
      if (cloud.x > canvas.width + cloud.size) {
        cloud.x = -cloud.size;
        cloud.y = Math.random() * canvas.height * 0.6;
      }
    });

    animationId = requestAnimationFrame(animate);
  }

  animate();

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resizeCanvas);
  };
}

// 滚动到内容区
function scrollToContent() {
  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    statsSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToStats() {
  scrollToContent();
}

let cleanupCloudAnimation: (() => void) | null = null;

onMounted(() => {
  startTypewriter();
  cleanupCloudAnimation = initCloudAnimation() || null;
});

onUnmounted(() => {
  if (typewriterInterval) {
    clearInterval(typewriterInterval);
  }
  if (cleanupCloudAnimation) {
    cleanupCloudAnimation();
  }
});
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 1s infinite;
}
</style>
