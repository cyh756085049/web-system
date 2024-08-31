## 通过 `ahooks` 的 `useLatest` 了解 `JavaScript` 中闭包的行为以及 `React` 的状态更新机制

给定以下一个 react 函数组件示例，分析输出结果：

```jsx
import {useEffect, useState} from "react";
import useLatest from "../../components/useLatest";

function useLatest<T>(value: T) {
    const latestRef = useRef(value);
    latestRef.current = value;

    return latestRef;
}

const LatestDemo = () => {
    const [latestCount, setLatestCount] = useState(0);
    const [defaultCount, setDefaultCount] = useState(0);

    const latestCountRef = useLatest(latestCount);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setLatestCount(latestCountRef.current + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setDefaultCount(defaultCount + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    console.log('defaultCount:', defaultCount, ',latestCountRef.current:', latestCountRef.current);

    return (
        <div>
            <h1>获取当前最新值，避免闭包问题</h1>
            <h2>数值count【useLatest】: {latestCount}</h2>
            <h2>数值count【default】：{defaultCount}</h2>
        </div>
    )
}

export default LatestDemo;
```
这段 React 代码展示了如何使用自定义 Hook useLatest 来避免闭包问题，并比较它与普通 useState 的行为。
通过执行上述代码，输出的结果如下：

```shell
defaultCount:0,latestCountRef.current:0
defaultCount:1,latestCountRef.current:1
defaultCount:1,latestCountRef.current:2
defaultCount:1,latestCountRef.current:3
defaultCount:1,latestCountRef.current:4
...
```
<img src="https://p.ipic.vip/a5o4td.png">

通过输出结果，我们可以发现：
* 使用 useLatest 可以确保在定时器回调中获取到最新的状态值，避免了闭包问题。
* 普通 useState 在处理异步更新时可能会受到闭包的影响，使得状态更新不如预期。

### 为什么 defaultCount 不会更新，为什么会产生闭包问题？

要理解为什么 defaultCount 不会更新以及闭包问题的产生原因，我们需要深入探讨 JavaScript 中闭包的行为以及 React 的状态更新机制。

#### 闭包问题概述
在 JavaScript 中，闭包是指一个函数能够“记住”并访问其创建时的作用域中的变量，即使这些变量在函数外部已经超出了作用域。这种特性有时会导致意想不到的行为，特别是在处理异步操作（如定时器、回调函数）时。

#### 闭包与 React 状态
在 React 中，状态更新是异步的。当使用状态更新函数（如 setDefaultCount）时，状态的更新并不会立即生效。相反，React 会将这些更新排队并在适当的时候处理它们。

闭包问题主要在于：
* 函数作用域和闭包：
  * 在上述代码中，useEffect 中的回调函数每秒都会执行一次。这个回调函数是一个闭包，它“捕获”了 defaultCount 的值。
  当 useEffect 执行时，defaultCount 的值是 0。这个值被捕获在回调函数中。

* 状态更新与闭包： 
  * 虽然每秒定时器回调会触发 setDefaultCount(defaultCount + 1)，但是由于闭包的原因，defaultCount 的值仍然是 0。
  这是因为 defaultCount 的值在 useEffect 的回调函数创建时被捕获，所以即使调用了 setDefaultCount，每次回调函数中的 defaultCount 都是 0。

 #### latestCount 正确更新的原因

* latestCountRef 是通过 useLatest Hook 实现的，它是一个对象，其 current 属性始终引用 latestCount 的最新值。
* latestCountRef.current 在每次回调中都指向最新的 latestCount，这避免了闭包问题。 
* 因此，setLatestCount(latestCountRef.current + 1) 每秒钟正确地递增 latestCount。

### 总结
* 闭包：当回调函数捕获了一个状态值，这个状态值在回调函数执行时不会更新，即使状态值在 React 中被更新了。这种情况会导致回调函数中的状态值总是旧的。
*解决方案：使用 useLatest Hook 或类似技术来确保回调函数可以访问最新的状态值。useLatest 利用引用类型（例如 ref）来避免闭包问题，因为 ref 的 .current 属性可以始终引用最新的状态。

通过理解闭包和引用的工作机制，你可以更有效地处理异步操作中的状态更新，避免潜在的错误和不一致。

### 附录
[github 代码示例](https://github.com/cyh756085049/web-system/blob/main/web-frame/react/my-react-ts/src/pages/hooks/latest-demo.tsx)