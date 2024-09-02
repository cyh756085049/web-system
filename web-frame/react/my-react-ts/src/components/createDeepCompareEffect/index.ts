import {DependencyList, useEffect, useLayoutEffect, useRef} from "react";
import isEqual from 'react-fast-compare';

type EffectHookType = typeof useEffect | typeof useLayoutEffect;
type CreateUpdateEffect = (hook: EffectHookType) => EffectHookType;

// https://www.npmjs.com/package/react-fast-compare
const depsEqual = (aDeps: DependencyList = [], bDeps: DependencyList = []) => {
    return isEqual(aDeps, bDeps);
}

/**
 * 思想：通过 ref 保存上一份依赖数据，如果依赖未定义或者当前依赖和上一份依赖数组值不相等，则进行一次更新
 * @param hook
 */
const createDeepCompareEffect: CreateUpdateEffect = (hook) => (effect, deps) => {
    const ref = useRef<DependencyList>();
    const signalRef = useRef<number>(0);

    if (deps === undefined || !depsEqual(deps, ref.current)) {
        ref.current = deps;
        signalRef.current += 1;
    }

    hook(effect, [signalRef.current]);
}

export default createDeepCompareEffect;