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
    animationSteps: [],
  },
  implementation: {
    typescript: `// 产品接口
interface Product {
  use(): void;
}

// 具体产品
class ConcreteProductA implements Product {
  use() {
    console.log('使用产品 A');
  }
}

class ConcreteProductB implements Product {
  use() {
    console.log('使用产品 B');
  }
}

// 创建者抽象类
abstract class Creator {
  abstract factoryMethod(): Product;

  operation(): void {
    const product = this.factoryMethod();
    product.use();
  }
}

// 具体创建者
class ConcreteCreatorA extends Creator {
  factoryMethod(): Product {
    return new ConcreteProductA();
  }
}

class ConcreteCreatorB extends Creator {
  factoryMethod(): Product {
    return new ConcreteProductB();
  }
}

// 使用
const creatorA = new ConcreteCreatorA();
creatorA.operation(); // 输出: 使用产品 A`,

    java: `// 产品接口
public interface Product {
    void use();
}

// 具体产品
public class ConcreteProductA implements Product {
    @Override
    public void use() {
        System.out.println("使用产品 A");
    }
}

// 创建者抽象类
public abstract class Creator {
    public abstract Product factoryMethod();
    
    public void operation() {
        Product product = factoryMethod();
        product.use();
    }
}

// 具体创建者
public class ConcreteCreatorA extends Creator {
    @Override
    public Product factoryMethod() {
        return new ConcreteProductA();
    }
}`,

    go: `package factory

// Product 接口
type Product interface {
    Use()
}

// ConcreteProductA 具体产品
type ConcreteProductA struct{}

func (p *ConcreteProductA) Use() {
    println("使用产品 A")
}

// Creator 接口
type Creator interface {
    FactoryMethod() Product
    Operation()
}

// ConcreteCreatorA 具体创建者
type ConcreteCreatorA struct{}

func (c *ConcreteCreatorA) FactoryMethod() Product {
    return &ConcreteProductA{}
}

func (c *ConcreteCreatorA) Operation() {
    product := c.FactoryMethod()
    product.Use()
}`,

    python: `from abc import ABC, abstractmethod

# 产品接口
class Product(ABC):
    @abstractmethod
    def use(self):
        pass

# 具体产品
class ConcreteProductA(Product):
    def use(self):
        print("使用产品 A")

# 创建者抽象类
class Creator(ABC):
    @abstractmethod
    def factory_method(self) -> Product:
        pass
    
    def operation(self):
        product = self.factory_method()
        product.use()

# 具体创建者
class ConcreteCreatorA(Creator):
    def factory_method(self) -> Product:
        return ConcreteProductA()`,

    cpp: `// 产品接口
class Product {
public:
    virtual void use() = 0;
    virtual ~Product() = default;
};

// 具体产品
class ConcreteProductA : public Product {
public:
    void use() override {
        std::cout << "使用产品 A" << std::endl;
    }
};

// 创建者抽象类
class Creator {
public:
    virtual Product* factoryMethod() = 0;
    
    void operation() {
        Product* product = factoryMethod();
        product->use();
    }
    
    virtual ~Creator() = default;
};

// 具体创建者
class ConcreteCreatorA : public Creator {
public:
    Product* factoryMethod() override {
        return new ConcreteProductA();
    }
};`,
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
