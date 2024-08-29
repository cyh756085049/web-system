import {BaseEvents, EventEmitter} from "./event-emitter";
import {DependencyList, useCallback, useContext, useEffect, useMemo} from "react";
import {EventEmitterContext} from "./event-emitter-rc";

function useEmit<Events extends BaseEvents>() {
    const em = useContext(EventEmitterContext);

    return useCallback(<E extends keyof Events>(type: E, ...args: Events[E]) => {
        console.log('emitter emit: ', type, args);
        em.emit(type, ...args);
    }, [em]);
}

export function useEventEmitter<Events extends BaseEvents>() {
    const emit = useEmit<Events>();

    // 这里使用 useMemo 产生的 emitter 对象的原因是在当前组件树 emitter 仅初始化一次
    const emitter = useMemo(() => new EventEmitter<Events>(), []);

    return {
        useListener: <E extends keyof Events>(
            type: E,
            listener: (...args: Events[E]) => void,
            dps: DependencyList = []
        ) => {
            const em = useContext(EventEmitterContext);

            useEffect(() => {
                em.add(type, listener);

                return () => {
                    em.remove(type, listener);
                }
            }, [listener, type, ...dps]);
        },
        emit,
        emitter,
    };
}