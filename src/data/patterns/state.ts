import type { DesignPattern } from '@/types/pattern';

export const statePattern: DesignPattern = {
  id: 'state',
  name: '状态模式',
  nameEn: 'State Pattern',
  category: 'behavioral',
  difficulty: 'medium',
  frequency: 'medium',
  intent: '允许对象在内部状态改变时改变它的行为。对象看起来似乎修改了它的类。',
  description: '状态模式是一种行为设计模式，让你能在一个对象的内部状态变化时改变其行为，使其看上去就像改变了自身所属的类一样。',
  applicability: ['当对象的行为取决于它的状态，并且它必须在运行时刻根据状态改变它的行为时', '当代码中包含大量与对象状态有关的条件语句时'],
  pros: ['单一职责原则：将与特定状态相关的代码放在单独的类中', '开闭原则：无需修改现有状态类和上下文就能引入新状态', '通过消除臃肿的状态机条件语句简化上下文代码'],
  cons: ['如果状态机只有很少的几个状态，或者很少发生改变，那么应用该模式可能会显得小题大做'],
  analogy: { title: '现实世界中的状态', description: '状态模式就像是交通信号灯', scenarios: [{ id: 'traffic', title: '交通信号灯', description: '信号灯在不同状态（红、黄、绿）下有不同的行为，状态转换由当前状态决定。', icon: 'TrafficLight' }] },
  structure: { classDiagram: '', animationSteps: [] },
  implementation: {
    typescript: `interface State { handle(context: Context): void; }
class ConcreteStateA implements State { handle(context: Context): void { console.log('State A'); context.setState(new ConcreteStateB()); } }
class ConcreteStateB implements State { handle(context: Context): void { console.log('State B'); context.setState(new ConcreteStateA()); } }
class Context { private state: State; constructor(state: State) { this.state = state; } setState(state: State) { this.state = state; } request() { this.state.handle(this); } }`,
    java: `interface State { void handle(Context context); }
class ConcreteStateA implements State { public void handle(Context context) { System.out.println("State A"); context.setState(new ConcreteStateB()); } }
class ConcreteStateB implements State { public void handle(Context context) { System.out.println("State B"); context.setState(new ConcreteStateA()); } }
class Context { private State state; public Context(State state) { this.state = state; } public void setState(State state) { this.state = state; } public void request() { state.handle(this); } }`,
    go: `type State interface { Handle(*Context) }
type ConcreteStateA struct{}
func (s *ConcreteStateA) Handle(c *Context) { println("State A"); c.SetState(&ConcreteStateB{}) }
type ConcreteStateB struct{}
func (s *ConcreteStateB) Handle(c *Context) { println("State B"); c.SetState(&ConcreteStateA{}) }
type Context struct { state State }
func (c *Context) SetState(state State) { c.state = state }
func (c *Context) Request() { c.state.Handle(c) }`,
    python: `class State(ABC): @abstractmethod def handle(self, context): pass
class ConcreteStateA(State): def handle(self, context): print("State A"); context.set_state(ConcreteStateB())
class ConcreteStateB(State): def handle(self, context): print("State B"); context.set_state(ConcreteStateA())
class Context:
  def __init__(self, state): self._state = state
  def set_state(self, state): self._state = state
  def request(self): self._state.handle(self)`,
    cpp: `class Context;
class State { public: virtual void handle(Context* context) = 0; };
class ConcreteStateA : public State { public: void handle(Context* context) override; };
class ConcreteStateB : public State { public: void handle(Context* context) override; };
class Context { State* state; public: Context(State* s) : state(s) {} void setState(State* s) { state = s; } void request() { state->handle(this); } };`,
  },
  realWorldExamples: [{ title: 'Thread States', description: 'Java 线程的状态转换（NEW、RUNNABLE、BLOCKED、WAITING、TIMED_WAITING、TERMINATED）使用状态模式。', source: 'JDK', codeSnippet: 'Thread.State state = thread.getState();' }],
  relatedPatterns: ['strategy', 'flyweight', 'singleton'],
  quiz: [{ id: 'q1', type: 'single', question: '状态模式的主要目的是什么？', options: ['创建对象', '根据状态改变行为', '优化性能', '转换接口'], correctAnswer: 1, explanation: '状态模式的主要目的是允许对象在内部状态改变时改变它的行为。' }],
};
