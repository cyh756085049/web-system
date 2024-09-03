import React, {useEffect, useRef, useState} from "react";
import {Button} from "antd";

// @ts-ignore
const Child = ({ log }) => {
    console.log('log', log);
    useEffect(() => {
        console.log('更新了吗');
        const interval = setInterval(log, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return <div />;
}

const Parent = () => {
    const [count, setCount] = useState(0);

    console.log('count', count);
    return (
        <div>
            <Child log={() => {
                console.log('count', count);
            }} />
            <Button
                type={"primary"}
                onClick={() => setCount(count => count + 1)}
            >
                增加count
            </Button>
        </div>
    )
}

export default Parent;