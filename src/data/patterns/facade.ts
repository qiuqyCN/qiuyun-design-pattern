import type { DesignPattern } from '@/types/pattern';

export const facadePattern: DesignPattern = {
  id: 'facade',
  name: '外观模式',
  nameEn: 'Facade Pattern',
  category: 'structural',
  difficulty: 'easy',
  frequency: 'high',
  intent: '为子系统中的一组接口提供一个一致的界面。外观模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。',
  description: '外观模式是一种结构型设计模式，能为复杂系统、库或框架提供一个简单（但有限）的接口。它将客户端与复杂的子系统解耦，使得客户端只需要与外观类交互，而不需要了解子系统内部的复杂实现。',
  applicability: [
    '当需要为一个复杂的子系统提供一个简单的接口时',
    '当需要将子系统与客户端解耦，减少它们之间的依赖时',
    '当需要构建分层系统时，使用外观模式定义每层的入口点',
    '当需要简化客户端与多个复杂子系统之间的交互时',
    '当需要对外隐藏子系统的复杂性和实现细节时',
  ],
  pros: [
    '让自己的代码独立于复杂子系统，降低耦合度',
    '减少了客户端需要处理的对象数量，简化调用过程',
    '使子系统更易于使用，降低学习成本',
    '将子系统的变化隔离在内部，不影响客户端代码',
    '可以提供一个简化的接口同时保留完整功能的底层访问',
  ],
  cons: [
    '外观可能成为与程序中所有类都耦合的上帝对象',
    '在某些情况下，外观可能限制了客户端对底层子系统的灵活使用',
    '如果设计不当，外观类可能变得过于臃肿',
  ],
  analogy: {
    title: '现实世界中的外观',
    description: '外观模式就像是现实世界中的各种简化接口和服务窗口',
    scenarios: [
      {
        id: 'waiter',
        title: '餐厅服务员',
        description: '你不需要直接与厨师、调酒师、清洁工交流，只需要告诉服务员你的需求，他会帮你协调一切。服务员就是餐厅子系统的外观。',
        icon: 'User',
      },
      {
        id: 'remote',
        title: '智能家居遥控器',
        description: '智能家居系统包含灯光、空调、窗帘、音响等多个子系统。遥控器（外观）提供一个统一的按钮来设置"观影模式"，自动调节所有设备。',
        icon: 'Remote',
      },
      {
        id: 'bank',
        title: '银行柜台',
        description: '银行后台有账户管理、贷款审批、风险评估等复杂子系统。客户只需要在柜台（外观）办理业务，无需了解后台的复杂流程。',
        icon: 'Building',
      },
    ],
  },
  structure: {
    classDiagram: `
      class Facade {
        -subsystemA: SubsystemA
        -subsystemB: SubsystemB
        -subsystemC: SubsystemC
        +operation()
        +operation2()
      }
      class SubsystemA { +operationA() }
      class SubsystemB { +operationB() }
      class SubsystemC { +operationC() }
      class Client
      Facade --> SubsystemA
      Facade --> SubsystemB
      Facade --> SubsystemC
      Client ..> Facade
    `,
    mermaidDiagram: `
classDiagram
  class Facade {
    -SubsystemA subsystemA
    -SubsystemB subsystemB
    -SubsystemC subsystemC
    +operation()
    +operation2()
  }
  
  class SubsystemA {
    +operationA()
    +operationA2()
  }
  
  class SubsystemB {
    +operationB()
    +operationB2()
  }
  
  class SubsystemC {
    +operationC()
    +operationC2()
  }
  
  class Client {
    +main()
  }
  
  Facade --> SubsystemA : uses
  Facade --> SubsystemB : uses
  Facade --> SubsystemC : uses
  Client ..> Facade : uses
  
  style Facade fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style SubsystemA fill:#fff3e0,stroke:#f57c00,stroke-width:1px
  style SubsystemB fill:#fff3e0,stroke:#f57c00,stroke-width:1px
  style SubsystemC fill:#fff3e0,stroke:#f57c00,stroke-width:1px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: '子系统类',
        description: '定义多个复杂的子系统类，每个类负责特定的功能',
        duration: 2000,
        elements: [
          { id: 'subsystemA', type: 'class', name: 'SubsystemA', x: 100, y: 300, methods: ['operationA()', 'operationA2()'] },
          { id: 'subsystemB', type: 'class', name: 'SubsystemB', x: 300, y: 300, methods: ['operationB()', 'operationB2()'] },
          { id: 'subsystemC', type: 'class', name: 'SubsystemC', x: 500, y: 300, methods: ['operationC()', 'operationC2()'] },
        ],
      },
      {
        id: 'step2',
        title: '外观类',
        description: '创建外观类，它了解子系统的职责，将客户端请求委派给适当的子系统对象',
        duration: 2000,
        elements: [
          { id: 'facade', type: 'class', name: 'Facade', x: 300, y: 100, properties: ['-subsystemA', '-subsystemB', '-subsystemC'], methods: ['operation()', 'operation2()'] },
          { id: 'subsystemA', type: 'class', name: 'SubsystemA', x: 100, y: 300, methods: ['operationA()', 'operationA2()'] },
          { id: 'subsystemB', type: 'class', name: 'SubsystemB', x: 300, y: 300, methods: ['operationB()', 'operationB2()'] },
          { id: 'subsystemC', type: 'class', name: 'SubsystemC', x: 500, y: 300, methods: ['operationC()', 'operationC2()'] },
        ],
        connections: [
          { from: 'facade', to: 'subsystemA', type: 'association' },
          { from: 'facade', to: 'subsystemB', type: 'association' },
          { from: 'facade', to: 'subsystemC', type: 'association' },
        ],
      },
      {
        id: 'step3',
        title: '客户端调用',
        description: '客户端通过外观类与子系统交互，无需直接了解子系统的复杂性',
        duration: 3000,
        elements: [
          { id: 'client', type: 'class', name: 'Client', x: 300, y: 20, methods: ['main()'] },
          { id: 'facade', type: 'class', name: 'Facade', x: 300, y: 150, properties: ['-subsystemA', '-subsystemB', '-subsystemC'], methods: ['operation()', 'operation2()'] },
          { id: 'subsystemA', type: 'class', name: 'SubsystemA', x: 100, y: 350, methods: ['operationA()', 'operationA2()'] },
          { id: 'subsystemB', type: 'class', name: 'SubsystemB', x: 300, y: 350, methods: ['operationB()', 'operationB2()'] },
          { id: 'subsystemC', type: 'class', name: 'SubsystemC', x: 500, y: 350, methods: ['operationC()', 'operationC2()'] },
        ],
        connections: [
          { from: 'client', to: 'facade', type: 'dependency', label: 'uses' },
          { from: 'facade', to: 'subsystemA', type: 'association' },
          { from: 'facade', to: 'subsystemB', type: 'association' },
          { from: 'facade', to: 'subsystemC', type: 'association' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * 子系统 A
 * 负责处理音频播放相关功能
 */
class SubsystemA {
  public operationA(): string {
    return 'SubsystemA: 初始化音频播放器';
  }

  public operationA2(): string {
    return 'SubsystemA: 播放音频';
  }
}

/**
 * 子系统 B
 * 负责处理视频解码相关功能
 */
class SubsystemB {
  public operationB(): string {
    return 'SubsystemB: 解码视频流';
  }

  public operationB2(): string {
    return 'SubsystemB: 渲染视频帧';
  }
}

/**
 * 子系统 C
 * 负责处理网络请求相关功能
 */
class SubsystemC {
  public operationC(): string {
    return 'SubsystemC: 连接媒体服务器';
  }

  public operationC2(): string {
    return 'SubsystemC: 下载媒体数据';
  }
}

/**
 * 外观类
 * 为复杂的视频播放子系统提供简化的统一接口
 */
class Facade {
  private subsystemA: SubsystemA;
  private subsystemB: SubsystemB;
  private subsystemC: SubsystemC;

  constructor() {
    this.subsystemA = new SubsystemA();
    this.subsystemB = new SubsystemB();
    this.subsystemC = new SubsystemC();
  }

  /**
   * 简化操作：播放视频
   * 封装了所有子系统的复杂调用顺序
   */
  public operation(): string {
    const results: string[] = [];
    results.push('Facade 开始初始化视频播放...');
    results.push(this.subsystemC.operationC());   // 连接服务器
    results.push(this.subsystemC.operationC2());  // 下载数据
    results.push(this.subsystemB.operationB());   // 解码视频
    results.push(this.subsystemA.operationA());   // 初始化音频
    results.push(this.subsystemB.operationB2());  // 渲染视频
    results.push(this.subsystemA.operationA2());  // 播放音频
    results.push('Facade 视频播放开始！');
    return results.join('\\n');
  }

  /**
   * 简化操作：仅播放音频
   * 另一种封装方式，只使用部分子系统
   */
  public operation2(): string {
    const results: string[] = [];
    results.push('Facade 开始音频播放...');
    results.push(this.subsystemC.operationC());
    results.push(this.subsystemA.operationA());
    results.push(this.subsystemA.operationA2());
    results.push('Facade 音频播放开始！');
    return results.join('\\n');
  }
}

/**
 * 额外外观类（可选）
 * 提供更细粒度的控制或不同的接口风格
 */
class OptionalFacade {
  private subsystemB: SubsystemB;
  private subsystemC: SubsystemC;

  constructor() {
    this.subsystemB = new SubsystemB();
    this.subsystemC = new SubsystemC();
  }

  /**
   * 仅处理视频相关操作（无音频）
   */
  public videoOnlyOperation(): string {
    const results: string[] = [];
    results.push('OptionalFacade: 纯视频模式');
    results.push(this.subsystemC.operationC());
    results.push(this.subsystemB.operationB());
    results.push(this.subsystemB.operationB2());
    return results.join('\\n');
  }
}

/**
 * 客户端代码
 * 演示使用外观和不使用外观的区别
 */
function clientCode(): void {
  console.log('=== 不使用外观模式（直接与子系统交互）===');
  const subsystemA = new SubsystemA();
  const subsystemB = new SubsystemB();
  const subsystemC = new SubsystemC();
  
  // 客户端需要了解所有子系统的调用顺序和细节
  console.log(subsystemC.operationC());
  console.log(subsystemC.operationC2());
  console.log(subsystemB.operationB());
  console.log(subsystemA.operationA());
  console.log(subsystemB.operationB2());
  console.log(subsystemA.operationA2());
  
  console.log('\\n=== 使用外观模式 ===');
  const facade = new Facade();
  // 客户端只需要调用简单的接口
  console.log(facade.operation());
  
  console.log('\\n=== 使用外观模式 - 仅音频 ===');
  console.log(facade.operation2());
  
  console.log('\\n=== 使用额外外观 ===');
  const optionalFacade = new OptionalFacade();
  console.log(optionalFacade.videoOnlyOperation());
}

// 运行客户端代码
clientCode();`,

    java: `/**
 * 子系统 A
 * 负责处理音频播放相关功能
 */
class SubsystemA {
    public String operationA() {
        return "SubsystemA: 初始化音频播放器";
    }

    public String operationA2() {
        return "SubsystemA: 播放音频";
    }
}

/**
 * 子系统 B
 * 负责处理视频解码相关功能
 */
class SubsystemB {
    public String operationB() {
        return "SubsystemB: 解码视频流";
    }

    public String operationB2() {
        return "SubsystemB: 渲染视频帧";
    }
}

/**
 * 子系统 C
 * 负责处理网络请求相关功能
 */
class SubsystemC {
    public String operationC() {
        return "SubsystemC: 连接媒体服务器";
    }

    public String operationC2() {
        return "SubsystemC: 下载媒体数据";
    }
}

/**
 * 外观类
 * 为复杂的视频播放子系统提供简化的统一接口
 */
class Facade {
    private SubsystemA subsystemA;
    private SubsystemB subsystemB;
    private SubsystemC subsystemC;

    public Facade() {
        this.subsystemA = new SubsystemA();
        this.subsystemB = new SubsystemB();
        this.subsystemC = new SubsystemC();
    }

    /**
     * 简化操作：播放视频
     * 封装了所有子系统的复杂调用顺序
     */
    public String operation() {
        StringBuilder results = new StringBuilder();
        results.append("Facade 开始初始化视频播放...\\n");
        results.append(subsystemC.operationC()).append("\\n");   // 连接服务器
        results.append(subsystemC.operationC2()).append("\\n");  // 下载数据
        results.append(subsystemB.operationB()).append("\\n");   // 解码视频
        results.append(subsystemA.operationA()).append("\\n");   // 初始化音频
        results.append(subsystemB.operationB2()).append("\\n");  // 渲染视频
        results.append(subsystemA.operationA2()).append("\\n");  // 播放音频
        results.append("Facade 视频播放开始！");
        return results.toString();
    }

    /**
     * 简化操作：仅播放音频
     * 另一种封装方式，只使用部分子系统
     */
    public String operation2() {
        StringBuilder results = new StringBuilder();
        results.append("Facade 开始音频播放...\\n");
        results.append(subsystemC.operationC()).append("\\n");
        results.append(subsystemA.operationA()).append("\\n");
        results.append(subsystemA.operationA2()).append("\\n");
        results.append("Facade 音频播放开始！");
        return results.toString();
    }
}

/**
 * 额外外观类（可选）
 * 提供更细粒度的控制或不同的接口风格
 */
class OptionalFacade {
    private SubsystemB subsystemB;
    private SubsystemC subsystemC;

    public OptionalFacade() {
        this.subsystemB = new SubsystemB();
        this.subsystemC = new SubsystemC();
    }

    /**
     * 仅处理视频相关操作（无音频）
     */
    public String videoOnlyOperation() {
        StringBuilder results = new StringBuilder();
        results.append("OptionalFacade: 纯视频模式\\n");
        results.append(subsystemC.operationC()).append("\\n");
        results.append(subsystemB.operationB()).append("\\n");
        results.append(subsystemB.operationB2());
        return results.toString();
    }
}

/**
 * 客户端代码
 * 演示使用外观和不使用外观的区别
 */
public class Client {
    public static void main(String[] args) {
        System.out.println("=== 不使用外观模式（直接与子系统交互）===");
        SubsystemA subsystemA = new SubsystemA();
        SubsystemB subsystemB = new SubsystemB();
        SubsystemC subsystemC = new SubsystemC();
        
        // 客户端需要了解所有子系统的调用顺序和细节
        System.out.println(subsystemC.operationC());
        System.out.println(subsystemC.operationC2());
        System.out.println(subsystemB.operationB());
        System.out.println(subsystemA.operationA());
        System.out.println(subsystemB.operationB2());
        System.out.println(subsystemA.operationA2());
        
        System.out.println("\\n=== 使用外观模式 ===");
        Facade facade = new Facade();
        // 客户端只需要调用简单的接口
        System.out.println(facade.operation());
        
        System.out.println("\\n=== 使用外观模式 - 仅音频 ===");
        System.out.println(facade.operation2());
        
        System.out.println("\\n=== 使用额外外观 ===");
        OptionalFacade optionalFacade = new OptionalFacade();
        System.out.println(optionalFacade.videoOnlyOperation());
    }
}`,

    go: `package main

import (
	"fmt"
	"strings"
)

/**
 * 子系统 A
 * 负责处理音频播放相关功能
 */
type SubsystemA struct{}

func (s *SubsystemA) OperationA() string {
	return "SubsystemA: 初始化音频播放器"
}

func (s *SubsystemA) OperationA2() string {
	return "SubsystemA: 播放音频"
}

/**
 * 子系统 B
 * 负责处理视频解码相关功能
 */
type SubsystemB struct{}

func (s *SubsystemB) OperationB() string {
	return "SubsystemB: 解码视频流"
}

func (s *SubsystemB) OperationB2() string {
	return "SubsystemB: 渲染视频帧"
}

/**
 * 子系统 C
 * 负责处理网络请求相关功能
 */
type SubsystemC struct{}

func (s *SubsystemC) OperationC() string {
	return "SubsystemC: 连接媒体服务器"
}

func (s *SubsystemC) OperationC2() string {
	return "SubsystemC: 下载媒体数据"
}

/**
 * 外观结构体
 * 为复杂的视频播放子系统提供简化的统一接口
 */
type Facade struct {
	subsystemA *SubsystemA
	subsystemB *SubsystemB
	subsystemC *SubsystemC
}

// NewFacade 创建外观实例的工厂函数
func NewFacade() *Facade {
	return &Facade{
		subsystemA: &SubsystemA{},
		subsystemB: &SubsystemB{},
		subsystemC: &SubsystemC{},
	}
}

/**
 * 简化操作：播放视频
 * 封装了所有子系统的复杂调用顺序
 */
func (f *Facade) Operation() string {
	var results []string
	results = append(results, "Facade 开始初始化视频播放...")
	results = append(results, f.subsystemC.OperationC())   // 连接服务器
	results = append(results, f.subsystemC.OperationC2())  // 下载数据
	results = append(results, f.subsystemB.OperationB())   // 解码视频
	results = append(results, f.subsystemA.OperationA())   // 初始化音频
	results = append(results, f.subsystemB.OperationB2())  // 渲染视频
	results = append(results, f.subsystemA.OperationA2())  // 播放音频
	results = append(results, "Facade 视频播放开始！")
	return strings.Join(results, "\\n")
}

/**
 * 简化操作：仅播放音频
 * 另一种封装方式，只使用部分子系统
 */
func (f *Facade) Operation2() string {
	var results []string
	results = append(results, "Facade 开始音频播放...")
	results = append(results, f.subsystemC.OperationC())
	results = append(results, f.subsystemA.OperationA())
	results = append(results, f.subsystemA.OperationA2())
	results = append(results, "Facade 音频播放开始！")
	return strings.Join(results, "\\n")
}

/**
 * 额外外观结构体（可选）
 * 提供更细粒度的控制或不同的接口风格
 */
type OptionalFacade struct {
	subsystemB *SubsystemB
	subsystemC *SubsystemC
}

// NewOptionalFacade 创建额外外观实例的工厂函数
func NewOptionalFacade() *OptionalFacade {
	return &OptionalFacade{
		subsystemB: &SubsystemB{},
		subsystemC: &SubsystemC{},
	}
}

/**
 * 仅处理视频相关操作（无音频）
 */
func (f *OptionalFacade) VideoOnlyOperation() string {
	var results []string
	results = append(results, "OptionalFacade: 纯视频模式")
	results = append(results, f.subsystemC.OperationC())
	results = append(results, f.subsystemB.OperationB())
	results = append(results, f.subsystemB.OperationB2())
	return strings.Join(results, "\\n")
}

/**
 * 客户端代码
 * 演示使用外观和不使用外观的区别
 */
func ClientCode() {
	fmt.Println("=== 不使用外观模式（直接与子系统交互）===")
	subsystemA := &SubsystemA{}
	subsystemB := &SubsystemB{}
	subsystemC := &SubsystemC{}
	
	// 客户端需要了解所有子系统的调用顺序和细节
	fmt.Println(subsystemC.OperationC())
	fmt.Println(subsystemC.OperationC2())
	fmt.Println(subsystemB.OperationB())
	fmt.Println(subsystemA.OperationA())
	fmt.Println(subsystemB.OperationB2())
	fmt.Println(subsystemA.OperationA2())
	
	fmt.Println("\\n=== 使用外观模式 ===")
	facade := NewFacade()
	// 客户端只需要调用简单的接口
	fmt.Println(facade.Operation())
	
	fmt.Println("\\n=== 使用外观模式 - 仅音频 ===")
	fmt.Println(facade.Operation2())
	
	fmt.Println("\\n=== 使用额外外观 ===")
	optionalFacade := NewOptionalFacade()
	fmt.Println(optionalFacade.VideoOnlyOperation())
}

func main() {
	ClientCode()
}`,

    python: `/**
 * 子系统 A
 * 负责处理音频播放相关功能
 */
class SubsystemA:
    def operation_a(self) -> str:
        return "SubsystemA: 初始化音频播放器"

    def operation_a2(self) -> str:
        return "SubsystemA: 播放音频"


/**
 * 子系统 B
 * 负责处理视频解码相关功能
 */
class SubsystemB:
    def operation_b(self) -> str:
        return "SubsystemB: 解码视频流"

    def operation_b2(self) -> str:
        return "SubsystemB: 渲染视频帧"


/**
 * 子系统 C
 * 负责处理网络请求相关功能
 */
class SubsystemC:
    def operation_c(self) -> str:
        return "SubsystemC: 连接媒体服务器"

    def operation_c2(self) -> str:
        return "SubsystemC: 下载媒体数据"


/**
 * 外观类
 * 为复杂的视频播放子系统提供简化的统一接口
 */
class Facade:
    def __init__(self):
        self._subsystem_a = SubsystemA()
        self._subsystem_b = SubsystemB()
        self._subsystem_c = SubsystemC()

    /**
     * 简化操作：播放视频
     * 封装了所有子系统的复杂调用顺序
     */
    def operation(self) -> str:
        results = []
        results.append("Facade 开始初始化视频播放...")
        results.append(self._subsystem_c.operation_c())   # 连接服务器
        results.append(self._subsystem_c.operation_c2())  # 下载数据
        results.append(self._subsystem_b.operation_b())   # 解码视频
        results.append(self._subsystem_a.operation_a())   # 初始化音频
        results.append(self._subsystem_b.operation_b2())  # 渲染视频
        results.append(self._subsystem_a.operation_a2())  # 播放音频
        results.append("Facade 视频播放开始！")
        return "\\n".join(results)

    /**
     * 简化操作：仅播放音频
     * 另一种封装方式，只使用部分子系统
     */
    def operation2(self) -> str:
        results = []
        results.append("Facade 开始音频播放...")
        results.append(self._subsystem_c.operation_c())
        results.append(self._subsystem_a.operation_a())
        results.append(self._subsystem_a.operation_a2())
        results.append("Facade 音频播放开始！")
        return "\\n".join(results)


/**
 * 额外外观类（可选）
 * 提供更细粒度的控制或不同的接口风格
 */
class OptionalFacade:
    def __init__(self):
        self._subsystem_b = SubsystemB()
        self._subsystem_c = SubsystemC()

    /**
     * 仅处理视频相关操作（无音频）
     */
    def video_only_operation(self) -> str:
        results = []
        results.append("OptionalFacade: 纯视频模式")
        results.append(self._subsystem_c.operation_c())
        results.append(self._subsystem_b.operation_b())
        results.append(self._subsystem_b.operation_b2())
        return "\\n".join(results)


/**
 * 客户端代码
 * 演示使用外观和不使用外观的区别
 */
def client_code():
    print("=== 不使用外观模式（直接与子系统交互）===")
    subsystem_a = SubsystemA()
    subsystem_b = SubsystemB()
    subsystem_c = SubsystemC()
    
    # 客户端需要了解所有子系统的调用顺序和细节
    print(subsystem_c.operation_c())
    print(subsystem_c.operation_c2())
    print(subsystem_b.operation_b())
    print(subsystem_a.operation_a())
    print(subsystem_b.operation_b2())
    print(subsystem_a.operation_a2())
    
    print("\\n=== 使用外观模式 ===")
    facade = Facade()
    # 客户端只需要调用简单的接口
    print(facade.operation())
    
    print("\\n=== 使用外观模式 - 仅音频 ===")
    print(facade.operation2())
    
    print("\\n=== 使用额外外观 ===")
    optional_facade = OptionalFacade()
    print(optional_facade.video_only_operation())


if __name__ == "__main__":
    client_code()`,

    cpp: `#include <iostream>
#include <string>
#include <vector>
#include <memory>

/**
 * 子系统 A
 * 负责处理音频播放相关功能
 */
class SubsystemA {
public:
    std::string operationA() {
        return "SubsystemA: 初始化音频播放器";
    }

    std::string operationA2() {
        return "SubsystemA: 播放音频";
    }
};

/**
 * 子系统 B
 * 负责处理视频解码相关功能
 */
class SubsystemB {
public:
    std::string operationB() {
        return "SubsystemB: 解码视频流";
    }

    std::string operationB2() {
        return "SubsystemB: 渲染视频帧";
    }
};

/**
 * 子系统 C
 * 负责处理网络请求相关功能
 */
class SubsystemC {
public:
    std::string operationC() {
        return "SubsystemC: 连接媒体服务器";
    }

    std::string operationC2() {
        return "SubsystemC: 下载媒体数据";
    }
};

/**
 * 外观类
 * 为复杂的视频播放子系统提供简化的统一接口
 */
class Facade {
private:
    std::unique_ptr<SubsystemA> subsystemA;
    std::unique_ptr<SubsystemB> subsystemB;
    std::unique_ptr<SubsystemC> subsystemC;

public:
    Facade() {
        subsystemA = std::make_unique<SubsystemA>();
        subsystemB = std::make_unique<SubsystemB>();
        subsystemC = std::make_unique<SubsystemC>();
    }

    /**
     * 简化操作：播放视频
     * 封装了所有子系统的复杂调用顺序
     */
    std::string operation() {
        std::vector<std::string> results;
        results.push_back("Facade 开始初始化视频播放...");
        results.push_back(subsystemC->operationC());   // 连接服务器
        results.push_back(subsystemC->operationC2());  // 下载数据
        results.push_back(subsystemB->operationB());   // 解码视频
        results.push_back(subsystemA->operationA());   // 初始化音频
        results.push_back(subsystemB->operationB2());  // 渲染视频
        results.push_back(subsystemA->operationA2());  // 播放音频
        results.push_back("Facade 视频播放开始！");
        
        std::string result;
        for (size_t i = 0; i < results.size(); ++i) {
            result += results[i];
            if (i < results.size() - 1) result += "\\n";
        }
        return result;
    }

    /**
     * 简化操作：仅播放音频
     * 另一种封装方式，只使用部分子系统
     */
    std::string operation2() {
        std::vector<std::string> results;
        results.push_back("Facade 开始音频播放...");
        results.push_back(subsystemC->operationC());
        results.push_back(subsystemA->operationA());
        results.push_back(subsystemA->operationA2());
        results.push_back("Facade 音频播放开始！");
        
        std::string result;
        for (size_t i = 0; i < results.size(); ++i) {
            result += results[i];
            if (i < results.size() - 1) result += "\\n";
        }
        return result;
    }
};

/**
 * 额外外观类（可选）
 * 提供更细粒度的控制或不同的接口风格
 */
class OptionalFacade {
private:
    std::unique_ptr<SubsystemB> subsystemB;
    std::unique_ptr<SubsystemC> subsystemC;

public:
    OptionalFacade() {
        subsystemB = std::make_unique<SubsystemB>();
        subsystemC = std::make_unique<SubsystemC>();
    }

    /**
     * 仅处理视频相关操作（无音频）
     */
    std::string videoOnlyOperation() {
        std::vector<std::string> results;
        results.push_back("OptionalFacade: 纯视频模式");
        results.push_back(subsystemC->operationC());
        results.push_back(subsystemB->operationB());
        results.push_back(subsystemB->operationB2());
        
        std::string result;
        for (size_t i = 0; i < results.size(); ++i) {
            result += results[i];
            if (i < results.size() - 1) result += "\\n";
        }
        return result;
    }
};

/**
 * 客户端代码
 * 演示使用外观和不使用外观的区别
 */
void clientCode() {
    std::cout << "=== 不使用外观模式（直接与子系统交互）===" << std::endl;
    std::unique_ptr<SubsystemA> subsystemA = std::make_unique<SubsystemA>();
    std::unique_ptr<SubsystemB> subsystemB = std::make_unique<SubsystemB>();
    std::unique_ptr<SubsystemC> subsystemC = std::make_unique<SubsystemC>();
    
    // 客户端需要了解所有子系统的调用顺序和细节
    std::cout << subsystemC->operationC() << std::endl;
    std::cout << subsystemC->operationC2() << std::endl;
    std::cout << subsystemB->operationB() << std::endl;
    std::cout << subsystemA->operationA() << std::endl;
    std::cout << subsystemB->operationB2() << std::endl;
    std::cout << subsystemA->operationA2() << std::endl;
    
    std::cout << "\\n=== 使用外观模式 ===" << std::endl;
    std::unique_ptr<Facade> facade = std::make_unique<Facade>();
    // 客户端只需要调用简单的接口
    std::cout << facade->operation() << std::endl;
    
    std::cout << "\\n=== 使用外观模式 - 仅音频 ===" << std::endl;
    std::cout << facade->operation2() << std::endl;
    
    std::cout << "\\n=== 使用额外外观 ===" << std::endl;
    std::unique_ptr<OptionalFacade> optionalFacade = std::make_unique<OptionalFacade>();
    std::cout << optionalFacade->videoOnlyOperation() << std::endl;
}

int main() {
    clientCode();
    return 0;
}`,
  },
  realWorldExamples: [
    {
      title: 'Spring JDBC - JdbcTemplate',
      description: 'Spring 的 JdbcTemplate 为 JDBC 操作提供了简化的外观，隐藏了 Connection、Statement、ResultSet 等复杂对象的创建和管理。',
      source: 'Spring Framework',
      codeSnippet: `// 使用 JdbcTemplate（外观）简化数据库操作
jdbcTemplate.query("SELECT * FROM users", new UserRowMapper());

// 对比原生 JDBC 的复杂操作
// Connection conn = dataSource.getConnection();
// PreparedStatement stmt = conn.prepareStatement(...);
// ResultSet rs = stmt.executeQuery();
// ... 手动处理结果集和异常关闭`,
    },
    {
      title: 'Java Servlet - HttpServletRequest',
      description: 'HttpServletRequest 和 HttpServletResponse 作为 Servlet 容器的外观，简化了 HTTP 请求和响应的处理。',
      source: 'Java EE / Jakarta EE',
      codeSnippet: `// 外观简化了 HTTP 请求的解析
String param = request.getParameter("username");
Cookie[] cookies = request.getCookies();
HttpSession session = request.getSession();`,
    },
    {
      title: 'SLF4J 日志门面',
      description: 'SLF4J 作为各种日志框架（Logback、Log4j）的外观，提供统一的日志接口，使应用程序可以在不同日志实现间无缝切换。',
      source: 'SLF4J',
      codeSnippet: `// 使用 SLF4J 外观（无需关心底层是 Logback 还是 Log4j）
Logger logger = LoggerFactory.getLogger(MyClass.class);
logger.info("应用启动成功");`,
    },
  ],
  relatedPatterns: ['adapter', 'mediator', 'singleton', 'abstract-factory'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '外观模式的主要目的是什么？',
      options: [
        '创建复杂对象的实例',
        '为子系统提供简化接口',
        '动态地为对象添加功能',
        '定义对象间的依赖关系',
      ],
      correctAnswer: 1,
      explanation: '外观模式的主要目的是为子系统中的一组接口提供一个一致的、简化的界面，使子系统更易于使用。',
    },
    {
      id: 'q2',
      type: 'boolean',
      question: '外观模式会阻止客户端直接访问子系统类',
      options: ['正确', '错误'],
      correctAnswer: 1,
      explanation: '错误。外观模式不会阻止客户端直接访问子系统类，它只是提供了一个简化的接口。如果需要，客户端仍然可以直接使用子系统的功能。',
    },
    {
      id: 'q3',
      type: 'single',
      question: '以下哪个是外观模式的典型应用场景？',
      options: [
        '需要创建一系列相关对象时',
        '需要为复杂库或框架提供简单接口时',
        '需要确保一个类只有一个实例时',
        '需要定义对象间的订阅-发布关系时',
      ],
      correctAnswer: 1,
      explanation: '外观模式最典型的应用场景是为复杂的库、框架或子系统提供一个简单且有限的接口，降低客户端的使用难度。',
    },
  ],
};
