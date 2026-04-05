import type { DesignPattern } from '@/types/pattern';

export const proxyPattern: DesignPattern = {
  id: 'proxy',
  name: '代理模式',
  nameEn: 'Proxy Pattern',
  category: 'structural',
  difficulty: 'medium',
  frequency: 'medium',
  intent: '为其他对象提供一种代理以控制对这个对象的访问。',
  description: '代理模式是一种结构型设计模式，让你能够提供对象的替代品或其占位符。代理控制着对于原对象的访问，并允许在将请求提交给对象前后进行一些处理。',
  applicability: [
    '延迟初始化（虚拟代理）- 当你有一个偶尔使用的重量级服务对象时',
    '访问控制（保护代理）- 当你需要根据不同客户端的权限控制对服务对象的访问时',
    '本地执行远程服务（远程代理）- 当服务对象位于远程服务器上时',
    '记录日志请求（日志记录代理）- 当你需要保存服务对象的请求历史记录时',
    '缓存请求结果（缓存代理）- 当你需要缓存服务对象的请求结果并管理其生命周期时',
    '智能引用（智能引用代理）- 当需要在对象被访问时执行额外操作（如引用计数）时',
  ],
  pros: [
    '可以在客户端毫无察觉的情况下控制服务对象',
    '客户端与真实服务对象解耦，无需知道代理的存在',
    '开闭原则：可以在不对服务或客户端做出修改的情况下创建新代理',
    '单一职责原则：可以将服务实现与代理功能分离',
    '可以在运行时切换代理和真实对象',
  ],
  cons: [
    '代码可能变得复杂，因为需要引入许多新的类',
    '服务响应可能会延迟，因为代理会增加一层间接访问',
    '增加系统复杂度，需要维护代理和真实对象的一致性',
  ],
  analogy: {
    title: '现实世界中的代理',
    description: '代理模式就像是现实生活中的各种代理服务，它们控制着对真实资源的访问，并在访问前后添加额外的功能。',
    scenarios: [
      {
        id: 'creditcard',
        title: '信用卡',
        description: '信用卡是银行账户的代理，它控制着对账户的访问，并可以在支付前后添加额外的功能（如积分、验证、信用检查）。你不需要随身携带大量现金（真实对象），只需使用信用卡（代理）即可完成支付。',
        icon: 'CreditCard',
      },
      {
        id: 'securitygate',
        title: '安检门',
        description: '机场安检门是登机口的代理。它控制着对登机口（真实对象）的访问，在允许通过前执行安全检查（额外功能）。',
        icon: 'Shield',
      },
      {
        id: 'webcache',
        title: '网页缓存',
        description: '浏览器缓存是远程服务器的代理。当访问网页时，浏览器先检查本地缓存（代理），如果存在且未过期就直接使用，避免重复请求远程服务器（真实对象）。',
        icon: 'Database',
      },
    ],
  },
  structure: {
    classDiagram: `
      class Subject {
        +request()
      }
      class RealSubject {
        +request()
      }
      class Proxy {
        -realSubject: RealSubject
        +request()
      }
      Subject <|-- RealSubject
      Subject <|-- Proxy
      Proxy --> RealSubject
    `,
    mermaidDiagram: `
classDiagram
  class Subject {
    <<interface>>
    +request()
  }
  
  class RealSubject {
    +request()
  }
  
  class Proxy {
    -realSubject: RealSubject
    -accessControl()
    -logging()
    -caching()
    +request()
  }
  
  class Client {
    +main()
  }
  
  Subject <|.. RealSubject : implements
  Subject <|.. Proxy : implements
  Proxy o--> RealSubject : contains
  Client ..> Subject : uses
  
  style Subject fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style RealSubject fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
  style Proxy fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: '定义主题接口',
        description: 'Subject 接口声明了 RealSubject 和 Proxy 的公共操作',
        duration: 2000,
        elements: [
          { id: 'subject', type: 'interface', name: 'Subject', x: 200, y: 150, methods: ['+request()'] },
        ],
      },
      {
        id: 'step2',
        title: '创建真实主题',
        description: 'RealSubject 是代理所代表的真实对象，包含核心业务逻辑',
        duration: 2000,
        elements: [
          { id: 'subject', type: 'interface', name: 'Subject', x: 200, y: 150, methods: ['+request()'] },
          { id: 'realsubject', type: 'class', name: 'RealSubject', x: 200, y: 350, methods: ['+request()'] },
        ],
        connections: [
          { from: 'realsubject', to: 'subject', type: 'implementation' },
        ],
      },
      {
        id: 'step3',
        title: '创建代理类',
        description: 'Proxy 维护一个对 RealSubject 的引用，并实现相同的接口',
        duration: 2500,
        elements: [
          { id: 'subject', type: 'interface', name: 'Subject', x: 200, y: 150, methods: ['+request()'] },
          { id: 'realsubject', type: 'class', name: 'RealSubject', x: 200, y: 350, methods: ['+request()'] },
          { id: 'proxy', type: 'class', name: 'Proxy', x: 450, y: 350, properties: ['-realSubject: RealSubject'], methods: ['+request()', '-accessControl()', '-logging()'] },
        ],
        connections: [
          { from: 'realsubject', to: 'subject', type: 'implementation' },
          { from: 'proxy', to: 'subject', type: 'implementation' },
          { from: 'proxy', to: 'realsubject', type: 'association', label: 'contains' },
        ],
      },
      {
        id: 'step4',
        title: '客户端使用',
        description: '客户端通过 Subject 接口与代理交互，无需知道是代理还是真实对象',
        duration: 2500,
        elements: [
          { id: 'subject', type: 'interface', name: 'Subject', x: 200, y: 150, methods: ['+request()'] },
          { id: 'realsubject', type: 'class', name: 'RealSubject', x: 200, y: 350, methods: ['+request()'] },
          { id: 'proxy', type: 'class', name: 'Proxy', x: 450, y: 350, properties: ['-realSubject: RealSubject'], methods: ['+request()', '-accessControl()', '-logging()'] },
          { id: 'client', type: 'class', name: 'Client', x: 450, y: 150, methods: ['+main()'] },
        ],
        connections: [
          { from: 'realsubject', to: 'subject', type: 'implementation' },
          { from: 'proxy', to: 'subject', type: 'implementation' },
          { from: 'proxy', to: 'realsubject', type: 'association', label: 'contains' },
          { from: 'client', to: 'subject', type: 'dependency', label: 'uses' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * =====================================================
 * 代理模式 - TypeScript 实现
 * 包含：虚拟代理、保护代理、ES6 Proxy
 * =====================================================
 */

// ============================================
// 1. 主题接口 - 定义 RealSubject 和 Proxy 的公共接口
// ============================================
interface Image {
  display(): void;
  getFileName(): string;
}

// ============================================
// 2. 真实主题 - 包含核心业务逻辑的真实对象
// ============================================
class RealImage implements Image {
  private fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
    this.loadFromDisk();
  }

  // 模拟从磁盘加载图片（耗时操作）
  private loadFromDisk(): void {
    console.log(\`加载图片: \${this.fileName}\`);
  }

  display(): void {
    console.log(\`显示图片: \${this.fileName}\`);
  }

  getFileName(): string {
    return this.fileName;
  }
}

// ============================================
// 3. 虚拟代理 - 延迟加载真实对象
//    用于：延迟初始化、优化性能、节省资源
// ============================================
class VirtualProxy implements Image {
  private realImage: RealImage | null = null;
  private fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  display(): void {
    // 延迟加载：只有在真正需要显示时才创建真实对象
    if (this.realImage === null) {
      console.log('虚拟代理: 首次访问，创建真实对象...');
      this.realImage = new RealImage(this.fileName);
    }
    this.realImage.display();
  }

  getFileName(): string {
    return this.fileName;
  }
}

// ============================================
// 4. 保护代理 - 控制访问权限
//    用于：访问控制、权限验证
// ============================================
interface Document {
  read(): string;
  write(content: string): void;
  getTitle(): string;
}

class RealDocument implements Document {
  private title: string;
  private content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }

  read(): string {
    return this.content;
  }

  write(content: string): void {
    this.content = content;
    console.log(\`文档 '\${this.title}' 已更新\`);
  }

  getTitle(): string {
    return this.title;
  }
}

// 用户角色枚举
enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

class ProtectionProxy implements Document {
  private realDocument: RealDocument;
  private userRole: UserRole;
  private userName: string;

  constructor(document: RealDocument, userName: string, userRole: UserRole) {
    this.realDocument = document;
    this.userName = userName;
    this.userRole = userRole;
  }

  // 检查读取权限
  private checkReadAccess(): boolean {
    return true; // 所有角色都可以读取
  }

  // 检查写入权限
  private checkWriteAccess(): boolean {
    return this.userRole === UserRole.ADMIN || this.userRole === UserRole.EDITOR;
  }

  read(): string {
    if (this.checkReadAccess()) {
      console.log(\`[保护代理] 用户 '\${this.userName}' 读取文档\`);
      return this.realDocument.read();
    }
    throw new Error('无权读取文档');
  }

  write(content: string): void {
    if (this.checkWriteAccess()) {
      console.log(\`[保护代理] 用户 '\${this.userName}' 写入文档\`);
      this.realDocument.write(content);
    } else {
      throw new Error(\`用户 '\${this.userName}' 无权写入文档，需要编辑权限\`);
    }
  }

  getTitle(): string {
    return this.realDocument.getTitle();
  }
}

// ============================================
// 5. 缓存代理 - 缓存请求结果
//    用于：性能优化、减少重复计算
// ============================================
interface ExpensiveOperation {
  compute(input: number): number;
}

class RealExpensiveOperation implements ExpensiveOperation {
  compute(input: number): number {
    // 模拟耗时计算
    console.log(\`执行耗时计算: compute(\${input})\`);
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += input * i;
    }
    return result;
  }
}

class CacheProxy implements ExpensiveOperation {
  private realOperation: RealExpensiveOperation;
  private cache: Map<number, number>;
  private cacheHits: number;

  constructor() {
    this.realOperation = new RealExpensiveOperation();
    this.cache = new Map();
    this.cacheHits = 0;
  }

  compute(input: number): number {
    // 检查缓存
    if (this.cache.has(input)) {
      this.cacheHits++;
      console.log(\`[缓存代理] 命中缓存: compute(\${input}) = \${this.cache.get(input)} (命中次数: \${this.cacheHits})\`);
      return this.cache.get(input)!;
    }

    // 缓存未命中，执行真实计算
    const result = this.realOperation.compute(input);
    this.cache.set(input, result);
    console.log(\`[缓存代理] 缓存新结果: compute(\${input}) = \${result}\`);
    return result;
  }

  getCacheStats(): { size: number; hits: number } {
    return { size: this.cache.size, hits: this.cacheHits };
  }

  clearCache(): void {
    this.cache.clear();
    this.cacheHits = 0;
    console.log('[缓存代理] 缓存已清空');
  }
}

// ============================================
// 6. ES6 Proxy - JavaScript 内置的代理机制
//    用于：拦截和自定义对象的基本操作
// ============================================
interface User {
  name: string;
  age: number;
  email: string;
  password: string; // 敏感字段
}

// 创建用户对象的代理，实现访问控制和日志记录
function createUserProxy(user: User): User {
  return new Proxy(user, {
    // 拦截属性读取
    get(target, prop: string | symbol) {
      // 隐藏敏感字段
      if (prop === 'password') {
        console.log('[ES6 Proxy] 阻止访问敏感字段: password');
        return '********';
      }
      console.log(\`[ES6 Proxy] 读取属性: \${String(prop)} = \${target[prop as keyof User]}\`);
      return target[prop as keyof User];
    },

    // 拦截属性设置
    set(target, prop: string | symbol, value) {
      // 验证年龄
      if (prop === 'age') {
        if (typeof value !== 'number' || value < 0 || value > 150) {
          throw new Error('[ES6 Proxy] 年龄必须是 0-150 之间的数字');
        }
      }
      // 验证邮箱格式
      if (prop === 'email') {
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailRegex.test(value)) {
          throw new Error('[ES6 Proxy] 邮箱格式无效');
        }
      }
      console.log(\`[ES6 Proxy] 设置属性: \${String(prop)} = \${value}\`);
      target[prop as keyof User] = value;
      return true;
    },

    // 拦截属性删除
    deleteProperty(target, prop: string | symbol) {
      console.log(\`[ES6 Proxy] 删除属性: \${String(prop)}\`);
      delete target[prop as keyof User];
      return true;
    },

    // 拦截属性枚举
    ownKeys(target) {
      console.log('[ES6 Proxy] 获取属性列表');
      return Object.keys(target).filter(key => key !== 'password');
    },
  });
}

// ============================================
// 7. 日志记录代理 - 记录方法调用
// ============================================
interface Service {
  operation1(): void;
  operation2(data: string): string;
}

class RealService implements Service {
  operation1(): void {
    console.log('RealService: 执行操作1');
  }

  operation2(data: string): string {
    console.log(\`RealService: 执行操作2，数据: \${data}\`);
    return \`处理结果: \${data.toUpperCase()}\`;
  }
}

class LoggingProxy implements Service {
  private realService: RealService;

  constructor(service: RealService) {
    this.realService = service;
  }

  operation1(): void {
    console.log('[日志代理] 调用 operation1()');
    const startTime = Date.now();
    this.realService.operation1();
    const endTime = Date.now();
    console.log(\`[日志代理] operation1() 完成，耗时: \${endTime - startTime}ms\`);
  }

  operation2(data: string): string {
    console.log(\`[日志代理] 调用 operation2(\${JSON.stringify(data)})\`);
    const startTime = Date.now();
    const result = this.realService.operation2(data);
    const endTime = Date.now();
    console.log(\`[日志代理] operation2() 完成，返回值: \${JSON.stringify(result)}，耗时: \${endTime - startTime}ms\`);
    return result;
  }
}

// ============================================
// 客户端使用示例
// ============================================
function clientCode(): void {
  console.log('========== 虚拟代理示例 ==========');
  // 使用虚拟代理延迟加载图片
  const image1 = new VirtualProxy('photo1.jpg');
  const image2 = new VirtualProxy('photo2.jpg');
  
  // 此时图片还未加载
  console.log('图片对象已创建，但尚未加载');
  
  // 第一次显示时才加载
  image1.display();
  // 第二次显示直接使用缓存
  image1.display();
  image2.display();

  console.log('\\n========== 保护代理示例 ==========');
  const document = new RealDocument('机密文档.txt', '这是机密内容');
  
  const adminProxy = new ProtectionProxy(document, '张三', UserRole.ADMIN);
  const viewerProxy = new ProtectionProxy(document, '李四', UserRole.VIEWER);
  
  // 管理员可以读写
  console.log('管理员读取:', adminProxy.read());
  adminProxy.write('更新后的机密内容');
  
  // 访客只能读不能写
  console.log('访客读取:', viewerProxy.read());
  try {
    viewerProxy.write('尝试写入');
  } catch (error) {
    console.error('错误:', (error as Error).message);
  }

  console.log('\\n========== 缓存代理示例 ==========');
  const cachedOperation = new CacheProxy();
  
  // 第一次计算
  cachedOperation.compute(5);
  // 第二次使用缓存
  cachedOperation.compute(5);
  cachedOperation.compute(5);
  // 新输入
  cachedOperation.compute(10);
  cachedOperation.compute(10);
  
  console.log('缓存统计:', cachedOperation.getCacheStats());

  console.log('\\n========== ES6 Proxy 示例 ==========');
  const user: User = {
    name: '王五',
    age: 25,
    email: 'wangwu@example.com',
    password: 'secret123',
  };
  
  const userProxy = createUserProxy(user);
  
  // 读取属性（密码被隐藏）
  console.log('姓名:', userProxy.name);
  console.log('密码:', userProxy.password);
  
  // 设置属性（带验证）
  userProxy.age = 30;
  try {
    userProxy.age = -5; // 验证失败
  } catch (error) {
    console.error('错误:', (error as Error).message);
  }
  
  // 查看可枚举属性（密码被排除）
  console.log('可枚举属性:', Object.keys(userProxy));

  console.log('\\n========== 日志代理示例 ==========');
  const service = new LoggingProxy(new RealService());
  service.operation1();
  const result = service.operation2('hello');
  console.log('最终结果:', result);
}

clientCode();`,

    java: `/**
 * =====================================================
 * 代理模式 - Java 实现
 * 包含：静态代理、动态代理（JDK Proxy、CGLIB）
 * =====================================================
 */

// ============================================
// 1. 主题接口
// ============================================
interface Image {
    void display();
    String getFileName();
}

// ============================================
// 2. 真实主题
// ============================================
class RealImage implements Image {
    private String fileName;

    public RealImage(String fileName) {
        this.fileName = fileName;
        loadFromDisk();
    }

    private void loadFromDisk() {
        System.out.println("加载图片: " + fileName);
    }

    @Override
    public void display() {
        System.out.println("显示图片: " + fileName);
    }

    @Override
    public String getFileName() {
        return fileName;
    }
}

// ============================================
// 3. 静态代理 - 虚拟代理
// ============================================
class VirtualProxy implements Image {
    private RealImage realImage;
    private String fileName;

    public VirtualProxy(String fileName) {
        this.fileName = fileName;
    }

    @Override
    public void display() {
        // 延迟加载
        if (realImage == null) {
            System.out.println("虚拟代理: 首次访问，创建真实对象...");
            realImage = new RealImage(fileName);
        }
        realImage.display();
    }

    @Override
    public String getFileName() {
        return fileName;
    }
}

// ============================================
// 4. 静态代理 - 保护代理
// ============================================
interface Document {
    String read();
    void write(String content);
    String getTitle();
}

class RealDocument implements Document {
    private String title;
    private String content;

    public RealDocument(String title, String content) {
        this.title = title;
        this.content = content;
    }

    @Override
    public String read() {
        return content;
    }

    @Override
    public void write(String content) {
        this.content = content;
        System.out.println("文档 '" + title + "' 已更新");
    }

    @Override
    public String getTitle() {
        return title;
    }
}

enum UserRole {
    ADMIN, EDITOR, VIEWER
}

class ProtectionProxy implements Document {
    private RealDocument realDocument;
    private UserRole userRole;
    private String userName;

    public ProtectionProxy(RealDocument document, String userName, UserRole userRole) {
        this.realDocument = document;
        this.userName = userName;
        this.userRole = userRole;
    }

    private boolean checkWriteAccess() {
        return userRole == UserRole.ADMIN || userRole == UserRole.EDITOR;
    }

    @Override
    public String read() {
        System.out.println("[保护代理] 用户 '" + userName + "' 读取文档");
        return realDocument.read();
    }

    @Override
    public void write(String content) {
        if (checkWriteAccess()) {
            System.out.println("[保护代理] 用户 '" + userName + "' 写入文档");
            realDocument.write(content);
        } else {
            throw new SecurityException("用户 '" + userName + "' 无权写入文档");
        }
    }

    @Override
    public String getTitle() {
        return realDocument.getTitle();
    }
}

// ============================================
// 5. 静态代理 - 缓存代理
// ============================================
interface ExpensiveOperation {
    long compute(int input);
}

class RealExpensiveOperation implements ExpensiveOperation {
    @Override
    public long compute(int input) {
        System.out.println("执行耗时计算: compute(" + input + ")");
        long result = 0;
        for (int i = 0; i < 1000000; i++) {
            result += input * i;
        }
        return result;
    }
}

class CacheProxy implements ExpensiveOperation {
    private RealExpensiveOperation realOperation;
    private Map<Integer, Long> cache;
    private int cacheHits;

    public CacheProxy() {
        this.realOperation = new RealExpensiveOperation();
        this.cache = new HashMap<>();
        this.cacheHits = 0;
    }

    @Override
    public long compute(int input) {
        if (cache.containsKey(input)) {
            cacheHits++;
            System.out.println("[缓存代理] 命中缓存: compute(" + input + ") = " + cache.get(input));
            return cache.get(input);
        }

        long result = realOperation.compute(input);
        cache.put(input, result);
        System.out.println("[缓存代理] 缓存新结果: compute(" + input + ") = " + result);
        return result;
    }

    public Map<String, Integer> getCacheStats() {
        Map<String, Integer> stats = new HashMap<>();
        stats.put("size", cache.size());
        stats.put("hits", cacheHits);
        return stats;
    }

    public void clearCache() {
        cache.clear();
        cacheHits = 0;
        System.out.println("[缓存代理] 缓存已清空");
    }
}

// ============================================
// 6. 动态代理 - JDK Proxy
//    基于接口的动态代理，运行时生成代理类
// ============================================
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

interface UserService {
    void addUser(String username);
    void deleteUser(String username);
    String getUser(String username);
}

class UserServiceImpl implements UserService {
    @Override
    public void addUser(String username) {
        System.out.println("添加用户: " + username);
    }

    @Override
    public void deleteUser(String username) {
        System.out.println("删除用户: " + username);
    }

    @Override
    public String getUser(String username) {
        return "用户信息: " + username;
    }
}

// 日志记录调用处理器
class LoggingInvocationHandler implements InvocationHandler {
    private Object target;

    public LoggingInvocationHandler(Object target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("[JDK动态代理] 调用方法: " + method.getName());
        long startTime = System.currentTimeMillis();
        
        Object result = method.invoke(target, args);
        
        long endTime = System.currentTimeMillis();
        System.out.println("[JDK动态代理] 方法 " + method.getName() + " 执行完成，耗时: " + (endTime - startTime) + "ms");
        return result;
    }
}

// ============================================
// 7. 动态代理 - CGLIB
//    基于继承的动态代理，可以代理没有接口的类
// ============================================
// 注意：需要添加 CGLIB 依赖
// <dependency>
//     <groupId>cglib</groupId>
//     <artifactId>cglib</artifactId>
//     <version>3.3.0</version>
// </dependency>

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;
import java.lang.reflect.Method;

// 没有实现接口的类
class OrderService {
    public void createOrder(String orderId) {
        System.out.println("创建订单: " + orderId);
    }

    public void cancelOrder(String orderId) {
        System.out.println("取消订单: " + orderId);
    }
}

// CGLIB 方法拦截器
class CglibInterceptor implements MethodInterceptor {
    @Override
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
        System.out.println("[CGLIB代理] 前置处理 - 方法: " + method.getName());
        
        Object result = proxy.invokeSuper(obj, args);
        
        System.out.println("[CGLIB代理] 后置处理 - 方法: " + method.getName());
        return result;
    }
}

// ============================================
// 客户端使用示例
// ============================================
public class ProxyPatternDemo {
    public static void main(String[] args) {
        System.out.println("========== 静态代理 - 虚拟代理 ==========");
        Image image = new VirtualProxy("test.jpg");
        System.out.println("图片代理已创建");
        image.display(); // 首次加载
        image.display(); // 使用缓存

        System.out.println("\\n========== 静态代理 - 保护代理 ==========");
        RealDocument doc = new RealDocument("机密文档.txt", "机密内容");
        Document adminProxy = new ProtectionProxy(doc, "管理员", UserRole.ADMIN);
        Document viewerProxy = new ProtectionProxy(doc, "访客", UserRole.VIEWER);
        
        System.out.println("管理员读取: " + adminProxy.read());
        adminProxy.write("更新内容");
        
        System.out.println("访客读取: " + viewerProxy.read());
        try {
            viewerProxy.write("尝试写入");
        } catch (SecurityException e) {
            System.out.println("错误: " + e.getMessage());
        }

        System.out.println("\\n========== 静态代理 - 缓存代理 ==========");
        ExpensiveOperation cacheProxy = new CacheProxy();
        cacheProxy.compute(5);
        cacheProxy.compute(5); // 命中缓存
        cacheProxy.compute(10);

        System.out.println("\\n========== JDK动态代理 ==========");
        UserService targetService = new UserServiceImpl();
        UserService jdkProxy = (UserService) Proxy.newProxyInstance(
            targetService.getClass().getClassLoader(),
            targetService.getClass().getInterfaces(),
            new LoggingInvocationHandler(targetService)
        );
        
        jdkProxy.addUser("张三");
        String userInfo = jdkProxy.getUser("张三");
        System.out.println("返回结果: " + userInfo);

        System.out.println("\\n========== CGLIB动态代理 ==========");
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(OrderService.class);
        enhancer.setCallback(new CglibInterceptor());
        
        OrderService cglibProxy = (OrderService) enhancer.create();
        cglibProxy.createOrder("ORDER001");
        cglibProxy.cancelOrder("ORDER001");
    }
}`,

    go: `/**
 * =====================================================
 * 代理模式 - Go 实现
 * 包含：接口代理、虚拟代理、保护代理、缓存代理
 * =====================================================
 */

package main

import (
	"fmt"
	"sync"
	"time"
)

// ============================================
// 1. 主题接口
// ============================================
type Image interface {
	Display()
	GetFileName() string
}

// ============================================
// 2. 真实主题
// ============================================
type RealImage struct {
	fileName string
}

func NewRealImage(fileName string) *RealImage {
	img := &RealImage{fileName: fileName}
	img.loadFromDisk()
	return img
}

func (r *RealImage) loadFromDisk() {
	fmt.Printf("加载图片: %s\\n", r.fileName)
}

func (r *RealImage) Display() {
	fmt.Printf("显示图片: %s\\n", r.fileName)
}

func (r *RealImage) GetFileName() string {
	return r.fileName
}

// ============================================
// 3. 虚拟代理 - 延迟加载
// ============================================
type VirtualProxy struct {
	fileName  string
	realImage *RealImage
	mu        sync.Mutex
}

func NewVirtualProxy(fileName string) *VirtualProxy {
	return &VirtualProxy{fileName: fileName}
}

func (v *VirtualProxy) Display() {
	v.mu.Lock()
	defer v.mu.Unlock()

	// 延迟加载
	if v.realImage == nil {
		fmt.Println("虚拟代理: 首次访问，创建真实对象...")
		v.realImage = NewRealImage(v.fileName)
	}
	v.realImage.Display()
}

func (v *VirtualProxy) GetFileName() string {
	return v.fileName
}

// ============================================
// 4. 保护代理 - 访问控制
// ============================================
type Document interface {
	Read() string
	Write(content string)
	GetTitle() string
}

type RealDocument struct {
	title   string
	content string
}

func NewRealDocument(title, content string) *RealDocument {
	return &RealDocument{title: title, content: content}
}

func (r *RealDocument) Read() string {
	return r.content
}

func (r *RealDocument) Write(content string) {
	r.content = content
	fmt.Printf("文档 '%s' 已更新\\n", r.title)
}

func (r *RealDocument) GetTitle() string {
	return r.title
}

type UserRole string

const (
	RoleAdmin  UserRole = "admin"
	RoleEditor UserRole = "editor"
	RoleViewer UserRole = "viewer"
)

type ProtectionProxy struct {
	realDocument *RealDocument
	userRole     UserRole
	userName     string
}

func NewProtectionProxy(doc *RealDocument, userName string, role UserRole) *ProtectionProxy {
	return &ProtectionProxy{
		realDocument: doc,
		userName:     userName,
		userRole:     role,
	}
}

func (p *ProtectionProxy) checkWriteAccess() bool {
	return p.userRole == RoleAdmin || p.userRole == RoleEditor
}

func (p *ProtectionProxy) Read() string {
	fmt.Printf("[保护代理] 用户 '%s' 读取文档\\n", p.userName)
	return p.realDocument.Read()
}

func (p *ProtectionProxy) Write(content string) {
	if p.checkWriteAccess() {
		fmt.Printf("[保护代理] 用户 '%s' 写入文档\\n", p.userName)
		p.realDocument.Write(content)
	} else {
		panic(fmt.Sprintf("用户 '%s' 无权写入文档", p.userName))
	}
}

func (p *ProtectionProxy) GetTitle() string {
	return p.realDocument.GetTitle()
}

// ============================================
// 5. 缓存代理 - 结果缓存
// ============================================
type ExpensiveOperation interface {
	Compute(input int) int64
}

type RealExpensiveOperation struct{}

func (r *RealExpensiveOperation) Compute(input int) int64 {
	fmt.Printf("执行耗时计算: Compute(%d)\\n", input)
	var result int64 = 0
	for i := 0; i < 1000000; i++ {
		result += int64(input * i)
	}
	return result
}

type CacheProxy struct {
	realOperation *RealExpensiveOperation
	cache         map[int]int64
	cacheHits     int
	mu            sync.RWMutex
}

func NewCacheProxy() *CacheProxy {
	return &CacheProxy{
		realOperation: &RealExpensiveOperation{},
		cache:         make(map[int]int64),
	}
}

func (c *CacheProxy) Compute(input int) int64 {
	c.mu.RLock()
	if result, exists := c.cache[input]; exists {
		c.cacheHits++
		c.mu.RUnlock()
		fmt.Printf("[缓存代理] 命中缓存: Compute(%d) = %d (命中次数: %d)\\n", 
			input, result, c.cacheHits)
		return result
	}
	c.mu.RUnlock()

	// 缓存未命中
	result := c.realOperation.Compute(input)
	
	c.mu.Lock()
	c.cache[input] = result
	c.mu.Unlock()
	
	fmt.Printf("[缓存代理] 缓存新结果: Compute(%d) = %d\\n", input, result)
	return result
}

func (c *CacheProxy) GetCacheStats() (size, hits int) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	return len(c.cache), c.cacheHits
}

func (c *CacheProxy) ClearCache() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.cache = make(map[int]int64)
	c.cacheHits = 0
	fmt.Println("[缓存代理] 缓存已清空")
}

// ============================================
// 6. 日志代理 - 记录调用
// ============================================
type Service interface {
	Operation1()
	Operation2(data string) string
}

type RealService struct{}

func (r *RealService) Operation1() {
	fmt.Println("RealService: 执行操作1")
}

func (r *RealService) Operation2(data string) string {
	fmt.Printf("RealService: 执行操作2，数据: %s\\n", data)
	return fmt.Sprintf("处理结果: %s", data)
}

type LoggingProxy struct {
	realService Service
}

func NewLoggingProxy(service Service) *LoggingProxy {
	return &LoggingProxy{realService: service}
}

func (l *LoggingProxy) Operation1() {
	fmt.Println("[日志代理] 调用 Operation1()")
	start := time.Now()
	l.realService.Operation1()
	elapsed := time.Since(start)
	fmt.Printf("[日志代理] Operation1() 完成，耗时: %v\\n", elapsed)
}

func (l *LoggingProxy) Operation2(data string) string {
	fmt.Printf("[日志代理] 调用 Operation2(%s)\\n", data)
	start := time.Now()
	result := l.realService.Operation2(data)
	elapsed := time.Since(start)
	fmt.Printf("[日志代理] Operation2() 完成，返回值: %s，耗时: %v\\n", result, elapsed)
	return result
}

// ============================================
// 7. 远程代理模拟 - 延迟和错误处理
// ============================================
type RemoteService interface {
	FetchData(id string) (string, error)
}

type RealRemoteService struct {
	serverAddress string
}

func NewRealRemoteService(address string) *RealRemoteService {
	return &RealRemoteService{serverAddress: address}
}

func (r *RealRemoteService) FetchData(id string) (string, error) {
	// 模拟网络延迟
	time.Sleep(100 * time.Millisecond)
	return fmt.Sprintf("来自 %s 的数据: ID=%s", r.serverAddress, id), nil
}

type RemoteProxy struct {
	realService   *RealRemoteService
	localCache    map[string]string
	retryCount    int
	mu            sync.RWMutex
}

func NewRemoteProxy(address string) *RemoteProxy {
	return &RemoteProxy{
		realService: NewRealRemoteService(address),
		localCache:  make(map[string]string),
		retryCount:  3,
	}
}

func (r *RemoteProxy) FetchData(id string) (string, error) {
	// 先检查本地缓存
	r.mu.RLock()
	if data, exists := r.localCache[id]; exists {
		r.mu.RUnlock()
		fmt.Printf("[远程代理] 本地缓存命中: %s\\n", id)
		return data, nil
	}
	r.mu.RUnlock()

	// 带重试机制的远程调用
	var result string
	var err error
	
	for i := 0; i < r.retryCount; i++ {
		fmt.Printf("[远程代理] 第 %d 次尝试获取数据: %s\\n", i+1, id)
		result, err = r.realService.FetchData(id)
		if err == nil {
			// 缓存结果
			r.mu.Lock()
			r.localCache[id] = result
			r.mu.Unlock()
			return result, nil
		}
		time.Sleep(50 * time.Millisecond)
	}
	
	return "", fmt.Errorf("在 %d 次尝试后仍然失败: %v", r.retryCount, err)
}

// ============================================
// 客户端使用示例
// ============================================
func main() {
	fmt.Println("========== 虚拟代理示例 ==========")
	image := NewVirtualProxy("photo.jpg")
	fmt.Println("图片代理已创建")
	image.Display() // 首次加载
	image.Display() // 使用缓存

	fmt.Println("\\n========== 保护代理示例 ==========")
	doc := NewRealDocument("机密文档.txt", "机密内容")
	adminProxy := NewProtectionProxy(doc, "管理员", RoleAdmin)
	viewerProxy := NewProtectionProxy(doc, "访客", RoleViewer)
	
	fmt.Println("管理员读取:", adminProxy.Read())
	adminProxy.Write("更新内容")
	
	fmt.Println("访客读取:", viewerProxy.Read())
	func() {
		defer func() {
			if r := recover(); r != nil {
				fmt.Printf("错误: %v\\n", r)
			}
		}()
		viewerProxy.Write("尝试写入")
	}()

	fmt.Println("\\n========== 缓存代理示例 ==========")
	cacheProxy := NewCacheProxy()
	cacheProxy.Compute(5)
	cacheProxy.Compute(5) // 命中缓存
	cacheProxy.Compute(10)
	size, hits := cacheProxy.GetCacheStats()
	fmt.Printf("缓存统计: 大小=%d, 命中=%d\\n", size, hits)

	fmt.Println("\\n========== 日志代理示例 ==========")
	loggingService := NewLoggingProxy(&RealService{})
	loggingService.Operation1()
	result := loggingService.Operation2("hello")
	fmt.Println("最终结果:", result)

	fmt.Println("\\n========== 远程代理示例 ==========")
	remoteProxy := NewRemoteProxy("https://api.example.com")
	data, _ := remoteProxy.FetchData("user123")
	fmt.Println("获取数据:", data)
	// 第二次从缓存获取
	data2, _ := remoteProxy.FetchData("user123")
	fmt.Println("获取数据(缓存):", data2)
}`,

    python: `/**
 * =====================================================
 * 代理模式 - Python 实现
 * 包含：类代理、__getattr__ 实现、虚拟代理、保护代理、缓存代理
 * =====================================================
 */

from abc import ABC, abstractmethod
from typing import Dict, Optional, Any, Callable
from functools import wraps
import time

# ============================================
# 1. 主题接口
# ============================================
class Image(ABC):
    @abstractmethod
    def display(self) -> None:
        pass
    
    @abstractmethod
    def get_file_name(self) -> str:
        pass

# ============================================
# 2. 真实主题
# ============================================
class RealImage(Image):
    def __init__(self, file_name: str):
        self._file_name = file_name
        self._load_from_disk()
    
    def _load_from_disk(self) -> None:
        print(f"加载图片: {self._file_name}")
    
    def display(self) -> None:
        print(f"显示图片: {self._file_name}")
    
    def get_file_name(self) -> str:
        return self._file_name

# ============================================
# 3. 虚拟代理 - 延迟加载
# ============================================
class VirtualProxy(Image):
    def __init__(self, file_name: str):
        self._file_name = file_name
        self._real_image: Optional[RealImage] = None
    
    def display(self) -> None:
        # 延迟加载
        if self._real_image is None:
            print("虚拟代理: 首次访问，创建真实对象...")
            self._real_image = RealImage(self._file_name)
        self._real_image.display()
    
    def get_file_name(self) -> str:
        return self._file_name

# ============================================
# 4. 保护代理 - 访问控制
# ============================================
class Document(ABC):
    @abstractmethod
    def read(self) -> str:
        pass
    
    @abstractmethod
    def write(self, content: str) -> None:
        pass
    
    @abstractmethod
    def get_title(self) -> str:
        pass

class RealDocument(Document):
    def __init__(self, title: str, content: str):
        self._title = title
        self._content = content
    
    def read(self) -> str:
        return self._content
    
    def write(self, content: str) -> None:
        self._content = content
        print(f"文档 '{self._title}' 已更新")
    
    def get_title(self) -> str:
        return self._title

from enum import Enum

class UserRole(Enum):
    ADMIN = "admin"
    EDITOR = "editor"
    VIEWER = "viewer"

class ProtectionProxy(Document):
    def __init__(self, document: RealDocument, user_name: str, user_role: UserRole):
        self._real_document = document
        self._user_name = user_name
        self._user_role = user_role
    
    def _check_write_access(self) -> bool:
        return self._user_role in (UserRole.ADMIN, UserRole.EDITOR)
    
    def read(self) -> str:
        print(f"[保护代理] 用户 '{self._user_name}' 读取文档")
        return self._real_document.read()
    
    def write(self, content: str) -> None:
        if self._check_write_access():
            print(f"[保护代理] 用户 '{self._user_name}' 写入文档")
            self._real_document.write(content)
        else:
            raise PermissionError(f"用户 '{self._user_name}' 无权写入文档")
    
    def get_title(self) -> str:
        return self._real_document.get_title()

# ============================================
# 5. 缓存代理 - 结果缓存
# ============================================
class ExpensiveOperation(ABC):
    @abstractmethod
    def compute(self, input_value: int) -> int:
        pass

class RealExpensiveOperation(ExpensiveOperation):
    def compute(self, input_value: int) -> int:
        print(f"执行耗时计算: compute({input_value})")
        result = 0
        for i in range(1000000):
            result += input_value * i
        return result

class CacheProxy(ExpensiveOperation):
    def __init__(self):
        self._real_operation = RealExpensiveOperation()
        self._cache: Dict[int, int] = {}
        self._cache_hits = 0
    
    def compute(self, input_value: int) -> int:
        if input_value in self._cache:
            self._cache_hits += 1
            print(f"[缓存代理] 命中缓存: compute({input_value}) = {self._cache[input_value]} "
                  f"(命中次数: {self._cache_hits})")
            return self._cache[input_value]
        
        result = self._real_operation.compute(input_value)
        self._cache[input_value] = result
        print(f"[缓存代理] 缓存新结果: compute({input_value}) = {result}")
        return result
    
    def get_cache_stats(self) -> Dict[str, int]:
        return {"size": len(self._cache), "hits": self._cache_hits}
    
    def clear_cache(self) -> None:
        self._cache.clear()
        self._cache_hits = 0
        print("[缓存代理] 缓存已清空")

# ============================================
# 6. 使用 __getattr__ 实现的通用代理
#    可以代理任意对象，自动转发所有方法调用
# ============================================
class GenericProxy:
    """
    通用代理类，使用 __getattr__ 自动转发所有方法调用
    可以添加前置/后置处理逻辑
    """
    def __init__(self, target: Any):
        self._target = target
        self._call_count = 0
        self._method_stats: Dict[str, int] = {}
    
    def __getattr__(self, name: str) -> Any:
        """
        当访问不存在的属性时调用
        将调用转发给被代理的对象
        """
        attr = getattr(self._target, name)
        
        # 如果是可调用对象，包装它
        if callable(attr):
            def wrapper(*args, **kwargs):
                self._call_count += 1
                self._method_stats[name] = self._method_stats.get(name, 0) + 1
                
                print(f"[通用代理] 调用 {name}，参数: {args}, {kwargs}")
                start_time = time.time()
                
                try:
                    result = attr(*args, **kwargs)
                    elapsed = (time.time() - start_time) * 1000
                    print(f"[通用代理] {name} 完成，耗时: {elapsed:.2f}ms，返回值: {result}")
                    return result
                except Exception as e:
                    print(f"[通用代理] {name} 抛出异常: {e}")
                    raise
            
            return wrapper
        
        return attr
    
    def get_stats(self) -> Dict[str, Any]:
        return {
            "total_calls": self._call_count,
            "method_stats": self._method_stats.copy()
        }

# ============================================
# 7. 装饰器实现的代理
# ============================================
def logging_proxy(func: Callable) -> Callable:
    """
    日志代理装饰器，记录函数调用信息
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"[装饰器代理] 调用 {func.__name__}")
        start_time = time.time()
        result = func(*args, **kwargs)
        elapsed = (time.time() - start_time) * 1000
        print(f"[装饰器代理] {func.__name__} 完成，耗时: {elapsed:.2f}ms")
        return result
    return wrapper

def cache_proxy(func: Callable) -> Callable:
    """
    缓存代理装饰器，缓存函数结果
    """
    cache: Dict[tuple, Any] = {}
    
    @wraps(func)
    def wrapper(*args, **kwargs):
        # 创建缓存键（注意：kwargs 需要排序以确保一致性）
        key = (args, tuple(sorted(kwargs.items())))
        
        if key in cache:
            print(f"[装饰器缓存] 命中: {func.__name__}{args}")
            return cache[key]
        
        result = func(*args, **kwargs)
        cache[key] = result
        print(f"[装饰器缓存] 缓存: {func.__name__}{args} = {result}")
        return result
    
    wrapper.cache = cache  # 暴露缓存以便查看
    return wrapper

# 使用装饰器的示例类
class Calculator:
    @logging_proxy
    @cache_proxy
    def fibonacci(self, n: int) -> int:
        """计算斐波那契数列（带缓存）"""
        if n < 2:
            return n
        return self.fibonacci(n - 1) + self.fibonacci(n - 2)
    
    @logging_proxy
    def slow_operation(self, x: int) -> int:
        """模拟耗时操作"""
        time.sleep(0.1)
        return x * x

# ============================================
# 8. 属性访问控制代理
# ============================================
class AttributeAccessProxy:
    """
    控制属性访问的代理，可以隐藏敏感字段、验证数据
    """
    def __init__(self, target: Any, sensitive_fields: set = None, 
                 readonly_fields: set = None):
        self._target = target
        self._sensitive_fields = sensitive_fields or set()
        self._readonly_fields = readonly_fields or set()
    
    def __getattr__(self, name: str) -> Any:
        if name in self._sensitive_fields:
            print(f"[属性代理] 阻止访问敏感字段: {name}")
            return "********"
        return getattr(self._target, name)
    
    def __setattr__(self, name: str, value: Any) -> None:
        if name.startswith('_'):
            super().__setattr__(name, value)
            return
        
        if name in self._readonly_fields:
            raise AttributeError(f"字段 '{name}' 是只读的")
        
        print(f"[属性代理] 设置 {name} = {value}")
        setattr(self._target, name, value)
    
    def __delattr__(self, name: str) -> None:
        if name.startswith('_'):
            super().__delattr__(name)
            return
        
        print(f"[属性代理] 删除属性: {name}")
        delattr(self._target, name)

# ============================================
# 客户端使用示例
# ============================================
def client_code():
    print("========== 虚拟代理示例 ==========")
    image = VirtualProxy("photo.jpg")
    print("图片代理已创建")
    image.display()  # 首次加载
    image.display()  # 使用缓存

    print("\\n========== 保护代理示例 ==========")
    doc = RealDocument("机密文档.txt", "机密内容")
    admin_proxy = ProtectionProxy(doc, "管理员", UserRole.ADMIN)
    viewer_proxy = ProtectionProxy(doc, "访客", UserRole.VIEWER)
    
    print("管理员读取:", admin_proxy.read())
    admin_proxy.write("更新内容")
    
    print("访客读取:", viewer_proxy.read())
    try:
        viewer_proxy.write("尝试写入")
    except PermissionError as e:
        print(f"错误: {e}")

    print("\\n========== 缓存代理示例 ==========")
    cache_proxy = CacheProxy()
    cache_proxy.compute(5)
    cache_proxy.compute(5)  # 命中缓存
    cache_proxy.compute(10)
    print("缓存统计:", cache_proxy.get_cache_stats())

    print("\\n========== 通用代理 (__getattr__) 示例 ==========")
    real_calc = RealExpensiveOperation()
    generic_proxy = GenericProxy(real_calc)
    
    result1 = generic_proxy.compute(3)
    result2 = generic_proxy.compute(3)
    print("代理统计:", generic_proxy.get_stats())

    print("\\n========== 装饰器代理示例 ==========")
    calc = Calculator()
    # 计算斐波那契数列（会自动缓存中间结果）
    print(f"fib(10) = {calc.fibonacci(10)}")
    print(f"fib(10) 再次调用 = {calc.fibonacci(10)}")  # 从缓存获取
    
    calc.slow_operation(5)
    calc.slow_operation(5)

    print("\\n========== 属性访问控制代理示例 ==========")
    class User:
        def __init__(self):
            self.name = "张三"
            self.email = "zhangsan@example.com"
            self.password = "secret123"
            self.id = 12345
    
    user = User()
    user_proxy = AttributeAccessProxy(
        user, 
        sensitive_fields={"password"},
        readonly_fields={"id"}
    )
    
    print("姓名:", user_proxy.name)
    print("密码:", user_proxy.password)  # 被隐藏
    
    user_proxy.name = "李四"  # 允许修改
    try:
        user_proxy.id = 99999  # 只读字段
    except AttributeError as e:
        print(f"错误: {e}")

if __name__ == "__main__":
    client_code()`,

    cpp: `/**
 * =====================================================
 * 代理模式 - C++ 实现
 * 包含：智能指针代理、虚代理、保护代理、缓存代理
 * =====================================================
 */

#include <iostream>
#include <string>
#include <memory>
#include <map>
#include <chrono>
#include <thread>

// ============================================
// 1. 主题接口
// ============================================
class Image {
public:
    virtual ~Image() = default;
    virtual void display() = 0;
    virtual std::string getFileName() const = 0;
};

// ============================================
// 2. 真实主题
// ============================================
class RealImage : public Image {
private:
    std::string fileName;

    void loadFromDisk() {
        std::cout << "加载图片: " << fileName << std::endl;
    }

public:
    explicit RealImage(const std::string& fileName) : fileName(fileName) {
        loadFromDisk();
    }

    void display() override {
        std::cout << "显示图片: " << fileName << std::endl;
    }

    std::string getFileName() const override {
        return fileName;
    }
};

// ============================================
// 3. 虚拟代理 - 延迟加载
// ============================================
class VirtualProxy : public Image {
private:
    std::string fileName;
    std::unique_ptr<RealImage> realImage;

public:
    explicit VirtualProxy(const std::string& fileName) : fileName(fileName) {}

    void display() override {
        // 延迟加载
        if (!realImage) {
            std::cout << "虚拟代理: 首次访问，创建真实对象..." << std::endl;
            realImage = std::make_unique<RealImage>(fileName);
        }
        realImage->display();
    }

    std::string getFileName() const override {
        return fileName;
    }
};

// ============================================
// 4. 保护代理 - 访问控制
// ============================================
class Document {
public:
    virtual ~Document() = default;
    virtual std::string read() = 0;
    virtual void write(const std::string& content) = 0;
    virtual std::string getTitle() const = 0;
};

class RealDocument : public Document {
private:
    std::string title;
    std::string content;

public:
    RealDocument(const std::string& title, const std::string& content)
        : title(title), content(content) {}

    std::string read() override {
        return content;
    }

    void write(const std::string& newContent) override {
        content = newContent;
        std::cout << "文档 '" << title << "' 已更新" << std::endl;
    }

    std::string getTitle() const override {
        return title;
    }
};

enum class UserRole {
    ADMIN,
    EDITOR,
    VIEWER
};

class ProtectionProxy : public Document {
private:
    std::shared_ptr<RealDocument> realDocument;
    UserRole userRole;
    std::string userName;

    bool checkWriteAccess() const {
        return userRole == UserRole::ADMIN || userRole == UserRole::EDITOR;
    }

public:
    ProtectionProxy(std::shared_ptr<RealDocument> document, 
                    const std::string& userName, 
                    UserRole role)
        : realDocument(document), userName(userName), userRole(role) {}

    std::string read() override {
        std::cout << "[保护代理] 用户 '" << userName << "' 读取文档" << std::endl;
        return realDocument->read();
    }

    void write(const std::string& content) override {
        if (checkWriteAccess()) {
            std::cout << "[保护代理] 用户 '" << userName << "' 写入文档" << std::endl;
            realDocument->write(content);
        } else {
            throw std::runtime_error("用户 '" + userName + "' 无权写入文档");
        }
    }

    std::string getTitle() const override {
        return realDocument->getTitle();
    }
};

// ============================================
// 5. 缓存代理 - 结果缓存
// ============================================
class ExpensiveOperation {
public:
    virtual ~ExpensiveOperation() = default;
    virtual long long compute(int input) = 0;
};

class RealExpensiveOperation : public ExpensiveOperation {
public:
    long long compute(int input) override {
        std::cout << "执行耗时计算: compute(" << input << ")" << std::endl;
        long long result = 0;
        for (int i = 0; i < 1000000; i++) {
            result += static_cast<long long>(input) * i;
        }
        return result;
    }
};

class CacheProxy : public ExpensiveOperation {
private:
    std::unique_ptr<RealExpensiveOperation> realOperation;
    std::map<int, long long> cache;
    int cacheHits;

public:
    CacheProxy() : realOperation(std::make_unique<RealExpensiveOperation>()), 
                   cacheHits(0) {}

    long long compute(int input) override {
        auto it = cache.find(input);
        if (it != cache.end()) {
            cacheHits++;
            std::cout << "[缓存代理] 命中缓存: compute(" << input << ") = " 
                      << it->second << " (命中次数: " << cacheHits << ")" << std::endl;
            return it->second;
        }

        long long result = realOperation->compute(input);
        cache[input] = result;
        std::cout << "[缓存代理] 缓存新结果: compute(" << input << ") = " 
                  << result << std::endl;
        return result;
    }

    struct CacheStats {
        size_t size;
        int hits;
    };

    CacheStats getCacheStats() const {
        return {cache.size(), cacheHits};
    }

    void clearCache() {
        cache.clear();
        cacheHits = 0;
        std::cout << "[缓存代理] 缓存已清空" << std::endl;
    }
};

// ============================================
// 6. 智能指针代理 - 引用计数和自动内存管理
// ============================================
template<typename T>
class SmartPointerProxy {
private:
    T* ptr;
    int* refCount;

    void release() {
        if (refCount) {
            (*refCount)--;
            if (*refCount == 0) {
                delete ptr;
                delete refCount;
                std::cout << "[智能指针代理] 对象已销毁" << std::endl;
            }
        }
    }

public:
    // 构造函数
    explicit SmartPointerProxy(T* p = nullptr) : ptr(p), refCount(nullptr) {
        if (ptr) {
            refCount = new int(1);
            std::cout << "[智能指针代理] 创建对象，引用计数: 1" << std::endl;
        }
    }

    // 拷贝构造函数
    SmartPointerProxy(const SmartPointerProxy& other) : ptr(other.ptr), refCount(other.refCount) {
        if (refCount) {
            (*refCount)++;
            std::cout << "[智能指针代理] 拷贝构造，引用计数: " << *refCount << std::endl;
        }
    }

    // 移动构造函数
    SmartPointerProxy(SmartPointerProxy&& other) noexcept : ptr(other.ptr), refCount(other.refCount) {
        other.ptr = nullptr;
        other.refCount = nullptr;
        std::cout << "[智能指针代理] 移动构造" << std::endl;
    }

    // 析构函数
    ~SmartPointerProxy() {
        release();
    }

    // 拷贝赋值运算符
    SmartPointerProxy& operator=(const SmartPointerProxy& other) {
        if (this != &other) {
            release();
            ptr = other.ptr;
            refCount = other.refCount;
            if (refCount) {
                (*refCount)++;
            }
        }
        return *this;
    }

    // 解引用运算符
    T& operator*() const {
        return *ptr;
    }

    // 箭头运算符
    T* operator->() const {
        return ptr;
    }

    // 获取原始指针
    T* get() const {
        return ptr;
    }

    // 获取引用计数
    int useCount() const {
        return refCount ? *refCount : 0;
    }

    // 检查是否为空
    bool isNull() const {
        return ptr == nullptr;
    }
};

// 用于智能指针代理的示例类
class Resource {
private:
    std::string name;

public:
    explicit Resource(const std::string& name) : name(name) {
        std::cout << "Resource '" << name << "' 创建" << std::endl;
    }

    ~Resource() {
        std::cout << "Resource '" << name << "' 销毁" << std::endl;
    }

    void doSomething() {
        std::cout << "Resource '" << name << "' 执行操作" << std::endl;
    }

    std::string getName() const {
        return name;
    }
};

// ============================================
// 7. 日志代理 - 记录方法调用
// ============================================
class Service {
public:
    virtual ~Service() = default;
    virtual void operation1() = 0;
    virtual std::string operation2(const std::string& data) = 0;
};

class RealService : public Service {
public:
    void operation1() override {
        std::cout << "RealService: 执行操作1" << std::endl;
    }

    std::string operation2(const std::string& data) override {
        std::cout << "RealService: 执行操作2，数据: " << data << std::endl;
        return "处理结果: " + data;
    }
};

class LoggingProxy : public Service {
private:
    std::unique_ptr<RealService> realService;

    std::string getCurrentTime() {
        auto now = std::chrono::system_clock::now();
        auto time = std::chrono::system_clock::to_time_t(now);
        char buffer[26];
        ctime_s(buffer, sizeof(buffer), &time);
        std::string timeStr(buffer);
        // 移除换行符
        if (!timeStr.empty() && timeStr.back() == '\\n') {
            timeStr.pop_back();
        }
        return timeStr;
    }

public:
    LoggingProxy() : realService(std::make_unique<RealService>()) {}

    void operation1() override {
        std::cout << "[日志代理] [" << getCurrentTime() << "] 调用 operation1()" << std::endl;
        auto start = std::chrono::high_resolution_clock::now();
        
        realService->operation1();
        
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
        std::cout << "[日志代理] operation1() 完成，耗时: " << duration.count() << " μs" << std::endl;
    }

    std::string operation2(const std::string& data) override {
        std::cout << "[日志代理] [" << getCurrentTime() << "] 调用 operation2(\"" << data << "\")" << std::endl;
        auto start = std::chrono::high_resolution_clock::now();
        
        std::string result = realService->operation2(data);
        
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
        std::cout << "[日志代理] operation2() 完成，返回值: \"" << result 
                  << "\"，耗时: " << duration.count() << " μs" << std::endl;
        return result;
    }
};

// ============================================
// 客户端使用示例
// ============================================
int main() {
    std::cout << "========== 虚拟代理示例 ==========" << std::endl;
    {
        std::unique_ptr<Image> image = std::make_unique<VirtualProxy>("photo.jpg");
        std::cout << "图片代理已创建" << std::endl;
        image->display();  // 首次加载
        image->display();  // 使用缓存
    }

    std::cout << "\\n========== 保护代理示例 ==========" << std::endl;
    {
        auto realDoc = std::make_shared<RealDocument>("机密文档.txt", "机密内容");
        
        auto adminProxy = std::make_unique<ProtectionProxy>(realDoc, "管理员", UserRole::ADMIN);
        auto viewerProxy = std::make_unique<ProtectionProxy>(realDoc, "访客", UserRole::VIEWER);
        
        std::cout << "管理员读取: " << adminProxy->read() << std::endl;
        adminProxy->write("更新内容");
        
        std::cout << "访客读取: " << viewerProxy->read() << std::endl;
        try {
            viewerProxy->write("尝试写入");
        } catch (const std::exception& e) {
            std::cout << "错误: " << e.what() << std::endl;
        }
    }

    std::cout << "\\n========== 缓存代理示例 ==========" << std::endl;
    {
        std::unique_ptr<ExpensiveOperation> cacheProxy = std::make_unique<CacheProxy>();
        cacheProxy->compute(5);
        cacheProxy->compute(5);  // 命中缓存
        cacheProxy->compute(10);
        
        auto stats = dynamic_cast<CacheProxy*>(cacheProxy.get())->getCacheStats();
        std::cout << "缓存统计: 大小=" << stats.size << ", 命中=" << stats.hits << std::endl;
    }

    std::cout << "\\n========== 智能指针代理示例 ==========" << std::endl;
    {
        // 创建智能指针代理
        SmartPointerProxy<Resource> res1(new Resource("资源1"));
        std::cout << "引用计数: " << res1.useCount() << std::endl;
        
        {
            // 拷贝构造，引用计数增加
            SmartPointerProxy<Resource> res2 = res1;
            std::cout << "引用计数: " << res1.useCount() << std::endl;
            
            res2->doSomething();
        }  // res2 离开作用域，引用计数减少
        
        std::cout << "引用计数: " << res1.useCount() << std::endl;
        res1->doSomething();
    }  // res1 离开作用域，对象被销毁

    std::cout << "\\n========== 日志代理示例 ==========" << std::endl;
    {
        std::unique_ptr<Service> service = std::make_unique<LoggingProxy>();
        service->operation1();
        std::string result = service->operation2("hello");
        std::cout << "最终结果: " << result << std::endl;
    }

    return 0;
}`,
  },
  realWorldExamples: [
    {
      title: 'Java RMI（远程方法调用）',
      description: 'Java RMI 使用代理模式来访问远程对象。客户端使用 Stub（代理）与远程对象通信，Stub 负责网络通信的细节，对客户端透明。',
      source: 'JDK',
      codeSnippet: `// 获取远程对象的存根（代理）
Registry registry = LocateRegistry.getRegistry("localhost", 1099);
RemoteInterface stub = (RemoteInterface) registry.lookup("RemoteService");
// 像调用本地方法一样调用远程方法
String result = stub.remoteMethod();`,
    },
    {
      title: 'Spring AOP',
      description: 'Spring 框架的面向切面编程（AOP）使用代理模式实现。JDK 动态代理用于接口代理，CGLIB 用于类代理，在方法调用前后添加横切关注点（如事务、日志）。',
      source: 'Spring Framework',
      codeSnippet: `@Transactional
public void transferMoney(Account from, Account to, BigDecimal amount) {
    // Spring 使用代理在此方法前后自动开启和提交事务
}`,
    },
    {
      title: 'Hibernate 延迟加载',
      description: 'Hibernate 使用代理模式实现关联对象的延迟加载。当访问实体对象的关联集合时，返回的是代理对象，只有在真正访问数据时才从数据库加载。',
      source: 'Hibernate',
      codeSnippet: `// department 是代理对象，尚未加载员工数据
Department department = session.load(Department.class, 1L);
// 首次访问 employees 时才执行 SQL 查询
Set<Employee> employees = department.getEmployees();`,
    },
    {
      title: 'Android 的 Binder 机制',
      description: 'Android 的跨进程通信（IPC）使用 Binder 机制，其中 BinderProxy 是本地进程中的代理，负责将方法调用序列化后传递给远程的 Binder 对象。',
      source: 'Android Framework',
      codeSnippet: `// ActivityManager.getService() 返回的是 IActivityManager 的代理
IActivityManager am = ActivityManager.getService();
am.startActivity(...); // 实际通过 Binder 代理进行 IPC`,
    },
  ],
  relatedPatterns: ['adapter', 'decorator', 'facade', 'flyweight'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '代理模式的主要目的是什么？',
      options: [
        '创建对象的多个实例',
        '控制对对象的访问',
        '转换对象的接口',
        '组合对象形成树形结构',
      ],
      correctAnswer: 1,
      explanation: '代理模式的主要目的是为其他对象提供一种代理以控制对这个对象的访问。代理可以在访问真实对象前后添加额外的逻辑。',
    },
    {
      id: 'q2',
      type: 'multiple',
      question: '以下哪些是代理模式的常见类型？',
      options: [
        '虚拟代理（延迟加载）',
        '保护代理（访问控制）',
        '缓存代理（结果缓存）',
        '远程代理（网络通信）',
      ],
      correctAnswer: [0, 1, 2, 3],
      explanation: '这些都是代理模式的常见类型。虚拟代理用于延迟初始化，保护代理用于访问控制，缓存代理用于缓存结果，远程代理用于访问远程对象。',
    },
    {
      id: 'q3',
      type: 'single',
      question: '代理模式和装饰器模式的主要区别是什么？',
      options: [
        '代理模式控制访问，装饰器模式添加功能',
        '代理模式用于创建对象，装饰器模式用于销毁对象',
        '代理模式是结构型模式，装饰器模式是行为型模式',
        '两者完全相同，没有区别',
      ],
      correctAnswer: 0,
      explanation: '代理模式主要目的是控制对对象的访问，而装饰器模式的主要目的是在不改变接口的情况下动态添加功能。虽然两者都使用组合，但意图不同。',
    },
    {
      id: 'q4',
      type: 'boolean',
      question: '在 Java 中，JDK 动态代理只能代理实现了接口的类',
      options: ['正确', '错误'],
      correctAnswer: 0,
      explanation: '正确。JDK 动态代理基于接口实现，只能代理实现了接口的类。如果要代理没有实现接口的类，需要使用 CGLIB 等基于继承的代理方式。',
    },
    {
      id: 'q5',
      type: 'single',
      question: '以下哪种情况最适合使用虚拟代理？',
      options: [
        '需要记录所有方法调用的日志',
        '需要控制不同用户的访问权限',
        '有一个创建成本很高的对象，且不是每次都会使用',
        '需要将本地调用转换为远程调用',
      ],
      correctAnswer: 2,
      explanation: '虚拟代理适用于延迟初始化场景，当有一个创建成本很高的对象，且不是每次都会使用时，可以使用虚拟代理延迟对象的创建直到真正需要时。',
    },
  ],
};