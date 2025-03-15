#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 博客文章目录
const BLOG_DIR = path.join(process.cwd(), 'posts');

// 确保博客目录存在
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

// 提示用户输入文章信息
console.log('创建新的博客文章\n');

rl.question('文章标题: ', (title) => {
  rl.question('文章摘要: ', (excerpt) => {
    rl.question('作者名称: ', (author) => {
      rl.question('分类: ', (category) => {
        rl.question('标签 (用逗号分隔): ', (tagsInput) => {
          rl.question('封面图片URL: ', (imageUrl) => {
            // 处理标签
            const tags = tagsInput.split(',').map(tag => tag.trim());
            
            // 生成文件名（slug）
            const slug = title
              .toLowerCase()
              .replace(/[^\w\u4e00-\u9fa5]+/g, '-') // 将非字母数字汉字字符替换为连字符
              .replace(/^-+|-+$/g, ''); // 移除开头和结尾的连字符
            
            // 获取当前日期
            const date = new Date().toISOString().split('T')[0];
            
            // 创建文章内容
            const content = `---
title: "${title}"
excerpt: "${excerpt}"
date: "${date}"
author: "${author}"
category: "${category}"
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
imageUrl: "${imageUrl || `/images/blog/${slug}.jpg`}"
---

# ${title}

在这里开始撰写你的文章内容...
`;
            
            // 写入文件
            const filePath = path.join(BLOG_DIR, `${slug}.md`);
            fs.writeFileSync(filePath, content);
            
            console.log(`\n✅ 文章已创建: ${filePath}`);
            console.log('\n你可以现在开始编辑这个文件来完成你的文章。');
            
            rl.close();
          });
        });
      });
    });
  });
});

// 添加关闭事件处理
rl.on('close', () => {
  process.exit(0);
}); 