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
    animationSteps: [],
  },
  implementation: {
    typescript: `// 抽象产品接口
interface Button {
  render(): void;
}

interface Checkbox {
  render(): void;
}

// 具体产品：Windows风格
class WindowsButton implements Button {
  render() {
    console.log('渲染 Windows 按钮');
  }
}

class WindowsCheckbox implements Checkbox {
  render() {
    console.log('渲染 Windows 复选框');
  }
}

// 具体产品：Mac风格
class MacButton implements Button {
  render() {
    console.log('渲染 Mac 按钮');
  }
}

class MacCheckbox implements Checkbox {
  render() {
    console.log('渲染 Mac 复选框');
  }
}

// 抽象工厂
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// 具体工厂
class WindowsFactory implements GUIFactory {
  createButton(): Button {
    return new WindowsButton();
  }
  createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
}

class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }
  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}

// 客户端代码
function createUI(factory: GUIFactory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();
  button.render();
  checkbox.render();
}`,

    java: `// 抽象产品
public interface Button {
    void render();
}

public interface Checkbox {
    void render();
}

// 具体产品
public class WindowsButton implements Button {
    @Override
    public void render() {
        System.out.println("渲染 Windows 按钮");
    }
}

// 抽象工厂
public interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

// 具体工厂
public class WindowsFactory implements GUIFactory {
    @Override
    public Button createButton() {
        return new WindowsButton();
    }
    
    @Override
    public Checkbox createCheckbox() {
        return new WindowsCheckbox();
    }
}`,

    go: `package abstractfactory

// Button 接口
type Button interface {
    Render()
}

// Checkbox 接口
type Checkbox interface {
    Render()
}

// WindowsButton 具体产品
type WindowsButton struct{}

func (b *WindowsButton) Render() {
    println("渲染 Windows 按钮")
}

// GUIFactory 抽象工厂接口
type GUIFactory interface {
    CreateButton() Button
    CreateCheckbox() Checkbox
}

// WindowsFactory 具体工厂
type WindowsFactory struct{}

func (f *WindowsFactory) CreateButton() Button {
    return &WindowsButton{}
}

func (f *WindowsFactory) CreateCheckbox() Checkbox {
    return &WindowsCheckbox{}
}`,

    python: `from abc import ABC, abstractmethod

# 抽象产品
class Button(ABC):
    @abstractmethod
    def render(self):
        pass

class Checkbox(ABC):
    @abstractmethod
    def render(self):
        pass

# 具体产品
class WindowsButton(Button):
    def render(self):
        print("渲染 Windows 按钮")

# 抽象工厂
class GUIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button:
        pass
    
    @abstractmethod
    def create_checkbox(self) -> Checkbox:
        pass

# 具体工厂
class WindowsFactory(GUIFactory):
    def create_button(self) -> Button:
        return WindowsButton()
    
    def create_checkbox(self) -> Checkbox:
        return WindowsCheckbox()`,

    cpp: `// 抽象产品
class Button {
public:
    virtual void render() = 0;
    virtual ~Button() = default;
};

// 具体产品
class WindowsButton : public Button {
public:
    void render() override {
        std::cout << "渲染 Windows 按钮" << std::endl;
    }
};

// 抽象工厂
class GUIFactory {
public:
    virtual Button* createButton() = 0;
    virtual Checkbox* createCheckbox() = 0;
    virtual ~GUIFactory() = default;
};

// 具体工厂
class WindowsFactory : public GUIFactory {
public:
    Button* createButton() override {
        return new WindowsButton();
    }
    
    Checkbox* createCheckbox() override {
        return new WindowsCheckbox();
    }
};`,
  },
  realWorldExamples: [
    {
      title: 'Java AWT/Swing',
      description: 'Java 的 GUI 工具包使用抽象工厂来创建跨平台的 UI 组件。',
      source: 'JDK',
      codeSnippet: `Toolkit toolkit = Toolkit.getDefaultToolkit();
Button button = toolkit.createButton(new Button("Click"));`,
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
