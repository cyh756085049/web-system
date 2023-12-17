// 判断两个变量是否相等
const is = (value1, value2) => {
    if (!Object.is) {
        if (value1 === value2) {  // +0 -0
            return value1 !== 0 || 1 / value1 === 1 / value2;
        } else {
            // NaN
            return value1 !== value1 && value2 !== value2;
        }
    } else {
        return Object.is(value1, value2);
    }
}

console.log(is(NaN, NaN)); // true
console.log(is(0, -0)); // false
console.log(is(2, 2)); // true
console.log(is(2, 3)); // false