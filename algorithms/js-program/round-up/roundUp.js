const roundUp = (num) => {
    const str = parseInt(num).toString();
    const len = str.length;

    const firstDigit = parseInt(str[0]) + 1;
    return firstDigit * Math.pow(10, len - 1);
}

const num = 14.5;
console.log(roundUp(num));
