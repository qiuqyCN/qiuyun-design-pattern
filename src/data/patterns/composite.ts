import type { DesignPattern } from '@/types/pattern';

export const compositePattern: DesignPattern = {
  id: 'composite',
  name: '组合模式',
  nameEn: 'Composite Pattern',
  category: 'structural',
  difficulty: 'medium',
  frequency: 'medium',
  intent: '将对象组合成树形结构以表示"部分-整体"的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。',
  description: '组合模式是一种结构型设计模式，你可以使用它将对象组合成树状结构，并且能像使用独立对象一样使用它们。',
  applicability: ['当需要实现树状对象结构时', '当希望客户端代码以相同方式处理简单和复杂元素时'],
  pros: ['可以利用多态和递归以更方便的方式使用复杂树结构', '开闭原则：无需更改现有代码，就能在应用中添加新元素'],
  cons: ['对于功能差异较大的类，提供公共接口可能会有困难', '在某些情况下，过度使用组合模式会导致代码更加复杂'],
  analogy: { title: '现实世界中的组合', description: '组合模式就像是文件系统', scenarios: [{ id: 'filesystem', title: '文件系统', description: '文件系统由文件和文件夹组成，文件夹可以包含文件和其他文件夹，形成树形结构。', icon: 'Folder' }] },
  structure: { classDiagram: '', animationSteps: [] },
  implementation: {
    typescript: `interface Component { operation(): string; }
class Leaf implements Component { operation(): string { return 'Leaf'; } }
class Composite implements Component {
  private children: Component[] = [];
  add(c: Component) { this.children.push(c); }
  operation(): string { return this.children.map(c => c.operation()).join('+'); }
}`,
    java: `interface Component { String operation(); }
class Leaf implements Component { public String operation() { return "Leaf"; } }
class Composite implements Component {
  private List<Component> children = new ArrayList<>();
  public void add(Component c) { children.add(c); }
  public String operation() { return children.stream().map(Component::operation).collect(Collectors.joining("+")); }
}`,
    go: `type Component interface { Operation() string }
type Leaf struct{}
func (l *Leaf) Operation() string { return "Leaf" }
type Composite struct { children []Component }
func (c *Composite) Add(child Component) { c.children = append(c.children, child) }
func (c *Composite) Operation() string { result := ""; for _, child := range c.children { result += child.Operation() }; return result }`,
    python: `class Component(ABC): @abstractmethod def operation(self): pass
class Leaf(Component): def operation(self): return "Leaf"
class Composite(Component):
  def __init__(self): self.children = []
  def add(self, component): self.children.append(component)
  def operation(self): return "+".join(child.operation() for child in self.children)`,
    cpp: `class Component { public: virtual std::string operation() = 0; };
class Leaf : public Component { public: std::string operation() override { return "Leaf"; } };
class Composite : public Component {
  std::vector<Component*> children;
public: void add(Component* c) { children.push_back(c); }
  std::string operation() override { std::string result; for(auto* c : children) result += c->operation(); return result; }
};`,
  },
  realWorldExamples: [{ title: 'Java Swing', description: 'Java Swing 中的容器和组件使用组合模式。', source: 'JDK', codeSnippet: 'JPanel panel = new JPanel(); panel.add(new JButton("Click"));' }],
  relatedPatterns: ['iterator', 'visitor', 'decorator'],
  quiz: [{ id: 'q1', type: 'single', question: '组合模式的主要目的是什么？', options: ['创建对象', '组合对象成树形结构', '优化性能', '转换接口'], correctAnswer: 1, explanation: '组合模式的主要目的是将对象组合成树形结构以表示部分-整体的层次结构。' }],
};
