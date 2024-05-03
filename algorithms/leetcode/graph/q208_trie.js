/**
 * 208. 实现 Trie (前缀树) https://leetcode.cn/problems/implement-trie-prefix-tree/description/?envType=study-plan-v2&envId=top-100-liked
 * 题解：https://leetcode.cn/problems/implement-trie-prefix-tree/solutions/1120864/208-shi-xian-trie-qian-zhui-shu-by-chen-unxxk/?envType=study-plan-v2&envId=top-100-liked
 * @constructor
 */
const Trie = function () {
    this.children = {};
}

Trie.prototype.insert = function (word) {
    let nodes = this.children;
    // 循环遍历word
    for (let ch of word) {
        // 当前字符不在子节点中，则创建一个子节点到children的相应位置
        if (!nodes[ch]) {
            nodes[ch] = {};
        }
        // 移动指针到下一个字符子节点
        nodes = nodes[ch];
    }
    // 字符是否结束
    nodes.isEnd = true;
}

Trie.prototype.search = function (word) {
    const nodes = this.startsWith(word);
    // 判断searchPrefix返回的节点是不是字符串的结尾的字符
    return nodes !== undefined && nodes.isEnd !== undefined;
}

Trie.prototype.startsWith = function (prefix) {
    let nodes = this.children;
    // 循环前缀
    for (let ch of prefix) {
        // 当前字符不在子节点中，直接返回 false
        if (!nodes[ch]) {
            return false;
        }
        // 移动指针到下一个字符子节点
        nodes = nodes[ch];
    }
    return nodes;
}

const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));   // 返回 True
console.log(trie.search("app"));     // 返回 False
console.log(trie.startsWith("app")); // 返回 True
trie.insert("app");
console.log(trie.search("app"));     // 返回 True
