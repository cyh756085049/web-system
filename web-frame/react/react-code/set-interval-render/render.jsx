import React, { useState, useEffect } from "react";

const Child = ({ log }) => {

    useEffect(() => {
        setInterval(log, 1000);
    }, []);

    return <div />;
};

const Parent = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <Child log={() => console.log(count)} />
            <button onClick={() => setCount(1)}>增加Count</button>
        </>
    )
}