type EventType = string | number;

export type BaseEvents = Record<EventType, any>;

/**
 * 事件总线
 * 实际上就是发布订阅模式的一种简单实现
 * 类型定义受到 {@link https://github.com/andywer/typed-emitter/blob/master/index.d.ts} 的启发，不过只需要声明参数就好了，而不需要返回值（应该是 {@code void}）
 */
export class EventEmitter<Events extends BaseEvents> {
    private readonly events = new Map<keyof Events, Function[]>();

    /**
     * 添加一个事件监听程序
     * @param type 监听类型
     * @param callback 回调函数
     * @returns {@code this}
     */
    add<E extends keyof Events>(type: E, callback: (...args: Events[E]) => void) {
        const callbacks = this.events.get(type) || [];

        callbacks.push(callback);
        this.events.set(type, callbacks);

        return this;
    }

    /**
     * 移除一个事件监听
     * @param type 监听类型
     * @param callback 回调函数
     * @returns {@code this}
     */
    remove<E extends keyof Events>(type: E, callback: (...args: Events[E]) => void) {
        const callbacks = this.events.get(type) || [];
        this.events.set(type, callbacks.filter((fn: any) => fn !== callbacks));

        return this;
    }

    /**
     * 移除一类事件监听程序
     * @param type 监听类型
     * @returns {@code this}
     */
    removeByType<E extends keyof Events>(type: E) {
        this.events.delete(type);

        return this;
    }

    /**
     * 触发一类事件监听程序
     * @param type 监听类型
     * @param args 处理回调需要的参数
     * @returns {@code this}
     */
    emit<E extends keyof Events>(type: E, ...args: Events[E]) {
        const callbacks = this.events.get(type) || [];

        callbacks.forEach(fn => {
            fn(...args);
        })

        return this;
    }

    /**
     * 获取一类事件监听程序
     * @param type 监听类型
     * @returns 一个只读的数组，如果找不到，则返回空数组 {@code []}
     */
    listeners<E extends keyof Events>(type: E) {
        return Object.freeze(this.events.get(type) || []);
    }

}