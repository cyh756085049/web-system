let p1 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve('12')
        }, 1000)
    })
}

let p2 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve(2)
        }, 2000)
    })
}

let p3 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve(3)
        }, 1000)
    })
}

// 方法1
function promiseAll(tasks) {
    let arr = new Array(tasks.length).fill(1).map(item => {
        return {val: undefined, success: false}
    });
    console.log(arr);
    return new Promise((resolve, reject) => {
        for (let i = 0; i < tasks.length; i++) {
            tasks[i]().then(res => {
                arr[i].val = res;
                arr[i].success = true;
                if (arr.every(item => item.success === true)) {
                    resolve(arr.map(item => item.val))
                }
            }).catch(err => {
                reject(err);
            })
        }
    })
}

// 方法2
function promiseAll1(promiseArray) {
    return new Promise(function (resolve, reject) {
        if (Array.isArray(promiseArray)) {
            return reject(new Error("Promise must be an array"));
        }
        let resolveCount = 0;
        let promiseNum = promiseArray.length;
        let resolveValue = [];
        for (let i = 0; i < promiseNum; i++) {
            Promise.resolve(promiseArray[i]).then(
                (value)  => {
                    resolveValue[i] = value;
                    resolveCount++;
                    if (resolveCount === promiseNum) {
                        return resolveValue;
                    }
                },
                (reason) => {
                    return reject(reason);
                }
            )
        }
    })
}

promiseAll([p1, p2, p3]).then(res => console.log(res)).catch(err => {
    console.log(err);
})