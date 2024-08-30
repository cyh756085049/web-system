import useBoolean from "../../components/useBoolean";
import {Button, Space} from "antd";
import useSafeState from "../../components/useSafeState";
import {useEffect} from "react";

const Child = () => {
    const [value, setValue] = useSafeState<string>();

    useEffect(() => {
        // 模拟接口请求异步数据
        setTimeout(() => {
            setValue('server request data');
        }, 3000);
    }, []);

    const text = value || 'Loading...';

    return (
        <div>{text}</div>
    );
}

const SafeStateDemo = () => {
    const [ state, { toggle } ] = useBoolean(true);

    return (
        <div>
            <h1>当前状态：{`${state}`}</h1>
            <Button type={'primary'} onClick={toggle}>unmount</Button>
            {state && <Child />}
        </div>
    )
}

export default SafeStateDemo;