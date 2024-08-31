# useLatest

返回当前最新值的 Hook，可以避免闭包问题。

## API

```typescript
const latestValueRef = useLatest<T>(value: T): MutableRefObject<T>;
```
