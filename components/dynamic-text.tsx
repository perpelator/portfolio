"use client";

import { useState, useEffect } from "react";

interface DynamicTextProps {
  items?: string[];
}

export function DynamicText({ items }: DynamicTextProps) {
  const defaultItems = [
    "building scalable applications",
    "creating beautiful user interfaces",
    "solving complex problems",
    "learning new technologies",
    "collaborating with teams",
  ];

  const textItems = items && items.length > 0 ? items : defaultItems;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentText = textItems[currentIndex];

    if (isTyping) {
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % textItems.length);
      }
    }
  }, [displayText, isTyping, currentIndex, textItems]);

  return (
    <span className="text-blue-400">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
