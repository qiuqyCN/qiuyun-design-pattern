import type { DesignPattern } from '@/types/pattern';

export const visitorPattern: DesignPattern = {
  id: 'visitor',
  name: '访问者模式',
  nameEn: 'Visitor Pattern',
  category: 'behavioral',
  difficulty: 'hard',
  frequency: 'low',
  intent: '表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。',
  description: '访问者模式是一种行为设计模式，它能将算法与其所作用的对象隔离开来。',
  applicability: ['当需要对一个复杂对象结构（例如对象树）中的所有元素执行某些操作时', '当需要清理复杂对象结构的逻辑和业务逻辑时', '当某个行为仅在类层次结构中的一些类中有意义，而在其他类中没有意义时'],
  pros: ['开闭原则：可以引入在不同类对象上执行的新行为，且无需修改这些类', '单一职责原则：可将同一行为的不同版本移到同一个类中', '访问者对象可以在与各种对象交互时收集一些有用的信息'],
  cons: ['每次在元素层次结构中添加或移除一个类时，都要更新所有的访问者', '访问者可能缺乏访问元素私有成员变量和方法的必要权限'],
  analogy: { title: '现实世界中的访问者', description: '访问者就像是税务检查员', scenarios: [{ id: 'tax', title: '税务检查', description: '税务检查员（访问者）访问不同的企业（元素），对每个企业执行相同的检查操作，但处理细节因企业类型而异。', icon: 'FileText' }] },
  structure: { classDiagram: '', animationSteps: [] },
  implementation: {
    typescript: `interface Visitor { visitConcreteElementA(element: ConcreteElementA): void; visitConcreteElementB(element: ConcreteElementB): void; }
interface Element { accept(visitor: Visitor): void; }
class ConcreteElementA implements Element { accept(visitor: Visitor): void { visitor.visitConcreteElementA(this); } }
class ConcreteElementB implements Element { accept(visitor: Visitor): void { visitor.visitConcreteElementB(this); } }
class ConcreteVisitor implements Visitor { visitConcreteElementA(element: ConcreteElementA): void { console.log('Visiting A'); } visitConcreteElementB(element: ConcreteElementB): void { console.log('Visiting B'); } }`,
    java: `interface Visitor { void visit(ConcreteElementA element); void visit(ConcreteElementB element); }
interface Element { void accept(Visitor visitor); }
class ConcreteElementA implements Element { public void accept(Visitor visitor) { visitor.visit(this); } }
class ConcreteElementB implements Element { public void accept(Visitor visitor) { visitor.visit(this); } }
class ConcreteVisitor implements Visitor { public void visit(ConcreteElementA element) { System.out.println("Visiting A"); } public void visit(ConcreteElementB element) { System.out.println("Visiting B"); } }`,
    go: `type Visitor interface { VisitConcreteElementA(*ConcreteElementA); VisitConcreteElementB(*ConcreteElementB) }
type Element interface { Accept(Visitor) }
type ConcreteElementA struct{}
func (e *ConcreteElementA) Accept(v Visitor) { v.VisitConcreteElementA(e) }
type ConcreteElementB struct{}
func (e *ConcreteElementB) Accept(v Visitor) { v.VisitConcreteElementB(e) }
type ConcreteVisitor struct{}
func (v *ConcreteVisitor) VisitConcreteElementA(e *ConcreteElementA) { println("Visiting A") }
func (v *ConcreteVisitor) VisitConcreteElementB(e *ConcreteElementB) { println("Visiting B") }`,
    python: `class Visitor(ABC): @abstractmethod def visit_concrete_element_a(self, element): pass; @abstractmethod def visit_concrete_element_b(self, element): pass
class Element(ABC): @abstractmethod def accept(self, visitor): pass
class ConcreteElementA(Element): def accept(self, visitor): visitor.visit_concrete_element_a(self)
class ConcreteElementB(Element): def accept(self, visitor): visitor.visit_concrete_element_b(self)
class ConcreteVisitor(Visitor): def visit_concrete_element_a(self, element): print("Visiting A"); def visit_concrete_element_b(self, element): print("Visiting B")`,
    cpp: `class ConcreteElementA; class ConcreteElementB;
class Visitor { public: virtual void visit(ConcreteElementA* element) = 0; virtual void visit(ConcreteElementB* element) = 0; };
class Element { public: virtual void accept(Visitor* visitor) = 0; };
class ConcreteElementA : public Element { public: void accept(Visitor* visitor) override { visitor->visit(this); } };
class ConcreteElementB : public Element { public: void accept(Visitor* visitor) override { visitor->visit(this); } };
class ConcreteVisitor : public Visitor { public: void visit(ConcreteElementA* element) override { std::cout << "Visiting A" << std::endl; } void visit(ConcreteElementB* element) override { std::cout << "Visiting B" << std::endl; } };`,
  },
  realWorldExamples: [{ title: 'Java NIO FileVisitor', description: 'Java NIO 中的 FileVisitor 接口是访问者模式的典型应用。', source: 'JDK', codeSnippet: 'Files.walkFileTree(path, new SimpleFileVisitor<Path>() { ... });' }],
  relatedPatterns: ['composite', 'iterator', 'strategy'],
  quiz: [{ id: 'q1', type: 'single', question: '访问者模式的主要目的是什么？', options: ['创建对象', '在不改变元素类的前提下定义新操作', '优化性能', '转换接口'], correctAnswer: 1, explanation: '访问者模式的主要目的是表示一个作用于某对象结构中的各元素的操作，使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。' }],
};
