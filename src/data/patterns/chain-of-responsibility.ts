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
  structure: {
    classDiagram: '',
    mermaidDiagram: `
classDiagram
  class Handler {
    <<interface>>
    +setNext(handler: Handler): Handler
    +handle(request: Request): string
  }

  class BaseHandler {
    -nextHandler: Handler
    +setNext(handler: Handler): Handler
    +handle(request: Request): string
  }

  class ConcreteHandlerA {
    +handle(request: Request): string
  }

  class ConcreteHandlerB {
    +handle(request: Request): string
  }

  class ConcreteHandlerC {
    +handle(request: Request): string
  }

  class Client {
    +main()
  }

  class Request {
    +type: string
    +content: string
  }

  Handler <|.. BaseHandler
  BaseHandler <|-- ConcreteHandlerA
  BaseHandler <|-- ConcreteHandlerB
  BaseHandler <|-- ConcreteHandlerC
  BaseHandler o--> Handler : next
  Client ..> Handler : uses
  Client ..> Request : creates

  style Handler fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style BaseHandler fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
  style ConcreteHandlerA fill:#e8f5e9,stroke:#388e3c,stroke-width:1px
  style ConcreteHandlerB fill:#e8f5e9,stroke:#388e3c,stroke-width:1px
  style ConcreteHandlerC fill:#e8f5e9,stroke:#388e3c,stroke-width:1px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
  style Request fill:#fff3e0,stroke:#f57c00,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: 'Handler 接口',
        description: '定义处理请求的接口，包含设置后继者和处理请求的方法',
        duration: 2000,
        elements: [
          { id: 'handler', type: 'interface', name: 'Handler', x: 200, y: 100, methods: ['+setNext(handler)', '+handle(request)'] },
        ],
      },
      {
        id: 'step2',
        title: 'BaseHandler 基础处理者',
        description: '实现 Handler 接口，维护对下一个处理者的引用，提供默认的传递行为',
        duration: 2500,
        elements: [
          { id: 'handler', type: 'interface', name: 'Handler', x: 200, y: 100, methods: ['+setNext(handler)', '+handle(request)'] },
          { id: 'baseHandler', type: 'class', name: 'BaseHandler', x: 200, y: 250, properties: ['-nextHandler: Handler'], methods: ['+setNext(handler)', '+handle(request)'] },
        ],
        connections: [
          { from: 'baseHandler', to: 'handler', type: 'implementation' },
          { from: 'baseHandler', to: 'handler', type: 'association', label: 'next' },
        ],
      },
      {
        id: 'step3',
        title: 'ConcreteHandler 具体处理者',
        description: '具体处理者实现处理逻辑，如果不能处理则传递给下一个处理者',
        duration: 3000,
        elements: [
          { id: 'handler', type: 'interface', name: 'Handler', x: 200, y: 100, methods: ['+setNext(handler)', '+handle(request)'] },
          { id: 'baseHandler', type: 'class', name: 'BaseHandler', x: 200, y: 250, properties: ['-nextHandler: Handler'], methods: ['+setNext(handler)', '+handle(request)'] },
          { id: 'handlerA', type: 'class', name: 'ConcreteHandlerA', x: 50, y: 400, methods: ['+handle(request)'] },
          { id: 'handlerB', type: 'class', name: 'ConcreteHandlerB', x: 200, y: 400, methods: ['+handle(request)'] },
          { id: 'handlerC', type: 'class', name: 'ConcreteHandlerC', x: 350, y: 400, methods: ['+handle(request)'] },
        ],
        connections: [
          { from: 'baseHandler', to: 'handler', type: 'implementation' },
          { from: 'baseHandler', to: 'handler', type: 'association', label: 'next' },
          { from: 'handlerA', to: 'baseHandler', type: 'inheritance' },
          { from: 'handlerB', to: 'baseHandler', type: 'inheritance' },
          { from: 'handlerC', to: 'baseHandler', type: 'inheritance' },
        ],
      },
      {
        id: 'step4',
        title: '构建责任链',
        description: '客户端创建处理者对象并按顺序链接它们，形成责任链',
        duration: 3000,
        elements: [
          { id: 'handler', type: 'interface', name: 'Handler', x: 200, y: 100, methods: ['+setNext(handler)', '+handle(request)'] },
          { id: 'baseHandler', type: 'class', name: 'BaseHandler', x: 200, y: 250, properties: ['-nextHandler: Handler'], methods: ['+setNext(handler)', '+handle(request)'] },
          { id: 'handlerA', type: 'class', name: 'ConcreteHandlerA', x: 50, y: 400, methods: ['+handle(request)'] },
          { id: 'handlerB', type: 'class', name: 'ConcreteHandlerB', x: 200, y: 400, methods: ['+handle(request)'] },
          { id: 'handlerC', type: 'class', name: 'ConcreteHandlerC', x: 350, y: 400, methods: ['+handle(request)'] },
          { id: 'client', type: 'class', name: 'Client', x: 450, y: 150, methods: ['main()'] },
        ],
        connections: [
          { from: 'baseHandler', to: 'handler', type: 'implementation' },
          { from: 'baseHandler', to: 'handler', type: 'association', label: 'next' },
          { from: 'handlerA', to: 'baseHandler', type: 'inheritance' },
          { from: 'handlerB', to: 'baseHandler', type: 'inheritance' },
          { from: 'handlerC', to: 'baseHandler', type: 'inheritance' },
          { from: 'client', to: 'handlerA', type: 'dependency', label: 'creates' },
          { from: 'handlerA', to: 'handlerB', type: 'association', label: 'next' },
          { from: 'handlerB', to: 'handlerC', type: 'association', label: 'next' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * 责任链模式 - TypeScript 实现
 * 场景：技术支持请求处理系统
 */

// 请求类 - 封装请求信息
class SupportRequest {
  constructor(
    public readonly type: string,
    public readonly content: string,
    public readonly priority: number
  ) {}

  toString(): string {
    return \`[\${this.type}] \${this.content} (优先级: \${this.priority})\`;
  }
}

// Handler 接口 - 定义处理者的契约
interface Handler {
  /**
   * 设置链中的下一个处理者
   * @param handler 下一个处理者
   * @returns 返回下一个处理者，支持链式调用
   */
  setNext(handler: Handler): Handler;

  /**
   * 处理请求
   * @param request 要处理的请求
   * @returns 处理结果，如果无法处理则返回 null
   */
  handle(request: SupportRequest): string | null;
}

// BaseHandler 抽象类 - 提供默认的链式传递实现
abstract class BaseHandler implements Handler {
  private nextHandler: Handler | null = null;

  /**
   * 设置下一个处理者，支持链式调用
   * 例如: handler1.setNext(handler2).setNext(handler3)
   */
  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler; // 返回 handler 以支持链式调用
  }

  /**
   * 默认实现：将请求传递给下一个处理者
   * 子类可以覆盖此方法来实现具体的处理逻辑
   */
  handle(request: SupportRequest): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null; // 链结束，无人处理
  }

  /**
   * 辅助方法：检查是否能处理请求后传递给下一个
   * 子类在 handle 方法中调用此方法来实现传递逻辑
   */
  protected passToNext(request: SupportRequest): string | null {
    if (this.nextHandler) {
      console.log(\`  ↳ 传递给下一个处理者\`);
      return this.nextHandler.handle(request);
    }
    console.log(\`  ✗ 请求无法处理：\${request.toString()}\`);
    return null;
  }
}

// ConcreteHandlerA - 一线客服处理者
// 处理简单的咨询类请求
class FirstLineSupport extends BaseHandler {
  handle(request: SupportRequest): string | null {
    console.log(\`一线客服检查: \${request.toString()}\`);

    // 一线客服只处理优先级 <= 3 的咨询类请求
    if (request.type === '咨询' && request.priority <= 3) {
      return \`✓ 一线客服已处理: \${request.content}\`;
    }

    // 无法处理，传递给下一个
    return this.passToNext(request);
  }
}

// ConcreteHandlerB - 技术支持处理者
// 处理技术相关的问题
class TechnicalSupport extends BaseHandler {
  handle(request: SupportRequest): string | null {
    console.log(\`技术支持检查: \${request.toString()}\`);

    // 技术支持处理技术问题或中等优先级问题
    if (request.type === '技术问题' || request.priority <= 5) {
      return \`✓ 技术支持已处理: \${request.content}\`;
    }

    return this.passToNext(request);
  }
}

// ConcreteHandlerC - 高级工程师处理者
// 处理复杂的技术问题
class SeniorEngineer extends BaseHandler {
  handle(request: SupportRequest): string | null {
    console.log(\`高级工程师检查: \${request.toString()}\`);

    // 高级工程师处理所有技术问题和高优先级问题
    if (request.type === '技术问题' || request.priority <= 8) {
      return \`✓ 高级工程师已处理: \${request.content}\`;
    }

    return this.passToNext(request);
  }
}

// ConcreteHandlerD - 部门经理处理者
// 处理最高优先级的紧急问题
class DepartmentManager extends BaseHandler {
  handle(request: SupportRequest): string | null {
    console.log(\`部门经理检查: \${request.toString()}\`);

    // 部门经理处理所有剩余请求（包括最高优先级）
    return \`✓ 部门经理已处理: \${request.content}\`;
  }
}

// 客户端代码 - 构建责任链并使用
function clientCode(): void {
  console.log('=== 责任链模式演示 ===\\n');

  // 创建处理者
  const firstLine = new FirstLineSupport();
  const techSupport = new TechnicalSupport();
  const seniorEngineer = new SeniorEngineer();
  const manager = new DepartmentManager();

  // 构建责任链: firstLine -> techSupport -> seniorEngineer -> manager
  firstLine.setNext(techSupport).setNext(seniorEngineer).setNext(manager);

  // 测试不同类型的请求
  const requests: SupportRequest[] = [
    new SupportRequest('咨询', '如何重置密码？', 2),
    new SupportRequest('技术问题', 'API 返回 500 错误', 4),
    new SupportRequest('技术问题', '数据库连接超时', 7),
    new SupportRequest('投诉', '服务中断 2 小时', 10),
  ];

  for (const request of requests) {
    console.log(\`\\n--- 新请求: \${request.toString()} ---\`);
    const result = firstLine.handle(request);
    console.log(\`结果: \${result || '未处理'}\\n\`);
  }
}

// 运行演示
clientCode();`,

    java: `/**
 * 责任链模式 - Java 实现
 * 场景：采购审批系统
 */

// 采购请求类
class PurchaseRequest {
    private final int id;
    private final String description;
    private final double amount;

    public PurchaseRequest(int id, String description, double amount) {
        this.id = id;
        this.description = description;
        this.amount = amount;
    }

    public int getId() { return id; }
    public String getDescription() { return description; }
    public double getAmount() { return amount; }

    @Override
    public String toString() {
        return String.format("采购请求 #%d: %s (金额: ¥%.2f)", id, description, amount);
    }
}

// Handler 抽象类 - 定义处理者的契约和默认实现
abstract class Approver {
    // 对下一个处理者的引用
    protected Approver nextApprover;
    protected String name;
    protected double approvalLimit;

    public Approver(String name, double approvalLimit) {
        this.name = name;
        this.approvalLimit = approvalLimit;
    }

    /**
     * 设置链中的下一个审批者
     * 返回 this 支持链式调用
     */
    public Approver setNext(Approver next) {
        this.nextApprover = next;
        return next; // 返回下一个审批者以支持链式调用
    }

    /**
     * 处理请求的模板方法
     * 子类实现具体的审批逻辑
     */
    public final String processRequest(PurchaseRequest request) {
        System.out.println(name + " 正在审批: " + request);

        // 如果可以审批，则处理
        if (canApprove(request)) {
            return approve(request);
        }

        // 否则传递给下一个审批者
        System.out.println("  ↳ 超出权限，向上级请示...");
        return passToNext(request);
    }

    // 子类实现：判断是否能审批
    protected abstract boolean canApprove(PurchaseRequest request);

    // 子类实现：执行审批
    protected abstract String approve(PurchaseRequest request);

    // 传递给下一个审批者
    protected String passToNext(PurchaseRequest request) {
        if (nextApprover != null) {
            return nextApprover.processRequest(request);
        }
        return "请求被拒绝：无人有权审批此金额";
    }
}

// ConcreteHandlerA - 组长审批者
class TeamLeader extends Approver {
    public TeamLeader(String name) {
        super(name, 1000.0); // 审批限额：1000元
    }

    @Override
    protected boolean canApprove(PurchaseRequest request) {
        return request.getAmount() <= approvalLimit;
    }

    @Override
    protected String approve(PurchaseRequest request) {
        return String.format("✓ %s (组长) 已批准采购请求 #%d", name, request.getId());
    }
}

// ConcreteHandlerB - 经理审批者
class Manager extends Approver {
    public Manager(String name) {
        super(name, 10000.0); // 审批限额：10000元
    }

    @Override
    protected boolean canApprove(PurchaseRequest request) {
        return request.getAmount() <= approvalLimit;
    }

    @Override
    protected String approve(PurchaseRequest request) {
        return String.format("✓ %s (经理) 已批准采购请求 #%d", name, request.getId());
    }
}

// ConcreteHandlerC - 总监审批者
class Director extends Approver {
    public Director(String name) {
        super(name, 50000.0); // 审批限额：50000元
    }

    @Override
    protected boolean canApprove(PurchaseRequest request) {
        return request.getAmount() <= approvalLimit;
    }

    @Override
    protected String approve(PurchaseRequest request) {
        return String.format("✓ %s (总监) 已批准采购请求 #%d", name, request.getId());
    }
}

// ConcreteHandlerD - CEO审批者（可以审批所有金额）
class CEO extends Approver {
    public CEO(String name) {
        super(name, Double.MAX_VALUE); // 无上限
    }

    @Override
    protected boolean canApprove(PurchaseRequest request) {
        return true; // CEO 可以审批任何金额
    }

    @Override
    protected String approve(PurchaseRequest request) {
        return String.format("✓ %s (CEO) 已批准采购请求 #%d", name, request.getId());
    }
}

// 客户端代码
public class ChainOfResponsibilityDemo {
    public static void main(String[] args) {
        System.out.println("=== 责任链模式 - 采购审批系统 ===\\n");

        // 创建审批者
        Approver teamLeader = new TeamLeader("张三");
        Approver manager = new Manager("李四");
        Approver director = new Director("王五");
        Approver ceo = new CEO("赵六");

        // 构建责任链
        teamLeader.setNext(manager).setNext(director).setNext(ceo);

        // 创建测试请求
        PurchaseRequest[] requests = {
            new PurchaseRequest(1, "办公用品", 500.0),
            new PurchaseRequest(2, "新电脑", 8000.0),
            new PurchaseRequest(3, "服务器", 30000.0),
            new PurchaseRequest(4, "企业软件许可", 100000.0)
        };

        // 处理每个请求
        for (PurchaseRequest request : requests) {
            System.out.println("\\n--- 新审批流程 ---");
            String result = teamLeader.processRequest(request);
            System.out.println("结果: " + result + "\\n");
        }
    }
}`,

    go: `package chainofresponsibility

import (
	"fmt"
	"strconv"
)

/**
 * 责任链模式 - Go 实现
 * 场景：日志处理系统
 */

// LogLevel 日志级别
type LogLevel int

const (
	DEBUG LogLevel = iota
	INFO
	WARNING
	ERROR
	FATAL
)

func (l LogLevel) String() string {
	names := []string{"DEBUG", "INFO", "WARNING", "ERROR", "FATAL"}
	if int(l) < len(names) {
		return names[l]
	}
	return "UNKNOWN"
}

// LogMessage 日志消息结构体
type LogMessage struct {
	Level   LogLevel
	Message string
}

func (m LogMessage) String() string {
	return fmt.Sprintf("[%s] %s", m.Level, m.Message)
}

// Handler 接口 - 定义日志处理者
type LogHandler interface {
	// SetNext 设置下一个处理者
	SetNext(handler LogHandler) LogHandler
	// Handle 处理日志消息
	Handle(message LogMessage) string
	// GetLevel 获取处理级别
	GetLevel() LogLevel
}

// BaseHandler 基础处理者 - 提供默认实现
type BaseHandler struct {
	next  LogHandler
	level LogLevel
	name  string
}

// SetNext 设置下一个处理者，支持链式调用
func (b *BaseHandler) SetNext(handler LogHandler) LogHandler {
	b.next = handler
	return handler
}

// GetLevel 获取处理级别
func (b *BaseHandler) GetLevel() LogLevel {
	return b.level
}

// Handle 默认实现：将消息传递给下一个处理者
func (b *BaseHandler) Handle(message LogMessage) string {
	if b.next != nil {
		fmt.Printf("  ↳ %s 传递给下一个处理者\\n", b.name)
		return b.next.Handle(message)
	}
	return fmt.Sprintf("消息未被处理: %s", message)
}

// canHandle 检查是否能处理该级别的消息
func (b *BaseHandler) canHandle(message LogMessage) bool {
	return message.Level >= b.level
}

// passToNext 传递给下一个处理者
func (b *BaseHandler) passToNext(message LogMessage) string {
	if b.next != nil {
		return b.next.Handle(message)
	}
	return ""
}

// ConsoleHandler 控制台日志处理者
type ConsoleHandler struct {
	BaseHandler
}

// NewConsoleHandler 创建控制台处理器
func NewConsoleHandler() *ConsoleHandler {
	return &ConsoleHandler{
		BaseHandler: BaseHandler{
			level: DEBUG,
			name:  "ConsoleHandler",
		},
	}
}

// Handle 处理日志消息
func (c *ConsoleHandler) Handle(message LogMessage) string {
	fmt.Printf("%s 检查: %s\\n", c.name, message)

	// 控制台处理器处理所有 DEBUG 及以上级别的日志
	if c.canHandle(message) {
		result := fmt.Sprintf("[控制台输出] %s", message)
		fmt.Println("  ✓ 已输出到控制台")

		// 继续传递给下一个处理者
		nextResult := c.passToNext(message)
		if nextResult != "" {
			return result + "; " + nextResult
		}
		return result
	}

	return c.passToNext(message)
}

// FileHandler 文件日志处理者
type FileHandler struct {
	BaseHandler
	filename string
}

// NewFileHandler 创建文件处理器
func NewFileHandler(filename string) *FileHandler {
	return &FileHandler{
		BaseHandler: BaseHandler{
			level: INFO,
			name:  "FileHandler",
		},
		filename: filename,
	}
}

// Handle 处理日志消息
func (f *FileHandler) Handle(message LogMessage) string {
	fmt.Printf("%s 检查: %s\\n", f.name, message)

	// 文件处理器处理 INFO 及以上级别的日志
	if f.canHandle(message) {
		result := fmt.Sprintf("[写入文件 %s] %s", f.filename, message)
		fmt.Println("  ✓ 已写入日志文件")

		nextResult := f.passToNext(message)
		if nextResult != "" {
			return result + "; " + nextResult
		}
		return result
	}

	return f.passToNext(message)
}

// EmailHandler 邮件告警处理者
type EmailHandler struct {
	BaseHandler
	email string
}

// NewEmailHandler 创建邮件处理器
func NewEmailHandler(email string) *EmailHandler {
	return &EmailHandler{
		BaseHandler: BaseHandler{
			level: ERROR,
			name:  "EmailHandler",
		},
		email: email,
	}
}

// Handle 处理日志消息
func (e *EmailHandler) Handle(message LogMessage) string {
	fmt.Printf("%s 检查: %s\\n", e.name, message)

	// 邮件处理器只处理 ERROR 及以上级别的日志
	if e.canHandle(message) {
		result := fmt.Sprintf("[发送邮件到 %s] %s", e.email, message)
		fmt.Println("  ✓ 已发送告警邮件")

		nextResult := e.passToNext(message)
		if nextResult != "" {
			return result + "; " + nextResult
		}
		return result
	}

	return e.passToNext(message)
}

// SMSHandler 短信告警处理者
type SMSHandler struct {
	BaseHandler
	phone string
}

// NewSMSHandler 创建短信处理器
func NewSMSHandler(phone string) *SMSHandler {
	return &SMSHandler{
		BaseHandler: BaseHandler{
			level: FATAL,
			name:  "SMSHandler",
		},
		phone: phone,
	}
}

// Handle 处理日志消息
func (s *SMSHandler) Handle(message LogMessage) string {
	fmt.Printf("%s 检查: %s\\n", s.name, message)

	// 短信处理器只处理 FATAL 级别的日志
	if s.canHandle(message) {
		result := fmt.Sprintf("[发送短信到 %s] %s", s.phone, message)
		fmt.Println("  ✓ 已发送紧急短信")
		return result
	}

	return s.passToNext(message)
}

// 客户端代码
func ClientCode() {
	fmt.Println("=== 责任链模式 - 日志处理系统 ===\\n")

	// 创建处理者
	console := NewConsoleHandler()
	file := NewFileHandler("app.log")
	email := NewEmailHandler("admin@example.com")
	sms := NewSMSHandler("13800138000")

	// 构建责任链: console -> file -> email -> sms
	console.SetNext(file).SetNext(email).SetNext(sms)

	// 测试不同级别的日志
	messages := []LogMessage{
		{DEBUG, "调试信息：连接数据库"},
		{INFO, "用户登录成功"},
		{WARNING, "磁盘空间不足 80%"},
		{ERROR, "数据库连接失败"},
		{FATAL, "系统崩溃，无法恢复"},
	}

	for i, msg := range messages {
		fmt.Printf("\\n--- 测试 %d: %s ---\\n", i+1, msg.Level)
		result := console.Handle(msg)
		fmt.Printf("处理结果: %s\\n", result)
	}
}

// 运行示例
func main() {
	ClientCode()
}`,

    python: `"""
责任链模式 - Python 实现
场景：HTTP 请求处理中间件链
"""

from abc import ABC, abstractmethod
from typing import Optional, Dict, Any
from dataclasses import dataclass


@dataclass
class HttpRequest:
    """HTTP 请求类"""
    method: str
    path: str
    headers: Dict[str, str]
    body: str
    user: Optional[str] = None
    is_authenticated: bool = False

    def __str__(self) -> str:
        return f"{self.method} {self.path} (User: {self.user or 'Anonymous'})"


@dataclass
class HttpResponse:
    """HTTP 响应类"""
    status_code: int
    body: str
    headers: Dict[str, str]

    def __str__(self) -> str:
        return f"HTTP {self.status_code}: {self.body}"


class Middleware(ABC):
    """
    Handler 抽象基类 - 中间件接口
    所有中间件必须继承此类
    """

    def __init__(self):
        self._next_middleware: Optional['Middleware'] = None

    def set_next(self, middleware: 'Middleware') -> 'Middleware':
        """
        设置链中的下一个中间件
        返回传入的中间件以支持链式调用

        使用示例:
            auth.set_next(logging_mw).set_next(ratelimit)
        """
        self._next_middleware = middleware
        return middleware

    @abstractmethod
    def handle(self, request: HttpRequest) -> Optional[HttpResponse]:
        """
        处理请求
        返回 Response 表示请求被处理（可能中断链）
        返回 None 表示继续传递给下一个中间件
        """
        pass

    def _pass_to_next(self, request: HttpRequest) -> Optional[HttpResponse]:
        """
        将请求传递给下一个中间件
        子类在无法处理时调用此方法
        """
        if self._next_middleware:
            print(f"  ↳ 传递给下一个中间件")
            return self._next_middleware.handle(request)
        # 链结束，返回 None 表示所有中间件都通过了
        return None


class AuthenticationMiddleware(Middleware):
    """
    ConcreteHandler - 认证中间件
    检查用户是否已认证，未认证则返回 401
    """

    def __init__(self, protected_paths: list = None):
        super().__init__()
        self.protected_paths = protected_paths or ["/api/", "/admin/"]

    def _is_protected(self, path: str) -> bool:
        """检查路径是否需要认证"""
        return any(path.startswith(p) for p in self.protected_paths)

    def handle(self, request: HttpRequest) -> Optional[HttpResponse]:
        print(f"认证中间件检查: {request}")

        # 检查是否需要认证
        if self._is_protected(request.path):
            # 检查认证状态
            auth_header = request.headers.get("Authorization", "")
            if not auth_header.startswith("Bearer "):
                print("  ✗ 未提供认证信息")
                return HttpResponse(
                    status_code=401,
                    body="Unauthorized: Missing or invalid token",
                    headers={}
                )

            # 模拟验证 token
            token = auth_header[7:]  # 去掉 "Bearer "
            if token != "valid_token":
                print("  ✗ 无效的认证令牌")
                return HttpResponse(
                    status_code=401,
                    body="Unauthorized: Invalid token",
                    headers={}
                )

            request.is_authenticated = True
            request.user = "authenticated_user"
            print("  ✓ 认证通过")
        else:
            print("  - 路径无需认证")

        # 继续传递给下一个中间件
        return self._pass_to_next(request)


class RateLimitMiddleware(Middleware):
    """
    ConcreteHandler - 限流中间件
    限制请求频率，超出限制返回 429
    """

    def __init__(self, max_requests: int = 100, window_seconds: int = 60):
        super().__init__()
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.request_counts: Dict[str, int] = {}

    def handle(self, request: HttpRequest) -> Optional[HttpResponse]:
        print(f"限流中间件检查: {request}")

        # 简化的限流逻辑：使用路径作为 key
        key = request.path
        current_count = self.request_counts.get(key, 0)

        if current_count >= self.max_requests:
            print(f"  ✗ 请求过于频繁 ({current_count}/{self.max_requests})")
            return HttpResponse(
                status_code=429,
                body="Too Many Requests: Rate limit exceeded",
                headers={"Retry-After": str(self.window_seconds)}
            )

        self.request_counts[key] = current_count + 1
        print(f"  ✓ 请求计数: {current_count + 1}/{self.max_requests}")

        return self._pass_to_next(request)


class LoggingMiddleware(Middleware):
    """
    ConcreteHandler - 日志中间件
    记录请求信息，总是传递给下一个中间件
    """

    def __init__(self):
        super().__init__()
        self.logs: list = []

    def handle(self, request: HttpRequest) -> Optional[HttpResponse]:
        print(f"日志中间件处理: {request}")

        # 记录请求
        log_entry = f"[{request.method}] {request.path} - User: {request.user or 'Anonymous'}"
        self.logs.append(log_entry)
        print(f"  ✓ 已记录: {log_entry}")

        # 日志中间件不拦截请求，总是传递
        return self._pass_to_next(request)


class CorsMiddleware(Middleware):
    """
    ConcreteHandler - CORS 中间件
    处理跨域请求，添加响应头
    """

    def __init__(self, allowed_origins: list = None):
        super().__init__()
        self.allowed_origins = allowed_origins or ["*"]

    def handle(self, request: HttpRequest) -> Optional[HttpResponse]:
        print(f"CORS 中间件处理: {request}")

        origin = request.headers.get("Origin", "")

        # 预检请求处理
        if request.method == "OPTIONS":
            print("  ✓ 处理预检请求")
            return HttpResponse(
                status_code=204,
                body="",
                headers={
                    "Access-Control-Allow-Origin": origin if origin in self.allowed_origins else "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization"
                }
            )

        print("  ✓ 添加 CORS 响应头")
        # 实际请求继续传递，CORS 头会在最终响应中添加
        response = self._pass_to_next(request)

        # 如果响应存在，添加 CORS 头
        if response:
            response.headers["Access-Control-Allow-Origin"] = "*"

        return response


class FinalHandler(Middleware):
    """
    ConcreteHandler - 最终处理器
    链的末端，实际处理业务逻辑
    """

    def handle(self, request: HttpRequest) -> HttpResponse:
        print(f"最终处理器: {request}")

        # 模拟业务处理
        if request.path == "/api/data":
            return HttpResponse(
                status_code=200,
                body='{"data": "success"}',
                headers={"Content-Type": "application/json"}
            )
        elif request.path == "/admin/users":
            if request.is_authenticated:
                return HttpResponse(
                    status_code=200,
                    body='{"users": ["user1", "user2"]}',
                    headers={"Content-Type": "application/json"}
                )
        elif request.path == "/health":
            return HttpResponse(
                status_code=200,
                body='{"status": "ok"}',
                headers={"Content-Type": "application/json"}
            )

        return HttpResponse(
            status_code=404,
            body="Not Found",
            headers={}
        )


def client_code():
    """客户端代码 - 构建中间件链并使用"""
    print("=== 责任链模式 - HTTP 中间件链 ===\\n")

    # 创建中间件
    cors = CorsMiddleware()
    logging_mw = LoggingMiddleware()
    auth = AuthenticationMiddleware()
    ratelimit = RateLimitMiddleware(max_requests=5)
    final = FinalHandler()

    # 构建责任链: cors -> logging -> auth -> ratelimit -> final
    cors.set_next(logging_mw).set_next(auth).set_next(ratelimit).set_next(final)

    # 测试不同的请求
    test_requests = [
        # 测试 1: 公开端点
        HttpRequest("GET", "/health", {}, ""),

        # 测试 2: 需要认证但未提供
        HttpRequest("GET", "/api/data", {}, ""),

        # 测试 3: 需要认证且提供有效 token
        HttpRequest("GET", "/api/data", {"Authorization": "Bearer valid_token"}, ""),

        # 测试 4: 预检请求
        HttpRequest("OPTIONS", "/api/data", {"Origin": "http://localhost:3000"}, ""),
    ]

    for i, request in enumerate(test_requests, 1):
        print(f"\\n--- 测试 {i}: {request} ---")
        response = cors.handle(request)
        if response:
            print(f"响应: {response}")
        else:
            print("响应: None (链中断)")
        print()


if __name__ == "__main__":
    client_code()`,

    cpp: `/**
 * 责任链模式 - C++ 实现
 * 场景：游戏事件处理系统
 */

#include <iostream>
#include <string>
#include <memory>
#include <vector>

// 事件类型枚举
enum class EventType {
    KEY_PRESS,
    MOUSE_CLICK,
    COLLISION,
    DAMAGE,
    GAME_OVER
};

// 将事件类型转换为字符串
std::string eventTypeToString(EventType type) {
    switch (type) {
        case EventType::KEY_PRESS:    return "KEY_PRESS";
        case EventType::MOUSE_CLICK:  return "MOUSE_CLICK";
        case EventType::COLLISION:    return "COLLISION";
        case EventType::DAMAGE:       return "DAMAGE";
        case EventType::GAME_OVER:    return "GAME_OVER";
        default:                      return "UNKNOWN";
    }
}

// 游戏事件类
class GameEvent {
public:
    EventType type;
    std::string data;
    int priority;  // 优先级：数字越大越优先

    GameEvent(EventType t, std::string d, int p = 0)
        : type(t), data(std::move(d)), priority(p) {}

    std::string toString() const {
        return "[" + eventTypeToString(type) + "] " + data +
               " (优先级: " + std::to_string(priority) + ")";
    }
};

// Handler 抽象基类 - 事件处理器
class EventHandler {
protected:
    // 使用 shared_ptr 管理下一个处理者
    std::shared_ptr<EventHandler> nextHandler;
    std::string handlerName;

public:
    explicit EventHandler(std::string name) : handlerName(std::move(name)) {}
    virtual ~EventHandler() = default;

    // 设置下一个处理者，返回 shared_ptr 支持链式调用
    std::shared_ptr<EventHandler> setNext(std::shared_ptr<EventHandler> next) {
        nextHandler = next;
        return next;
    }

    // 纯虚函数：处理事件
    virtual std::string handle(const GameEvent& event) = 0;

    // 获取处理器名称
    std::string getName() const { return handlerName; }

protected:
    // 辅助方法：传递给下一个处理者
    std::string passToNext(const GameEvent& event) {
        if (nextHandler) {
            std::cout << "  ↳ 传递给: " << nextHandler->getName() << std::endl;
            return nextHandler->handle(event);
        }
        return "事件未被处理: " + event.toString();
    }
};

// ConcreteHandlerA - 输入处理器
// 处理键盘和鼠标事件
class InputHandler : public EventHandler {
public:
    InputHandler() : EventHandler("InputHandler") {}

    std::string handle(const GameEvent& event) override {
        std::cout << handlerName << " 检查: " << event.toString() << std::endl;

        // 输入处理器处理 KEY_PRESS 和 MOUSE_CLICK 事件
        if (event.type == EventType::KEY_PRESS ||
            event.type == EventType::MOUSE_CLICK) {
            std::cout << "  ✓ 已处理输入事件" << std::endl;
            return "[输入系统] " + event.data;
        }

        // 其他事件传递给下一个处理器
        return passToNext(event);
    }
};

// ConcreteHandlerB - 物理引擎处理器
// 处理碰撞事件
class PhysicsHandler : public EventHandler {
public:
    PhysicsHandler() : EventHandler("PhysicsHandler") {}

    std::string handle(const GameEvent& event) override {
        std::cout << handlerName << " 检查: " << event.toString() << std::endl;

        // 物理处理器处理 COLLISION 事件
        if (event.type == EventType::COLLISION) {
            std::cout << "  ✓ 已处理碰撞事件" << std::endl;

            // 碰撞可能导致伤害，创建新事件继续传递
            if (event.data.find("damage") != std::string::npos) {
                std::cout << "  ! 碰撞产生伤害，创建 DAMAGE 事件" << std::endl;
                // 在实际游戏中，这里会创建并触发新事件
            }

            return "[物理引擎] " + event.data;
        }

        return passToNext(event);
    }
};

// ConcreteHandlerC - 伤害计算处理器
// 处理伤害事件
class DamageHandler : public EventHandler {
private:
    int damageMultiplier = 2;  // 伤害倍率

public:
    DamageHandler() : EventHandler("DamageHandler") {}

    std::string handle(const GameEvent& event) override {
        std::cout << handlerName << " 检查: " << event.toString() << std::endl;

        // 伤害处理器处理 DAMAGE 事件
        if (event.type == EventType::DAMAGE) {
            std::cout << "  ✓ 计算伤害 (倍率: " << damageMultiplier << "x)" << std::endl;

            // 如果伤害致命，可能触发 GAME_OVER
            if (event.priority >= 100) {
                std::cout << "  ! 致命伤害，可能触发游戏结束" << std::endl;
            }

            return "[伤害系统] 受到 " + std::to_string(event.priority * damageMultiplier) + " 点伤害";
        }

        return passToNext(event);
    }
};

// ConcreteHandlerD - 游戏状态处理器
// 处理游戏结束等高优先级事件
class GameStateHandler : public EventHandler {
public:
    GameStateHandler() : EventHandler("GameStateHandler") {}

    std::string handle(const GameEvent& event) override {
        std::cout << handlerName << " 检查: " << event.toString() << std::endl;

        // 游戏状态处理器处理 GAME_OVER 和所有高优先级事件
        if (event.type == EventType::GAME_OVER) {
            std::cout << "  ✓ 处理游戏结束" << std::endl;
            return "[游戏状态] 游戏结束: " + event.data;
        }

        // 对于高优先级事件也进行处理
        if (event.priority >= 100) {
            std::cout << "  ✓ 处理高优先级事件" << std::endl;
            return "[游戏状态] 紧急处理: " + event.data;
        }

        return passToNext(event);
    }
};

// ConcreteHandlerE - 默认处理器（链的末端）
// 处理未被前面处理器处理的任何事件
class DefaultHandler : public EventHandler {
public:
    DefaultHandler() : EventHandler("DefaultHandler") {}

    std::string handle(const GameEvent& event) override {
        std::cout << handlerName << " 处理: " << event.toString() << std::endl;
        std::cout << "  ✓ 默认处理（记录日志）" << std::endl;
        return "[默认处理器] 已记录: " + event.toString();
    }
};

// 客户端代码
void clientCode() {
    std::cout << "=== 责任链模式 - 游戏事件处理系统 ===\\n" << std::endl;

    // 创建处理器（使用 shared_ptr 管理）
    auto inputHandler = std::make_shared<InputHandler>();
    auto physicsHandler = std::make_shared<PhysicsHandler>();
    auto damageHandler = std::make_shared<DamageHandler>();
    auto gameStateHandler = std::make_shared<GameStateHandler>();
    auto defaultHandler = std::make_shared<DefaultHandler>();

    // 构建责任链
    // inputHandler -> physicsHandler -> damageHandler -> gameStateHandler -> defaultHandler
    inputHandler->setNext(physicsHandler)
                ->setNext(damageHandler)
                ->setNext(gameStateHandler)
                ->setNext(defaultHandler);

    // 创建测试事件
    std::vector<GameEvent> events = {
        GameEvent(EventType::KEY_PRESS, "按下空格键跳跃", 1),
        GameEvent(EventType::MOUSE_CLICK, "点击位置 (100, 200)", 1),
        GameEvent(EventType::COLLISION, "玩家与敌人碰撞 damage", 5),
        GameEvent(EventType::DAMAGE, "受到攻击", 50),
        GameEvent(EventType::GAME_OVER, "玩家生命值归零", 999),
        GameEvent(EventType::KEY_PRESS, "未知按键", 0)  // 会被默认处理器处理
    };

    // 处理每个事件
    for (size_t i = 0; i < events.size(); ++i) {
        std::cout << "\\n--- 事件 " << (i + 1) << " ---" << std::endl;
        std::string result = inputHandler->handle(events[i]);
        std::cout << "结果: " << result << "\\n" << std::endl;
    }
}

int main() {
    clientCode();
    return 0;
}`,
  },
  realWorldExamples: [{ title: 'Java Servlet Filter', description: 'Java Servlet 的 FilterChain 是责任链模式的典型应用。', source: 'Java EE', codeSnippet: 'filterChain.doFilter(request, response);' }],
  relatedPatterns: ['command', 'mediator', 'observer'],
  quiz: [{ id: 'q1', type: 'single', question: '责任链模式的主要目的是什么？', options: ['创建对象', '将请求沿链传递', '转换接口', '优化性能'], correctAnswer: 1, explanation: '责任链模式的主要目的是使多个对象都有机会处理请求，将请求沿着处理者链传递。' }],
};
