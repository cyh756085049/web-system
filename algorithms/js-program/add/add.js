const add = (...args) => {
    const _add = (...newArgs) => {
        return add(...args, ...newArgs);
    }

    _add.value = () => args.reduce((previousValue, currentValue) => previousValue + currentValue);

    return _add;
}

console.log(add(1)(2,3)(4).value());