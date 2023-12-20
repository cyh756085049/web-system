const mostCharInstr = (str) => {
    const map = new Map();
    let max = 1;
    let res = str[0];
    for (let i = 0; i < str.length; i++)  {
        if (map.has(str[i])) {
            const count = map.get(str[i]) + 1;
            if (count > max) {
                max = count;
                res = str[i];
            }
        } else {
            map.set(str[i], 1);
        }
    }

    console.log(max, res);

    return { res, max };
}

const str = 'agjxnfadfcf';
console.log(mostCharInstr(str));