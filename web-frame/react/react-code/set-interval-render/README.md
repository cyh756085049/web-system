### React 代码输出

```js
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
```

首次执行的时候，child 执行会输出 0，因为子函数 useEffect 没有依赖数组项

当点击按钮的时候，子函数会输出什么？输出也是 0，因为子函数 useEffect 没有依赖数组项？

首先，让我们逐步分析上述代码的执行过程和输出：

##### 初始执行（首次渲染）

1. **首次执行输出**：

    - 当页面首次加载时，`Parent` 组件会被渲染。`Parent` 组件包含一个 `Child` 组件和一个按钮。
    - `Child` 组件会被渲染，并且在 `useEffect` 中会设置一个每秒执行一次的定时器，定时器回调函数是 `log` 函数。
    - `log` 函数在每次被调用时会打印当前的 `count` 值。初始时，`count` 的初始值是 `0`。
    - 因此，首次执行时，`Child` 组件的 `log` 函数会打印 `0`。

   所以，首次执行会输出：0

2. **点击按钮后的输出**：

    - 当点击按钮 `增加Count` 后，`Parent` 组件的状态 `count` 会更新为 `1`。
    - 由于 `Parent` 组件的状态更新会导致整个 `Parent` 组件重新渲染，同时也会重新渲染其子组件 `Child`。
    - 重新渲染 `Child` 组件时，会再次执行 `useEffect`，这会清除之前的定时器，并重新设置一个新的每秒执行一次的定时器。
    - 新的定时器回调函数仍然是 `log` 函数，但此时 `log` 函数中的 `count` 值已经捕获到了更新后的值 `1`。
    - 因此，点击按钮后，每秒执行的定时器会打印更新后的 `count` 值，即 `1`。

   所以，点击按钮后会输出：1。

总结

- **首次执行输出**：`0`
- **点击按钮后的输出**：`1`

这是因为 React 组件的状态更新是异步的，当状态更新后，重新渲染的组件会反映出最新的状态值。在 `useEffect` 中设置的定时器虽然在首次渲染时也会执行一次，但其回调函数捕获的是当时的状态值，在状态更新后，再次执行时会反映最新的状态。