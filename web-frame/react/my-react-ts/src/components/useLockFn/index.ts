import useUnmountedRef from "../useUnmountedRef";
import {useCallback, useRef} from "react";

function useLockFn<P extends any[] = any[], V = any>(fn: (...args: P) => Promise<V>) {
    const lockRef = useRef(false);

    return useCallback(async(...args: P) => {
        if (lockRef.current) {
            return;
        }

        console.log('lockRef.current', lockRef.current);
        try {
            const res = await fn(...args);
            return res;
        } catch (e) {
            throw e;
        } finally {
            lockRef.current = false;
        }
    }, [fn]);
}

export default useLockFn;