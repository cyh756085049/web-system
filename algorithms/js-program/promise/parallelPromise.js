/**
 * 多个Promise 串行执行
 * @param tasks
 * @returns {*}
 */
// 方法1
function parallelPromise(tasks) {
    let result = [];
    return tasks.reduce((accumulator, item, index) => {
        return accumulator.then(res => {
            item = typeof item === 'function' ? item() : item;
            return item.then(res => {
                result[index] = res;
                return index === tasks.length - 1 ? result : item;
            })
        })
    }, Promise.resolve())
}


// 方法2
async function parallelPromise1(tasks) {
    let array = [];
    for (let task of tasks) {
        let tmp = await task();
        array.push(tmp);
    }
    return array;
}

// https://juejin.im/post/6844904013222117390
