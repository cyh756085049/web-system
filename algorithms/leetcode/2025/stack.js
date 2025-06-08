
// temperatures 表示每天的温度，返回的 answer[i] 表示对于第i天，下一个更高温度出现在几天后
const dailyTemperatures = (temperatures) => {
  if (temperatures.length === 0) {
    return [];
  }

  // 栈保存当前温度的索引
  const stack = [];
  const res = new Array(temperatures.length).fill(0);
  for (let i = 0; i < temperatures.length; i++) {
    let curTempature = temperatures[i];

    // 栈顶对应的温度小于当前温度，栈顶出栈，并更新栈顶对应的结果集
    while (stack.length > 0 && temperatures[stack[stack.length - 1]] < curTempature) {
      const lowest = stack.pop();
      res[lowest] = i - lowest;
    }
    stack.push(i);
  }
  return res;
}

const temperatures = [73,74,75,71,69,72,76,73];
// [1,1,4,2,1,1,0,0]

// 柱形图中的最大矩形
const largestRectangleArea = (heights) => {
  let maxArea = 0;
  // 维护索引，保存单调递增栈
  const stack = [];
  heights = [0, ...heights, 0];
  for (let i = 0; i < heights.length; i++) {
    // 当前的矩形高度小于栈顶索引对应的矩形高度，则出栈，更新当前的最大矩形面积
    while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
      const topIndex = stack.pop();
      const curArea = heights[topIndex] * (i - stack[stack.length - 1] - 1);
      maxArea = Math.max(curArea, maxArea);
    }

    stack.push(i);
  }

  return maxArea;
}


const nums = [2,3,1,1,4];
const canJump = (nums) => {
  // 能跳跃的最大长度的位置
  let maxPosition = 0;

  // 数组中的每个元素代表你在该位置可以跳跃的最大长度
  for (let curPosition = 0; curPosition < nums.length; curPosition++) {
    // 当前位置长度大于能跳跃的最大长度
    if (curPosition > maxPosition) {
      return false;
    }

    // 当前位置对应的可跳跃长度
    const jumpLength = nums[curPosition];
    // 更新最大位置
    maxPosition = Math.max(maxPosition, curPosition + jumpLength);

    if (maxPosition >= nums.length - 1) {
      return true;
    }
  }

  return false;
}

const jump = (nums) => {
  // 最小跳跃次数
  let step = 0;
  // 最大跳跃位置
  let maxPosition = 0;
  // 下一个位置
  let nextPosition = 0;

  for (let i = 0; i < nums.length; i++) {
    // 更新最大位置
    maxPosition = Math.max(maxPosition, nums[i] + i);

    // 当前位置到达下一个位置
    if (i === nextPosition) {
      // 更新下一个位置
      nextPosition = maxPosition;
      // 更新次数
      step++;
    }
  }

  return step;
}


const s = "ababcbacadefegdehijhklij";
const partitionLabels = (s) => {
  // 统计字符串中每个单词最后出现的位置
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    map.set(s[i], i);
  }

  const res = [];
  let start = 0;
  let end = 0;

  for (let curPosition = 0; curPosition < s.length; curPosition++) {
    end = Math.max(end, map.get(s[curPosition]));

    if (curPosition === end) {
      res.push(end - start + 1);
      start = end + 1;
    }
  }

  return res;
}

console.log('划分字符串区间', partitionLabels(s));


const  numArr = [3,2,1,5,6,4], k = 2
const findKthLargest = (nums, k) => {
  let heap = [];
  let n = 0;

  const createHeap = () => {
    for (let i = 0; i < k; i++) {
      insert(nums[i]);
    }
  }

  const insert = (value) => {
    heap[n] = value;
    upHead(n);
    n++;
  }

  const upHead = (lastIndex) => {
    let childIndex = lastIndex;
    let parentIndex = Math.floor((lastIndex - 1) / 2);

    while (parentIndex >= 0) {
      if (heap[parentIndex] > heap[childIndex]) {
        swap(heap, parentIndex, childIndex);
        childIndex = parentIndex;
        parentIndex = Math.floor((childIndex - 1) / 2);
      } else {
        break;
      }
    }
  }

  // 更新堆，从数组k
  const updateHeap = () => {
    for (let i = k; i < nums.length; i++) {
      // 当前数据比堆顶大
      if (nums[i] > heap[0]) {
        heap[0] = nums[i];
        downHeap(k);
      }
    }
  }

  const downHeap = (k) => {
    let parentIndex = 0;
    let chiledrenIndex = 2 * parentIndex + 1;

    while (chiledrenIndex <= k) {
      if (chiledrenIndex + 1 <= k && heap[chiledrenIndex + 1] < heap[chiledrenIndex]) {
        chiledrenIndex++;
      }

      if (heap[parentIndex] > heap[chiledrenIndex]) {
        swap(heap, parentIndex, chiledrenIndex);
        parentIndex = chiledrenIndex;
        chiledrenIndex = 2 * parentIndex + 1;
      } else {
        break;
      }
    }
  }

  // 创建最小堆
  createHeap();
  updateHeap();

  return heap[0];
}

const swap = (nums, i, j) => {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}