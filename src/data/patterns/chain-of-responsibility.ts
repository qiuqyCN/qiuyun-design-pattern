import type { DesignPattern } from '@/types/pattern';

export const chainOfResponsibilityPattern: DesignPattern = {
  id: 'chain-of-responsibility',
  name: '责任链模式',
  nameEn: 'Chain of Responsibility Pattern',
  category: 'behavioral',
  difficulty: 'medium',
  frequency: 'medium',
  intent: '使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。将这些对象连成一条链，并沿着这条链传递请求，直到有一个对象处理它为止。',
  description: '责任链模式是一种行为设计模式，允许你将请求沿着处理者链进行发送。收到请求后，每个处理者均可对请求进行处理，或将其传递给链上的下个处理者。',
  applicability: ['当程序需要使用不同方式处理不同种类的请求时', '当必须按顺序执行多个处理者时'],
  pros: ['可以控制请求处理的顺序', '单一职责原则：可将发起操作和执行操作的类进行解耦', '开闭原则：可以在不更改现有代码的情况下在程序中新增处理者'],
  cons: ['部分请求可能未被处理', '如果链过长，可能会影响性能'],
  analogy: { title: '现实世界中的责任链', description: '责任链就像是技术支持热线', scenarios: [{ id: 'support', title: '技术支持', description: '你的问题首先由一线客服处理，如果解决不了，就转给二线技术支持，再不行就转给工程师。', icon: 'Phone' }] },
  structure: { classDiagram: '', animationSteps: [] },
  implementation: {
    typescript: `interface Handler { setNext(handler: Handler): Handler; handle(request: string): string | null; }
abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;
  setNext(handler: Handler): Handler { this.nextHandler = handler; return handler; }
  handle(request: string): string | null { return this.nextHandler ? this.nextHandler.handle(request) : null; }
}
class ConcreteHandler1 extends AbstractHandler {
  handle(request: string): string | null {
    if (request === 'request1') { return 'Handler 1 handled'; }
    return super.handle(request);
  }
}`,
    java: `abstract class Handler {
  protected Handler next;
  public Handler setNext(Handler next) { this.next = next; return next; }
  public abstract String handle(String request);
}
class ConcreteHandler1 extends Handler {
  public String handle(String request) {
    if (request.equals("request1")) { return "Handler 1 handled"; }
    return next != null ? next.handle(request) : null;
  }
}`,
    go: `type Handler interface { SetNext(Handler) Handler; Handle(string) string }
type BaseHandler struct { next Handler }
func (h *BaseHandler) SetNext(next Handler) Handler { h.next = next; return next }
func (h *BaseHandler) Handle(request string) string { if h.next != nil { return h.next.Handle(request) }; return "" }
type ConcreteHandler1 struct { BaseHandler }
func (h *ConcreteHandler1) Handle(request string) string { if request == "request1" { return "Handler 1 handled" }; return h.BaseHandler.Handle(request) }`,
    python: `class Handler(ABC): @abstractmethod def set_next(self, handler): pass
class AbstractHandler(Handler):
  def __init__(self): self._next_handler = None
  def set_next(self, handler): self._next_handler = handler; return handler
  def handle(self, request): return self._next_handler.handle(request) if self._next_handler else None
class ConcreteHandler1(AbstractHandler):
  def handle(self, request): return "Handler 1 handled" if request == "request1" else super().handle(request)`,
    cpp: `class Handler { protected: Handler* next = nullptr; public: virtual Handler* setNext(Handler* h) { next = h; return h; } virtual std::string handle(const std::string& request) = 0; };
class ConcreteHandler1 : public Handler { public: std::string handle(const std::string& request) override { if (request == "request1") return "Handler 1 handled"; return next ? next->handle(request) : ""; } };`,
  },
  realWorldExamples: [{ title: 'Java Servlet Filter', description: 'Java Servlet 的 FilterChain 是责任链模式的典型应用。', source: 'Java EE', codeSnippet: 'filterChain.doFilter(request, response);' }],
  relatedPatterns: ['command', 'mediator', 'observer'],
  quiz: [{ id: 'q1', type: 'single', question: '责任链模式的主要目的是什么？', options: ['创建对象', '将请求沿链传递', '转换接口', '优化性能'], correctAnswer: 1, explanation: '责任链模式的主要目的是使多个对象都有机会处理请求，将请求沿着处理者链传递。' }],
};
