#### 1、[链式访问对象属性，可使用 `?`, 变量选择提供默认值，可通过 `??`](https://github.com/cyh756085049/web-system/blob/main/web-basics/javascript/es6/operator.md)。

#### 2、在方法中，可以将一些类似判空返回的判断提前，优化性能，当判断中的内容不存在时，直接返回，就不需要执行下面的代码了，也可避免 if 中包含大量的逻辑嵌套。

#### 3、重复的对象代码可以用解构赋值或扩展运算符的方式解决，简化代码。

#### 4、避免使用魔法数字、字符串等，可使用常量或者枚举代替，并添加注释，方便维护。

如下代码示例，可以在公共常量中定义，然后根据业务需求进行灵活转换。

```js
// 指标类型
export const INDEX_TYPE_BOXOFFICE = 'boxOffice';
export const INDEX_TYPE_SHOWCOUNT = 'showCount';
export const INDEX_TYPE_VIEWCOUNT = 'viewCount';
export const INDEX_TYPE_SEATCOUNT = 'seatCount';
export const INDEX_TYPE_VIEWSEATRATE = 'viewSeatRate';
export const INDEX_TYPE_AVGPRICE = 'avgPrice';
// 指标类型对应展示名称
export const BOX_INDEX_NAME_MAP = {
  [INDEX_TYPE_BOXOFFICE]: '票房',
  [INDEX_TYPE_SHOWCOUNT]: '场次',
  [INDEX_TYPE_VIEWCOUNT]: '人次',
	[INDEX_TYPE_SEATCOUNT]: '排座数',
  [INDEX_TYPE_VIEWSEATRATE]: '上座率',
  [INDEX_TYPE_AVGPRICE]: '平均票价',
};
// 转化为数组，便于遍历
export const BOX_TYPE_LIST = [...Object.keys(BOX_INDEX_NAME_MAP)].map(type => {
  return {
    type,
    name: BOX_INDEX_NAME_MAP[type],
  };
});
```

#### 5、用 map 映射替换重复判断的 `if else`，符合设计模式中的 `策略模式` 。

优化前：

```js
const res = list.forEach(item => {
  if (item.title === '未任用') {
    item.title = '0';
  } else if (item.title === '已任用') {
    item.title = '1';
  }
  if (item.status === '待反馈') {
    item.status = '0';
  } else if (item.status === '已接受') {
    item.status = '1';
  }
})
```

优化后：

```js
const statusMap = {
  ['待反馈']: '0',
  ['已接受']: '1',
};
const titleMap = {
  ['未任用']: '0',
  ['已任用']: '1',
};

const res = list.forEach(item => {
  item.title = titleMap[item.title];
  item.status = statusMap[item.status];
})
```
#### 6、只有1个 `if else` 且是简单赋值的情况，可以使用三元表达式优化。