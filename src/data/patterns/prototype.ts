import type { DesignPattern } from '@/types/pattern';

export const prototypePattern: DesignPattern = {
  id: 'prototype',
  name: '原型模式',
  nameEn: 'Prototype Pattern',
  category: 'creational',
  difficulty: 'easy',
  frequency: 'low',
  intent: '用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。',
  description: '原型模式是一种创建型设计模式，它允许你复制已有对象，而无需使代码依赖它们所属的类。',
  applicability: [
    '当需要创建的对象与现有对象相似时',
    '当需要避免与对象创建者类的耦合时',
    '当需要创建的对象种类繁多，无法整合到一个类中时',
  ],
  pros: [
    '可以克隆对象，而无需与它们的具体类耦合',
    '可以预生成原型，避免重复初始化代码',
    '可以更方便地生成复杂对象',
  ],
  cons: [
    '克隆包含循环引用的复杂对象可能会非常困难',
    '需要为每个类实现克隆方法',
  ],
  analogy: {
    title: '现实世界中的原型',
    description: '原型模式就像是现实世界中的细胞分裂',
    scenarios: [
      {
        id: 'cell',
        title: '细胞分裂',
        description: '细胞通过分裂产生新的细胞，新细胞与原始细胞具有相同的遗传信息。',
        icon: 'Circle',
      },
    ],
  },
  structure: { classDiagram: '', animationSteps: [] },
  implementation: {
    typescript: `interface Prototype {
  clone(): Prototype;
}

class ConcretePrototype implements Prototype {
  constructor(public field: string) {}
  clone(): Prototype {
    return new ConcretePrototype(this.field);
  }
}

const original = new ConcretePrototype('original');
const copy = original.clone();`,
    java: `public interface Prototype {
    Prototype clone();
}

public class ConcretePrototype implements Prototype {
    private String field;
    public ConcretePrototype(String field) { this.field = field; }
    @Override
    public Prototype clone() { return new ConcretePrototype(this.field); }
}`,
    go: `type Prototype interface {
    Clone() Prototype
}

type ConcretePrototype struct {
    Field string
}

func (p *ConcretePrototype) Clone() Prototype {
    return &ConcretePrototype{Field: p.Field}
}`,
    python: `import copy

class Prototype:
    def clone(self):
        return copy.deepcopy(self)

class ConcretePrototype(Prototype):
    def __init__(self, field):
        self.field = field`,
    cpp: `class Prototype {
public:
    virtual Prototype* clone() const = 0;
    virtual ~Prototype() = default;
};

class ConcretePrototype : public Prototype {
    std::string field;
public:
    ConcretePrototype(const std::string& f) : field(f) {}
    Prototype* clone() const override { return new ConcretePrototype(*this); }
};`,
  },
  realWorldExamples: [
    { title: 'Java Object.clone()', description: 'Java 提供了内置的克隆机制。', source: 'JDK', codeSnippet: 'Object clone = original.clone();' },
  ],
  relatedPatterns: ['factory-method', 'abstract-factory', 'composite'],
  quiz: [{ id: 'q1', type: 'single', question: '原型模式的主要目的是什么？', options: ['创建新对象', '复制现有对象', '销毁对象', '修改对象'], correctAnswer: 1, explanation: '原型模式的主要目的是通过复制现有对象来创建新对象。' }],
};
