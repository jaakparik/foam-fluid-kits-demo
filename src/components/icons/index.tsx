import type { LucideProps } from "lucide-react";

/**
 * Custom icons following the lucide naming convention.
 * Each icon is a React component that accepts standard lucide props
 * (size, color, strokeWidth, className, etc.)
 *
 * Usage:
 *   import { LogoMark, Placeholder } from "@/components/icons"
 *   <LogoMark size={24} className="text-primary" />
 *
 * To add a new custom icon:
 *   1. Export a new component from this file
 *   2. Use the same SVG structure (24x24 viewBox, stroke-based)
 *   3. Spread ...props onto the <svg> element
 *   4. Use currentColor for stroke/fill to respect parent color
 */

export function LogoMark({
  size = 24,
  strokeWidth = 2,
  className,
  ...props
}: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

export function Placeholder({
  size = 24,
  strokeWidth = 2,
  className,
  ...props
}: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="3" x2="21" y2="21" />
    </svg>
  );
}
