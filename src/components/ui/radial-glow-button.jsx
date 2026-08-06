"use client";
import React from "react";
import { cn } from "@/lib/utils";
import styles from "./radial-glow-button.module.css";

export function RadialGlowButton({
  children = "Register Now",
  className,
  ...props
}) {
  return (
    <button className={cn(styles.rgButton, "rg-button", className)} type="button" {...props}>
      {children}
    </button>
  );
}

export default RadialGlowButton;
