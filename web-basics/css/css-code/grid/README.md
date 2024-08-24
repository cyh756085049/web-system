### css 编写输出一个九宫格



![original_1720408352131_e38328049cbfebed2cfe06309ac929c6](https://p.ipic.vip/0kh8s9.jpg)

```html
<html>
  <style>
    .container {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      width: 600px;
    }

    .flex-style {
      width: 200px;
      height: 200px;
      border: 1px solid #ccc;
      box-sizing: border-box; // 元素的宽度和高度包括内容区域、内边距和边框的尺寸，但不包括外边距
    }
    // ------- grid 格式
     .container {
        display: grid;
        grid-template-columns: 100px 100px 100px;
        gap: 10px;
        width: 300px;
      }

      .item {
        height: 100px;
        border: 1px solid #ccc;
        box-sizing: border-box;
      }
  </style>
  <body>
    <div class="container">
      <div class="flex-style">九宫格1</div>
      <div class="flex-style">九宫格1</div>
      <div class="flex-style">九宫格1</div>
      <div class="flex-style">九宫格1</div>
      <div class="flex-style">九宫格1</div>
      <div class="flex-style">九宫格1</div>
      <div class="flex-style">九宫格1</div>
      <div class="flex-style">九宫格1</div>
      <div class="flex-style">九宫格1</div>
    </div>
  </body>
</html>
```

### 