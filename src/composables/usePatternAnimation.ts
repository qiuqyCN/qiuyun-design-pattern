import { ref } from 'vue';

/**
 * 共享的动画工具函数
 */

// 睡眠函数，用于动画延迟
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 单例模式动画状态
 */
export function useSingletonAnimation() {
  const isAnimating = ref(false);
  const instanceCreated = ref(false);
  const activeClient = ref<number | null>(null);
  const returnedClient = ref<number | null>(null);

  async function runAnimation() {
    if (isAnimating.value) return;
    
    isAnimating.value = true;
    instanceCreated.value = false;
    activeClient.value = null;
    returnedClient.value = null;
    
    for (let i = 1; i <= 3; i++) {
      activeClient.value = i;
      await sleep(600);
      
      if (i === 1) {
        instanceCreated.value = true;
      }
      
      await sleep(400);
      returnedClient.value = i;
      await sleep(300);
    }
    
    isAnimating.value = false;
  }

  return {
    isAnimating,
    instanceCreated,
    activeClient,
    returnedClient,
    runAnimation
  };
}

/**
 * 工厂方法模式动画状态
 */
export function useFactoryMethodAnimation() {
  const selectedFactory = ref<string | null>(null);
  const selectedProduct = ref<string | null>(null);
  const showProduct = ref(false);
  const isAnimating = ref(false);

  async function createProduct(type: string) {
    if (isAnimating.value) return;
    
    isAnimating.value = true;
    selectedFactory.value = type;
    selectedProduct.value = type;
    showProduct.value = false;
    
    await sleep(300);
    showProduct.value = true;
    
    await sleep(500);
    isAnimating.value = false;
  }

  return {
    selectedFactory,
    selectedProduct,
    showProduct,
    isAnimating,
    createProduct
  };
}

/**
 * 抽象工厂模式动画状态
 */
export function useAbstractFactoryAnimation() {
  const selectedFamily = ref<string | null>(null);
  const isCreating = ref(false);

  async function selectFamily(family: string) {
    selectedFamily.value = null;
    isCreating.value = true;
    
    await sleep(100);
    selectedFamily.value = family;
    
    await sleep(600);
    isCreating.value = false;
  }

  return {
    selectedFamily,
    isCreating,
    selectFamily
  };
}

/**
 * 建造者模式动画状态
 */
export function useBuilderAnimation() {
  const buildProgress = ref(0);
  const isBuilding = ref(false);
  const buildSteps = ['buildFoundation()', 'buildWalls()', 'buildRoof()'];

  async function buildStep() {
    if (isBuilding.value || buildProgress.value >= 3) return;
    
    isBuilding.value = true;
    await sleep(400);
    buildProgress.value++;
    isBuilding.value = false;
  }

  function resetBuild() {
    buildProgress.value = 0;
  }

  return {
    buildProgress,
    isBuilding,
    buildSteps,
    buildStep,
    resetBuild
  };
}

/**
 * 原型模式动画状态
 */
export function usePrototypeAnimation() {
  const originalObject = ref<{ name: string } | null>(null);
  const clones = ref<Array<{ id: number }>>([]);
  const isCloning = ref(false);

  function createOriginal() {
    originalObject.value = { name: 'Prototype' };
    clones.value = [];
  }

  async function cloneObject() {
    if (isCloning.value || clones.value.length >= 4) return;
    
    isCloning.value = true;
    await sleep(400);
    clones.value.push({ id: Date.now() });
    isCloning.value = false;
  }

  return {
    originalObject,
    clones,
    isCloning,
    createOriginal,
    cloneObject
  };
}

/**
 * 观察者模式动画状态
 */
export function useObserverAnimation() {
  const subjectState = ref<string>('');
  const isNotifying = ref(false);
  const observers = ref<Array<{ notified: boolean }>>([
    { notified: false },
    { notified: false }
  ]);

  async function updateSubject() {
    if (isNotifying.value) return;
    
    isNotifying.value = true;
    subjectState.value = 'updated';
    
    observers.value.forEach(obs => obs.notified = false);
    
    for (let i = 0; i < observers.value.length; i++) {
      await sleep(300);
      observers.value[i].notified = true;
    }
    
    await sleep(300);
    isNotifying.value = false;
  }

  function subscribeObserver() {
    if (observers.value.length < 4) {
      observers.value.push({ notified: false });
    }
  }

  function unsubscribeObserver() {
    if (observers.value.length > 0) {
      observers.value.pop();
    }
  }

  return {
    subjectState,
    isNotifying,
    observers,
    updateSubject,
    subscribeObserver,
    unsubscribeObserver
  };
}

/**
 * 策略模式动画状态
 */
export function useStrategyAnimation() {
  const selectedStrategy = ref<string>('');
  const strategyResults: Record<string, { 
    icon: string; 
    time: string; 
    color: string; 
    textColor: string; 
    description: string 
  }> = {
    BubbleSort: { 
      icon: '🐢', 
      time: 'O(n²)', 
      color: 'bg-red-100 dark:bg-red-900/30 text-red-700 border-red-300',
      textColor: 'text-red-600',
      description: '冒泡排序：简单但较慢，适合小数据集'
    },
    QuickSort: { 
      icon: '🐇', 
      time: 'O(n log n)', 
      color: 'bg-green-100 dark:bg-green-900/30 text-green-700 border-green-300',
      textColor: 'text-green-600',
      description: '快速排序：高效通用，适合大数据集'
    },
    MergeSort: { 
      icon: '⚖️', 
      time: 'O(n log n)', 
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 border-blue-300',
      textColor: 'text-blue-600',
      description: '归并排序：稳定排序，适合链表和外部排序'
    }
  };

  function selectStrategy(strategy: string) {
    selectedStrategy.value = strategy;
  }

  return {
    selectedStrategy,
    strategyResults,
    selectStrategy
  };
}

/**
 * 装饰器模式动画状态
 */
export function useDecoratorAnimation() {
  const baseComponent = ref(false);
  const activeDecorators = ref<string[]>([]);

  function addBaseComponent() {
    baseComponent.value = true;
    activeDecorators.value = [];
  }

  function addDecorator(decorator: string) {
    if (baseComponent.value && !activeDecorators.value.includes(decorator)) {
      activeDecorators.value.push(decorator);
    }
  }

  function resetDecorators() {
    activeDecorators.value = [];
    baseComponent.value = false;
  }

  function getDecoratorClasses() {
    const classes = [];
    if (activeDecorators.value.includes('Border')) {
      classes.push('border-4 border-blue-400');
    }
    if (activeDecorators.value.includes('Scroll')) {
      classes.push('overflow-y-scroll');
    }
    if (activeDecorators.value.includes('Shadow')) {
      classes.push('shadow-2xl');
    }
    return classes.length > 0 ? classes.join(' ') : 'border-slate-300 bg-slate-100 dark:bg-slate-800';
  }

  return {
    baseComponent,
    activeDecorators,
    addBaseComponent,
    addDecorator,
    resetDecorators,
    getDecoratorClasses
  };
}

/**
 * 适配器模式动画状态
 */
export function useAdapterAnimation() {
  const adapterActive = ref(false);

  function toggleAdapter() {
    adapterActive.value = !adapterActive.value;
  }

  return {
    adapterActive,
    toggleAdapter
  };
}

/**
 * 代理模式动画状态
 */
export function useProxyAnimation() {
  const proxyActive = ref(false);
  const realSubjectLoaded = ref(false);
  const isAccessing = ref(false);

  async function accessThroughProxy() {
    if (isAccessing.value) return;
    
    isAccessing.value = true;
    proxyActive.value = true;
    realSubjectLoaded.value = false;
    
    await sleep(800);
    realSubjectLoaded.value = true;
    
    await sleep(500);
    isAccessing.value = false;
  }

  function toggleProxy() {
    proxyActive.value = !proxyActive.value;
  }

  return {
    proxyActive,
    realSubjectLoaded,
    isAccessing,
    accessThroughProxy,
    toggleProxy
  };
}

/**
 * 桥接模式动画状态
 */
export function useBridgeAnimation() {
  const selectedAbstraction = ref<string>('');
  const selectedImplementation = ref<string>('');

  function selectAbstraction(remote: string) {
    selectedAbstraction.value = remote;
  }

  function selectImplementation(device: string) {
    selectedImplementation.value = device;
  }

  return {
    selectedAbstraction,
    selectedImplementation,
    selectAbstraction,
    selectImplementation
  };
}

/**
 * 组合模式动画状态
 */
export function useCompositeAnimation() {
  const selectedNode = ref<string>('');
  const operationResult = ref<string>('');

  function selectNode(node: string) {
    selectedNode.value = node;
    operationResult.value = '';
  }

  function executeOperation(operation: string) {
    if (!selectedNode.value) {
      operationResult.value = '请先选择节点';
      return;
    }
    if (operation === 'size') {
      operationResult.value = selectedNode.value.startsWith('file') ? '大小: 1KB' : '大小: 10KB (包含子项)';
    } else {
      operationResult.value = `显示: /root/${selectedNode.value}`;
    }
  }

  return {
    selectedNode,
    operationResult,
    selectNode,
    executeOperation
  };
}

/**
 * 外观模式动画状态
 */
export function useFacadeAnimation() {
  const facadeActive = ref(false);
  const isFacadeOperating = ref(false);
  const subsystemsActive = ref([false, false, false]);

  async function activateFacade() {
    if (isFacadeOperating.value) return;
    
    isFacadeOperating.value = true;
    facadeActive.value = true;
    subsystemsActive.value = [false, false, false];
    
    for (let i = 0; i < 3; i++) {
      await sleep(400);
      subsystemsActive.value[i] = true;
    }
    
    await sleep(300);
    isFacadeOperating.value = false;
  }

  return {
    facadeActive,
    isFacadeOperating,
    subsystemsActive,
    activateFacade
  };
}

/**
 * 享元模式动画状态
 */
export function useFlyweightAnimation() {
  const selectedFlyweightColor = ref<string>('');
  const sharedFlyweights = ref<string[]>([]);
  const flyweightTrees = ref<Array<{ id: number; color: string; x: number; y: number }>>([]);

  function createFlyweight(color: string) {
    selectedFlyweightColor.value = color;
    if (!sharedFlyweights.value.includes(color)) {
      sharedFlyweights.value.push(color);
    }
  }

  function createFlyweightWithPosition() {
    if (!selectedFlyweightColor.value) return;
    
    flyweightTrees.value.push({
      id: Date.now(),
      color: selectedFlyweightColor.value,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60
    });
  }

  return {
    selectedFlyweightColor,
    sharedFlyweights,
    flyweightTrees,
    createFlyweight,
    createFlyweightWithPosition
  };
}

/**
 * 责任链模式动画状态
 */
export function useChainOfResponsibilityAnimation() {
  const chainRequestLevel = ref<string>('');
  const chainActiveIndex = ref<number>(-1);
  const chainResult = ref<string>('');
  const isChainProcessing = ref(false);

  async function sendChainRequest(level: string) {
    if (isChainProcessing.value) return;
    
    isChainProcessing.value = true;
    chainRequestLevel.value = level;
    chainActiveIndex.value = -1;
    chainResult.value = '';
    
    const levelIndex = ['Low', 'Medium', 'High'].indexOf(level);
    
    for (let i = 0; i <= levelIndex; i++) {
      await sleep(500);
      chainActiveIndex.value = i;
    }
    
    await sleep(300);
    chainResult.value = ['HandlerA', 'HandlerB', 'HandlerC'][levelIndex];
    isChainProcessing.value = false;
  }

  return {
    chainRequestLevel,
    chainActiveIndex,
    chainResult,
    isChainProcessing,
    sendChainRequest
  };
}

/**
 * 命令模式动画状态
 */
export function useCommandAnimation() {
  const commandQueue = ref<string[]>([]);
  const currentCommandIndex = ref<number>(-1);
  const isExecutingCommands = ref(false);
  const receiverState = ref<'off' | 'on' | 'fan'>('off');

  function addCommand(cmd: string) {
    if (commandQueue.value.length < 4) {
      commandQueue.value.push(cmd);
    }
  }

  async function executeCommands() {
    if (isExecutingCommands.value || commandQueue.value.length === 0) return;
    
    isExecutingCommands.value = true;
    currentCommandIndex.value = -1;
    
    for (let i = 0; i < commandQueue.value.length; i++) {
      currentCommandIndex.value = i;
      await sleep(600);
      
      const cmd = commandQueue.value[i];
      if (cmd === 'LightOn') receiverState.value = 'on';
      else if (cmd === 'LightOff') receiverState.value = 'off';
      else if (cmd === 'FanOn') receiverState.value = 'fan';
    }
    
    await sleep(300);
    isExecutingCommands.value = false;
    currentCommandIndex.value = -1;
  }

  function clearCommands() {
    commandQueue.value = [];
    currentCommandIndex.value = -1;
    receiverState.value = 'off';
  }

  return {
    commandQueue,
    currentCommandIndex,
    isExecutingCommands,
    receiverState,
    addCommand,
    executeCommands,
    clearCommands
  };
}

/**
 * 迭代器模式动画状态
 */
export function useIteratorAnimation() {
  const iteratorItems = ref(['🍎', '🍌', '🍇', '🍊']);
  const iteratorIndex = ref(0);

  function iteratorNext() {
    if (iteratorIndex.value < iteratorItems.value.length) {
      iteratorIndex.value++;
    }
  }

  function resetIterator() {
    iteratorIndex.value = 0;
  }

  return {
    iteratorItems,
    iteratorIndex,
    iteratorNext,
    resetIterator
  };
}

/**
 * 中介者模式动画状态
 */
export function useMediatorAnimation() {
  const activeColleague = ref<string>('');
  const mediatorActive = ref(false);
  const mediatorMessage = ref<string>('');

  async function interactWithColleague(colleague: string) {
    activeColleague.value = colleague;
    mediatorActive.value = true;
    
    const messages: Record<string, string> = {
      'Button': '按钮点击 → 中介者协调更新',
      'TextBox': '文本变化 → 中介者验证输入',
      'ListBox': '列表选择 → 中介者同步数据'
    };
    
    mediatorMessage.value = messages[colleague];
    
    await sleep(1000);
    mediatorActive.value = false;
  }

  return {
    activeColleague,
    mediatorActive,
    mediatorMessage,
    interactWithColleague
  };
}

/**
 * 备忘录模式动画状态
 */
export function useMementoAnimation() {
  const editorContent = ref('Hello');
  const mementos = ref<string[]>([]);
  const currentMementoIndex = ref<number>(-1);

  function editContent() {
    const contents = ['Hello', 'Hello World', 'Hello Design Pattern', 'Hello Qiuyun'];
    const currentIndex = contents.indexOf(editorContent.value);
    editorContent.value = contents[(currentIndex + 1) % contents.length];
  }

  function saveMemento() {
    mementos.value.push(editorContent.value);
    currentMementoIndex.value = mementos.value.length - 1;
  }

  function restoreMemento() {
    if (mementos.value.length > 0 && currentMementoIndex.value >= 0) {
      editorContent.value = mementos.value[currentMementoIndex.value];
    }
  }

  return {
    editorContent,
    mementos,
    currentMementoIndex,
    editContent,
    saveMemento,
    restoreMemento
  };
}

/**
 * 状态模式动画状态
 */
export function useStateAnimation() {
  const currentState = ref<'Draft' | 'Moderation' | 'Published'>('Draft');
  const stateBehaviors: Record<string, { icon: string; action: string; color: string }> = {
    Draft: { icon: '✏️', action: '允许编辑', color: 'text-slate-600' },
    Moderation: { icon: '⏳', action: '等待审核', color: 'text-yellow-600' },
    Published: { icon: '✅', action: '已发布，只读', color: 'text-green-600' }
  };

  function changeState(state: 'Draft' | 'Moderation' | 'Published') {
    currentState.value = state;
  }

  return {
    currentState,
    stateBehaviors,
    changeState
  };
}

/**
 * 模板方法模式动画状态
 */
export function useTemplateMethodAnimation() {
  const selectedTemplateAlgo = ref<string>('');
  const templateSteps = ['openFile()', 'parseFile()', 'analyze()', 'sendReport()'];
  const templateStepIndex = ref(-1);
  const isTemplateRunning = ref(false);

  function selectTemplateAlgorithm(algo: string) {
    selectedTemplateAlgo.value = algo;
    templateStepIndex.value = -1;
  }

  async function runTemplateMethod() {
    if (isTemplateRunning.value || !selectedTemplateAlgo.value) return;
    
    isTemplateRunning.value = true;
    templateStepIndex.value = -1;
    
    for (let i = 0; i < templateSteps.length; i++) {
      await sleep(600);
      templateStepIndex.value = i;
    }
    
    await sleep(300);
    isTemplateRunning.value = false;
  }

  function resetTemplate() {
    templateStepIndex.value = -1;
    isTemplateRunning.value = false;
  }

  return {
    selectedTemplateAlgo,
    templateSteps,
    templateStepIndex,
    isTemplateRunning,
    selectTemplateAlgorithm,
    runTemplateMethod,
    resetTemplate
  };
}

/**
 * 访问者模式动画状态
 */
export function useVisitorAnimation() {
  const activeVisitorElement = ref<string>('');
  const selectedVisitor = ref<string>('');
  const isVisitorRunning = ref(false);
  const visitorResult = ref<{ icon: string; text: string } | null>(null);

  function selectVisitor(visitor: string) {
    selectedVisitor.value = visitor;
    visitorResult.value = null;
  }

  async function executeVisitor() {
    if (isVisitorRunning.value || !selectedVisitor.value) return;
    
    isVisitorRunning.value = true;
    
    await sleep(800);
    
    if (selectedVisitor.value === 'ExportVisitor') {
      visitorResult.value = { icon: '📊', text: '导出为 CSV' };
    } else {
      visitorResult.value = { icon: '📄', text: '导出为 XML' };
    }
    
    isVisitorRunning.value = false;
  }

  return {
    activeVisitorElement,
    selectedVisitor,
    isVisitorRunning,
    visitorResult,
    selectVisitor,
    executeVisitor
  };
}

/**
 * 解释器模式动画状态
 */
export function useInterpreterAnimation() {
  const interpreterExpression = ref<string>('');
  const isInterpreting = ref(false);
  const interpreterResult = ref<number | null>(null);

  function addInterpreterToken(token: string) {
    if (interpreterExpression.value.length < 5) {
      interpreterExpression.value += token;
    }
  }

  function clearInterpreter() {
    interpreterExpression.value = '';
    interpreterResult.value = null;
  }

  async function interpretExpression() {
    if (isInterpreting.value || !interpreterExpression.value) return;
    
    isInterpreting.value = true;
    
    await sleep(800);
    
    if (interpreterExpression.value === '1+2*3') {
      interpreterResult.value = 7;
    } else if (interpreterExpression.value === '1+2') {
      interpreterResult.value = 3;
    } else if (interpreterExpression.value === '2*3') {
      interpreterResult.value = 6;
    } else {
      interpreterResult.value = 42;
    }
    
    isInterpreting.value = false;
  }

  return {
    interpreterExpression,
    isInterpreting,
    interpreterResult,
    addInterpreterToken,
    clearInterpreter,
    interpretExpression
  };
}
