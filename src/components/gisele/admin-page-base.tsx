import { cn } from "@/lib/utils";
import React from "react";

export type DashboardPageGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

export function DashboardPage({ className, children }: DashboardPageGenericProps) {
  return <section className={cn("", className)}>{children}</section>;
}

export function DashboardPageHeader({
  className,
  children,
}: DashboardPageGenericProps) {
  return (
    <header className={cn("px-6 py-3 border-b border-border", className)}>
      {children}
    </header>
  );
}

export function DashboardPageHeaderTitle({
  className,
  children,
}: DashboardPageGenericProps) {
  return <h1 className={cn("", className)}>{children}</h1>;
}

export function DashboardPageHeaderNav({
  className,
  children,
}: DashboardPageGenericProps) {
  return <nav className={cn("", className)}>{children}</nav>;
}

export function DashboardPageMain({
  className,
  children,
}: DashboardPageGenericProps) {
  return <main className={cn("p-6", className)}>{children}</main>;
}

// PAREI https://youtu.be/d3AV4ulSYUU?t=3181
