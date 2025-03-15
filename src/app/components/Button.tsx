"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  isAnimated?: boolean;
  animationEffect?: "scale" | "pulse" | "bounce" | "glow" | "shake" | "rotate" | "slide";
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  isExternal = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  isAnimated = true,
  animationEffect = "scale",
  className = "",
  ...props
}: ButtonProps) {
  // 基础样式
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300";
  
  // 尺寸样式
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  
  // 变体样式
  const variantStyles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow",
    secondary: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700",
    outline: "border border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20",
    ghost: "text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20",
  };
  
  // 组合样式
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? "w-full" : ""} ${className}`;
  
  // 获取动画效果
  const getAnimationProps = () => {
    switch (animationEffect) {
      case "scale":
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: { duration: 0.2 }
        };
      case "pulse":
        return {
          whileHover: { 
            scale: [1, 1.05, 1, 1.05, 1],
            transition: { 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop" as const
            }
          },
          whileTap: { scale: 0.95 },
        };
      case "bounce":
        return {
          whileHover: { y: [0, -6, 0], 
            transition: { 
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop" as const
            }
          },
          whileTap: { y: 2 },
        };
      case "glow":
        return {
          whileHover: { 
            boxShadow: [
              "0 0 0 rgba(99, 102, 241, 0)",
              "0 0 10px rgba(99, 102, 241, 0.5)",
              "0 0 20px rgba(99, 102, 241, 0.3)",
              "0 0 10px rgba(99, 102, 241, 0.5)",
              "0 0 0 rgba(99, 102, 241, 0)"
            ],
            transition: { 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop" as const
            }
          },
          whileTap: { scale: 0.95 },
        };
      case "shake":
        return {
          whileHover: { 
            x: [0, -5, 5, -5, 5, 0],
            transition: { 
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop" as const
            }
          },
          whileTap: { scale: 0.95 },
        };
      case "rotate":
        return {
          whileHover: { 
            rotate: [0, 5, -5, 5, -5, 0],
            transition: { 
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop" as const
            }
          },
          whileTap: { scale: 0.95 },
        };
      case "slide":
        return {
          whileHover: { 
            x: [0, 5, 0],
            transition: { 
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop" as const
            }
          },
          whileTap: { x: -5 },
        };
      default:
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: { duration: 0.2 }
        };
    }
  };
  
  // 如果有href，渲染为链接
  if (href) {
    const linkProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
    
    if (isAnimated) {
      return (
        <motion.div {...getAnimationProps()}>
          <Link href={href} {...linkProps} className={buttonStyles}>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </Link>
        </motion.div>
      );
    }
    
    return (
      <Link href={href} {...linkProps} className={buttonStyles}>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Link>
    );
  }
  
  // 否则渲染为按钮
  if (isAnimated) {
    return (
      <motion.button
        className={buttonStyles}
        {...getAnimationProps()}
        {...props as any}
      >
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </motion.button>
    );
  }
  
  // 无动画按钮
  return (
    <button
      className={buttonStyles}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
} 