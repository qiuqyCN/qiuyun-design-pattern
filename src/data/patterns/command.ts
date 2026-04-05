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
  applicability: ['当需要通过操作来参数化对象时', '当需要将操作放入队列中、延迟执行或远程执行时', '当需要实现操作回滚功能时'],
  pros: ['单一职责原则：将触发操作的对象与执行操作的对象解耦', '开闭原则：可以在不更改现有代码的情况下引入新命令', '可以实现撤销和重做', '可以实现操作的延迟执行'],
  cons: ['代码可能会变得更加复杂，因为需要引入许多新的类'],
  analogy: { title: '现实世界中的命令', description: '命令模式就像是餐厅点餐', scenarios: [{ id: 'order', title: '餐厅点餐', description: '服务员接受你的订单（命令），将其放入队列，厨师按顺序执行。你可以取消订单（撤销）。', icon: 'Clipboard' }] },
  structure: { classDiagram: '', animationSteps: [] },
  implementation: {
    typescript: `interface Command { execute(): void; undo(): void; }
class Light { on() { console.log('Light is on'); } off() { console.log('Light is off'); } }
class LightOnCommand implements Command {
  constructor(private light: Light) {}
  execute() { this.light.on(); }
  undo() { this.light.off(); }
}
class RemoteControl {
  private command: Command | null = null;
  setCommand(cmd: Command) { this.command = cmd; }
  pressButton() { this.command?.execute(); }
}`,
    java: `interface Command { void execute(); void undo(); }
class Light { void on() { System.out.println("Light is on"); } void off() { System.out.println("Light is off"); } }
class LightOnCommand implements Command {
  private Light light;
  public LightOnCommand(Light light) { this.light = light; }
  public void execute() { light.on(); }
  public void undo() { light.off(); }
}
class RemoteControl {
  private Command command;
  public void setCommand(Command cmd) { this.command = cmd; }
  public void pressButton() { command.execute(); }
}`,
    go: `type Command interface { Execute(); Undo() }
type Light struct{}
func (l *Light) On() { println("Light is on") }
func (l *Light) Off() { println("Light is off") }
type LightOnCommand struct { light *Light }
func (c *LightOnCommand) Execute() { c.light.On() }
func (c *LightOnCommand) Undo() { c.light.Off() }
type RemoteControl struct { command Command }
func (r *RemoteControl) SetCommand(cmd Command) { r.command = cmd }
func (r *RemoteControl) PressButton() { r.command.Execute() }`,
    python: `class Command(ABC): @abstractmethod def execute(self): pass; @abstractmethod def undo(self): pass
class Light: def on(self): print("Light is on"); def off(self): print("Light is off")
class LightOnCommand(Command):
  def __init__(self, light): self._light = light
  def execute(self): self._light.on()
  def undo(self): self._light.off()
class RemoteControl:
  def __init__(self): self._command = None
  def set_command(self, cmd): self._command = cmd
  def press_button(self): self._command.execute() if self._command else None`,
    cpp: `class Command { public: virtual void execute() = 0; virtual void undo() = 0; };
class Light { public: void on() { std::cout << "Light is on" << std::endl; } void off() { std::cout << "Light is off" << std::endl; } };
class LightOnCommand : public Command { Light* light; public: LightOnCommand(Light* l) : light(l) {} void execute() override { light->on(); } void undo() override { light->off(); } };
class RemoteControl { Command* command = nullptr; public: void setCommand(Command* cmd) { command = cmd; } void pressButton() { if (command) command->execute(); } };`,
  },
  realWorldExamples: [{ title: 'Java Runnable', description: 'Java 的 Runnable 接口是命令模式的典型应用。', source: 'JDK', codeSnippet: 'Runnable command = () -> System.out.println("Hello"); new Thread(command).start();' }],
  relatedPatterns: ['chain-of-responsibility', 'iterator', 'mediator'],
  quiz: [{ id: 'q1', type: 'single', question: '命令模式的主要目的是什么？', options: ['创建对象', '封装请求为对象', '优化性能', '转换接口'], correctAnswer: 1, explanation: '命令模式的主要目的是将一个请求封装为一个对象，从而可用不同的请求对客户进行参数化。' }],
};
