### 实现单行省略和多行省略

* 单行省略

```css
 .single-line {
  width: 200px; /* 设置容器的宽度 */
  border: 1px solid #ddd;
  padding: 5px;
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏溢出的内容 */
  text-overflow: ellipsis; /* 使用省略号表示溢出的文本 */
}
```

* 多行省略

```css
.multi-line {
  width: 200px;
  border: 1px solid #ddd;
  padding: 5px;
  display: -webkit-box; /* 使用 WebKit 箱子模型 */
  -webkit-line-clamp: 3; /* 显示的行数 */
  -webkit-box-orient: vertical; /* 设置子元素的排列方向为纵向 */
  overflow: hidden; /* 隐藏溢出的内容 */
  text-overflow: ellipsis; /* 使用省略号表示溢出的文本 */
}
```
