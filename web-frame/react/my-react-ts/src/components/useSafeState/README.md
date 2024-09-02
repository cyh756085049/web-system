# useSafeState

用法与 `React.useState` 完全一样，但是在组件卸载后异步回调内的 `setState` 不再执行，避免因组件卸载后更新状态而导致的内存泄漏。

## API

```typescript
const [state, setState] = useSafeState(initialState);
```

### 使用场景
常见于异步请求或异步函数执行成功后进行状态更新，当触发某些操作的时候，已经卸载了组件，但异步请求或异步函数还没执行完，使用 useSafeState 可以使得在组件卸载后异步回调内的 `setState` 不再执行，避免因组件卸载后更新状态而导致的内存泄漏。