import React from "react";

/**
 * IndexNode CRM brand mark — a lightning bolt.
 * Renders as an inline SVG using `currentColor` so it
 * automatically inherits whatever text/fill color is set by
 * the parent (e.g. text-primary-foreground in the sidebar pill,
 * text-primary on the auth pages).
 */
export function IndexNodeLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Lightning bolt path — two-tone polygon for a bold, modern mark */}
      <path d="M13 2L4.5 13.5H11L10 22L19.5 10H13L13 2Z" />
    </svg>
  );
}
