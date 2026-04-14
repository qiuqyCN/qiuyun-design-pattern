import type { DesignPattern } from '@/types/pattern';

export const bridgePattern: DesignPattern = {
  id: 'bridge',
  name: '桥接模式',
  nameEn: 'Bridge Pattern',
  category: 'structural',
  difficulty: 'medium',
  frequency: 'medium',
  intent: '将抽象部分与它的实现部分分离，使它们都可以独立地变化。',
  description: '桥接模式是一种结构型设计模式，它将一个大类或一系列紧密相关的类拆分为抽象和实现两个独立的层次结构。通过这种方式，你可以在抽象和实现两个维度上独立地进行扩展，而不需要修改现有的代码。',
  applicability: [
    '当需要拆分或重组一个具有多重功能的庞杂类时（例如，需要与多个数据库服务器交互的类）',
    '当需要在几个独立维度上扩展一个类时，使用桥接模式可以避免创建大量的子类',
    '当希望在运行时切换不同的实现方式时',
    '当需要隐藏平台相关的实现细节时',
  ],
  pros: [
    '可以创建与平台无关的类和程序',
    '客户端代码仅与高层抽象部分交互，不接触实现细节',
    '开闭原则：可以独立地扩展抽象和实现，无需修改现有代码',
    '单一职责原则：抽象专注于高层控制逻辑，实现处理平台相关细节',
  ],
  cons: [
    '对高内聚的类使用该模式可能会让代码更加复杂',
    '需要正确地识别和分离抽象与实现两个维度',
    '增加了类的数量和代码复杂度',
  ],
  analogy: {
    title: '现实世界中的桥接',
    description: '桥接模式就像是遥控器和电视之间的关系',
    scenarios: [
      {
        id: 'remote',
        title: '遥控器与电视',
        description: '遥控器（抽象）可以与不同品牌的电视（实现）配对，两者可以独立变化。你可以更换遥控器而不影响电视，也可以更换电视而继续使用同一个遥控器。',
        icon: 'Remote',
      },
      {
        id: 'shape',
        title: '形状与颜色',
        description: '绘制图形时，形状（抽象）和颜色（实现）是两个独立维度。使用桥接模式，你可以独立地添加新形状或新颜色，而不需要为每种组合创建子类。',
        icon: 'Palette',
      },
      {
        id: 'device',
        title: '设备与音乐播放器',
        description: '音乐播放器应用（抽象）可以在不同设备（实现：手机、电脑、智能音箱）上运行。应用和设备可以独立升级和扩展。',
        icon: 'Music',
      },
    ],
  },
  structure: {
    classDiagram: `
      class Abstraction {
        -implementation: Implementation
        +operation()
      }
      class RefinedAbstraction {
        +operation()
      }
      class Implementation {
        <<interface>>
        +operationImpl()
      }
      class ConcreteImplementationA {
        +operationImpl()
      }
      class ConcreteImplementationB {
        +operationImpl()
      }
      Abstraction o--> Implementation
      RefinedAbstraction --|> Abstraction
      ConcreteImplementationA ..|> Implementation
      ConcreteImplementationB ..|> Implementation
    `,
    mermaidDiagram: `
classDiagram
  class Abstraction {
    -implementation: Implementation
    +operation()
  }
  
  class RefinedAbstraction {
    +operation()
    +additionalOperation()
  }
  
  class Implementation {
    <<interface>>
    +operationImpl()
  }
  
  class ConcreteImplementationA {
    +operationImpl()
  }
  
  class ConcreteImplementationB {
    +operationImpl()
  }
  
  class Client {
    +main()
  }
  
  Abstraction o--> Implementation : contains
  RefinedAbstraction --|> Abstraction : extends
  ConcreteImplementationA ..|> Implementation : implements
  ConcreteImplementationB ..|> Implementation : implements
  Client ..> Abstraction : uses
  
  style Abstraction fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style RefinedAbstraction fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
  style Implementation fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style ConcreteImplementationA fill:#fce4ec,stroke:#c2185b,stroke-width:1px
  style ConcreteImplementationB fill:#fce4ec,stroke:#c2185b,stroke-width:1px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: '实现接口',
        description: '定义实现部分的接口（Implementation），声明所有具体实现类需要提供的操作',
        duration: 2000,
        elements: [
          { id: 'implementation', type: 'interface', name: 'Implementation', x: 400, y: 300, methods: ['+operationImpl()'] },
        ],
      },
      {
        id: 'step2',
        title: '具体实现',
        description: '创建具体实现类（ConcreteImplementation），实现实现接口的具体逻辑',
        duration: 2000,
        elements: [
          { id: 'implementation', type: 'interface', name: 'Implementation', x: 400, y: 300, methods: ['+operationImpl()'] },
          { id: 'concreteA', type: 'class', name: 'ConcreteImplementationA', x: 250, y: 450, methods: ['+operationImpl()'] },
          { id: 'concreteB', type: 'class', name: 'ConcreteImplementationB', x: 550, y: 450, methods: ['+operationImpl()'] },
        ],
        connections: [
          { from: 'concreteA', to: 'implementation', type: 'realization' },
          { from: 'concreteB', to: 'implementation', type: 'realization' },
        ],
      },
      {
        id: 'step3',
        title: '抽象类',
        description: '创建抽象类（Abstraction），持有一个实现接口的引用，定义高层控制逻辑',
        duration: 2000,
        elements: [
          { id: 'abstraction', type: 'class', name: 'Abstraction', x: 400, y: 100, properties: ['-implementation: Implementation'], methods: ['+operation()'] },
          { id: 'implementation', type: 'interface', name: 'Implementation', x: 400, y: 300, methods: ['+operationImpl()'] },
          { id: 'concreteA', type: 'class', name: 'ConcreteImplementationA', x: 250, y: 450, methods: ['+operationImpl()'] },
          { id: 'concreteB', type: 'class', name: 'ConcreteImplementationB', x: 550, y: 450, methods: ['+operationImpl()'] },
        ],
        connections: [
          { from: 'abstraction', to: 'implementation', type: 'aggregation', label: 'contains' },
          { from: 'concreteA', to: 'implementation', type: 'realization' },
          { from: 'concreteB', to: 'implementation', type: 'realization' },
        ],
      },
      {
        id: 'step4',
        title: '扩展抽象',
        description: '创建扩展抽象类（RefinedAbstraction），在保持实现接口不变的情况下扩展抽象功能',
        duration: 2000,
        elements: [
          { id: 'abstraction', type: 'class', name: 'Abstraction', x: 400, y: 100, properties: ['-implementation: Implementation'], methods: ['+operation()'] },
          { id: 'refined', type: 'class', name: 'RefinedAbstraction', x: 700, y: 100, methods: ['+operation()', '+additionalOperation()'] },
          { id: 'implementation', type: 'interface', name: 'Implementation', x: 400, y: 300, methods: ['+operationImpl()'] },
          { id: 'concreteA', type: 'class', name: 'ConcreteImplementationA', x: 250, y: 450, methods: ['+operationImpl()'] },
          { id: 'concreteB', type: 'class', name: 'ConcreteImplementationB', x: 550, y: 450, methods: ['+operationImpl()'] },
        ],
        connections: [
          { from: 'refined', to: 'abstraction', type: 'inheritance' },
          { from: 'abstraction', to: 'implementation', type: 'aggregation', label: 'contains' },
          { from: 'concreteA', to: 'implementation', type: 'realization' },
          { from: 'concreteB', to: 'implementation', type: 'realization' },
        ],
      },
      {
        id: 'step5',
        title: '客户端使用',
        description: '客户端通过抽象类与系统交互，可以在运行时切换不同的实现',
        duration: 3000,
        elements: [
          { id: 'client', type: 'class', name: 'Client', x: 100, y: 100, methods: ['+main()'] },
          { id: 'abstraction', type: 'class', name: 'Abstraction', x: 400, y: 100, properties: ['-implementation: Implementation'], methods: ['+operation()'] },
          { id: 'refined', type: 'class', name: 'RefinedAbstraction', x: 700, y: 100, methods: ['+operation()', '+additionalOperation()'] },
          { id: 'implementation', type: 'interface', name: 'Implementation', x: 400, y: 300, methods: ['+operationImpl()'] },
          { id: 'concreteA', type: 'class', name: 'ConcreteImplementationA', x: 250, y: 450, methods: ['+operationImpl()'] },
          { id: 'concreteB', type: 'class', name: 'ConcreteImplementationB', x: 550, y: 450, methods: ['+operationImpl()'] },
        ],
        connections: [
          { from: 'client', to: 'abstraction', type: 'dependency', label: 'uses' },
          { from: 'refined', to: 'abstraction', type: 'inheritance' },
          { from: 'abstraction', to: 'implementation', type: 'aggregation', label: 'contains' },
          { from: 'concreteA', to: 'implementation', type: 'realization' },
          { from: 'concreteB', to: 'implementation', type: 'realization' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * 桥接模式 - TypeScript 实现
 * 示例：形状与颜色的桥接
 * 形状是抽象维度，颜色是实现维度
 */

// ============================================
// 实现部分（Implementation）- 颜色维度
// ============================================

/**
 * 实现接口 - 定义颜色相关的操作
 * 这是"实现"维度的接口，所有具体颜色都需要实现它
 */
interface Color {
  /**
   * 应用颜色的方法
   * @returns 返回颜色的描述
   */
  applyColor(): string;

  /**
   * 获取颜色名称
   */
  getColorName(): string;
}

/**
 * 具体实现 - 红色
 */
class RedColor implements Color {
  applyColor(): string {
    return "应用红色";
  }

  getColorName(): string {
    return "红色";
  }
}

/**
 * 具体实现 - 蓝色
 */
class BlueColor implements Color {
  applyColor(): string {
    return "应用蓝色";
  }

  getColorName(): string {
    return "蓝色";
  }
}

/**
 * 具体实现 - 绿色
 */
class GreenColor implements Color {
  applyColor(): string {
    return "应用绿色";
  }

  getColorName(): string {
    return "绿色";
  }
}

// ============================================
// 抽象部分（Abstraction）- 形状维度
// ============================================

/**
 * 抽象类 - 形状
 * 这是"抽象"维度的基类，包含对实现部分的引用
 */
abstract class Shape {
  /**
   * 对实现部分的引用
   * 通过组合关系持有实现对象，而不是继承
   */
  protected color: Color;

  /**
   * 构造函数 - 通过依赖注入传入实现对象
   * @param color 颜色实现对象
   */
  constructor(color: Color) {
    this.color = color;
  }

  /**
   * 抽象方法 - 绘制形状
   * 具体的绘制逻辑由子类实现
   */
  abstract draw(): string;

  /**
   * 通用方法 - 获取形状描述
   */
  abstract getDescription(): string;

  /**
   * 桥接方法 - 调用实现部分的方法
   * 展示抽象如何委托给实现
   */
  applyColor(): string {
    return this.color.applyColor();
  }
}

/**
 * 扩展抽象 - 圆形
 * 在保持实现接口不变的情况下扩展抽象功能
 */
class Circle extends Shape {
  private radius: number;

  constructor(color: Color, radius: number) {
    super(color);
    this.radius = radius;
  }

  draw(): string {
    return \`绘制圆形（半径：\${this.radius}） - \${this.color.applyColor()}\`;
  }

  getDescription(): string {
    return \`\${this.color.getColorName()}的圆形，半径为\${this.radius}\`;
  }

  /**
   * 圆形特有的方法
   */
  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

/**
 * 扩展抽象 - 矩形
 */
class Rectangle extends Shape {
  private width: number;
  private height: number;

  constructor(color: Color, width: number, height: number) {
    super(color);
    this.width = width;
    this.height = height;
  }

  draw(): string {
    return \`绘制矩形（宽：\${this.width}，高：\${this.height}） - \${this.color.applyColor()}\`;
  }

  getDescription(): string {
    return \`\${this.color.getColorName()}的矩形，尺寸为\${this.width}x\${this.height}\`;
  }

  /**
   * 矩形特有的方法
   */
  calculateArea(): number {
    return this.width * this.height;
  }
}

/**
 * 扩展抽象 - 三角形
 */
class Triangle extends Shape {
  private base: number;
  private height: number;

  constructor(color: Color, base: number, height: number) {
    super(color);
    this.base = base;
    this.height = height;
  }

  draw(): string {
    return \`绘制三角形（底：\${this.base}，高：\${this.height}） - \${this.color.applyColor()}\`;
  }

  getDescription(): string {
    return \`\${this.color.getColorName()}的三角形，底为\${this.base}，高为\${this.height}\`;
  }

  calculateArea(): number {
    return (this.base * this.height) / 2;
  }
}

// ============================================
// 客户端代码
// ============================================

/**
 * 客户端代码 - 使用桥接模式
 * 客户端只与抽象部分交互，不需要知道实现细节
 */
function clientCode(): void {
  console.log("=== 桥接模式演示 ===\\n");

  // 创建不同的颜色实现
  const red = new RedColor();
  const blue = new BlueColor();
  const green = new GreenColor();

  // 创建不同颜色和形状的组合
  // 注意：我们可以在运行时自由组合抽象和实现

  console.log("--- 红色形状 ---");
  const redCircle = new Circle(red, 5);
  console.log(redCircle.draw());
  console.log(redCircle.getDescription());
  console.log(\`面积：\${redCircle.calculateArea().toFixed(2)}\\n\`);

  const redRectangle = new Rectangle(red, 4, 6);
  console.log(redRectangle.draw());
  console.log(redRectangle.getDescription());
  console.log(\`面积：\${redRectangle.calculateArea()}\\n\`);

  console.log("--- 蓝色形状 ---");
  const blueCircle = new Circle(blue, 3);
  console.log(blueCircle.draw());
  console.log(blueCircle.getDescription());
  console.log(\`面积：\${blueCircle.calculateArea().toFixed(2)}\\n\`);

  const blueTriangle = new Triangle(blue, 4, 5);
  console.log(blueTriangle.draw());
  console.log(blueTriangle.getDescription());
  console.log(\`面积：\${blueTriangle.calculateArea()}\\n\`);

  console.log("--- 绿色形状 ---");
  const greenRectangle = new Rectangle(green, 5, 5);
  console.log(greenRectangle.draw());
  console.log(greenRectangle.getDescription());
  console.log(\`面积：\${greenRectangle.calculateArea()}\\n\`);

  // 演示运行时切换实现
  console.log("--- 动态切换颜色 ---");
  const shapes: Shape[] = [
    new Circle(red, 2),
    new Rectangle(blue, 3, 4),
    new Triangle(green, 6, 8)
  ];

  shapes.forEach((shape, index) => {
    console.log(\`形状 \${index + 1}：\${shape.getDescription()}\`);
  });
}

// 运行客户端代码
clientCode();`,

    java: `/**
 * 桥接模式 - Java 实现
 * 示例：设备与遥控器的桥接
 * 设备是实现维度，遥控器是抽象维度
 */

// ============================================
// 实现部分（Implementation）- 设备维度
// ============================================

/**
 * 实现接口 - 设备接口
 * 定义所有设备都需要支持的基本操作
 */
interface Device {
    /**
     * 判断设备是否开启
     */
    boolean isEnabled();

    /**
     * 开启设备
     */
    void enable();

    /**
     * 关闭设备
     */
    void disable();

    /**
     * 获取当前音量
     */
    int getVolume();

    /**
     * 设置音量
     * @param percent 音量百分比 0-100
     */
    void setVolume(int percent);

    /**
     * 获取当前频道
     */
    int getChannel();

    /**
     * 设置频道
     */
    void setChannel(int channel);

    /**
     * 获取设备名称
     */
    String getDeviceName();
}

/**
 * 具体实现 - 电视机
 */
class TV implements Device {
    private boolean on = false;
    private int volume = 30;
    private int channel = 1;

    @Override
    public boolean isEnabled() {
        return on;
    }

    @Override
    public void enable() {
        on = true;
        System.out.println("电视机已开启");
    }

    @Override
    public void disable() {
        on = false;
        System.out.println("电视机已关闭");
    }

    @Override
    public int getVolume() {
        return volume;
    }

    @Override
    public void setVolume(int percent) {
        if (percent >= 0 && percent <= 100) {
            volume = percent;
            System.out.println("电视机音量设置为: " + volume);
        }
    }

    @Override
    public int getChannel() {
        return channel;
    }

    @Override
    public void setChannel(int channel) {
        this.channel = channel;
        System.out.println("电视机切换到频道: " + channel);
    }

    @Override
    public String getDeviceName() {
        return "电视机";
    }
}

/**
 * 具体实现 - 收音机
 */
class Radio implements Device {
    private boolean on = false;
    private int volume = 20;
    private int channel = 88; // FM频率

    @Override
    public boolean isEnabled() {
        return on;
    }

    @Override
    public void enable() {
        on = true;
        System.out.println("收音机已开启");
    }

    @Override
    public void disable() {
        on = false;
        System.out.println("收音机已关闭");
    }

    @Override
    public int getVolume() {
        return volume;
    }

    @Override
    public void setVolume(int percent) {
        if (percent >= 0 && percent <= 100) {
            volume = percent;
            System.out.println("收音机音量设置为: " + volume);
        }
    }

    @Override
    public int getChannel() {
        return channel;
    }

    @Override
    public void setChannel(int channel) {
        this.channel = channel;
        System.out.println("收音机调频到: " + channel + " FM");
    }

    @Override
    public String getDeviceName() {
        return "收音机";
    }
}

// ============================================
// 抽象部分（Abstraction）- 遥控器维度
// ============================================

/**
 * 抽象类 - 遥控器
 * 定义遥控器的基本功能，委托给设备实现
 */
abstract class RemoteControl {
    /**
     * 对实现部分的引用
     */
    protected Device device;

    /**
     * 构造函数
     * @param device 被控制的设备
     */
    public RemoteControl(Device device) {
        this.device = device;
    }

    /**
     * 切换电源状态
     */
    public void togglePower() {
        if (device.isEnabled()) {
            device.disable();
        } else {
            device.enable();
        }
    }

    /**
     * 增加音量
     */
    public void volumeUp() {
        int currentVolume = device.getVolume();
        if (currentVolume < 100) {
            device.setVolume(currentVolume + 10);
        }
    }

    /**
     * 减小音量
     */
    public void volumeDown() {
        int currentVolume = device.getVolume();
        if (currentVolume > 0) {
            device.setVolume(currentVolume - 10);
        }
    }

    /**
     * 切换到下一个频道
     */
    public void channelUp() {
        device.setChannel(device.getChannel() + 1);
    }

    /**
     * 切换到上一个频道
     */
    public void channelDown() {
        int current = device.getChannel();
        if (current > 1) {
            device.setChannel(current - 1);
        }
    }

    /**
     * 获取当前控制的设备名称
     */
    public String getDeviceName() {
        return device.getDeviceName();
    }

    /**
     * 获取设备状态
     */
    public String getDeviceStatus() {
        return String.format("%s - 电源: %s, 音量: %d, 频道: %d",
            device.getDeviceName(),
            device.isEnabled() ? "开" : "关",
            device.getVolume(),
            device.getChannel());
    }
}

/**
 * 扩展抽象 - 高级遥控器
 * 在基础遥控器功能上添加高级功能
 */
class AdvancedRemoteControl extends RemoteControl {
    private int previousChannel;

    public AdvancedRemoteControl(Device device) {
        super(device);
        this.previousChannel = device.getChannel();
    }

    /**
     * 静音功能
     */
    public void mute() {
        System.out.println("设备已静音");
        device.setVolume(0);
    }

    /**
     * 跳转到指定频道
     */
    public void jumpToChannel(int channel) {
        previousChannel = device.getChannel();
        device.setChannel(channel);
    }

    /**
     * 返回上一个频道
     */
    public void previousChannel() {
        int temp = device.getChannel();
        device.setChannel(previousChannel);
        previousChannel = temp;
    }

    /**
     * 语音控制功能
     */
    public void voiceControl(String command) {
        System.out.println("语音识别: '" + command + "'");
        if (command.contains("开机")) {
            if (!device.isEnabled()) device.enable();
        } else if (command.contains("关机")) {
            if (device.isEnabled()) device.disable();
        } else if (command.contains("静音")) {
            mute();
        }
    }
}

// ============================================
// 客户端代码
// ============================================

/**
 * 客户端类 - 演示桥接模式的使用
 */
public class Client {
    public static void main(String[] args) {
        System.out.println("=== 桥接模式演示 - 设备与遥控器 ===\\n");

        // 创建设备（实现部分）
        Device tv = new TV();
        Device radio = new Radio();

        // 创建基础遥控器控制电视机
        System.out.println("--- 基础遥控器控制电视机 ---");
        RemoteControl basicRemote = new RemoteControl(tv) {};
        basicRemote.togglePower();
        basicRemote.volumeUp();
        basicRemote.volumeUp();
        basicRemote.channelUp();
        basicRemote.channelUp();
        System.out.println(basicRemote.getDeviceStatus());
        System.out.println();

        // 创建高级遥控器控制收音机
        System.out.println("--- 高级遥控器控制收音机 ---");
        AdvancedRemoteControl advancedRemote = new AdvancedRemoteControl(radio);
        advancedRemote.togglePower();
        advancedRemote.volumeUp();
        advancedRemote.jumpToChannel(100);
        advancedRemote.previousChannel();
        advancedRemote.voiceControl("静音");
        System.out.println(advancedRemote.getDeviceStatus());
        System.out.println();

        // 演示同一个遥控器可以控制不同设备
        System.out.println("--- 高级遥控器切换控制电视机 ---");
        AdvancedRemoteControl tvRemote = new AdvancedRemoteControl(tv);
        tvRemote.togglePower();
        tvRemote.jumpToChannel(5);
        tvRemote.mute();
        System.out.println(tvRemote.getDeviceStatus());

        // 演示设备可以独立变化
        System.out.println("\\n--- 设备独立变化演示 ---");
        System.out.println("可以独立添加新设备（如DVD播放器）或新遥控器类型");
        System.out.println("而不需要修改现有代码，符合开闭原则");
    }
}`,

    go: `/**
 * 桥接模式 - Go 实现
 * 示例：消息发送系统
 * 消息类型是抽象维度，发送方式是实现维度
 */

package main

import (
	"fmt"
	"time"
)

// ============================================
// 实现部分（Implementation）- 发送方式维度
// ============================================

/**
 * 实现接口 - 消息发送器
 * 定义所有发送方式都需要实现的方法
 */
type MessageSender interface {
	/**
	 * 发送消息的方法
	 * @param message 消息内容
	 * @param to 接收者
	 * @return 发送结果
	 */
	SendMessage(message string, to string) error

	/**
	 * 获取发送方式名称
	 */
	GetSenderType() string

	/**
	 * 检查发送方式是否可用
	 */
	IsAvailable() bool
}

/**
 * 具体实现 - 邮件发送器
 */
type EmailSender struct {
	smtpServer string
	port       int
}

/**
 * 创建邮件发送器
 */
func NewEmailSender(smtpServer string, port int) *EmailSender {
	return &EmailSender{
		smtpServer: smtpServer,
		port:       port,
	}
}

func (e *EmailSender) SendMessage(message string, to string) error {
	fmt.Printf("[邮件发送] 发送到: %s, 内容: %s\\n", to, message)
	fmt.Printf("使用SMTP服务器: %s:%d\\n", e.smtpServer, e.port)
	// 模拟发送延迟
	time.Sleep(100 * time.Millisecond)
	fmt.Println("邮件发送成功！")
	return nil
}

func (e *EmailSender) GetSenderType() string {
	return "邮件"
}

func (e *EmailSender) IsAvailable() bool {
	return true
}

/**
 * 具体实现 - 短信发送器
 */
type SMSSender struct {
	apiKey     string
	provider   string
}

/**
 * 创建短信发送器
 */
func NewSMSSender(apiKey, provider string) *SMSSender {
	return &SMSSender{
		apiKey:   apiKey,
		provider: provider,
	}
}

func (s *SMSSender) SendMessage(message string, to string) error {
	fmt.Printf("[短信发送] 发送到: %s, 内容: %s\\n", to, message)
	fmt.Printf("使用短信服务商: %s\\n", s.provider)
	// 短信有长度限制
	if len(message) > 160 {
		fmt.Println("警告: 消息过长，可能需要分条发送")
	}
	fmt.Println("短信发送成功！")
	return nil
}

func (s *SMSSender) GetSenderType() string {
	return "短信"
}

func (s *SMSSender) IsAvailable() bool {
	return s.apiKey != ""
}

/**
 * 具体实现 - 推送通知发送器
 */
type PushNotificationSender struct {
	appID    string
	platform string
}

/**
 * 创建推送通知发送器
 */
func NewPushNotificationSender(appID, platform string) *PushNotificationSender {
	return &PushNotificationSender{
		appID:    appID,
		platform: platform,
	}
}

func (p *PushNotificationSender) SendMessage(message string, to string) error {
	fmt.Printf("[推送通知] 发送到设备: %s, 内容: %s\\n", to, message)
	fmt.Printf("使用平台: %s, AppID: %s\\n", p.platform, p.appID)
	fmt.Println("推送通知发送成功！")
	return nil
}

func (p *PushNotificationSender) GetSenderType() string {
	return "推送通知"
}

func (p *PushNotificationSender) IsAvailable() bool {
	return p.appID != "" && p.platform != ""
}

// ============================================
// 抽象部分（Abstraction）- 消息类型维度
// ============================================

/**
 * 抽象类 - 消息
 * 使用结构体嵌入实现类似抽象类的功能
 */
type Message struct {
	/**
	 * 对实现部分的引用
	 */
	sender MessageSender
	/**
	 * 消息元数据
	 */
	priority    int
	timestamp   time.Time
}

/**
 * 设置消息发送器
 */
func (m *Message) SetSender(sender MessageSender) {
	m.sender = sender
}

/**
 * 获取发送方式类型
 */
func (m *Message) GetSenderType() string {
	if m.sender != nil {
		return m.sender.GetSenderType()
	}
	return "未设置"
}

/**
 * 抽象方法 - 发送消息（由具体消息类型实现）
 */
type MessageInterface interface {
	Send(to string) error
	GetContent() string
	GetMessageType() string
}

/**
 * 扩展抽象 - 普通文本消息
 */
type TextMessage struct {
	Message
	content string
}

/**
 * 创建文本消息
 */
func NewTextMessage(sender MessageSender, content string) *TextMessage {
	return &TextMessage{
		Message: Message{
			sender:    sender,
			priority:  1,
			timestamp: time.Now(),
		},
		content: content,
	}
}

func (t *TextMessage) Send(to string) error {
	if t.sender == nil {
		return fmt.Errorf("未设置消息发送器")
	}
	fmt.Printf("\\n[发送文本消息]\\n")
	fmt.Printf("消息类型: %s\\n", t.GetMessageType())
	fmt.Printf("优先级: %d\\n", t.priority)
	fmt.Printf("创建时间: %s\\n", t.timestamp.Format("2006-01-02 15:04:05"))
	return t.sender.SendMessage(t.content, to)
}

func (t *TextMessage) GetContent() string {
	return t.content
}

func (t *TextMessage) GetMessageType() string {
	return "文本消息"
}

/**
 * 扩展抽象 - 紧急消息
 */
type UrgentMessage struct {
	Message
	content     string
	expireTime  time.Time
}

/**
 * 创建紧急消息
 */
func NewUrgentMessage(sender MessageSender, content string, expireMinutes int) *UrgentMessage {
	return &UrgentMessage{
		Message: Message{
			sender:    sender,
			priority:  10, // 高优先级
			timestamp: time.Now(),
		},
		content:    content,
		expireTime: time.Now().Add(time.Duration(expireMinutes) * time.Minute),
	}
}

func (u *UrgentMessage) Send(to string) error {
	if u.sender == nil {
		return fmt.Errorf("未设置消息发送器")
	}
	fmt.Printf("\\n[发送紧急消息] ⚠️\\n")
	fmt.Printf("消息类型: %s\\n", u.GetMessageType())
	fmt.Printf("优先级: %d (高)\\n", u.priority)
	fmt.Printf("过期时间: %s\\n", u.expireTime.Format("2006-01-02 15:04:05"))
	fmt.Printf("⚠️ 紧急标记: 请立即处理！\\n")
	return u.sender.SendMessage("[紧急] "+u.content, to)
}

func (u *UrgentMessage) GetContent() string {
	return u.content
}

func (u *UrgentMessage) GetMessageType() string {
	return "紧急消息"
}

/**
 * 扩展抽象 - 富媒体消息
 */
type RichMediaMessage struct {
	Message
	title       string
	content     string
	imageURL    string
	actionURL   string
}

/**
 * 创建富媒体消息
 */
func NewRichMediaMessage(sender MessageSender, title, content, imageURL, actionURL string) *RichMediaMessage {
	return &RichMediaMessage{
		Message: Message{
			sender:    sender,
			priority:  3,
			timestamp: time.Now(),
		},
		title:     title,
		content:   content,
		imageURL:  imageURL,
		actionURL: actionURL,
	}
}

func (r *RichMediaMessage) Send(to string) error {
	if r.sender == nil {
		return fmt.Errorf("未设置消息发送器")
	}
	fmt.Printf("\\n[发送富媒体消息]\\n")
	fmt.Printf("消息类型: %s\\n", r.GetMessageType())
	fmt.Printf("标题: %s\\n", r.title)
	fmt.Printf("图片: %s\\n", r.imageURL)
	fmt.Printf("跳转链接: %s\\n", r.actionURL)
	
	// 构建富媒体内容
	richContent := fmt.Sprintf("%s\\n%s\\n[图片: %s]\\n[点击: %s]", 
		r.title, r.content, r.imageURL, r.actionURL)
	return r.sender.SendMessage(richContent, to)
}

func (r *RichMediaMessage) GetContent() string {
	return r.content
}

func (r *RichMediaMessage) GetMessageType() string {
	return "富媒体消息"
}

// ============================================
// 客户端代码
// ============================================

/**
 * 客户端函数 - 演示桥接模式的使用
 */
func ClientCode() {
	fmt.Println("=== 桥接模式演示 - 消息发送系统 ===\\n")

	// 创建不同的发送方式（实现部分）
	emailSender := NewEmailSender("smtp.example.com", 587)
	smsSender := NewSMSSender("api-key-12345", "Twilio")
	pushSender := NewPushNotificationSender("app-67890", "Firebase")

	// 创建不同类型的消息并设置发送方式
	fmt.Println("--- 使用邮件发送文本消息 ---")
	textMsg := NewTextMessage(emailSender, "这是一封测试邮件")
	textMsg.Send("user@example.com")

	fmt.Println("\\n--- 使用短信发送紧急消息 ---")
	urgentMsg := NewUrgentMessage(smsSender, "系统告警：服务器CPU使用率超过90%", 30)
	urgentMsg.Send("+8613800138000")

	fmt.Println("\\n--- 使用推送通知发送富媒体消息 ---")
	richMsg := NewRichMediaMessage(
		pushSender,
		"新品上架",
		"您关注的商品已经上架，点击查看详情",
		"https://example.com/image.jpg",
		"https://example.com/product/123",
	)
	richMsg.Send("device-token-abc123")

	// 演示运行时切换发送方式
	fmt.Println("\\n--- 运行时切换发送方式 ---")
	fmt.Println("同一紧急消息通过不同渠道发送：")
	
	urgentContent := "数据库连接异常，请立即处理"
	
	// 通过邮件发送
	urgentEmail := NewUrgentMessage(emailSender, urgentContent, 15)
	urgentEmail.Send("admin@company.com")
	
	// 通过短信发送
	urgentSMS := NewUrgentMessage(smsSender, urgentContent, 15)
	urgentSMS.Send("+8613800138000")
	
	// 通过推送发送
	urgentPush := NewUrgentMessage(pushSender, urgentContent, 15)
	urgentPush.Send("admin-device-token")

	fmt.Println("\\n--- 桥接模式优势 ---")
	fmt.Println("1. 可以独立添加新的消息类型（如：定时消息、模板消息）")
	fmt.Println("2. 可以独立添加新的发送方式（如：微信、钉钉）")
	fmt.Println("3. 消息类型和发送方式可以任意组合，无需创建大量子类")
}

/**
 * 程序入口
 */
func main() {
	ClientCode()
}`,

    python: `"""
桥接模式 - Python 实现
示例：图形绘制系统
图形类型是抽象维度，渲染引擎是实现维度
"""

from abc import ABC, abstractmethod
from typing import List

# ============================================
# 实现部分（Implementation）- 渲染引擎维度
# ============================================

class RenderEngine(ABC):
    """
    实现接口 - 渲染引擎
    定义所有渲染引擎都需要实现的方法
    """
    
    @abstractmethod
    def render_circle(self, x: float, y: float, radius: float) -> str:
        """
        渲染圆形
        @param x: 圆心x坐标
        @param y: 圆心y坐标
        @param radius: 半径
        @return: 渲染结果描述
        """
        pass
    
    @abstractmethod
    def render_rectangle(self, x: float, y: float, width: float, height: float) -> str:
        """
        渲染矩形
        @param x: 左上角x坐标
        @param y: 左上角y坐标
        @param width: 宽度
        @param height: 高度
        @return: 渲染结果描述
        """
        pass
    
    @abstractmethod
    def render_line(self, x1: float, y1: float, x2: float, y2: float) -> str:
        """
        渲染线条
        @param x1: 起点x坐标
        @param y1: 起点y坐标
        @param x2: 终点x坐标
        @param y2: 终点y坐标
        @return: 渲染结果描述
        """
        pass
    
    @abstractmethod
    def get_engine_name(self) -> str:
        """获取引擎名称"""
        pass


class VectorRenderEngine(RenderEngine):
    """
    具体实现 - 矢量渲染引擎
    使用数学公式描述图形，可无损缩放
    """
    
    def render_circle(self, x: float, y: float, radius: float) -> str:
        return f"矢量渲染: 圆形(圆心=({x}, {y}), 半径={radius}) - SVG路径数据"
    
    def render_rectangle(self, x: float, y: float, width: float, height: float) -> str:
        return f"矢量渲染: 矩形(位置=({x}, {y}), 尺寸={width}x{height}) - SVG路径数据"
    
    def render_line(self, x1: float, y1: float, x2: float, y2: float) -> str:
        return f"矢量渲染: 线条(起点=({x1}, {y1}), 终点=({x2}, {y2})) - SVG路径数据"
    
    def get_engine_name(self) -> str:
        return "矢量渲染引擎"


class RasterRenderEngine(RenderEngine):
    """
    具体实现 - 光栅渲染引擎
    使用像素描述图形，适合照片级真实感渲染
    """
    
    def render_circle(self, x: float, y: float, radius: float) -> str:
        # 计算需要的像素数
        pixels = int(3.14159 * radius * radius)
        return f"光栅渲染: 圆形(圆心=({x}, {y}), 半径={radius}) - {pixels}个像素"
    
    def render_rectangle(self, x: float, y: float, width: float, height: float) -> str:
        pixels = int(width * height)
        return f"光栅渲染: 矩形(位置=({x}, {y}), 尺寸={width}x{height}) - {pixels}个像素"
    
    def render_line(self, x1: float, y1: float, x2: float, y2: float) -> str:
        # 使用Bresenham算法计算像素
        length = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5
        return f"光栅渲染: 线条(起点=({x1}, {y1}), 终点=({x2}, {y2})) - {int(length)}个像素"
    
    def get_engine_name(self) -> str:
        return "光栅渲染引擎"


class OpenGLRenderEngine(RenderEngine):
    """
    具体实现 - OpenGL硬件加速渲染引擎
    利用GPU进行硬件加速渲染
    """
    
    def render_circle(self, x: float, y: float, radius: float) -> str:
        segments = max(16, int(radius * 2))  # 根据半径计算分段数
        return f"OpenGL渲染: 圆形(圆心=({x}, {y}), 半径={radius}) - GPU绘制, {segments}个三角形"
    
    def render_rectangle(self, x: float, y: float, width: float, height: float) -> str:
        return f"OpenGL渲染: 矩形(位置=({x}, {y}), 尺寸={width}x{height}) - GPU绘制, 2个三角形"
    
    def render_line(self, x1: float, y1: float, x2: float, y2: float) -> str:
        return f"OpenGL渲染: 线条(起点=({x1}, {y1}), 终点=({x2}, {y2})) - GPU绘制, 线宽抗锯齿"
    
    def get_engine_name(self) -> str:
        return "OpenGL硬件加速渲染引擎"


# ============================================
# 抽象部分（Abstraction）- 图形类型维度
# ============================================

class Shape(ABC):
    """
    抽象类 - 图形
    定义图形的基本接口，包含对渲染引擎的引用
    """
    
    def __init__(self, render_engine: RenderEngine):
        """
        构造函数 - 通过依赖注入传入渲染引擎
        @param render_engine: 渲染引擎实现对象
        """
        self._render_engine = render_engine
    
    @abstractmethod
    def draw(self) -> str:
        """
        绘制图形 - 由子类实现具体的绘制逻辑
        @return: 绘制结果描述
        """
        pass
    
    @abstractmethod
    def get_description(self) -> str:
        """获取图形描述"""
        pass
    
    def get_engine_info(self) -> str:
        """获取当前使用的渲染引擎信息"""
        return f"使用渲染引擎: {self._render_engine.get_engine_name()}"


class Circle(Shape):
    """
    扩展抽象 - 圆形
    """
    
    def __init__(self, render_engine: RenderEngine, x: float, y: float, radius: float):
        """
        创建圆形
        @param render_engine: 渲染引擎
        @param x: 圆心x坐标
        @param y: 圆心y坐标
        @param radius: 半径
        """
        super().__init__(render_engine)
        self._x = x
        self._y = y
        self._radius = radius
    
    def draw(self) -> str:
        """绘制圆形 - 委托给渲染引擎"""
        return self._render_engine.render_circle(self._x, self._y, self._radius)
    
    def get_description(self) -> str:
        return f"圆形(圆心=({self._x}, {self._y}), 半径={self._radius})"
    
    def get_area(self) -> float:
        """计算圆形面积 - 圆形特有的方法"""
        import math
        return math.pi * self._radius * self._radius


class Rectangle(Shape):
    """
    扩展抽象 - 矩形
    """
    
    def __init__(self, render_engine: RenderEngine, x: float, y: float, 
                 width: float, height: float):
        """
        创建矩形
        @param render_engine: 渲染引擎
        @param x: 左上角x坐标
        @param y: 左上角y坐标
        @param width: 宽度
        @param height: 高度
        """
        super().__init__(render_engine)
        self._x = x
        self._y = y
        self._width = width
        self._height = height
    
    def draw(self) -> str:
        """绘制矩形 - 委托给渲染引擎"""
        return self._render_engine.render_rectangle(self._x, self._y, 
                                                     self._width, self._height)
    
    def get_description(self) -> str:
        return f"矩形(位置=({self._x}, {self._y}), 尺寸={self._width}x{self._height})"
    
    def get_area(self) -> float:
        """计算矩形面积 - 矩形特有的方法"""
        return self._width * self._height
    
    def is_square(self) -> bool:
        """判断是否为正方形 - 矩形特有的方法"""
        return abs(self._width - self._height) < 0.0001


class Line(Shape):
    """
    扩展抽象 - 线条
    """
    
    def __init__(self, render_engine: RenderEngine, x1: float, y1: float, 
                 x2: float, y2: float):
        """
        创建线条
        @param render_engine: 渲染引擎
        @param x1: 起点x坐标
        @param y1: 起点y坐标
        @param x2: 终点x坐标
        @param y2: 终点y坐标
        """
        super().__init__(render_engine)
        self._x1 = x1
        self._y1 = y1
        self._x2 = x2
        self._y2 = y2
    
    def draw(self) -> str:
        """绘制线条 - 委托给渲染引擎"""
        return self._render_engine.render_line(self._x1, self._y1, 
                                                self._x2, self._y2)
    
    def get_description(self) -> str:
        return f"线条(起点=({self._x1}, {self._y1}), 终点=({self._x2}, {self._y2}))"
    
    def get_length(self) -> float:
        """计算线条长度 - 线条特有的方法"""
        return ((self._x2 - self._x1) ** 2 + (self._y2 - self._y1) ** 2) ** 0.5


class CompositeShape(Shape):
    """
    扩展抽象 - 组合图形
    可以包含多个子图形，展示桥接模式与组合模式的结合
    """
    
    def __init__(self, render_engine: RenderEngine, name: str):
        super().__init__(render_engine)
        self._name = name
        self._shapes: List[Shape] = []
    
    def add_shape(self, shape: Shape) -> None:
        """添加子图形"""
        self._shapes.append(shape)
    
    def draw(self) -> str:
        """绘制组合图形 - 绘制所有子图形"""
        results = [f"组合图形 '{self._name}' 开始绘制:"]
        for i, shape in enumerate(self._shapes, 1):
            results.append(f"  [{i}] {shape.draw()}")
        results.append(f"组合图形 '{self._name}' 绘制完成")
        return "\\n".join(results)
    
    def get_description(self) -> str:
        return f"组合图形 '{self._name}' (包含{len(self._shapes)}个子图形)"


# ============================================
# 客户端代码
# ============================================

def client_code():
    """
    客户端函数 - 演示桥接模式的使用
    """
    print("=== 桥接模式演示 - 图形绘制系统 ===\\n")
    
    # 创建不同的渲染引擎（实现部分）
    vector_engine = VectorRenderEngine()
    raster_engine = RasterRenderEngine()
    opengl_engine = OpenGLRenderEngine()
    
    # 使用矢量引擎绘制图形
    print("--- 使用矢量渲染引擎 ---")
    circle1 = Circle(vector_engine, 100, 100, 50)
    print(f"图形: {circle1.get_description()}")
    print(f"{circle1.get_engine_info()}")
    print(circle1.draw())
    print(f"面积: {circle1.get_area():.2f}\\n")
    
    rectangle1 = Rectangle(vector_engine, 200, 150, 100, 80)
    print(f"图形: {rectangle1.get_description()}")
    print(rectangle1.draw())
    print(f"面积: {rectangle1.get_area()}")
    print(f"是否为正方形: {rectangle1.is_square()}\\n")
    
    # 使用光栅引擎绘制相同图形
    print("--- 使用光栅渲染引擎 ---")
    circle2 = Circle(raster_engine, 100, 100, 50)
    print(f"图形: {circle2.get_description()}")
    print(f"{circle2.get_engine_info()}")
    print(circle2.draw())
    print(f"面积: {circle2.get_area():.2f}\\n")
    
    # 使用OpenGL引擎绘制
    print("--- 使用OpenGL硬件加速渲染引擎 ---")
    line1 = Line(opengl_engine, 0, 0, 300, 200)
    print(f"图形: {line1.get_description()}")
    print(f"{line1.get_engine_info()}")
    print(line1.draw())
    print(f"长度: {line1.get_length():.2f}\\n")
    
    # 演示组合图形
    print("--- 组合图形演示 ---")
    composite = CompositeShape(vector_engine, "房屋")
    composite.add_shape(Rectangle(vector_engine, 100, 100, 200, 150))  # 墙体
    composite.add_shape(Triangle(vector_engine, 100, 100, 300, 100, 200, 50))  # 屋顶（简化为三角形）
    print(composite.draw())
    
    # 演示运行时切换渲染引擎
    print("\\n--- 运行时切换渲染引擎 ---")
    print("同一个圆形使用不同引擎渲染：")
    
    circle_vector = Circle(vector_engine, 50, 50, 25)
    circle_raster = Circle(raster_engine, 50, 50, 25)
    circle_opengl = Circle(opengl_engine, 50, 50, 25)
    
    print(f"\\n1. {circle_vector.draw()}")
    print(f"2. {circle_raster.draw()}")
    print(f"3. {circle_opengl.draw()}")
    
    print("\\n--- 桥接模式优势 ---")
    print("1. 可以独立添加新的图形类型（如：椭圆、多边形）")
    print("2. 可以独立添加新的渲染引擎（如：DirectX、Vulkan）")
    print("3. 图形类型和渲染引擎可以任意组合")
    print("4. 符合开闭原则：扩展无需修改现有代码")


# 为了演示组合图形，需要添加三角形类
class Triangle(Shape):
    """扩展抽象 - 三角形（用于组合图形演示）"""
    
    def __init__(self, render_engine: RenderEngine, x1: float, y1: float,
                 x2: float, y2: float, x3: float, y3: float):
        super().__init__(render_engine)
        self._x1, self._y1 = x1, y1
        self._x2, self._y2 = x2, y2
        self._x3, self._y3 = x3, y3
    
    def draw(self) -> str:
        # 三角形通过绘制三条边来实现
        line1 = self._render_engine.render_line(self._x1, self._y1, self._x2, self._y2)
        line2 = self._render_engine.render_line(self._x2, self._y2, self._x3, self._y3)
        line3 = self._render_engine.render_line(self._x3, self._y3, self._x1, self._y1)
        return f"三角形(三点=({self._x1},{self._y1}),({self._x2},{self._y2}),({self._x3},{self._y3}))"
    
    def get_description(self) -> str:
        return f"三角形"


if __name__ == "__main__":
    client_code()`,

    cpp: `/**
 * 桥接模式 - C++ 实现
 * 示例：数据库访问层
 * 数据库操作是抽象维度，数据库驱动是实现维度
 */

#include <iostream>
#include <string>
#include <vector>
#include <memory>

// ============================================
// 实现部分（Implementation）- 数据库驱动维度
// ============================================

/**
 * 实现接口 - 数据库驱动接口
 * 定义所有数据库驱动都需要实现的方法
 */
class DatabaseDriver {
public:
    virtual ~DatabaseDriver() = default;
    
    /**
     * 连接到数据库
     * @param connectionString 连接字符串
     * @return 是否连接成功
     */
    virtual bool connect(const std::string& connectionString) = 0;
    
    /**
     * 断开数据库连接
     */
    virtual void disconnect() = 0;
    
    /**
     * 执行查询语句
     * @param query SQL查询语句
     * @return 查询结果
     */
    virtual std::vector<std::string> executeQuery(const std::string& query) = 0;
    
    /**
     * 执行更新语句
     * @param query SQL更新语句
     * @return 受影响的行数
     */
    virtual int executeUpdate(const std::string& query) = 0;
    
    /**
     * 获取驱动名称
     */
    virtual std::string getDriverName() const = 0;
    
    /**
     * 检查是否已连接
     */
    virtual bool isConnected() const = 0;
};

/**
 * 具体实现 - MySQL数据库驱动
 */
class MySQLDriver : public DatabaseDriver {
private:
    bool connected = false;
    std::string host;
    int port = 3306;
    
public:
    ~MySQLDriver() override {
        if (connected) {
            disconnect();
        }
    }
    
    bool connect(const std::string& connectionString) override {
        // 解析连接字符串（简化处理）
        std::cout << "[MySQL] 正在连接到: " << connectionString << std::endl;
        // 模拟连接过程
        std::cout << "[MySQL] 初始化MySQL客户端库..." << std::endl;
        std::cout << "[MySQL] 建立TCP连接..." << std::endl;
        std::cout << "[MySQL] 进行身份验证..." << std::endl;
        connected = true;
        std::cout << "[MySQL] 连接成功！" << std::endl;
        return true;
    }
    
    void disconnect() override {
        if (connected) {
            std::cout << "[MySQL] 正在断开连接..." << std::endl;
            connected = false;
            std::cout << "[MySQL] 连接已关闭" << std::endl;
        }
    }
    
    std::vector<std::string> executeQuery(const std::string& query) override {
        std::cout << "[MySQL] 执行查询: " << query << std::endl;
        // 模拟查询结果
        std::vector<std::string> results;
        results.push_back("Row 1: [id=1, name=Alice, age=25]");
        results.push_back("Row 2: [id=2, name=Bob, age=30]");
        results.push_back("Row 3: [id=3, name=Charlie, age=35]");
        std::cout << "[MySQL] 返回 " << results.size() << " 行数据" << std::endl;
        return results;
    }
    
    int executeUpdate(const std::string& query) override {
        std::cout << "[MySQL] 执行更新: " << query << std::endl;
        // 模拟更新操作
        int affectedRows = 1;
        std::cout << "[MySQL] 影响行数: " << affectedRows << std::endl;
        return affectedRows;
    }
    
    std::string getDriverName() const override {
        return "MySQL Driver 8.0";
    }
    
    bool isConnected() const override {
        return connected;
    }
};

/**
 * 具体实现 - PostgreSQL数据库驱动
 */
class PostgreSQLDriver : public DatabaseDriver {
private:
    bool connected = false;
    std::string version = "14.0";
    
public:
    ~PostgreSQLDriver() override {
        if (connected) {
            disconnect();
        }
    }
    
    bool connect(const std::string& connectionString) override {
        std::cout << "[PostgreSQL] 正在连接到: " << connectionString << std::endl;
        std::cout << "[PostgreSQL] 初始化libpq库..." << std::endl;
        std::cout << "[PostgreSQL] 建立连接..." << std::endl;
        std::cout << "[PostgreSQL] 设置客户端编码..." << std::endl;
        connected = true;
        std::cout << "[PostgreSQL] 连接成功！" << std::endl;
        return true;
    }
    
    void disconnect() override {
        if (connected) {
            std::cout << "[PostgreSQL] 正在断开连接..." << std::endl;
            std::cout << "[PostgreSQL] 提交未处理的事务..." << std::endl;
            connected = false;
            std::cout << "[PostgreSQL] 连接已关闭" << std::endl;
        }
    }
    
    std::vector<std::string> executeQuery(const std::string& query) override {
        std::cout << "[PostgreSQL] 执行查询: " << query << std::endl;
        std::cout << "[PostgreSQL] 使用查询优化器..." << std::endl;
        // 模拟查询结果
        std::vector<std::string> results;
        results.push_back("{\"id\": 1, \"name\": \"Alice\", \"age\": 25}");
        results.push_back("{\"id\": 2, \"name\": \"Bob\", \"age\": 30}");
        std::cout << "[PostgreSQL] 返回 " << results.size() << " 行数据(JSON格式)" << std::endl;
        return results;
    }
    
    int executeUpdate(const std::string& query) override {
        std::cout << "[PostgreSQL] 执行更新: " << query << std::endl;
        int affectedRows = 2;
        std::cout << "[PostgreSQL] 影响行数: " << affectedRows << std::endl;
        return affectedRows;
    }
    
    std::string getDriverName() const override {
        return "PostgreSQL Driver " + version;
    }
    
    bool isConnected() const override {
        return connected;
    }
};

/**
 * 具体实现 - SQLite数据库驱动（嵌入式数据库）
 */
class SQLiteDriver : public DatabaseDriver {
private:
    bool connected = false;
    std::string dbPath;
    
public:
    ~SQLiteDriver() override {
        if (connected) {
            disconnect();
        }
    }
    
    bool connect(const std::string& connectionString) override {
        dbPath = connectionString;
        std::cout << "[SQLite] 正在打开数据库文件: " << dbPath << std::endl;
        std::cout << "[SQLite] 检查数据库文件..." << std::endl;
        std::cout << "[SQLite] 加载SQLite引擎..." << std::endl;
        connected = true;
        std::cout << "[SQLite] 数据库已打开（文件模式）" << std::endl;
        return true;
    }
    
    void disconnect() override {
        if (connected) {
            std::cout << "[SQLite] 正在关闭数据库..." << std::endl;
            std::cout << "[SQLite] 检查并清理临时文件..." << std::endl;
            connected = false;
            std::cout << "[SQLite] 数据库已关闭" << std::endl;
        }
    }
    
    std::vector<std::string> executeQuery(const std::string& query) override {
        std::cout << "[SQLite] 执行查询: " << query << std::endl;
        std::cout << "[SQLite] 使用B-tree索引查询..." << std::endl;
        // 模拟查询结果
        std::vector<std::string> results;
        results.push_back("1|Alice|25");
        results.push_back("2|Bob|30");
        results.push_back("3|Charlie|35");
        results.push_back("4|David|40");
        std::cout << "[SQLite] 返回 " << results.size() << " 行数据(管道分隔)" << std::endl;
        return results;
    }
    
    int executeUpdate(const std::string& query) override {
        std::cout << "[SQLite] 执行更新: " << query << std::endl;
        int affectedRows = 1;
        std::cout << "[SQLite] 影响行数: " << affectedRows << std::endl;
        std::cout << "[SQLite] 事务已自动提交" << std::endl;
        return affectedRows;
    }
    
    std::string getDriverName() const override {
        return "SQLite Driver 3.x";
    }
    
    bool isConnected() const override {
        return connected;
    }
};

// ============================================
// 抽象部分（Abstraction）- 数据库操作维度
// ============================================

/**
 * 抽象类 - 数据库访问对象
 * 定义数据库操作的高层接口
 */
class DatabaseAccessor {
protected:
    /**
     * 对实现部分的引用
     * 使用智能指针管理生命周期
     */
    std::shared_ptr<DatabaseDriver> driver;
    
public:
    /**
     * 构造函数 - 通过依赖注入传入数据库驱动
     * @param driver 数据库驱动实现对象
     */
    explicit DatabaseAccessor(std::shared_ptr<DatabaseDriver> driver) 
        : driver(std::move(driver)) {}
    
    virtual ~DatabaseAccessor() = default;
    
    /**
     * 连接到数据库
     * @param connectionString 连接字符串
     */
    virtual bool connect(const std::string& connectionString) {
        return driver->connect(connectionString);
    }
    
    /**
     * 断开数据库连接
     */
    virtual void disconnect() {
        driver->disconnect();
    }
    
    /**
     * 检查连接状态
     */
    virtual bool isConnected() const {
        return driver->isConnected();
    }
    
    /**
     * 获取驱动信息
     */
    virtual std::string getDriverInfo() const {
        return driver->getDriverName();
    }
    
    /**
     * 抽象方法 - 查询所有记录
     */
    virtual std::vector<std::string> findAll(const std::string& tableName) = 0;
    
    /**
     * 抽象方法 - 根据ID查询
     */
    virtual std::string findById(const std::string& tableName, int id) = 0;
};

/**
 * 扩展抽象 - 用户数据访问对象
 * 专门用于用户表的数据访问
 */
class UserDAO : public DatabaseAccessor {
public:
    explicit UserDAO(std::shared_ptr<DatabaseDriver> driver) 
        : DatabaseAccessor(std::move(driver)) {}
    
    std::vector<std::string> findAll(const std::string& tableName) override {
        std::cout << "\\n[UserDAO] 查询所有用户数据" << std::endl;
        std::string query = "SELECT * FROM " + tableName;
        return driver->executeQuery(query);
    }
    
    std::string findById(const std::string& tableName, int id) override {
        std::cout << "\\n[UserDAO] 根据ID查询用户: " << id << std::endl;
        std::string query = "SELECT * FROM " + tableName + " WHERE id = " + std::to_string(id);
        auto results = driver->executeQuery(query);
        return results.empty() ? "未找到记录" : results[0];
    }
    
    /**
     * 用户特有的方法 - 根据用户名查询
     */
    std::vector<std::string> findByName(const std::string& tableName, 
                                         const std::string& name) {
        std::cout << "\\n[UserDAO] 根据用户名查询: " << name << std::endl;
        std::string query = "SELECT * FROM " + tableName + " WHERE name LIKE '%" + name + "%'";
        return driver->executeQuery(query);
    }
    
    /**
     * 用户特有的方法 - 更新用户年龄
     */
    bool updateAge(const std::string& tableName, int id, int newAge) {
        std::cout << "\\n[UserDAO] 更新用户年龄 - ID: " << id << ", 新年龄: " << newAge << std::endl;
        std::string query = "UPDATE " + tableName + " SET age = " + std::to_string(newAge) + 
                           " WHERE id = " + std::to_string(id);
        int affected = driver->executeUpdate(query);
        return affected > 0;
    }
};

/**
 * 扩展抽象 - 订单数据访问对象
 * 专门用于订单表的数据访问
 */
class OrderDAO : public DatabaseAccessor {
public:
    explicit OrderDAO(std::shared_ptr<DatabaseDriver> driver) 
        : DatabaseAccessor(std::move(driver)) {}
    
    std::vector<std::string> findAll(const std::string& tableName) override {
        std::cout << "\\n[OrderDAO] 查询所有订单数据" << std::endl;
        std::string query = "SELECT * FROM " + tableName + " ORDER BY created_at DESC";
        return driver->executeQuery(query);
    }
    
    std::string findById(const std::string& tableName, int id) override {
        std::cout << "\\n[OrderDAO] 根据ID查询订单: " << id << std::endl;
        std::string query = "SELECT * FROM " + tableName + " WHERE order_id = " + std::to_string(id);
        auto results = driver->executeQuery(query);
        return results.empty() ? "未找到订单" : results[0];
    }
    
    /**
     * 订单特有的方法 - 查询某个用户的所有订单
     */
    std::vector<std::string> findByUserId(const std::string& tableName, int userId) {
        std::cout << "\\n[OrderDAO] 查询用户 " << userId << " 的所有订单" << std::endl;
        std::string query = "SELECT * FROM " + tableName + " WHERE user_id = " + std::to_string(userId);
        return driver->executeQuery(query);
    }
    
    /**
     * 订单特有的方法 - 更新订单状态
     */
    bool updateStatus(const std::string& tableName, int orderId, 
                      const std::string& newStatus) {
        std::cout << "\\n[OrderDAO] 更新订单状态 - 订单ID: " << orderId 
                  << ", 新状态: " << newStatus << std::endl;
        std::string query = "UPDATE " + tableName + " SET status = '" + newStatus + 
                           "' WHERE order_id = " + std::to_string(orderId);
        int affected = driver->executeUpdate(query);
        return affected > 0;
    }
};

// ============================================
// 客户端代码
// ============================================

/**
 * 客户端函数 - 演示桥接模式的使用
 */
void clientCode() {
    std::cout << "=== 桥接模式演示 - 数据库访问层 ===" << std::endl;
    std::cout << std::endl;
    
    // 创建不同的数据库驱动（实现部分）
    auto mysqlDriver = std::make_shared<MySQLDriver>();
    auto postgresDriver = std::make_shared<PostgreSQLDriver>();
    auto sqliteDriver = std::make_shared<SQLiteDriver>();
    
    // 使用MySQL驱动创建UserDAO
    std::cout << "--- 使用MySQL驱动访问用户数据 ---" << std::endl;
    UserDAO userDAOWithMySQL(mysqlDriver);
    userDAOWithMySQL.connect("mysql://localhost:3306/mydb?user=root&password=123456");
    std::cout << "驱动信息: " << userDAOWithMySQL.getDriverInfo() << std::endl;
    
    auto users = userDAOWithMySQL.findAll("users");
    std::cout << "查询结果:" << std::endl;
    for (const auto& user : users) {
        std::cout << "  " << user << std::endl;
    }
    
    userDAOWithMySQL.updateAge("users", 1, 26);
    userDAOWithMySQL.disconnect();
    
    // 使用PostgreSQL驱动创建UserDAO
    std::cout << "\\n--- 使用PostgreSQL驱动访问用户数据 ---" << std::endl;
    UserDAO userDAOWithPostgres(postgresDriver);
    userDAOWithPostgres.connect("postgresql://localhost:5432/mydb?user=postgres");
    std::cout << "驱动信息: " << userDAOWithPostgres.getDriverInfo() << std::endl;
    
    auto user = userDAOWithPostgres.findById("users", 2);
    std::cout << "查询结果: " << user << std::endl;
    userDAOWithPostgres.disconnect();
    
    // 使用SQLite驱动创建OrderDAO
    std::cout << "\\n--- 使用SQLite驱动访问订单数据 ---" << std::endl;
    OrderDAO orderDAOWithSQLite(sqliteDriver);
    orderDAOWithSQLite.connect("/path/to/database.sqlite");
    std::cout << "驱动信息: " << orderDAOWithSQLite.getDriverInfo() << std::endl;
    
    auto orders = orderDAOWithSQLite.findAll("orders");
    std::cout << "查询结果:" << std::endl;
    for (const auto& order : orders) {
        std::cout << "  " << order << std::endl;
    }
    orderDAOWithSQLite.disconnect();
    
    // 演示运行时切换驱动
    std::cout << "\\n--- 演示桥接模式的优势 ---" << std::endl;
    std::cout << "同一个UserDAO可以与不同的数据库驱动配合：" << std::endl;
    std::cout << "1. UserDAO + MySQLDriver -> MySQL数据库访问" << std::endl;
    std::cout << "2. UserDAO + PostgreSQLDriver -> PostgreSQL数据库访问" << std::endl;
    std::cout << "3. UserDAO + SQLiteDriver -> SQLite数据库访问" << std::endl;
    std::cout << "\\n可以独立添加新的DAO类型（如ProductDAO）或新的驱动（如OracleDriver）" << std::endl;
    std::cout << "而不需要修改现有代码，符合开闭原则。" << std::endl;
}

/**
 * 程序入口
 */
int main() {
    clientCode();
    return 0;
}`,
  },
  realWorldExamples: [
    {
      title: 'Java AWT/Swing',
      description: 'Java AWT 使用桥接模式将组件（抽象）与平台特定的实现（实现）分离。Component 类是抽象，而 ComponentPeer 接口是实现。',
      source: 'JDK',
      codeSnippet: `// Component（抽象）持有 ComponentPeer（实现）的引用
Component peer = component.getPeer();
// 不同平台有各自的 Peer 实现：WindowsPeer、MotifPeer、X11Peer`,
    },
    {
      title: 'JDBC 数据库访问',
      description: 'JDBC 是桥接模式的经典应用。DriverManager 提供统一接口（抽象），而各个数据库厂商提供具体的 Driver 实现。',
      source: 'JDBC API',
      codeSnippet: `// 抽象：Connection 接口
Connection conn = DriverManager.getConnection(url);
// 实现：不同数据库的具体驱动
// MySQL: com.mysql.cj.jdbc.Driver
// PostgreSQL: org.postgresql.Driver`,
    },
    {
      title: '跨平台 GUI 框架',
      description: 'Electron、React Native 等框架使用桥接模式分离业务逻辑与原生平台实现，实现一次编写，多端运行。',
      source: 'Cross-platform Frameworks',
      codeSnippet: `// React Native 示例
// JavaScript（抽象）通过 Bridge 调用原生模块（实现）
import { NativeModules } from 'react-native';
const { CameraModule } = NativeModules;`,
    },
  ],
  relatedPatterns: ['adapter', 'strategy', 'state', 'abstract-factory'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '桥接模式的主要目的是什么？',
      options: [
        '创建对象实例',
        '分离抽象部分与实现部分，使它们可以独立变化',
        '优化系统性能',
        '简化复杂的继承层次结构',
      ],
      correctAnswer: 1,
      explanation: '桥接模式的核心目的是将抽象部分与实现部分分离，使它们可以独立变化，避免类爆炸问题。',
    },
    {
      id: 'q2',
      type: 'boolean',
      question: '桥接模式使用组合关系而非继承来连接抽象和实现',
      options: ['正确', '错误'],
      correctAnswer: 0,
      explanation: '正确。桥接模式的关键是使用组合（对象包含）而非继承来连接抽象和实现，这样可以在运行时动态切换实现。',
    },
    {
      id: 'q3',
      type: 'single',
      question: '以下哪个场景最适合使用桥接模式？',
      options: [
        '需要创建一个全局唯一的对象实例',
        '需要在多个独立维度上扩展类的功能',
        '需要将不兼容的接口转换为兼容的接口',
        '需要动态地给对象添加额外的职责',
      ],
      correctAnswer: 1,
      explanation: '当需要在多个独立维度上扩展类的功能时（如形状和颜色、设备和遥控器），使用桥接模式可以避免创建大量的子类组合。',
    },
    {
      id: 'q4',
      type: 'single',
      question: '桥接模式与适配器模式的区别是什么？',
      options: [
        '两者完全相同，只是名称不同',
        '桥接模式用于预先设计，适配器模式用于事后补救',
        '桥接模式只能用于图形界面，适配器模式用于数据结构',
        '桥接模式使用继承，适配器模式使用组合',
      ],
      correctAnswer: 1,
      explanation: '桥接模式通常在系统设计之初使用，用于分离抽象和实现；而适配器模式通常用于将已有的不兼容接口整合到一起。',
    },
  ],
};