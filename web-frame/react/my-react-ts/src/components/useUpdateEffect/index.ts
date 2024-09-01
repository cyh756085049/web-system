import {useEffect, useLayoutEffect, useRef} from "react";
import createUpdateEffect from "../createUpdateEffect";

export default createUpdateEffect(useEffect);