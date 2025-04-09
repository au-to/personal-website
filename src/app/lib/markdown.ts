'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 博客文章目录路径
const postsDirectory = path.join(process.cwd(), 'posts');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  readCount: number;
  imageUrl: string;
  category: string;
  tags: string[];
}

// 获取所有博客文章的元数据
export async function getAllPosts(): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const post = await getPostBySlug(slug);
      return post;
    })
  );

  // 过滤掉 null 值并按日期排序
  return allPostsData
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

// 获取所有博客文章的slug
export async function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    return {
      slug: fileName.replace(/\.md$/, '')
    };
  });
}

// 根据slug获取博客文章数据
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // 解码URL编码的slug
  const decodedSlug = decodeURIComponent(slug);
  const fullPath = path.join(postsDirectory, `${decodedSlug}.md`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // 确保imageUrl是有效的URL格式
    let imageUrl = data.imageUrl || '/vercel.svg';
    if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
      imageUrl = `/images/blog/${decodedSlug}.jpg`;
    }

    return {
      slug: decodedSlug,
      title: data.title,
      date: data.date,
      author: data.author,
      excerpt: data.excerpt,
      content: content, // 返回原始内容，不进行服务器端处理
      readCount: 0,
      imageUrl: imageUrl,
      category: data.category || '未分类',
      tags: data.tags || [],
    };
  } catch (error) {
    console.error(`Error reading post ${decodedSlug}:`, error);
    return null;
  }
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
}

// 根据标签获取文章
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
}

// 获取所有分类
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = new Set<string>();
  posts.forEach(post => {
    categories.add(post.category);
  });
  return Array.from(categories);
}

// 获取指定分类的所有文章
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.category === category);
}