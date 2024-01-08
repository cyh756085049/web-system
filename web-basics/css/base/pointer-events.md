### 如何做到可点击图片区域下方覆盖的未显示的按钮？

#### 场景：

现在有个图片，图片下方是一些操作按钮（上下重叠），未显示出来，怎么能够点击到按钮呢？

#### 解决方案：

`pointer-events`是一个`CSS`属性，它定义了在何种情况下元素可以成为鼠标事件（或触摸事件）的目标。它有两个特点，1是使直接作用在元素上的鼠标操作失效；2是可以穿透到下层。常用的关键字有 `auto` 和 `none`。

```css
pointer-events: none; // 让一个元素忽略鼠标操作
pointer-events: auto; // 还原浏览器设定的默认行为，默认值
```

`pointer-events: none` 可用于以下几种场景：

* 穿透遮挡物。
* 防止连续操作：点击提交按钮后，为按钮设置该属性，防止连续提交，可参看 [还在用 JS 做节流吗？CSS 也可以防止按钮重复点击 ](https://juejin.cn/post/7165828047520661534)

#### 代码示例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>pointer-events</title>
</head>
<style>
  .wrap {
    width: 100px;
    height: 100px;
    position: relative;
  }

  .area-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 0, 255, .6);
    pointer-events: none;
  }
</style>
<body>
  <div class="wrap">
    <div class="area-mask"></div>
    <button class="button">点击按钮</button>
  </div>
</body>
<script>
  const btn = document.querySelector('.button');
  btn.addEventListener('click', () => {
    console.log('按钮被点击');
  })
</script>
</html>
```

