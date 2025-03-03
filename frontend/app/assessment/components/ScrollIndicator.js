"use client";
import React, { useState, useEffect } from "react";

const ScrollIndicator = ({ targetRef }) => {
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = targetRef.current;
      
      setShowIndicator(scrollTop + clientHeight < scrollHeight - 5);
    };

    const targetElement = targetRef.current;
    if (targetElement) {
      targetElement.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (targetElement) {
        targetElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [targetRef]);

  return (
    <div
      className={`fixed bottom-0 left-60 w-[calc(100%-15rem)] h-5 bg-gradient-to-t from-gray-400/30 to-transparent transition-opacity ${
        showIndicator ? "opacity-100" : "opacity-0"
      } pointer-events-none`}
    />
  );
};

export default ScrollIndicator;
