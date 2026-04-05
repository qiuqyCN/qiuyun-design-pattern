import type { DesignPattern } from '@/types/pattern';

export const abstractFactoryPattern: DesignPattern = {
  id: 'abstract-factory',
  name: '抽象工厂模式',
  nameEn: 'Abstract Factory Pattern',
  category: 'creational',
  difficulty: 'medium',
  frequency: 'high',
  intent: '提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。',
  description: '抽象工厂模式是一种创建型设计模式，它能创建一系列相关的对象，而无需指定其具体类。',
  applicability: [
    '当需要创建一系列相关的产品对象时',
    '当系统应该独立于产品的创建、组合和表示时',
    '当需要提供一个产品类库，只想显示它们的接口而不是实现时',
  ],
  pros: [
    '确保同一工厂生成的产品属于同一系列',
    '避免客户端代码与具体产品代码的耦合',
    '单一职责原则：产品创建代码可以单独维护',
    '开闭原则：引入新产品系列时无需修改现有代码',
  ],
  cons: [
    '代码可能变得更加复杂，因为需要引入许多新的类和接口',
    '需要同时引入所有产品系列的变体',
  ],
  analogy: {
    title: '现实世界中的抽象工厂',
    description: '抽象工厂就像是现实世界中的品牌家具店',
    scenarios: [
      {
        id: 'furniture',
        title: '品牌家具店',
        description: '宜家提供现代风格的家具系列，红星美凯龙提供古典风格的家具系列。每个品牌就是一个抽象工厂，提供一系列相关的产品（沙发、桌子、椅子）。',
        icon: 'Sofa',
      },
    ],
  },
  structure: {
    classDiagram: `
      class AbstractFactory {
        +createProductA(): AbstractProductA
        +createProductB(): AbstractProductB
      }
      class ConcreteFactory1 {
        +createProductA(): AbstractProductA
        +createProductB(): AbstractProductB
      }
      class AbstractProductA {
        +usefulFunctionA()
      }
      class ConcreteProductA1 {
        +usefulFunctionA()
      }
      AbstractFactory <|-- ConcreteFactory1
      AbstractProductA <|-- ConcreteProductA1
    `,
    mermaidDiagram: `
classDiagram
  class GUIFactory {
    <<interface>>
    +createButton() Button
    +createCheckbox() Checkbox
    +createTextField() TextField
  }
  class WindowsFactory {
    +createButton() Button
    +createCheckbox() Checkbox
    +createTextField() TextField
  }
  class MacFactory {
    +createButton() Button
    +createCheckbox() Checkbox
    +createTextField() TextField
  }
  class LinuxFactory {
    +createButton() Button
    +createCheckbox() Checkbox
    +createTextField() TextField
  }
  class Button {
    <<interface>>
    +render()
    +onClick()
  }
  class Checkbox {
    <<interface>>
    +render()
    +toggle()
  }
  class TextField {
    <<interface>>
    +render()
    +setText(text)
  }
  class WindowsButton {
    +render()
    +onClick()
  }
  class WindowsCheckbox {
    +render()
    +toggle()
  }
  class WindowsTextField {
    +render()
    +setText(text)
  }
  class MacButton {
    +render()
    +onClick()
  }
  class MacCheckbox {
    +render()
    +toggle()
  }
  class MacTextField {
    +render()
    +setText(text)
  }
  class LinuxButton {
    +render()
    +onClick()
  }
  class LinuxCheckbox {
    +render()
    +toggle()
  }
  class LinuxTextField {
    +render()
    +setText(text)
  }
  class Application {
    -factory: GUIFactory
    -button: Button
    -checkbox: Checkbox
    -textField: TextField
    +createUI()
    +paint()
  }
  GUIFactory <|.. WindowsFactory
  GUIFactory <|.. MacFactory
  GUIFactory <|.. LinuxFactory
  Button <|.. WindowsButton
  Checkbox <|.. WindowsCheckbox
  TextField <|.. WindowsTextField
  Button <|.. MacButton
  Checkbox <|.. MacCheckbox
  TextField <|.. MacTextField
  Button <|.. LinuxButton
  Checkbox <|.. LinuxCheckbox
  TextField <|.. LinuxTextField
  WindowsFactory ..> WindowsButton : creates
  WindowsFactory ..> WindowsCheckbox : creates
  WindowsFactory ..> WindowsTextField : creates
  MacFactory ..> MacButton : creates
  MacFactory ..> MacCheckbox : creates
  MacFactory ..> MacTextField : creates
  LinuxFactory ..> LinuxButton : creates
  LinuxFactory ..> LinuxCheckbox : creates
  LinuxFactory ..> LinuxTextField : creates
  Application ..> GUIFactory : uses
  Application ..> Button : uses
  Application ..> Checkbox : uses
  Application ..> TextField : uses
  style GUIFactory fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style Button fill:#fff3e0,stroke:#f57c00,stroke-width:1px
  style Checkbox fill:#fff3e0,stroke:#f57c00,stroke-width:1px
  style TextField fill:#fff3e0,stroke:#f57c00,stroke-width:1px
  style WindowsFactory fill:#e8f5e9,stroke:#388e3c,stroke-width:1px
  style MacFactory fill:#fce4ec,stroke:#c2185b,stroke-width:1px
  style LinuxFactory fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px
  style Application fill:#f5f5f5,stroke:#616161,stroke-width:1px
    `,
    animationSteps: [],
  },
  implementation: {
    typescript: '/**\n * ============================================\n * 抽象工厂模式 - TypeScript 实现（面向对象方式）\n * ============================================\n * 场景：跨平台 GUI 组件库\n * 产品族：Button、Checkbox、TextField\n * 具体工厂：Windows、Mac、Linux\n */\n\n// ============================================\n// 1. 抽象产品接口\n// ============================================\n\n/** 按钮接口 */\ninterface Button {\n  render(): void;\n  onClick(callback: () => void): void;\n}\n\n/** 复选框接口 */\ninterface Checkbox {\n  render(): void;\n  toggle(): void;\n  isChecked(): boolean;\n}\n\n/** 文本输入框接口 */\ninterface TextField {\n  render(): void;\n  setText(text: string): void;\n  getText(): string;\n}\n\n// ============================================\n// 2. 具体产品 - Windows 风格\n// ============================================\n\nclass WindowsButton implements Button {\n  private callback?: () => void;\n  render(): void { console.log("渲染 Windows 风格按钮 [直角边框 | 蓝色背景]"); }\n  onClick(callback: () => void): void { this.callback = callback; }\n}\n\nclass WindowsCheckbox implements Checkbox {\n  private checked = false;\n  render(): void { console.log("渲染 Windows 风格复选框 [" + (this.checked ? "X" : " ") + "] [方形边框]"); }\n  toggle(): void { this.checked = !this.checked; }\n  isChecked(): boolean { return this.checked; }\n}\n\nclass WindowsTextField implements TextField {\n  private text = "";\n  render(): void { console.log("渲染 Windows 风格文本框 [" + (this.text || "空") + "] [带边框]"); }\n  setText(text: string): void { this.text = text; }\n  getText(): string { return this.text; }\n}\n\n// ============================================\n// 3. 具体产品 - Mac 风格\n// ============================================\n\nclass MacButton implements Button {\n  private callback?: () => void;\n  render(): void { console.log("渲染 Mac 风格按钮 [圆角边框 | 渐变背景]"); }\n  onClick(callback: () => void): void { this.callback = callback; }\n}\n\nclass MacCheckbox implements Checkbox {\n  private checked = false;\n  render(): void { console.log("渲染 Mac 风格复选框 [" + (this.checked ? "\\u2713" : "\\u25EF") + "] [圆形边框]"); }\n  toggle(): void { this.checked = !this.checked; }\n  isChecked(): boolean { return this.checked; }\n}\n\nclass MacTextField implements TextField {\n  private text = "";\n  render(): void { console.log("渲染 Mac 风格文本框 [" + (this.text || "空") + "] [无边框 | 下划线]"); }\n  setText(text: string): void { this.text = text; }\n  getText(): string { return this.text; }\n}\n\n// ============================================\n// 4. 具体产品 - Linux 风格\n// ============================================\n\nclass LinuxButton implements Button {\n  private callback?: () => void;\n  render(): void { console.log("渲染 Linux 风格按钮 [扁平设计 | 橙色背景]"); }\n  onClick(callback: () => void): void { this.callback = callback; }\n}\n\nclass LinuxCheckbox implements Checkbox {\n  private checked = false;\n  render(): void { console.log("渲染 Linux 风格复选框 [" + (this.checked ? "\\u2714" : "\\u2610") + "] [极简风格]"); }\n  toggle(): void { this.checked = !this.checked; }\n  isChecked(): boolean { return this.checked; }\n}\n\nclass LinuxTextField implements TextField {\n  private text = "";\n  render(): void { console.log("渲染 Linux 风格文本框 [" + (this.text || "空") + "] [扁平边框]"); }\n  setText(text: string): void { this.text = text; }\n  getText(): string { return this.text; }\n}\n\n// ============================================\n// 5. 抽象工厂接口\n// ============================================\n\n/** GUI 工厂接口 */\ninterface GUIFactory {\n  createButton(): Button;\n  createCheckbox(): Checkbox;\n  createTextField(): TextField;\n}\n\n// ============================================\n// 6. 具体工厂\n// ============================================\n\nclass WindowsFactory implements GUIFactory {\n  createButton(): Button { return new WindowsButton(); }\n  createCheckbox(): Checkbox { return new WindowsCheckbox(); }\n  createTextField(): TextField { return new WindowsTextField(); }\n}\n\nclass MacFactory implements GUIFactory {\n  createButton(): Button { return new MacButton(); }\n  createCheckbox(): Checkbox { return new MacCheckbox(); }\n  createTextField(): TextField { return new MacTextField(); }\n}\n\nclass LinuxFactory implements GUIFactory {\n  createButton(): Button { return new LinuxButton(); }\n  createCheckbox(): Checkbox { return new LinuxCheckbox(); }\n  createTextField(): TextField { return new LinuxTextField(); }\n}\n\n// ============================================\n// 7. 客户端代码\n// ============================================\n\nclass Application {\n  private factory: GUIFactory;\n  private button: Button;\n  private checkbox: Checkbox;\n  private textField: TextField;\n\n  constructor(factory: GUIFactory) {\n    this.factory = factory;\n  }\n\n  createUI(): void {\n    this.button = this.factory.createButton();\n    this.checkbox = this.factory.createCheckbox();\n    this.textField = this.factory.createTextField();\n  }\n\n  paint(): void {\n    this.button.render();\n    this.checkbox.render();\n    this.textField.render();\n  }\n}\n\n// 客户端使用\nfunction clientCode(): void {\n  const osType = "Windows";\n  let factory: GUIFactory;\n\n  switch (osType) {\n    case "Windows":\n      factory = new WindowsFactory();\n      break;\n    case "Mac":\n      factory = new MacFactory();\n      break;\n    case "Linux":\n      factory = new LinuxFactory();\n      break;\n    default:\n      throw new Error("不支持的操作系统");\n  }\n\n  const app = new Application(factory);\n  app.createUI();\n  app.paint();\n}\n\n/**\n * ============================================\n * 抽象工厂模式 - TypeScript 函数式实现\n * ============================================\n */\n\ntype ButtonFactory = () => { render(): void; onClick(cb: () => void): void };\ntype CheckboxFactory = () => { render(): void; toggle(): void; isChecked(): boolean };\ntype TextFieldFactory = () => { render(): void; setText(t: string): void; getText(): string };\n\ninterface FunctionalGUIFactory {\n  createButton: ButtonFactory;\n  createCheckbox: CheckboxFactory;\n  createTextField: TextFieldFactory;\n}\n\nconst createWindowsFactory = (): FunctionalGUIFactory => ({\n  createButton: () => ({\n    render: () => console.log("Windows 按钮"),\n    onClick: (cb) => cb()\n  }),\n  createCheckbox: () => {\n    let checked = false;\n    return {\n      render: () => console.log("Windows 复选框: " + checked),\n      toggle: () => { checked = !checked; },\n      isChecked: () => checked\n    };\n  },\n  createTextField: () => {\n    let text = "";\n    return {\n      render: () => console.log("Windows 文本框: " + text),\n      setText: (t) => { text = t; },\n      getText: () => text\n    };\n  }\n});\n\nfunction functionalClient(factory: FunctionalGUIFactory): void {\n  const button = factory.createButton();\n  const checkbox = factory.createCheckbox();\n  const textField = factory.createTextField();\n  button.render();\n  checkbox.render();\n  textField.render();\n}',

    java: '/**\n * ============================================\n * 抽象工厂模式 - Java 实现（面向对象方式）\n * ============================================\n */\n\n// 抽象产品接口\npublic interface Button {\n    void render();\n    void onClick(Runnable callback);\n}\n\npublic interface Checkbox {\n    void render();\n    void toggle();\n    boolean isChecked();\n}\n\npublic interface TextField {\n    void render();\n    void setText(String text);\n    String getText();\n}\n\n// Windows 风格产品\npublic class WindowsButton implements Button {\n    private Runnable callback;\n    @Override\n    public void render() { System.out.println("渲染 Windows 风格按钮 [直角边框 | 蓝色背景]"); }\n    @Override\n    public void onClick(Runnable callback) { this.callback = callback; }\n}\n\npublic class WindowsCheckbox implements Checkbox {\n    private boolean checked = false;\n    @Override\n    public void render() { System.out.println("渲染 Windows 风格复选框 [" + (checked ? "X" : " ") + "] [方形边框]"); }\n    @Override\n    public void toggle() { checked = !checked; }\n    @Override\n    public boolean isChecked() { return checked; }\n}\n\npublic class WindowsTextField implements TextField {\n    private String text = "";\n    @Override\n    public void render() { System.out.println("渲染 Windows 风格文本框 [" + (text.isEmpty() ? "空" : text) + "] [带边框]"); }\n    @Override\n    public void setText(String text) { this.text = text; }\n    @Override\n    public String getText() { return text; }\n}\n\n// Mac 风格产品\npublic class MacButton implements Button {\n    private Runnable callback;\n    @Override\n    public void render() { System.out.println("渲染 Mac 风格按钮 [圆角边框 | 渐变背景]"); }\n    @Override\n    public void onClick(Runnable callback) { this.callback = callback; }\n}\n\npublic class MacCheckbox implements Checkbox {\n    private boolean checked = false;\n    @Override\n    public void render() { System.out.println("渲染 Mac 风格复选框 [" + (checked ? "\\u2713" : "\\u25EF") + "] [圆形边框]"); }\n    @Override\n    public void toggle() { checked = !checked; }\n    @Override\n    public boolean isChecked() { return checked; }\n}\n\npublic class MacTextField implements TextField {\n    private String text = "";\n    @Override\n    public void render() { System.out.println("渲染 Mac 风格文本框 [" + (text.isEmpty() ? "空" : text) + "] [无边框 | 下划线]"); }\n    @Override\n    public void setText(String text) { this.text = text; }\n    @Override\n    public String getText() { return text; }\n}\n\n// Linux 风格产品\npublic class LinuxButton implements Button {\n    private Runnable callback;\n    @Override\n    public void render() { System.out.println("渲染 Linux 风格按钮 [扁平设计 | 橙色背景]"); }\n    @Override\n    public void onClick(Runnable callback) { this.callback = callback; }\n}\n\npublic class LinuxCheckbox implements Checkbox {\n    private boolean checked = false;\n    @Override\n    public void render() { System.out.println("渲染 Linux 风格复选框 [" + (checked ? "\\u2714" : "\\u2610") + "] [极简风格]"); }\n    @Override\n    public void toggle() { checked = !checked; }\n    @Override\n    public boolean isChecked() { return checked; }\n}\n\npublic class LinuxTextField implements TextField {\n    private String text = "";\n    @Override\n    public void render() { System.out.println("渲染 Linux 风格文本框 [" + (text.isEmpty() ? "空" : text) + "] [扁平边框]"); }\n    @Override\n    public void setText(String text) { this.text = text; }\n    @Override\n    public String getText() { return text; }\n}\n\n// 抽象工厂接口\npublic interface GUIFactory {\n    Button createButton();\n    Checkbox createCheckbox();\n    TextField createTextField();\n}\n\n// 具体工厂\npublic class WindowsFactory implements GUIFactory {\n    @Override\n    public Button createButton() { return new WindowsButton(); }\n    @Override\n    public Checkbox createCheckbox() { return new WindowsCheckbox(); }\n    @Override\n    public TextField createTextField() { return new WindowsTextField(); }\n}\n\npublic class MacFactory implements GUIFactory {\n    @Override\n    public Button createButton() { return new MacButton(); }\n    @Override\n    public Checkbox createCheckbox() { return new MacCheckbox(); }\n    @Override\n    public TextField createTextField() { return new MacTextField(); }\n}\n\npublic class LinuxFactory implements GUIFactory {\n    @Override\n    public Button createButton() { return new LinuxButton(); }\n    @Override\n    public Checkbox createCheckbox() { return new LinuxCheckbox(); }\n    @Override\n    public TextField createTextField() { return new LinuxTextField(); }\n}\n\n// 客户端代码\npublic class Application {\n    private Button button;\n    private Checkbox checkbox;\n    private TextField textField;\n\n    public Application(GUIFactory factory) {\n        button = factory.createButton();\n        checkbox = factory.createCheckbox();\n        textField = factory.createTextField();\n    }\n\n    public void paint() {\n        button.render();\n        checkbox.render();\n        textField.render();\n    }\n}\n\n// 使用示例\npublic class Client {\n    public static void main(String[] args) {\n        String osName = System.getProperty("os.name").toLowerCase();\n        GUIFactory factory;\n        if (osName.contains("win")) factory = new WindowsFactory();\n        else if (osName.contains("mac")) factory = new MacFactory();\n        else factory = new LinuxFactory();\n        Application app = new Application(factory);\n        app.paint();\n    }\n}\n\n/**\n * ============================================\n * 抽象工厂模式 - Java 函数式接口实现\n * ============================================\n */\n\nimport java.util.function.Supplier;\n\npublic interface FunctionalGUIFactory {\n    Supplier<Button> getButtonSupplier();\n    Supplier<Checkbox> getCheckboxSupplier();\n    Supplier<TextField> getTextFieldSupplier();\n}\n\npublic class WindowsFunctionalFactory implements FunctionalGUIFactory {\n    @Override\n    public Supplier<Button> getButtonSupplier() { return WindowsButton::new; }\n    @Override\n    public Supplier<Checkbox> getCheckboxSupplier() { return WindowsCheckbox::new; }\n    @Override\n    public Supplier<TextField> getTextFieldSupplier() { return WindowsTextField::new; }\n}',

    go: 'package abstractfactory\n\nimport "fmt"\n\n/**\n * ============================================\n * 抽象工厂模式 - Go 实现（面向对象方式）\n * ============================================\n */\n\n// 抽象产品接口\ntype Button interface {\n    Render()\n    OnClick(callback func())\n}\n\ntype Checkbox interface {\n    Render()\n    Toggle()\n    IsChecked() bool\n}\n\ntype TextField interface {\n    Render()\n    SetText(text string)\n    GetText() string\n}\n\n// Windows 风格产品\ntype WindowsButton struct { callback func() }\nfunc (b *WindowsButton) Render() { fmt.Println("渲染 Windows 风格按钮 [直角边框 | 蓝色背景]") }\nfunc (b *WindowsButton) OnClick(callback func()) { b.callback = callback }\n\ntype WindowsCheckbox struct { checked bool }\nfunc (c *WindowsCheckbox) Render() {\n    state := " "\n    if c.checked { state = "X" }\n    fmt.Printf("渲染 Windows 风格复选框 [%s] [方形边框]\\n", state)\n}\nfunc (c *WindowsCheckbox) Toggle() { c.checked = !c.checked }\nfunc (c *WindowsCheckbox) IsChecked() bool { return c.checked }\n\ntype WindowsTextField struct { text string }\nfunc (t *WindowsTextField) Render() {\n    display := t.text\n    if display == "" { display = "空" }\n    fmt.Printf("渲染 Windows 风格文本框 [%s] [带边框]\\n", display)\n}\nfunc (t *WindowsTextField) SetText(text string) { t.text = text }\nfunc (t *WindowsTextField) GetText() string { return t.text }\n\n// Mac 风格产品\ntype MacButton struct { callback func() }\nfunc (b *MacButton) Render() { fmt.Println("渲染 Mac 风格按钮 [圆角边框 | 渐变背景]") }\nfunc (b *MacButton) OnClick(callback func()) { b.callback = callback }\n\ntype MacCheckbox struct { checked bool }\nfunc (c *MacCheckbox) Render() {\n    state := "\\u25EF"\n    if c.checked { state = "\\u2713" }\n    fmt.Printf("渲染 Mac 风格复选框 [%s] [圆形边框]\\n", state)\n}\nfunc (c *MacCheckbox) Toggle() { c.checked = !c.checked }\nfunc (c *MacCheckbox) IsChecked() bool { return c.checked }\n\ntype MacTextField struct { text string }\nfunc (t *MacTextField) Render() {\n    display := t.text\n    if display == "" { display = "空" }\n    fmt.Printf("渲染 Mac 风格文本框 [%s] [无边框 | 下划线]\\n", display)\n}\nfunc (t *MacTextField) SetText(text string) { t.text = text }\nfunc (t *MacTextField) GetText() string { return t.text }\n\n// Linux 风格产品\ntype LinuxButton struct { callback func() }\nfunc (b *LinuxButton) Render() { fmt.Println("渲染 Linux 风格按钮 [扁平设计 | 橙色背景]") }\nfunc (b *LinuxButton) OnClick(callback func()) { b.callback = callback }\n\ntype LinuxCheckbox struct { checked bool }\nfunc (c *LinuxCheckbox) Render() {\n    state := "\\u2610"\n    if c.checked { state = "\\u2714" }\n    fmt.Printf("渲染 Linux 风格复选框 [%s] [极简风格]\\n", state)\n}\nfunc (c *LinuxCheckbox) Toggle() { c.checked = !c.checked }\nfunc (c *LinuxCheckbox) IsChecked() bool { return c.checked }\n\ntype LinuxTextField struct { text string }\nfunc (t *LinuxTextField) Render() {\n    display := t.text\n    if display == "" { display = "空" }\n    fmt.Printf("渲染 Linux 风格文本框 [%s] [扁平边框]\\n", display)\n}\nfunc (t *LinuxTextField) SetText(text string) { t.text = text }\nfunc (t *LinuxTextField) GetText() string { return t.text }\n\n// 抽象工厂接口\ntype GUIFactory interface {\n    CreateButton() Button\n    CreateCheckbox() Checkbox\n    CreateTextField() TextField\n}\n\n// 具体工厂\ntype WindowsFactory struct{}\nfunc (f *WindowsFactory) CreateButton() Button { return &WindowsButton{} }\nfunc (f *WindowsFactory) CreateCheckbox() Checkbox { return &WindowsCheckbox{} }\nfunc (f *WindowsFactory) CreateTextField() TextField { return &WindowsTextField{} }\n\ntype MacFactory struct{}\nfunc (f *MacFactory) CreateButton() Button { return &MacButton{} }\nfunc (f *MacFactory) CreateCheckbox() Checkbox { return &MacCheckbox{} }\nfunc (f *MacFactory) CreateTextField() TextField { return &MacTextField{} }\n\ntype LinuxFactory struct{}\nfunc (f *LinuxFactory) CreateButton() Button { return &LinuxButton{} }\nfunc (f *LinuxFactory) CreateCheckbox() Checkbox { return &LinuxCheckbox{} }\nfunc (f *LinuxFactory) CreateTextField() TextField { return &LinuxTextField{} }\n\n// 客户端代码\ntype Application struct {\n    factory   GUIFactory\n    button    Button\n    checkbox  Checkbox\n    textField TextField\n}\n\nfunc NewApplication(factory GUIFactory) *Application {\n    return &Application{factory: factory}\n}\n\nfunc (a *Application) CreateUI() {\n    a.button = a.factory.CreateButton()\n    a.checkbox = a.factory.CreateCheckbox()\n    a.textField = a.factory.CreateTextField()\n}\n\nfunc (a *Application) Paint() {\n    a.button.Render()\n    a.checkbox.Render()\n    a.textField.Render()\n}\n\n// 使用示例\nfunc ClientCode() {\n    var factory GUIFactory\n    osType := "windows"\n    switch osType {\n    case "windows":\n        factory = &WindowsFactory{}\n    case "mac":\n        factory = &MacFactory{}\n    case "linux":\n        factory = &LinuxFactory{}\n    default:\n        factory = &WindowsFactory{}\n    }\n    app := NewApplication(factory)\n    app.CreateUI()\n    app.Paint()\n}\n\n/**\n * ============================================\n * 抽象工厂模式 - Go 函数类型实现\n * ============================================\n */\n\ntype ButtonFactory func() Button\ntype CheckboxFactory func() Checkbox\ntype TextFieldFactory func() TextField\n\ntype FunctionalFactory struct {\n    CreateButton    ButtonFactory\n    CreateCheckbox  CheckboxFactory\n    CreateTextField TextFieldFactory\n}\n\nfunc NewWindowsFunctionalFactory() *FunctionalFactory {\n    return &FunctionalFactory{\n        CreateButton:    func() Button { return &WindowsButton{} },\n        CreateCheckbox:  func() Checkbox { return &WindowsCheckbox{} },\n        CreateTextField: func() TextField { return &WindowsTextField{} },\n    }\n}\n\nfunc FunctionalClient(factory *FunctionalFactory) {\n    button := factory.CreateButton()\n    checkbox := factory.CreateCheckbox()\n    textField := factory.CreateTextField()\n    button.Render()\n    checkbox.Render()\n    textField.Render()\n}',

    python: '"\"\"\n============================================\n抽象工厂模式 - Python 实现（面向对象方式）\n============================================\n\"\"\"\n\nfrom abc import ABC, abstractmethod\nfrom typing import Optional\n\n# 抽象产品接口\nclass Button(ABC):\n    @abstractmethod\n    def render(self) -> None: pass\n    @abstractmethod\n    def on_click(self, callback: callable) -> None: pass\n\nclass Checkbox(ABC):\n    @abstractmethod\n    def render(self) -> None: pass\n    @abstractmethod\n    def toggle(self) -> None: pass\n    @abstractmethod\n    def is_checked(self) -> bool: pass\n\nclass TextField(ABC):\n    @abstractmethod\n    def render(self) -> None: pass\n    @abstractmethod\n    def set_text(self, text: str) -> None: pass\n    @abstractmethod\n    def get_text(self) -> str: pass\n\n# Windows 风格产品\nclass WindowsButton(Button):\n    def __init__(self):\n        self._callback: Optional[callable] = None\n    def render(self) -> None:\n        print("渲染 Windows 风格按钮 [直角边框 | 蓝色背景]")\n    def on_click(self, callback: callable) -> None:\n        self._callback = callback\n\nclass WindowsCheckbox(Checkbox):\n    def __init__(self):\n        self._checked = False\n    def render(self) -> None:\n        state = "X" if self._checked else " "\n        print(f"渲染 Windows 风格复选框 [{state}] [方形边框]")\n    def toggle(self) -> None:\n        self._checked = not self._checked\n    def is_checked(self) -> bool:\n        return self._checked\n\nclass WindowsTextField(TextField):\n    def __init__(self):\n        self._text = ""\n    def render(self) -> None:\n        display = self._text if self._text else "空"\n        print(f"渲染 Windows 风格文本框 [{display}] [带边框]")\n    def set_text(self, text: str) -> None:\n        self._text = text\n    def get_text(self) -> str:\n        return self._text\n\n# Mac 风格产品\nclass MacButton(Button):\n    def __init__(self):\n        self._callback: Optional[callable] = None\n    def render(self) -> None:\n        print("渲染 Mac 风格按钮 [圆角边框 | 渐变背景]")\n    def on_click(self, callback: callable) -> None:\n        self._callback = callback\n\nclass MacCheckbox(Checkbox):\n    def __init__(self):\n        self._checked = False\n    def render(self) -> None:\n        state = "\\u2713" if self._checked else "\\u25EF"\n        print(f"渲染 Mac 风格复选框 [{state}] [圆形边框]")\n    def toggle(self) -> None:\n        self._checked = not self._checked\n    def is_checked(self) -> bool:\n        return self._checked\n\nclass MacTextField(TextField):\n    def __init__(self):\n        self._text = ""\n    def render(self) -> None:\n        display = self._text if self._text else "空"\n        print(f"渲染 Mac 风格文本框 [{display}] [无边框 | 下划线]")\n    def set_text(self, text: str) -> None:\n        self._text = text\n    def get_text(self) -> str:\n        return self._text\n\n# Linux 风格产品\nclass LinuxButton(Button):\n    def __init__(self):\n        self._callback: Optional[callable] = None\n    def render(self) -> None:\n        print("渲染 Linux 风格按钮 [扁平设计 | 橙色背景]")\n    def on_click(self, callback: callable) -> None:\n        self._callback = callback\n\nclass LinuxCheckbox(Checkbox):\n    def __init__(self):\n        self._checked = False\n    def render(self) -> None:\n        state = "\\u2714" if self._checked else "\\u2610"\n        print(f"渲染 Linux 风格复选框 [{state}] [极简风格]")\n    def toggle(self) -> None:\n        self._checked = not self._checked\n    def is_checked(self) -> bool:\n        return self._checked\n\nclass LinuxTextField(TextField):\n    def __init__(self):\n        self._text = ""\n    def render(self) -> None:\n        display = self._text if self._text else "空"\n        print(f"渲染 Linux 风格文本框 [{display}] [扁平边框]")\n    def set_text(self, text: str) -> None:\n        self._text = text\n    def get_text(self) -> str:\n        return self._text\n\n# 抽象工厂\nclass GUIFactory(ABC):\n    @abstractmethod\n    def create_button(self) -> Button: pass\n    @abstractmethod\n    def create_checkbox(self) -> Checkbox: pass\n    @abstractmethod\n    def create_text_field(self) -> TextField: pass\n\n# 具体工厂\nclass WindowsFactory(GUIFactory):\n    def create_button(self) -> Button:\n        return WindowsButton()\n    def create_checkbox(self) -> Checkbox:\n        return WindowsCheckbox()\n    def create_text_field(self) -> TextField:\n        return WindowsTextField()\n\nclass MacFactory(GUIFactory):\n    def create_button(self) -> Button:\n        return MacButton()\n    def create_checkbox(self) -> Checkbox:\n        return MacCheckbox()\n    def create_text_field(self) -> TextField:\n        return MacTextField()\n\nclass LinuxFactory(GUIFactory):\n    def create_button(self) -> Button:\n        return LinuxButton()\n    def create_checkbox(self) -> Checkbox:\n        return LinuxCheckbox()\n    def create_text_field(self) -> TextField:\n        return LinuxTextField()\n\n# 客户端代码\nclass Application:\n    def __init__(self, factory: GUIFactory):\n        self._factory = factory\n        self._button: Optional[Button] = None\n        self._checkbox: Optional[Checkbox] = None\n        self._text_field: Optional[TextField] = None\n    def create_ui(self) -> None:\n        self._button = self._factory.create_button()\n        self._checkbox = self._factory.create_checkbox()\n        self._text_field = self._factory.create_text_field()\n    def paint(self) -> None:\n        if self._button:\n            self._button.render()\n        if self._checkbox:\n            self._checkbox.render()\n        if self._text_field:\n            self._text_field.render()\n\n# 使用示例\ndef client_code():\n    import platform\n    system = platform.system().lower()\n    factory: GUIFactory\n    if system == "windows":\n        factory = WindowsFactory()\n    elif system == "darwin":\n        factory = MacFactory()\n    else:\n        factory = LinuxFactory()\n    app = Application(factory)\n    app.create_ui()\n    app.paint()\n\nif __name__ == "__main__":\n    client_code()\n\n\"\"\"\n============================================\n抽象工厂模式 - Python 函数式实现\n============================================\n\"\"\"\n\nfrom typing import Callable, Dict, Any\n\nButtonFactory = Callable[[], Dict[str, Any]]\nCheckboxFactory = Callable[[], Dict[str, Any]]\nTextFieldFactory = Callable[[], Dict[str, Any]]\n\ndef create_windows_button():\n    return {\n        "render": lambda: print("Windows 按钮"),\n        "on_click": lambda cb: cb()\n    }\n\ndef create_windows_checkbox():\n    checked = [False]\n    return {\n        "render": lambda: print(f"Windows 复选框: {checked[0]}"),\n        "toggle": lambda: checked.__setitem__(0, not checked[0]),\n        "is_checked": lambda: checked[0]\n    }\n\ndef create_windows_text_field():\n    text = [""]\n    return {\n        "render": lambda: print(f"Windows 文本框: {text[0]}"),\n        "set_text": lambda t: text.__setitem__(0, t),\n        "get_text": lambda: text[0]\n    }\n\ndef create_windows_factory():\n    return {\n        "create_button": create_windows_button,\n        "create_checkbox": create_windows_checkbox,\n        "create_text_field": create_windows_text_field\n    }\n\ndef functional_client(factory: Dict[str, Callable]):\n    button = factory["create_button"]()\n    checkbox = factory["create_checkbox"]()\n    text_field = factory["create_text_field"]()\n    button["render"]()\n    checkbox["render"]()\n    text_field["render"]()\n\nfunctional_client(create_windows_factory())',

    cpp: '/**\n * ============================================\n * 抽象工厂模式 - C++ 实现（面向对象方式）\n * ============================================\n */\n\n#include <iostream>\n#include <memory>\n#include <string>\n#include <functional>\n\n// 抽象产品接口\nclass Button {\npublic:\n    virtual ~Button() = default;\n    virtual void render() = 0;\n    virtual void onClick(void (*callback)()) = 0;\n};\n\nclass Checkbox {\npublic:\n    virtual ~Checkbox() = default;\n    virtual void render() = 0;\n    virtual void toggle() = 0;\n    virtual bool isChecked() = 0;\n};\n\nclass TextField {\npublic:\n    virtual ~TextField() = default;\n    virtual void render() = 0;\n    virtual void setText(const std::string& text) = 0;\n    virtual std::string getText() = 0;\n};\n\n// Windows 风格产品\nclass WindowsButton : public Button {\nprivate:\n    void (*callback)() = nullptr;\npublic:\n    void render() override {\n        std::cout << "渲染 Windows 风格按钮 [直角边框 | 蓝色背景]" << std::endl;\n    }\n    void onClick(void (*cb)()) override { callback = cb; }\n};\n\nclass WindowsCheckbox : public Checkbox {\nprivate:\n    bool checked = false;\npublic:\n    void render() override {\n        std::cout << "渲染 Windows 风格复选框 [" << (checked ? "X" : " ") << "] [方形边框]" << std::endl;\n    }\n    void toggle() override { checked = !checked; }\n    bool isChecked() override { return checked; }\n};\n\nclass WindowsTextField : public TextField {\nprivate:\n    std::string text;\npublic:\n    void render() override {\n        std::cout << "渲染 Windows 风格文本框 [" << (text.empty() ? "空" : text) << "] [带边框]" << std::endl;\n    }\n    void setText(const std::string& t) override { text = t; }\n    std::string getText() override { return text; }\n};\n\n// Mac 风格产品\nclass MacButton : public Button {\nprivate:\n    void (*callback)() = nullptr;\npublic:\n    void render() override {\n        std::cout << "渲染 Mac 风格按钮 [圆角边框 | 渐变背景]" << std::endl;\n    }\n    void onClick(void (*cb)()) override { callback = cb; }\n};\n\nclass MacCheckbox : public Checkbox {\nprivate:\n    bool checked = false;\npublic:\n    void render() override {\n        std::cout << "渲染 Mac 风格复选框 [" << (checked ? "\\u2713" : "\\u25EF") << "] [圆形边框]" << std::endl;\n    }\n    void toggle() override { checked = !checked; }\n    bool isChecked() override { return checked; }\n};\n\nclass MacTextField : public TextField {\nprivate:\n    std::string text;\npublic:\n    void render() override {\n        std::cout << "渲染 Mac 风格文本框 [" << (text.empty() ? "空" : text) << "] [无边框 | 下划线]" << std::endl;\n    }\n    void setText(const std::string& t) override { text = t; }\n    std::string getText() override { return text; }\n};\n\n// Linux 风格产品\nclass LinuxButton : public Button {\nprivate:\n    void (*callback)() = nullptr;\npublic:\n    void render() override {\n        std::cout << "渲染 Linux 风格按钮 [扁平设计 | 橙色背景]" << std::endl;\n    }\n    void onClick(void (*cb)()) override { callback = cb; }\n};\n\nclass LinuxCheckbox : public Checkbox {\nprivate:\n    bool checked = false;\npublic:\n    void render() override {\n        std::cout << "渲染 Linux 风格复选框 [" << (checked ? "\\u2714" : "\\u2610") << "] [极简风格]" << std::endl;\n    }\n    void toggle() override { checked = !checked; }\n    bool isChecked() override { return checked; }\n};\n\nclass LinuxTextField : public TextField {\nprivate:\n    std::string text;\npublic:\n    void render() override {\n        std::cout << "渲染 Linux 风格文本框 [" << (text.empty() ? "空" : text) << "] [扁平边框]" << std::endl;\n    }\n    void setText(const std::string& t) override { text = t; }\n    std::string getText() override { return text; }\n};\n\n// 抽象工厂接口\nclass GUIFactory {\npublic:\n    virtual ~GUIFactory() = default;\n    virtual std::unique_ptr<Button> createButton() = 0;\n    virtual std::unique_ptr<Checkbox> createCheckbox() = 0;\n    virtual std::unique_ptr<TextField> createTextField() = 0;\n};\n\n// 具体工厂\nclass WindowsFactory : public GUIFactory {\npublic:\n    std::unique_ptr<Button> createButton() override {\n        return std::make_unique<WindowsButton>();\n    }\n    std::unique_ptr<Checkbox> createCheckbox() override {\n        return std::make_unique<WindowsCheckbox>();\n    }\n    std::unique_ptr<TextField> createTextField() override {\n        return std::make_unique<WindowsTextField>();\n    }\n};\n\nclass MacFactory : public GUIFactory {\npublic:\n    std::unique_ptr<Button> createButton() override {\n        return std::make_unique<MacButton>();\n    }\n    std::unique_ptr<Checkbox> createCheckbox() override {\n        return std::make_unique<MacCheckbox>();\n    }\n    std::unique_ptr<TextField> createTextField() override {\n        return std::make_unique<MacTextField>();\n    }\n};\n\nclass LinuxFactory : public GUIFactory {\npublic:\n    std::unique_ptr<Button> createButton() override {\n        return std::make_unique<LinuxButton>();\n    }\n    std::unique_ptr<Checkbox> createCheckbox() override {\n        return std::make_unique<LinuxCheckbox>();\n    }\n    std::unique_ptr<TextField> createTextField() override {\n        return std::make_unique<LinuxTextField>();\n    }\n};\n\n// 客户端代码\nclass Application {\nprivate:\n    std::unique_ptr<Button> button;\n    std::unique_ptr<Checkbox> checkbox;\n    std::unique_ptr<TextField> textField;\npublic:\n    explicit Application(GUIFactory& factory) {\n        button = factory.createButton();\n        checkbox = factory.createCheckbox();\n        textField = factory.createTextField();\n    }\n    void paint() {\n        button->render();\n        checkbox->render();\n        textField->render();\n    }\n};\n\n// 使用示例\nint main() {\n    std::unique_ptr<GUIFactory> factory;\n    std::string osType = "windows";\n    if (osType == "windows") {\n        factory = std::make_unique<WindowsFactory>();\n    } else if (osType == "mac") {\n        factory = std::make_unique<MacFactory>();\n    } else {\n        factory = std::make_unique<LinuxFactory>();\n    }\n    Application app(*factory);\n    app.paint();\n    return 0;\n}\n\n/**\n * ============================================\n * 抽象工厂模式 - C++ 函数对象实现\n * ============================================\n */\n\nusing ButtonFactory = std::function<std::unique_ptr<Button>()>;\nusing CheckboxFactory = std::function<std::unique_ptr<Checkbox>()>;\nusing TextFieldFactory = std::function<std::unique_ptr<TextField>()>;\n\nstruct FunctionalFactory {\n    ButtonFactory createButton;\n    CheckboxFactory createCheckbox;\n    TextFieldFactory createTextField;\n};\n\nFunctionalFactory createWindowsFunctionalFactory() {\n    return FunctionalFactory{\n        []() -> std::unique_ptr<Button> { return std::make_unique<WindowsButton>(); },\n        []() -> std::unique_ptr<Checkbox> { return std::make_unique<WindowsCheckbox>(); },\n        []() -> std::unique_ptr<TextField> { return std::make_unique<WindowsTextField>(); }\n    };\n}\n\nFunctionalFactory createMacFunctionalFactory() {\n    return FunctionalFactory{\n        []() -> std::unique_ptr<Button> { return std::make_unique<MacButton>(); },\n        []() -> std::unique_ptr<Checkbox> { return std::make_unique<MacCheckbox>(); },\n        []() -> std::unique_ptr<TextField> { return std::make_unique<MacTextField>(); }\n    };\n}\n\nvoid functionalClient(const FunctionalFactory& factory) {\n    auto button = factory.createButton();\n    auto checkbox = factory.createCheckbox();\n    auto textField = factory.createTextField();\n    button->render();\n    checkbox->render();\n    textField->render();\n}',
  },
  realWorldExamples: [
    {
      title: 'Java AWT/Swing',
      description: 'Java 的 GUI 工具包使用抽象工厂来创建跨平台的 UI 组件。',
      source: 'JDK',
      codeSnippet: 'Toolkit toolkit = Toolkit.getDefaultToolkit();\nButton button = toolkit.createButton(new Button("Click"));',
    },
  ],
  relatedPatterns: ['factory-method', 'singleton', 'builder'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '抽象工厂模式的主要目的是什么？',
      options: [
        '创建一个对象',
        '创建一系列相关的对象',
        '销毁对象',
        '复制对象',
      ],
      correctAnswer: 1,
      explanation: '抽象工厂模式的主要目的是创建一系列相关的对象，而无需指定其具体类。',
    },
  ],
};
