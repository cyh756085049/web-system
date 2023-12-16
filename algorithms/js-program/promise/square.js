const list = [1, 2, 3, 4];
const square = num => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num * num);
        }, 1000);
    })
}

const test = () => {
    list.forEach(async num => {
        const res = await square(num);
        console.log(res);
    })
}

test();

const newTest1 = async () => {
    for (let i = 0; i < list.length; i++) {
        const res = await square(list[i]);
        console.log(res);
    }
}

// newTest1();

const newTest2 = async () => {
    for (let num of list) {
        const res = await square(num);
        console.log(res);
    }
}

// newTest2();

const newTest3 = () => {
    let promise = Promise.resolve();
    list.forEach(num => {
        promise = promise.then(() => square(num)).then(res => console.log(res));
    })
}

// newTest3();