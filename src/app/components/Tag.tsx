"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface TagProps {
  children: ReactNode;
  variant?: "default" | "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isAnimated?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Tag({
  children,
  variant = "default",
  size = "md",
  isAnimated = true,
  className = "",
  onClick,
}: TagProps) {
  // 基础样式
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium";
  
  // 尺寸样式
  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };
  
  // 变体样式
  const variantStyles = {
    default: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
    primary: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
    secondary: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    outline: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300",
  };
  
  // 点击样式
  const clickStyles = onClick ? "cursor-pointer hover:bg-opacity-80" : "";
  
  // 组合样式
  const tagStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${clickStyles} ${className}`;
  
  // 带动画的标签
  if (isAnimated) {
    return (
      <motion.span
        className={tagStyles}
        whileHover={onClick ? { scale: 1.05 } : undefined}
        whileTap={onClick ? { scale: 0.95 } : undefined}
        onClick={onClick}
      >
        {children}
      </motion.span>
    );
  }
  
  // 无动画标签
  return (
    <span className={tagStyles} onClick={onClick}>
      {children}
    </span>
  );
} 