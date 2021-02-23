// 使用 Promise 和 async / await 创建异步代码
// 异步工作是我们需要先启动一个工作，让它在后台运行，同时去做另外一些工作
function ExpensiveWebCall(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve;
        }, time);
    });
}
class MyWebService {
    CallExpensiveWebOperation() {
        ExpensiveWebCall(4000).then(() => {
            console.log('Finished web service');
        })
            .catch(() => {
            console.log('Expensive web call failure');
        });
    }
}
console.log('call service');
new MyWebService().CallExpensiveWebOperation();
console.log('Processing continues util the web service returns');
