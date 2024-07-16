### 拷贝

#### 深拷贝
```js
/**
 * 深拷贝
 * @type {{a: number, b: {c: number}}}
 */
// JSON.parse(JSON.stringify(obj)) 实现
let obj1 = {
        a: 1,
        b: {
            c: 2
        }
    }
let obj2 = JSON.parse(JSON.stringify(obj1));
obj2.b.c = 3;
console.log(obj1.b.c); // 2
console.log(obj2.b.c); // 3

/**
 * 递归实现
 * @param obj
 * @param target
 */
function deepClone(obj, target) {
    if (!obj) return;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (Array.isArray(key) || typeof obj[key] === 'object' && obj[key] !== null) {
                target[key] = [];
                deepClone(obj[key], target[key]);
            } else {
                target[key] = obj[key];
            }
        }
    }
    return target;
}
```

#### 浅拷贝
```js
/**
 * 浅拷贝  数组和对象
 * @type {{a: number}}
 */
// 对于对象
let obj1 = {a: 1};
let obj2 = Object.assign({}, obj1);
obj1.a = 2;
console.log(obj1.a); // 2
console.log(obj2.a); // 1
obj2.a = 3;
console.log(obj1.a); // 2
console.log(obj2.a); // 3

// 对于数组
let arr = [1, 2, 3, 4, 5];
// 方式一
let cloneArr = Array.prototype.slice.call(arr);
// 方式二
let cloneArr1 = Array.prototype.concat.call(arr);
arr = [1, 2, 3, 4, 4];
console.log(arr); // [ 1, 2, 3, 4, 4 ]
console.log(cloneArr);  // [ 1, 2, 3, 4, 5 ]
cloneArr = [ 1, 3, 3, 4, 5];
console.log(arr); // [ 1, 2, 3, 4, 4 ]
console.log(cloneArr); // [ 1, 3, 3, 4, 5 ]
```