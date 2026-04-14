import type { DesignPattern } from '@/types/pattern';

export const prototypePattern: DesignPattern = {
  id: 'prototype',
  name: '原型模式',
  nameEn: 'Prototype Pattern',
  category: 'creational',
  difficulty: 'easy',
  frequency: 'low',
  intent: '用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。',
  description: '原型模式是一种创建型设计模式，它允许你复制已有对象，而无需使代码依赖它们所属的类。通过定义一个统一的克隆接口，所有实现了该接口的对象都可以被复制，而无需知道具体类型。',
  applicability: [
    '当需要创建的对象与现有对象相似时（只有部分属性不同）',
    '当需要避免与对象创建类之间的高耦合时',
    '当需要创建的对象种类繁多，整合到一个工厂类中会导致工厂类过于庞大时',
    '当需要避免使用继承来创建对象，而希望通过组合来扩展对象行为时',
  ],
  pros: [
    '可以克隆对象，而无需与它们的具体类耦合',
    '可以移除重复的初始化代码，预生成原型',
    '可以更方便地生成复杂对象，无需知道具体的创建细节',
    '可以保存对象状态，在需要时恢复（备忘录模式的基础）',
  ],
  cons: [
    '克隆包含循环引用的复杂对象可能会非常困难',
    '需要为每个类实现克隆方法，可能违反开闭原则',
    '深拷贝和浅拷贝需要谨慎处理，避免潜在的副作用',
  ],
  analogy: {
    title: '现实世界中的原型',
    description: '原型模式就像是现实世界中的细胞分裂和文档模板复制',
    scenarios: [
      {
        id: 'cell',
        title: '细胞分裂',
        description: '细胞通过分裂产生新的细胞，新细胞与原始细胞具有相同的遗传信息（DNA）。就像原型模式复制对象的所有属性。',
        icon: 'Circle',
      },
      {
        id: 'document',
        title: '文档模板',
        description: '我们通常会创建一个文档模板，然后基于这个模板复制出多份文档。每份文档都是独立的，修改一份不会影响其他文档。',
        icon: 'FileText',
      },
      {
        id: 'stencil',
        title: '绘画模板',
        description: '艺术家使用绘画模板来复制图案，每个新图案都是模板的复制品，但可以独立修改颜色、大小等属性。',
        icon: 'Palette',
      },
    ],
  },
  structure: {
    classDiagram: `
      class Prototype {
        <<interface>>
        +clone(): Prototype
      }
      class ConcretePrototype1 {
        -field1: string
        +clone(): Prototype
      }
      class ConcretePrototype2 {
        -field2: number
        +clone(): Prototype
      }
      class Client {
        +operation()
      }
      Prototype <|.. ConcretePrototype1
      Prototype <|.. ConcretePrototype2
      Client --> Prototype
    `,
    mermaidDiagram: `
classDiagram
  class Prototype {
    <<interface>>
    +clone() Prototype
  }
  
  class ConcretePrototype {
    -id: string
    -data: Object
    -timestamp: Date
    +clone() Prototype
    +getId() string
    +getData() Object
  }
  
  class PrototypeRegistry {
    -prototypes: Map~string, Prototype~
    +register(key: string, prototype: Prototype)
    +get(key: string): Prototype
    +remove(key: string)
  }
  
  class Client {
    +main()
  }
  
  Prototype <|.. ConcretePrototype
  Client --> Prototype : uses
  Client --> PrototypeRegistry : uses
  PrototypeRegistry ..> Prototype : manages
  
  style Prototype fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style ConcretePrototype fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style PrototypeRegistry fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: 'Prototype 接口定义',
        description: '定义原型接口，声明克隆方法',
        duration: 2000,
        elements: [
          { id: 'prototype', type: 'class', name: 'Prototype', x: 200, y: 100, properties: [], methods: ['+clone(): Prototype'] },
        ],
      },
      {
        id: 'step2',
        title: 'ConcretePrototype 实现',
        description: '具体原型类实现克隆方法，创建新实例并复制属性',
        duration: 2000,
        elements: [
          { id: 'prototype', type: 'class', name: 'Prototype', x: 200, y: 100, properties: [], methods: ['+clone(): Prototype'] },
          { id: 'concrete', type: 'class', name: 'ConcretePrototype', x: 200, y: 250, properties: ['-id: string', '-data: Object', '-timestamp: Date'], methods: ['+clone(): Prototype', '+getId(): string', '+getData(): Object'] },
        ],
        connections: [
          { from: 'concrete', to: 'prototype', type: 'implement' },
        ],
      },
      {
        id: 'step3',
        title: 'PrototypeRegistry 注册表',
        description: '原型注册表管理预先生成的原型对象',
        duration: 2000,
        elements: [
          { id: 'prototype', type: 'class', name: 'Prototype', x: 100, y: 100, properties: [], methods: ['+clone(): Prototype'] },
          { id: 'concrete', type: 'class', name: 'ConcretePrototype', x: 100, y: 250, properties: ['-id: string', '-data: Object'], methods: ['+clone(): Prototype'] },
          { id: 'registry', type: 'class', name: 'PrototypeRegistry', x: 450, y: 175, properties: ['-prototypes: Map'], methods: ['+register()', '+get(): Prototype', '+remove()'] },
        ],
        connections: [
          { from: 'concrete', to: 'prototype', type: 'implement' },
        ],
      },
      {
        id: 'step4',
        title: 'Client 使用',
        description: '客户端从注册表获取原型并克隆',
        duration: 2000,
        elements: [
          { id: 'prototype', type: 'class', name: 'Prototype', x: 100, y: 100, properties: [], methods: ['+clone(): Prototype'] },
          { id: 'concrete', type: 'class', name: 'ConcretePrototype', x: 100, y: 250, properties: ['-id: string', '-data: Object'], methods: ['+clone(): Prototype'] },
          { id: 'registry', type: 'class', name: 'PrototypeRegistry', x: 400, y: 175, properties: ['-prototypes: Map'], methods: ['+register()', '+get(): Prototype'] },
          { id: 'client', type: 'class', name: 'Client', x: 700, y: 175, methods: ['+main()'] },
        ],
        connections: [
          { from: 'concrete', to: 'prototype', type: 'implement' },
          { from: 'client', to: 'registry', type: 'dependency', label: 'uses' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * 原型模式 - TypeScript 实现
 * 包含：基本实现、Object.assign 实现、深拷贝与浅拷贝对比
 */

// ==================== 基本原型接口和实现 ====================

/**
 * 原型接口
 * 定义所有具体原型类必须实现的 clone 方法
 */
interface Prototype {
  clone(): Prototype;
  getName(): string;
}

/**
 * 具体原型类 - 文档
 * 实现深拷贝，确保嵌套对象被正确复制
 */
class DocumentPrototype implements Prototype {
  constructor(
    public name: string,
    public content: string,
    public metadata: { author: string; createdAt: Date }
  ) {}

  /**
   * 深拷贝方法
   * 创建对象的完整副本，包括所有嵌套对象
   */
  clone(): Prototype {
    // 手动创建新实例并深拷贝所有属性
    return new DocumentPrototype(
      this.name + '_copy',
      this.content,
      {
        author: this.metadata.author,
        createdAt: new Date(this.metadata.createdAt)
      }
    );
  }

  /**
   * 浅拷贝方法（使用 Object.assign）
   * 嵌套对象仍保持引用关系
   */
  shallowClone(): Prototype {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  getName(): string {
    return this.name;
  }

  /**
   * 展示对象信息
   */
  display(): void {
    console.log(\`文档: \${this.name}\`);
    console.log(\`内容: \${this.content}\`);
    console.log(\`作者: \${this.metadata.author}\`);
    console.log(\`创建时间: \${this.metadata.createdAt.toISOString()}\`);
  }
}

/**
 * 具体原型类 - 配置对象
 * 展示包含数组的深拷贝实现
 */
class ConfigPrototype implements Prototype {
  constructor(
    public env: string,
    public settings: Record<string, any>,
    public connections: string[]
  ) {}

  /**
   * 深拷贝方法
   * 使用 JSON 序列化实现深拷贝（适用于普通对象）
   */
  clone(): Prototype {
    return new ConfigPrototype(
      this.env,
      JSON.parse(JSON.stringify(this.settings)),
      [...this.connections] // 复制数组
    );
  }

  getName(): string {
    return this.env;
  }

  display(): void {
    console.log(\`环境: \${this.env}\`);
    console.log('设置:', this.settings);
    console.log('连接:', this.connections);
  }
}

// ==================== 原型注册表 ====================

/**
 * 原型注册表
 * 管理预先生成的原型对象，方便客户端获取和克隆
 */
class PrototypeRegistry {
  private prototypes: Map<string, Prototype> = new Map();

  /**
   * 注册原型
   */
  register(key: string, prototype: Prototype): void {
    this.prototypes.set(key, prototype);
    console.log(\`原型 "\${key}" 已注册\`);
  }

  /**
   * 获取并克隆原型
   */
  get(key: string): Prototype | null {
    const prototype = this.prototypes.get(key);
    if (!prototype) {
      console.log(\`原型 "\${key}" 不存在\`);
      return null;
    }
    return prototype.clone();
  }

  /**
   * 获取原始原型（不克隆）
   */
  getRaw(key: string): Prototype | null {
    return this.prototypes.get(key) || null;
  }

  /**
   * 列出所有注册的原型
   */
  listPrototypes(): string[] {
    return Array.from(this.prototypes.keys());
  }

  /**
   * 移除原型
   */
  remove(key: string): boolean {
    return this.prototypes.delete(key);
  }
}

// ==================== 客户端使用示例 ====================

function clientCode(): void {
  console.log('========== 原型模式演示 ==========\\n');

  // 1. 基本克隆
  console.log('--- 基本克隆示例 ---');
  const originalDoc = new DocumentPrototype(
    '设计文档',
    '这是设计文档的内容...',
    { author: '张三', createdAt: new Date('2024-01-15') }
  );

  console.log('原始文档:');
  originalDoc.display();

  const clonedDoc = originalDoc.clone() as DocumentPrototype;
  console.log('\\n克隆文档（深拷贝）:');
  clonedDoc.display();

  // 验证深拷贝 - 修改克隆对象的嵌套属性
  clonedDoc.metadata.author = '李四';
  console.log('\\n修改克隆文档的作者后:');
  console.log('原始作者:', originalDoc.metadata.author);
  console.log('克隆作者:', clonedDoc.metadata.author);
  console.log('确认深拷贝成功！');

  // 2. 浅拷贝示例
  console.log('\\n--- 浅拷贝示例 ---');
  const shallowClone = originalDoc.shallowClone() as DocumentPrototype;
  shallowClone.metadata.author = '王五';
  console.log('浅拷贝修改后:');
  console.log('原始作者:', originalDoc.metadata.author);
  console.log('浅拷贝作者:', shallowClone.metadata.author);

  // 3. Object.assign 实现
  console.log('\\n--- Object.assign 实现 ---');
  const config = new ConfigPrototype('production', { port: 8080, debug: false }, ['db1', 'db2']);
  const configClone = Object.assign(Object.create(ConfigPrototype.prototype), config);
  configClone.env = 'staging';
  configClone.settings.port = 9090;
  console.log('原始配置端口:', config.settings.port);
  console.log('克隆配置端口:', configClone.settings.port);

  // 4. 原型注册表
  console.log('\\n--- 原型注册表演示 ---');
  const registry = new PrototypeRegistry();

  // 注册预先生成的原型
  registry.register('default-doc', new DocumentPrototype(
    '默认文档',
    '默认内容',
    { author: '系统', createdAt: new Date() }
  ));

  registry.register('prod-config', new ConfigPrototype(
    'production',
    { timeout: 5000, retries: 3 },
    ['primary-db', 'secondary-db']
  ));

  console.log('\\n注册的原型:', registry.listPrototypes());

  // 从注册表获取克隆
  const docFromRegistry = registry.get('default-doc') as DocumentPrototype;
  console.log('\\n从注册表获取的文档:', docFromRegistry?.getName());

  const configFromRegistry = registry.get('prod-config') as ConfigPrototype;
  console.log('从注册表获取的配置:', configFromRegistry?.getName());
  configFromRegistry?.display();
}

clientCode();

/**
 * 克隆方法选择建议：
 * 1. 如果对象不包含嵌套对象，使用 Object.assign 或展开运算符
 * 2. 如果对象包含嵌套对象，使用深拷贝方法
 * 3. 对于复杂对象，考虑实现序列化/反序列化方法
 * 4. 根据业务需求选择浅拷贝或深拷贝
 */`,

    java: `/**
 * 原型模式 - Java 实现
 * 包含：基本实现、Cloneable 接口实现、序列化实现
 */

import java.io.*;
import java.util.*;

// ==================== 基本原型接口 ====================

/**
 * 原型接口
 * 定义克隆方法，所有实现类都可以被复制
 */
interface Prototype {
    /**
     * 克隆方法
     * @return 克隆的新对象
     */
    Prototype clone();
    
    String getName();
    
    void display();
}

// ==================== Cloneable 接口实现 ====================

/**
 * 具体原型类 - 用户档案
 * 实现 Cloneable 接口，使用浅拷贝
 */
class UserProfile implements Prototype, Cloneable {
    private String id;
    private String name;
    private int age;
    private List<String> roles; // 引用类型
    private Date createdAt; // 可变对象
    
    public UserProfile(String id, String name, int age, List<String> roles) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.roles = new ArrayList<>(roles); // 复制列表
        this.createdAt = new Date();
    }
    
    /**
     * 浅拷贝实现
     * 基本类型和不可变对象会被复制
     * 可变对象（List, Date）保持引用
     */
    @Override
    public UserProfile clone() {
        try {
            return (UserProfile) super.clone();
        } catch (CloneNotSupportedException e) {
            // 由于实现了 Cloneable，这里不会发生
            throw new RuntimeException("Clone failed", e);
        }
    }
    
    /**
     * 深拷贝实现
     * 所有引用类型都被完全复制
     */
    public UserProfile deepClone() {
        UserProfile cloned = new UserProfile(
            this.id + "_copy",
            this.name,
            this.age,
            new ArrayList<>(this.roles)
        );
        cloned.createdAt = (Date) this.createdAt.clone();
        return cloned;
    }
    
    @Override
    public String getName() {
        return name;
    }
    
    @Override
    public void display() {
        System.out.println("用户档案:");
        System.out.println("  ID: " + id);
        System.out.println("  姓名: " + name);
        System.out.println("  年龄: " + age);
        System.out.println("  角色: " + roles);
        System.out.println("  创建时间: " + createdAt);
    }
    
    // Getter 和 Setter
    public String getId() { return id; }
    public void setName(String name) { this.name = name; }
    public List<String> getRoles() { return roles; }
    public void addRole(String role) { this.roles.add(role); }
}

// ==================== 序列化实现 ====================

/**
 * 具体原型类 - 游戏关卡
 * 通过序列化实现深拷贝（适用于复杂对象）
 */
class GameLevel implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String name;
    private int difficulty;
    private List<Enemy> enemies;
    private Map<String, Item> items;
    private transient Date loadedAt; // transient 字段不会被序列化
    
    public GameLevel(String name, int difficulty) {
        this.name = name;
        this.difficulty = difficulty;
        this.enemies = new ArrayList<>();
        this.items = new HashMap<>();
        this.loadedAt = new Date();
    }
    
    /**
     * 添加敌人
     */
    public void addEnemy(Enemy enemy) {
        this.enemies.add(enemy);
    }
    
    /**
     * 添加物品
     */
    public void addItem(String key, Item item) {
        this.items.put(key, item);
    }
    
    /**
     * 序列化深拷贝
     * 将对象写入字节流，再读取出来实现深拷贝
     */
    public GameLevel deepCloneViaSerialization() {
        try {
            // 序列化
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject(this);
            oos.close();
            
            // 反序列化
            ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
            ObjectInputStream ois = new ObjectInputStream(bais);
            GameLevel cloned = (GameLevel) ois.readObject();
            ois.close();
            
            // 重新设置加载时间
            cloned.loadedAt = new Date();
            
            return cloned;
        } catch (IOException | ClassNotFoundException e) {
            throw new RuntimeException("Deep clone failed", e);
        }
    }
    
    public String getName() { return name; }
    public int getDifficulty() { return difficulty; }
    public List<Enemy> getEnemies() { return enemies; }
    
    public void display() {
        System.out.println("游戏关卡: " + name);
        System.out.println("  难度: " + difficulty);
        System.out.println("  敌人数量: " + enemies.size());
        System.out.println("  物品数量: " + items.size());
        System.out.println("  加载时间: " + loadedAt);
    }
}

/**
 * 敌人类（可序列化）
 */
class Enemy implements Serializable {
    private static final long serialVersionUID = 1L;
    private String type;
    private int health;
    
    public Enemy(String type, int health) {
        this.type = type;
        this.health = health;
    }
    
    public String getType() { return type; }
    public int getHealth() { return health; }
}

/**
 * 物品类（可序列化）
 */
class Item implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int value;
    
    public Item(String name, int value) {
        this.name = name;
        this.value = value;
    }
    
    public String getName() { return name; }
    public int getValue() { return value; }
}

// ==================== 原型注册表 ====================

/**
 * 原型注册表
 * 管理和提供预先生成的原型对象
 */
class PrototypeRegistry {
    private Map<String, Prototype> prototypes = new HashMap<>();
    
    public void register(String key, Prototype prototype) {
        prototypes.put(key, prototype);
        System.out.println("原型 '" + key + "' 已注册");
    }
    
    public Prototype get(String key) {
        Prototype prototype = prototypes.get(key);
        if (prototype == null) {
            System.out.println("原型 '" + key + "' 不存在");
            return null;
        }
        return prototype.clone();
    }
    
    public Prototype getRaw(String key) {
        return prototypes.get(key);
    }
    
    public Set<String> listPrototypes() {
        return prototypes.keySet();
    }
    
    public void remove(String key) {
        prototypes.remove(key);
    }
}

// ==================== 客户端使用示例 ====================

public class PrototypeDemo {
    public static void main(String[] args) {
        System.out.println("========== 原型模式演示 ==========\\n");
        
        // 1. Cloneable 接口实现
        System.out.println("--- Cloneable 接口实现 ---");
        List<String> roles = new ArrayList<>();
        roles.add("管理员");
        roles.add("用户");
        
        UserProfile originalUser = new UserProfile("U001", "张三", 25, roles);
        originalUser.display();
        
        System.out.println("\\n浅拷贝:");
        UserProfile shallowUser = originalUser.clone();
        shallowUser.setName("李四");
        shallowUser.addRole("访客");
        
        System.out.println("原始用户角色: " + originalUser.getRoles());
        System.out.println("克隆用户角色: " + shallowUser.getRoles());
        System.out.println("浅拷贝共享了角色列表引用！");
        
        System.out.println("\\n深拷贝:");
        UserProfile deepUser = originalUser.deepClone();
        deepUser.setName("王五");
        deepUser.addRole("测试员");
        
        System.out.println("原始用户角色: " + originalUser.getRoles());
        System.out.println("深拷贝用户角色: " + deepUser.getRoles());
        System.out.println("深拷贝完全独立！");
        
        // 2. 序列化深拷贝
        System.out.println("\\n--- 序列化深拷贝 ---");
        GameLevel originalLevel = new GameLevel("第一关", 1);
        originalLevel.addEnemy(new Enemy("哥布林", 100));
        originalLevel.addEnemy(new Enemy("狼人", 150));
        originalLevel.addItem("key", new Item("钥匙", 50));
        originalLevel.display();
        
        GameLevel clonedLevel = originalLevel.deepCloneViaSerialization();
        clonedLevel.display();
        
        // 3. 原型注册表
        System.out.println("\\n--- 原型注册表 ---");
        PrototypeRegistry registry = new PrototypeRegistry();
        registry.register("admin-user", new UserProfile("A001", "管理员", 30, Arrays.asList("管理员")));
        registry.register("user-guest", new UserProfile("G001", "访客", 20, Arrays.asList("访客")));
        
        System.out.println("\\n注册的原型: " + registry.listPrototypes());
        
        UserProfile userFromRegistry = (UserProfile) registry.get("admin-user");
        System.out.println("从注册表获取的用户: " + userFromRegistry.getName());
    }
}

/**
 * 克隆方法选择建议：
 * 1. 简单对象：实现 Cloneable 接口
 * 2. 复杂对象（包含多层嵌套）：使用序列化或手动深拷贝
 * 3. 需要完全控制拷贝过程：实现自定义 clone 方法
 * 4. 考虑使用拷贝构造函数或静态工厂方法作为替代方案
 */`,

    go: `package main

import (
	"encoding/json"
	"fmt"
)

// ==================== 基本原型接口 ====================

/**
 * 原型接口
 * 定义 Clone 方法，所有实现类都可以被复制
 */
type Prototype interface {
	Clone() Prototype
	GetName() string
	Display()
}

// ==================== 具体原型实现 ====================

/**
 * 具体原型类 - 网络请求配置
 * 展示深拷贝和浅拷贝的区别
 */
type NetworkConfig struct {
	Host     string
	Port     int
	Timeout  int
	Headers  map[string]string // 引用类型
	Endpoints []string         // 切片
}

/**
 * 深拷贝实现
 * 创建全新的对象，复制所有字段
 */
func (n *NetworkConfig) Clone() Prototype {
	// 深拷贝 Headers map
	headersCopy := make(map[string]string)
	for k, v := range n.Headers {
		headersCopy[k] = v
	}
	
	// 深拷贝 Endpoints 切片
	endpointsCopy := make([]string, len(n.Endpoints))
	copy(endpointsCopy, n.Endpoints)
	
	return &NetworkConfig{
		Host:      n.Host + "_copy",
		Port:      n.Port,
		Timeout:   n.Timeout,
		Headers:   headersCopy,
		Endpoints: endpointsCopy,
	}
}

/**
 * 浅拷贝实现
 * 引用类型保持共享
 */
func (n *NetworkConfig) ShallowClone() Prototype {
	// 创建新对象，但共享引用类型的指针
	return &NetworkConfig{
		Host:      n.Host + "_shallow",
		Port:      n.Port,
		Timeout:   n.Timeout,
		Headers:   n.Headers,   // 共享指针
		Endpoints: n.Endpoints, // 共享指针
	}
}

/**
 * 使用 JSON 序列化实现深拷贝
 * 适用于结构体字段都是可序列化的场景
 */
func (n *NetworkConfig) DeepCloneViaJSON() (*NetworkConfig, error) {
	// 序列化为 JSON
	data, err := json.Marshal(n)
	if err != nil {
		return nil, err
	}
	
	// 反序列化为新对象
	var cloned NetworkConfig
	err = json.Unmarshal(data, &cloned)
	if err != nil {
		return nil, err
	}
	
	return &cloned, nil
}

func (n *NetworkConfig) GetName() string {
	return fmt.Sprintf("%s:%d", n.Host, n.Port)
}

func (n *NetworkConfig) Display() {
	fmt.Printf("网络配置: %s:%d\\n", n.Host, n.Port)
	fmt.Printf("  超时: %dms\\n", n.Timeout)
	fmt.Printf("  请求头: %v\\n", n.Headers)
	fmt.Printf("  端点: %v\\n", n.Endpoints)
}

/**
 * 具体原型类 - 数据库连接配置
 * 展示嵌套结构体的深拷贝
 */
type DatabaseConfig struct {
	Host     string
	Port     int
	Username string
	Password string
	Pool     *PoolConfig // 嵌套结构体指针
}

/**
 * 嵌套结构体
 */
type PoolConfig struct {
	MaxConnections int
	MinConnections int
	IdleTimeout    int
}

/**
 * 深拷贝实现
 * 包括嵌套结构体的深拷贝
 */
func (d *DatabaseConfig) Clone() Prototype {
	var poolClone *PoolConfig
	if d.Pool != nil {
		poolClone = &PoolConfig{
			MaxConnections: d.Pool.MaxConnections,
			MinConnections: d.Pool.MinConnections,
			IdleTimeout:    d.Pool.IdleTimeout,
		}
	}
	
	return &DatabaseConfig{
		Host:     d.Host + "_copy",
		Port:     d.Port,
		Username: d.Username,
		Password: d.Password,
		Pool:     poolClone,
	}
}

func (d *DatabaseConfig) GetName() string {
	return fmt.Sprintf("DB:%s:%d", d.Host, d.Port)
}

func (d *DatabaseConfig) Display() {
	fmt.Printf("数据库配置: %s:%d\\n", d.Host, d.Port)
	fmt.Printf("  用户名: %s\\n", d.Username)
	if d.Pool != nil {
		fmt.Printf("  连接池: Max=%d, Min=%d, Idle=%ds\\n", 
			d.Pool.MaxConnections, d.Pool.MinConnections, d.Pool.IdleTimeout)
	}
}

// ==================== 原型注册表 ====================

/**
 * 原型注册表
 * 使用 map 存储原型对象
 */
type PrototypeRegistry struct {
	prototypes map[string]Prototype
}

func NewPrototypeRegistry() *PrototypeRegistry {
	return &PrototypeRegistry{
		prototypes: make(map[string]Prototype),
	}
}

func (r *PrototypeRegistry) Register(key string, prototype Prototype) {
	r.prototypes[key] = prototype
	fmt.Printf("原型 \\"%s\\" 已注册\\n", key)
}

func (r *PrototypeRegistry) Get(key string) Prototype {
	prototype, exists := r.prototypes[key]
	if !exists {
		fmt.Printf("原型 \\"%s\\" 不存在\\n", key)
		return nil
	}
	return prototype.Clone()
}

func (r *PrototypeRegistry) GetRaw(key string) Prototype {
	return r.prototypes[key]
}

func (r *PrototypeRegistry) ListPrototypes() []string {
	keys := make([]string, 0, len(r.prototypes))
	for k := range r.prototypes {
		keys = append(keys, k)
	}
	return keys
}

func (r *PrototypeRegistry) Remove(key string) {
	delete(r.prototypes, key)
}

// ==================== 客户端使用示例 ====================

func main() {
	fmt.Println("========== 原型模式演示 ==========")
	fmt.Println()

	// 1. 基本深拷贝
	fmt.Println("--- 深拷贝示例 ---")
	original := &NetworkConfig{
		Host:     "api.example.com",
		Port:     8080,
		Timeout:  5000,
		Headers:  map[string]string{"Auth": "Bearer token"},
		Endpoints: []string{"/users", "/products"},
	}
	
	fmt.Println("原始配置:")
	original.Display()
	
	cloned := original.Clone().(*NetworkConfig)
	fmt.Println("\n克隆配置:")
	cloned.Display()
	
	// 修改克隆对象
	cloned.Headers["Auth"] = "New Token"
	cloned.Endpoints = append(cloned.Endpoints, "/orders")
	
	fmt.Println("\n修改克隆对象后:")
	fmt.Println("原始 Headers:", original.Headers)
	fmt.Println("克隆 Headers:", cloned.Headers)
	fmt.Println("深拷贝完全独立！")

	// 2. 浅拷贝示例
	fmt.Println("\n--- 浅拷贝示例 ---")
	shallow := original.ShallowClone().(*NetworkConfig)
	shallow.Headers["Auth"] = "Shallow Token"
	
	fmt.Println("浅拷贝修改后:")
	fmt.Println("原始 Headers:", original.Headers)
	fmt.Println("浅拷贝 Headers:", shallow.Headers)
	fmt.Println("浅拷贝共享了引用类型！")

	// 3. JSON 序列化深拷贝
	fmt.Println("\n--- JSON 序列化深拷贝 ---")
	jsonClone, err := original.DeepCloneViaJSON()
	if err != nil {
		fmt.Printf("克隆失败: %v\n", err)
		return
	}
	jsonClone.Host = "json-clone.example.com"
	jsonClone.Display()

	// 4. 嵌套结构体深拷贝
	fmt.Println("\n--- 嵌套结构体深拷贝 ---")
	dbConfig := &DatabaseConfig{
		Host:     "localhost",
		Port:     5432,
		Username: "admin",
		Password: "secret",
		Pool: &PoolConfig{
			MaxConnections: 100,
			MinConnections: 10,
			IdleTimeout:    300,
		},
	}
	
	fmt.Println("原始数据库配置:")
	dbConfig.Display()
	
	dbClone := dbConfig.Clone().(*DatabaseConfig)
	fmt.Println("\n克隆数据库配置:")
	dbClone.Display()
	
	// 修改克隆的连接池
	dbClone.Pool.MaxConnections = 200
	
	fmt.Println("\n修改克隆的连接池后:")
	fmt.Printf("原始最大连接数: %d\\n", dbConfig.Pool.MaxConnections)
	fmt.Printf("克隆最大连接数: %d\\n", dbClone.Pool.MaxConnections)
	fmt.Println("嵌套结构体深拷贝成功！")

	// 5. 原型注册表
	fmt.Println("\n--- 原型注册表 ---")
	registry := NewPrototypeRegistry()
	
	registry.Register("default-network", &NetworkConfig{
		Host:     "default.api.com",
		Port:     80,
		Timeout:  3000,
		Headers:  map[string]string{"Content-Type": "application/json"},
		Endpoints: []string{"/health"},
	})
	
	registry.Register("default-db", &DatabaseConfig{
		Host:     "default.db.com",
		Port:     3306,
		Username: "root",
		Password: "password",
		Pool: &PoolConfig{
			MaxConnections: 50,
			MinConnections: 5,
			IdleTimeout:    600,
		},
	})
	
	fmt.Println("\n注册的原型:", registry.ListPrototypes())
	
	config := registry.Get("default-network").(*NetworkConfig)
	fmt.Println("\n从注册表获取的配置:", config.GetName())
	config.Display()
}

/**
 * Go 语言深拷贝注意事项：
 * 1. 对于 map 和 slice，需要手动创建新对象并复制元素
 * 2. 对于嵌套结构体，需要递归深拷贝
 * 3. JSON 序列化是一种通用的深拷贝方法（需要所有字段可序列化）
 * 4. 注意指针字段的处理，确保复制的是值而非指针
 */`,

    python: `"""
原型模式 - Python 实现
包含：基本实现、copy 模块实现、__copy__/__deepcopy__ 实现
"""

import copy
from typing import Dict, List, Any, Optional
from abc import ABC, abstractmethod
from datetime import datetime


# ==================== 基本原型接口 ====================

class Prototype(ABC):
    """原型接口"""
    
    @abstractmethod
    def clone(self) -> 'Prototype':
        """克隆方法"""
        pass
    
    @abstractmethod
    def get_name(self) -> str:
        """获取名称"""
        pass
    
    @abstractmethod
    def display(self) -> None:
        """显示信息"""
        pass


# ==================== 基本实现 ====================

class Document(Prototype):
    """
    具体原型类 - 文档
    展示基本深拷贝实现
    """
    
    def __init__(self, name: str, content: str, metadata: Dict[str, Any]):
        self.name = name
        self.content = content
        self.metadata = metadata
        self.created_at = datetime.now()
    
    def clone(self) -> 'Document':
        """
        深拷贝实现
        手动复制所有属性，包括嵌套对象
        """
        return Document(
            name=self.name + '_copy',
            content=self.content,
            metadata=copy.deepcopy(self.metadata)  # 深拷贝字典
        )
    
    def shallow_clone(self) -> 'Document':
        """
        浅拷贝实现
        嵌套对象保持引用
        """
        new_doc = Document.__new__(Document)
        new_doc.name = self.name + '_shallow'
        new_doc.content = self.content
        new_doc.metadata = self.metadata  # 共享引用
        new_doc.created_at = self.created_at
        return new_doc
    
    def get_name(self) -> str:
        return self.name
    
    def display(self) -> None:
        print(f"文档: {self.name}")
        print(f"  内容: {self.content[:50]}...")
        print(f"  元数据: {self.metadata}")
        print(f"  创建时间: {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}")


# ==================== copy 模块实现 ====================

class UserSettings(Prototype):
    """
    具体原型类 - 用户设置
    展示 copy 模块的各种使用方式
    """
    
    def __init__(self, username: str, preferences: Dict[str, Any], themes: List[str]):
        self.username = username
        self.preferences = preferences
        self.themes = themes
        self.modified_at = datetime.now()
    
    def clone(self) -> 'UserSettings':
        """
        使用 copy.deepcopy 实现深拷贝
        """
        return copy.deepcopy(self)
    
    def shallow_clone(self) -> 'UserSettings':
        """
        使用 copy.copy 实现浅拷贝
        """
        return copy.copy(self)
    
    def get_name(self) -> str:
        return self.username
    
    def display(self) -> None:
        print(f"用户设置: {self.username}")
        print(f"  偏好设置: {self.preferences}")
        print(f"  可用主题: {self.themes}")
        print(f"  修改时间: {self.modified_at.strftime('%Y-%m-%d %H:%M:%S')}")


# ==================== __copy__/__deepcopy__ 实现 ====================

class GameCharacter(Prototype):
    """
    具体原型类 - 游戏角色
    实现 __copy__ 和 __deepcopy__ 魔法方法
    提供更精细的拷贝控制
    """
    
    def __init__(self, name: str, stats: Dict[str, int], inventory: List[str], companion: Optional['GameCharacter'] = None):
        self.name = name
        self.stats = stats
        self.inventory = inventory
        self.companion = companion  # 可能有循环引用
        self.level = 1
    
    def __copy__(self) -> 'GameCharacter':
        """
        自定义浅拷贝实现
        """
        # 创建新实例
        new_char = GameCharacter.__new__(GameCharacter)
        # 复制基本类型
        new_char.name = self.name
        new_char.level = self.level
        # 浅拷贝可变类型（共享引用）
        new_char.stats = self.stats
        new_char.inventory = self.inventory
        # 浅拷贝引用
        new_char.companion = self.companion
        return new_char
    
    def __deepcopy__(self, memo: Dict[int, Any]) -> 'GameCharacter':
        """
        自定义深拷贝实现
        处理循环引用的复杂场景
        """
        # 检查是否已拷贝过（处理循环引用）
        if id(self) in memo:
            return memo[id(self)]
        
        # 创建新实例
        new_char = GameCharacter.__new__(GameCharacter)
        # 记录到备忘录（防止循环引用）
        memo[id(self)] = new_char
        
        # 深拷贝所有字段
        new_char.name = self.name + '_copy'
        new_char.level = self.level
        new_char.stats = copy.deepcopy(self.stats, memo)
        new_char.inventory = copy.deepcopy(self.inventory, memo)
        # 处理同伴引用（可能有循环引用）
        new_char.companion = copy.deepcopy(self.companion, memo)
        
        return new_char
    
    def clone(self) -> 'GameCharacter':
        """使用深拷贝"""
        return copy.deepcopy(self)
    
    def get_name(self) -> str:
        return self.name
    
    def display(self) -> None:
        print(f"游戏角色: {self.name} (等级 {self.level})")
        print(f"  属性: {self.stats}")
        print(f"  背包: {self.inventory}")
        if self.companion:
            print(f"  同伴: {self.companion.name}")


# ==================== 原型注册表 ====================

class PrototypeRegistry:
    """
    原型注册表
    管理预先生成的原型对象
    """
    
    def __init__(self):
        self._prototypes: Dict[str, Prototype] = {}
    
    def register(self, key: str, prototype: Prototype) -> None:
        """注册原型"""
        self._prototypes[key] = prototype
        print(f'原型 "{key}" 已注册')
    
    def get(self, key: str) -> Optional[Prototype]:
        """获取并克隆原型"""
        prototype = self._prototypes.get(key)
        if prototype is None:
            print(f'原型 "{key}" 不存在')
            return None
        return prototype.clone()
    
    def get_raw(self, key: str) -> Optional[Prototype]:
        """获取原始原型（不克隆）"""
        return self._prototypes.get(key)
    
    def list_prototypes(self) -> List[str]:
        """列出所有注册的原型"""
        return list(self._prototypes.keys())
    
    def remove(self, key: str) -> bool:
        """移除原型"""
        if key in self._prototypes:
            del self._prototypes[key]
            return True
        return False


# ==================== 客户端使用示例 ====================

def client_code() -> None:
    print("========== 原型模式演示 ==========")
    print()
    
    # 1. 基本深拷贝
    print("--- 基本深拷贝示例 ---")
    original_doc = Document(
        name="设计文档",
        content="这是设计文档的完整内容...",
        metadata={"author": "张三", "version": "1.0", "tags": ["设计", "架构"]}
    )
    
    print("原始文档:")
    original_doc.display()
    
    cloned_doc = original_doc.clone()
    print("\n克隆文档:")
    cloned_doc.display()
    
    # 修改克隆对象
    cloned_doc.metadata["author"] = "李四"
    cloned_doc.metadata["tags"].append("重要")
    
    print("\n修改克隆文档后:")
    print(f"原始作者: {original_doc.metadata['author']}")
    print(f"克隆作者: {cloned_doc.metadata['author']}")
    print(f"原始标签: {original_doc.metadata['tags']}")
    print(f"克隆标签: {cloned_doc.metadata['tags']}")
    print("深拷贝完全独立！")
    
    # 2. 浅拷贝示例
    print("\n--- 浅拷贝示例 ---")
    shallow_doc = original_doc.shallow_clone()
    shallow_doc.metadata["author"] = "王五"
    shallow_doc.metadata["tags"].append("临时")
    
    print("浅拷贝修改后:")
    print(f"原始作者: {original_doc.metadata['author']}")
    print(f"浅拷贝作者: {shallow_doc.metadata['author']}")
    print("浅拷贝共享了引用类型！")
    
    # 3. copy 模块使用
    print("\n--- copy 模块使用 ---")
    settings = UserSettings(
        username="test_user",
        preferences={"theme": "dark", "language": "zh-CN", "notifications": {"email": True, "sms": False}},
        themes=["light", "dark", "blue"]
    )
    
    print("原始设置:")
    settings.display()
    
    deep_settings = copy.deepcopy(settings)
    shallow_settings = copy.copy(settings)
    
    # 修改深拷贝
    deep_settings.preferences["theme"] = "light"
    deep_settings.themes.append("green")
    
    # 修改浅拷贝
    shallow_settings.preferences["theme"] = "custom"
    shallow_settings.themes.append("custom_theme")
    
    print("\n修改后原始设置:")
    print(f"  主题偏好: {settings.preferences['theme']}")
    print(f"  主题列表: {settings.themes}")
    print("深拷贝完全独立，浅拷贝部分独立！")
    
    # 4. 自定义 __copy__/__deepcopy__
    print("\n--- 自定义 __copy__/__deepcopy__ ---")
    
    # 创建有循环引用的角色
    warrior = GameCharacter("战士", {"hp": 100, "mp": 50}, ["剑", "盾"])
    mage = GameCharacter("法师", {"hp": 60, "mp": 150}, ["法杖", "药水"], companion=warrior)
    warrior.companion = mage  # 循环引用
    
    print("原始角色:")
    warrior.display()
    
    # 深拷贝（处理循环引用）
    cloned_warrior = warrior.clone()
    print("\n克隆角色:")
    cloned_warrior.display()
    
    # 修改克隆角色的同伴
    cloned_warrior.companion.stats["hp"] = 999
    
    print("\n修改克隆角色同伴后:")
    print(f"原始战士同伴 HP: {warrior.companion.stats['hp']}")
    print(f"克隆战士同伴 HP: {cloned_warrior.companion.stats['hp']}")
    print("循环引用正确处理！")
    
    # 5. 原型注册表
    print("\n--- 原型注册表 ---")
    registry = PrototypeRegistry()
    
    # 注册原型
    registry.register("default_doc", Document(
        name="默认文档",
        content="默认内容...",
        metadata={"author": "系统", "version": "0.1"}
    ))
    
    registry.register("admin_settings", UserSettings(
        username="admin",
        preferences={"theme": "dark", "admin_mode": True},
        themes=["admin-dark"]
    ))
    
    print(f"\n注册的原型: {registry.list_prototypes()}")
    
    # 从注册表获取克隆
    doc = registry.get("default_doc")
    if doc:
        print(f"\n从注册表获取的文档: {doc.get_name()}")
        doc.display()
    
    settings = registry.get("admin_settings")
    if settings:
        print(f"\n从注册表获取的设置: {settings.get_name()}")


if __name__ == "__main__":
    client_code()

"""
原型模式 Python 实现要点：
1. 基本实现：手动创建新实例并复制属性
2. copy 模块：使用 copy.copy() 浅拷贝和 copy.deepcopy() 深拷贝
3. 自定义魔法方法：
   - __copy__()：定义浅拷贝行为
   - __deepcopy__(memo)：处理深拷贝，支持循环引用
4. 循环引用处理：在 __deepcopy__ 中使用 memo 字典记录已拷贝的对象
5. 注意事项：
   - 列表和字典需要深拷贝才能完全独立
   - 考虑使用不可变类型（tuple）替代可变类型提高性能
   - 自定义类应实现 __repr__ 便于调试
"""`,

    cpp: `/**
 * 原型模式 - C++ 实现
 * 包含：基本实现、拷贝构造函数实现、深拷贝与浅拷贝对比
 */

#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <memory>
#include <unordered_map>

using namespace std;

/**
 * 基类：Prototype
 * 定义原型接口，提供纯虚的 clone 方法
 */
class Prototype {
public:
    virtual ~Prototype() = default;
    
    // 纯虚克隆方法
    virtual unique_ptr<Prototype> clone() const = 0;
    
    // 虚方法获取名称
    virtual string getName() const = 0;
    
    // 虚方法显示信息
    virtual void display() const = 0;
    
    // 虚方法创建自己的类型
    virtual unique_ptr<Prototype> create() const = 0;
};

// ==================== 浅拷贝与深拷贝的区别 ====================

/**
 * 具体原型类 - 订单项
 * 展示浅拷贝和深拷贝的区别
 */
class OrderItem {
public:
    string productName;
    int quantity;
    double price;
    
    OrderItem(const string& name, int qty, double price)
        : productName(name), quantity(qty), price(price) {}
    
    // 拷贝构造函数（浅拷贝）
    OrderItem(const OrderItem& other)
        : productName(other.productName),
          quantity(other.quantity),
          price(other.price) {
        // 基本类型直接复制
        cout << "    OrderItem 拷贝构造函数（浅拷贝）" << endl;
    }
    
    // 深拷贝构造函数
    unique_ptr<OrderItem> deepClone() const {
        return make_unique<OrderItem>(productName, quantity, price);
    }
    
    double getTotal() const {
        return quantity * price;
    }
};

/**
 * 具体原型类 - 订单
 * 展示包含对象指针/引用的深拷贝实现
 */
class Order : public Prototype {
private:
    string orderId;
    string customerName;
    vector<unique_ptr<OrderItem>> items; // 智能指针管理的资源
    map<string, string> metadata;        // 标准容器
    time_t createdAt;
    
public:
    Order(const string& id, const string& customer)
        : orderId(id), customerName(customer), createdAt(time(nullptr)) {}
    
    // 添加订单项
    void addItem(unique_ptr<OrderItem> item) {
        items.push_back(std::move(item));
    }
    
    // 添加元数据
    void addMetadata(const string& key, const string& value) {
        metadata[key] = value;
    }
    
    // 拷贝构造函数 - 深拷贝
    Order(const Order& other)
        : orderId(other.orderId + "_copy"),
          customerName(other.customerName),
          metadata(other.metadata),
          createdAt(other.createdAt) {
        cout << "  Order 拷贝构造函数（深拷贝）" << endl;
        
        // 深拷贝所有订单项
        for (const auto& item : other.items) {
            items.push_back(item->deepClone());
        }
    }
    
    // 赋值运算符 - 深拷贝
    Order& operator=(const Order& other) {
        if (this != &other) {
            cout << "  Order 赋值运算符（深拷贝）" << endl;
            
            orderId = other.orderId + "_copy";
            customerName = other.customerName;
            metadata = other.metadata;
            createdAt = other.createdAt;
            
            // 清空并重新拷贝订单项
            items.clear();
            for (const auto& item : other.items) {
                items.push_back(item->deepClone());
            }
        }
        return *this;
    }
    
    // 移动构造函数
    Order(Order&& other) noexcept
        : orderId(std::move(other.orderId)),
          customerName(std::move(other.customerName)),
          items(std::move(other.items)),
          metadata(std::move(other.metadata)),
          createdAt(other.createdAt) {
        cout << "  Order 移动构造函数" << endl;
    }
    
    // 克隆方法实现
    unique_ptr<Prototype> clone() const override {
        cout << "调用 Order::clone()" << endl;
        return make_unique<Order>(*this);
    }
    
    // 创建新实例（用于原型注册表）
    unique_ptr<Prototype> create() const override {
        return make_unique<Order>("NEW", customerName);
    }
    
    string getName() const override {
        return "订单: " + orderId;
    }
    
    void display() const override {
        cout << "========== 订单信息 ==========" << endl;
        cout << "订单ID: " << orderId << endl;
        cout << "客户名: " << customerName << endl;
        cout << "创建时间: " << ctime(&createdAt);
        cout << "订单项:" << endl;
        
        double total = 0.0;
        for (const auto& item : items) {
            cout << "  - " << item->productName
                 << " x " << item->quantity
                 << " @ " << item->price
                 << " = " << item->getTotal() << endl;
            total += item->getTotal();
        }
        cout << "总计: " << total << endl;
        cout << "元数据: ";
        for (const auto& [key, value] : metadata) {
            cout << "[" << key << ":" << value << "] ";
        }
        cout << endl;
    }
    
    // 修改订单项（测试深拷贝）
    void modifyFirstItem(const string& newName) {
        if (!items.empty()) {
            items[0]->productName = newName;
        }
    }
};

// ==================== 模板方法实现原型 ====================

/**
 * 模板原型类
 * 使用模板方法简化原型实现
 */
template<typename T>
class Clonable : public Prototype {
public:
    unique_ptr<Prototype> clone() const override {
        return make_unique<T>(static_cast<const T&>(*this));
    }
    
    unique_ptr<T> cloneAs() const {
        return make_unique<T>(static_cast<const T&>(*this));
    }
    
    unique_ptr<Prototype> create() const override {
        return make_unique<T>();
    }
};

/**
 * 具体原型类 - 产品（使用模板）
 */
class Product : public Clonable<Product> {
private:
    string name;
    string category;
    double price;
    vector<string> tags;
    
public:
    Product() : name(""), category(""), price(0.0) {}
    
    Product(const string& n, const string& cat, double p)
        : name(n), category(cat), price(p) {}
    
    // 拷贝构造函数
    Product(const Product& other)
        : name(other.name),
          category(other.category),
          price(other.price),
          tags(other.tags) {
        cout << "Product 拷贝构造函数" << endl;
    }
    
    // 添加标签
    void addTag(const string& tag) {
        tags.push_back(tag);
    }
    
    string getName() const override { return name; }
    
    void display() const override {
        cout << "产品: " << name << " | 分类: " << category 
             << " | 价格: " << price << endl;
        cout << "标签: ";
        for (const auto& tag : tags) {
            cout << "[" << tag << "] ";
        }
        cout << endl;
    }
};

// ==================== 原型注册表 ====================

/**
 * 原型注册表
 * 使用 unique_ptr 管理原型对象
 */
class PrototypeRegistry {
private:
    unordered_map<string, unique_ptr<Prototype>> prototypes;
    
public:
    // 注册原型
    void registerPrototype(const string& key, unique_ptr<Prototype> prototype) {
        prototypes[key] = std::move(prototype);
        cout << "原型 \\"" << key << "\\" 已注册" << endl;
    }
    
    // 获取并克隆原型
    unique_ptr<Prototype> get(const string& key) const {
        auto it = prototypes.find(key);
        if (it == prototypes.end()) {
            cout << "原型 \\"" << key << "\\" 不存在" << endl;
            return nullptr;
        }
        return it->second->clone();
    }
    
    // 获取原始原型
    Prototype* getRaw(const string& key) const {
        auto it = prototypes.find(key);
        if (it == prototypes.end()) {
            return nullptr;
        }
        return it->second.get();
    }
    
    // 列出所有原型
    vector<string> listPrototypes() const {
        vector<string> keys;
        for (const auto& [key, _] : prototypes) {
            keys.push_back(key);
        }
        return keys;
    }
    
    // 移除原型
    void remove(const string& key) {
        prototypes.erase(key);
    }
};

// ==================== 客户端使用示例 ====================

void clientCode() {
    cout << "========== 原型模式演示 ==========" << endl << endl;
    
    // 1. 基本克隆
    cout << "--- 基本克隆示例 ---" << endl;
    
    // 创建原始订单
    auto originalOrder = make_unique<Order>("ORD001", "张三");
    originalOrder->addItem(make_unique<OrderItem>("笔记本电脑", 1, 5999.0));
    originalOrder->addItem(make_unique<OrderItem>("鼠标", 2, 99.0));
    originalOrder->addMetadata("payment", "credit_card");
    originalOrder->addMetadata("shipping", "express");
    
    cout << "原始订单:" << endl;
    originalOrder->display();
    
    // 克隆订单
    cout << endl << "克隆订单:" << endl;
    auto clonedOrder = originalOrder->clone();
    clonedOrder->display();
    
    // 修改克隆订单
    cout << endl << "修改克隆订单的第一个商品名称..." << endl;
    Order* clonedOrderRaw = dynamic_cast<Order*>(clonedOrder.get());
    if (clonedOrderRaw) {
        clonedOrderRaw->modifyFirstItem("平板电脑");
    }
    
    cout << endl << "修改后的原始订单:" << endl;
    originalOrder->display();
    
    cout << endl << "修改后的克隆订单:" << endl;
    clonedOrder->display();
    
    cout << endl << "深拷贝成功！两个订单完全独立。" << endl;
    
    // 2. 赋值运算符
    cout << endl << "--- 赋值运算符示例 ---" << endl;
    auto anotherOrder = make_unique<Order>("ORD999", "李四");
    *anotherOrder = *originalOrder;
    anotherOrder->display();
    
    // 3. 模板原型实现
    cout << endl << "--- 模板原型实现 ---" << endl;
    auto product = make_unique<Product>("iPhone", "手机", 9999.0);
    product->addTag("热门");
    product->addTag("新品");
    
    cout << "原始产品:" << endl;
    product->display();
    
    auto clonedProduct = product->clone();
    cout << endl << "克隆产品:" << endl;
    clonedProduct->display();
    
    // 4. 原型注册表
    cout << endl << "--- 原型注册表 ---" << endl;
    PrototypeRegistry registry;
    
    // 注册原型
    auto defaultOrder = make_unique<Order>("DEFAULT", "默认客户");
    defaultOrder->addItem(make_unique<OrderItem>("示例商品", 1, 100.0));
    registry.registerPrototype("standard_order", std::move(defaultOrder));
    
    auto defaultProduct = make_unique<Product>("示例产品", "默认分类", 50.0);
    defaultProduct->addTag("示例");
    registry.registerPrototype("standard_product", std::move(defaultProduct));
    
    cout << endl << "注册的原型: ";
    for (const auto& key : registry.listPrototypes()) {
        cout << "[" << key << "] ";
    }
    cout << endl;
    
    // 从注册表获取克隆
    auto orderFromRegistry = registry.get("standard_order");
    if (orderFromRegistry) {
        cout << endl << "从注册表获取的订单:" << endl;
        orderFromRegistry->display();
    }
    
    auto productFromRegistry = registry.get("standard_product");
    if (productFromRegistry) {
        cout << endl << "从注册表获取的产品:" << endl;
        productFromRegistry->display();
    }
    
    // 5. 智能指针的克隆注意事项
    cout << endl << "--- 智能指针克隆注意事项 ---" << endl;
    cout << "使用 unique_ptr 时，clone() 会创建新的内存副本" << endl;
    cout << "原始对象和克隆对象各自拥有独立的资源" << endl;
    cout << "无需担心内存管理问题（RAII 自动管理）" << endl;
}

/**
 * C++ 原型模式实现要点：
 * 1. 基本实现：定义纯虚 clone 方法的接口
 * 2. 拷贝构造函数：实现深拷贝或浅拷贝
 * 3. 赋值运算符：正确处理自赋值和资源释放
 * 4. 移动语义：使用移动构造函数提高性能
 * 5. 模板方法：使用模板简化原型实现
 * 6. 智能指针：使用 unique_ptr/shared_ptr 管理内存
 * 7. 深拷贝实现：
 *    - 基本类型直接复制
 *    - 指针类型需要创建新对象
 *    - 容器类型需要递归深拷贝
 *    - 循环引用需要特殊处理（使用 shared_ptr 和弱引用）
 */

int main() {
    clientCode();
    return 0;
}`,
  },
  realWorldExamples: [
    {
      title: 'Java Object.clone()',
      description: 'Java 所有类的基类 Object 提供了 clone() 方法，所有实现了 Cloneable 接口的类都可以被克隆。',
      source: 'JDK',
      codeSnippet: 'public class User implements Cloneable {\n    private String name;\n    \n    @Override\n    public User clone() {\n        return new User(this.name);\n    }\n}',
    },
    {
      title: 'React/Vue 组件的 props 复制',
      description: '在前端框架中，组件可以通过 props 复制来创建新的组件实例，这也是原型模式的应用。',
      source: 'Frontend Frameworks',
      codeSnippet: 'const newComponent = React.cloneElement(\n  originalComponent,\n  { newProp: value }\n);',
    },
    {
      title: '数据库连接池',
      description: '数据库连接池通常预先创建一些连接对象作为原型，需要时克隆这些原型而不是重新创建连接。',
      source: 'Database',
      codeSnippet: 'Connection conn = connectionPool.getConnection();\n// 实际上是克隆预创建的连接原型',
    },
  ],
  relatedPatterns: ['factory-method', 'abstract-factory', 'composite', 'memento'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '原型模式的主要目的是什么？',
      options: [
        '创建全新的对象',
        '通过复制现有对象来创建新对象',
        '修改现有对象的属性',
        '删除不再使用的对象',
      ],
      correctAnswer: 1,
      explanation: '原型模式的核心目的是通过复制（克隆）已有对象来创建新对象，无需知道对象的具体创建过程。',
    },
    {
      id: 'q2',
      type: 'single',
      question: '深拷贝和浅拷贝的主要区别是什么？',
      options: [
        '深拷贝只复制对象本身，浅拷贝复制所有嵌套对象',
        '深拷贝复制对象及其所有嵌套对象，浅拷贝只复制对象本身',
        '两者没有区别',
        '浅拷贝速度更快',
      ],
      correctAnswer: 1,
      explanation: '深拷贝会递归复制所有嵌套对象，创建完全独立的副本；浅拷贝只复制对象本身，嵌套对象保持引用关系。',
    },
    {
      id: 'q3',
      type: 'boolean',
      question: '在原型模式中，客户端需要知道具体原型类的实现细节吗？',
      options: ['需要', '不需要'],
      correctAnswer: 1,
      explanation: '原型模式的主要优点之一就是客户端只需通过原型接口进行操作，无需了解具体类的实现细节，从而降低了耦合度。',
    },
    {
      id: 'q4',
      type: 'single',
      question: '以下哪种场景最适合使用原型模式？',
      options: [
        '创建简单的基本类型对象',
        '创建与现有对象相似的新对象',
        '创建完全不同的新对象',
        '对象的类层次结构很简单',
      ],
      correctAnswer: 1,
      explanation: '当需要创建的对象与现有对象相似（只有部分属性不同），或者需要避免大量相似对象的重复初始化时，原型模式是最佳选择。',
    },
  ],
};
