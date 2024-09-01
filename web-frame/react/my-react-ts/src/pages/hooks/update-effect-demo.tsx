import useBoolean from "../../components/useBoolean";
import {Button, Space} from "antd";
import {useEffect, useState} from "react";
import useUpdateEffect from "../../components/useUpdateEffect";

const BooleanDemo = () => {
    const [count, setCount] = useState(0);
    const [effectCount, setEffectCount] = useState(0);
    const [updateEffectCount, setUpdateEffectCount] = useState(0);

    useEffect(() => {
        setEffectCount(count => count + 1);
    }, [count]);

    useUpdateEffect(() => {
        setUpdateEffectCount(count => count + 1);
    }, [count]);

    return (
        <div>
            <h1>effectCount: {effectCount}</h1>
            <h1>updateEffectCount: {updateEffectCount}</h1>
            <Button
                type={"primary"}
                onClick={() => { setCount(count => count + 1) }}
            >
                reRender
            </Button>

        </div>
    )
}

export default BooleanDemo;