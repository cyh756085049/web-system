### 模拟实现 `localStorage` 方法
#### 分析 `localStorage` 特性
* `storage` 接口包含的 `api`
```js
getItem(key)
setItem(key, value)
removeItem(key)
clear()
key(index)
length: readonly
```
* 可实现**持久化存储**，刷新、关闭页面依然存在
* 键值对总是以**字符串的形式**存储 `key.toString()`、`value.toString()`
```js
localStorage.setItem('pzijun', 100)
localStorage.getItem('pzijun') // "100"

var a = {a: 1}
localStorage.setItem(a, {a:1})
localStorage.getItem(a) // "[object Object]"

var b = {}
localStorage.setItem(b, '11')
localStorage.getItem(b) // "11"
localStorage.getItem(a) // "11"
```
* same-origin rules 特定于页面的协议，以及隐身模式等的区别。
当浏览器进入隐身模式(private browsing mode)的时候，会创建一个新的、临时的、空的数据库，用以存储本地数据(local storage data)。当浏览器关闭时，里面的所有数据都将被丢弃。

#### 模拟实现方案
1、实现 `storage` 的基础 `api` 功能
```js
// 实现 storage 基础 api
const myLocalStorage = (() => {
    let store = {};

    return {
        getItem: (key) => {
            const expireDate = store[`${key}_expires`];
            if (expireDate && new Date() > new Date(Number(expireDate))) {
                delete store[key];
                delete store[`${key}_expires`];
            }
            return store[key] || null;
        },
        setItem: (key, value, expires) => {
            if (typeof expires !== 'undefined') {
                const expiresDate = new Date(expires).valueOf();
                store[`${key}_expires`] = expiresDate;
            }
            store[key] = value.toString();
        },
        removeItem: (key) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        }
    }
})();

Object.defineProperty(window, 'myLocalStorage', { value: localStorage });

myLocalStorage.setItem('ramona', 1001);
myLocalStorage.getItem('ramona'); // '1001'
myLocalStorage.removeItem('ramona');
const key = { name: 'ramona' };
myLocalStorage.setItem(key, 'chen');
myLocalStorage.getItem(key); // 'chen'
let key2 = {}
localStorage.setItem(key2, '11')
localStorage.getItem(key2); // "11"
localStorage.getItem(key); // "11"
myLocalStorage.clear();
```
2、使用 `cookie` 模拟 `localStorage` 
```js
const myLocalStorageByCookie = (() => {
    const getCookies = () => {
        return document.cookie.match(/([^;=]+)=(^;=)+/g) || [];
    }

    const thousandYears = 1e3 * 365 * 24 * 36*5;
    const getExpires = (flag) => {
        flag = flag || 1;
        return `expires=${(new Date((+new Date()) + thousandYears * flag)).toUTCString()}`;
    }

    const setItem = (key, value, isExpired) => {
        document.cookie = [
            `${key}=${encodeURIComponent((value))}`,
            getExpires(isExpired ? -1 : 1),
            'path=/'
        ].join('; ');
    };
    const getItem = (key) => {
       const cookies = getCookies();
       for (let i = 0; i < cookies.length; i++) {
           const params = cookies[i].match(/^\s*([^=]+)=(.+)/);
           console.log('params', params);
           if (params[1] === key.toString()) {
               return decodeURIComponent(params[1]);
           }
       }

       return null;
    };
    const removeItem = (key) => {
        setItem(key, '', true);
    }

    const clear = () => {
        const cookies = getCookies();
        for (let i = 0; i < cookies.length; i++) {
            const key = cookies[i].match(/^s*([^=]+)/)[1];
            removeItem(key);
        }
    }

    return {
        getItem,
        setItem,
        removeItem,
        clear,
    }
})();

Object.defineProperty(window, 'myLocalStorage', { value: myLocalStorageByCookie });
```