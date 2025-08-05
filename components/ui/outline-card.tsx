// components/ui/outline-card.tsx
import React from "react";

interface OutlineCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  accentColor?: "mint" | "coral" | "lavender";
}

export function OutlineCard({
  children,
  className = "",
  hover = false,
  accentColor,
}: OutlineCardProps) {
  const baseClasses = "card-base";
  const hoverClasses = hover ? "hover:scale-105 cursor-pointer" : "";
  const accentClasses = accentColor
    ? {
        mint: "hover:outline-mint",
        coral: "hover:outline-coral",
        lavender: "hover:outline-lavender",
      }[accentColor]
    : "";

  const classes = `${baseClasses} ${hoverClasses} ${accentClasses} ${className}`;
  return <div className={classes}>{children}</div>;
}

interface OutlineCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function OutlineCardContent({
  children,
  className = "",
}: OutlineCardContentProps) {
  return <div className={`p-3 ${className}`}>{children}</div>;
}
