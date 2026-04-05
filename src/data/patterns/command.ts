import type { DesignPattern } from '@/types/pattern';

export const commandPattern: DesignPattern = {
  id: 'command',
  name: '命令模式',
  nameEn: 'Command Pattern',
  category: 'behavioral',
  difficulty: 'medium',
  frequency: 'medium',
  intent: '将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化；对请求排队或记录请求日志，以及支持可撤销的操作。',
  description: '命令模式是一种行为设计模式，它可将请求转换为一个包含与请求相关的所有信息的独立对象。此转换让你能根据不同的请求将方法参数化、延迟请求执行或将其放入队列中，且能实现可撤销操作。',
  applicability: [
    '当需要通过操作来参数化对象时',
    '当需要将操作放入队列中、延迟执行或远程执行时',
    '当需要实现操作回滚功能时',
    '当需要实现宏命令（组合多个命令）时',
    '当需要记录操作历史以便撤销/重做时',
  ],
  pros: [
    '单一职责原则：将触发操作的对象与执行操作的对象解耦',
    '开闭原则：可以在不更改现有代码的情况下引入新命令',
    '可以实现撤销和重做',
    '可以实现操作的延迟执行',
    '可以将多个命令组合成宏命令',
  ],
  cons: [
    '代码可能会变得更加复杂，因为需要引入许多新的类',
    '每个具体命令都需要创建一个类，可能导致类数量膨胀',
  ],
  analogy: {
    title: '现实世界中的命令',
    description: '命令模式就像是餐厅点餐系统',
    scenarios: [
      {
        id: 'order',
        title: '餐厅点餐',
        description: '服务员接受你的订单（命令），将其放入队列，厨师按顺序执行。你可以取消订单（撤销），也可以要求重做（重做）。',
        icon: 'Clipboard',
      },
      {
        id: 'remote',
        title: '遥控器',
        description: '电视遥控器上的每个按钮都是一个命令。按"开"按钮发送开灯命令，按"关"按钮发送关灯命令，还可以有"撤销"按钮撤销上一步操作。',
        icon: 'Remote',
      },
      {
        id: 'text-editor',
        title: '文本编辑器',
        description: '文本编辑器中的撤销/重做功能就是命令模式的典型应用。每次编辑操作都被封装为命令并保存到历史记录中。',
        icon: 'FileEdit',
      },
    ],
  },
  structure: {
    classDiagram: '',
    mermaidDiagram: `
classDiagram
  class Command {
    <<interface>>
    +execute()
    +undo()
  }

  class ConcreteCommand {
    -receiver: Receiver
    -state: any
    +execute()
    +undo()
  }

  class Invoker {
    -commandHistory: Command[]
    -currentCommand: Command
    +setCommand(cmd: Command)
    +executeCommand()
    +undoCommand()
    +redoCommand()
  }

  class Receiver {
    -state: any
    +action()
    +undoAction()
    +getState()
  }

  class Client {
    +main()
  }

  Command <|.. ConcreteCommand : implements
  ConcreteCommand --> Receiver : uses
  Invoker o--> Command : stores
  Client ..> Invoker : uses
  Client ..> Receiver : creates

  style Command fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style ConcreteCommand fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
  style Invoker fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style Receiver fill:#fce4ec,stroke:#c2185b,stroke-width:2px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: '命令接口',
        description: '定义命令接口，声明 execute() 和 undo() 方法',
        duration: 2000,
        elements: [
          { id: 'command', type: 'interface', name: 'Command', x: 200, y: 150, methods: ['+execute()', '+undo()'] },
        ],
      },
      {
        id: 'step2',
        title: '接收者',
        description: '接收者知道如何执行具体的业务逻辑',
        duration: 2000,
        elements: [
          { id: 'command', type: 'interface', name: 'Command', x: 200, y: 150, methods: ['+execute()', '+undo()'] },
          { id: 'receiver', type: 'class', name: 'Receiver', x: 450, y: 150, methods: ['+action()', '+undoAction()'] },
        ],
      },
      {
        id: 'step3',
        title: '具体命令',
        description: '具体命令封装接收者，调用接收者的方法',
        duration: 2000,
        elements: [
          { id: 'command', type: 'interface', name: 'Command', x: 200, y: 150, methods: ['+execute()', '+undo()'] },
          { id: 'receiver', type: 'class', name: 'Receiver', x: 450, y: 150, methods: ['+action()', '+undoAction()'] },
          { id: 'concrete', type: 'class', name: 'ConcreteCommand', x: 200, y: 350, properties: ['-receiver: Receiver'], methods: ['+execute()', '+undo()'] },
        ],
        connections: [
          { from: 'concrete', to: 'command', type: 'implementation' },
          { from: 'concrete', to: 'receiver', type: 'association' },
        ],
      },
      {
        id: 'step4',
        title: '调用者',
        description: '调用者持有命令，并在适当时机触发执行',
        duration: 3000,
        elements: [
          { id: 'command', type: 'interface', name: 'Command', x: 200, y: 150, methods: ['+execute()', '+undo()'] },
          { id: 'receiver', type: 'class', name: 'Receiver', x: 450, y: 150, methods: ['+action()', '+undoAction()'] },
          { id: 'concrete', type: 'class', name: 'ConcreteCommand', x: 200, y: 350, properties: ['-receiver: Receiver'], methods: ['+execute()', '+undo()'] },
          { id: 'invoker', type: 'class', name: 'Invoker', x: 450, y: 350, properties: ['-commandHistory: Command[]', '-currentCommand: Command'], methods: ['+setCommand()', '+executeCommand()', '+undoCommand()'] },
        ],
        connections: [
          { from: 'concrete', to: 'command', type: 'implementation' },
          { from: 'concrete', to: 'receiver', type: 'association' },
          { from: 'invoker', to: 'command', type: 'association' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * 命令模式 - TypeScript 实现
 * 以智能家居遥控器为例，控制灯光和空调
 */

// ============================================
// 1. 命令接口 (Command)
// ============================================
interface Command {
  /** 执行命令 */
  execute(): void;
  /** 撤销命令 */
  undo(): void;
  /** 获取命令名称（用于日志显示） */
  getName(): string;
}

// ============================================
// 2. 接收者 (Receiver) - 实际执行操作的类
// ============================================

/** 灯光接收者 */
class Light {
  private location: string;
  private isOn: boolean = false;
  private brightness: number = 100;

  constructor(location: string) {
    this.location = location;
  }

  /** 开灯 */
  on(): void {
    this.isOn = true;
    console.log(\`[灯光] \${this.location} 灯已开启，亮度 \${this.brightness}%\`);
  }

  /** 关灯 */
  off(): void {
    this.isOn = false;
    console.log(\`[灯光] \${this.location} 灯已关闭\`);
  }

  /** 调节亮度 */
  setBrightness(level: number): void {
    this.brightness = level;
    console.log(\`[灯光] \${this.location} 灯亮度调至 \${level}%\`);
  }

  /** 获取当前状态 */
  getState(): { isOn: boolean; brightness: number } {
    return { isOn: this.isOn, brightness: this.brightness };
  }
}

/** 空调接收者 */
class AirConditioner {
  private location: string;
  private isOn: boolean = false;
  private temperature: number = 26;

  constructor(location: string) {
    this.location = location;
  }

  /** 开启空调 */
  on(): void {
    this.isOn = true;
    console.log(\`[空调] \${this.location} 空调已开启\`);
  }

  /** 关闭空调 */
  off(): void {
    this.isOn = false;
    console.log(\`[空调] \${this.location} 空调已关闭\`);
  }

  /** 设置温度 */
  setTemperature(temp: number): void {
    this.temperature = temp;
    console.log(\`[空调] \${this.location} 空调温度设为 \${temp}°C\`);
  }

  /** 获取当前状态 */
  getState(): { isOn: boolean; temperature: number } {
    return { isOn: this.isOn, temperature: this.temperature };
  }
}

// ============================================
// 3. 具体命令 (ConcreteCommand)
// ============================================

/** 开灯命令 */
class LightOnCommand implements Command {
  private light: Light;
  private previousState: { isOn: boolean; brightness: number } | null = null;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.previousState = this.light.getState();
    this.light.on();
  }

  undo(): void {
    if (this.previousState) {
      if (!this.previousState.isOn) {
        this.light.off();
      }
    }
  }

  getName(): string {
    return '开灯';
  }
}

/** 关灯命令 */
class LightOffCommand implements Command {
  private light: Light;
  private previousState: { isOn: boolean; brightness: number } | null = null;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.previousState = this.light.getState();
    this.light.off();
  }

  undo(): void {
    if (this.previousState && this.previousState.isOn) {
      this.light.on();
    }
  }

  getName(): string {
    return '关灯';
  }
}

/** 调节灯光亮度命令 */
class LightDimCommand implements Command {
  private light: Light;
  private newBrightness: number;
  private previousBrightness: number = 100;

  constructor(light: Light, brightness: number) {
    this.light = light;
    this.newBrightness = brightness;
  }

  execute(): void {
    const state = this.light.getState();
    this.previousBrightness = state.brightness;
    this.light.setBrightness(this.newBrightness);
  }

  undo(): void {
    this.light.setBrightness(this.previousBrightness);
  }

  getName(): string {
    return \`调节亮度至 \${this.newBrightness}%\`;
  }
}

/** 开启空调命令 */
class AirConditionerOnCommand implements Command {
  private ac: AirConditioner;
  private previousState: { isOn: boolean; temperature: number } | null = null;

  constructor(ac: AirConditioner) {
    this.ac = ac;
  }

  execute(): void {
    this.previousState = this.ac.getState();
    this.ac.on();
  }

  undo(): void {
    if (this.previousState && !this.previousState.isOn) {
      this.ac.off();
    }
  }

  getName(): string {
    return '开启空调';
  }
}

/** 关闭空调命令 */
class AirConditionerOffCommand implements Command {
  private ac: AirConditioner;
  private previousState: { isOn: boolean; temperature: number } | null = null;

  constructor(ac: AirConditioner) {
    this.ac = ac;
  }

  execute(): void {
    this.previousState = this.ac.getState();
    this.ac.off();
  }

  undo(): void {
    if (this.previousState && this.previousState.isOn) {
      this.ac.on();
    }
  }

  getName(): string {
    return '关闭空调';
  }
}

/** 宏命令 - 同时执行多个命令 */
class MacroCommand implements Command {
  private commands: Command[];
  private name: string;

  constructor(name: string, commands: Command[]) {
    this.name = name;
    this.commands = commands;
  }

  execute(): void {
    console.log(\`\\n=== 执行宏命令: \${this.name} ===\`);
    for (const cmd of this.commands) {
      cmd.execute();
    }
  }

  undo(): void {
    console.log(\`\\n=== 撤销宏命令: \${this.name} ===\`);
    // 逆序撤销
    for (let i = this.commands.length - 1; i >= 0; i--) {
      this.commands[i].undo();
    }
  }

  getName(): string {
    return \`宏命令: \${this.name}\`;
  }
}

// ============================================
// 4. 调用者 (Invoker) - 遥控器
// ============================================
class RemoteControl {
  private commandHistory: Command[] = [];
  private redoStack: Command[] = [];
  private maxHistorySize: number = 50;

  /** 执行命令 */
  executeCommand(command: Command): void {
    command.execute();
    this.commandHistory.push(command);
    this.redoStack = []; // 清空重做栈

    // 限制历史记录大小
    if (this.commandHistory.length > this.maxHistorySize) {
      this.commandHistory.shift();
    }

    console.log(\`[遥控器] 执行: \${command.getName()}\`);
  }

  /** 撤销上一个命令 */
  undo(): void {
    if (this.commandHistory.length === 0) {
      console.log('[遥控器] 没有可撤销的操作');
      return;
    }

    const command = this.commandHistory.pop()!;
    command.undo();
    this.redoStack.push(command);
    console.log(\`[遥控器] 撤销: \${command.getName()}\`);
  }

  /** 重做 */
  redo(): void {
    if (this.redoStack.length === 0) {
      console.log('[遥控器] 没有可重做的操作');
      return;
    }

    const command = this.redoStack.pop()!;
    command.execute();
    this.commandHistory.push(command);
    console.log(\`[遥控器] 重做: \${command.getName()}\`);
  }

  /** 显示历史记录 */
  showHistory(): void {
    console.log('\\n=== 操作历史 ===');
    this.commandHistory.forEach((cmd, index) => {
      console.log(\`\${index + 1}. \${cmd.getName()}\`);
    });
  }
}

// ============================================
// 5. 客户端代码
// ============================================
function clientCode(): void {
  console.log('========== 智能家居遥控器演示 ==========\\n');

  // 创建接收者
  const livingRoomLight = new Light('客厅');
  const bedroomLight = new Light('卧室');
  const livingRoomAC = new AirConditioner('客厅');

  // 创建命令
  const livingRoomLightOn = new LightOnCommand(livingRoomLight);
  const livingRoomLightOff = new LightOffCommand(livingRoomLight);
  const livingRoomLightDim = new LightDimCommand(livingRoomLight, 50);
  const bedroomLightOn = new LightOnCommand(bedroomLight);
  const acOn = new AirConditionerOnCommand(livingRoomAC);
  const acOff = new AirConditionerOffCommand(livingRoomAC);

  // 创建宏命令（回家模式：开客厅灯、开空调）
  const homeMode = new MacroCommand('回家模式', [
    livingRoomLightOn,
    acOn,
  ]);

  // 创建宏命令（离家模式：关所有灯、关空调）
  const awayMode = new MacroCommand('离家模式', [
    livingRoomLightOff,
    new LightOffCommand(bedroomLight),
    acOff,
  ]);

  // 创建遥控器
  const remote = new RemoteControl();

  // 执行各种命令
  console.log('--- 单个命令 ---');
  remote.executeCommand(livingRoomLightOn);
  remote.executeCommand(bedroomLightOn);
  remote.executeCommand(livingRoomLightDim);

  console.log('\\n--- 撤销操作 ---');
  remote.undo(); // 撤销调光
  remote.undo(); // 撤销开卧室灯

  console.log('\\n--- 重做操作 ---');
  remote.redo(); // 重做开卧室灯

  console.log('\\n--- 宏命令 ---');
  remote.executeCommand(homeMode);
  remote.executeCommand(awayMode);

  console.log('\\n--- 撤销宏命令 ---');
  remote.undo(); // 撤销离家模式

  // 显示历史记录
  remote.showHistory();
}

clientCode();`,

    java: `/**
 * 命令模式 - Java 实现
 * 以智能家居遥控器为例，控制灯光和空调
 */

// ============================================
// 1. 命令接口 (Command)
// ============================================
interface Command {
    /** 执行命令 */
    void execute();
    /** 撤销命令 */
    void undo();
    /** 获取命令名称 */
    String getName();
}

// ============================================
// 2. 接收者 (Receiver) - 实际执行操作的类
// ============================================

/** 灯光接收者 */
class Light {
    private String location;
    private boolean isOn = false;
    private int brightness = 100;

    public Light(String location) {
        this.location = location;
    }

    /** 开灯 */
    public void on() {
        this.isOn = true;
        System.out.println("[灯光] " + location + " 灯已开启，亮度 " + brightness + "%");
    }

    /** 关灯 */
    public void off() {
        this.isOn = false;
        System.out.println("[灯光] " + location + " 灯已关闭");
    }

    /** 调节亮度 */
    public void setBrightness(int level) {
        this.brightness = level;
        System.out.println("[灯光] " + location + " 灯亮度调至 " + level + "%");
    }

    /** 获取当前状态 */
    public LightState getState() {
        return new LightState(isOn, brightness);
    }

    // 状态内部类
    public static class LightState {
        public final boolean isOn;
        public final int brightness;

        public LightState(boolean isOn, int brightness) {
            this.isOn = isOn;
            this.brightness = brightness;
        }
    }
}

/** 空调接收者 */
class AirConditioner {
    private String location;
    private boolean isOn = false;
    private int temperature = 26;

    public AirConditioner(String location) {
        this.location = location;
    }

    /** 开启空调 */
    public void on() {
        this.isOn = true;
        System.out.println("[空调] " + location + " 空调已开启");
    }

    /** 关闭空调 */
    public void off() {
        this.isOn = false;
        System.out.println("[空调] " + location + " 空调已关闭");
    }

    /** 设置温度 */
    public void setTemperature(int temp) {
        this.temperature = temp;
        System.out.println("[空调] " + location + " 空调温度设为 " + temp + "°C");
    }

    /** 获取当前状态 */
    public ACState getState() {
        return new ACState(isOn, temperature);
    }

    // 状态内部类
    public static class ACState {
        public final boolean isOn;
        public final int temperature;

        public ACState(boolean isOn, int temperature) {
            this.isOn = isOn;
            this.temperature = temperature;
        }
    }
}

// ============================================
// 3. 具体命令 (ConcreteCommand)
// ============================================

/** 开灯命令 */
class LightOnCommand implements Command {
    private Light light;
    private Light.LightState previousState;

    public LightOnCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        this.previousState = light.getState();
        light.on();
    }

    @Override
    public void undo() {
        if (previousState != null && !previousState.isOn) {
            light.off();
        }
    }

    @Override
    public String getName() {
        return "开灯";
    }
}

/** 关灯命令 */
class LightOffCommand implements Command {
    private Light light;
    private Light.LightState previousState;

    public LightOffCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        this.previousState = light.getState();
        light.off();
    }

    @Override
    public void undo() {
        if (previousState != null && previousState.isOn) {
            light.on();
        }
    }

    @Override
    public String getName() {
        return "关灯";
    }
}

/** 调节灯光亮度命令 */
class LightDimCommand implements Command {
    private Light light;
    private int newBrightness;
    private int previousBrightness = 100;

    public LightDimCommand(Light light, int brightness) {
        this.light = light;
        this.newBrightness = brightness;
    }

    @Override
    public void execute() {
        this.previousBrightness = light.getState().brightness;
        light.setBrightness(newBrightness);
    }

    @Override
    public void undo() {
        light.setBrightness(previousBrightness);
    }

    @Override
    public String getName() {
        return "调节亮度至 " + newBrightness + "%";
    }
}

/** 开启空调命令 */
class AirConditionerOnCommand implements Command {
    private AirConditioner ac;
    private AirConditioner.ACState previousState;

    public AirConditionerOnCommand(AirConditioner ac) {
        this.ac = ac;
    }

    @Override
    public void execute() {
        this.previousState = ac.getState();
        ac.on();
    }

    @Override
    public void undo() {
        if (previousState != null && !previousState.isOn) {
            ac.off();
        }
    }

    @Override
    public String getName() {
        return "开启空调";
    }
}

/** 关闭空调命令 */
class AirConditionerOffCommand implements Command {
    private AirConditioner ac;
    private AirConditioner.ACState previousState;

    public AirConditionerOffCommand(AirConditioner ac) {
        this.ac = ac;
    }

    @Override
    public void execute() {
        this.previousState = ac.getState();
        ac.off();
    }

    @Override
    public void undo() {
        if (previousState != null && previousState.isOn) {
            ac.on();
        }
    }

    @Override
    public String getName() {
        return "关闭空调";
    }
}

/** 宏命令 - 同时执行多个命令 */
class MacroCommand implements Command {
    private String name;
    private Command[] commands;

    public MacroCommand(String name, Command[] commands) {
        this.name = name;
        this.commands = commands;
    }

    @Override
    public void execute() {
        System.out.println("\\n=== 执行宏命令: " + name + " ===");
        for (Command cmd : commands) {
            cmd.execute();
        }
    }

    @Override
    public void undo() {
        System.out.println("\\n=== 撤销宏命令: " + name + " ===");
        // 逆序撤销
        for (int i = commands.length - 1; i >= 0; i--) {
            commands[i].undo();
        }
    }

    @Override
    public String getName() {
        return "宏命令: " + name;
    }
}

// ============================================
// 4. 调用者 (Invoker) - 遥控器
// ============================================
import java.util.ArrayDeque;
import java.util.Deque;

class RemoteControl {
    private Deque<Command> commandHistory = new ArrayDeque<>();
    private Deque<Command> redoStack = new ArrayDeque<>();
    private static final int MAX_HISTORY_SIZE = 50;

    /** 执行命令 */
    public void executeCommand(Command command) {
        command.execute();
        commandHistory.push(command);
        redoStack.clear(); // 清空重做栈

        // 限制历史记录大小
        if (commandHistory.size() > MAX_HISTORY_SIZE) {
            commandHistory.removeLast();
        }

        System.out.println("[遥控器] 执行: " + command.getName());
    }

    /** 撤销上一个命令 */
    public void undo() {
        if (commandHistory.isEmpty()) {
            System.out.println("[遥控器] 没有可撤销的操作");
            return;
        }

        Command command = commandHistory.pop();
        command.undo();
        redoStack.push(command);
        System.out.println("[遥控器] 撤销: " + command.getName());
    }

    /** 重做 */
    public void redo() {
        if (redoStack.isEmpty()) {
            System.out.println("[遥控器] 没有可重做的操作");
            return;
        }

        Command command = redoStack.pop();
        command.execute();
        commandHistory.push(command);
        System.out.println("[遥控器] 重做: " + command.getName());
    }

    /** 显示历史记录 */
    public void showHistory() {
        System.out.println("\\n=== 操作历史 ===");
        int index = 1;
        for (Command cmd : commandHistory) {
            System.out.println(index++ + ". " + cmd.getName());
        }
    }
}

// ============================================
// 5. 客户端代码
// ============================================
public class Client {
    public static void main(String[] args) {
        System.out.println("========== 智能家居遥控器演示 ==========\\n");

        // 创建接收者
        Light livingRoomLight = new Light("客厅");
        Light bedroomLight = new Light("卧室");
        AirConditioner livingRoomAC = new AirConditioner("客厅");

        // 创建命令
        Command livingRoomLightOn = new LightOnCommand(livingRoomLight);
        Command livingRoomLightOff = new LightOffCommand(livingRoomLight);
        Command livingRoomLightDim = new LightDimCommand(livingRoomLight, 50);
        Command bedroomLightOn = new LightOnCommand(bedroomLight);
        Command acOn = new AirConditionerOnCommand(livingRoomAC);
        Command acOff = new AirConditionerOffCommand(livingRoomAC);

        // 创建宏命令（回家模式）
        Command homeMode = new MacroCommand("回家模式", 
            new Command[]{livingRoomLightOn, acOn});

        // 创建宏命令（离家模式）
        Command awayMode = new MacroCommand("离家模式",
            new Command[]{livingRoomLightOff, new LightOffCommand(bedroomLight), acOff});

        // 创建遥控器
        RemoteControl remote = new RemoteControl();

        // 执行各种命令
        System.out.println("--- 单个命令 ---");
        remote.executeCommand(livingRoomLightOn);
        remote.executeCommand(bedroomLightOn);
        remote.executeCommand(livingRoomLightDim);

        System.out.println("\\n--- 撤销操作 ---");
        remote.undo(); // 撤销调光
        remote.undo(); // 撤销开卧室灯

        System.out.println("\\n--- 重做操作 ---");
        remote.redo(); // 重做开卧室灯

        System.out.println("\\n--- 宏命令 ---");
        remote.executeCommand(homeMode);
        remote.executeCommand(awayMode);

        System.out.println("\\n--- 撤销宏命令 ---");
        remote.undo(); // 撤销离家模式

        // 显示历史记录
        remote.showHistory();
    }
}`,

    go: `/**
 * 命令模式 - Go 实现
 * 以智能家居遥控器为例，控制灯光和空调
 */

package main

import (
	"fmt"
)

// ============================================
// 1. 命令接口 (Command)
// ============================================

// Command 定义命令接口
type Command interface {
	Execute()   // 执行命令
	Undo()      // 撤销命令
	GetName() string  // 获取命令名称
}

// ============================================
// 2. 接收者 (Receiver) - 实际执行操作的类
// ============================================

// LightState 灯光状态
type LightState struct {
	IsOn       bool
	Brightness int
}

// Light 灯光接收者
type Light struct {
	Location   string
	IsOn       bool
	Brightness int
}

// NewLight 创建灯光
func NewLight(location string) *Light {
	return &Light{
		Location:   location,
		IsOn:       false,
		Brightness: 100,
	}
}

// On 开灯
func (l *Light) On() {
	l.IsOn = true
	fmt.Printf("[灯光] %s 灯已开启，亮度 %d%%\\n", l.Location, l.Brightness)
}

// Off 关灯
func (l *Light) Off() {
	l.IsOn = false
	fmt.Printf("[灯光] %s 灯已关闭\\n", l.Location)
}

// SetBrightness 调节亮度
func (l *Light) SetBrightness(level int) {
	l.Brightness = level
	fmt.Printf("[灯光] %s 灯亮度调至 %d%%\\n", l.Location, level)
}

// GetState 获取当前状态
func (l *Light) GetState() LightState {
	return LightState{IsOn: l.IsOn, Brightness: l.Brightness}
}

// ACState 空调状态
type ACState struct {
	IsOn        bool
	Temperature int
}

// AirConditioner 空调接收者
type AirConditioner struct {
	Location    string
	IsOn        bool
	Temperature int
}

// NewAirConditioner 创建空调
func NewAirConditioner(location string) *AirConditioner {
	return &AirConditioner{
		Location:    location,
		IsOn:        false,
		Temperature: 26,
	}
}

// On 开启空调
func (ac *AirConditioner) On() {
	ac.IsOn = true
	fmt.Printf("[空调] %s 空调已开启\\n", ac.Location)
}

// Off 关闭空调
func (ac *AirConditioner) Off() {
	ac.IsOn = false
	fmt.Printf("[空调] %s 空调已关闭\\n", ac.Location)
}

// SetTemperature 设置温度
func (ac *AirConditioner) SetTemperature(temp int) {
	ac.Temperature = temp
	fmt.Printf("[空调] %s 空调温度设为 %d°C\\n", ac.Location, temp)
}

// GetState 获取当前状态
func (ac *AirConditioner) GetState() ACState {
	return ACState{IsOn: ac.IsOn, Temperature: ac.Temperature}
}

// ============================================
// 3. 具体命令 (ConcreteCommand)
// ============================================

// LightOnCommand 开灯命令
type LightOnCommand struct {
	Light          *Light
	PreviousState  LightState
}

// NewLightOnCommand 创建开灯命令
func NewLightOnCommand(light *Light) *LightOnCommand {
	return &LightOnCommand{Light: light}
}

func (c *LightOnCommand) Execute() {
	c.PreviousState = c.Light.GetState()
	c.Light.On()
}

func (c *LightOnCommand) Undo() {
	if !c.PreviousState.IsOn {
		c.Light.Off()
	}
}

func (c *LightOnCommand) GetName() string {
	return "开灯"
}

// LightOffCommand 关灯命令
type LightOffCommand struct {
	Light         *Light
	PreviousState LightState
}

// NewLightOffCommand 创建关灯命令
func NewLightOffCommand(light *Light) *LightOffCommand {
	return &LightOffCommand{Light: light}
}

func (c *LightOffCommand) Execute() {
	c.PreviousState = c.Light.GetState()
	c.Light.Off()
}

func (c *LightOffCommand) Undo() {
	if c.PreviousState.IsOn {
		c.Light.On()
	}
}

func (c *LightOffCommand) GetName() string {
	return "关灯"
}

// LightDimCommand 调节亮度命令
type LightDimCommand struct {
	Light              *Light
	NewBrightness      int
	PreviousBrightness int
}

// NewLightDimCommand 创建调光命令
func NewLightDimCommand(light *Light, brightness int) *LightDimCommand {
	return &LightDimCommand{
		Light:         light,
		NewBrightness: brightness,
	}
}

func (c *LightDimCommand) Execute() {
	c.PreviousBrightness = c.Light.GetState().Brightness
	c.Light.SetBrightness(c.NewBrightness)
}

func (c *LightDimCommand) Undo() {
	c.Light.SetBrightness(c.PreviousBrightness)
}

func (c *LightDimCommand) GetName() string {
	return fmt.Sprintf("调节亮度至 %d%%", c.NewBrightness)
}

// AirConditionerOnCommand 开启空调命令
type AirConditionerOnCommand struct {
	AC            *AirConditioner
	PreviousState ACState
}

// NewAirConditionerOnCommand 创建开空调命令
func NewAirConditionerOnCommand(ac *AirConditioner) *AirConditionerOnCommand {
	return &AirConditionerOnCommand{AC: ac}
}

func (c *AirConditionerOnCommand) Execute() {
	c.PreviousState = c.AC.GetState()
	c.AC.On()
}

func (c *AirConditionerOnCommand) Undo() {
	if !c.PreviousState.IsOn {
		c.AC.Off()
	}
}

func (c *AirConditionerOnCommand) GetName() string {
	return "开启空调"
}

// AirConditionerOffCommand 关闭空调命令
type AirConditionerOffCommand struct {
	AC            *AirConditioner
	PreviousState ACState
}

// NewAirConditionerOffCommand 创建关空调命令
func NewAirConditionerOffCommand(ac *AirConditioner) *AirConditionerOffCommand {
	return &AirConditionerOffCommand{AC: ac}
}

func (c *AirConditionerOffCommand) Execute() {
	c.PreviousState = c.AC.GetState()
	c.AC.Off()
}

func (c *AirConditionerOffCommand) Undo() {
	if c.PreviousState.IsOn {
		c.AC.On()
	}
}

func (c *AirConditionerOffCommand) GetName() string {
	return "关闭空调"
}

// MacroCommand 宏命令
type MacroCommand struct {
	Name     string
	Commands []Command
}

// NewMacroCommand 创建宏命令
func NewMacroCommand(name string, commands []Command) *MacroCommand {
	return &MacroCommand{
		Name:     name,
		Commands: commands,
	}
}

func (m *MacroCommand) Execute() {
	fmt.Printf("\\n=== 执行宏命令: %s ===\\n", m.Name)
	for _, cmd := range m.Commands {
		cmd.Execute()
	}
}

func (m *MacroCommand) Undo() {
	fmt.Printf("\\n=== 撤销宏命令: %s ===\\n", m.Name)
	// 逆序撤销
	for i := len(m.Commands) - 1; i >= 0; i-- {
		m.Commands[i].Undo()
	}
}

func (m *MacroCommand) GetName() string {
	return fmt.Sprintf("宏命令: %s", m.Name)
}

// ============================================
// 4. 调用者 (Invoker) - 遥控器
// ============================================

// RemoteControl 遥控器
type RemoteControl struct {
	CommandHistory []Command
	RedoStack      []Command
	MaxHistorySize int
}

// NewRemoteControl 创建遥控器
func NewRemoteControl() *RemoteControl {
	return &RemoteControl{
		CommandHistory: make([]Command, 0),
		RedoStack:      make([]Command, 0),
		MaxHistorySize: 50,
	}
}

// ExecuteCommand 执行命令
func (r *RemoteControl) ExecuteCommand(command Command) {
	command.Execute()
	r.CommandHistory = append(r.CommandHistory, command)
	r.RedoStack = make([]Command, 0) // 清空重做栈

	// 限制历史记录大小
	if len(r.CommandHistory) > r.MaxHistorySize {
		r.CommandHistory = r.CommandHistory[1:]
	}

	fmt.Printf("[遥控器] 执行: %s\\n", command.GetName())
}

// Undo 撤销上一个命令
func (r *RemoteControl) Undo() {
	if len(r.CommandHistory) == 0 {
		fmt.Println("[遥控器] 没有可撤销的操作")
		return
	}

	// 弹出最后一个命令
	index := len(r.CommandHistory) - 1
	command := r.CommandHistory[index]
	r.CommandHistory = r.CommandHistory[:index]

	command.Undo()
	r.RedoStack = append(r.RedoStack, command)
	fmt.Printf("[遥控器] 撤销: %s\\n", command.GetName())
}

// Redo 重做
func (r *RemoteControl) Redo() {
	if len(r.RedoStack) == 0 {
		fmt.Println("[遥控器] 没有可重做的操作")
		return
	}

	// 弹出重做栈顶命令
	index := len(r.RedoStack) - 1
	command := r.RedoStack[index]
	r.RedoStack = r.RedoStack[:index]

	command.Execute()
	r.CommandHistory = append(r.CommandHistory, command)
	fmt.Printf("[遥控器] 重做: %s\\n", command.GetName())
}

// ShowHistory 显示历史记录
func (r *RemoteControl) ShowHistory() {
	fmt.Println("\\n=== 操作历史 ===")
	for i, cmd := range r.CommandHistory {
		fmt.Printf("%d. %s\\n", i+1, cmd.GetName())
	}
}

// ============================================
// 5. 客户端代码
// ============================================
func main() {
	fmt.Println("========== 智能家居遥控器演示 ==========\\n")

	// 创建接收者
	livingRoomLight := NewLight("客厅")
	bedroomLight := NewLight("卧室")
	livingRoomAC := NewAirConditioner("客厅")

	// 创建命令
	livingRoomLightOn := NewLightOnCommand(livingRoomLight)
	livingRoomLightOff := NewLightOffCommand(livingRoomLight)
	livingRoomLightDim := NewLightDimCommand(livingRoomLight, 50)
	bedroomLightOn := NewLightOnCommand(bedroomLight)
	acOn := NewAirConditionerOnCommand(livingRoomAC)
	acOff := NewAirConditionerOffCommand(livingRoomAC)

	// 创建宏命令（回家模式）
	homeMode := NewMacroCommand("回家模式", []Command{
		livingRoomLightOn,
		acOn,
	})

	// 创建宏命令（离家模式）
	awayMode := NewMacroCommand("离家模式", []Command{
		livingRoomLightOff,
		NewLightOffCommand(bedroomLight),
		acOff,
	})

	// 创建遥控器
	remote := NewRemoteControl()

	// 执行各种命令
	fmt.Println("--- 单个命令 ---")
	remote.ExecuteCommand(livingRoomLightOn)
	remote.ExecuteCommand(bedroomLightOn)
	remote.ExecuteCommand(livingRoomLightDim)

	fmt.Println("\\n--- 撤销操作 ---")
	remote.Undo() // 撤销调光
	remote.Undo() // 撤销开卧室灯

	fmt.Println("\\n--- 重做操作 ---")
	remote.Redo() // 重做开卧室灯

	fmt.Println("\\n--- 宏命令 ---")
	remote.ExecuteCommand(homeMode)
	remote.ExecuteCommand(awayMode)

	fmt.Println("\\n--- 撤销宏命令 ---")
	remote.Undo() // 撤销离家模式

	// 显示历史记录
	remote.ShowHistory()
}`,

    python: `"""
命令模式 - Python 实现
以智能家居遥控器为例，控制灯光和空调
"""

from abc import ABC, abstractmethod
from typing import List, Optional, Any
from dataclasses import dataclass

# ============================================
# 1. 命令接口 (Command)
# ============================================

class Command(ABC):
    """命令抽象基类"""
    
    @abstractmethod
    def execute(self) -> None:
        """执行命令"""
        pass
    
    @abstractmethod
    def undo(self) -> None:
        """撤销命令"""
        pass
    
    @abstractmethod
    def get_name(self) -> str:
        """获取命令名称"""
        pass


# ============================================
# 2. 接收者 (Receiver) - 实际执行操作的类
# ============================================

@dataclass
class LightState:
    """灯光状态"""
    is_on: bool = False
    brightness: int = 100


class Light:
    """灯光接收者"""
    
    def __init__(self, location: str):
        self.location = location
        self._is_on = False
        self._brightness = 100
    
    def on(self) -> None:
        """开灯"""
        self._is_on = True
        print(f"[灯光] {self.location} 灯已开启，亮度 {self._brightness}%")
    
    def off(self) -> None:
        """关灯"""
        self._is_on = False
        print(f"[灯光] {self.location} 灯已关闭")
    
    def set_brightness(self, level: int) -> None:
        """调节亮度"""
        self._brightness = level
        print(f"[灯光] {self.location} 灯亮度调至 {level}%")
    
    def get_state(self) -> LightState:
        """获取当前状态"""
        return LightState(is_on=self._is_on, brightness=self._brightness)


@dataclass
class ACState:
    """空调状态"""
    is_on: bool = False
    temperature: int = 26


class AirConditioner:
    """空调接收者"""
    
    def __init__(self, location: str):
        self.location = location
        self._is_on = False
        self._temperature = 26
    
    def on(self) -> None:
        """开启空调"""
        self._is_on = True
        print(f"[空调] {self.location} 空调已开启")
    
    def off(self) -> None:
        """关闭空调"""
        self._is_on = False
        print(f"[空调] {self.location} 空调已关闭")
    
    def set_temperature(self, temp: int) -> None:
        """设置温度"""
        self._temperature = temp
        print(f"[空调] {self.location} 空调温度设为 {temp}°C")
    
    def get_state(self) -> ACState:
        """获取当前状态"""
        return ACState(is_on=self._is_on, temperature=self._temperature)


# ============================================
# 3. 具体命令 (ConcreteCommand)
# ============================================

class LightOnCommand(Command):
    """开灯命令"""
    
    def __init__(self, light: Light):
        self._light = light
        self._previous_state: Optional[LightState] = None
    
    def execute(self) -> None:
        self._previous_state = self._light.get_state()
        self._light.on()
    
    def undo(self) -> None:
        if self._previous_state and not self._previous_state.is_on:
            self._light.off()
    
    def get_name(self) -> str:
        return "开灯"


class LightOffCommand(Command):
    """关灯命令"""
    
    def __init__(self, light: Light):
        self._light = light
        self._previous_state: Optional[LightState] = None
    
    def execute(self) -> None:
        self._previous_state = self._light.get_state()
        self._light.off()
    
    def undo(self) -> None:
        if self._previous_state and self._previous_state.is_on:
            self._light.on()
    
    def get_name(self) -> str:
        return "关灯"


class LightDimCommand(Command):
    """调节灯光亮度命令"""
    
    def __init__(self, light: Light, brightness: int):
        self._light = light
        self._new_brightness = brightness
        self._previous_brightness = 100
    
    def execute(self) -> None:
        self._previous_brightness = self._light.get_state().brightness
        self._light.set_brightness(self._new_brightness)
    
    def undo(self) -> None:
        self._light.set_brightness(self._previous_brightness)
    
    def get_name(self) -> str:
        return f"调节亮度至 {self._new_brightness}%"


class AirConditionerOnCommand(Command):
    """开启空调命令"""
    
    def __init__(self, ac: AirConditioner):
        self._ac = ac
        self._previous_state: Optional[ACState] = None
    
    def execute(self) -> None:
        self._previous_state = self._ac.get_state()
        self._ac.on()
    
    def undo(self) -> None:
        if self._previous_state and not self._previous_state.is_on:
            self._ac.off()
    
    def get_name(self) -> str:
        return "开启空调"


class AirConditionerOffCommand(Command):
    """关闭空调命令"""
    
    def __init__(self, ac: AirConditioner):
        self._ac = ac
        self._previous_state: Optional[ACState] = None
    
    def execute(self) -> None:
        self._previous_state = self._ac.get_state()
        self._ac.off()
    
    def undo(self) -> None:
        if self._previous_state and self._previous_state.is_on:
            self._ac.on()
    
    def get_name(self) -> str:
        return "关闭空调"


class MacroCommand(Command):
    """宏命令 - 同时执行多个命令"""
    
    def __init__(self, name: str, commands: List[Command]):
        self._name = name
        self._commands = commands
    
    def execute(self) -> None:
        print(f"\\n=== 执行宏命令: {self._name} ===")
        for cmd in self._commands:
            cmd.execute()
    
    def undo(self) -> None:
        print(f"\\n=== 撤销宏命令: {self._name} ===")
        # 逆序撤销
        for cmd in reversed(self._commands):
            cmd.undo()
    
    def get_name(self) -> str:
        return f"宏命令: {self._name}"


# ============================================
# 4. 调用者 (Invoker) - 遥控器
# ============================================

class RemoteControl:
    """遥控器 - 命令调用者"""
    
    MAX_HISTORY_SIZE = 50
    
    def __init__(self):
        self._command_history: List[Command] = []
        self._redo_stack: List[Command] = []
    
    def execute_command(self, command: Command) -> None:
        """执行命令"""
        command.execute()
        self._command_history.append(command)
        self._redo_stack.clear()  # 清空重做栈
        
        # 限制历史记录大小
        if len(self._command_history) > self.MAX_HISTORY_SIZE:
            self._command_history.pop(0)
        
        print(f"[遥控器] 执行: {command.get_name()}")
    
    def undo(self) -> None:
        """撤销上一个命令"""
        if not self._command_history:
            print("[遥控器] 没有可撤销的操作")
            return
        
        command = self._command_history.pop()
        command.undo()
        self._redo_stack.append(command)
        print(f"[遥控器] 撤销: {command.get_name()}")
    
    def redo(self) -> None:
        """重做"""
        if not self._redo_stack:
            print("[遥控器] 没有可重做的操作")
            return
        
        command = self._redo_stack.pop()
        command.execute()
        self._command_history.append(command)
        print(f"[遥控器] 重做: {command.get_name()}")
    
    def show_history(self) -> None:
        """显示历史记录"""
        print("\\n=== 操作历史 ===")
        for i, cmd in enumerate(self._command_history, 1):
            print(f"{i}. {cmd.get_name()}")


# ============================================
# 5. 客户端代码
# ============================================

def client_code():
    """客户端代码"""
    print("========== 智能家居遥控器演示 ==========\\n")
    
    # 创建接收者
    living_room_light = Light("客厅")
    bedroom_light = Light("卧室")
    living_room_ac = AirConditioner("客厅")
    
    # 创建命令
    living_room_light_on = LightOnCommand(living_room_light)
    living_room_light_off = LightOffCommand(living_room_light)
    living_room_light_dim = LightDimCommand(living_room_light, 50)
    bedroom_light_on = LightOnCommand(bedroom_light)
    ac_on = AirConditionerOnCommand(living_room_ac)
    ac_off = AirConditionerOffCommand(living_room_ac)
    
    # 创建宏命令（回家模式）
    home_mode = MacroCommand("回家模式", [
        living_room_light_on,
        ac_on,
    ])
    
    # 创建宏命令（离家模式）
    away_mode = MacroCommand("离家模式", [
        living_room_light_off,
        LightOffCommand(bedroom_light),
        ac_off,
    ])
    
    # 创建遥控器
    remote = RemoteControl()
    
    # 执行各种命令
    print("--- 单个命令 ---")
    remote.execute_command(living_room_light_on)
    remote.execute_command(bedroom_light_on)
    remote.execute_command(living_room_light_dim)
    
    print("\\n--- 撤销操作 ---")
    remote.undo()  # 撤销调光
    remote.undo()  # 撤销开卧室灯
    
    print("\\n--- 重做操作 ---")
    remote.redo()  # 重做开卧室灯
    
    print("\\n--- 宏命令 ---")
    remote.execute_command(home_mode)
    remote.execute_command(away_mode)
    
    print("\\n--- 撤销宏命令 ---")
    remote.undo()  # 撤销离家模式
    
    # 显示历史记录
    remote.show_history()


if __name__ == "__main__":
    client_code()`,

    cpp: `/**
 * 命令模式 - C++ 实现
 * 以智能家居遥控器为例，控制灯光和空调
 */

#include <iostream>
#include <string>
#include <vector>
#include <stack>
#include <memory>

// ============================================
// 1. 命令抽象类 (Command)
// ============================================

class Command {
public:
    virtual ~Command() = default;
    
    /** 执行命令 */
    virtual void execute() = 0;
    /** 撤销命令 */
    virtual void undo() = 0;
    /** 获取命令名称 */
    virtual std::string getName() const = 0;
};

using CommandPtr = std::shared_ptr<Command>;

// ============================================
// 2. 接收者 (Receiver) - 实际执行操作的类
// ============================================

// 灯光状态结构体
struct LightState {
    bool isOn = false;
    int brightness = 100;
};

/** 灯光接收者 */
class Light {
private:
    std::string location;
    bool isOn = false;
    int brightness = 100;

public:
    explicit Light(const std::string& loc) : location(loc) {}

    /** 开灯 */
    void on() {
        isOn = true;
        std::cout << "[灯光] " << location << " 灯已开启，亮度 " << brightness << "%" << std::endl;
    }

    /** 关灯 */
    void off() {
        isOn = false;
        std::cout << "[灯光] " << location << " 灯已关闭" << std::endl;
    }

    /** 调节亮度 */
    void setBrightness(int level) {
        brightness = level;
        std::cout << "[灯光] " << location << " 灯亮度调至 " << level << "%" << std::endl;
    }

    /** 获取当前状态 */
    LightState getState() const {
        return {isOn, brightness};
    }
};

using LightPtr = std::shared_ptr<Light>;

// 空调状态结构体
struct ACState {
    bool isOn = false;
    int temperature = 26;
};

/** 空调接收者 */
class AirConditioner {
private:
    std::string location;
    bool isOn = false;
    int temperature = 26;

public:
    explicit AirConditioner(const std::string& loc) : location(loc) {}

    /** 开启空调 */
    void on() {
        isOn = true;
        std::cout << "[空调] " << location << " 空调已开启" << std::endl;
    }

    /** 关闭空调 */
    void off() {
        isOn = false;
        std::cout << "[空调] " << location << " 空调已关闭" << std::endl;
    }

    /** 设置温度 */
    void setTemperature(int temp) {
        temperature = temp;
        std::cout << "[空调] " << location << " 空调温度设为 " << temp << "°C" << std::endl;
    }

    /** 获取当前状态 */
    ACState getState() const {
        return {isOn, temperature};
    }
};

using AirConditionerPtr = std::shared_ptr<AirConditioner>;

// ============================================
// 3. 具体命令 (ConcreteCommand)
// ============================================

/** 开灯命令 */
class LightOnCommand : public Command {
private:
    LightPtr light;
    LightState previousState;

public:
    explicit LightOnCommand(LightPtr l) : light(std::move(l)) {}

    void execute() override {
        previousState = light->getState();
        light->on();
    }

    void undo() override {
        if (!previousState.isOn) {
            light->off();
        }
    }

    std::string getName() const override {
        return "开灯";
    }
};

/** 关灯命令 */
class LightOffCommand : public Command {
private:
    LightPtr light;
    LightState previousState;

public:
    explicit LightOffCommand(LightPtr l) : light(std::move(l)) {}

    void execute() override {
        previousState = light->getState();
        light->off();
    }

    void undo() override {
        if (previousState.isOn) {
            light->on();
        }
    }

    std::string getName() const override {
        return "关灯";
    }
};

/** 调节灯光亮度命令 */
class LightDimCommand : public Command {
private:
    LightPtr light;
    int newBrightness;
    int previousBrightness = 100;

public:
    LightDimCommand(LightPtr l, int brightness) 
        : light(std::move(l)), newBrightness(brightness) {}

    void execute() override {
        previousBrightness = light->getState().brightness;
        light->setBrightness(newBrightness);
    }

    void undo() override {
        light->setBrightness(previousBrightness);
    }

    std::string getName() const override {
        return "调节亮度至 " + std::to_string(newBrightness) + "%";
    }
};

/** 开启空调命令 */
class AirConditionerOnCommand : public Command {
private:
    AirConditionerPtr ac;
    ACState previousState;

public:
    explicit AirConditionerOnCommand(AirConditionerPtr a) : ac(std::move(a)) {}

    void execute() override {
        previousState = ac->getState();
        ac->on();
    }

    void undo() override {
        if (!previousState.isOn) {
            ac->off();
        }
    }

    std::string getName() const override {
        return "开启空调";
    }
};

/** 关闭空调命令 */
class AirConditionerOffCommand : public Command {
private:
    AirConditionerPtr ac;
    ACState previousState;

public:
    explicit AirConditionerOffCommand(AirConditionerPtr a) : ac(std::move(a)) {}

    void execute() override {
        previousState = ac->getState();
        ac->off();
    }

    void undo() override {
        if (previousState.isOn) {
            ac->on();
        }
    }

    std::string getName() const override {
        return "关闭空调";
    }
};

/** 宏命令 - 同时执行多个命令 */
class MacroCommand : public Command {
private:
    std::string name;
    std::vector<CommandPtr> commands;

public:
    MacroCommand(std::string n, std::vector<CommandPtr> cmds) 
        : name(std::move(n)), commands(std::move(cmds)) {}

    void execute() override {
        std::cout << "\\n=== 执行宏命令: " << name << " ===" << std::endl;
        for (const auto& cmd : commands) {
            cmd->execute();
        }
    }

    void undo() override {
        std::cout << "\\n=== 撤销宏命令: " << name << " ===" << std::endl;
        // 逆序撤销
        for (auto it = commands.rbegin(); it != commands.rend(); ++it) {
            (*it)->undo();
        }
    }

    std::string getName() const override {
        return "宏命令: " + name;
    }
};

// ============================================
// 4. 调用者 (Invoker) - 遥控器
// ============================================

class RemoteControl {
private:
    std::stack<CommandPtr> commandHistory;
    std::stack<CommandPtr> redoStack;
    static constexpr size_t MAX_HISTORY_SIZE = 50;

public:
    /** 执行命令 */
    void executeCommand(CommandPtr command) {
        command->execute();
        commandHistory.push(command);
        
        // 清空重做栈
        while (!redoStack.empty()) {
            redoStack.pop();
        }

        // 限制历史记录大小
        if (commandHistory.size() > MAX_HISTORY_SIZE) {
            // C++ stack 不支持直接移除底部元素，这里简化处理
            // 实际应用中可能需要使用 deque
        }

        std::cout << "[遥控器] 执行: " << command->getName() << std::endl;
    }

    /** 撤销上一个命令 */
    void undo() {
        if (commandHistory.empty()) {
            std::cout << "[遥控器] 没有可撤销的操作" << std::endl;
            return;
        }

        CommandPtr command = commandHistory.top();
        commandHistory.pop();
        command->undo();
        redoStack.push(command);
        std::cout << "[遥控器] 撤销: " << command->getName() << std::endl;
    }

    /** 重做 */
    void redo() {
        if (redoStack.empty()) {
            std::cout << "[遥控器] 没有可重做的操作" << std::endl;
            return;
        }

        CommandPtr command = redoStack.top();
        redoStack.pop();
        command->execute();
        commandHistory.push(command);
        std::cout << "[遥控器] 重做: " << command->getName() << std::endl;
    }

    /** 显示历史记录 */
    void showHistory() const {
        std::cout << "\\n=== 操作历史 ===" << std::endl;
        // 由于 stack 无法遍历，这里仅显示数量
        std::cout << "历史记录数量: " << commandHistory.size() << std::endl;
    }
};

// ============================================
// 5. 客户端代码
// ============================================

int main() {
    std::cout << "========== 智能家居遥控器演示 ==========" << std::endl << std::endl;

    // 创建接收者
    LightPtr livingRoomLight = std::make_shared<Light>("客厅");
    LightPtr bedroomLight = std::make_shared<Light>("卧室");
    AirConditionerPtr livingRoomAC = std::make_shared<AirConditioner>("客厅");

    // 创建命令
    CommandPtr livingRoomLightOn = std::make_shared<LightOnCommand>(livingRoomLight);
    CommandPtr livingRoomLightOff = std::make_shared<LightOffCommand>(livingRoomLight);
    CommandPtr livingRoomLightDim = std::make_shared<LightDimCommand>(livingRoomLight, 50);
    CommandPtr bedroomLightOn = std::make_shared<LightOnCommand>(bedroomLight);
    CommandPtr acOn = std::make_shared<AirConditionerOnCommand>(livingRoomAC);
    CommandPtr acOff = std::make_shared<AirConditionerOffCommand>(livingRoomAC);

    // 创建宏命令（回家模式）
    CommandPtr homeMode = std::make_shared<MacroCommand>("回家模式", 
        std::vector<CommandPtr>{livingRoomLightOn, acOn});

    // 创建宏命令（离家模式）
    CommandPtr awayMode = std::make_shared<MacroCommand>("离家模式",
        std::vector<CommandPtr>{livingRoomLightOff, 
                               std::make_shared<LightOffCommand>(bedroomLight), 
                               acOff});

    // 创建遥控器
    RemoteControl remote;

    // 执行各种命令
    std::cout << "--- 单个命令 ---" << std::endl;
    remote.executeCommand(livingRoomLightOn);
    remote.executeCommand(bedroomLightOn);
    remote.executeCommand(livingRoomLightDim);

    std::cout << "\\n--- 撤销操作 ---" << std::endl;
    remote.undo(); // 撤销调光
    remote.undo(); // 撤销开卧室灯

    std::cout << "\\n--- 重做操作 ---" << std::endl;
    remote.redo(); // 重做开卧室灯

    std::cout << "\\n--- 宏命令 ---" << std::endl;
    remote.executeCommand(homeMode);
    remote.executeCommand(awayMode);

    std::cout << "\\n--- 撤销宏命令 ---" << std::endl;
    remote.undo(); // 撤销离家模式

    // 显示历史记录
    remote.showHistory();

    return 0;
}`,
  },
  realWorldExamples: [
    {
      title: 'Java Runnable',
      description: 'Java 的 Runnable 接口是命令模式的典型应用，将可执行代码封装为对象。',
      source: 'JDK',
      codeSnippet: `Runnable command = () -> System.out.println("Hello");
new Thread(command).start();`,
    },
    {
      title: 'GUI 撤销/重做',
      description: '文本编辑器、图像编辑软件中的撤销/重做功能通常使用命令模式实现。',
      source: 'GUI Frameworks',
      codeSnippet: `// 每个编辑操作封装为命令
class DeleteTextCommand implements Command {
    private String deletedText;
    private int position;
    
    public void execute() { /* 删除文本 */ }
    public void undo() { /* 恢复文本 */ }
}`,
    },
    {
      title: '数据库事务',
      description: '数据库事务管理使用命令模式来封装 SQL 操作，支持提交和回滚。',
      source: 'Database Systems',
      codeSnippet: `try {
    connection.beginTransaction();
    command.execute();  // 执行 SQL
    connection.commit();
} catch (Exception e) {
    connection.rollback();  // 撤销
}`,
    },
  ],
  relatedPatterns: ['chain-of-responsibility', 'iterator', 'mediator', 'memento', 'prototype'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '命令模式的主要目的是什么？',
      options: [
        '创建对象',
        '封装请求为对象',
        '优化性能',
        '转换接口',
      ],
      correctAnswer: 1,
      explanation: '命令模式的主要目的是将一个请求封装为一个对象，从而可用不同的请求对客户进行参数化。',
    },
    {
      id: 'q2',
      type: 'boolean',
      question: '命令模式可以实现撤销和重做功能',
      options: ['正确', '错误'],
      correctAnswer: 0,
      explanation: '正确。命令模式通过保存命令历史和支持 undo 操作，可以轻松实现撤销和重做功能。',
    },
    {
      id: 'q3',
      type: 'single',
      question: '在命令模式中，实际执行业务逻辑的是哪个角色？',
      options: [
        'Command（命令接口）',
        'Invoker（调用者）',
        'Receiver（接收者）',
        'Client（客户端）',
      ],
      correctAnswer: 2,
      explanation: 'Receiver（接收者）知道如何执行具体的业务逻辑，ConcreteCommand 通过调用 Receiver 的方法来完成实际操作。',
    },
  ],
};
