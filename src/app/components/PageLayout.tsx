"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import { siteConfig } from "../../../siteConfig";

interface PageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
  className?: string;
}

export default function PageLayout({
  title,
  description,
  children,
  showNavbar = true,
  showFooter = false,
  className = "",
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {showNavbar && <Navbar />}
      
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${className}`}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            {title}
          </motion.h1>
          
          {description && (
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {description}
            </motion.p>
          )}
        </motion.div>
        
        {children}
      </div>
      
      {showFooter && (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} {siteConfig.siteName}. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
} 