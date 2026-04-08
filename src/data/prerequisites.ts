// 前置知识数据

export interface PrerequisiteSection {
  id: string;
  title: string;
  content: string;
  subsections?: {
    title: string;
    content: string;
    code?: string;
    language?: string;
    mermaid?: string;
  }[];
}

export const prerequisiteSections: PrerequisiteSection[] = [
  {
    id: 'oop',
    title: '面向对象基础',
    content: '设计模式建立在面向对象编程（OOP）的基础之上。理解类、对象、封装、继承、多态等核心概念是学习设计模式的前提。',
    subsections: [
      {
        title: '类与对象',
        content: '类是对象的蓝图或模板，定义了对象具有的属性和方法。对象是类的实例，是内存中实际存在的实体。',
        code: `// 定义一个类
public class Dog {
    private String name;
    
    public Dog(String name) {
        this.name = name;
    }
    
    public void bark() {
        System.out.println(name + " says: Woof!");
    }
    
    public static void main(String[] args) {
        // 创建对象（实例化）
        Dog myDog = new Dog("Buddy");
        myDog.bark(); // Buddy says: Woof!
    }
}`,
        language: 'java'
      },
      {
        title: '封装',
        content: '封装是将数据（属性）和操作数据的方法绑定在一起，并隐藏内部实现细节。通过访问修饰符（public、private、protected）控制访问权限。',
        code: `public class BankAccount {
    private double balance = 0;  // 私有属性，外部无法直接访问
    
    public void deposit(double amount) {     // 公共方法
        if (amount > 0) {
            this.balance += amount;
        }
    }
    
    public double getBalance() {        // 通过方法访问私有属性
        return this.balance;
    }
}

// 使用
BankAccount account = new BankAccount();
account.deposit(100);
System.out.println(account.getBalance()); // 100.0
// System.out.println(account.balance);   // 错误：无法访问私有属性`,
        language: 'java'
      },
      {
        title: '继承',
        content: '继承允许一个类（子类）继承另一个类（父类）的属性和方法，实现代码复用和层次化分类。',
        code: `public class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void move(int distance) {
        System.out.println(name + " moved " + distance + "m");
    }
}

public class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }
    
    public void bark() {
        System.out.println(name + " says: Woof!");
    }
}

// 使用
Dog dog = new Dog("Buddy");
dog.move(10);  // 继承自 Animal
dog.bark();    // Dog 自己的方法`,
        language: 'java'
      },
      {
        title: '多态',
        content: '多态允许子类重写父类的方法，使得同一个方法调用可以有不同的行为。这是实现"针对接口编程，而非实现编程"的基础。',
        code: `// 抽象类
abstract class Shape {
    abstract double getArea();
}

class Rectangle extends Shape {
    private double width;
    private double height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    double getArea() {
        return width * height;
    }
}

class Circle extends Shape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    double getArea() {
        return Math.PI * radius * radius;
    }
}

// 多态：同样的调用，不同的实现
List<Shape> shapes = Arrays.asList(
    new Rectangle(5, 3), 
    new Circle(4)
);
for (Shape shape : shapes) {
    System.out.println(shape.getArea()); // 15.0, 50.27...
}`,
        language: 'java'
      },
      {
        title: '抽象类与接口',
        content: '抽象类是不能实例化的类，通常包含抽象方法。接口定义了一组方法的契约，实现类必须遵守。两者都用于定义规范。',
        code: `// 接口：定义契约
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

// 类可以实现多个接口
class Duck implements Flyable, Swimmable {
    @Override
    public void fly() {
        System.out.println("Duck is flying");
    }
    
    @Override
    public void swim() {
        System.out.println("Duck is swimming");
    }
}

// 抽象类：提供部分实现
abstract class Vehicle {
    protected int speed = 0;
    
    public void accelerate(int amount) {
        this.speed += amount;
    }
    
    abstract void move();  // 抽象方法，子类必须实现
}

class Car extends Vehicle {
    @Override
    void move() {
        System.out.println("Car driving at " + speed + "km/h");
    }
}`,
        language: 'java'
      },
      {
        title: '组合 vs 继承',
        content: '继承是"是一个"（is-a）关系，组合是"有一个"（has-a）关系。设计模式更推崇组合，因为它更灵活，耦合度更低。',
        code: `// 继承方式（紧耦合）
class Bird extends Animal {
    void fly() {
        System.out.println("Flying...");
    }
}

// 组合方式（松耦合）
class FlyBehavior {
    void fly() {
        System.out.println("Flying...");
    }
}

class BirdWithComposition {
    private FlyBehavior flyBehavior = new FlyBehavior();
    
    void fly() {
        flyBehavior.fly();
    }
}

// 组合的优势：可以在运行时改变行为
class Duck {
    private FlyBehavior flyBehavior;
    
    public void setFlyBehavior(FlyBehavior behavior) {
        this.flyBehavior = behavior;
    }
    
    public void fly() {
        if (flyBehavior != null) {
            flyBehavior.fly();
        }
    }
}`,
        language: 'java'
      },
      {
        title: '组合 vs 继承 对比表',
        content: '**继承**和**组合**是代码复用的两种主要方式，设计模式更倾向于使用组合。',
        code: `// 对比总结
/*
┌──────────────┬─────────────────────┬─────────────────────┐
│    特性      │       继承          │       组合          │
├──────────────┼─────────────────────┼─────────────────────┤
│ 关系类型     │ is-a（是一个）      │ has-a（有一个）     │
│ 耦合度       │ 高（紧耦合）        │ 低（松耦合）        │
│ 灵活性       │ 低（编译时确定）    │ 高（运行时改变）    │
│ 代码复用     │ 白盒复用            │ 黑盒复用            │
│ 扩展性       │ 需要修改父类        │ 只需添加新组件      │
│ 多态支持     │ 天然支持            │ 通过接口实现        │
│ 设计模式倾向 │ 少用                │ 优先使用            │
└──────────────┴─────────────────────┴─────────────────────┘

设计原则：优先使用组合，而非继承（Favor Composition Over Inheritance）
*/`
      },
      {
        title: '接口 vs 抽象类 对比表',
        content: '**接口**和**抽象类**都用于定义规范，但使用场景不同。',
        code: `// 对比总结
/*
┌──────────────┬─────────────────────┬─────────────────────┐
│    特性      │       接口          │      抽象类         │
├──────────────┼─────────────────────┼─────────────────────┤
│ 方法实现     │ 只能有抽象方法      │ 可以有具体方法      │
│ 多继承       │ 一个类可实现多个    │ 只能继承一个        │
│ 构造函数     │ 不能有              │ 可以有              │
│ 访问修饰符   │ 默认 public         │ 任意                │
│ 字段         │ 只能是常量          │ 可以有实例字段      │
│ 使用场景     │ 定义能力/契约       │ 定义模板/骨架       │
│ 设计模式     │ 策略、观察者等      │ 模板方法等          │
└──────────────┴─────────────────────┴─────────────────────┘

选择建议：
- 需要多继承 → 使用接口
- 需要默认实现 → 使用抽象类
- 定义行为契约 → 使用接口
- 代码复用 → 优先考虑组合，其次抽象类
*/`
      }
    ]
  },
  {
    id: 'uml',
    title: 'UML类图基础',
    content: 'UML（统一建模语言）类图是设计模式的图形化表示方式。掌握类图的阅读能力是理解和应用设计模式的关键。',
    subsections: [
      {
        title: '类的表示',
        content: '在UML类图中，类用一个矩形表示，分为三层：类名、属性、方法。+ 表示 public，- 表示 private，# 表示 protected。',
        code: `// Java 类示例
public class Animal {
    private String name;
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
}

public class Dog {
    private String breed;
    
    public void bark() {
        System.out.println("Woof!");
    }
    
    public String getBreed() {
        return breed;
    }
}`,
        language: 'java',
        mermaid: `classDiagram
    class Animal {
        -name: String
        +getName(): String
        +setName(name: String): void
    }
    
    class Dog {
        -breed: String
        +bark(): void
        +getBreed(): String
    }`
      },
      {
        title: '继承（Generalization）',
        content: '继承关系用带空心三角形的实线表示，箭头指向父类。表示"is-a"关系。',
        code: `// Java代码示例
public class Animal {
    protected String name;
}

public class Dog extends Animal {
    public void bark() { }
}`,
        language: 'java',
        mermaid: `classDiagram
    Animal <|-- Dog
    class Animal {
        #name: String
    }
    class Dog {
        +bark(): void
    }`
      },
      {
        title: '实现（Realization）',
        content: '实现关系用带空心三角形的虚线表示，箭头指向接口。表示类实现了接口定义的契约。',
        code: `// Java代码示例
public interface Flyable {
    void fly();
}

public class Bird implements Flyable {
    @Override
    public void fly() { }
}`,
        language: 'java',
        mermaid: `classDiagram
    class Flyable {
        <<interface>>
        +fly(): void
    }
    Flyable <|.. Bird
    class Bird {
        +fly(): void
    }`
      },
      {
        title: '关联（Association）',
        content: '关联关系用实线箭头表示，表示一个类知道另一个类。可以是双向的（无箭头）或单向的（有箭头）。',
        code: `// Java代码示例
public class Teacher {
    private List<Student> students;
}

public class Student {
    // 学生可能知道老师，也可能不知道
}`,
        language: 'java',
        mermaid: `classDiagram
    Teacher "1" --> "0..*" Student : teaches`
      },
      {
        title: '依赖（Dependency）',
        content: '依赖关系用虚线箭头表示，表示一个类临时使用另一个类。通常体现在方法参数、局部变量或返回值中。',
        code: `// Java代码示例
public class Person {
    // Person 依赖 Tool，但 Tool 不是 Person 的成员
    public void useTool(Tool tool) {
        tool.operate();
    }
}`,
        language: 'java',
        mermaid: `classDiagram
    Person ..> Tool : uses`
      },
      {
        title: '聚合（Aggregation）',
        content: '聚合是特殊的关联关系，表示"整体-部分"关系，但部分可以独立存在。用空心菱形表示。',
        code: `// Java代码示例
public class Department {
    private List<Employee> employees;
    
    public Department(List<Employee> employees) {
        this.employees = employees; // 员工可以属于多个部门
    }
}

// 员工可以独立于部门存在
Employee emp = new Employee();
Department dept = new Department(Arrays.asList(emp));`,
        language: 'java',
        mermaid: `classDiagram
    Department o-- Employee : contains`
      },
      {
        title: '组合（Composition）',
        content: '组合是更强的聚合关系，部分不能独立于整体存在。用实心菱形表示。整体销毁时，部分也随之销毁。',
        code: `// Java代码示例
public class Car {
    private Engine engine;
    
    public Car() {
        this.engine = new Engine(); // 引擎在 Car 内部创建
    }
}

// 引擎不能独立于 Car 存在
// Car 销毁时，Engine 也随之销毁`,
        language: 'java',
        mermaid: `classDiagram
    Car *-- Engine : owns`
      },
      {
        title: '综合示例：设计模式中的类图',
        content: '以观察者模式为例，展示一个完整的设计模式类图。',
        mermaid: `classDiagram
    class Subject {
        <<interface>>
        +attach(Observer): void
        +detach(Observer): void
        +notify(): void
    }
    
    class ConcreteSubject {
        -state: String
        +getState(): String
        +setState(state: String): void
    }
    
    class Observer {
        <<interface>>
        +update(): void
    }
    
    class ConcreteObserver {
        -subject: Subject
        +update(): void
    }
    
    Subject <|.. ConcreteSubject
    Observer <|.. ConcreteObserver
    Subject "1" o-- "0..*" Observer : observers
    ConcreteObserver --> ConcreteSubject : observes`
      }
    ]
  },
  {
    id: 'solid',
    title: 'SOLID设计原则',
    content: 'SOLID是面向对象设计的五个基本原则，由罗伯特·C·马丁提出。遵循这些原则可以使软件更易于理解、维护和扩展。',
    subsections: [
      {
        title: '单一职责原则 (SRP)',
        content: '一个类应该只有一个引起它变化的原因。换句话说，一个类应该只负责一项职责。',
        code: `// 违反 SRP：一个类处理太多事情
public class Employee {
    public void calculatePay() { /* 计算工资 */ }
    public void reportHours() { /* 生成报表 */ }
    public void save() { /* 保存到数据库 */ }
}

// 遵循 SRP：职责分离
public class Employee {
    // 只包含员工数据
    private String name;
    private double salary;
    // getters and setters
}

public class PayCalculator {
    public double calculate(Employee employee) { 
        return employee.getSalary(); 
    }
}

public class ReportGenerator {
    public String generate(Employee employee) { 
        return "Report for " + employee.getName(); 
    }
}

public class EmployeeRepository {
    public void save(Employee employee) { 
        // 保存到数据库
    }
}`,
        language: 'java'
      },
      {
        title: '开闭原则 (OCP)',
        content: '软件实体应该对扩展开放，对修改关闭。通过抽象和继承实现新功能，而不是修改现有代码。',
        code: `// 违反 OCP：每次新类型都要修改
public class AreaCalculator {
    public double calculate(Object shape) {
        if (shape instanceof Rectangle) {
            Rectangle r = (Rectangle) shape;
            return r.getWidth() * r.getHeight();
        } else if (shape instanceof Circle) {
            Circle c = (Circle) shape;
            return Math.PI * c.getRadius() * c.getRadius();
        }
        // 新增类型需要修改这里
        return 0;
    }
}

// 遵循 OCP：通过扩展添加新类型
public interface Shape {
    double getArea();
}

public class Rectangle implements Shape {
    @Override
    public double getArea() { 
        return width * height; 
    }
}

public class Circle implements Shape {
    @Override
    public double getArea() { 
        return Math.PI * radius * radius; 
    }
}

// 新增三角形，无需修改现有代码
public class Triangle implements Shape {
    @Override
    public double getArea() { 
        return 0.5 * base * height; 
    }
}`,
        language: 'java'
      },
      {
        title: '里氏替换原则 (LSP)',
        content: '子类型必须能够替换其基类型，而程序的行为不变。这是确保继承关系正确使用的重要原则。',
        code: `// 违反 LSP：正方形不能替代矩形
public class Rectangle {
    protected int width;
    protected int height;
    
    public void setWidth(int w) { this.width = w; }
    public void setHeight(int h) { this.height = h; }
    public int getArea() { return width * height; }
}

public class Square extends Rectangle {
    // 正方形要求宽高相等
    @Override
    public void setWidth(int w) {
        this.width = w;
        this.height = w; // 副作用！
    }
}

// 遵循 LSP：使用接口而非继承
public interface Shape {
    int getArea();
}

public class Rectangle implements Shape {
    private int width;
    private int height;
    
    public Rectangle(int w, int h) {
        this.width = w;
        this.height = h;
    }
    
    @Override
    public int getArea() { return width * height; }
}

public class Square implements Shape {
    private int side;
    
    public Square(int s) {
        this.side = s;
    }
    
    @Override
    public int getArea() { return side * side; }
}`,
        language: 'java'
      },
      {
        title: '接口隔离原则 (ISP)',
        content: '客户端不应该被迫依赖它们不使用的方法。应该将大接口拆分为多个小接口。',
        code: `// 违反 ISP：胖接口
public interface Worker {
    void work();
    void eat();
    void sleep();
}

// 机器人被迫实现 eat 和 sleep
public class Robot implements Worker {
    @Override
    public void work() { /* OK */ }
    
    @Override
    public void eat() { /* 机器人不需要 */ }
    
    @Override
    public void sleep() { /* 机器人不需要 */ }
}

// 遵循 ISP：拆分接口
public interface Workable {
    void work();
}

public interface Feedable {
    void eat();
    void sleep();
}

public class Human implements Workable, Feedable {
    @Override
    public void work() { }
    @Override
    public void eat() { }
    @Override
    public void sleep() { }
}

public class Robot implements Workable {
    @Override
    public void work() { }
    // 不需要实现 Feedable
}`,
        language: 'java'
      },
      {
        title: '依赖倒置原则 (DIP)',
        content: '高层模块不应该依赖低层模块，两者都应该依赖抽象。抽象不应该依赖细节，细节应该依赖抽象。',
        code: `// 违反 DIP：高层直接依赖低层
public class Application {
    private MySQLDatabase database = new MySQLDatabase(); // 直接依赖具体实现
}

public class MySQLDatabase {
    public void query(String sql) { }
}

// 遵循 DIP：依赖抽象
public interface Database {
    void query(String sql);
}

public class MySQLDatabase implements Database {
    @Override
    public void query(String sql) { }
}

public class PostgreSQLDatabase implements Database {
    @Override
    public void query(String sql) { }
}

public class Application {
    private Database database;
    
    public Application(Database database) {
        this.database = database; // 依赖注入
    }
}

// 可以在运行时切换数据库
Application app = new Application(new MySQLDatabase());
Application app2 = new Application(new PostgreSQLDatabase());`,
        language: 'java'
      }
    ]
  },
  {
    id: 'terms',
    title: '常见术语',
    content: '理解设计模式中的常用术语，有助于更好地阅读和交流设计模式相关的知识。',
    subsections: [
      {
        title: '耦合 (Coupling)',
        content: '模块之间的相互依赖程度。低耦合意味着模块间依赖少，修改一个模块对其他模块影响小。设计模式的目标之一就是降低耦合。'
      },
      {
        title: '内聚 (Cohesion)',
        content: '模块内部各元素之间的关联程度。高内聚意味着模块功能单一、职责明确。高内聚通常伴随着低耦合。'
      },
      {
        title: '扩展点 (Extension Point)',
        content: '在软件设计中预留的接口或抽象类，允许在不修改现有代码的情况下添加新功能。设计模式通常围绕扩展点展开。'
      },
      {
        title: '框架 vs 库',
        content: '库是一组你可以调用的工具函数，控制权在你。框架是一个骨架，你填充代码，控制权在框架。设计模式常用于框架的设计。'
      },
      {
        title: '客户端 (Client)',
        content: '在设计模式语境中，指使用某个类、接口或系统的代码。不一定是最终用户，而是调用方代码。'
      },
      {
        title: '具体类 vs 抽象类',
        content: '具体类可以直接实例化，包含完整实现。抽象类不能直接实例化，通常包含抽象方法，需要子类实现。设计模式鼓励面向抽象编程。'
      },
      {
        title: '委托 (Delegation)',
        content: '一个对象将某个操作交给另一个对象来处理。这是实现复用的一种方式，也是许多设计模式的基础。'
      },
      {
        title: '变化点 (Variation Point)',
        content: '软件中可能发生变化的地方。设计模式的核心思想就是封装变化点，使系统更易于应对需求变更。'
      }
    ]
  },
  {
    id: 'misconceptions',
    title: '常见误区',
    content: '在学习面向对象和设计模式的过程中，有一些常见的误解和误用。了解这些误区可以帮助你避免走弯路。',
    subsections: [
      {
        title: '误区一：过度使用继承',
        content: '很多初学者认为继承是代码复用的最佳方式，于是到处使用继承。实际上，继承是紧耦合的，父类的改变会影响所有子类。设计模式更推荐组合而非继承。',
        code: `// 错误示范：过度使用继承
class Animal { }
class Mammal extends Animal { }
class Dog extends Mammal { }
class Poodle extends Dog { }  // 继承层次太深！

// 正确做法：优先考虑组合
class Dog {
    private AnimalType type;
    private FurType fur;
    // 通过组合获得特性
}`
      },
      {
        title: '误区二：把所有代码都放到一个类',
        content: '这是典型的"上帝类"（God Class）反模式。一个类做了太多事情，违反了单一职责原则。应该将功能拆分到多个小类中。'
      },
      {
        title: '误区三：过度设计',
        content: '为了使用设计模式而使用设计模式，会让简单的代码变得复杂。设计模式是用来解决特定问题的，没有问题就不要强行套用。记住：KISS原则（Keep It Simple, Stupid）。'
      },
      {
        title: '误区四：忽视接口隔离',
        content: '创建大而全的接口，强迫客户端依赖它们不需要的方法。应该将大接口拆分为多个小接口，每个接口只包含相关的方法。'
      },
      {
        title: '误区五：滥用单例模式',
        content: '单例模式虽然简单，但会引入全局状态，使代码难以测试。在现代开发中，依赖注入通常是更好的选择。'
      },
      {
        title: '误区六：认为设计模式是银弹',
        content: '设计模式是解决特定问题的经验总结，不是万能的。盲目套用设计模式而不理解其背后的思想，会导致代码质量下降。'
      }
    ]
  },
  {
    id: 'tips',
    title: '学习建议',
    content: '掌握以下学习方法和技巧，可以帮助你更高效地理解和应用设计模式。',
    subsections: [
      {
        title: '如何阅读类图',
        content: '1. **先看类名**：了解每个类的职责\n2. **再看关系**：理解类之间的关联、继承、依赖关系\n3. **关注交互**：顺着方法调用关系理解协作流程\n4. **对照代码**：将类图与实际代码对照，加深理解'
      },
      {
        title: '如何理解设计原则',
        content: '1. **先理解问题**：每个原则都是为了解决特定问题\n2. **看正例反例**：对比遵循和违反原则的例子\n3. **实践应用**：在实际项目中尝试应用\n4. **反思总结**：思考原则带来的好处和代价'
      },
      {
        title: '学习设计模式的正确姿势',
        content: '1. **先学思想**：理解面向对象设计原则\n2. **再学模式**：学习具体的设计模式\n3. **看实际应用**：研究框架源码中的应用\n4. **动手实践**：在自己的项目中尝试使用\n5. **反思总结**：思考什么场景适合什么模式'
      },
      {
        title: '推荐学习资源',
        content: '**书籍**：\n- 《Head First 设计模式》（入门首选）\n- 《设计模式：可复用面向对象软件的基础》（GoF经典）\n- 《重构：改善既有代码的设计》\n\n**网站**：\n- Refactoring.Guru（图文并茂）\n- Java Design Patterns（实际案例）\n\n**实践**：\n- 阅读 Spring、JDK 源码\n- 参与开源项目\n- 重构自己的项目'
      }
    ]
  }
];

// 获取所有章节ID（用于导航）
export const sectionIds = prerequisiteSections.map(s => s.id);

// 章节标题映射
export const sectionTitles: Record<string, string> = prerequisiteSections.reduce((acc, s) => {
  acc[s.id] = s.title;
  return acc;
}, {} as Record<string, string>);
