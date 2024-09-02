import useBoolean from "../../components/useBoolean";
import {Button} from "antd";
import {useEffect, useRef, useState} from "react";
import useDeepCompareEffect from "../../components/useDeepCompareEffect";

const DeepCompareEffectDemo = () => {
    const [count, setCount] = useState(0);
    const effectCountRef = useRef(0);
    const deepCompareCountRef = useRef(0);

    useEffect(() => {
        effectCountRef.current += 1;
    }, [{}]);

    useDeepCompareEffect(() => {
        deepCompareCountRef.current += 1;
    }, [{}]);

    return (
        <div>
            <h1>effectCount: {effectCountRef.current}</h1>
            <h1>deepCompareCount: {deepCompareCountRef.current}</h1>
            <Button
                type={"primary"}
                onClick={() => { setCount(count => count + 1) }}
            >
                reRender
            </Button>

        </div>
    )
}

export default DeepCompareEffectDemo;