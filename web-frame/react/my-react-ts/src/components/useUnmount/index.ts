import {useEffect} from "react";
import useLatest from "../useLatest";

const useUnmount = (fn: () => void) => {
   if (typeof fn !== 'function') {
       console.error(`useUnmount excepted parameter is a function, got ${typeof fn}`);
   }

   const fnRef = useLatest(fn);

    useEffect(() => {
        return () => {
            fnRef.current();
        }
    }, []);
}

export default useUnmount;