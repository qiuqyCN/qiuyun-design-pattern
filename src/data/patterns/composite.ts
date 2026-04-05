import type { DesignPattern } from '@/types/pattern';

export const compositePattern: DesignPattern = {
  id: 'composite',
  name: '组合模式',
  nameEn: 'Composite Pattern',
  category: 'structural',
  difficulty: 'medium',
  frequency: 'medium',
  intent: '将对象组合成树形结构以表示"部分-整体"的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。',
  description: '组合模式是一种结构型设计模式，你可以使用它将对象组合成树状结构，并且能像使用独立对象一样使用它们。',
  applicability: ['当需要实现树状对象结构时', '当希望客户端代码以相同方式处理简单和复杂元素时'],
  pros: ['可以利用多态和递归以更方便的方式使用复杂树结构', '开闭原则：无需更改现有代码，就能在应用中添加新元素'],
  cons: ['对于功能差异较大的类，提供公共接口可能会有困难', '在某些情况下，过度使用组合模式会导致代码更加复杂'],
  analogy: { title: '现实世界中的组合', description: '组合模式就像是文件系统', scenarios: [{ id: 'filesystem', title: '文件系统', description: '文件系统由文件和文件夹组成，文件夹可以包含文件和其他文件夹，形成树形结构。', icon: 'Folder' }] },
  structure: {
    classDiagram: '',
    mermaidDiagram: `
classDiagram
  class Component {
    <<interface>>
    +operation() string
    +add(Component) void
    +remove(Component) void
    +getChild(int) Component
  }
  
  class Leaf {
    +operation() string
  }
  
  class Composite {
    -children: List~Component~
    +operation() string
    +add(Component) void
    +remove(Component) void
    +getChild(int) Component
  }
  
  class Client {
    +main()
  }
  
  Component <|-- Leaf
  Component <|-- Composite
  Composite o--> Component : children
  Client ..> Component : uses
  
  style Component fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style Leaf fill:#e8f5e9,stroke:#388e3c,stroke-width:1px
  style Composite fill:#fff3e0,stroke:#f57c00,stroke-width:1px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: '组件接口',
        description: '定义 Component 接口，声明叶子和组合的共同操作',
        duration: 2000,
        elements: [
          { id: 'component', type: 'interface', name: 'Component', x: 200, y: 150, methods: ['+operation()', '+add()', '+remove()', '+getChild()'] },
        ],
      },
      {
        id: 'step2',
        title: '叶子节点',
        description: 'Leaf 类实现 Component 接口，代表树中的叶子节点',
        duration: 2000,
        elements: [
          { id: 'component', type: 'interface', name: 'Component', x: 200, y: 150, methods: ['+operation()', '+add()', '+remove()', '+getChild()'] },
          { id: 'leaf', type: 'class', name: 'Leaf', x: 100, y: 300, methods: ['+operation()'] },
        ],
        connections: [
          { from: 'leaf', to: 'component', type: 'implementation' },
        ],
      },
      {
        id: 'step3',
        title: '组合节点',
        description: 'Composite 类包含子组件列表，实现 Component 接口',
        duration: 3000,
        elements: [
          { id: 'component', type: 'interface', name: 'Component', x: 200, y: 150, methods: ['+operation()', '+add()', '+remove()', '+getChild()'] },
          { id: 'leaf', type: 'class', name: 'Leaf', x: 100, y: 300, methods: ['+operation()'] },
          { id: 'composite', type: 'class', name: 'Composite', x: 350, y: 300, properties: ['-children: Component[]'], methods: ['+operation()', '+add()', '+remove()', '+getChild()'] },
        ],
        connections: [
          { from: 'leaf', to: 'component', type: 'implementation' },
          { from: 'composite', to: 'component', type: 'implementation' },
          { from: 'composite', to: 'component', type: 'composition', label: 'children' },
        ],
      },
      {
        id: 'step4',
        title: '客户端使用',
        description: '客户端通过 Component 接口统一处理叶子和组合对象',
        duration: 3000,
        elements: [
          { id: 'component', type: 'interface', name: 'Component', x: 200, y: 150, methods: ['+operation()', '+add()', '+remove()', '+getChild()'] },
          { id: 'leaf', type: 'class', name: 'Leaf', x: 100, y: 300, methods: ['+operation()'] },
          { id: 'composite', type: 'class', name: 'Composite', x: 350, y: 300, properties: ['-children: Component[]'], methods: ['+operation()', '+add()', '+remove()', '+getChild()'] },
          { id: 'client', type: 'class', name: 'Client', x: 500, y: 150, methods: ['+main()'] },
        ],
        connections: [
          { from: 'leaf', to: 'component', type: 'implementation' },
          { from: 'composite', to: 'component', type: 'implementation' },
          { from: 'composite', to: 'component', type: 'composition', label: 'children' },
          { from: 'client', to: 'component', type: 'dependency', label: 'uses' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * 组合模式 - TypeScript 实现
 * 将对象组合成树形结构以表示"部分-整体"的层次结构
 */

/**
 * Component 接口声明了叶子和组合的共同操作
 * 客户端通过此接口与树中的所有组件交互
 */
interface Component {
  /**
   * 执行操作，叶子和组合的实现方式不同
   */
  operation(): string;

  /**
   * 添加子组件（叶子节点可能不支持此操作）
   */
  add(component: Component): void;

  /**
   * 移除子组件（叶子节点可能不支持此操作）
   */
  remove(component: Component): void;

  /**
   * 获取子组件（叶子节点可能不支持此操作）
   */
  getChild(index: number): Component | null;
}

/**
 * Leaf 类表示树的叶子节点
 * 叶子节点没有子节点，通常执行实际的工作
 */
class Leaf implements Component {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  /**
   * 叶子节点的操作实现
   */
  operation(): string {
    return \`Leaf(\${this.name})\`;
  }

  /**
   * 叶子节点不支持添加子组件
   */
  add(component: Component): void {
    console.log("Cannot add to a leaf");
  }

  /**
   * 叶子节点不支持移除子组件
   */
  remove(component: Component): void {
    console.log("Cannot remove from a leaf");
  }

  /**
   * 叶子节点没有子组件
   */
  getChild(index: number): Component | null {
    return null;
  }
}

/**
 * Composite 类表示有子节点的组合对象
 * 它存储子组件并实现与子组件相关的操作
 */
class Composite implements Component {
  private children: Component[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  /**
   * 向组合中添加子组件
   */
  add(component: Component): void {
    this.children.push(component);
  }

  /**
   * 从组合中移除子组件
   */
  remove(component: Component): void {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  /**
   * 获取指定索引的子组件
   */
  getChild(index: number): Component | null {
    if (index >= 0 && index < this.children.length) {
      return this.children[index];
    }
    return null;
  }

  /**
   * 组合的操作实现：递归调用所有子组件的操作
   * 这是组合模式的核心，统一处理单个和组合对象
   */
  operation(): string {
    const results: string[] = [];
    results.push(\`Composite(\${this.name})[\`);
    
    // 递归调用所有子组件的 operation
    const childResults = this.children.map(child => child.operation());
    results.push(childResults.join(', '));
    
    results.push(']');
    return results.join('');
  }
}

/**
 * 客户端代码
 * 通过 Component 接口与所有组件交互，无需知道是叶子还是组合
 */
function clientCode(): void {
  // 创建根组合
  const root = new Composite("Root");
  
  // 创建分支组合
  const branch1 = new Composite("Branch1");
  const branch2 = new Composite("Branch2");
  
  // 创建叶子节点
  const leaf1 = new Leaf("Leaf1");
  const leaf2 = new Leaf("Leaf2");
  const leaf3 = new Leaf("Leaf3");
  
  // 构建树形结构
  root.add(branch1);
  root.add(branch2);
  
  branch1.add(leaf1);
  branch1.add(leaf2);
  branch2.add(leaf3);
  
  // 客户端统一调用，无需区分叶子和组合
  console.log(root.operation());
  // 输出: Composite(Root)[Composite(Branch1)[Leaf(Leaf1), Leaf(Leaf2)], Composite(Branch2)[Leaf(Leaf3)]]
  
  // 也可以单独操作叶子
  console.log(leaf1.operation()); // 输出: Leaf(Leaf1)
}

// 执行客户端代码
clientCode();`,

    java: `/**
 * 组合模式 - Java 实现
 * 将对象组合成树形结构以表示"部分-整体"的层次结构
 */

import java.util.ArrayList;
import java.util.List;

/**
 * Component 接口声明了叶子和组合的共同操作
 * 客户端通过此接口与树中的所有组件交互
 */
interface Component {
    /**
     * 执行操作，叶子和组合的实现方式不同
     */
    String operation();

    /**
     * 添加子组件（叶子节点可能不支持此操作）
     */
    void add(Component component);

    /**
     * 移除子组件（叶子节点可能不支持此操作）
     */
    void remove(Component component);

    /**
     * 获取子组件（叶子节点可能不支持此操作）
     */
    Component getChild(int index);
}

/**
 * Leaf 类表示树的叶子节点
 * 叶子节点没有子节点，通常执行实际的工作
 */
class Leaf implements Component {
    private String name;

    public Leaf(String name) {
        this.name = name;
    }

    /**
     * 叶子节点的操作实现
     */
    @Override
    public String operation() {
        return "Leaf(" + name + ")";
    }

    /**
     * 叶子节点不支持添加子组件
     */
    @Override
    public void add(Component component) {
        throw new UnsupportedOperationException("Cannot add to a leaf");
    }

    /**
     * 叶子节点不支持移除子组件
     */
    @Override
    public void remove(Component component) {
        throw new UnsupportedOperationException("Cannot remove from a leaf");
    }

    /**
     * 叶子节点没有子组件
     */
    @Override
    public Component getChild(int index) {
        throw new UnsupportedOperationException("Leaf has no children");
    }
}

/**
 * Composite 类表示有子节点的组合对象
 * 它存储子组件并实现与子组件相关的操作
 */
class Composite implements Component {
    private List<Component> children = new ArrayList<>();
    private String name;

    public Composite(String name) {
        this.name = name;
    }

    /**
     * 向组合中添加子组件
     */
    @Override
    public void add(Component component) {
        children.add(component);
    }

    /**
     * 从组合中移除子组件
     */
    @Override
    public void remove(Component component) {
        children.remove(component);
    }

    /**
     * 获取指定索引的子组件
     */
    @Override
    public Component getChild(int index) {
        if (index >= 0 && index < children.size()) {
            return children.get(index);
        }
        return null;
    }

    /**
     * 组合的操作实现：递归调用所有子组件的操作
     * 这是组合模式的核心，统一处理单个和组合对象
     */
    @Override
    public String operation() {
        StringBuilder result = new StringBuilder();
        result.append("Composite(").append(name).append(")[");
        
        // 递归调用所有子组件的 operation
        for (int i = 0; i < children.size(); i++) {
            result.append(children.get(i).operation());
            if (i < children.size() - 1) {
                result.append(", ");
            }
        }
        
        result.append("]");
        return result.toString();
    }
}

/**
 * 客户端代码
 * 通过 Component 接口与所有组件交互，无需知道是叶子还是组合
 */
public class Client {
    public static void main(String[] args) {
        // 创建根组合
        Component root = new Composite("Root");
        
        // 创建分支组合
        Component branch1 = new Composite("Branch1");
        Component branch2 = new Composite("Branch2");
        
        // 创建叶子节点
        Component leaf1 = new Leaf("Leaf1");
        Component leaf2 = new Leaf("Leaf2");
        Component leaf3 = new Leaf("Leaf3");
        
        // 构建树形结构
        root.add(branch1);
        root.add(branch2);
        
        branch1.add(leaf1);
        branch1.add(leaf2);
        branch2.add(leaf3);
        
        // 客户端统一调用，无需区分叶子和组合
        System.out.println(root.operation());
        // 输出: Composite(Root)[Composite(Branch1)[Leaf(Leaf1), Leaf(Leaf2)], Composite(Branch2)[Leaf(Leaf3)]]
        
        // 也可以单独操作叶子
        System.out.println(leaf1.operation()); // 输出: Leaf(Leaf1)
    }
}`,

    go: `/**
 * 组合模式 - Go 实现
 * 将对象组合成树形结构以表示"部分-整体"的层次结构
 */

package main

import (
	"fmt"
	"strings"
)

/**
 * Component 接口声明了叶子和组合的共同操作
 * 客户端通过此接口与树中的所有组件交互
 */
type Component interface {
	// 执行操作，叶子和组合的实现方式不同
	Operation() string
	// 添加子组件
	Add(component Component)
	// 移除子组件
	Remove(component Component)
	// 获取子组件
	GetChild(index int) Component
}

/**
 * Leaf 结构体表示树的叶子节点
 * 叶子节点没有子节点，通常执行实际的工作
 */
type Leaf struct {
	name string
}

// NewLeaf 创建新的叶子节点
func NewLeaf(name string) *Leaf {
	return &Leaf{name: name}
}

/**
 * 叶子节点的操作实现
 */
func (l *Leaf) Operation() string {
	return fmt.Sprintf("Leaf(%s)", l.name)
}

/**
 * 叶子节点不支持添加子组件
 */
func (l *Leaf) Add(component Component) {
	fmt.Println("Cannot add to a leaf")
}

/**
 * 叶子节点不支持移除子组件
 */
func (l *Leaf) Remove(component Component) {
	fmt.Println("Cannot remove from a leaf")
}

/**
 * 叶子节点没有子组件
 */
func (l *Leaf) GetChild(index int) Component {
	return nil
}

/**
 * Composite 结构体表示有子节点的组合对象
 * 它存储子组件并实现与子组件相关的操作
 */
type Composite struct {
	children []Component
	name     string
}

// NewComposite 创建新的组合节点
func NewComposite(name string) *Composite {
	return &Composite{
		children: make([]Component, 0),
		name:     name,
	}
}

/**
 * 向组合中添加子组件
 */
func (c *Composite) Add(component Component) {
	c.children = append(c.children, component)
}

/**
 * 从组合中移除子组件
 */
func (c *Composite) Remove(component Component) {
	for i, child := range c.children {
		if child == component {
			c.children = append(c.children[:i], c.children[i+1:]...)
			break
		}
	}
}

/**
 * 获取指定索引的子组件
 */
func (c *Composite) GetChild(index int) Component {
	if index >= 0 && index < len(c.children) {
		return c.children[index]
	}
	return nil
}

/**
 * 组合的操作实现：递归调用所有子组件的操作
 * 这是组合模式的核心，统一处理单个和组合对象
 */
func (c *Composite) Operation() string {
	var results []string
	results = append(results, fmt.Sprintf("Composite(%s)[", c.name))
	
	// 递归调用所有子组件的 Operation
	var childResults []string
	for _, child := range c.children {
		childResults = append(childResults, child.Operation())
	}
	results = append(results, strings.Join(childResults, ", "))
	
	results = append(results, "]")
	return strings.Join(results, "")
}

/**
 * 客户端代码
 * 通过 Component 接口与所有组件交互，无需知道是叶子还是组合
 */
func ClientCode() {
	// 创建根组合
	root := NewComposite("Root")
	
	// 创建分支组合
	branch1 := NewComposite("Branch1")
	branch2 := NewComposite("Branch2")
	
	// 创建叶子节点
	leaf1 := NewLeaf("Leaf1")
	leaf2 := NewLeaf("Leaf2")
	leaf3 := NewLeaf("Leaf3")
	
	// 构建树形结构
	root.Add(branch1)
	root.Add(branch2)
	
	branch1.Add(leaf1)
	branch1.Add(leaf2)
	branch2.Add(leaf3)
	
	// 客户端统一调用，无需区分叶子和组合
	fmt.Println(root.Operation())
	// 输出: Composite(Root)[Composite(Branch1)[Leaf(Leaf1), Leaf(Leaf2)], Composite(Branch2)[Leaf(Leaf3)]]
	
	// 也可以单独操作叶子
	fmt.Println(leaf1.Operation()) // 输出: Leaf(Leaf1)
}

func main() {
	ClientCode()
}`,

    python: `"""
组合模式 - Python 实现
将对象组合成树形结构以表示"部分-整体"的层次结构
"""

from abc import ABC, abstractmethod
from typing import List, Optional


class Component(ABC):
    """
    Component 抽象基类声明了叶子和组合的共同操作
    客户端通过此接口与树中的所有组件交互
    """

    @abstractmethod
    def operation(self) -> str:
        """
        执行操作，叶子和组合的实现方式不同
        """
        pass

    def add(self, component: 'Component') -> None:
        """
        添加子组件（默认实现抛出异常，叶子节点不支持）
        """
        raise NotImplementedError("Cannot add to this component")

    def remove(self, component: 'Component') -> None:
        """
        移除子组件（默认实现抛出异常，叶子节点不支持）
        """
        raise NotImplementedError("Cannot remove from this component")

    def get_child(self, index: int) -> Optional['Component']:
        """
        获取子组件（默认实现返回None，叶子节点没有子组件）
        """
        raise NotImplementedError("This component has no children")


class Leaf(Component):
    """
    Leaf 类表示树的叶子节点
    叶子节点没有子节点，通常执行实际的工作
    """

    def __init__(self, name: str):
        self._name = name

    def operation(self) -> str:
        """
        叶子节点的操作实现
        """
        return f"Leaf({self._name})"

    def add(self, component: 'Component') -> None:
        """
        叶子节点不支持添加子组件
        """
        print("Cannot add to a leaf")

    def remove(self, component: 'Component') -> None:
        """
        叶子节点不支持移除子组件
        """
        print("Cannot remove from a leaf")

    def get_child(self, index: int) -> Optional['Component']:
        """
        叶子节点没有子组件
        """
        return None


class Composite(Component):
    """
    Composite 类表示有子节点的组合对象
    它存储子组件并实现与子组件相关的操作
    """

    def __init__(self, name: str):
        self._name = name
        self._children: List[Component] = []

    def add(self, component: 'Component') -> None:
        """
        向组合中添加子组件
        """
        self._children.append(component)

    def remove(self, component: 'Component') -> None:
        """
        从组合中移除子组件
        """
        if component in self._children:
            self._children.remove(component)

    def get_child(self, index: int) -> Optional['Component']:
        """
        获取指定索引的子组件
        """
        if 0 <= index < len(self._children):
            return self._children[index]
        return None

    def operation(self) -> str:
        """
        组合的操作实现：递归调用所有子组件的操作
        这是组合模式的核心，统一处理单个和组合对象
        """
        results = [f"Composite({self._name})["]
        
        # 递归调用所有子组件的 operation
        child_results = [child.operation() for child in self._children]
        results.append(", ".join(child_results))
        
        results.append("]")
        return "".join(results)


def client_code():
    """
    客户端代码
    通过 Component 接口与所有组件交互，无需知道是叶子还是组合
    """
    # 创建根组合
    root = Composite("Root")
    
    # 创建分支组合
    branch1 = Composite("Branch1")
    branch2 = Composite("Branch2")
    
    # 创建叶子节点
    leaf1 = Leaf("Leaf1")
    leaf2 = Leaf("Leaf2")
    leaf3 = Leaf("Leaf3")
    
    # 构建树形结构
    root.add(branch1)
    root.add(branch2)
    
    branch1.add(leaf1)
    branch1.add(leaf2)
    branch2.add(leaf3)
    
    # 客户端统一调用，无需区分叶子和组合
    print(root.operation())
    # 输出: Composite(Root)[Composite(Branch1)[Leaf(Leaf1), Leaf(Leaf2)], Composite(Branch2)[Leaf(Leaf3)]]
    
    # 也可以单独操作叶子
    print(leaf1.operation())  # 输出: Leaf(Leaf1)


if __name__ == "__main__":
    client_code()`,

    cpp: `/**
 * 组合模式 - C++ 实现
 * 将对象组合成树形结构以表示"部分-整体"的层次结构
 */

#include <iostream>
#include <string>
#include <vector>
#include <memory>
#include <algorithm>

/**
 * Component 抽象类声明了叶子和组合的共同操作
 * 客户端通过此接口与树中的所有组件交互
 */
class Component {
public:
    virtual ~Component() = default;

    /**
     * 执行操作，叶子和组合的实现方式不同
     */
    virtual std::string operation() const = 0;

    /**
     * 添加子组件（叶子节点可能不支持此操作）
     */
    virtual void add(std::shared_ptr<Component> component) {
        // 默认空实现，叶子节点可以覆盖抛出异常
    }

    /**
     * 移除子组件（叶子节点可能不支持此操作）
     */
    virtual void remove(std::shared_ptr<Component> component) {
        // 默认空实现，叶子节点可以覆盖抛出异常
    }

    /**
     * 获取子组件（叶子节点可能不支持此操作）
     */
    virtual std::shared_ptr<Component> getChild(size_t index) const {
        return nullptr;
    }
};

/**
 * Leaf 类表示树的叶子节点
 * 叶子节点没有子节点，通常执行实际的工作
 */
class Leaf : public Component {
private:
    std::string name;

public:
    explicit Leaf(const std::string& name) : name(name) {}

    /**
     * 叶子节点的操作实现
     */
    std::string operation() const override {
        return "Leaf(" + name + ")";
    }

    /**
     * 叶子节点不支持添加子组件
     */
    void add(std::shared_ptr<Component> component) override {
        std::cout << "Cannot add to a leaf" << std::endl;
    }

    /**
     * 叶子节点不支持移除子组件
     */
    void remove(std::shared_ptr<Component> component) override {
        std::cout << "Cannot remove from a leaf" << std::endl;
    }

    /**
     * 叶子节点没有子组件
     */
    std::shared_ptr<Component> getChild(size_t index) const override {
        return nullptr;
    }
};

/**
 * Composite 类表示有子节点的组合对象
 * 它存储子组件并实现与子组件相关的操作
 */
class Composite : public Component {
private:
    std::vector<std::shared_ptr<Component>> children;
    std::string name;

public:
    explicit Composite(const std::string& name) : name(name) {}

    /**
     * 向组合中添加子组件
     */
    void add(std::shared_ptr<Component> component) override {
        children.push_back(component);
    }

    /**
     * 从组合中移除子组件
     */
    void remove(std::shared_ptr<Component> component) override {
        auto it = std::find(children.begin(), children.end(), component);
        if (it != children.end()) {
            children.erase(it);
        }
    }

    /**
     * 获取指定索引的子组件
     */
    std::shared_ptr<Component> getChild(size_t index) const override {
        if (index < children.size()) {
            return children[index];
        }
        return nullptr;
    }

    /**
     * 组合的操作实现：递归调用所有子组件的操作
     * 这是组合模式的核心，统一处理单个和组合对象
     */
    std::string operation() const override {
        std::string result = "Composite(" + name + ")[";
        
        // 递归调用所有子组件的 operation
        for (size_t i = 0; i < children.size(); ++i) {
            result += children[i]->operation();
            if (i < children.size() - 1) {
                result += ", ";
            }
        }
        
        result += "]";
        return result;
    }
};

/**
 * 客户端代码
 * 通过 Component 接口与所有组件交互，无需知道是叶子还是组合
 */
void clientCode() {
    // 创建根组合
    auto root = std::make_shared<Composite>("Root");
    
    // 创建分支组合
    auto branch1 = std::make_shared<Composite>("Branch1");
    auto branch2 = std::make_shared<Composite>("Branch2");
    
    // 创建叶子节点
    auto leaf1 = std::make_shared<Leaf>("Leaf1");
    auto leaf2 = std::make_shared<Leaf>("Leaf2");
    auto leaf3 = std::make_shared<Leaf>("Leaf3");
    
    // 构建树形结构
    root->add(branch1);
    root->add(branch2);
    
    branch1->add(leaf1);
    branch1->add(leaf2);
    branch2->add(leaf3);
    
    // 客户端统一调用，无需区分叶子和组合
    std::cout << root->operation() << std::endl;
    // 输出: Composite(Root)[Composite(Branch1)[Leaf(Leaf1), Leaf(Leaf2)], Composite(Branch2)[Leaf(Leaf3)]]
    
    // 也可以单独操作叶子
    std::cout << leaf1->operation() << std::endl; // 输出: Leaf(Leaf1)
}

int main() {
    clientCode();
    return 0;
}`,
  },
  realWorldExamples: [{ title: 'Java Swing', description: 'Java Swing 中的容器和组件使用组合模式。', source: 'JDK', codeSnippet: 'JPanel panel = new JPanel(); panel.add(new JButton("Click"));' }],
  relatedPatterns: ['iterator', 'visitor', 'decorator'],
  quiz: [{ id: 'q1', type: 'single', question: '组合模式的主要目的是什么？', options: ['创建对象', '组合对象成树形结构', '优化性能', '转换接口'], correctAnswer: 1, explanation: '组合模式的主要目的是将对象组合成树形结构以表示部分-整体的层次结构。' }],
};
