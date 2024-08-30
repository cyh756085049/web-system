import useBoolean from "../../components/useBoolean";
import {Button, message, Space} from "antd";
import useSafeState from "../../components/useSafeState";
import {useEffect, useState} from "react";
import useLockFn from "../../components/useLockFn";

const mockApiRequest = () => {
    return new Promise<void>((resolve) => {
       setTimeout(() => {
          resolve();
       }, 2000);
    });
}

const LockFnDemo = () => {
    const [count, setCount] = useState(0);

    const submit = useLockFn(async() => {
        message.info('start submit');
        await mockApiRequest();

        setCount(val => val + 1);
        message.success('submit finished');
    });

    return (
        <div>
            <p>提交数量：{count}</p>
            <Button type={'primary'} onClick={submit}>submit</Button>
        </div>
    )
}

export default LockFnDemo;