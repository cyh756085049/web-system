const mySetInterval = (callback, interval) => {
    const execute = () => {
        if (callback && typeof callback === 'function') {
            callback();
        }
        setTimeout(execute, interval);
    }

    setTimeout(execute, interval);
}

const print = () => {
    console.log('hello world');
}

mySetInterval(print, 1000);

