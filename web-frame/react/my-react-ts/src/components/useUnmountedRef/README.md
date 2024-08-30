---
nav:
  path: /hooks
---

# useUnmountedRef

获取当前组件是否已经卸载的 Hook。

## API

```typescript
const unmountRef: { current: boolean } = useUnmountedRef();
```

### Result

| 参数       | 说明             | 类型                   |
| ---------- | ---------------- | ---------------------- |
| unmountRef | 组件是否已经卸载 | `{ current: boolean }` |
