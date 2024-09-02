import {useEffect, useLayoutEffect, useRef} from "react";

type EffectHookType = typeof useEffect | typeof useLayoutEffect;
type CreateUpdateEffect = (hook: EffectHookType) => EffectHookType;

/**
 * 思想：通过 useRef 定义变量，控制在初始更新渲染的时候不执行，依赖更新之后执行
 * @param hook
 */
const createUpdateEffect: CreateUpdateEffect = (hook) => (effect, deps) => {
    const isMounted = useRef(false);

    hook(() => {
        return () => {
            isMounted.current = false;
        }
    }, []);

    hook(() => {
        if (!isMounted.current) {
            isMounted.current = true;
        } else {
            return effect();
        }
    }, deps);
}

export default createUpdateEffect;