import type { DesignPattern } from '@/types/pattern';

export const builderPattern: DesignPattern = {
  id: 'builder',
  name: '建造者模式',
  nameEn: 'Builder Pattern',
  category: 'creational',
  difficulty: 'medium',
  frequency: 'medium',
  intent: '将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。',
  description: '建造者模式是一种创建型设计模式，它允许你分步骤创建复杂对象。该模式允许你使用相同的创建代码生成不同类型和形式的对象。',
  applicability: [
    '当需要创建复杂对象时',
    '当需要创建不同形式的对象时',
    '当对象的构造过程必须允许不同的表示时',
  ],
  pros: [
    '可以分步骤创建对象',
    '可以复用相同的创建代码',
    '单一职责原则：将复杂的构造代码从产品的业务逻辑中分离出来',
  ],
  cons: [
    '代码可能变得更加复杂，因为需要引入许多新的类',
    '需要创建多个 Builder 类',
  ],
  analogy: {
    title: '现实世界中的建造者',
    description: '建造者模式就像是现实世界中的汽车装配线',
    scenarios: [
      {
        id: 'car',
        title: '汽车装配',
        description: '汽车装配线使用相同的步骤来组装不同型号的汽车，但每个步骤的具体实现可能不同。',
        icon: 'Car',
      },
    ],
  },
  structure: { classDiagram: '', animationSteps: [] },
  implementation: {
    typescript: `class Product {
  private parts: string[] = [];
  addPart(part: string) { this.parts.push(part); }
  listParts() { console.log(this.parts.join(', ')); }
}

class Builder {
  private product: Product = new Product();
  reset() { this.product = new Product(); }
  buildPartA() { this.product.addPart('PartA'); }
  buildPartB() { this.product.addPart('PartB'); }
  getProduct(): Product {
    const result = this.product;
    this.reset();
    return result;
  }
}

const builder = new Builder();
builder.buildPartA();
builder.buildPartB();
const product = builder.getProduct();
product.listParts();`,
    java: `public class Product {
    private List<String> parts = new ArrayList<>();
    public void add(String part) { parts.add(part); }
}

public class Builder {
    private Product product = new Product();
    public Builder partA() { product.add("PartA"); return this; }
    public Builder partB() { product.add("PartB"); return this; }
    public Product build() { return product; }
}`,
    go: `type Product struct { parts []string }
func (p *Product) Add(part string) { p.parts = append(p.parts, part) }

type Builder struct { product Product }
func (b *Builder) PartA() *Builder { b.product.Add("PartA"); return b }
func (b *Builder) Build() Product { return b.product }`,
    python: `class Product:
    def __init__(self): self.parts = []
    def add(self, part): self.parts.append(part)

class Builder:
    def __init__(self): self.product = Product()
    def part_a(self): self.product.add("PartA"); return self
    def build(self): return self.product`,
    cpp: `class Product {
    std::vector<std::string> parts;
public:
    void add(const std::string& part) { parts.push_back(part); }
};

class Builder {
    Product product;
public:
    Builder& partA() { product.add("PartA"); return *this; }
    Product build() { return product; }
};`,
  },
  realWorldExamples: [
    { title: 'Java StringBuilder', description: 'Java 的 StringBuilder 类使用建造者模式来构建字符串。', source: 'JDK', codeSnippet: 'StringBuilder sb = new StringBuilder(); sb.append("Hello").append(" World");' },
  ],
  relatedPatterns: ['factory-method', 'abstract-factory', 'composite'],
  quiz: [{ id: 'q1', type: 'single', question: '建造者模式的主要目的是什么？', options: ['创建简单对象', '分步骤创建复杂对象', '销毁对象', '复制对象'], correctAnswer: 1, explanation: '建造者模式的主要目的是分步骤创建复杂对象。' }],
};
