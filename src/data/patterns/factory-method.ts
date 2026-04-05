import type { DesignPattern } from '@/types/pattern';

export const factoryMethodPattern: DesignPattern = {
  id: 'factory-method',
  name: '工厂方法模式',
  nameEn: 'Factory Method Pattern',
  category: 'creational',
  difficulty: 'easy',
  frequency: 'high',
  intent: '定义一个用于创建对象的接口，让子类决定实例化哪一个类。工厂方法使一个类的实例化延迟到其子类。',
  description: '工厂方法模式是一种创建型设计模式，它提供了一种将实例化逻辑委托给子类的方式。这样可以在不修改现有代码的情况下引入新类型的产品。',
  applicability: [
    '当一个类不知道它所必须创建的对象的类时',
    '当一个类希望由它的子类来指定它所创建的对象时',
    '当类将创建对象的职责委托给多个帮助子类中的某一个，并且你希望将哪一个帮助子类是代理者这一信息局部化时',
  ],
  pros: [
    '避免了创建者和具体产品之间的紧密耦合',
    '单一职责原则：将产品创建代码放在一个地方，使代码更容易维护',
    '开闭原则：无需更改现有客户端代码，就可以在程序中引入新的产品类型',
  ],
  cons: [
    '代码可能变得更加复杂，因为需要引入许多新的子类',
    '可能需要修改客户端代码以支持新的具体创建者类',
  ],
  analogy: {
    title: '现实世界中的工厂方法',
    description: '工厂方法就像是现实世界中的各种工厂和生产线',
    scenarios: [
      {
        id: 'restaurant',
        title: '餐厅点餐',
        description: '你去餐厅点餐，只需要告诉服务员你想吃什么（接口），具体由哪个厨师（子类）来做、怎么做，你不需要关心。',
        icon: 'Utensils',
      },
      {
        id: 'logistics',
        title: '物流公司',
        description: '物流公司提供运输服务，根据客户需求选择卡车、轮船或飞机来运输，客户只需要知道货物会被运输即可。',
        icon: 'Truck',
      },
    ],
  },
  structure: {
    classDiagram: `
      class Creator {
        +factoryMethod(): Product
        +operation()
      }
      class ConcreteCreator {
        +factoryMethod(): Product
      }
      class Product {
        +use()
      }
      class ConcreteProduct {
        +use()
      }
      Creator --> Product
      ConcreteCreator --> ConcreteProduct
    `,
    mermaidDiagram: `
classDiagram
  class Product {
    <<interface>>
    +use()
  }
  class ConcreteProductA {
    +use()
  }
  class ConcreteProductB {
    +use()
  }
  class Creator {
    <<abstract>>
    +factoryMethod() Product
    +operation()
  }
  class ConcreteCreatorA {
    +factoryMethod() Product
  }
  class ConcreteCreatorB {
    +factoryMethod() Product
  }
  
  Product <|.. ConcreteProductA
  Product <|.. ConcreteProductB
  Creator <|-- ConcreteCreatorA
  Creator <|-- ConcreteCreatorB
  Creator ..> Product : creates
  ConcreteCreatorA ..> ConcreteProductA : creates
  ConcreteCreatorB ..> ConcreteProductB : creates
  
  style Product fill:#fff3e0,stroke:#f57c00,stroke-width:2px,stroke-dasharray: 5 5
  style Creator fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
  style ConcreteProductA fill:#e3f2fd,stroke:#1976d2
  style ConcreteProductB fill:#e3f2fd,stroke:#1976d2
  style ConcreteCreatorA fill:#f3e5f5,stroke:#7b1fa2
  style ConcreteCreatorB fill:#f3e5f5,stroke:#7b1fa2
    `,
    animationSteps: [],
  },
  implementation: {
    typescript: `/**
 * 工厂方法模式 - TypeScript 实现
 * 使用抽象类和接口实现
 */

// 产品接口
interface Product {
  use(): void;
  getName(): string;
}

// 具体产品 A
class ConcreteProductA implements Product {
  private name: string = "产品 A";

  use(): void {
    console.log(\`使用 \${this.name}\`);
  }

  getName(): string {
    return this.name;
  }
}

// 具体产品 B
class ConcreteProductB implements Product {
  private name: string = "产品 B";

  use(): void {
    console.log(\`使用 \${this.name}\`);
  }

  getName(): string {
    return this.name;
  }
}

// 创建者抽象类
abstract class Creator {
  /**
   * 工厂方法 - 由子类实现
   */
  abstract factoryMethod(): Product;

  /**
   * 业务逻辑 - 使用工厂方法创建的产品
   */
  operation(): void {
    const product = this.factoryMethod();
    console.log(\`创建者：我现在正在使用 \${product.getName()}\`);
    product.use();
  }
}

// 具体创建者 A
class ConcreteCreatorA extends Creator {
  factoryMethod(): Product {
    return new ConcreteProductA();
  }
}

// 具体创建者 B
class ConcreteCreatorB extends Creator {
  factoryMethod(): Product {
    return new ConcreteProductB();
  }
}

/**
 * 工厂方法模式 - 函数式实现（TypeScript 特色）
 * 使用函数而非类来实现工厂
 */
type ProductFactory = () => Product;

function createProductA(): Product {
  return new ConcreteProductA();
}

function createProductB(): Product {
  return new ConcreteProductB();
}

// 使用工厂函数
function clientCodeWithFactory(factory: ProductFactory): void {
  const product = factory();
  product.use();
}

// 使用示例
function clientCode(): void {
  console.log("=== 类方式实现 ===");
  
  const creatorA = new ConcreteCreatorA();
  creatorA.operation();
  
  const creatorB = new ConcreteCreatorB();
  creatorB.operation();
  
  console.log("\\n=== 函数式实现 ===");
  
  clientCodeWithFactory(createProductA);
  clientCodeWithFactory(createProductB);
}

clientCode();`,

    java: `/**
 * 工厂方法模式 - Java 实现
 * 使用抽象类和接口实现
 */

// 产品接口
public interface Product {
    void use();
    String getName();
}

// 具体产品 A
public class ConcreteProductA implements Product {
    private String name = "产品 A";

    @Override
    public void use() {
        System.out.println("使用 " + name);
    }

    @Override
    public String getName() {
        return name;
    }
}

// 具体产品 B
public class ConcreteProductB implements Product {
    private String name = "产品 B";

    @Override
    public void use() {
        System.out.println("使用 " + name);
    }

    @Override
    public String getName() {
        return name;
    }
}

// 创建者抽象类
public abstract class Creator {
    /**
     * 工厂方法 - 由子类实现
     */
    public abstract Product factoryMethod();

    /**
     * 业务逻辑 - 使用工厂方法创建的产品
     */
    public void operation() {
        Product product = factoryMethod();
        System.out.println("创建者：我现在正在使用 " + product.getName());
        product.use();
    }
}

// 具体创建者 A
public class ConcreteCreatorA extends Creator {
    @Override
    public Product factoryMethod() {
        return new ConcreteProductA();
    }
}

// 具体创建者 B
public class ConcreteCreatorB extends Creator {
    @Override
    public Product factoryMethod() {
        return new ConcreteProductB();
    }
}

/**
 * 工厂方法模式 - 使用函数式接口（Java 8+）
 * 使用 Supplier 函数式接口实现工厂
 */
import java.util.function.Supplier;

public class FunctionalFactory {
    /**
     * 使用 Supplier 作为工厂方法
     */
    public static Product createProduct(Supplier<Product> factory) {
        return factory.get();
    }
    
    public static void main(String[] args) {
        // 使用 Lambda 表达式作为工厂
        Product productA = createProduct(ConcreteProductA::new);
        Product productB = createProduct(ConcreteProductB::new);
        
        productA.use();
        productB.use();
    }
}

// 客户端代码
public class Client {
    public static void main(String[] args) {
        System.out.println("=== 类方式实现 ===");
        
        Creator creatorA = new ConcreteCreatorA();
        creatorA.operation();
        
        Creator creatorB = new ConcreteCreatorB();
        creatorB.operation();
        
        System.out.println("\\n=== 函数式实现 ===");
        
        Product productA = FunctionalFactory.createProduct(ConcreteProductA::new);
        Product productB = FunctionalFactory.createProduct(ConcreteProductB::new);
        
        productA.use();
        productB.use();
    }
}`,

    go: `package factory

import (
	"fmt"
)

/**
 * 工厂方法模式 - Go 实现
 * 使用 interface 和 struct 实现
 */

// Product 接口
type Product interface {
	Use()
	GetName() string
}

// ConcreteProductA 具体产品 A
type ConcreteProductA struct {
	name string
}

func NewConcreteProductA() *ConcreteProductA {
	return &ConcreteProductA{name: "产品 A"}
}

func (p *ConcreteProductA) Use() {
	fmt.Printf("使用 %s\\n", p.name)
}

func (p *ConcreteProductA) GetName() string {
	return p.name
}

// ConcreteProductB 具体产品 B
type ConcreteProductB struct {
	name string
}

func NewConcreteProductB() *ConcreteProductB {
	return &ConcreteProductB{name: "产品 B"}
}

func (p *ConcreteProductB) Use() {
	fmt.Printf("使用 %s\\n", p.name)
}

func (p *ConcreteProductB) GetName() string {
	return p.name
}

// Creator 接口
type Creator interface {
	FactoryMethod() Product
	Operation()
}

// ConcreteCreatorA 具体创建者 A
type ConcreteCreatorA struct{}

func (c *ConcreteCreatorA) FactoryMethod() Product {
	return NewConcreteProductA()
}

func (c *ConcreteCreatorA) Operation() {
	product := c.FactoryMethod()
	fmt.Printf("创建者：我现在正在使用 %s\\n", product.GetName())
	product.Use()
}

// ConcreteCreatorB 具体创建者 B
type ConcreteCreatorB struct{}

func (c *ConcreteCreatorB) FactoryMethod() Product {
	return NewConcreteProductB()
}

func (c *ConcreteCreatorB) Operation() {
	product := c.FactoryMethod()
	fmt.Printf("创建者：我现在正在使用 %s\\n", product.GetName())
	product.Use()
}

/**
 * 工厂方法模式 - 使用函数类型（Go 特色）
 * 使用函数作为工厂
 */
type ProductFactory func() Product

func ClientCodeWithFactory(factory ProductFactory) {
	product := factory()
	product.Use()
}

// 使用示例
func ClientCode() {
	fmt.Println("=== 类方式实现 ===")
	
	creatorA := &ConcreteCreatorA{}
	creatorA.Operation()
	
	creatorB := &ConcreteCreatorB{}
	creatorB.Operation()
	
	fmt.Println("\\n=== 函数式实现 ===")
	
	ClientCodeWithFactory(NewConcreteProductA)
	ClientCodeWithFactory(NewConcreteProductB)
}`,

    python: `from abc import ABC, abstractmethod
from typing import Callable

/**
 * 工厂方法模式 - Python 实现
 * 使用抽象基类实现
 */

# 产品接口
class Product(ABC):
    @abstractmethod
    def use(self) -> None:
        pass
    
    @abstractmethod
    def get_name(self) -> str:
        pass

# 具体产品 A
class ConcreteProductA(Product):
    def __init__(self):
        self._name = "产品 A"
    
    def use(self) -> None:
        print(f"使用 {self._name}")
    
    def get_name(self) -> str:
        return self._name

# 具体产品 B
class ConcreteProductB(Product):
    def __init__(self):
        self._name = "产品 B"
    
    def use(self) -> None:
        print(f"使用 {self._name}")
    
    def get_name(self) -> str:
        return self._name

# 创建者抽象类
class Creator(ABC):
    """
    创建者抽象类
    """
    
    @abstractmethod
    def factory_method(self) -> Product:
        """
        工厂方法 - 由子类实现
        """
        pass
    
    def operation(self) -> None:
        """
        业务逻辑 - 使用工厂方法创建的产品
        """
        product = self.factory_method()
        print(f"创建者：我现在正在使用 {product.get_name()}")
        product.use()

# 具体创建者 A
class ConcreteCreatorA(Creator):
    def factory_method(self) -> Product:
        return ConcreteProductA()

# 具体创建者 B
class ConcreteCreatorB(Creator):
    def factory_method(self) -> Product:
        return ConcreteProductB()

/**
 * 工厂方法模式 - 使用函数（Python 特色）
 * 使用函数作为工厂
 */
ProductFactory = Callable[[], Product]

def client_code_with_factory(factory: ProductFactory) -> None:
    product = factory()
    product.use()

# 使用示例
def client_code():
    print("=== 类方式实现 ===")
    
    creator_a = ConcreteCreatorA()
    creator_a.operation()
    
    creator_b = ConcreteCreatorB()
    creator_b.operation()
    
    print("\\n=== 函数式实现 ===")
    
    client_code_with_factory(ConcreteProductA)
    client_code_with_factory(ConcreteProductB)

if __name__ == "__main__":
    client_code()`,

    cpp: `/**
 * 工厂方法模式 - C++ 实现
 * 使用抽象类和虚函数实现
 */

#include <iostream>
#include <memory>
#include <string>

// 产品接口
class Product {
public:
    virtual void use() = 0;
    virtual std::string getName() const = 0;
    virtual ~Product() = default;
};

// 具体产品 A
class ConcreteProductA : public Product {
private:
    std::string name = "产品 A";

public:
    void use() override {
        std::cout << "使用 " << name << std::endl;
    }

    std::string getName() const override {
        return name;
    }
};

// 具体产品 B
class ConcreteProductB : public Product {
private:
    std::string name = "产品 B";

public:
    void use() override {
        std::cout << "使用 " << name << std::endl;
    }

    std::string getName() const override {
        return name;
    }
};

// 创建者抽象类
class Creator {
public:
    /**
     * 工厂方法 - 由子类实现
     */
    virtual std::unique_ptr<Product> factoryMethod() = 0;

    /**
     * 业务逻辑 - 使用工厂方法创建的产品
     */
    void operation() {
        auto product = factoryMethod();
        std::cout << "创建者：我现在正在使用 " << product->getName() << std::endl;
        product->use();
    }

    virtual ~Creator() = default;
};

// 具体创建者 A
class ConcreteCreatorA : public Creator {
public:
    std::unique_ptr<Product> factoryMethod() override {
        return std::make_unique<ConcreteProductA>();
    }
};

// 具体创建者 B
class ConcreteCreatorB : public Creator {
public:
    std::unique_ptr<Product> factoryMethod() override {
        return std::make_unique<ConcreteProductB>();
    }
};

/**
 * 工厂方法模式 - 使用函数指针/函数对象（C++ 特色）
 * 使用 std::function 作为工厂
 */
#include <functional>

using ProductFactory = std::function<std::unique_ptr<Product>()>;

std::unique_ptr<Product> createProductA() {
    return std::make_unique<ConcreteProductA>();
}

std::unique_ptr<Product> createProductB() {
    return std::make_unique<ConcreteProductB>();
}

void clientCodeWithFactory(const ProductFactory& factory) {
    auto product = factory();
    product->use();
}

// 使用示例
int main() {
    std::cout << "=== 类方式实现 ===" << std::endl;
    
    std::unique_ptr<Creator> creatorA = std::make_unique<ConcreteCreatorA>();
    creatorA->operation();
    
    std::unique_ptr<Creator> creatorB = std::make_unique<ConcreteCreatorB>();
    creatorB->operation();
    
    std::cout << "\\n=== 函数式实现 ===" << std::endl;
    
    clientCodeWithFactory(createProductA);
    clientCodeWithFactory(createProductB);
    
    return 0;
}`,
  },
  realWorldExamples: [
    {
      title: 'Java Collection Framework',
      description: 'Java 中的 Iterator 方法就是一个工厂方法，不同的集合类型返回不同的迭代器实现。',
      source: 'JDK',
      codeSnippet: `List<String> list = new ArrayList<>();
Iterator<String> iterator = list.iterator(); // 工厂方法`,
    },
    {
      title: 'Spring Framework',
      description: 'Spring 中的 FactoryBean 接口允许开发者自定义 Bean 的创建逻辑。',
      source: 'Spring',
      codeSnippet: `public interface FactoryBean<T> {
    T getObject() throws Exception;
}`,
    },
  ],
  relatedPatterns: ['singleton', 'abstract-factory', 'template-method'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '工厂方法模式的核心思想是什么？',
      options: [
        '直接创建对象实例',
        '将对象的创建延迟到子类',
        '使用静态方法创建对象',
        '通过构造函数创建对象',
      ],
      correctAnswer: 1,
      explanation: '工厂方法模式的核心是将对象的实例化延迟到子类，由子类决定创建哪种具体产品。',
    },
  ],
};
