import {useEffect, useState} from "react";
import useLatest from "../../components/useLatest";

const LatestDemo = () => {
    const [latestCount, setLatestCount] = useState(0);
    const [defaultCount, setDefaultCount] = useState(0);
    const [updateCount, setUpdateCount] = useState(0);

    const latestCountRef = useLatest(latestCount);

    /**
     * 通过 latestCountRef.current 拿到的始终是最新值，因为 latestCountRef 是通过ref保存的
     */
    useEffect(() => {
        const interval = setInterval(() => {
            setLatestCount(latestCountRef.current + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    /**
     * 默认值 defaultCount = 0，使用 interval 更新，每 1s 更新一次，第一次更新后
     * defaultCount = 1，因 useEffect 的依赖项是空数组，所以之后的每 1s 更新，
     *  setDefaultCount 更新后，defaultCount 始终为1
     */
    useEffect(() => {
        const interval = setInterval(() => {
            setDefaultCount(defaultCount + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    // 改造：将 defaultCount 作为依赖项，使用 setTimeout 作为回调函数，模拟 setInterval 每1s 更新一次
    useEffect(() => {
        const timer = setTimeout(() => {
            setUpdateCount(updateCount + 1);
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    }, [updateCount]);

    console.log(
        'defaultCount:', defaultCount,
        'latestCountRef.current:', latestCountRef.current,
        'updateCount:', updateCount
    );

    return (
        <div>
            <h1>获取当前最新值，避免闭包问题</h1>
            <h2>数值count【useLatest】: {latestCount}</h2>
            <h2>数值count【default】：{defaultCount}</h2>
            <h2>数值count【update + deps】：{updateCount}</h2>
        </div>
    )
}

export default LatestDemo;