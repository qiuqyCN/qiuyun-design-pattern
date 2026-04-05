<template>
  <div class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
    <div ref="mermaidContainer" class="mermaid flex justify-center">
      {{ diagramDefinition }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';

const props = defineProps<{
  patternId: string;
  mermaidDiagram?: string;
}>();

const mermaidContainer = ref<HTMLElement | null>(null);

// 默认类图定义（当 pattern 数据中没有提供时使用）
const defaultDiagrams: Record<string, string> = {
  singleton: `
classDiagram
  class Singleton {
    -Singleton instance
    -Singleton()
    +getInstance() Singleton
    +businessLogic()
  }
  class Client {
    +main()
  }
  Client ..> Singleton : uses
  
  style Singleton fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
  `,
  'factory-method': `
classDiagram
  class Product {
    <<interface>>
    +operation()
  }
  class ConcreteProductA {
    +operation()
  }
  class ConcreteProductB {
    +operation()
  }
  class Creator {
    <<abstract>>
    +factoryMethod() Product
    +anOperation()
  }
  class ConcreteCreatorA {
    +factoryMethod() Product
  }
  class ConcreteCreatorB {
    +factoryMethod() Product
  }
  
  Product <|.. ConcreteProductA
  Product <|.. ConcreteProductB
  Creator <|-- ConcreteCreatorA
  Creator <|-- ConcreteCreatorB
  Creator ..> Product : creates
  ConcreteCreatorA ..> ConcreteProductA : creates
  ConcreteCreatorB ..> ConcreteProductB : creates
  
  style Product fill:#fff3e0,stroke:#f57c00,stroke-width:2px,stroke-dasharray: 5 5
  style Creator fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
  style ConcreteProductA fill:#e3f2fd,stroke:#1976d2
  style ConcreteProductB fill:#e3f2fd,stroke:#1976d2
  style ConcreteCreatorA fill:#f3e5f5,stroke:#7b1fa2
  style ConcreteCreatorB fill:#f3e5f5,stroke:#7b1fa2
  `,
  'abstract-factory': `
classDiagram
  class AbstractFactory {
    <<interface>>
    +createProductA()
    +createProductB()
  }
  class ConcreteFactory1 {
    +createProductA()
    +createProductB()
  }
  class ConcreteFactory2 {
    +createProductA()
    +createProductB()
  }
  class AbstractProductA {
    <<interface>>
    +usefulFunctionA()
  }
  class AbstractProductB {
    <<interface>>
    +usefulFunctionB()
  }
  class ConcreteProductA1 {
    +usefulFunctionA()
  }
  class ConcreteProductA2 {
    +usefulFunctionA()
  }
  class ConcreteProductB1 {
    +usefulFunctionB()
  }
  class ConcreteProductB2 {
    +usefulFunctionB()
  }
  class Client {
    +main()
  }
  
  AbstractFactory <|.. ConcreteFactory1
  AbstractFactory <|.. ConcreteFactory2
  AbstractProductA <|.. ConcreteProductA1
  AbstractProductA <|.. ConcreteProductA2
  AbstractProductB <|.. ConcreteProductB1
  AbstractProductB <|.. ConcreteProductB2
  ConcreteFactory1 ..> ConcreteProductA1 : creates
  ConcreteFactory1 ..> ConcreteProductB1 : creates
  ConcreteFactory2 ..> ConcreteProductA2 : creates
  ConcreteFactory2 ..> ConcreteProductB2 : creates
  Client ..> AbstractFactory : uses
  
  style AbstractFactory fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style AbstractProductA fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style AbstractProductB fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style ConcreteFactory1 fill:#e8f5e9,stroke:#388e3c
  style ConcreteFactory2 fill:#e8f5e9,stroke:#388e3c
  style ConcreteProductA1 fill:#e3f2fd,stroke:#1976d2
  style ConcreteProductA2 fill:#e3f2fd,stroke:#1976d2
  style ConcreteProductB1 fill:#e3f2fd,stroke:#1976d2
  style ConcreteProductB2 fill:#e3f2fd,stroke:#1976d2
  `,
  builder: `
classDiagram
  class Director {
    -Builder builder
    +setBuilder(Builder)
    +construct()
  }
  class Builder {
    <<interface>>
    +reset()
    +buildStepA()
    +buildStepB()
    +buildStepC()
    +getResult() Product
  }
  class ConcreteBuilder {
    -Product product
    +reset()
    +buildStepA()
    +buildStepB()
    +buildStepC()
    +getResult() Product
  }
  class Product {
    -List parts
    +addPart()
    +listParts()
  }
  class Client {
    +main()
  }
  
  Director o-- Builder
  Builder <|.. ConcreteBuilder
  ConcreteBuilder ..> Product : creates
  Client ..> Director : uses
  Client ..> ConcreteBuilder : uses
  
  style Director fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
  style Builder fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style ConcreteBuilder fill:#f3e5f5,stroke:#7b1fa2
  style Product fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  `,
  prototype: `
classDiagram
  class Prototype {
    <<interface>>
    +clone() Prototype
  }
  class ConcretePrototype {
    -field
    +ConcretePrototype(Prototype)
    +clone() Prototype
  }
  class SubclassPrototype {
    -field
    +SubclassPrototype(SubclassPrototype)
    +clone() Prototype
  }
  class Client {
    +main()
  }
  
  Prototype <|.. ConcretePrototype
  Prototype <|.. SubclassPrototype
  Client ..> Prototype : uses
  Client ..> ConcretePrototype : clones
  
  style Prototype fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style ConcretePrototype fill:#e3f2fd,stroke:#1976d2
  style SubclassPrototype fill:#e3f2fd,stroke:#1976d2
  `,
  adapter: `
classDiagram
  class Target {
    <<interface>>
    +request()
  }
  class Adapter {
    -Adaptee adaptee
    +request()
  }
  class Adaptee {
    +specificRequest()
  }
  class Client {
    +main()
  }
  
  Target <|.. Adapter
  Adapter o-- Adaptee
  Client ..> Target : uses
  
  style Target fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style Adapter fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
  style Adaptee fill:#ffebee,stroke:#c62828
  `,
  decorator: `
classDiagram
  class Component {
    <<interface>>
    +operation()
  }
  class ConcreteComponent {
    +operation()
  }
  class Decorator {
    -Component component
    +operation()
  }
  class ConcreteDecoratorA {
    +operation()
    +addedBehavior()
  }
  class ConcreteDecoratorB {
    +operation()
    +addedState
  }
  
  Component <|.. ConcreteComponent
  Component <|.. Decorator
  Decorator o-- Component
  Decorator <|-- ConcreteDecoratorA
  Decorator <|-- ConcreteDecoratorB
  
  style Component fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style ConcreteComponent fill:#e3f2fd,stroke:#1976d2
  style Decorator fill:#e8f5e9,stroke:#388e3c
  style ConcreteDecoratorA fill:#f3e5f5,stroke:#7b1fa2
  style ConcreteDecoratorB fill:#f3e5f5,stroke:#7b1fa2
  `,
  observer: `
classDiagram
  class Subject {
    -List~Observer~ observers
    -state
    +attach(Observer)
    +detach(Observer)
    +notify()
  }
  class Observer {
    <<interface>>
    +update()
  }
  class ConcreteSubject {
    -subjectState
    +getState()
    +setState()
  }
  class ConcreteObserverA {
    -observerState
    +update()
  }
  class ConcreteObserverB {
    -observerState
    +update()
  }
  
  Subject <|-- ConcreteSubject
  Observer <|.. ConcreteObserverA
  Observer <|.. ConcreteObserverB
  Subject o-- Observer
  ConcreteSubject <.. ConcreteObserverA : observes
  
  style Subject fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
  style Observer fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style ConcreteSubject fill:#f3e5f5,stroke:#7b1fa2
  style ConcreteObserverA fill:#e3f2fd,stroke:#1976d2
  style ConcreteObserverB fill:#e3f2fd,stroke:#1976d2
  `,
  strategy: `
classDiagram
  class Context {
    -Strategy strategy
    +setStrategy(Strategy)
    +doSomething()
  }
  class Strategy {
    <<interface>>
    +execute()
  }
  class ConcreteStrategyA {
    +execute()
  }
  class ConcreteStrategyB {
    +execute()
  }
  class Client {
    +main()
  }
  
  Context o-- Strategy
  Strategy <|.. ConcreteStrategyA
  Strategy <|.. ConcreteStrategyB
  Client ..> Context : uses
  Client ..> ConcreteStrategyA : creates
  Client ..> ConcreteStrategyB : creates
  
  style Context fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
  style Strategy fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style ConcreteStrategyA fill:#e3f2fd,stroke:#1976d2
  style ConcreteStrategyB fill:#e3f2fd,stroke:#1976d2
  `,
};

const diagramDefinition = computed(() => {
  // 优先使用从 pattern 数据传入的 mermaidDiagram
  if (props.mermaidDiagram) {
    return props.mermaidDiagram;
  }
  // 否则使用默认的类图
  return defaultDiagrams[props.patternId] || `
classDiagram
  note "类图暂不可用"
  `;
});

onMounted(async () => {
  if (typeof window !== 'undefined') {
    const mermaid = (await import('mermaid')).default;
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      themeCSS: `
        .classGroup rect {
          fill: #f5f5f5;
          stroke: #616161;
          stroke-width: 1px;
        }
        .classGroup text {
          fill: #333;
        }
        .classGroup .title {
          font-weight: bold;
        }
      `,
    });
    renderDiagram();
  }
});

watch(diagramDefinition, () => {
  renderDiagram();
});

async function renderDiagram() {
  if (mermaidContainer.value && typeof window !== 'undefined') {
    const mermaid = (await import('mermaid')).default;
    try {
      const { svg } = await mermaid.render(
        `mermaid-${props.patternId}-${Date.now()}`,
        diagramDefinition.value
      );
      mermaidContainer.value.innerHTML = svg;
    } catch (error) {
      console.error('Mermaid render error:', error);
    }
  }
}
</script>

<style scoped>
:deep(.mermaid svg) {
  max-width: 100%;
  height: auto;
}

:deep(.mermaid .classGroup rect) {
  rx: 4;
  ry: 4;
}

:deep(.mermaid .classGroup .title) {
  font-weight: 600;
}
</style>
