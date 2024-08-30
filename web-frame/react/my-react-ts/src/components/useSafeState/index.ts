import useUnmountedRef from "../useUnmountedRef";
import {Dispatch, SetStateAction, useCallback, useState} from "react";

function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

function useSafeState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>]

function useSafeState<S>(initialState?: S | (() => S)) {
    // 判断组件是否卸载
    const unmountedRef = useUnmountedRef();
    const [state, setState] = useState(initialState);

    //
    const setCurrentState = useCallback((currentValue: S | (() => S)) => {
        // 组件已经卸载，则不更新状态
        if (unmountedRef.current) {
            return;
        }

        setState(currentValue);
    }, []);

    return [state, setCurrentState];
}

export default useSafeState;