/**
 * 39. 组合总和 https://leetcode.cn/problems/combination-sum/description/
 * 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，
 * 并以列表形式返回。你可以按 任意顺序 返回这些组合。
 * candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。
 * 对于给定的输入，保证和为 target 的不同组合数少于 150 个。
 * @param candidates
 * @param target
 * @return {[]}
 */
const combinationSum = (candidates, target) => {
    // 保存结果集
    const combinations = [];

    /**
     * @param start 当前选择的起点
     * @param currentSum 当前遍历的元素相加的和
     * @param combination 保存的当前遍历到的和为目标的解集
     */
    const dfs = (start, currentSum, combination) => {
        // 当前和等于目标和，加入解集，返回
        if (currentSum === target) {
            combinations.push([...combination]);
            return;
        }
        // 当前和大于目标和，返回
        if (currentSum > target) {
            return;
        }

        // 枚举当前可选的数，从start开始，避免当前组合和之前的组合重复
        // 限制下一次选择的起点，是基于本次的选择，这样下一次就不会选到本次选择同层左边的数
        for (let i = start; i < candidates.length; i++) {
            currentSum += candidates[i];
            combination.push(candidates[i]);

            dfs(i, currentSum, combination);

            currentSum -= candidates[i];
            combination.pop();
        }
    }

    dfs(0, 0, []);

    return combinations;
}

/**
 * 输入：candidates = [2,3,6,7], target = 7
 * 输出：[[2,2,3],[7]]
 * 解释：
 * 2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
 * 7 也是一个候选， 7 = 7 。
 * 仅有这两种组合。
 */

const candidates = [2, 3, 6, 7], target = 7;
console.log(combinationSum(candidates, target));