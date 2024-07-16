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