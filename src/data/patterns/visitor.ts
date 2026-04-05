import type { DesignPattern } from '@/types/pattern';

export const visitorPattern: DesignPattern = {
  id: 'visitor',
  name: '访问者模式',
  nameEn: 'Visitor Pattern',
  category: 'behavioral',
  difficulty: 'hard',
  frequency: 'low',
  intent: '表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。',
  description: '访问者模式是一种行为设计模式，它能将算法与其所作用的对象隔离开来。访问者模式允许你在不修改已有类的情况下向已有类层次结构中增加新的行为。它通过双重分派机制实现：第一次分派是元素调用访问者的visit方法，第二次分派是访问者根据元素类型调用对应的visit方法。',
  applicability: [
    '当需要对一个复杂对象结构（例如对象树）中的所有元素执行某些操作时',
    '当需要清理复杂对象结构的逻辑和业务逻辑时',
    '当某个行为仅在类层次结构中的一些类中有意义，而在其他类中没有意义时',
    '当需要频繁地添加新的操作，而不想修改元素类时',
    '当元素类层次结构稳定，但操作经常变化时',
  ],
  pros: [
    '开闭原则：可以引入在不同类对象上执行的新行为，且无需修改这些类',
    '单一职责原则：可将同一行为的不同版本移到同一个类中',
    '访问者对象可以在与各种对象交互时收集一些有用的信息',
    '更容易添加新的操作，只需添加新的访问者类即可',
  ],
  cons: [
    '每次在元素层次结构中添加或移除一个类时，都要更新所有的访问者',
    '访问者可能缺乏访问元素私有成员变量和方法的必要权限',
    '增加了代码的复杂性，需要理解双重分派机制',
    '违反了依赖倒置原则，访问者依赖于具体的元素类',
  ],
  analogy: {
    title: '现实世界中的访问者',
    description: '访问者模式就像是税务检查员访问不同企业',
    scenarios: [
      {
        id: 'tax',
        title: '税务检查',
        description: '税务检查员（访问者）访问不同的企业（元素），对每个企业执行相同的检查操作，但处理细节因企业类型（工厂、商店、餐厅）而异。检查员无需改变企业本身的运营方式，就能完成检查工作。',
        icon: 'FileText',
      },
      {
        id: 'doctor',
        title: '医生查房',
        description: '医生（访问者）查房时会访问不同的病人（元素），对每个病人进行检查、诊断，但不同病人（内科、外科、儿科）需要不同的检查方式和处理。',
        icon: 'UserCheck',
      },
      {
        id: 'insurance',
        title: '保险评估员',
        description: '保险评估员（访问者）评估不同类型的财产（房屋、汽车、珠宝），对每种财产计算保险费用，但评估标准因财产类型而异。',
        icon: 'Shield',
      },
    ],
  },
  structure: {
    classDiagram: `
      class Visitor {
        +visitConcreteElementA(element)
        +visitConcreteElementB(element)
      }
      class ConcreteVisitor1 {
        +visitConcreteElementA(element)
        +visitConcreteElementB(element)
      }
      class ConcreteVisitor2 {
        +visitConcreteElementA(element)
        +visitConcreteElementB(element)
      }
      class Element {
        +accept(visitor)
      }
      class ConcreteElementA {
        +accept(visitor)
        +operationA()
      }
      class ConcreteElementB {
        +accept(visitor)
        +operationB()
      }
      class ObjectStructure {
        -elements
        +attach(element)
        +detach(element)
        +accept(visitor)
      }
      Visitor <|-- ConcreteVisitor1
      Visitor <|-- ConcreteVisitor2
      Element <|-- ConcreteElementA
      Element <|-- ConcreteElementB
      ObjectStructure o-- Element
    `,
    mermaidDiagram: `
classDiagram
  class Visitor {
    <<interface>>
    +visitConcreteElementA(ConcreteElementA)
    +visitConcreteElementB(ConcreteElementB)
  }
  
  class ConcreteVisitor1 {
    +visitConcreteElementA(ConcreteElementA)
    +visitConcreteElementB(ConcreteElementB)
  }
  
  class ConcreteVisitor2 {
    +visitConcreteElementA(ConcreteElementA)
    +visitConcreteElementB(ConcreteElementB)
  }
  
  class Element {
    <<interface>>
    +accept(Visitor)
  }
  
  class ConcreteElementA {
    +accept(Visitor)
    +operationA()
  }
  
  class ConcreteElementB {
    +accept(Visitor)
    +operationB()
  }
  
  class ObjectStructure {
    -elements: List~Element~
    +attach(Element)
    +detach(Element)
    +accept(Visitor)
  }
  
  class Client {
    +main()
  }
  
  Visitor <|-- ConcreteVisitor1
  Visitor <|-- ConcreteVisitor2
  Element <|-- ConcreteElementA
  Element <|-- ConcreteElementB
  ObjectStructure o-- Element
  Client ..> Visitor : uses
  Client ..> ObjectStructure : uses
  ConcreteElementA ..> Visitor : accepts
  ConcreteElementB ..> Visitor : accepts
  
  style Visitor fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style Element fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style ConcreteVisitor1 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px
  style ConcreteVisitor2 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px
  style ConcreteElementA fill:#fff3e0,stroke:#f57c00,stroke-width:1px
  style ConcreteElementB fill:#fff3e0,stroke:#f57c00,stroke-width:1px
  style ObjectStructure fill:#e8f5e9,stroke:#388e3c,stroke-width:1px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: 'Visitor 访问者接口',
        description: '定义访问者接口，为每种类型的元素声明visit方法（方法重载）',
        duration: 2000,
        elements: [
          { id: 'visitor', type: 'interface', name: 'Visitor', x: 200, y: 100, methods: ['+visitConcreteElementA(element)', '+visitConcreteElementB(element)'] },
        ],
      },
      {
        id: 'step2',
        title: 'Element 元素接口',
        description: '定义元素接口，声明accept方法接受访问者',
        duration: 2000,
        elements: [
          { id: 'visitor', type: 'interface', name: 'Visitor', x: 200, y: 100, methods: ['+visitConcreteElementA(element)', '+visitConcreteElementB(element)'] },
          { id: 'element', type: 'interface', name: 'Element', x: 600, y: 100, methods: ['+accept(visitor)'] },
        ],
      },
      {
        id: 'step3',
        title: 'ConcreteElement 具体元素',
        description: '实现元素接口，在accept方法中调用访问者的visit方法（第一次分派）',
        duration: 3000,
        elements: [
          { id: 'visitor', type: 'interface', name: 'Visitor', x: 200, y: 100, methods: ['+visitConcreteElementA(element)', '+visitConcreteElementB(element)'] },
          { id: 'element', type: 'interface', name: 'Element', x: 600, y: 100, methods: ['+accept(visitor)'] },
          { id: 'elementA', type: 'class', name: 'ConcreteElementA', x: 500, y: 300, methods: ['+accept(visitor)', '+operationA()'] },
          { id: 'elementB', type: 'class', name: 'ConcreteElementB', x: 700, y: 300, methods: ['+accept(visitor)', '+operationB()'] },
        ],
        connections: [
          { from: 'element', to: 'elementA', type: 'inheritance' },
          { from: 'element', to: 'elementB', type: 'inheritance' },
        ],
      },
      {
        id: 'step4',
        title: 'ConcreteVisitor 具体访问者',
        description: '实现访问者接口，为每种元素提供具体的操作（第二次分派）',
        duration: 3000,
        elements: [
          { id: 'visitor', type: 'interface', name: 'Visitor', x: 200, y: 100, methods: ['+visitConcreteElementA(element)', '+visitConcreteElementB(element)'] },
          { id: 'element', type: 'interface', name: 'Element', x: 600, y: 100, methods: ['+accept(visitor)'] },
          { id: 'elementA', type: 'class', name: 'ConcreteElementA', x: 500, y: 300, methods: ['+accept(visitor)', '+operationA()'] },
          { id: 'elementB', type: 'class', name: 'ConcreteElementB', x: 700, y: 300, methods: ['+accept(visitor)', '+operationB()'] },
          { id: 'visitor1', type: 'class', name: 'ConcreteVisitor1', x: 100, y: 300, methods: ['+visitConcreteElementA(element)', '+visitConcreteElementB(element)'] },
          { id: 'visitor2', type: 'class', name: 'ConcreteVisitor2', x: 300, y: 300, methods: ['+visitConcreteElementA(element)', '+visitConcreteElementB(element)'] },
        ],
        connections: [
          { from: 'element', to: 'elementA', type: 'inheritance' },
          { from: 'element', to: 'elementB', type: 'inheritance' },
          { from: 'visitor', to: 'visitor1', type: 'inheritance' },
          { from: 'visitor', to: 'visitor2', type: 'inheritance' },
        ],
      },
      {
        id: 'step5',
        title: 'ObjectStructure 对象结构',
        description: '维护元素集合，提供遍历元素并接受访问者的方法',
        duration: 3000,
        elements: [
          { id: 'visitor', type: 'interface', name: 'Visitor', x: 200, y: 100, methods: ['+visitConcreteElementA(element)', '+visitConcreteElementB(element)'] },
          { id: 'element', type: 'interface', name: 'Element', x: 600, y: 100, methods: ['+accept(visitor)'] },
          { id: 'elementA', type: 'class', name: 'ConcreteElementA', x: 500, y: 300, methods: ['+accept(visitor)', '+operationA()'] },
          { id: 'elementB', type: 'class', name: 'ConcreteElementB', x: 700, y: 300, methods: ['+accept(visitor)', '+operationB()'] },
          { id: 'visitor1', type: 'class', name: 'ConcreteVisitor1', x: 100, y: 300, methods: ['+visitConcreteElementA(element)', '+visitConcreteElementB(element)'] },
          { id: 'visitor2', type: 'class', name: 'ConcreteVisitor2', x: 300, y: 300, methods: ['+visitConcreteElementA(element)', '+visitConcreteElementB(element)'] },
          { id: 'structure', type: 'class', name: 'ObjectStructure', x: 600, y: 500, properties: ['-elements: Element[]'], methods: ['+attach(element)', '+detach(element)', '+accept(visitor)'] },
        ],
        connections: [
          { from: 'element', to: 'elementA', type: 'inheritance' },
          { from: 'element', to: 'elementB', type: 'inheritance' },
          { from: 'visitor', to: 'visitor1', type: 'inheritance' },
          { from: 'visitor', to: 'visitor2', type: 'inheritance' },
          { from: 'structure', to: 'element', type: 'aggregation' },
        ],
      },
      {
        id: 'step6',
        title: '双重分派机制',
        description: '客户端创建访问者和对象结构，调用accept触发双重分派：元素.accept(访问者) -> 访问者.visit(元素)',
        duration: 4000,
        elements: [
          { id: 'visitor', type: 'interface', name: 'Visitor', x: 200, y: 100, methods: ['+visitConcreteElementA(element)', '+visitConcreteElementB(element)'] },
          { id: 'element', type: 'interface', name: 'Element', x: 600, y: 100, methods: ['+accept(visitor)'] },
          { id: 'elementA', type: 'class', name: 'ConcreteElementA', x: 500, y: 300, methods: ['+accept(visitor)', '+operationA()'] },
          { id: 'elementB', type: 'class', name: 'ConcreteElementB', x: 700, y: 300, methods: ['+accept(visitor)', '+operationB()'] },
          { id: 'visitor1', type: 'class', name: 'ConcreteVisitor1', x: 100, y: 300, methods: ['+visitConcreteElementA(element)', '+visitConcreteElementB(element)'] },
          { id: 'visitor2', type: 'class', name: 'ConcreteVisitor2', x: 300, y: 300, methods: ['+visitConcreteElementA(element)', '+visitConcreteElementB(element)'] },
          { id: 'structure', type: 'class', name: 'ObjectStructure', x: 600, y: 500, properties: ['-elements: Element[]'], methods: ['+attach(element)', '+detach(element)', '+accept(visitor)'] },
          { id: 'client', type: 'class', name: 'Client', x: 400, y: 500, methods: ['+main()'] },
        ],
        connections: [
          { from: 'element', to: 'elementA', type: 'inheritance' },
          { from: 'element', to: 'elementB', type: 'inheritance' },
          { from: 'visitor', to: 'visitor1', type: 'inheritance' },
          { from: 'visitor', to: 'visitor2', type: 'inheritance' },
          { from: 'structure', to: 'element', type: 'aggregation' },
          { from: 'client', to: 'visitor1', type: 'dependency', label: 'creates' },
          { from: 'client', to: 'structure', type: 'dependency', label: 'uses' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * 访问者模式 - TypeScript 实现
 * 
 * 核心概念：
 * 1. 双重分派（Double Dispatch）：元素.accept(访问者) -> 访问者.visit(元素)
 * 2. 将操作与对象结构分离，可以在不修改元素类的情况下添加新操作
 * 
 * 示例场景：公司部门报表系统
 * - 不同访问者：HR报表（统计员工数）、财务报表（统计薪资）
 * - 不同元素：工程师、经理
 */

// ============================================
// 访问者接口 - 为每种具体元素声明visit方法
// ============================================
interface Visitor {
  /** 访问工程师 */
  visitEngineer(engineer: Engineer): void;
  /** 访问经理 */
  visitManager(manager: Manager): void;
}

// ============================================
// 元素接口 - 声明accept方法接受访问者
// ============================================
interface Employee {
  /** 接受访问者 - 双重分派的第一次分派 */
  accept(visitor: Visitor): void;
  /** 获取员工姓名 */
  getName(): string;
  /** 获取员工薪资 */
  getSalary(): number;
}

// ============================================
// 具体元素 - 工程师
// ============================================
class Engineer implements Employee {
  constructor(
    private name: string,
    private salary: number,
    private skill: string  // 工程师特有的技能属性
  ) {}

  /** 
   * 接受访问者
   * 关键：调用 visitor.visitEngineer(this)，将自身类型传递给访问者
   * 这是双重分派的第一次分派
   */
  accept(visitor: Visitor): void {
    visitor.visitEngineer(this);
  }

  getName(): string {
    return this.name;
  }

  getSalary(): number {
    return this.salary;
  }

  /** 工程师特有的方法：获取技能 */
  getSkill(): string {
    return this.skill;
  }
}

// ============================================
// 具体元素 - 经理
// ============================================
class Manager implements Employee {
  constructor(
    private name: string,
    private salary: number,
    private subordinates: number  // 经理特有的下属数量属性
  ) {}

  accept(visitor: Visitor): void {
    visitor.visitManager(this);
  }

  getName(): string {
    return this.name;
  }

  getSalary(): number {
    return this.salary;
  }

  /** 经理特有的方法：获取下属数量 */
  getSubordinates(): number {
    return this.subordinates;
  }
}

// ============================================
// 具体访问者 - HR报表：统计员工信息
// ============================================
class HRReportVisitor implements Visitor {
  private engineerCount = 0;
  private managerCount = 0;

  visitEngineer(engineer: Engineer): void {
    this.engineerCount++;
    console.log(\`HR - 工程师: \${engineer.getName()}, 技能: \${engineer.getSkill()}\`);
  }

  visitManager(manager: Manager): void {
    this.managerCount++;
    console.log(\`HR - 经理: \${manager.getName()}, 下属: \${manager.getSubordinates()}人\`);
  }

  printSummary(): void {
    console.log(\`HR报表总结: 工程师\${this.engineerCount}人, 经理\${this.managerCount}人\`);
  }
}

// ============================================
// 具体访问者 - 财务报表：统计薪资
// ============================================
class FinanceReportVisitor implements Visitor {
  private totalSalary = 0;

  visitEngineer(engineer: Engineer): void {
    this.totalSalary += engineer.getSalary();
    console.log(\`财务 - 工程师: \${engineer.getName()}, 薪资: \${engineer.getSalary()}\`);
  }

  visitManager(manager: Manager): void {
    this.totalSalary += manager.getSalary();
    console.log(\`财务 - 经理: \${manager.getName()}, 薪资: \${manager.getSalary()}\`);
  }

  printTotal(): void {
    console.log(\`财务报表总结: 总薪资支出: \${this.totalSalary}\`);
  }
}

// ============================================
// 具体访问者 - 加薪评估访问者
// ============================================
class RaiseEvaluationVisitor implements Visitor {
  visitEngineer(engineer: Engineer): void {
    const raise = engineer.getSalary() * 0.1;  // 工程师加薪10%
    console.log(\`加薪评估 - 工程师: \${engineer.getName()}, 建议加薪: \${raise}\`);
  }

  visitManager(manager: Manager): void {
    const raise = manager.getSalary() * 0.15;  // 经理加薪15%
    console.log(\`加薪评估 - 经理: \${manager.getName()}, 建议加薪: \${raise}\`);
  }
}

// ============================================
// 对象结构 - 员工集合
// ============================================
class Company {
  private employees: Employee[] = [];

  /** 添加员工 */
  attach(employee: Employee): void {
    this.employees.push(employee);
  }

  /** 移除员工 */
  detach(employee: Employee): void {
    const index = this.employees.indexOf(employee);
    if (index !== -1) {
      this.employees.splice(index, 1);
    }
  }

  /** 
   * 接受访问者 - 遍历所有元素并调用accept
   * 这是访问者模式的核心遍历逻辑
   */
  accept(visitor: Visitor): void {
    for (const employee of this.employees) {
      employee.accept(visitor);
    }
  }
}

// ============================================
// 客户端代码
// ============================================
function clientCode(): void {
  // 创建公司（对象结构）
  const company = new Company();
  
  // 添加员工（具体元素）
  company.attach(new Engineer("张三", 15000, "Java"));
  company.attach(new Engineer("李四", 18000, "Python"));
  company.attach(new Manager("王五", 30000, 5));
  company.attach(new Manager("赵六", 35000, 8));

  console.log("========== HR报表 ==========");
  const hrVisitor = new HRReportVisitor();
  company.accept(hrVisitor);  // 双重分派开始
  hrVisitor.printSummary();

  console.log("\\n========== 财务报表 ==========");
  const financeVisitor = new FinanceReportVisitor();
  company.accept(financeVisitor);
  financeVisitor.printTotal();

  console.log("\\n========== 加薪评估 ==========");
  const raiseVisitor = new RaiseEvaluationVisitor();
  company.accept(raiseVisitor);
}

clientCode();`,

    java: `/**
 * 访问者模式 - Java 实现
 * 
 * 核心概念：
 * 1. 双重分派（Double Dispatch）：元素.accept(访问者) -> 访问者.visit(元素)
 * 2. 方法重载用于区分不同类型的元素
 * 
 * 示例场景：购物车系统
 * - 不同访问者：价格计算器、折扣计算器
 * - 不同元素：书籍、水果、电子产品
 */

import java.util.ArrayList;
import java.util.List;

// ============================================
// 访问者接口 - 为每种具体元素声明visit方法
// ============================================
interface ShoppingCartVisitor {
    /** 访问书籍 - 方法重载 */
    void visit(Book book);
    /** 访问水果 - 方法重载 */
    void visit(Fruit fruit);
    /** 访问电子产品 - 方法重载 */
    void visit(Electronics electronics);
}

// ============================================
// 元素接口 - 声明accept方法接受访问者
// ============================================
interface ItemElement {
    /** 接受访问者 - 双重分派的第一次分派 */
    void accept(ShoppingCartVisitor visitor);
}

// ============================================
// 具体元素 - 书籍
// ============================================
class Book implements ItemElement {
    private String title;
    private double price;
    private String isbn;

    public Book(String title, double price, String isbn) {
        this.title = title;
        this.price = price;
        this.isbn = isbn;
    }

    @Override
    public void accept(ShoppingCartVisitor visitor) {
        // 双重分派：将自身传递给访问者的visit方法
        visitor.visit(this);
    }

    public String getTitle() { return title; }
    public double getPrice() { return price; }
    public String getIsbn() { return isbn; }
}

// ============================================
// 具体元素 - 水果
// ============================================
class Fruit implements ItemElement {
    private String name;
    private double pricePerKg;
    private double weight;

    public Fruit(String name, double pricePerKg, double weight) {
        this.name = name;
        this.pricePerKg = pricePerKg;
        this.weight = weight;
    }

    @Override
    public void accept(ShoppingCartVisitor visitor) {
        visitor.visit(this);
    }

    public String getName() { return name; }
    public double getPricePerKg() { return pricePerKg; }
    public double getWeight() { return weight; }
}

// ============================================
// 具体元素 - 电子产品
// ============================================
class Electronics implements ItemElement {
    private String brand;
    private String model;
    private double price;
    private int warranty;  // 保修期（月）

    public Electronics(String brand, String model, double price, int warranty) {
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.warranty = warranty;
    }

    @Override
    public void accept(ShoppingCartVisitor visitor) {
        visitor.visit(this);
    }

    public String getBrand() { return brand; }
    public String getModel() { return model; }
    public double getPrice() { return price; }
    public int getWarranty() { return warranty; }
}

// ============================================
// 具体访问者 - 价格计算器
// ============================================
class PriceCalculatorVisitor implements ShoppingCartVisitor {
    private double totalCost = 0;

    @Override
    public void visit(Book book) {
        double cost = book.getPrice();
        // 书籍超过100元免运费
        if (cost < 100) {
            cost += 10;  // 运费
        }
        totalCost += cost;
        System.out.printf("书籍: %s, 价格: %.2f%n", book.getTitle(), cost);
    }

    @Override
    public void visit(Fruit fruit) {
        double cost = fruit.getPricePerKg() * fruit.getWeight();
        totalCost += cost;
        System.out.printf("水果: %s, 重量: %.2fkg, 价格: %.2f%n", 
            fruit.getName(), fruit.getWeight(), cost);
    }

    @Override
    public void visit(Electronics electronics) {
        double cost = electronics.getPrice() * 1.15;  // 电子产品加15%税费
        totalCost += cost;
        System.out.printf("电子产品: %s %s, 含税价格: %.2f%n", 
            electronics.getBrand(), electronics.getModel(), cost);
    }

    public double getTotalCost() {
        return totalCost;
    }
}

// ============================================
// 具体访问者 - 折扣计算器
// ============================================
class DiscountCalculatorVisitor implements ShoppingCartVisitor {
    private double totalDiscount = 0;

    @Override
    public void visit(Book book) {
        double discount = book.getPrice() * 0.05;  // 书籍5%折扣
        totalDiscount += discount;
        System.out.printf("书籍折扣: %s, 节省: %.2f%n", book.getTitle(), discount);
    }

    @Override
    public void visit(Fruit fruit) {
        double discount = fruit.getPricePerKg() * fruit.getWeight() * 0.1;  // 水果10%折扣
        totalDiscount += discount;
        System.out.printf("水果折扣: %s, 节省: %.2f%n", fruit.getName(), discount);
    }

    @Override
    public void visit(Electronics electronics) {
        double discount = electronics.getPrice() * 0.02;  // 电子产品2%折扣
        totalDiscount += discount;
        System.out.printf("电子产品折扣: %s %s, 节省: %.2f%n", 
            electronics.getBrand(), electronics.getModel(), discount);
    }

    public double getTotalDiscount() {
        return totalDiscount;
    }
}

// ============================================
// 对象结构 - 购物车
// ============================================
class ShoppingCart {
    private List<ItemElement> items = new ArrayList<>();

    public void addItem(ItemElement item) {
        items.add(item);
    }

    public void removeItem(ItemElement item) {
        items.remove(item);
    }

    /** 接受访问者 - 遍历所有商品 */
    public void accept(ShoppingCartVisitor visitor) {
        for (ItemElement item : items) {
            item.accept(visitor);
        }
    }
}

// ============================================
// 客户端代码
// ============================================
public class Client {
    public static void main(String[] args) {
        // 创建购物车
        ShoppingCart cart = new ShoppingCart();
        
        // 添加商品
        cart.addItem(new Book("设计模式", 89.0, "978-7-xxx"));
        cart.addItem(new Book("Java核心技术", 150.0, "978-7-yyy"));
        cart.addItem(new Fruit("苹果", 10.0, 2.5));
        cart.addItem(new Electronics("Apple", "iPhone", 6999.0, 12));

        System.out.println("========== 价格计算 ==========");
        PriceCalculatorVisitor priceVisitor = new PriceCalculatorVisitor();
        cart.accept(priceVisitor);
        System.out.printf("总计: %.2f%n", priceVisitor.getTotalCost());

        System.out.println("\\n========== 折扣计算 ==========");
        DiscountCalculatorVisitor discountVisitor = new DiscountCalculatorVisitor();
        cart.accept(discountVisitor);
        System.out.printf("总折扣: %.2f%n", discountVisitor.getTotalDiscount());
    }
}`,

    go: `/**
 * 访问者模式 - Go 实现
 * 
 * 核心概念：
 * 1. Go 没有传统意义上的方法重载，需要通过方法命名区分不同类型
 * 2. 使用接口实现多态和访问者模式
 * 
 * 示例场景：图形绘制系统
 * - 不同访问者：面积计算器、周长计算器、渲染器
 * - 不同元素：圆形、矩形、三角形
 */

package main

import (
	"fmt"
	"math"
)

// ============================================
// 访问者接口 - 为每种具体元素声明Visit方法
// Go 中没有方法重载，使用不同方法名区分
// ============================================
type ShapeVisitor interface {
	VisitCircle(circle *Circle)
	VisitRectangle(rectangle *Rectangle)
	VisitTriangle(triangle *Triangle)
}

// ============================================
// 元素接口 - 声明Accept方法接受访问者
// ============================================
type Shape interface {
	Accept(visitor ShapeVisitor)
	GetName() string
}

// ============================================
// 具体元素 - 圆形
// ============================================
type Circle struct {
	Radius float64
}

func (c *Circle) Accept(visitor ShapeVisitor) {
	// 双重分派：调用访问者对应的方法
	visitor.VisitCircle(c)
}

func (c *Circle) GetName() string {
	return "圆形"
}

func (c *Circle) GetArea() float64 {
	return math.Pi * c.Radius * c.Radius
}

func (c *Circle) GetPerimeter() float64 {
	return 2 * math.Pi * c.Radius
}

// ============================================
// 具体元素 - 矩形
// ============================================
type Rectangle struct {
	Width  float64
	Height float64
}

func (r *Rectangle) Accept(visitor ShapeVisitor) {
	visitor.VisitRectangle(r)
}

func (r *Rectangle) GetName() string {
	return "矩形"
}

func (r *Rectangle) GetArea() float64 {
	return r.Width * r.Height
}

func (r *Rectangle) GetPerimeter() float64 {
	return 2 * (r.Width + r.Height)
}

// ============================================
// 具体元素 - 三角形
// ============================================
type Triangle struct {
	A, B, C float64  // 三边长度
}

func (t *Triangle) Accept(visitor ShapeVisitor) {
	visitor.VisitTriangle(t)
}

func (t *Triangle) GetName() string {
	return "三角形"
}

// 海伦公式计算面积
func (t *Triangle) GetArea() float64 {
	s := (t.A + t.B + t.C) / 2
	return math.Sqrt(s * (s - t.A) * (s - t.B) * (s - t.C))
}

func (t *Triangle) GetPerimeter() float64 {
	return t.A + t.B + t.C
}

// ============================================
// 具体访问者 - 面积计算器
// ============================================
type AreaCalculator struct {
	TotalArea float64
}

func (a *AreaCalculator) VisitCircle(circle *Circle) {
	area := circle.GetArea()
	a.TotalArea += area
	fmt.Printf("圆形面积: 半径=%.2f, 面积=%.2f\\n", circle.Radius, area)
}

func (a *AreaCalculator) VisitRectangle(rectangle *Rectangle) {
	area := rectangle.GetArea()
	a.TotalArea += area
	fmt.Printf("矩形面积: 宽=%.2f, 高=%.2f, 面积=%.2f\\n", 
		rectangle.Width, rectangle.Height, area)
}

func (a *AreaCalculator) VisitTriangle(triangle *Triangle) {
	area := triangle.GetArea()
	a.TotalArea += area
	fmt.Printf("三角形面积: 边长=%.2f,%.2f,%.2f, 面积=%.2f\\n", 
		triangle.A, triangle.B, triangle.C, area)
}

// ============================================
// 具体访问者 - 周长计算器
// ============================================
type PerimeterCalculator struct {
	TotalPerimeter float64
}

func (p *PerimeterCalculator) VisitCircle(circle *Circle) {
	perimeter := circle.GetPerimeter()
	p.TotalPerimeter += perimeter
	fmt.Printf("圆形周长: 半径=%.2f, 周长=%.2f\\n", circle.Radius, perimeter)
}

func (p *PerimeterCalculator) VisitRectangle(rectangle *Rectangle) {
	perimeter := rectangle.GetPerimeter()
	p.TotalPerimeter += perimeter
	fmt.Printf("矩形周长: 宽=%.2f, 高=%.2f, 周长=%.2f\\n", 
		rectangle.Width, rectangle.Height, perimeter)
}

func (p *PerimeterCalculator) VisitTriangle(triangle *Triangle) {
	perimeter := triangle.GetPerimeter()
	p.TotalPerimeter += perimeter
	fmt.Printf("三角形周长: 边长=%.2f,%.2f,%.2f, 周长=%.2f\\n", 
		triangle.A, triangle.B, triangle.C, perimeter)
}

// ============================================
// 具体访问者 - 图形渲染器
// ============================================
type ShapeRenderer struct {
	RenderTarget string
}

func (r *ShapeRenderer) VisitCircle(circle *Circle) {
	fmt.Printf("[%s] 渲染圆形: 半径=%.2f\\n", r.RenderTarget, circle.Radius)
}

func (r *ShapeRenderer) VisitRectangle(rectangle *Rectangle) {
	fmt.Printf("[%s] 渲染矩形: 宽=%.2f, 高=%.2f\\n", 
		r.RenderTarget, rectangle.Width, rectangle.Height)
}

func (r *ShapeRenderer) VisitTriangle(triangle *Triangle) {
	fmt.Printf("[%s] 渲染三角形: 边长=%.2f,%.2f,%.2f\\n", 
		r.RenderTarget, triangle.A, triangle.B, triangle.C)
}

// ============================================
// 对象结构 - 图形集合
// ============================================
type Drawing struct {
	shapes []Shape
}

func NewDrawing() *Drawing {
	return &Drawing{
		shapes: make([]Shape, 0),
	}
}

func (d *Drawing) AddShape(shape Shape) {
	d.shapes = append(d.shapes, shape)
}

func (d *Drawing) RemoveShape(shape Shape) {
	for i, s := range d.shapes {
		if s == shape {
			d.shapes = append(d.shapes[:i], d.shapes[i+1:]...)
			break
		}
	}
}

/** 接受访问者 - 遍历所有图形 */
func (d *Drawing) Accept(visitor ShapeVisitor) {
	for _, shape := range d.shapes {
		shape.Accept(visitor)
	}
}

// ============================================
// 客户端代码
// ============================================
func main() {
	// 创建绘图对象
	drawing := NewDrawing()
	
	// 添加图形
	drawing.AddShape(&Circle{Radius: 5})
	drawing.AddShape(&Rectangle{Width: 10, Height: 20})
	drawing.AddShape(&Triangle{A: 3, B: 4, C: 5})
	drawing.AddShape(&Circle{Radius: 3})

	fmt.Println("========== 面积计算 ==========")
	areaCalc := &AreaCalculator{}
	drawing.Accept(areaCalc)
	fmt.Printf("总面积: %.2f\\n\\n", areaCalc.TotalArea)

	fmt.Println("========== 周长计算 ==========")
	perimeterCalc := &PerimeterCalculator{}
	drawing.Accept(perimeterCalc)
	fmt.Printf("总周长: %.2f\\n\\n", perimeterCalc.TotalPerimeter)

	fmt.Println("========== 图形渲染 ==========")
	renderer := &ShapeRenderer{RenderTarget: "屏幕"}
	drawing.Accept(renderer)
}`,

    python: `"""
访问者模式 - Python 实现

核心概念：
1. 使用抽象基类（ABC）定义接口
2. 双重分派机制实现操作与对象的分离

示例场景：文档导出系统
- 不同访问者：HTML导出器、Markdown导出器、PDF导出器
- 不同元素：段落、图片、表格
"""

from abc import ABC, abstractmethod
from typing import List

# ============================================
# 访问者抽象类 - 为每种具体元素声明visit方法
# ============================================
class DocumentVisitor(ABC):
    @abstractmethod
    def visit_paragraph(self, paragraph: 'Paragraph') -> None:
        """访问段落"""
        pass

    @abstractmethod
    def visit_image(self, image: 'Image') -> None:
        """访问图片"""
        pass

    @abstractmethod
    def visit_table(self, table: 'Table') -> None:
        """访问表格"""
        pass


# ============================================
# 元素抽象类 - 声明accept方法接受访问者
# ============================================
class DocumentElement(ABC):
    @abstractmethod
    def accept(self, visitor: DocumentVisitor) -> None:
        """接受访问者 - 双重分派的第一次分派"""
        pass


# ============================================
# 具体元素 - 段落
# ============================================
class Paragraph(DocumentElement):
    def __init__(self, text: str, heading_level: int = 0):
        self.text = text
        self.heading_level = heading_level  # 0表示普通段落，1-6表示标题级别

    def accept(self, visitor: DocumentVisitor) -> None:
        # 双重分派：将自身传递给访问者
        visitor.visit_paragraph(self)

    def get_text(self) -> str:
        return self.text

    def get_heading_level(self) -> int:
        return self.heading_level

    def is_heading(self) -> bool:
        return self.heading_level > 0


# ============================================
# 具体元素 - 图片
# ============================================
class Image(DocumentElement):
    def __init__(self, src: str, alt: str, width: int = 0, height: int = 0):
        self.src = src
        self.alt = alt
        self.width = width
        self.height = height

    def accept(self, visitor: DocumentVisitor) -> None:
        visitor.visit_image(self)

    def get_src(self) -> str:
        return self.src

    def get_alt(self) -> str:
        return self.alt

    def get_dimensions(self) -> tuple:
        return (self.width, self.height)


# ============================================
# 具体元素 - 表格
# ============================================
class Table(DocumentElement):
    def __init__(self, headers: List[str], rows: List[List[str]]):
        self.headers = headers
        self.rows = rows

    def accept(self, visitor: DocumentVisitor) -> None:
        visitor.visit_table(self)

    def get_headers(self) -> List[str]:
        return self.headers

    def get_rows(self) -> List[List[str]]:
        return self.rows

    def get_row_count(self) -> int:
        return len(self.rows)


# ============================================
# 具体访问者 - HTML导出器
# ============================================
class HTMLExporter(DocumentVisitor):
    def __init__(self):
        self.html_parts: List[str] = []

    def visit_paragraph(self, paragraph: Paragraph) -> None:
        if paragraph.is_heading():
            level = paragraph.get_heading_level()
            self.html_parts.append(f"<h{level}>{paragraph.get_text()}</h{level}>")
        else:
            self.html_parts.append(f"<p>{paragraph.get_text()}</p>")

    def visit_image(self, image: Image) -> None:
        width_attr = f' width="{image.width}"' if image.width > 0 else ""
        height_attr = f' height="{image.height}"' if image.height > 0 else ""
        self.html_parts.append(
            f'<img src="{image.get_src()}" alt="{image.get_alt()}"{width_attr}{height_attr}>'
        )

    def visit_table(self, table: Table) -> None:
        html = ["<table>", "<thead><tr>"]
        
        # 表头
        for header in table.get_headers():
            html.append(f"<th>{header}</th>")
        html.append("</tr></thead><tbody>")
        
        # 数据行
        for row in table.get_rows():
            html.append("<tr>")
            for cell in row:
                html.append(f"<td>{cell}</td>")
            html.append("</tr>")
        
        html.append("</tbody></table>")
        self.html_parts.append("".join(html))

    def get_html(self) -> str:
        return "\\n".join(self.html_parts)


# ============================================
# 具体访问者 - Markdown导出器
# ============================================
class MarkdownExporter(DocumentVisitor):
    def __init__(self):
        self.md_parts: List[str] = []

    def visit_paragraph(self, paragraph: Paragraph) -> None:
        if paragraph.is_heading():
            level = paragraph.get_heading_level()
            self.md_parts.append(f"{'#' * level} {paragraph.get_text()}")
        else:
            self.md_parts.append(paragraph.get_text())
        self.md_parts.append("")  # 空行

    def visit_image(self, image: Image) -> None:
        self.md_parts.append(f"![{image.get_alt()}]({image.get_src()})")
        self.md_parts.append("")

    def visit_table(self, table: Table) -> None:
        # Markdown表格
        headers = table.get_headers()
        self.md_parts.append("| " + " | ".join(headers) + " |")
        self.md_parts.append("| " + " | ".join(["---"] * len(headers)) + " |")
        
        for row in table.get_rows():
            self.md_parts.append("| " + " | ".join(row) + " |")
        self.md_parts.append("")

    def get_markdown(self) -> str:
        return "\\n".join(self.md_parts)


# ============================================
# 具体访问者 - 纯文本导出器
# ============================================
class PlainTextExporter(DocumentVisitor):
    def __init__(self):
        self.text_parts: List[str] = []

    def visit_paragraph(self, paragraph: Paragraph) -> None:
        if paragraph.is_heading():
            self.text_parts.append(f"【标题】{paragraph.get_text()}")
        else:
            self.text_parts.append(paragraph.get_text())

    def visit_image(self, image: Image) -> None:
        self.text_parts.append(f"[图片: {image.get_alt()} - {image.get_src()}]")

    def visit_table(self, table: Table) -> None:
        self.text_parts.append("[表格]")
        self.text_parts.append(f"  表头: {', '.join(table.get_headers())}")
        for i, row in enumerate(table.get_rows(), 1):
            self.text_parts.append(f"  行{i}: {', '.join(row)}")

    def get_text(self) -> str:
        return "\\n".join(self.text_parts)


# ============================================
# 对象结构 - 文档
# ============================================
class Document:
    def __init__(self):
        self.elements: List[DocumentElement] = []

    def add_element(self, element: DocumentElement) -> None:
        self.elements.append(element)

    def remove_element(self, element: DocumentElement) -> None:
        if element in self.elements:
            self.elements.remove(element)

    def accept(self, visitor: DocumentVisitor) -> None:
        """接受访问者 - 遍历所有元素"""
        for element in self.elements:
            element.accept(visitor)


# ============================================
# 客户端代码
# ============================================
def client_code():
    # 创建文档
    doc = Document()
    
    # 添加文档元素
    doc.add_element(Paragraph("产品介绍", heading_level=1))
    doc.add_element(Paragraph("这是我们的产品介绍文档。"))
    doc.add_element(Image("product.png", "产品图片", width=400, height=300))
    doc.add_element(Paragraph("规格参数", heading_level=2))
    doc.add_element(Table(
        headers=["参数", "值"],
        rows=[
            ["尺寸", "100x200mm"],
            ["重量", "500g"],
            ["颜色", "黑色"]
        ]
    ))

    print("========== HTML 导出 ==========")
    html_exporter = HTMLExporter()
    doc.accept(html_exporter)
    print(html_exporter.get_html())

    print("\\n========== Markdown 导出 ==========")
    md_exporter = MarkdownExporter()
    doc.accept(md_exporter)
    print(md_exporter.get_markdown())

    print("\\n========== 纯文本 导出 ==========")
    text_exporter = PlainTextExporter()
    doc.accept(text_exporter)
    print(text_exporter.get_text())


if __name__ == "__main__":
    client_code()`,

    cpp: `/**
 * 访问者模式 - C++ 实现
 * 
 * 核心概念：
 * 1. 使用纯虚函数定义接口
 * 2. 前向声明解决循环依赖问题
 * 3. 双重分派机制实现操作与对象的分离
 * 
 * 示例场景：文件系统扫描系统
 * - 不同访问者：大小计算器、病毒扫描器、权限检查器
 * - 不同元素：文件、文件夹、链接
 */

#include <iostream>
#include <string>
#include <vector>
#include <memory>

// 前向声明 - 解决循环依赖
class File;
class Directory;
class Link;

// ============================================
// 访问者抽象类 - 为每种具体元素声明visit方法
// ============================================
class FileSystemVisitor {
public:
    virtual ~FileSystemVisitor() = default;
    
    /** 访问文件 */
    virtual void visit(File* file) = 0;
    /** 访问文件夹 */
    virtual void visit(Directory* directory) = 0;
    /** 访问链接 */
    virtual void visit(Link* link) = 0;
};

// ============================================
// 元素抽象类 - 声明accept方法接受访问者
// ============================================
class FileSystemElement {
public:
    virtual ~FileSystemElement() = default;
    
    /** 接受访问者 - 双重分派的第一次分派 */
    virtual void accept(FileSystemVisitor* visitor) = 0;
    
    /** 获取元素名称 */
    virtual std::string getName() const = 0;
    /** 获取元素路径 */
    virtual std::string getPath() const = 0;
};

// ============================================
// 具体元素 - 文件
// ============================================
class File : public FileSystemElement {
private:
    std::string name;
    std::string path;
    size_t size;           // 文件大小（字节）
    std::string extension; // 文件扩展名

public:
    File(const std::string& name, const std::string& path, 
         size_t size, const std::string& ext)
        : name(name), path(path), size(size), extension(ext) {}

    void accept(FileSystemVisitor* visitor) override {
        // 双重分派：调用访问者的visit方法，传递自身
        visitor->visit(this);
    }

    std::string getName() const override {
        return name;
    }

    std::string getPath() const override {
        return path;
    }

    size_t getSize() const {
        return size;
    }

    std::string getExtension() const {
        return extension;
    }
};

// ============================================
// 具体元素 - 文件夹
// ============================================
class Directory : public FileSystemElement {
private:
    std::string name;
    std::string path;
    std::vector<std::shared_ptr<FileSystemElement>> children;

public:
    Directory(const std::string& name, const std::string& path)
        : name(name), path(path) {}

    void accept(FileSystemVisitor* visitor) override {
        visitor->visit(this);
    }

    std::string getName() const override {
        return name;
    }

    std::string getPath() const override {
        return path;
    }

    void addChild(std::shared_ptr<FileSystemElement> child) {
        children.push_back(child);
    }

    const std::vector<std::shared_ptr<FileSystemElement>>& getChildren() const {
        return children;
    }
};

// ============================================
// 具体元素 - 链接
// ============================================
class Link : public FileSystemElement {
private:
    std::string name;
    std::string path;
    std::string target;  // 链接目标

public:
    Link(const std::string& name, const std::string& path, 
         const std::string& target)
        : name(name), path(path), target(target) {}

    void accept(FileSystemVisitor* visitor) override {
        visitor->visit(this);
    }

    std::string getName() const override {
        return name;
    }

    std::string getPath() const override {
        return path;
    }

    std::string getTarget() const {
        return target;
    }
};

// ============================================
// 具体访问者 - 大小计算器
// ============================================
class SizeCalculatorVisitor : public FileSystemVisitor {
private:
    size_t totalSize = 0;
    size_t fileCount = 0;

public:
    void visit(File* file) override {
        totalSize += file->getSize();
        fileCount++;
        std::cout << "文件: " << file->getName() 
                  << ", 大小: " << file->getSize() << " bytes" << std::endl;
    }

    void visit(Directory* directory) override {
        std::cout << "进入目录: " << directory->getName() << std::endl;
        // 递归访问子元素
        for (const auto& child : directory->getChildren()) {
            child->accept(this);
        }
    }

    void visit(Link* link) override {
        std::cout << "链接: " << link->getName() 
                  << " -> " << link->getTarget() << " (不计算大小)" << std::endl;
    }

    size_t getTotalSize() const {
        return totalSize;
    }

    size_t getFileCount() const {
        return fileCount;
    }
};

// ============================================
// 具体访问者 - 病毒扫描器
// ============================================
class VirusScannerVisitor : public FileSystemVisitor {
private:
    int scannedFiles = 0;
    int threatsFound = 0;

public:
    void visit(File* file) override {
        scannedFiles++;
        std::cout << "扫描文件: " << file->getName();
        
        // 模拟病毒检测（检查扩展名）
        if (file->getExtension() == ".exe" || file->getExtension() == ".dll") {
            std::cout << " [可疑文件]";
            threatsFound++;
        }
        std::cout << " - 安全" << std::endl;
    }

    void visit(Directory* directory) override {
        std::cout << "扫描目录: " << directory->getName() << std::endl;
        for (const auto& child : directory->getChildren()) {
            child->accept(this);
        }
    }

    void visit(Link* link) override {
        std::cout << "跳过链接: " << link->getName() << std::endl;
    }

    void printSummary() const {
        std::cout << "\\n扫描完成: 扫描文件 " << scannedFiles 
                  << " 个, 发现威胁 " << threatsFound << " 个" << std::endl;
    }
};

// ============================================
// 具体访问者 - 权限检查器
// ============================================
class PermissionCheckerVisitor : public FileSystemVisitor {
private:
    std::string currentUser;

public:
    explicit PermissionCheckerVisitor(const std::string& user) 
        : currentUser(user) {}

    void visit(File* file) override {
        std::cout << "检查权限 [" << currentUser << "]: " 
                  << file->getName() << " - 可读/可写" << std::endl;
    }

    void visit(Directory* directory) override {
        std::cout << "检查目录权限 [" << currentUser << "]: " 
                  << directory->getName() << std::endl;
        for (const auto& child : directory->getChildren()) {
            child->accept(this);
        }
    }

    void visit(Link* link) override {
        std::cout << "检查链接权限 [" << currentUser << "]: " 
                  << link->getName() << " -> " << link->getTarget() << std::endl;
    }
};

// ============================================
// 对象结构 - 文件系统
// ============================================
class FileSystem {
private:
    std::vector<std::shared_ptr<FileSystemElement>> roots;

public:
    void addRoot(std::shared_ptr<FileSystemElement> root) {
        roots.push_back(root);
    }

    void removeRoot(std::shared_ptr<FileSystemElement> root) {
        auto it = std::find(roots.begin(), roots.end(), root);
        if (it != roots.end()) {
            roots.erase(it);
        }
    }

    /** 接受访问者 - 遍历所有根元素 */
    void accept(FileSystemVisitor* visitor) {
        for (const auto& root : roots) {
            root->accept(visitor);
        }
    }
};

// ============================================
// 客户端代码
// ============================================
int main() {
    // 创建文件系统结构
    auto root = std::make_shared<Directory>("root", "/");
    auto docs = std::make_shared<Directory>("documents", "/documents");
    auto pics = std::make_shared<Directory>("pictures", "/pictures");
    
    // 添加文件
    auto file1 = std::make_shared<File>("report.txt", "/documents/report.txt", 
                                        1024, ".txt");
    auto file2 = std::make_shared<File>("app.exe", "/documents/app.exe", 
                                        2048000, ".exe");
    auto file3 = std::make_shared<File>("photo.jpg", "/pictures/photo.jpg", 
                                        512000, ".jpg");
    auto link1 = std::make_shared<Link>("shortcut", "/shortcut", "/documents/report.txt");
    
    // 构建目录结构
    docs->addChild(file1);
    docs->addChild(file2);
    pics->addChild(file3);
    root->addChild(docs);
    root->addChild(pics);
    root->addChild(link1);
    
    // 创建文件系统
    FileSystem fs;
    fs.addRoot(root);

    std::cout << "========== 大小计算 ==========" << std::endl;
    SizeCalculatorVisitor sizeVisitor;
    fs.accept(&sizeVisitor);
    std::cout << "\\n总大小: " << sizeVisitor.getTotalSize() 
              << " bytes, 文件数: " << sizeVisitor.getFileCount() << std::endl;

    std::cout << "\\n========== 病毒扫描 ==========" << std::endl;
    VirusScannerVisitor virusVisitor;
    fs.accept(&virusVisitor);
    virusVisitor.printSummary();

    std::cout << "\\n========== 权限检查 ==========" << std::endl;
    PermissionCheckerVisitor permVisitor("admin");
    fs.accept(&permVisitor);

    return 0;
}`,
  },
  realWorldExamples: [
    {
      title: 'Java NIO FileVisitor',
      description: 'Java NIO 中的 FileVisitor 接口是访问者模式的典型应用，用于遍历文件树并对每个文件/目录执行操作。',
      source: 'JDK',
      codeSnippet: `Files.walkFileTree(path, new SimpleFileVisitor<Path>() {
    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
        System.out.println("访问文件: " + file);
        return FileVisitResult.CONTINUE;
    }
});`,
    },
    {
      title: 'Java ASM 字节码操作库',
      description: 'ASM 库使用访问者模式遍历和修改 Java 字节码，ClassVisitor、MethodVisitor 等都是访问者。',
      source: 'ASM Library',
      codeSnippet: `ClassVisitor cv = new ClassVisitor(Opcodes.ASM9) {
    @Override
    public void visit(int version, int access, String name, 
                      String signature, String superName, String[] interfaces) {
        // 处理类信息
    }
};`,
    },
    {
      title: 'Spring BeanDefinitionVisitor',
      description: 'Spring Framework 使用访问者模式遍历 Bean 定义并解析占位符。',
      source: 'Spring Framework',
      codeSnippet: `BeanDefinitionVisitor visitor = new BeanDefinitionVisitor(strVal -> {
    // 解析属性值
    return resolvedValue;
});
visitor.visitBeanDefinition(beanDefinition);`,
    },
  ],
  relatedPatterns: ['composite', 'iterator', 'strategy', 'command'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '访问者模式的核心机制是什么？',
      options: [
        '单分派（Single Dispatch）',
        '双重分派（Double Dispatch）',
        '多继承（Multiple Inheritance）',
        '反射（Reflection）',
      ],
      correctAnswer: 1,
      explanation: '访问者模式的核心是双重分派机制。第一次分派是元素调用accept方法，将访问者传递进来；第二次分派是访问者根据元素类型调用对应的visit方法。',
    },
    {
      id: 'q2',
      type: 'single',
      question: '访问者模式的主要优点是什么？',
      options: [
        '提高程序的运行效率',
        '减少内存占用',
        '可以在不改变元素类的前提下定义新操作',
        '简化类的继承层次结构',
      ],
      correctAnswer: 2,
      explanation: '访问者模式的主要优点是可以在不改变各元素类的前提下定义作用于这些元素的新操作，符合开闭原则。',
    },
    {
      id: 'q3',
      type: 'boolean',
      question: '在访问者模式中，当添加新的元素类型时，需要修改所有的访问者类。',
      options: ['正确', '错误'],
      correctAnswer: 0,
      explanation: '正确。这是访问者模式的主要缺点之一。每当在元素层次结构中添加或移除一个类时，都需要更新所有的访问者类，为其添加或删除对应的visit方法。',
    },
    {
      id: 'q4',
      type: 'single',
      question: '以下哪个场景最适合使用访问者模式？',
      options: [
        '需要频繁添加新的元素类型',
        '需要频繁添加新的操作，但元素类型相对稳定',
        '对象结构非常简单',
        '需要提高代码的可读性',
      ],
      correctAnswer: 1,
      explanation: '访问者模式最适合的场景是对象结构（元素类型）相对稳定，但需要频繁添加新的操作的场景。这样可以避免修改现有的元素类。',
    },
  ],
};
