### 回溯篇
hot 100
* [46. 全排列](https://github.com/cyh756085049/web-system/blob/main/algorithms/leetcode/back-track/q46_permute.js)
* [78 子集](https://github.com/cyh756085049/web-system/blob/main/algorithms/leetcode/back-track/q78_subsets.js)
* [17. 电话号码的字母组合](https://github.com/cyh756085049/web-system/blob/main/algorithms/leetcode/back-track/q17_letterCombinations.js)
* [39. 组合总和](https://github.com/cyh756085049/web-system/blob/main/algorithms/leetcode/back-track/q39_combinationSum.js)
* [22. 括号生成](https://github.com/cyh756085049/web-system/blob/main/algorithms/leetcode/back-track/q22_generateParenthesis.js)
* [79. 单词搜索](https://github.com/cyh756085049/web-system/blob/main/algorithms/leetcode/back-track/q79_exist.js)
* [131. 分割回文串](https://github.com/cyh756085049/web-system/blob/main/algorithms/leetcode/back-track/q131_partition.js)
* [51. N 皇后](https://github.com/cyh756085049/web-system/blob/main/algorithms/leetcode/back-track/q51_solveNOueens.js)

#### 回溯问题抓住三个要点：

* 选择，当前你有什么选择，一个选择代表一个分支，基于一种选择，又会展开出一些选择
* 约束条件，利用它去做剪枝，减少不必要的搜索，让你的搜索树“瘦身”
* 目标，明确了何时将部分解加入解集，结束当前的递归

#### 模板 choose -- explore -- unchoose：

* 用 for 循环枚举出当前的选择
* 作出一个选择，基于这个选择，继续递归
* 递归结束了，撤销这个选择，进入下一轮迭代

#### 参考：
回溯相关题解可参考：https://leetcode.cn/problems/palindrome-partitioning/solutions/639915/shou-hua-tu-jie-san-chong-jie-fa-hui-su-q5zjt/