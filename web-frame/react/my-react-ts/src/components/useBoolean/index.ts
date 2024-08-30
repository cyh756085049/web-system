import useToggle from "../useToggle";
import {useMemo} from "react";

export interface Actions {
    setTrue: () => void;
    setFalse: () => void;
    set: (value: boolean) => void;
    toggle: () => void;
}

function useBoolean(defaultValue = false): [boolean, Actions] {
    const [state, { toggle, set }] = useToggle(!!defaultValue);

    const actions: Actions = useMemo(() => {
        const setTrue = () => set(true);
        const setFalse = () => set(false);

        return {
            toggle,
            set: (value) => set(!!value),
            setTrue,
            setFalse,
        };
    }, []);

    return [state, actions];
}

export default useBoolean;