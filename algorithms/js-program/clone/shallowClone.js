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