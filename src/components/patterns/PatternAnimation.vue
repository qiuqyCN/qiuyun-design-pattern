<template>
  <div class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
    <!-- 单例模式动画 -->
    <template v-if="patternId === 'singleton'">
      <div class="flex flex-col items-center">
        <div class="text-sm text-slate-500 mb-8">观察单例模式如何确保只有一个实例存在</div>
        
        <div class="flex items-center gap-12 mb-8">
          <!-- 多个客户端 -->
          <div class="flex flex-col gap-4">
            <div 
              v-for="i in 3" 
              :key="i"
              class="w-28 h-16 border-2 rounded-lg flex items-center justify-center transition-all duration-500"
              :class="activeClient === i ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg' : 'border-slate-300 bg-slate-50 dark:bg-slate-800'"
            >
              <span class="text-sm font-medium">Client {{ i }}</span>
            </div>
          </div>
          
          <!-- 请求箭头组 -->
          <div class="flex flex-col gap-4">
            <div 
              v-for="i in 3" 
              :key="i"
              class="w-20 h-16 flex items-center justify-center relative"
            >
              <svg 
                class="w-16 h-8 transition-opacity duration-300"
                :class="activeClient === i ? 'opacity-100' : 'opacity-20'"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 64 32"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M4 16h48M52 16l-8-8M52 16l-8 8"
                  :class="activeClient === i ? 'text-blue-500' : 'text-slate-400'"
                >
                  <animate 
                    v-if="activeClient === i"
                    attributeName="stroke-dasharray" 
                    values="0,100;100,0" 
                    dur="0.8s" 
                    repeatCount="1"
                  />
                </path>
              </svg>
              <div 
                class="absolute -top-2 text-xs transition-opacity duration-300"
                :class="activeClient === i ? 'opacity-100 text-blue-500' : 'opacity-0'"
              >
                getInstance()
              </div>
            </div>
          </div>
          
          <!-- Singleton -->
          <div class="relative">
            <div 
              class="w-44 h-32 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-500 shadow-lg"
              :class="instanceCreated ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20' : 'border-slate-400 bg-slate-100 dark:bg-slate-800'"
            >
              <span class="text-lg font-bold mb-3">Singleton</span>
              <div 
                class="w-14 h-14 rounded-full border-3 flex items-center justify-center text-xl font-bold transition-all duration-500"
                :class="instanceCreated ? 'border-green-500 bg-green-500 text-white scale-100 shadow-lg' : 'border-slate-300 scale-0'"
              >
                1
              </div>
            </div>
            <div 
              class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium transition-all duration-500 whitespace-nowrap"
              :class="instanceCreated ? 'opacity-100 text-green-600' : 'opacity-0'"
            >
              ✓ 唯一实例
            </div>
          </div>
          
          <!-- 返回箭头 -->
          <div class="flex flex-col gap-4">
            <div 
              v-for="i in 3" 
              :key="i"
              class="w-20 h-16 flex items-center justify-center"
            >
              <svg 
                class="w-16 h-8 transition-all duration-500"
                :class="returnedClient === i ? 'opacity-100' : 'opacity-0'"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 64 32"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M60 16H12M12 16l8-8M12 16l8 8"
                  class="text-green-500"
                />
              </svg>
            </div>
          </div>
          
          <!-- 实例引用 -->
          <div class="flex flex-col gap-4">
            <div 
              v-for="i in 3" 
              :key="i"
              class="w-24 h-16 rounded-lg flex items-center justify-center text-sm transition-all duration-500"
              :class="returnedClient === i ? 'bg-green-100 dark:bg-green-900/30 text-green-700 border border-green-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'"
            >
              <span v-if="returnedClient === i">instance</span>
              <span v-else>null</span>
            </div>
          </div>
        </div>
        
        <!-- 控制按钮 -->
        <button 
          @click="runSingletonAnimation"
          class="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:opacity-80 transition-all disabled:opacity-50"
          :disabled="isAnimating"
        >
          {{ isAnimating ? '演示运行中...' : '开始演示' }}
        </button>
        
        <!-- 说明 -->
        <div class="mt-8 text-center">
          <p class="text-sm text-slate-500 dark:text-slate-400 max-w-lg">
            <span v-if="!instanceCreated" class="text-slate-400">点击开始演示，观察三个客户端如何获取同一个实例</span>
            <span v-else class="text-green-600 font-medium">
              所有客户端获取的都是同一个实例，内存中只有一份对象
            </span>
          </p>
        </div>
      </div>
    </template>

    <!-- 工厂方法模式动画 -->
    <template v-else-if="patternId === 'factory-method'">
      <div class="flex flex-col items-center">
        <div class="text-sm text-slate-500 mb-8">点击不同工厂创建对应的产品</div>
        
        <div class="flex items-center gap-8">
          <!-- Creator 抽象类 -->
          <div class="w-40 h-28 border-2 border-dashed border-slate-400 rounded-xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800">
            <span class="text-sm font-medium text-slate-500">Creator</span>
            <span class="text-xs text-slate-400 mt-1">(抽象类)</span>
          </div>
          
          <!-- 继承箭头 -->
          <div class="flex flex-col items-center">
            <svg class="w-8 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 32 48">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v32M16 36l-8-8M16 36l8-8"/>
            </svg>
            <span class="text-xs text-slate-400">extends</span>
          </div>
          
          <!-- 具体工厂 -->
          <div class="flex flex-col gap-4">
            <button 
              v-for="type in ['A', 'B']" 
              :key="type"
              @click="createProduct(type)"
              class="w-40 h-16 border-2 rounded-xl flex flex-col items-center justify-center text-sm transition-all duration-300"
              :class="selectedFactory === type ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg' : 'border-slate-300 hover:border-slate-400 bg-white dark:bg-slate-800'"
              :disabled="isAnimating"
            >
              <span class="font-medium">ConcreteCreator{{ type }}</span>
              <span class="text-xs text-slate-400 mt-1">factoryMethod()</span>
            </button>
          </div>
          
          <!-- 创建箭头 -->
          <div class="flex flex-col items-center">
            <svg 
              class="w-12 h-12 transition-all duration-500"
              :class="selectedFactory ? 'text-green-500' : 'text-slate-300'"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 48 48"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 24h24M36 24l-8-8M36 24l-8 8"/>
              <circle 
                v-if="isAnimating"
                cx="36" 
                cy="24" 
                r="4" 
                fill="currentColor"
                class="animate-ping"
              />
            </svg>
            <span class="text-xs text-slate-400">creates</span>
          </div>
          
          <!-- 产品 -->
          <div class="w-44 h-36 border-2 border-dashed border-slate-400 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
            <div 
              v-if="selectedProduct"
              class="absolute inset-0 flex items-center justify-center transition-all duration-500"
              :class="showProduct ? 'opacity-100 scale-100' : 'opacity-0 scale-50'"
            >
              <div 
                class="w-32 h-24 rounded-xl flex flex-col items-center justify-center shadow-lg"
                :class="selectedProduct === 'A' ? 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/30 border-2 border-blue-400' : 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/30 border-2 border-purple-400'"
              >
                <span class="text-2xl mb-1">{{ selectedProduct === 'A' ? '📦' : '🎁' }}</span>
                <span class="text-sm font-bold" :class="selectedProduct === 'A' ? 'text-blue-700' : 'text-purple-700'">
                  Product{{ selectedProduct }}
                </span>
              </div>
            </div>
            <span v-else class="text-sm text-slate-400">等待创建...</span>
          </div>
        </div>
        
        <!-- 产品类型说明 -->
        <div class="mt-8 flex gap-8">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-blue-400"></div>
            <span class="text-sm text-slate-500">Product A 类型</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-purple-400"></div>
            <span class="text-sm text-slate-500">Product B 类型</span>
          </div>
        </div>
      </div>
    </template>

    <!-- 抽象工厂模式动画 -->
    <template v-else-if="patternId === 'abstract-factory'">
      <div class="flex flex-col items-center">
        <div class="text-sm text-slate-500 mb-6">选择工厂创建完整的产品族</div>
        
        <div class="flex items-center gap-10">
          <!-- 工厂选择 -->
          <div class="flex flex-col gap-4">
            <div class="text-xs text-slate-400 text-center mb-2 font-medium">选择工厂</div>
            <button 
              v-for="family in ['Modern', 'Victorian']" 
              :key="family"
              @click="selectFamily(family)"
              class="w-40 h-20 border-2 rounded-xl flex flex-col items-center justify-center text-sm transition-all duration-300"
              :class="selectedFamily === family ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg' : 'border-slate-300 hover:border-slate-400 bg-white dark:bg-slate-800'"
            >
              <span class="font-bold">{{ family }}</span>
              <span class="text-xs text-slate-400 mt-1">Factory</span>
            </button>
          </div>
          
          <!-- 创建箭头 -->
          <div class="flex flex-col items-center">
            <svg 
              class="w-16 h-16 transition-all duration-500"
              :class="selectedFamily ? 'text-green-500' : 'text-slate-300'"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 64 64"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 32h32M48 32l-8-8M48 32l-8 8"/>
              <circle 
                v-if="isCreating"
                cx="48" 
                cy="32" 
                r="6" 
                fill="currentColor"
                class="animate-ping"
              />
            </svg>
            <span class="text-xs text-slate-400 mt-2">creates family</span>
          </div>
          
          <!-- 产品族 -->
          <div class="flex flex-col gap-3">
            <div class="text-xs text-slate-400 text-center mb-2 font-medium">产品族</div>
            <div 
              v-for="(product, index) in ['Chair', 'Sofa', 'Table']" 
              :key="product"
              class="w-36 h-14 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-500 border-2"
              :class="selectedFamily ? 
                (selectedFamily === 'Modern' ? 
                  'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-700 border-blue-300 shadow-sm' : 
                  'bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 text-amber-700 border-amber-300 shadow-sm'
                ) : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200'"
              :style="{ transitionDelay: `${index * 150}ms` }"
            >
              <span class="mr-2">{{ selectedFamily === 'Modern' ? ['🪑', '🛋️', '🪑'][index] : ['🪑', '🛋️', '🪑'][index] }}</span>
              {{ selectedFamily || 'Product' }}{{ product }}
            </div>
          </div>
        </div>
        
        <!-- 说明 -->
        <div class="mt-8 text-center text-sm max-w-lg">
          <p v-if="!selectedFamily" class="text-slate-400">选择工厂，观察如何创建一系列风格一致的产品族</p>
          <p v-else :class="selectedFamily === 'Modern' ? 'text-blue-600' : 'text-amber-600'" class="font-medium">
            {{ selectedFamily === 'Modern' ? '现代风格' : '维多利亚风格' }}工厂创建了完整的产品族，确保风格一致
          </p>
        </div>
      </div>
    </template>

    <!-- 建造者模式动画 -->
    <template v-else-if="patternId === 'builder'">
      <div class="flex flex-col items-center">
        <div class="text-sm text-slate-500 mb-6">分步骤构建复杂对象</div>
        
        <div class="flex items-start gap-8">
          <!-- Director -->
          <div class="flex flex-col items-center">
            <div class="w-32 h-24 border-2 border-slate-600 dark:border-slate-400 rounded-xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 shadow-sm">
              <span class="text-sm font-bold">Director</span>
              <span class="text-xs text-slate-400 mt-1">construct()</span>
            </div>
            <button 
              @click="buildStep"
              class="mt-4 px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:opacity-80 transition-all disabled:opacity-50"
              :disabled="buildProgress >= 3 || isBuilding"
            >
              {{ buildProgress >= 3 ? '✓ 完成' : isBuilding ? '构建中...' : '下一步' }}
            </button>
            <button 
              v-if="buildProgress >= 3"
              @click="resetBuild"
              class="mt-2 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              重新演示
            </button>
          </div>
          
          <!-- 构建步骤 -->
          <div class="flex flex-col gap-3 pt-2">
            <div 
              v-for="(step, index) in buildSteps" 
              :key="step"
              class="w-44 h-12 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-500 border-2"
              :class="buildProgress > index ? 
                'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 text-green-700 border-green-400 shadow-sm' : 
                'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200'"
            >
              <span v-if="buildProgress > index" class="mr-2 text-green-500">✓</span>
              <span v-else class="mr-2 text-slate-300">○</span>
              {{ step }}
            </div>
          </div>
          
          <!-- 箭头 -->
          <div class="flex items-center pt-12">
            <svg 
              class="w-12 h-16 transition-all duration-500"
              :class="buildProgress >= 3 ? 'text-green-500' : 'text-slate-300'"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 48 64"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M24 8v48M24 56l-8-8M24 56l8-8"/>
            </svg>
          </div>
          
          <!-- 最终产品 -->
          <div class="pt-4">
            <div 
              class="w-36 h-36 rounded-xl flex flex-col items-center justify-center transition-all duration-700 border-3"
              :class="buildProgress >= 3 ? 
                'bg-gradient-to-br from-green-400 to-green-500 text-white border-green-600 scale-100 shadow-xl' : 
                'bg-slate-200 dark:bg-slate-700 text-slate-400 border-slate-300 scale-90'"
            >
              <div class="text-4xl mb-2 transition-all duration-500" :class="buildProgress >= 3 ? 'scale-110' : 'scale-100'">
                {{ buildProgress >= 3 ? '🏠' : '🏗️' }}
              </div>
              <div class="text-xs font-medium">
                {{ buildProgress >= 3 ? 'House Ready!' : 'Building...' }}
              </div>
              <div v-if="buildProgress >= 3" class="text-[10px] mt-1 opacity-80">
                100% Complete
              </div>
            </div>
          </div>
        </div>
        
        <!-- 进度条 -->
        <div class="mt-8 w-96 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
            :style="{ width: `${(buildProgress / 3) * 100}%` }"
          ></div>
        </div>
        <div class="mt-2 text-xs text-slate-400">
          构建进度: {{ Math.round((buildProgress / 3) * 100) }}%
        </div>
      </div>
    </template>

    <!-- 原型模式动画 -->
    <template v-else-if="patternId === 'prototype'">
      <div class="flex flex-col items-center">
        <div class="text-sm text-slate-500 mb-8">通过克隆创建新对象</div>
        
        <div class="flex items-center gap-12">
          <!-- 原始对象 -->
          <div class="flex flex-col items-center">
            <div 
              class="w-36 h-36 rounded-xl flex flex-col items-center justify-center border-3 transition-all duration-500 cursor-pointer"
              :class="originalObject ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 shadow-lg' : 'border-slate-300 border-dashed bg-slate-50 dark:bg-slate-800 hover:border-slate-400'"
              @click="createOriginal"
            >
              <div class="text-4xl mb-2">{{ originalObject ? '📄' : '➕' }}</div>
              <div class="text-sm font-bold">{{ originalObject ? 'Original' : 'Create' }}</div>
              <div v-if="originalObject" class="text-xs text-slate-400 mt-1">Prototype</div>
            </div>
          </div>
          
          <!-- 克隆控制 -->
          <div class="flex flex-col items-center">
            <button 
              v-if="originalObject && clones.length < 4"
              @click="cloneObject"
              class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 mb-4"
              :disabled="isCloning"
            >
              {{ isCloning ? '⏳ 克隆中...' : '🔀 克隆 +' }}
            </button>
            <svg 
              class="w-20 h-8 transition-all duration-500"
              :class="originalObject ? 'text-green-500' : 'text-slate-300'"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 80 32"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16h64M68 16l-8-8M68 16l-8 8"/>
            </svg>
            <div class="text-xs text-slate-400 mt-2">clone()</div>
          </div>
          
          <!-- 克隆对象 -->
          <div class="flex flex-col gap-3">
            <div 
              v-for="(clone, index) in clones" 
              :key="clone.id"
              class="w-32 h-24 rounded-xl flex flex-col items-center justify-center border-2 border-green-400 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 shadow-md animate-slide-in"
            >
              <div class="text-2xl">📄</div>
              <div class="text-xs font-medium text-green-700">Clone {{ index + 1 }}</div>
            </div>
            <div 
              v-for="i in (4 - clones.length)" 
              :key="`empty-${i}`"
              class="w-32 h-24 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center"
            >
              <span class="text-xs text-slate-300">Empty</span>
            </div>
          </div>
        </div>
        
        <!-- 说明 -->
        <div class="mt-8 text-center text-sm max-w-md">
          <p v-if="!originalObject" class="text-slate-400">点击左侧创建原型对象</p>
          <p v-else-if="clones.length === 0" class="text-slate-500">点击"克隆 +" 按钮创建对象的独立副本</p>
          <p v-else class="text-green-600 font-medium">
            ✓ 已创建 {{ clones.length }} 个克隆对象，每个都是原型的独立副本
          </p>
        </div>
      </div>
    </template>

    <!-- 默认提示 -->
    <template v-else>
      <div class="flex flex-col items-center justify-center py-16 text-slate-400">
        <div class="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
          <svg class="w-10 h-10 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <p class="text-lg font-medium mb-2">交互式动画开发中</p>
        <p class="text-sm text-slate-400">该设计模式的动画演示即将上线</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  patternId: string;
}>();

// 单例模式状态
const isAnimating = ref(false);
const instanceCreated = ref(false);
const activeClient = ref<number | null>(null);
const returnedClient = ref<number | null>(null);

// 工厂方法状态
const selectedFactory = ref<string | null>(null);
const selectedProduct = ref<string | null>(null);
const showProduct = ref(false);

// 抽象工厂状态
const selectedFamily = ref<string | null>(null);
const isCreating = ref(false);

// 建造者模式状态
const buildProgress = ref(0);
const isBuilding = ref(false);
const buildSteps = ['buildFoundation()', 'buildWalls()', 'buildRoof()'];

// 原型模式状态
const originalObject = ref<{ name: string } | null>(null);
const clones = ref<Array<{ id: number }>>([]);
const isCloning = ref(false);

// 单例模式动画
async function runSingletonAnimation() {
  if (isAnimating.value) return;
  
  isAnimating.value = true;
  instanceCreated.value = false;
  activeClient.value = null;
  returnedClient.value = null;
  
  for (let i = 1; i <= 3; i++) {
    activeClient.value = i;
    await sleep(600);
    
    if (i === 1) {
      instanceCreated.value = true;
    }
    
    await sleep(400);
    returnedClient.value = i;
    await sleep(300);
  }
  
  isAnimating.value = false;
}

// 工厂方法
async function createProduct(type: string) {
  if (isAnimating.value) return;
  
  isAnimating.value = true;
  selectedFactory.value = type;
  selectedProduct.value = type;
  showProduct.value = false;
  
  await sleep(300);
  showProduct.value = true;
  
  await sleep(500);
  isAnimating.value = false;
}

// 抽象工厂
async function selectFamily(family: string) {
  selectedFamily.value = null;
  isCreating.value = true;
  
  await sleep(100);
  selectedFamily.value = family;
  
  await sleep(600);
  isCreating.value = false;
}

// 建造者模式
async function buildStep() {
  if (isBuilding.value || buildProgress.value >= 3) return;
  
  isBuilding.value = true;
  await sleep(400);
  buildProgress.value++;
  isBuilding.value = false;
}

function resetBuild() {
  buildProgress.value = 0;
}

// 原型模式
function createOriginal() {
  originalObject.value = { name: 'Prototype' };
  clones.value = [];
}

async function cloneObject() {
  if (isCloning.value || clones.value.length >= 4) return;
  
  isCloning.value = true;
  await sleep(400);
  clones.value.push({ id: Date.now() });
  isCloning.value = false;
}

// 工具函数
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
</script>

<style scoped>
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-20px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.animate-slide-in {
  animation: slide-in 0.4s ease-out;
}

.border-3 {
  border-width: 3px;
}
</style>
