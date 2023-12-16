const print = (n) => {
    setTimeout(() => {
        console.log('测试', n);
    }, Math.floor(Math.random()) * 1000);
}

//
const print1 = (n) => {
    setTimeout(() => {
        console.log('测试', n);
    }, 1, Math.floor(Math.random()) * 1000);
}

// 修改 setTimeout 第一个函数参数
const print2 = (n) => {
    setTimeout((() => {
        console.log('测试', n);
        return () => {}
    }).call(n), Math.floor(Math.random()) * 1000);
}

const print3 = (n) => {
    setTimeout((() => {
        console.log('测试', n);
    }), Math.floor(Math.random()) * 1000);
}

const resPrint = () => {
    for (let i = 0; i < 100; i++) {
        // print(i);
        // print1(i);
        // print2(i);
        print3(i);
    }
}

resPrint();
