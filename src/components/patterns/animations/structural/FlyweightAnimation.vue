<template>
  <div class="flex flex-col items-center">
    <div class="text-sm text-slate-500 mb-6">共享细粒度对象，节省内存</div>
    
    <div class="flex items-start gap-10">
      <!-- 工厂 -->
      <div class="flex flex-col items-center">
        <div class="w-36 h-24 border-2 border-slate-600 rounded-xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800">
          <span class="text-sm font-bold">FlyweightFactory</span>
          <span class="text-xs text-slate-400 mt-1">共享池</span>
        </div>
        <div class="mt-3 text-xs text-slate-500">
          已共享: {{ sharedFlyweights.length }} 个
        </div>
      </div>
      
      <!-- 创建区域 -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-slate-400 mb-2 font-medium">创建对象</div>
        <div class="flex gap-2 mb-4">
          <button 
            v-for="color in ['🔴', '🟢', '🔵']" 
            :key="color"
            @click="createFlyweight(color)"
            class="w-12 h-12 border-2 rounded-lg text-xl transition-all duration-300 hover:scale-110"
            :class="selectedFlyweightColor === color ? 'border-green-500 bg-green-50' : 'border-slate-300'"
          >
            {{ color }}
          </button>
        </div>
        <button 
          @click="createFlyweightWithPosition"
          class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
          :disabled="!selectedFlyweightColor"
        >
          放置到画布
        </button>
      </div>
      
      <!-- 画布 -->
      <div class="w-48 h-48 border-2 border-slate-300 rounded-xl bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
        <div class="absolute top-2 left-2 text-xs text-slate-400">Canvas</div>
        <div 
          v-for="(tree, index) in flyweightTrees" 
          :key="tree.id"
          class="absolute text-2xl transition-all duration-500 animate-pop-in"
          :style="{ left: tree.x + '%', top: tree.y + '%' }"
        >
          {{ tree.color === '🔴' ? '🌳' : tree.color === '🟢' ? '🌲' : '🌴' }}
        </div>
      </div>
    </div>
    
    <!-- 内存统计 -->
    <div class="mt-6 flex gap-8 text-sm">
      <div class="flex items-center gap-2">
        <span class="text-slate-500">享元对象:</span>
        <span class="font-medium text-green-600">{{ sharedFlyweights.length }} 个</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-slate-500">渲染实例:</span>
        <span class="font-medium text-blue-600">{{ flyweightTrees.length }} 个</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-slate-500">节省内存:</span>
        <span class="font-medium text-amber-600">{{ Math.round((1 - sharedFlyweights.length / Math.max(flyweightTrees.length, 1)) * 100) }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFlyweightAnimation } from '@/composables/usePatternAnimation';

const { selectedFlyweightColor, sharedFlyweights, flyweightTrees, createFlyweight, createFlyweightWithPosition } = useFlyweightAnimation();
</script>

<style scoped>
@keyframes pop-in {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}
.animate-pop-in {
  animation: pop-in 0.3s ease-out;
}
</style>
