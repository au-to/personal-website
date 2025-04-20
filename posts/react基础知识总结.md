---
title: "react基础知识总结-速记版"
excerpt: "适合于对React基础语法的快速复习"
date: "2025-03-04"
author: "Ryan"
category: "react"
tags: ["react"]
imageUrl: ""
---

## 1. React 简介

React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 维护，主要用于构建单页应用（SPA）。其核心特点包括：

- **组件化开发**：UI 被拆分为可复用的组件。
- **声明式编程**：通过描述 UI 状态，React 负责更新界面。
- **虚拟 DOM**：通过 diff 算法优化更新，提高性能。
- **单向数据流**：数据由上到下流动，管理状态更清晰。
- **Hooks**：提供更方便的方式来管理状态和副作用。

## 2. JSX 语法

JSX（JavaScript XML）是 React 提供的一种语法扩展，使得 JavaScript 代码中可以编写类似 HTML 的结构。

```jsx
const element = <h1>Hello, React!</h1>;
```

### JSX 的特点
- JSX 需要用 `()` 包裹多行代码。
- JSX 语法必须在外层包含一个根标签。
- 使用 `{}` 语法插入 JavaScript 表达式。
- HTML 属性需要使用 camelCase，例如 `className`、`onClick`。

## 3. 组件 & Props

### 3.1 函数组件

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### 3.2 类组件

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### 3.3 组件的使用

```jsx
<Welcome name="React" />
```

### 3.4 Props（属性）
- Props 是组件的输入，组件不能修改它们。
- 可以传递任意类型的数据（字符串、数组、对象、函数等）。
- Props 是只读的。

## 4. 状态 & 生命周期

### 4.1 state（状态）
在类组件中，使用 `this.state` 进行状态管理。

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return <h1>Count: {this.state.count}</h1>;
  }
}
```

### 4.2 setState 更新状态

```jsx
this.setState({ count: this.state.count + 1 });
```

### 4.3 生命周期方法
- `componentDidMount`：组件挂载后调用。
- `componentDidUpdate`：组件更新后调用。
- `componentWillUnmount`：组件卸载前调用。

```jsx
componentDidMount() {
  console.log("组件已挂载");
}
```

## 5. 事件处理

React 事件绑定使用 `onClick`、`onChange` 等，事件处理函数默认不绑定 `this`，需要手动绑定或使用箭头函数。

```jsx
class Button extends React.Component {
  handleClick = () => {
    console.log("按钮被点击");
  };

  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}
```

## 6. 条件渲染 & 列表渲染

### 6.1 条件渲染

```jsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

### 6.2 列表渲染

```jsx
const items = ["Apple", "Banana", "Orange"];
const listItems = items.map((item, index) => <li key={index}>{item}</li>);
<ul>{listItems}</ul>
```

## 7. 表单处理

### 7.1 受控组件

```jsx
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    return <input type="text" value={this.state.value} onChange={this.handleChange} />;
  }
}
```

## 8. Hooks（React 16.8+）

### 8.1 useState

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>Count: {count}</button>
  );
}
```

### 8.2 useEffect

```jsx
import { useEffect } from "react";

useEffect(() => {
  console.log("组件渲染了");
}, []);
```

### 8.3 useContext

```jsx
const ThemeContext = React.createContext("light");

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click Me</button>;
}
```

## 9. React Router（路由）

```jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
```

## 10. Redux（状态管理）

```jsx
import { createStore } from "redux";

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    default:
      return state;
  }
}

const store = createStore(reducer);
store.dispatch({ type: "INCREMENT" });
console.log(store.getState());
```

## 11. 总结

- 了解 JSX 语法。
- 掌握组件、Props 和 State 的使用。
- 熟悉事件处理、条件渲染和列表渲染。
- 了解 React Hooks（useState、useEffect、useContext）。
- 学习 React Router 进行页面路由管理。
- 掌握 Redux 进行全局状态管理。