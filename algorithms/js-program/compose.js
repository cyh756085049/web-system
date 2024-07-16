/**
 * 函数组合
 * @param args
 * @returns {function(*=): *}
 */
function compose(...args) {
    return (subArgs) => {
        return args.reverse().reduce((acc, func, index) => {
            return func(acc);
        }, subArgs);
    }
}

