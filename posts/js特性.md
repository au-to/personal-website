---
title: "js特性"
excerpt: "哈哈哈"
date: "2025-03-15"
author: "ryan"
category: "前端"
tags: ["前端"]
imageUrl: "/images/blog/js.jpg"
---

# js特性

Java是一种广泛使用的编程语言，以其跨平台性、安全性和面向对象的特性而闻名。本文将简要介绍Java的基础知识和一些常用功能。

## Java简介

Java由Sun Microsystems（现为Oracle公司所有）于1995年发布。它的设计理念是"一次编写，到处运行"（Write Once, Run Anywhere），这使得Java程序可以在任何支持Java的平台上运行，无需重新编译。

## Java基础语法

以下是一个简单的Java程序示例：

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

这个程序输出"Hello, World!"到控制台。

## Java的面向对象特性

Java是一种完全面向对象的语言。在Java中，除了基本数据类型外，几乎所有内容都是对象。以下是一个简单的类定义：

```java
public class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void sayHello() {
        System.out.println("Hello, my name is " + name);
    }
}
```

## Java集合框架

Java提供了强大的集合框架，包括List、Set、Map等接口及其实现类。例如：

```java
import java.util.ArrayList;
import java.util.List;

List<String> names = new ArrayList<>();
names.add("张三");
names.add("李四");
names.add("王五");

for (String name : names) {
    System.out.println(name);
}
```

## 结语

Java作为一种成熟的编程语言，拥有丰富的库和框架支持，适用于各种应用场景，从Web应用到移动开发，从企业级应用到科学计算。学习Java不仅能够提升编程技能，还能为职业发展打下坚实基础。