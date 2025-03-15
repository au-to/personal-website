"use client";

import { ReactNode, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
  mode?: "fade" | "slide" | "scale" | "flip" | "rotate" | "none";
  duration?: number;
}

export default function PageTransition({
  children,
  mode = "fade",
  duration = 0.5,
}: PageTransitionProps) {
  const pathname = usePathname();
  // 检测用户是否开启了减少动画选项
  const shouldReduceMotion = useReducedMotion();

  // 不同的过渡效果
  const variants = useMemo(() => {
    // 如果用户开启了减少动画选项，则只使用淡入淡出效果或无效果
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };
    }

    switch (mode) {
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
      case "slide":
        return {
          initial: { x: "100%", opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: "-100%", opacity: 0 },
        };
      case "scale":
        return {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.8, opacity: 0 },
        };
      case "flip":
        return {
          initial: { rotateY: 90, opacity: 0 },
          animate: { rotateY: 0, opacity: 1 },
          exit: { rotateY: -90, opacity: 0 },
        };
      case "rotate":
        return {
          initial: { rotate: 5, opacity: 0, scale: 0.9 },
          animate: { rotate: 0, opacity: 1, scale: 1 },
          exit: { rotate: -5, opacity: 0, scale: 0.9 },
        };
      case "none":
      default:
        return {
          initial: {},
          animate: {},
          exit: {},
        };
    }
  }, [mode, shouldReduceMotion]);

  // 使用 useMemo 缓存过渡配置
  const transition = useMemo(() => ({
    duration,
    ease: [0.25, 0.1, 0.25, 1], // 平滑的缓动函数
  }), [duration]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={transition}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 