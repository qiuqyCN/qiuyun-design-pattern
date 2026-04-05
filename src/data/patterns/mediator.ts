import type { DesignPattern } from '@/types/pattern';

export const mediatorPattern: DesignPattern = {
  id: 'mediator',
  name: '中介者模式',
  nameEn: 'Mediator Pattern',
  category: 'behavioral',
  difficulty: 'medium',
  frequency: 'medium',
  intent: '用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。',
  description: '中介者模式是一种行为设计模式，能让你减少对象之间混乱无序的依赖关系。该模式会限制对象之间的直接交互，迫使它们通过一个中介者对象进行合作。',
  applicability: ['当一些对象和其他对象紧密耦合以致难以对其进行修改时', '当组件因过于依赖其他组件而无法在不同应用中复用时', '当为了能在不同情景下复用一些基本行为，需要创建大量组件子类时'],
  pros: ['单一职责原则：将多个组件间的交流抽取到同一位置，使其更易于理解和维护', '开闭原则：无需修改实际组件就能增加新的中介者', '可以减轻应用中多个组件间的耦合情况'],
  cons: ['一段时间后，中介者可能会演化成上帝对象'],
  analogy: { title: '现实世界中的中介者', description: '中介者就像是机场塔台', scenarios: [{ id: 'tower', title: '机场塔台', description: '飞机（组件）不直接相互通信，而是通过塔台（中介者）协调起飞和降落。', icon: 'TowerControl' }] },
  structure: {
    classDiagram: `
      class Mediator {
        +notify(sender, event)
      }
      class ConcreteMediator {
        -colleague1: Colleague
        -colleague2: Colleague
        +notify(sender, event)
      }
      class Colleague {
        -mediator: Mediator
        +send(message)
        +receive(message)
      }
      class ConcreteColleague1 {
        +send(message)
        +receive(message)
      }
      class ConcreteColleague2 {
        +send(message)
        +receive(message)
      }
      Mediator <|-- ConcreteMediator
      Colleague <|-- ConcreteColleague1
      Colleague <|-- ConcreteColleague2
      ConcreteMediator --> Colleague
      Colleague --> Mediator
    `,
    mermaidDiagram: `
classDiagram
  class Mediator {
    <<interface>>
    +notify(sender, event)
  }
  
  class ConcreteMediator {
    -colleague1: Colleague
    -colleague2: Colleague
    +notify(sender, event)
  }
  
  class Colleague {
    #mediator: Mediator
    +setMediator(m)
    +send(message)
    +receive(message)
  }
  
  class ConcreteColleague1 {
    +send(message)
    +receive(message)
    +doSomething()
  }
  
  class ConcreteColleague2 {
    +send(message)
    +receive(message)
    +doSomethingElse()
  }
  
  class Client {
    +main()
  }
  
  Mediator <|.. ConcreteMediator
  Colleague <|-- ConcreteColleague1
  Colleague <|-- ConcreteColleague2
  ConcreteMediator o--> Colleague : manages
  Colleague --> Mediator : uses
  Client ..> ConcreteMediator : creates
  Client ..> ConcreteColleague1 : creates
  Client ..> ConcreteColleague2 : creates
  
  style Mediator fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style ConcreteMediator fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
  style Colleague fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style ConcreteColleague1 fill:#fce4ec,stroke:#c2185b,stroke-width:1px
  style ConcreteColleague2 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: '定义中介者接口',
        description: '定义 Mediator 接口，声明组件用于通知中介者的事件方法',
        duration: 2000,
        elements: [
          { id: 'mediator', type: 'interface', name: 'Mediator', x: 300, y: 100, methods: ['+notify(sender, event)'] },
        ],
      },
      {
        id: 'step2',
        title: '创建具体中介者',
        description: 'ConcreteMediator 实现 Mediator 接口，协调各组件之间的通信',
        duration: 2500,
        elements: [
          { id: 'mediator', type: 'interface', name: 'Mediator', x: 300, y: 100, methods: ['+notify(sender, event)'] },
          { id: 'concreteMediator', type: 'class', name: 'ConcreteMediator', x: 300, y: 250, properties: ['-colleague1: Colleague', '-colleague2: Colleague'], methods: ['+notify(sender, event)'] },
        ],
        connections: [
          { from: 'concreteMediator', to: 'mediator', type: 'implementation' },
        ],
      },
      {
        id: 'step3',
        title: '定义同事类',
        description: 'Colleague 类持有中介者引用，通过中介者与其他组件通信',
        duration: 2500,
        elements: [
          { id: 'mediator', type: 'interface', name: 'Mediator', x: 300, y: 100, methods: ['+notify(sender, event)'] },
          { id: 'concreteMediator', type: 'class', name: 'ConcreteMediator', x: 300, y: 250, properties: ['-colleague1: Colleague', '-colleague2: Colleague'], methods: ['+notify(sender, event)'] },
          { id: 'colleague', type: 'class', name: 'Colleague', x: 100, y: 400, properties: ['#mediator: Mediator'], methods: ['+setMediator(m)', '+send(message)', '+receive(message)'] },
        ],
        connections: [
          { from: 'concreteMediator', to: 'mediator', type: 'implementation' },
          { from: 'colleague', to: 'mediator', type: 'association', label: 'uses' },
        ],
      },
      {
        id: 'step4',
        title: '创建具体同事类',
        description: '具体同事类继承 Colleague，实现特定的业务逻辑',
        duration: 2500,
        elements: [
          { id: 'mediator', type: 'interface', name: 'Mediator', x: 300, y: 100, methods: ['+notify(sender, event)'] },
          { id: 'concreteMediator', type: 'class', name: 'ConcreteMediator', x: 300, y: 250, properties: ['-colleague1: Colleague', '-colleague2: Colleague'], methods: ['+notify(sender, event)'] },
          { id: 'colleague', type: 'class', name: 'Colleague', x: 100, y: 400, properties: ['#mediator: Mediator'], methods: ['+setMediator(m)', '+send(message)', '+receive(message)'] },
          { id: 'colleague1', type: 'class', name: 'ConcreteColleague1', x: 50, y: 550, methods: ['+send(message)', '+receive(message)', '+doSomething()'] },
          { id: 'colleague2', type: 'class', name: 'ConcreteColleague2', x: 200, y: 550, methods: ['+send(message)', '+receive(message)', '+doSomethingElse()'] },
        ],
        connections: [
          { from: 'concreteMediator', to: 'mediator', type: 'implementation' },
          { from: 'colleague', to: 'mediator', type: 'association', label: 'uses' },
          { from: 'colleague1', to: 'colleague', type: 'inheritance' },
          { from: 'colleague2', to: 'colleague', type: 'inheritance' },
          { from: 'concreteMediator', to: 'colleague', type: 'association', label: 'manages' },
        ],
      },
      {
        id: 'step5',
        title: '客户端使用',
        description: '客户端创建中介者和同事对象，建立关联关系',
        duration: 3000,
        elements: [
          { id: 'mediator', type: 'interface', name: 'Mediator', x: 300, y: 100, methods: ['+notify(sender, event)'] },
          { id: 'concreteMediator', type: 'class', name: 'ConcreteMediator', x: 300, y: 250, properties: ['-colleague1: Colleague', '-colleague2: Colleague'], methods: ['+notify(sender, event)'] },
          { id: 'colleague', type: 'class', name: 'Colleague', x: 100, y: 400, properties: ['#mediator: Mediator'], methods: ['+setMediator(m)', '+send(message)', '+receive(message)'] },
          { id: 'colleague1', type: 'class', name: 'ConcreteColleague1', x: 50, y: 550, methods: ['+send(message)', '+receive(message)', '+doSomething()'] },
          { id: 'colleague2', type: 'class', name: 'ConcreteColleague2', x: 200, y: 550, methods: ['+send(message)', '+receive(message)', '+doSomethingElse()'] },
          { id: 'client', type: 'class', name: 'Client', x: 500, y: 400, methods: ['+main()'] },
        ],
        connections: [
          { from: 'concreteMediator', to: 'mediator', type: 'implementation' },
          { from: 'colleague', to: 'mediator', type: 'association', label: 'uses' },
          { from: 'colleague1', to: 'colleague', type: 'inheritance' },
          { from: 'colleague2', to: 'colleague', type: 'inheritance' },
          { from: 'concreteMediator', to: 'colleague', type: 'association', label: 'manages' },
          { from: 'client', to: 'concreteMediator', type: 'dependency', label: 'creates' },
          { from: 'client', to: 'colleague1', type: 'dependency', label: 'creates' },
          { from: 'client', to: 'colleague2', type: 'dependency', label: 'creates' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * 中介者模式 - TypeScript 实现
 * 以聊天室为例：用户通过聊天室（中介者）发送消息，而不是直接发送给其他用户
 */

// ==================== 中介者接口 ====================
/**
 * Mediator 接口声明了组件用于通知中介者各种事件的方法
 * 中介者可以响应这些事件并将执行流程转发给其他组件
 */
interface Mediator {
  /**
   * 通知中介者发生的事件
   * @param sender 发送通知的组件
   * @param event 事件标识
   * @param data 可选的事件数据
   */
  notify(sender: Colleague, event: string, data?: any): void;
  
  /**
   * 注册同事对象到中介者
   * @param colleague 要注册的同事对象
   */
  register(colleague: Colleague): void;
}

// ==================== 同事类 ====================
/**
 * Colleague 是各种组件的基类
 * 每个同事都知道它的中介者对象，并通过中介者与其他同事通信
 */
abstract class Colleague {
  // 受保护的中介者引用，子类可以直接访问
  protected mediator: Mediator;
  // 同事的名称标识
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  /**
   * 设置中介者引用
   * 通常在同事注册到中介者时被调用
   */
  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }

  /**
   * 获取同事名称
   */
  public getName(): string {
    return this.name;
  }

  /**
   * 发送消息（通过中介者转发）
   * @param message 消息内容
   */
  public abstract send(message: string): void;

  /**
   * 接收消息
   * @param sender 发送者
   * @param message 消息内容
   */
  public abstract receive(sender: string, message: string): void;
}

// ==================== 具体中介者 ====================
/**
 * ConcreteMediator 实现 Mediator 接口
 * 它协调各同事对象之间的通信，知道如何路由消息
 */
class ChatRoomMediator implements Mediator {
  // 存储所有注册的同事对象
  private colleagues: Colleague[] = [];
  // 聊天室名称
  private roomName: string;

  constructor(roomName: string) {
    this.roomName = roomName;
  }

  /**
   * 注册同事到聊天室
   */
  public register(colleague: Colleague): void {
    this.colleagues.push(colleague);
    colleague.setMediator(this);
    console.log(\`[系统] \${colleague.getName()} 加入了聊天室 '\${this.roomName}'\`);
  }

  /**
   * 处理来自同事的通知
   * 根据事件类型决定如何处理
   */
  public notify(sender: Colleague, event: string, data?: any): void {
    switch (event) {
      case 'broadcast':
        // 广播消息给所有其他同事
        this.broadcast(sender, data);
        break;
      case 'private':
        // 私信给特定同事
        this.sendPrivate(sender, data.to, data.message);
        break;
      case 'leave':
        // 处理离开事件
        this.removeColleague(sender);
        break;
      default:
        console.log(\`[系统] 未知事件类型: \${event}\`);
    }
  }

  /**
   * 广播消息给所有其他同事（除了发送者）
   */
  private broadcast(sender: Colleague, message: string): void {
    console.log(\`[\${this.roomName}] \${sender.getName()} 广播消息\`);
    for (const colleague of this.colleagues) {
      if (colleague !== sender) {
        colleague.receive(sender.getName(), message);
      }
    }
  }

  /**
   * 发送私信给特定同事
   */
  private sendPrivate(sender: Colleague, toName: string, message: string): void {
    const recipient = this.colleagues.find(c => c.getName() === toName);
    if (recipient) {
      recipient.receive(sender.getName() + " (私信)", message);
    } else {
      console.log(\`[系统] 用户 '\${toName}' 不在聊天室中\`);
    }
  }

  /**
   * 移除同事
   */
  private removeColleague(colleague: Colleague): void {
    const index = this.colleagues.indexOf(colleague);
    if (index !== -1) {
      this.colleagues.splice(index, 1);
      console.log(\`[系统] \${colleague.getName()} 离开了聊天室\`);
    }
  }

  /**
   * 获取当前在线用户列表
   */
  public getOnlineUsers(): string[] {
    return this.colleagues.map(c => c.getName());
  }
}

// ==================== 具体同事类 ====================
/**
 * User 是具体的同事类，代表聊天室中的用户
 */
class User extends Colleague {
  constructor(name: string) {
    super(name);
  }

  /**
   * 发送广播消息
   */
  public send(message: string): void {
    console.log(\`\${this.name} 发送消息: \${message}\`);
    this.mediator.notify(this, 'broadcast', message);
  }

  /**
   * 发送私信
   */
  public sendPrivate(to: string, message: string): void {
    console.log(\`\${this.name} 发送私信给 \${to}: \${message}\`);
    this.mediator.notify(this, 'private', { to, message });
  }

  /**
   * 接收消息
   */
  public receive(sender: string, message: string): void {
    console.log(\`[\${this.name} 收到来自 \${sender} 的消息]: \${message}\`);
  }

  /**
   * 离开聊天室
   */
  public leave(): void {
    this.mediator.notify(this, 'leave');
  }
}

/**
 * Bot 是另一种具体同事类，代表聊天机器人
 * 可以自动回复特定消息
 */
class Bot extends Colleague {
  private triggerWord: string;
  private response: string;

  constructor(name: string, triggerWord: string, response: string) {
    super(name);
    this.triggerWord = triggerWord;
    this.response = response;
  }

  public send(message: string): void {
    // 机器人通常不主动发送消息
    console.log(\`[机器人 \${this.name}] 尝试发送: \${message}\`);
  }

  public receive(sender: string, message: string): void {
    console.log(\`[机器人 \${this.name}] 监听到 \${sender}: \${message}\`);
    
    // 如果消息包含触发词，自动回复
    if (message.includes(this.triggerWord)) {
      setTimeout(() => {
        console.log(\`[机器人 \${this.name}] 触发自动回复\`);
        this.mediator.notify(this, 'broadcast', \`@\${sender} \${this.response}\`);
      }, 500);
    }
  }
}

// ==================== 客户端使用示例 ====================
function clientCode(): void {
  console.log("========== 中介者模式示例：聊天室 ==========\\n");

  // 1. 创建中介者（聊天室）
  const chatRoom = new ChatRoomMediator("技术交流群");

  // 2. 创建具体同事（用户）
  const alice = new User("Alice");
  const bob = new User("Bob");
  const charlie = new User("Charlie");
  const bot = new Bot("小助手", "帮助", "您好！我是小助手，有什么可以帮您的吗？");

  // 3. 注册同事到中介者
  chatRoom.register(alice);
  chatRoom.register(bob);
  chatRoom.register(charlie);
  chatRoom.register(bot);

  console.log("\\n--- 当前在线用户:", chatRoom.getOnlineUsers(), "---\\n");

  // 4. 用户发送广播消息
  alice.send("大家好！有人知道怎么学习 TypeScript 吗？");
  
  console.log("");
  
  // 5. 触发机器人自动回复
  bob.send("我需要帮助，请问有人在线吗？");
  
  console.log("\\n");
  
  // 6. 发送私信
  charlie.sendPrivate("Alice", "我有不错的学习资源，私发给你！");
  
  console.log("\\n");
  
  // 7. 用户离开
  charlie.leave();
  
  console.log("\\n--- 当前在线用户:", chatRoom.getOnlineUsers(), "---");
}

// 运行示例
clientCode();`,

    java: `/**
 * 中介者模式 - Java 实现
 * 以智能家居系统为例：各种智能设备通过中控系统（中介者）协调工作
 */

// ==================== 中介者接口 ====================
/**
 * Mediator 接口声明了组件用于通知中介者的方法
 * 中介者通过这些方法协调各组件之间的交互
 */
interface Mediator {
    /**
     * 通知中介者发生的事件
     * @param sender 发送通知的组件
     * @param event 事件标识
     */
    void notify(Colleague sender, String event);
    
    /**
     * 通知中介者发生的事件（带数据）
     * @param sender 发送通知的组件
     * @param event 事件标识
     * @param data 事件数据
     */
    void notify(Colleague sender, String event, Object data);
    
    /**
     * 注册同事对象
     * @param colleague 要注册的同事
     */
    void register(Colleague colleague);
}

// ==================== 同事类 ====================
/**
 * Colleague 是各种智能设备的基类
 * 每个设备都通过中介者与其他设备通信
 */
abstract class Colleague {
    // 受保护的中介者引用
    protected Mediator mediator;
    // 设备名称
    protected String name;
    // 设备状态
    protected boolean isOn;

    public Colleague(String name) {
        this.name = name;
        this.isOn = false;
    }

    /**
     * 设置中介者引用
     */
    public void setMediator(Mediator mediator) {
        this.mediator = mediator;
    }

    /**
     * 获取设备名称
     */
    public String getName() {
        return name;
    }

    /**
     * 获取设备状态
     */
    public boolean isOn() {
        return isOn;
    }

    /**
     * 打开设备
     */
    public abstract void turnOn();

    /**
     * 关闭设备
     */
    public abstract void turnOff();

    /**
     * 接收来自其他设备的通知
     * @param sender 发送者名称
     * @param event 事件类型
     */
    public abstract void receive(String sender, String event);
}

// ==================== 具体中介者 ====================
/**
 * SmartHomeHub 是具体的中介者，协调所有智能设备
 * 实现了场景联动功能，如"回家模式"、"睡眠模式"等
 */
class SmartHomeHub implements Mediator {
    // 存储所有注册的设备
    private java.util.List<Colleague> devices = new java.util.ArrayList<>();
    // 当前场景模式
    private String currentMode = "normal";

    @Override
    public void register(Colleague colleague) {
        devices.add(colleague);
        colleague.setMediator(this);
        System.out.println("[系统] 设备 '" + colleague.getName() + "' 已连接到智能家居系统");
    }

    @Override
    public void notify(Colleague sender, String event) {
        notify(sender, event, null);
    }

    @Override
    public void notify(Colleague sender, String event, Object data) {
        System.out.println("[中控] 收到 '" + sender.getName() + "' 的事件: " + event);
        
        switch (event) {
            case "turned_on":
                handleDeviceTurnedOn(sender);
                break;
            case "turned_off":
                handleDeviceTurnedOff(sender);
                break;
            case "motion_detected":
                handleMotionDetected(sender);
                break;
            case "temperature_high":
                handleHighTemperature(sender, (Double) data);
                break;
            case "set_mode":
                setMode((String) data);
                break;
            default:
                System.out.println("[中控] 未知事件: " + event);
        }
    }

    /**
     * 处理设备开启事件 - 实现场景联动
     */
    private void handleDeviceTurnedOn(Colleague sender) {
        String deviceName = sender.getName();
        
        // 智能联动：如果打开电视，自动调暗灯光
        if (deviceName.equals("电视")) {
            System.out.println("[联动] 检测到电视开启，自动调暗客厅灯光");
            broadcastToOthers(sender, "dim_light");
        }
        
        // 智能联动：如果打开门锁，自动开灯
        if (deviceName.equals("智能门锁")) {
            System.out.println("[联动] 检测到开门，启动回家模式");
            setMode("home");
        }
    }

    /**
     * 处理设备关闭事件
     */
    private void handleDeviceTurnedOff(Colleague sender) {
        String deviceName = sender.getName();
        
        // 智能联动：如果关闭电视，恢复灯光亮度
        if (deviceName.equals("电视")) {
            System.out.println("[联动] 检测到电视关闭，恢复客厅灯光");
            broadcastToOthers(sender, "restore_light");
        }
    }

    /**
     * 处理运动检测事件
     */
    private void handleMotionDetected(Colleague sender) {
        System.out.println("[联动] 检测到运动，开启相关区域照明");
        // 通知灯光设备开启
        for (Colleague device : devices) {
            if (device.getName().contains("灯") && !device.isOn()) {
                device.receive("中控", "auto_turn_on");
            }
        }
    }

    /**
     * 处理高温事件
     */
    private void handleHighTemperature(Colleague sender, Double temperature) {
        System.out.println("[联动] 检测到温度升高到 " + temperature + "°C，自动开启空调");
        for (Colleague device : devices) {
            if (device.getName().equals("空调") && !device.isOn()) {
                device.receive("中控", "auto_turn_on");
            }
        }
    }

    /**
     * 设置场景模式
     */
    private void setMode(String mode) {
        this.currentMode = mode;
        System.out.println("[场景] 切换到 '" + mode + "' 模式");
        
        switch (mode) {
            case "home":
                // 回家模式：开灯、开空调、开窗帘
                broadcastToAll("mode_home");
                break;
            case "sleep":
                // 睡眠模式：关灯、关电视、关窗帘
                broadcastToAll("mode_sleep");
                break;
            case "away":
                // 离家模式：关闭所有设备，开启安防
                broadcastToAll("mode_away");
                break;
        }
    }

    /**
     * 广播消息给所有其他设备（排除发送者）
     */
    private void broadcastToOthers(Colleague sender, String event) {
        for (Colleague device : devices) {
            if (device != sender) {
                device.receive(sender.getName(), event);
            }
        }
    }

    /**
     * 广播消息给所有设备
     */
    private void broadcastToAll(String event) {
        for (Colleague device : devices) {
            device.receive("中控", event);
        }
    }

    /**
     * 获取当前模式
     */
    public String getCurrentMode() {
        return currentMode;
    }
}

// ==================== 具体同事类 ====================
/**
 * Light 是具体的同事类，代表智能灯光
 */
class Light extends Colleague {
    private int brightness; // 亮度 0-100

    public Light(String name) {
        super(name);
        this.brightness = 100;
    }

    @Override
    public void turnOn() {
        isOn = true;
        System.out.println("[" + name + "] 灯光已开启，亮度: " + brightness + "%");
        mediator.notify(this, "turned_on");
    }

    @Override
    public void turnOff() {
        isOn = false;
        System.out.println("[" + name + "] 灯光已关闭");
        mediator.notify(this, "turned_off");
    }

    /**
     * 调整亮度
     */
    public void setBrightness(int brightness) {
        this.brightness = Math.max(0, Math.min(100, brightness));
        if (isOn) {
            System.out.println("[" + name + "] 亮度调整为: " + this.brightness + "%");
        }
    }

    @Override
    public void receive(String sender, String event) {
        switch (event) {
            case "dim_light":
                if (isOn) {
                    setBrightness(30);
                    System.out.println("[" + name + "] 响应 '" + sender + "'：已调暗灯光");
                }
                break;
            case "restore_light":
                if (isOn) {
                    setBrightness(100);
                    System.out.println("[" + name + "] 响应 '" + sender + "'：已恢复灯光");
                }
                break;
            case "auto_turn_on":
                if (!isOn) {
                    turnOn();
                }
                break;
            case "mode_sleep":
            case "mode_away":
                if (isOn) turnOff();
                break;
            case "mode_home":
                if (!isOn) turnOn();
                break;
        }
    }
}

/**
 * TV 是具体的同事类，代表智能电视
 */
class TV extends Colleague {
    private String channel;

    public TV(String name) {
        super(name);
        this.channel = "CCTV-1";
    }

    @Override
    public void turnOn() {
        isOn = true;
        System.out.println("[" + name + "] 电视已开启，当前频道: " + channel);
        mediator.notify(this, "turned_on");
    }

    @Override
    public void turnOff() {
        isOn = false;
        System.out.println("[" + name + "] 电视已关闭");
        mediator.notify(this, "turned_off");
    }

    public void changeChannel(String channel) {
        this.channel = channel;
        if (isOn) {
            System.out.println("[" + name + "] 切换到频道: " + channel);
        }
    }

    @Override
    public void receive(String sender, String event) {
        switch (event) {
            case "mode_sleep":
            case "mode_away":
                if (isOn) turnOff();
                break;
        }
    }
}

/**
 * AirConditioner 是具体的同事类，代表智能空调
 */
class AirConditioner extends Colleague {
    private double temperature;

    public AirConditioner(String name) {
        super(name);
        this.temperature = 26.0;
    }

    @Override
    public void turnOn() {
        isOn = true;
        System.out.println("[" + name + "] 空调已开启，设定温度: " + temperature + "°C");
        mediator.notify(this, "turned_on");
    }

    @Override
    public void turnOff() {
        isOn = false;
        System.out.println("[" + name + "] 空调已关闭");
        mediator.notify(this, "turned_off");
    }

    public void setTemperature(double temp) {
        this.temperature = temp;
        if (isOn) {
            System.out.println("[" + name + "] 温度设定为: " + temp + "°C");
        }
    }

    @Override
    public void receive(String sender, String event) {
        switch (event) {
            case "mode_sleep":
                if (isOn) setTemperature(26.0);
                break;
            case "mode_away":
                if (isOn) turnOff();
                break;
            case "mode_home":
                if (!isOn) turnOn();
                break;
        }
    }
}

/**
 * Thermometer 是具体的同事类，代表温度计
 * 当温度超过阈值时通知中介者
 */
class Thermometer extends Colleague {
    private double currentTemp;
    private double threshold;

    public Thermometer(String name) {
        super(name);
        this.currentTemp = 25.0;
        this.threshold = 28.0;
    }

    @Override
    public void turnOn() {
        isOn = true;
        System.out.println("[" + name + "] 温度计已启动");
    }

    @Override
    public void turnOff() {
        isOn = false;
        System.out.println("[" + name + "] 温度计已关闭");
    }

    /**
     * 更新温度读数
     */
    public void updateTemperature(double temp) {
        this.currentTemp = temp;
        System.out.println("[" + name + "] 当前温度: " + temp + "°C");
        
        // 如果温度超过阈值，通知中介者
        if (isOn && temp > threshold) {
            mediator.notify(this, "temperature_high", temp);
        }
    }

    @Override
    public void receive(String sender, String event) {
        // 温度计只发送通知，不接收控制指令
    }
}

/**
 * MotionSensor 是具体的同事类，代表运动传感器
 */
class MotionSensor extends Colleague {
    public MotionSensor(String name) {
        super(name);
    }

    @Override
    public void turnOn() {
        isOn = true;
        System.out.println("[" + name + "] 运动传感器已启动");
    }

    @Override
    public void turnOff() {
        isOn = false;
        System.out.println("[" + name + "] 运动传感器已关闭");
    }

    /**
     * 检测运动
     */
    public void detectMotion() {
        if (isOn) {
            System.out.println("[" + name + "] 检测到运动！");
            mediator.notify(this, "motion_detected");
        }
    }

    @Override
    public void receive(String sender, String event) {
        // 传感器只发送通知，不接收控制指令
    }
}

// ==================== 客户端使用示例 ====================
public class Client {
    public static void main(String[] args) {
        System.out.println("========== 中介者模式示例：智能家居系统 ==========\\n");

        // 1. 创建中介者（智能家居中控）
        SmartHomeHub hub = new SmartHomeHub();

        // 2. 创建各种智能设备（同事）
        Light livingRoomLight = new Light("客厅灯");
        Light bedroomLight = new Light("卧室灯");
        TV tv = new TV("电视");
        AirConditioner ac = new AirConditioner("空调");
        Thermometer thermometer = new Thermometer("温度计");
        MotionSensor sensor = new MotionSensor("运动传感器");

        // 3. 注册设备到中控
        hub.register(livingRoomLight);
        hub.register(bedroomLight);
        hub.register(tv);
        hub.register(ac);
        hub.register(thermometer);
        hub.register(sensor);

        System.out.println("\\n--- 场景1：用户回家 ---");
        // 开启一些设备
        livingRoomLight.turnOn();
        ac.turnOn();
        sensor.turnOn();
        thermometer.turnOn();

        System.out.println("\\n--- 场景2：看电视 ---");
        tv.turnOn();

        System.out.println("\\n--- 场景3：温度升高 ---");
        thermometer.updateTemperature(30.0);

        System.out.println("\\n--- 场景4：检测运动 ---");
        sensor.detectMotion();

        System.out.println("\\n--- 场景5：关闭电视 ---");
        tv.turnOff();

        System.out.println("\\n--- 场景6：睡眠模式 ---");
        hub.notify(null, "set_mode", "sleep");

        System.out.println("\\n当前模式: " + hub.getCurrentMode());
    }
}`,

    go: `/**
 * 中介者模式 - Go 实现
 * 以航空管制系统为例：飞机通过塔台（中介者）协调起降
 */

package main

import (
	"fmt"
	"time"
)

// ==================== 中介者接口 ====================
/**
 * Mediator 接口定义了塔台与飞机通信的方法
 */
type Mediator interface {
	// Register 注册飞机到塔台
	Register(colleague Colleague)
	// Notify 通知塔台发生的事件
	Notify(sender Colleague, event string, data interface{})
	// GetRunwayStatus 获取跑道状态
	GetRunwayStatus() bool
}

// ==================== 同事接口 ====================
/**
 * Colleague 接口定义了飞机的基本行为
 * 每架飞机都通过塔台与其他飞机通信
 */
type Colleague interface {
	// SetMediator 设置中介者
	SetMediator(mediator Mediator)
	// GetName 获取飞机名称
	GetName() string
	// GetType 获取飞机类型
	GetType() string
	// Send 发送请求给塔台
	Send(event string, data interface{})
	// Receive 接收来自塔台的指令
	Receive(from string, message string)
}

// ==================== 基础同事结构体 ====================
/**
 * BaseColleague 提供了 Colleague 接口的基础实现
 */
type BaseColleague struct {
	mediator Mediator
	name     string
	planeType string
}

func (b *BaseColleague) SetMediator(mediator Mediator) {
	b.mediator = mediator
}

func (b *BaseColleague) GetName() string {
	return b.name
}

func (b *BaseColleague) GetType() string {
	return b.planeType
}

func (b *BaseColleague) Send(event string, data interface{}) {
	if b.mediator != nil {
		b.mediator.Notify(b, event, data)
	}
}

// ==================== 具体中介者 ====================
/**
 * ControlTower 是具体的中介者，代表航空管制塔台
 * 协调所有飞机的起降，管理跑道使用
 */
type ControlTower struct {
	// 注册的所有飞机
	planes []Colleague
	// 跑道是否被占用
	runwayOccupied bool
	// 当前使用跑道的飞机
	currentPlane string
	// 等待起飞的队列
	departureQueue []Colleague
	// 等待降落的队列
	arrivalQueue []Colleague
}

func NewControlTower() *ControlTower {
	return &ControlTower{
		planes:         make([]Colleague, 0),
		runwayOccupied: false,
		departureQueue: make([]Colleague, 0),
		arrivalQueue:   make([]Colleague, 0),
	}
}

func (t *ControlTower) Register(colleague Colleague) {
	t.planes = append(t.planes, colleague)
	colleague.SetMediator(t)
	fmt.Printf("[塔台] 飞机 '%s' (%s) 已注册到管制系统\\n", 
		colleague.GetName(), colleague.GetType())
}

func (t *ControlTower) Notify(sender Colleague, event string, data interface{}) {
	switch event {
	case "request_takeoff":
		t.handleTakeoffRequest(sender)
	case "request_landing":
		t.handleLandingRequest(sender)
	case "runway_cleared":
		t.handleRunwayCleared(sender)
	case "emergency":
		t.handleEmergency(sender, data)
	case "position_report":
		t.handlePositionReport(sender, data)
	default:
		fmt.Printf("[塔台] 收到未知事件 '%s' 来自 '%s'\\n", event, sender.GetName())
	}
}

func (t *ControlTower) GetRunwayStatus() bool {
	return t.runwayOccupied
}

/**
 * 处理起飞请求
 */
func (t *ControlTower) handleTakeoffRequest(plane Colleague) {
	fmt.Printf("[塔台] 收到 '%s' 的起飞请求\\n", plane.GetName())
	
	if !t.runwayOccupied {
		// 跑道空闲，批准起飞
		t.runwayOccupied = true
		t.currentPlane = plane.GetName()
		fmt.Printf("[塔台] 批准 '%s' 起飞，跑道已分配\\n", plane.GetName())
		plane.Receive("塔台", "起飞许可：请使用跑道，注意安全")
	} else {
		// 跑道被占用，加入等待队列
		t.departureQueue = append(t.departureQueue, plane)
		fmt.Printf("[塔台] 跑道被 '%s' 占用，'%s' 进入起飞等待队列（位置: %d）\\n",
			t.currentPlane, plane.GetName(), len(t.departureQueue))
		plane.Receive("塔台", "起飞请求已接收，请等待跑道空闲")
	}
}

/**
 * 处理降落请求
 */
func (t *ControlTower) handleLandingRequest(plane Colleague) {
	fmt.Printf("[塔台] 收到 '%s' 的降落请求\\n", plane.GetName())
	
	// 降落优先级高于起飞
	if !t.runwayOccupied {
		t.runwayOccupied = true
		t.currentPlane = plane.GetName()
		fmt.Printf("[塔台] 批准 '%s' 降落，跑道已分配\\n", plane.GetName())
		plane.Receive("塔台", "降落许可：请使用跑道，欢迎归来")
	} else {
		// 跑道被占用，加入等待队列
		t.arrivalQueue = append(t.arrivalQueue, plane)
		fmt.Printf("[塔台] 跑道被占用，'%s' 进入降落等待队列（位置: %d）\\n",
			plane.GetName(), len(t.arrivalQueue))
		plane.Receive("塔台", "降落请求已接收，请盘旋等待")
	}
}

/**
 * 处理跑道清理完成
 */
func (t *ControlTower) handleRunwayCleared(plane Colleague) {
	fmt.Printf("[塔台] '%s' 已离开跑道\\n", plane.GetName())
	t.runwayOccupied = false
	t.currentPlane = ""
	
	// 优先处理降落队列
	if len(t.arrivalQueue) > 0 {
		nextPlane := t.arrivalQueue[0]
		t.arrivalQueue = t.arrivalQueue[1:]
		t.runwayOccupied = true
		t.currentPlane = nextPlane.GetName()
		fmt.Printf("[塔台] 跑道空闲，优先安排 '%s' 降落\\n", nextPlane.GetName())
		nextPlane.Receive("塔台", "降落许可：跑道已清空，请降落")
	} else if len(t.departureQueue) > 0 {
		nextPlane := t.departureQueue[0]
		t.departureQueue = t.departureQueue[1:]
		t.runwayOccupied = true
		t.currentPlane = nextPlane.GetName()
		fmt.Printf("[塔台] 跑道空闲，安排 '%s' 起飞\\n", nextPlane.GetName())
		nextPlane.Receive("塔台", "起飞许可：跑道已清空，请起飞")
	} else {
		fmt.Println("[塔台] 跑道空闲，暂无等待的飞机")
	}
}

/**
 * 处理紧急情况
 */
func (t *ControlTower) handleEmergency(plane Colleague, data interface{}) {
	emergencyType := "未知"
	if data != nil {
		emergencyType = data.(string)
	}
	fmt.Printf("[塔台] 紧急情况！'%s' 报告: %s\\n", plane.GetName(), emergencyType)
	
	// 通知所有其他飞机避让
	for _, p := range t.planes {
		if p != plane {
			p.Receive("塔台紧急广播", fmt.Sprintf("'%s' 遇到紧急情况，请避让", plane.GetName()))
		}
	}
	
	// 如果是燃油紧急情况，立即清空跑道
	if emergencyType == "燃油不足" && t.runwayOccupied && t.currentPlane != plane.GetName() {
		fmt.Printf("[塔台] 燃油紧急情况！立即安排 '%s' 优先降落\\n", plane.GetName())
		// 通知当前占用跑道的飞机立即离开
		for _, p := range t.planes {
			if p.GetName() == t.currentPlane {
				p.Receive("塔台紧急指令", "有燃油紧急情况，请立即离开跑道")
				break
			}
		}
	}
}

/**
 * 处理位置报告
 */
func (t *ControlTower) handlePositionReport(plane Colleague, data interface{}) {
	position := "未知位置"
	if data != nil {
		position = data.(string)
	}
	fmt.Printf("[塔台] 收到 '%s' 位置报告: %s\\n", plane.GetName(), position)
}

// ==================== 具体同事类 ====================
/**
 * CommercialPlane 代表民航客机
 */
type CommercialPlane struct {
	BaseColleague
	airline     string
	passengers  int
	isFlying    bool
}

func NewCommercialPlane(name, airline string, passengers int) *CommercialPlane {
	return &CommercialPlane{
		BaseColleague: BaseColleague{
			name:      name,
			planeType: "民航客机",
		},
		airline:    airline,
		passengers: passengers,
		isFlying:   false,
	}
}

func (p *CommercialPlane) RequestTakeoff() {
	fmt.Printf("[%s] '%s' 航班请求起飞（载客%d人）\\n", p.airline, p.name, p.passengers)
	p.Send("request_takeoff", nil)
}

func (p *CommercialPlane) RequestLanding() {
	fmt.Printf("[%s] '%s' 航班请求降落\\n", p.airline, p.name)
	p.Send("request_landing", nil)
}

func (p *CommercialPlane) ClearRunway() {
	fmt.Printf("[%s] '%s' 已离开跑道\\n", p.airline, p.name)
	p.isFlying = true
	p.Send("runway_cleared", nil)
}

func (p *CommercialPlane) ReportEmergency(emergencyType string) {
	fmt.Printf("[%s] '%s' 报告紧急情况: %s\\n", p.airline, p.name, emergencyType)
	p.Send("emergency", emergencyType)
}

func (p *CommercialPlane) Receive(from string, message string) {
	fmt.Printf("[%s] '%s' 收到来自 '%s' 的消息: %s\\n", p.airline, p.name, from, message)
}

/**
 * CargoPlane 代表货运飞机
 */
type CargoPlane struct {
	BaseColleague
	company   string
	cargoWeight float64
}

func NewCargoPlane(name, company string, weight float64) *CargoPlane {
	return &CargoPlane{
		BaseColleague: BaseColleague{
			name:      name,
			planeType: "货运飞机",
		},
		company:     company,
		cargoWeight: weight,
	}
}

func (p *CargoPlane) RequestTakeoff() {
	fmt.Printf("[%s] '%s' 货机请求起飞（载货%.1f吨）\\n", p.company, p.name, p.cargoWeight)
	p.Send("request_takeoff", nil)
}

func (p *CargoPlane) RequestLanding() {
	fmt.Printf("[%s] '%s' 货机请求降落\\n", p.company, p.name)
	p.Send("request_landing", nil)
}

func (p *CargoPlane) ClearRunway() {
	fmt.Printf("[%s] '%s' 货机已离开跑道\\n", p.company, p.name)
	p.Send("runway_cleared", nil)
}

func (p *CargoPlane) Receive(from string, message string) {
	fmt.Printf("[%s] '%s' 收到来自 '%s' 的消息: %s\\n", p.company, p.name, from, message)
}

/**
 * PrivateJet 代表私人飞机
 */
type PrivateJet struct {
	BaseColleague
	owner string
}

func NewPrivateJet(name, owner string) *PrivateJet {
	return &PrivateJet{
		BaseColleague: BaseColleague{
			name:      name,
			planeType: "私人飞机",
		},
		owner: owner,
	}
}

func (p *PrivateJet) RequestTakeoff() {
	fmt.Printf("[私人] '%s' (%s的专机) 请求起飞\\n", p.name, p.owner)
	p.Send("request_takeoff", nil)
}

func (p *PrivateJet) RequestLanding() {
	fmt.Printf("[私人] '%s' (%s的专机) 请求降落\\n", p.name, p.owner)
	p.Send("request_landing", nil)
}

func (p *PrivateJet) ClearRunway() {
	fmt.Printf("[私人] '%s' 已离开跑道\\n", p.name)
	p.Send("runway_cleared", nil)
}

func (p *PrivateJet) Receive(from string, message string) {
	fmt.Printf("[私人] '%s' 收到来自 '%s' 的消息: %s\\n", p.name, from, message)
}

// ==================== 客户端使用示例 ====================
func main() {
	fmt.Println("========== 中介者模式示例：航空管制系统 ==========\\n")

	// 1. 创建中介者（塔台）
	tower := NewControlTower()

	// 2. 创建各种飞机（同事）
	plane1 := NewCommercialPlane("CA1234", "国航", 180)
	plane2 := NewCommercialPlane("MU5678", "东航", 220)
	cargo1 := NewCargoPlane("CK999", "顺丰航空", 45.5)
	private1 := NewPrivateJet("B-8888", "张总")

	// 3. 注册飞机到塔台
	tower.Register(plane1)
	tower.Register(plane2)
	tower.Register(cargo1)
	tower.Register(private1)

	fmt.Println("\\n--- 场景1：多架飞机请求起飞 ---")
	plane1.RequestTakeoff()
	plane2.RequestTakeoff()
	cargo1.RequestTakeoff()

	fmt.Println("\\n--- 场景2：飞机离开跑道 ---")
	time.Sleep(100 * time.Millisecond)
	plane1.ClearRunway()

	fmt.Println("\\n--- 场景3：私人飞机请求降落 ---")
	private1.RequestLanding()

	fmt.Println("\\n--- 场景4：紧急情况处理 ---")
	plane2.ReportEmergency("燃油不足")

	fmt.Println("\\n--- 场景5：飞机报告位置 ---")
	plane1.Send("position_report", "距离机场50公里，高度3000米")
}`,

    python: `"""
中介者模式 - Python 实现
以在线商城为例：买家、卖家、物流通过平台（中介者）协调交易
"""

from abc import ABC, abstractmethod
from typing import List, Dict, Optional, Any
from datetime import datetime


# ==================== 中介者抽象类 ====================
class Mediator(ABC):
    """
    Mediator 抽象类声明了组件用于通知中介者的方法
    具体中介者通过实现这些方法来协调各组件之间的交互
    """

    @abstractmethod
    def notify(self, sender: 'Colleague', event: str, data: Any = None) -> None:
        """
        通知中介者发生的事件
        
        Args:
            sender: 发送通知的组件
            event: 事件标识
            data: 可选的事件数据
        """
        pass

    @abstractmethod
    def register(self, colleague: 'Colleague') -> None:
        """
        注册同事对象到中介者
        
        Args:
            colleague: 要注册的同事对象
        """
        pass


# ==================== 同事抽象类 ====================
class Colleague(ABC):
    """
    Colleague 是各种组件的基类
    每个同事都知道它的中介者对象，并通过中介者与其他同事通信
    """

    def __init__(self, name: str):
        self._name = name
        self._mediator: Optional[Mediator] = None

    @property
    def name(self) -> str:
        """获取同事名称"""
        return self._name

    @property
    def mediator(self) -> Optional[Mediator]:
        """获取中介者引用"""
        return self._mediator

    @mediator.setter
    def mediator(self, mediator: Mediator) -> None:
        """设置中介者引用"""
        self._mediator = mediator

    def send(self, event: str, data: Any = None) -> None:
        """
        通过中介者发送事件
        
        Args:
            event: 事件标识
            data: 可选的事件数据
        """
        if self._mediator:
            self._mediator.notify(self, event, data)

    @abstractmethod
    def receive(self, sender: str, event: str, data: Any = None) -> None:
        """
        接收来自其他组件的通知
        
        Args:
            sender: 发送者名称
            event: 事件类型
            data: 事件数据
        """
        pass


# ==================== 具体中介者 ====================
class ECommercePlatform(Mediator):
    """
    ECommercePlatform 是具体的中介者，代表电商平台
    协调买家、卖家、物流之间的交易流程
    """

    def __init__(self, platform_name: str):
        self._platform_name = platform_name
        self._users: List[Colleague] = []
        self._orders: Dict[str, Dict[str, Any]] = {}
        self._order_counter = 0

    def register(self, colleague: Colleague) -> None:
        """注册用户到平台"""
        self._users.append(colleague)
        colleague.mediator = self
        print(f"[平台] 用户 '{colleague.name}' 已注册到 {self._platform_name}")

    def notify(self, sender: Colleague, event: str, data: Any = None) -> None:
        """处理来自用户的事件通知"""
        print(f"[平台] 收到 '{sender.name}' 的事件: {event}")

        if event == "place_order":
            self._handle_place_order(sender, data)
        elif event == "confirm_payment":
            self._handle_payment_confirmation(sender, data)
        elif event == "ship_order":
            self._handle_ship_order(sender, data)
        elif event == "confirm_delivery":
            self._handle_delivery_confirmation(sender, data)
        elif event == "request_refund":
            self._handle_refund_request(sender, data)
        elif event == "update_inventory":
            self._broadcast_to_buyers(sender, data)
        else:
            print(f"[平台] 未知事件类型: {event}")

    def _generate_order_id(self) -> str:
        """生成订单号"""
        self._order_counter += 1
        timestamp = datetime.now().strftime("%Y%m%d")
        return f"ORD{timestamp}{self._order_counter:04d}"

    def _handle_place_order(self, buyer: Colleague, data: Dict[str, Any]) -> None:
        """处理下单事件"""
        seller_name = data.get("seller")
        product = data.get("product")
        quantity = data.get("quantity", 1)
        
        order_id = self._generate_order_id()
        self._orders[order_id] = {
            "buyer": buyer.name,
            "seller": seller_name,
            "product": product,
            "quantity": quantity,
            "status": "待付款",
            "created_at": datetime.now()
        }
        
        print(f"[平台] 订单 {order_id} 创建成功")
        print(f"      买家: {buyer.name}, 卖家: {seller_name}, 商品: {product} x{quantity}")
        
        # 通知买家订单创建成功
        buyer.receive("平台", "order_created", {"order_id": order_id, "status": "待付款"})
        
        # 通知卖家有新订单
        for user in self._users:
            if user.name == seller_name:
                user.receive(buyer.name, "new_order", {
                    "order_id": order_id,
                    "product": product,
                    "quantity": quantity
                })
                break

    def _handle_payment_confirmation(self, buyer: Colleague, data: Dict[str, Any]) -> None:
        """处理付款确认事件"""
        order_id = data.get("order_id")
        amount = data.get("amount")
        
        if order_id in self._orders:
            self._orders[order_id]["status"] = "已付款"
            self._orders[order_id]["paid_amount"] = amount
            print(f"[平台] 订单 {order_id} 付款成功，金额: ¥{amount}")
            
            # 通知买家付款成功
            buyer.receive("平台", "payment_success", {"order_id": order_id})
            
            # 通知卖家准备发货
            seller_name = self._orders[order_id]["seller"]
            for user in self._users:
                if user.name == seller_name:
                    user.receive(buyer.name, "prepare_shipment", {
                        "order_id": order_id,
                        "product": self._orders[order_id]["product"]
                    })
                    break

    def _handle_ship_order(self, seller: Colleague, data: Dict[str, Any]) -> None:
        """处理发货事件"""
        order_id = data.get("order_id")
        tracking_number = data.get("tracking_number")
        logistics_company = data.get("logistics_company")
        
        if order_id in self._orders:
            self._orders[order_id]["status"] = "已发货"
            self._orders[order_id]["tracking_number"] = tracking_number
            print(f"[平台] 订单 {order_id} 已发货")
            print(f"      物流公司: {logistics_company}, 运单号: {tracking_number}")
            
            # 通知买家商品已发货
            buyer_name = self._orders[order_id]["buyer"]
            for user in self._users:
                if user.name == buyer_name:
                    user.receive(seller.name, "order_shipped", {
                        "order_id": order_id,
                        "tracking_number": tracking_number,
                        "logistics_company": logistics_company
                    })
                    break
            
            # 通知物流公司接单
            for user in self._users:
                if isinstance(user, LogisticsCompany):
                    if user.name == logistics_company:
                        user.receive(seller.name, "pickup_request", {
                            "order_id": order_id,
                            "from": seller.name,
                            "to": buyer_name
                        })

    def _handle_delivery_confirmation(self, buyer: Colleague, data: Dict[str, Any]) -> None:
        """处理确认收货事件"""
        order_id = data.get("order_id")
        
        if order_id in self._orders:
            self._orders[order_id]["status"] = "已完成"
            print(f"[平台] 订单 {order_id} 已确认收货，交易完成")
            
            # 通知卖家交易完成
            seller_name = self._orders[order_id]["seller"]
            for user in self._users:
                if user.name == seller_name:
                    user.receive(buyer.name, "transaction_complete", {"order_id": order_id})
                    break

    def _handle_refund_request(self, buyer: Colleague, data: Dict[str, Any]) -> None:
        """处理退款请求"""
        order_id = data.get("order_id")
        reason = data.get("reason")
        
        if order_id in self._orders:
            print(f"[平台] 订单 {order_id} 申请退款，原因: {reason}")
            
            # 通知卖家处理退款
            seller_name = self._orders[order_id]["seller"]
            for user in self._users:
                if user.name == seller_name:
                    user.receive(buyer.name, "refund_request", {
                        "order_id": order_id,
                        "reason": reason
                    })
                    break

    def _broadcast_to_buyers(self, seller: Colleague, data: Any) -> None:
        """向所有买家广播消息"""
        for user in self._users:
            if isinstance(user, Buyer):
                user.receive(seller.name, "seller_update", data)

    def get_order_status(self, order_id: str) -> Optional[str]:
        """获取订单状态"""
        if order_id in self._orders:
            return self._orders[order_id]["status"]
        return None


# ==================== 具体同事类 ====================
class Buyer(Colleague):
    """
    Buyer 是具体的同事类，代表买家
    """

    def __init__(self, name: str, balance: float = 10000.0):
        super().__init__(name)
        self._balance = balance
        self._cart: List[Dict[str, Any]] = []
        self._orders: List[str] = []

    @property
    def balance(self) -> float:
        return self._balance

    def add_to_cart(self, product: str, seller: str, price: float, quantity: int = 1) -> None:
        """添加商品到购物车"""
        self._cart.append({
            "product": product,
            "seller": seller,
            "price": price,
            "quantity": quantity
        })
        print(f"[买家-{self.name}] 已将 {product} x{quantity} 加入购物车")

    def place_order(self, product: str, seller: str, quantity: int = 1) -> None:
        """下单"""
        print(f"[买家-{self.name}] 向 '{seller}' 下单购买 {product} x{quantity}")
        self.send("place_order", {
            "seller": seller,
            "product": product,
            "quantity": quantity
        })

    def pay(self, order_id: str, amount: float) -> None:
        """付款"""
        if self._balance >= amount:
            self._balance -= amount
            print(f"[买家-{self.name}] 支付订单 {order_id}，金额: ¥{amount}")
            self.send("confirm_payment", {"order_id": order_id, "amount": amount})
        else:
            print(f"[买家-{self.name}] 余额不足，无法支付")

    def confirm_delivery(self, order_id: str) -> None:
        """确认收货"""
        print(f"[买家-{self.name}] 确认收货，订单: {order_id}")
        self.send("confirm_delivery", {"order_id": order_id})

    def request_refund(self, order_id: str, reason: str) -> None:
        """申请退款"""
        print(f"[买家-{self.name}] 申请退款，订单: {order_id}，原因: {reason}")
        self.send("request_refund", {"order_id": order_id, "reason": reason})

    def receive(self, sender: str, event: str, data: Any = None) -> None:
        """接收通知"""
        if event == "order_created":
            order_id = data.get("order_id")
            self._orders.append(order_id)
            print(f"[买家-{self.name}] 收到订单确认，订单号: {order_id}")
        elif event == "payment_success":
            print(f"[买家-{self.name}] 付款成功，订单: {data.get('order_id')}")
        elif event == "order_shipped":
            print(f"[买家-{self.name}] 商品已发货！")
            print(f"           物流公司: {data.get('logistics_company')}")
            print(f"           运单号: {data.get('tracking_number')}")
        elif event == "seller_update":
            print(f"[买家-{self.name}] 收到卖家 '{sender}' 的更新: {data}")
        else:
            print(f"[买家-{self.name}] 收到来自 '{sender}' 的消息 [{event}]: {data}")


class Seller(Colleague):
    """
    Seller 是具体的同事类，代表卖家
    """

    def __init__(self, name: str, shop_name: str):
        super().__init__(name)
        self._shop_name = shop_name
        self._inventory: Dict[str, int] = {}
        self._pending_orders: List[str] = []

    @property
    def shop_name(self) -> str:
        return self._shop_name

    def add_inventory(self, product: str, quantity: int) -> None:
        """添加库存"""
        self._inventory[product] = self._inventory.get(product, 0) + quantity
        print(f"[卖家-{self.name}] 店铺 '{self._shop_name}' 添加库存: {product} +{quantity}")
        # 通知平台库存更新
        self.send("update_inventory", {"product": product, "quantity": self._inventory[product]})

    def ship_order(self, order_id: str, logistics_company: str) -> None:
        """发货"""
        tracking_number = f"SF{datetime.now().strftime('%Y%m%d%H%M%S')}"
        print(f"[卖家-{self.name}] 订单 {order_id} 已发货")
        print(f"           物流公司: {logistics_company}, 运单号: {tracking_number}")
        self.send("ship_order", {
            "order_id": order_id,
            "tracking_number": tracking_number,
            "logistics_company": logistics_company
        })

    def approve_refund(self, order_id: str) -> None:
        """同意退款"""
        print(f"[卖家-{self.name}] 同意订单 {order_id} 的退款申请")

    def receive(self, sender: str, event: str, data: Any = None) -> None:
        """接收通知"""
        if event == "new_order":
            order_id = data.get("order_id")
            self._pending_orders.append(order_id)
            print(f"[卖家-{self.name}] 收到新订单！")
            print(f"           订单号: {order_id}")
            print(f"           商品: {data.get('product')} x{data.get('quantity')}")
        elif event == "prepare_shipment":
            print(f"[卖家-{self.name}] 买家已付款，请准备发货。订单: {data.get('order_id')}")
        elif event == "transaction_complete":
            print(f"[卖家-{self.name}] 订单 {data.get('order_id')} 交易完成，货款已到账")
        elif event == "refund_request":
            print(f"[卖家-{self.name}] 收到退款申请")
            print(f"           订单: {data.get('order_id')}")
            print(f"           原因: {data.get('reason')}")
        else:
            print(f"[卖家-{self.name}] 收到来自 '{sender}' 的消息 [{event}]: {data}")


class LogisticsCompany(Colleague):
    """
    LogisticsCompany 是具体的同事类，代表物流公司
    """

    def __init__(self, name: str):
        super().__init__(name)
        self._active_deliveries: List[Dict[str, Any]] = []

    def pickup_package(self, order_id: str, from_seller: str, to_buyer: str) -> None:
        """揽件"""
        print(f"[物流-{self.name}] 揽件成功，订单: {order_id}")
        print(f"           从: {from_seller} -> 到: {to_buyer}")
        self._active_deliveries.append({
            "order_id": order_id,
            "from": from_seller,
            "to": to_buyer,
            "status": "运输中"
        })

    def deliver_package(self, order_id: str) -> None:
        """送达包裹"""
        for delivery in self._active_deliveries:
            if delivery["order_id"] == order_id:
                delivery["status"] = "已送达"
                print(f"[物流-{self.name}] 订单 {order_id} 已送达")
                break

    def receive(self, sender: str, event: str, data: Any = None) -> None:
        """接收通知"""
        if event == "pickup_request":
            order_id = data.get("order_id")
            from_seller = data.get("from")
            to_buyer = data.get("to")
            self.pickup_package(order_id, from_seller, to_buyer)
        else:
            print(f"[物流-{self.name}] 收到来自 '{sender}' 的消息 [{event}]: {data}")


# ==================== 客户端使用示例 ====================
def client_code():
    print("========== 中介者模式示例：电商平台 ==========\\n")

    # 1. 创建中介者（电商平台）
    platform = ECommercePlatform("淘宝")

    # 2. 创建用户（同事）
    buyer = Buyer("小明", balance=5000.0)
    seller = Seller("老王", "数码专营店")
    logistics = LogisticsCompany("顺丰速运")

    # 3. 注册用户到平台
    platform.register(buyer)
    platform.register(seller)
    platform.register(logistics)

    print("\\n--- 场景1：卖家上架商品 ---")
    seller.add_inventory("iPhone 15", 10)
    seller.add_inventory("MacBook Pro", 5)

    print("\\n--- 场景2：买家下单 ---")
    buyer.place_order("iPhone 15", "老王", quantity=1)

    print("\\n--- 场景3：买家付款 ---")
    buyer.pay("ORD202504050001", 5999.0)

    print("\\n--- 场景4：卖家发货 ---")
    seller.ship_order("ORD202504050001", "顺丰速运")

    print("\\n--- 场景5：买家确认收货 ---")
    buyer.confirm_delivery("ORD202504050001")

    print("\\n--- 场景6：另一个交易流程（退款）---")
    buyer2 = Buyer("小红", balance=3000.0)
    platform.register(buyer2)
    
    buyer2.place_order("MacBook Pro", "老王")
    buyer2.request_refund("ORD202504050002", "商品与描述不符")

    print(f"\\n订单 ORD202504050001 状态: {platform.get_order_status('ORD202504050001')}")
    print(f"订单 ORD202504050002 状态: {platform.get_order_status('ORD202504050002')}")


if __name__ == "__main__":
    client_code()`,

    cpp: `/**
 * 中介者模式 - C++ 实现
 * 以GUI组件协调为例：各种UI组件通过对话框（中介者）协调交互
 */

#include <iostream>
#include <string>
#include <vector>
#include <memory>
#include <algorithm>

// 前向声明
class Colleague;

// ==================== 中介者接口 ====================
/**
 * Mediator 接口声明了组件用于通知中介者的方法
 * 中介者通过这些方法来协调各组件之间的交互
 */
class Mediator {
public:
    virtual ~Mediator() = default;
    
    /**
     * 通知中介者发生的事件
     * @param sender 发送通知的组件
     * @param event 事件标识
     */
    virtual void notify(Colleague* sender, const std::string& event) = 0;
    
    /**
     * 通知中介者发生的事件（带数据）
     * @param sender 发送通知的组件
     * @param event 事件标识
     * @param data 事件数据
     */
    virtual void notify(Colleague* sender, const std::string& event, const std::string& data) = 0;
    
    /**
     * 注册同事对象
     * @param colleague 要注册的同事
     */
    virtual void registerColleague(Colleague* colleague) = 0;
};

// ==================== 同事类 ====================
/**
 * Colleague 是各种UI组件的基类
 * 每个组件都通过中介者与其他组件通信
 */
class Colleague {
protected:
    Mediator* mediator;
    std::string name;
    bool enabled;

public:
    Colleague(const std::string& name) : mediator(nullptr), name(name), enabled(true) {}
    virtual ~Colleague() = default;

    /**
     * 设置中介者引用
     */
    void setMediator(Mediator* m) {
        mediator = m;
    }

    /**
     * 获取组件名称
     */
    std::string getName() const {
        return name;
    }

    /**
     * 检查组件是否启用
     */
    bool isEnabled() const {
        return enabled;
    }

    /**
     * 设置组件启用状态
     */
    void setEnabled(bool state) {
        enabled = state;
        if (enabled) {
            std::cout << "[" << name << "] 已启用" << std::endl;
        } else {
            std::cout << "[" << name << "] 已禁用" << std::endl;
        }
    }

    /**
     * 发送事件通知给中介者
     */
    void send(const std::string& event) {
        if (mediator) {
            mediator->notify(this, event);
        }
    }

    void send(const std::string& event, const std::string& data) {
        if (mediator) {
            mediator->notify(this, event, data);
        }
    }

    /**
     * 接收来自中介者的通知
     * @param sender 发送者名称
     * @param event 事件类型
     */
    virtual void receive(const std::string& sender, const std::string& event) = 0;
    
    /**
     * 接收来自中介者的通知（带数据）
     */
    virtual void receive(const std::string& sender, const std::string& event, const std::string& data) = 0;
};

// ==================== 具体中介者 ====================
/**
 * LoginDialog 是具体的中介者，代表登录对话框
 * 协调用户名输入框、密码输入框、记住我复选框、登录按钮等组件
 */
class LoginDialog : public Mediator {
private:
    std::vector<Colleague*> components;
    std::string title;
    bool isLoggedIn;

public:
    LoginDialog(const std::string& title) : title(title), isLoggedIn(false) {}

    void registerColleague(Colleague* colleague) override {
        components.push_back(colleague);
        colleague->setMediator(this);
        std::cout << "[对话框] 组件 '" << colleague->getName() << "' 已注册到 '" << title << "'" << std::endl;
    }

    void notify(Colleague* sender, const std::string& event) override {
        notify(sender, event, "");
    }

    void notify(Colleague* sender, const std::string& event, const std::string& data) override {
        std::cout << "[对话框] 收到 '" << sender->getName() << "' 的事件: " << event << std::endl;

        if (event == "text_changed") {
            handleTextChanged(sender, data);
        } else if (event == "checkbox_changed") {
            handleCheckboxChanged(sender, data);
        } else if (event == "button_clicked") {
            handleButtonClicked(sender);
        } else if (event == "selection_changed") {
            handleSelectionChanged(sender, data);
        }
    }

private:
    /**
     * 处理文本变化事件
     * 根据用户名和密码是否输入来决定是否启用登录按钮
     */
    void handleTextChanged(Colleague* sender, const std::string& data) {
        std::string senderName = sender->getName();
        
        if (senderName == "用户名输入框") {
            std::cout << "[对话框] 用户名已输入: " << data << std::endl;
        } else if (senderName == "密码输入框") {
            std::cout << "[对话框] 密码已输入 (长度: " << data.length() << ")" << std::endl;
        }

        // 检查是否所有必填字段都已填写
        updateLoginButtonState();
    }

    /**
     * 处理复选框变化事件
     */
    void handleCheckboxChanged(Colleague* sender, const std::string& data) {
        if (sender->getName() == "记住我复选框") {
            bool checked = (data == "checked");
            std::cout << "[对话框] 记住我选项已" << (checked ? "勾选" : "取消") << std::endl;
        }
    }

    /**
     * 处理按钮点击事件
     */
    void handleButtonClicked(Colleague* sender) {
        std::string senderName = sender->getName();
        
        if (senderName == "登录按钮") {
            performLogin();
        } else if (senderName == "取消按钮") {
            std::cout << "[对话框] 用户取消登录" << std::endl;
        } else if (senderName == "注册按钮") {
            std::cout << "[对话框] 切换到注册页面" << std::endl;
            switchToRegisterMode();
        }
    }

    /**
     * 处理选择变化事件
     */
    void handleSelectionChanged(Colleague* sender, const std::string& data) {
        if (sender->getName() == "登录方式选择") {
            std::cout << "[对话框] 登录方式切换为: " << data << std::endl;
            updateUIForLoginMethod(data);
        }
    }

    /**
     * 更新登录按钮状态
     */
    void updateLoginButtonState() {
        bool canLogin = checkCanLogin();
        
        for (auto* component : components) {
            if (component->getName() == "登录按钮") {
                component->setEnabled(canLogin);
                break;
            }
        }
    }

    /**
     * 检查是否可以登录
     */
    bool checkCanLogin() {
        bool hasUsername = false;
        bool hasPassword = false;
        
        for (auto* component : components) {
            // 这里简化处理，实际应该查询组件的值
            if (component->getName() == "用户名输入框" && component->isEnabled()) {
                hasUsername = true;  // 简化：假设有值
            }
            if (component->getName() == "密码输入框" && component->isEnabled()) {
                hasPassword = true;  // 简化：假设有值
            }
        }
        
        return hasUsername && hasPassword;
    }

    /**
     * 执行登录
     */
    void performLogin() {
        std::cout << "[对话框] 正在执行登录验证..." << std::endl;
        
        // 显示加载状态
        for (auto* component : components) {
            if (component->getName() == "登录按钮") {
                component->setEnabled(false);
            }
        }
        
        // 模拟登录验证
        std::cout << "[对话框] 登录成功！" << std::endl;
        isLoggedIn = true;
        
        // 通知所有组件登录成功
        for (auto* component : components) {
            component->receive("对话框", "login_success");
        }
    }

    /**
     * 切换到注册模式
     */
    void switchToRegisterMode() {
        // 显示确认密码输入框
        for (auto* component : components) {
            if (component->getName() == "确认密码输入框") {
                component->setEnabled(true);
            }
            if (component->getName() == "登录按钮") {
                // 更新按钮文本为"注册"
                std::cout << "[对话框] 登录按钮文本更新为'注册'" << std::endl;
            }
        }
    }

    /**
     * 根据登录方式更新UI
     */
    void updateUIForLoginMethod(const std::string& method) {
        if (method == "手机号") {
            // 隐藏密码输入框，显示验证码输入框
            for (auto* component : components) {
                if (component->getName() == "密码输入框") {
                    component->setEnabled(false);
                }
                if (component->getName() == "验证码输入框") {
                    component->setEnabled(true);
                }
            }
        } else if (method == "账号密码") {
            for (auto* component : components) {
                if (component->getName() == "密码输入框") {
                    component->setEnabled(true);
                }
                if (component->getName() == "验证码输入框") {
                    component->setEnabled(false);
                }
            }
        }
    }
};

// ==================== 具体同事类 ====================
/**
 * TextBox 代表文本输入框组件
 */
class TextBox : public Colleague {
private:
    std::string text;
    std::string placeholder;

public:
    TextBox(const std::string& name, const std::string& placeholder = "") 
        : Colleague(name), placeholder(placeholder) {}

    /**
     * 设置文本内容
     */
    void setText(const std::string& newText) {
        text = newText;
        std::cout << "[" << name << "] 内容更新: " << text << std::endl;
        send("text_changed", text);
    }

    std::string getText() const {
        return text;
    }

    void receive(const std::string& sender, const std::string& event) override {
        if (event == "login_success") {
            std::cout << "[" << name << "] 收到登录成功通知，准备清空输入" << std::endl;
            text = "";
        } else if (event == "clear") {
            text = "";
            std::cout << "[" << name << "] 已清空" << std::endl;
        }
    }

    void receive(const std::string& sender, const std::string& event, const std::string& data) override {
        receive(sender, event);
    }
};

/**
 * CheckBox 代表复选框组件
 */
class CheckBox : public Colleague {
private:
    bool checked;

public:
    CheckBox(const std::string& name) : Colleague(name), checked(false) {}

    /**
     * 设置选中状态
     */
    void setChecked(bool state) {
        checked = state;
        std::cout << "[" << name << "] 状态更新为: " << (checked ? "选中" : "未选中") << std::endl;
        send("checkbox_changed", checked ? "checked" : "unchecked");
    }

    bool isChecked() const {
        return checked;
    }

    void receive(const std::string& sender, const std::string& event) override {
        if (event == "disable") {
            setEnabled(false);
        } else if (event == "enable") {
            setEnabled(true);
        }
    }

    void receive(const std::string& sender, const std::string& event, const std::string& data) override {
        receive(sender, event);
    }
};

/**
 * Button 代表按钮组件
 */
class Button : public Colleague {
private:
    std::string label;

public:
    Button(const std::string& name, const std::string& label) 
        : Colleague(name), label(label) {}

    /**
     * 模拟点击按钮
     */
    void click() {
        if (!enabled) {
            std::cout << "[" << name << "] 按钮已禁用，无法点击" << std::endl;
            return;
        }
        std::cout << "[" << name << "] 被点击" << std::endl;
        send("button_clicked");
    }

    void setLabel(const std::string& newLabel) {
        label = newLabel;
        std::cout << "[" << name << "] 标签更新为: " << label << std::endl;
    }

    void receive(const std::string& sender, const std::string& event) override {
        if (event == "login_success") {
            std::cout << "[" << name << "] 登录成功，按钮状态更新" << std::endl;
        }
    }

    void receive(const std::string& sender, const std::string& event, const std::string& data) override {
        receive(sender, event);
    }
};

/**
 * ComboBox 代表下拉选择框组件
 */
class ComboBox : public Colleague {
private:
    std::vector<std::string> options;
    int selectedIndex;

public:
    ComboBox(const std::string& name) : Colleague(name), selectedIndex(0) {}

    void addOption(const std::string& option) {
        options.push_back(option);
    }

    void select(int index) {
        if (index >= 0 && index < options.size()) {
            selectedIndex = index;
            std::cout << "[" << name << "] 选择更新为: " << options[selectedIndex] << std::endl;
            send("selection_changed", options[selectedIndex]);
        }
    }

    std::string getSelected() const {
        if (selectedIndex >= 0 && selectedIndex < options.size()) {
            return options[selectedIndex];
        }
        return "";
    }

    void receive(const std::string& sender, const std::string& event) override {
        // ComboBox 通常不接收通知
    }

    void receive(const std::string& sender, const std::string& event, const std::string& data) override {
        receive(sender, event);
    }
};

// ==================== 客户端使用示例 ====================
int main() {
    std::cout << "========== 中介者模式示例：登录对话框 ==========" << std::endl << std::endl;

    // 1. 创建中介者（登录对话框）
    LoginDialog dialog("用户登录");

    // 2. 创建各种UI组件（同事）
    TextBox usernameInput("用户名输入框", "请输入用户名");
    TextBox passwordInput("密码输入框", "请输入密码");
    TextBox confirmPasswordInput("确认密码输入框", "请确认密码");
    CheckBox rememberMeCheckbox("记住我复选框");
    Button loginButton("登录按钮", "登录");
    Button cancelButton("取消按钮", "取消");
    Button registerButton("注册按钮", "注册");
    ComboBox loginMethodCombo("登录方式选择");

    // 3. 配置下拉框选项
    loginMethodCombo.addOption("账号密码");
    loginMethodCombo.addOption("手机号");

    // 4. 注册组件到对话框
    dialog.registerColleague(&usernameInput);
    dialog.registerColleague(&passwordInput);
    dialog.registerColleague(&confirmPasswordInput);
    dialog.registerColleague(&rememberMeCheckbox);
    dialog.registerColleague(&loginButton);
    dialog.registerColleague(&cancelButton);
    dialog.registerColleague(&registerButton);
    dialog.registerColleague(&loginMethodCombo);

    // 初始状态：禁用确认密码输入框
    confirmPasswordInput.setEnabled(false);

    std::cout << std::endl << "--- 场景1：用户输入用户名 ---" << std::endl;
    usernameInput.setText("zhangsan");

    std::cout << std::endl << "--- 场景2：用户输入密码 ---" << std::endl;
    passwordInput.setText("password123");

    std::cout << std::endl << "--- 场景3：勾选记住我 ---" << std::endl;
    rememberMeCheckbox.setChecked(true);

    std::cout << std::endl << "--- 场景4：点击登录按钮 ---" << std::endl;
    loginButton.click();

    std::cout << std::endl << "--- 场景5：切换登录方式 ---" << std::endl;
    loginMethodCombo.select(1);  // 切换到手机号登录

    std::cout << std::endl << "--- 场景6：点击注册按钮 ---" << std::endl;
    registerButton.click();

    std::cout << std::endl << "--- 场景7：点击取消按钮 ---" << std::endl;
    cancelButton.click();

    return 0;
}`,
  },
  realWorldExamples: [
    {
      title: 'Java Message Queue',
      description: '消息队列是中介者模式的典型应用，生产者消费者通过队列通信。',
      source: 'Java EE',
      codeSnippet: 'jmsTemplate.convertAndSend("queue", message);',
    },
    {
      title: 'MVC 架构中的控制器',
      description: 'MVC 模式中的 Controller 充当视图和模型之间的中介者，协调数据流。',
      source: 'MVC Frameworks',
      codeSnippet: `@Controller
public class UserController {
    @Autowired
    private UserService userService;
    
    @GetMapping("/users")
    public String listUsers(Model model) {
        model.addAttribute("users", userService.findAll());
        return "user/list";
    }
}`,
    },
    {
      title: '聊天服务器',
      description: '即时通讯应用中的服务器作为中介者，转发用户之间的消息。',
      source: 'Chat Applications',
      codeSnippet: `socket.on('message', (data) => {
    io.to(data.room).emit('message', data);
});`,
    },
  ],
  relatedPatterns: ['observer', 'facade', 'command'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '中介者模式的主要目的是什么？',
      options: ['创建对象', '封装对象交互', '优化性能', '转换接口'],
      correctAnswer: 1,
      explanation: '中介者模式的主要目的是用一个中介对象来封装一系列的对象交互，使各对象不需要显式地相互引用。',
    },
    {
      id: 'q2',
      type: 'boolean',
      question: '中介者模式会增加对象之间的耦合度',
      options: ['正确', '错误'],
      correctAnswer: 1,
      explanation: '错误。中介者模式实际上是降低对象之间的耦合度，让对象通过中介者间接通信，而不是直接相互引用。',
    },
    {
      id: 'q3',
      type: 'single',
      question: '中介者模式可能带来的问题是什么？',
      options: ['代码难以维护', '中介者可能演化成上帝对象', '性能严重下降', '不支持多线程'],
      correctAnswer: 1,
      explanation: '中介者模式的主要缺点是随着时间推移，中介者可能会变得过于复杂，演化成上帝对象（God Object），承担过多职责。',
    },
  ],
};