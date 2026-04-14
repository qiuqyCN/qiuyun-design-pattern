import type { DesignPattern } from '@/types/pattern';

export const templateMethodPattern: DesignPattern = {
  id: 'template-method',
  name: '模板方法模式',
  nameEn: 'Template Method Pattern',
  category: 'behavioral',
  difficulty: 'easy',
  frequency: 'medium',
  intent: '定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。',
  description: '模板方法模式是一种行为设计模式，它在超类中定义了一个算法的框架，允许子类在不修改结构的情况下重写算法的特定步骤。',
  applicability: [
    '当你只希望客户端扩展某个特定算法步骤，而不是整个算法或其结构时',
    '当你有几个类包含相似的、仅在特定步骤上有所不同的算法时',
    '当你需要控制子类扩展的方式，只允许在特定点进行扩展时',
    '当你希望避免代码重复，将通用行为提取到父类中时',
  ],
  pros: [
    '你可以仅允许客户端重写一个大型算法中的特定部分，使得修改其他部分所造成的影响减小',
    '你可以将重复代码提取到一个超类中',
    '模板方法提供了一种反向控制结构，允许父类调用子类的方法（好莱坞原则："别调用我们，我们会调用你"）',
    '通过钩子方法，子类可以选择性地扩展算法的某些步骤',
  ],
  cons: [
    '部分客户端可能会受到算法框架的限制',
    '通过子类来抑制默认步骤实现可能会导致违反里氏替换原则',
    '模板方法中的步骤越多，其维护工作就可能会越困难',
    '继承的固有限制：一旦算法发生变化，可能需要修改所有子类',
  ],
  analogy: {
    title: '现实世界中的模板方法',
    description: '模板方法就像是建筑蓝图或食谱，定义了固定的步骤顺序，但某些细节可以灵活调整',
    scenarios: [
      {
        id: 'building',
        title: '建筑蓝图',
        description: '建筑师提供建筑蓝图（模板），定义了建造的步骤顺序：地基 → 框架 → 墙体 → 屋顶。但具体材料选择（混凝土还是钢结构）可以由施工方决定。',
        icon: 'Building',
      },
      {
        id: 'cooking',
        title: '食谱烹饪',
        description: '食谱规定了烹饪的步骤顺序：准备食材 → 加热 → 调味 → 装盘。但具体的调味方式（辣度、咸度）可以根据个人口味调整。',
        icon: 'ChefHat',
      },
      {
        id: 'interview',
        title: '面试流程',
        description: '公司面试有固定流程：简历筛选 → 笔试 → 技术面试 → HR面试。但每个环节的具体问题可以根据候选人背景灵活调整。',
        icon: 'Users',
      },
    ],
  },
  structure: {
    classDiagram: `
      class AbstractClass {
        +templateMethod()
        +baseOperation1()
        +baseOperation2()
        +abstract requiredOperation1()
        +abstract requiredOperation2()
        +hook()
      }
      class ConcreteClass {
        +requiredOperation1()
        +requiredOperation2()
        +hook()
      }
      AbstractClass <|-- ConcreteClass
    `,
    mermaidDiagram: `
classDiagram
  class AbstractClass {
    +templateMethod()
    +baseOperation1()
    +baseOperation2()
    +abstract requiredOperation1()
    +abstract requiredOperation2()
    +hook()
  }
  
  class ConcreteClass1 {
    +requiredOperation1()
    +requiredOperation2()
  }
  
  class ConcreteClass2 {
    +requiredOperation1()
    +requiredOperation2()
    +hook()
  }
  
  class Client {
    +main()
  }
  
  AbstractClass <|-- ConcreteClass1
  AbstractClass <|-- ConcreteClass2
  Client ..> AbstractClass : uses
  
  style AbstractClass fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style ConcreteClass1 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
  style ConcreteClass2 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: '定义抽象类',
        description: '创建抽象类，定义模板方法和算法骨架',
        duration: 2000,
        elements: [
          { id: 'abstract', type: 'class', name: 'AbstractClass', x: 200, y: 150, properties: [], methods: ['+templateMethod()', '+baseOperation1()', '+baseOperation2()', '+abstract requiredOperation1()', '+abstract requiredOperation2()', '+hook()'] },
        ],
      },
      {
        id: 'step2',
        title: '实现具体类',
        description: '具体类继承抽象类，实现抽象方法',
        duration: 2000,
        elements: [
          { id: 'abstract', type: 'class', name: 'AbstractClass', x: 200, y: 150, properties: [], methods: ['+templateMethod()', '+baseOperation1()', '+baseOperation2()', '+abstract requiredOperation1()', '+abstract requiredOperation2()', '+hook()'] },
          { id: 'concrete1', type: 'class', name: 'ConcreteClass1', x: 450, y: 100, properties: [], methods: ['+requiredOperation1()', '+requiredOperation2()'] },
          { id: 'concrete2', type: 'class', name: 'ConcreteClass2', x: 450, y: 200, properties: [], methods: ['+requiredOperation1()', '+requiredOperation2()', '+hook()'] },
        ],
        connections: [
          { from: 'concrete1', to: 'abstract', type: 'inheritance', label: '' },
          { from: 'concrete2', to: 'abstract', type: 'inheritance', label: '' },
        ],
      },
      {
        id: 'step3',
        title: '客户端使用',
        description: '客户端通过抽象类调用模板方法',
        duration: 3000,
        elements: [
          { id: 'abstract', type: 'class', name: 'AbstractClass', x: 200, y: 150, properties: [], methods: ['+templateMethod()', '+baseOperation1()', '+baseOperation2()', '+abstract requiredOperation1()', '+abstract requiredOperation2()', '+hook()'] },
          { id: 'concrete1', type: 'class', name: 'ConcreteClass1', x: 450, y: 100, properties: [], methods: ['+requiredOperation1()', '+requiredOperation2()'] },
          { id: 'concrete2', type: 'class', name: 'ConcreteClass2', x: 450, y: 200, properties: [], methods: ['+requiredOperation1()', '+requiredOperation2()', '+hook()'] },
          { id: 'client', type: 'class', name: 'Client', x: 50, y: 150, properties: [], methods: ['+main()'] },
        ],
        connections: [
          { from: 'concrete1', to: 'abstract', type: 'inheritance', label: '' },
          { from: 'concrete2', to: 'abstract', type: 'inheritance', label: '' },
          { from: 'client', to: 'abstract', type: 'dependency', label: 'uses' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * 模板方法模式 - TypeScript 实现
 * 使用抽象类定义算法骨架，子类实现具体步骤
 */

/**
 * 抽象类 - 定义模板方法和算法骨架
 * 包含具体方法（通用实现）和抽象方法（子类必须实现）
 */
abstract class AbstractClass {
  /**
   * 模板方法 - 定义算法的执行顺序（骨架）
   * 使用 final 语义（TypeScript 中通过不标记 abstract 实现）
   * 子类不能重写此方法
   */
  public templateMethod(): void {
    this.baseOperation1();
    this.requiredOperation1();
    this.baseOperation2();
    this.hook1();
    this.requiredOperation2();
    this.baseOperation3();
    this.hook2();
  }

  /**
   * 基本操作1 - 具体方法
   * 在抽象类中提供通用实现，子类可选择性重写
   */
  protected baseOperation1(): void {
    console.log('AbstractClass: 执行基本操作1（通用实现）');
  }

  /**
   * 基本操作2 - 具体方法
   */
  protected baseOperation2(): void {
    console.log('AbstractClass: 执行基本操作2（通用实现）');
  }

  /**
   * 基本操作3 - 具体方法
   */
  protected baseOperation3(): void {
    console.log('AbstractClass: 执行基本操作3（通用实现）');
  }

  /**
   * 必需操作1 - 抽象方法
   * 子类必须实现此方法
   */
  protected abstract requiredOperation1(): void;

  /**
   * 必需操作2 - 抽象方法
   * 子类必须实现此方法
   */
  protected abstract requiredOperation2(): void;

  /**
   * 钩子方法1 - 默认空实现
   * 子类可选择性重写，用于在算法特定点插入自定义行为
   */
  protected hook1(): void {
    // 默认空实现，子类可选择性重写
  }

  /**
   * 钩子方法2 - 带默认实现
   * 子类可选择性重写
   */
  protected hook2(): void {
    console.log('AbstractClass: 执行钩子方法2（默认实现）');
  }
}

/**
 * 具体类A - 实现抽象方法，使用默认钩子
 */
class ConcreteClassA extends AbstractClass {
  /**
   * 实现必需操作1
   */
  protected requiredOperation1(): void {
    console.log('ConcreteClassA: 实现必需操作1');
  }

  /**
   * 实现必需操作2
   */
  protected requiredOperation2(): void {
    console.log('ConcreteClassA: 实现必需操作2');
  }

  // 不重写 hook1，使用默认空实现
  // 不重写 hook2，使用默认实现
}

/**
 * 具体类B - 实现抽象方法，重写钩子方法
 */
class ConcreteClassB extends AbstractClass {
  /**
   * 实现必需操作1
   */
  protected requiredOperation1(): void {
    console.log('ConcreteClassB: 实现必需操作1（不同实现）');
  }

  /**
   * 实现必需操作2
   */
  protected requiredOperation2(): void {
    console.log('ConcreteClassB: 实现必需操作2（不同实现）');
  }

  /**
   * 重写钩子方法1 - 插入自定义行为
   */
  protected hook1(): void {
    console.log('ConcreteClassB: 重写钩子方法1');
  }

  /**
   * 重写钩子方法2 - 改变默认行为
   */
  protected hook2(): void {
    console.log('ConcreteClassB: 重写钩子方法2（自定义实现）');
  }
}

/**
 * 具体类C - 重写基本操作，展示更多灵活性
 */
class ConcreteClassC extends AbstractClass {
  /**
   * 重写基本操作1 - 改变通用实现
   */
  protected baseOperation1(): void {
    console.log('ConcreteClassC: 重写基本操作1');
  }

  protected requiredOperation1(): void {
    console.log('ConcreteClassC: 实现必需操作1');
  }

  protected requiredOperation2(): void {
    console.log('ConcreteClassC: 实现必需操作2');
  }

  /**
   * 钩子方法1 - 条件性执行
   */
  protected hook1(): void {
    console.log('ConcreteClassC: 条件性执行钩子方法1');
  }
}

/**
 * 客户端代码 - 使用模板方法
 */
function clientCode(): void {
  console.log('=== 使用 ConcreteClassA ===');
  const classA = new ConcreteClassA();
  classA.templateMethod();

  console.log('\\n=== 使用 ConcreteClassB ===');
  const classB = new ConcreteClassB();
  classB.templateMethod();

  console.log('\\n=== 使用 ConcreteClassC ===');
  const classC = new ConcreteClassC();
  classC.templateMethod();
}

// 执行客户端代码
clientCode();

/**
 * 实际应用场景：数据导入处理器
 */
abstract class DataImporter {
  /**
   * 模板方法 - 数据导入流程
   */
  public importData(filePath: string): void {
    const rawData = this.readFile(filePath);
    const parsedData = this.parseData(rawData);
    
    if (this.validateData(parsedData)) {
      this.transformData(parsedData);
      this.saveToDatabase(parsedData);
      this.postProcess(parsedData);
      console.log('数据导入成功！');
    } else {
      console.log('数据验证失败，导入中止！');
    }
  }

  /**
   * 读取文件 - 具体方法
   */
  private readFile(filePath: string): string {
    console.log(\`读取文件: \${filePath}\`);
    return 'raw data content';
  }

  /**
   * 解析数据 - 抽象方法（不同格式不同实现）
   */
  protected abstract parseData(rawData: string): any;

  /**
   * 验证数据 - 钩子方法（默认通过）
   */
  protected validateData(data: any): boolean {
    return true;
  }

  /**
   * 转换数据 - 具体方法
   */
  private transformData(data: any): void {
    console.log('转换数据格式...');
  }

  /**
   * 保存到数据库 - 具体方法
   */
  private saveToDatabase(data: any): void {
    console.log('保存到数据库...');
  }

  /**
   * 后处理 - 钩子方法（默认空实现）
   */
  protected postProcess(data: any): void {
    // 默认空实现
  }
}

/**
 * CSV 数据导入器
 */
class CsvImporter extends DataImporter {
  protected parseData(rawData: string): any {
    console.log('使用 CSV 解析器解析数据...');
    return { type: 'csv', rows: [] };
  }

  protected validateData(data: any): boolean {
    console.log('验证 CSV 数据完整性...');
    return true;
  }
}

/**
 * JSON 数据导入器
 */
class JsonImporter extends DataImporter {
  protected parseData(rawData: string): any {
    console.log('使用 JSON 解析器解析数据...');
    return { type: 'json', objects: [] };
  }

  protected postProcess(data: any): void {
    console.log('JSON 数据导入后处理：建立索引...');
  }
}`,

    java: `/**
 * 模板方法模式 - Java 实现
 * 使用 abstract 类和 final 关键字确保模板方法不被重写
 */

/**
 * 抽象类 - 定义模板方法和算法骨架
 */
public abstract class AbstractClass {
    
    /**
     * 模板方法 - 定义算法的执行顺序（骨架）
     * 使用 final 关键字防止子类重写，确保算法结构不被改变
     */
    public final void templateMethod() {
        baseOperation1();
        requiredOperation1();
        baseOperation2();
        hook1();
        requiredOperation2();
        baseOperation3();
        hook2();
    }

    /**
     * 基本操作1 - 具体方法
     * 在抽象类中提供通用实现，子类可选择性重写
     */
    protected void baseOperation1() {
        System.out.println("AbstractClass: 执行基本操作1（通用实现）");
    }

    /**
     * 基本操作2 - 具体方法
     */
    protected void baseOperation2() {
        System.out.println("AbstractClass: 执行基本操作2（通用实现）");
    }

    /**
     * 基本操作3 - 具体方法
     */
    protected void baseOperation3() {
        System.out.println("AbstractClass: 执行基本操作3（通用实现）");
    }

    /**
     * 必需操作1 - 抽象方法
     * 子类必须实现此方法
     */
    protected abstract void requiredOperation1();

    /**
     * 必需操作2 - 抽象方法
     * 子类必须实现此方法
     */
    protected abstract void requiredOperation2();

    /**
     * 钩子方法1 - 默认空实现
     * 子类可选择性重写，用于在算法特定点插入自定义行为
     */
    protected void hook1() {
        // 默认空实现，子类可选择性重写
    }

    /**
     * 钩子方法2 - 带默认实现
     * 子类可选择性重写
     */
    protected void hook2() {
        System.out.println("AbstractClass: 执行钩子方法2（默认实现）");
    }
}

/**
 * 具体类A - 实现抽象方法，使用默认钩子
 */
public class ConcreteClassA extends AbstractClass {
    
    @Override
    protected void requiredOperation1() {
        System.out.println("ConcreteClassA: 实现必需操作1");
    }

    @Override
    protected void requiredOperation2() {
        System.out.println("ConcreteClassA: 实现必需操作2");
    }
    
    // 不重写 hook1，使用默认空实现
    // 不重写 hook2，使用默认实现
}

/**
 * 具体类B - 实现抽象方法，重写钩子方法
 */
public class ConcreteClassB extends AbstractClass {
    
    @Override
    protected void requiredOperation1() {
        System.out.println("ConcreteClassB: 实现必需操作1（不同实现）");
    }

    @Override
    protected void requiredOperation2() {
        System.out.println("ConcreteClassB: 实现必需操作2（不同实现）");
    }

    @Override
    protected void hook1() {
        System.out.println("ConcreteClassB: 重写钩子方法1");
    }

    @Override
    protected void hook2() {
        System.out.println("ConcreteClassB: 重写钩子方法2（自定义实现）");
    }
}

/**
 * 具体类C - 重写基本操作，展示更多灵活性
 */
public class ConcreteClassC extends AbstractClass {
    
    @Override
    protected void baseOperation1() {
        System.out.println("ConcreteClassC: 重写基本操作1");
    }

    @Override
    protected void requiredOperation1() {
        System.out.println("ConcreteClassC: 实现必需操作1");
    }

    @Override
    protected void requiredOperation2() {
        System.out.println("ConcreteClassC: 实现必需操作2");
    }

    @Override
    protected void hook1() {
        System.out.println("ConcreteClassC: 条件性执行钩子方法1");
    }
}

/**
 * 客户端代码 - 使用模板方法
 */
public class Client {
    public static void main(String[] args) {
        System.out.println("=== 使用 ConcreteClassA ===");
        AbstractClass classA = new ConcreteClassA();
        classA.templateMethod();

        System.out.println("\\n=== 使用 ConcreteClassB ===");
        AbstractClass classB = new ConcreteClassB();
        classB.templateMethod();

        System.out.println("\\n=== 使用 ConcreteClassC ===");
        AbstractClass classC = new ConcreteClassC();
        classC.templateMethod();
    }
}

/**
 * 实际应用场景：网络请求处理
 */
public abstract class NetworkRequest {
    
    /**
     * 模板方法 - 网络请求处理流程
     */
    public final void execute(String url) {
        try {
            buildRequest(url);
            authenticate();
            Object response = sendRequest();
            
            if (shouldRetry(response)) {
                System.out.println("重试请求...");
                response = sendRequest();
            }
            
            parseResponse(response);
            logRequest();
            
        } catch (Exception e) {
            handleError(e);
        }
    }

    /**
     * 构建请求 - 具体方法
     */
    private void buildRequest(String url) {
        System.out.println("构建请求: " + url);
    }

    /**
     * 认证 - 抽象方法
     */
    protected abstract void authenticate();

    /**
     * 发送请求 - 抽象方法
     */
    protected abstract Object sendRequest();

    /**
     * 是否应该重试 - 钩子方法
     */
    protected boolean shouldRetry(Object response) {
        return false;
    }

    /**
     * 解析响应 - 抽象方法
     */
    protected abstract void parseResponse(Object response);

    /**
     * 记录日志 - 具体方法
     */
    private void logRequest() {
        System.out.println("记录请求日志...");
    }

    /**
     * 错误处理 - 钩子方法
     */
    protected void handleError(Exception e) {
        System.err.println("请求失败: " + e.getMessage());
    }
}

/**
 * HTTP GET 请求
 */
public class HttpGetRequest extends NetworkRequest {
    
    @Override
    protected void authenticate() {
        System.out.println("使用 API Key 认证...");
    }

    @Override
    protected Object sendRequest() {
        System.out.println("发送 HTTP GET 请求...");
        return "GET Response";
    }

    @Override
    protected void parseResponse(Object response) {
        System.out.println("解析 JSON 响应: " + response);
    }
}

/**
 * HTTP POST 请求
 */
public class HttpPostRequest extends NetworkRequest {
    
    @Override
    protected void authenticate() {
        System.out.println("使用 OAuth2 认证...");
    }

    @Override
    protected Object sendRequest() {
        System.out.println("发送 HTTP POST 请求...");
        return "POST Response";
    }

    @Override
    protected boolean shouldRetry(Object response) {
        // 如果响应为空，则重试
        return response == null || response.toString().isEmpty();
    }

    @Override
    protected void parseResponse(Object response) {
        System.out.println("解析 XML 响应: " + response);
    }

    @Override
    protected void handleError(Exception e) {
        System.err.println("POST 请求失败，发送告警: " + e.getMessage());
    }
}`,

    go: `package templatemethod

import (
	"fmt"
)

/**
 * 模板方法模式 - Go 实现
 * 使用接口定义行为契约，嵌入结构体实现代码复用
 */

/**
 * DataImporter 接口 - 定义模板方法行为契约
 */
type DataImporter interface {
	ImportData(filePath string)
	ParseData(rawData string) interface{}
	ValidateData(data interface{}) bool
	PostProcess(data interface{})
}

/**
 * BaseImporter - 基础导入器结构体
 * 包含模板方法的通用实现
 */
type BaseImporter struct {
	// 嵌入接口字段，允许子类通过接口调用具体实现
	impl DataImporter
}

/**
 * 模板方法 - 定义数据导入的算法骨架
 * 通过 impl 字段调用子类的具体实现
 */
func (b *BaseImporter) ImportData(filePath string) {
	rawData := b.readFile(filePath)
	parsedData := b.impl.ParseData(rawData)

	if b.impl.ValidateData(parsedData) {
		b.transformData(parsedData)
		b.saveToDatabase(parsedData)
		b.impl.PostProcess(parsedData)
		fmt.Println("数据导入成功！")
	} else {
		fmt.Println("数据验证失败，导入中止！")
	}
}

/**
 * 读取文件 - 具体方法
 */
func (b *BaseImporter) readFile(filePath string) string {
	fmt.Printf("读取文件: %s\\n", filePath)
	return "raw data content"
}

/**
 * 转换数据 - 具体方法
 */
func (b *BaseImporter) transformData(data interface{}) {
	fmt.Println("转换数据格式...")
}

/**
 * 保存到数据库 - 具体方法
 */
func (b *BaseImporter) saveToDatabase(data interface{}) {
	fmt.Println("保存到数据库...")
}

/**
 * 默认验证 - 钩子方法的默认实现
 */
func (b *BaseImporter) ValidateData(data interface{}) bool {
	return true
}

/**
 * 默认后处理 - 钩子方法的默认实现
 */
func (b *BaseImporter) PostProcess(data interface{}) {
	// 默认空实现
}

/**
 * CsvImporter - CSV 数据导入器
 * 嵌入 BaseImporter，实现 DataImporter 接口
 */
type CsvImporter struct {
	BaseImporter
}

/**
 * 创建新的 CSV 导入器
 */
func NewCsvImporter() *CsvImporter {
	importer := &CsvImporter{}
	// 关键：设置 BaseImporter 的 impl 字段为自身
	// 这样 BaseImporter 的模板方法可以通过 impl 调用 CsvImporter 的方法
	importer.BaseImporter.impl = importer
	return importer
}

/**
 * 实现 ParseData 方法
 */
func (c *CsvImporter) ParseData(rawData string) interface{} {
	fmt.Println("使用 CSV 解析器解析数据...")
	return map[string]string{"type": "csv", "rows": "10"}
}

/**
 * 重写 ValidateData 钩子方法
 */
func (c *CsvImporter) ValidateData(data interface{}) bool {
	fmt.Println("验证 CSV 数据完整性...")
	return true
}

/**
 * JsonImporter - JSON 数据导入器
 */
type JsonImporter struct {
	BaseImporter
}

/**
 * 创建新的 JSON 导入器
 */
func NewJsonImporter() *JsonImporter {
	importer := &JsonImporter{}
	importer.BaseImporter.impl = importer
	return importer
}

/**
 * 实现 ParseData 方法
 */
func (j *JsonImporter) ParseData(rawData string) interface{} {
	fmt.Println("使用 JSON 解析器解析数据...")
	return map[string]string{"type": "json", "objects": "5"}
}

/**
 * 重写 PostProcess 钩子方法
 */
func (j *JsonImporter) PostProcess(data interface{}) {
	fmt.Println("JSON 数据导入后处理：建立索引...")
}

/**
 * 客户端代码
 */
func ClientCode() {
	fmt.Println("=== 使用 CSV 导入器 ===")
	csvImporter := NewCsvImporter()
	csvImporter.ImportData("data.csv")

	fmt.Println("\\n=== 使用 JSON 导入器 ===")
	jsonImporter := NewJsonImporter()
	jsonImporter.ImportData("data.json")
}

/**
 * 另一种实现方式：使用函数类型实现更灵活的模板方法
 */

/**
 * ReportGenerator - 报告生成器
 * 使用函数字段代替继承
 */
type ReportGenerator struct {
	// 基本操作（具体方法）
	CollectData func()
	FormatData  func()

	// 必需操作（抽象方法）- 函数类型字段
	GenerateContent func() string
	ExportReport    func(content string)

	// 钩子方法
	ShouldSendEmail func() bool
	SendEmail       func()
}

/**
 * 模板方法 - 生成报告
 */
func (r *ReportGenerator) GenerateReport() {
	// 步骤1：收集数据
	if r.CollectData != nil {
		r.CollectData()
	}

	// 步骤2：格式化数据
	if r.FormatData != nil {
		r.FormatData()
	}

	// 步骤3：生成内容（必需）
	content := r.GenerateContent()

	// 步骤4：导出报告（必需）
	r.ExportReport(content)

	// 步骤5：钩子 - 发送邮件
	if r.ShouldSendEmail != nil && r.ShouldSendEmail() {
		if r.SendEmail != nil {
			r.SendEmail()
		}
	}
}

/**
 * 创建 PDF 报告生成器
 */
func NewPdfReportGenerator() *ReportGenerator {
	return &ReportGenerator{
		CollectData: func() {
			fmt.Println("收集 PDF 报告数据...")
		},
		FormatData: func() {
			fmt.Println("格式化 PDF 数据...")
		},
		GenerateContent: func() string {
			fmt.Println("生成 PDF 内容...")
			return "PDF Content"
		},
		ExportReport: func(content string) {
			fmt.Printf("导出 PDF 报告: %s\\n", content)
		},
		ShouldSendEmail: func() bool {
			return true // PDF 报告需要发送邮件
		},
		SendEmail: func() {
			fmt.Println("发送 PDF 报告邮件...")
		},
	}
}

/**
 * 创建 Excel 报告生成器
 */
func NewExcelReportGenerator() *ReportGenerator {
	return &ReportGenerator{
		CollectData: func() {
			fmt.Println("收集 Excel 报告数据...")
		},
		FormatData: func() {
			fmt.Println("格式化 Excel 数据...")
		},
		GenerateContent: func() string {
			fmt.Println("生成 Excel 内容...")
			return "Excel Content"
		},
		ExportReport: func(content string) {
			fmt.Printf("导出 Excel 报告: %s\\n", content)
		},
		ShouldSendEmail: func() bool {
			return false // Excel 报告不需要发送邮件
		},
	}
}

/**
 * 使用函数类型的客户端代码
 */
func ClientCodeWithFunctions() {
	fmt.Println("=== 生成 PDF 报告 ===")
	pdfGen := NewPdfReportGenerator()
	pdfGen.GenerateReport()

	fmt.Println("\\n=== 生成 Excel 报告 ===")
	excelGen := NewExcelReportGenerator()
	excelGen.GenerateReport()
}`,

    python: `from abc import ABC, abstractmethod
from typing import Any, Optional


/**
 * 模板方法模式 - Python 实现
 * 使用抽象基类（ABC）定义模板方法
 */


class AbstractClass(ABC):
    """
    抽象类 - 定义模板方法和算法骨架
    使用 Python 的 ABC 模块实现抽象类
    """

    def template_method(self) -> None:
        """
        模板方法 - 定义算法的执行顺序（骨架）
        子类不能重写此方法（Python 中通过命名约定和文档说明）
        """
        self._base_operation1()
        self._required_operation1()
        self._base_operation2()
        self._hook1()
        self._required_operation2()
        self._base_operation3()
        self._hook2()

    def _base_operation1(self) -> None:
        """
        基本操作1 - 具体方法
        在抽象类中提供通用实现，子类可选择性重写
        """
        print("AbstractClass: 执行基本操作1（通用实现）")

    def _base_operation2(self) -> None:
        """
        基本操作2 - 具体方法
        """
        print("AbstractClass: 执行基本操作2（通用实现）")

    def _base_operation3(self) -> None:
        """
        基本操作3 - 具体方法
        """
        print("AbstractClass: 执行基本操作3（通用实现）")

    @abstractmethod
    def _required_operation1(self) -> None:
        """
        必需操作1 - 抽象方法
        子类必须实现此方法
        """
        pass

    @abstractmethod
    def _required_operation2(self) -> None:
        """
        必需操作2 - 抽象方法
        子类必须实现此方法
        """
        pass

    def _hook1(self) -> None:
        """
        钩子方法1 - 默认空实现
        子类可选择性重写，用于在算法特定点插入自定义行为
        """
        pass

    def _hook2(self) -> None:
        """
        钩子方法2 - 带默认实现
        子类可选择性重写
        """
        print("AbstractClass: 执行钩子方法2（默认实现）")


class ConcreteClassA(AbstractClass):
    """
    具体类A - 实现抽象方法，使用默认钩子
    """

    def _required_operation1(self) -> None:
        """实现必需操作1"""
        print("ConcreteClassA: 实现必需操作1")

    def _required_operation2(self) -> None:
        """实现必需操作2"""
        print("ConcreteClassA: 实现必需操作2")

    # 不重写 _hook1，使用默认空实现
    # 不重写 _hook2，使用默认实现


class ConcreteClassB(AbstractClass):
    """
    具体类B - 实现抽象方法，重写钩子方法
    """

    def _required_operation1(self) -> None:
        """实现必需操作1"""
        print("ConcreteClassB: 实现必需操作1（不同实现）")

    def _required_operation2(self) -> None:
        """实现必需操作2"""
        print("ConcreteClassB: 实现必需操作2（不同实现）")

    def _hook1(self) -> None:
        """重写钩子方法1 - 插入自定义行为"""
        print("ConcreteClassB: 重写钩子方法1")

    def _hook2(self) -> None:
        """重写钩子方法2 - 改变默认行为"""
        print("ConcreteClassB: 重写钩子方法2（自定义实现）")


class ConcreteClassC(AbstractClass):
    """
    具体类C - 重写基本操作，展示更多灵活性
    """

    def _base_operation1(self) -> None:
        """重写基本操作1 - 改变通用实现"""
        print("ConcreteClassC: 重写基本操作1")

    def _required_operation1(self) -> None:
        """实现必需操作1"""
        print("ConcreteClassC: 实现必需操作1")

    def _required_operation2(self) -> None:
        """实现必需操作2"""
        print("ConcreteClassC: 实现必需操作2")

    def _hook1(self) -> None:
        """钩子方法1 - 条件性执行"""
        print("ConcreteClassC: 条件性执行钩子方法1")


def client_code() -> None:
    """
    客户端代码 - 使用模板方法
    """
    print("=== 使用 ConcreteClassA ===")
    class_a = ConcreteClassA()
    class_a.template_method()

    print("\\n=== 使用 ConcreteClassB ===")
    class_b = ConcreteClassB()
    class_b.template_method()

    print("\\n=== 使用 ConcreteClassC ===")
    class_c = ConcreteClassC()
    class_c.template_method()


# 执行客户端代码
if __name__ == "__main__":
    client_code()


/**
 * 实际应用场景：机器学习工作流
 */


class MLWorkflow(ABC):
    """
    机器学习工作流基类
    定义机器学习模型的标准训练和预测流程
    """

    def train(self, data_path: str) -> Any:
        """
        模板方法 - 训练流程
        """
        print(f"\\n开始训练流程，数据路径: {data_path}")
        
        # 步骤1：加载数据
        data = self._load_data(data_path)
        
        # 步骤2：数据预处理
        processed_data = self._preprocess_data(data)
        
        # 步骤3：特征工程（钩子）
        if self._should_extract_features():
            processed_data = self._extract_features(processed_data)
        
        # 步骤4：构建模型
        model = self._build_model()
        
        # 步骤5：训练模型（必需，由子类实现）
        trained_model = self._train_model(model, processed_data)
        
        # 步骤6：评估模型
        metrics = self._evaluate_model(trained_model, processed_data)
        
        # 步骤7：保存模型（钩子）
        if self._should_save_model():
            self._save_model(trained_model)
        
        print("训练流程完成！")
        return trained_model

    def predict(self, model: Any, input_data: Any) -> Any:
        """
        模板方法 - 预测流程
        """
        print("\\n开始预测流程...")
        
        # 步骤1：预处理输入
        processed_input = self._preprocess_input(input_data)
        
        # 步骤2：执行预测（必需，由子类实现）
        predictions = self._execute_prediction(model, processed_input)
        
        # 步骤3：后处理结果（钩子）
        if self._should_postprocess():
            predictions = self._postprocess_predictions(predictions)
        
        print("预测流程完成！")
        return predictions

    def _load_data(self, data_path: str) -> Any:
        """加载数据 - 具体方法"""
        print(f"加载数据: {data_path}")
        return f"data_from_{data_path}"

    def _preprocess_data(self, data: Any) -> Any:
        """数据预处理 - 具体方法"""
        print("预处理数据...")
        return data

    def _should_extract_features(self) -> bool:
        """是否应该提取特征 - 钩子方法"""
        return True

    def _extract_features(self, data: Any) -> Any:
        """特征工程 - 默认实现"""
        print("提取特征...")
        return data

    @abstractmethod
    def _build_model(self) -> Any:
        """构建模型 - 抽象方法"""
        pass

    @abstractmethod
    def _train_model(self, model: Any, data: Any) -> Any:
        """训练模型 - 抽象方法"""
        pass

    def _evaluate_model(self, model: Any, data: Any) -> dict:
        """评估模型 - 具体方法"""
        print("评估模型...")
        return {"accuracy": 0.95}

    def _should_save_model(self) -> bool:
        """是否应该保存模型 - 钩子方法"""
        return True

    def _save_model(self, model: Any) -> None:
        """保存模型 - 具体方法"""
        print("保存模型...")

    def _preprocess_input(self, input_data: Any) -> Any:
        """预处理输入 - 具体方法"""
        print("预处理输入数据...")
        return input_data

    @abstractmethod
    def _execute_prediction(self, model: Any, input_data: Any) -> Any:
        """执行预测 - 抽象方法"""
        pass

    def _should_postprocess(self) -> bool:
        """是否应该后处理 - 钩子方法"""
        return False

    def _postprocess_predictions(self, predictions: Any) -> Any:
        """后处理预测结果 - 默认实现"""
        print("后处理预测结果...")
        return predictions


class NeuralNetworkWorkflow(MLWorkflow):
    """
    神经网络工作流
    """

    def _build_model(self) -> Any:
        """构建神经网络模型"""
        print("构建神经网络模型...")
        return "neural_network_model"

    def _train_model(self, model: Any, data: Any) -> Any:
        """训练神经网络"""
        print("训练神经网络...")
        return f"trained_{model}"

    def _execute_prediction(self, model: Any, input_data: Any) -> Any:
        """执行神经网络预测"""
        print("执行神经网络预测...")
        return f"nn_prediction_for_{input_data}"

    def _should_postprocess(self) -> bool:
        """神经网络需要后处理（如 softmax）"""
        return True

    def _postprocess_predictions(self, predictions: Any) -> Any:
        """应用 softmax 等后处理"""
        print("应用 softmax 后处理...")
        return predictions


class RandomForestWorkflow(MLWorkflow):
    """
    随机森林工作流
    """

    def _build_model(self) -> Any:
        """构建随机森林模型"""
        print("构建随机森林模型...")
        return "random_forest_model"

    def _train_model(self, model: Any, data: Any) -> Any:
        """训练随机森林"""
        print("训练随机森林...")
        return f"trained_{model}"

    def _execute_prediction(self, model: Any, input_data: Any) -> Any:
        """执行随机森林预测"""
        print("执行随机森林预测...")
        return f"rf_prediction_for_{input_data}"

    def _should_extract_features(self) -> bool:
        """随机森林不需要额外的特征工程"""
        return False

    def _should_save_model(self) -> bool:
        """随机森林模型较大，可以选择不保存"""
        return False


# 使用示例
def ml_client_code():
    """机器学习客户端代码"""
    print("=" * 50)
    print("神经网络工作流")
    print("=" * 50)
    nn_workflow = NeuralNetworkWorkflow()
    nn_model = nn_workflow.train("data/train.csv")
    nn_workflow.predict(nn_model, "test_sample")

    print("\\n" + "=" * 50)
    print("随机森林工作流")
    print("=" * 50)
    rf_workflow = RandomForestWorkflow()
    rf_model = rf_workflow.train("data/train.csv")
    rf_workflow.predict(rf_model, "test_sample")


if __name__ == "__main__":
    client_code()
    ml_client_code()`,

    cpp: `/**
 * 模板方法模式 - C++ 实现
 * 使用抽象类、虚函数和纯虚函数
 */

#include <iostream>
#include <string>
#include <memory>

/**
 * 抽象类 - 定义模板方法和算法骨架
 * 使用纯虚函数定义必需实现的接口
 * 使用虚函数定义可选重写的钩子
 */
class AbstractClass {
public:
    /**
     * 模板方法 - 定义算法的执行顺序（骨架）
     * 使用 final 关键字（C++11）防止子类重写
     */
    void templateMethod() final {
        baseOperation1();
        requiredOperation1();
        baseOperation2();
        hook1();
        requiredOperation2();
        baseOperation3();
        hook2();
    }

    /**
     * 虚析构函数 - 确保正确释放资源
     */
    virtual ~AbstractClass() = default;

protected:
    /**
     * 基本操作1 - 具体方法
     * 在抽象类中提供通用实现，子类可选择性重写
     */
    virtual void baseOperation1() {
        std::cout << "AbstractClass: 执行基本操作1（通用实现）" << std::endl;
    }

    /**
     * 基本操作2 - 具体方法
     */
    virtual void baseOperation2() {
        std::cout << "AbstractClass: 执行基本操作2（通用实现）" << std::endl;
    }

    /**
     * 基本操作3 - 具体方法
     */
    virtual void baseOperation3() {
        std::cout << "AbstractClass: 执行基本操作3（通用实现）" << std::endl;
    }

    /**
     * 必需操作1 - 纯虚函数（抽象方法）
     * 子类必须实现此方法
     */
    virtual void requiredOperation1() = 0;

    /**
     * 必需操作2 - 纯虚函数（抽象方法）
     * 子类必须实现此方法
     */
    virtual void requiredOperation2() = 0;

    /**
     * 钩子方法1 - 默认空实现
     * 子类可选择性重写
     */
    virtual void hook1() {
        // 默认空实现
    }

    /**
     * 钩子方法2 - 带默认实现
     * 子类可选择性重写
     */
    virtual void hook2() {
        std::cout << "AbstractClass: 执行钩子方法2（默认实现）" << std::endl;
    }
};

/**
 * 具体类A - 实现抽象方法，使用默认钩子
 */
class ConcreteClassA : public AbstractClass {
protected:
    /**
     * 实现必需操作1
     */
    void requiredOperation1() override {
        std::cout << "ConcreteClassA: 实现必需操作1" << std::endl;
    }

    /**
     * 实现必需操作2
     */
    void requiredOperation2() override {
        std::cout << "ConcreteClassA: 实现必需操作2" << std::endl;
    }
    
    // 不重写 hook1，使用默认空实现
    // 不重写 hook2，使用默认实现
};

/**
 * 具体类B - 实现抽象方法，重写钩子方法
 */
class ConcreteClassB : public AbstractClass {
protected:
    /**
     * 实现必需操作1
     */
    void requiredOperation1() override {
        std::cout << "ConcreteClassB: 实现必需操作1（不同实现）" << std::endl;
    }

    /**
     * 实现必需操作2
     */
    void requiredOperation2() override {
        std::cout << "ConcreteClassB: 实现必需操作2（不同实现）" << std::endl;
    }

    /**
     * 重写钩子方法1
     */
    void hook1() override {
        std::cout << "ConcreteClassB: 重写钩子方法1" << std::endl;
    }

    /**
     * 重写钩子方法2
     */
    void hook2() override {
        std::cout << "ConcreteClassB: 重写钩子方法2（自定义实现）" << std::endl;
    }
};

/**
 * 具体类C - 重写基本操作，展示更多灵活性
 */
class ConcreteClassC : public AbstractClass {
protected:
    /**
     * 重写基本操作1
     */
    void baseOperation1() override {
        std::cout << "ConcreteClassC: 重写基本操作1" << std::endl;
    }

    /**
     * 实现必需操作1
     */
    void requiredOperation1() override {
        std::cout << "ConcreteClassC: 实现必需操作1" << std::endl;
    }

    /**
     * 实现必需操作2
     */
    void requiredOperation2() override {
        std::cout << "ConcreteClassC: 实现必需操作2" << std::endl;
    }

    /**
     * 重写钩子方法1
     */
    void hook1() override {
        std::cout << "ConcreteClassC: 条件性执行钩子方法1" << std::endl;
    }
};

/**
 * 客户端代码 - 使用模板方法
 */
void clientCode() {
    std::cout << "=== 使用 ConcreteClassA ===" << std::endl;
    std::unique_ptr<AbstractClass> classA = std::make_unique<ConcreteClassA>();
    classA->templateMethod();

    std::cout << "\\n=== 使用 ConcreteClassB ===" << std::endl;
    std::unique_ptr<AbstractClass> classB = std::make_unique<ConcreteClassB>();
    classB->templateMethod();

    std::cout << "\\n=== 使用 ConcreteClassC ===" << std::endl;
    std::unique_ptr<AbstractClass> classC = std::make_unique<ConcreteClassC>();
    classC->templateMethod();
}

/**
 * 实际应用场景：游戏角色AI
 */
class GameCharacterAI {
public:
    /**
     * 模板方法 - AI 决策流程
     */
    void makeDecision() final {
        // 步骤1：感知环境
        perceiveEnvironment();
        
        // 步骤2：评估威胁
        evaluateThreats();
        
        // 步骤3：选择目标（钩子）
        if (shouldSelectTarget()) {
            selectTarget();
        }
        
        // 步骤4：选择行为（必需，由子类实现）
        chooseAction();
        
        // 步骤5：执行行为（必需，由子类实现）
        executeAction();
        
        // 步骤6：后处理（钩子）
        postProcess();
    }

    virtual ~GameCharacterAI() = default;

protected:
    /**
     * 感知环境 - 具体方法
     */
    virtual void perceiveEnvironment() {
        std::cout << "感知周围环境..." << std::endl;
    }

    /**
     * 评估威胁 - 具体方法
     */
    virtual void evaluateThreats() {
        std::cout << "评估周围威胁..." << std::endl;
    }

    /**
     * 是否应该选择目标 - 钩子方法
     */
    virtual bool shouldSelectTarget() {
        return true;
    }

    /**
     * 选择目标 - 默认实现
     */
    virtual void selectTarget() {
        std::cout << "选择最近的敌人作为目标" << std::endl;
    }

    /**
     * 选择行为 - 纯虚函数
     */
    virtual void chooseAction() = 0;

    /**
     * 执行行为 - 纯虚函数
     */
    virtual void executeAction() = 0;

    /**
     * 后处理 - 钩子方法
     */
    virtual void postProcess() {
        // 默认空实现
    }
};

/**
 * 战士 AI
 */
class WarriorAI : public GameCharacterAI {
protected:
    void chooseAction() override {
        std::cout << "战士选择：冲锋攻击" << std::endl;
    }

    void executeAction() override {
        std::cout << "战士执行：挥舞大剑攻击" << std::endl;
    }

    void postProcess() override {
        std::cout << "战士后处理：检查是否需要治疗" << std::endl;
    }
};

/**
 * 法师 AI
 */
class MageAI : public GameCharacterAI {
protected:
    void perceiveEnvironment() override {
        std::cout << "法师感知：扫描魔法能量..." << std::endl;
    }

    void chooseAction() override {
        std::cout << "法师选择：施放火球术" << std::endl;
    }

    void executeAction() override {
        std::cout << "法师执行：吟唱并释放火球" << std::endl;
    }

    bool shouldSelectTarget() override {
        // 法师总是需要选择目标
        return true;
    }

    void selectTarget() override {
        std::cout << "法师选择：选择魔法抗性最低的目标" << std::endl;
    }
};

/**
 * 弓箭手 AI
 */
class ArcherAI : public GameCharacterAI {
protected:
    void chooseAction() override {
        std::cout << "弓箭手选择：远程射击" << std::endl;
    }

    void executeAction() override {
        std::cout << "弓箭手执行：拉弓射箭" << std::endl;
    }

    bool shouldSelectTarget() override {
        // 弓箭手只在有箭时选择目标
        return hasArrows();
    }

    bool hasArrows() {
        return true; // 简化示例
    }
};

/**
 * 游戏客户端代码
 */
void gameClientCode() {
    std::cout << "\\n========== 游戏 AI 系统 ==========" << std::endl;
    
    std::cout << "\\n--- 战士 AI ---" << std::endl;
    std::unique_ptr<GameCharacterAI> warrior = std::make_unique<WarriorAI>();
    warrior->makeDecision();

    std::cout << "\\n--- 法师 AI ---" << std::endl;
    std::unique_ptr<GameCharacterAI> mage = std::make_unique<MageAI>();
    mage->makeDecision();

    std::cout << "\\n--- 弓箭手 AI ---" << std::endl;
    std::unique_ptr<GameCharacterAI> archer = std::make_unique<ArcherAI>();
    archer->makeDecision();
}

/**
 * 主函数
 */
int main() {
    // 基础示例
    clientCode();
    
    // 游戏 AI 示例
    gameClientCode();
    
    return 0;
}`,
  },
  realWorldExamples: [
    {
      title: 'Java Servlet',
      description: 'Java Servlet 的 doGet、doPost 方法是模板方法模式的典型应用。service() 方法作为模板方法定义了请求处理流程，doGet/doPost 等作为钩子方法供子类实现。',
      source: 'Java EE',
      codeSnippet: `protected void service(HttpServletRequest req, HttpServletResponse resp) {
    // 模板方法：定义请求处理流程
    if (method.equals("GET")) {
        doGet(req, resp);  // 钩子方法
    } else if (method.equals("POST")) {
        doPost(req, resp); // 钩子方法
    }
}

// 子类重写钩子方法
protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
    // 自定义实现
}`,
    },
    {
      title: 'Spring Framework - JdbcTemplate',
      description: 'Spring 的 JdbcTemplate 使用模板方法模式封装 JDBC 操作流程，用户只需实现特定的回调接口来定制查询或更新逻辑。',
      source: 'Spring Framework',
      codeSnippet: `public <T> T query(String sql, ResultSetExtractor<T> rse) {
    // 模板方法：定义 JDBC 操作流程
    Connection con = DataSourceUtils.getConnection(dataSource);
    try {
        // ... 创建 Statement
        ResultSet rs = stmt.executeQuery(sql);
        return rse.extractData(rs);  // 钩子：由用户实现
    } finally {
        // ... 资源清理
    }
}`,
    },
    {
      title: 'JUnit 测试框架',
      description: 'JUnit 的 TestCase 类使用模板方法模式，setUp() 和 tearDown() 作为钩子方法，runTest() 作为模板方法定义测试执行流程。',
      source: 'JUnit',
      codeSnippet: `public void runBare() throws Throwable {
    // 模板方法：定义测试执行流程
    setUp();        // 钩子：测试前准备
    try {
        runTest();  // 执行测试
    } finally {
        tearDown(); // 钩子：测试后清理
    }
}`,
    },
  ],
  relatedPatterns: ['factory-method', 'strategy', 'state', 'iterator'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '模板方法模式的主要目的是什么？',
      options: [
        '创建对象',
        '定义算法骨架，延迟步骤到子类',
        '优化性能',
        '转换接口',
      ],
      correctAnswer: 1,
      explanation: '模板方法模式的主要目的是定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。',
    },
    {
      id: 'q2',
      type: 'boolean',
      question: '模板方法应该被声明为 final 以防止子类重写',
      options: ['正确', '错误'],
      correctAnswer: 0,
      explanation: '正确。模板方法定义了算法的骨架，不应该被子类修改，因此应该使用 final 关键字（或等效机制）防止重写。',
    },
    {
      id: 'q3',
      type: 'single',
      question: '钩子方法（Hook Method）的主要作用是什么？',
      options: [
        '强制子类实现特定功能',
        '提供可选的扩展点，子类可选择性重写',
        '替代抽象方法',
        '提高算法执行效率',
      ],
      correctAnswer: 1,
      explanation: '钩子方法提供可选的扩展点，子类可以选择性重写以在算法的特定点插入自定义行为，但不是强制性的。',
    },
    {
      id: 'q4',
      type: 'single',
      question: '以下哪个设计原则与模板方法模式最相关？',
      options: [
        '单一职责原则',
        '好莱坞原则（别调用我们，我们会调用你）',
        '接口隔离原则',
        '合成复用原则',
      ],
      correctAnswer: 1,
      explanation: '模板方法模式体现了好莱坞原则（Hollywood Principle），即高层组件（父类）决定何时以及如何调用低层组件（子类）。',
    },
  ],
};
