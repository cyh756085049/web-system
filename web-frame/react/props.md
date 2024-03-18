### 什么可以作为 React props?

```js
 <PropsComponent  
   mes={this.state.mes}  // ① props 作为一个渲染数据源
   say={ this.say  }     // ② props 作为一个回调函数 callback
   Component={ ChidrenComponent } // ③ props 作为一个组件
   renderName={ ()=><div> ramona </div> } // ④ props 作为渲染函数
>
    { ()=> <div>hello,world</div>  } { /* ⑤render props */ }
    <ChidrenComponent />             { /* ⑥render component */ }
</PropsComponent>
```

- ① props 可作为一个子组件渲染数据源。
- ② props 可作为一个通知父组件的回调函数。
- ③ props 可作为一个单纯的组件传递。
- ④ props 作为渲染函数。
- ⑤ render props ， 和④的区别是放在了 children 属性上。
- ⑥ render component 插槽组件。

### React 如何监听 props 变化？

* **类组件中**： `componentWillReceiveProps` 可以作为监听 `props` 的生命周期，不过不推荐使用，这个生命周期超越了 `React` 的可控制的范围内，未来会废弃掉，出现了这个生命周期的替代方案 `getDerivedStateFromProps` 。
* **函数组件中**：可以用 `useEffect` 来作为 `props` 改变后的监听函数。

### 