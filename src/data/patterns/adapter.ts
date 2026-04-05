import type { DesignPattern } from '@/types/pattern';

export const adapterPattern: DesignPattern = {
  id: 'adapter',
  name: '适配器模式',
  nameEn: 'Adapter Pattern',
  category: 'structural',
  difficulty: 'easy',
  frequency: 'high',
  intent: '将一个类的接口转换成客户希望的另外一个接口。适配器模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。',
  description: '适配器模式是一种结构型设计模式，它能使接口不兼容的对象能够相互合作。',
  applicability: ['当需要使用一个现有类，但其接口不符合需求时', '当需要创建一个可复用的类，该类可以与不相关或不可预见的类协同工作时'],
  pros: ['单一职责原则：将接口转换代码与业务逻辑分离', '开闭原则：引入新类型的适配器时无需修改客户端代码'],
  cons: ['代码复杂度增加', '有时直接修改服务类可能更简单'],
  analogy: { title: '现实世界中的适配器', description: '适配器就像是电源转换插头', scenarios: [{ id: 'plug', title: '电源转换插头', description: '出国旅行时，你需要一个转换插头来让你的电器适应当地的插座。', icon: 'Plug' }] },
  structure: { classDiagram: '', animationSteps: [] },
  implementation: {
    typescript: `interface Target { request(): string; }
class Adaptee { specificRequest(): string { return 'Specific request'; } }
class Adapter implements Target {
  constructor(private adaptee: Adaptee) {}
  request(): string { return this.adaptee.specificRequest(); }
}`,
    java: `interface Target { String request(); }
class Adaptee { String specificRequest() { return "Specific"; } }
class Adapter implements Target {
  private Adaptee adaptee;
  public Adapter(Adaptee a) { this.adaptee = a; }
  public String request() { return adaptee.specificRequest(); }
}`,
    go: `type Target interface { Request() string }
type Adaptee struct{}
func (a *Adaptee) SpecificRequest() string { return "Specific" }
type Adapter struct { adaptee *Adaptee }
func (a *Adapter) Request() string { return a.adaptee.SpecificRequest() }`,
    python: `class Target: def request(self): pass
class Adaptee: def specific_request(self): return "Specific"
class Adapter(Target):
  def __init__(self, adaptee): self.adaptee = adaptee
  def request(self): return self.adaptee.specific_request()`,
    cpp: `class Target { public: virtual std::string request() = 0; };
class Adaptee { public: std::string specificRequest() { return "Specific"; } };
class Adapter : public Target {
  Adaptee* adaptee;
public: Adapter(Adaptee* a) : adaptee(a) {}
  std::string request() override { return adaptee->specificRequest(); }
};`,
  },
  realWorldExamples: [{ title: 'Java IO', description: 'Java IO 中的 InputStreamReader 和 OutputStreamWriter 是适配器的典型例子。', source: 'JDK', codeSnippet: 'Reader reader = new InputStreamReader(inputStream);' }],
  relatedPatterns: ['bridge', 'decorator', 'proxy'],
  quiz: [{ id: 'q1', type: 'single', question: '适配器模式的主要目的是什么？', options: ['创建对象', '转换接口', '销毁对象', '优化性能'], correctAnswer: 1, explanation: '适配器模式的主要目的是将一个类的接口转换成客户希望的另外一个接口。' }],
};
