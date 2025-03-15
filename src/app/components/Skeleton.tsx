"use client";

import React from "react";

interface SkeletonProps {
  type: "text" | "title" | "image" | "card" | "blog-card" | "project-card";
  width?: string;
  height?: string;
  className?: string;
}

export default function Skeleton({ type, width, height, className = "" }: SkeletonProps) {
  const baseClass = "bg-gray-200 dark:bg-gray-700 rounded animate-pulse";
  
  switch (type) {
    case "text":
      return <div className={`h-4 ${width || "w-full"} ${baseClass} ${className}`} />;
    case "title":
      return <div className={`h-8 ${width || "w-48"} ${baseClass} ${className}`} />;
    case "image":
      return <div className={`${height || "h-48"} ${width || "w-full"} ${baseClass} ${className}`} />;
    case "card":
      return (
        <div className={`${height || "h-64"} ${width || "w-full"} ${baseClass} ${className}`} />
      );
    case "blog-card":
      return (
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700" />
          <div className="p-6">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4" />
            <div className="flex flex-wrap gap-2 mb-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"
                />
              ))}
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          </div>
        </div>
      );
    case "project-card":
      return (
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700" />
          <div className="p-6">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4" />
            <div className="flex flex-wrap gap-2 mb-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"
                />
              ))}
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          </div>
        </div>
      );
    default:
      return <div className={`${height || "h-4"} ${width || "w-full"} ${baseClass} ${className}`} />;
  }
} 