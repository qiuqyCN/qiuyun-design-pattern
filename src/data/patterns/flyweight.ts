import type { DesignPattern } from '@/types/pattern';

export const flyweightPattern: DesignPattern = {
  id: 'flyweight',
  name: '享元模式',
  nameEn: 'Flyweight Pattern',
  category: 'structural',
  difficulty: 'hard',
  frequency: 'low',
  intent: '运用共享技术有效地支持大量细粒度的对象。',
  description: '享元模式是一种结构型设计模式，它摒弃了在每个对象中保存所有数据的方式，通过共享多个对象所共有的相同状态，让你能在有限的内存容量中载入更多对象。',
  applicability: [
    '当需要创建大量相似对象时',
    '当对象的大部分状态都可以变为外部状态时',
    '当需要缓存对象以节省内存时',
    '当对象的内部状态可以被多个实例共享时',
  ],
  pros: [
    '如果程序中有很多相似对象，可以节省大量内存',
    '可以提取对象的外部状态，在运行时动态传递',
    '减少对象创建的开销，提高性能',
    '集中管理共享对象，便于维护和统计',
  ],
  cons: [
    '可能需要牺牲执行速度来换取内存',
    '代码会变得更加复杂',
    '需要仔细区分内部状态和外部状态',
    '线程安全问题需要考虑（共享对象的并发访问）',
  ],
  analogy: {
    title: '现实世界中的享元',
    description: '享元模式就像是现实世界中的共享资源',
    scenarios: [
      {
        id: 'chess',
        title: '围棋',
        description: '围棋有361个位置，但只需要黑白两种棋子。棋子的位置是外部状态，颜色是内部状态。',
        icon: 'Circle',
      },
      {
        id: 'library',
        title: '图书馆书籍',
        description: '图书馆中同一本书有多个副本，但所有副本共享相同的书名、作者、ISBN等内部状态，而借阅者是外部状态。',
        icon: 'Book',
      },
      {
        id: 'font',
        title: '文字处理器',
        description: '文字处理器中的字体对象，每个字符的字体样式是内部状态（可共享），而字符位置和内容是外部状态。',
        icon: 'Type',
      },
    ],
  },
  structure: {
    classDiagram: '',
    mermaidDiagram: `
classDiagram
  class Flyweight {
    <<interface>>
    +operation(extrinsicState)
  }
  
  class ConcreteFlyweight {
    -intrinsicState
    +operation(extrinsicState)
  }
  
  class UnsharedConcreteFlyweight {
    -allState
    +operation(extrinsicState)
  }
  
  class FlyweightFactory {
    -flyweights: Map
    +getFlyweight(key) Flyweight
    +getFlyweightCount() int
  }
  
  class Client {
    +main()
  }
  
  Flyweight <|.. ConcreteFlyweight
  Flyweight <|.. UnsharedConcreteFlyweight
  FlyweightFactory o--> Flyweight : manages
  Client ..> FlyweightFactory : uses
  Client ..> Flyweight : uses
  
  style Flyweight fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style ConcreteFlyweight fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
  style FlyweightFactory fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: '享元接口',
        description: '定义享元接口，声明接受外部状态的方法',
        duration: 2000,
        elements: [
          { id: 'flyweight', type: 'interface', name: 'Flyweight', x: 200, y: 150, methods: ['+operation(extrinsicState)'] },
        ],
      },
      {
        id: 'step2',
        title: '具体享元',
        description: '实现享元接口，存储内部状态（可共享）',
        duration: 2000,
        elements: [
          { id: 'flyweight', type: 'interface', name: 'Flyweight', x: 200, y: 150, methods: ['+operation(extrinsicState)'] },
          { id: 'concrete', type: 'class', name: 'ConcreteFlyweight', x: 200, y: 300, properties: ['-intrinsicState'], methods: ['+operation(extrinsicState)'] },
        ],
        connections: [
          { from: 'concrete', to: 'flyweight', type: 'implementation' },
        ],
      },
      {
        id: 'step3',
        title: '享元工厂',
        description: '创建和管理享元对象，维护享元池',
        duration: 3000,
        elements: [
          { id: 'flyweight', type: 'interface', name: 'Flyweight', x: 200, y: 150, methods: ['+operation(extrinsicState)'] },
          { id: 'concrete', type: 'class', name: 'ConcreteFlyweight', x: 200, y: 300, properties: ['-intrinsicState'], methods: ['+operation(extrinsicState)'] },
          { id: 'factory', type: 'class', name: 'FlyweightFactory', x: 450, y: 150, properties: ['-flyweights: Map'], methods: ['+getFlyweight(key)', '+getCount()'] },
        ],
        connections: [
          { from: 'concrete', to: 'flyweight', type: 'implementation' },
          { from: 'factory', to: 'flyweight', type: 'association', label: 'manages' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * 享元模式 - TypeScript 实现
 * 以森林中的树木渲染为例，展示享元模式如何节省内存
 * 
 * 内部状态（Intrinsic State）：树的类型、颜色、纹理（可共享）
 * 外部状态（Extrinsic State）：树的位置坐标 x, y（不可共享）
 */

// ==================== 享元接口 ====================
interface TreeFlyweight {
  /**
   * 渲染树木
   * @param x 外部状态：X坐标
   * @param y 外部状态：Y坐标
   * @param canvas 画布上下文
   */
  render(x: number, y: number, canvas: string): void;
  
  /**
   * 获取树的类型（内部状态）
   */
  getType(): string;
}

// ==================== 具体享元 ====================
class TreeType implements TreeFlyweight {
  // 内部状态：这些属性可以被多个树实例共享
  private name: string;
  private color: string;
  private texture: string;

  constructor(name: string, color: string, texture: string) {
    this.name = name;
    this.color = color;
    this.texture = texture;
    console.log(\`创建新的树类型: \${name}, 颜色: \${color}\`);
  }

  render(x: number, y: number, canvas: string): void {
    // 使用内部状态（颜色、纹理）和外部状态（坐标）渲染树
    console.log(\`在画布 "\${canvas}" 的 (\${x}, \${y}) 位置渲染 \${this.color} 色的 \${this.name}，纹理: \${this.texture}\`);
  }

  getType(): string {
    return this.name;
  }

  // 获取内存占用估算（用于统计）
  getMemorySize(): number {
    // 估算：name + color + texture 字符串大约占用内存
    return (this.name.length + this.color.length + this.texture.length) * 2 + 24; // 24字节对象头
  }
}

// ==================== 享元工厂 ====================
class TreeFactory {
  // 享元池：存储已创建的树类型
  private static treeTypes: Map<string, TreeType> = new Map();

  /**
   * 获取树类型（享元对象）
   * 如果已存在则返回缓存的实例，否则创建新的
   */
  static getTreeType(name: string, color: string, texture: string): TreeType {
    const key = \`\${name}_\${color}_\${texture}\`;
    
    if (!this.treeTypes.has(key)) {
      console.log(\`[工厂] 创建新的树类型: \${key}\`);
      this.treeTypes.set(key, new TreeType(name, color, texture));
    } else {
      console.log(\`[工厂] 复用已有的树类型: \${key}\`);
    }
    
    return this.treeTypes.get(key)!;
  }

  /**
   * 获取享元池中树类型的数量
   */
  static getTreeTypeCount(): number {
    return this.treeTypes.size;
  }

  /**
   * 获取享元池占用的内存估算
   */
  static getTotalMemorySize(): number {
    let total = 0;
    this.treeTypes.forEach(treeType => {
      total += treeType.getMemorySize();
    });
    return total;
  }

  /**
   * 打印享元池统计信息
   */
  static printStats(): void {
    console.log('\\n========== 享元池统计 ==========');
    console.log(\`树类型数量: \${this.getTreeTypeCount()}\`);
    console.log(\`享元池内存占用: ~\${this.getTotalMemorySize()} bytes\`);
    console.log('================================\\n');
  }
}

// ==================== 客户端代码：树的管理器 ====================
class Tree {
  // 外部状态：每棵树独有的位置信息
  private x: number;
  private y: number;
  
  // 内部状态：通过享元共享
  private treeType: TreeType;

  constructor(x: number, y: number, treeType: TreeType) {
    this.x = x;
    this.y = y;
    this.treeType = treeType;
  }

  render(canvas: string): void {
    // 将外部状态（坐标）传递给享元对象
    this.treeType.render(this.x, this.y, canvas);
  }
}

class Forest {
  private trees: Tree[] = [];

  /**
   * 种植树木
   * @param x X坐标（外部状态）
   * @param y Y坐标（外部状态）
   * @param name 树的名称（内部状态）
   * @param color 树的颜色（内部状态）
   * @param texture 树的纹理（内部状态）
   */
  plantTree(x: number, y: number, name: string, color: string, texture: string): void {
    // 从工厂获取享元对象（内部状态）
    const treeType = TreeFactory.getTreeType(name, color, texture);
    
    // 创建树对象，存储外部状态
    const tree = new Tree(x, y, treeType);
    this.trees.push(tree);
  }

  render(canvas: string): void {
    console.log('\\n开始渲染森林...');
    this.trees.forEach(tree => tree.render(canvas));
    console.log('森林渲染完成\\n');
  }

  getTreeCount(): number {
    return this.trees.length;
  }
}

// ==================== 内存节省统计示例 ====================
function demonstrateMemorySavings(): void {
  console.log('========== 享元模式内存节省演示 ==========\\n');

  const forest = new Forest();

  // 定义几种树类型（内部状态）
  const treeTypes = [
    { name: '橡树', color: '绿色', texture: '粗糙树皮' },
    { name: '松树', color: '深绿', texture: '针叶纹理' },
    { name: '枫树', color: '红色', texture: '光滑树皮' },
    { name: '桦树', color: '白色', texture: '斑点纹理' },
  ];

  // 随机种植 1000 棵树
  console.log('\\n>>> 开始种植 1000 棵树...');
  for (let i = 0; i < 1000; i++) {
    const randomType = treeTypes[Math.floor(Math.random() * treeTypes.length)];
    const x = Math.floor(Math.random() * 1000);
    const y = Math.floor(Math.random() * 1000);
    forest.plantTree(x, y, randomType.name, randomType.color, randomType.texture);
  }

  // 渲染森林
  forest.render('主画布');

  // 打印统计信息
  console.log('\\n========== 内存使用统计 ==========');
  console.log(\`森林中树木总数: \${forest.getTreeCount()}\`);
  console.log(\`实际创建的树类型对象数: \${TreeFactory.getTreeTypeCount()}\`);
  
  // 计算节省的内存
  const treesCount = forest.getTreeCount();
  const typesCount = TreeFactory.getTreeTypeCount();
  const flyweightMemory = TreeFactory.getTotalMemorySize();
  
  // 假设每棵树如果不使用享元模式，需要额外存储类型信息（约100字节）
  const estimatedMemoryWithoutFlyweight = treesCount * 100; // 100 bytes per tree
  const estimatedMemoryWithFlyweight = flyweightMemory + (treesCount * 16); // 16 bytes for coordinates
  
  console.log(\`\\n不使用享元模式的估算内存: ~\${estimatedMemoryWithoutFlyweight} bytes\`);
  console.log(\`使用享元模式的估算内存: ~\${estimatedMemoryWithFlyweight} bytes\`);
  console.log(\`内存节省比例: ~\${((1 - estimatedMemoryWithFlyweight / estimatedMemoryWithoutFlyweight) * 100).toFixed(1)}%\`);
  
  TreeFactory.printStats();
}

// 运行演示
demonstrateMemorySavings();

// 额外演示：字符串常量池（JavaScript/TypeScript 内置的享元模式）
console.log('\\n========== 字符串常量池（内置享元） ==========');
const str1 = 'hello';
const str2 = 'hello';
const str3 = new String('hello');
console.log(\`str1 === str2: \${str1 === str2}\`); // true，字符串常量池复用
console.log(\`str1 === str3: \${str1 === str3}\`); // false，new String 创建新对象
console.log(\`str1 == str3: \${str1 == str3}\`);   // true，值相等`,

    java: `/**
 * 享元模式 - Java 实现
 * 以森林中的树木渲染为例，展示享元模式如何节省内存
 * 
 * 内部状态（Intrinsic State）：树的类型、颜色、纹理（可共享）
 * 外部状态（Extrinsic State）：树的位置坐标 x, y（不可共享）
 */

import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;

// ==================== 享元接口 ====================
interface TreeFlyweight {
    /**
     * 渲染树木
     * @param x 外部状态：X坐标
     * @param y 外部状态：Y坐标
     * @param canvas 画布名称
     */
    void render(int x, int y, String canvas);
    
    /**
     * 获取树的类型（内部状态）
     */
    String getType();
}

// ==================== 具体享元 ====================
class TreeType implements TreeFlyweight {
    // 内部状态：这些属性可以被多个树实例共享
    private final String name;
    private final String color;
    private final String texture;

    public TreeType(String name, String color, String texture) {
        this.name = name;
        this.color = color;
        this.texture = texture;
        System.out.println("创建新的树类型: " + name + ", 颜色: " + color);
    }

    @Override
    public void render(int x, int y, String canvas) {
        // 使用内部状态（颜色、纹理）和外部状态（坐标）渲染树
        System.out.printf("在画布 \"%s\" 的 (%d, %d) 位置渲染 %s 色的 %s，纹理: %s%n", 
            canvas, x, y, color, name, texture);
    }

    @Override
    public String getType() {
        return name;
    }
}

// ==================== 享元工厂 ====================
class TreeFactory {
    // 享元池：存储已创建的树类型
    private static final Map<String, TreeType> treeTypes = new HashMap<>();

    /**
     * 获取树类型（享元对象）
     * 如果已存在则返回缓存的实例，否则创建新的
     */
    public static TreeType getTreeType(String name, String color, String texture) {
        String key = name + "_" + color + "_" + texture;
        
        if (!treeTypes.containsKey(key)) {
            System.out.println("[工厂] 创建新的树类型: " + key);
            treeTypes.put(key, new TreeType(name, color, texture));
        } else {
            System.out.println("[工厂] 复用已有的树类型: " + key);
        }
        
        return treeTypes.get(key);
    }

    /**
     * 获取享元池中树类型的数量
     */
    public static int getTreeTypeCount() {
        return treeTypes.size();
    }

    /**
     * 打印享元池统计信息
     */
    public static void printStats() {
        System.out.println("\\n========== 享元池统计 ==========");
        System.out.println("树类型数量: " + getTreeTypeCount());
        System.out.println("================================\\n");
    }
}

// ==================== 客户端代码：树的管理器 ====================
class Tree {
    // 外部状态：每棵树独有的位置信息
    private final int x;
    private final int y;
    
    // 内部状态：通过享元共享
    private final TreeType treeType;

    public Tree(int x, int y, TreeType treeType) {
        this.x = x;
        this.y = y;
        this.treeType = treeType;
    }

    public void render(String canvas) {
        // 将外部状态（坐标）传递给享元对象
        treeType.render(x, y, canvas);
    }
}

class Forest {
    private final List<Tree> trees = new ArrayList<>();

    /**
     * 种植树木
     * @param x X坐标（外部状态）
     * @param y Y坐标（外部状态）
     * @param name 树的名称（内部状态）
     * @param color 树的颜色（内部状态）
     * @param texture 树的纹理（内部状态）
     */
    public void plantTree(int x, int y, String name, String color, String texture) {
        // 从工厂获取享元对象（内部状态）
        TreeType treeType = TreeFactory.getTreeType(name, color, texture);
        
        // 创建树对象，存储外部状态
        Tree tree = new Tree(x, y, treeType);
        trees.add(tree);
    }

    public void render(String canvas) {
        System.out.println("\\n开始渲染森林...");
        for (Tree tree : trees) {
            tree.render(canvas);
        }
        System.out.println("森林渲染完成\\n");
    }

    public int getTreeCount() {
        return trees.size();
    }
}

// ==================== 内存节省统计示例 ====================
public class FlyweightDemo {
    public static void main(String[] args) {
        System.out.println("========== 享元模式内存节省演示 ==========\\n");

        Forest forest = new Forest();

        // 定义几种树类型（内部状态）
        String[][] treeTypes = {
            {"橡树", "绿色", "粗糙树皮"},
            {"松树", "深绿", "针叶纹理"},
            {"枫树", "红色", "光滑树皮"},
            {"桦树", "白色", "斑点纹理"},
        };

        // 随机种植 1000 棵树
        System.out.println("\\n>>> 开始种植 1000 棵树...");
        for (int i = 0; i < 1000; i++) {
            String[] randomType = treeTypes[(int)(Math.random() * treeTypes.length)];
            int x = (int)(Math.random() * 1000);
            int y = (int)(Math.random() * 1000);
            forest.plantTree(x, y, randomType[0], randomType[1], randomType[2]);
        }

        // 渲染森林
        forest.render("主画布");

        // 打印统计信息
        System.out.println("\\n========== 内存使用统计 ==========");
        System.out.println("森林中树木总数: " + forest.getTreeCount());
        System.out.println("实际创建的树类型对象数: " + TreeFactory.getTreeTypeCount());
        
        // 计算节省的内存
        int treesCount = forest.getTreeCount();
        int typesCount = TreeFactory.getTreeTypeCount();
        
        // 假设每棵树如果不使用享元模式，需要额外存储类型信息
        long estimatedMemoryWithoutFlyweight = treesCount * 100L; // 100 bytes per tree
        long estimatedMemoryWithFlyweight = typesCount * 100L + (treesCount * 16L); // 16 bytes for coordinates
        
        System.out.println("\\n不使用享元模式的估算内存: ~" + estimatedMemoryWithoutFlyweight + " bytes");
        System.out.println("使用享元模式的估算内存: ~" + estimatedMemoryWithFlyweight + " bytes");
        System.out.printf("内存节省比例: ~%.1f%%\\n", 
            (1 - (double)estimatedMemoryWithFlyweight / estimatedMemoryWithoutFlyweight) * 100);
        
        TreeFactory.printStats();

        // 演示：Java 字符串常量池（内置享元模式）
        System.out.println("\\n========== 字符串常量池（内置享元） ==========");
        String str1 = "hello";
        String str2 = "hello";
        String str3 = new String("hello");
        System.out.println("str1 == str2: " + (str1 == str2)); // true，字符串常量池复用
        System.out.println("str1 == str3: " + (str1 == str3)); // false，new String 创建新对象
        System.out.println("str1.equals(str3): " + str1.equals(str3)); // true，值相等
        
        // 使用 intern() 方法将字符串放入常量池
        String str4 = str3.intern();
        System.out.println("str1 == str4 (after intern): " + (str1 == str4)); // true
    }
}`,

    go: `/**
 * 享元模式 - Go 实现
 * 以森林中的树木渲染为例，展示享元模式如何节省内存
 * 
 * 内部状态（Intrinsic State）：树的类型、颜色、纹理（可共享）
 * 外部状态（Extrinsic State）：树的位置坐标 x, y（不可共享）
 */

package main

import (
	"fmt"
	"math/rand"
	"time"
)

// ==================== 享元接口 ====================
type TreeFlyweight interface {
	/**
	 * 渲染树木
	 * @param x 外部状态：X坐标
	 * @param y 外部状态：Y坐标
	 * @param canvas 画布名称
	 */
	Render(x, y int, canvas string)
	
	/**
	 * 获取树的类型（内部状态）
	 */
	GetType() string
}

// ==================== 具体享元 ====================
type TreeType struct {
	// 内部状态：这些属性可以被多个树实例共享
	name    string
	color   string
	texture string
}

// NewTreeType 创建新的树类型
func NewTreeType(name, color, texture string) *TreeType {
	fmt.Printf("创建新的树类型: %s, 颜色: %s\\n", name, color)
	return &TreeType{
		name:    name,
		color:   color,
		texture: texture,
	}
}

func (t *TreeType) Render(x, y int, canvas string) {
	// 使用内部状态（颜色、纹理）和外部状态（坐标）渲染树
	fmt.Printf("在画布 \"%s\" 的 (%d, %d) 位置渲染 %s 色的 %s，纹理: %s\\n",
		canvas, x, y, t.color, t.name, t.texture)
}

func (t *TreeType) GetType() string {
	return t.name
}

// ==================== 享元工厂 ====================
type TreeFactory struct {
	// 享元池：存储已创建的树类型
	flyweights map[string]*TreeType
}

// NewTreeFactory 创建新的树工厂
func NewTreeFactory() *TreeFactory {
	return &TreeFactory{
		flyweights: make(map[string]*TreeType),
	}
}

/**
 * 获取树类型（享元对象）
 * 如果已存在则返回缓存的实例，否则创建新的
 */
func (f *TreeFactory) GetTreeType(name, color, texture string) *TreeType {
	key := fmt.Sprintf("%s_%s_%s", name, color, texture)
	
	if _, exists := f.flyweights[key]; !exists {
		fmt.Printf("[工厂] 创建新的树类型: %s\\n", key)
		f.flyweights[key] = NewTreeType(name, color, texture)
	} else {
		fmt.Printf("[工厂] 复用已有的树类型: %s\\n", key)
	}
	
	return f.flyweights[key]
}

/**
 * 获取享元池中树类型的数量
 */
func (f *TreeFactory) GetTreeTypeCount() int {
	return len(f.flyweights)
}

/**
 * 打印享元池统计信息
 */
func (f *TreeFactory) PrintStats() {
	fmt.Println("\\n========== 享元池统计 ==========")
	fmt.Printf("树类型数量: %d\\n", f.GetTreeTypeCount())
	fmt.Println("================================\\n")
}

// ==================== 客户端代码：树的管理器 ====================
type Tree struct {
	// 外部状态：每棵树独有的位置信息
	x int
	y int
	
	// 内部状态：通过享元共享
	treeType *TreeType
}

func NewTree(x, y int, treeType *TreeType) *Tree {
	return &Tree{
		x:        x,
		y:        y,
		treeType: treeType,
	}
}

func (t *Tree) Render(canvas string) {
	// 将外部状态（坐标）传递给享元对象
	t.treeType.Render(t.x, t.y, canvas)
}

type Forest struct {
	trees   []*Tree
	factory *TreeFactory
}

func NewForest(factory *TreeFactory) *Forest {
	return &Forest{
		trees:   make([]*Tree, 0),
		factory: factory,
	}
}

/**
 * 种植树木
 * @param x X坐标（外部状态）
 * @param y Y坐标（外部状态）
 * @param name 树的名称（内部状态）
 * @param color 树的颜色（内部状态）
 * @param texture 树的纹理（内部状态）
 */
func (f *Forest) PlantTree(x, y int, name, color, texture string) {
	// 从工厂获取享元对象（内部状态）
	treeType := f.factory.GetTreeType(name, color, texture)
	
	// 创建树对象，存储外部状态
	tree := NewTree(x, y, treeType)
	f.trees = append(f.trees, tree)
}

func (f *Forest) Render(canvas string) {
	fmt.Println("\\n开始渲染森林...")
	for _, tree := range f.trees {
		tree.Render(canvas)
	}
	fmt.Println("森林渲染完成\\n")
}

func (f *Forest) GetTreeCount() int {
	return len(f.trees)
}

// ==================== 内存节省统计示例 ====================
func main() {
	rand.Seed(time.Now().UnixNano())
	
	fmt.Println("========== 享元模式内存节省演示 ==========\\n")

	factory := NewTreeFactory()
	forest := NewForest(factory)

	// 定义几种树类型（内部状态）
	treeTypes := [][]string{
		{"橡树", "绿色", "粗糙树皮"},
		{"松树", "深绿", "针叶纹理"},
		{"枫树", "红色", "光滑树皮"},
		{"桦树", "白色", "斑点纹理"},
	}

	// 随机种植 1000 棵树
	fmt.Println(">>> 开始种植 1000 棵树...")
	for i := 0; i < 1000; i++ {
		randomType := treeTypes[rand.Intn(len(treeTypes))]
		x := rand.Intn(1000)
		y := rand.Intn(1000)
		forest.PlantTree(x, y, randomType[0], randomType[1], randomType[2])
	}

	// 渲染森林
	forest.Render("主画布")

	// 打印统计信息
	fmt.Println("\\n========== 内存使用统计 ==========")
	fmt.Printf("森林中树木总数: %d\\n", forest.GetTreeCount())
	fmt.Printf("实际创建的树类型对象数: %d\\n", factory.GetTreeTypeCount())
	
	// 计算节省的内存
	treesCount := forest.GetTreeCount()
	typesCount := factory.GetTreeTypeCount()
	
	// 假设每棵树如果不使用享元模式，需要额外存储类型信息
	estimatedMemoryWithoutFlyweight := treesCount * 100 // 100 bytes per tree
	estimatedMemoryWithFlyweight := typesCount * 100 + (treesCount * 16) // 16 bytes for coordinates
	
	fmt.Printf("\\n不使用享元模式的估算内存: ~%d bytes\\n", estimatedMemoryWithoutFlyweight)
	fmt.Printf("使用享元模式的估算内存: ~%d bytes\\n", estimatedMemoryWithFlyweight)
	fmt.Printf("内存节省比例: ~%.1f%%\\n", 
		(1.0 - float64(estimatedMemoryWithFlyweight)/float64(estimatedMemoryWithoutFlyweight)) * 100)
	
	factory.PrintStats()

	// 演示：Go 的字符串驻留（类似享元模式）
	fmt.Println("\\n========== 字符串驻留（类似享元） ==========")
	str1 := "hello"
	str2 := "hello"
	str3 := string([]byte{'h', 'e', 'l', 'l', 'o'})
	
	// 在 Go 中，字符串是不可变的，编译时常量字符串会被驻留
	fmt.Printf("str1 == str2: %v\\n", str1 == str2)     // true，值相等
	fmt.Printf("str1 == str3: %v\\n", str1 == str3)     // true，值相等
	fmt.Printf("&str1 == &str2: %v\\n", &str1 == &str2) // false，不同变量
}`,

    python: `/**
 * 享元模式 - Python 实现
 * 以森林中的树木渲染为例，展示享元模式如何节省内存
 * 
 * 内部状态（Intrinsic State）：树的类型、颜色、纹理（可共享）
 * 外部状态（Extrinsic State）：树的位置坐标 x, y（不可共享）
 * 
 * 使用 __slots__ 优化内存占用
 */

from abc import ABC, abstractmethod
from typing import Dict, List
import random

# ==================== 享元接口 ====================
class TreeFlyweight(ABC):
    """
    享元接口：定义接受外部状态的方法
    """
    
    @abstractmethod
    def render(self, x: int, y: int, canvas: str) -> None:
        """
        渲染树木
        @param x: 外部状态：X坐标
        @param y: 外部状态：Y坐标
        @param canvas: 画布名称
        """
        pass
    
    @abstractmethod
    def get_type(self) -> str:
        """获取树的类型（内部状态）"""
        pass


# ==================== 具体享元 ====================
class TreeType(TreeFlyweight):
    """
    具体享元：存储内部状态（可共享）
    使用 __slots__ 减少内存开销
    """
    
    # __slots__ 限制实例属性，节省内存（不使用 __dict__）
    __slots__ = ['_name', '_color', '_texture']
    
    def __init__(self, name: str, color: str, texture: str):
        # 内部状态：这些属性可以被多个树实例共享
        self._name = name
        self._color = color
        self._texture = texture
        print(f"创建新的树类型: {name}, 颜色: {color}")
    
    def render(self, x: int, y: int, canvas: str) -> None:
        """使用内部状态和外部状态渲染树"""
        print(f'在画布 "{canvas}" 的 ({x}, {y}) 位置渲染 {self._color} 色的 {self._name}，纹理: {self._texture}')
    
    def get_type(self) -> str:
        return self._name
    
    def __repr__(self) -> str:
        return f"TreeType(name='{self._name}', color='{self._color}', texture='{self._texture}')"


# ==================== 享元工厂 ====================
class TreeFactory:
    """
    享元工厂：创建和管理享元对象，维护享元池
    """
    
    # 享元池：存储已创建的树类型（类级别共享）
    _tree_types: Dict[str, TreeType] = {}
    
    @classmethod
    def get_tree_type(cls, name: str, color: str, texture: str) -> TreeType:
        """
        获取树类型（享元对象）
        如果已存在则返回缓存的实例，否则创建新的
        """
        key = f"{name}_{color}_{texture}"
        
        if key not in cls._tree_types:
            print(f"[工厂] 创建新的树类型: {key}")
            cls._tree_types[key] = TreeType(name, color, texture)
        else:
            print(f"[工厂] 复用已有的树类型: {key}")
        
        return cls._tree_types[key]
    
    @classmethod
    def get_tree_type_count(cls) -> int:
        """获取享元池中树类型的数量"""
        return len(cls._tree_types)
    
    @classmethod
    def print_stats(cls) -> None:
        """打印享元池统计信息"""
        print("\\n========== 享元池统计 ==========")
        print(f"树类型数量: {cls.get_tree_type_count()}")
        print("================================\\n")


# ==================== 客户端代码：树的管理器 ====================
class Tree:
    """
    树对象：存储外部状态，引用享元对象
    使用 __slots__ 减少内存开销
    """
    
    __slots__ = ['_x', '_y', '_tree_type']
    
    def __init__(self, x: int, y: int, tree_type: TreeType):
        # 外部状态：每棵树独有的位置信息
        self._x = x
        self._y = y
        # 内部状态：通过享元共享（引用）
        self._tree_type = tree_type
    
    def render(self, canvas: str) -> None:
        """将外部状态（坐标）传递给享元对象"""
        self._tree_type.render(self._x, self._y, canvas)


class Forest:
    """
    森林：管理所有树的集合
    """
    
    def __init__(self):
        self._trees: List[Tree] = []
    
    def plant_tree(self, x: int, y: int, name: str, color: str, texture: str) -> None:
        """
        种植树木
        @param x: X坐标（外部状态）
        @param y: Y坐标（外部状态）
        @param name: 树的名称（内部状态）
        @param color: 树的颜色（内部状态）
        @param texture: 树的纹理（内部状态）
        """
        # 从工厂获取享元对象（内部状态）
        tree_type = TreeFactory.get_tree_type(name, color, texture)
        
        # 创建树对象，存储外部状态
        tree = Tree(x, y, tree_type)
        self._trees.append(tree)
    
    def render(self, canvas: str) -> None:
        print("\\n开始渲染森林...")
        for tree in self._trees:
            tree.render(canvas)
        print("森林渲染完成\\n")
    
    def get_tree_count(self) -> int:
        return len(self._trees)


# ==================== 内存节省统计示例 ====================
def demonstrate_memory_savings():
    """演示享元模式的内存节省效果"""
    print("========== 享元模式内存节省演示 ==========\\n")
    
    forest = Forest()
    
    # 定义几种树类型（内部状态）
    tree_types = [
        {"name": "橡树", "color": "绿色", "texture": "粗糙树皮"},
        {"name": "松树", "color": "深绿", "texture": "针叶纹理"},
        {"name": "枫树", "color": "红色", "texture": "光滑树皮"},
        {"name": "桦树", "color": "白色", "texture": "斑点纹理"},
    ]
    
    # 随机种植 1000 棵树
    print(">>> 开始种植 1000 棵树...")
    for _ in range(1000):
        random_type = random.choice(tree_types)
        x = random.randint(0, 999)
        y = random.randint(0, 999)
        forest.plant_tree(x, y, random_type["name"], random_type["color"], random_type["texture"])
    
    # 渲染森林
    forest.render("主画布")
    
    # 打印统计信息
    print("\\n========== 内存使用统计 ==========")
    print(f"森林中树木总数: {forest.get_tree_count()}")
    print(f"实际创建的树类型对象数: {TreeFactory.get_tree_type_count()}")
    
    # 计算节省的内存
    trees_count = forest.get_tree_count()
    types_count = TreeFactory.get_tree_type_count()
    
    # 假设每棵树如果不使用享元模式，需要额外存储类型信息
    # 使用 __slots__ 的对象比普通对象节省约 50% 内存
    estimated_memory_without_flyweight = trees_count * 100  # 100 bytes per tree
    estimated_memory_with_flyweight = types_count * 60 + (trees_count * 24)  # __slots__ 节省内存
    
    print(f"\\n不使用享元模式的估算内存: ~{estimated_memory_without_flyweight} bytes")
    print(f"使用享元模式的估算内存: ~{estimated_memory_with_flyweight} bytes")
    print(f"内存节省比例: ~{(1 - estimated_memory_with_flyweight / estimated_memory_without_flyweight) * 100:.1f}%")
    
    TreeFactory.print_stats()


def demonstrate_slots_memory_savings():
    """演示 __slots__ 的内存节省效果"""
    print("\\n========== __slots__ 内存优化演示 ==========")
    
    class RegularClass:
        """普通类：使用 __dict__ 存储属性"""
        def __init__(self, name, color, texture):
            self.name = name
            self.color = color
            self.texture = texture
    
    class SlotsClass:
        """使用 __slots__ 的类"""
        __slots__ = ['name', 'color', 'texture']
        
        def __init__(self, name, color, texture):
            self.name = name
            self.color = color
            self.texture = texture
    
    import sys
    
    regular = RegularClass("橡树", "绿色", "粗糙树皮")
    slots = SlotsClass("橡树", "绿色", "粗糙树皮")
    
    regular_size = sys.getsizeof(regular) + sys.getsizeof(regular.__dict__)
    slots_size = sys.getsizeof(slots)
    
    print(f"普通类实例大小: {regular_size} bytes")
    print(f"__slots__ 类实例大小: {slots_size} bytes")
    print(f"内存节省: {(1 - slots_size / regular_size) * 100:.1f}%")
    print("================================\\n")


# 运行演示
if __name__ == "__main__":
    demonstrate_memory_savings()
    demonstrate_slots_memory_savings()
    
    # 演示：Python 的字符串驻留（类似享元模式）
    print("========== 字符串驻留（内置享元） ==========")
    str1 = "hello"
    str2 = "hello"
    str3 = "".join(['h', 'e', 'l', 'l', 'o'])
    
    print(f"str1 is str2: {str1 is str2}")  # True，小字符串被驻留
    print(f"str1 is str3: {str1 is str3}")  # False，运行时创建的字符串
    print(f"str1 == str3: {str1 == str3}")  # True，值相等
    
    # 使用 intern() 强制驻留
    import sys
    str4 = sys.intern(str3)
    print(f"str1 is str4 (after intern): {str1 is str4}")  # True`,

    cpp: `/**
 * 享元模式 - C++ 实现
 * 以森林中的树木渲染为例，展示享元模式如何节省内存
 * 
 * 内部状态（Intrinsic State）：树的类型、颜色、纹理（可共享）
 * 外部状态（Extrinsic State）：树的位置坐标 x, y（不可共享）
 * 
 * 使用智能指针管理内存，使用内存池优化分配
 */

#include <iostream>
#include <string>
#include <map>
#include <vector>
#include <memory>
#include <random>
#include <chrono>

// ==================== 享元接口 ====================
class TreeFlyweight {
public:
    virtual ~TreeFlyweight() = default;
    
    /**
     * 渲染树木
     * @param x 外部状态：X坐标
     * @param y 外部状态：Y坐标
     * @param canvas 画布名称
     */
    virtual void render(int x, int y, const std::string& canvas) const = 0;
    
    /**
     * 获取树的类型（内部状态）
     */
    virtual std::string getType() const = 0;
};

// ==================== 具体享元 ====================
class TreeType : public TreeFlyweight {
private:
    // 内部状态：这些属性可以被多个树实例共享
    std::string name;
    std::string color;
    std::string texture;

public:
    TreeType(const std::string& name, const std::string& color, const std::string& texture)
        : name(name), color(color), texture(texture) {
        std::cout << "创建新的树类型: " << name << ", 颜色: " << color << std::endl;
    }

    void render(int x, int y, const std::string& canvas) const override {
        // 使用内部状态（颜色、纹理）和外部状态（坐标）渲染树
        std::cout << "在画布 \"" << canvas << "\" 的 (" << x << ", " << y 
                  << ") 位置渲染 " << color << " 色的 " << name 
                  << "，纹理: " << texture << std::endl;
    }

    std::string getType() const override {
        return name;
    }
    
    // 获取内存占用估算
    size_t getMemorySize() const {
        return name.size() + color.size() + texture.size() + sizeof(TreeType);
    }
};

// ==================== 享元工厂（带内存池） ====================
class TreeFactory {
private:
    // 享元池：存储已创建的树类型
    // 使用 shared_ptr 自动管理内存生命周期
    std::map<std::string, std::shared_ptr<TreeType>> flyweights;
    
    // 简单的内存池：预分配对象空间
    std::vector<std::shared_ptr<TreeType>> objectPool;

public:
    /**
     * 获取树类型（享元对象）
     * 如果已存在则返回缓存的实例，否则创建新的
     */
    std::shared_ptr<TreeType> getTreeType(const std::string& name, 
                                           const std::string& color, 
                                           const std::string& texture) {
        std::string key = name + "_" + color + "_" + texture;
        
        auto it = flyweights.find(key);
        if (it == flyweights.end()) {
            std::cout << "[工厂] 创建新的树类型: " << key << std::endl;
            auto treeType = std::make_shared<TreeType>(name, color, texture);
            flyweights[key] = treeType;
            return treeType;
        } else {
            std::cout << "[工厂] 复用已有的树类型: " << key << std::endl;
            return it->second;
        }
    }

    /**
     * 获取享元池中树类型的数量
     */
    size_t getTreeTypeCount() const {
        return flyweights.size();
    }
    
    /**
     * 获取享元池占用的内存估算
     */
    size_t getTotalMemorySize() const {
        size_t total = 0;
        for (const auto& pair : flyweights) {
            total += pair.second->getMemorySize();
        }
        return total;
    }

    /**
     * 打印享元池统计信息
     */
    void printStats() const {
        std::cout << "\\n========== 享元池统计 ==========" << std::endl;
        std::cout << "树类型数量: " << getTreeTypeCount() << std::endl;
        std::cout << "享元池内存占用: ~" << getTotalMemorySize() << " bytes" << std::endl;
        std::cout << "================================\\n" << std::endl;
    }
    
    /**
     * 清空享元池（释放内存）
     */
    void clear() {
        flyweights.clear();
        objectPool.clear();
    }
};

// ==================== 客户端代码：树的管理器 ====================
class Tree {
private:
    // 外部状态：每棵树独有的位置信息
    int x;
    int y;
    
    // 内部状态：通过享元共享（使用 weak_ptr 避免循环引用）
    std::shared_ptr<TreeType> treeType;

public:
    Tree(int x, int y, std::shared_ptr<TreeType> treeType)
        : x(x), y(y), treeType(treeType) {}

    void render(const std::string& canvas) const {
        // 将外部状态（坐标）传递给享元对象
        if (treeType) {
            treeType->render(x, y, canvas);
        }
    }
};

class Forest {
private:
    std::vector<std::unique_ptr<Tree>> trees;

public:
    ~Forest() = default;

    /**
     * 种植树木
     * @param x X坐标（外部状态）
     * @param y Y坐标（外部状态）
     * @param name 树的名称（内部状态）
     * @param color 树的颜色（内部状态）
     * @param texture 树的纹理（内部状态）
     */
    void plantTree(int x, int y, const std::string& name, 
                   const std::string& color, const std::string& texture,
                   TreeFactory& factory) {
        // 从工厂获取享元对象（内部状态）
        auto treeType = factory.getTreeType(name, color, texture);
        
        // 创建树对象，存储外部状态
        trees.push_back(std::make_unique<Tree>(x, y, treeType));
    }

    void render(const std::string& canvas) const {
        std::cout << "\\n开始渲染森林..." << std::endl;
        for (const auto& tree : trees) {
            tree->render(canvas);
        }
        std::cout << "森林渲染完成\\n" << std::endl;
    }

    size_t getTreeCount() const {
        return trees.size();
    }
};

// ==================== 内存池实现示例 ====================
template<typename T>
class MemoryPool {
private:
    std::vector<std::unique_ptr<T>> available;
    std::vector<T*> inUse;

public:
    template<typename... Args>
    T* acquire(Args&&... args) {
        if (available.empty()) {
            // 创建新对象
            auto obj = std::make_unique<T>(std::forward<Args>(args)...);
            T* ptr = obj.get();
            inUse.push_back(ptr);
            // 转移所有权到 inUse 列表（简化示例）
            return ptr;
        } else {
            // 复用现有对象
            auto obj = std::move(available.back());
            available.pop_back();
            T* ptr = obj.get();
            inUse.push_back(ptr);
            return ptr;
        }
    }
    
    void release(T* obj) {
        // 简化示例：实际实现需要将对象移回 available 列表
    }
};

// ==================== 内存节省统计示例 ====================
void demonstrateMemorySavings() {
    std::cout << "========== 享元模式内存节省演示 ==========\\n" << std::endl;

    TreeFactory factory;
    Forest forest;

    // 定义几种树类型（内部状态）
    std::vector<std::vector<std::string>> treeTypes = {
        {"橡树", "绿色", "粗糙树皮"},
        {"松树", "深绿", "针叶纹理"},
        {"枫树", "红色", "光滑树皮"},
        {"桦树", "白色", "斑点纹理"},
    };

    // 随机数生成器
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> typeDist(0, treeTypes.size() - 1);
    std::uniform_int_distribution<> coordDist(0, 999);

    // 随机种植 1000 棵树
    std::cout << ">>> 开始种植 1000 棵树..." << std::endl;
    for (int i = 0; i < 1000; i++) {
        const auto& randomType = treeTypes[typeDist(gen)];
        int x = coordDist(gen);
        int y = coordDist(gen);
        forest.plantTree(x, y, randomType[0], randomType[1], randomType[2], factory);
    }

    // 渲染森林
    forest.render("主画布");

    // 打印统计信息
    std::cout << "\\n========== 内存使用统计 ==========" << std::endl;
    std::cout << "森林中树木总数: " << forest.getTreeCount() << std::endl;
    std::cout << "实际创建的树类型对象数: " << factory.getTreeTypeCount() << std::endl;
    
    // 计算节省的内存
    size_t treesCount = forest.getTreeCount();
    size_t typesCount = factory.getTreeTypeCount();
    size_t flyweightMemory = factory.getTotalMemorySize();
    
    // 假设每棵树如果不使用享元模式，需要额外存储类型信息
    size_t estimatedMemoryWithoutFlyweight = treesCount * 100; // 100 bytes per tree
    size_t estimatedMemoryWithFlyweight = flyweightMemory + (treesCount * 16); // 16 bytes for coordinates
    
    std::cout << "\\n不使用享元模式的估算内存: ~" << estimatedMemoryWithoutFlyweight << " bytes" << std::endl;
    std::cout << "使用享元模式的估算内存: ~" << estimatedMemoryWithFlyweight << " bytes" << std::endl;
    std::cout << "内存节省比例: ~" 
              << (1.0 - static_cast<double>(estimatedMemoryWithFlyweight) / estimatedMemoryWithoutFlyweight) * 100
              << "%" << std::endl;
    
    factory.printStats();
}

int main() {
    demonstrateMemorySavings();
    
    // 演示：C++ 的字符串常量池（编译器优化）
    std::cout << "\\n========== 字符串常量池（编译器优化） ==========" << std::endl;
    const char* str1 = "hello";
    const char* str2 = "hello";
    std::string str3 = "hello";
    
    std::cout << "str1 == str2 (same pointer): " << (str1 == str2 ? "true" : "false") << std::endl;
    std::cout << "*str1 == *str2 (same content): true" << std::endl;
    
    return 0;
}`,
  },
  realWorldExamples: [
    {
      title: 'Java String Pool',
      description: 'Java 的字符串常量池是享元模式的典型应用。相同的字符串字面量会被复用，节省内存。',
      source: 'JDK',
      codeSnippet: `String s1 = "hello";
String s2 = "hello";
// s1 和 s2 指向常量池中的同一对象
System.out.println(s1 == s2); // true

// 使用 intern() 方法将字符串放入常量池
String s3 = new String("hello").intern();
System.out.println(s1 == s3); // true`,
    },
    {
      title: '数据库连接池',
      description: '数据库连接池使用享元模式管理数据库连接，复用连接对象以减少创建开销。',
      source: 'HikariCP / Druid',
      codeSnippet: `// 连接池管理共享的数据库连接对象
HikariConfig config = new HikariConfig();
config.setMaximumPoolSize(10); // 最多10个共享连接
HikariDataSource ds = new HikariDataSource(config);
// 多个线程共享池中的连接`,
    },
    {
      title: '游戏开发中的粒子系统',
      description: '游戏中的粒子效果（如火焰、烟雾）使用享元模式共享粒子的纹理和属性数据。',
      source: 'Game Engines',
      codeSnippet: `// 粒子享元：共享纹理、颜色等内部状态
class ParticleFlyweight {
    texture: Texture;  // 共享
    color: Color;      // 共享
}
// 每个粒子实例只存储位置、速度等外部状态`,
    },
  ],
  relatedPatterns: ['singleton', 'factory-method', 'composite', 'state', 'strategy'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '享元模式的主要目的是什么？',
      options: [
        '创建对象',
        '共享对象以节省内存',
        '添加功能',
        '转换接口',
      ],
      correctAnswer: 1,
      explanation: '享元模式的主要目的是运用共享技术有效地支持大量细粒度的对象，节省内存。',
    },
    {
      id: 'q2',
      type: 'single',
      question: '在享元模式中，以下哪项属于内部状态（Intrinsic State）？',
      options: [
        '对象在屏幕上的位置坐标',
        '对象的颜色和纹理',
        '对象的当前速度',
        '对象的唯一ID',
      ],
      correctAnswer: 1,
      explanation: '内部状态是不随环境改变的状态，可以被多个对象共享，如颜色和纹理。位置、速度、ID 等属于外部状态。',
    },
    {
      id: 'q3',
      type: 'boolean',
      question: '享元工厂（FlyweightFactory）负责创建和管理享元对象',
      options: ['正确', '错误'],
      correctAnswer: 0,
      explanation: '正确。享元工厂负责创建享元对象并维护享元池，确保相同的内部状态只创建一个享元对象。',
    },
  ],
};
