console.log('5' + 2); // 52
console.log('2' + '2'); // 22
console.log('false' == false); // false
console.log(0 == false); // true
console.log(0 === false); // false
console.log(true + 1 == 2); // true
console.log('true + 1 === 2', true + 1 === 2); // false
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(![]); // false

const flag = () => {
    if ([]) {
        return true;
    } else {
        return false;
    }
}

console.log(flag()); // true