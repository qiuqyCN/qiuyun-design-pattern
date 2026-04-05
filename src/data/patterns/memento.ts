import type { DesignPattern } from '@/types/pattern';

export const mementoPattern: DesignPattern = {
  id: 'memento',
  name: '备忘录模式',
  nameEn: 'Memento Pattern',
  category: 'behavioral',
  difficulty: 'medium',
  frequency: 'low',
  intent: '在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样以后就可将该对象恢复到原先保存的状态。',
  description: '备忘录模式是一种行为设计模式，允许在不暴露对象实现细节的情况下保存和恢复对象之前的状态。',
  applicability: ['当需要创建对象状态快照来恢复其之前的状态时', '当直接访问对象的成员变量、获取器或设置器将导致封装被突破时'],
  pros: ['可以在不破坏对象封装的情况下创建对象状态快照', '可以通过让负责人维护备忘录历史记录来简化原发器代码'],
  cons: ['如果客户端过于频繁地创建备忘录，程序将消耗大量内存', '负责人必须完整跟踪原发器的生命周期，这样才能销毁弃用的备忘录'],
  analogy: {
    title: '现实世界中的备忘录',
    description: '备忘录就像是游戏存档',
    scenarios: [
      {
        id: 'save',
        title: '游戏存档',
        description: '你可以随时保存游戏状态（备忘录），之后可以加载存档回到之前的状态。',
        icon: 'Save',
      },
    ],
  },
  structure: {
    classDiagram: '',
    mermaidDiagram: `
classDiagram
  class Originator {
    -state: string
    +setState(state: string)
    +save(): Memento
    +restore(m: Memento)
  }
  
  class Memento {
    -state: string
    -date: Date
    +getState(): string
    +getDate(): Date
  }
  
  class Caretaker {
    -mementos: List~Memento~
    -originator: Originator
    +backup()
    +undo()
    +showHistory()
  }
  
  class Client {
    +main()
  }
  
  Originator --> Memento : creates
  Caretaker o--> Memento : manages
  Caretaker --> Originator : uses
  Client ..> Caretaker : uses
  Client ..> Originator : uses
  
  style Originator fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style Memento fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style Caretaker fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: '原发器 (Originator)',
        description: '原发器拥有需要保存的状态，可以创建备忘录保存当前状态，也可以从备忘录恢复状态',
        duration: 2000,
        elements: [
          { id: 'originator', type: 'class', name: 'Originator', x: 200, y: 150, properties: ['-state: string'], methods: ['+setState()', '+save()', '+restore()'] },
        ],
      },
      {
        id: 'step2',
        title: '备忘录 (Memento)',
        description: '备忘录是不可变的对象，存储原发器的内部状态，只有原发器可以访问其内容',
        duration: 2000,
        elements: [
          { id: 'originator', type: 'class', name: 'Originator', x: 200, y: 150, properties: ['-state: string'], methods: ['+setState()', '+save()', '+restore()'] },
          { id: 'memento', type: 'class', name: 'Memento', x: 450, y: 150, properties: ['-state: string', '-date: Date'], methods: ['+getState()', '+getDate()'] },
        ],
        connections: [
          { from: 'originator', to: 'memento', type: 'association', label: 'creates' },
        ],
      },
      {
        id: 'step3',
        title: '管理者 (Caretaker)',
        description: '管理者负责保存备忘录的历史记录，可以执行撤销操作，但不访问备忘录内容',
        duration: 3000,
        elements: [
          { id: 'originator', type: 'class', name: 'Originator', x: 200, y: 150, properties: ['-state: string'], methods: ['+setState()', '+save()', '+restore()'] },
          { id: 'memento', type: 'class', name: 'Memento', x: 450, y: 150, properties: ['-state: string', '-date: Date'], methods: ['+getState()', '+getDate()'] },
          { id: 'caretaker', type: 'class', name: 'Caretaker', x: 700, y: 150, properties: ['-mementos: List', '-originator: Originator'], methods: ['+backup()', '+undo()', '+showHistory()'] },
        ],
        connections: [
          { from: 'originator', to: 'memento', type: 'association', label: 'creates' },
          { from: 'caretaker', to: 'memento', type: 'aggregation', label: 'manages' },
          { from: 'caretaker', to: 'originator', type: 'association', label: 'uses' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * 备忘录模式 - TypeScript 实现
 * 以文本编辑器为例，展示撤销/重做功能
 */

/**
 * 备忘录类 - 存储原发器的状态
 * 备忘录是不可变的，创建后状态不能修改
 */
class Memento {
  private readonly state: string;
  private readonly date: Date;

  constructor(state: string) {
    this.state = state;
    this.date = new Date();
  }

  /**
   * 获取保存的状态
   * 只有原发器应该调用此方法
   */
  public getState(): string {
    return this.state;
  }

  /**
   * 获取备忘录创建时间
   */
  public getDate(): Date {
    return this.date;
  }

  /**
   * 获取备忘录标签（用于显示历史记录）
   */
  public getLabel(): string {
    return \`\${this.date.toISOString()} / (\${this.state.substring(0, 9)}...)\`;
  }
}

/**
 * 原发器类 - 拥有需要保存的状态
 * 可以创建备忘录保存状态，也可以从备忘录恢复
 */
class Originator {
  private state: string;

  constructor(state: string) {
    this.state = state;
    console.log(\`原发器: 初始状态为 '\${state}'\`);
  }

  /**
   * 执行业务逻辑，改变状态
   */
  public doSomething(): void {
    console.log("原发器: 正在执行重要操作...");
    this.state = this.generateRandomString(30);
    console.log(\`原发器: 状态已变为 '\${this.state}'\`);
  }

  /**
   * 设置新状态
   */
  public setState(state: string): void {
    this.state = state;
    console.log(\`原发器: 手动设置状态为 '\${state}'\`);
  }

  /**
   * 获取当前状态
   */
  public getState(): string {
    return this.state;
  }

  /**
   * 保存当前状态到备忘录
   */
  public save(): Memento {
    return new Memento(this.state);
  }

  /**
   * 从备忘录恢复状态
   */
  public restore(memento: Memento): void {
    this.state = memento.getState();
    console.log(\`原发器: 状态已恢复为 '\${this.state}'\`);
  }

  /**
   * 生成随机字符串（模拟状态变化）
   */
  private generateRandomString(length: number = 10): string {
    const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length }, () =>
      charSet.charAt(Math.floor(Math.random() * charSet.length))
    ).join('');
  }
}

/**
 * 管理者类 - 负责管理备忘录历史
 * 不访问备忘录内部状态，只负责存储和检索
 */
class Caretaker {
  private mementos: Memento[] = [];
  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  /**
   * 备份当前状态
   */
  public backup(): void {
    console.log("\\n管理者: 正在保存原发器状态...");
    this.mementos.push(this.originator.save());
  }

  /**
   * 撤销操作 - 恢复到上一个状态
   */
  public undo(): void {
    if (this.mementos.length === 0) {
      console.log("管理者: 历史记录为空，无法撤销。");
      return;
    }

    const memento = this.mementos.pop()!;
    console.log(\`管理者: 正在恢复到: \${memento.getLabel()}\`);
    try {
      this.originator.restore(memento);
    } catch (e) {
      this.undo(); // 如果恢复失败，继续撤销
    }
  }

  /**
   * 撤销到指定索引的状态
   */
  public undoToIndex(index: number): void {
    if (index < 0 || index >= this.mementos.length) {
      console.log("管理者: 无效的索引。");
      return;
    }

    // 移除索引之后的所有备忘录
    while (this.mementos.length > index + 1) {
      this.mementos.pop();
    }

    const memento = this.mementos[index];
    console.log(\`管理者: 恢复到索引 \${index}: \${memento.getLabel()}\`);
    this.originator.restore(memento);
  }

  /**
   * 显示历史记录
   */
  public showHistory(): void {
    console.log("\\n管理者: 备忘录历史列表:");
    this.mementos.forEach((memento, index) => {
      console.log(\`  \${index}: \${memento.getLabel()}\`);
    });
  }

  /**
   * 获取历史记录数量
   */
  public getHistoryCount(): number {
    return this.mementos.length;
  }
}

/**
 * 客户端代码 - 演示备忘录模式的使用
 */
function clientCode(): void {
  console.log("=== 备忘录模式演示 ===\\n");

  // 创建原发器（文本编辑器）
  const originator = new Originator("初始文本内容...");
  
  // 创建管理者
  const caretaker = new Caretaker(originator);

  // 保存初始状态
  caretaker.backup();

  // 模拟编辑操作并保存
  originator.doSomething();
  caretaker.backup();

  originator.doSomething();
  caretaker.backup();

  originator.setState("用户手动输入的新内容...");
  caretaker.backup();

  // 显示历史记录
  caretaker.showHistory();

  console.log("\\n=== 执行撤销操作 ===");
  
  // 撤销一次
  caretaker.undo();
  console.log(\`当前状态: '\${originator.getState()}'\`);

  // 再撤销一次
  caretaker.undo();
  console.log(\`当前状态: '\${originator.getState()}'\`);

  console.log("\\n=== 恢复到特定版本 ===");
  
  // 恢复到索引 0（初始状态）
  caretaker.undoToIndex(0);
  console.log(\`当前状态: '\${originator.getState()}'\`);

  caretaker.showHistory();
}

// 运行客户端代码
clientCode();`,

    java: `/**
 * 备忘录模式 - Java 实现
 * 以文本编辑器为例，展示撤销/重做功能
 */

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

/**
 * 备忘录接口 - 定义备忘录的基本操作
 * 可以使用接口限制对备忘录的访问
 */
interface IMemento {
    String getLabel();
    Date getDate();
}

/**
 * 备忘录类 - 存储原发器的状态
 * 包私有访问权限，只有同包类可以访问
 */
class Memento implements IMemento {
    private final String state;
    private final Date date;

    public Memento(String state) {
        this.state = state;
        this.date = new Date();
    }

    /**
     * 获取保存的状态
     * 包私有方法，只有原发器可以访问
     */
    String getState() {
        return state;
    }

    @Override
    public Date getDate() {
        return date;
    }

    @Override
    public String getLabel() {
        return String.format("%s / (%s...)", 
            date.toString(), 
            state.substring(0, Math.min(9, state.length()))
        );
    }
}

/**
 * 原发器类 - 拥有需要保存的状态
 */
class Originator {
    private String state;

    public Originator(String state) {
        this.state = state;
        System.out.println("原发器: 初始状态为 '" + state + "'");
    }

    /**
     * 执行业务逻辑，改变状态
     */
    public void doSomething() {
        System.out.println("原发器: 正在执行重要操作...");
        this.state = generateRandomString(30);
        System.out.println("原发器: 状态已变为 '" + state + "'");
    }

    /**
     * 设置新状态
     */
    public void setState(String state) {
        this.state = state;
        System.out.println("原发器: 手动设置状态为 '" + state + "'");
    }

    /**
     * 获取当前状态
     */
    public String getState() {
        return state;
    }

    /**
     * 保存当前状态到备忘录
     */
    public Memento save() {
        return new Memento(this.state);
    }

    /**
     * 从备忘录恢复状态
     */
    public void restore(Memento memento) {
        this.state = memento.getState();
        System.out.println("原发器: 状态已恢复为 '" + state + "'");
    }

    /**
     * 生成随机字符串
     */
    private String generateRandomString(int length) {
        String charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(charSet.charAt(random.nextInt(charSet.length())));
        }
        return sb.toString();
    }
}

/**
 * 管理者类 - 负责管理备忘录历史
 */
class Caretaker {
    private List<Memento> mementos = new ArrayList<>();
    private Originator originator;

    public Caretaker(Originator originator) {
        this.originator = originator;
    }

    /**
     * 备份当前状态
     */
    public void backup() {
        System.out.println("\\n管理者: 正在保存原发器状态...");
        mementos.add(originator.save());
    }

    /**
     * 撤销操作
     */
    public void undo() {
        if (mementos.isEmpty()) {
            System.out.println("管理者: 历史记录为空，无法撤销。");
            return;
        }

        Memento memento = mementos.remove(mementos.size() - 1);
        System.out.println("管理者: 正在恢复到: " + memento.getLabel());
        try {
            originator.restore(memento);
        } catch (Exception e) {
            undo(); // 如果恢复失败，继续撤销
        }
    }

    /**
     * 撤销到指定索引
     */
    public void undoToIndex(int index) {
        if (index < 0 || index >= mementos.size()) {
            System.out.println("管理者: 无效的索引。");
            return;
        }

        // 移除索引之后的所有备忘录
        while (mementos.size() > index + 1) {
            mementos.remove(mementos.size() - 1);
        }

        Memento memento = mementos.get(index);
        System.out.println("管理者: 恢复到索引 " + index + ": " + memento.getLabel());
        originator.restore(memento);
    }

    /**
     * 显示历史记录
     */
    public void showHistory() {
        System.out.println("\\n管理者: 备忘录历史列表:");
        for (int i = 0; i < mementos.size(); i++) {
            System.out.println("  " + i + ": " + mementos.get(i).getLabel());
        }
    }

    public int getHistoryCount() {
        return mementos.size();
    }
}

/**
 * 客户端代码
 */
public class Client {
    public static void main(String[] args) {
        System.out.println("=== 备忘录模式演示 ===\\n");

        // 创建原发器
        Originator originator = new Originator("初始文本内容...");
        Caretaker caretaker = new Caretaker(originator);

        // 保存初始状态
        caretaker.backup();

        // 模拟编辑操作
        originator.doSomething();
        caretaker.backup();

        originator.doSomething();
        caretaker.backup();

        originator.setState("用户手动输入的新内容...");
        caretaker.backup();

        // 显示历史
        caretaker.showHistory();

        System.out.println("\\n=== 执行撤销操作 ===");
        
        // 撤销
        caretaker.undo();
        System.out.println("当前状态: '" + originator.getState() + "'");

        caretaker.undo();
        System.out.println("当前状态: '" + originator.getState() + "'");

        System.out.println("\\n=== 恢复到特定版本 ===");
        
        caretaker.undoToIndex(0);
        System.out.println("当前状态: '" + originator.getState() + "'");

        caretaker.showHistory();
    }
}`,

    go: `package memento

import (
	"fmt"
	"math/rand"
	"time"
)

/**
 * 备忘录模式 - Go 实现
 * 以文本编辑器为例，展示撤销/重做功能
 */

// Memento 备忘录结构体 - 存储原发器状态
type Memento struct {
	state string
	date  time.Time
}

// GetState 获取保存的状态（包内可见）
func (m *Memento) getState() string {
	return m.state
}

// GetDate 获取创建时间
func (m *Memento) GetDate() time.Time {
	return m.date
}

// GetLabel 获取备忘录标签
func (m *Memento) GetLabel() string {
	statePreview := m.state
	if len(statePreview) > 9 {
		statePreview = statePreview[:9]
	}
	return fmt.Sprintf("%s / (%s...)", m.date.Format(time.RFC3339), statePreview)
}

// NewMemento 创建新的备忘录
func NewMemento(state string) *Memento {
	return &Memento{
		state: state,
		date:  time.Now(),
	}
}

// Originator 原发器结构体 - 拥有需要保存的状态
type Originator struct {
	state string
}

// NewOriginator 创建新的原发器
func NewOriginator(state string) *Originator {
	fmt.Printf("原发器: 初始状态为 '%s'\\n", state)
	return &Originator{state: state}
}

// DoSomething 执行业务逻辑，改变状态
func (o *Originator) DoSomething() {
	fmt.Println("原发器: 正在执行重要操作...")
	o.state = generateRandomString(30)
	fmt.Printf("原发器: 状态已变为 '%s'\\n", o.state)
}

// SetState 设置新状态
func (o *Originator) SetState(state string) {
	o.state = state
	fmt.Printf("原发器: 手动设置状态为 '%s'\\n", o.state)
}

// GetState 获取当前状态
func (o *Originator) GetState() string {
	return o.state
}

// Save 保存当前状态到备忘录
func (o *Originator) Save() *Memento {
	return NewMemento(o.state)
}

// Restore 从备忘录恢复状态
func (o *Originator) Restore(m *Memento) {
	o.state = m.getState()
	fmt.Printf("原发器: 状态已恢复为 '%s'\\n", o.state)
}

// generateRandomString 生成随机字符串
func generateRandomString(length int) string {
	charSet := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	result := make([]byte, length)
	for i := range result {
		result[i] = charSet[rand.Intn(len(charSet))]
	}
	return string(result)
}

// Caretaker 管理者结构体 - 负责管理备忘录历史
type Caretaker struct {
	mementos  []*Memento
	originator *Originator
}

// NewCaretaker 创建新的管理者
func NewCaretaker(originator *Originator) *Caretaker {
	return &Caretaker{
		mementos:   make([]*Memento, 0),
		originator: originator,
	}
}

// Backup 备份当前状态
func (c *Caretaker) Backup() {
	fmt.Println("\\n管理者: 正在保存原发器状态...")
	c.mementos = append(c.mementos, c.originator.Save())
}

// Undo 撤销操作
func (c *Caretaker) Undo() {
	if len(c.mementos) == 0 {
		fmt.Println("管理者: 历史记录为空，无法撤销。")
		return
	}

	// 获取最后一个备忘录
	memento := c.mementos[len(c.mementos)-1]
	c.mementos = c.mementos[:len(c.mementos)-1]

	fmt.Printf("管理者: 正在恢复到: %s\\n", memento.GetLabel())
	c.originator.Restore(memento)
}

// UndoToIndex 撤销到指定索引
func (c *Caretaker) UndoToIndex(index int) {
	if index < 0 || index >= len(c.mementos) {
		fmt.Println("管理者: 无效的索引。")
		return
	}

	// 移除索引之后的所有备忘录
	for len(c.mementos) > index+1 {
		c.mementos = c.mementos[:len(c.mementos)-1]
	}

	memento := c.mementos[index]
	fmt.Printf("管理者: 恢复到索引 %d: %s\\n", index, memento.GetLabel())
	c.originator.Restore(memento)
}

// ShowHistory 显示历史记录
func (c *Caretaker) ShowHistory() {
	fmt.Println("\\n管理者: 备忘录历史列表:")
	for i, memento := range c.mementos {
		fmt.Printf("  %d: %s\\n", i, memento.GetLabel())
	}
}

// GetHistoryCount 获取历史记录数量
func (c *Caretaker) GetHistoryCount() int {
	return len(c.mementos)
}

// ClientCode 客户端代码 - 演示备忘录模式
func ClientCode() {
	fmt.Println("=== 备忘录模式演示 ===\\n")

	// 初始化随机种子
	rand.Seed(time.Now().UnixNano())

	// 创建原发器
	originator := NewOriginator("初始文本内容...")
	caretaker := NewCaretaker(originator)

	// 保存初始状态
	caretaker.Backup()

	// 模拟编辑操作
	originator.DoSomething()
	caretaker.Backup()

	originator.DoSomething()
	caretaker.Backup()

	originator.SetState("用户手动输入的新内容...")
	caretaker.Backup()

	// 显示历史
	caretaker.ShowHistory()

	fmt.Println("\\n=== 执行撤销操作 ===")

	// 撤销
	caretaker.Undo()
	fmt.Printf("当前状态: '%s'\\n", originator.GetState())

	caretaker.Undo()
	fmt.Printf("当前状态: '%s'\\n", originator.GetState())

	fmt.Println("\\n=== 恢复到特定版本 ===")

	caretaker.UndoToIndex(0)
	fmt.Printf("当前状态: '%s'\\n", originator.GetState())

	caretaker.ShowHistory()
}`,

    python: `"""
备忘录模式 - Python 实现
以文本编辑器为例，展示撤销/重做功能
"""

from __future__ import annotations
from datetime import datetime
from typing import List, Optional
import random
import string


class Memento:
    """
    备忘录类 - 存储原发器的状态
    备忘录是不可变的，创建后状态不能修改
    """
    
    def __init__(self, state: str) -> None:
        self._state = state
        self._date = datetime.now()
    
    @property
    def state(self) -> str:
        """获取保存的状态（受保护属性）"""
        return self._state
    
    @property
    def date(self) -> datetime:
        """获取备忘录创建时间"""
        return self._date
    
    def get_label(self) -> str:
        """获取备忘录标签（用于显示历史记录）"""
        preview = self._state[:9] if len(self._state) > 9 else self._state
        return f"{self._date.isoformat()} / ({preview}...)"


class Originator:
    """
    原发器类 - 拥有需要保存的状态
    可以创建备忘录保存状态，也可以从备忘录恢复
    """
    
    def __init__(self, state: str) -> None:
        self._state = state
        print(f"原发器: 初始状态为 '{state}'")
    
    def do_something(self) -> None:
        """执行业务逻辑，改变状态"""
        print("原发器: 正在执行重要操作...")
        self._state = self._generate_random_string(30)
        print(f"原发器: 状态已变为 '{self._state}'")
    
    def set_state(self, state: str) -> None:
        """设置新状态"""
        self._state = state
        print(f"原发器: 手动设置状态为 '{state}'")
    
    def get_state(self) -> str:
        """获取当前状态"""
        return self._state
    
    def save(self) -> Memento:
        """保存当前状态到备忘录"""
        return Memento(self._state)
    
    def restore(self, memento: Memento) -> None:
        """从备忘录恢复状态"""
        self._state = memento.state
        print(f"原发器: 状态已恢复为 '{self._state}'")
    
    @staticmethod
    def _generate_random_string(length: int = 10) -> str:
        """生成随机字符串（模拟状态变化）"""
        char_set = string.ascii_letters
        return ''.join(random.choice(char_set) for _ in range(length))


class Caretaker:
    """
    管理者类 - 负责管理备忘录历史
    不访问备忘录内部状态，只负责存储和检索
    """
    
    def __init__(self, originator: Originator) -> None:
        self._mementos: List[Memento] = []
        self._originator = originator
    
    def backup(self) -> None:
        """备份当前状态"""
        print("\\n管理者: 正在保存原发器状态...")
        self._mementos.append(self._originator.save())
    
    def undo(self) -> None:
        """撤销操作 - 恢复到上一个状态"""
        if not self._mementos:
            print("管理者: 历史记录为空，无法撤销。")
            return
        
        memento = self._mementos.pop()
        print(f"管理者: 正在恢复到: {memento.get_label()}")
        try:
            self._originator.restore(memento)
        except Exception:
            self.undo()  # 如果恢复失败，继续撤销
    
    def undo_to_index(self, index: int) -> None:
        """撤销到指定索引的状态"""
        if index < 0 or index >= len(self._mementos):
            print("管理者: 无效的索引。")
            return
        
        # 移除索引之后的所有备忘录
        while len(self._mementos) > index + 1:
            self._mementos.pop()
        
        memento = self._mementos[index]
        print(f"管理者: 恢复到索引 {index}: {memento.get_label()}")
        self._originator.restore(memento)
    
    def show_history(self) -> None:
        """显示历史记录"""
        print("\\n管理者: 备忘录历史列表:")
        for i, memento in enumerate(self._mementos):
            print(f"  {i}: {memento.get_label()}")
    
    def get_history_count(self) -> int:
        """获取历史记录数量"""
        return len(self._mementos)


def client_code() -> None:
    """客户端代码 - 演示备忘录模式的使用"""
    print("=== 备忘录模式演示 ===\\n")
    
    # 创建原发器（文本编辑器）
    originator = Originator("初始文本内容...")
    
    # 创建管理者
    caretaker = Caretaker(originator)
    
    # 保存初始状态
    caretaker.backup()
    
    # 模拟编辑操作并保存
    originator.do_something()
    caretaker.backup()
    
    originator.do_something()
    caretaker.backup()
    
    originator.set_state("用户手动输入的新内容...")
    caretaker.backup()
    
    # 显示历史记录
    caretaker.show_history()
    
    print("\\n=== 执行撤销操作 ===")
    
    # 撤销一次
    caretaker.undo()
    print(f"当前状态: '{originator.get_state()}'")
    
    # 再撤销一次
    caretaker.undo()
    print(f"当前状态: '{originator.get_state()}'")
    
    print("\\n=== 恢复到特定版本 ===")
    
    # 恢复到索引 0（初始状态）
    caretaker.undo_to_index(0)
    print(f"当前状态: '{originator.get_state()}'")
    
    caretaker.show_history()


if __name__ == "__main__":
    client_code()`,

    cpp: `/**
 * 备忘录模式 - C++ 实现
 * 以文本编辑器为例，展示撤销/重做功能
 */

#include <iostream>
#include <vector>
#include <string>
#include <ctime>
#include <memory>
#include <algorithm>

/**
 * 备忘录类 - 存储原发器的状态
 * 使用友元类允许原发器访问私有状态
 */
class Memento {
private:
    std::string state;
    std::time_t date;

    // 只有原发器可以创建备忘录
    explicit Memento(const std::string& state) 
        : state(state), date(std::time(nullptr)) {}
    
    // 允许 Originator 访问私有成员
    friend class Originator;

public:
    /**
     * 获取保存的状态
     * 只有原发器应该调用此方法（通过友元）
     */
    std::string getState() const {
        return state;
    }

    /**
     * 获取备忘录创建时间
     */
    std::time_t getDate() const {
        return date;
    }

    /**
     * 获取备忘录标签（用于显示历史记录）
     */
    std::string getLabel() const {
        std::string preview = state.substr(0, std::min(size_t(9), state.length()));
        char timeStr[26];
        ctime_s(timeStr, sizeof(timeStr), &date);
        // 移除换行符
        timeStr[24] = '\\0';
        return std::string(timeStr) + " / (" + preview + "...)";
    }
};

/**
 * 原发器类 - 拥有需要保存的状态
 * 可以创建备忘录保存状态，也可以从备忘录恢复
 */
class Originator {
private:
    std::string state;

    /**
     * 生成随机字符串（模拟状态变化）
     */
    std::string generateRandomString(int length) {
        const std::string charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        std::string result;
        result.reserve(length);
        for (int i = 0; i < length; i++) {
            result += charSet[rand() % charSet.length()];
        }
        return result;
    }

public:
    explicit Originator(const std::string& state) : state(state) {
        std::cout << "原发器: 初始状态为 '" << state << "'" << std::endl;
    }

    /**
     * 执行业务逻辑，改变状态
     */
    void doSomething() {
        std::cout << "原发器: 正在执行重要操作..." << std::endl;
        state = generateRandomString(30);
        std::cout << "原发器: 状态已变为 '" << state << "'" << std::endl;
    }

    /**
     * 设置新状态
     */
    void setState(const std::string& newState) {
        state = newState;
        std::cout << "原发器: 手动设置状态为 '" << state << "'" << std::endl;
    }

    /**
     * 获取当前状态
     */
    std::string getState() const {
        return state;
    }

    /**
     * 保存当前状态到备忘录
     */
    std::shared_ptr<Memento> save() {
        return std::shared_ptr<Memento>(new Memento(state));
    }

    /**
     * 从备忘录恢复状态
     */
    void restore(std::shared_ptr<Memento> memento) {
        state = memento->getState();
        std::cout << "原发器: 状态已恢复为 '" << state << "'" << std::endl;
    }
};

/**
 * 管理者类 - 负责管理备忘录历史
 * 不访问备忘录内部状态，只负责存储和检索
 */
class Caretaker {
private:
    std::vector<std::shared_ptr<Memento>> mementos;
    std::shared_ptr<Originator> originator;

public:
    explicit Caretaker(std::shared_ptr<Originator> originator) 
        : originator(originator) {}

    /**
     * 备份当前状态
     */
    void backup() {
        std::cout << "\\n管理者: 正在保存原发器状态..." << std::endl;
        mementos.push_back(originator->save());
    }

    /**
     * 撤销操作 - 恢复到上一个状态
     */
    void undo() {
        if (mementos.empty()) {
            std::cout << "管理者: 历史记录为空，无法撤销。" << std::endl;
            return;
        }

        auto memento = mementos.back();
        mementos.pop_back();
        std::cout << "管理者: 正在恢复到: " << memento->getLabel() << std::endl;
        try {
            originator->restore(memento);
        } catch (...) {
            undo(); // 如果恢复失败，继续撤销
        }
    }

    /**
     * 撤销到指定索引的状态
     */
    void undoToIndex(size_t index) {
        if (index >= mementos.size()) {
            std::cout << "管理者: 无效的索引。" << std::endl;
            return;
        }

        // 移除索引之后的所有备忘录
        while (mementos.size() > index + 1) {
            mementos.pop_back();
        }

        auto memento = mementos[index];
        std::cout << "管理者: 恢复到索引 " << index << ": " << memento->getLabel() << std::endl;
        originator->restore(memento);
    }

    /**
     * 显示历史记录
     */
    void showHistory() {
        std::cout << "\\n管理者: 备忘录历史列表:" << std::endl;
        for (size_t i = 0; i < mementos.size(); i++) {
            std::cout << "  " << i << ": " << mementos[i]->getLabel() << std::endl;
        }
    }

    /**
     * 获取历史记录数量
     */
    size_t getHistoryCount() const {
        return mementos.size();
    }
};

/**
 * 客户端代码 - 演示备忘录模式的使用
 */
int main() {
    // 初始化随机种子
    srand(static_cast<unsigned>(time(nullptr)));

    std::cout << "=== 备忘录模式演示 ===" << std::endl << std::endl;

    // 创建原发器（文本编辑器）
    auto originator = std::make_shared<Originator>("初始文本内容...");
    
    // 创建管理者
    auto caretaker = std::make_shared<Caretaker>(originator);

    // 保存初始状态
    caretaker->backup();

    // 模拟编辑操作并保存
    originator->doSomething();
    caretaker->backup();

    originator->doSomething();
    caretaker->backup();

    originator->setState("用户手动输入的新内容...");
    caretaker->backup();

    // 显示历史记录
    caretaker->showHistory();

    std::cout << "\\n=== 执行撤销操作 ===" << std::endl;
    
    // 撤销一次
    caretaker->undo();
    std::cout << "当前状态: '" << originator->getState() << "'" << std::endl;

    // 再撤销一次
    caretaker->undo();
    std::cout << "当前状态: '" << originator->getState() << "'" << std::endl;

    std::cout << "\\n=== 恢复到特定版本 ===" << std::endl;
    
    // 恢复到索引 0（初始状态）
    caretaker->undoToIndex(0);
    std::cout << "当前状态: '" << originator->getState() << "'" << std::endl;

    caretaker->showHistory();

    return 0;
}`,
  },
  realWorldExamples: [
    {
      title: 'Git Version Control',
      description: 'Git 的版本控制就是备忘录模式的典型应用，可以保存和恢复代码状态。',
      source: 'Git',
      codeSnippet: 'git commit -m "Save state"; git checkout HEAD~1;',
    },
    {
      title: '文本编辑器的撤销功能',
      description: '大多数文本编辑器（如 VS Code、Sublime Text）使用备忘录模式实现撤销/重做功能。',
      source: 'Text Editors',
      codeSnippet: 'Ctrl+Z // 撤销\\nCtrl+Y // 重做',
    },
    {
      title: '数据库事务回滚',
      description: '数据库系统使用备忘录模式保存事务开始前的状态，以便在回滚时恢复。',
      source: 'Database Systems',
      codeSnippet: 'BEGIN TRANSACTION;\\n-- 执行操作\\nROLLBACK; // 回滚到事务开始状态',
    },
  ],
  relatedPatterns: ['command', 'iterator', 'prototype'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '备忘录模式的主要目的是什么？',
      options: ['创建对象', '保存和恢复对象状态', '优化性能', '转换接口'],
      correctAnswer: 1,
      explanation: '备忘录模式的主要目的是在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。',
    },
    {
      id: 'q2',
      type: 'boolean',
      question: '备忘录模式中，管理者（Caretaker）可以直接访问备忘录的内部状态吗？',
      options: ['可以', '不可以'],
      correctAnswer: 1,
      explanation: '不可以。管理者只负责存储备忘录，不应该访问其内部状态。只有原发器（Originator）才能访问备忘录的内容，这样可以保护封装性。',
    },
    {
      id: 'q3',
      type: 'single',
      question: '以下哪个不是备忘录模式的典型应用场景？',
      options: ['文本编辑器的撤销功能', '游戏存档系统', '对象的深拷贝', '数据库事务回滚'],
      correctAnswer: 2,
      explanation: '对象的深拷贝通常使用原型模式（Prototype Pattern）实现，而不是备忘录模式。备忘录模式主要用于保存和恢复对象状态。',
    },
  ],
};
