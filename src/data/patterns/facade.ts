import type { DesignPattern } from '@/types/pattern';

export const facadePattern: DesignPattern = {
  id: 'facade',
  name: '外观模式',
  nameEn: 'Facade Pattern',
  category: 'structural',
  difficulty: 'easy',
  frequency: 'high',
  intent: '为子系统中的一组接口提供一个一致的界面。外观模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。',
  description: '外观模式是一种结构型设计模式，能为复杂系统、库或框架提供一个简单（但有限）的接口。',
  applicability: ['当需要为一个复杂的子系统提供一个简单的接口时', '当需要将子系统与客户端解耦时'],
  pros: ['让自己的代码独立于复杂子系统', '减少了客户端需要处理的对象数量', '使子系统更易于使用'],
  cons: ['外观可能成为与程序中所有类都耦合的上帝对象'],
  analogy: { title: '现实世界中的外观', description: '外观模式就像是餐厅的服务员', scenarios: [{ id: 'waiter', title: '餐厅服务员', description: '你不需要直接与厨师、调酒师、清洁工交流，只需要告诉服务员你的需求，他会帮你协调一切。', icon: 'User' }] },
  structure: { classDiagram: '', animationSteps: [] },
  implementation: {
    typescript: `class SubsystemA { operationA() { return 'SubsystemA'; } }
class SubsystemB { operationB() { return 'SubsystemB'; } }
class Facade {
  private subA = new SubsystemA();
  private subB = new SubsystemB();
  operation() { return this.subA.operationA() + ' ' + this.subB.operationB(); }
}`,
    java: `class SubsystemA { String operationA() { return "SubsystemA"; } }
class SubsystemB { String operationB() { return "SubsystemB"; } }
class Facade {
  private SubsystemA subA = new SubsystemA();
  private SubsystemB subB = new SubsystemB();
  public String operation() { return subA.operationA() + " " + subB.operationB(); }
}`,
    go: `type SubsystemA struct{}
func (s *SubsystemA) OperationA() string { return "SubsystemA" }
type SubsystemB struct{}
func (s *SubsystemB) OperationB() string { return "SubsystemB" }
type Facade struct { subA *SubsystemA; subB *SubsystemB }
func (f *Facade) Operation() string { return f.subA.OperationA() + " " + f.subB.OperationB() }`,
    python: `class SubsystemA: def operation_a(self): return "SubsystemA"
class SubsystemB: def operation_b(self): return "SubsystemB"
class Facade:
  def __init__(self): self.sub_a = SubsystemA(); self.sub_b = SubsystemB()
  def operation(self): return self.sub_a.operation_a() + " " + self.sub_b.operation_b()`,
    cpp: `class SubsystemA { public: std::string operationA() { return "SubsystemA"; } };
class SubsystemB { public: std::string operationB() { return "SubsystemB"; } };
class Facade {
  SubsystemA* subA; SubsystemB* subB;
public: Facade() { subA = new SubsystemA(); subB = new SubsystemB(); }
  std::string operation() { return subA->operationA() + " " + subB->operationB(); }
};`,
  },
  realWorldExamples: [{ title: 'Spring JDBC', description: 'Spring 的 JdbcTemplate 为 JDBC 操作提供了简化的外观。', source: 'Spring', codeSnippet: 'jdbcTemplate.query("SELECT * FROM users", new UserRowMapper());' }],
  relatedPatterns: ['adapter', 'mediator', 'singleton'],
  quiz: [{ id: 'q1', type: 'single', question: '外观模式的主要目的是什么？', options: ['创建对象', '提供简化接口', '添加功能', '转换接口'], correctAnswer: 1, explanation: '外观模式的主要目的是为子系统中的一组接口提供一个一致的、简化的界面。' }],
};
