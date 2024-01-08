### 将数组中元素名称相同的元素进行合并

#### 题目：
在echarts 折现图表中，要实现一条虚实结合的线，需要将相同系列线条名称中的data数据合并，达到虚线和实线结合的效果，如输入如下信息：
```markdown
const paramsArr = [
    { name: '今日', data: [14, 34, 21, 54, '', '', ''] },
    { name: '昨日', data: [43, 35, 66, 32, 11, 35, 54] },
    { name: '今日', data: ['', '', '', '', 31, 15, 24] },
    { name: '上周同日', data: [53, 21, 26, 48, 19, 31, 29] },
];
```
期望通过算法，得到如下结果：
```markdown
const paramsArr = [
    { name: '今日', data: [14, 34, 21, 54, 31, 15, 24] },
    { name: '昨日', data: [43, 35, 66, 32, 11, 35, 54] },
    { name: '上周同日', data: [53, 21, 26, 48, 19, 31, 29] },
];
```

#### 解决方案：
思路：使用 reduce 实现，通过 find 寻找名称相同的元素对象，然后比较元素进行合并。
```js
const mergeParamsValue = (params) => {
    return params.reduce((acc, cur) => {
        const exist = acc.find(item => item.name === cur.name);

        if (exist) {
            exist.data = exist?.data?.map((value, index) =>
                value === '' ? cur?.data?.[index] : value);
        } else {
            acc.push(cur);
        }

        return acc;
    }, []);
}

```