import type { DesignPattern } from '@/types/pattern';

export const flyweightPattern: DesignPattern = {
  id: 'flyweight',
  name: '享元模式',
  nameEn: 'Flyweight Pattern',
  category: 'structural',
  difficulty: 'hard',
  frequency: 'low',
  intent: '运用共享技术有效地支持大量细粒度的对象。',
  description: '享元模式是一种结构型设计模式，它摒弃了在每个对象中保存所有数据的方式，通过共享多个对象所共有的相同状态，让你能在有限的内存容量中载入更多对象。',
  applicability: ['当需要创建大量相似对象时', '当对象的大部分状态都可以变为外部状态时'],
  pros: ['如果程序中有很多相似对象，可以节省大量内存', '可以提取对象的外部状态，在运行时动态传递'],
  cons: ['可能需要牺牲执行速度来换取内存', '代码会变得更加复杂'],
  analogy: { title: '现实世界中的享元', description: '享元模式就像是围棋', scenarios: [{ id: 'chess', title: '围棋', description: '围棋有361个位置，但只需要黑白两种棋子。棋子的位置是外部状态，颜色是内部状态。', icon: 'Circle' }] },
  structure: { classDiagram: '', animationSteps: [] },
  implementation: {
    typescript: `interface Flyweight { operation(extrinsicState: string): void; }
class ConcreteFlyweight implements Flyweight {
  constructor(private intrinsicState: string) {}
  operation(extrinsicState: string): void { console.log(this.intrinsicState + extrinsicState); }
}
class FlyweightFactory {
  private flyweights: Map<string, Flyweight> = new Map();
  getFlyweight(key: string): Flyweight {
    if (!this.flyweights.has(key)) { this.flyweights.set(key, new ConcreteFlyweight(key)); }
    return this.flyweights.get(key)!;
  }
}`,
    java: `interface Flyweight { void operation(String extrinsicState); }
class ConcreteFlyweight implements Flyweight {
  private String intrinsicState;
  public ConcreteFlyweight(String state) { this.intrinsicState = state; }
  public void operation(String extrinsicState) { System.out.println(intrinsicState + extrinsicState); }
}
class FlyweightFactory {
  private Map<String, Flyweight> flyweights = new HashMap<>();
  public Flyweight getFlyweight(String key) {
    if (!flyweights.containsKey(key)) { flyweights.put(key, new ConcreteFlyweight(key)); }
    return flyweights.get(key);
  }
}`,
    go: `type Flyweight interface { Operation(extrinsicState string) }
type ConcreteFlyweight struct { intrinsicState string }
func (f *ConcreteFlyweight) Operation(extrinsicState string) { println(f.intrinsicState + extrinsicState) }
type FlyweightFactory struct { flyweights map[string]Flyweight }
func (f *FlyweightFactory) GetFlyweight(key string) Flyweight {
  if f.flyweights == nil { f.flyweights = make(map[string]Flyweight) }
  if _, ok := f.flyweights[key]; !ok { f.flyweights[key] = &ConcreteFlyweight{intrinsicState: key} }
  return f.flyweights[key]
}`,
    python: `class Flyweight(ABC): @abstractmethod def operation(self, extrinsic_state): pass
class ConcreteFlyweight(Flyweight):
  def __init__(self, intrinsic_state): self._intrinsic_state = intrinsic_state
  def operation(self, extrinsic_state): print(f"{self._intrinsic_state}{extrinsic_state}")
class FlyweightFactory:
  def __init__(self): self._flyweights = {}
  def get_flyweight(self, key):
    if key not in self._flyweights: self._flyweights[key] = ConcreteFlyweight(key)
    return self._flyweights[key]`,
    cpp: `class Flyweight { public: virtual void operation(const std::string& extrinsicState) = 0; };
class ConcreteFlyweight : public Flyweight {
  std::string intrinsicState;
public: ConcreteFlyweight(const std::string& state) : intrinsicState(state) {}
  void operation(const std::string& extrinsicState) override { std::cout << intrinsicState << extrinsicState; }
};
class FlyweightFactory {
  std::map<std::string, Flyweight*> flyweights;
public: Flyweight* getFlyweight(const std::string& key) {
    if(flyweights.find(key) == flyweights.end()) { flyweights[key] = new ConcreteFlyweight(key); }
    return flyweights[key];
  }
};`,
  },
  realWorldExamples: [{ title: 'Java String Pool', description: 'Java 的字符串常量池是享元模式的典型应用。', source: 'JDK', codeSnippet: 'String s1 = "hello"; String s2 = "hello"; // s1 和 s2 指向同一对象' }],
  relatedPatterns: ['singleton', 'factory-method', 'composite'],
  quiz: [{ id: 'q1', type: 'single', question: '享元模式的主要目的是什么？', options: ['创建对象', '共享对象以节省内存', '添加功能', '转换接口'], correctAnswer: 1, explanation: '享元模式的主要目的是运用共享技术有效地支持大量细粒度的对象，节省内存。' }],
};
