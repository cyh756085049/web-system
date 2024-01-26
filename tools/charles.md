# Charles

### Charles是什么

Charles是目前最强大最流行的http抓包调试工具，Mac、Unix、Windows各个平台都支持。特别是做APP开发，调试与服务端的通信，Charles是必备工具。

### Charles工作原理

Charles本质是就是一个http抓包分析工具，将charles设置成代理服务器，这样所有的网络请求都会经过charles。

### Charles 工作场景

场景一：app端内线上环境接口报错，想看看请求数据是否有误

场景二：微信环境内调用微信支付等，需要验证域名（[aaa.bbb.com](https://link.juejin.cn?target=http%3A%2F%2Faaa.bbb.com)）才能调试

场景三：app端内H5，调用jsBridge，和端上通信，本地开发环境压根没有这些jsBridge方法

### Charles下载

**[官网地址](http://www.charlesproxy.com/)**

### [Charles代理&https抓包](https://juejin.cn/post/6845166891594416141)

#### 1、Mac 上安装证书 & https 抓包

Charles 安装完成后，我们只能抓取 `http` 的网址，想要抓 `https` 的包需要安装证书并信任证书，步骤如下：

* 点击 Help -> SSL Proxying -> Install Charles Root Certificate，安装过程中可能会遇到【不能修改“System Roots”钥匙串】提示，导致无法导入证书，可在钥匙串中点击登录，然后再安装，可以成功。
* 安装成功后需要信任证书，在钥匙串中选择 charles 证书，设置信任为始终信任。
* 开启Mac OS proxy，点击 Proxy -> macOS Proxy 开启。
* 把需要代理到域名添加到 SSL Proxying，可通过两种方式：
    * 1、点击Proxy -> SSL Proxying Settings，点击 Add 添加要抓取的 https 域名地址
    * 2、可以直接在 Charles 的 structure 列表中选择要抓取的地址，右键点击，在出现的列表中选择 Enable SSL Proxying，则表示设置为当前的地址抓包。

#### 2、手机安装证书抓包

* 点击 Help -> SSL Proxying -> Install Charles Root Certificate on a Mobile Device or Remote Browser
* 通过提示需要在手机端Wifi添加代理（如Charles本地调试->手机端Wifi添加代理步骤操作）
* 然后在浏览器中输入 `chls.pro/ssl `下载证书。
* 下载完成后，在iOS手机上，打开 设置 -> 通用 -> 关于本机 -> 证书信任设置 -> 将 charles 置为开启状态。
* 把需要代理到域名添加到 SSL Proxying。和Mac 设置SSL Proxying 步骤一致，在 Proxy —> SSL Proxying Settings 中配置地址，如果不想每个域名都设置一次，可以直接把 Host 和 Port 都设为 *，允许抓取所有域名的请求包。

### Charles本地调试

#### 1、手机端Wifi添加代理

前提：手机所连接Wifi要与电脑在同一个局域网内。点击手机设置，找到当前连接的 WiFi，进行如下步骤设置：

* 点击手机连接的Wifi，ios手机可点击当前无线连接的的最右边的i图标，滑动到最底部找到 HTTP 代理进行代理配置。

* 选择配置代理 -> 手动，然后需要填写代理服务器ip和端口
    * IP地址获取方式：1、可以通过电脑端charles查看，选择 Help -> Local IP Address，查看本地IP地址；2、可以通过在终端输入 ` ifconfig | grep inet` 查看
* 端口默认是 8888，可点击 Proxy -> Proxy Settings -> Http Proxy 查看默认端口，也可自己修改端口

#### 2、设置Charles代理

可通过将一个域名映射到本地IP地址，然后可以使用域名代替IP地址进行路径访问，方便在APP中进行调试。如本地IP路径是：`http://172.19.165.195:4000/xxx/cinema-market/index`，使用如下步骤配置的域名映射后可以直接访问：`http://www.baidu.com/xxx/cinema-market/index`

* 点击**Tools -> Map Remote Settings**
* 点击 【Add】 添加一条，From为部署的域名地址（如：`http://www.baidu.com`），to 为本地项目启动地址（如：`http://172.19.165.195:4000`），设置完毕点击OK。
* **Enable Map Remote** 勾选激活 http 代理功能。