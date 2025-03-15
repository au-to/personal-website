"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, useMemo } from "react";

interface AnimatedElementProps {
  children: ReactNode;
  type: "fadeIn" | "fadeInUp" | "fadeInDown" | "scale" | "stagger" | "slideIn" | "rotate" | "bounce" | "pulse" | "flip" | "rubberBand" | "swing" | "tada" | "jello" | "heartBeat" | "hinge" | "jackInTheBox";
  delay?: number;
  duration?: number;
  className?: string;
  index?: number; // 用于交错动画
  direction?: "left" | "right" | "top" | "bottom"; // 用于滑动方向
  whileInView?: boolean; // 是否在视图中时触发动画
  once?: boolean; // 动画是否只播放一次
  hover?: boolean; // 是否在悬停时触发动画
  tap?: boolean; // 是否在点击时触发动画
  viewport?: { margin?: string; amount?: "some" | "all" | number }; // 视口选项
}

export default function AnimatedElement({
  children,
  type,
  delay = 0,
  duration = 0.5,
  className = "",
  index = 0,
  direction = "left",
  whileInView = false,
  once = true,
  hover = false,
  tap = false,
  viewport = { margin: "-100px", amount: 0.1 },
}: AnimatedElementProps) {
  // 检测用户是否开启了减少动画选项
  const shouldReduceMotion = useReducedMotion();

  // 基础动画配置
  const baseTransition = useMemo(() => ({
    duration,
    delay: delay + (type === "stagger" ? index * 0.1 : 0),
    ease: [0.25, 0.1, 0.25, 1], // 平滑的缓动函数
  }), [duration, delay, type, index]);

  // 根据类型选择动画配置
  const animationProps = useMemo(() => {
    // 如果用户开启了减少动画选项，则只使用淡入淡出效果
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: whileInView ? undefined : { opacity: 1 },
        whileInView: whileInView ? { opacity: 1 } : undefined,
        viewport: whileInView ? { once, ...viewport } : undefined,
        transition: baseTransition,
      };
    }

    switch (type) {
      case "fadeIn":
        return {
          initial: { opacity: 0 },
          animate: whileInView ? undefined : { opacity: 1 },
          whileInView: whileInView ? { opacity: 1 } : undefined,
          viewport: whileInView ? { once, ...viewport } : undefined,
          transition: baseTransition,
          whileHover: hover ? { scale: 1.05 } : undefined,
          whileTap: tap ? { scale: 0.95 } : undefined,
        };
      case "fadeInUp":
        return {
          initial: { opacity: 0, y: 20 },
          animate: whileInView ? undefined : { opacity: 1, y: 0 },
          whileInView: whileInView ? { opacity: 1, y: 0 } : undefined,
          viewport: whileInView ? { once, ...viewport } : undefined,
          transition: baseTransition,
          whileHover: hover ? { scale: 1.05, y: -5 } : undefined,
          whileTap: tap ? { scale: 0.95 } : undefined,
        };
      case "fadeInDown":
        return {
          initial: { opacity: 0, y: -20 },
          animate: whileInView ? undefined : { opacity: 1, y: 0 },
          whileInView: whileInView ? { opacity: 1, y: 0 } : undefined,
          viewport: whileInView ? { once, ...viewport } : undefined,
          transition: baseTransition,
          whileHover: hover ? { scale: 1.05, y: 5 } : undefined,
          whileTap: tap ? { scale: 0.95 } : undefined,
        };
      case "scale":
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: whileInView ? undefined : { opacity: 1, scale: 1 },
          whileInView: whileInView ? { opacity: 1, scale: 1 } : undefined,
          viewport: whileInView ? { once, ...viewport } : undefined,
          transition: baseTransition,
          whileHover: hover ? { scale: 1.1 } : undefined,
          whileTap: tap ? { scale: 0.9 } : undefined,
        };
      case "stagger":
        return {
          initial: { opacity: 0, y: 20 },
          animate: whileInView ? undefined : { opacity: 1, y: 0 },
          whileInView: whileInView ? { opacity: 1, y: 0 } : undefined,
          viewport: whileInView ? { once, ...viewport } : undefined,
          transition: baseTransition,
          whileHover: hover ? { scale: 1.05, y: -5 } : undefined,
          whileTap: tap ? { scale: 0.95 } : undefined,
        };
      case "slideIn":
        const slideDirections = {
          left: { x: -50, y: 0 },
          right: { x: 50, y: 0 },
          top: { x: 0, y: -50 },
          bottom: { x: 0, y: 50 },
        };
        return {
          initial: { opacity: 0, ...slideDirections[direction] },
          animate: whileInView ? undefined : { opacity: 1, x: 0, y: 0 },
          whileInView: whileInView ? { opacity: 1, x: 0, y: 0 } : undefined,
          viewport: whileInView ? { once, ...viewport } : undefined,
          transition: baseTransition,
          whileHover: hover ? { scale: 1.05 } : undefined,
          whileTap: tap ? { scale: 0.95 } : undefined,
        };
      case "rotate":
        return {
          initial: { opacity: 0, rotate: direction === "left" ? -10 : 10 },
          animate: whileInView ? undefined : { opacity: 1, rotate: 0 },
          whileInView: whileInView ? { opacity: 1, rotate: 0 } : undefined,
          viewport: whileInView ? { once, ...viewport } : undefined,
          transition: baseTransition,
          whileHover: hover ? { rotate: direction === "left" ? -5 : 5 } : undefined,
          whileTap: tap ? { scale: 0.95 } : undefined,
        };
      case "bounce":
        return {
          initial: { opacity: 0, y: -20 },
          animate: whileInView ? undefined : { opacity: 1, y: 0 },
          whileInView: whileInView ? { opacity: 1, y: 0 } : undefined,
          viewport: whileInView ? { once, ...viewport } : undefined,
          transition: {
            ...baseTransition,
            type: "spring",
            stiffness: 300,
            damping: 10,
          },
          whileHover: hover ? { y: -10, transition: { type: "spring", stiffness: 400 } } : undefined,
          whileTap: tap ? { y: 5 } : undefined,
        };
      case "pulse":
        return {
          initial: { opacity: 0.6, scale: 0.95 },
          animate: whileInView ? undefined : { 
            opacity: 1, 
            scale: 1,
          },
          whileInView: whileInView ? { opacity: 1, scale: 1 } : undefined,
          viewport: whileInView ? { once: false, ...viewport } : undefined,
          transition: {
            ...baseTransition,
            repeat: Infinity,
            repeatType: "reverse" as const,
            duration: 1.5,
          },
          whileHover: hover ? { scale: 1.1 } : undefined,
          whileTap: tap ? { scale: 0.9 } : undefined,
        };
      case "flip":
        return {
          initial: { opacity: 0, rotateY: 90 },
          animate: whileInView ? undefined : { opacity: 1, rotateY: 0 },
          whileInView: whileInView ? { opacity: 1, rotateY: 0 } : undefined,
          viewport: whileInView ? { once, ...viewport } : undefined,
          transition: { ...baseTransition, duration: duration * 1.5 },
          whileHover: hover ? { rotateY: 15 } : undefined,
          whileTap: tap ? { rotateY: -15 } : undefined,
        };
      case "rubberBand":
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: whileInView ? undefined : { 
            opacity: 1, 
            scale: [0.9, 1.1, 0.9, 1.1, 0.9, 1.05, 1]
          },
          whileInView: whileInView ? { 
            opacity: 1, 
            scale: [0.9, 1.1, 0.9, 1.1, 0.9, 1.05, 1]
          } : undefined,
          viewport: whileInView ? { once, ...viewport } : undefined,
          transition: { ...baseTransition, duration: duration * 1.5 },
          whileHover: hover ? { scale: [1, 1.1, 0.9, 1.05, 0.95, 1] } : undefined,
          whileTap: tap ? { scale: 0.95 } : undefined,
        };
      case "swing":
        return {
          initial: { opacity: 0, rotate: 0 },
          animate: whileInView ? undefined : { 
            opacity: 1, 
            rotate: [0, 15, -10, 5, -5, 0]
          },
          whileInView: whileInView ? { 
            opacity: 1, 
            rotate: [0, 15, -10, 5, -5, 0]
          } : undefined,
          viewport: whileInView ? { once, ...viewport } : undefined,
          transition: { ...baseTransition, duration: duration * 1.5 },
          whileHover: hover ? { rotate: [0, 10, -5, 3, -2, 0] } : undefined,
          whileTap: tap ? { scale: 0.95 } : undefined,
        };
      case "tada":
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: whileInView ? undefined : { 
            opacity: 1, 
            scale: [0.9, 1, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
            rotate: [0, 0, -3, 3, -3, 3, -3, 3, -3, 0]
          },
          whileInView: whileInView ? { 
            opacity: 1, 
            scale: [0.9, 1, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
            rotate: [0, 0, -3, 3, -3, 3, -3, 3, -3, 0]
          } : undefined,
          viewport: whileInView ? { once, ...viewport } : undefined,
          transition: { ...baseTransition, duration: duration * 2 },
          whileHover: hover ? { 
            scale: [1, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
            rotate: [0, 0, -2, 2, -2, 2, -2, 2, 0]
          } : undefined,
          whileTap: tap ? { scale: 0.95 } : undefined,
        };
      case "jello":
        return {
          initial: { opacity: 0, skewX: 0, skewY: 0 },
          animate: whileInView ? undefined : { 
            opacity: 1, 
            skewX: [0, 0, -12.5, 6.25, -3.125, 1.5625, -0.78125, 0],
            skewY: [0, 0, -12.5, 6.25, -3.125, 1.5625, -0.78125, 0]
          },
          whileInView: whileInView ? { 
            opacity: 1, 
            skewX: [0, 0, -12.5, 6.25, -3.125, 1.5625, -0.78125, 0],
            skewY: [0, 0, -12.5, 6.25, -3.125, 1.5625, -0.78125, 0]
          } : undefined,
          viewport: whileInView ? { once, ...viewport } : undefined,
          transition: { ...baseTransition, duration: duration * 2 },
          whileHover: hover ? { 
            skewX: [0, -6.5, 3.25, -1.625, 0.8125, -0.4, 0],
            skewY: [0, -6.5, 3.25, -1.625, 0.8125, -0.4, 0]
          } : undefined,
          whileTap: tap ? { scale: 0.95 } : undefined,
        };
      case "heartBeat":
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: whileInView ? undefined : { 
            opacity: 1, 
            scale: [0.9, 1.1, 1, 1.1, 1]
          },
          whileInView: whileInView ? { 
            opacity: 1, 
            scale: [0.9, 1.1, 1, 1.1, 1]
          } : undefined,
          viewport: whileInView ? { once, ...viewport } : undefined,
          transition: { 
            ...baseTransition, 
            duration: duration * 1.5,
            times: [0, 0.14, 0.28, 0.42, 0.7]
          },
          whileHover: hover ? { scale: [1, 1.1, 1, 1.05, 1] } : undefined,
          whileTap: tap ? { scale: 0.95 } : undefined,
        };
      case "hinge":
        return {
          initial: { opacity: 1, rotateZ: 0, originX: "top", originY: "left" },
          animate: whileInView ? undefined : { 
            opacity: [1, 1, 1, 1, 0], 
            rotateZ: [0, 80, 60, 80, 60],
            y: [0, 0, 0, 0, 700]
          },
          whileInView: whileInView ? { 
            opacity: [1, 1, 1, 1, 0], 
            rotateZ: [0, 80, 60, 80, 60],
            y: [0, 0, 0, 0, 700]
          } : undefined,
          viewport: whileInView ? { once, ...viewport } : undefined,
          transition: { 
            ...baseTransition, 
            duration: duration * 3,
            times: [0, 0.2, 0.4, 0.6, 0.8]
          },
          whileHover: hover ? { rotateZ: 15 } : undefined,
          whileTap: tap ? { rotateZ: -15 } : undefined,
        };
      case "jackInTheBox":
        return {
          initial: { opacity: 0, scale: 0.1, rotate: 30, originX: "center", originY: "bottom" },
          animate: whileInView ? undefined : { 
            opacity: 1, 
            scale: 1,
            rotate: 0
          },
          whileInView: whileInView ? { 
            opacity: 1, 
            scale: 1,
            rotate: 0
          } : undefined,
          viewport: whileInView ? { once, ...viewport } : undefined,
          transition: { ...baseTransition, duration: duration * 1.5 },
          whileHover: hover ? { scale: 1.05, rotate: -5 } : undefined,
          whileTap: tap ? { scale: 0.95, rotate: 5 } : undefined,
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: whileInView ? undefined : { opacity: 1 },
          whileInView: whileInView ? { opacity: 1 } : undefined,
          viewport: whileInView ? { once, ...viewport } : undefined,
          transition: baseTransition,
        };
    }
  }, [type, baseTransition, whileInView, once, viewport, hover, tap, shouldReduceMotion, direction]);

  return (
    <motion.div
      className={className}
      {...animationProps}
    >
      {children}
    </motion.div>
  );
} 