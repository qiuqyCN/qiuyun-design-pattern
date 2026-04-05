import type { DesignPattern } from '@/types/pattern';

export const mementoPattern: DesignPattern = {
  id: 'memento',
  name: '备忘录模式',
  nameEn: 'Memento Pattern',
  category: 'behavioral',
  difficulty: 'medium',
  frequency: 'low',
  intent: '在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样以后就可将该对象恢复到原先保存的状态。',
  description: '备忘录模式是一种行为设计模式，允许在不暴露对象实现细节的情况下保存和恢复对象之前的状态。',
  applicability: ['当需要创建对象状态快照来恢复其之前的状态时', '当直接访问对象的成员变量、获取器或设置器将导致封装被突破时'],
  pros: ['可以在不破坏对象封装的情况下创建对象状态快照', '可以通过让负责人维护备忘录历史记录来简化原发器代码'],
  cons: ['如果客户端过于频繁地创建备忘录，程序将消耗大量内存', '负责人必须完整跟踪原发器的生命周期，这样才能销毁弃用的备忘录'],
  analogy: { title: '现实世界中的备忘录', description: '备忘录就像是游戏存档', scenarios: [{ id: 'save', title: '游戏存档', description: '你可以随时保存游戏状态（备忘录），之后可以加载存档回到之前的状态。', icon: 'Save' }] },
  structure: { classDiagram: '', animationSteps: [] },
  implementation: {
    typescript: `class Memento { constructor(private state: string) {} getState(): string { return this.state; } }
class Originator {
  private state: string = '';
  setState(state: string) { this.state = state; }
  save(): Memento { return new Memento(this.state); }
  restore(m: Memento) { this.state = m.getState(); }
}
class Caretaker { private mementos: Memento[] = []; add(m: Memento) { this.mementos.push(m); } get(index: number): Memento { return this.mementos[index]; } }`,
    java: `class Memento { private final String state; public Memento(String state) { this.state = state; } public String getState() { return state; } }
class Originator {
  private String state;
  public void setState(String state) { this.state = state; }
  public Memento save() { return new Memento(state); }
  public void restore(Memento m) { state = m.getState(); }
}
class Caretaker { private List<Memento> mementos = new ArrayList<>(); public void add(Memento m) { mementos.add(m); } public Memento get(int index) { return mementos.get(index); } }`,
    go: `type Memento struct { state string }
func (m *Memento) GetState() string { return m.state }
type Originator struct { state string }
func (o *Originator) SetState(state string) { o.state = state }
func (o *Originator) Save() *Memento { return &Memento{state: o.state} }
func (o *Originator) Restore(m *Memento) { o.state = m.GetState() }
type Caretaker struct { mementos []*Memento }
func (c *Caretaker) Add(m *Memento) { c.mementos = append(c.mementos, m) }
func (c *Caretaker) Get(index int) *Memento { return c.mementos[index] }`,
    python: `class Memento: def __init__(self, state): self._state = state; def get_state(self): return self._state
class Originator:
  def __init__(self): self._state = None
  def set_state(self, state): self._state = state
  def save(self): return Memento(self._state)
  def restore(self, memento): self._state = memento.get_state()
class Caretaker:
  def __init__(self): self._mementos = []
  def add(self, memento): self._mementos.append(memento)
  def get(self, index): return self._mementos[index]`,
    cpp: `class Memento { std::string state; public: Memento(const std::string& s) : state(s) {} std::string getState() const { return state; } };
class Originator { std::string state; public: void setState(const std::string& s) { state = s; } Memento* save() { return new Memento(state); } void restore(Memento* m) { state = m->getState(); } };
class Caretaker { std::vector<Memento*> mementos; public: void add(Memento* m) { mementos.push_back(m); } Memento* get(size_t index) { return mementos[index]; } };`,
  },
  realWorldExamples: [{ title: 'Git Version Control', description: 'Git 的版本控制就是备忘录模式的典型应用，可以保存和恢复代码状态。', source: 'Git', codeSnippet: 'git commit -m "Save state"; git checkout HEAD~1;' }],
  relatedPatterns: ['command', 'iterator', 'prototype'],
  quiz: [{ id: 'q1', type: 'single', question: '备忘录模式的主要目的是什么？', options: ['创建对象', '保存和恢复对象状态', '优化性能', '转换接口'], correctAnswer: 1, explanation: '备忘录模式的主要目的是在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。' }],
};
