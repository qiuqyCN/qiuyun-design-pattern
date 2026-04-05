import type { DesignPattern } from '@/types/pattern';

export const decoratorPattern: DesignPattern = {
  id: 'decorator',
  name: '装饰器模式',
  nameEn: 'Decorator Pattern',
  category: 'structural',
  difficulty: 'medium',
  frequency: 'high',
  intent: '动态地给一个对象添加一些额外的职责。就增加功能来说，装饰器模式相比生成子类更为灵活。',
  description: '装饰器模式是一种结构型设计模式，允许你通过将对象放入包含行为的特殊包装对象中来为原对象绑定新的行为。',
  applicability: ['当需要在运行时动态添加功能时', '当需要扩展一个类的功能，但继承不是可行选项时'],
  pros: ['可以在运行时添加或删除对象的功能', '可以用多个装饰器包装对象', '单一职责原则：将功能划分为不同类'],
  cons: ['在装饰器栈中删除特定装饰器比较困难', '实现行为不受装饰器栈顺序影响的装饰器可能很困难'],
  analogy: { title: '现实世界中的装饰器', description: '装饰器就像是穿衣服', scenarios: [{ id: 'clothes', title: '穿衣服', description: '你穿上T恤，再穿上衬衫，再穿上外套。每层衣服都给你添加了新的功能（保暖、正式外观等）。', icon: 'Shirt' }] },
  structure: { classDiagram: '', animationSteps: [] },
  implementation: {
    typescript: `interface Component { operation(): string; }
class ConcreteComponent implements Component { operation(): string { return 'Component'; } }
class Decorator implements Component {
  constructor(protected component: Component) {}
  operation(): string { return this.component.operation(); }
}
class ConcreteDecorator extends Decorator {
  operation(): string { return super.operation() + ' + Decorated'; }
}`,
    java: `interface Component { String operation(); }
class ConcreteComponent implements Component { public String operation() { return "Component"; } }
class Decorator implements Component {
  protected Component component;
  public Decorator(Component c) { this.component = c; }
  public String operation() { return component.operation(); }
}
class ConcreteDecorator extends Decorator {
  public ConcreteDecorator(Component c) { super(c); }
  public String operation() { return super.operation() + " + Decorated"; }
}`,
    go: `type Component interface { Operation() string }
type ConcreteComponent struct{}
func (c *ConcreteComponent) Operation() string { return "Component" }
type Decorator struct { component Component }
func (d *Decorator) Operation() string { return d.component.Operation() }
type ConcreteDecorator struct { Decorator }
func (d *ConcreteDecorator) Operation() string { return d.Decorator.Operation() + " + Decorated" }`,
    python: `class Component(ABC): @abstractmethod def operation(self): pass
class ConcreteComponent(Component): def operation(self): return "Component"
class Decorator(Component):
  def __init__(self, component): self._component = component
  def operation(self): return self._component.operation()
class ConcreteDecorator(Decorator):
  def operation(self): return super().operation() + " + Decorated"`,
    cpp: `class Component { public: virtual std::string operation() = 0; };
class ConcreteComponent : public Component { public: std::string operation() override { return "Component"; } };
class Decorator : public Component {
  Component* component;
public: Decorator(Component* c) : component(c) {}
  std::string operation() override { return component->operation(); }
};`,
  },
  realWorldExamples: [{ title: 'Java IO', description: 'Java IO 类大量使用装饰器模式，如 BufferedReader 包装 FileReader。', source: 'JDK', codeSnippet: 'Reader reader = new BufferedReader(new FileReader("file.txt"));' }],
  relatedPatterns: ['adapter', 'composite', 'strategy'],
  quiz: [{ id: 'q1', type: 'single', question: '装饰器模式的主要目的是什么？', options: ['创建对象', '动态添加功能', '删除功能', '转换接口'], correctAnswer: 1, explanation: '装饰器模式的主要目的是动态地给一个对象添加一些额外的职责。' }],
};
