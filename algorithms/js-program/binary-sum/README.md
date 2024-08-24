### 计算两个二进制字符串的和，结果也是二进制形式

![original_1720410172847_524cf2d6baba22360c29def7425c54e3](https://p.ipic.vip/w1h15y.jpg)

```js
/**
 * 
 * @param {*} a 11
 * @param {*} b 1
 * @return 100
 */
const sum = (a, b) => {
  let sum = '';
  const aLength = a.length;
  const bLength = b.length;

  let resLength;

  if (aLength > bLength) {
    resLength = aLength;
  } else {
    resLength = bLength;
  }

  const reverseA = a.split('').reverse().join('');
  const reverseB = b.split('').reverse().join('');

  
  let carry = 0;
  let reverseSum = '';
  for (let i = 0; i < resLength; i++) {
    const curSum = carry + Number(reverseA[i] || 0) + Number(reverseB[i] || 0);
    carry = curSum >= 2 ? 1 : 0;

    if (curSum >= 2) {
      reverseSum += '0';
    } else {
      reverseSum += curSum;
    }
  }

  if (carry) {
    reverseSum += carry;
  }

  sum = reverseSum.split('').reverse().join('');

  return sum;
}

const a = '11';
const b = '1';

console.log(sum(a, b));
```

### 

