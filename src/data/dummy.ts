/**
 * Dummy data for the demo project.
 * Replace with real data from your API or CMS as needed.
 */

// ===== Text Content =====

export const siteConfig = {
  name: "Fluid Kits",
  description: "Build beautiful SaaS interfaces faster with pre-built component kits.",
  tagline: "Ship faster. Look better.",
};

export const navItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
];

export const heroContent = {
  headline: "The modern toolkit for SaaS teams",
  subheadline:
    "Pre-built components, design tokens, and patterns that help you ship production-ready interfaces in hours, not weeks.",
  primaryCta: "Get Started",
  secondaryCta: "View Demo",
};

export const features = [
  {
    id: "feature-1",
    title: "Component Library",
    description:
      "50+ production-ready components built with shadcn/ui and Tailwind CSS. Fully customizable and accessible.",
    icon: "Blocks" as const,
  },
  {
    id: "feature-2",
    title: "Design Tokens",
    description:
      "A unified token system for colors, spacing, and typography that keeps your UI consistent at scale.",
    icon: "Palette" as const,
  },
  {
    id: "feature-3",
    title: "Dark Mode",
    description:
      "Built-in dark mode support with smooth transitions. Works with system preferences out of the box.",
    icon: "Moon" as const,
  },
  {
    id: "feature-4",
    title: "Responsive Layout",
    description:
      "Every component adapts beautifully from mobile to desktop. No media query headaches.",
    icon: "Smartphone" as const,
  },
  {
    id: "feature-5",
    title: "Performance First",
    description:
      "Tree-shakeable, code-split, and optimized. Your bundle only includes what you actually use.",
    icon: "Zap" as const,
  },
  {
    id: "feature-6",
    title: "TypeScript Native",
    description:
      "Full type safety with auto-complete. Catch errors before they reach production.",
    icon: "Code" as const,
  },
];

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for side projects and experiments.",
    features: [
      "10 core components",
      "Basic theming",
      "Community support",
      "MIT license",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$49",
    period: "per month",
    description: "Everything you need for production apps.",
    features: [
      "50+ components",
      "Advanced theming",
      "Priority support",
      "Figma source files",
      "Custom icon set",
      "Dark mode",
    ],
    cta: "Start Trial",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "per year",
    description: "For teams that need more control and support.",
    features: [
      "Unlimited components",
      "White-label theming",
      "Dedicated support",
      "SLA guarantee",
      "Custom development",
      "SSO & audit logs",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export const testimonials = [
  {
    id: "testimonial-1",
    quote:
      "Fluid Kits cut our frontend development time in half. The components just work.",
    author: "Sarah Chen",
    role: "CTO",
    company: "Stackbase",
    avatar: "/images/avatar-1.jpg",
  },
  {
    id: "testimonial-2",
    quote:
      "The design quality is outstanding. Our designers actually enjoy working with these components.",
    author: "Marcus Rivera",
    role: "Head of Design",
    company: "Cloudform",
    avatar: "/images/avatar-2.jpg",
  },
  {
    id: "testimonial-3",
    quote:
      "We shipped our entire dashboard in a week. Couldn't have done it without Fluid Kits.",
    author: "Aisha Patel",
    role: "Engineering Lead",
    company: "Nexora",
    avatar: "/images/avatar-3.jpg",
  },
];

export const stats = [
  { label: "Components", value: "50+" },
  { label: "Teams Using", value: "2,400+" },
  { label: "Downloads", value: "180K" },
  { label: "GitHub Stars", value: "12K" },
];

export const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#changelog" },
    { label: "Roadmap", href: "#roadmap" },
  ],
  resources: [
    { label: "Documentation", href: "#docs" },
    { label: "API Reference", href: "#api" },
    { label: "Examples", href: "#examples" },
    { label: "Blog", href: "#blog" },
  ],
  company: [
    { label: "About", href: "#about" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
    { label: "Legal", href: "#legal" },
  ],
};

// ===== Image Placeholders =====
// These reference files in /public/images/
// Replace with real assets when available

export const images = {
  heroScreenshot: "/images/hero-screenshot.png",
  dashboardPreview: "/images/dashboard-preview.png",
  featureShowcase: "/images/feature-showcase.png",
  avatars: [
    "/images/avatar-1.jpg",
    "/images/avatar-2.jpg",
    "/images/avatar-3.jpg",
  ],
  logos: [
    "/images/logo-client-1.svg",
    "/images/logo-client-2.svg",
    "/images/logo-client-3.svg",
    "/images/logo-client-4.svg",
    "/images/logo-client-5.svg",
  ],
};

// ===== Video Placeholders =====
// These reference files in /public/videos/
// Replace with real assets when available

export const videos = {
  productDemo: {
    src: "/videos/product-demo.mp4",
    poster: "/images/video-poster.png",
    title: "Product Demo",
    duration: "2:30",
  },
  featureWalkthrough: {
    src: "/videos/feature-walkthrough.mp4",
    poster: "/images/video-poster-2.png",
    title: "Feature Walkthrough",
    duration: "5:15",
  },
};
