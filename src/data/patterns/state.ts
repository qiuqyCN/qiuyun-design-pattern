import type { DesignPattern } from '@/types/pattern';

export const statePattern: DesignPattern = {
  id: 'state',
  name: '状态模式',
  nameEn: 'State Pattern',
  category: 'behavioral',
  difficulty: 'medium',
  frequency: 'medium',
  intent: '允许对象在内部状态改变时改变它的行为。对象看起来似乎修改了它的类。',
  description: '状态模式是一种行为设计模式，让你能在一个对象的内部状态变化时改变其行为，使其看上去就像改变了自身所属的类一样。',
  applicability: ['当对象的行为取决于它的状态，并且它必须在运行时刻根据状态改变它的行为时', '当代码中包含大量与对象状态有关的条件语句时'],
  pros: ['单一职责原则：将与特定状态相关的代码放在单独的类中', '开闭原则：无需修改现有状态类和上下文就能引入新状态', '通过消除臃肿的状态机条件语句简化上下文代码'],
  cons: ['如果状态机只有很少的几个状态，或者很少发生改变，那么应用该模式可能会显得小题大做'],
  analogy: { title: '现实世界中的状态', description: '状态模式就像是交通信号灯', scenarios: [{ id: 'traffic', title: '交通信号灯', description: '信号灯在不同状态（红、黄、绿）下有不同的行为，状态转换由当前状态决定。', icon: 'TrafficLight' }] },
  structure: {
    classDiagram: '',
    mermaidDiagram: `
classDiagram
  class State {
    <<interface>>
    +handle(context) void
  }

  class ConcreteStateA {
    +handle(context) void
  }

  class ConcreteStateB {
    +handle(context) void
  }

  class ConcreteStateC {
    +handle(context) void
  }

  class Context {
    -state: State
    +setState(state) void
    +request() void
  }

  State <|.. ConcreteStateA : implements
  State <|.. ConcreteStateB : implements
  State <|.. ConcreteStateC : implements
  Context o--> State : uses

  style State fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style Context fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style ConcreteStateA fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px
  style ConcreteStateB fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px
  style ConcreteStateC fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: '状态接口',
        description: '定义状态接口，声明状态相关的行为方法',
        duration: 2000,
        elements: [
          { id: 'state', type: 'interface', name: 'State', x: 200, y: 150, methods: ['+handle(context)'] },
        ],
      },
      {
        id: 'step2',
        title: '具体状态',
        description: '实现具体状态类，每个类封装特定状态下的行为',
        duration: 3000,
        elements: [
          { id: 'state', type: 'interface', name: 'State', x: 200, y: 150, methods: ['+handle(context)'] },
          { id: 'stateA', type: 'class', name: 'ConcreteStateA', x: 50, y: 300, methods: ['+handle(context)'] },
          { id: 'stateB', type: 'class', name: 'ConcreteStateB', x: 200, y: 300, methods: ['+handle(context)'] },
          { id: 'stateC', type: 'class', name: 'ConcreteStateC', x: 350, y: 300, methods: ['+handle(context)'] },
        ],
        connections: [
          { from: 'state', to: 'stateA', type: 'implementation' },
          { from: 'state', to: 'stateB', type: 'implementation' },
          { from: 'state', to: 'stateC', type: 'implementation' },
        ],
      },
      {
        id: 'step3',
        title: '上下文类',
        description: '上下文类维护当前状态，并将行为委托给当前状态对象',
        duration: 3000,
        elements: [
          { id: 'state', type: 'interface', name: 'State', x: 200, y: 150, methods: ['+handle(context)'] },
          { id: 'stateA', type: 'class', name: 'ConcreteStateA', x: 50, y: 300, methods: ['+handle(context)'] },
          { id: 'stateB', type: 'class', name: 'ConcreteStateB', x: 200, y: 300, methods: ['+handle(context)'] },
          { id: 'stateC', type: 'class', name: 'ConcreteStateC', x: 350, y: 300, methods: ['+handle(context)'] },
          { id: 'context', type: 'class', name: 'Context', x: 450, y: 150, properties: ['-state: State'], methods: ['+setState(state)', '+request()'] },
        ],
        connections: [
          { from: 'state', to: 'stateA', type: 'implementation' },
          { from: 'state', to: 'stateB', type: 'implementation' },
          { from: 'state', to: 'stateC', type: 'implementation' },
          { from: 'context', to: 'state', type: 'association', label: 'uses' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * 状态模式 - TypeScript 实现
 * 以文档编辑器的发布状态为例：草稿 -> 审核中 -> 已发布
 */

/**
 * State 接口：定义所有具体状态必须实现的方法
 * 每个状态类都将实现 handle 方法来处理状态特定的行为
 */
interface State {
  /**
   * 处理当前状态下的行为
   * @param context 上下文对象，用于状态转换
   */
  handle(context: DocumentContext): void;

  /**
   * 获取状态名称
   */
  getName(): string;
}

/**
 * ConcreteStateA: 草稿状态
 * 文档初始状态，可以提交审核
 */
class DraftState implements State {
  handle(context: DocumentContext): void {
    console.log("当前状态：草稿");
    console.log("操作：文档已提交审核");
    // 状态转换：草稿 -> 审核中
    context.setState(new ModerationState());
  }

  getName(): string {
    return "草稿";
  }
}

/**
 * ConcreteStateB: 审核中状态
 * 文档正在审核，可以批准发布或驳回
 */
class ModerationState implements State {
  handle(context: DocumentContext): void {
    console.log("当前状态：审核中");
    // 模拟审核结果
    const approved = Math.random() > 0.5;
    if (approved) {
      console.log("操作：审核通过，准备发布");
      // 状态转换：审核中 -> 已发布
      context.setState(new PublishedState());
    } else {
      console.log("操作：审核未通过，返回草稿");
      // 状态转换：审核中 -> 草稿
      context.setState(new DraftState());
    }
  }

  getName(): string {
    return "审核中";
  }
}

/**
 * ConcreteStateC: 已发布状态
 * 文档已发布，可以查看但不能再编辑
 */
class PublishedState implements State {
  handle(context: DocumentContext): void {
    console.log("当前状态：已发布");
    console.log("操作：文档已发布，可供阅读");
    console.log("提示：如需修改，请先撤回至草稿状态");
  }

  getName(): string {
    return "已发布";
  }
}

/**
 * Context 上下文类
 * 维护当前状态，并将行为委托给当前状态对象
 */
class DocumentContext {
  private state: State;
  private documentName: string;

  constructor(documentName: string, initialState: State) {
    this.documentName = documentName;
    this.state = initialState;
    console.log(\`文档 '\${documentName}' 创建，当前状态：\${this.state.getName()}\`);
  }

  /**
   * 设置新状态
   * @param state 新的状态对象
   */
  setState(state: State): void {
    console.log(\`状态变更：\${this.state.getName()} -> \${state.getName()}\`);
    this.state = state;
  }

  /**
   * 获取当前状态
   */
  getState(): State {
    return this.state;
  }

  /**
   * 执行当前状态下的操作
   * 将实际行为委托给当前状态对象
   */
  request(): void {
    this.state.handle(this);
  }

  /**
   * 获取文档名称
   */
  getDocumentName(): string {
    return this.documentName;
  }
}

/**
 * 客户端代码
 * 演示状态模式的使用
 */
function clientCode(): void {
  console.log("=== 状态模式演示 ===\\n");

  // 创建文档，初始状态为草稿
  const document = new DocumentContext("设计模式文档", new DraftState());

  console.log("\\n--- 第一次操作 ---");
  document.request(); // 草稿 -> 审核中

  console.log("\\n--- 第二次操作 ---");
  document.request(); // 审核中 -> 已发布 或 审核中 -> 草稿

  // 如果审核通过到了已发布状态
  if (document.getState().getName() === "已发布") {
    console.log("\\n--- 第三次操作（已发布状态）---");
    document.request(); // 已发布状态的行为
  } else {
    // 如果审核未通过回到草稿状态，再次提交
    console.log("\\n--- 重新提交审核 ---");
    document.request(); // 草稿 -> 审核中
    console.log("\\n--- 再次审核 ---");
    document.request(); // 审核中 -> ?
  }
}

// 运行客户端代码
clientCode();`,

    java: `/**
 * 状态模式 - Java 实现
 * 以文档编辑器的发布状态为例：草稿 -> 审核中 -> 已发布
 */

/**
 * State 接口：定义所有具体状态必须实现的方法
 */
public interface State {
    /**
     * 处理当前状态下的行为
     * @param context 上下文对象，用于状态转换
     */
    void handle(DocumentContext context);

    /**
     * 获取状态名称
     */
    String getName();
}

/**
 * ConcreteStateA: 草稿状态
 * 文档初始状态，可以提交审核
 */
public class DraftState implements State {
    @Override
    public void handle(DocumentContext context) {
        System.out.println("当前状态：草稿");
        System.out.println("操作：文档已提交审核");
        // 状态转换：草稿 -> 审核中
        context.setState(new ModerationState());
    }

    @Override
    public String getName() {
        return "草稿";
    }
}

/**
 * ConcreteStateB: 审核中状态
 * 文档正在审核，可以批准发布或驳回
 */
public class ModerationState implements State {
    @Override
    public void handle(DocumentContext context) {
        System.out.println("当前状态：审核中");
        // 模拟审核结果
        boolean approved = Math.random() > 0.5;
        if (approved) {
            System.out.println("操作：审核通过，准备发布");
            // 状态转换：审核中 -> 已发布
            context.setState(new PublishedState());
        } else {
            System.out.println("操作：审核未通过，返回草稿");
            // 状态转换：审核中 -> 草稿
            context.setState(new DraftState());
        }
    }

    @Override
    public String getName() {
        return "审核中";
    }
}

/**
 * ConcreteStateC: 已发布状态
 * 文档已发布，可以查看但不能再编辑
 */
public class PublishedState implements State {
    @Override
    public void handle(DocumentContext context) {
        System.out.println("当前状态：已发布");
        System.out.println("操作：文档已发布，可供阅读");
        System.out.println("提示：如需修改，请先撤回至草稿状态");
    }

    @Override
    public String getName() {
        return "已发布";
    }
}

/**
 * Context 上下文类
 * 维护当前状态，并将行为委托给当前状态对象
 */
public class DocumentContext {
    private State state;
    private String documentName;

    public DocumentContext(String documentName, State initialState) {
        this.documentName = documentName;
        this.state = initialState;
        System.out.println("文档 '" + documentName + "' 创建，当前状态：" + this.state.getName());
    }

    /**
     * 设置新状态
     * @param state 新的状态对象
     */
    public void setState(State state) {
        System.out.println("状态变更：" + this.state.getName() + " -> " + state.getName());
        this.state = state;
    }

    /**
     * 获取当前状态
     */
    public State getState() {
        return state;
    }

    /**
     * 执行当前状态下的操作
     * 将实际行为委托给当前状态对象
     */
    public void request() {
        this.state.handle(this);
    }

    /**
     * 获取文档名称
     */
    public String getDocumentName() {
        return documentName;
    }
}

/**
 * 客户端代码
 * 演示状态模式的使用
 */
public class Client {
    public static void main(String[] args) {
        System.out.println("=== 状态模式演示 ===\\n");

        // 创建文档，初始状态为草稿
        DocumentContext document = new DocumentContext("设计模式文档", new DraftState());

        System.out.println("\\n--- 第一次操作 ---");
        document.request(); // 草稿 -> 审核中

        System.out.println("\\n--- 第二次操作 ---");
        document.request(); // 审核中 -> 已发布 或 审核中 -> 草稿

        // 如果审核通过到了已发布状态
        if (document.getState().getName().equals("已发布")) {
            System.out.println("\\n--- 第三次操作（已发布状态）---");
            document.request(); // 已发布状态的行为
        } else {
            // 如果审核未通过回到草稿状态，再次提交
            System.out.println("\\n--- 重新提交审核 ---");
            document.request(); // 草稿 -> 审核中
            System.out.println("\\n--- 再次审核 ---");
            document.request(); // 审核中 -> ?
        }
    }
}`,

    go: `package main

import (
	"fmt"
	"math/rand"
)

/**
 * State 接口：定义所有具体状态必须实现的方法
 */
type State interface {
	/**
	 * 处理当前状态下的行为
	 * @param context 上下文对象，用于状态转换
	 */
	Handle(context *DocumentContext)

	/**
	 * 获取状态名称
	 */
	GetName() string
}

/**
 * ConcreteStateA: 草稿状态
 * 文档初始状态，可以提交审核
 */
type DraftState struct{}

func (d *DraftState) Handle(context *DocumentContext) {
	fmt.Println("当前状态：草稿")
	fmt.Println("操作：文档已提交审核")
	// 状态转换：草稿 -> 审核中
	context.SetState(&ModerationState{})
}

func (d *DraftState) GetName() string {
	return "草稿"
}

/**
 * ConcreteStateB: 审核中状态
 * 文档正在审核，可以批准发布或驳回
 */
type ModerationState struct{}

func (m *ModerationState) Handle(context *DocumentContext) {
	fmt.Println("当前状态：审核中")
	// 模拟审核结果
	approved := rand.Float64() > 0.5
	if approved {
		fmt.Println("操作：审核通过，准备发布")
		// 状态转换：审核中 -> 已发布
		context.SetState(&PublishedState{})
	} else {
		fmt.Println("操作：审核未通过，返回草稿")
		// 状态转换：审核中 -> 草稿
		context.SetState(&DraftState{})
	}
}

func (m *ModerationState) GetName() string {
	return "审核中"
}

/**
 * ConcreteStateC: 已发布状态
 * 文档已发布，可以查看但不能再编辑
 */
type PublishedState struct{}

func (p *PublishedState) Handle(context *DocumentContext) {
	fmt.Println("当前状态：已发布")
	fmt.Println("操作：文档已发布，可供阅读")
	fmt.Println("提示：如需修改，请先撤回至草稿状态")
}

func (p *PublishedState) GetName() string {
	return "已发布"
}

/**
 * Context 上下文类
 * 维护当前状态，并将行为委托给当前状态对象
 */
type DocumentContext struct {
	state        State
	documentName string
}

/**
 * 创建新的文档上下文
 */
func NewDocumentContext(documentName string, initialState State) *DocumentContext {
	ctx := &DocumentContext{
		documentName: documentName,
		state:        initialState,
	}
	fmt.Printf("文档 '%s' 创建，当前状态：%s\\n", documentName, initialState.GetName())
	return ctx
}

/**
 * 设置新状态
 */
func (c *DocumentContext) SetState(state State) {
	fmt.Printf("状态变更：%s -> %s\\n", c.state.GetName(), state.GetName())
	c.state = state
}

/**
 * 获取当前状态
 */
func (c *DocumentContext) GetState() State {
	return c.state
}

/**
 * 执行当前状态下的操作
 * 将实际行为委托给当前状态对象
 */
func (c *DocumentContext) Request() {
	c.state.Handle(c)
}

/**
 * 获取文档名称
 */
func (c *DocumentContext) GetDocumentName() string {
	return c.documentName
}

/**
 * 客户端代码
 * 演示状态模式的使用
 */
func main() {
	fmt.Println("=== 状态模式演示 ===\\n")

	// 创建文档，初始状态为草稿
	document := NewDocumentContext("设计模式文档", &DraftState{})

	fmt.Println("\\n--- 第一次操作 ---")
	document.Request() // 草稿 -> 审核中

	fmt.Println("\\n--- 第二次操作 ---")
	document.Request() // 审核中 -> 已发布 或 审核中 -> 草稿

	// 如果审核通过到了已发布状态
	if document.GetState().GetName() == "已发布" {
		fmt.Println("\\n--- 第三次操作（已发布状态）---")
		document.Request() // 已发布状态的行为
	} else {
		// 如果审核未通过回到草稿状态，再次提交
		fmt.Println("\\n--- 重新提交审核 ---")
		document.Request() // 草稿 -> 审核中
		fmt.Println("\\n--- 再次审核 ---")
		document.Request() // 审核中 -> ?
	}
}`,

    python: `from abc import ABC, abstractmethod
import random


/**
 * State 抽象类：定义所有具体状态必须实现的方法
 */
class State(ABC):
    @abstractmethod
    def handle(self, context: 'DocumentContext') -> None:
        """
        处理当前状态下的行为
        :param context: 上下文对象，用于状态转换
        """
        pass

    @abstractmethod
    def get_name(self) -> str:
        """
        获取状态名称
        """
        pass


/**
 * ConcreteStateA: 草稿状态
 * 文档初始状态，可以提交审核
 */
class DraftState(State):
    def handle(self, context: 'DocumentContext') -> None:
        print("当前状态：草稿")
        print("操作：文档已提交审核")
        # 状态转换：草稿 -> 审核中
        context.set_state(ModerationState())

    def get_name(self) -> str:
        return "草稿"


/**
 * ConcreteStateB: 审核中状态
 * 文档正在审核，可以批准发布或驳回
 */
class ModerationState(State):
    def handle(self, context: 'DocumentContext') -> None:
        print("当前状态：审核中")
        # 模拟审核结果
        approved = random.random() > 0.5
        if approved:
            print("操作：审核通过，准备发布")
            # 状态转换：审核中 -> 已发布
            context.set_state(PublishedState())
        else:
            print("操作：审核未通过，返回草稿")
            # 状态转换：审核中 -> 草稿
            context.set_state(DraftState())

    def get_name(self) -> str:
        return "审核中"


/**
 * ConcreteStateC: 已发布状态
 * 文档已发布，可以查看但不能再编辑
 */
class PublishedState(State):
    def handle(self, context: 'DocumentContext') -> None:
        print("当前状态：已发布")
        print("操作：文档已发布，可供阅读")
        print("提示：如需修改，请先撤回至草稿状态")

    def get_name(self) -> str:
        return "已发布"


/**
 * Context 上下文类
 * 维护当前状态，并将行为委托给当前状态对象
 */
class DocumentContext:
    def __init__(self, document_name: str, initial_state: State):
        self._document_name = document_name
        self._state = initial_state
        print(f"文档 '{document_name}' 创建，当前状态：{initial_state.get_name()}")

    def set_state(self, state: State) -> None:
        """
        设置新状态
        :param state: 新的状态对象
        """
        print(f"状态变更：{self._state.get_name()} -> {state.get_name()}")
        self._state = state

    def get_state(self) -> State:
        """
        获取当前状态
        """
        return self._state

    def request(self) -> None:
        """
        执行当前状态下的操作
        将实际行为委托给当前状态对象
        """
        self._state.handle(self)

    def get_document_name(self) -> str:
        """
        获取文档名称
        """
        return self._document_name


/**
 * 客户端代码
 * 演示状态模式的使用
 */
def client_code():
    print("=== 状态模式演示 ===\\n")

    # 创建文档，初始状态为草稿
    document = DocumentContext("设计模式文档", DraftState())

    print("\\n--- 第一次操作 ---")
    document.request()  # 草稿 -> 审核中

    print("\\n--- 第二次操作 ---")
    document.request()  # 审核中 -> 已发布 或 审核中 -> 草稿

    # 如果审核通过到了已发布状态
    if document.get_state().get_name() == "已发布":
        print("\\n--- 第三次操作（已发布状态）---")
        document.request()  # 已发布状态的行为
    else:
        # 如果审核未通过回到草稿状态，再次提交
        print("\\n--- 重新提交审核 ---")
        document.request()  # 草稿 -> 审核中
        print("\\n--- 再次审核 ---")
        document.request()  # 审核中 -> ?


if __name__ == "__main__":
    client_code()`,

    cpp: `#include <iostream>
#include <string>
#include <memory>
#include <cstdlib>
#include <ctime>

// 前向声明
class DocumentContext;

/**
 * State 抽象类：定义所有具体状态必须实现的方法
 */
class State {
public:
    virtual ~State() = default;

    /**
     * 处理当前状态下的行为
     * @param context 上下文对象，用于状态转换
     */
    virtual void handle(DocumentContext* context) = 0;

    /**
     * 获取状态名称
     */
    virtual std::string getName() const = 0;
};

/**
 * Context 上下文类
 * 维护当前状态，并将行为委托给当前状态对象
 */
class DocumentContext {
private:
    std::unique_ptr<State> state;
    std::string documentName;

public:
    DocumentContext(const std::string& name, std::unique_ptr<State> initialState)
        : documentName(name), state(std::move(initialState)) {
        std::cout << "文档 '" << documentName << "' 创建，当前状态：" << state->getName() << std::endl;
    }

    /**
     * 设置新状态
     * @param newState 新的状态对象
     */
    void setState(std::unique_ptr<State> newState) {
        std::cout << "状态变更：" << state->getName() << " -> " << newState->getName() << std::endl;
        state = std::move(newState);
    }

    /**
     * 获取当前状态
     */
    State* getState() const {
        return state.get();
    }

    /**
     * 执行当前状态下的操作
     * 将实际行为委托给当前状态对象
     */
    void request() {
        state->handle(this);
    }

    /**
     * 获取文档名称
     */
    std::string getDocumentName() const {
        return documentName;
    }
};

/**
 * ConcreteStateA: 草稿状态
 * 文档初始状态，可以提交审核
 */
class DraftState : public State {
public:
    void handle(DocumentContext* context) override;

    std::string getName() const override {
        return "草稿";
    }
};

/**
 * ConcreteStateB: 审核中状态
 * 文档正在审核，可以批准发布或驳回
 */
class ModerationState : public State {
public:
    void handle(DocumentContext* context) override;

    std::string getName() const override {
        return "审核中";
    }
};

/**
 * ConcreteStateC: 已发布状态
 * 文档已发布，可以查看但不能再编辑
 */
class PublishedState : public State {
public:
    void handle(DocumentContext* context) override;

    std::string getName() const override {
        return "已发布";
    }
};

// 状态方法实现（需要在Context和State类定义之后）
void DraftState::handle(DocumentContext* context) {
    std::cout << "当前状态：草稿" << std::endl;
    std::cout << "操作：文档已提交审核" << std::endl;
    // 状态转换：草稿 -> 审核中
    context->setState(std::make_unique<ModerationState>());
}

void ModerationState::handle(DocumentContext* context) {
    std::cout << "当前状态：审核中" << std::endl;
    // 模拟审核结果
    bool approved = (rand() % 2) == 1;
    if (approved) {
        std::cout << "操作：审核通过，准备发布" << std::endl;
        // 状态转换：审核中 -> 已发布
        context->setState(std::make_unique<PublishedState>());
    } else {
        std::cout << "操作：审核未通过，返回草稿" << std::endl;
        // 状态转换：审核中 -> 草稿
        context->setState(std::make_unique<DraftState>());
    }
}

void PublishedState::handle(DocumentContext* context) {
    std::cout << "当前状态：已发布" << std::endl;
    std::cout << "操作：文档已发布，可供阅读" << std::endl;
    std::cout << "提示：如需修改，请先撤回至草稿状态" << std::endl;
}

/**
 * 客户端代码
 * 演示状态模式的使用
 */
int main() {
    // 初始化随机数种子
    srand(static_cast<unsigned int>(time(nullptr)));

    std::cout << "=== 状态模式演示 ===" << std::endl << std::endl;

    // 创建文档，初始状态为草稿
    DocumentContext document("设计模式文档", std::make_unique<DraftState>());

    std::cout << std::endl << "--- 第一次操作 ---" << std::endl;
    document.request(); // 草稿 -> 审核中

    std::cout << std::endl << "--- 第二次操作 ---" << std::endl;
    document.request(); // 审核中 -> 已发布 或 审核中 -> 草稿

    // 如果审核通过到了已发布状态
    if (document.getState()->getName() == "已发布") {
        std::cout << std::endl << "--- 第三次操作（已发布状态）---" << std::endl;
        document.request(); // 已发布状态的行为
    } else {
        // 如果审核未通过回到草稿状态，再次提交
        std::cout << std::endl << "--- 重新提交审核 ---" << std::endl;
        document.request(); // 草稿 -> 审核中
        std::cout << std::endl << "--- 再次审核 ---" << std::endl;
        document.request(); // 审核中 -> ?
    }

    return 0;
}`,
  },
  realWorldExamples: [{ title: 'Thread States', description: 'Java 线程的状态转换（NEW、RUNNABLE、BLOCKED、WAITING、TIMED_WAITING、TERMINATED）使用状态模式。', source: 'JDK', codeSnippet: 'Thread.State state = thread.getState();' }],
  relatedPatterns: ['strategy', 'flyweight', 'singleton'],
  quiz: [{ id: 'q1', type: 'single', question: '状态模式的主要目的是什么？', options: ['创建对象', '根据状态改变行为', '优化性能', '转换接口'], correctAnswer: 1, explanation: '状态模式的主要目的是允许对象在内部状态改变时改变它的行为。' }],
};
