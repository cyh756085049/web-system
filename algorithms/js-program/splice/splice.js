Array.prototype._splice = function (start, deleteCount, ...args) {
    // 入参元素的个数
    let argumentsLen = arguments.length;
    // 数组
    let array = Object(this);
    // 数组长度
    let len = array.length;
    // 添加元素个数
    let addCount = argumentsLen > 2 ? argumentsLen - 2 : 0;
    // 计算有效的 start
    let startIndex = computeSpliceStartIndex(start, len);
    // 计算有效的 delCount
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