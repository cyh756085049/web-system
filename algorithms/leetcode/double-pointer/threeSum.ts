function threeSum(nums: number[]): number[][] {
    nums.sort((a: number, b: number) => a - b);
    let res: number[][] = [];
    for (let i: number = 0; i < nums.length - 2; i++) {
        // 已经是升序数组，如果第一个数字大于0，则直接返回结果数组
        if (nums[i] > 0) {
            return res;
        }

        // 剪枝重复的元素
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum > 0) {
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                res.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }

                left++;
                right--;

            }
        }
    }
    return res;
}

const nums = [-1,0,1,2,-1,-4,-2,-3,3,0,4];
console.log('三数之和', threeSum(nums));