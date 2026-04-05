import type { DesignPattern } from '@/types/pattern';

export const iteratorPattern: DesignPattern = {
  id: 'iterator',
  name: '迭代器模式',
  nameEn: 'Iterator Pattern',
  category: 'behavioral',
  difficulty: 'easy',
  frequency: 'high',
  intent: '提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。',
  description: '迭代器模式是一种行为设计模式，让你能在不暴露集合底层表现形式（列表、栈和树等）的情况下遍历集合中所有的元素。',
  applicability: ['当集合背后有复杂的数据结构，希望对客户端隐藏时', '当需要减少程序中重复的遍历代码时', '当希望代码能够遍历不同的甚至是无法预知的数据结构时'],
  pros: ['单一职责原则：将遍历算法从集合类中分离出来', '开闭原则：可以实现新类型的集合和迭代器而不影响现有代码', '可以并行遍历同一集合，因为每个迭代器对象都包含其自身的遍历状态'],
  cons: ['对于某些特殊集合，使用迭代器可能比直接遍历效率低'],
  analogy: { title: '现实世界中的迭代器', description: '迭代器就像是导游', scenarios: [{ id: 'guide', title: '博物馆导游', description: '导游（迭代器）带领游客（客户端）参观博物馆（集合），游客不需要知道博物馆的内部布局。', icon: 'Map' }] },
  structure: {
    classDiagram: `
      class Iterator {
        <<interface>>
        +hasNext(): boolean
        +next(): T
      }
      class Aggregate {
        <<interface>>
        +createIterator(): Iterator
      }
      class ConcreteIterator {
        -collection: T[]
        -position: int
        +hasNext(): boolean
        +next(): T
      }
      class ConcreteAggregate {
        -items: T[]
        +createIterator(): Iterator
        +addItem(item: T): void
      }
      Iterator <|.. ConcreteIterator
      Aggregate <|.. ConcreteAggregate
      ConcreteIterator --> ConcreteAggregate: traverses
      ConcreteAggregate ..> ConcreteIterator: creates
    `,
    mermaidDiagram: `
classDiagram
  class Iterator {
    <<interface>>
    +hasNext() boolean
    +next() T
  }
  
  class Aggregate {
    <<interface>>
    +createIterator() Iterator
  }
  
  class ConcreteIterator {
    -collection: T[]
    -position: int
    +ConcreteIterator(collection)
    +hasNext() boolean
    +next() T
  }
  
  class ConcreteAggregate {
    -items: T[]
    +createIterator() Iterator
    +addItem(item: T)
    +getCount() int
    +getItem(index: int) T
  }
  
  class Client {
    +main()
  }
  
  Iterator <|.. ConcreteIterator
  Aggregate <|.. ConcreteAggregate
  ConcreteIterator --> ConcreteAggregate : traverses
  ConcreteAggregate ..> ConcreteIterator : creates
  Client ..> Iterator : uses
  Client ..> Aggregate : uses
  
  style Iterator fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style Aggregate fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style ConcreteIterator fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style ConcreteAggregate fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: 'Iterator 迭代器接口',
        description: '定义访问和遍历元素的接口，包含 hasNext() 和 next() 方法',
        duration: 2000,
        elements: [
          { id: 'iterator', type: 'interface', name: 'Iterator', x: 200, y: 150, methods: ['+hasNext(): boolean', '+next(): T'] },
        ],
      },
      {
        id: 'step2',
        title: 'Aggregate 聚合接口',
        description: '定义创建迭代器对象的接口，返回一个 Iterator 对象',
        duration: 2000,
        elements: [
          { id: 'iterator', type: 'interface', name: 'Iterator', x: 200, y: 150, methods: ['+hasNext(): boolean', '+next(): T'] },
          { id: 'aggregate', type: 'interface', name: 'Aggregate', x: 500, y: 150, methods: ['+createIterator(): Iterator'] },
        ],
      },
      {
        id: 'step3',
        title: 'ConcreteIterator 具体迭代器',
        description: '实现 Iterator 接口，维护遍历位置，跟踪当前遍历位置',
        duration: 2500,
        elements: [
          { id: 'iterator', type: 'interface', name: 'Iterator', x: 200, y: 150, methods: ['+hasNext(): boolean', '+next(): T'] },
          { id: 'aggregate', type: 'interface', name: 'Aggregate', x: 500, y: 150, methods: ['+createIterator(): Iterator'] },
          { id: 'concreteIterator', type: 'class', name: 'ConcreteIterator', x: 200, y: 350, properties: ['-collection: T[]', '-position: int'], methods: ['+hasNext(): boolean', '+next(): T'] },
        ],
        connections: [
          { from: 'concreteIterator', to: 'iterator', type: 'implementation' },
        ],
      },
      {
        id: 'step4',
        title: 'ConcreteAggregate 具体聚合',
        description: '实现 Aggregate 接口，返回 ConcreteIterator 的实例',
        duration: 2500,
        elements: [
          { id: 'iterator', type: 'interface', name: 'Iterator', x: 200, y: 150, methods: ['+hasNext(): boolean', '+next(): T'] },
          { id: 'aggregate', type: 'interface', name: 'Aggregate', x: 500, y: 150, methods: ['+createIterator(): Iterator'] },
          { id: 'concreteIterator', type: 'class', name: 'ConcreteIterator', x: 200, y: 350, properties: ['-collection: T[]', '-position: int'], methods: ['+hasNext(): boolean', '+next(): T'] },
          { id: 'concreteAggregate', type: 'class', name: 'ConcreteAggregate', x: 500, y: 350, properties: ['-items: T[]'], methods: ['+createIterator(): Iterator', '+addItem(item: T)'] },
        ],
        connections: [
          { from: 'concreteIterator', to: 'iterator', type: 'implementation' },
          { from: 'concreteAggregate', to: 'aggregate', type: 'implementation' },
          { from: 'concreteAggregate', to: 'concreteIterator', type: 'dependency', label: 'creates' },
          { from: 'concreteIterator', to: 'concreteAggregate', type: 'association', label: 'traverses' },
        ],
      },
      {
        id: 'step5',
        title: 'Client 客户端',
        description: '客户端通过 Iterator 和 Aggregate 接口与具体类交互',
        duration: 3000,
        elements: [
          { id: 'iterator', type: 'interface', name: 'Iterator', x: 200, y: 150, methods: ['+hasNext(): boolean', '+next(): T'] },
          { id: 'aggregate', type: 'interface', name: 'Aggregate', x: 500, y: 150, methods: ['+createIterator(): Iterator'] },
          { id: 'concreteIterator', type: 'class', name: 'ConcreteIterator', x: 200, y: 350, properties: ['-collection: T[]', '-position: int'], methods: ['+hasNext(): boolean', '+next(): T'] },
          { id: 'concreteAggregate', type: 'class', name: 'ConcreteAggregate', x: 500, y: 350, properties: ['-items: T[]'], methods: ['+createIterator(): Iterator', '+addItem(item: T)'] },
          { id: 'client', type: 'class', name: 'Client', x: 800, y: 250, methods: ['+main()'] },
        ],
        connections: [
          { from: 'concreteIterator', to: 'iterator', type: 'implementation' },
          { from: 'concreteAggregate', to: 'aggregate', type: 'implementation' },
          { from: 'concreteAggregate', to: 'concreteIterator', type: 'dependency', label: 'creates' },
          { from: 'concreteIterator', to: 'concreteAggregate', type: 'association', label: 'traverses' },
          { from: 'client', to: 'iterator', type: 'dependency', label: 'uses' },
          { from: 'client', to: 'aggregate', type: 'dependency', label: 'uses' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * 迭代器模式 - TypeScript 实现
 * 
 * 场景：实现一个书籍集合，可以通过迭代器遍历书籍
 */

/**
 * Iterator 迭代器接口
 * 定义访问和遍历元素的接口
 */
interface Iterator<T> {
  /**
   * 检查是否还有下一个元素
   * @returns 如果还有元素返回 true，否则返回 false
   */
  hasNext(): boolean;

  /**
   * 获取下一个元素
   * @returns 集合中的下一个元素
   */
  next(): T;

  /**
   * 获取当前位置（可选方法，用于更复杂的遍历场景）
   * @returns 当前遍历位置
   */
  currentIndex(): number;
}

/**
 * Aggregate 聚合接口（Iterable）
 * 定义创建迭代器对象的接口
 */
interface IterableCollection<T> {
  /**
   * 创建并返回一个迭代器对象
   * @returns Iterator 迭代器实例
   */
  createIterator(): Iterator<T>;

  /**
   * 创建并返回一个反向迭代器（扩展功能）
   * @returns Iterator 反向迭代器实例
   */
  createReverseIterator(): Iterator<T>;
}

/**
 * Book 书籍类
 * 集合中存储的元素类型
 */
class Book {
  constructor(
    private title: string,
    private author: string,
    private isbn: string
  ) {}

  getTitle(): string {
    return this.title;
  }

  getAuthor(): string {
    return this.author;
  }

  getIsbn(): string {
    return this.isbn;
  }

  toString(): string {
    return \`\${this.title} by \${this.author} (ISBN: \${this.isbn})\`;
  }
}

/**
 * BookIterator 具体迭代器
 * 实现 Iterator 接口，负责遍历书籍集合
 */
class BookIterator implements Iterator<Book> {
  private position: number = 0;

  constructor(private collection: Book[]) {}

  hasNext(): boolean {
    return this.position < this.collection.length;
  }

  next(): Book {
    if (!this.hasNext()) {
      throw new Error('No more elements in the collection');
    }
    return this.collection[this.position++];
  }

  currentIndex(): number {
    return this.position;
  }
}

/**
 * ReverseBookIterator 反向迭代器
 * 实现从后向前遍历集合
 */
class ReverseBookIterator implements Iterator<Book> {
  private position: number;

  constructor(private collection: Book[]) {
    this.position = collection.length - 1;
  }

  hasNext(): boolean {
    return this.position >= 0;
  }

  next(): Book {
    if (!this.hasNext()) {
      throw new Error('No more elements in the collection');
    }
    return this.collection[this.position--];
  }

  currentIndex(): number {
    return this.position;
  }
}

/**
 * BookCollection 具体聚合类
 * 实现 IterableCollection 接口，管理书籍集合
 */
class BookCollection implements IterableCollection<Book> {
  private books: Book[] = [];

  /**
   * 添加书籍到集合
   */
  addBook(book: Book): void {
    this.books.push(book);
  }

  /**
   * 从集合中移除书籍
   */
  removeBook(book: Book): void {
    const index = this.books.indexOf(book);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  /**
   * 获取集合中的书籍数量
   */
  getCount(): number {
    return this.books.length;
  }

  /**
   * 通过索引获取书籍
   */
  getBook(index: number): Book {
    if (index < 0 || index >= this.books.length) {
      throw new Error('Index out of bounds');
    }
    return this.books[index];
  }

  /**
   * 创建正向迭代器
   */
  createIterator(): Iterator<Book> {
    return new BookIterator(this.books);
  }

  /**
   * 创建反向迭代器
   */
  createReverseIterator(): Iterator<Book> {
    return new ReverseBookIterator(this.books);
  }
}

/**
 * 客户端代码
 * 演示如何使用迭代器模式遍历集合
 */
function clientCode(): void {
  // 创建书籍集合
  const library = new BookCollection();

  // 添加书籍
  library.addBook(new Book('设计模式', 'GoF', '978-7-111-1'));
  library.addBook(new Book('重构', 'Martin Fowler', '978-7-111-2'));
  library.addBook(new Book('Clean Code', 'Robert C. Martin', '978-7-111-3'));
  library.addBook(new Book('人月神话', 'Frederick Brooks', '978-7-111-4'));

  console.log('=== 正向遍历图书馆藏书 ===');
  const iterator = library.createIterator();
  while (iterator.hasNext()) {
    const book = iterator.next();
    console.log(\`[\${iterator.currentIndex()}] \${book.toString()}\`);
  }

  console.log('\\n=== 反向遍历图书馆藏书 ===');
  const reverseIterator = library.createReverseIterator();
  while (reverseIterator.hasNext()) {
    const book = reverseIterator.next();
    console.log(\`[\${reverseIterator.currentIndex()}] \${book.toString()}\`);
  }

  console.log('\\n=== 使用 for...of 遍历（ES6 迭代器协议） ===');
  // TypeScript/JavaScript 内置的迭代器协议
  for (const book of library['books']) {
    console.log(book.toString());
  }
}

// 运行客户端代码
clientCode();`,

    java: `/**
 * 迭代器模式 - Java 实现
 * 
 * 场景：实现一个书籍集合，可以通过迭代器遍历书籍
 * Java 提供了标准的 Iterator 和 Iterable 接口
 */

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;

/**
 * Book 书籍类
 * 集合中存储的元素类型
 */
class Book {
    private final String title;
    private final String author;
    private final String isbn;

    public Book(String title, String author, String isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getIsbn() {
        return isbn;
    }

    @Override
    public String toString() {
        return String.format("%s by %s (ISBN: %s)", title, author, isbn);
    }
}

/**
 * BookIterator 具体迭代器
 * 实现 Java 标准 Iterator 接口
 */
class BookIterator implements Iterator<Book> {
    private final List<Book> books;
    private int position = 0;

    public BookIterator(List<Book> books) {
        this.books = books;
    }

    @Override
    public boolean hasNext() {
        return position < books.size();
    }

    @Override
    public Book next() {
        if (!hasNext()) {
            throw new NoSuchElementException("No more books in the collection");
        }
        return books.get(position++);
    }

    /**
     * 获取当前索引位置
     */
    public int currentIndex() {
        return position;
    }
}

/**
 * ReverseBookIterator 反向迭代器
 * 实现从后向前遍历
 */
class ReverseBookIterator implements Iterator<Book> {
    private final List<Book> books;
    private int position;

    public ReverseBookIterator(List<Book> books) {
        this.books = books;
        this.position = books.size() - 1;
    }

    @Override
    public boolean hasNext() {
        return position >= 0;
    }

    @Override
    public Book next() {
        if (!hasNext()) {
            throw new NoSuchElementException("No more books in the collection");
        }
        return books.get(position--);
    }

    public int currentIndex() {
        return position;
    }
}

/**
 * BookCollection 具体聚合类
 * 实现 Iterable 接口，使集合可以被 for-each 循环遍历
 */
class BookCollection implements Iterable<Book> {
    private final List<Book> books = new ArrayList<>();

    /**
     * 添加书籍到集合
     */
    public void addBook(Book book) {
        books.add(book);
    }

    /**
     * 从集合中移除书籍
     */
    public void removeBook(Book book) {
        books.remove(book);
    }

    /**
     * 获取集合中的书籍数量
     */
    public int getCount() {
        return books.size();
    }

    /**
     * 通过索引获取书籍
     */
    public Book getBook(int index) {
        if (index < 0 || index >= books.size()) {
            throw new IndexOutOfBoundsException("Index: " + index);
        }
        return books.get(index);
    }

    /**
     * 创建正向迭代器（实现 Iterable 接口）
     */
    @Override
    public Iterator<Book> iterator() {
        return new BookIterator(books);
    }

    /**
     * 创建反向迭代器
     */
    public Iterator<Book> reverseIterator() {
        return new ReverseBookIterator(books);
    }
}

/**
 * 客户端代码
 */
class Client {
    public static void main(String[] args) {
        // 创建书籍集合
        BookCollection library = new BookCollection();

        // 添加书籍
        library.addBook(new Book("设计模式", "GoF", "978-7-111-1"));
        library.addBook(new Book("重构", "Martin Fowler", "978-7-111-2"));
        library.addBook(new Book("Clean Code", "Robert C. Martin", "978-7-111-3"));
        library.addBook(new Book("人月神话", "Frederick Brooks", "978-7-111-4"));

        System.out.println("=== 正向遍历图书馆藏书 ===");
        Iterator<Book> iterator = library.iterator();
        while (iterator.hasNext()) {
            Book book = iterator.next();
            System.out.println(book);
        }

        System.out.println("\\n=== 反向遍历图书馆藏书 ===");
        Iterator<Book> reverseIterator = library.reverseIterator();
        while (reverseIterator.hasNext()) {
            Book book = reverseIterator.next();
            System.out.println(book);
        }

        System.out.println("\\n=== 使用 for-each 循环遍历 ===");
        // 由于 BookCollection 实现了 Iterable 接口，可以使用 for-each
        for (Book book : library) {
            System.out.println(book);
        }

        System.out.println("\\n=== 使用 Java 8 Stream API ===");
        // 现代 Java 推荐使用 Stream API
        library.forEach(System.out::println);
    }
}`,

    go: `/**
 * 迭代器模式 - Go 实现
 * 
 * 场景：实现一个书籍集合，可以通过迭代器遍历书籍
 * Go 语言没有传统的类和继承，使用接口和结构体实现
 * 同时展示使用 channel 实现迭代器的 Go 风格方式
 */

package main

import (
	"fmt"
)

/**
 * Book 书籍结构体
 */
type Book struct {
	Title  string
	Author string
	ISBN   string
}

/**
 * String 实现 Stringer 接口
 */
func (b Book) String() string {
	return fmt.Sprintf("%s by %s (ISBN: %s)", b.Title, b.Author, b.ISBN)
}

/**
 * Iterator 迭代器接口
 */
type Iterator interface {
	HasNext() bool
	Next() Book
	CurrentIndex() int
}

/**
 * Iterable 可迭代接口
 */
type Iterable interface {
	CreateIterator() Iterator
	CreateReverseIterator() Iterator
}

/**
 * BookIterator 具体迭代器结构体
 */
type BookIterator struct {
	collection []Book
	position   int
}

/**
 * NewBookIterator 创建新的书籍迭代器
 */
func NewBookIterator(collection []Book) *BookIterator {
	return &BookIterator{
		collection: collection,
		position:   0,
	}
}

/**
 * HasNext 检查是否还有下一个元素
 */
func (b *BookIterator) HasNext() bool {
	return b.position < len(b.collection)
}

/**
 * Next 获取下一个元素
 */
func (b *BookIterator) Next() Book {
	if !b.HasNext() {
		panic("No more elements in the collection")
	}
	book := b.collection[b.position]
	b.position++
	return book
}

/**
 * CurrentIndex 获取当前索引
 */
func (b *BookIterator) CurrentIndex() int {
	return b.position
}

/**
 * ReverseBookIterator 反向迭代器
 */
type ReverseBookIterator struct {
	collection []Book
	position   int
}

/**
 * NewReverseBookIterator 创建新的反向迭代器
 */
func NewReverseBookIterator(collection []Book) *ReverseBookIterator {
	return &ReverseBookIterator{
		collection: collection,
		position:   len(collection) - 1,
	}
}

/**
 * HasNext 检查是否还有下一个元素（向前遍历）
 */
func (r *ReverseBookIterator) HasNext() bool {
	return r.position >= 0
}

/**
 * Next 获取下一个元素
 */
func (r *ReverseBookIterator) Next() Book {
	if !r.HasNext() {
		panic("No more elements in the collection")
	}
	book := r.collection[r.position]
	r.position--
	return book
}

/**
 * CurrentIndex 获取当前索引
 */
func (r *ReverseBookIterator) CurrentIndex() int {
	return r.position
}

/**
 * BookCollection 书籍集合结构体
 */
type BookCollection struct {
	books []Book
}

/**
 * NewBookCollection 创建新的书籍集合
 */
func NewBookCollection() *BookCollection {
	return &BookCollection{
		books: make([]Book, 0),
	}
}

/**
 * AddBook 添加书籍
 */
func (b *BookCollection) AddBook(book Book) {
	b.books = append(b.books, book)
}

/**
 * RemoveBook 移除书籍（通过索引）
 */
func (b *BookCollection) RemoveBook(index int) {
	if index < 0 || index >= len(b.books) {
		return
	}
	b.books = append(b.books[:index], b.books[index+1:]...)
}

/**
 * GetCount 获取书籍数量
 */
func (b *BookCollection) GetCount() int {
	return len(b.books)
}

/**
 * GetBook 获取指定索引的书籍
 */
func (b *BookCollection) GetBook(index int) Book {
	if index < 0 || index >= len(b.books) {
		panic("Index out of bounds")
	}
	return b.books[index]
}

/**
 * CreateIterator 创建正向迭代器
 */
func (b *BookCollection) CreateIterator() Iterator {
	return NewBookIterator(b.books)
}

/**
 * CreateReverseIterator 创建反向迭代器
 */
func (b *BookCollection) CreateReverseIterator() Iterator {
	return NewReverseBookIterator(b.books)
}

/**
 * IterateChannel 使用 channel 实现迭代（Go 风格）
 * 这是 Go 语言特有的迭代方式，配合 range 使用
 */
func (b *BookCollection) IterateChannel() <-chan Book {
	ch := make(chan Book)
	go func() {
		defer close(ch)
		for _, book := range b.books {
			ch <- book
		}
	}()
	return ch
}

/**
 * 客户端代码
 */
func main() {
	// 创建书籍集合
	library := NewBookCollection()

	// 添加书籍
	library.AddBook(Book{"设计模式", "GoF", "978-7-111-1"})
	library.AddBook(Book{"重构", "Martin Fowler", "978-7-111-2"})
	library.AddBook(Book{"Clean Code", "Robert C. Martin", "978-7-111-3"})
	library.AddBook(Book{"人月神话", "Frederick Brooks", "978-7-111-4"})

	fmt.Println("=== 正向遍历图书馆藏书 ===")
	iterator := library.CreateIterator()
	for iterator.HasNext() {
		book := iterator.Next()
		fmt.Printf("[%d] %s\\n", iterator.CurrentIndex(), book)
	}

	fmt.Println("\\n=== 反向遍历图书馆藏书 ===")
	reverseIterator := library.CreateReverseIterator()
	for reverseIterator.HasNext() {
		book := reverseIterator.Next()
		fmt.Printf("[%d] %s\\n", reverseIterator.CurrentIndex(), book)
	}

	fmt.Println("\\n=== 使用 Channel 和 Range 遍历（Go 风格） ===")
	for book := range library.IterateChannel() {
		fmt.Println(book)
	}

	fmt.Println("\\n=== 使用传统 for range 遍历 ===")
	for i, book := range library.books {
		fmt.Printf("[%d] %s\\n", i, book)
	}
}`,

    python: `/**
 * 迭代器模式 - Python 实现
 * 
 * 场景：实现一个书籍集合，可以通过迭代器遍历书籍
 * Python 使用 __iter__ 和 __next__ 魔术方法实现迭代器协议
 */

from abc import ABC, abstractmethod
from typing import List, Iterator as TypingIterator


class Book:
    """书籍类"""
    
    def __init__(self, title: str, author: str, isbn: str):
        self._title = title
        self._author = author
        self._isbn = isbn
    
    @property
    def title(self) -> str:
        return self._title
    
    @property
    def author(self) -> str:
        return self._author
    
    @property
    def isbn(self) -> str:
        return self._isbn
    
    def __str__(self) -> str:
        return f"{self._title} by {self._author} (ISBN: {self._isbn})"
    
    def __repr__(self) -> str:
        return self.__str__()


class Iterator(ABC):
    """迭代器抽象基类"""
    
    @abstractmethod
    def has_next(self) -> bool:
        """检查是否还有下一个元素"""
        pass
    
    @abstractmethod
    def next(self) -> Book:
        """获取下一个元素"""
        pass
    
    @abstractmethod
    def current_index(self) -> int:
        """获取当前索引"""
        pass


class BookIterator(Iterator):
    """具体迭代器 - 正向遍历"""
    
    def __init__(self, collection: List[Book]):
        self._collection = collection
        self._position = 0
    
    def has_next(self) -> bool:
        return self._position < len(self._collection)
    
    def next(self) -> Book:
        if not self.has_next():
            raise StopIteration("No more books in the collection")
        book = self._collection[self._position]
        self._position += 1
        return book
    
    def current_index(self) -> int:
        return self._position
    
    # Python 迭代器协议支持
    def __iter__(self):
        return self
    
    def __next__(self):
        if not self.has_next():
            raise StopIteration
        return self.next()


class ReverseBookIterator(Iterator):
    """具体迭代器 - 反向遍历"""
    
    def __init__(self, collection: List[Book]):
        self._collection = collection
        self._position = len(collection) - 1
    
    def has_next(self) -> bool:
        return self._position >= 0
    
    def next(self) -> Book:
        if not self.has_next():
            raise StopIteration("No more books in the collection")
        book = self._collection[self._position]
        self._position -= 1
        return book
    
    def current_index(self) -> int:
        return self._position
    
    # Python 迭代器协议支持
    def __iter__(self):
        return self
    
    def __next__(self):
        if not self.has_next():
            raise StopIteration
        return self.next()


class IterableCollection(ABC):
    """可迭代集合抽象基类"""
    
    @abstractmethod
    def create_iterator(self) -> Iterator:
        """创建正向迭代器"""
        pass
    
    @abstractmethod
    def create_reverse_iterator(self) -> Iterator:
        """创建反向迭代器"""
        pass


class BookCollection(IterableCollection):
    """具体聚合类 - 书籍集合"""
    
    def __init__(self):
        self._books: List[Book] = []
    
    def add_book(self, book: Book) -> None:
        """添加书籍"""
        self._books.append(book)
    
    def remove_book(self, book: Book) -> None:
        """移除书籍"""
        if book in self._books:
            self._books.remove(book)
    
    def get_count(self) -> int:
        """获取书籍数量"""
        return len(self._books)
    
    def get_book(self, index: int) -> Book:
        """通过索引获取书籍"""
        if index < 0 or index >= len(self._books):
            raise IndexError("Index out of bounds")
        return self._books[index]
    
    def create_iterator(self) -> Iterator:
        """创建正向迭代器"""
        return BookIterator(self._books)
    
    def create_reverse_iterator(self) -> Iterator:
        """创建反向迭代器"""
        return ReverseBookIterator(self._books)
    
    # Python 风格：实现 __iter__ 使集合可直接用于 for 循环
    def __iter__(self) -> TypingIterator[Book]:
        """使 BookCollection 可以直接用于 for 循环"""
        return iter(self._books)
    
    def __len__(self) -> int:
        """支持 len() 函数"""
        return len(self._books)
    
    def __getitem__(self, index: int) -> Book:
        """支持索引访问"""
        return self._books[index]


def client_code():
    """客户端代码"""
    
    # 创建书籍集合
    library = BookCollection()
    
    # 添加书籍
    library.add_book(Book("设计模式", "GoF", "978-7-111-1"))
    library.add_book(Book("重构", "Martin Fowler", "978-7-111-2"))
    library.add_book(Book("Clean Code", "Robert C. Martin", "978-7-111-3"))
    library.add_book(Book("人月神话", "Frederick Brooks", "978-7-111-4"))
    
    print("=== 正向遍历图书馆藏书 ===")
    iterator = library.create_iterator()
    while iterator.has_next():
        book = iterator.next()
        print(f"[{iterator.current_index()}] {book}")
    
    print("\\n=== 反向遍历图书馆藏书 ===")
    reverse_iterator = library.create_reverse_iterator()
    while reverse_iterator.has_next():
        book = reverse_iterator.next()
        print(f"[{reverse_iterator.current_index()}] {book}")
    
    print("\\n=== 使用 Python for 循环遍历（__iter__） ===")
    for book in library:
        print(book)
    
    print("\\n=== 使用列表推导式 ===")
    titles = [book.title for book in library]
    print(f"所有书名: {titles}")
    
    print("\\n=== 使用生成器表达式 ===")
    authors = {book.author for book in library}
    print(f"所有作者: {authors}")
    
    print(f"\\n图书馆共有 {len(library)} 本书")
    print(f"第一本书: {library[0]}")


if __name__ == "__main__":
    client_code()`,

    cpp: `/**
 * 迭代器模式 - C++ 实现
 * 
 * 场景：实现一个书籍集合，可以通过迭代器遍历书籍
 * C++ 使用 STL 风格的迭代器实现，支持 begin()/end() 接口
 */

#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <stdexcept>

/**
 * Book 书籍类
 */
class Book {
private:
    std::string title;
    std::string author;
    std::string isbn;

public:
    Book(const std::string& title, const std::string& author, const std::string& isbn)
        : title(title), author(author), isbn(isbn) {}

    std::string getTitle() const { return title; }
    std::string getAuthor() const { return author; }
    std::string getIsbn() const { return isbn; }

    friend std::ostream& operator<<(std::ostream& os, const Book& book) {
        os << book.title << " by " << book.author << " (ISBN: " << book.isbn << ")";
        return os;
    }
};

/**
 * Iterator 迭代器接口模板
 * 定义访问和遍历元素的接口
 */
template<typename T>
class Iterator {
public:
    virtual ~Iterator() = default;
    
    /**
     * 检查是否还有下一个元素
     */
    virtual bool hasNext() const = 0;
    
    /**
     * 获取下一个元素
     */
    virtual T next() = 0;
    
    /**
     * 获取当前位置
     */
    virtual size_t currentIndex() const = 0;
};

/**
 * Iterable 可迭代接口模板
 * 定义创建迭代器对象的接口
 */
template<typename T>
class Iterable {
public:
    virtual ~Iterable() = default;
    
    /**
     * 创建正向迭代器
     */
    virtual std::unique_ptr<Iterator<T>> createIterator() = 0;
    
    /**
     * 创建反向迭代器
     */
    virtual std::unique_ptr<Iterator<T>> createReverseIterator() = 0;
};

/**
 * BookIterator 具体迭代器
 * 实现 Iterator 接口，正向遍历书籍集合
 */
class BookIterator : public Iterator<Book> {
private:
    const std::vector<Book>& collection;
    size_t position;

public:
    explicit BookIterator(const std::vector<Book>& collection)
        : collection(collection), position(0) {}

    bool hasNext() const override {
        return position < collection.size();
    }

    Book next() override {
        if (!hasNext()) {
            throw std::out_of_range("No more elements in the collection");
        }
        return collection[position++];
    }

    size_t currentIndex() const override {
        return position;
    }
};

/**
 * ReverseBookIterator 反向迭代器
 * 实现从后向前遍历
 */
class ReverseBookIterator : public Iterator<Book> {
private:
    const std::vector<Book>& collection;
    int position;  // 使用 int 因为可能变为 -1

public:
    explicit ReverseBookIterator(const std::vector<Book>& collection)
        : collection(collection), position(static_cast<int>(collection.size()) - 1) {}

    bool hasNext() const override {
        return position >= 0;
    }

    Book next() override {
        if (!hasNext()) {
            throw std::out_of_range("No more elements in the collection");
        }
        return collection[position--];
    }

    size_t currentIndex() const override {
        return static_cast<size_t>(position);
    }
};

/**
 * BookCollection 具体聚合类
 * 实现 Iterable 接口，管理书籍集合
 */
class BookCollection : public Iterable<Book> {
private:
    std::vector<Book> books;

public:
    /**
     * 添加书籍到集合
     */
    void addBook(const Book& book) {
        books.push_back(book);
    }

    /**
     * 从集合中移除书籍
     */
    void removeBook(size_t index) {
        if (index < books.size()) {
            books.erase(books.begin() + index);
        }
    }

    /**
     * 获取集合中的书籍数量
     */
    size_t getCount() const {
        return books.size();
    }

    /**
     * 通过索引获取书籍
     */
    Book getBook(size_t index) const {
        if (index >= books.size()) {
            throw std::out_of_range("Index out of bounds");
        }
        return books[index];
    }

    /**
     * 创建正向迭代器
     */
    std::unique_ptr<Iterator<Book>> createIterator() override {
        return std::make_unique<BookIterator>(books);
    }

    /**
     * 创建反向迭代器
     */
    std::unique_ptr<Iterator<Book>> createReverseIterator() override {
        return std::make_unique<ReverseBookIterator>(books);
    }

    // C++ STL 风格迭代器支持
    using iterator = std::vector<Book>::iterator;
    using const_iterator = std::vector<Book>::const_iterator;

    iterator begin() { return books.begin(); }
    iterator end() { return books.end(); }
    const_iterator begin() const { return books.begin(); }
    const_iterator end() const { return books.end(); }
    const_iterator cbegin() const { return books.cbegin(); }
    const_iterator cend() const { return books.cend(); }

    // 反向迭代器
    using reverse_iterator = std::vector<Book>::reverse_iterator;
    using const_reverse_iterator = std::vector<Book>::const_reverse_iterator;

    reverse_iterator rbegin() { return books.rbegin(); }
    reverse_iterator rend() { return books.rend(); }
    const_reverse_iterator rbegin() const { return books.rbegin(); }
    const_reverse_iterator rend() const { return books.rend(); }
};

/**
 * 客户端代码
 */
int main() {
    // 创建书籍集合
    BookCollection library;

    // 添加书籍
    library.addBook(Book("设计模式", "GoF", "978-7-111-1"));
    library.addBook(Book("重构", "Martin Fowler", "978-7-111-2"));
    library.addBook(Book("Clean Code", "Robert C. Martin", "978-7-111-3"));
    library.addBook(Book("人月神话", "Frederick Brooks", "978-7-111-4"));

    std::cout << "=== 正向遍历图书馆藏书（迭代器模式） ===" << std::endl;
    auto iterator = library.createIterator();
    while (iterator->hasNext()) {
        Book book = iterator->next();
        std::cout << "[" << iterator->currentIndex() << "] " << book << std::endl;
    }

    std::cout << "\\n=== 反向遍历图书馆藏书（迭代器模式） ===" << std::endl;
    auto reverseIterator = library.createReverseIterator();
    while (reverseIterator->hasNext()) {
        Book book = reverseIterator->next();
        std::cout << "[" << reverseIterator->currentIndex() << "] " << book << std::endl;
    }

    std::cout << "\\n=== 使用 C++11 范围 for 循环（STL 风格） ===" << std::endl;
    for (const auto& book : library) {
        std::cout << book << std::endl;
    }

    std::cout << "\\n=== 使用反向迭代器（STL 风格） ===" << std::endl;
    for (auto it = library.rbegin(); it != library.rend(); ++it) {
        std::cout << *it << std::endl;
    }

    std::cout << "\\n=== 使用传统索引遍历 ===" << std::endl;
    for (size_t i = 0; i < library.getCount(); ++i) {
        std::cout << "[" << i << "] " << library.getBook(i) << std::endl;
    }

    std::cout << "\\n图书馆共有 " << library.getCount() << " 本书" << std::endl;

    return 0;
}`,
  },
  realWorldExamples: [
    {
      title: 'Java Iterator',
      description: 'Java 集合框架中的 Iterator 是迭代器模式的典型应用，所有集合类都实现了 Iterable 接口。',
      source: 'JDK',
      codeSnippet: `List<String> list = Arrays.asList("A", "B", "C");
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    System.out.println(it.next());
}`,
    },
    {
      title: 'C++ STL 迭代器',
      description: 'C++ 标准模板库提供了丰富的迭代器类型，包括输入、输出、前向、双向和随机访问迭代器。',
      source: 'C++ Standard Library',
      codeSnippet: `std::vector<int> vec = {1, 2, 3};
for (auto it = vec.begin(); it != vec.end(); ++it) {
    std::cout << *it << std::endl;
}`,
    },
    {
      title: 'Python 迭代器协议',
      description: 'Python 的 for 循环和生成器都基于迭代器协议，任何实现了 __iter__ 和 __next__ 的对象都可以被迭代。',
      source: 'Python Standard Library',
      codeSnippet: `for item in collection:
    print(item)
    
# 等价于
it = iter(collection)
while True:
    try:
        print(next(it))
    except StopIteration:
        break`,
    },
  ],
  relatedPatterns: ['composite', 'factory-method', 'memento'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '迭代器模式的主要目的是什么？',
      options: [
        '创建对象',
        '顺序访问集合元素而不暴露内部表示',
        '优化性能',
        '转换接口',
      ],
      correctAnswer: 1,
      explanation: '迭代器模式的主要目的是提供一种方法顺序访问一个聚合对象中的各个元素，而不需要暴露该对象的内部表示。',
    },
    {
      id: 'q2',
      type: 'boolean',
      question: '迭代器模式可以让客户端同时遍历同一个集合的多个副本',
      options: ['正确', '错误'],
      correctAnswer: 0,
      explanation: '正确。每个迭代器对象都维护自己的遍历状态，因此可以有多个迭代器同时遍历同一个集合。',
    },
    {
      id: 'q3',
      type: 'single',
      question: '以下哪个不是迭代器模式的优点？',
      options: [
        '单一职责原则：将遍历算法从集合类中分离',
        '开闭原则：可以新增迭代器类型而不影响现有代码',
        '可以并行遍历同一集合',
        '总是比直接遍历效率更高',
      ],
      correctAnswer: 3,
      explanation: '对于某些特殊集合，使用迭代器可能比直接遍历效率低，因为迭代器需要维护额外的状态。',
    },
  ],
};
