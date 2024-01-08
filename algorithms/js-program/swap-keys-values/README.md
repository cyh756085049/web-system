### 对象的键和值互换算法

输入信息：
```markdown
const object = {
    'box': 'boxOffice',
    'show': 'showCount',
    'seat': 'seatCount',
    'view': 'viewCount',
};
```

实现思路：通过 `Object.entries + reduce` 组合实现

```js
/**
 * @param object 待转换的对象
 * @return {{}} 返回交换后的新对象
 */
const swapObjectKeysAndValues = (object) => {
    const iteratorObj = Object.entries(object);
    return iteratorObj.reduce((newObj, item) => {
        const [key, value] = item;
        newObj[value] = key;
        return newObj;
    }, {});
}
```

输出结果：
```markdown
{
  boxOffice: 'box',
  showCount: 'show',
  seatCount: 'seat',
  viewCount: 'view'
}

```