### 前端字体知识点

#### 字体包的常见格式

| 字体类型                      | 描述                                                         | 大小 |
| ----------------------------- | ------------------------------------------------------------ | ---- |
| `ttf（True Type Format）`     | `Windows` 和 `Mac` 系统最常用的字体格式，其最大的特点就是它是由一种数学模式来进行定义的基于轮廓技术的字体，这使得它们比基于矢量的字体更容易处理，保证了屏幕与打印输出的一致性。同时，这类字体和矢量字体一样可以随意缩放、旋转而不必担心会出现锯齿。 |      |
| `otf (Open Type Format)`      | `OpenType` 是微软和 `Adobe` 共同开发的字体，微软的 `IE` 浏览器全部采用这种字体。致力于替代 `TrueType` 字体。 | 6.6M |
| `woff (Web Open Type Format)` | `WOFF`（`Web` 开发字体格式）是一种专门为了 `Web` 而设计的字体格式标准，实际上是对于 `TrueType/OpenType` 等字体格式的封装，每个字体文件中含有字体以及针对字体的元数据（`Metadata`），字体文件被压缩，以便于网络传输。 | 5.6M |
| `woff2 (woff 的升级)`         | `WOFF 2` 标准在 `WOFF1` 的基础上，进一步优化了体积压缩，带宽需求更少，同时可以在移动设备上快速解压。与 `WOFF 1.0` 中使用的 `Flate` 压缩相比，`WOFF 2.0` 是使用 `Brotli` 方法进行的压缩，压缩率更高，所以文件体积更小。 | 4M   |

通过上面的对比，我们可以发现，`woff2` 应该是我们开发需要采用的。 一般 `UI` 只会给我们 `ttf` 或者 `otf` 的字体包，这个时候我们就需要自己去转换字体格式，推荐大家使用这个在线网站：[otf 转 woff](https://link.juejin.cn/?target=https%3A%2F%2Fconvert2.cn%2Fotf-to-woff) 、 [woff 转 woff2](https://link.juejin.cn/?target=https%3A%2F%2Fconvert2.cn%2Fwoff-to-woff2)

#### 前端项目中如何使用自定义字体

* 如果是文件包可直接放在静态资源目录下进行路径加载
* 使用 `CDN` 链接，直接引用

可以在项目中新建一个 `font.css` 文件，引入字体包，如下示例：

```css
@font-face {
  font-family: "MaoYanHeiTi-Regular";
  src: url("https://xxx.otf");
  font-style: normal;
  font-weight: normal;
}
```

#### 一些 tips

常见的 苹方（`PingFang SC`） 字体在 是 `mac` 和 `ios` 默认的中文字体， `windows` 系统上默认是没有安装的。

常见的 微软雅黑（`Microsoft Yahei`） 字体在 是 `windows` 默认的中文字体， `mac` 系统上默认是没有安装的。

**如果我们设置 `font-family: "PingFang FC", "Microsoft Yahei";` 会怎么生效？**

`font-family` 属性可以同时指定多个字体，第一个不满足时就会使用第二个在 `mac` 上展示苹方字体，在 `windows` 上展示微软雅黑，基于上面两条，这个答案是不言而喻的。

**前端项目里应该使用哪种格式的字体？**

当然优先采用 `woff2`，体积更小、性能更好

**`gzip` 对哪些格式的字体生效？**
`gzip` 对 `woff`、`woff2` 不生效，因为其本身已经是压缩过的，其他 `otf`、`ttf`、`svg` 等格式配置 `gzip` 会生效

参考

> 作者：程序媛最可爱
> 链接：https://juejin.cn/post/7293122002729140239
> 来源：稀土掘金

