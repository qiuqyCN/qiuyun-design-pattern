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
    mermaidDiagram: `
classDiagram
  class Singleton {
    -Singleton instance
    -Singleton()
    +getInstance() Singleton
    +businessLogic()
  }
  class Client {
    +main()
  }
  Client ..> Singleton : uses
  
  style Singleton fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
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
    typescript: `/**
 * 单例模式 - 双重检查锁定（Double-Checked Locking）
 * 兼顾线程安全和性能，延迟加载
 */
class Singleton {
  private static instance: Singleton | null = null;
  private data: string;

  // 私有构造函数，防止外部实例化
  private constructor() {
    this.data = "单例数据";
  }

  /**
   * 双重检查锁定的全局访问点
   * 第一次检查避免不必要的同步，第二次检查确保线程安全
   */
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      // 使用同步块模拟锁（TypeScript/JavaScript 单线程，实际不需要）
      if (!Singleton.instance) {
        Singleton.instance = new Singleton();
      }
    }
    return Singleton.instance;
  }

  public businessLogic(): void {
    console.log("执行业务逻辑:", this.data);
  }

  public getData(): string {
    return this.data;
  }
}

/**
 * 单例模式 - 静态属性方式（最简洁）
 * 类加载时即创建实例，线程安全
 */
class SingletonEager {
  private static instance: SingletonEager = new SingletonEager();
  private data: string = "饿汉式单例";

  private constructor() {}

  public static getInstance(): SingletonEager {
    return SingletonEager.instance;
  }

  public businessLogic(): void {
    console.log("饿汉式单例执行业务:", this.data);
  }
}

/**
 * 单例模式 - 模块级单例（TypeScript/JavaScript 推荐方式）
 * 利用 ES6 模块系统天然单例特性
 */
class SingletonModule {
  private data: string;

  constructor() {
    this.data = "模块级单例";
  }

  public businessLogic(): void {
    console.log("模块级单例执行业务:", this.data);
  }
}

// 导出单例实例（模块级单例）
export const singletonModule = new SingletonModule();

// 使用示例
function clientCode(): void {
  // 双重检查锁定方式
  const s1 = Singleton.getInstance();
  const s2 = Singleton.getInstance();
  console.log(s1 === s2); // true

  // 饿汉式方式
  const s3 = SingletonEager.getInstance();

  // 模块级单例方式
  singletonModule.businessLogic();
}

clientCode();`,

    java: `/**
 * 单例模式 - 双重检查锁定（Double-Checked Locking）
 * 兼顾线程安全和性能，延迟加载
 */
public class Singleton {
    // volatile 确保多线程环境下的可见性和有序性
    private static volatile Singleton instance;
    private String data;

    // 私有构造函数，防止外部实例化
    private Singleton() {
        // 防止反射攻击
        if (instance != null) {
            throw new IllegalStateException("单例实例已存在！");
        }
        this.data = "单例数据";
    }

    /**
     * 双重检查锁定的全局访问点
     * 第一次检查避免不必要的同步，第二次检查确保线程安全
     */
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }

    // 防止反序列化创建新实例
    protected Object readResolve() {
        return getInstance();
    }

    public void businessLogic() {
        System.out.println("执行业务逻辑: " + data);
    }

    public String getData() {
        return data;
    }
}

/**
 * 单例模式 - 静态内部类方式（推荐）
 * 利用类加载机制实现延迟加载，线程安全且无需同步
 */
class SingletonStaticInner {
    private String data;

    private SingletonStaticInner() {
        this.data = "静态内部类单例";
    }

    // 静态内部类，在首次使用时才会加载
    private static class SingletonHolder {
        private static final SingletonStaticInner INSTANCE = new SingletonStaticInner();
    }

    public static SingletonStaticInner getInstance() {
        return SingletonHolder.INSTANCE;
    }
}

/**
 * 单例模式 - 枚举方式（最简洁、最安全的实现）
 * 自动支持序列化，防止反射攻击
 */
enum SingletonEnum {
    INSTANCE;
    
    private String data = "枚举单例";
    
    public void businessLogic() {
        System.out.println("枚举单例执行业务: " + data);
    }
}

// 使用示例
class Client {
    public static void main(String[] args) {
        // 双重检查锁定方式
        Singleton s1 = Singleton.getInstance();
        Singleton s2 = Singleton.getInstance();
        System.out.println(s1 == s2); // true
        
        // 静态内部类方式
        SingletonStaticInner s3 = SingletonStaticInner.getInstance();
        
        // 枚举方式
        SingletonEnum.INSTANCE.businessLogic();
    }
}`,

    go: `package singleton

import (
    "sync"
    "fmt"
)

/**
 * 单例模式 - 双重检查锁定（使用 sync.Once）
 * Go 语言推荐使用 sync.Once 实现线程安全的单例
 */
type Singleton struct {
    data string
}

var (
    instance *Singleton
    once     sync.Once
)

// GetInstance 获取单例实例（线程安全，延迟加载）
func GetInstance() *Singleton {
    once.Do(func() {
        instance = &Singleton{data: "单例数据"}
    })
    return instance
}

func (s *Singleton) BusinessLogic() {
    fmt.Println("执行业务逻辑:", s.data)
}

func (s *Singleton) GetData() string {
    return s.data
}

/**
 * 单例模式 - 饿汉式（包初始化时创建）
 * 利用 Go 的 init 函数或包级变量初始化
 */
type SingletonEager struct {
    data string
}

var eagerInstance = &SingletonEager{data: "饿汉式单例"}

func GetEagerInstance() *SingletonEager {
    return eagerInstance
}

func (s *SingletonEager) BusinessLogic() {
    fmt.Println("饿汉式单例执行业务:", s.data)
}

// 使用示例
func ClientCode() {
    // sync.Once 方式（推荐）
    s1 := GetInstance()
    s2 := GetInstance()
    fmt.Println(s1 == s2) // true
    
    // 饿汉式方式
    s3 := GetEagerInstance()
    s3.BusinessLogic()
}`,


    python: `import threading
from typing import Optional

/**
 * 单例模式 - 双重检查锁定（线程安全版本）
 * 使用锁确保多线程环境下的线程安全
 */
class Singleton:
    _instance: Optional['Singleton'] = None
    _lock = threading.Lock()
    
    def __new__(cls) -> 'Singleton':
        # 第一次检查（无锁，性能优化）
        if cls._instance is None:
            with cls._lock:
                # 第二次检查（加锁，确保线程安全）
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance.data = "单例数据"
        return cls._instance
    
    def __init__(self):
        # 防止重复初始化
        if not hasattr(self, '_initialized'):
            self._initialized = True
            self.data = "单例数据"
    
    def business_logic(self):
        print(f"执行业务逻辑: {self.data}")
    
    def get_data(self) -> str:
        return self.data

/**
 * 单例模式 - 装饰器方式（最 Pythonic）
 * 使用装饰器自动实现单例逻辑
 */
def singleton(cls):
    instances = {}
    lock = threading.Lock()
    
    def get_instance(*args, **kwargs):
        if cls not in instances:
            with lock:
                if cls not in instances:
                    instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    
    return get_instance

@singleton
class SingletonDecorator:
    def __init__(self):
        self.data = "装饰器单例"
    
    def business_logic(self):
        print(f"装饰器单例执行业务: {self.data}")

/**
 * 单例模式 - 元类方式
 * 通过自定义元类控制实例创建
 */
class SingletonMeta(type):
    _instances = {}
    _lock = threading.Lock()
    
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            with cls._lock:
                if cls not in cls._instances:
                    cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class SingletonMetaClass(metaclass=SingletonMeta):
    def __init__(self):
        self.data = "元类单例"
    
    def business_logic(self):
        print(f"元类单例执行业务: {self.data}")

# 使用示例
def client_code():
    # 双重检查锁定方式
    s1 = Singleton()
    s2 = Singleton()
    print(s1 is s2)  # True
    s1.business_logic()
    
    # 装饰器方式
    s3 = SingletonDecorator()
    s4 = SingletonDecorator()
    print(s3 is s4)  # True
    
    # 元类方式
    s5 = SingletonMetaClass()
    s6 = SingletonMetaClass()
    print(s5 is s6)  # True

if __name__ == "__main__":
    client_code()`,


    cpp: `#include <iostream>
#include <memory>
#include <mutex>
#include <string>

/**
 * 单例模式 - 双重检查锁定（线程安全版本）
 * 使用 C++11 的内存模型和 mutex 实现线程安全
 */
class Singleton {
private:
    static std::shared_ptr<Singleton> instance;
    static std::mutex mutex;
    std::string data;

    // 私有构造函数
    Singleton() : data("单例数据") {
        std::cout << "Singleton 实例创建" << std::endl;
    }

public:
    // 删除拷贝构造函数和赋值操作符
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;

    // 双重检查锁定的全局访问点
    static std::shared_ptr<Singleton> getInstance() {
        // 第一次检查（无锁，性能优化）
        if (!instance) {
            std::lock_guard<std::mutex> lock(mutex);
            // 第二次检查（加锁，确保线程安全）
            if (!instance) {
                instance = std::shared_ptr<Singleton>(new Singleton());
            }
        }
        return instance;
    }

    void businessLogic() {
        std::cout << "执行业务逻辑: " << data << std::endl;
    }

    std::string getData() const {
        return data;
    }
};

// 初始化静态成员
std::shared_ptr<Singleton> Singleton::instance = nullptr;
std::mutex Singleton::mutex;

/**
 * 单例模式 - Meyers' Singleton（C++11 推荐方式）
 * 利用静态局部变量的线程安全特性（C++11 起保证）
 */
class SingletonMeyers {
private:
    std::string data;

    SingletonMeyers() : data("Meyers 单例") {
        std::cout << "Meyers Singleton 实例创建" << std::endl;
    }

public:
    // 删除拷贝构造函数和赋值操作符
    SingletonMeyers(const SingletonMeyers&) = delete;
    SingletonMeyers& operator=(const SingletonMeyers&) = delete;

    // 静态局部变量方式（C++11 线程安全）
    static SingletonMeyers& getInstance() {
        static SingletonMeyers instance;
        return instance;
    }

    void businessLogic() {
        std::cout << "Meyers 单例执行业务: " << data << std::endl;
    }
};

/**
 * 单例模式 - 饿汉式（程序启动时创建）
 * 最简单的方式，线程安全但可能浪费资源
 */
class SingletonEager {
private:
    std::string data;
    static SingletonEager instance;

    SingletonEager() : data("饿汉式单例") {
        std::cout << "Eager Singleton 实例创建" << std::endl;
    }

public:
    SingletonEager(const SingletonEager&) = delete;
    SingletonEager& operator=(const SingletonEager&) = delete;

    static SingletonEager& getInstance() {
        return instance;
    }

    void businessLogic() {
        std::cout << "饿汉式单例执行业务: " << data << std::endl;
    }
};

// 饿汉式：程序启动时即创建实例
SingletonEager SingletonEager::instance;

// 使用示例
int main() {
    // 双重检查锁定方式
    auto s1 = Singleton::getInstance();
    auto s2 = Singleton::getInstance();
    std::cout << (s1 == s2 ? "同一实例" : "不同实例") << std::endl;
    s1->businessLogic();

    // Meyers' Singleton 方式（推荐）
    auto& s3 = SingletonMeyers::getInstance();
    auto& s4 = SingletonMeyers::getInstance();
    std::cout << (&s3 == &s4 ? "同一实例" : "不同实例") << std::endl;
    s3.businessLogic();

    // 饿汉式方式
    auto& s5 = SingletonEager::getInstance();
    s5.businessLogic();

    return 0;
}`,
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
