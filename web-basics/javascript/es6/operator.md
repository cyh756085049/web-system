## `?、??` 用法

### 背景

```js
Uncaught TypeError: Cannot read properties of undefined (reading 'xxx') at ...
```

前端在项目开发中，经常会遇到对数据访问时的非空判断考虑不全导致的上述报错，而 ES6 提供了一些新的语法方便解决这些问题，不过 它们是在 `ECMAScript 2020` 标准中引入的，因此在旧版本的 JavaScript 中可能不被支持。

### 可选链操作符（`?`）

可选链操作符允许您在访问对象属性或调用函数时，检查中间的属性是否存在或为 `null/undefined`。如果中间的属性不存在或为空，表达式将短路返回 `undefined`，而不会引发错误。

#### 使用场景

* 链式访问对象属性，而不必手动检查每个属性是否存在。
* 调用可能不存在的函数。

示例：

```js
const obj = {
  key: 'ramona',
  movieList: {
    movieName: '',
    url: '',
  }
  list: [{
  	id: '325',
  	name: '',
	}],
};

// 传统写法
const name = obj && obj.movieList && obj.movieList.movieName;
const id = obj && obj.list && obj.list[0] && obj.list[0].id;
// 可选链操作符写法
const name = obj?.movieList?.movieName;
const id = obj?.list?.[0]?.id;
```

### 空值合并操作符 (`??`)

空值合并操作符用于选择性地提供默认值，仅当变量的值为 `null` 或 `undefined` 时，才返回提供的默认值。否则，它将返回变量的实际值。

#### 使用场景

- 提供默认值，而不使用 `falsy` 值（如空字符串、0 等）。
- 在处理可能为 `null` 或 `undefined` 的变量时，选择性地提供备用值。

```js
const foo = null;
const bar = undefined;
const num = 0;
const str = '';
cosnt flag = false;
const nan = NaN;

// 传统写法，除了 null,undefined, 无法兼容0、''、false的情况
const value1 = foo || 'default'; // 'default'
const value2 = bar || 'default'; // 'default'
const value3 = num || 'default'; // 'default'，0 转布尔类型是 false
const value4 = str || 'default'; // 'default'，'' 转布尔类型是 false
const value5 = flag || 'default'; // 'default', 布尔类型 false
const value6 = nan || 'default'; // 'default', 转布尔类型是 false

// 空值合并操作符写法
const value1 = foo ?? 'default'; // 'default'，foo 是 null
const value2 = bar ?? 'default'; // 'default'，bar 是 undefined
const value3 = num ?? 'default'; //  0，num 不是 null 或 undefined
const value4 = str ?? 'default'; //  ''，因为 str 不是 null 或 undefined
const value5 = flag ?? 'default'; // false，因为 flag 不是 null 或 undefined
const value6 = nan || 'default'; // NaN，因为 flag 不是 null 或 undefined
```

