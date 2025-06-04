---
title: "python基础语法总结-速记版"
excerpt: "适合于对python基础语法的快速复习"
date: "2025-02-25"
author: "Ryan"
category: "后端"
tags: ["python"]
imageUrl: ""
---

## 1. 变量与数据类型

```python
# 变量赋值
x = 10  # 整数
y = 3.14  # 浮点数
name = "Python"  # 字符串
is_active = True  # 布尔值
```

## 2. 基本运算符

```python
# 算术运算
sum = 10 + 5  # 加法
diff = 10 - 5  # 减法
prod = 10 * 5  # 乘法
quot = 10 / 3  # 除法（返回浮点数）
mod = 10 % 3  # 取余
power = 2 ** 3  # 幂运算
floor_div = 10 // 3  # 地板除
```

## 3. 字符串操作

```python
s = "Hello, World!"
print(s[0])  # H（索引）
print(s[0:5])  # Hello（切片）
print(len(s))  # 获取长度
print(s.lower())  # 转小写
print(s.upper())  # 转大写
print(s.replace("Hello", "Hi"))  # 替换
print("Python" in s)  # 判断子串
```

## 4. 列表（List）

```python
nums = [1, 2, 3, 4, 5]
nums.append(6)  # 添加元素
nums.insert(2, 10)  # 指定位置插入
nums.remove(3)  # 移除元素
del nums[1]  # 删除索引位置元素
print(nums[1:4])  # 切片
```

## 5. 元组（Tuple）

```python
tuple_data = (1, 2, 3, "Python")
print(tuple_data[0])  # 访问元素
print(len(tuple_data))  # 长度
```

## 6. 集合（Set）

```python
set_data = {1, 2, 3, 4}
set_data.add(5)  # 添加元素
set_data.remove(2)  # 删除元素
print(3 in set_data)  # 判断元素是否存在
```

## 7. 字典（Dictionary）

```python
dict_data = {"name": "Alice", "age": 25}
dict_data["city"] = "Beijing"  # 添加键值对
del dict_data["age"]  # 删除键值对
print(dict_data.keys())  # 获取所有键
print(dict_data.values())  # 获取所有值
```

## 8. 条件语句

```python
x = 10
if x > 0:
    print("Positive")
elif x == 0:
    print("Zero")
else:
    print("Negative")
```

## 9. 循环语句

```python
# for 循环
for i in range(5):
    print(i)

# while 循环
x = 0
while x < 5:
    print(x)
    x += 1
```

## 10. 函数定义

```python
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))
```

## 11. 类与对象

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"My name is {self.name} and I am {self.age} years old."

p = Person("Alice", 25)
print(p.introduce())
```

## 12. 文件操作

```python
# 读取文件
txt_file = open("file.txt", "r")
content = txt_file.read()
txt_file.close()

# 写入文件
with open("file.txt", "w") as file:
    file.write("Hello, world!")
```

## 13. 异常处理

```python
try:
    x = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
finally:
    print("Execution completed")
```

## 14. 模块与导入

```python
import math
print(math.sqrt(16))

from datetime import datetime
print(datetime.now())
```

## 15. 列表推导式

```python
squares = [x ** 2 for x in range(10)]
print(squares)
```

## 16. Lambda 表达式

```python
add = lambda x, y: x + y
print(add(3, 5))
```

## 17. 多线程

```python
import threading

def print_numbers():
    for i in range(5):
        print(i)

thread = threading.Thread(target=print_numbers)
thread.start()
thread.join()
```

## 18. 装饰器

```python
def decorator(func):
    def wrapper():
        print("Before function execution")
        func()
        print("After function execution")
    return wrapper

@decorator
def say_hello():
    print("Hello!")

say_hello()
```

## 19. 生成器

```python
def my_generator():
    for i in range(3):
        yield i

gen = my_generator()
print(next(gen))  # 0
print(next(gen))  # 1
print(next(gen))  # 2
```

## 20. 面向对象进阶

```python
class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Woof!"

d = Dog()
print(d.speak())
```