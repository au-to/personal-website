---
title: "python基础语法总结"
excerpt: "适合于对python基础语法的快速复习"
date: "2025-03-15"
author: "Ryan"
category: "python"
tags: ["python"]
imageUrl: "/images/python.webp"
---

# python基础语法总结

## 1. 基本数据类型

### 数字类型
```python
# 整数
x = 10
# 浮点数
y = 3.14
# 复数
z = 1 + 2j
# 布尔值
is_true = True
is_false = False
```

### 字符串
```python
# 单引号或双引号定义
name = 'Python'
language = "Python编程语言"

# 三引号定义多行字符串
multi_line = """这是
多行
字符串"""

# 字符串操作
s = "Hello, World!"
print(len(s))  # 长度: 13
print(s[0])    # 第一个字符: H
print(s[-1])   # 最后一个字符: !
print(s[0:5])  # 切片: Hello
print(s.upper())  # 转大写: HELLO, WORLD!
print(s.lower())  # 转小写: hello, world!
print(s.replace("Hello", "Hi"))  # 替换: Hi, World!
print(s.split(","))  # 分割: ['Hello', ' World!']
```

### 列表
```python
# 定义列表
fruits = ["apple", "banana", "cherry"]

# 访问元素
print(fruits[0])  # 第一个元素: apple
print(fruits[-1])  # 最后一个元素: cherry

# 修改元素
fruits[1] = "orange"
print(fruits)  # ['apple', 'orange', 'cherry']

# 添加元素
fruits.append("grape")
print(fruits)  # ['apple', 'orange', 'cherry', 'grape']

# 删除元素
fruits.remove("orange")
print(fruits)  # ['apple', 'cherry', 'grape']

# 列表长度
print(len(fruits))  # 3

# 列表切片
print(fruits[0:2])  # ['apple', 'cherry']

# 列表排序
fruits.sort()
print(fruits)  # ['apple', 'cherry', 'grape']
```

### 元组
```python
# 定义元组（不可修改的列表）
coordinates = (10, 20)
person = ("John", 25, "New York")

# 访问元素
print(coordinates[0])  # 10
print(person[1])  # 25

# 元组不能修改元素
# coordinates[0] = 15  # 这会引发错误

# 元组长度
print(len(person))  # 3
```

### 字典
```python
# 定义字典
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# 访问元素
print(person["name"])  # John

# 修改元素
person["age"] = 31
print(person)  # {'name': 'John', 'age': 31, 'city': 'New York'}

# 添加元素
person["email"] = "john@example.com"
print(person)  # {'name': 'John', 'age': 31, 'city': 'New York', 'email': 'john@example.com'}

# 删除元素
del person["city"]
print(person)  # {'name': 'John', 'age': 31, 'email': 'john@example.com'}

# 字典方法
print(person.keys())    # dict_keys(['name', 'age', 'email'])
print(person.values())  # dict_values(['John', 31, 'john@example.com'])
print(person.items())   # dict_items([('name', 'John'), ('age', 31), ('email', 'john@example.com')])
```

### 集合
```python
# 定义集合（无序且不重复）
fruits = {"apple", "banana", "cherry"}

# 添加元素
fruits.add("orange")
print(fruits)  # {'cherry', 'apple', 'orange', 'banana'}

# 删除元素
fruits.remove("banana")
print(fruits)  # {'cherry', 'apple', 'orange'}

# 集合操作
set1 = {"apple", "banana", "cherry"}
set2 = {"google", "microsoft", "apple"}

print(set1.union(set2))        # 并集: {'cherry', 'google', 'microsoft', 'apple', 'banana'}
print(set1.intersection(set2))  # 交集: {'apple'}
print(set1.difference(set2))    # 差集: {'cherry', 'banana'}
```

## 2. 控制流

### 条件语句
```python
# if语句
x = 10
if x > 0:
    print("正数")
elif x < 0:
    print("负数")
else:
    print("零")

# 三元运算符
age = 20
status = "成年" if age >= 18 else "未成年"
print(status)  # 成年
```

### 循环语句
```python
# for循环
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# range()函数
for i in range(5):  # 0, 1, 2, 3, 4
    print(i)

# while循环
count = 0
while count < 5:
    print(count)
    count += 1

# break和continue
for i in range(10):
    if i == 3:
        continue  # 跳过当前迭代
    if i == 7:
        break     # 退出循环
    print(i)  # 输出: 0, 1, 2, 4, 5, 6
```

## 3. 函数

### 函数定义与调用
```python
# 定义函数
def greet(name):
    return f"Hello, {name}!"

# 调用函数
message = greet("John")
print(message)  # Hello, John!

# 默认参数
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("John"))          # Hello, John!
print(greet("John", "Hi"))    # Hi, John!

# 可变参数
def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3, 4))  # 10

# 关键字参数
def person_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

person_info(name="John", age=30, city="New York")
```

### Lambda函数
```python
# 定义lambda函数
square = lambda x: x ** 2
print(square(5))  # 25

# 在高阶函数中使用
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

filtered = list(filter(lambda x: x % 2 == 0, numbers))
print(filtered)  # [2, 4]
```

## 4. 模块和包

### 导入模块
```python
# 导入整个模块
import math
print(math.sqrt(16))  # 4.0

# 导入特定函数
from math import sqrt
print(sqrt(16))  # 4.0

# 导入并重命名
import math as m
print(m.sqrt(16))  # 4.0

# 导入所有内容（不推荐）
from math import *
print(sqrt(16))  # 4.0
```

### 创建自己的模块
```python
# mymodule.py
def greet(name):
    return f"Hello, {name}!"

PI = 3.14159

# 在另一个文件中使用
import mymodule
print(mymodule.greet("John"))  # Hello, John!
print(mymodule.PI)  # 3.14159
```

## 5. 文件操作

### 读取文件
```python
# 读取整个文件
with open("file.txt", "r") as file:
    content = file.read()
    print(content)

# 逐行读取
with open("file.txt", "r") as file:
    for line in file:
        print(line.strip())
```

### 写入文件
```python
# 写入文件
with open("file.txt", "w") as file:
    file.write("Hello, World!")

# 追加到文件
with open("file.txt", "a") as file:
    file.write("\nAppended line")
```

## 6. 异常处理

```python
# try-except块
try:
    x = 10 / 0
except ZeroDivisionError:
    print("除以零错误")

# 处理多个异常
try:
    x = int("abc")
except ValueError:
    print("值错误")
except (TypeError, ZeroDivisionError):
    print("类型错误或除以零错误")

# finally子句
try:
    file = open("file.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("文件不存在")
finally:
    file.close()  # 无论如何都会执行

# with语句（上下文管理器）
try:
    with open("file.txt", "r") as file:
        content = file.read()
except FileNotFoundError:
    print("文件不存在")
```

## 7. 面向对象编程

### 类和对象
```python
# 定义类
class Person:
    # 类变量
    species = "Human"
    
    # 初始化方法
    def __init__(self, name, age):
        # 实例变量
        self.name = name
        self.age = age
    
    # 实例方法
    def greet(self):
        return f"Hello, my name is {self.name}"
    
    # 类方法
    @classmethod
    def from_birth_year(cls, name, birth_year):
        return cls(name, 2023 - birth_year)
    
    # 静态方法
    @staticmethod
    def is_adult(age):
        return age >= 18

# 创建对象
person1 = Person("John", 30)
print(person1.name)  # John
print(person1.greet())  # Hello, my name is John

# 使用类方法
person2 = Person.from_birth_year("Jane", 1990)
print(person2.age)  # 33

# 使用静态方法
print(Person.is_adult(20))  # True
```

### 继承
```python
# 父类
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        pass

# 子类
class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

# 创建对象
dog = Dog("Rex")
cat = Cat("Whiskers")

print(dog.speak())  # Rex says Woof!
print(cat.speak())  # Whiskers says Meow!
```

## 8. 常用内置函数

```python
# len() - 返回对象的长度
print(len("Hello"))  # 5
print(len([1, 2, 3]))  # 3

# type() - 返回对象的类型
print(type(123))  # <class 'int'>
print(type("Hello"))  # <class 'str'>

# range() - 生成数字序列
print(list(range(5)))  # [0, 1, 2, 3, 4]
print(list(range(2, 8)))  # [2, 3, 4, 5, 6, 7]
print(list(range(1, 10, 2)))  # [1, 3, 5, 7, 9]

# sorted() - 返回排序后的列表
print(sorted([3, 1, 4, 2]))  # [1, 2, 3, 4]
print(sorted("python"))  # ['h', 'n', 'o', 'p', 't', 'y']

# enumerate() - 返回索引和值的元组
for i, value in enumerate(["a", "b", "c"]):
    print(i, value)  # 0 a, 1 b, 2 c

# zip() - 将多个可迭代对象打包成元组
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
for name, age in zip(names, ages):
    print(f"{name} is {age} years old")
```

## 9. 列表推导式和生成器

### 列表推导式
```python
# 基本列表推导式
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 带条件的列表推导式
even_squares = [x**2 for x in range(10) if x % 2 == 0]
print(even_squares)  # [0, 4, 16, 36, 64]

# 嵌套列表推导式
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
print(flattened)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 生成器
```python
# 生成器函数
def count_up_to(n):
    i = 0
    while i <= n:
        yield i
        i += 1

# 使用生成器
counter = count_up_to(5)
print(next(counter))  # 0
print(next(counter))  # 1
print(next(counter))  # 2

# 生成器表达式
squares_gen = (x**2 for x in range(10))
print(next(squares_gen))  # 0
print(next(squares_gen))  # 1
print(next(squares_gen))  # 4
```

## 10. 装饰器

```python
# 基本装饰器
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
# 输出:
# Something is happening before the function is called.
# Hello!
# Something is happening after the function is called.

# 带参数的装饰器
def repeat(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")

greet("John")
# 输出:
# Hello, John!
# Hello, John!
# Hello, John!
```

## 总结

Python 是一种简洁、易读且功能强大的编程语言。本文总结了 Python 的基础语法，包括数据类型、控制流、函数、模块、文件操作、异常处理、面向对象编程以及一些高级特性。掌握这些基础知识将帮助你更好地理解和使用 Python 进行开发。

记住，Python 的设计哲学是"优雅"、"明确"、"简单"。正如 Python 之禅所说："简单比复杂更好，明确比含糊更好。"
