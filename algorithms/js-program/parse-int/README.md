### 手写 `parseInt` 方法【百度】
#### 题目
手写parseInt的实现，把字符串型的数字转化为真正的数字即可，但不能使用JS原生的字符串转数字的API，比如Number()。
返回解析后的整数值，如果被解析参数的第一个字符无法被转化成数值类型，则返回 `NaN`。

如下方法示例：
```js
parseInt('123', 5) // 将'123'看作5进制数，返回十进制数38 => 3*5^0 + 2*5^1 + 1*5^2  = 38
```
其中第一个参数是输入的字符串型数字，第二个参数是表示第一个参数为几进制。

#### 实现代码
```js
const myParseInt = (str, radix) => {
    const type = typeof str;
    // 过滤不为字符串或者数字类型的参数
    if (type !== 'string' && type !== 'number') {
        return NaN;
    }
    // 去掉首尾空格
    str = str.trim();

    // 正则表达式，匹配符号、进制、数值
    const regex = /^(?<fuhao>[\+|\-]*)(?<radix>[0]?[Xx]?)(?<num>[0-9a-fA-F]+)/;

    // 无法匹配返回 NaN
    if (!regex.test(str)) {
        console.log('进这了吗');
        return NaN;
    }

    // 匹配出 字符、进制、数值数组 { fuhao: '', radix: '', num: '123' }
    const groups = str.match(regex).groups;

    // radix 的有效范围为 2 - 36
    if (radix && (radix < 2 && radix > 36)) {
        return NaN;
    }

    // 如果没有指定 radix，groups.radix 为何会有值？
    if (!radix) {
        if (groups.radix.toUpperCase() === '0X') {
            radix = 16;
        } else if (groups.radix === '0') {
            radix = 8;
        } else {
            radix = 10;
        }
    }

    // 解析字符串，如果遇到无法解析时停止解析，返回已经解析好的整数
    const splitArr = groups.num.split('');
    const arr = [];

    for (let i = 0; i < splitArr.length; i++) {
        // 根据 charCode 转换为实际数据，0-9 为 [48-57]，A-F 为 [65-70]
        const charCode = splitArr[i].toUpperCase().charCodeAt();
        let num;

        // 字符为 [A-F] 时, 实际数字为 charCode - 55
        if (charCode >= 65) {
            num = charCode - 55;
        } else {
            // 字符为[0-9]时, 实际数字为charCode - 48
            num = charCode - 48;
        }

        // 当实际数字大于radix时, 无法解析则停止字符串遍历
        if (num > radix) {
            break;
        } else {
            arr.push(num);
        }
    }

    const len = arr.length;
    // 当实际数字数组长度为0时, 返回NaN
    if (!len) {
        return NaN;
    }

    let result = 0;
    for (let i = 0; i < len; i++) {
        const num = arr[i] * Math.pow(radix, len - i - 1);
        result += num;
    }
    return result * (groups.fuhao === '-' ? -1 : 1);
}
```