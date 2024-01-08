/**
 * 对象的键和值互换: Object.entries + reduce 实现
 * @param object 待转换的对象
 * @return {{}} 返回交换后的新对象
 */
const swapObjectKeysAndValues = (object) => {
    const iteratorObj = Object.entries(object);
    return iteratorObj.reduce((newObj, item) => {
        const [key, value] = item;
        newObj[value] = key;
        return newObj;
    }, {});
}

const object = {
    'box': 'boxOffice',
    'show': 'showCount',
    'seat': 'seatCount',
    'view': 'viewCount',
};

console.log('将 object 对象键值互换：', swapObjectKeysAndValues(object));