/**
 * 349. 两个数组的交集
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/6
 * @param nums1
 * @param nums2
 */
// 方式1：filter 过滤，set 去重
const intersection = (nums1, nums2) => {
    const filterArr = nums1.filter(item => nums2.includes(item));
    console.log('过滤的数组', filterArr);
    const resArr = [...new Set(filterArr)];
    return resArr;
}

// 方式2：先对两数组分别用 set 去重，然后两次循环遍历找交集
const intersectionII = (nums1, nums2) => {
    const setNum1 = new Set(nums1);
    const setNum2 = new Set(nums2);

    console.log(setNum1, setNum2);
    let resArr = [];
    setNum1.forEach(item => {
        if (setNum2.has(item)) {
            resArr.push(item);
        }
    })

    return resArr;
}

// 寻找两个数组的并集并去重
const union = (nums1, nums2) => {
    const setNums = new Set([...nums1, ...nums2]);
    return Array.from(setNums);
}

const difference = (nums1, nums2) => {
    const setNums1 = new Set(nums1);
    const setNums2 = new Set(nums2);

    setNums1.forEach(item => {
        if (setNums2.has(item)) {
            setNums2.delete(item);
        }
    })

    return Array.from(setNums2);
}

// const nums1 = [1,2,2,1], nums2 = [2,2];
const nums1 = [4,9,5], nums2 = [9,4,9,8,4];
console.log('----------寻找两个数组的交集-----------');
console.log('方式1：filter 过滤，set 去重', intersection(nums1, nums2));
console.log('方式2：先用 set 去重，然后两次循环遍历找交集', intersectionII(nums1, nums2));
console.log('----------寻找两个数组的并集-----------');
console.log('寻找两个数组的并集', union(nums1, nums2));
console.log('----------寻找两个数组的差集-----------');
console.log('寻找两个数组的差集', difference(nums1, nums2));
