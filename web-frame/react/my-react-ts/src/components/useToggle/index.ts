import {useMemo, useState} from "react";

export interface Actions<T> {
    setLeft: () => void;
    setRight: () => void;
    set: (value: T) => void;
    toggle: () => void;
}

function useToggle<T = boolean>(): [boolean, Actions<T>];

function useToggle<T>(defaultValue: T): [T, Actions<T>];

function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Actions<T | U>];

function useToggle<D, R>(defaultValue: D = false as unknown as D, reverseValue?: R) {
    const [state, setState] = useState<D | R>(defaultValue);

    const actions = useMemo(() => {
        // 默认值的反值
        const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R;

        // 切换
        const toggle = () => setState(state => (state === defaultValue ? reverseValueOrigin : defaultValue));

        // 更新值
        const set = (value: D | R) => setState(value);

        const setLeft = () => setState(defaultValue);

        const setRight = () => setState(reverseValueOrigin);

        return {
            toggle,
            set,
            setLeft,
            setRight,
        };
    }, []);

    return [state, actions];
}

export default useToggle;