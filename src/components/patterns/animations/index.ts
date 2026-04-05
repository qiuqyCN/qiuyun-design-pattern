// 创建型模式动画
export { default as SingletonAnimation } from './creational/SingletonAnimation.vue';
export { default as FactoryMethodAnimation } from './creational/FactoryMethodAnimation.vue';
export { default as AbstractFactoryAnimation } from './creational/AbstractFactoryAnimation.vue';
export { default as BuilderAnimation } from './creational/BuilderAnimation.vue';
export { default as PrototypeAnimation } from './creational/PrototypeAnimation.vue';

// 结构型模式动画
export { default as AdapterAnimation } from './structural/AdapterAnimation.vue';
export { default as BridgeAnimation } from './structural/BridgeAnimation.vue';
export { default as CompositeAnimation } from './structural/CompositeAnimation.vue';
export { default as DecoratorAnimation } from './structural/DecoratorAnimation.vue';
export { default as FacadeAnimation } from './structural/FacadeAnimation.vue';
export { default as FlyweightAnimation } from './structural/FlyweightAnimation.vue';
export { default as ProxyAnimation } from './structural/ProxyAnimation.vue';

// 行为型模式动画
export { default as ChainOfResponsibilityAnimation } from './behavioral/ChainOfResponsibilityAnimation.vue';
export { default as CommandAnimation } from './behavioral/CommandAnimation.vue';
export { default as IteratorAnimation } from './behavioral/IteratorAnimation.vue';
export { default as MediatorAnimation } from './behavioral/MediatorAnimation.vue';
export { default as MementoAnimation } from './behavioral/MementoAnimation.vue';
export { default as ObserverAnimation } from './behavioral/ObserverAnimation.vue';
export { default as StateAnimation } from './behavioral/StateAnimation.vue';
export { default as StrategyAnimation } from './behavioral/StrategyAnimation.vue';
export { default as TemplateMethodAnimation } from './behavioral/TemplateMethodAnimation.vue';
export { default as VisitorAnimation } from './behavioral/VisitorAnimation.vue';
export { default as InterpreterAnimation } from './behavioral/InterpreterAnimation.vue';

// 动画组件映射表
export const animationComponents: Record<string, string> = {
  // 创建型模式
  'singleton': 'SingletonAnimation',
  'factory-method': 'FactoryMethodAnimation',
  'abstract-factory': 'AbstractFactoryAnimation',
  'builder': 'BuilderAnimation',
  'prototype': 'PrototypeAnimation',
  // 结构型模式
  'adapter': 'AdapterAnimation',
  'bridge': 'BridgeAnimation',
  'composite': 'CompositeAnimation',
  'decorator': 'DecoratorAnimation',
  'facade': 'FacadeAnimation',
  'flyweight': 'FlyweightAnimation',
  'proxy': 'ProxyAnimation',
  // 行为型模式
  'chain-of-responsibility': 'ChainOfResponsibilityAnimation',
  'command': 'CommandAnimation',
  'iterator': 'IteratorAnimation',
  'mediator': 'MediatorAnimation',
  'memento': 'MementoAnimation',
  'observer': 'ObserverAnimation',
  'state': 'StateAnimation',
  'strategy': 'StrategyAnimation',
  'template-method': 'TemplateMethodAnimation',
  'visitor': 'VisitorAnimation',
  'interpreter': 'InterpreterAnimation',
};

// 获取动画组件名称
export function getAnimationComponentName(patternId: string): string {
  return animationComponents[patternId] || 'DefaultAnimation';
}
