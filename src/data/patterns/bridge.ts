import type { DesignPattern } from '@/types/pattern';

export const bridgePattern: DesignPattern = {
  id: 'bridge',
  name: '桥接模式',
  nameEn: 'Bridge Pattern',
  category: 'structural',
  difficulty: 'medium',
  frequency: 'medium',
  intent: '将抽象部分与它的实现部分分离，使它们都可以独立地变化。',
  description: '桥接模式是一种结构型设计模式，它将一个大类或一系列紧密相关的类拆分为抽象和实现两个独立的层次结构。',
  applicability: ['当需要拆分或重组一个具有多重功能的庞杂类时', '当需要在几个独立维度上扩展一个类时'],
  pros: ['可以创建与平台无关的类和程序', '客户端代码仅与高层抽象部分交互', '开闭原则：可以独立地扩展抽象和实现'],
  cons: ['对高内聚的类使用该模式可能会让代码更加复杂'],
  analogy: { title: '现实世界中的桥接', description: '桥接模式就像是遥控器和电视', scenarios: [{ id: 'remote', title: '遥控器', description: '遥控器（抽象）可以与不同品牌的电视（实现）配对，两者可以独立变化。', icon: 'Remote' }] },
  structure: { classDiagram: '', animationSteps: [] },
  implementation: {
    typescript: `interface Implementation { operationImplementation(): string; }
class Abstraction {
  protected implementation: Implementation;
  constructor(imp: Implementation) { this.implementation = imp; }
  operation(): string { return this.implementation.operationImplementation(); }
}`,
    java: `interface Implementation { String operationImpl(); }
abstract class Abstraction {
  protected Implementation impl;
  public Abstraction(Implementation i) { this.impl = i; }
  abstract String operation();
}`,
    go: `type Implementation interface { OperationImpl() string }
type Abstraction struct { impl Implementation }
func (a *Abstraction) Operation() string { return a.impl.OperationImpl() }`,
    python: `class Implementation: def operation_impl(self): pass
class Abstraction:
  def __init__(self, impl): self.impl = impl
  def operation(self): return self.impl.operation_impl()`,
    cpp: `class Implementation { public: virtual std::string operationImpl() = 0; };
class Abstraction {
  Implementation* impl;
public: Abstraction(Implementation* i) : impl(i) {}
  std::string operation() { return impl->operationImpl(); }
};`,
  },
  realWorldExamples: [{ title: 'Java AWT', description: 'Java AWT 使用桥接模式将组件与平台特定的实现分离。', source: 'JDK', codeSnippet: 'Component peer = component.getPeer();' }],
  relatedPatterns: ['adapter', 'strategy', 'state'],
  quiz: [{ id: 'q1', type: 'single', question: '桥接模式的主要目的是什么？', options: ['创建对象', '分离抽象和实现', '优化性能', '简化接口'], correctAnswer: 1, explanation: '桥接模式的主要目的是将抽象部分与实现部分分离，使它们可以独立变化。' }],
};
