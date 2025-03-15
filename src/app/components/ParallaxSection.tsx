"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number; // 视差速度，负值表示向上移动，正值表示向下移动
  direction?: "vertical" | "horizontal";
  offset?: number; // 初始偏移量
  opacityEffect?: boolean; // 是否添加透明度效果
  scaleEffect?: boolean; // 是否添加缩放效果
  rotateEffect?: boolean; // 是否添加旋转效果
  rotateDegree?: number; // 旋转角度
  whileInView?: boolean; // 是否在视图中时触发动画
}

export default function ParallaxSection({
  children,
  className = "",
  speed = 0.5,
  direction = "vertical",
  offset = 0,
  opacityEffect = false,
  scaleEffect = false,
  rotateEffect = false,
  rotateDegree = 5,
  whileInView = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  // 检测用户是否开启了减少动画选项
  const shouldReduceMotion = useReducedMotion();
  
  // 使用 useScroll 的 offset 选项优化滚动计算
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 将所有 useTransform 钩子移到顶层
  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [offset, offset - 100 * speed]
  );

  const xTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [offset, offset - 100 * speed]
  );

  const opacityTransform = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [0.5, 1, 0.5]
  );

  const scaleTransform = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [0.95, 1, 0.95]
  );

  const rotateTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, rotateDegree * (speed > 0 ? 1 : -1)]
  );

  // 根据用户设置和减少动画选项构建样式对象
  const style = {
    y: shouldReduceMotion ? 0 : (direction === "vertical" ? yTransform : 0),
    x: shouldReduceMotion ? 0 : (direction === "horizontal" ? xTransform : 0),
    opacity: shouldReduceMotion ? 1 : (opacityEffect ? opacityTransform : 1),
    scale: shouldReduceMotion ? 1 : (scaleEffect ? scaleTransform : 1),
    rotate: shouldReduceMotion ? 0 : (rotateEffect ? rotateTransform : 0)
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={style}
        transition={{ duration: 0 }} // 确保滚动时没有额外的动画延迟
      >
        {children}
      </motion.div>
    </div>
  );
} 