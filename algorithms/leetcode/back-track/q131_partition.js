/**
 * 131. 分割回文串 https://leetcode.cn/problems/palindrome-partitioning/description/?envType=study-plan-v2&envId=top-100-liked
 * 思路：回溯，题解：https://leetcode.cn/problems/palindrome-partitioning/solutions/639915/shou-hua-tu-jie-san-chong-jie-fa-hui-su-q5zjt/?envType=study-plan-v2&envId=top-100-liked
 * @param s
 * @return {[]}
 */
const partition = (s) => {
    // 结果集数组
    const res = [];

    const dfs = (temp, start) => {
        if (start === s.length) {
            res.push(temp.slice());
            return;
        }

        for (let i = start; i < s.length; i++) {
            if (isPartial(start, i, s)) {
                temp.push(s.substring(start, i + 1));
                dfs(temp, i + 1);
                temp.pop();
            }
        }
    }

    dfs([], 0);
    return res;
}

// 判断是否是回文串
const isPartial= (leftIndex, rightIndex, str) => {
    while (leftIndex < rightIndex) {
        if (str[leftIndex] !== str[rightIndex]) {
            return false;
        }

        leftIndex++;
        rightIndex--;
    }

    return true;
}

// 记忆化 优化
// 每次递归都调用回文串判断，会出现重复判断的情况，因此可以用一个memo二维数组，将计算过的子问题结果存下来，下次再遇到就直接拿出来用。
const partitionMemo = (s) => {
    const res = [];
    // 记忆数组，用于剪枝，将计算过的子问题结果存下来，避免判断重复的回文串，如果此回文串已经存在过一次，就将记忆数组对应值置为 true
    const memo = new Array(s.length).fill().map(_ => new Array(s.length).fill());

    // 基于当前的部分解，切分从start到末尾的子串
    const dfs = (temp, start) => {
        // 找到满足条件的子集，将其加入结果集中
        if (start === s.length) {
            // 新建一个和temp等长的切片,temp还要在递归中继续被修改，不能将它的引用推入res
            res.push(temp.slice());
            // 结束掉当前这个递归（分支）
            return;
        }

        // 枚举出当前的所有选项，从索引start到末尾索引
        for (let i = start; i < s.length; i++) {
            // 如果当前start到i是回文串，就进行切割，将其添加到子集中
            if (memo[start][i] || isPartialMemo(start, i, s, memo)) {
                // substring：基于起始和结束索引，不包含结束索引，不支持负数索引。
                // substr：基于起始索引和长度，支持负数索引，但不推荐使用（已废弃）。
                // slice：基于起始和结束索引，不包含结束索引，支持负数索引，功能更强大，推荐使用。
                temp.push(s.substring(start, i + 1));
                dfs(temp, i + 1);
                // 上面递归结束了，撤销当前选择i，去下一轮迭代
                temp.pop();
            }
        }
    }

    dfs([], 0);
    return res;
}

// 双指针，判断字符串s是否是回文串
const isPartialMemo = (leftIndex, rightIndex, s, memo) => {
    while (leftIndex < rightIndex) {
        if (s[leftIndex] !== s[rightIndex]) {
            return false;
        }

        leftIndex++;
        rightIndex--;
    }

    memo[leftIndex][rightIndex] = true;
    return true;
}



const s = "aab";
console.log('分割回文串：', partition(s));
console.log('分割回文串记忆化：', partitionMemo(s));
