### [模拟实现 `Array.prototype.splice` 【字节】](https://github.com/sisterAn/JavaScript-Algorithms/issues/138)
MDN：`splice()` 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。**此方法会改变原数组。**
#### 用法如下：
`array.splice(start)` ：删除数组中从下标 `start` 开始（包含 `start` ）的所有元素
`array.splice(start, deleteCount)` ：删除数组中从下标 `start` 开始（包含 `start` ）的要移除的 `deleteCount` 个数的元素
`array.splice(start, deleteCount, item1, item2, ...)` ：删除数组中从下标 `start` 开始要移除的（包含 `start` ）`deleteCount` 个数的元素，然后在相同位置上插入 `item1`, `item2`, ...
#### 功能分析:
`start` ：可正可负
* 正数表示从下标为 `start` 的位置开始修改；
* 如果 `start >  array.length - 1`，则表示从数组末尾处开始修改；
* 负数表示从数组末位开始的第几位（从 -1 计数，这意味着 `-n` 是倒数第 `n` 个元素并且等价于`array.length-n`）

`deleteCount` ：表示从 `start` 开始要移除的元素个数，省略则表示把 `start` 之后的所有元素都移除，如果是 0 或负数，则不移除元素

`item1, item2, ...` ：要添加进数组的元素,从 `start` 位置开始。如果不指定，则 `splice()` 将只删除数组元素

返回：被删除的元素组成的一个数组。

#### 实现思路：
* 处理 `start` 负数或超出边界问题，计算真实有效的开始位置 `startIndex`
* 处理 `deleteCount` 负数问题，计算真实有效的删除元素个数 `delCount`
* 拷贝删除的 `delCount` 到新数组 `deletedElements` ，用于 `array.splice` 函数返回
* 从 `startIndex` 开始删除 `delCount` 个元素并原地添加 `item1`, `item2`, … （添加元素个数为 `addCount` ）  
  * 如果 `delCount > addCount` （删除的元素个数大于添加元素）：将数组中 `startIndex + delCount` 后的元素向前移动 `delCount - addCount` 个位置，将添加元素拷贝进来 
  * 如果 `delCount = addCount` （删除的元素个数等于添加元素）：直接将添加元素覆盖删除元素即可 
  * 如果 `delCount < addCount` （删除的元素个数小于添加元素）：将数组中 `startIndex + delCount` 后的元素向后移动 `addCount - delCount` 个位置，将元素拷贝进来
* 返回 `deletedElements`

#### 完整代码：
```js
Array.prototype._splice = function (start, deleteCount, ...args) {
    // 入参元素的个数
    let argumentsLen = arguments.length;
    // 数组
    let array = Object(this);
    // 数组长度
    let len = array.length;
    // console.log('arguments', arguments.length, 'array', array);
    // 添加元素个数
    let addCount = argumentsLen > 2 ? argumentsLen - 2 : 0;
    // 计算有效的 start
    let startIndex = computeSpliceStartIndex(start, len);
    // 计算有效的 deleteCount
    let delCount = computeSpliceDeleteCount(startIndex, deleteCount, len);
    // 记录要删除的数组元素
    const deletedElements = recordDeleteElements(startIndex, delCount, array);

    // 密封对象:通常一个对象是可扩展的（可以添加新的属性）。密封一个对象会让这个对象变的不能添加新属性，
    // 且所有已有属性会变的不可配置。属性不可配置的效果就是属性变的不可删除，以及一个数据属性不能被重新定义成为访问器属性，
    // 或者反之。但属性的值仍然可以修改。尝试删除一个密封对象的属性或者将某个密封对象的属性从数据属性转换成访问器属性，
    // 结果会静默失败或抛出TypeError（在严格模式 中最常见的，但不唯一）
    if (delCount !== addCount && Object.isSealed(array)) {
        throw new TypeError('the array is sealed');
    }

    // 冻结对象：数组作为一种对象，被冻结，其元素不能被修改。没有数组元素可以被添加或移除。
    if (delCount > 0 && addCount > 0 && Object.isFrozen(array)) {
        throw new TypeError('the array is frozen');
    }

    // 移动数组元素
    moveElements(startIndex, delCount, array, addCount);
    let i = startIndex;
    // 如果插入新元素，默认为2个参数
    let argumentsIndex = 2;
    while (argumentsIndex < argumentsLen) {
        array[i++] = arguments[argumentsIndex++];
    }

    array.length = len - delCount + addCount;

    // 返回删除元素数组
    return deletedElements;
}

/**
 * 计算真实有效的 start
 * @param start 参数 start
 * @param len 数组长度
 * @return {number|*}
 */
const computeSpliceStartIndex = (start, len) => {
    // 处理负值，如果负数的绝对值大于数组长度，则表示开始位置为 0 位
    if (start < 0) {
        start += len;
        return start < 0 ? 0 : start;
    }
    // 处理超出边界问题
    return start > len - 1 ? len - 1 : start;
}

/**
 * 计算真实的 deleteCount
 * @param startIndex 有效 start
 * @param deleteCount 删除的元素个数
 * @param len 数组长度
 */
const computeSpliceDeleteCount = (startIndex, deleteCount, len) => {
    // 如果删除的元素个数大于从起始位置开始到数组末尾的长度，即超出边界，则将值调整为有效值
    if (deleteCount > len - startIndex) {
        deleteCount = len - startIndex;
    }
    // 负数情况
    if (deleteCount < 0) {
        deleteCount = 0;
    }
    return deleteCount;
}

/**
 * 记录删除的元素，用于结果返回
 * @param startIndex 有效 startIndex
 * @param delCount 有效 deleteCount
 * @param array 原始数组
 */
const recordDeleteElements = (startIndex, delCount, array) => {
    // 记录要删除的数组元素
    let deletedElements = new Array(delCount);
    for (let i = 0; i < delCount; i++) {
        deletedElements[i] = array[startIndex + i];
    }

    return deletedElements;
}

/**
 * 移动数组元素，用于插入新元素
 * @param startIndex
 * @param delCount
 * @param array
 * @param addCount
 */
const moveElements = (startIndex, delCount, array, addCount) => {
    const len = array.length - 1;
    const curIndex = startIndex + delCount;
    let over = addCount - delCount;
    if (over > 0) {
        // 添加元素大于删除元素个数，已有元素后移
        for (let i = len; i >= curIndex; i--) {
            array[i + over] = array[i];
        }
    } else if (over < 0) {
        // 添加元素小于删除元素个数，已有元素前移
        for (let i = curIndex + over; i <= len; i++) {
            // 删除多余的元素
            if (i + Math.abs(over) > len) {
                delete array[i];
                continue;
            }
            array[i] = array[i + Math.abs(over)];
        }
    }
}


// 测试数据
let array = [1, 2, 3, 4, 5];
array._splice(1, 3, 6, 7);

let months = ['Jan', 'March', 'April', 'June'];
months._splice(1, 0, 'Feb');
console.log('array:', array, 'months:', months);
```