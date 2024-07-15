class TaskQueue {
    constructor(maxConcurrency) {
        // 最大并发数
        this.maxConcurrency = maxConcurrency;
        // 当前并发数
        this.currentConcurrency = 0;
        // 请求队列
        this.requestQueue = [];
    }

    // 发起请求
    async makeRequest(url, options) {
        const requestPromise = new Promise(async(resolve, reject) => {
            await this.waitForConcurrencySlot();
            this.currentConcurrency++;

            try {
                const response = await fetch(url, options);
                resolve(response);
            } catch (error) {
                console.log(error);
                reject(error);
            } finally {
                this.currentConcurrency--;
                this.processQueue();
            }
        });

        this.requestQueue.push(() => requestPromise);
        return requestPromise;
    }

    // 这个方法使用了一个循环，等待直到当前并发数小于最大并发数为止。
    // 通过使用 setTimeout 和 Promise，在达到最大并发数时会持续检查，直到有空闲的槽位。
    async waitForConcurrencySlot() {
        console.log(this.currentConcurrency);
        while (this.currentConcurrency >= this.maxConcurrency) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    // 负责处理请求队列。如果队列中有等待的请求并且有可用的槽位，则取出队列中的下一个请求并执行
    async processQueue() {
        if (this.requestQueue.length > 0 && this.currentConcurrency < this.maxConcurrency) {
            const nextRequest = this.requestQueue.shift();
            console.log('nextRequest', nextRequest, this.requestQueue.length, this.currentConcurrency);
            await nextRequest();
        }
    }
}

const task = new TaskQueue(6);
task.makeRequest('https://mock.uutool.cn/4oqvkj1kudo0')
.then(response => response)
.then(data => console.log('data', data))
.catch(error => console.log(error))

task.makeRequest('https://mock.uutool.cn/4oqvkj1kudo0');
task.makeRequest('https://mock.uutool.cn/4oqvkj1kudo0');