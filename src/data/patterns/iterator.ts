import type { DesignPattern } from '@/types/pattern';

export const iteratorPattern: DesignPattern = {
  id: 'iterator',
  name: '迭代器模式',
  nameEn: 'Iterator Pattern',
  category: 'behavioral',
  difficulty: 'easy',
  frequency: 'high',
  intent: '提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。',
  description: '迭代器模式是一种行为设计模式，让你能在不暴露集合底层表现形式（列表、栈和树等）的情况下遍历集合中所有的元素。',
  applicability: ['当集合背后有复杂的数据结构，希望对客户端隐藏时', '当需要减少程序中重复的遍历代码时', '当希望代码能够遍历不同的甚至是无法预知的数据结构时'],
  pros: ['单一职责原则：将遍历算法从集合类中分离出来', '开闭原则：可以实现新类型的集合和迭代器而不影响现有代码', '可以并行遍历同一集合，因为每个迭代器对象都包含其自身的遍历状态'],
  cons: ['对于某些特殊集合，使用迭代器可能比直接遍历效率低'],
  analogy: { title: '现实世界中的迭代器', description: '迭代器就像是导游', scenarios: [{ id: 'guide', title: '博物馆导游', description: '导游（迭代器）带领游客（客户端）参观博物馆（集合），游客不需要知道博物馆的内部布局。', icon: 'Map' }] },
  structure: { classDiagram: '', animationSteps: [] },
  implementation: {
    typescript: `interface Iterator<T> { next(): T; hasNext(): boolean; }
interface IterableCollection<T> { createIterator(): Iterator<T>; }
class ConcreteIterator<T> implements Iterator<T> {
  private collection: T[]; private position = 0;
  constructor(collection: T[]) { this.collection = collection; }
  next(): T { return this.collection[this.position++]; }
  hasNext(): boolean { return this.position < this.collection.length; }
}`,
    java: `interface Iterator<T> { T next(); boolean hasNext(); }
interface IterableCollection<T> { Iterator<T> createIterator(); }
class ConcreteIterator<T> implements Iterator<T> {
  private List<T> collection; private int position = 0;
  public ConcreteIterator(List<T> collection) { this.collection = collection; }
  public T next() { return collection.get(position++); }
  public boolean hasNext() { return position < collection.size(); }
}`,
    go: `type Iterator interface { Next() interface{}; HasNext() bool }
type IterableCollection interface { CreateIterator() Iterator }
type ConcreteIterator struct { collection []interface{}; position int }
func (i *ConcreteIterator) Next() interface{} { item := i.collection[i.position]; i.position++; return item }
func (i *ConcreteIterator) HasNext() bool { return i.position < len(i.collection) }`,
    python: `class Iterator(ABC): @abstractmethod def next(self): pass; @abstractmethod def has_next(self): pass
class IterableCollection(ABC): @abstractmethod def create_iterator(self): pass
class ConcreteIterator(Iterator):
  def __init__(self, collection): self._collection = collection; self._position = 0
  def next(self): item = self._collection[self._position]; self._position += 1; return item
  def has_next(self): return self._position < len(self._collection)`,
    cpp: `template<typename T> class Iterator { public: virtual T next() = 0; virtual bool hasNext() = 0; };
template<typename T> class IterableCollection { public: virtual Iterator<T>* createIterator() = 0; };
template<typename T> class ConcreteIterator : public Iterator<T> { std::vector<T> collection; size_t position = 0; public: ConcreteIterator(const std::vector<T>& c) : collection(c) {} T next() override { return collection[position++]; } bool hasNext() override { return position < collection.size(); } };`,
  },
  realWorldExamples: [{ title: 'Java Iterator', description: 'Java 集合框架中的 Iterator 是迭代器模式的典型应用。', source: 'JDK', codeSnippet: 'Iterator<String> it = list.iterator(); while (it.hasNext()) { System.out.println(it.next()); }' }],
  relatedPatterns: ['composite', 'factory-method', 'memento'],
  quiz: [{ id: 'q1', type: 'single', question: '迭代器模式的主要目的是什么？', options: ['创建对象', '顺序访问集合元素', '优化性能', '转换接口'], correctAnswer: 1, explanation: '迭代器模式的主要目的是提供一种方法顺序访问一个聚合对象中的各个元素，而不需要暴露该对象的内部表示。' }],
};
