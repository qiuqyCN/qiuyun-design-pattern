import type { DesignPattern } from '@/types/pattern';

export const proxyPattern: DesignPattern = {
  id: 'proxy',
  name: '代理模式',
  nameEn: 'Proxy Pattern',
  category: 'structural',
  difficulty: 'medium',
  frequency: 'medium',
  intent: '为其他对象提供一种代理以控制对这个对象的访问。',
  description: '代理模式是一种结构型设计模式，让你能够提供对象的替代品或其占位符。代理控制着对于原对象的访问，并允许在将请求提交给对象前后进行一些处理。',
  applicability: ['延迟初始化（虚拟代理）', '访问控制（保护代理）', '本地执行远程服务（远程代理）', '记录日志请求（日志记录代理）'],
  pros: ['可以在客户端毫无察觉的情况下控制服务对象', '客户端与真实服务对象解耦', '开闭原则：可以在不对服务或客户端做出修改的情况下创建新代理'],
  cons: ['代码可能变得复杂', '服务响应可能会延迟'],
  analogy: { title: '现实世界中的代理', description: '代理模式就像是信用卡', scenarios: [{ id: 'creditcard', title: '信用卡', description: '信用卡是银行账户的代理，它控制着对账户的访问，并可以在支付前后添加额外的功能（如积分、验证）。', icon: 'CreditCard' }] },
  structure: { classDiagram: '', animationSteps: [] },
  implementation: {
    typescript: `interface Subject { request(): void; }
class RealSubject implements Subject { request(): void { console.log('RealSubject: Handling request.'); } }
class Proxy implements Subject {
  private realSubject: RealSubject;
  request(): void {
    if (!this.realSubject) { this.realSubject = new RealSubject(); }
    console.log('Proxy: Logging the time of request.');
    this.realSubject.request();
  }
}`,
    java: `interface Subject { void request(); }
class RealSubject implements Subject { public void request() { System.out.println("RealSubject: Handling request."); } }
class Proxy implements Subject {
  private RealSubject realSubject;
  public void request() {
    if (realSubject == null) { realSubject = new RealSubject(); }
    System.out.println("Proxy: Logging the time of request.");
    realSubject.request();
  }
}`,
    go: `type Subject interface { Request() }
type RealSubject struct{}
func (r *RealSubject) Request() { println("RealSubject: Handling request.") }
type Proxy struct { realSubject *RealSubject }
func (p *Proxy) Request() {
  if p.realSubject == nil { p.realSubject = &RealSubject{} }
  println("Proxy: Logging the time of request.")
  p.realSubject.Request()
}`,
    python: `class Subject(ABC): @abstractmethod def request(self): pass
class RealSubject(Subject): def request(self): print("RealSubject: Handling request.")
class Proxy(Subject):
  def __init__(self): self._real_subject = None
  def request(self):
    if self._real_subject is None: self._real_subject = RealSubject()
    print("Proxy: Logging the time of request.")
    self._real_subject.request()`,
    cpp: `class Subject { public: virtual void request() = 0; };
class RealSubject : public Subject { public: void request() override { std::cout << "RealSubject: Handling request." << std::endl; } };
class Proxy : public Subject {
  RealSubject* realSubject;
public: void request() override {
    if (!realSubject) { realSubject = new RealSubject(); }
    std::cout << "Proxy: Logging the time of request." << std::endl;
    realSubject->request();
  }
};`,
  },
  realWorldExamples: [{ title: 'Java RMI', description: 'Java 远程方法调用使用代理模式来访问远程对象。', source: 'JDK', codeSnippet: 'RemoteInterface stub = (RemoteInterface) UnicastRemoteObject.exportObject(obj, 0);' }],
  relatedPatterns: ['adapter', 'decorator', 'facade'],
  quiz: [{ id: 'q1', type: 'single', question: '代理模式的主要目的是什么？', options: ['创建对象', '控制对对象的访问', '添加功能', '转换接口'], correctAnswer: 1, explanation: '代理模式的主要目的是为其他对象提供一种代理以控制对这个对象的访问。' }],
};
