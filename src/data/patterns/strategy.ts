import type { DesignPattern } from '@/types/pattern';

export const strategyPattern: DesignPattern = {
  id: 'strategy',
  name: '策略模式',
  nameEn: 'Strategy Pattern',
  category: 'behavioral',
  difficulty: 'easy',
  frequency: 'high',
  intent: '定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换。策略模式让算法的变化独立于使用算法的客户。',
  description: '策略模式是一种行为设计模式，它能让你定义一系列算法，并将每种算法分别放入独立的类中，以使算法的对象能够相互替换。',
  applicability: ['当你想使用对象中各种不同的算法变体，并希望能在运行时切换算法时', '当你有许多仅在执行某些行为时略有不同的相似类时', '当算法在上下文的逻辑中不是特别重要时'],
  pros: ['可以在运行时切换对象内的算法', '可以将算法的实现和使用算法的代码隔离开来', '可以使用组合来代替继承', '开闭原则：无需对上下文进行修改就能够引入新的策略'],
  cons: ['如果你的算法极少发生改变，那么没有任何理由引入新的类和接口', '客户端必须知晓策略间的不同，以便选择合适的策略'],
  analogy: { title: '现实世界中的策略', description: '策略模式就像是出行方式', scenarios: [{ id: 'travel', title: '出行方式', description: '去机场可以选择公交、地铁、出租车或自驾，这些是不同的策略，可以根据时间、预算等因素选择。', icon: 'Car' }] },
  structure: { classDiagram: '', animationSteps: [] },
  implementation: {
    typescript: `interface Strategy { execute(a: number, b: number): number; }
class ConcreteStrategyAdd implements Strategy { execute(a: number, b: number): number { return a + b; } }
class ConcreteStrategySubtract implements Strategy { execute(a: number, b: number): number { return a - b; } }
class Context { private strategy: Strategy; setStrategy(s: Strategy) { this.strategy = s; } executeStrategy(a: number, b: number): number { return this.strategy.execute(a, b); } }`,
    java: `interface Strategy { int execute(int a, int b); }
class ConcreteStrategyAdd implements Strategy { public int execute(int a, int b) { return a + b; } }
class ConcreteStrategySubtract implements Strategy { public int execute(int a, int b) { return a - b; } }
class Context { private Strategy strategy; public void setStrategy(Strategy s) { this.strategy = s; } public int executeStrategy(int a, int b) { return strategy.execute(a, b); } }`,
    go: `type Strategy interface { Execute(a, b int) int }
type ConcreteStrategyAdd struct{}
func (s *ConcreteStrategyAdd) Execute(a, b int) int { return a + b }
type ConcreteStrategySubtract struct{}
func (s *ConcreteStrategySubtract) Execute(a, b int) int { return a - b }
type Context struct { strategy Strategy }
func (c *Context) SetStrategy(s Strategy) { c.strategy = s }
func (c *Context) ExecuteStrategy(a, b int) int { return c.strategy.Execute(a, b) }`,
    python: `class Strategy(ABC): @abstractmethod def execute(self, a, b): pass
class ConcreteStrategyAdd(Strategy): def execute(self, a, b): return a + b
class ConcreteStrategySubtract(Strategy): def execute(self, a, b): return a - b
class Context:
  def __init__(self): self._strategy = None
  def set_strategy(self, strategy): self._strategy = strategy
  def execute_strategy(self, a, b): return self._strategy.execute(a, b)`,
    cpp: `class Strategy { public: virtual int execute(int a, int b) = 0; };
class ConcreteStrategyAdd : public Strategy { public: int execute(int a, int b) override { return a + b; } };
class ConcreteStrategySubtract : public Strategy { public: int execute(int a, int b) override { return a - b; } };
class Context { Strategy* strategy; public: void setStrategy(Strategy* s) { strategy = s; } int executeStrategy(int a, int b) { return strategy->execute(a, b); } };`,
  },
  realWorldExamples: [{ title: 'Java Collections', description: 'Java 集合框架中的 Comparator 接口是策略模式的典型应用。', source: 'JDK', codeSnippet: 'Collections.sort(list, (a, b) -> a.length() - b.length());' }],
  relatedPatterns: ['state', 'bridge', 'decorator'],
  quiz: [{ id: 'q1', type: 'single', question: '策略模式的主要目的是什么？', options: ['创建对象', '封装算法并使它们可互换', '优化性能', '转换接口'], correctAnswer: 1, explanation: '策略模式的主要目的是定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换。' }],
};
