import type { DesignPattern } from '@/types/pattern';

export const mediatorPattern: DesignPattern = {
  id: 'mediator',
  name: '中介者模式',
  nameEn: 'Mediator Pattern',
  category: 'behavioral',
  difficulty: 'medium',
  frequency: 'medium',
  intent: '用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。',
  description: '中介者模式是一种行为设计模式，能让你减少对象之间混乱无序的依赖关系。该模式会限制对象之间的直接交互，迫使它们通过一个中介者对象进行合作。',
  applicability: ['当一些对象和其他对象紧密耦合以致难以对其进行修改时', '当组件因过于依赖其他组件而无法在不同应用中复用时', '当为了能在不同情景下复用一些基本行为，需要创建大量组件子类时'],
  pros: ['单一职责原则：将多个组件间的交流抽取到同一位置，使其更易于理解和维护', '开闭原则：无需修改实际组件就能增加新的中介者', '可以减轻应用中多个组件间的耦合情况'],
  cons: ['一段时间后，中介者可能会演化成上帝对象'],
  analogy: { title: '现实世界中的中介者', description: '中介者就像是机场塔台', scenarios: [{ id: 'tower', title: '机场塔台', description: '飞机（组件）不直接相互通信，而是通过塔台（中介者）协调起飞和降落。', icon: 'TowerControl' }] },
  structure: { classDiagram: '', animationSteps: [] },
  implementation: {
    typescript: `interface Mediator { notify(sender: object, event: string): void; }
class ConcreteMediator implements Mediator {
  private component1: Component1; private component2: Component2;
  constructor(c1: Component1, c2: Component2) { this.component1 = c1; this.component1.setMediator(this); this.component2 = c2; this.component2.setMediator(this); }
  notify(sender: object, event: string): void { if (event === 'A') { this.component2.doC(); } }
}
class BaseComponent { protected mediator: Mediator; setMediator(m: Mediator) { this.mediator = m; } }
class Component1 extends BaseComponent { doA() { this.mediator.notify(this, 'A'); } }
class Component2 extends BaseComponent { doC() { console.log('Component2 does C'); } }`,
    java: `interface Mediator { void notify(Component sender, String event); }
class ConcreteMediator implements Mediator {
  private Component1 component1; private Component2 component2;
  public ConcreteMediator(Component1 c1, Component2 c2) { this.component1 = c1; this.component1.setMediator(this); this.component2 = c2; this.component2.setMediator(this); }
  public void notify(Component sender, String event) { if (event.equals("A")) { component2.doC(); } }
}
abstract class Component { protected Mediator mediator; public void setMediator(Mediator m) { this.mediator = m; } }
class Component1 extends Component { public void doA() { mediator.notify(this, "A"); } }
class Component2 extends Component { public void doC() { System.out.println("Component2 does C"); } }`,
    go: `type Mediator interface { Notify(sender interface{}, event string) }
type ConcreteMediator struct { c1 *Component1; c2 *Component2 }
func (m *ConcreteMediator) Notify(sender interface{}, event string) { if event == "A" { m.c2.DoC() } }
type Component struct { mediator Mediator }
func (c *Component) SetMediator(m Mediator) { c.mediator = m }
type Component1 struct { Component }
func (c *Component1) DoA() { c.mediator.Notify(c, "A") }
type Component2 struct { Component }
func (c *Component2) DoC() { println("Component2 does C") }`,
    python: `class Mediator(ABC): @abstractmethod def notify(self, sender, event): pass
class ConcreteMediator(Mediator):
  def __init__(self, c1, c2): self._c1 = c1; self._c1.mediator = self; self._c2 = c2; self._c2.mediator = self
  def notify(self, sender, event): if event == "A": self._c2.do_c()
class Component:
  def __init__(self): self._mediator = None
  @property
  def mediator(self): return self._mediator
  @mediator.setter
  def mediator(self, mediator): self._mediator = mediator
class Component1(Component):
  def do_a(self): self._mediator.notify(self, "A")
class Component2(Component):
  def do_c(self): print("Component2 does C")`,
    cpp: `class Mediator { public: virtual void notify(Component* sender, std::string event) = 0; };
class ConcreteMediator : public Mediator { Component1* c1; Component2* c2; public: ConcreteMediator(Component1* comp1, Component2* comp2) : c1(comp1), c2(comp2) { c1->setMediator(this); c2->setMediator(this); } void notify(Component* sender, std::string event) override { if (event == "A") c2->doC(); } };
class Component { protected: Mediator* mediator; public: void setMediator(Mediator* m) { mediator = m; } };
class Component1 : public Component { public: void doA() { mediator->notify(this, "A"); } };
class Component2 : public Component { public: void doC() { std::cout << "Component2 does C" << std::endl; } };`,
  },
  realWorldExamples: [{ title: 'Java Message Queue', description: '消息队列是中介者模式的典型应用，生产者消费者通过队列通信。', source: 'Java EE', codeSnippet: 'jmsTemplate.convertAndSend("queue", message);' }],
  relatedPatterns: ['observer', 'facade', 'command'],
  quiz: [{ id: 'q1', type: 'single', question: '中介者模式的主要目的是什么？', options: ['创建对象', '封装对象交互', '优化性能', '转换接口'], correctAnswer: 1, explanation: '中介者模式的主要目的是用一个中介对象来封装一系列的对象交互，使各对象不需要显式地相互引用。' }],
};
