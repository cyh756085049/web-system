// setTimeout(() => console.log(0))
// new Promise((resolve) => {
//     console.log(1)
//     resolve(2)
//     console.log(3)
// }).then(o => console.log(o))
//
// new Promise(resolve => {
//     console.log(4)
//     resolve(5)
// }).then(o => console.log(o)).then(() => console.log(6))
// console.log(8)
// Promise.resolve(7).then(res=>console.log(res)).then(() => console.log(9))

// 商汤科技
const res = (function () {
        new Promise(() => {
            console.log(1);
        }).then(() => {
            console.log(2);
        })

        setTimeout(() => {
            console.log(3);
            new Promise(() => {
                console.log(4);
            }).then(() => {
                console.log(5);
            })
        }, 0)

        setTimeout(() => {
            console.log(6);
        })
    })();

console.log('res', res);