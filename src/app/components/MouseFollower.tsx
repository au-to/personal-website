"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

interface MouseFollowerProps {
  size?: number;
  color?: string;
  blur?: number;
  opacity?: number;
  delay?: number;
  showTrail?: boolean;
  trailCount?: number;
}

export default function MouseFollower({
  size = 20,
  color = "rgba(99, 102, 241, 0.5)",
  blur = 10,
  opacity = 0.5,
  delay = 0.05,
  showTrail = true,
  trailCount = 5,
}: MouseFollowerProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number }>>([]);

  // 使用防抖处理鼠标移动事件
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // 使用 requestAnimationFrame 减少更新频率
    requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    if (showTrail) {
      setTrailPositions((prev) => {
        const newPositions = [mousePosition, ...prev.slice(0, trailCount - 1)];
        return newPositions;
      });
    }
  }, [mousePosition, showTrail, trailCount]);

  // 使用 useMemo 缓存主光标样式
  const mainCursorStyle = useMemo(() => ({
    width: size,
    height: size,
    backgroundColor: color,
    filter: `blur(${blur}px)`,
    opacity,
  }), [size, color, blur, opacity]);

  // 使用 useMemo 缓存主光标动画配置
  const mainCursorTransition = useMemo(() => ({
    type: "spring",
    damping: 25,
    stiffness: 300,
    mass: 0.5,
  }), []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* 主光标 */}
      <motion.div
        className="absolute rounded-full"
        style={mainCursorStyle}
        animate={{
          x: mousePosition.x - size / 2,
          y: mousePosition.y - size / 2,
        }}
        transition={mainCursorTransition}
      />

      {/* 光标轨迹 */}
      {showTrail &&
        trailPositions.map((position, index) => {
          // 计算每个轨迹点的大小和样式
          const trailSize = size * (1 - index * 0.15);
          const trailStyle = {
            width: trailSize,
            height: trailSize,
            backgroundColor: color,
            filter: `blur(${blur * (1 + index * 0.2)}px)`,
            opacity: opacity * (1 - index * 0.15),
          };
          
          const trailTransition = {
            type: "spring",
            damping: 25 - index * 2,
            stiffness: 300 - index * 20,
            mass: 0.5 + index * 0.1,
            delay: delay * index,
          };
          
          return (
            <motion.div
              key={index}
              className="absolute rounded-full"
              style={trailStyle}
              animate={{
                x: position.x - trailSize / 2,
                y: position.y - trailSize / 2,
              }}
              transition={trailTransition}
            />
          );
        })}
    </div>
  );
} 