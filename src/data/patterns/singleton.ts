import type { DesignPattern } from '@/types/pattern';

export const singletonPattern: DesignPattern = {
  id: 'singleton',
  name: '单例模式',
  nameEn: 'Singleton Pattern',
  category: 'creational',
  difficulty: 'easy',
  frequency: 'high',
  intent: '确保一个类只有一个实例，并提供一个全局访问点',
  description: '单例模式是一种创建型设计模式，它确保一个类只有一个实例存在，并提供一个全局访问点来访问这个实例。这种模式在需要控制资源访问、配置管理、日志记录等场景中非常有用。',
  applicability: [
    '当类只能有一个实例，且客户端需要从众所周知的访问点访问它时',
    '当这个唯一实例应该通过子类化进行扩展，且客户端应该能够使用扩展实例而不需要修改代码时',
    '需要控制共享资源的并发访问时',
    '需要全局配置或状态管理时',
  ],
  pros: [
    '保证一个类只有一个实例，节省系统资源',
    '提供对唯一实例的全局访问点',
    '可以延迟实例化（懒加载），提高启动性能',
    '避免对共享资源的重复初始化',
  ],
  cons: [
    '违反单一职责原则，单例类同时负责创建和管理自己的实例',
    '可能隐藏类之间的依赖关系，使代码难以测试',
    '在多线程环境下需要特殊处理（同步）',
    '难以扩展或修改，因为所有客户端都依赖于单例的具体类',
  ],
  analogy: {
    title: '现实世界中的单例',
    description: '单例模式就像是现实世界中的某些独特资源或职位',
    scenarios: [
      {
        id: 'president',
        title: '国家主席',
        description: '一个国家只有一个国家主席，所有公民都通过同一个"访问点"来认识这位主席。无论你在哪里提到"国家主席"，指的都是同一个人。',
        icon: 'UserCrown',
      },
      {
        id: 'printer',
        title: '打印机后台处理程序',
        description: '操作系统中的打印机后台处理程序是单例的。无论有多少个应用程序想要打印，都通过同一个打印队列来管理，避免打印任务混乱。',
        icon: 'Printer',
      },
      {
        id: 'settings',
        title: '手机系统设置',
        description: '手机中的系统设置应用是单例的。无论你从哪个入口打开设置，都是同一个应用实例，确保设置的一致性。',
        icon: 'Settings',
      },
    ],
  },
  structure: {
    classDiagram: `
      class Singleton {
        -static instance: Singleton
        -constructor()
        +static getInstance(): Singleton
        +businessLogic()
      }
    `,
    animationSteps: [
      {
        id: 'step1',
        title: '私有构造函数',
        description: '将构造函数设为私有，防止外部直接创建实例',
        duration: 2000,
        elements: [
          { id: 'singleton', type: 'class', name: 'Singleton', x: 200, y: 150, properties: ['-instance: Singleton'], methods: ['-Singleton()', '+getInstance()', '+businessLogic()'] },
        ],
      },
      {
        id: 'step2',
        title: '静态实例字段',
        description: '类内部维护一个静态的私有实例字段',
        duration: 2000,
        elements: [
          { id: 'singleton', type: 'class', name: 'Singleton', x: 200, y: 150, properties: ['-instance: Singleton'], methods: ['-Singleton()', '+getInstance()', '+businessLogic()'] },
        ],
      },
      {
        id: 'step3',
        title: '全局访问点',
        description: '通过静态方法 getInstance() 提供全局访问点',
        duration: 3000,
        elements: [
          { id: 'singleton', type: 'class', name: 'Singleton', x: 200, y: 150, properties: ['-instance: Singleton'], methods: ['-Singleton()', '+getInstance()', '+businessLogic()'] },
          { id: 'client', type: 'class', name: 'Client', x: 450, y: 150, methods: ['main()'] },
        ],
        connections: [
          { from: 'client', to: 'singleton', type: 'dependency', label: 'getInstance()' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `class Singleton {
  private static instance: Singleton;
  private data: string;

  // 私有构造函数，防止外部实例化
  private constructor() {
    this.data = "单例数据";
  }

  // 全局访问点
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public businessLogic(): void {
    console.log("执行业务逻辑");
  }

  public getData(): string {
    return this.data;
  }
}

// 使用示例
const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();

// 验证是同一个实例
console.log(singleton1 === singleton2); // true`,

    java: `public class Singleton {
    private static Singleton instance;
    private String data;

    // 私有构造函数
    private Singleton() {
        this.data = "单例数据";
    }

    // 线程安全的全局访问点
    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }

    public void businessLogic() {
        System.out.println("执行业务逻辑");
    }

    public String getData() {
        return data;
    }
}`,

    go: `package singleton

type Singleton struct {
    data string
}

var instance *Singleton

// 获取单例实例（非线程安全版本）
func GetInstance() *Singleton {
    if instance == nil {
        instance = &Singleton{data: "单例数据"}
    }
    return instance
}

func (s *Singleton) BusinessLogic() {
    println("执行业务逻辑")
}

func (s *Singleton) GetData() string {
    return s.data
}`,

    python: `class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.data = "单例数据"
        return cls._instance

    def business_logic(self):
        print("执行业务逻辑")

    def get_data(self):
        return self.data

# 使用示例
singleton1 = Singleton()
singleton2 = Singleton()
print(singleton1 is singleton2)  # True`,

    cpp: `#include <iostream>
#include <memory>

class Singleton {
private:
    static std::shared_ptr<Singleton> instance;
    std::string data;

    // 私有构造函数
    Singleton() : data("单例数据") {}

public:
    // 删除拷贝构造函数和赋值操作符
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;

    static std::shared_ptr<Singleton> getInstance() {
        if (!instance) {
            instance = std::shared_ptr<Singleton>(new Singleton());
        }
        return instance;
    }

    void businessLogic() {
        std::cout << "执行业务逻辑" << std::endl;
    }

    std::string getData() {
        return data;
    }
};

std::shared_ptr<Singleton> Singleton::instance = nullptr;`,
  },
  realWorldExamples: [
    {
      title: 'Spring Framework - Bean 容器',
      description: 'Spring 的 ApplicationContext 通常以单例模式管理 Bean，确保每个 Bean 在容器中只有一个实例（默认作用域）。',
      source: 'Spring Framework',
      codeSnippet: `@Service
public class UserService {
    // Spring 默认以单例模式管理此服务
}`,
    },
    {
      title: 'Java Runtime 类',
      description: 'Java 标准库中的 Runtime 类使用单例模式，每个 Java 应用程序只有一个 Runtime 对象。',
      source: 'JDK',
      codeSnippet: `Runtime runtime = Runtime.getRuntime();
long memory = runtime.freeMemory();`,
    },
    {
      title: '日志记录器',
      description: '许多日志框架（如 Log4j、SLF4J）使用单例模式管理日志配置和输出。',
      source: 'Logging Frameworks',
      codeSnippet: `private static final Logger logger = 
    LoggerFactory.getLogger(MyClass.class);`,
    },
  ],
  relatedPatterns: ['factory-method', 'abstract-factory', 'builder'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '单例模式的主要目的是什么？',
      options: [
        '提高代码的可读性',
        '确保一个类只有一个实例并提供全局访问点',
        '减少代码的复杂度',
        '增加系统的可扩展性',
      ],
      correctAnswer: 1,
      explanation: '单例模式的核心目的是确保一个类在整个应用程序中只有一个实例存在，并提供一个全局的访问点来获取这个实例。',
    },
    {
      id: 'q2',
      type: 'boolean',
      question: '单例模式的构造函数必须是私有的',
      options: ['正确', '错误'],
      correctAnswer: 0,
      explanation: '正确。将构造函数设为私有可以防止外部通过 new 关键字直接创建实例，这是实现单例模式的关键。',
    },
    {
      id: 'q3',
      type: 'single',
      question: '以下哪个不是单例模式的缺点？',
      options: [
        '违反单一职责原则',
        '可能隐藏类之间的依赖关系',
        '保证实例的唯一性',
        '在多线程环境下需要特殊处理',
      ],
      correctAnswer: 2,
      explanation: '"保证实例的唯一性"是单例模式的优点而非缺点。其他选项都是单例模式可能带来的问题。',
    },
  ],
};
