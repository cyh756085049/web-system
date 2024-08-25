### 
一个div块中存在多个块元素，会存在左右滑动，比如一共有6个块元素，页面块中目前只展示3个，第4个只展示一部分，当点击第4个的时候，第四个会滑动到前一个块的位置，后一个移动到当前块的位置，如何实现？

实现你描述的左右滑动效果，通常可以通过以下步骤来实现：

1. **HTML 结构**：确保你有一个包含所有块元素的容器，通常是一个 `<div>` 或者类似的元素。

```html
<div class="container">
    <div class="block">块元素 1</div>
    <div class="block">块元素 2</div>
    <div class="block">块元素 3</div>
    <div class="block">块元素 4</div>
    <div class="block">块元素 5</div>
    <div class="block">块元素 6</div>
</div>
```

2. **CSS 样式**：确保容器有适当的样式来控制宽度和显示区域。

```css
.container {
    width: 100%;
    
    overflow-x: auto; /* 或者使用 overflow-x: scroll; */
    white-space: nowrap; /* 让所有块元素水平排列 */
}

.block {
    display: inline-block;
    width: 200px; /* 设置每个块元素的宽度 */
    height: 200px; /* 设置每个块元素的高度 */
    border: 1px solid #ccc;
}
```

3. **JavaScript 实现**：使用 JavaScript 监听点击事件，以便在点击块元素时进行滑动操作。

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const blocks = document.querySelectorAll('.block');
    blocks.forEach((block, index) => {
        block.addEventListener('click', function() {
            // 计算要滚动到的位置
            const scrollLeft = index * block.offsetWidth;
            
            // 滚动容器到指定位置
            document.querySelector('.container').scrollTo({
                left: scrollLeft,
                behavior: 'smooth'  // 可以选择平滑滚动
            });
        });
    });
});
```

解释：

- **HTML 结构**：包含了所有的块元素，它们会在容器内水平排列。
- **CSS 样式**：`.container` 使用 `overflow-x: auto;` 或 `overflow-x: scroll;` 来允许水平滚动，`.block` 使用 `display: inline-block;` 让它们水平排列。
- **JavaScript 实现**：通过监听每个块元素的点击事件，计算需要滚动到的位置，并使用 `scrollTo` 方法滚动到相应位置。这里使用 `offsetWidth` 来计算每次滚动的距离，确保每个块元素的宽度一致。

这样，当你点击第四个块元素时，页面会滚动，使第四个块元素移动到第三个块元素的位置，后面的块元素相应地向左移动。

### 