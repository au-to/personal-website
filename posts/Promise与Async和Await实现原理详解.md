---
title: "JavaScript Promise与Async/Await实现原理详解"
excerpt: "介绍Promise与Async/Await实现原理"
date: "2025-02-16"
author: "Ryan"
category: "前端"
tags: ["javaScript"]
imageUrl: ""
---

## 1. 引言
在现代JavaScript中，`Promise`和`Async/Await`是处理异步操作的核心机制。本文将深入剖析它们的底层实现原理。

## 2. Promise实现原理

### 2.1 状态机模型
```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending'; // 状态：pending/fulfilled/rejected
    this.value = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = (reason) => { 
      if(this.status === 'pending') {
        this.status = 'rejected';
        this.value = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
}
```

### 2.2 链式调用
```javascript
then(onFulfilled, onRejected) {
  return new MyPromise((resolve, reject) => {
    const handler = (fn) => {
      queueMicrotask(() => {
        try {
          const x = fn(this.value);
          resolve(x);
        } catch (err) {
          reject(err);
        }
      });
    };

    if (this.state === 'fulfilled') {
      handler(onFulfilled);
    } else if (this.state === 'rejected') {
      handler(onRejected);
    } else {
      this.onFulfilledCallbacks.push(() => handler(onFulfilled));
      this.onRejectedCallbacks.push(() => handler(onRejected));
    }
  });
}
```

### 2.3 微任务机制
* 使用queueMicrotask将回调放入微任务队列
* 优先于宏任务（setTimeout）执行

## 3. Async/Await实现原理

### 3.1 Generator协程
```javascript
function* gen() {
  const result = yield promise;
  // ...
}

function asyncToGenerator(generator) {
  return function() {
    const gen = generator.apply(this, arguments);
    
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        try {
          const { value, done } = gen[key](arg);
          if (done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(
              val => step('next', val),
              err => step('throw', err)
            );
          }
        } catch (err) {
          reject(err);
        }
      }
      
      step('next');
    });
  };
}
```

### 3.2 Babel转译示例

原始代码：
```javascript
async function fetchData() {
  const res = await fetch('/api');
  return res.json();
}
```

转译后：
```javascript
function fetchData() {
  return _asyncToGenerator(function* () {
    const res = yield fetch('/api');
    return res.json();
  })();
}
```

## 4. 事件循环机制

| 任务类型 | 执行时机 | 示例 |
| -------- | -------- | ---- |
| 微任务 | 每个宏任务执行结束后 | Promise.then |
| 宏任务 | 事件循环轮次 | setTimeout |


## 5. 错误处理
```javascript
// Promise
promise.catch(err => console.error(err));

// Async/Await
async function safeFetch() {
  try {
    await fetch('/api');
  } catch (err) {
    console.error(err);
  }
}
```

## 6. 应用场景
* 顺序异步操作
* 并行请求（Promise.all）
* 超时控制（Promise.race）

## 7. 总结
| 特性 | Promise | Async/Await |
| ---- | ------- | ----------- |
| 语法层次 | 链式调用 | 同步写法 |
| 错误处理 | .catch() | try/catch |
| 实现基础 | 原生支持 | Generator + Promise |


这篇博客从实现原理到实际应用进行了全面解析，希望能帮助你深入理解异步编程机制。