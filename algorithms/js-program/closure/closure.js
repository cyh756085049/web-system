for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000)
}
//输出：1s后输出5个5

for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000)
}

// 输出：1s后输出0,1,2,3,4

for (var i = 0; i < 5; i++) {
    (function(index) {
        setTimeout(function() {
            console.log(index);
        }, 1000);
    })(i);
}
// 输出：1s后输出0,1,2,3,4

for (var i = 0; i < 5; i++) {
    (function(index) {
        setTimeout(function() {
            console.log(index);
        }, 1000 * index);
    })(i);
}
// 输出结果：0,1,2,3,4【每隔1s输出一次】