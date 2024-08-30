## react 初始化加载组件会渲染2次

### 原因

由于是使用 create-react-app 脚手架创建项目，默认会开启严格模式，在严格模式下，React 的开发环境会刻意执行两次渲染，用于突出显示潜在问题。

### 解决方案

将入口文件中的严格模式去除
```tsx
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

```
变更为
```tsx
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(<App />);

```

### 严格模式浅析
StrictMode 是一个用来突出显示应用程序中潜在问题的工具。与 Fragment 一样，StrictMode 不会渲染任何可见的 UI。它为其后代元素触发额外的检查和警告。严格模式检查仅在开发模式下运行；它们不会影响生产构建。

严格模式会执行以下检查和优化：

* 检测过时的生命周期方法：React 在未来版本中可能会移除一些过时的生命周期方法。严格模式会在开发中给出警告，帮助你更早地发现和更新你的代码。
* 检测不安全的生命周期方法：在未来的 React 版本中，某些生命周期方法可能会在异步渲染模式下不再保证同步调用。严格模式下，如果你在 render 方法中使用了 setState，会收到一个警告。
* 检测废弃的 context API 使用：严格模式会检查是否存在使用过时的 context API。
* 检测副作用：严格模式会在渲染两次组件并比较结果后，触发额外的渲染以帮助你检测潜在的副作用问题。
* 弃用 findDOMNode 的警告：React 17 已经不再支持在严格模式下使用 findDOMNode，会在开发环境中给出警告。
