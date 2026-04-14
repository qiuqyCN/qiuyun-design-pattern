import type { DesignPattern } from '@/types/pattern';

export const observerPattern: DesignPattern = {
  id: 'observer',
  name: '观察者模式',
  nameEn: 'Observer Pattern',
  category: 'behavioral',
  difficulty: 'easy',
  frequency: 'high',
  intent: '定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。',
  description: '观察者模式是一种行为型设计模式，它允许你定义一个订阅机制，可以在对象事件发生时通知多个"观察"该对象的其他对象。',
  applicability: [
    '当一个对象的改变需要同时改变其他对象，而且不知道具体有多少对象有待改变时',
    '当一个对象必须通知其他对象，而它又不能假定其他对象是谁时',
    '当一个抽象模型有两个方面，其中一个方面依赖于另一个方面时',
  ],
  pros: [
    '开闭原则：无需修改发布者代码就能引入新的订阅者类',
    '可以在运行时建立对象之间的联系',
    '观察者和被观察者之间是抽象耦合的',
  ],
  cons: [
    '订阅者的通知顺序是随机的',
    '如果观察者和被观察者之间有循环依赖，可能导致系统崩溃',
    '如果观察者太多，通知所有观察者可能需要很多时间',
  ],
  analogy: {
    title: '现实世界中的观察者',
    description: '观察者模式就像是现实世界中的订阅和通知系统',
    scenarios: [
      {
        id: 'newsletter',
        title: '邮件订阅',
        description: '你订阅了一个邮件列表，当有新文章发布时，所有订阅者都会收到邮件通知。',
        icon: 'Mail',
      },
      {
        id: 'social',
        title: '社交媒体',
        description: '你关注了某个博主，当博主发布新内容时，你会收到推送通知。',
        icon: 'Bell',
      },
    ],
  },
  structure: {
    classDiagram: `
      class Subject {
        -observers: Observer[]
        +attach(o: Observer)
        +detach(o: Observer)
        +notify()
      }
      class Observer {
        +update()
      }
      class ConcreteSubject {
        -state
        +getState()
        +setState()
      }
      class ConcreteObserver {
        -subject
        +update()
      }
      Subject --> Observer
      ConcreteSubject --> ConcreteObserver
    `,
    mermaidDiagram: `
classDiagram
  class Subject {
    <<interface>>
    +attach(observer: Observer)
    +detach(observer: Observer)
    +notify()
  }
  
  class Observer {
    <<interface>>
    +update(subject: Subject)
  }
  
  class ConcreteSubject {
    -observers: Observer[]
    -state: any
    +attach(observer: Observer)
    +detach(observer: Observer)
    +notify()
    +getState()
    +setState(state)
  }
  
  class ConcreteObserver {
    -name: string
    +update(subject: Subject)
  }
  
  class Client {
    +main()
  }
  
  Subject <|.. ConcreteSubject : implements
  Observer <|.. ConcreteObserver : implements
  ConcreteSubject --> Observer : notifies
  ConcreteObserver --> Subject : observes
  Client ..> ConcreteSubject : creates
  Client ..> ConcreteObserver : creates
  
  style Subject fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
  style Observer fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
  style ConcreteSubject fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style ConcreteObserver fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: '定义主题接口',
        description: '定义 Subject 接口，包含 attach、detach 和 notify 方法',
        duration: 2000,
        elements: [
          { id: 'subject', type: 'interface', name: 'Subject', x: 200, y: 100, methods: ['+attach(o)', '+detach(o)', '+notify()'] },
        ],
      },
      {
        id: 'step2',
        title: '定义观察者接口',
        description: '定义 Observer 接口，包含 update 方法用于接收通知',
        duration: 2000,
        elements: [
          { id: 'subject', type: 'interface', name: 'Subject', x: 200, y: 100, methods: ['+attach(o)', '+detach(o)', '+notify()'] },
          { id: 'observer', type: 'interface', name: 'Observer', x: 500, y: 100, methods: ['+update()'] },
        ],
      },
      {
        id: 'step3',
        title: '实现具体主题',
        description: 'ConcreteSubject 实现 Subject 接口，维护观察者列表和状态',
        duration: 2500,
        elements: [
          { id: 'subject', type: 'interface', name: 'Subject', x: 200, y: 100, methods: ['+attach(o)', '+detach(o)', '+notify()'] },
          { id: 'observer', type: 'interface', name: 'Observer', x: 500, y: 100, methods: ['+update()'] },
          { id: 'concreteSubject', type: 'class', name: 'ConcreteSubject', x: 200, y: 300, properties: ['-observers[]', '-state'], methods: ['+attach()', '+detach()', '+notify()', '+getState()', '+setState()'] },
        ],
        connections: [
          { from: 'concreteSubject', to: 'subject', type: 'implementation' },
        ],
      },
      {
        id: 'step4',
        title: '实现具体观察者',
        description: 'ConcreteObserver 实现 Observer 接口，定义收到通知后的行为',
        duration: 2500,
        elements: [
          { id: 'subject', type: 'interface', name: 'Subject', x: 200, y: 100, methods: ['+attach(o)', '+detach(o)', '+notify()'] },
          { id: 'observer', type: 'interface', name: 'Observer', x: 500, y: 100, methods: ['+update()'] },
          { id: 'concreteSubject', type: 'class', name: 'ConcreteSubject', x: 200, y: 300, properties: ['-observers[]', '-state'], methods: ['+attach()', '+detach()', '+notify()', '+getState()', '+setState()'] },
          { id: 'concreteObserver', type: 'class', name: 'ConcreteObserver', x: 500, y: 300, properties: ['-name'], methods: ['+update()'] },
        ],
        connections: [
          { from: 'concreteSubject', to: 'subject', type: 'implementation' },
          { from: 'concreteObserver', to: 'observer', type: 'implementation' },
        ],
      },
      {
        id: 'step5',
        title: '建立依赖关系',
        description: '主题通知所有观察者，观察者观察主题状态变化',
        duration: 3000,
        elements: [
          { id: 'subject', type: 'interface', name: 'Subject', x: 200, y: 100, methods: ['+attach(o)', '+detach(o)', '+notify()'] },
          { id: 'observer', type: 'interface', name: 'Observer', x: 500, y: 100, methods: ['+update()'] },
          { id: 'concreteSubject', type: 'class', name: 'ConcreteSubject', x: 200, y: 300, properties: ['-observers[]', '-state'], methods: ['+attach()', '+detach()', '+notify()', '+getState()', '+setState()'] },
          { id: 'concreteObserver', type: 'class', name: 'ConcreteObserver', x: 500, y: 300, properties: ['-name'], methods: ['+update()'] },
          { id: 'client', type: 'class', name: 'Client', x: 350, y: 500, methods: ['main()'] },
        ],
        connections: [
          { from: 'concreteSubject', to: 'subject', type: 'implementation' },
          { from: 'concreteObserver', to: 'observer', type: 'implementation' },
          { from: 'concreteSubject', to: 'observer', type: 'association', label: 'notifies' },
          { from: 'concreteObserver', to: 'subject', type: 'association', label: 'observes' },
          { from: 'client', to: 'concreteSubject', type: 'dependency' },
          { from: 'client', to: 'concreteObserver', type: 'dependency' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * ============================================
 * 观察者模式 - TypeScript 实现
 * 包含：推拉模型 + RxJS 风格实现
 * ============================================
 */

// ============================================
// 1. 基础接口定义
// ============================================

/**
 * 观察者接口
 * 定义了观察者接收通知的方法
 */
interface Observer {
  /**
   * 接收主题通知
   * @param subject - 被观察的主题（推模型）
   * @param eventType - 事件类型
   * @param data - 附加数据
   */
  update(subject: Subject, eventType?: string, data?: any): void;
}

/**
 * 主题接口
 * 定义了管理观察者和通知的核心方法
 */
interface Subject {
  /**
   * 订阅观察者
   * @param observer - 要添加的观察者
   */
  attach(observer: Observer): void;

  /**
   * 取消订阅观察者
   * @param observer - 要移除的观察者
   */
  detach(observer: Observer): void;

  /**
   * 通知所有观察者
   * @param eventType - 事件类型
   * @param data - 传递的数据
   */
  notify(eventType?: string, data?: any): void;
}

// ============================================
// 2. 推模型实现（Push Model）
// 主题主动将数据推送给观察者
// ============================================

/**
 * 推模型：具体主题类
 * 当状态改变时，主动将数据推送给所有观察者
 */
class NewsPublisherPush implements Subject {
  /** 存储所有订阅的观察者 */
  private observers: Observer[] = [];
  /** 最新新闻内容 */
  private latestNews: string = '';

  /**
   * 订阅观察者
   */
  attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      console.log('观察者已被订阅');
      return;
    }
    this.observers.push(observer);
    console.log('成功订阅新闻');
  }

  /**
   * 取消订阅观察者
   */
  detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      console.log('观察者不存在');
      return;
    }
    this.observers.splice(observerIndex, 1);
    console.log('成功取消订阅');
  }

  /**
   * 通知所有观察者（推模型：直接传递数据）
   */
  notify(eventType?: string, data?: any): void {
    console.log(\`正在通知 \${this.observers.length} 个观察者...\`);
    for (const observer of this.observers) {
      observer.update(this, eventType || 'NEWS_UPDATE', data || this.latestNews);
    }
  }

  /**
   * 发布新闻（触发通知）
   */
  publishNews(news: string): void {
    this.latestNews = news;
    console.log(\`\\n=== 发布新闻: \${news} ===\`);
    // 推模型：直接将新闻内容推送给观察者
    this.notify('NEWS_PUBLISHED', news);
  }

  getLatestNews(): string {
    return this.latestNews;
  }
}

/**
 * 推模型：具体观察者类
 * 被动接收主题推送的数据
 */
class NewsSubscriberPush implements Observer {
  private name: string;
  private receivedNews: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  /**
   * 接收主题推送的通知和数据
   */
  update(subject: Subject, eventType?: string, data?: any): void {
    if (eventType === 'NEWS_PUBLISHED' && typeof data === 'string') {
      this.receivedNews.push(data);
      console.log(\`[\${this.name}] 收到推送新闻: \${data}\`);
    }
  }

  getReceivedNews(): string[] {
    return [...this.receivedNews];
  }
}

// ============================================
// 3. 拉模型实现（Pull Model）
// 观察者从主题拉取需要的数据
// ============================================

/**
 * 拉模型：具体主题类
 * 观察者需要主动从主题获取数据
 */
class WeatherStation implements Subject {
  private observers: Observer[] = [];
  private temperature: number = 0;
  private humidity: number = 0;
  private pressure: number = 0;

  attach(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  /**
   * 通知观察者（只通知变化，不传递数据）
   */
  notify(): void {
    console.log('天气数据更新，通知所有观察者...');
    for (const observer of this.observers) {
      // 拉模型：只传递主题引用，观察者自行拉取数据
      observer.update(this, 'WEATHER_CHANGED');
    }
  }

  /**
   * 更新气象数据
   */
  setMeasurements(temp: number, humidity: number, pressure: number): void {
    this.temperature = temp;
    this.humidity = humidity;
    this.pressure = pressure;
    this.notify();
  }

  // Getters 供观察者拉取数据
  getTemperature(): number { return this.temperature; }
  getHumidity(): number { return this.humidity; }
  getPressure(): number { return this.pressure; }
}

/**
 * 拉模型：具体观察者类
 * 根据需要从主题拉取数据
 */
class WeatherDisplay implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  /**
   * 收到通知后，主动从主题拉取需要的数据
   */
  update(subject: Subject, eventType?: string): void {
    if (subject instanceof WeatherStation && eventType === 'WEATHER_CHANGED') {
      const temp = subject.getTemperature();
      const humidity = subject.getHumidity();
      // 只拉取需要的数据
      console.log(\`[\${this.name}] 拉取数据 - 温度: \${temp}°C, 湿度: \${humidity}%\`);
    }
  }
}

// ============================================
// 4. RxJS 风格实现（函数式响应编程）
 * 使用观察者模式和函数式操作符
// ============================================

/**
 * 简化的 Observable 类（RxJS 风格）
 */
class Observable<T> {
  private subscribers: Array<(value: T) => void> = [];

  /**
   * 订阅 Observable
   */
  subscribe(next: (value: T) => void): { unsubscribe: () => void } {
    this.subscribers.push(next);
    return {
      unsubscribe: () => {
        const index = this.subscribers.indexOf(next);
        if (index !== -1) {
          this.subscribers.splice(index, 1);
        }
      }
    };
  }

  /**
   * 发送值给所有订阅者
   */
  next(value: T): void {
    this.subscribers.forEach(sub => sub(value));
  }

  /**
   * 转换操作符：map
   */
  map<R>(transform: (value: T) => R): Observable<R> {
    const observable = new Observable<R>();
    this.subscribe(value => {
      observable.next(transform(value));
    });
    return observable;
  }

  /**
   * 过滤操作符：filter
   */
  filter(predicate: (value: T) => boolean): Observable<T> {
    const observable = new Observable<T>();
    this.subscribe(value => {
      if (predicate(value)) {
        observable.next(value);
      }
    });
    return observable;
  }
}

/**
 * RxJS 风格的主题（支持多播）
 */
class RxSubject<T> extends Observable<T> {
  private observers: Array<{ next: (v: T) => void; error?: (e: any) => void; complete?: () => void }> = [];

  subscribe(observer: { next: (v: T) => void; error?: (e: any) => void; complete?: () => void }): { unsubscribe: () => void } {
    this.observers.push(observer);
    return {
      unsubscribe: () => {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
          this.observers.splice(index, 1);
        }
      }
    };
  }

  next(value: T): void {
    this.observers.forEach(obs => obs.next(value));
  }

  error(err: any): void {
    this.observers.forEach(obs => obs.error?.(err));
  }

  complete(): void {
    this.observers.forEach(obs => obs.complete?.());
  }
}

// ============================================
// 5. 客户端使用示例
// ============================================

function clientCode(): void {
  console.log('========== 推模型示例 ==========');
  const newsPublisher = new NewsPublisherPush();
  const subscriber1 = new NewsSubscriberPush('张三');
  const subscriber2 = new NewsSubscriberPush('李四');

  // 订阅
  newsPublisher.attach(subscriber1);
  newsPublisher.attach(subscriber2);

  // 发布新闻
  newsPublisher.publishNews('TypeScript 5.0 正式发布！');
  newsPublisher.publishNews('观察者模式详解');

  // 取消订阅
  newsPublisher.detach(subscriber1);
  newsPublisher.publishNews('设计模式最佳实践');

  console.log('\\n========== 拉模型示例 ==========');
  const weatherStation = new WeatherStation();
  const display1 = new WeatherDisplay('手机App');
  const display2 = new WeatherDisplay('网页版');

  weatherStation.attach(display1);
  weatherStation.attach(display2);

  // 更新天气数据
  weatherStation.setMeasurements(25, 60, 1013);
  weatherStation.setMeasurements(28, 55, 1010);

  console.log('\\n========== RxJS 风格示例 ==========');
  const rxSubject = new RxSubject<string>();

  // 订阅并添加操作符
  const subscription1 = rxSubject
    .map(msg => msg.toUpperCase())
    .subscribe({
      next: (value) => console.log('订阅者1收到:', value),
      complete: () => console.log('订阅者1: 流已结束')
    });

  const subscription2 = rxSubject.subscribe({
    next: (value) => console.log('订阅者2收到:', value)
  });

  // 发送消息
  rxSubject.next('Hello');
  rxSubject.next('World');

  // 取消订阅
  subscription1.unsubscribe();
  rxSubject.next('这条消息只有订阅者2收到');
}

// 运行示例
clientCode();`,

    java: `/**
 * ============================================
 * 观察者模式 - Java 实现
 * 包含：标准 Observer 接口 + PropertyChangeListener
 * ============================================
 */

import java.util.ArrayList;
import java.util.List;
import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;

// ============================================
// 1. 标准 Observer 模式实现
// ============================================

/**
 * 观察者接口
 * 定义观察者接收通知的标准方法
 */
public interface Observer {
    /**
     * 当主题状态改变时被调用
     * @param subject 被观察的主题
     * @param eventType 事件类型
     * @param data 附加数据
     */
    void update(Subject subject, String eventType, Object data);
}

/**
 * 主题接口
 * 定义管理观察者的核心方法
 */
public interface Subject {
    /**
     * 注册观察者
     * @param observer 要注册的观察者
     */
    void registerObserver(Observer observer);

    /**
     * 移除观察者
     * @param observer 要移除的观察者
     */
    void removeObserver(Observer observer);

    /**
     * 通知所有观察者
     * @param eventType 事件类型
     * @param data 传递的数据
     */
    void notifyObservers(String eventType, Object data);
}

/**
 * 具体主题：新闻发布者
 * 维护观察者列表，当新闻更新时通知所有观察者
 */
public class NewsPublisher implements Subject {
    /** 存储所有注册的观察者 */
    private final List<Observer> observers = new ArrayList<>();
    /** 最新新闻内容 */
    private String latestNews = "";

    @Override
    public void registerObserver(Observer observer) {
        if (!observers.contains(observer)) {
            observers.add(observer);
            System.out.println("观察者已注册，当前观察者数量: " + observers.size());
        }
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
        System.out.println("观察者已移除，当前观察者数量: " + observers.size());
    }

    @Override
    public void notifyObservers(String eventType, Object data) {
        System.out.println("正在通知 " + observers.size() + " 个观察者...");
        for (Observer observer : observers) {
            observer.update(this, eventType, data);
        }
    }

    /**
     * 发布新闻，触发通知
     * @param news 新闻内容
     */
    public void publishNews(String news) {
        this.latestNews = news;
        System.out.println("\\n=== 发布新闻: " + news + " ===");
        notifyObservers("NEWS_PUBLISHED", news);
    }

    public String getLatestNews() {
        return latestNews;
    }
}

/**
 * 具体观察者：新闻订阅者
 * 接收并处理新闻通知
 */
public class NewsSubscriber implements Observer {
    private final String name;
    private final List<String> receivedNews = new ArrayList<>();

    public NewsSubscriber(String name) {
        this.name = name;
    }

    @Override
    public void update(Subject subject, String eventType, Object data) {
        if ("NEWS_PUBLISHED".equals(eventType) && data instanceof String) {
            String news = (String) data;
            receivedNews.add(news);
            System.out.println("[" + name + "] 收到新闻: " + news);
        }
    }

    public List<String> getReceivedNews() {
        return new ArrayList<>(receivedNews);
    }

    public String getName() {
        return name;
    }
}

// ============================================
// 2. PropertyChangeListener 实现（JavaBeans 风格）
// ============================================

/**
 * 使用 PropertyChangeSupport 的属性观察者
 * Java 标准库提供的观察者模式实现
 */
public class StockPrice {
    /** 属性变更支持类 */
    private final PropertyChangeSupport support;
    /** 股票代码 */
    private final String symbol;
    /** 当前价格 */
    private double price;

    public StockPrice(String symbol, double initialPrice) {
        this.symbol = symbol;
        this.price = initialPrice;
        this.support = new PropertyChangeSupport(this);
    }

    /**
     * 添加属性变更监听器
     */
    public void addPropertyChangeListener(PropertyChangeListener listener) {
        support.addPropertyChangeListener(listener);
    }

    /**
     * 移除属性变更监听器
     */
    public void removePropertyChangeListener(PropertyChangeListener listener) {
        support.removePropertyChangeListener(listener);
    }

    /**
     * 设置新价格，触发属性变更事件
     */
    public void setPrice(double newPrice) {
        double oldPrice = this.price;
        this.price = newPrice;
        // 触发属性变更通知
        support.firePropertyChange("price", oldPrice, newPrice);
    }

    public String getSymbol() {
        return symbol;
    }

    public double getPrice() {
        return price;
    }
}

/**
 * 股票价格显示器（PropertyChangeListener 实现）
 */
public class StockDisplay implements PropertyChangeListener {
    private final String displayName;

    public StockDisplay(String displayName) {
        this.displayName = displayName;
    }

    @Override
    public void propertyChange(java.beans.PropertyChangeEvent evt) {
        String propertyName = evt.getPropertyName();
        Object oldValue = evt.getOldValue();
        Object newValue = evt.getNewValue();
        Object source = evt.getSource();

        if (source instanceof StockPrice && "price".equals(propertyName)) {
            StockPrice stock = (StockPrice) source;
            System.out.printf("[%s] %s 价格变动: %.2f -> %.2f%n",
                displayName, stock.getSymbol(), oldValue, newValue);
        }
    }
}

// ============================================
// 3. 客户端使用示例
// ============================================

public class Client {
    public static void main(String[] args) {
        System.out.println("========== 标准 Observer 模式 ==========");

        // 创建新闻发布者
        NewsPublisher publisher = new NewsPublisher();

        // 创建观察者
        NewsSubscriber subscriber1 = new NewsSubscriber("张三");
        NewsSubscriber subscriber2 = new NewsSubscriber("李四");
        NewsSubscriber subscriber3 = new NewsSubscriber("王五");

        // 注册观察者
        publisher.registerObserver(subscriber1);
        publisher.registerObserver(subscriber2);
        publisher.registerObserver(subscriber3);

        // 发布新闻
        publisher.publishNews("Java 21 正式发布，带来虚拟线程！");
        publisher.publishNews("Spring Boot 3.2 新特性介绍");

        // 移除一个观察者
        publisher.removeObserver(subscriber2);

        // 再次发布
        publisher.publishNews("设计模式最佳实践指南");

        System.out.println("\\n========== PropertyChangeListener ==========");

        // 创建股票实例
        StockPrice appleStock = new StockPrice("AAPL", 150.0);

        // 创建显示器
        StockDisplay mobileApp = new StockDisplay("手机App");
        StockDisplay webDashboard = new StockDisplay("网页仪表盘");

        // 添加监听器
        appleStock.addPropertyChangeListener(mobileApp);
        appleStock.addPropertyChangeListener(webDashboard);

        // 价格变动
        appleStock.setPrice(155.5);
        appleStock.setPrice(148.0);

        // 移除一个监听器
        appleStock.removePropertyChangeListener(webDashboard);

        // 再次变动（只有手机App会收到）
        appleStock.setPrice(152.3);
    }
}`,

    go: `/**
 * ============================================
 * 观察者模式 - Go 实现
 * 使用 Channel 实现异步观察者
 * ============================================
 */

package observer

import (
	"fmt"
	"sync"
)

// ============================================
// 1. 基础接口定义
// ============================================

/**
 * Observer 接口
 * 定义观察者必须实现的更新方法
 */
type Observer interface {
	/**
	 * Update 接收主题的通知
	 * @param subject 被观察的主题
	 * @param eventType 事件类型
	 * @param data 附加数据
	 */
	Update(subject Subject, eventType string, data interface{})
}

/**
 * Subject 接口
 * 定义主题必须实现的方法
 */
type Subject interface {
	/**
	 * Attach 添加观察者
	 */
	Attach(observer Observer)

	/**
	 * Detach 移除观察者
	 */
	Detach(observer Observer)

	/**
	 * Notify 通知所有观察者
	 */
	Notify(eventType string, data interface{})
}

// ============================================
// 2. 标准观察者模式实现
// ============================================

/**
 * ConcreteSubject 具体主题实现
 */
type NewsPublisher struct {
	// 观察者列表
	observers []Observer
	// 互斥锁，保证线程安全
	mu sync.RWMutex
	// 最新新闻
	latestNews string
}

/**
 * NewNewsPublisher 创建新的新闻发布者
 */
func NewNewsPublisher() *NewsPublisher {
	return &NewsPublisher{
		observers: make([]Observer, 0),
	}
}

/**
 * Attach 添加观察者（线程安全）
 */
func (n *NewsPublisher) Attach(observer Observer) {
	n.mu.Lock()
	defer n.mu.Unlock()

	// 检查是否已存在
	for _, o := range n.observers {
		if o == observer {
			fmt.Println("观察者已被订阅")
			return
		}
	}

	n.observers = append(n.observers, observer)
	fmt.Printf("观察者已添加，当前数量: %d\\n", len(n.observers))
}

/**
 * Detach 移除观察者（线程安全）
 */
func (n *NewsPublisher) Detach(observer Observer) {
	n.mu.Lock()
	defer n.mu.Unlock()

	for i, o := range n.observers {
		if o == observer {
			// 从切片中移除
			n.observers = append(n.observers[:i], n.observers[i+1:]...)
			fmt.Printf("观察者已移除，当前数量: %d\\n", len(n.observers))
			return
		}
	}
	fmt.Println("观察者不存在")
}

/**
 * Notify 通知所有观察者
 */
func (n *NewsPublisher) Notify(eventType string, data interface{}) {
	n.mu.RLock()
	observers := make([]Observer, len(n.observers))
	copy(observers, n.observers)
	n.mu.RUnlock()

	fmt.Printf("正在通知 %d 个观察者...\\n", len(observers))
	for _, observer := range observers {
		observer.Update(n, eventType, data)
	}
}

/**
 * PublishNews 发布新闻
 */
func (n *NewsPublisher) PublishNews(news string) {
	n.latestNews = news
	fmt.Printf("\\n=== 发布新闻: %s ===\\n", news)
	n.Notify("NEWS_PUBLISHED", news)
}

/**
 * GetLatestNews 获取最新新闻
 */
func (n *NewsPublisher) GetLatestNews() string {
	return n.latestNews
}

/**
 * ConcreteObserver 具体观察者实现
 */
type NewsSubscriber struct {
	name         string
	receivedNews []string
	mu           sync.RWMutex
}

/**
 * NewNewsSubscriber 创建新的新闻订阅者
 */
func NewNewsSubscriber(name string) *NewsSubscriber {
	return &NewsSubscriber{
		name:         name,
		receivedNews: make([]string, 0),
	}
}

/**
 * Update 接收通知
 */
func (s *NewsSubscriber) Update(subject Subject, eventType string, data interface{}) {
	if eventType == "NEWS_PUBLISHED" {
		if news, ok := data.(string); ok {
			s.mu.Lock()
			s.receivedNews = append(s.receivedNews, news)
			s.mu.Unlock()
			fmt.Printf("[%s] 收到新闻: %s\\n", s.name, news)
		}
	}
}

/**
 * GetReceivedNews 获取已接收的新闻列表
 */
func (s *NewsSubscriber) GetReceivedNews() []string {
	s.mu.RLock()
	defer s.mu.RUnlock()

	result := make([]string, len(s.receivedNews))
	copy(result, s.receivedNews)
	return result
}

// ============================================
// 3. 使用 Channel 的异步观察者实现
// ============================================

/**
 * Event 事件结构体
 */
type Event struct {
	EventType string
	Data      interface{}
	Source    Subject
}

/**
 * ChannelSubject 使用 Channel 的主题实现
 * 支持异步通知和缓冲
 */
type ChannelSubject struct {
	// 观察者 Channel 映射
	observers map[Observer]chan Event
	// 互斥锁
	mu sync.RWMutex
	// 事件缓冲大小
	bufferSize int
}

/**
 * NewChannelSubject 创建新的 Channel 主题
 */
func NewChannelSubject(bufferSize int) *ChannelSubject {
	return &ChannelSubject{
		observers:  make(map[Observer]chan Event),
		bufferSize: bufferSize,
	}
}

/**
 * Attach 添加观察者（每个观察者有自己的 Channel）
 */
func (c *ChannelSubject) Attach(observer Observer) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if _, exists := c.observers[observer]; exists {
		fmt.Println("观察者已被订阅")
		return
	}

	// 为每个观察者创建一个 Channel
	ch := make(chan Event, c.bufferSize)
	c.observers[observer] = ch

	// 启动 goroutine 监听 Channel
	go func(obs Observer, eventCh chan Event) {
		for event := range eventCh {
			obs.Update(event.Source, event.EventType, event.Data)
		}
	}(observer, ch)

	fmt.Printf("Channel 观察者已添加，当前数量: %d\\n", len(c.observers))
}

/**
 * Detach 移除观察者
 */
func (c *ChannelSubject) Detach(observer Observer) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if ch, exists := c.observers[observer]; exists {
		close(ch)
		delete(c.observers, observer)
		fmt.Printf("Channel 观察者已移除，当前数量: %d\\n", len(c.observers))
	}
}

/**
 * Notify 异步通知所有观察者
 */
func (c *ChannelSubject) Notify(eventType string, data interface{}) {
	c.mu.RLock()
	observers := make(map[Observer]chan Event)
	for k, v := range c.observers {
		observers[k] = v
	}
	source := c // 简化处理
	c.mu.RUnlock()

	fmt.Printf("正在异步通知 %d 个观察者...\\n", len(observers))
	for _, ch := range observers {
		select {
		case ch <- Event{EventType: eventType, Data: data, Source: source}:
			// 成功发送
		default:
			// Channel 已满，丢弃事件或处理溢出
			fmt.Println("警告: Channel 已满，事件被丢弃")
		}
	}
}

/**
 * PublishEvent 发布事件
 */
func (c *ChannelSubject) PublishEvent(eventType string, data interface{}) {
	fmt.Printf("\\n=== 发布事件 [%s] ===\\n", eventType)
	c.Notify(eventType, data)
}

/**
 * ChannelObserver 使用 Channel 的观察者
 */
type ChannelObserver struct {
	name string
}

/**
 * NewChannelObserver 创建新的 Channel 观察者
 */
func NewChannelObserver(name string) *ChannelObserver {
	return &ChannelObserver{name: name}
}

/**
 * Update 处理事件
 */
func (c *ChannelObserver) Update(subject Subject, eventType string, data interface{}) {
	fmt.Printf("[%s] 异步处理事件 [%s]: %v\\n", c.name, eventType, data)
}

// ============================================
// 4. 客户端使用示例
// ============================================

func main() {
	fmt.Println("========== 标准观察者模式 ==========")

	// 创建发布者
	publisher := NewNewsPublisher()

	// 创建观察者
	subscriber1 := NewNewsSubscriber("张三")
	subscriber2 := NewNewsSubscriber("李四")
	subscriber3 := NewNewsSubscriber("王五")

	// 订阅
	publisher.Attach(subscriber1)
	publisher.Attach(subscriber2)
	publisher.Attach(subscriber3)

	// 发布新闻
	publisher.PublishNews("Go 1.22 正式发布！")
	publisher.PublishNews("Goroutine 调度器优化详解")

	// 取消订阅
	publisher.Detach(subscriber2)

	// 再次发布
	publisher.PublishNews("Go 并发模式最佳实践")

	fmt.Println("\\n========== Channel 异步观察者 ==========")

	// 创建 Channel 主题
	channelSubject := NewChannelSubject(10)

	// 创建 Channel 观察者
	asyncObserver1 := NewChannelObserver("异步处理器1")
	asyncObserver2 := NewChannelObserver("异步处理器2")

	// 订阅
	channelSubject.Attach(asyncObserver1)
	channelSubject.Attach(asyncObserver2)

	// 发布事件
	channelSubject.PublishEvent("USER_LOGIN", map[string]string{"user": "alice"})
	channelSubject.PublishEvent("ORDER_CREATED", map[string]int{"orderId": 12345})

	// 等待异步处理完成
	fmt.Println("\\n等待异步处理完成...")
	// time.Sleep(100 * time.Millisecond)
}`,

    python: `"""
========================================
观察者模式 - Python 实现
包含：标准观察者 + @property.setter 装饰器
========================================
"""

from abc import ABC, abstractmethod
from typing import List, Any, Optional


# ============================================
# 1. 基础接口定义
# ============================================

class Observer(ABC):
    """
    观察者抽象基类
    定义观察者必须实现的 update 方法
    """

    @abstractmethod
    def update(self, subject: 'Subject', event_type: str, data: Any) -> None:
        """
        接收主题的通知

        Args:
            subject: 被观察的主题
            event_type: 事件类型
            data: 附加数据
        """
        pass


class Subject(ABC):
    """
    主题抽象基类
    定义管理观察者的核心方法
    """

    @abstractmethod
    def attach(self, observer: Observer) -> None:
        """添加观察者"""
        pass

    @abstractmethod
    def detach(self, observer: Observer) -> None:
        """移除观察者"""
        pass

    @abstractmethod
    def notify(self, event_type: str, data: Any) -> None:
        """通知所有观察者"""
        pass


# ============================================
# 2. 标准观察者模式实现
# ============================================

class NewsPublisher(Subject):
    """
    具体主题：新闻发布者
    维护观察者列表，当新闻更新时通知所有观察者
    """

    def __init__(self):
        self._observers: List[Observer] = []
        self._latest_news: str = ""

    def attach(self, observer: Observer) -> None:
        """订阅观察者"""
        if observer not in self._observers:
            self._observers.append(observer)
            print(f"观察者已添加，当前数量: {len(self._observers)}")
        else:
            print("观察者已被订阅")

    def detach(self, observer: Observer) -> None:
        """取消订阅观察者"""
        try:
            self._observers.remove(observer)
            print(f"观察者已移除，当前数量: {len(self._observers)}")
        except ValueError:
            print("观察者不存在")

    def notify(self, event_type: str, data: Any) -> None:
        """通知所有观察者"""
        print(f"正在通知 {len(self._observers)} 个观察者...")
        for observer in self._observers:
            observer.update(self, event_type, data)

    def publish_news(self, news: str) -> None:
        """发布新闻"""
        self._latest_news = news
        print(f"\\n=== 发布新闻: {news} ===")
        self.notify("NEWS_PUBLISHED", news)

    def get_latest_news(self) -> str:
        """获取最新新闻"""
        return self._latest_news


class NewsSubscriber(Observer):
    """
    具体观察者：新闻订阅者
    接收并处理新闻通知
    """

    def __init__(self, name: str):
        self._name = name
        self._received_news: List[str] = []

    def update(self, subject: Subject, event_type: str, data: Any) -> None:
        """接收通知"""
        if event_type == "NEWS_PUBLISHED" and isinstance(data, str):
            self._received_news.append(data)
            print(f"[{self._name}] 收到新闻: {data}")

    def get_received_news(self) -> List[str]:
        """获取已接收的新闻列表"""
        return self._received_news.copy()


# ============================================
# 3. 使用 @property.setter 的实现
# ============================================

class TemperatureSensor:
    """
    温度传感器（使用 @property 实现观察者模式）
    当温度变化时自动通知所有观察者
    """

    def __init__(self, location: str):
        self._location = location
        self._temperature: float = 0.0
        self._observers: List[Observer] = []

    @property
    def temperature(self) -> float:
        """获取当前温度"""
        return self._temperature

    @temperature.setter
    def temperature(self, value: float) -> None:
        """
        设置温度（触发观察者通知）
        只有当温度变化时才通知观察者
        """
        if value != self._temperature:
            old_temp = self._temperature
            self._temperature = value
            print(f"\\n[{self._location}] 温度变化: {old_temp}°C -> {value}°C")
            self._notify_observers("TEMPERATURE_CHANGED", {
                "old": old_temp,
                "new": value,
                "location": self._location
            })

    def attach(self, observer: Observer) -> None:
        """添加观察者"""
        if observer not in self._observers:
            self._observers.append(observer)

    def detach(self, observer: Observer) -> None:
        """移除观察者"""
        if observer in self._observers:
            self._observers.remove(observer)

    def _notify_observers(self, event_type: str, data: Any) -> None:
        """通知所有观察者"""
        for observer in self._observers:
            observer.update(self, event_type, data)


class TemperatureDisplay(Observer):
    """
    温度显示器
    显示温度变化信息
    """

    def __init__(self, display_name: str):
        self._display_name = display_name

    def update(self, subject: Subject, event_type: str, data: Any) -> None:
        """接收温度变化通知"""
        if event_type == "TEMPERATURE_CHANGED" and isinstance(data, dict):
            location = data.get("location", "未知位置")
            new_temp = data.get("new", 0)
            print(f"[{self._display_name}] {location} 当前温度: {new_temp}°C")


class TemperatureAlert(Observer):
    """
    温度警报器
    当温度超过阈值时发出警报
    """

    def __init__(self, threshold: float):
        self._threshold = threshold

    def update(self, subject: Subject, event_type: str, data: Any) -> None:
        """检查温度是否超过阈值"""
        if event_type == "TEMPERATURE_CHANGED" and isinstance(data, dict):
            new_temp = data.get("new", 0)
            if new_temp > self._threshold:
                print(f"🚨 警报: 温度 {new_temp}°C 超过阈值 {self._threshold}°C!")


# ============================================
# 4. 函数式观察者（使用回调函数）
# ============================================

class EventEmitter:
    """
    事件发射器（类似 Node.js EventEmitter）
    支持基于回调的观察者模式
    """

    def __init__(self):
        self._listeners: dict[str, List[callable]] = {}

    def on(self, event: str, callback: callable) -> None:
        """订阅事件"""
        if event not in self._listeners:
            self._listeners[event] = []
        self._listeners[event].append(callback)

    def off(self, event: str, callback: callable) -> None:
        """取消订阅事件"""
        if event in self._listeners:
            try:
                self._listeners[event].remove(callback)
            except ValueError:
                pass

    def emit(self, event: str, *args, **kwargs) -> None:
        """触发事件"""
        if event in self._listeners:
            for callback in self._listeners[event]:
                callback(*args, **kwargs)


# ============================================
# 5. 客户端使用示例
# ============================================

def main():
    print("=" * 40)
    print("标准观察者模式")
    print("=" * 40)

    # 创建新闻发布者
    publisher = NewsPublisher()

    # 创建观察者
    subscriber1 = NewsSubscriber("张三")
    subscriber2 = NewsSubscriber("李四")
    subscriber3 = NewsSubscriber("王五")

    # 订阅
    publisher.attach(subscriber1)
    publisher.attach(subscriber2)
    publisher.attach(subscriber3)

    # 发布新闻
    publisher.publish_news("Python 3.13 正式发布！")
    publisher.publish_news("PEP 702 新特性介绍")

    # 取消订阅
    publisher.detach(subscriber2)

    # 再次发布
    publisher.publish_news("Python 异步编程最佳实践")

    print("\\n" + "=" * 40)
    print("@property.setter 观察者模式")
    print("=" * 40)

    # 创建温度传感器
    sensor = TemperatureSensor("客厅")

    # 创建显示器和警报器
    display = TemperatureDisplay("手机App")
    alert = TemperatureAlert(threshold=30.0)

    # 订阅
    sensor.attach(display)
    sensor.attach(alert)

    # 设置温度（自动触发通知）
    sensor.temperature = 25.0
    sensor.temperature = 28.0
    sensor.temperature = 32.0  # 触发警报
    sensor.temperature = 29.0

    print("\\n" + "=" * 40)
    print("EventEmitter 函数式观察者")
    print("=" * 40)

    # 创建事件发射器
    emitter = EventEmitter()

    # 定义回调函数
    def on_user_login(username: str):
        print(f"用户 {username} 登录了系统")

    def on_user_logout(username: str):
        print(f"用户 {username} 退出了系统")

    def on_data_update(data_id: int, **kwargs):
        print(f"数据 {data_id} 已更新: {kwargs}")

    # 订阅事件
    emitter.on("login", on_user_login)
    emitter.on("logout", on_user_logout)
    emitter.on("data_update", on_data_update)

    # 触发事件
    emitter.emit("login", "alice")
    emitter.emit("data_update", 123, action="modify", user="bob")
    emitter.emit("logout", "alice")


if __name__ == "__main__":
    main()`,

    cpp: `/**
 * ============================================
 * 观察者模式 - C++ 实现
 * 使用智能指针管理生命周期
 * ============================================
 */

#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <algorithm>

// ============================================
// 1. 前置声明
// ============================================

class Subject;

// ============================================
// 2. 基础接口定义
// ============================================

/**
 * Observer 接口
 * 定义观察者必须实现的更新方法
 */
class Observer {
public:
    virtual ~Observer() = default;

    /**
     * 接收主题的通知
     * @param subject 被观察的主题
     * @param eventType 事件类型
     * @param data 附加数据（使用 shared_ptr 传递）
     */
    virtual void update(std::shared_ptr<Subject> subject, 
                        const std::string& eventType, 
                        std::shared_ptr<void> data) = 0;

    /**
     * 获取观察者名称（用于调试）
     */
    virtual std::string getName() const = 0;
};

/**
 * Subject 接口
 * 定义主题必须实现的方法
 */
class Subject : public std::enable_shared_from_this<Subject> {
public:
    virtual ~Subject() = default;

    /**
     * 添加观察者（使用 weak_ptr 避免循环引用）
     */
    virtual void attach(std::shared_ptr<Observer> observer) = 0;

    /**
     * 移除观察者
     */
    virtual void detach(std::shared_ptr<Observer> observer) = 0;

    /**
     * 通知所有观察者
     */
    virtual void notify(const std::string& eventType, 
                        std::shared_ptr<void> data) = 0;
};

// ============================================
// 3. 具体主题实现
// ============================================

/**
 * 具体主题：新闻发布者
 * 使用智能指针管理观察者，避免内存泄漏
 */
class NewsPublisher : public Subject {
private:
    /**
     * 观察者列表，使用 weak_ptr 避免循环引用
     * 如果观察者被销毁，weak_ptr 会自动失效
     */
    std::vector<std::weak_ptr<Observer>> observers;
    std::string latestNews;

public:
    /**
     * 添加观察者
     * 使用 weak_ptr 存储，避免循环引用问题
     */
    void attach(std::shared_ptr<Observer> observer) override {
        // 检查是否已存在
        for (const auto& weakObs : observers) {
            if (auto obs = weakObs.lock()) {
                if (obs == observer) {
                    std::cout << "观察者已被订阅" << std::endl;
                    return;
                }
            }
        }

        observers.push_back(observer);
        std::cout << "观察者已添加，当前数量: " << observers.size() << std::endl;
    }

    /**
     * 移除观察者
     */
    void detach(std::shared_ptr<Observer> observer) override {
        auto it = std::remove_if(observers.begin(), observers.end(),
            [&observer](const std::weak_ptr<Observer>& weakObs) {
                if (auto obs = weakObs.lock()) {
                    return obs == observer;
                }
                return false; // 已经失效的观察者会在 notify 时清理
            });

        if (it != observers.end()) {
            observers.erase(it, observers.end());
            std::cout << "观察者已移除，当前数量: " << observers.size() << std::endl;
        } else {
            std::cout << "观察者不存在" << std::endl;
        }
    }

    /**
     * 通知所有有效的观察者
     * 同时清理已失效的观察者
     */
    void notify(const std::string& eventType, 
                std::shared_ptr<void> data) override {
        std::cout << "正在通知观察者..." << std::endl;

        // 创建临时列表存储有效的观察者
        std::vector<std::shared_ptr<Observer>> validObservers;
        
        // 清理失效的观察者，收集有效的观察者
        observers.erase(
            std::remove_if(observers.begin(), observers.end(),
                [&validObservers](const std::weak_ptr<Observer>& weakObs) {
                    if (auto obs = weakObs.lock()) {
                        validObservers.push_back(obs);
                        return false; // 保留有效的观察者
                    }
                    return true; // 移除失效的观察者
                }),
            observers.end()
        );

        // 通知所有有效的观察者
        for (const auto& observer : validObservers) {
            observer->update(shared_from_this(), eventType, data);
        }
    }

    /**
     * 发布新闻
     */
    void publishNews(const std::string& news) {
        latestNews = news;
        std::cout << "\\n=== 发布新闻: " << news << " ===" << std::endl;
        
        // 使用 shared_ptr 传递字符串数据
        auto data = std::make_shared<std::string>(news);
        notify("NEWS_PUBLISHED", data);
    }

    std::string getLatestNews() const {
        return latestNews;
    }
};

// ============================================
// 4. 具体观察者实现
// ============================================

/**
 * 具体观察者：新闻订阅者
 */
class NewsSubscriber : public Observer {
private:
    std::string name;
    std::vector<std::string> receivedNews;

public:
    explicit NewsSubscriber(const std::string& name) : name(name) {}

    /**
     * 接收通知
     */
    void update(std::shared_ptr<Subject> subject, 
                const std::string& eventType, 
                std::shared_ptr<void> data) override {
        if (eventType == "NEWS_PUBLISHED") {
            // 将 void* 转换回 string
            if (auto newsPtr = std::static_pointer_cast<std::string>(data)) {
                receivedNews.push_back(*newsPtr);
                std::cout << "[" << name << "] 收到新闻: " << *newsPtr << std::endl;
            }
        }
    }

    std::string getName() const override {
        return name;
    }

    const std::vector<std::string>& getReceivedNews() const {
        return receivedNews;
    }
};

// ============================================
// 5. 带类型安全的数据传递实现
// ============================================

/**
 * 事件数据基类
 * 用于类型安全的数据传递
 */
struct EventData {
    virtual ~EventData() = default;
};

/**
 * 股票数据事件
 */
struct StockData : public EventData {
    std::string symbol;
    double oldPrice;
    double newPrice;

    StockData(const std::string& s, double oldP, double newP)
        : symbol(s), oldPrice(oldP), newPrice(newP) {}
};

/**
 * 股票交易所（类型安全版本）
 */
class StockExchange : public Subject {
private:
    std::vector<std::weak_ptr<Observer>> observers;
    std::vector<std::pair<std::string, double>> stocks;

public:
    void attach(std::shared_ptr<Observer> observer) override {
        observers.push_back(observer);
    }

    void detach(std::shared_ptr<Observer> observer) override {
        observers.erase(
            std::remove_if(observers.begin(), observers.end(),
                [&observer](const std::weak_ptr<Observer>& weakObs) {
                    if (auto obs = weakObs.lock()) {
                        return obs == observer;
                    }
                    return false;
                }),
            observers.end()
        );
    }

    void notify(const std::string& eventType, 
                std::shared_ptr<void> data) override {
        for (auto& weakObs : observers) {
            if (auto observer = weakObs.lock()) {
                observer->update(shared_from_this(), eventType, data);
            }
        }
    }

    void updateStockPrice(const std::string& symbol, double newPrice) {
        double oldPrice = 0.0;
        bool found = false;

        for (auto& stock : stocks) {
            if (stock.first == symbol) {
                oldPrice = stock.second;
                stock.second = newPrice;
                found = true;
                break;
            }
        }

        if (!found) {
            stocks.emplace_back(symbol, newPrice);
        }

        std::cout << "\\n=== " << symbol << " 价格更新: " 
                  << oldPrice << " -> " << newPrice << " ===" << std::endl;

        // 创建类型安全的事件数据
        auto stockData = std::make_shared<StockData>(symbol, oldPrice, newPrice);
        notify("STOCK_PRICE_CHANGED", stockData);
    }
};

/**
 * 股票显示器（类型安全版本）
 */
class StockDisplay : public Observer {
private:
    std::string displayName;

public:
    explicit StockDisplay(const std::string& name) : displayName(name) {}

    void update(std::shared_ptr<Subject> subject, 
                const std::string& eventType, 
                std::shared_ptr<void> data) override {
        if (eventType == "STOCK_PRICE_CHANGED") {
            if (auto stockData = std::static_pointer_cast<StockData>(data)) {
                std::cout << "[" << displayName << "] " 
                          << stockData->symbol << " 价格变动: "
                          << stockData->oldPrice << " -> " 
                          << stockData->newPrice << std::endl;
            }
        }
    }

    std::string getName() const override {
        return displayName;
    }
};

// ============================================
// 6. 客户端使用示例
// ============================================

int main() {
    std::cout << "========== 智能指针观察者模式 ==========" << std::endl;

    // 创建发布者（使用 shared_ptr 管理）
    auto publisher = std::make_shared<NewsPublisher>();

    // 创建观察者
    auto subscriber1 = std::make_shared<NewsSubscriber>("张三");
    auto subscriber2 = std::make_shared<NewsSubscriber>("李四");
    auto subscriber3 = std::make_shared<NewsSubscriber>("王五");

    // 订阅
    publisher->attach(subscriber1);
    publisher->attach(subscriber2);
    publisher->attach(subscriber3);

    // 发布新闻
    publisher->publishNews("C++20 正式发布！");
    publisher->publishNews("智能指针最佳实践");

    // 取消订阅
    publisher->detach(subscriber2);

    // 再次发布
    publisher->publishNews("现代 C++ 设计模式");

    std::cout << "\\n========== 类型安全数据传递 ==========" << std::endl;

    // 创建股票交易所
    auto exchange = std::make_shared<StockExchange>();

    // 创建显示器
    auto display1 = std::make_shared<StockDisplay>("手机App");
    auto display2 = std::make_shared<StockDisplay>("网页版");

    // 订阅
    exchange->attach(display1);
    exchange->attach(display2);

    // 更新股价
    exchange->updateStockPrice("AAPL", 150.0);
    exchange->updateStockPrice("GOOGL", 2800.0);
    exchange->updateStockPrice("AAPL", 155.5);

    // 演示智能指针自动管理生命周期
    std::cout << "\\n========== 智能指针生命周期管理 ==========" << std::endl;
    {
        auto tempSubscriber = std::make_shared<NewsSubscriber>("临时观察者");
        publisher->attach(tempSubscriber);
        publisher->publishNews("测试生命周期管理");
        // tempSubscriber 在这里离开作用域，会被自动销毁
    }
    // 再次发布，临时观察者不会收到通知（weak_ptr 自动失效）
    publisher->publishNews("临时观察者应该收不到这条");

    return 0;
}`,
  },
  realWorldExamples: [
    {
      title: 'Java Event Handling',
      description: 'Java 的 Swing/AWT 事件处理机制就是观察者模式的典型应用。',
      source: 'JDK',
      codeSnippet: `button.addActionListener(e -> {
    // 按钮被点击时执行
});`,
    },
    {
      title: 'Vue.js 响应式系统',
      description: 'Vue 的响应式系统使用观察者模式来实现数据变化时自动更新视图。',
      source: 'Vue.js',
      codeSnippet: `watch: {
  data(newVal) {
    // 数据变化时执行
  }
}`,
    },
    {
      title: 'RxJS Observable',
      description: 'RxJS 库完全基于观察者模式，提供了丰富的操作符来处理异步数据流。',
      source: 'RxJS',
      codeSnippet: `observable.subscribe({
  next: (value) => console.log(value),
  error: (err) => console.error(err),
  complete: () => console.log('Done')
});`,
    },
    {
      title: 'Java PropertyChangeListener',
      description: 'JavaBeans 规范中的 PropertyChangeListener 是标准的观察者模式实现。',
      source: 'JavaBeans',
      codeSnippet: `bean.addPropertyChangeListener(evt -> {
    System.out.println(evt.getPropertyName() + " changed");
});`,
    },
  ],
  relatedPatterns: ['singleton', 'mediator', 'strategy', 'command'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '观察者模式定义了什么样的依赖关系？',
      options: [
        '一对一',
        '一对多',
        '多对一',
        '多对多',
      ],
      correctAnswer: 1,
      explanation: '观察者模式定义了一对多的依赖关系，一个主题可以有多个观察者。',
    },
    {
      id: 'q2',
      type: 'single',
      question: '推模型（Push Model）和拉模型（Pull Model）的主要区别是什么？',
      options: [
        '推模型更快，拉模型更慢',
        '推模型由主题主动推送数据，拉模型由观察者主动拉取数据',
        '推模型只能用于同步，拉模型只能用于异步',
        '推模型需要更多内存，拉模型需要更少内存',
      ],
      correctAnswer: 1,
      explanation: '推模型中，主题主动将数据推送给观察者；拉模型中，主题只通知变化，观察者需要时主动从主题拉取数据。',
    },
    {
      id: 'q3',
      type: 'boolean',
      question: '在使用智能指针实现观察者模式时，应该使用 weak_ptr 存储观察者以避免循环引用',
      options: ['正确', '错误'],
      correctAnswer: 0,
      explanation: '正确。使用 weak_ptr 存储观察者可以避免主题和观察者之间的循环引用问题，防止内存泄漏。',
    },
    {
      id: 'q4',
      type: 'single',
      question: '以下哪个不是观察者模式的优点？',
      options: [
        '观察者和主题之间是松耦合的',
        '支持广播通信',
        '符合开闭原则',
        '订阅者的通知顺序是确定的',
      ],
      correctAnswer: 3,
      explanation: '观察者模式中，订阅者的通知顺序通常是随机的，取决于观察者列表的遍历顺序，这不是优点而是潜在的缺点。',
    },
  ],
};
