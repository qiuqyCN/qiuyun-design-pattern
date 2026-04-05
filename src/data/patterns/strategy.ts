import type { DesignPattern } from '@/types/pattern';

export const strategyPattern: DesignPattern = {
  id: 'strategy',
  name: '策略模式',
  nameEn: 'Strategy Pattern',
  category: 'behavioral',
  difficulty: 'easy',
  frequency: 'high',
  intent: '定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换。策略模式让算法的变化独立于使用算法的客户。',
  description: '策略模式是一种行为设计模式，它能让你定义一系列算法，并将每种算法分别放入独立的类中，以使算法的对象能够相互替换。',
  applicability: [
    '当你想使用对象中各种不同的算法变体，并希望能在运行时切换算法时',
    '当你有许多仅在执行某些行为时略有不同的相似类时',
    '当算法在上下文的逻辑中不是特别重要时',
    '当类中使用了大量的条件语句来选择不同行为时',
  ],
  pros: [
    '可以在运行时切换对象内的算法',
    '可以将算法的实现和使用算法的代码隔离开来',
    '可以使用组合来代替继承',
    '开闭原则：无需对上下文进行修改就能够引入新的策略',
    '避免使用多重条件判断语句（if-else 或 switch-case）',
  ],
  cons: [
    '如果你的算法极少发生改变，那么没有任何理由引入新的类和接口',
    '客户端必须知晓策略间的不同，以便选择合适的策略',
    '增加了代码的复杂度，需要创建更多的类',
    '策略类之间可能存在重复代码',
  ],
  analogy: {
    title: '现实世界中的策略',
    description: '策略模式就像是出行方式的选择',
    scenarios: [
      {
        id: 'travel',
        title: '出行方式',
        description: '去机场可以选择公交、地铁、出租车或自驾，这些是不同的策略，可以根据时间、预算等因素选择。',
        icon: 'Car',
      },
      {
        id: 'payment',
        title: '支付方式',
        description: '购物时可以选择现金、信用卡、支付宝或微信支付，每种支付方式都是一种策略，根据场景灵活切换。',
        icon: 'CreditCard',
      },
      {
        id: 'navigation',
        title: '导航路线',
        description: '导航软件提供最快路线、最短路线、避开高速等不同策略，用户可以根据需求选择。',
        icon: 'Map',
      },
    ],
  },
  structure: {
    classDiagram: `
      class Context {
        -strategy: Strategy
        +setStrategy(s: Strategy)
        +executeStrategy()
      }
      class Strategy {
        <<interface>>
        +execute()
      }
      class ConcreteStrategyA {
        +execute()
      }
      class ConcreteStrategyB {
        +execute()
      }
      Context --> Strategy
      Strategy <|.. ConcreteStrategyA
      Strategy <|.. ConcreteStrategyB
    `,
    mermaidDiagram: `
classDiagram
  class Context {
    -Strategy strategy
    +setStrategy(Strategy s)
    +executeStrategy()
  }
  class Strategy {
    <<interface>>
    +execute()
  }
  class ConcreteStrategyA {
    +execute()
  }
  class ConcreteStrategyB {
    +execute()
  }
  class ConcreteStrategyC {
    +execute()
  }
  class Client {
    +main()
  }
  Context --> Strategy : uses
  Strategy <|.. ConcreteStrategyA : implements
  Strategy <|.. ConcreteStrategyB : implements
  Strategy <|.. ConcreteStrategyC : implements
  Client ..> Context : uses
  Client ..> ConcreteStrategyA : creates
  Client ..> ConcreteStrategyB : creates
  Client ..> ConcreteStrategyC : creates
  
  style Context fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style Strategy fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style ConcreteStrategyA fill:#e8f5e9,stroke:#388e3c,stroke-width:1px
  style ConcreteStrategyB fill:#e8f5e9,stroke:#388e3c,stroke-width:1px
  style ConcreteStrategyC fill:#e8f5e9,stroke:#388e3c,stroke-width:1px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: '策略接口',
        description: '定义策略接口，声明算法执行的通用方法',
        duration: 2000,
        elements: [
          { id: 'strategy', type: 'interface', name: 'Strategy', x: 200, y: 150, methods: ['+execute()'] },
        ],
      },
      {
        id: 'step2',
        title: '具体策略',
        description: '实现具体的策略类，每个类封装一种算法',
        duration: 2000,
        elements: [
          { id: 'strategy', type: 'interface', name: 'Strategy', x: 200, y: 150, methods: ['+execute()'] },
          { id: 'concreteA', type: 'class', name: 'ConcreteStrategyA', x: 50, y: 300, methods: ['+execute()'] },
          { id: 'concreteB', type: 'class', name: 'ConcreteStrategyB', x: 200, y: 300, methods: ['+execute()'] },
          { id: 'concreteC', type: 'class', name: 'ConcreteStrategyC', x: 350, y: 300, methods: ['+execute()'] },
        ],
        connections: [
          { from: 'concreteA', to: 'strategy', type: 'implementation' },
          { from: 'concreteB', to: 'strategy', type: 'implementation' },
          { from: 'concreteC', to: 'strategy', type: 'implementation' },
        ],
      },
      {
        id: 'step3',
        title: '上下文类',
        description: '上下文类持有策略接口的引用，委托策略执行算法',
        duration: 2000,
        elements: [
          { id: 'strategy', type: 'interface', name: 'Strategy', x: 200, y: 150, methods: ['+execute()'] },
          { id: 'concreteA', type: 'class', name: 'ConcreteStrategyA', x: 50, y: 300, methods: ['+execute()'] },
          { id: 'concreteB', type: 'class', name: 'ConcreteStrategyB', x: 200, y: 300, methods: ['+execute()'] },
          { id: 'concreteC', type: 'class', name: 'ConcreteStrategyC', x: 350, y: 300, methods: ['+execute()'] },
          { id: 'context', type: 'class', name: 'Context', x: 450, y: 150, properties: ['-strategy: Strategy'], methods: ['+setStrategy(s)', '+executeStrategy()'] },
        ],
        connections: [
          { from: 'concreteA', to: 'strategy', type: 'implementation' },
          { from: 'concreteB', to: 'strategy', type: 'implementation' },
          { from: 'concreteC', to: 'strategy', type: 'implementation' },
          { from: 'context', to: 'strategy', type: 'association' },
        ],
      },
      {
        id: 'step4',
        title: '客户端使用',
        description: '客户端创建具体策略对象并设置到上下文中，运行时切换策略',
        duration: 3000,
        elements: [
          { id: 'strategy', type: 'interface', name: 'Strategy', x: 200, y: 150, methods: ['+execute()'] },
          { id: 'concreteA', type: 'class', name: 'ConcreteStrategyA', x: 50, y: 300, methods: ['+execute()'] },
          { id: 'concreteB', type: 'class', name: 'ConcreteStrategyB', x: 200, y: 300, methods: ['+execute()'] },
          { id: 'concreteC', type: 'class', name: 'ConcreteStrategyC', x: 350, y: 300, methods: ['+execute()'] },
          { id: 'context', type: 'class', name: 'Context', x: 450, y: 150, properties: ['-strategy: Strategy'], methods: ['+setStrategy(s)', '+executeStrategy()'] },
          { id: 'client', type: 'class', name: 'Client', x: 650, y: 150, methods: ['+main()'] },
        ],
        connections: [
          { from: 'concreteA', to: 'strategy', type: 'implementation' },
          { from: 'concreteB', to: 'strategy', type: 'implementation' },
          { from: 'concreteC', to: 'strategy', type: 'implementation' },
          { from: 'context', to: 'strategy', type: 'association' },
          { from: 'client', to: 'context', type: 'dependency' },
          { from: 'client', to: 'concreteA', type: 'dependency' },
          { from: 'client', to: 'concreteB', type: 'dependency' },
          { from: 'client', to: 'concreteC', type: 'dependency' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * 策略模式 - TypeScript 实现
 * 示例：购物车支付策略，支持多种支付方式
 */

// ============================================
// Strategy 策略接口
// 定义所有支持的算法的公共接口
// ============================================
interface PaymentStrategy {
  /**
   * 执行支付
   * @param amount 支付金额
   * @returns 支付结果
   */
  pay(amount: number): string;

  /**
   * 获取策略名称
   */
  getName(): string;
}

// ============================================
// ConcreteStrategy 具体策略类
// 封装具体的算法或行为
// ============================================

/**
 * 信用卡支付策略
 */
class CreditCardPayment implements PaymentStrategy {
  private cardNumber: string;
  private cardHolder: string;

  constructor(cardNumber: string, cardHolder: string) {
    this.cardNumber = cardNumber;
    this.cardHolder = cardHolder;
  }

  pay(amount: number): string {
    // 模拟信用卡支付逻辑
    const maskedCard = this.cardNumber.slice(-4).padStart(this.cardNumber.length, '*');
    return \`信用卡支付成功: ¥\${amount} (卡号: \${maskedCard}, 持卡人: \${this.cardHolder})\`;
  }

  getName(): string {
    return '信用卡支付';
  }
}

/**
 * 支付宝支付策略
 */
class AlipayPayment implements PaymentStrategy {
  private phoneNumber: string;

  constructor(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  pay(amount: number): string {
    // 模拟支付宝支付逻辑
    return \`支付宝支付成功: ¥\${amount} (账号: \${this.phoneNumber})\`;
  }

  getName(): string {
    return '支付宝支付';
  }
}

/**
 * 微信支付策略
 */
class WeChatPayment implements PaymentStrategy {
  private openId: string;

  constructor(openId: string) {
    this.openId = openId;
  }

  pay(amount: number): string {
    // 模拟微信支付逻辑
    return \`微信支付成功: ¥\${amount} (OpenID: \${this.openId.slice(0, 8)}...)\`;
  }

  getName(): string {
    return '微信支付';
  }
}

/**
 * 余额支付策略
 */
class BalancePayment implements PaymentStrategy {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  pay(amount: number): string {
    if (this.balance < amount) {
      return \`余额支付失败: 余额不足 (当前余额: ¥\${this.balance}, 需要: ¥\${amount})\`;
    }
    this.balance -= amount;
    return \`余额支付成功: ¥\${amount} (剩余余额: ¥\${this.balance})\`;
  }

  getName(): string {
    return '余额支付';
  }

  getBalance(): number {
    return this.balance;
  }
}

// ============================================
// Context 上下文类
// 维护一个对策略对象的引用，并委托策略执行算法
// ============================================
class ShoppingCart {
  private items: Array<{ name: string; price: number }> = [];
  private paymentStrategy: PaymentStrategy | null = null;

  /**
   * 添加商品到购物车
   */
  addItem(name: string, price: number): void {
    this.items.push({ name, price });
    console.log(\`添加商品: \${name} - ¥\${price}\`);
  }

  /**
   * 计算总价
   */
  calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  /**
   * 设置支付策略（运行时切换）
   */
  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.paymentStrategy = strategy;
    console.log(\`切换支付方式为: \${strategy.getName()}\`);
  }

  /**
   * 执行支付
   */
  checkout(): string {
    if (!this.paymentStrategy) {
      throw new Error('请先选择支付方式');
    }

    const total = this.calculateTotal();
    console.log(\`\\n购物车结算:\`);
    console.log(\`商品列表:\`);
    this.items.forEach(item => console.log(\`  - \${item.name}: ¥\${item.price}\`));
    console.log(\`总计: ¥\${total}\`);

    return this.paymentStrategy.pay(total);
  }
}

// ============================================
// 客户端代码
// 演示运行时切换策略
// ============================================
function clientCode(): void {
  // 创建购物车并添加商品
  const cart = new ShoppingCart();
  cart.addItem('iPhone 15', 5999);
  cart.addItem('AirPods Pro', 1999);
  cart.addItem('手机壳', 99);

  console.log('\\n========== 场景1: 使用支付宝支付 ==========');
  cart.setPaymentStrategy(new AlipayPayment('13800138000'));
  console.log(cart.checkout());

  console.log('\\n========== 场景2: 切换到信用卡支付 ==========');
  cart.setPaymentStrategy(new CreditCardPayment('6222021234567890123', '张三'));
  console.log(cart.checkout());

  console.log('\\n========== 场景3: 切换到余额支付 ==========');
  const balancePayment = new BalancePayment(5000);
  cart.setPaymentStrategy(balancePayment);
  console.log(cart.checkout()); // 余额不足

  // 充值后再次尝试
  console.log('\\n========== 场景4: 充值后再次支付 ==========');
  const balancePayment2 = new BalancePayment(10000);
  cart.setPaymentStrategy(balancePayment2);
  console.log(cart.checkout());

  console.log('\\n========== 场景5: 使用微信支付 ==========');
  cart.setPaymentStrategy(new WeChatPayment('wx_openid_123456789'));
  console.log(cart.checkout());
}

// 运行客户端代码
clientCode();

// ============================================
// 输出示例:
// ============================================
// 添加商品: iPhone 15 - ¥5999
// 添加商品: AirPods Pro - ¥1999
// 添加商品: 手机壳 - ¥99
//
// ========== 场景1: 使用支付宝支付 ==========
// 切换支付方式为: 支付宝支付
//
// 购物车结算:
// 商品列表:
//   - iPhone 15: ¥5999
//   - AirPods Pro: ¥1999
//   - 手机壳: ¥99
// 总计: ¥8097
// 支付宝支付成功: ¥8097 (账号: 13800138000)
//
// ========== 场景2: 切换到信用卡支付 ==========
// 切换支付方式为: 信用卡支付
// ...`,

    java: `/**
 * 策略模式 - Java 实现
 * 示例：排序策略，支持多种排序算法
 */

// ============================================
// Strategy 策略接口
// 定义排序算法的公共接口
// ============================================
public interface SortStrategy<T extends Comparable<T>> {
    /**
     * 对列表进行排序
     * @param list 待排序的列表
     */
    void sort(List<T> list);

    /**
     * 获取策略名称
     */
    String getName();
}

// ============================================
// ConcreteStrategy 具体策略类
// 实现不同的排序算法
// ============================================

/**
 * 冒泡排序策略
 * 时间复杂度: O(n²)，适合小数据量
 */
public class BubbleSortStrategy<T extends Comparable<T>> implements SortStrategy<T> {
    @Override
    public void sort(List<T> list) {
        int n = list.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (list.get(j).compareTo(list.get(j + 1)) > 0) {
                    // 交换元素
                    T temp = list.get(j);
                    list.set(j, list.get(j + 1));
                    list.set(j + 1, temp);
                }
            }
        }
    }

    @Override
    public String getName() {
        return "冒泡排序 (Bubble Sort)";
    }
}

/**
 * 快速排序策略
 * 时间复杂度: O(n log n)，适合大数据量
 */
public class QuickSortStrategy<T extends Comparable<T>> implements SortStrategy<T> {
    @Override
    public void sort(List<T> list) {
        quickSort(list, 0, list.size() - 1);
    }

    private void quickSort(List<T> list, int low, int high) {
        if (low < high) {
            int pi = partition(list, low, high);
            quickSort(list, low, pi - 1);
            quickSort(list, pi + 1, high);
        }
    }

    private int partition(List<T> list, int low, int high) {
        T pivot = list.get(high);
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (list.get(j).compareTo(pivot) <= 0) {
                i++;
                T temp = list.get(i);
                list.set(i, list.get(j));
                list.set(j, temp);
            }
        }
        T temp = list.get(i + 1);
        list.set(i + 1, list.get(high));
        list.set(high, temp);
        return i + 1;
    }

    @Override
    public String getName() {
        return "快速排序 (Quick Sort)";
    }
}

/**
 * 归并排序策略
 * 时间复杂度: O(n log n)，稳定排序
 */
public class MergeSortStrategy<T extends Comparable<T>> implements SortStrategy<T> {
    @Override
    public void sort(List<T> list) {
        if (list.size() < 2) return;
        mergeSort(list, 0, list.size() - 1);
    }

    private void mergeSort(List<T> list, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(list, left, mid);
            mergeSort(list, mid + 1, right);
            merge(list, left, mid, right);
        }
    }

    private void merge(List<T> list, int left, int mid, int right) {
        List<T> temp = new ArrayList<>(list);
        int i = left, j = mid + 1, k = left;

        while (i <= mid && j <= right) {
            if (temp.get(i).compareTo(temp.get(j)) <= 0) {
                list.set(k++, temp.get(i++));
            } else {
                list.set(k++, temp.get(j++));
            }
        }

        while (i <= mid) list.set(k++, temp.get(i++));
        while (j <= right) list.set(k++, temp.get(j++));
    }

    @Override
    public String getName() {
        return "归并排序 (Merge Sort)";
    }
}

// ============================================
// Context 上下文类
// 维护策略引用，委托排序操作
// ============================================
public class Sorter<T extends Comparable<T>> {
    private SortStrategy<T> strategy;
    private List<T> data;

    public Sorter(List<T> data) {
        this.data = new ArrayList<>(data);
    }

    /**
     * 设置排序策略（运行时切换）
     */
    public void setStrategy(SortStrategy<T> strategy) {
        this.strategy = strategy;
        System.out.println("切换排序策略为: " + strategy.getName());
    }

    /**
     * 执行排序
     */
    public List<T> sort() {
        if (strategy == null) {
            throw new IllegalStateException("请先设置排序策略");
        }
        List<T> copy = new ArrayList<>(data);
        long startTime = System.nanoTime();
        strategy.sort(copy);
        long endTime = System.nanoTime();
        System.out.println("排序耗时: " + (endTime - startTime) / 1000 + " μs");
        return copy;
    }

    public void setData(List<T> data) {
        this.data = new ArrayList<>(data);
    }
}

// ============================================
// 客户端代码
// 演示运行时切换策略 + Lambda 表达式简化
// ============================================
public class Client {
    public static void main(String[] args) {
        // 准备测试数据
        List<Integer> numbers = new ArrayList<>();
        Random random = new Random();
        for (int i = 0; i < 1000; i++) {
            numbers.add(random.nextInt(10000));
        }

        System.out.println("========== 策略模式 - 排序示例 ==========\\n");

        // 创建排序器
        Sorter<Integer> sorter = new Sorter<>(numbers);

        // 场景1: 使用冒泡排序
        System.out.println("--- 场景1: 冒泡排序 ---");
        sorter.setStrategy(new BubbleSortStrategy<>());
        List<Integer> result1 = sorter.sort();
        System.out.println("前10个元素: " + result1.subList(0, 10));

        // 场景2: 切换到快速排序
        System.out.println("\\n--- 场景2: 快速排序 ---");
        sorter.setStrategy(new QuickSortStrategy<>());
        List<Integer> result2 = sorter.sort();
        System.out.println("前10个元素: " + result2.subList(0, 10));

        // 场景3: 切换到归并排序
        System.out.println("\\n--- 场景3: 归并排序 ---");
        sorter.setStrategy(new MergeSortStrategy<>());
        List<Integer> result3 = sorter.sort();
        System.out.println("前10个元素: " + result3.subList(0, 10));

        // ============================================
        // Lambda 表达式简化策略（Java 8+）
        // ============================================
        System.out.println("\\n========== Lambda 表达式简化策略 ==========\\n");

        // 使用 Lambda 表达式创建内联策略
        SortStrategy<Integer> reverseSort = new SortStrategy<>() {
            @Override
            public void sort(List<Integer> list) {
                list.sort(Comparator.reverseOrder());
            }

            @Override
            public String getName() {
                return "逆序排序 (Lambda)";
            }
        };

        System.out.println("--- 场景4: Lambda 内联策略 - 逆序排序 ---");
        sorter.setStrategy(reverseSort);
        List<Integer> result4 = sorter.sort();
        System.out.println("前10个元素: " + result4.subList(0, 10));

        // 更简洁的方式：使用 Comparator 作为策略
        System.out.println("\\n--- 场景5: Comparator 策略模式 ---");
        List<String> names = Arrays.asList("张三", "李四", "王五", "赵六", "钱七");
        System.out.println("原始列表: " + names);

        // 策略1: 自然排序
        names.sort(Comparator.naturalOrder());
        System.out.println("自然排序: " + names);

        // 策略2: 逆序排序
        names.sort(Comparator.reverseOrder());
        System.out.println("逆序排序: " + names);

        // 策略3: 按长度排序
        names.sort(Comparator.comparingInt(String::length));
        System.out.println("按长度排序: " + names);
    }
}`,

    go: `/**
 * 策略模式 - Go 实现
 * 示例：图片压缩策略，支持多种压缩算法
 */

package main

import (
	"fmt"
	"math"
)

// ============================================
// Strategy 策略接口
// 定义图片压缩算法的公共接口
// ============================================
type CompressionStrategy interface {
	/**
	 * 压缩图片
	 * @param data 原始图片数据
	 * @param quality 压缩质量 (0-100)
	 * @returns 压缩后的数据和错误信息
	 */
	Compress(data []byte, quality int) ([]byte, error)

	/**
	 * 获取策略名称
	 */
	GetName() string

	/**
	 * 获取压缩率估算
	 */
	GetCompressionRatio() float64
}

// ============================================
// ConcreteStrategy 具体策略类
// 实现不同的压缩算法
// ============================================

/**
 * JPEG 压缩策略
 * 有损压缩，适合照片
 */
type JpegCompression struct {
	compressionLevel int
}

func (j *JpegCompression) Compress(data []byte, quality int) ([]byte, error) {
	// 模拟 JPEG 压缩逻辑
	if quality < 1 || quality > 100 {
		return nil, fmt.Errorf("JPEG 质量必须在 1-100 之间")
	}
	// 模拟压缩：质量越低，压缩率越高
	compressionRatio := float64(100-quality) / 100.0 * 0.8
	compressedSize := int(float64(len(data)) * (1 - compressionRatio))
	return make([]byte, compressedSize), nil
}

func (j *JpegCompression) GetName() string {
	return "JPEG 压缩"
}

func (j *JpegCompression) GetCompressionRatio() float64 {
	return 0.7 // 典型压缩率 70%
}

/**
 * PNG 压缩策略
 * 无损压缩，适合图标、截图
 */
type PngCompression struct {
	useOptimal bool
}

func (p *PngCompression) Compress(data []byte, quality int) ([]byte, error) {
	// 模拟 PNG 压缩逻辑（无损）
	// PNG 是无损压缩，quality 参数影响压缩级别而非质量
	compressedSize := int(float64(len(data)) * 0.7) // 典型压缩率 30%
	return make([]byte, compressedSize), nil
}

func (p *PngCompression) GetName() string {
	return "PNG 压缩 (无损)"
}

func (p *PngCompression) GetCompressionRatio() float64 {
	return 0.3 // 典型压缩率 30%
}

/**
 * WebP 压缩策略
 * 现代压缩格式，兼顾质量和大小
 */
type WebPCompression struct {
	lossless bool
}

func (w *WebPCompression) Compress(data []byte, quality int) ([]byte, error) {
	// 模拟 WebP 压缩逻辑
	var compressionRatio float64
	if w.lossless {
		compressionRatio = 0.4 // 无损模式压缩率 40%
	} else {
		compressionRatio = 0.75 // 有损模式压缩率 75%
	}
	compressedSize := int(float64(len(data)) * (1 - compressionRatio))
	return make([]byte, compressedSize), nil
}

func (w *WebPCompression) GetName() string {
	if w.lossless {
		return "WebP 压缩 (无损)"
	}
	return "WebP 压缩 (有损)"
}

func (w *WebPCompression) GetCompressionRatio() float64 {
	if w.lossless {
		return 0.4
	}
	return 0.75
}

// ============================================
// 函数类型策略（Go 特色）
// 使用函数类型实现策略模式
// ============================================

// CompressorFunc 定义压缩函数类型
type CompressorFunc func(data []byte, quality int) ([]byte, error)

// FunctionStrategy 使用函数作为策略
type FunctionStrategy struct {
	name       string
	compressor CompressorFunc
	ratio      float64
}

func (f *FunctionStrategy) Compress(data []byte, quality int) ([]byte, error) {
	return f.compressor(data, quality)
}

func (f *FunctionStrategy) GetName() string {
	return f.name
}

func (f *FunctionStrategy) GetCompressionRatio() float64 {
	return f.ratio
}

// ============================================
// Context 上下文类
// 维护策略引用，委托压缩操作
// ============================================

type ImageProcessor struct {
	strategy CompressionStrategy
	stats    map[string]int
}

func NewImageProcessor() *ImageProcessor {
	return &ImageProcessor{
		stats: make(map[string]int),
	}
}

/**
 * 设置压缩策略（运行时切换）
 */
func (ip *ImageProcessor) SetStrategy(strategy CompressionStrategy) {
	ip.strategy = strategy
	fmt.Printf("切换压缩策略为: %s\\n", strategy.GetName())
}

/**
 * 处理图片
 */
func (ip *ImageProcessor) ProcessImage(data []byte, quality int) ([]byte, error) {
	if ip.strategy == nil {
		return nil, fmt.Errorf("请先设置压缩策略")
	}

	originalSize := len(data)
	compressed, err := ip.strategy.Compress(data, quality)
	if err != nil {
		return nil, err
	}

	compressedSize := len(compressed)
	savings := float64(originalSize-compressedSize) / float64(originalSize) * 100

	fmt.Printf("  原始大小: %d bytes\\n", originalSize)
	fmt.Printf("  压缩后: %d bytes\\n", compressedSize)
	fmt.Printf("  节省空间: %.2f%%\\n", savings)

	// 记录统计
	ip.stats[ip.strategy.GetName()]++

	return compressed, nil
}

func (ip *ImageProcessor) GetStats() map[string]int {
	return ip.stats
}

// ============================================
// 客户端代码
// ============================================

func main() {
	// 模拟图片数据
	imageData := make([]byte, 1024*1024) // 1MB 图片

	fmt.Println("========== 策略模式 - 图片压缩示例 ==========\\n")

	// 创建图片处理器
	processor := NewImageProcessor()

	// 场景1: 使用 JPEG 压缩（适合照片）
	fmt.Println("--- 场景1: JPEG 压缩（适合照片）---")
	processor.SetStrategy(&JpegCompression{compressionLevel: 80})
	processor.ProcessImage(imageData, 85)

	// 场景2: 切换到 PNG 压缩（适合图标）
	fmt.Println("\\n--- 场景2: PNG 压缩（适合图标、截图）---")
	processor.SetStrategy(&PngCompression{useOptimal: true})
	processor.ProcessImage(imageData, 95)

	// 场景3: 切换到 WebP 有损压缩
	fmt.Println("\\n--- 场景3: WebP 有损压缩 ---")
	processor.SetStrategy(&WebPCompression{lossless: false})
	processor.ProcessImage(imageData, 80)

	// 场景4: 切换到 WebP 无损压缩
	fmt.Println("\\n--- 场景4: WebP 无损压缩 ---")
	processor.SetStrategy(&WebPCompression{lossless: true})
	processor.ProcessImage(imageData, 100)

	// ============================================
	// 函数类型策略示例
	// ============================================
	fmt.Println("\\n========== 函数类型策略示例 ==========\\n")

	// 使用函数创建自定义策略
	customCompressor := func(data []byte, quality int) ([]byte, error) {
		// 自定义压缩逻辑：简单截断
		cutoff := int(float64(len(data)) * float64(quality) / 200.0)
		return data[:cutoff], nil
	}

	customStrategy := &FunctionStrategy{
		name:       "自定义截断压缩",
		compressor: customCompressor,
		ratio:      0.5,
	}

	fmt.Println("--- 场景5: 函数类型策略 ---")
	processor.SetStrategy(customStrategy)
	processor.ProcessImage(imageData, 50)

	// ============================================
	// 批量处理不同策略对比
	// ============================================
	fmt.Println("\\n========== 策略对比测试 ==========\\n")

	strategies := []CompressionStrategy{
		&JpegCompression{compressionLevel: 90},
		&PngCompression{useOptimal: true},
		&WebPCompression{lossless: false},
	}

	fmt.Println("策略对比:")
	for _, strategy := range strategies {
		processor.SetStrategy(strategy)
		_, err := processor.ProcessImage(imageData, 85)
		if err != nil {
			fmt.Printf("错误: %v\\n", err)
		}
		fmt.Println()
	}

	// 输出统计
	fmt.Println("使用统计:")
	for name, count := range processor.GetStats() {
		fmt.Printf("  %s: %d 次\\n", name, count)
	}
}`,

    python: `/**
 * 策略模式 - Python 实现
 * 示例：数据验证策略，支持多种验证规则
 */

from abc import ABC, abstractmethod
from typing import List, Any, Callable, Optional
import re

# ============================================
# Strategy 策略接口
# 使用抽象基类定义验证策略接口
# ============================================
class ValidationStrategy(ABC):
    """
    验证策略抽象基类
    所有具体验证策略必须继承此类
    """

    @abstractmethod
    def validate(self, data: Any) -> bool:
        """
        验证数据
        @param data: 待验证的数据
        @return: 验证是否通过
        """
        pass

    @abstractmethod
    def get_error_message(self) -> str:
        """
        获取错误信息
        @return: 验证失败时的错误信息
        """
        pass

    @abstractmethod
    def get_name(self) -> str:
        """
        获取策略名称
        @return: 策略名称
        """
        pass


# ============================================
# ConcreteStrategy 具体策略类
# 实现不同的验证规则
# ============================================

class EmailValidationStrategy(ValidationStrategy):
    """
    邮箱验证策略
    使用正则表达式验证邮箱格式
    """

    def __init__(self):
        self.pattern = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
        self.last_error = ""

    def validate(self, data: Any) -> bool:
        if not isinstance(data, str):
            self.last_error = "邮箱必须是字符串"
            return False
        if not self.pattern.match(data):
            self.last_error = "邮箱格式不正确"
            return False
        return True

    def get_error_message(self) -> str:
        return self.last_error

    def get_name(self) -> str:
        return "邮箱验证"


class PhoneValidationStrategy(ValidationStrategy):
    """
    手机号验证策略
    验证中国大陆手机号格式
    """

    def __init__(self):
        self.pattern = re.compile(r'^1[3-9]\\d{9}$')
        self.last_error = ""

    def validate(self, data: Any) -> bool:
        if not isinstance(data, str):
            self.last_error = "手机号必须是字符串"
            return False
        if not self.pattern.match(data):
            self.last_error = "手机号格式不正确（需要11位数字，以1开头）"
            return False
        return True

    def get_error_message(self) -> str:
        return self.last_error

    def get_name(self) -> str:
        return "手机号验证"


class LengthValidationStrategy(ValidationStrategy):
    """
    长度验证策略
    验证字符串长度是否在指定范围内
    """

    def __init__(self, min_length: int = 0, max_length: int = 100):
        self.min_length = min_length
        self.max_length = max_length
        self.last_error = ""

    def validate(self, data: Any) -> bool:
        if not isinstance(data, str):
            self.last_error = "数据必须是字符串"
            return False
        length = len(data)
        if length < self.min_length:
            self.last_error = f"长度不能少于 {self.min_length} 个字符"
            return False
        if length > self.max_length:
            self.last_error = f"长度不能超过 {self.max_length} 个字符"
            return False
        return True

    def get_error_message(self) -> str:
        return self.last_error

    def get_name(self) -> str:
        return f"长度验证({self.min_length}-{self.max_length})"


class RegexValidationStrategy(ValidationStrategy):
    """
    正则表达式验证策略
    使用自定义正则表达式验证
    """

    def __init__(self, pattern: str, description: str = "自定义正则"):
        self.pattern = re.compile(pattern)
        self.description = description
        self.last_error = ""

    def validate(self, data: Any) -> bool:
        if not isinstance(data, str):
            self.last_error = "数据必须是字符串"
            return False
        if not self.pattern.match(data):
            self.last_error = f"不符合{self.description}格式"
            return False
        return True

    def get_error_message(self) -> str:
        return self.last_error

    def get_name(self) -> str:
        return f"正则验证({self.description})"


# ============================================
# 函数策略（Python 特色）
# 使用函数作为策略
# ============================================

class FunctionValidationStrategy(ValidationStrategy):
    """
    函数验证策略
    将函数包装为策略对象
    """

    def __init__(self, validator: Callable[[Any], bool],
                 name: str,
                 error_message: str = "验证失败"):
        self.validator = validator
        self.name = name
        self.error_message = error_message
        self.last_error = ""

    def validate(self, data: Any) -> bool:
        try:
            result = self.validator(data)
            if not result:
                self.last_error = self.error_message
            return result
        except Exception as e:
            self.last_error = str(e)
            return False

    def get_error_message(self) -> str:
        return self.last_error

    def get_name(self) -> str:
        return self.name


# ============================================
# 鸭子类型策略（Python 特色）
# 任何具有 validate 方法的对象都可以作为策略
# ============================================

class DuckTypedValidator:
    """
    鸭子类型验证器
    不需要继承抽象基类，只要有 validate 方法即可
    """

    def __init__(self, predicate: Callable[[Any], bool], name: str):
        self.predicate = predicate
        self.name = name

    def validate(self, data: Any) -> bool:
        return self.predicate(data)

    def get_error_message(self) -> str:
        return f"{self.name}验证失败"

    def get_name(self) -> str:
        return self.name


# ============================================
# Context 上下文类
# 维护策略引用，委托验证操作
# ============================================

class Validator:
    """
    验证器上下文类
    支持单策略和多策略组合验证
    """

    def __init__(self):
        self.strategies: List[ValidationStrategy] = []
        self.errors: List[str] = []

    def add_strategy(self, strategy: ValidationStrategy) -> 'Validator':
        """
        添加验证策略（链式调用）
        """
        self.strategies.append(strategy)
        print(f"添加验证策略: {strategy.get_name()}")
        return self

    def remove_strategy(self, strategy: ValidationStrategy) -> 'Validator':
        """
        移除验证策略
        """
        if strategy in self.strategies:
            self.strategies.remove(strategy)
            print(f"移除验证策略: {strategy.get_name()}")
        return self

    def clear_strategies(self) -> 'Validator':
        """
        清空所有策略
        """
        self.strategies.clear()
        print("清空所有验证策略")
        return self

    def validate(self, data: Any) -> bool:
        """
        执行验证（所有策略都必须通过）
        """
        self.errors.clear()

        if not self.strategies:
            print("警告: 没有设置验证策略")
            return True

        print(f"\\n开始验证数据: {data}")
        all_valid = True

        for strategy in self.strategies:
            print(f"  应用策略: {strategy.get_name()}")
            if not strategy.validate(data):
                error = f"  [{strategy.get_name()}] {strategy.get_error_message()}"
                self.errors.append(error)
                print(f"  ❌ {error}")
                all_valid = False
            else:
                print(f"  ✅ 通过")

        return all_valid

    def validate_any(self, data: Any) -> bool:
        """
        执行验证（任一策略通过即可）
        """
        self.errors.clear()

        if not self.strategies:
            return True

        print(f"\\n开始验证数据（任一通过）: {data}")

        for strategy in self.strategies:
            if strategy.validate(data):
                print(f"  ✅ 策略 '{strategy.get_name()}' 通过")
                return True
            else:
                self.errors.append(f"{strategy.get_name()}: {strategy.get_error_message()}")

        return False

    def get_errors(self) -> List[str]:
        """
        获取所有错误信息
        """
        return self.errors


# ============================================
# 客户端代码
# ============================================

def client_code():
    print("========== 策略模式 - 数据验证示例 ==========\\n")

    # 场景1: 邮箱验证
    print("--- 场景1: 邮箱验证 ---")
    email_validator = Validator()
    email_validator.add_strategy(EmailValidationStrategy())

    test_emails = [
        "user@example.com",
        "invalid-email",
        "test@domain.co.uk"
    ]

    for email in test_emails:
        is_valid = email_validator.validate(email)
        print(f"结果: {'✅ 有效' if is_valid else '❌ 无效'}\\n")

    # 场景2: 多策略组合验证（密码强度）
    print("\\n--- 场景2: 密码强度验证（多策略组合）---")
    password_validator = Validator()
    password_validator \
        .add_strategy(LengthValidationStrategy(min_length=8, max_length=32)) \
        .add_strategy(RegexValidationStrategy(
            pattern=r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$',
            description="包含大小写字母和数字"
        ))

    test_passwords = [
        "12345",           # 太短
        "password",        # 缺少大写字母和数字
        "Password123",     # 符合要求
        "a" * 40           # 太长
    ]

    for password in test_passwords:
        is_valid = password_validator.validate(password)
        if not is_valid:
            print(f"错误: {password_validator.get_errors()}")
        print(f"结果: {'✅ 有效' if is_valid else '❌ 无效'}\\n")

    # 场景3: 函数策略（动态验证规则）
    print("\\n--- 场景3: 函数策略（动态规则）---")

    # 定义验证函数
    def is_even(n):
        return isinstance(n, int) and n % 2 == 0

    def is_positive(n):
        return isinstance(n, (int, float)) and n > 0

    number_validator = Validator()
    number_validator.add_strategy(
        FunctionValidationStrategy(
            validator=is_even,
            name="偶数验证",
            error_message="必须是偶数"
        )
    )

    test_numbers = [2, 3, 4, -2]
    for num in test_numbers:
        is_valid = number_validator.validate(num)
        print(f"结果: {'✅ 有效' if is_valid else '❌ 无效'}\\n")

    # 场景4: 鸭子类型策略
    print("\\n--- 场景4: 鸭子类型策略 ---")

    # 创建鸭子类型验证器
    is_adult = DuckTypedValidator(
        predicate=lambda age: isinstance(age, int) and age >= 18,
        name="成年人验证"
    )

    age_validator = Validator()
    age_validator.add_strategy(is_adult)

    test_ages = [15, 18, 25]
    for age in test_ages:
        is_valid = age_validator.validate(age)
        print(f"年龄 {age}: {'✅ 成年人' if is_valid else '❌ 未成年人'}\\n")

    # 场景5: 运行时切换策略
    print("\\n--- 场景5: 运行时切换策略 ---")
    dynamic_validator = Validator()

    # 先使用手机号验证
    phone_strategy = PhoneValidationStrategy()
    dynamic_validator.add_strategy(phone_strategy)
    print(f"验证手机号 '13800138000': {dynamic_validator.validate('13800138000')}")

    # 切换到邮箱验证
    dynamic_validator.clear_strategies()
    dynamic_validator.add_strategy(EmailValidationStrategy())
    print(f"验证邮箱 'test@example.com': {dynamic_validator.validate('test@example.com')}")

    # 场景6: 任一策略通过即可
    print("\\n--- 场景6: 多选一验证（邮箱或手机号）---")
    contact_validator = Validator()
    contact_validator \
        .add_strategy(EmailValidationStrategy()) \
        .add_strategy(PhoneValidationStrategy())

    contacts = [
        "user@example.com",
        "13800138000",
        "invalid"
    ]

    for contact in contacts:
        is_valid = contact_validator.validate_any(contact)
        print(f"联系方式 '{contact}': {'✅ 有效' if is_valid else '❌ 无效'}\\n")


if __name__ == "__main__":
    client_code()`,

    cpp: `/**
 * 策略模式 - C++ 实现
 * 示例：路由导航策略，支持多种路径规划算法
 */

#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <algorithm>
#include <cmath>
#include <functional>

// ============================================
// Strategy 策略接口
// 定义路径规划算法的公共接口
// ============================================
class RouteStrategy {
public:
    virtual ~RouteStrategy() = default;

    /**
     * 计算路径
     * @param start 起点坐标
     * @param end 终点坐标
     * @return 路径点列表
     */
    virtual std::vector<std::pair<double, double>> calculateRoute(
        const std::pair<double, double>& start,
        const std::pair<double, double>& end
    ) = 0;

    /**
     * 获取策略名称
     */
    virtual std::string getName() const = 0;

    /**
     * 估算路线距离
     */
    virtual double estimateDistance(
        const std::pair<double, double>& start,
        const std::pair<double, double>& end
    ) const {
        // 默认使用欧几里得距离
        double dx = start.first - end.first;
        double dy = start.second - end.second;
        return std::sqrt(dx * dx + dy * dy);
    }
};

// ============================================
// ConcreteStrategy 具体策略类
// 实现不同的路径规划算法
// ============================================

/**
 * 最短路径策略
 * 使用直线距离，适合步行
 */
class ShortestRouteStrategy : public RouteStrategy {
public:
    std::vector<std::pair<double, double>> calculateRoute(
        const std::pair<double, double>& start,
        const std::pair<double, double>& end
    ) override {
        std::vector<std::pair<double, double>> route;
        route.push_back(start);

        // 模拟最短路径：直接连接起点和终点
        // 实际应用中会使用 Dijkstra 或 A* 算法
        int steps = 3;
        for (int i = 1; i < steps; i++) {
            double t = static_cast<double>(i) / steps;
            double x = start.first + t * (end.first - start.first);
            double y = start.second + t * (end.second - start.second);
            route.emplace_back(x, y);
        }

        route.push_back(end);
        return route;
    }

    std::string getName() const override {
        return "最短路径 (Shortest)";
    }
};

/**
 * 最快路径策略
 * 优先选择主干道，适合驾车
 */
class FastestRouteStrategy : public RouteStrategy {
public:
    std::vector<std::pair<double, double>> calculateRoute(
        const std::pair<double, double>& start,
        const std::pair<double, double>& end
    ) override {
        std::vector<std::pair<double, double>> route;
        route.push_back(start);

        // 模拟最快路径：绕道主干道
        // 实际应用中会考虑道路等级、限速等因素
        double midX = (start.first + end.first) / 2.0;
        double midY = (start.second + end.second) / 2.0;

        // 添加一个绕道点（模拟走主干道）
        route.emplace_back(midX + 0.5, midY - 0.3);
        route.emplace_back(midX - 0.3, midY + 0.5);

        route.push_back(end);
        return route;
    }

    std::string getName() const override {
        return "最快路径 (Fastest)";
    }

    double estimateDistance(
        const std::pair<double, double>& start,
        const std::pair<double, double>& end
    ) const override {
        // 最快路径通常距离稍长
        double baseDistance = RouteStrategy::estimateDistance(start, end);
        return baseDistance * 1.2; // 20% 额外距离
    }
};

/**
 * 风景路径策略
 * 经过景点，适合旅游
 */
class ScenicRouteStrategy : public RouteStrategy {
public:
    std::vector<std::pair<double, double>> calculateRoute(
        const std::pair<double, double>& start,
        const std::pair<double, double>& end
    ) override {
        std::vector<std::pair<double, double>> route;
        route.push_back(start);

        // 模拟风景路径：经过多个景点
        double midX = (start.first + end.first) / 2.0;
        double midY = (start.second + end.second) / 2.0;

        // 添加多个景点点
        route.emplace_back(midX - 0.8, midY + 0.6);  // 景点1
        route.emplace_back(midX + 0.6, midY + 0.8);  // 景点2
        route.emplace_back(midX + 0.9, midY - 0.5);  // 景点3

        route.push_back(end);
        return route;
    }

    std::string getName() const override {
        return "风景路径 (Scenic)";
    }

    double estimateDistance(
        const std::pair<double, double>& start,
        const std::pair<double, double>& end
    ) const override {
        // 风景路径距离最长
        double baseDistance = RouteStrategy::estimateDistance(start, end);
        return baseDistance * 1.8; // 80% 额外距离
    }
};

// ============================================
// 函数对象策略（C++ 特色）
// 使用 std::function 实现策略
// ============================================

class FunctionalRouteStrategy : public RouteStrategy {
public:
    using RouteCalculator = std::function<std::vector<std::pair<double, double>>(
        const std::pair<double, double>&,
        const std::pair<double, double>&
    )>;

    FunctionalRouteStrategy(
        const std::string& name,
        RouteCalculator calculator
    ) : name_(name), calculator_(calculator) {}

    std::vector<std::pair<double, double>> calculateRoute(
        const std::pair<double, double>& start,
        const std::pair<double, double>& end
    ) override {
        return calculator_(start, end);
    }

    std::string getName() const override {
        return name_;
    }

private:
    std::string name_;
    RouteCalculator calculator_;
};

// ============================================
// 模板策略（C++ 特色）
// 使用模板实现编译时策略选择
// ============================================

template<typename Strategy>
class TemplatedNavigator {
public:
    std::vector<std::pair<double, double>> navigate(
        const std::pair<double, double>& start,
        const std::pair<double, double>& end
    ) {
        return strategy_.calculateRoute(start, end);
    }

    std::string getStrategyName() const {
        return strategy_.getName();
    }

private:
    Strategy strategy_;
};

// ============================================
// Context 上下文类
// 维护策略引用，委托路径规划操作
// ============================================

class NavigationApp {
public:
    /**
     * 设置路径规划策略（运行时切换）
     */
    void setStrategy(std::shared_ptr<RouteStrategy> strategy) {
        strategy_ = strategy;
        std::cout << "切换导航策略为: " << strategy->getName() << std::endl;
    }

    /**
     * 规划路线
     */
    void planRoute(
        const std::pair<double, double>& start,
        const std::pair<double, double>& end
    ) {
        if (!strategy_) {
            throw std::runtime_error("请先设置导航策略");
        }

        std::cout << "\\n规划路线从 (" << start.first << ", " << start.second
                  << ") 到 (" << end.first << ", " << end.second << ")" << std::endl;

        auto route = strategy_->calculateRoute(start, end);
        double estimatedDist = strategy_->estimateDistance(start, end);

        std::cout << "路线点数量: " << route.size() << std::endl;
        std::cout << "预估距离: " << estimatedDist << " km" << std::endl;
        std::cout << "路线点: ";
        for (const auto& point : route) {
            std::cout << "(" << point.first << ", " << point.second << ") ";
        }
        std::cout << std::endl;
    }

    /**
     * 比较多种策略
     */
    void compareStrategies(
        const std::pair<double, double>& start,
        const std::pair<double, double>& end,
        const std::vector<std::shared_ptr<RouteStrategy>>& strategies
    ) {
        std::cout << "\\n========== 策略对比 ==========" << std::endl;
        std::cout << "起点: (" << start.first << ", " << start.second << ")" << std::endl;
        std::cout << "终点: (" << end.first << ", " << end.second << ")" << std::endl;
        std::cout << "--------------------------------" << std::endl;

        for (const auto& strategy : strategies) {
            std::cout << "策略: " << strategy->getName() << std::endl;
            double dist = strategy->estimateDistance(start, end);
            auto route = strategy->calculateRoute(start, end);
            std::cout << "  预估距离: " << dist << " km" << std::endl;
            std::cout << "  路径点数: " << route.size() << std::endl;
            std::cout << std::endl;
        }
    }

private:
    std::shared_ptr<RouteStrategy> strategy_;
};

// ============================================
// 客户端代码
// ============================================

int main() {
    std::cout << "========== 策略模式 - 导航路径规划示例 ==========" << std::endl;

    // 创建导航应用
    NavigationApp app;

    // 定义起点和终点
    std::pair<double, double> start = {0.0, 0.0};
    std::pair<double, double> end = {10.0, 10.0};

    // 场景1: 使用最短路径策略
    std::cout << "\\n--- 场景1: 最短路径策略 ---" << std::endl;
    app.setStrategy(std::make_shared<ShortestRouteStrategy>());
    app.planRoute(start, end);

    // 场景2: 切换到最快路径策略
    std::cout << "\\n--- 场景2: 最快路径策略 ---" << std::endl;
    app.setStrategy(std::make_shared<FastestRouteStrategy>());
    app.planRoute(start, end);

    // 场景3: 切换到风景路径策略
    std::cout << "\\n--- 场景3: 风景路径策略 ---" << std::endl;
    app.setStrategy(std::make_shared<ScenicRouteStrategy>());
    app.planRoute(start, end);

    // ============================================
    // 函数对象策略示例
    // ============================================
    std::cout << "\\n========== 函数对象策略示例 ==========" << std::endl;

    // 使用 Lambda 创建自定义策略
    auto customCalculator = [](const std::pair<double, double>& start,
                                const std::pair<double, double>& end) {
        std::vector<std::pair<double, double>> route;
        route.push_back(start);
        // 自定义路径：Z 字形路线
        route.emplace_back(start.first, end.second);
        route.emplace_back(end.first, start.second);
        route.push_back(end);
        return route;
    };

    auto customStrategy = std::make_shared<FunctionalRouteStrategy>(
        "自定义 Z 字形路径",
        customCalculator
    );

    std::cout << "\\n--- 场景4: 函数对象策略 ---" << std::endl;
    app.setStrategy(customStrategy);
    app.planRoute(start, end);

    // ============================================
    // 模板策略示例（编译时多态）
    // ============================================
    std::cout << "\\n========== 模板策略示例（编译时多态） ==========" << std::endl;

    std::cout << "\\n--- 使用模板导航器（最短路径）---" << std::endl;
    TemplatedNavigator<ShortestRouteStrategy> shortestNavigator;
    std::cout << "策略: " << shortestNavigator.getStrategyName() << std::endl;
    auto route1 = shortestNavigator.navigate(start, end);
    std::cout << "路径点数: " << route1.size() << std::endl;

    std::cout << "\\n--- 使用模板导航器（最快路径）---" << std::endl;
    TemplatedNavigator<FastestRouteStrategy> fastestNavigator;
    std::cout << "策略: " << fastestNavigator.getStrategyName() << std::endl;
    auto route2 = fastestNavigator.navigate(start, end);
    std::cout << "路径点数: " << route2.size() << std::endl;

    // ============================================
    // 策略对比
    // ============================================
    std::cout << "\\n========== 策略对比测试 ==========" << std::endl;

    std::vector<std::shared_ptr<RouteStrategy>> strategies = {
        std::make_shared<ShortestRouteStrategy>(),
        std::make_shared<FastestRouteStrategy>(),
        std::make_shared<ScenicRouteStrategy>()
    };

    app.compareStrategies(start, end, strategies);

    std::cout << "\\n========== 程序结束 ==========" << std::endl;

    return 0;
}`,
  },
  realWorldExamples: [
    {
      title: 'Java Collections - Comparator',
      description: 'Java 集合框架中的 Comparator 接口是策略模式的典型应用，允许在运行时指定不同的排序策略。',
      source: 'JDK',
      codeSnippet: `// 策略1: 按名称排序
Collections.sort(users, Comparator.comparing(User::getName));

// 策略2: 按年龄排序（降序）
Collections.sort(users, Comparator.comparingInt(User::getAge).reversed());

// 策略3: 多字段排序
Collections.sort(users, Comparator
    .comparing(User::getDepartment)
    .thenComparing(User::getName));`,
    },
    {
      title: 'JavaScript Array.sort()',
      description: 'JavaScript 数组的 sort 方法接受一个比较函数作为策略参数。',
      source: 'JavaScript',
      codeSnippet: `// 数字升序策略
[5, 2, 8, 1].sort((a, b) => a - b);

// 数字降序策略
[5, 2, 8, 1].sort((a, b) => b - a);

// 对象属性排序策略
users.sort((a, b) => a.age - b.age);`,
    },
    {
      title: 'Spring Security - AuthenticationStrategy',
      description: 'Spring Security 使用策略模式处理不同的认证方式（表单、OAuth、JWT 等）。',
      source: 'Spring Security',
      codeSnippet: `@Configuration
public class SecurityConfig {
    @Bean
    public AuthenticationStrategy authenticationStrategy() {
        // 可切换为不同的认证策略
        return new JwtAuthenticationStrategy();
        // return new OAuth2AuthenticationStrategy();
    }
}`,
    },
  ],
  relatedPatterns: ['state', 'bridge', 'decorator', 'template-method', 'command'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '策略模式的主要目的是什么？',
      options: [
        '创建对象',
        '封装算法并使它们可互换',
        '优化性能',
        '转换接口',
      ],
      correctAnswer: 1,
      explanation: '策略模式的主要目的是定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换，让算法的变化独立于使用算法的客户。',
    },
    {
      id: 'q2',
      type: 'boolean',
      question: '策略模式允许在运行时切换算法',
      options: ['正确', '错误'],
      correctAnswer: 0,
      explanation: '正确。策略模式的核心优势之一就是可以在运行时动态地改变对象的行为，通过设置不同的策略对象来实现。',
    },
    {
      id: 'q3',
      type: 'single',
      question: '以下哪个不是策略模式的优点？',
      options: [
        '可以在运行时切换算法',
        '避免使用多重条件判断语句',
        '增加代码的可读性',
        '减少系统中的类数量',
      ],
      correctAnswer: 3,
      explanation: '策略模式会引入新的策略类，实际上会增加系统中的类数量，而不是减少。这是策略模式的一个潜在缺点。',
    },
    {
      id: 'q4',
      type: 'single',
      question: '策略模式和状态模式的主要区别是什么？',
      options: [
        '策略模式关注算法，状态模式关注对象状态',
        '策略模式使用继承，状态模式使用组合',
        '策略模式可以运行时切换，状态模式不行',
        '两者完全相同，只是命名不同',
      ],
      correctAnswer: 0,
      explanation: '策略模式关注封装不同的算法并使它们可互换，而状态模式关注对象内部状态的变化以及状态改变时的行为变化。',
    },
  ],
};
