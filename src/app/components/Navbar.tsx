"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { siteConfig } from '../../../siteConfig'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`group fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm opacity-100"
          : "bg-transparent opacity-0 hover:opacity-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center space-x-2 text-xl font-bold ${
              isScrolled
                ? "text-gray-900 dark:text-white"
                : theme === "dark" 
                  ? "text-white" 
                  : "text-gray-800"
            }`}
          >
            <Image 
              src={siteConfig.logo} 
              alt="站点Logo" 
              width={24} 
              height={24} 
              className={`h-6 w-auto transition-opacity duration-300 ${
                isScrolled ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            />
            <span>{ siteConfig.siteName }</span>
          </Link>

          {/* 桌面端导航 - 绝对居中 */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/"
              className={`${
                isScrolled
                  ? "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  : theme === "dark" 
                    ? "text-white hover:text-gray-200" 
                    : "text-gray-800 hover:text-gray-600"
              } transition-colors duration-300`}
            >
              首页
            </Link>
            <Link
              href="/projects"
              className={`${
                isScrolled
                  ? "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  : theme === "dark" 
                    ? "text-white hover:text-gray-200" 
                    : "text-gray-800 hover:text-gray-600"
              } transition-colors duration-300`}
            >
              项目
            </Link>
            <Link
              href="/blog"
              className={`${
                isScrolled
                  ? "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  : theme === "dark" 
                    ? "text-white hover:text-gray-200" 
                    : "text-gray-800 hover:text-gray-600"
              } transition-colors duration-300`}
            >
              博客
            </Link>
            <Link
              href="/about"
              className={`${
                isScrolled
                  ? "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  : theme === "dark" 
                    ? "text-white hover:text-gray-200" 
                    : "text-gray-800 hover:text-gray-600"
              } transition-colors duration-300`}
            >
              关于
            </Link>
            <Link
              href="https://github.com/au-to"
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isScrolled
                  ? "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  : theme === "dark" 
                    ? "text-white hover:text-gray-200" 
                    : "text-gray-800 hover:text-gray-600"
                } transition-colors duration-300`}
            >
              github
            </Link>
          </div>

          {/* 右侧按钮组 */}
          <div className="flex items-center space-x-2">
            {/* 主题切换按钮 */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 rounded-lg ${
                isScrolled
                  ? "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  : theme === "dark"
                    ? "text-white hover:bg-white/10"
                    : "text-gray-800 hover:bg-gray-800/10"
              } transition-colors duration-300`}
            >
              {theme === "dark" ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${
                isScrolled
                  ? "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  : theme === "dark"
                    ? "text-white hover:bg-white/10"
                    : "text-gray-800 hover:bg-gray-800/10"
              } transition-colors duration-300`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="py-4 space-y-4">
            <Link
              href="/"
              className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              首页
            </Link>
            <Link
              href="/projects"
              className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              项目
            </Link>
            <Link
              href="/blog"
              className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              博客
            </Link>
            <Link
              href="/about"
              className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              关于
            </Link>
            <Link
              href="https://github.com/au-to"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              github
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 