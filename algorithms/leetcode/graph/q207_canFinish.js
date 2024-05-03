const canFinish = (numCourses, prerequisites) => {
    return initGraph(numCourses, prerequisites);
}

/**
 *
 * @param numCourses 需选修的课程数
 * @param prerequisites 先修课程数组， 其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程  bi
 */
const initGraph = (numCourses, prerequisites) => {
    // 入度数组
    const inDegree = new Array(numCourses).fill(0);
    // 邻接表，key 保存课程号，value 保存依赖这门课的后续课程（数组保存）
    const map = {};
    for (let i = 0; i < prerequisites.length; i++) {
        // 求课程的初始入度值
        inDegree[prerequisites[i][0]]++;
        // 当前课已经存在于邻接表中
        if (map[prerequisites[i][1]]) {
            // 添加依赖它的后续课程
            map[prerequisites[i][1]].push(prerequisites[i][0]);
        } else {
            // 当前课程不存在于邻接表中
            map[prerequisites[i][1]] = [prerequisites[i][0]];
        }
    }

    const queue = [];
    for (let i = 0; i < inDegree.length; i++) {
        // 所有入度为0的课程入队
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    // 记录选了的课程数量
    let count = 0;
    while (queue.length > 0) {
        // 当前选的可出列
        const selected = queue.shift();
        // 选课数加1
        count++;
        const toEnQueue = map[selected];
        if (toEnQueue && toEnQueue.length > 0) {
            for (let i = 0; i < toEnQueue.length; i++) {
                // 依赖它的后续课程的入度 -1
                inDegree[toEnQueue[i]]--;
                // 如果减为0，入队
                if (inDegree[toEnQueue[i]] === 0) {
                    queue.push(toEnQueue[i]);
                }
            }
        }
    }

    return count === numCourses;
}

const numCourses = 2, prerequisites = [[1,0]];
console.log('课程数', canFinish(numCourses, prerequisites));