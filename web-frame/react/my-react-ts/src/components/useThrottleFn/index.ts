import useToggle from "../useToggle";
import {useMemo} from "react";
import throttle from 'lodash/throttle';
import useLatest from "../useLatest";
import useUnmount from "../useUnmount";

export interface ThrottleOptions {
    wait?: number,
    leading?: boolean,
    trailing?: boolean,
}

type noop = (...args: any[]) => any;

function useThrottleFn<T extends noop>(fn: T, options?: ThrottleOptions) {
    if (typeof fn !== 'function') {
        throw Error(`useThrottleFn expected parameter is a function, got ${typeof fn}`);
    }

    const fnRef = useLatest(fn);

    const wait = options?.wait ?? 1000;

    const throttled = useMemo(() =>
        throttle((...args: Parameters<T>): ReturnType<T> => {
            return fnRef.current(...args);
        },
            wait,
            options,
        ), []);

    useUnmount(() => {
        throttled.cancel();
    })

    return {
        run: throttled,
        cancel: throttled.cancel,
        flush: throttled.flush,
    }
}

export default useThrottleFn;