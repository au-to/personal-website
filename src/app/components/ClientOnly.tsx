"use client";

import { useState, useEffect, useLayoutEffect, ReactNode } from "react";

// 创建一个安全的 useLayoutEffect 版本，在 SSR 环境中回退到 useEffect
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ClientOnly({ children, fallback }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);

  // 使用 useIsomorphicLayoutEffect 减少闪烁
  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
} 