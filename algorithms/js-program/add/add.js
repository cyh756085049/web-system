const add = (...args) => {

    console.log('args', args);
    const _add = (...newArgs) => {
        return add(...args, ...newArgs);
    }

    console.log('走到这', args);
    _add.value = () => args.reduce((previousValue, currentValue) => previousValue + currentValue);

    return _add;
}

console.log(add(1)(2,3)(4).value());