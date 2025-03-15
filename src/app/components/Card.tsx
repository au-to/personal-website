"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface CardProps {
  children: ReactNode;
  href?: string;
  isExternal?: boolean;
  isHoverable?: boolean;
  isAnimated?: boolean;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function Card({
  children,
  href,
  isExternal = false,
  isHoverable = true,
  isAnimated = true,
  className = "",
  onClick,
  onMouseEnter,
  onMouseLeave,
}: CardProps) {
  // 基础样式
  const baseStyles = "bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg";
  
  // 悬停样式
  const hoverStyles = isHoverable ? "hover:shadow-xl transition-all duration-300" : "";
  
  // 组合样式
  const cardStyles = `${baseStyles} ${hoverStyles} ${className}`;
  
  // 卡片内容
  const content = (
    <>
      {children}
    </>
  );
  
  // 如果有链接
  if (href) {
    const linkProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
    
    if (isAnimated) {
      return (
        <motion.div
          whileHover={isHoverable ? { y: -8, transition: { duration: 0.3 } } : undefined}
          className="h-full"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Link href={href} {...linkProps} className={cardStyles}>
            {content}
          </Link>
        </motion.div>
      );
    }
    
    return (
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Link href={href} {...linkProps} className={cardStyles}>
          {content}
        </Link>
      </div>
    );
  }
  
  // 如果有点击事件
  if (onClick) {
    if (isAnimated) {
      return (
        <motion.div
          className={`${cardStyles} cursor-pointer`}
          whileHover={isHoverable ? { y: -8, transition: { duration: 0.3 } } : undefined}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {content}
        </motion.div>
      );
    }
    
    return (
      <div 
        className={`${cardStyles} cursor-pointer`} 
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {content}
      </div>
    );
  }
  
  // 普通卡片
  if (isAnimated && isHoverable) {
    return (
      <motion.div
        className={cardStyles}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {content}
      </motion.div>
    );
  }
  
  return (
    <div 
      className={cardStyles}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {content}
    </div>
  );
} 