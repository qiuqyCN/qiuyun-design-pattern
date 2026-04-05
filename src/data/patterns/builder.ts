import type { DesignPattern } from '@/types/pattern';

export const builderPattern: DesignPattern = {
  id: 'builder',
  name: '建造者模式',
  nameEn: 'Builder Pattern',
  category: 'creational',
  difficulty: 'medium',
  frequency: 'medium',
  intent: '将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。',
  description: '建造者模式是一种创建型设计模式，它允许你分步骤创建复杂对象。该模式允许你使用相同的创建代码生成不同类型和形式的对象。',
  applicability: [
    '当需要创建复杂对象时（对象包含多个组成部分）',
    '当需要创建不同形式的对象时（同一构建过程产生不同表示）',
    '当对象的构造过程必须允许不同的表示时',
    '当需要构建不同配置的对象变体时',
  ],
  pros: [
    '可以分步骤创建对象，控制构建过程的细节',
    '可以复用相同的创建代码，构建不同的表示',
    '单一职责原则：将复杂的构造代码从产品的业务逻辑中分离出来',
    '更精细地控制对象构建过程',
    '可以创建不可变对象',
  ],
  cons: [
    '代码可能变得更加复杂，因为需要引入许多新的类（Builder、ConcreteBuilder）',
    '需要创建多个 Builder 类来支持不同的构建变体',
    '整体代码量增加',
  ],
  analogy: {
    title: '现实世界中的建造者',
    description: '建造者模式就像是现实世界中的汽车装配线或房屋建筑',
    scenarios: [
      {
        id: 'car',
        title: '汽车装配',
        description: '汽车装配线使用相同的步骤来组装不同型号的汽车，但每个步骤的具体实现可能不同。例如，豪华车型和标准车型都经过相同的装配流程，但使用的零件和配置不同。',
        icon: 'Car',
      },
      {
        id: 'house',
        title: '房屋建造',
        description: '建造房屋时，有设计师（Director）指挥建筑商（Builder）按照相同的步骤建造，但可以根据需求建造别墅、公寓或平房等不同类型的房屋。',
        icon: 'Building',
      },
    ],
  },
  structure: {
    classDiagram: '',
    mermaidDiagram: `
classDiagram
  class Director {
    -builder: Builder
    +construct(): Product
    +setBuilder(builder: Builder): void
  }

  class Builder {
    +buildPartA(): void
    +buildPartB(): void
    +buildPartC(): void
    +getResult(): Product
  }

  class ConcreteBuilder1 {
    +product: Product
    +buildPartA(): void
    +buildPartB(): void
    +buildPartC(): void
    +getResult(): Product
    +reset(): void
  }

  class ConcreteBuilder2 {
    +product: Product
    +buildPartA(): void
    +buildPartB(): void
    +buildPartC(): void
    +getResult(): Product
    +reset(): void
  }

  class Product {
    -parts: List~String~
    +addPart(part: String): void
    +showParts(): void
  }

  class Client {
    +main()
  }

  Director o-- Builder : uses
  ConcreteBuilder1 --|> Builder
  ConcreteBuilder2 --|> Builder
  ConcreteBuilder1 ..> Product : creates
  ConcreteBuilder2 ..> Product : creates
  Client ..> Director : uses
  Client ..> ConcreteBuilder1 : creates
  Client ..> ConcreteBuilder2 : creates

  style Director fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
  style Builder fill:#fff3e0,stroke:#ff9800,stroke-width:2px
  style Product fill:#e3f2fd,stroke:#2196f3,stroke-width:2px
  style ConcreteBuilder1 fill:#fce4ec,stroke:#e91e63,stroke-width:1px
  style ConcreteBuilder2 fill:#f3e5f5,stroke:#9c27b0,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: 'Product（产品）',
        description: '定义要创建的复杂对象，包含多个组成部分',
        duration: 2000,
        elements: [
          { id: 'product', type: 'class', name: 'Product', x: 100, y: 200, properties: ['-parts: List'], methods: ['+addPart()', '+showParts()'] },
        ],
      },
      {
        id: 'step2',
        title: 'Builder（抽象建造者）',
        description: '定义创建 Product 各个部件的抽象接口',
        duration: 2000,
        elements: [
          { id: 'product', type: 'class', name: 'Product', x: 100, y: 200, properties: ['-parts: List'], methods: ['+addPart()', '+showParts()'] },
          { id: 'builder', type: 'class', name: 'Builder', x: 300, y: 150, properties: [], methods: ['+buildPartA()', '+buildPartB()', '+buildPartC()', '+getResult()'] },
        ],
      },
      {
        id: 'step3',
        title: 'ConcreteBuilder（具体建造者）',
        description: '实现 Builder 接口，构造和装配产品的各个部件',
        duration: 2000,
        elements: [
          { id: 'product', type: 'class', name: 'Product', x: 100, y: 200, properties: ['-parts: List'], methods: ['+addPart()', '+showParts()'] },
          { id: 'builder', type: 'class', name: 'Builder', x: 300, y: 150, properties: [], methods: ['+buildPartA()', '+buildPartB()', '+buildPartC()', '+getResult()'] },
          { id: 'concreteBuilder', type: 'class', name: 'ConcreteBuilder', x: 500, y: 150, properties: [], methods: ['+buildPartA()', '+buildPartB()', '+buildPartC()', '+getResult()'] },
        ],
        connections: [
          { from: 'concreteBuilder', to: 'builder', type: 'inheritance', label: 'extends' },
        ],
      },
      {
        id: 'step4',
        title: 'Director（指挥者）',
        description: '构造一个使用 Builder 接口的对象，负责控制构建过程',
        duration: 3000,
        elements: [
          { id: 'product', type: 'class', name: 'Product', x: 100, y: 200, properties: ['-parts: List'], methods: ['+addPart()', '+showParts()'] },
          { id: 'builder', type: 'class', name: 'Builder', x: 300, y: 150, properties: [], methods: ['+buildPartA()', '+buildPartB()', '+buildPartC()', '+getResult()'] },
          { id: 'concreteBuilder', type: 'class', name: 'ConcreteBuilder', x: 500, y: 150, properties: [], methods: ['+buildPartA()', '+buildPartB()', '+buildPartC()', '+getResult()'] },
          { id: 'director', type: 'class', name: 'Director', x: 300, y: 320, properties: ['-builder: Builder'], methods: ['+construct()', '+setBuilder()'] },
        ],
        connections: [
          { from: 'director', to: 'builder', type: 'association', label: 'uses' },
        ],
      },
      {
        id: 'step5',
        title: '完整结构',
        description: '客户端通过 Director 和 Builder 创建 Product',
        duration: 3000,
        elements: [
          { id: 'product', type: 'class', name: 'Product', x: 100, y: 200, properties: ['-parts: List'], methods: ['+addPart()', '+showParts()'] },
          { id: 'builder', type: 'class', name: 'Builder', x: 300, y: 150, properties: [], methods: ['+buildPartA()', '+buildPartB()', '+buildPartC()', '+getResult()'] },
          { id: 'concreteBuilder', type: 'class', name: 'ConcreteBuilder', x: 500, y: 150, properties: [], methods: ['+buildPartA()', '+buildPartB()', '+buildPartC()', '+getResult()'] },
          { id: 'director', type: 'class', name: 'Director', x: 300, y: 320, properties: ['-builder: Builder'], methods: ['+construct()', '+setBuilder()'] },
          { id: 'client', type: 'class', name: 'Client', x: 500, y: 320, properties: [], methods: ['+main()'] },
        ],
        connections: [
          { from: 'director', to: 'builder', type: 'association', label: 'uses' },
          { from: 'client', to: 'director', type: 'dependency', label: 'creates' },
          { from: 'concreteBuilder', to: 'product', type: 'dependency', label: 'creates' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * 建造者模式 - TypeScript 实现
 * 展示完整的产品、抽象建造者、具体建造者和指挥者结构
 */

// ============================================
// Product（产品）- 要创建的复杂对象
// ============================================
class House {
  private parts: string[] = [];

  addPart(part: string): void {
    this.parts.push(part);
  }

  listParts(): void {
    console.log("房屋组成部分:", this.parts.join(', '));
  }

  getParts(): string[] {
    return [...this.parts];
  }

  getDescription(): string {
    return \`房屋类型: \${this.parts.length} 个部分组成\`;
  }
}

// ============================================
// Builder（抽象建造者）- 定义创建产品的接口
// ============================================
interface HouseBuilder {
  reset(): void;                    // 重置，生成新产品
  buildBasement(): void;             // 地基
  buildStructure(): void;            // 结构
  buildRoof(): void;                 // 屋顶
  buildInterior(): void;             // 室内装修
  getResult(): House;                // 获取建造的产品
}

// ============================================
// ConcreteBuilder（具体建造者）- 实现建造者接口
// ============================================

/**
 * 别墅建造者
 * 创建一个豪华别墅，包含所有高级配置
 */
class VillaBuilder implements HouseBuilder {
  private house!: House;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.house = new House();
  }

  buildBasement(): void {
    this.house.addPart('豪华地下室');
  }

  buildStructure(): void {
    this.house.addPart('钢筋混凝土框架结构');
  }

  buildRoof(): void {
    this.house.addPart('琉璃瓦屋顶');
  }

  buildInterior(): void {
    this.house.addPart('豪华精装修');
    this.house.addPart('智能家居系统');
    this.house.addPart('中央空调');
  }

  getResult(): House {
    const result = this.house;
    this.reset(); // 重置以便重用
    return result;
  }
}

/**
 * 普通住宅建造者
 * 创建一个标准配置的住宅
 */
class NormalHouseBuilder implements HouseBuilder {
  private house!: House;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.house = new House();
  }

  buildBasement(): void {
    this.house.addPart('标准地基');
  }

  buildStructure(): void {
    this.house.addPart('砖混结构');
  }

  buildRoof(): void {
    this.house.addPart('普通瓦片屋顶');
  }

  buildInterior(): void {
    this.house.addPart('基础装修');
  }

  getResult(): House {
    const result = this.house;
    this.reset();
    return result;
  }
}

/**
 * 简易房屋建造者
 * 创建一个经济型房屋
 */
class SimpleHouseBuilder implements HouseBuilder {
  private house!: House;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.house = new House();
  }

  buildBasement(): void {
    // 简易房屋不需要地基
  }

  buildStructure(): void {
    this.house.addPart('木质框架结构');
  }

  buildRoof(): void {
    this.house.addPart('铁皮屋顶');
  }

  buildInterior(): void {
    this.house.addPart('简单刷白');
  }

  getResult(): House {
    const result = this.house;
    this.reset();
    return result;
  }
}

// ============================================
// Director（指挥者）- 控制建造过程
// ============================================
class ConstructionDirector {
  private builder!: HouseBuilder;

  setBuilder(builder: HouseBuilder): void {
    this.builder = builder;
  }

  /**
   * 标准建造流程
   * 所有房屋都遵循相同的建造顺序
   */
  constructStandardHouse(): House {
    if (!this.builder) {
      throw new Error('请先设置建造者');
    }
    this.builder.reset();
    this.builder.buildBasement();
    this.builder.buildStructure();
    this.builder.buildRoof();
    this.builder.buildInterior();
    return this.builder.getResult();
  }

  /**
   * 快速建造流程（无地下室）
   */
  constructQuickHouse(): House {
    if (!this.builder) {
      throw new Error('请先设置建造者');
    }
    this.builder.reset();
    this.builder.buildStructure();
    this.builder.buildRoof();
    this.builder.buildInterior();
    return this.builder.getResult();
  }
}

// ============================================
// 客户端代码
// ============================================
function clientCode(): void {
  const director = new ConstructionDirector();

  console.log('=== 建造别墅 ===');
  const villaBuilder = new VillaBuilder();
  director.setBuilder(villaBuilder);
  const villa = director.constructStandardHouse();
  villa.listParts();
  console.log(villa.getDescription());

  console.log('\\n=== 建造普通住宅 ===');
  const normalBuilder = new NormalHouseBuilder();
  director.setBuilder(normalBuilder);
  const normalHouse = director.constructStandardHouse();
  normalHouse.listParts();
  console.log(normalHouse.getDescription());

  console.log('\\n=== 建造简易房屋 ===');
  const simpleBuilder = new SimpleHouseBuilder();
  director.setBuilder(simpleBuilder);
  const simpleHouse = director.constructQuickHouse();
  simpleHouse.listParts();
  console.log(simpleHouse.getDescription());
}

clientCode();

/**
 * ============================================
 * TypeScript 建造者模式 - 流式接口（Fluent Interface）
 * ============================================
 */

/**
 * 产品：用户配置对象
 */
interface UserConfig {
  name: string;
  age: number;
  email?: string;
  phone?: string;
  address?: string;
  isActive: boolean;
}

/**
 * 使用流式接口的 User 配置建造者
 */
class UserConfigBuilder {
  private config: Partial<UserConfig> = {};
  private requiredFields: Set<string> = new Set();

  withName(name: string): this {
    this.config.name = name;
    this.requiredFields.add('name');
    return this;
  }

  withAge(age: number): this {
    this.config.age = age;
    this.requiredFields.add('age');
    return this;
  }

  withEmail(email: string): this {
    this.config.email = email;
    return this;
  }

  withPhone(phone: string): this {
    this.config.phone = phone;
    return this;
  }

  withAddress(address: string): this {
    this.config.address = address;
    return this;
  }

  activate(): this {
    this.config.isActive = true;
    return this;
  }

  deactivate(): this {
    this.config.isActive = false;
    return this;
  }

  /**
   * 验证并构建最终产品
   */
  build(): UserConfig {
    if (!this.config.name) {
      throw new Error('用户名是必需的');
    }
    if (!this.config.age) {
      throw new Error('年龄是必需的');
    }

    return {
      name: this.config.name!,
      age: this.config.age!,
      email: this.config.email,
      phone: this.config.phone,
      address: this.config.address,
      isActive: this.config.isActive ?? false,
    };
  }
}

// 流式接口使用示例
function fluentBuilderExample(): void {
  console.log('\\n=== 流式接口建造者示例 ===');

  const user1 = new UserConfigBuilder()
    .withName('张三')
    .withAge(25)
    .withEmail('zhangsan@example.com')
    .activate()
    .build();

  console.log('用户1:', user1);

  const user2 = new UserConfigBuilder()
    .withName('李四')
    .withAge(30)
    .withPhone('13800138000')
    .build();

  console.log('用户2:', user2);
}

fluentBuilderExample();`,

    java: `/**
 * 建造者模式 - Java 实现
 * 展示完整的产品、抽象建造者、具体建造者和指挥者结构
 */

// ============================================
// Product（产品）- 要创建的复杂对象
// ============================================
class House {
    private List<String> parts = new ArrayList<>();

    public void addPart(String part) {
        parts.add(part);
    }

    public void listParts() {
        System.out.println("房屋组成部分: " + String.join(", ", parts));
    }

    public List<String> getParts() {
        return new ArrayList<>(parts);
    }

    public String getDescription() {
        return "房屋类型: " + parts.size() + " 个部分组成";
    }
}

// ============================================
// Builder（抽象建造者）- 定义创建产品的接口
// ============================================
interface HouseBuilder {
    void reset();                     // 重置，生成新产品
    void buildBasement();             // 地基
    void buildStructure();            // 结构
    void buildRoof();                // 屋顶
    void buildInterior();             // 室内装修
    House getResult();                // 获取建造的产品
}

// ============================================
// ConcreteBuilder（具体建造者）- 实现建造者接口
// ============================================

/**
 * 别墅建造者
 */
class VillaBuilder implements HouseBuilder {
    private House house;

    public VillaBuilder() {
        this.house = new House();
    }

    @Override
    public void reset() {
        this.house = new House();
    }

    @Override
    public void buildBasement() {
        house.addPart("豪华地下室");
    }

    @Override
    public void buildStructure() {
        house.addPart("钢筋混凝土框架结构");
    }

    @Override
    public void buildRoof() {
        house.addPart("琉璃瓦屋顶");
    }

    @Override
    public void buildInterior() {
        house.addPart("豪华精装修");
        house.addPart("智能家居系统");
        house.addPart("中央空调");
    }

    @Override
    public House getResult() {
        House result = this.house;
        this.reset(); // 重置以便重用
        return result;
    }
}

/**
 * 普通住宅建造者
 */
class NormalHouseBuilder implements HouseBuilder {
    private House house;

    public NormalHouseBuilder() {
        this.house = new House();
    }

    @Override
    public void reset() {
        this.house = new House();
    }

    @Override
    public void buildBasement() {
        house.addPart("标准地基");
    }

    @Override
    public void buildStructure() {
        house.addPart("砖混结构");
    }

    @Override
    public void buildRoof() {
        house.addPart("普通瓦片屋顶");
    }

    @Override
    public void buildInterior() {
        house.addPart("基础装修");
    }

    @Override
    public House getResult() {
        House result = this.house;
        this.reset();
        return result;
    }
}

// ============================================
// Director（指挥者）- 控制建造过程
// ============================================
class ConstructionDirector {
    private HouseBuilder builder;

    public void setBuilder(HouseBuilder builder) {
        this.builder = builder;
    }

    /**
     * 标准建造流程
     */
    public House constructStandardHouse() {
        if (this.builder == null) {
            throw new IllegalStateException("请先设置建造者");
        }
        builder.reset();
        builder.buildBasement();
        builder.buildStructure();
        builder.buildRoof();
        builder.buildInterior();
        return builder.getResult();
    }

    /**
     * 快速建造流程（无地下室）
     */
    public House constructQuickHouse() {
        if (this.builder == null) {
            throw new IllegalStateException("请先设置建造者");
        }
        builder.reset();
        builder.buildStructure();
        builder.buildRoof();
        builder.buildInterior();
        return builder.getResult();
    }
}

// ============================================
// 客户端代码
// ============================================
class BuilderDemo {
    public static void main(String[] args) {
        ConstructionDirector director = new ConstructionDirector();

        System.out.println("=== 建造别墅 ===");
        HouseBuilder villaBuilder = new VillaBuilder();
        director.setBuilder(villaBuilder);
        House villa = director.constructStandardHouse();
        villa.listParts();
        System.out.println(villa.getDescription());

        System.out.println("\\n=== 建造普通住宅 ===");
        HouseBuilder normalBuilder = new NormalHouseBuilder();
        director.setBuilder(normalBuilder);
        House normalHouse = director.constructStandardHouse();
        normalHouse.listParts();
        System.out.println(normalHouse.getDescription());
    }
}

/**
 * ============================================
 * Java 建造者模式 - Lombok @Builder 注解
 * ============================================
 */

/**
 * 使用 Lombok 简化建造者模式
 * Lombok 会在编译时自动生成 Builder 类
 */
@lombok.Builder
@lombok.ToString
@lombok.Getter
class User {
    private String name;
    private int age;
    private String email;
    private String phone;

    // Lombok 生成的 Builder 使用示例
    static void lombokBuilderExample() {
        System.out.println("\\n=== Lombok @Builder 示例 ===");

        // 使用链式调用构建对象
        User user1 = User.builder()
                .name("张三")
                .age(25)
                .email("zhangsan@example.com")
                .build();

        System.out.println("用户1: " + user1);

        // 只设置必需字段
        User user2 = User.builder()
                .name("李四")
                .age(30)
                .build();

        System.out.println("用户2: " + user2);
    }

    public static void main(String[] args) {
        lombokBuilderExample();
    }
}

/**
 * ============================================
 * Java 建造者模式 - 传统内部 Builder 类
 * ============================================
 */

/**
 * 产品：复杂配置对象
 */
class DatabaseConfig {
    private String host;
    private int port;
    private String database;
    private String username;
    private String password;
    private int maxConnections;
    private int timeout;
    private boolean enableCache;
    private String charset;

    // 私有构造函数，强制使用 Builder
    private DatabaseConfig(Builder builder) {
        this.host = builder.host;
        this.port = builder.port;
        this.database = builder.database;
        this.username = builder.username;
        this.password = builder.password;
        this.maxConnections = builder.maxConnections;
        this.timeout = builder.timeout;
        this.enableCache = builder.enableCache;
        this.charset = builder.charset;
    }

    @Override
    public String toString() {
        return String.format(
            "DatabaseConfig{host='%s', port=%d, database='%s', maxConnections=%d, timeout=%d}",
            host, port, database, maxConnections, timeout
        );
    }

    /**
     * 内部 Builder 类
     */
    public static class Builder {
        private String host = "localhost";
        private int port = 3306;
        private String database = "testdb";
        private String username = "root";
        private String password = "";
        private int maxConnections = 10;
        private int timeout = 30;
        private boolean enableCache = false;
        private String charset = "UTF-8";

        public Builder host(String host) {
            this.host = host;
            return this;
        }

        public Builder port(int port) {
            this.port = port;
            return this;
        }

        public Builder database(String database) {
            this.database = database;
            return this;
        }

        public Builder username(String username) {
            this.username = username;
            return this;
        }

        public Builder password(String password) {
            this.password = password;
            return this;
        }

        public Builder maxConnections(int maxConnections) {
            this.maxConnections = maxConnections;
            return this;
        }

        public Builder timeout(int timeout) {
            this.timeout = timeout;
            return this;
        }

        public Builder enableCache(boolean enableCache) {
            this.enableCache = enableCache;
            return this;
        }

        public Builder charset(String charset) {
            this.charset = charset;
            return this;
        }

        public DatabaseConfig build() {
            return new DatabaseConfig(this);
        }
    }
}

// 内部 Builder 使用示例
class DatabaseConfigExample {
    public static void main(String[] args) {
        System.out.println("\\n=== 内部 Builder 示例 ===");

        // 使用链式调用构建复杂对象
        DatabaseConfig config1 = new DatabaseConfig.Builder()
                .host("db.example.com")
                .port(5432)
                .database("production")
                .username("admin")
                .password("secret")
                .maxConnections(100)
                .timeout(60)
                .enableCache(true)
                .charset("UTF-8")
                .build();

        System.out.println("配置1: " + config1);

        // 使用默认值
        DatabaseConfig config2 = new DatabaseConfig.Builder()
                .database("development")
                .build();

        System.out.println("配置2: " + config2);
    }
}`,

    go: `package builder

import (
    "fmt"
    "strings"
)

/**
 * 建造者模式 - Go 实现
 * 展示完整的产品、建造者和指挥者结构
 */

// ============================================
// Product（产品）- 要创建的复杂对象
// ============================================

/**
 * House 产品结构
 */
type House struct {
    parts []string
}

func (h *House) AddPart(part string) {
    h.parts = append(h.parts, part)
}

func (h *House) ListParts() {
    fmt.Println("房屋组成部分:", strings.Join(h.parts, ", "))
}

func (h *House) GetDescription() string {
    return fmt.Sprintf("房屋类型: %d 个部分组成", len(h.parts))
}

// ============================================
// Builder（建造者接口）
// ============================================

/**
 * HouseBuilder 建造者接口
 */
type HouseBuilder interface {
    Reset()
    BuildBasement()
    BuildStructure()
    BuildRoof()
    BuildInterior()
    GetResult() *House
}

// ============================================
// ConcreteBuilder（具体建造者）
// ============================================

/**
 * VillaBuilder 别墅建造者
 */
type VillaBuilder struct {
    house *House
}

func NewVillaBuilder() *VillaBuilder {
    return &VillaBuilder{house: &House{}}
}

func (b *VillaBuilder) Reset() {
    b.house = &House{}
}

func (b *VillaBuilder) BuildBasement() {
    b.house.AddPart("豪华地下室")
}

func (b *VillaBuilder) BuildStructure() {
    b.house.AddPart("钢筋混凝土框架结构")
}

func (b *VillaBuilder) BuildRoof() {
    b.house.AddPart("琉璃瓦屋顶")
}

func (b *VillaBuilder) BuildInterior() {
    b.house.AddPart("豪华精装修")
    b.house.AddPart("智能家居系统")
    b.house.AddPart("中央空调")
}

func (b *VillaBuilder) GetResult() *House {
    result := b.house
    b.Reset()
    return result
}

/**
 * NormalHouseBuilder 普通住宅建造者
 */
type NormalHouseBuilder struct {
    house *House
}

func NewNormalHouseBuilder() *NormalHouseBuilder {
    return &NormalHouseBuilder{house: &House{}}
}

func (b *NormalHouseBuilder) Reset() {
    b.house = &House{}
}

func (b *NormalHouseBuilder) BuildBasement() {
    b.house.AddPart("标准地基")
}

func (b *NormalHouseBuilder) BuildStructure() {
    b.house.AddPart("砖混结构")
}

func (b *NormalHouseBuilder) BuildRoof() {
    b.house.AddPart("普通瓦片屋顶")
}

func (b *NormalHouseBuilder) BuildInterior() {
    b.house.AddPart("基础装修")
}

func (b *NormalHouseBuilder) GetResult() *House {
    result := b.house
    b.Reset()
    return result
}

// ============================================
// Director（指挥者）
// ============================================

/**
 * ConstructionDirector 建筑指挥者
 */
type ConstructionDirector struct {
    builder HouseBuilder
}

func NewConstructionDirector(builder HouseBuilder) *ConstructionDirector {
    return &ConstructionDirector{builder: builder}
}

func (d *ConstructionDirector) SetBuilder(builder HouseBuilder) {
    d.builder = builder
}

/**
 * 标准建造流程
 */
func (d *ConstructionDirector) ConstructStandardHouse() *House {
    if d.builder == nil {
        panic("请先设置建造者")
    }
    d.builder.Reset()
    d.builder.BuildBasement()
    d.builder.BuildStructure()
    d.builder.BuildRoof()
    d.builder.BuildInterior()
    return d.builder.GetResult()
}

/**
 * 快速建造流程
 */
func (d *ConstructionDirector) ConstructQuickHouse() *House {
    if d.builder == nil {
        panic("请先设置建造者")
    }
    d.builder.Reset()
    d.builder.BuildStructure()
    d.builder.BuildRoof()
    d.builder.BuildInterior()
    return d.builder.GetResult()
}

// ============================================
// 客户端代码
// ============================================

func ClientCode() {
    director := NewConstructionDirector(nil)

    fmt.Println("=== 建造别墅 ===")
    villaBuilder := NewVillaBuilder()
    director.SetBuilder(villaBuilder)
    villa := director.ConstructStandardHouse()
    villa.ListParts()
    fmt.Println(villa.GetDescription())

    fmt.Println("\\n=== 建造普通住宅 ===")
    normalBuilder := NewNormalHouseBuilder()
    director.SetBuilder(normalBuilder)
    normalHouse := director.ConstructStandardHouse()
    normalHouse.ListParts()
    fmt.Println(normalHouse.GetDescription())
}

/**
 * ============================================
 * Go 建造者模式 - 函数选项模式（Functional Options）
 * ============================================
 */

/**
 * 配置选项类型
 */
type ConfigOption func(*Config)

/**
 * Config 产品结构
 */
type Config struct {
    Host           string
    Port           int
    Database       string
    Username       string
    MaxConnections int
    Timeout        int
    EnableCache    bool
}

/**
 * WithHost 选项函数
 */
func WithHost(host string) ConfigOption {
    return func(c *Config) {
        c.Host = host
    }
}

/**
 * WithPort 选项函数
 */
func WithPort(port int) ConfigOption {
    return func(c *Config) {
        c.Port = port
    }
}

/**
 * WithDatabase 选项函数
 */
func WithDatabase(database string) ConfigOption {
    return func(c *Config) {
        c.Database = database
    }
}

/**
 * WithMaxConnections 选项函数
 */
func WithMaxConnections(max int) ConfigOption {
    return func(c *Config) {
        c.MaxConnections = max
    }
}

/**
 * WithEnableCache 选项函数
 */
func WithEnableCache(enable bool) ConfigOption {
    return func(c *Config) {
        c.EnableCache = enable
    }
}

/**
 * NewConfig 创建配置（使用选项模式）
 */
func NewConfig(options ...ConfigOption) *Config {
    // 默认配置
    config := &Config{
        Host:           "localhost",
        Port:           3306,
        Database:       "testdb",
        MaxConnections: 10,
        EnableCache:    false,
    }

    // 应用所有选项
    for _, option := range options {
        option(config)
    }

    return config
}

func (c *Config) String() string {
    return fmt.Sprintf(
        "Config{Host: %s, Port: %d, Database: %s, MaxConnections: %d, EnableCache: %v}",
        c.Host, c.Port, c.Database, c.MaxConnections, c.EnableCache,
    )
}

/**
 * 函数选项模式示例
 */
func FunctionalOptionsExample() {
    fmt.Println("\\n=== 函数选项模式示例 ===")

    // 使用选项函数构建配置
    config1 := NewConfig(
        WithHost("db.example.com"),
        WithPort(5432),
        WithDatabase("production"),
        WithMaxConnections(100),
        WithEnableCache(true),
    )
    fmt.Println("配置1:", config1)

    // 使用部分选项
    config2 := NewConfig(
        WithDatabase("development"),
    )
    fmt.Println("配置2:", config2)

    // 使用默认配置
    config3 := NewConfig()
    fmt.Println("配置3:", config3)
}`,

    python: `"""
建造者模式 - Python 实现
展示完整的产品、抽象建造者、具体建造者和指挥者结构
"""

from abc import ABC, abstractmethod
from typing import List, Optional


# ============================================
# Product（产品）- 要创建的复杂对象
# ============================================
class House:
    """房屋产品类"""

    def __init__(self):
        self.parts: List[str] = []

    def add_part(self, part: str) -> None:
        self.parts.append(part)

    def list_parts(self) -> None:
        print(f"房屋组成部分: {', '.join(self.parts)}")

    def get_description(self) -> str:
        return f"房屋类型: {len(self.parts)} 个部分组成"


# ============================================
# Builder（抽象建造者）- 定义创建产品的接口
# ============================================
class HouseBuilder(ABC):
    """抽象房屋建造者"""

    @abstractmethod
    def reset(self) -> None:
        """重置，生成新产品"""
        pass

    @abstractmethod
    def build_basement(self) -> None:
        """地基"""
        pass

    @abstractmethod
    def build_structure(self) -> None:
        """结构"""
        pass

    @abstractmethod
    def build_roof(self) -> None:
        """屋顶"""
        pass

    @abstractmethod
    def build_interior(self) -> None:
        """室内装修"""
        pass

    @abstractmethod
    def get_result(self) -> House:
        """获取建造的产品"""
        pass


# ============================================
# ConcreteBuilder（具体建造者）- 实现建造者接口
# ============================================
class VillaBuilder(HouseBuilder):
    """别墅建造者"""

    def __init__(self):
        self._house = House()

    def reset(self) -> None:
        self._house = House()

    def build_basement(self) -> None:
        self._house.add_part("豪华地下室")

    def build_structure(self) -> None:
        self._house.add_part("钢筋混凝土框架结构")

    def build_roof(self) -> None:
        self._house.add_part("琉璃瓦屋顶")

    def build_interior(self) -> None:
        self._house.add_part("豪华精装修")
        self._house.add_part("智能家居系统")
        self._house.add_part("中央空调")

    def get_result(self) -> House:
        result = self._house
        self.reset()
        return result


class NormalHouseBuilder(HouseBuilder):
    """普通住宅建造者"""

    def __init__(self):
        self._house = House()

    def reset(self) -> None:
        self._house = House()

    def build_basement(self) -> None:
        self._house.add_part("标准地基")

    def build_structure(self) -> None:
        self._house.add_part("砖混结构")

    def build_roof(self) -> None:
        self._house.add_part("普通瓦片屋顶")

    def build_interior(self) -> None:
        self._house.add_part("基础装修")

    def get_result(self) -> House:
        result = self._house
        self.reset()
        return result


class SimpleHouseBuilder(HouseBuilder):
    """简易房屋建造者"""

    def __init__(self):
        self._house = House()

    def reset(self) -> None:
        self._house = House()

    def build_basement(self) -> None:
        # 简易房屋不需要地基
        pass

    def build_structure(self) -> None:
        self._house.add_part("木质框架结构")

    def build_roof(self) -> None:
        self._house.add_part("铁皮屋顶")

    def build_interior(self) -> None:
        self._house.add_part("简单刷白")

    def get_result(self) -> House:
        result = self._house
        self.reset()
        return result


# ============================================
# Director（指挥者）- 控制建造过程
# ============================================
class ConstructionDirector:
    """建筑指挥者"""

    def __init__(self):
        self._builder: Optional[HouseBuilder] = None

    def set_builder(self, builder: HouseBuilder) -> None:
        self._builder = builder

    def construct_standard_house(self) -> House:
        """标准建造流程"""
        if not self._builder:
            raise ValueError("请先设置建造者")

        self._builder.reset()
        self._builder.build_basement()
        self._builder.build_structure()
        self._builder.build_roof()
        self._builder.build_interior()
        return self._builder.get_result()

    def construct_quick_house(self) -> House:
        """快速建造流程（无地下室）"""
        if not self._builder:
            raise ValueError("请先设置建造者")

        self._builder.reset()
        self._builder.build_structure()
        self._builder.build_roof()
        self._builder.build_interior()
        return self._builder.get_result()


# ============================================
# 客户端代码
# ============================================
def client_code() -> None:
    director = ConstructionDirector()

    print("=== 建造别墅 ===")
    villa_builder = VillaBuilder()
    director.set_builder(villa_builder)
    villa = director.construct_standard_house()
    villa.list_parts()
    print(villa.get_description())

    print("\n=== 建造普通住宅 ===")
    normal_builder = NormalHouseBuilder()
    director.set_builder(normal_builder)
    normal_house = director.construct_standard_house()
    normal_house.list_parts()
    print(normal_house.get_description())

    print("\n=== 建造简易房屋 ===")
    simple_builder = SimpleHouseBuilder()
    director.set_builder(simple_builder)
    simple_house = director.construct_quick_house()
    simple_house.list_parts()
    print(simple_house.get_description())


"""
============================================
Python 建造者模式 - 链式调用实现
============================================
"""


class User:
    """用户类 - 使用链式调用建造"""

    def __init__(self):
        self._name: Optional[str] = None
        self._age: Optional[int] = None
        self._email: Optional[str] = None
        self._phone: Optional[str] = None
        self._is_active: bool = False

    def with_name(self, name: str) -> 'User':
        self._name = name
        return self

    def with_age(self, age: int) -> 'User':
        self._age = age
        return self

    def with_email(self, email: str) -> 'User':
        self._email = email
        return self

    def with_phone(self, phone: str) -> 'User':
        self._phone = phone
        return self

    def activate(self) -> 'User':
        self._is_active = True
        return self

    def build(self) -> dict:
        """构建最终用户对象"""
        if not self._name:
            raise ValueError("用户名是必需的")
        if not self._age:
            raise ValueError("年龄是必需的")

        return {
            "name": self._name,
            "age": self._age,
            "email": self._email,
            "phone": self._phone,
            "is_active": self._is_active,
        }

    def __repr__(self) -> str:
        return f"User(name={self._name}, age={self._age}, is_active={self._is_active})"


class UserBuilder:
    """独立用户建造者类"""

    def __init__(self):
        self._user = User()

    def name(self, name: str) -> 'UserBuilder':
        self._user.with_name(name)
        return self

    def age(self, age: int) -> 'UserBuilder':
        self._user.with_age(age)
        return self

    def email(self, email: str) -> 'UserBuilder':
        self._user.with_email(email)
        return self

    def phone(self, phone: str) -> 'UserBuilder':
        self._user.with_phone(phone)
        return self

    def active(self) -> 'UserBuilder':
        self._user.activate()
        return self

    def build(self) -> dict:
        return self._user.build()


def chain_builder_example() -> None:
    """链式调用示例"""
    print("\n=== Python 链式调用建造者示例 ===")

    # 方式1：直接在对象上链式调用
    user1 = User().with_name("张三").with_age(25).with_email("zhangsan@example.com").activate()
    print(f"用户1: {user1}")

    # 方式2：使用独立的 Builder 类
    user2 = (
        UserBuilder()
        .name("李四")
        .age(30)
        .phone("13800138000")
        .active()
        .build()
    )
    print(f"用户2: {user2}")


if __name__ == "__main__":
    client_code()
    chain_builder_example()`,

    cpp: `#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <optional>
#include <functional>

using namespace std;

/**
 * 建造者模式 - C++ 实现
 * 展示完整的产品、抽象建造者、具体建造者和指挥者结构
 */

// ============================================
// Product（产品）- 要创建的复杂对象
// ============================================
class House {
private:
    vector<string> parts;

public:
    void addPart(const string& part) {
        parts.push_back(part);
    }

    void listParts() const {
        cout << "房屋组成部分: ";
        for (size_t i = 0; i < parts.size(); ++i) {
            cout << parts[i];
            if (i < parts.size() - 1) cout << ", ";
        }
        cout << endl;
    }

    vector<string> getParts() const {
        return parts;
    }

    string getDescription() const {
        return "房屋类型: " + to_string(parts.size()) + " 个部分组成";
    }
};

// ============================================
// Builder（抽象建造者）- 定义创建产品的接口
// ============================================
class HouseBuilder {
public:
    virtual ~HouseBuilder() = default;

    virtual void reset() = 0;                     // 重置，生成新产品
    virtual void buildBasement() = 0;             // 地基
    virtual void buildStructure() = 0;            // 结构
    virtual void buildRoof() = 0;                  // 屋顶
    virtual void buildInterior() = 0;             // 室内装修
    virtual shared_ptr<House> getResult() = 0;   // 获取建造的产品
};

// ============================================
// ConcreteBuilder（具体建造者）- 实现建造者接口
// ============================================

/**
 * VillaBuilder 别墅建造者
 */
class VillaBuilder : public HouseBuilder {
private:
    shared_ptr<House> house;

public:
    VillaBuilder() {
        house = make_shared<House>();
    }

    void reset() override {
        house = make_shared<House>();
    }

    void buildBasement() override {
        house->addPart("豪华地下室");
    }

    void buildStructure() override {
        house->addPart("钢筋混凝土框架结构");
    }

    void buildRoof() override {
        house->addPart("琉璃瓦屋顶");
    }

    void buildInterior() override {
        house->addPart("豪华精装修");
        house->addPart("智能家居系统");
        house->addPart("中央空调");
    }

    shared_ptr<House> getResult() override {
        shared_ptr<House> result = house;
        reset();
        return result;
    }
};

/**
 * NormalHouseBuilder 普通住宅建造者
 */
class NormalHouseBuilder : public HouseBuilder {
private:
    shared_ptr<House> house;

public:
    NormalHouseBuilder() {
        house = make_shared<House>();
    }

    void reset() override {
        house = make_shared<House>();
    }

    void buildBasement() override {
        house->addPart("标准地基");
    }

    void buildStructure() override {
        house->addPart("砖混结构");
    }

    void buildRoof() override {
        house->addPart("普通瓦片屋顶");
    }

    void buildInterior() override {
        house->addPart("基础装修");
    }

    shared_ptr<House> getResult() override {
        shared_ptr<House> result = house;
        reset();
        return result;
    }
};

// ============================================
// Director（指挥者）- 控制建造过程
// ============================================
class ConstructionDirector {
private:
    shared_ptr<HouseBuilder> builder;

public:
    void setBuilder(shared_ptr<HouseBuilder> newBuilder) {
        builder = newBuilder;
    }

    /**
     * 标准建造流程
     */
    shared_ptr<House> constructStandardHouse() {
        if (!builder) {
            throw runtime_error("请先设置建造者");
        }
        builder->reset();
        builder->buildBasement();
        builder->buildStructure();
        builder->buildRoof();
        builder->buildInterior();
        return builder->getResult();
    }

    /**
     * 快速建造流程（无地下室）
     */
    shared_ptr<House> constructQuickHouse() {
        if (!builder) {
            throw runtime_error("请先设置建造者");
        }
        builder->reset();
        builder->buildStructure();
        builder->buildRoof();
        builder->buildInterior();
        return builder->getResult();
    }
};

// ============================================
// 客户端代码
// ============================================
void clientCode() {
    ConstructionDirector director;

    cout << "=== 建造别墅 ===" << endl;
    auto villaBuilder = make_shared<VillaBuilder>();
    director.setBuilder(villaBuilder);
    auto villa = director.constructStandardHouse();
    villa->listParts();
    cout << villa->getDescription() << endl;

    cout << "\n=== 建造普通住宅 ===" << endl;
    auto normalBuilder = make_shared<NormalHouseBuilder>();
    director.setBuilder(normalBuilder);
    auto normalHouse = director.constructStandardHouse();
    normalHouse->listParts();
    cout << normalHouse->getDescription() << endl;
}

/**
 * ============================================
 * C++ 建造者模式 - 流式接口（Fluent Interface）
 * ============================================
 */

/**
 * 使用流式接口的用户配置建造者
 */
class UserBuilder {
private:
    string name;
    int age = 0;
    optional<string> email;
    optional<string> phone;
    bool isActive = false;

public:
    // 链式调用方法 - 返回引用以便连续调用
    UserBuilder& withName(const string& n) {
        name = n;
        return *this;
    }

    UserBuilder& withAge(int a) {
        age = a;
        return *this;
    }

    UserBuilder& withEmail(const string& e) {
        email = e;
        return *this;
    }

    UserBuilder& withPhone(const string& p) {
        phone = p;
        return *this;
    }

    UserBuilder& activate() {
        isActive = true;
        return *this;
    }

    UserBuilder& deactivate() {
        isActive = false;
        return *this;
    }

    /**
     * 构建最终用户对象
     */
    struct User {
        string name;
        int age;
        optional<string> email;
        optional<string> phone;
        bool isActive;

        void print() const {
            cout << "User{name=" << name
                 << ", age=" << age
                 << ", email=" << (email ? *email : "null")
                 << ", phone=" << (phone ? *phone : "null")
                 << ", isActive=" << (isActive ? "true" : "false")
                 << "}" << endl;
        }
    };

    User build() const {
        if (name.empty()) {
            throw runtime_error("用户名是必需的");
        }
        if (age <= 0) {
            throw runtime_error("年龄是必需的");
        }
        return User{name, age, email, phone, isActive};
    }
};

/**
 * 函数选项模式
 */
class DatabaseConfig {
public:
    string host = "localhost";
    int port = 3306;
    string database = "testdb";
    int maxConnections = 10;
    bool enableCache = false;

    // 配置选项类型
    using Option = function<void(DatabaseConfig&)>;

    // 静态工厂方法
    static DatabaseConfig create(vector<Option> options) {
        DatabaseConfig config;
        for (const auto& option : options) {
            option(config);
        }
        return config;
    }

    void print() const {
        cout << "DatabaseConfig{host=" << host
             << ", port=" << port
             << ", database=" << database
             << ", maxConnections=" << maxConnections
             << ", enableCache=" << (enableCache ? "true" : "false")
             << "}" << endl;
    }
};

// 命名空间包含选项函数
namespace ConfigOptions {
    inline Option withHost(const string& host) {
        return [&host](DatabaseConfig& cfg) { cfg.host = host; };
    }

    inline Option withPort(int port) {
        return [&port](DatabaseConfig& cfg) { cfg.port = port; };
    }

    inline Option withDatabase(const string& db) {
        return [&db](DatabaseConfig& cfg) { cfg.database = db; };
    }

    inline Option withMaxConnections(int max) {
        return [&max](DatabaseConfig& cfg) { cfg.maxConnections = max; };
    }

    inline Option withEnableCache(bool enable) {
        return [&enable](DatabaseConfig& cfg) { cfg.enableCache = enable; };
    }
}

void fluentBuilderExample() {
    cout << "\n=== C++ 流式接口建造者示例 ===" << endl;

    // 使用链式调用构建用户
    auto user1 = UserBuilder()
        .withName("张三")
        .withAge(25)
        .withEmail("zhangsan@example.com")
        .activate()
        .build();
    user1.print();

    // 使用函数选项构建配置
    cout << "\n=== C++ 函数选项模式示例 ===" << endl;

    auto config1 = DatabaseConfig::create({
        ConfigOptions::withHost("db.example.com"),
        ConfigOptions::withPort(5432),
        ConfigOptions::withDatabase("production"),
        ConfigOptions::withMaxConnections(100),
        ConfigOptions::withEnableCache(true)
    });
    config1.print();

    // 使用部分选项
    auto config2 = DatabaseConfig::create({
        ConfigOptions::withDatabase("development")
    });
    config2.print();
}

int main() {
    clientCode();
    fluentBuilderExample();
    return 0;
}`,
  },
  realWorldExamples: [
    {
      title: 'Java StringBuilder',
      description: 'Java 的 StringBuilder 类使用建造者模式来构建可变字符串，支持链式调用 append 方法。',
      source: 'JDK',
      codeSnippet: `StringBuilder sb = new StringBuilder();
sb.append("Hello").append(" ").append("World");`,
    },
    {
      title: 'Lombok @Builder',
      description: 'Lombok 库通过注解自动生成建造者类，简化了建造者模式的实现。',
      source: 'Lombok',
      codeSnippet: `@Builder
class User {
    private String name;
    private int age;
}
// 使用: User.builder().name("张三").age(25).build()`,
    },
    {
      title: 'Python requests 库',
      description: 'Python 的 requests 库使用建造者模式构建 HTTP 请求，通过链式调用设置各种参数。',
      source: 'requests',
      codeSnippet: `requests.get(url, params={"key": "value"}, headers={"Auth": "token"})`,
    },
  ],
  relatedPatterns: ['factory-method', 'abstract-factory', 'composite', 'singleton'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '建造者模式的主要目的是什么？',
      options: [
        '创建简单对象',
        '分步骤创建复杂对象',
        '销毁对象',
        '复制对象',
      ],
      correctAnswer: 1,
      explanation: '建造者模式的主要目的是分步骤创建复杂对象，将对象的构造过程与其表示分离。',
    },
    {
      id: 'q2',
      type: 'single',
      question: '在建造者模式中，Director 的作用是什么？',
      options: [
        '定义产品接口',
        '控制构建过程',
        '创建具体产品',
        '销毁产品',
      ],
      correctAnswer: 1,
      explanation: 'Director 负责控制构建过程，按照特定的步骤顺序调用 Builder 来构建产品。',
    },
    {
      id: 'q3',
      type: 'single',
      question: '以下哪个不是建造者模式的组成部分？',
      options: [
        'Product（产品）',
        'Builder（建造者）',
        'Director（指挥者）',
        'Factory（工厂）',
      ],
      correctAnswer: 3,
      explanation: 'Factory（工厂）是工厂模式的组成部分，不是建造者模式的核心部分。建造者模式包括 Product、Builder、ConcreteBuilder 和 Director。',
    },
    {
      id: 'q4',
      type: 'boolean',
      question: '建造者模式支持复用相同的构建代码来创建不同的产品表示',
      options: ['正确', '错误'],
      correctAnswer: 0,
      explanation: '正确。建造者模式的核心优势之一就是可以复用相同的构建代码（相同的构建步骤），但通过不同的具体建造者创建不同的产品表示。',
    },
  ],
};
