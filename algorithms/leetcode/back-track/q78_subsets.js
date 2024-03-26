/**
 * 78. 子集 https://leetcode.cn/problems/subsets/description/?envType=study-plan-v2&envId=top-100-liked
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
 * 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = (nums) => {
    // 保存结果子集
    const res = [];

    const dfs = (index, list) => {
        // 指针越界
        if (index === nums.length) {
            // 将其加入到子集数组中
            res.push(list.slice());
            return;
        }
        // 选择这个数
        list.push(nums[index]);
        // 基于该选择，继续往下递归
        dfs(index + 1, list);

        // 回溯，撤销该选择
        list.pop();
        // 继续向下递归
        dfs(index + 1, list);
    }

    dfs(0, []);

    return res;
}

/**
 * 输入：nums = [1,2,3]
 * 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 */

const nums = [1,2,3];
console.log(subsets(nums));