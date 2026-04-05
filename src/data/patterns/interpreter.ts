import type { DesignPattern } from '@/types/pattern';

export const interpreterPattern: DesignPattern = {
  id: 'interpreter',
  name: '解释器模式',
  nameEn: 'Interpreter Pattern',
  category: 'behavioral',
  difficulty: 'hard',
  frequency: 'low',
  intent: '为语言创建解释器，定义文法的表示并解释语言中的句子',
  description: '解释器模式是一种行为型设计模式，它定义了如何为简单语言定义文法，以及如何在该语言中解释句子。该模式描述了如何为定义的文法创建解释器，使用类来表示文法规则。',
  applicability: [
    '当有一个简单的语言需要解释执行，且该语言的文法可以用抽象语法树表示时',
    '当效率不是关键考虑因素时（解释器模式对于复杂文法效率较低）',
    '当文法简单且不需要解析器生成器工具时',
    '当需要解释执行简单的规则或表达式时',
  ],
  pros: [
    '易于改变和扩展文法，因为模式使用类来表示文法规则',
    '易于实现文法，因为抽象语法树中每个节点的实现类似',
    '增加新的解释表达式较为容易',
  ],
  cons: [
    '对于复杂的文法难以维护，类层次结构会变得庞大',
    '解释器模式执行效率较低，不适合性能敏感的场景',
    '对于每条规则至少需要一个类，文法复杂时类数量会急剧增加',
  ],
  analogy: {
    title: '现实世界中的解释器',
    description: '解释器模式就像是现实世界中的语言翻译或规则解释',
    scenarios: [
      {
        id: 'translator',
        title: '语言翻译官',
        description: '翻译官接收一种语言的句子，根据语法规则逐词解析并翻译成另一种语言。解释器模式就像翻译官，根据定义的文法规则解释和执行表达式。',
        icon: 'Languages',
      },
      {
        id: 'calculator',
        title: '数学计算器',
        description: '计算器接收数学表达式（如 "2 + 3 * 4"），根据运算符优先级规则解析并计算结果。解释器模式可以用来实现这样的表达式求值。',
        icon: 'Calculator',
      },
      {
        id: 'music',
        title: '乐谱演奏',
        description: '音乐家阅读乐谱（一种音乐语言），根据音符、节拍等符号规则演奏出音乐。乐谱就是文法，演奏过程就是解释执行。',
        icon: 'Music',
      },
    ],
  },
  structure: {
    classDiagram: `
      class Context {
        +input: string
        +output: string
      }
      class AbstractExpression {
        +interpret(context)
      }
      class TerminalExpression {
        +interpret(context)
      }
      class NonTerminalExpression {
        -expression: AbstractExpression
        +interpret(context)
      }
      class Client {
        +main()
      }
      AbstractExpression <|-- TerminalExpression
      AbstractExpression <|-- NonTerminalExpression
      Client ..> AbstractExpression : uses
      Client ..> Context : uses
    `,
    mermaidDiagram: `
classDiagram
  class Context {
    +input: String
    +output: String
    +lookup(variable): String
  }
  class AbstractExpression {
    <<interface>>
    +interpret(context) void
  }
  class TerminalExpression {
    -variable: String
    +interpret(context) void
  }
  class NonTerminalExpression {
    -left: AbstractExpression
    -right: AbstractExpression
    +interpret(context) void
  }
  class AndExpression {
    +interpret(context) void
  }
  class OrExpression {
    +interpret(context) void
  }
  class Client {
    +main() void
  }
  AbstractExpression <|.. TerminalExpression
  AbstractExpression <|.. NonTerminalExpression
  NonTerminalExpression <|-- AndExpression
  NonTerminalExpression <|-- OrExpression
  Client ..> AbstractExpression : uses
  Client ..> Context : uses
  TerminalExpression ..> Context : uses
  NonTerminalExpression ..> Context : uses
  
  style AbstractExpression fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style TerminalExpression fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px
  style NonTerminalExpression fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px
  style Context fill:#fff3e0,stroke:#f57c00,stroke-width:1px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: '抽象表达式',
        description: '定义解释器的接口，声明解释操作 interpret()',
        duration: 2000,
        elements: [
          { id: 'abstract', type: 'interface', name: 'AbstractExpression', x: 200, y: 150, methods: ['+interpret(context)'] },
        ],
      },
      {
        id: 'step2',
        title: '终结符表达式',
        description: '实现与文法中的终结符相关联的解释操作',
        duration: 2000,
        elements: [
          { id: 'abstract', type: 'interface', name: 'AbstractExpression', x: 200, y: 150, methods: ['+interpret(context)'] },
          { id: 'terminal', type: 'class', name: 'TerminalExpression', x: 50, y: 300, properties: ['-variable: String'], methods: ['+interpret(context)'] },
        ],
        connections: [
          { from: 'terminal', to: 'abstract', type: 'implementation' },
        ],
      },
      {
        id: 'step3',
        title: '非终结符表达式',
        description: '为文法中的非终结符实现解释操作，通常包含对其他表达式的引用',
        duration: 2000,
        elements: [
          { id: 'abstract', type: 'interface', name: 'AbstractExpression', x: 200, y: 150, methods: ['+interpret(context)'] },
          { id: 'terminal', type: 'class', name: 'TerminalExpression', x: 50, y: 300, properties: ['-variable: String'], methods: ['+interpret(context)'] },
          { id: 'nonterminal', type: 'class', name: 'NonTerminalExpression', x: 350, y: 300, properties: ['-left: Expression', '-right: Expression'], methods: ['+interpret(context)'] },
        ],
        connections: [
          { from: 'terminal', to: 'abstract', type: 'implementation' },
          { from: 'nonterminal', to: 'abstract', type: 'implementation' },
        ],
      },
      {
        id: 'step4',
        title: '上下文',
        description: '包含解释器之外的一些全局信息，用于存储和传递解释过程中的状态',
        duration: 2000,
        elements: [
          { id: 'abstract', type: 'interface', name: 'AbstractExpression', x: 200, y: 150, methods: ['+interpret(context)'] },
          { id: 'terminal', type: 'class', name: 'TerminalExpression', x: 50, y: 300, properties: ['-variable: String'], methods: ['+interpret(context)'] },
          { id: 'nonterminal', type: 'class', name: 'NonTerminalExpression', x: 350, y: 300, properties: ['-left: Expression', '-right: Expression'], methods: ['+interpret(context)'] },
          { id: 'context', type: 'class', name: 'Context', x: 500, y: 150, properties: ['+input: String', '+output: String'], methods: ['+lookup(variable)'] },
        ],
        connections: [
          { from: 'terminal', to: 'abstract', type: 'implementation' },
          { from: 'nonterminal', to: 'abstract', type: 'implementation' },
          { from: 'terminal', to: 'context', type: 'dependency' },
          { from: 'nonterminal', to: 'context', type: 'dependency' },
        ],
      },
      {
        id: 'step5',
        title: '客户端构建语法树',
        description: '客户端构建抽象语法树（由具体表达式组成）并调用解释操作',
        duration: 3000,
        elements: [
          { id: 'abstract', type: 'interface', name: 'AbstractExpression', x: 200, y: 150, methods: ['+interpret(context)'] },
          { id: 'terminal', type: 'class', name: 'TerminalExpression', x: 50, y: 300, properties: ['-variable: String'], methods: ['+interpret(context)'] },
          { id: 'nonterminal', type: 'class', name: 'NonTerminalExpression', x: 350, y: 300, properties: ['-left: Expression', '-right: Expression'], methods: ['+interpret(context)'] },
          { id: 'context', type: 'class', name: 'Context', x: 500, y: 150, properties: ['+input: String', '+output: String'], methods: ['+lookup(variable)'] },
          { id: 'client', type: 'class', name: 'Client', x: 500, y: 350, methods: ['+main()'] },
        ],
        connections: [
          { from: 'terminal', to: 'abstract', type: 'implementation' },
          { from: 'nonterminal', to: 'abstract', type: 'implementation' },
          { from: 'terminal', to: 'context', type: 'dependency' },
          { from: 'nonterminal', to: 'context', type: 'dependency' },
          { from: 'client', to: 'abstract', type: 'dependency' },
          { from: 'client', to: 'context', type: 'dependency' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * 解释器模式 - TypeScript 实现
 * 以布尔表达式解释器为例，支持 AND、OR、NOT 操作
 */

/**
 * Context 类 - 上下文
 * 包含解释器之外的一些全局信息
 * 用于存储变量及其布尔值
 */
class Context {
  private variables: Map<string, boolean> = new Map();

  /**
   * 设置变量的值
   * @param name 变量名
   * @param value 布尔值
   */
  setVariable(name: string, value: boolean): void {
    this.variables.set(name, value);
  }

  /**
   * 查找变量的值
   * @param name 变量名
   * @returns 变量的布尔值
   */
  lookup(name: string): boolean {
    const value = this.variables.get(name);
    if (value === undefined) {
      throw new Error(\`变量 '\${name}' 未定义\`);
    }
    return value;
  }
}

/**
 * AbstractExpression 接口 - 抽象表达式
 * 声明一个抽象的解释操作，所有具体表达式都要实现这个接口
 */
interface AbstractExpression {
  interpret(context: Context): boolean;
}

/**
 * TerminalExpression 类 - 终结符表达式
 * 实现与文法中的终结符相关联的解释操作
 * 在这个例子中，终结符是布尔变量
 */
class TerminalExpression implements AbstractExpression {
  private variable: string;

  constructor(variable: string) {
    this.variable = variable;
  }

  /**
   * 解释操作：从上下文中查找变量的值
   */
  interpret(context: Context): boolean {
    return context.lookup(this.variable);
  }

  getVariable(): string {
    return this.variable;
  }
}

/**
 * AndExpression 类 - 非终结符表达式（AND 操作）
 * 实现与文法中的非终结符 AND 相关联的解释操作
 * 包含两个子表达式，当两者都为 true 时返回 true
 */
class AndExpression implements AbstractExpression {
  private left: AbstractExpression;
  private right: AbstractExpression;

  constructor(left: AbstractExpression, right: AbstractExpression) {
    this.left = left;
    this.right = right;
  }

  /**
   * 解释操作：对左右两个子表达式进行逻辑与操作
   */
  interpret(context: Context): boolean {
    return this.left.interpret(context) && this.right.interpret(context);
  }
}

/**
 * OrExpression 类 - 非终结符表达式（OR 操作）
 * 实现与文法中的非终结符 OR 相关联的解释操作
 * 包含两个子表达式，当至少一个为 true 时返回 true
 */
class OrExpression implements AbstractExpression {
  private left: AbstractExpression;
  private right: AbstractExpression;

  constructor(left: AbstractExpression, right: AbstractExpression) {
    this.left = left;
    this.right = right;
  }

  /**
   * 解释操作：对左右两个子表达式进行逻辑或操作
   */
  interpret(context: Context): boolean {
    return this.left.interpret(context) || this.right.interpret(context);
  }
}

/**
 * NotExpression 类 - 非终结符表达式（NOT 操作）
 * 实现与文法中的非终结符 NOT 相关联的解释操作
 * 对子表达式取反
 */
class NotExpression implements AbstractExpression {
  private expression: AbstractExpression;

  constructor(expression: AbstractExpression) {
    this.expression = expression;
  }

  /**
   * 解释操作：对子表达式进行逻辑非操作
   */
  interpret(context: Context): boolean {
    return !this.expression.interpret(context);
  }
}

/**
 * 客户端代码 - 构建并解释布尔表达式
 * 示例：解释表达式 "(A AND B) OR (NOT C)"
 * 当 A=true, B=false, C=false 时，结果应为 true
 */
function clientCode(): void {
  // 创建上下文并设置变量值
  const context = new Context();
  context.setVariable('A', true);
  context.setVariable('B', false);
  context.setVariable('C', false);

  // 构建抽象语法树：(A AND B) OR (NOT C)
  // 表达式结构：
  //        OR
  //       /  \\
  //    AND   NOT
  //   /   \\    |
  //  A     B   C
  
  const expression = new OrExpression(
    new AndExpression(
      new TerminalExpression('A'),
      new TerminalExpression('B')
    ),
    new NotExpression(
      new TerminalExpression('C')
    )
  );

  // 解释表达式
  const result = expression.interpret(context);
  console.log(\`表达式 (A AND B) OR (NOT C) 的结果: \${result}\`);
  // 预期输出: true (因为 A=true, B=false, 所以 A AND B = false; C=false, 所以 NOT C = true; false OR true = true)

  // 另一个示例：(A OR B) AND C
  const expression2 = new AndExpression(
    new OrExpression(
      new TerminalExpression('A'),
      new TerminalExpression('B')
    ),
    new TerminalExpression('C')
  );

  const result2 = expression2.interpret(context);
  console.log(\`表达式 (A OR B) AND C 的结果: \${result2}\`);
  // 预期输出: false (因为 A=true, B=false, 所以 A OR B = true; C=false; true AND false = false)
}

// 运行客户端代码
clientCode();

/**
 * 扩展：数学表达式解释器
 * 支持加减乘除运算
 */
interface MathExpression {
  interpret(): number;
}

class NumberExpression implements MathExpression {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  interpret(): number {
    return this.value;
  }
}

class AddExpression implements MathExpression {
  private left: MathExpression;
  private right: MathExpression;

  constructor(left: MathExpression, right: MathExpression) {
    this.left = left;
    this.right = right;
  }

  interpret(): number {
    return this.left.interpret() + this.right.interpret();
  }
}

class SubtractExpression implements MathExpression {
  private left: MathExpression;
  private right: MathExpression;

  constructor(left: MathExpression, right: MathExpression) {
    this.left = left;
    this.right = right;
  }

  interpret(): number {
    return this.left.interpret() - this.right.interpret();
  }
}

class MultiplyExpression implements MathExpression {
  private left: MathExpression;
  private right: MathExpression;

  constructor(left: MathExpression, right: MathExpression) {
    this.left = left;
    this.right = right;
  }

  interpret(): number {
    return this.left.interpret() * this.right.interpret();
  }
}

class DivideExpression implements MathExpression {
  private left: MathExpression;
  private right: MathExpression;

  constructor(left: MathExpression, right: MathExpression) {
    this.left = left;
    this.right = right;
  }

  interpret(): number {
    const divisor = this.right.interpret();
    if (divisor === 0) {
      throw new Error('除数不能为零');
    }
    return this.left.interpret() / divisor;
  }
}

// 数学表达式示例：(10 + 5) * 2 - 3 = 27
const mathExpression = new SubtractExpression(
  new MultiplyExpression(
    new AddExpression(
      new NumberExpression(10),
      new NumberExpression(5)
    ),
    new NumberExpression(2)
  ),
  new NumberExpression(3)
);

console.log(\`数学表达式 (10 + 5) * 2 - 3 的结果: \${mathExpression.interpret()}\`);
// 预期输出: 27`,

    java: `/**
 * 解释器模式 - Java 实现
 * 以布尔表达式解释器为例，支持 AND、OR、NOT 操作
 */

/**
 * Context 类 - 上下文
 * 包含解释器之外的一些全局信息
 * 用于存储变量及其布尔值
 */
class Context {
    private java.util.Map<String, Boolean> variables = new java.util.HashMap<>();

    /**
     * 设置变量的值
     * @param name 变量名
     * @param value 布尔值
     */
    public void setVariable(String name, boolean value) {
        variables.put(name, value);
    }

    /**
     * 查找变量的值
     * @param name 变量名
     * @return 变量的布尔值
     * @throws IllegalArgumentException 如果变量未定义
     */
    public boolean lookup(String name) {
        Boolean value = variables.get(name);
        if (value == null) {
            throw new IllegalArgumentException("变量 '" + name + "' 未定义");
        }
        return value;
    }
}

/**
 * Expression 接口 - 抽象表达式
 * 声明一个抽象的解释操作，所有具体表达式都要实现这个接口
 */
interface Expression {
    boolean interpret(Context context);
}

/**
 * TerminalExpression 类 - 终结符表达式
 * 实现与文法中的终结符相关联的解释操作
 * 在这个例子中，终结符是布尔变量
 */
class TerminalExpression implements Expression {
    private String variable;

    public TerminalExpression(String variable) {
        this.variable = variable;
    }

    /**
     * 解释操作：从上下文中查找变量的值
     */
    @Override
    public boolean interpret(Context context) {
        return context.lookup(variable);
    }

    public String getVariable() {
        return variable;
    }
}

/**
 * AndExpression 类 - 非终结符表达式（AND 操作）
 * 实现与文法中的非终结符 AND 相关联的解释操作
 * 包含两个子表达式，当两者都为 true 时返回 true
 */
class AndExpression implements Expression {
    private Expression left;
    private Expression right;

    public AndExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    /**
     * 解释操作：对左右两个子表达式进行逻辑与操作
     */
    @Override
    public boolean interpret(Context context) {
        return left.interpret(context) && right.interpret(context);
    }
}

/**
 * OrExpression 类 - 非终结符表达式（OR 操作）
 * 实现与文法中的非终结符 OR 相关联的解释操作
 * 包含两个子表达式，当至少一个为 true 时返回 true
 */
class OrExpression implements Expression {
    private Expression left;
    private Expression right;

    public OrExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    /**
     * 解释操作：对左右两个子表达式进行逻辑或操作
     */
    @Override
    public boolean interpret(Context context) {
        return left.interpret(context) || right.interpret(context);
    }
}

/**
 * NotExpression 类 - 非终结符表达式（NOT 操作）
 * 实现与文法中的非终结符 NOT 相关联的解释操作
 * 对子表达式取反
 */
class NotExpression implements Expression {
    private Expression expression;

    public NotExpression(Expression expression) {
        this.expression = expression;
    }

    /**
     * 解释操作：对子表达式进行逻辑非操作
     */
    @Override
    public boolean interpret(Context context) {
        return !expression.interpret(context);
    }
}

/**
 * 客户端类 - 构建并解释布尔表达式
 * 示例：解释表达式 "(A AND B) OR (NOT C)"
 */
public class Client {
    public static void main(String[] args) {
        // 创建上下文并设置变量值
        Context context = new Context();
        context.setVariable("A", true);
        context.setVariable("B", false);
        context.setVariable("C", false);

        // 构建抽象语法树：(A AND B) OR (NOT C)
        // 表达式结构：
        //        OR
        //       /  \\
        //    AND   NOT
        //   /   \\    |
        //  A     B   C
        
        Expression expression = new OrExpression(
            new AndExpression(
                new TerminalExpression("A"),
                new TerminalExpression("B")
            ),
            new NotExpression(
                new TerminalExpression("C")
            )
        );

        // 解释表达式
        boolean result = expression.interpret(context);
        System.out.println("表达式 (A AND B) OR (NOT C) 的结果: " + result);
        // 预期输出: true

        // 另一个示例：(A OR B) AND C
        Expression expression2 = new AndExpression(
            new OrExpression(
                new TerminalExpression("A"),
                new TerminalExpression("B")
            ),
            new TerminalExpression("C")
        );

        boolean result2 = expression2.interpret(context);
        System.out.println("表达式 (A OR B) AND C 的结果: " + result2);
        // 预期输出: false

        // 复杂示例：((A AND B) OR (B AND C)) AND (NOT A)
        Expression complexExpression = new AndExpression(
            new OrExpression(
                new AndExpression(
                    new TerminalExpression("A"),
                    new TerminalExpression("B")
                ),
                new AndExpression(
                    new TerminalExpression("B"),
                    new TerminalExpression("C")
                )
            ),
            new NotExpression(
                new TerminalExpression("A")
            )
        );

        boolean complexResult = complexExpression.interpret(context);
        System.out.println("复杂表达式的结果: " + complexResult);
        // A=true, B=false, C=false
        // (A AND B) = false, (B AND C) = false, false OR false = false
        // NOT A = false
        // false AND false = false
    }
}

/**
 * 扩展：数学表达式解释器
 * 支持加减乘除运算
 */
interface MathExpression {
    double interpret();
}

class NumberExpression implements MathExpression {
    private double value;

    public NumberExpression(double value) {
        this.value = value;
    }

    @Override
    public double interpret() {
        return value;
    }
}

class AddExpression implements MathExpression {
    private MathExpression left;
    private MathExpression right;

    public AddExpression(MathExpression left, MathExpression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public double interpret() {
        return left.interpret() + right.interpret();
    }
}

class SubtractExpression implements MathExpression {
    private MathExpression left;
    private MathExpression right;

    public SubtractExpression(MathExpression left, MathExpression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public double interpret() {
        return left.interpret() - right.interpret();
    }
}

class MultiplyExpression implements MathExpression {
    private MathExpression left;
    private MathExpression right;

    public MultiplyExpression(MathExpression left, MathExpression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public double interpret() {
        return left.interpret() * right.interpret();
    }
}

class DivideExpression implements MathExpression {
    private MathExpression left;
    private MathExpression right;

    public DivideExpression(MathExpression left, MathExpression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public double interpret() {
        double divisor = right.interpret();
        if (divisor == 0) {
            throw new ArithmeticException("除数不能为零");
        }
        return left.interpret() / divisor;
    }
}

// 数学表达式示例类
class MathClient {
    public static void main(String[] args) {
        // 表达式：(10 + 5) * 2 - 3 = 27
        MathExpression expression = new SubtractExpression(
            new MultiplyExpression(
                new AddExpression(
                    new NumberExpression(10),
                    new NumberExpression(5)
                ),
                new NumberExpression(2)
            ),
            new NumberExpression(3)
        );

        double result = expression.interpret();
        System.out.println("数学表达式 (10 + 5) * 2 - 3 的结果: " + result);
        // 预期输出: 27.0
    }
}`,

    go: `package interpreter

import (
	"fmt"
	"errors"
)

/**
 * Context 结构体 - 上下文
 * 包含解释器之外的一些全局信息
 * 用于存储变量及其布尔值
 */
type Context struct {
	variables map[string]bool
}

// NewContext 创建一个新的上下文实例
func NewContext() *Context {
	return &Context{
		variables: make(map[string]bool),
	}
}

// SetVariable 设置变量的值
func (c *Context) SetVariable(name string, value bool) {
	c.variables[name] = value
}

// Lookup 查找变量的值
func (c *Context) Lookup(name string) (bool, error) {
	value, exists := c.variables[name]
	if !exists {
		return false, errors.New(fmt.Sprintf("变量 '%s' 未定义", name))
	}
	return value, nil
}

/**
 * Expression 接口 - 抽象表达式
 * 声明一个抽象的解释操作，所有具体表达式都要实现这个接口
 */
type Expression interface {
	Interpret(context *Context) (bool, error)
}

/**
 * TerminalExpression 结构体 - 终结符表达式
 * 实现与文法中的终结符相关联的解释操作
 * 在这个例子中，终结符是布尔变量
 */
type TerminalExpression struct {
	variable string
}

// NewTerminalExpression 创建一个新的终结符表达式
func NewTerminalExpression(variable string) *TerminalExpression {
	return &TerminalExpression{variable: variable}
}

// Interpret 解释操作：从上下文中查找变量的值
func (t *TerminalExpression) Interpret(context *Context) (bool, error) {
	return context.Lookup(t.variable)
}

// GetVariable 获取变量名
func (t *TerminalExpression) GetVariable() string {
	return t.variable
}

/**
 * AndExpression 结构体 - 非终结符表达式（AND 操作）
 * 实现与文法中的非终结符 AND 相关联的解释操作
 * 包含两个子表达式，当两者都为 true 时返回 true
 */
type AndExpression struct {
	left  Expression
	right Expression
}

// NewAndExpression 创建一个新的 AND 表达式
func NewAndExpression(left, right Expression) *AndExpression {
	return &AndExpression{left: left, right: right}
}

// Interpret 解释操作：对左右两个子表达式进行逻辑与操作
func (a *AndExpression) Interpret(context *Context) (bool, error) {
	leftValue, err := a.left.Interpret(context)
	if err != nil {
		return false, err
	}
	rightValue, err := a.right.Interpret(context)
	if err != nil {
		return false, err
	}
	return leftValue && rightValue, nil
}

/**
 * OrExpression 结构体 - 非终结符表达式（OR 操作）
 * 实现与文法中的非终结符 OR 相关联的解释操作
 * 包含两个子表达式，当至少一个为 true 时返回 true
 */
type OrExpression struct {
	left  Expression
	right Expression
}

// NewOrExpression 创建一个新的 OR 表达式
func NewOrExpression(left, right Expression) *OrExpression {
	return &OrExpression{left: left, right: right}
}

// Interpret 解释操作：对左右两个子表达式进行逻辑或操作
func (o *OrExpression) Interpret(context *Context) (bool, error) {
	leftValue, err := o.left.Interpret(context)
	if err != nil {
		return false, err
	}
	rightValue, err := o.right.Interpret(context)
	if err != nil {
		return false, err
	}
	return leftValue || rightValue, nil
}

/**
 * NotExpression 结构体 - 非终结符表达式（NOT 操作）
 * 实现与文法中的非终结符 NOT 相关联的解释操作
 * 对子表达式取反
 */
type NotExpression struct {
	expression Expression
}

// NewNotExpression 创建一个新的 NOT 表达式
func NewNotExpression(expression Expression) *NotExpression {
	return &NotExpression{expression: expression}
}

// Interpret 解释操作：对子表达式进行逻辑非操作
func (n *NotExpression) Interpret(context *Context) (bool, error) {
	value, err := n.expression.Interpret(context)
	if err != nil {
		return false, err
	}
	return !value, nil
}

/**
 * 客户端代码 - 构建并解释布尔表达式
 * 示例：解释表达式 "(A AND B) OR (NOT C)"
 */
func ClientCode() {
	// 创建上下文并设置变量值
	context := NewContext()
	context.SetVariable("A", true)
	context.SetVariable("B", false)
	context.SetVariable("C", false)

	// 构建抽象语法树：(A AND B) OR (NOT C)
	// 表达式结构：
	//        OR
	//       /  \\
	//    AND   NOT
	//   /   \\    |
	//  A     B   C
	
	expression := NewOrExpression(
		NewAndExpression(
			NewTerminalExpression("A"),
			NewTerminalExpression("B"),
		),
		NewNotExpression(
			NewTerminalExpression("C"),
		),
	)

	// 解释表达式
	result, err := expression.Interpret(context)
	if err != nil {
		fmt.Printf("解释错误: %v\\n", err)
		return
	}
	fmt.Printf("表达式 (A AND B) OR (NOT C) 的结果: %v\\n", result)
	// 预期输出: true

	// 另一个示例：(A OR B) AND C
	expression2 := NewAndExpression(
		NewOrExpression(
			NewTerminalExpression("A"),
			NewTerminalExpression("B"),
		),
		NewTerminalExpression("C"),
	)

	result2, err := expression2.Interpret(context)
	if err != nil {
		fmt.Printf("解释错误: %v\\n", err)
		return
	}
	fmt.Printf("表达式 (A OR B) AND C 的结果: %v\\n", result2)
	// 预期输出: false
}

/**
 * 扩展：数学表达式解释器
 * 支持加减乘除运算
 */
type MathExpression interface {
	Interpret() float64
}

// NumberExpression 数字表达式
type NumberExpression struct {
	value float64
}

// NewNumberExpression 创建一个新的数字表达式
func NewNumberExpression(value float64) *NumberExpression {
	return &NumberExpression{value: value}
}

// Interpret 返回数字值
func (n *NumberExpression) Interpret() float64 {
	return n.value
}

// AddExpression 加法表达式
type AddExpression struct {
	left  MathExpression
	right MathExpression
}

// NewAddExpression 创建一个新的加法表达式
func NewAddExpression(left, right MathExpression) *AddExpression {
	return &AddExpression{left: left, right: right}
}

// Interpret 执行加法操作
func (a *AddExpression) Interpret() float64 {
	return a.left.Interpret() + a.right.Interpret()
}

// SubtractExpression 减法表达式
type SubtractExpression struct {
	left  MathExpression
	right MathExpression
}

// NewSubtractExpression 创建一个新的减法表达式
func NewSubtractExpression(left, right MathExpression) *SubtractExpression {
	return &SubtractExpression{left: left, right: right}
}

// Interpret 执行减法操作
func (s *SubtractExpression) Interpret() float64 {
	return s.left.Interpret() - s.right.Interpret()
}

// MultiplyExpression 乘法表达式
type MultiplyExpression struct {
	left  MathExpression
	right MathExpression
}

// NewMultiplyExpression 创建一个新的乘法表达式
func NewMultiplyExpression(left, right MathExpression) *MultiplyExpression {
	return &MultiplyExpression{left: left, right: right}
}

// Interpret 执行乘法操作
func (m *MultiplyExpression) Interpret() float64 {
	return m.left.Interpret() * m.right.Interpret()
}

// DivideExpression 除法表达式
type DivideExpression struct {
	left  MathExpression
	right MathExpression
}

// NewDivideExpression 创建一个新的除法表达式
func NewDivideExpression(left, right MathExpression) *DivideExpression {
	return &DivideExpression{left: left, right: right}
}

// Interpret 执行除法操作
func (d *DivideExpression) Interpret() float64 {
	divisor := d.right.Interpret()
	if divisor == 0 {
		panic("除数不能为零")
	}
	return d.left.Interpret() / divisor
}

// MathClientCode 数学表达式客户端代码
func MathClientCode() {
	// 表达式：(10 + 5) * 2 - 3 = 27
	expression := NewSubtractExpression(
		NewMultiplyExpression(
			NewAddExpression(
				NewNumberExpression(10),
				NewNumberExpression(5),
			),
			NewNumberExpression(2),
		),
		NewNumberExpression(3),
	)

	result := expression.Interpret()
	fmt.Printf("数学表达式 (10 + 5) * 2 - 3 的结果: %v\\n", result)
	// 预期输出: 27
}

// 主函数示例
func main() {
	fmt.Println("=== 布尔表达式解释器 ===")
	ClientCode()
	
	fmt.Println("\\n=== 数学表达式解释器 ===")
	MathClientCode()
}`,

    python: `"""
解释器模式 - Python 实现
以布尔表达式解释器为例，支持 AND、OR、NOT 操作
"""

from abc import ABC, abstractmethod
from typing import Dict


class Context:
    """
    Context 类 - 上下文
    包含解释器之外的一些全局信息
    用于存储变量及其布尔值
    """
    
    def __init__(self):
        self._variables: Dict[str, bool] = {}
    
    def set_variable(self, name: str, value: bool) -> None:
        """
        设置变量的值
        :param name: 变量名
        :param value: 布尔值
        """
        self._variables[name] = value
    
    def lookup(self, name: str) -> bool:
        """
        查找变量的值
        :param name: 变量名
        :return: 变量的布尔值
        :raises KeyError: 如果变量未定义
        """
        if name not in self._variables:
            raise KeyError(f"变量 '{name}' 未定义")
        return self._variables[name]


class Expression(ABC):
    """
    Expression 抽象基类 - 抽象表达式
    声明一个抽象的解释操作，所有具体表达式都要实现这个接口
    """
    
    @abstractmethod
    def interpret(self, context: Context) -> bool:
        """
        解释操作
        :param context: 上下文对象
        :return: 解释结果的布尔值
        """
        pass


class TerminalExpression(Expression):
    """
    TerminalExpression 类 - 终结符表达式
    实现与文法中的终结符相关联的解释操作
    在这个例子中，终结符是布尔变量
    """
    
    def __init__(self, variable: str):
        self._variable = variable
    
    def interpret(self, context: Context) -> bool:
        """
        解释操作：从上下文中查找变量的值
        """
        return context.lookup(self._variable)
    
    @property
    def variable(self) -> str:
        return self._variable


class AndExpression(Expression):
    """
    AndExpression 类 - 非终结符表达式（AND 操作）
    实现与文法中的非终结符 AND 相关联的解释操作
    包含两个子表达式，当两者都为 true 时返回 true
    """
    
    def __init__(self, left: Expression, right: Expression):
        self._left = left
        self._right = right
    
    def interpret(self, context: Context) -> bool:
        """
        解释操作：对左右两个子表达式进行逻辑与操作
        """
        return self._left.interpret(context) and self._right.interpret(context)


class OrExpression(Expression):
    """
    OrExpression 类 - 非终结符表达式（OR 操作）
    实现与文法中的非终结符 OR 相关联的解释操作
    包含两个子表达式，当至少一个为 true 时返回 true
    """
    
    def __init__(self, left: Expression, right: Expression):
        self._left = left
        self._right = right
    
    def interpret(self, context: Context) -> bool:
        """
        解释操作：对左右两个子表达式进行逻辑或操作
        """
        return self._left.interpret(context) or self._right.interpret(context)


class NotExpression(Expression):
    """
    NotExpression 类 - 非终结符表达式（NOT 操作）
    实现与文法中的非终结符 NOT 相关联的解释操作
    对子表达式取反
    """
    
    def __init__(self, expression: Expression):
        self._expression = expression
    
    def interpret(self, context: Context) -> bool:
        """
        解释操作：对子表达式进行逻辑非操作
        """
        return not self._expression.interpret(context)


def client_code():
    """
    客户端代码 - 构建并解释布尔表达式
    示例：解释表达式 "(A AND B) OR (NOT C)"
    """
    # 创建上下文并设置变量值
    context = Context()
    context.set_variable('A', True)
    context.set_variable('B', False)
    context.set_variable('C', False)
    
    # 构建抽象语法树：(A AND B) OR (NOT C)
    # 表达式结构：
    #        OR
    #       /  \\
    #    AND   NOT
    #   /   \\    |
    #  A     B   C
    
    expression = OrExpression(
        AndExpression(
            TerminalExpression('A'),
            TerminalExpression('B')
        ),
        NotExpression(
            TerminalExpression('C')
        )
    )
    
    # 解释表达式
    result = expression.interpret(context)
    print(f"表达式 (A AND B) OR (NOT C) 的结果: {result}")
    # 预期输出: True
    
    # 另一个示例：(A OR B) AND C
    expression2 = AndExpression(
        OrExpression(
            TerminalExpression('A'),
            TerminalExpression('B')
        ),
        TerminalExpression('C')
    )
    
    result2 = expression2.interpret(context)
    print(f"表达式 (A OR B) AND C 的结果: {result2}")
    # 预期输出: False


if __name__ == "__main__":
    client_code()


"""
扩展：数学表达式解释器
支持加减乘除运算
"""

from abc import ABC, abstractmethod


class MathExpression(ABC):
    """数学表达式抽象基类"""
    
    @abstractmethod
    def interpret(self) -> float:
        pass


class NumberExpression(MathExpression):
    """数字表达式"""
    
    def __init__(self, value: float):
        self._value = value
    
    def interpret(self) -> float:
        return self._value


class AddExpression(MathExpression):
    """加法表达式"""
    
    def __init__(self, left: MathExpression, right: MathExpression):
        self._left = left
        self._right = right
    
    def interpret(self) -> float:
        return self._left.interpret() + self._right.interpret()


class SubtractExpression(MathExpression):
    """减法表达式"""
    
    def __init__(self, left: MathExpression, right: MathExpression):
        self._left = left
        self._right = right
    
    def interpret(self) -> float:
        return self._left.interpret() - self._right.interpret()


class MultiplyExpression(MathExpression):
    """乘法表达式"""
    
    def __init__(self, left: MathExpression, right: MathExpression):
        self._left = left
        self._right = right
    
    def interpret(self) -> float:
        return self._left.interpret() * self._right.interpret()


class DivideExpression(MathExpression):
    """除法表达式"""
    
    def __init__(self, left: MathExpression, right: MathExpression):
        self._left = left
        self._right = right
    
    def interpret(self) -> float:
        divisor = self._right.interpret()
        if divisor == 0:
            raise ValueError("除数不能为零")
        return self._left.interpret() / divisor


def math_client_code():
    """数学表达式客户端代码"""
    # 表达式：(10 + 5) * 2 - 3 = 27
    expression = SubtractExpression(
        MultiplyExpression(
            AddExpression(
                NumberExpression(10),
                NumberExpression(5)
            ),
            NumberExpression(2)
        ),
        NumberExpression(3)
    )
    
    result = expression.interpret()
    print(f"数学表达式 (10 + 5) * 2 - 3 的结果: {result}")
    # 预期输出: 27.0


if __name__ == "__main__":
    print("=== 布尔表达式解释器 ===")
    client_code()
    
    print("\\n=== 数学表达式解释器 ===")
    math_client_code()`,

    cpp: `/**
 * 解释器模式 - C++ 实现
 * 以布尔表达式解释器为例，支持 AND、OR、NOT 操作
 */

#include <iostream>
#include <string>
#include <map>
#include <memory>
#include <stdexcept>

/**
 * Context 类 - 上下文
 * 包含解释器之外的一些全局信息
 * 用于存储变量及其布尔值
 */
class Context {
private:
    std::map<std::string, bool> variables;

public:
    /**
     * 设置变量的值
     * @param name 变量名
     * @param value 布尔值
     */
    void setVariable(const std::string& name, bool value) {
        variables[name] = value;
    }

    /**
     * 查找变量的值
     * @param name 变量名
     * @return 变量的布尔值
     * @throws std::runtime_error 如果变量未定义
     */
    bool lookup(const std::string& name) const {
        auto it = variables.find(name);
        if (it == variables.end()) {
            throw std::runtime_error("变量 '" + name + "' 未定义");
        }
        return it->second;
    }
};

/**
 * Expression 抽象类 - 抽象表达式
 * 声明一个抽象的解释操作，所有具体表达式都要实现这个接口
 */
class Expression {
public:
    virtual ~Expression() = default;
    
    /**
     * 解释操作
     * @param context 上下文对象
     * @return 解释结果的布尔值
     */
    virtual bool interpret(const Context& context) const = 0;
};

/**
 * TerminalExpression 类 - 终结符表达式
 * 实现与文法中的终结符相关联的解释操作
 * 在这个例子中，终结符是布尔变量
 */
class TerminalExpression : public Expression {
private:
    std::string variable;

public:
    explicit TerminalExpression(const std::string& var) : variable(var) {}

    /**
     * 解释操作：从上下文中查找变量的值
     */
    bool interpret(const Context& context) const override {
        return context.lookup(variable);
    }

    std::string getVariable() const {
        return variable;
    }
};

/**
 * AndExpression 类 - 非终结符表达式（AND 操作）
 * 实现与文法中的非终结符 AND 相关联的解释操作
 * 包含两个子表达式，当两者都为 true 时返回 true
 */
class AndExpression : public Expression {
private:
    std::shared_ptr<Expression> left;
    std::shared_ptr<Expression> right;

public:
    AndExpression(std::shared_ptr<Expression> l, std::shared_ptr<Expression> r)
        : left(l), right(r) {}

    /**
     * 解释操作：对左右两个子表达式进行逻辑与操作
     */
    bool interpret(const Context& context) const override {
        return left->interpret(context) && right->interpret(context);
    }
};

/**
 * OrExpression 类 - 非终结符表达式（OR 操作）
 * 实现与文法中的非终结符 OR 相关联的解释操作
 * 包含两个子表达式，当至少一个为 true 时返回 true
 */
class OrExpression : public Expression {
private:
    std::shared_ptr<Expression> left;
    std::shared_ptr<Expression> right;

public:
    OrExpression(std::shared_ptr<Expression> l, std::shared_ptr<Expression> r)
        : left(l), right(r) {}

    /**
     * 解释操作：对左右两个子表达式进行逻辑或操作
     */
    bool interpret(const Context& context) const override {
        return left->interpret(context) || right->interpret(context);
    }
};

/**
 * NotExpression 类 - 非终结符表达式（NOT 操作）
 * 实现与文法中的非终结符 NOT 相关联的解释操作
 * 对子表达式取反
 */
class NotExpression : public Expression {
private:
    std::shared_ptr<Expression> expression;

public:
    explicit NotExpression(std::shared_ptr<Expression> expr)
        : expression(expr) {}

    /**
     * 解释操作：对子表达式进行逻辑非操作
     */
    bool interpret(const Context& context) const override {
        return !expression->interpret(context);
    }
};

/**
 * 客户端代码 - 构建并解释布尔表达式
 * 示例：解释表达式 "(A AND B) OR (NOT C)"
 */
void clientCode() {
    // 创建上下文并设置变量值
    Context context;
    context.setVariable("A", true);
    context.setVariable("B", false);
    context.setVariable("C", false);

    // 构建抽象语法树：(A AND B) OR (NOT C)
    // 表达式结构：
    //        OR
    //       /  \\
    //    AND   NOT
    //   /   \\    |
    //  A     B   C
    
    auto expression = std::make_shared<OrExpression>(
        std::make_shared<AndExpression>(
            std::make_shared<TerminalExpression>("A"),
            std::make_shared<TerminalExpression>("B")
        ),
        std::make_shared<NotExpression>(
            std::make_shared<TerminalExpression>("C")
        )
    );

    // 解释表达式
    bool result = expression->interpret(context);
    std::cout << "表达式 (A AND B) OR (NOT C) 的结果: " 
              << (result ? "true" : "false") << std::endl;
    // 预期输出: true

    // 另一个示例：(A OR B) AND C
    auto expression2 = std::make_shared<AndExpression>(
        std::make_shared<OrExpression>(
            std::make_shared<TerminalExpression>("A"),
            std::make_shared<TerminalExpression>("B")
        ),
        std::make_shared<TerminalExpression>("C")
    );

    bool result2 = expression2->interpret(context);
    std::cout << "表达式 (A OR B) AND C 的结果: " 
              << (result2 ? "true" : "false") << std::endl;
    // 预期输出: false
}

/**
 * 扩展：数学表达式解释器
 * 支持加减乘除运算
 */
class MathExpression {
public:
    virtual ~MathExpression() = default;
    virtual double interpret() const = 0;
};

class NumberExpression : public MathExpression {
private:
    double value;

public:
    explicit NumberExpression(double val) : value(val) {}

    double interpret() const override {
        return value;
    }
};

class AddExpression : public MathExpression {
private:
    std::shared_ptr<MathExpression> left;
    std::shared_ptr<MathExpression> right;

public:
    AddExpression(std::shared_ptr<MathExpression> l, 
                  std::shared_ptr<MathExpression> r)
        : left(l), right(r) {}

    double interpret() const override {
        return left->interpret() + right->interpret();
    }
};

class SubtractExpression : public MathExpression {
private:
    std::shared_ptr<MathExpression> left;
    std::shared_ptr<MathExpression> right;

public:
    SubtractExpression(std::shared_ptr<MathExpression> l, 
                       std::shared_ptr<MathExpression> r)
        : left(l), right(r) {}

    double interpret() const override {
        return left->interpret() - right->interpret();
    }
};

class MultiplyExpression : public MathExpression {
private:
    std::shared_ptr<MathExpression> left;
    std::shared_ptr<MathExpression> right;

public:
    MultiplyExpression(std::shared_ptr<MathExpression> l, 
                       std::shared_ptr<MathExpression> r)
        : left(l), right(r) {}

    double interpret() const override {
        return left->interpret() * right->interpret();
    }
};

class DivideExpression : public MathExpression {
private:
    std::shared_ptr<MathExpression> left;
    std::shared_ptr<MathExpression> right;

public:
    DivideExpression(std::shared_ptr<MathExpression> l, 
                     std::shared_ptr<MathExpression> r)
        : left(l), right(r) {}

    double interpret() const override {
        double divisor = right->interpret();
        if (divisor == 0) {
            throw std::runtime_error("除数不能为零");
        }
        return left->interpret() / divisor;
    }
};

void mathClientCode() {
    // 表达式：(10 + 5) * 2 - 3 = 27
    auto expression = std::make_shared<SubtractExpression>(
        std::make_shared<MultiplyExpression>(
            std::make_shared<AddExpression>(
                std::make_shared<NumberExpression>(10),
                std::make_shared<NumberExpression>(5)
            ),
            std::make_shared<NumberExpression>(2)
        ),
        std::make_shared<NumberExpression>(3)
    );

    double result = expression->interpret();
    std::cout << "数学表达式 (10 + 5) * 2 - 3 的结果: " << result << std::endl;
    // 预期输出: 27
}

int main() {
    std::cout << "=== 布尔表达式解释器 ===" << std::endl;
    clientCode();
    
    std::cout << "\\n=== 数学表达式解释器 ===" << std::endl;
    mathClientCode();
    
    return 0;
}`,
  },
  realWorldExamples: [
    {
      title: '正则表达式引擎',
      description: '正则表达式引擎使用解释器模式来解析和执行正则表达式模式。每个正则表达式元素（字符、字符类、量词等）都被表示为一个表达式对象。',
      source: 'Pattern Matching',
      codeSnippet: `Pattern pattern = Pattern.compile("a+b*c");
Matcher matcher = pattern.matcher("aaabbbc");
boolean matches = matcher.matches();`,
    },
    {
      title: 'SQL 解析器',
      description: '数据库查询解析器使用解释器模式将 SQL 语句解析为抽象语法树，然后执行查询操作。',
      source: 'Database Systems',
      codeSnippet: `SELECT * FROM users WHERE age > 18 AND status = 'active'`,
    },
    {
      title: '配置文件解析器',
      description: '许多应用程序使用解释器模式来解析配置文件（如 JSON、YAML、XML），将配置文本转换为内存中的数据结构。',
      source: 'Configuration Management',
      codeSnippet: `{
  "server": {
    "host": "localhost",
    "port": 8080
  }
}`,
    },
  ],
  relatedPatterns: ['composite', 'flyweight', 'visitor', 'iterator'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '解释器模式主要用于解决什么问题？',
      options: [
        '提高代码执行效率',
        '为特定语言创建解释器，定义文法表示并解释句子',
        '减少内存使用量',
        '简化数据库操作',
      ],
      correctAnswer: 1,
      explanation: '解释器模式的主要目的是为特定领域语言创建解释器，定义该语言的文法表示，并解释语言中的句子。',
    },
    {
      id: 'q2',
      type: 'boolean',
      question: '解释器模式适合处理复杂的编程语言文法',
      options: ['正确', '错误'],
      correctAnswer: 1,
      explanation: '错误。解释器模式对于复杂文法难以维护，类层次结构会变得庞大。复杂语言通常使用专业的解析器生成器工具（如 Yacc、ANTLR）来处理。',
    },
    {
      id: 'q3',
      type: 'single',
      question: '在解释器模式中，终结符表达式（TerminalExpression）的主要作用是？',
      options: [
        '组合多个表达式',
        '实现与文法中的终结符相关联的解释操作',
        '管理上下文信息',
        '构建抽象语法树',
      ],
      correctAnswer: 1,
      explanation: '终结符表达式实现与文法中的终结符相关联的解释操作。终结符是文法中不能再分解的基本元素。',
    },
  ],
};
