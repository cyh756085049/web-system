import {useRef} from "react";

function useLatest<T>(value: T) {
    const latestRef = useRef(value);
    latestRef.current = value;

    return latestRef;
}

export default useLatest;