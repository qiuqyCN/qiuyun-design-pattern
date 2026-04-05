import type { DesignPattern } from '@/types/pattern';

export const templateMethodPattern: DesignPattern = {
  id: 'template-method',
  name: '模板方法模式',
  nameEn: 'Template Method Pattern',
  category: 'behavioral',
  difficulty: 'easy',
  frequency: 'medium',
  intent: '定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。',
  description: '模板方法模式是一种行为设计模式，它在超类中定义了一个算法的框架，允许子类在不修改结构的情况下重写算法的特定步骤。',
  applicability: ['当你只希望客户端扩展某个特定算法步骤，而不是整个算法或其结构时', '当你有几个类包含相似的、仅在特定步骤上有所不同的算法时'],
  pros: ['你可以仅允许客户端重写一个大型算法中的特定部分，使得修改其他部分所造成的影响减小', '你可以将重复代码提取到一个超类中'],
  cons: ['部分客户端可能会受到算法框架的限制', '通过子类来抑制默认步骤实现可能会导致违反里氏替换原则', '模板方法中的步骤越多，其维护工作就可能会越困难'],
  analogy: { title: '现实世界中的模板方法', description: '模板方法就像是建筑蓝图', scenarios: [{ id: 'building', title: '建筑蓝图', description: '建筑师提供建筑蓝图（模板），定义了建造的步骤顺序，但具体材料选择可以由施工方决定。', icon: 'Building' }] },
  structure: { classDiagram: '', animationSteps: [] },
  implementation: {
    typescript: `abstract class AbstractClass {
  templateMethod(): void { this.baseOperation1(); this.requiredOperation1(); this.baseOperation2(); this.hook(); }
  baseOperation1(): void { console.log('AbstractClass: Base operation 1'); }
  baseOperation2(): void { console.log('AbstractClass: Base operation 2'); }
  abstract requiredOperation1(): void;
  hook(): void {}
}
class ConcreteClass extends AbstractClass { requiredOperation1(): void { console.log('ConcreteClass: Required operation'); } }`,
    java: `abstract class AbstractClass {
  public final void templateMethod() { baseOperation1(); requiredOperation1(); baseOperation2(); hook(); }
  void baseOperation1() { System.out.println("AbstractClass: Base operation 1"); }
  void baseOperation2() { System.out.println("AbstractClass: Base operation 2"); }
  abstract void requiredOperation1();
  void hook() {}
}
class ConcreteClass extends AbstractClass { void requiredOperation1() { System.out.println("ConcreteClass: Required operation"); } }`,
    go: `type AbstractClass struct{}
func (a *AbstractClass) TemplateMethod() { a.BaseOperation1(); a.RequiredOperation1(); a.BaseOperation2(); a.Hook() }
func (a *AbstractClass) BaseOperation1() { println("Base operation 1") }
func (a *AbstractClass) BaseOperation2() { println("Base operation 2") }
func (a *AbstractClass) RequiredOperation1() {}
func (a *AbstractClass) Hook() {}
type ConcreteClass struct { AbstractClass }
func (c *ConcreteClass) RequiredOperation1() { println("Required operation") }`,
    python: `class AbstractClass(ABC):
  def template_method(self): self.base_operation1(); self.required_operation1(); self.base_operation2(); self.hook()
  def base_operation1(self): print("Base operation 1")
  def base_operation2(self): print("Base operation 2")
  @abstractmethod def required_operation1(self): pass
  def hook(self): pass
class ConcreteClass(AbstractClass): def required_operation1(self): print("Required operation")`,
    cpp: `class AbstractClass { public: void templateMethod() { baseOperation1(); requiredOperation1(); baseOperation2(); hook(); } void baseOperation1() { std::cout << "Base operation 1" << std::endl; } void baseOperation2() { std::cout << "Base operation 2" << std::endl; } virtual void requiredOperation1() = 0; virtual void hook() {} };
class ConcreteClass : public AbstractClass { void requiredOperation1() override { std::cout << "Required operation" << std::endl; } };`,
  },
  realWorldExamples: [{ title: 'Java Servlet', description: 'Java Servlet 的 doGet、doPost 方法是模板方法模式的典型应用。', source: 'Java EE', codeSnippet: 'protected void doGet(HttpServletRequest req, HttpServletResponse resp) { ... }' }],
  relatedPatterns: ['factory-method', 'strategy', 'state'],
  quiz: [{ id: 'q1', type: 'single', question: '模板方法模式的主要目的是什么？', options: ['创建对象', '定义算法骨架，延迟步骤到子类', '优化性能', '转换接口'], correctAnswer: 1, explanation: '模板方法模式的主要目的是定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。' }],
};
