/**
 * 模拟实现instanceof
 * @param L
 * @param R
 * @returns {boolean}
 */
function instanceOf(L, R) {
    // 使用Object.getPrototypeOf()可以方便获取到一个对象的原型
    // 或者判断 R.prototype.isPrototypeOf(L)
    let protoChain = Object.getPrototypeOf(L);
    const Lprototype = R.prototype;
    // 最坏递归到Object.prototype === null
    while (protoChain) {
        // 两个对象指向同一个内存地址，则为同一对象
        if (protoChain === Lprototype) {
            return true;
        }
        protoChain = Object.getPrototypeOf(protoChain);
    }
    // 找到终点没找到，就没找到
    return false;
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}

function Anmial(name) {
    this.name = name;
}

let anmial = new Anmial("tiger");
let person = new Person("ramona", 24);

console.log(instanceOf(person, Person));
console.log(instanceOf(anmial, Person));