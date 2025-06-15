/** 
 * 发布订阅模式：核心实现类似 map 方法
 * 发布订阅模式（Publish-Subscribe Pattern）是一种消息传递模式，用于实现对象间的一对多依赖关系。在该模式中，
 * 发布者（Publisher）和订阅者（Subscriber）之间不直接通信，而是通过一个中介（通常称为消息代理、事件总线或主题）来传递消息。
 * 
 * 使用场景：
 * 组件间通信：在复杂的单页应用（SPA）中，不同组件（尤其是非父子关系的组件）之间需要通信。使用发布订阅模式可以避免组件间直接引用，降低耦合度，例如云发行项目的项目权限通信
 * 事件处理：当多个地方需要响应同一个事件（如用户登录、注销、窗口大小改变等）时，可以使用发布订阅模式。订阅者只需要订阅自己关心的事件，而发布者在事件发生时发布即可。例如云发行的全屏操作，PC专业版的echarts图表的曲线变化联动
 * 状态管理：在状态管理库（如Redux、Vuex）中，状态的变化需要通知多个视图更新。Redux的`store.subscribe`方法就是发布订阅模式的应用。
 * 异步操作： 在异步编程中，可以使用发布订阅模式来处理多个异步任务完成后的回调。例如，多个模块需要等待某个数据加载完成后执行操作。
 * 消息通知：在需要广播消息的场景，如实时聊天应用、通知中心等。例如PC专业版顶部的导航栏？
 */
 
class EventBus {
  constructor() {
    this.events = {};
  }

  // 订阅事件，核心实现是初始化订阅数组，并将回调函数依次加入，即一个发布者存在多个订阅者
  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
  }

  // 发布事件，核心实现是执行事件数组中的回调函数
  publish(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => {
        callback.apply(this, args);
      });
    }
  }

  // 取消订阅，核心实现过滤到事件订阅数组中当前事件的回调函数
  unsubscribe(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    }
  }
}

// 创建实例
const eventBus = new EventBus();
// 订阅事件
const callback1 = (data) => console.log('callback1', data);;
const callback2 = (data) => console.log('callback2', data);;
eventBus.subscribe('event1', callback1);
eventBus.subscribe('event1', callback2);

// 发布事件
eventBus.publish('event1', { name: 'ramona', sex: '女' });

// 取消订阅
eventBus.unsubscribe('event1', callback1);

// 重新订阅
eventBus.publish('event1', 'after unscription');


