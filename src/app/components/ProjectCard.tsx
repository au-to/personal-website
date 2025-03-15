"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  tech,
  image,
  link,
  index,
}: ProjectCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
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
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500">项目预览图</span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
          >
            查看项目
            <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
} 