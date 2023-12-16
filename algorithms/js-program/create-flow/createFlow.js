// 函数方法实现
const createFlow = (effects = []) => {
    const queue = [...effects.flat()];

    console.log('queue', queue);
    const run = async (cb) => {
        for (let task of queue) {
            if (task.isFlow) {
                await task.run();
            } else {
                await task();
            }
        }

        if (cb) cb();
    }

    return {
        run,
        isFlow: true,
    }
}

// 类方法实现
class Flow {
    constructor (effects) {
        this.queue = [...effects.flat()];
    }

    isFlow = true;

    async run(cb) {
        for (let task of this.queue) {
            if (task.isFlow) {
                await task.run();
            } else {
                await task();
            }
        }
        if (cb) cb();
    }
}

const createFlowByClass = (effects = []) => {
    return new Flow(effects);
}

// 测试用例
const delay = (ms) => (
    new Promise((resolve) => setTimeout(resolve, ms))
);

const subFlow = createFlow([() =>
    delay(1000).then(() => console.log('c'))]
);

console.log('函数方式实现：');
createFlow([
    () => console.log('a'),
    () => console.log('b'),
    subFlow,
    [() => delay(1000).then(() =>
        console.log('d')), () => console.log('e')],
]).run(() => {
    console.log('done');
});

console.log('类方式实现：');
createFlowByClass([
    () => console.log('a'),
    () => console.log('b'),
    subFlow,
    [() => delay(1000).then(() =>
        console.log('d')), () => console.log('e')],
]).run(() => {
    console.log('done');
});