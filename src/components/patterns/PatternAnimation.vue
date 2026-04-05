<template>
  <div class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
    <component :is="currentAnimationComponent" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getAnimationComponentName } from './animations';
import DefaultAnimation from './animations/DefaultAnimation.vue';

const props = defineProps<{
  patternId: string;
}>();

// 创建型模式动画
import SingletonAnimation from './animations/creational/SingletonAnimation.vue';
import FactoryMethodAnimation from './animations/creational/FactoryMethodAnimation.vue';
import AbstractFactoryAnimation from './animations/creational/AbstractFactoryAnimation.vue';
import BuilderAnimation from './animations/creational/BuilderAnimation.vue';
import PrototypeAnimation from './animations/creational/PrototypeAnimation.vue';

// 结构型模式动画
import AdapterAnimation from './animations/structural/AdapterAnimation.vue';
import BridgeAnimation from './animations/structural/BridgeAnimation.vue';
import CompositeAnimation from './animations/structural/CompositeAnimation.vue';
import DecoratorAnimation from './animations/structural/DecoratorAnimation.vue';
import FacadeAnimation from './animations/structural/FacadeAnimation.vue';
import FlyweightAnimation from './animations/structural/FlyweightAnimation.vue';
import ProxyAnimation from './animations/structural/ProxyAnimation.vue';

// 行为型模式动画
import ChainOfResponsibilityAnimation from './animations/behavioral/ChainOfResponsibilityAnimation.vue';
import CommandAnimation from './animations/behavioral/CommandAnimation.vue';
import IteratorAnimation from './animations/behavioral/IteratorAnimation.vue';
import MediatorAnimation from './animations/behavioral/MediatorAnimation.vue';
import MementoAnimation from './animations/behavioral/MementoAnimation.vue';
import ObserverAnimation from './animations/behavioral/ObserverAnimation.vue';
import StateAnimation from './animations/behavioral/StateAnimation.vue';
import StrategyAnimation from './animations/behavioral/StrategyAnimation.vue';
import TemplateMethodAnimation from './animations/behavioral/TemplateMethodAnimation.vue';
import VisitorAnimation from './animations/behavioral/VisitorAnimation.vue';
import InterpreterAnimation from './animations/behavioral/InterpreterAnimation.vue';

// 组件映射表
const componentMap: Record<string, any> = {
  // 创建型
  SingletonAnimation,
  FactoryMethodAnimation,
  AbstractFactoryAnimation,
  BuilderAnimation,
  PrototypeAnimation,
  // 结构型
  AdapterAnimation,
  BridgeAnimation,
  CompositeAnimation,
  DecoratorAnimation,
  FacadeAnimation,
  FlyweightAnimation,
  ProxyAnimation,
  // 行为型
  ChainOfResponsibilityAnimation,
  CommandAnimation,
  IteratorAnimation,
  MediatorAnimation,
  MementoAnimation,
  ObserverAnimation,
  StateAnimation,
  StrategyAnimation,
  TemplateMethodAnimation,
  VisitorAnimation,
  InterpreterAnimation,
  // 默认
  DefaultAnimation,
};

// 计算当前应该显示的动画组件
const currentAnimationComponent = computed(() => {
  const componentName = getAnimationComponentName(props.patternId);
  return componentMap[componentName] || DefaultAnimation;
});
</script>
