/**
 * 46. 全排列 https://leetcode.cn/problems/permutations/?envType=study-plan-v2&envId=top-100-liked
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 * @param nums
 * @return {[]}
 */
const permute = (nums) => {
    // 保存结果集
    let res = [];
    // 保存已经遍历过的元素
    let path = [];

    // 使用一个used数组来记录哪些元素已经使用过，将已经使用过的添加到path中
    const dfs = (used) => {
        // 保存每一次组成的排序元素数组
        if (path.length === nums.length) {
            res.push([...path]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            // 如果当前的元素已经被使用过，则进入下一次循环
            if (used[i] === 1) {
                continue;
            }
            // 如果当前元素还未使用，则将其加入到 path 中
            path.push(nums[i]);
            // 将此时的元素标注为已使用
            used[i] = 1;
            // 继续递归
            dfs(used);

            // 回溯
            used[i] = 0;
            path.pop();
        }
    }
    dfs([]);
    return res;
}

/**
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */

const nums = [1, 2, 3];
console.log(permute(nums));