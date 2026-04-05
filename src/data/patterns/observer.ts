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
    animationSteps: [],
  },
  implementation: {
    typescript: `// 观察者接口
interface Observer {
  update(subject: Subject): void;
}

// 主题接口
interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

// 具体主题
class ConcreteSubject implements Subject {
  private observers: Observer[] = [];
  private state: number = 0;

  attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log('观察者已被订阅');
    }
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('观察者不存在');
    }
    this.observers.splice(observerIndex, 1);
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  getState(): number {
    return this.state;
  }

  setState(state: number): void {
    this.state = state;
    this.notify();
  }
}

// 具体观察者
class ConcreteObserver implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(subject: Subject): void {
    if (subject instanceof ConcreteSubject) {
      console.log(\`\${this.name} 收到更新，新状态: \${subject.getState()}\`);
    }
  }
}

// 使用
const subject = new ConcreteSubject();
const observer1 = new ConcreteObserver('观察者1');
const observer2 = new ConcreteObserver('观察者2');

subject.attach(observer1);
subject.attach(observer2);

subject.setState(123);`,

    java: `import java.util.ArrayList;
import java.util.List;

// 观察者接口
public interface Observer {
    void update(String message);
}

// 主题接口
public interface Subject {
    void registerObserver(Observer o);
    void removeObserver(Observer o);
    void notifyObservers();
}

// 具体主题
public class NewsPublisher implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private String latestNews;

    @Override
    public void registerObserver(Observer o) {
        observers.add(o);
    }

    @Override
    public void removeObserver(Observer o) {
        observers.remove(o);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(latestNews);
        }
    }

    public void setNews(String news) {
        this.latestNews = news;
        notifyObservers();
    }
}

// 具体观察者
public class NewsSubscriber implements Observer {
    private String name;

    public NewsSubscriber(String name) {
        this.name = name;
    }

    @Override
    public void update(String message) {
        System.out.println(name + " 收到新闻: " + message);
    }
}`,

    go: `package observer

import "fmt"

// Observer 接口
type Observer interface {
    Update(string)
}

// Subject 接口
type Subject interface {
    Attach(Observer)
    Detach(Observer)
    Notify()
}

// NewsPublisher 具体主题
type NewsPublisher struct {
    observers []Observer
    news      string
}

func (n *NewsPublisher) Attach(o Observer) {
    n.observers = append(n.observers, o)
}

func (n *NewsPublisher) Detach(o Observer) {
    for i, observer := range n.observers {
        if observer == o {
            n.observers = append(n.observers[:i], n.observers[i+1:]...)
            break
        }
    }
}

func (n *NewsPublisher) Notify() {
    for _, observer := range n.observers {
        observer.Update(n.news)
    }
}

func (n *NewsPublisher) SetNews(news string) {
    n.news = news
    n.Notify()
}

// NewsSubscriber 具体观察者
type NewsSubscriber struct {
    name string
}

func (s *NewsSubscriber) Update(news string) {
    fmt.Printf("%s 收到新闻: %s\\n", s.name, news)
}`,

    python: `from abc import ABC, abstractmethod
from typing import List

# 观察者接口
class Observer(ABC):
    @abstractmethod
    def update(self, message: str):
        pass

# 主题接口
class Subject(ABC):
    @abstractmethod
    def attach(self, observer: Observer):
        pass
    
    @abstractmethod
    def detach(self, observer: Observer):
        pass
    
    @abstractmethod
    def notify(self):
        pass

# 具体主题
class NewsPublisher(Subject):
    def __init__(self):
        self._observers: List[Observer] = []
        self._latest_news: str = ""
    
    def attach(self, observer: Observer):
        self._observers.append(observer)
    
    def detach(self, observer: Observer):
        self._observers.remove(observer)
    
    def notify(self):
        for observer in self._observers:
            observer.update(self._latest_news)
    
    def set_news(self, news: str):
        self._latest_news = news
        self.notify()

# 具体观察者
class NewsSubscriber(Observer):
    def __init__(self, name: str):
        self._name = name
    
    def update(self, message: str):
        print(f"{self._name} 收到新闻: {message}")`,

    cpp: `#include <iostream>
#include <vector>
#include <string>

// 观察者接口
class Observer {
public:
    virtual void update(const std::string& message) = 0;
    virtual ~Observer() = default;
};

// 主题接口
class Subject {
public:
    virtual void attach(Observer* observer) = 0;
    virtual void detach(Observer* observer) = 0;
    virtual void notify() = 0;
    virtual ~Subject() = default;
};

// 具体主题
class NewsPublisher : public Subject {
private:
    std::vector<Observer*> observers;
    std::string latestNews;

public:
    void attach(Observer* observer) override {
        observers.push_back(observer);
    }

    void detach(Observer* observer) override {
        for (auto it = observers.begin(); it != observers.end(); ++it) {
            if (*it == observer) {
                observers.erase(it);
                break;
            }
        }
    }

    void notify() override {
        for (auto* observer : observers) {
            observer->update(latestNews);
        }
    }

    void setNews(const std::string& news) {
        latestNews = news;
        notify();
    }
};

// 具体观察者
class NewsSubscriber : public Observer {
private:
    std::string name;

public:
    NewsSubscriber(const std::string& n) : name(n) {}

    void update(const std::string& message) override {
        std::cout << name << " 收到新闻: " << message << std::endl;
    }
};`,
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
  ],
  relatedPatterns: ['singleton', 'mediator', 'strategy'],
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
  ],
};
