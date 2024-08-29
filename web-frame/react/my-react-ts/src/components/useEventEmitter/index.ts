import React, {useEffect, useRef} from "react";

type Subscription<T> = (val: T) => void;

export class EventEmitter {
    // @ts-ignore
    private subscriptions = new Set<Subscription<T>>();

    // @ts-ignore
    emit = (val: T) => {
        // @ts-ignore
        for (const subscription of this.subscriptions) {
            subscription(val);
        }
    }

    // @ts-ignore
    useSubscription = (callback: Subscription<T>) => {
        // @ts-ignore
        const callbackRef = useRef<Subscription<T>>();
        callbackRef.current = callback;

        useEffect(() => {
            // @ts-ignore
            function subscription(val: T) {
                if (callbackRef.current) {
                    callbackRef.current(val);
                }
            }

            this.subscriptions.add(subscription);
            return () => {
                this.subscriptions.delete(subscription);
            }
        }, []);
    }
}

export default function useEventEmitter<T = void>() {
    const ref = useRef<EventEmitter>();
    if (!ref.current) {
        ref.current = new EventEmitter();
    }

    return ref.current;
}