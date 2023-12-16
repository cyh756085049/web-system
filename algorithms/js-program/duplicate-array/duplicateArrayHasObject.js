const removeDuplicatesByJsonStringify = (arr) => {
    let map = new Map();
    arr.forEach(item => {
        map.set(JSON.stringify(item), item);
    });
    return [...map.values()];
}

console.log('通过JSON.stringify去重数组:', removeDuplicatesByJsonStringify([123, "meili", "123", "mogu", 123]));
console.log('通过JSON.stringify去重数组:', removeDuplicatesByJsonStringify([123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]));
console.log('通过JSON.stringify去重数组:', removeDuplicatesByJsonStringify([123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]));

const getType = (obj) => {
    const classType = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regexp',
        '[object Object]': 'object',
        '[object Error]': 'error',
        '[object Symbol]': 'symbol',
    };

    if (obj === null) {
        return obj + '';
    }
    const type = Object.prototype.toString.call(obj);
    return classType[type];
}

const isEqual = (element1, element2) => {
    const type1 = getType(element1);
    const type2 = getType(element2);

    if (type1 !== type2) {
        return false;
    }

    if (type1 == 'array') {
        // 判断数组包含的元素个数是否相等
        if (element1.length !== element2.length) {
            return false;
        }
        // 比较两个数组中的每个元素
        return element1.every((item, index) => {
            return isEqual(item, element2[index]);
        })
    }

    if (type1 == 'object') {
        // 获取对象的键值
        const keys1 = Object.keys(element1);
        const keys2 = Object.keys(element2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        return keys1.every(item => {
            return isEqual(element1[item], element2[item]);
        })
    }

    return element1 === element2;
}

const removeDuplicates = (arr) => {
    return arr.reduce((accumulator, current) => {
        const hasIndex = accumulator.findIndex(item => isEqual(current, item));
        if (hasIndex === -1) {
            accumulator.push(current);
        }
        return accumulator;
    }, []);
}

const newArr = [123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili", {a:1, b:2}, {b:2, a:1}];
console.log('含有对象类型的数组去重：', removeDuplicates(newArr)); // [123, {a: 1}, a: {b: 1}, {a: "1"}, "meili", {a: 1, b: 2}]
