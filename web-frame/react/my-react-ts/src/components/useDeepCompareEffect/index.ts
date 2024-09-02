import {useEffect, useLayoutEffect, useRef} from "react";
import createDeepCompareEffect from "../createDeepCompareEffect";

export default createDeepCompareEffect(useEffect);