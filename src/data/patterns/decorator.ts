import type { DesignPattern } from '@/types/pattern';

export const decoratorPattern: DesignPattern = {
  id: 'decorator',
  name: '装饰器模式',
  nameEn: 'Decorator Pattern',
  category: 'structural',
  difficulty: 'medium',
  frequency: 'high',
  intent: '动态地给一个对象添加一些额外的职责。就增加功能来说，装饰器模式相比生成子类更为灵活。',
  description: '装饰器模式是一种结构型设计模式，允许你通过将对象放入包含行为的特殊包装对象中来为原对象绑定新的行为。',
  applicability: [
    '当需要在运行时动态添加功能时',
    '当需要扩展一个类的功能，但继承不是可行选项时',
    '当需要为对象添加多个可以独立变化和组合的额外功能时',
    '当不能或不方便使用继承来扩展功能时（如类被 final 修饰）',
  ],
  pros: [
    '可以在运行时添加或删除对象的功能',
    '可以用多个装饰器包装对象，实现功能的自由组合',
    '单一职责原则：将功能划分为不同类，每个类只负责一项功能',
    '开闭原则：无需修改现有代码即可扩展对象的行为',
    '比继承更灵活，避免了类爆炸问题',
  ],
  cons: [
    '在装饰器栈中删除特定装饰器比较困难',
    '实现行为不受装饰器栈顺序影响的装饰器可能很困难',
    '代码调试可能变得复杂，因为需要跟踪多层包装',
    '可能会产生大量的小类，增加系统复杂度',
  ],
  analogy: {
    title: '现实世界中的装饰器',
    description: '装饰器就像是穿衣服或给咖啡加配料',
    scenarios: [
      {
        id: 'clothes',
        title: '穿衣服',
        description: '你穿上T恤，再穿上衬衫，再穿上外套。每层衣服都给你添加了新的功能（保暖、正式外观等）。你可以自由组合不同的衣物，而不需要改变自己的身体。',
        icon: 'Shirt',
      },
      {
        id: 'coffee',
        title: '咖啡配料',
        description: '点一杯基础咖啡，可以添加牛奶、糖、奶油、焦糖等配料。每种配料都装饰了咖啡，增加了新的口味和功能，而不需要创建无数种咖啡子类。',
        icon: 'Coffee',
      },
      {
        id: 'pizza',
        title: '披萨配料',
        description: '基础披萨可以添加各种配料：芝士、蘑菇、香肠、橄榄等。每种配料都是一层装饰，可以自由组合出无数种披萨。',
        icon: 'Pizza',
      },
    ],
  },
  structure: {
    classDiagram: `
      class Component {
        <<interface>>
        +operation()
      }
      class ConcreteComponent {
        +operation()
      }
      class Decorator {
        -component: Component
        +operation()
      }
      class ConcreteDecoratorA {
        -addedState
        +operation()
      }
      class ConcreteDecoratorB {
        +addedBehavior()
        +operation()
      }
      Component <|-- ConcreteComponent
      Component <|-- Decorator
      Decorator o-- Component
      Decorator <|-- ConcreteDecoratorA
      Decorator <|-- ConcreteDecoratorB
    `,
    mermaidDiagram: `
classDiagram
  class Component {
    <<interface>>
    +operation() string
  }
  
  class ConcreteComponent {
    +operation() string
  }
  
  class Decorator {
    -component: Component
    +operation() string
  }
  
  class BorderDecorator {
    -borderWidth: number
    +operation() string
    +drawBorder()
  }
  
  class ScrollDecorator {
    -scrollPosition: number
    +operation() string
    +scrollTo()
  }
  
  class ShadowDecorator {
    -shadowColor: string
    -shadowBlur: number
    +operation() string
    +applyShadow()
  }
  
  class Client {
    +main()
  }
  
  Component <|.. ConcreteComponent
  Component <|.. Decorator
  Decorator o--> Component : wraps
  Decorator <|-- BorderDecorator
  Decorator <|-- ScrollDecorator
  Decorator <|-- ShadowDecorator
  Client ..> Component : uses
  
  style Component fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
  style ConcreteComponent fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style Decorator fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style BorderDecorator fill:#fce4ec,stroke:#c2185b,stroke-width:1px
  style ScrollDecorator fill:#fce4ec,stroke:#c2185b,stroke-width:1px
  style ShadowDecorator fill:#fce4ec,stroke:#c2185b,stroke-width:1px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: 'Component 接口',
        description: '定义组件的通用接口，这是装饰器和具体组件的共同基类',
        duration: 2000,
        elements: [
          { id: 'component', type: 'interface', name: 'Component', x: 200, y: 150, methods: ['+operation()'] },
        ],
      },
      {
        id: 'step2',
        title: 'ConcreteComponent',
        description: '具体组件实现基础功能，这是被装饰的原始对象',
        duration: 2000,
        elements: [
          { id: 'component', type: 'interface', name: 'Component', x: 200, y: 150, methods: ['+operation()'] },
          { id: 'concrete', type: 'class', name: 'ConcreteComponent', x: 200, y: 350, methods: ['+operation()'] },
        ],
        connections: [
          { from: 'concrete', to: 'component', type: 'implementation' },
        ],
      },
      {
        id: 'step3',
        title: 'Decorator 基类',
        description: '装饰器基类包含一个 Component 引用，并实现相同的接口',
        duration: 2500,
        elements: [
          { id: 'component', type: 'interface', name: 'Component', x: 200, y: 150, methods: ['+operation()'] },
          { id: 'concrete', type: 'class', name: 'ConcreteComponent', x: 200, y: 350, methods: ['+operation()'] },
          { id: 'decorator', type: 'class', name: 'Decorator', x: 500, y: 350, properties: ['-component: Component'], methods: ['+operation()'] },
        ],
        connections: [
          { from: 'concrete', to: 'component', type: 'implementation' },
          { from: 'decorator', to: 'component', type: 'implementation' },
          { from: 'decorator', to: 'component', type: 'aggregation', label: 'wraps' },
        ],
      },
      {
        id: 'step4',
        title: '具体装饰器',
        description: '具体装饰器添加新的行为，可以在调用被包装对象之前或之后执行',
        duration: 3000,
        elements: [
          { id: 'component', type: 'interface', name: 'Component', x: 200, y: 150, methods: ['+operation()'] },
          { id: 'concrete', type: 'class', name: 'ConcreteComponent', x: 200, y: 350, methods: ['+operation()'] },
          { id: 'decorator', type: 'class', name: 'Decorator', x: 500, y: 350, properties: ['-component: Component'], methods: ['+operation()'] },
          { id: 'border', type: 'class', name: 'BorderDecorator', x: 350, y: 550, properties: ['-borderWidth'], methods: ['+operation()', '+drawBorder()'] },
          { id: 'scroll', type: 'class', name: 'ScrollDecorator', x: 650, y: 550, properties: ['-scrollPos'], methods: ['+operation()', '+scrollTo()'] },
        ],
        connections: [
          { from: 'concrete', to: 'component', type: 'implementation' },
          { from: 'decorator', to: 'component', type: 'implementation' },
          { from: 'decorator', to: 'component', type: 'aggregation', label: 'wraps' },
          { from: 'border', to: 'decorator', type: 'inheritance' },
          { from: 'scroll', to: 'decorator', type: 'inheritance' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * ============================================
 * 装饰器模式 - TypeScript 实现
 * 场景：UI 组件装饰（边框、滚动条、阴影）
 * ============================================
 */

// ============================================
// 1. Component 接口 - 组件通用接口
// ============================================
interface Component {
  /**
   * 核心操作方法
   * 所有具体组件和装饰器都必须实现此方法
   */
  operation(): string;
  
  /**
   * 获取组件描述
   */
  getDescription(): string;
}

// ============================================
// 2. ConcreteComponent - 具体组件（被装饰对象）
// ============================================
class TextView implements Component {
  private content: string;

  constructor(content: string = "Hello World") {
    this.content = content;
  }

  operation(): string {
    return this.content;
  }

  getDescription(): string {
    return "TextView";
  }
}

// ============================================
// 3. Decorator 基类 - 装饰器抽象类
// ============================================
abstract class Decorator implements Component {
  // 被包装的组件（可以是具体组件或其他装饰器）
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  /**
   * 默认实现：直接委托给被包装组件
   * 子类可以重写此方法以添加新行为
   */
  operation(): string {
    return this.component.operation();
  }

  getDescription(): string {
    return this.component.getDescription();
  }
}

// ============================================
// 4. ConcreteDecorator - 具体装饰器
// ============================================

/**
 * 边框装饰器 - 为组件添加边框
 */
class BorderDecorator extends Decorator {
  private borderWidth: number;
  private borderColor: string;

  constructor(component: Component, width: number = 1, color: string = "black") {
    super(component);
    this.borderWidth = width;
    this.borderColor = color;
  }

  operation(): string {
    // 在原有内容基础上添加边框效果
    const content = this.component.operation();
    const border = "=".repeat(content.length + 4);
    return \`\${border}\\n| \${content} |\\n\${border}\`;
  }

  getDescription(): string {
    return \`\${this.component.getDescription()} + Border(\${this.borderWidth}px \${this.borderColor})\`;
  }

  // 装饰器特有的方法
  setBorder(width: number, color: string): void {
    this.borderWidth = width;
    this.borderColor = color;
  }
}

/**
 * 滚动条装饰器 - 为组件添加滚动功能
 */
class ScrollDecorator extends Decorator {
  private scrollPosition: number = 0;
  private maxScroll: number;

  constructor(component: Component, maxScroll: number = 100) {
    super(component);
    this.maxScroll = maxScroll;
  }

  operation(): string {
    const content = this.component.operation();
    const scrollBar = \`[Scroll: \${this.scrollPosition}/\${this.maxScroll}]\\n\`;
    return scrollBar + content;
  }

  getDescription(): string {
    return \`\${this.component.getDescription()} + ScrollBar\`;
  }

  scrollTo(position: number): void {
    this.scrollPosition = Math.max(0, Math.min(position, this.maxScroll));
  }

  scrollDown(amount: number): void {
    this.scrollTo(this.scrollPosition + amount);
  }
}

/**
 * 阴影装饰器 - 为组件添加阴影效果
 */
class ShadowDecorator extends Decorator {
  private shadowColor: string;
  private shadowBlur: number;

  constructor(component: Component, color: string = "gray", blur: number = 5) {
    super(component);
    this.shadowColor = color;
    this.shadowBlur = blur;
  }

  operation(): string {
    const content = this.component.operation();
    const shadowEffect = \`[Shadow: \${this.shadowColor}, blur=\${this.shadowBlur}]\`;
    return \`\${content}\\n\${shadowEffect}\`;
  }

  getDescription(): string {
    return \`\${this.component.getDescription()} + Shadow(\${this.shadowColor})\`;
  }
}

// ============================================
// 5. 方法装饰器示例（TypeScript 特有）
// ============================================

/**
 * 日志装饰器 - 记录方法调用
 */
function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(\`[LOG] Calling \${propertyKey} with args: \`, args);
    const result = originalMethod.apply(this, args);
    console.log(\`[LOG] \${propertyKey} returned: \`, result);
    return result;
  };

  return descriptor;
}

/**
 * 性能监控装饰器 - 记录方法执行时间
 */
function MeasurePerformance(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(\`[PERF] \${propertyKey} took \${(end - start).toFixed(2)}ms\`);
    return result;
  };

  return descriptor;
}

class Calculator {
  @LogMethod
  @MeasurePerformance
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}

// ============================================
// 6. 客户端代码 - 展示多层装饰
// ============================================
function clientCode(): void {
  console.log("=== 装饰器模式演示 ===\\n");

  // 1. 基础组件
  const textView = new TextView("Hello, Decorator!");
  console.log("1. 基础组件:");
  console.log("描述:", textView.getDescription());
  console.log("内容:");
  console.log(textView.operation());
  console.log();

  // 2. 单层装饰：添加边框
  const borderedView = new BorderDecorator(textView, 2, "blue");
  console.log("2. 添加边框后:");
  console.log("描述:", borderedView.getDescription());
  console.log("内容:");
  console.log(borderedView.operation());
  console.log();

  // 3. 多层装饰：边框 + 滚动条
  const scrolledBorderedView = new ScrollDecorator(borderedView, 50);
  console.log("3. 添加边框 + 滚动条后:");
  console.log("描述:", scrolledBorderedView.getDescription());
  console.log("内容:");
  console.log(scrolledBorderedView.operation());
  console.log();

  // 4. 三层装饰：边框 + 滚动条 + 阴影
  const fullyDecorated = new ShadowDecorator(scrolledBorderedView, "darkgray", 10);
  console.log("4. 添加边框 + 滚动条 + 阴影后:");
  console.log("描述:", fullyDecorated.getDescription());
  console.log("内容:");
  console.log(fullyDecorated.operation());
  console.log();

  // 5. 不同顺序的装饰（顺序会影响最终效果）
  const shadowFirst = new BorderDecorator(new ShadowDecorator(new TextView("Different Order")));
  console.log("5. 不同装饰顺序（先阴影后边框）:");
  console.log("描述:", shadowFirst.getDescription());
  console.log("内容:");
  console.log(shadowFirst.operation());
  console.log();

  // 6. 方法装饰器演示
  console.log("=== 方法装饰器演示 ===");
  const calc = new Calculator();
  calc.fibonacci(10);
}

clientCode();`,

    java: `/**
 * ============================================
 * 装饰器模式 - Java 实现
 * 场景：UI 组件装饰 + Java I/O 示例
 * ============================================
 */

// ============================================
// 1. Component 接口 - 组件通用接口
// ============================================
public interface Component {
    /**
     * 核心操作方法
     * 所有具体组件和装饰器都必须实现此方法
     */
    String operation();
    
    /**
     * 获取组件描述
     */
    String getDescription();
}

// ============================================
// 2. ConcreteComponent - 具体组件（被装饰对象）
// ============================================
public class TextView implements Component {
    private String content;

    public TextView() {
        this("Hello World");
    }

    public TextView(String content) {
        this.content = content;
    }

    @Override
    public String operation() {
        return content;
    }

    @Override
    public String getDescription() {
        return "TextView";
    }
}

// ============================================
// 3. Decorator 基类 - 装饰器抽象类
// ============================================
public abstract class Decorator implements Component {
    // 被包装的组件（可以是具体组件或其他装饰器）
    protected Component component;

    public Decorator(Component component) {
        this.component = component;
    }

    /**
     * 默认实现：直接委托给被包装组件
     * 子类可以重写此方法以添加新行为
     */
    @Override
    public String operation() {
        return component.operation();
    }

    @Override
    public String getDescription() {
        return component.getDescription();
    }
}

// ============================================
// 4. ConcreteDecorator - 具体装饰器
// ============================================

/**
 * 边框装饰器 - 为组件添加边框
 */
public class BorderDecorator extends Decorator {
    private int borderWidth;
    private String borderColor;

    public BorderDecorator(Component component) {
        this(component, 1, "black");
    }

    public BorderDecorator(Component component, int width, String color) {
        super(component);
        this.borderWidth = width;
        this.borderColor = color;
    }

    @Override
    public String operation() {
        String content = component.operation();
        String border = "=".repeat(content.length() + 4);
        return border + "\\n| " + content + " |\\n" + border;
    }

    @Override
    public String getDescription() {
        return component.getDescription() + " + Border(" + borderWidth + "px " + borderColor + ")";
    }

    public void setBorder(int width, String color) {
        this.borderWidth = width;
        this.borderColor = color;
    }
}

/**
 * 滚动条装饰器 - 为组件添加滚动功能
 */
public class ScrollDecorator extends Decorator {
    private int scrollPosition = 0;
    private int maxScroll;

    public ScrollDecorator(Component component) {
        this(component, 100);
    }

    public ScrollDecorator(Component component, int maxScroll) {
        super(component);
        this.maxScroll = maxScroll;
    }

    @Override
    public String operation() {
        String content = component.operation();
        String scrollBar = "[Scroll: " + scrollPosition + "/" + maxScroll + "]\\n";
        return scrollBar + content;
    }

    @Override
    public String getDescription() {
        return component.getDescription() + " + ScrollBar";
    }

    public void scrollTo(int position) {
        this.scrollPosition = Math.max(0, Math.min(position, maxScroll));
    }

    public void scrollDown(int amount) {
        scrollTo(scrollPosition + amount);
    }
}

/**
 * 阴影装饰器 - 为组件添加阴影效果
 */
public class ShadowDecorator extends Decorator {
    private String shadowColor;
    private int shadowBlur;

    public ShadowDecorator(Component component) {
        this(component, "gray", 5);
    }

    public ShadowDecorator(Component component, String color, int blur) {
        super(component);
        this.shadowColor = color;
        this.shadowBlur = blur;
    }

    @Override
    public String operation() {
        String content = component.operation();
        String shadowEffect = "[Shadow: " + shadowColor + ", blur=" + shadowBlur + "]";
        return content + "\\n" + shadowEffect;
    }

    @Override
    public String getDescription() {
        return component.getDescription() + " + Shadow(" + shadowColor + ")";
    }
}

// ============================================
// 5. Java I/O 装饰器模式示例
// ============================================

/**
 * Java I/O 是装饰器模式的经典应用
 * InputStream 是 Component，FileInputStream 是 ConcreteComponent
 * BufferedInputStream、DataInputStream 等是 Decorator
 */
public class JavaIOExample {
    
    public static void demonstrateIO() {
        String filePath = "example.txt";
        
        try {
            // 基础文件流
            InputStream fileStream = new FileInputStream(filePath);
            
            // 添加缓冲功能（装饰）
            InputStream bufferedStream = new BufferedInputStream(fileStream);
            
            // 添加数据读取功能（再次装饰）
            DataInputStream dataStream = new DataInputStream(bufferedStream);
            
            // 或者使用更高级的装饰
            Reader reader = new InputStreamReader(dataStream, StandardCharsets.UTF_8);
            BufferedReader bufferedReader = new BufferedReader(reader);
            
            // 读取文件内容
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                System.out.println(line);
            }
            
            bufferedReader.close();
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    /**
     * 写入示例：同样使用装饰器模式
     */
    public static void demonstrateOutput() {
        String filePath = "output.txt";
        
        try {
            // FileOutputStream -> BufferedOutputStream -> DataOutputStream
            FileOutputStream fos = new FileOutputStream(filePath);
            BufferedOutputStream bos = new BufferedOutputStream(fos);
            DataOutputStream dos = new DataOutputStream(bos);
            
            // 现在可以方便地写入各种数据类型
            dos.writeUTF("Hello, Decorator Pattern!");
            dos.writeInt(42);
            dos.writeDouble(3.14159);
            
            dos.close(); // 关闭最外层的装饰器会自动关闭内部的流
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

// ============================================
// 6. 客户端代码 - 展示多层装饰
// ============================================
public class Client {
    public static void main(String[] args) {
        System.out.println("=== 装饰器模式演示 ===\\n");

        // 1. 基础组件
        Component textView = new TextView("Hello, Decorator!");
        System.out.println("1. 基础组件:");
        System.out.println("描述: " + textView.getDescription());
        System.out.println("内容:");
        System.out.println(textView.operation());
        System.out.println();

        // 2. 单层装饰：添加边框
        Component borderedView = new BorderDecorator(textView, 2, "blue");
        System.out.println("2. 添加边框后:");
        System.out.println("描述: " + borderedView.getDescription());
        System.out.println("内容:");
        System.out.println(borderedView.operation());
        System.out.println();

        // 3. 多层装饰：边框 + 滚动条
        Component scrolledBorderedView = new ScrollDecorator(borderedView, 50);
        System.out.println("3. 添加边框 + 滚动条后:");
        System.out.println("描述: " + scrolledBorderedView.getDescription());
        System.out.println("内容:");
        System.out.println(scrolledBorderedView.operation());
        System.out.println();

        // 4. 三层装饰：边框 + 滚动条 + 阴影
        Component fullyDecorated = new ShadowDecorator(scrolledBorderedView, "darkgray", 10);
        System.out.println("4. 添加边框 + 滚动条 + 阴影后:");
        System.out.println("描述: " + fullyDecorated.getDescription());
        System.out.println("内容:");
        System.out.println(fullyDecorated.operation());
        System.out.println();

        // 5. 不同顺序的装饰
        Component shadowFirst = new BorderDecorator(new ShadowDecorator(new TextView("Different Order")));
        System.out.println("5. 不同装饰顺序（先阴影后边框）:");
        System.out.println("描述: " + shadowFirst.getDescription());
        System.out.println("内容:");
        System.out.println(shadowFirst.operation());
        System.out.println();

        // 6. Java I/O 示例
        System.out.println("=== Java I/O 装饰器示例 ===");
        JavaIOExample.demonstrateIO();
    }
}`,

    go: `/**
 * ============================================
 * 装饰器模式 - Go 实现
 * 使用接口包装实现装饰器模式
 * ============================================
 */

package main

import (
	"fmt"
	"strings"
)

// ============================================
// 1. Component 接口 - 组件通用接口
// ============================================
type Component interface {
	/**
	 * 核心操作方法
	 * 所有具体组件和装饰器都必须实现此方法
	 */
	Operation() string
	
	/**
	 * 获取组件描述
	 */
	GetDescription() string
}

// ============================================
// 2. ConcreteComponent - 具体组件（被装饰对象）
// ============================================

/**
 * TextView - 基础文本视图组件
 */
type TextView struct {
	content string
}

// 创建新的 TextView
func NewTextView(content string) *TextView {
	if content == "" {
		content = "Hello World"
	}
	return &TextView{content: content}
}

func (t *TextView) Operation() string {
	return t.content
}

func (t *TextView) GetDescription() string {
	return "TextView"
}

// ============================================
// 3. Decorator 基类 - 使用结构体嵌入实现
// ============================================

/**
 * Decorator - 装饰器基类
 * Go 没有继承，使用结构体嵌入（组合）实现
 */
type Decorator struct {
	// 被包装的组件（可以是具体组件或其他装饰器）
	component Component
}

func (d *Decorator) Operation() string {
	if d.component != nil {
		return d.component.Operation()
	}
	return ""
}

func (d *Decorator) GetDescription() string {
	if d.component != nil {
		return d.component.GetDescription()
	}
	return ""
}

// ============================================
// 4. ConcreteDecorator - 具体装饰器
// ============================================

/**
 * BorderDecorator - 边框装饰器
 * 为组件添加边框效果
 */
type BorderDecorator struct {
	Decorator                    // 嵌入 Decorator
	borderWidth   int
	borderColor   string
}

// 创建新的 BorderDecorator
func NewBorderDecorator(component Component, width int, color string) *BorderDecorator {
	return &BorderDecorator{
		Decorator:   Decorator{component: component},
		borderWidth: width,
		borderColor: color,
	}
}

func (b *BorderDecorator) Operation() string {
	content := b.component.Operation()
	border := strings.Repeat("=", len(content)+4)
	return fmt.Sprintf("%s\\n| %s |\\n%s", border, content, border)
}

func (b *BorderDecorator) GetDescription() string {
	return fmt.Sprintf("%s + Border(%dpx %s)", b.component.GetDescription(), b.borderWidth, b.borderColor)
}

func (b *BorderDecorator) SetBorder(width int, color string) {
	b.borderWidth = width
	b.borderColor = color
}

/**
 * ScrollDecorator - 滚动条装饰器
 * 为组件添加滚动功能
 */
type ScrollDecorator struct {
	Decorator
	scrollPosition int
	maxScroll      int
}

// 创建新的 ScrollDecorator
func NewScrollDecorator(component Component, maxScroll int) *ScrollDecorator {
	if maxScroll <= 0 {
		maxScroll = 100
	}
	return &ScrollDecorator{
		Decorator: Decorator{component: component},
		maxScroll: maxScroll,
	}
}

func (s *ScrollDecorator) Operation() string {
	content := s.component.Operation()
	scrollBar := fmt.Sprintf("[Scroll: %d/%d]\\n", s.scrollPosition, s.maxScroll)
	return scrollBar + content
}

func (s *ScrollDecorator) GetDescription() string {
	return s.component.GetDescription() + " + ScrollBar"
}

func (s *ScrollDecorator) ScrollTo(position int) {
	if position < 0 {
		s.scrollPosition = 0
	} else if position > s.maxScroll {
		s.scrollPosition = s.maxScroll
	} else {
		s.scrollPosition = position
	}
}

func (s *ScrollDecorator) ScrollDown(amount int) {
	s.ScrollTo(s.scrollPosition + amount)
}

/**
 * ShadowDecorator - 阴影装饰器
 * 为组件添加阴影效果
 */
type ShadowDecorator struct {
	Decorator
	shadowColor string
	shadowBlur  int
}

// 创建新的 ShadowDecorator
func NewShadowDecorator(component Component, color string, blur int) *ShadowDecorator {
	if color == "" {
		color = "gray"
	}
	if blur <= 0 {
		blur = 5
	}
	return &ShadowDecorator{
		Decorator:   Decorator{component: component},
		shadowColor: color,
		shadowBlur:  blur,
	}
}

func (s *ShadowDecorator) Operation() string {
	content := s.component.Operation()
	shadowEffect := fmt.Sprintf("[Shadow: %s, blur=%d]", s.shadowColor, s.shadowBlur)
	return content + "\\n" + shadowEffect
}

func (s *ShadowDecorator) GetDescription() string {
	return fmt.Sprintf("%s + Shadow(%s)", s.component.GetDescription(), s.shadowColor)
}

// ============================================
// 5. 函数式装饰器（Go 特有风格）
// ============================================

/**
 * 使用高阶函数实现装饰器
 * 这是 Go 语言特有的函数式编程风格
 */

// OperationFunc 定义操作函数类型
type OperationFunc func() string

// LoggingDecorator 日志装饰器（函数式）
func LoggingDecorator(fn OperationFunc, name string) OperationFunc {
	return func() string {
		fmt.Printf("[LOG] Before executing %s\\n", name)
		result := fn()
		fmt.Printf("[LOG] After executing %s, result: %s\\n", name, result)
		return result
	}
}

// TimingDecorator 计时装饰器（函数式）
func TimingDecorator(fn OperationFunc, name string) OperationFunc {
	return func() string {
		start := time.Now()
		result := fn()
		duration := time.Since(start)
		fmt.Printf("[TIME] %s took %v\\n", name, duration)
		return result
	}
}

// ============================================
// 6. I/O 装饰器示例（类似 Java I/O）
// ============================================

/**
 * Reader 接口 - 模拟 io.Reader
 */
type Reader interface {
	Read(p []byte) (n int, err error)
}

/**
 * BufferedReader - 缓冲读取装饰器
 */
type BufferedReader struct {
	reader Reader
	buffer []byte
	pos    int
}

func NewBufferedReader(r Reader, size int) *BufferedReader {
	return &BufferedReader{
		reader: r,
		buffer: make([]byte, size),
	}
}

func (b *BufferedReader) Read(p []byte) (n int, err error) {
	// 简化的缓冲读取实现
	fmt.Println("[BufferedReader] Reading with buffer")
	return b.reader.Read(p)
}

/**
 * LoggingReader - 日志读取装饰器
 */
type LoggingReader struct {
	reader Reader
}

func NewLoggingReader(r Reader) *LoggingReader {
	return &LoggingReader{reader: r}
}

func (l *LoggingReader) Read(p []byte) (n int, err error) {
	fmt.Println("[LoggingReader] Before read")
	n, err = l.reader.Read(p)
	fmt.Printf("[LoggingReader] Read %d bytes\\n", n)
	return n, err
}

// ============================================
// 7. 客户端代码 - 展示多层装饰
// ============================================
func main() {
	fmt.Println("=== 装饰器模式演示 ===\\n")

	// 1. 基础组件
	textView := NewTextView("Hello, Decorator!")
	fmt.Println("1. 基础组件:")
	fmt.Println("描述:", textView.GetDescription())
	fmt.Println("内容:")
	fmt.Println(textView.Operation())
	fmt.Println()

	// 2. 单层装饰：添加边框
	borderedView := NewBorderDecorator(textView, 2, "blue")
	fmt.Println("2. 添加边框后:")
	fmt.Println("描述:", borderedView.GetDescription())
	fmt.Println("内容:")
	fmt.Println(borderedView.Operation())
	fmt.Println()

	// 3. 多层装饰：边框 + 滚动条
	scrolledBorderedView := NewScrollDecorator(borderedView, 50)
	fmt.Println("3. 添加边框 + 滚动条后:")
	fmt.Println("描述:", scrolledBorderedView.GetDescription())
	fmt.Println("内容:")
	fmt.Println(scrolledBorderedView.Operation())
	fmt.Println()

	// 4. 三层装饰：边框 + 滚动条 + 阴影
	fullyDecorated := NewShadowDecorator(scrolledBorderedView, "darkgray", 10)
	fmt.Println("4. 添加边框 + 滚动条 + 阴影后:")
	fmt.Println("描述:", fullyDecorated.GetDescription())
	fmt.Println("内容:")
	fmt.Println(fullyDecorated.Operation())
	fmt.Println()

	// 5. 不同顺序的装饰
	shadowFirst := NewBorderDecorator(NewShadowDecorator(NewTextView("Different Order"), "gray", 5), 1, "black")
	fmt.Println("5. 不同装饰顺序（先阴影后边框）:")
	fmt.Println("描述:", shadowFirst.GetDescription())
	fmt.Println("内容:")
	fmt.Println(shadowFirst.Operation())
	fmt.Println()

	// 6. 函数式装饰器示例
	fmt.Println("=== 函数式装饰器示例 ===")
	baseFunc := func() string {
		return "Function Result"
	}
	
	loggedFunc := LoggingDecorator(baseFunc, "baseFunc")
	result := loggedFunc()
	fmt.Println("最终结果:", result)
}`,

    python: `/**
 * ============================================
 * 装饰器模式 - Python 实现
 * 包含类装饰器和 @decorator 语法糖
 * ============================================
 */

from abc import ABC, abstractmethod
from functools import wraps
import time
from typing import Optional

# ============================================
# 1. Component 接口 - 组件通用接口
# ============================================
class Component(ABC):
    """
    组件抽象基类
    所有具体组件和装饰器都必须继承此类
    """
    
    @abstractmethod
    def operation(self) -> str:
        """核心操作方法"""
        pass
    
    @abstractmethod
    def get_description(self) -> str:
        """获取组件描述"""
        pass

# ============================================
# 2. ConcreteComponent - 具体组件（被装饰对象）
# ============================================
class TextView(Component):
    """
    文本视图组件 - 基础组件
    """
    
    def __init__(self, content: str = "Hello World"):
        self._content = content
    
    def operation(self) -> str:
        return self._content
    
    def get_description(self) -> str:
        return "TextView"

# ============================================
# 3. Decorator 基类 - 装饰器抽象类
# ============================================
class Decorator(Component, ABC):
    """
    装饰器抽象基类
    包含一个 Component 引用，并实现相同的接口
    """
    
    def __init__(self, component: Component):
        self._component = component
    
    @abstractmethod
    def operation(self) -> str:
        pass
    
    @abstractmethod
    def get_description(self) -> str:
        pass

# ============================================
# 4. ConcreteDecorator - 具体装饰器
# ============================================

class BorderDecorator(Decorator):
    """
    边框装饰器 - 为组件添加边框
    """
    
    def __init__(self, component: Component, width: int = 1, color: str = "black"):
        super().__init__(component)
        self._border_width = width
        self._border_color = color
    
    def operation(self) -> str:
        content = self._component.operation()
        border = "=" * (len(content) + 4)
        return f"{border}\\n| {content} |\\n{border}"
    
    def get_description(self) -> str:
        return f"{self._component.get_description()} + Border({self._border_width}px {self._border_color})"
    
    def set_border(self, width: int, color: str) -> None:
        """装饰器特有的方法"""
        self._border_width = width
        self._border_color = color


class ScrollDecorator(Decorator):
    """
    滚动条装饰器 - 为组件添加滚动功能
    """
    
    def __init__(self, component: Component, max_scroll: int = 100):
        super().__init__(component)
        self._scroll_position = 0
        self._max_scroll = max_scroll
    
    def operation(self) -> str:
        content = self._component.operation()
        scroll_bar = f"[Scroll: {self._scroll_position}/{self._max_scroll}]\\n"
        return scroll_bar + content
    
    def get_description(self) -> str:
        return f"{self._component.get_description()} + ScrollBar"
    
    def scroll_to(self, position: int) -> None:
        """装饰器特有的方法"""
        self._scroll_position = max(0, min(position, self._max_scroll))
    
    def scroll_down(self, amount: int) -> None:
        """装饰器特有的方法"""
        self.scroll_to(self._scroll_position + amount)


class ShadowDecorator(Decorator):
    """
    阴影装饰器 - 为组件添加阴影效果
    """
    
    def __init__(self, component: Component, color: str = "gray", blur: int = 5):
        super().__init__(component)
        self._shadow_color = color
        self._shadow_blur = blur
    
    def operation(self) -> str:
        content = self._component.operation()
        shadow_effect = f"[Shadow: {self._shadow_color}, blur={self._shadow_blur}]"
        return f"{content}\\n{shadow_effect}"
    
    def get_description(self) -> str:
        return f"{self._component.get_description()} + Shadow({self._shadow_color})"


class ColorDecorator(Decorator):
    """
    颜色装饰器 - 为组件添加颜色
    """
    
    def __init__(self, component: Component, foreground: str = "black", background: str = "white"):
        super().__init__(component)
        self._foreground = foreground
        self._background = background
    
    def operation(self) -> str:
        content = self._component.operation()
        return f"[FG:{self._foreground}, BG:{self._background}]\\n{content}"
    
    def get_description(self) -> str:
        return f"{self._component.get_description()} + Color({self._foreground}/{self._background})"

# ============================================
# 5. @decorator 语法糖 - Python 特有
# ============================================

def log_decorator(func):
    """
    日志装饰器 - 使用 @ 语法糖
    记录函数调用和返回值
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"[LOG] Calling {func.__name__} with args: {args}, kwargs: {kwargs}")
        result = func(*args, **kwargs)
        print(f"[LOG] {func.__name__} returned: {result}")
        return result
    return wrapper


def timing_decorator(func):
    """
    性能计时装饰器 - 使用 @ 语法糖
    记录函数执行时间
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"[TIME] {func.__name__} took {(end_time - start_time)*1000:.2f}ms")
        return result
    return wrapper


def retry_decorator(max_attempts: int = 3, delay: float = 1.0):
    """
    重试装饰器 - 带参数的装饰器
    在失败时自动重试
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"[RETRY] Attempt {attempt + 1}/{max_attempts} failed: {e}")
                    if attempt < max_attempts - 1:
                        time.sleep(delay)
                    else:
                        raise
            return None
        return wrapper
    return decorator


# 使用 @decorator 语法糖的类示例
class Calculator:
    """计算器类 - 演示方法装饰器"""
    
    @log_decorator
    @timing_decorator
    def fibonacci(self, n: int) -> int:
        """计算斐波那契数列"""
        if n <= 1:
            return n
        return self.fibonacci(n - 1) + self.fibonacci(n - 2)
    
    @log_decorator
    def add(self, a: int, b: int) -> int:
        """加法运算"""
        return a + b


# 类装饰器 - 装饰整个类
def singleton(cls):
    """
    单例类装饰器
    确保类只有一个实例
    """
    instances = {}
    @wraps(cls)
    def wrapper(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return wrapper


@singleton
class DatabaseConnection:
    """数据库连接类 - 使用类装饰器实现单例"""
    
    def __init__(self, connection_string: str = "default"):
        self.connection_string = connection_string
        print(f"Creating database connection: {connection_string}")
    
    def query(self, sql: str) -> str:
        return f"Query result for: {sql}"

# ============================================
# 6. 客户端代码 - 展示多层装饰
# ============================================
def client_code():
    print("=== 装饰器模式演示 ===\\n")
    
    # 1. 基础组件
    text_view = TextView("Hello, Decorator!")
    print("1. 基础组件:")
    print(f"描述: {text_view.get_description()}")
    print(f"内容:")
    print(text_view.operation())
    print()
    
    # 2. 单层装饰：添加边框
    bordered_view = BorderDecorator(text_view, 2, "blue")
    print("2. 添加边框后:")
    print(f"描述: {bordered_view.get_description()}")
    print(f"内容:")
    print(bordered_view.operation())
    print()
    
    # 3. 多层装饰：边框 + 滚动条
    scrolled_bordered_view = ScrollDecorator(bordered_view, 50)
    print("3. 添加边框 + 滚动条后:")
    print(f"描述: {scrolled_bordered_view.get_description()}")
    print(f"内容:")
    print(scrolled_bordered_view.operation())
    print()
    
    # 4. 三层装饰：边框 + 滚动条 + 阴影
    fully_decorated = ShadowDecorator(scrolled_bordered_view, "darkgray", 10)
    print("4. 添加边框 + 滚动条 + 阴影后:")
    print(f"描述: {fully_decorated.get_description()}")
    print(f"内容:")
    print(fully_decorated.operation())
    print()
    
    # 5. 四层装饰：颜色 + 边框 + 滚动条 + 阴影
    colored_fully_decorated = ColorDecorator(fully_decorated, "red", "yellow")
    print("5. 添加颜色 + 边框 + 滚动条 + 阴影后:")
    print(f"描述: {colored_fully_decorated.get_description()}")
    print(f"内容:")
    print(colored_fully_decorated.operation())
    print()
    
    # 6. 不同顺序的装饰
    shadow_first = BorderDecorator(ShadowDecorator(TextView("Different Order")))
    print("6. 不同装饰顺序（先阴影后边框）:")
    print(f"描述: {shadow_first.get_description()}")
    print(f"内容:")
    print(shadow_first.operation())
    print()
    
    # 7. @decorator 语法糖演示
    print("=== @decorator 语法糖演示 ===")
    calc = Calculator()
    result = calc.fibonacci(10)
    print(f"斐波那契结果: {result}\\n")
    
    # 8. 类装饰器演示（单例）
    print("=== 类装饰器演示（单例） ===")
    db1 = DatabaseConnection("postgresql://localhost/db")
    db2 = DatabaseConnection("mysql://localhost/db")
    print(f"db1 is db2: {db1 is db2}")  # True
    print(f"Connection string: {db2.connection_string}")  # postgresql


if __name__ == "__main__":
    client_code()`,

    cpp: `/**
 * ============================================
 * 装饰器模式 - C++ 实现
 * 包含类装饰器 + 模板装饰器
 * ============================================
 */

#include <iostream>
#include <string>
#include <memory>
#include <functional>
#include <chrono>

// ============================================
// 1. Component 接口 - 组件通用接口
// ============================================
class Component {
public:
    virtual ~Component() = default;
    
    /**
     * 核心操作方法
     * 所有具体组件和装饰器都必须实现此方法
     */
    virtual std::string operation() const = 0;
    
    /**
     * 获取组件描述
     */
    virtual std::string getDescription() const = 0;
};

// 使用智能指针类型别名
using ComponentPtr = std::shared_ptr<Component>;

// ============================================
// 2. ConcreteComponent - 具体组件（被装饰对象）
// ============================================
class TextView : public Component {
private:
    std::string content;

public:
    TextView() : TextView("Hello World") {}
    
    explicit TextView(const std::string& content) : content(content) {}
    
    std::string operation() const override {
        return content;
    }
    
    std::string getDescription() const override {
        return "TextView";
    }
};

// ============================================
// 3. Decorator 基类 - 装饰器抽象类
// ============================================
class Decorator : public Component {
protected:
    // 被包装的组件（可以是具体组件或其他装饰器）
    ComponentPtr component;

public:
    explicit Decorator(ComponentPtr comp) : component(std::move(comp)) {}
    
    /**
     * 默认实现：直接委托给被包装组件
     * 子类可以重写此方法以添加新行为
     */
    std::string operation() const override {
        return component->operation();
    }
    
    std::string getDescription() const override {
        return component->getDescription();
    }
};

// ============================================
// 4. ConcreteDecorator - 具体装饰器
// ============================================

/**
 * 边框装饰器 - 为组件添加边框
 */
class BorderDecorator : public Decorator {
private:
    int borderWidth;
    std::string borderColor;

public:
    BorderDecorator(ComponentPtr comp, int width = 1, const std::string& color = "black")
        : Decorator(std::move(comp)), borderWidth(width), borderColor(color) {}
    
    std::string operation() const override {
        std::string content = component->operation();
        std::string border(content.length() + 4, '=');
        return border + "\\n| " + content + " |\\n" + border;
    }
    
    std::string getDescription() const override {
        return component->getDescription() + " + Border(" + 
               std::to_string(borderWidth) + "px " + borderColor + ")";
    }
    
    void setBorder(int width, const std::string& color) {
        borderWidth = width;
        borderColor = color;
    }
};

/**
 * 滚动条装饰器 - 为组件添加滚动功能
 */
class ScrollDecorator : public Decorator {
private:
    int scrollPosition = 0;
    int maxScroll;

public:
    ScrollDecorator(ComponentPtr comp, int maxScroll = 100)
        : Decorator(std::move(comp)), maxScroll(maxScroll) {}
    
    std::string operation() const override {
        std::string content = component->operation();
        std::string scrollBar = "[Scroll: " + std::to_string(scrollPosition) + 
                               "/" + std::to_string(maxScroll) + "]\\n";
        return scrollBar + content;
    }
    
    std::string getDescription() const override {
        return component->getDescription() + " + ScrollBar";
    }
    
    void scrollTo(int position) {
        scrollPosition = std::max(0, std::min(position, maxScroll));
    }
    
    void scrollDown(int amount) {
        scrollTo(scrollPosition + amount);
    }
};

/**
 * 阴影装饰器 - 为组件添加阴影效果
 */
class ShadowDecorator : public Decorator {
private:
    std::string shadowColor;
    int shadowBlur;

public:
    ShadowDecorator(ComponentPtr comp, const std::string& color = "gray", int blur = 5)
        : Decorator(std::move(comp)), shadowColor(color), shadowBlur(blur) {}
    
    std::string operation() const override {
        std::string content = component->operation();
        std::string shadowEffect = "[Shadow: " + shadowColor + 
                                  ", blur=" + std::to_string(shadowBlur) + "]";
        return content + "\\n" + shadowEffect;
    }
    
    std::string getDescription() const override {
        return component->getDescription() + " + Shadow(" + shadowColor + ")";
    }
};

/**
 * 颜色装饰器 - 为组件添加颜色
 */
class ColorDecorator : public Decorator {
private:
    std::string foreground;
    std::string background;

public:
    ColorDecorator(ComponentPtr comp, const std::string& fg = "black", 
                   const std::string& bg = "white")
        : Decorator(std::move(comp)), foreground(fg), background(bg) {}
    
    std::string operation() const override {
        std::string content = component->operation();
        std::string colorInfo = "[FG:" + foreground + ", BG:" + background + "]";
        return colorInfo + "\\n" + content;
    }
    
    std::string getDescription() const override {
        return component->getDescription() + " + Color(" + 
               foreground + "/" + background + ")";
    }
};

// ============================================
// 5. 模板装饰器 - C++ 特有
// ============================================

/**
 * 模板装饰器基类
 * 允许在编译时确定被装饰的类型
 */
template<typename T>
class TemplateDecorator : public T {
protected:
    // 注意：这里使用组合而非继承
    std::shared_ptr<T> wrapped;

public:
    explicit TemplateDecorator(std::shared_ptr<T> component) 
        : wrapped(std::move(component)) {}
    
    std::string operation() const override {
        return wrapped->operation();
    }
    
    std::string getDescription() const override {
        return wrapped->getDescription();
    }
};

/**
 * 日志模板装饰器
 * 使用模板可以为任何 Component 子类添加日志功能
 */
template<typename T>
class LoggingDecorator : public TemplateDecorator<T> {
private:
    std::string name;

public:
    explicit LoggingDecorator(std::shared_ptr<T> component, const std::string& name = "Component")
        : TemplateDecorator<T>(std::move(component)), name(name) {}
    
    std::string operation() const override {
        std::cout << "[LOG] Before " << name << "::operation()" << std::endl;
        std::string result = this->wrapped->operation();
        std::cout << "[LOG] After " << name << "::operation(), result length: " 
                  << result.length() << std::endl;
        return result;
    }
    
    std::string getDescription() const override {
        return "Logging(" + this->wrapped->getDescription() + ")";
    }
};

/**
 * 性能监控模板装饰器
 */
template<typename T>
class TimingDecorator : public TemplateDecorator<T> {
private:
    std::string name;

public:
    explicit TimingDecorator(std::shared_ptr<T> component, const std::string& name = "Component")
        : TemplateDecorator<T>(std::move(component)), name(name) {}
    
    std::string operation() const override {
        auto start = std::chrono::high_resolution_clock::now();
        std::string result = this->wrapped->operation();
        auto end = std::chrono::high_resolution_clock::now();
        
        auto duration = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
        std::cout << "[TIME] " << name << " took " << duration.count() << " us" << std::endl;
        
        return result;
    }
    
    std::string getDescription() const override {
        return "Timed(" + this->wrapped->getDescription() + ")";
    }
};

// ============================================
// 6. 函数对象装饰器 - C++ 特有
// ============================================

/**
 * 使用 std::function 实现的函数式装饰器
 */
class FunctionDecorator {
public:
    // 日志装饰器（函数式）
    static std::function<std::string()> log(
            std::function<std::string()> func, 
            const std::string& name) {
        return [func, name]() -> std::string {
            std::cout << "[LOG] Calling " << name << std::endl;
            std::string result = func();
            std::cout << "[LOG] " << name << " returned" << std::endl;
            return result;
        };
    }
    
    // 缓存装饰器（函数式）
    static std::function<int(int)> memoize(std::function<int(int)> func) {
        std::map<int, int> cache;
        return [func, cache](int n) mutable -> int {
            if (cache.find(n) != cache.end()) {
                std::cout << "[CACHE] Hit for " << n << std::endl;
                return cache[n];
            }
            std::cout << "[CACHE] Miss for " << n << std::endl;
            int result = func(n);
            cache[n] = result;
            return result;
        };
    }
};

// ============================================
// 7. 客户端代码 - 展示多层装饰
// ============================================
int main() {
    std::cout << "=== 装饰器模式演示 ===" << std::endl << std::endl;

    // 1. 基础组件
    ComponentPtr textView = std::make_shared<TextView>("Hello, Decorator!");
    std::cout << "1. 基础组件:" << std::endl;
    std::cout << "描述: " << textView->getDescription() << std::endl;
    std::cout << "内容:" << std::endl;
    std::cout << textView->operation() << std::endl;
    std::cout << std::endl;

    // 2. 单层装饰：添加边框
    ComponentPtr borderedView = std::make_shared<BorderDecorator>(textView, 2, "blue");
    std::cout << "2. 添加边框后:" << std::endl;
    std::cout << "描述: " << borderedView->getDescription() << std::endl;
    std::cout << "内容:" << std::endl;
    std::cout << borderedView->operation() << std::endl;
    std::cout << std::endl;

    // 3. 多层装饰：边框 + 滚动条
    ComponentPtr scrolledBorderedView = std::make_shared<ScrollDecorator>(borderedView, 50);
    std::cout << "3. 添加边框 + 滚动条后:" << std::endl;
    std::cout << "描述: " << scrolledBorderedView->getDescription() << std::endl;
    std::cout << "内容:" << std::endl;
    std::cout << scrolledBorderedView->operation() << std::endl;
    std::cout << std::endl;

    // 4. 三层装饰：边框 + 滚动条 + 阴影
    ComponentPtr fullyDecorated = std::make_shared<ShadowDecorator>(scrolledBorderedView, "darkgray", 10);
    std::cout << "4. 添加边框 + 滚动条 + 阴影后:" << std::endl;
    std::cout << "描述: " << fullyDecorated->getDescription() << std::endl;
    std::cout << "内容:" << std::endl;
    std::cout << fullyDecorated->operation() << std::endl;
    std::cout << std::endl;

    // 5. 四层装饰：颜色 + 边框 + 滚动条 + 阴影
    ComponentPtr coloredDecorated = std::make_shared<ColorDecorator>(fullyDecorated, "red", "yellow");
    std::cout << "5. 添加颜色 + 边框 + 滚动条 + 阴影后:" << std::endl;
    std::cout << "描述: " << coloredDecorated->getDescription() << std::endl;
    std::cout << "内容:" << std::endl;
    std::cout << coloredDecorated->operation() << std::endl;
    std::cout << std::endl;

    // 6. 不同顺序的装饰
    ComponentPtr shadowFirst = std::make_shared<BorderDecorator>(
        std::make_shared<ShadowDecorator>(
            std::make_shared<TextView>("Different Order")
        )
    );
    std::cout << "6. 不同装饰顺序（先阴影后边框）:" << std::endl;
    std::cout << "描述: " << shadowFirst->getDescription() << std::endl;
    std::cout << "内容:" << std::endl;
    std::cout << shadowFirst->operation() << std::endl;
    std::cout << std::endl;

    // 7. 模板装饰器演示
    std::cout << "=== 模板装饰器演示 ===" << std::endl;
    auto baseText = std::make_shared<TextView>("Template Decorator Test");
    auto loggedText = std::make_shared<LoggingDecorator<TextView>>(baseText, "TextView");
    std::cout << "描述: " << loggedText->getDescription() << std::endl;
    std::cout << loggedText->operation() << std::endl;
    std::cout << std::endl;

    // 8. 函数式装饰器演示
    std::cout << "=== 函数式装饰器演示 ===" << std::endl;
    auto baseFunc = []() { return "Function Result"; };
    auto loggedFunc = FunctionDecorator::log(baseFunc, "baseFunc");
    std::cout << "结果: " << loggedFunc() << std::endl;

    return 0;
}`,
  },
  realWorldExamples: [
    {
      title: 'Java I/O 类库',
      description: 'Java I/O 类库是装饰器模式的经典应用。InputStream/OutputStream 是 Component，FileInputStream/FileOutputStream 是 ConcreteComponent，BufferedInputStream/DataInputStream/ObjectInputStream 等是 Decorator。',
      source: 'JDK',
      codeSnippet: `// 层层包装：FileInputStream -> BufferedInputStream -> DataInputStream
InputStream fis = new FileInputStream("data.bin");
BufferedInputStream bis = new BufferedInputStream(fis);
DataInputStream dis = new DataInputStream(bis);
int value = dis.readInt();`,
    },
    {
      title: 'Python @decorator 语法',
      description: 'Python 的 @decorator 语法糖是装饰器模式的语言级支持，广泛用于日志记录、性能监控、权限检查、缓存等场景。',
      source: 'Python',
      codeSnippet: `@login_required
@cache_page(60 * 15)
def article_detail(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    return render(request, 'article.html', {'article': article})`,
    },
    {
      title: 'JavaScript/TypeScript 高阶组件 (HOC)',
      description: 'React 中的高阶组件是装饰器模式在前端开发中的应用，用于复用组件逻辑。',
      source: 'React',
      codeSnippet: `const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      if (!this.props.isAuthenticated) {
        return <Login />;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
};
const ProtectedPage = withAuth(MyPage);`,
    },
    {
      title: 'Spring 事务管理',
      description: 'Spring 框架使用装饰器模式（代理模式）实现声明式事务管理，通过 @Transactional 注解为方法添加事务控制。',
      source: 'Spring Framework',
      codeSnippet: `@Transactional(rollbackFor = Exception.class)
public void transferMoney(Account from, Account to, BigDecimal amount) {
    from.debit(amount);
    to.credit(amount);
}`,
    },
  ],
  relatedPatterns: ['adapter', 'composite', 'strategy', 'proxy'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '装饰器模式的主要目的是什么？',
      options: [
        '创建对象的实例',
        '动态地给对象添加额外职责',
        '定义对象间的依赖关系',
        '将抽象与实现分离',
      ],
      correctAnswer: 1,
      explanation: '装饰器模式的主要目的是动态地给一个对象添加一些额外的职责，而不影响其他对象。相比继承，装饰器模式更加灵活。',
    },
    {
      id: 'q2',
      type: 'single',
      question: '以下哪个不是装饰器模式的优点？',
      options: [
        '比继承更灵活',
        '可以在运行时添加或删除功能',
        '减少了系统中的对象数量',
        '符合单一职责原则',
      ],
      correctAnswer: 2,
      explanation: '装饰器模式实际上会增加系统中的对象数量（每个装饰器都是一个对象），这是它的一个缺点。其他选项都是装饰器模式的优点。',
    },
    {
      id: 'q3',
      type: 'boolean',
      question: '装饰器模式中的装饰器和被装饰对象必须实现相同的接口',
      options: ['正确', '错误'],
      correctAnswer: 0,
      explanation: '正确。装饰器模式要求装饰器和被装饰对象实现相同的接口（或继承相同的抽象类），这样装饰器才能透明地替代被装饰对象。',
    },
    {
      id: 'q4',
      type: 'single',
      question: 'Java I/O 流使用了什么设计模式？',
      options: [
        '工厂模式',
        '单例模式',
        '装饰器模式',
        '观察者模式',
      ],
      correctAnswer: 2,
      explanation: 'Java I/O 流是装饰器模式的经典应用。BufferedInputStream、DataInputStream 等类都是装饰器，它们包装其他流以添加功能。',
    },
  ],
};
