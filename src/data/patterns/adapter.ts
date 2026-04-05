import type { DesignPattern } from '@/types/pattern';

export const adapterPattern: DesignPattern = {
  id: 'adapter',
  name: '适配器模式',
  nameEn: 'Adapter Pattern',
  category: 'structural',
  difficulty: 'easy',
  frequency: 'high',
  intent: '将一个类的接口转换成客户希望的另外一个接口。适配器模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。',
  description: '适配器模式是一种结构型设计模式，它能使接口不兼容的对象能够相互合作。',
  applicability: [
    '当需要使用一个现有类，但其接口不符合需求时',
    '当需要创建一个可复用的类，该类可以与不相关或不可预见的类协同工作时',
    '当需要使用几个现有的子类，但不可能对每一个都进行子类化以匹配它们的接口时',
    '当需要统一多个不同接口的类时',
  ],
  pros: [
    '单一职责原则：将接口转换代码与业务逻辑分离',
    '开闭原则：引入新类型的适配器时无需修改客户端代码',
    '提高类的复用性：可以让原本不兼容的类一起工作',
    '增加系统的灵活性和扩展性',
  ],
  cons: [
    '代码复杂度增加，需要引入额外的适配器类',
    '有时直接修改服务类可能更简单',
    '过度使用可能导致系统结构混乱',
  ],
  analogy: {
    title: '现实世界中的适配器',
    description: '适配器就像是电源转换插头或转接头',
    scenarios: [
      {
        id: 'plug',
        title: '电源转换插头',
        description: '出国旅行时，你需要一个转换插头来让你的电器适应当地的插座。适配器模式也是如此，它让接口不兼容的类能够协同工作。',
        icon: 'Plug',
      },
      {
        id: 'card-reader',
        title: '读卡器',
        description: '笔记本电脑通常没有直接读取 SD 卡的接口，需要使用读卡器作为适配器，将 SD 卡的接口转换为 USB 接口。',
        icon: 'CreditCard',
      },
      {
        id: 'translator',
        title: '翻译官',
        description: '两个说不同语言的人交流时，需要翻译官作为适配器，将一种语言转换为另一种语言。',
        icon: 'Languages',
      },
    ],
  },
  structure: {
    classDiagram: `
      class Target {
        +request()
      }
      class Adaptee {
        +specificRequest()
      }
      class Adapter {
        -adaptee: Adaptee
        +request()
      }
      Target <|-- Adapter
      Adapter --> Adaptee
    `,
    mermaidDiagram: `
classDiagram
  class Target {
    <<interface>>
    +request()
  }
  
  class Adaptee {
    +specificRequest()
  }
  
  class Adapter {
    -adaptee: Adaptee
    +request()
  }
  
  class ClassAdapter {
    +request()
  }
  
  class Client {
    +main()
  }
  
  Target <|.. Adapter : implements
  Target <|-- ClassAdapter : extends/implements
  ClassAdapter --|> Adaptee : extends
  Adapter --> Adaptee : adapts
  Client ..> Target : uses
  
  style Target fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style Adaptee fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style Adapter fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
  style ClassAdapter fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
  style Client fill:#f5f5f5,stroke:#616161,stroke-width:1px
    `,
    animationSteps: [
      {
        id: 'step1',
        title: '目标接口 (Target)',
        description: '定义客户端需要的特定领域接口',
        duration: 2000,
        elements: [
          { id: 'target', type: 'interface', name: 'Target', x: 200, y: 150, methods: ['+request()'] },
        ],
      },
      {
        id: 'step2',
        title: '被适配者 (Adaptee)',
        description: '定义一个已经存在的接口，需要被适配',
        duration: 2000,
        elements: [
          { id: 'target', type: 'interface', name: 'Target', x: 200, y: 150, methods: ['+request()'] },
          { id: 'adaptee', type: 'class', name: 'Adaptee', x: 500, y: 150, methods: ['+specificRequest()'] },
        ],
      },
      {
        id: 'step3',
        title: '对象适配器 (Object Adapter)',
        description: '通过组合方式包装 Adaptee，实现 Target 接口',
        duration: 3000,
        elements: [
          { id: 'target', type: 'interface', name: 'Target', x: 200, y: 150, methods: ['+request()'] },
          { id: 'adaptee', type: 'class', name: 'Adaptee', x: 500, y: 150, methods: ['+specificRequest()'] },
          { id: 'adapter', type: 'class', name: 'Adapter', x: 350, y: 350, properties: ['-adaptee: Adaptee'], methods: ['+request()'] },
        ],
        connections: [
          { from: 'adapter', to: 'target', type: 'implementation', label: 'implements' },
          { from: 'adapter', to: 'adaptee', type: 'composition', label: 'adapts' },
        ],
      },
      {
        id: 'step4',
        title: '类适配器 (Class Adapter)',
        description: '通过继承方式同时继承 Adaptee 和实现 Target 接口',
        duration: 3000,
        elements: [
          { id: 'target', type: 'interface', name: 'Target', x: 200, y: 150, methods: ['+request()'] },
          { id: 'adaptee', type: 'class', name: 'Adaptee', x: 500, y: 150, methods: ['+specificRequest()'] },
          { id: 'adapter', type: 'class', name: 'Adapter', x: 350, y: 350, properties: ['-adaptee: Adaptee'], methods: ['+request()'] },
          { id: 'classAdapter', type: 'class', name: 'ClassAdapter', x: 650, y: 350, methods: ['+request()'] },
        ],
        connections: [
          { from: 'adapter', to: 'target', type: 'implementation', label: 'implements' },
          { from: 'adapter', to: 'adaptee', type: 'composition', label: 'adapts' },
          { from: 'classAdapter', to: 'target', type: 'implementation', label: 'implements' },
          { from: 'classAdapter', to: 'adaptee', type: 'inheritance', label: 'extends' },
        ],
      },
      {
        id: 'step5',
        title: '客户端使用',
        description: '客户端通过 Target 接口与适配器交互',
        duration: 2000,
        elements: [
          { id: 'target', type: 'interface', name: 'Target', x: 200, y: 150, methods: ['+request()'] },
          { id: 'adaptee', type: 'class', name: 'Adaptee', x: 500, y: 150, methods: ['+specificRequest()'] },
          { id: 'adapter', type: 'class', name: 'Adapter', x: 350, y: 350, properties: ['-adaptee: Adaptee'], methods: ['+request()'] },
          { id: 'classAdapter', type: 'class', name: 'ClassAdapter', x: 650, y: 350, methods: ['+request()'] },
          { id: 'client', type: 'class', name: 'Client', x: 200, y: 550, methods: ['+main()'] },
        ],
        connections: [
          { from: 'adapter', to: 'target', type: 'implementation', label: 'implements' },
          { from: 'adapter', to: 'adaptee', type: 'composition', label: 'adapts' },
          { from: 'classAdapter', to: 'target', type: 'implementation', label: 'implements' },
          { from: 'classAdapter', to: 'adaptee', type: 'inheritance', label: 'extends' },
          { from: 'client', to: 'target', type: 'dependency', label: 'uses' },
        ],
      },
    ],
  },
  implementation: {
    typescript: `/**
 * 适配器模式 - TypeScript 实现
 * 
 * 场景：假设我们有一个旧的支付系统（Adaptee），它使用的是旧的接口。
 * 现在我们需要集成一个新的电商平台，该平台期望使用标准的支付接口（Target）。
 * 我们需要使用适配器模式来让旧的支付系统能够适配新的接口。
 */

// ============================================
// Target: 目标接口（客户端期望的接口）
// ============================================
interface PaymentProcessor {
  /**
   * 处理支付请求
   * @param amount 支付金额
   * @param currency 货币类型
   * @returns 支付结果
   */
  processPayment(amount: number, currency: string): string;
}

// ============================================
// Adaptee: 被适配者（已有但不兼容的类）
// ============================================
class OldPaymentSystem {
  private merchantId: string;

  constructor(merchantId: string) {
    this.merchantId = merchantId;
  }

  /**
   * 旧的支付方法，使用特定的参数格式
   * @param paymentData 包含金额和货币的对象
   * @returns 旧的支付结果格式
   */
  makePayment(paymentData: { sum: number; currencyCode: string }): string {
    return \`Old System [Merchant: \${this.merchantId}] processed \${paymentData.sum} \${paymentData.currencyCode}\`;
  }

  /**
   * 验证商户状态
   */
  verifyMerchant(): boolean {
    return this.merchantId.length > 0;
  }
}

// ============================================
// 对象适配器 (Object Adapter) - 推荐方式
// 使用组合方式包装 Adaptee，更灵活，可以适配多个 Adaptee
// ============================================
class PaymentAdapter implements PaymentProcessor {
  private oldSystem: OldPaymentSystem;

  constructor(oldSystem: OldPaymentSystem) {
    this.oldSystem = oldSystem;
  }

  /**
   * 实现目标接口，内部调用被适配者的方法
   * 将新接口的参数转换为旧接口需要的格式
   */
  processPayment(amount: number, currency: string): string {
    // 参数转换：将新接口的参数格式转换为旧接口需要的格式
    const paymentData = {
      sum: amount,
      currencyCode: currency.toUpperCase(),
    };

    // 可以添加额外的逻辑，如验证
    if (!this.oldSystem.verifyMerchant()) {
      throw new Error('Merchant verification failed');
    }

    // 调用被适配者的方法
    const result = this.oldSystem.makePayment(paymentData);
    
    // 结果转换：将旧的结果格式转换为新的格式
    return \`[ADAPTED] \${result}\`;
  }
}

// ============================================
// 类适配器 (Class Adapter)
// 使用继承方式同时继承 Adaptee 和实现 Target 接口
// 注意：TypeScript/JavaScript 不支持真正的多重继承，这里使用混入模式模拟
// ============================================
interface OldPaymentSystemMethods {
  makePayment(paymentData: { sum: number; currencyCode: string }): string;
  verifyMerchant(): boolean;
}

class ClassPaymentAdapter extends OldPaymentSystem implements PaymentProcessor {
  constructor(merchantId: string) {
    super(merchantId);
  }

  processPayment(amount: number, currency: string): string {
    const paymentData = {
      sum: amount,
      currencyCode: currency.toUpperCase(),
    };

    if (!this.verifyMerchant()) {
      throw new Error('Merchant verification failed');
    }

    const result = this.makePayment(paymentData);
    return \`[CLASS ADAPTER] \${result}\`;
  }
}

// ============================================
// 客户端代码
// ============================================
class ECommercePlatform {
  private paymentProcessor: PaymentProcessor;

  constructor(paymentProcessor: PaymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }

  checkout(amount: number, currency: string): void {
    console.log('Processing checkout...');
    const result = this.paymentProcessor.processPayment(amount, currency);
    console.log('Payment result:', result);
  }
}

// ============================================
// 使用示例
// ============================================
function clientCode(): void {
  // 创建旧的支付系统实例
  const oldSystem = new OldPaymentSystem('MERCHANT_123');

  // 方式1：使用对象适配器（推荐）
  console.log('=== 对象适配器 ===');
  const objectAdapter = new PaymentAdapter(oldSystem);
  const platform1 = new ECommercePlatform(objectAdapter);
  platform1.checkout(100, 'USD');

  // 方式2：使用类适配器
  console.log('\\n=== 类适配器 ===');
  const classAdapter = new ClassPaymentAdapter('MERCHANT_456');
  const platform2 = new ECommercePlatform(classAdapter);
  platform2.checkout(200, 'EUR');
}

clientCode();`,

    java: `/**
 * 适配器模式 - Java 实现
 * 
 * 场景：媒体播放器应用，原本只支持 MP3 格式，
 * 现在需要支持 MP4 和 VLC 格式，但已有专门的播放器类。
 */

// ============================================
// Target: 目标接口
// ============================================
interface MediaPlayer {
    /**
     * 播放媒体文件
     * @param audioType 音频类型（如 "mp3", "mp4", "vlc"）
     * @param fileName 文件名
     */
    void play(String audioType, String fileName);
}

// ============================================
// Adaptee 1: 高级媒体播放器接口
// ============================================
interface AdvancedMediaPlayer {
    void playVlc(String fileName);
    void playMp4(String fileName);
}

// ============================================
// Concrete Adaptee: VLC 播放器
// ============================================
class VlcPlayer implements AdvancedMediaPlayer {
    @Override
    public void playVlc(String fileName) {
        System.out.println("Playing vlc file: " + fileName);
    }

    @Override
    public void playMp4(String fileName) {
        // VLC 播放器不支持 MP4
    }
}

// ============================================
// Concrete Adaptee: MP4 播放器
// ============================================
class Mp4Player implements AdvancedMediaPlayer {
    @Override
    public void playVlc(String fileName) {
        // MP4 播放器不支持 VLC
    }

    @Override
    public void playMp4(String fileName) {
        System.out.println("Playing mp4 file: " + fileName);
    }
}

// ============================================
// 对象适配器 (Object Adapter) - 推荐方式
// 使用组合方式，更灵活，可以适配多个 Adaptee
// ============================================
class MediaAdapter implements MediaPlayer {
    private AdvancedMediaPlayer advancedMusicPlayer;

    /**
     * 根据音频类型创建对应的适配器
     */
    public MediaAdapter(String audioType) {
        if (audioType.equalsIgnoreCase("vlc")) {
            advancedMusicPlayer = new VlcPlayer();
        } else if (audioType.equalsIgnoreCase("mp4")) {
            advancedMusicPlayer = new Mp4Player();
        }
    }

    @Override
    public void play(String audioType, String fileName) {
        if (audioType.equalsIgnoreCase("vlc")) {
            advancedMusicPlayer.playVlc(fileName);
        } else if (audioType.equalsIgnoreCase("mp4")) {
            advancedMusicPlayer.playMp4(fileName);
        }
    }
}

// ============================================
// 类适配器 (Class Adapter)
// 使用继承方式，Java 中只能继承一个类
// 这里演示继承 Mp4Player 的情况
// ============================================
class Mp4ClassAdapter extends Mp4Player implements MediaPlayer {
    @Override
    public void play(String audioType, String fileName) {
        if (audioType.equalsIgnoreCase("mp4")) {
            playMp4(fileName);
        } else {
            System.out.println("Class adapter only supports mp4 format");
        }
    }
}

// ============================================
// 客户端：音频播放器
// ============================================
class AudioPlayer implements MediaPlayer {
    private MediaAdapter mediaAdapter;

    @Override
    public void play(String audioType, String fileName) {
        // 内置支持 MP3
        if (audioType.equalsIgnoreCase("mp3")) {
            System.out.println("Playing mp3 file: " + fileName);
        } 
        // 使用适配器支持其他格式
        else if (audioType.equalsIgnoreCase("vlc") || audioType.equalsIgnoreCase("mp4")) {
            mediaAdapter = new MediaAdapter(audioType);
            mediaAdapter.play(audioType, fileName);
        } else {
            System.out.println("Invalid media. " + audioType + " format not supported");
        }
    }
}

// ============================================
// 使用示例
// ============================================
public class Client {
    public static void main(String[] args) {
        AudioPlayer audioPlayer = new AudioPlayer();

        // 直接播放 MP3
        audioPlayer.play("mp3", "song.mp3");

        // 通过对象适配器播放 MP4
        audioPlayer.play("mp4", "movie.mp4");

        // 通过对象适配器播放 VLC
        audioPlayer.play("vlc", "video.vlc");

        // 不支持的格式
        audioPlayer.play("avi", "clip.avi");

        System.out.println("\\n=== 类适配器示例 ===");
        // 使用类适配器
        MediaPlayer classAdapter = new Mp4ClassAdapter();
        classAdapter.play("mp4", "class_adapter_movie.mp4");
    }
}`,

    go: `package main

import (
	"fmt"
	"strings"
)

/**
 * 适配器模式 - Go 实现
 * 
 * 场景：日志系统适配。我们有一个旧的日志记录器，使用特定的接口。
 * 现在需要适配到新的标准日志接口。
 * 
 * Go 语言没有类和继承，使用结构体嵌入（组合）来实现适配器模式
 */

// ============================================
// Target: 目标接口（新的标准日志接口）
// ============================================
type Logger interface {
	Info(msg string)
	Error(msg string)
	Debug(msg string)
}

// ============================================
// Adaptee: 被适配者（旧的日志系统）
// ============================================
type OldLogger struct {
	prefix string
	level  string
}

// NewOldLogger 创建旧的日志记录器
func NewOldLogger(prefix string) *OldLogger {
	return &OldLogger{
		prefix: prefix,
		level:  "INFO",
	}
}

// WriteLog 旧的日志方法，使用特定的参数格式
func (o *OldLogger) WriteLog(level int, message string) {
	levelStr := "INFO"
	switch level {
	case 1:
		levelStr = "DEBUG"
	case 2:
		levelStr = "INFO"
	case 3:
		levelStr = "ERROR"
	}
	fmt.Printf("[%s] %s: %s\\n", o.prefix, levelStr, message)
}

// SetLogLevel 设置日志级别
func (o *OldLogger) SetLogLevel(level string) {
	o.level = level
}

// ============================================
// 对象适配器 (Object Adapter) - 推荐方式
// 使用结构体嵌入（组合）来包装 Adaptee
// ============================================
type LoggerAdapter struct {
	oldLogger *OldLogger
}

// NewLoggerAdapter 创建日志适配器
func NewLoggerAdapter(oldLogger *OldLogger) *LoggerAdapter {
	return &LoggerAdapter{
		oldLogger: oldLogger,
	}
}

// Info 实现目标接口 - 信息级别日志
func (l *LoggerAdapter) Info(msg string) {
	// 参数转换：将新接口调用转换为旧接口调用
	l.oldLogger.WriteLog(2, msg)
}

// Error 实现目标接口 - 错误级别日志
func (l *LoggerAdapter) Error(msg string) {
	l.oldLogger.WriteLog(3, msg)
}

// Debug 实现目标接口 - 调试级别日志
func (l *LoggerAdapter) Debug(msg string) {
	l.oldLogger.WriteLog(1, msg)
}

// ============================================
// 结构体嵌入适配器 (Go 特有方式)
// 通过嵌入 Adaptee 结构体，直接暴露其方法
// ============================================
type EmbeddedLoggerAdapter struct {
	*OldLogger // 嵌入 OldLogger
}

// NewEmbeddedLoggerAdapter 创建嵌入适配器
func NewEmbeddedLoggerAdapter(prefix string) *EmbeddedLoggerAdapter {
	return &EmbeddedLoggerAdapter{
		OldLogger: NewOldLogger(prefix),
	}
}

// Info 实现目标接口
func (e *EmbeddedLoggerAdapter) Info(msg string) {
	// 可以直接访问嵌入结构体的方法
	e.WriteLog(2, "[ADAPTED] "+msg)
}

// Error 实现目标接口
func (e *EmbeddedLoggerAdapter) Error(msg string) {
	e.WriteLog(3, "[ADAPTED] "+msg)
}

// Debug 实现目标接口
func (e *EmbeddedLoggerAdapter) Debug(msg string) {
	e.WriteLog(1, "[ADAPTED] "+msg)
}

// ============================================
// 客户端代码
// ============================================
type Application struct {
	logger Logger
}

func NewApplication(logger Logger) *Application {
	return &Application{logger: logger}
}

func (a *Application) Run() {
	a.logger.Info("Application started")
	a.logger.Debug("Debug information")
	a.logger.Error("An error occurred")
}

// ============================================
// 使用示例
// ============================================
func main() {
	// 方式1：使用对象适配器（推荐）
	fmt.Println("=== 对象适配器 ===")
	oldLogger := NewOldLogger("OLD_SYS")
	adapter := NewLoggerAdapter(oldLogger)
	app1 := NewApplication(adapter)
	app1.Run()

	// 方式2：使用结构体嵌入适配器
	fmt.Println("\\n=== 结构体嵌入适配器 ===")
	embeddedAdapter := NewEmbeddedLoggerAdapter("EMBEDDED")
	app2 := NewApplication(embeddedAdapter)
	app2.Run()

	// 方式3：使用匿名函数适配（Go 惯用法）
	fmt.Println("\\n=== 函数适配器 ===")
	oldLogger3 := NewOldLogger("FUNC")
	
	// 通过闭包创建适配器
	funcAdapter := &funcLoggerAdapter{
		infoFunc:  func(msg string) { oldLogger3.WriteLog(2, msg) },
		errorFunc: func(msg string) { oldLogger3.WriteLog(3, msg) },
		debugFunc: func(msg string) { oldLogger3.WriteLog(1, msg) },
	}
	app3 := NewApplication(funcAdapter)
	app3.Run()
}

// 函数适配器 - 使用函数类型实现接口
type funcLoggerAdapter struct {
	infoFunc  func(string)
	errorFunc func(string)
	debugFunc func(string)
}

func (f *funcLoggerAdapter) Info(msg string)  { f.infoFunc(msg) }
func (f *funcLoggerAdapter) Error(msg string) { f.errorFunc(msg) }
func (f *funcLoggerAdapter) Debug(msg string) { f.debugFunc(msg) }`,

    python: `#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
适配器模式 - Python 实现

场景：形状绘制系统。我们有一个旧的绘制引擎，使用特定的接口。
现在需要适配到新的统一形状接口。
"""

from abc import ABC, abstractmethod
from typing import Tuple

# ============================================
# Target: 目标接口（新的统一形状接口）
# ============================================
class Shape(ABC):
    """形状接口 - 目标接口"""
    
    @abstractmethod
    def draw(self, x: int, y: int) -> str:
        """在指定位置绘制形状"""
        pass
    
    @abstractmethod
    def resize(self, factor: float) -> str:
        """调整形状大小"""
        pass


# ============================================
# Adaptee: 被适配者（旧的绘制引擎）
# ============================================
class LegacyRectangle:
    """旧的矩形类 - 被适配者"""
    
    def __init__(self, upper_left_x: int, upper_left_y: int, 
                 lower_right_x: int, lower_right_y: int):
        self._upper_left_x = upper_left_x
        self._upper_left_y = upper_left_y
        self._lower_right_x = lower_right_x
        self._lower_right_y = lower_right_y
    
    def display(self, x1: int, y1: int, x2: int, y2: int) -> str:
        """旧的显示方法，使用两个坐标点"""
        return f"LegacyRectangle: Displaying at ({x1},{y1}) to ({x2},{y2})"
    
    def scale(self, scale_x: float, scale_y: float) -> str:
        """旧的缩放方法，使用两个方向的缩放因子"""
        return f"LegacyRectangle: Scaling by ({scale_x}, {scale_y})"


class LegacyCircle:
    """旧的圆形类 - 另一个被适配者"""
    
    def __init__(self, center_x: int, center_y: int, radius: int):
        self._center_x = center_x
        self._center_y = center_y
        self._radius = radius
    
    def render(self, cx: int, cy: int, r: int) -> str:
        """旧的渲染方法"""
        return f"LegacyCircle: Rendering at center ({cx},{cy}) with radius {r}"
    
    def enlarge(self, percentage: int) -> str:
        """旧的放大方法"""
        return f"LegacyCircle: Enlarging by {percentage}%"


# ============================================
# 对象适配器 (Object Adapter) - 推荐方式
# 使用组合方式包装 Adaptee
# ============================================
class RectangleAdapter(Shape):
    """矩形适配器 - 对象适配器"""
    
    def __init__(self, legacy_rect: LegacyRectangle):
        self._legacy_rect = legacy_rect
        self._width = legacy_rect._lower_right_x - legacy_rect._upper_left_x
        self._height = legacy_rect._lower_right_y - legacy_rect._upper_left_y
    
    def draw(self, x: int, y: int) -> str:
        """实现目标接口 - 将单个坐标点转换为两个坐标点"""
        # 参数转换：将新接口的参数格式转换为旧接口需要的格式
        x2 = x + self._width
        y2 = y + self._height
        return self._legacy_rect.display(x, y, x2, y2)
    
    def resize(self, factor: float) -> str:
        """实现目标接口 - 将统一缩放因子转换为两个方向的缩放因子"""
        return self._legacy_rect.scale(factor, factor)


class CircleAdapter(Shape):
    """圆形适配器 - 对象适配器"""
    
    def __init__(self, legacy_circle: LegacyCircle):
        self._legacy_circle = legacy_circle
    
    def draw(self, x: int, y: int) -> str:
        """实现目标接口"""
        return self._legacy_circle.render(
            x, y, self._legacy_circle._radius
        )
    
    def resize(self, factor: float) -> str:
        """实现目标接口 - 将缩放因子转换为百分比"""
        percentage = int((factor - 1) * 100)
        return self._legacy_circle.enlarge(percentage)


# ============================================
# 类适配器 (Class Adapter)
# 使用多重继承方式同时继承 Adaptee 和实现 Target 接口
# ============================================
class RectangleClassAdapter(LegacyRectangle, Shape):
    """矩形类适配器 - 使用多重继承"""
    
    def __init__(self, width: int, height: int):
        # 初始化 LegacyRectangle 的坐标
        super().__init__(0, 0, width, height)
        self._width = width
        self._height = height
    
    def draw(self, x: int, y: int) -> str:
        """实现目标接口"""
        x2 = x + self._width
        y2 = y + self._height
        return self.display(x, y, x2, y2)
    
    def resize(self, factor: float) -> str:
        """实现目标接口"""
        return self.scale(factor, factor)


class CircleClassAdapter(LegacyCircle, Shape):
    """圆形类适配器 - 使用多重继承"""
    
    def __init__(self, radius: int):
        super().__init__(0, 0, radius)
    
    def draw(self, x: int, y: int) -> str:
        """实现目标接口"""
        return self.render(x, y, self._radius)
    
    def resize(self, factor: float) -> str:
        """实现目标接口"""
        percentage = int((factor - 1) * 100)
        return self.enlarge(percentage)


# ============================================
# 客户端代码
# ============================================
class DrawingApplication:
    """绘图应用程序 - 客户端"""
    
    def __init__(self):
        self._shapes: list[Shape] = []
    
    def add_shape(self, shape: Shape) -> None:
        """添加形状"""
        self._shapes.append(shape)
    
    def draw_all(self, x: int, y: int) -> None:
        """绘制所有形状"""
        print("=== Drawing All Shapes ===")
        for i, shape in enumerate(self._shapes):
            result = shape.draw(x + i * 50, y + i * 50)
            print(result)
    
    def resize_all(self, factor: float) -> None:
        """调整所有形状大小"""
        print(f"\\n=== Resizing All Shapes by {factor}x ===")
        for shape in self._shapes:
            result = shape.resize(factor)
            print(result)


# ============================================
# 使用示例
# ============================================
def client_code():
    app = DrawingApplication()
    
    print("=== 对象适配器示例 ===")
    # 使用对象适配器
    legacy_rect = LegacyRectangle(0, 0, 100, 50)
    legacy_circle = LegacyCircle(0, 0, 30)
    
    rect_adapter = RectangleAdapter(legacy_rect)
    circle_adapter = CircleAdapter(legacy_circle)
    
    app.add_shape(rect_adapter)
    app.add_shape(circle_adapter)
    
    app.draw_all(10, 10)
    app.resize_all(1.5)
    
    print("\\n=== 类适配器示例 ===")
    # 使用类适配器
    app2 = DrawingApplication()
    
    rect_class_adapter = RectangleClassAdapter(100, 50)
    circle_class_adapter = CircleClassAdapter(30)
    
    app2.add_shape(rect_class_adapter)
    app2.add_shape(circle_class_adapter)
    
    app2.draw_all(20, 20)
    app2.resize_all(2.0)


if __name__ == "__main__":
    client_code()`,

    cpp: `/**
 * 适配器模式 - C++ 实现
 * 
 * 场景：数据库连接系统。我们有一个旧的数据库连接类，
 * 现在需要适配到新的统一数据库接口。
 */

#include <iostream>
#include <string>
#include <memory>

// ============================================
// Target: 目标接口（新的统一数据库接口）
// ============================================
class DatabaseConnection {
public:
    virtual ~DatabaseConnection() = default;
    
    /**
     * 连接到数据库
     * @param connectionString 连接字符串
     */
    virtual void connect(const std::string& connectionString) = 0;
    
    /**
     * 执行查询
     * @param query SQL 查询语句
     * @return 查询结果
     */
    virtual std::string executeQuery(const std::string& query) = 0;
    
    /**
     * 断开连接
     */
    virtual void disconnect() = 0;
};

// ============================================
// Adaptee: 被适配者（旧的数据库连接类）
// ============================================
class LegacyMySQLDatabase {
private:
    std::string host;
    int port;
    std::string database;
    bool connected;

public:
    LegacyMySQLDatabase() : port(3306), connected(false) {}
    
    /**
     * 旧的连接方法，使用分离的参数
     */
    void establishConnection(const std::string& serverHost, 
                             int serverPort, 
                             const std::string& dbName,
                             const std::string& username,
                             const std::string& password) {
        host = serverHost;
        port = serverPort;
        database = dbName;
        connected = true;
        std::cout << "[Legacy MySQL] Connected to " << host << ":" << port 
                  << "/" << database << std::endl;
    }
    
    /**
     * 旧的查询方法
     */
    std::string runSqlCommand(const std::string& sql) {
        if (!connected) {
            return "Error: Not connected";
        }
        return "[Legacy MySQL] Result of: " + sql;
    }
    
    /**
     * 旧的断开连接方法
     */
    void closeConnection() {
        connected = false;
        std::cout << "[Legacy MySQL] Connection closed" << std::endl;
    }
    
    bool isConnected() const {
        return connected;
    }
};

class LegacyOracleDatabase {
private:
    std::string tnsName;
    std::string user;
    bool connected;

public:
    LegacyOracleDatabase() : connected(false) {}
    
    /**
     * Oracle 特定的连接方式
     */
    void open(const std::string& tns, const std::string& username, const std::string& password) {
        tnsName = tns;
        user = username;
        connected = true;
        std::cout << "[Legacy Oracle] Connected to TNS: " << tnsName 
                  << " as " << user << std::endl;
    }
    
    std::string execute(const std::string& statement) {
        if (!connected) {
            return "Error: Not connected";
        }
        return "[Legacy Oracle] Result of: " + statement;
    }
    
    void close() {
        connected = false;
        std::cout << "[Legacy Oracle] Connection closed" << std::endl;
    }
};

// ============================================
// 对象适配器 (Object Adapter) - 推荐方式
// 使用组合方式包装 Adaptee
// ============================================
class MySQLAdapter : public DatabaseConnection {
private:
    std::shared_ptr<LegacyMySQLDatabase> legacyDB;

public:
    MySQLAdapter() : legacyDB(std::make_shared<LegacyMySQLDatabase>()) {}
    
    /**
     * 实现目标接口 - 解析连接字符串并转换为旧接口的参数
     */
    void connect(const std::string& connectionString) override {
        // 解析连接字符串: "host:port/database?user=xxx&password=yyy"
        // 简化处理，实际应该使用 URL 解析
        std::string host = "localhost";
        int port = 3306;
        std::string db = "test";
        std::string user = "root";
        std::string pass = "";
        
        // 参数转换：将连接字符串转换为分离的参数
        legacyDB->establishConnection(host, port, db, user, pass);
    }
    
    std::string executeQuery(const std::string& query) override {
        return legacyDB->runSqlCommand(query);
    }
    
    void disconnect() override {
        legacyDB->closeConnection();
    }
};

class OracleAdapter : public DatabaseConnection {
private:
    std::shared_ptr<LegacyOracleDatabase> legacyDB;

public:
    OracleAdapter() : legacyDB(std::make_shared<LegacyOracleDatabase>()) {}
    
    void connect(const std::string& connectionString) override {
        // 解析连接字符串并转换为 Oracle 特定的参数
        std::string tns = "ORCL";
        std::string user = "system";
        std::string pass = "manager";
        
        legacyDB->open(tns, user, pass);
    }
    
    std::string executeQuery(const std::string& query) override {
        return legacyDB->execute(query);
    }
    
    void disconnect() override {
        legacyDB->close();
    }
};

// ============================================
// 类适配器 (Class Adapter) - 使用多重继承
// 注意：C++ 支持多重继承
// ============================================
class MySQLClassAdapter : public DatabaseConnection, 
                          private LegacyMySQLDatabase {
public:
    void connect(const std::string& connectionString) override {
        std::string host = "localhost";
        int port = 3306;
        std::string db = "test";
        std::string user = "root";
        std::string pass = "";
        
        // 直接调用继承的基类方法
        establishConnection(host, port, db, user, pass);
    }
    
    std::string executeQuery(const std::string& query) override {
        return runSqlCommand(query);
    }
    
    void disconnect() override {
        closeConnection();
    }
};

class OracleClassAdapter : public DatabaseConnection,
                           private LegacyOracleDatabase {
public:
    void connect(const std::string& connectionString) override {
        std::string tns = "ORCL";
        std::string user = "system";
        std::string pass = "manager";
        
        open(tns, user, pass);
    }
    
    std::string executeQuery(const std::string& query) override {
        return execute(query);
    }
    
    void disconnect() override {
        close();
    }
};

// ============================================
// 客户端代码
// ============================================
class DatabaseClient {
private:
    DatabaseConnection* db;

public:
    void setConnection(DatabaseConnection* connection) {
        db = connection;
    }
    
    void performOperations() {
        std::cout << "\\n=== Client Operations ===" << std::endl;
        db->connect("connection_string");
        std::cout << db->executeQuery("SELECT * FROM users") << std::endl;
        db->disconnect();
    }
};

// ============================================
// 使用示例
// ============================================
int main() {
    DatabaseClient client;
    
    std::cout << "=== 对象适配器示例 ===" << std::endl;
    
    // 使用对象适配器 - MySQL
    MySQLAdapter mysqlAdapter;
    client.setConnection(&mysqlAdapter);
    client.performOperations();
    
    // 使用对象适配器 - Oracle
    std::cout << "\\n";
    OracleAdapter oracleAdapter;
    client.setConnection(&oracleAdapter);
    client.performOperations();
    
    std::cout << "\\n=== 类适配器示例 ===" << std::endl;
    
    // 使用类适配器 - MySQL
    MySQLClassAdapter mysqlClassAdapter;
    client.setConnection(&mysqlClassAdapter);
    client.performOperations();
    
    // 使用类适配器 - Oracle
    std::cout << "\\n";
    OracleClassAdapter oracleClassAdapter;
    client.setConnection(&oracleClassAdapter);
    client.performOperations();
    
    return 0;
}`,
  },
  realWorldExamples: [
    {
      title: 'Java IO - InputStreamReader',
      description: 'Java IO 中的 InputStreamReader 和 OutputStreamWriter 是适配器的典型例子，将字节流适配为字符流。',
      source: 'JDK',
      codeSnippet: `Reader reader = new InputStreamReader(inputStream);
Writer writer = new OutputStreamWriter(outputStream);`,
    },
    {
      title: 'Android - ListView Adapter',
      description: 'Android 开发中的 Adapter 模式用于将数据适配到 ListView、RecyclerView 等视图组件。',
      source: 'Android SDK',
      codeSnippet: `ArrayAdapter<String> adapter = new ArrayAdapter<>(
    context, 
    android.R.layout.simple_list_item_1, 
    dataList
);
listView.setAdapter(adapter);`,
    },
    {
      title: 'Spring MVC - HandlerAdapter',
      description: 'Spring MVC 中的 HandlerAdapter 将不同类型的 Controller 适配到统一的处理流程。',
      source: 'Spring Framework',
      codeSnippet: `public interface HandlerAdapter {
    boolean supports(Object handler);
    ModelAndView handle(HttpServletRequest request, 
                        HttpServletResponse response, 
                        Object handler) throws Exception;
}`,
    },
  ],
  relatedPatterns: ['bridge', 'decorator', 'proxy', 'facade'],
  quiz: [
    {
      id: 'q1',
      type: 'single',
      question: '适配器模式的主要目的是什么？',
      options: [
        '创建新的对象实例',
        '转换接口以使不兼容的类能够协同工作',
        '优化系统性能',
        '管理对象的生命周期',
      ],
      correctAnswer: 1,
      explanation: '适配器模式的主要目的是将一个类的接口转换成客户希望的另外一个接口，使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。',
    },
    {
      id: 'q2',
      type: 'single',
      question: '对象适配器和类适配器的主要区别是什么？',
      options: [
        '对象适配器使用继承，类适配器使用组合',
        '对象适配器使用组合，类适配器使用继承',
        '对象适配器性能更好',
        '类适配器更灵活',
      ],
      correctAnswer: 1,
      explanation: '对象适配器使用组合（Composition）方式包装 Adaptee，而类适配器使用继承（Inheritance）方式。对象适配器更灵活，因为可以适配多个 Adaptee 或其子类。',
    },
    {
      id: 'q3',
      type: 'boolean',
      question: '适配器模式符合开闭原则，可以在不修改现有代码的情况下引入新的适配器。',
      options: ['正确', '错误'],
      correctAnswer: 0,
      explanation: '正确。适配器模式符合开闭原则，引入新类型的适配器时无需修改客户端代码，只需添加新的适配器类即可。',
    },
    {
      id: 'q4',
      type: 'single',
      question: '以下哪种情况不适合使用适配器模式？',
      options: [
        '需要使用一个现有类，但其接口不符合需求',
        '需要创建一个可复用的类，与多个不相关的类协同工作',
        '需要修改现有类的内部实现逻辑',
        '需要统一多个不同接口的类',
      ],
      correctAnswer: 2,
      explanation: '如果需要修改现有类的内部实现逻辑，应该直接修改该类或使用其他模式（如装饰器模式）。适配器模式用于接口转换，而不是修改内部实现。',
    },
  ],
};
