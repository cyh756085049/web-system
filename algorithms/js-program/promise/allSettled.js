// 捕获每个 Promise 的错误并汇总结果
function allSettled(promises) {
    return Promise.all(promises.map(p =>
        p.then(
            value => ({ status: 'fulfilled', value }),
            reason => ({ status: 'rejected', reason }),
        )
    ));
}

const promise1 = Promise.resolve(1);
const promise2 = Promise.reject(new Error('Failed'));
const promise3 = Promise.resolve(3);

allSettled([promise1, promise2, promise3]).then(res => {
    console.log('res', res);
})

// 在所有 Promises 成功的情况下返回结果，并在遇到失败时采取其他行动（例如重试、记录错误等）
function retryPromise(promiseFn, retries = 3) {
    return promiseFn().catch(error => {
        if (retries > 0) {
            return retryPromise(promiseFn, retries - 1);
        }

        throw Error;
    })
}

function allPromise(promises) {
    return Promise.all(
        promises.map(
            p => retryPromise(() => p)
            .then(value => ({ status: 'fulfilled', value }))
            .catch(reason => ({ status: 'rejected', reason }))
    ));
}

allPromise([promise1, promise2, promise3]).then(results => {
    console.log('results', results);
    const allSuccessful = results.every(result => result.status === 'fulfilled');

    if (allSuccessful) {
        console.log('All promises succeeded:', results.map(r => r.value));
    } else {
        console.log('Some promises failed:', results);
    }
});

// 直接使用 Promise.allSettled
Promise.allSettled([promise1, promise2, promise3]).then(results => {
    const allSuccessful = results.every(result => result.status === 'fulfilled');

    if (allSuccessful) {
        console.log('All promises succeeded:', results.map(r => r.value));
    } else {
        console.log('Some promises failed:', results);
    }
})
