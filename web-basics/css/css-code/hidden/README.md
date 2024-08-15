### 隐藏一个元素方案
* [`display: none`](https://github.com/cyh756085049/web-system/blob/main/web-basics/css/css-code/hidden/hidden.html)

**效果**：完全从布局中移除元素，元素不占据任何空间。

**适用场景**：当你希望元素完全从页面上消失，不占用任何空间时使用此方法。

* [`visibility: hidden`](https://github.com/cyh756085049/web-system/blob/main/web-basics/css/css-code/hidden/hidden.html)

**效果**：元素依然存在于布局中，但它不可见，仍然占据空间。

**适用场景**：当你希望元素在视觉上不可见但保持其占用的空间时使用此方法。

*[ 使用 `opacity: 0`](https://github.com/cyh756085049/web-system/blob/main/web-basics/css/css-code/hidden/hidden.html)

**效果**：元素完全透明，仍然占据空间，并且可以通过点击等交互进行操作（尽管不可见）。

**适用场景**：当你希望元素在视觉上不可见，但需要保持其空间和交互功能时使用此方法。

* [使用 `position: absolute` 和 `left: -9999px`](https://github.com/cyh756085049/web-system/blob/main/web-basics/css/css-code/hidden/hidden.html)

**效果**：元素被移到视口之外，用户无法看到它，也不会占据页面空间。

**适用场景**：当你希望元素在视口之外并且不影响页面布局时使用此方法。

* [使用 `height` 和 `overflow`](https://github.com/cyh756085049/web-system/blob/main/web-basics/css/css-code/hidden/hidden.html)

**效果**：将元素的高度设置为 `0` 并隐藏溢出内容。这种方法将元素的可见部分隐藏，但仍会占用一些空间。

**适用场景**：当你希望隐藏元素的内容，但不完全移除其占用空间时使用此方法。

* [使用 `clip-path: inset(100%)` (较少见)](https://github.com/cyh756085049/web-system/blob/main/web-basics/css/css-code/hidden/hidden.html)

**效果**：使用 `clip-path` 将元素裁剪到视口外部。元素仍然存在于 DOM 中，但不可见。

**适用场景**：适用于一些特殊的布局需求，通常不如前面的方法直观。
