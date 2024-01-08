const mergeParamsValue = (params) => {
    return params.reduce((acc, cur) => {
        const exist = acc.find(item => item.name === cur.name);

        if (exist) {
            exist.data = exist?.data?.map((value, index) =>
                value === '' ? cur?.data?.[index] : value);
        } else {
            acc.push(cur);
        }

        return acc;
    }, []);
}

const paramsArr = [
    { name: '今日', data: [14, 34, 21, 54, '', '', ''] },
    { name: '昨日', data: [43, 35, 66, 32, 11, 35, 54] },
    { name: '今日', data: ['', '', '', '', 31, 15, 24] },
    { name: '上周同日', data: [53, 21, 26, 48, 19, 31, 29] },
];

console.log(mergeParamsValue(paramsArr));
