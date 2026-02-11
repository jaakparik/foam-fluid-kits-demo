# Foam Fluid Kits Demo

## Project Overview
SaaS demo project showcasing Fluid Kits component library. Built with React, TypeScript, Vite, Tailwind CSS v4, and shadcn/ui.

## Tech Stack
- **Framework:** React 19 + TypeScript + Vite 7
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin) + shadcn/ui
- **Font:** Inter (from Google Fonts, loaded in `index.html`)
- **Icons:** lucide-react + custom icons in `src/components/icons/`

## Key Paths
- `src/components/ui/` — shadcn/ui components (add via `npx shadcn@latest add <component>`)
- `src/components/icons/` — custom SVG icons (lucide-compatible API)
- `src/data/dummy.ts` — all placeholder text, image refs, and video refs
- `src/index.css` — Tailwind imports + CSS custom properties (shadcn theme)
- `public/images/` — static image assets
- `public/videos/` — static video assets

## Commands
- `npm run dev` — start dev server
- `npm run build` — type-check + production build
- `npx shadcn@latest add <component>` — add a shadcn/ui component

## Conventions

### File Structure
- **One file per component/page/card.** Keep files small and single-purpose.
- Do NOT merge different functionalities into the same file.
- Pages, components, and cards each get their own file.
- Exception: only combine if there is no practical reason to separate.

### Content Rules
- **Never invent content.** All text, images, icons, and data come from Figma or from chat instructions.
- Do not add placeholder copy, random features, or made-up UI elements.
- If content is missing, ASK — do not guess.

### Styling Rules
- **Use Tailwind tokens exclusively.** No hardcoded colors, sizes, spacing, or font values.
- If a needed token doesn't exist, ask before creating one.
- This code will be reused in production — write it accordingly.

### Interaction States
- **All interactive elements** (buttons, links, tabs, inputs, etc.) must have:
  - Hover states
  - `cursor-pointer` (or appropriate cursor) on hover
  - Visible feedback on interaction

### Terminology
- "Talent" and "creators" mean the same thing in this project.

### Other
- Import alias: `@/` maps to `src/`
- Custom icons follow lucide naming: PascalCase, accept `LucideProps`, 24x24 viewBox
- Theme colors use oklch via CSS custom properties (`:root` / `.dark` scopes)
- Dummy data lives in `src/data/` — replace fields as real content comes in

## Figma Integration
- MCP server configured in `.mcp.json` (needs `FIGMA_API_KEY` env var)
- Use `get_design_context` and `get_screenshot` tools to pull Figma designs
- Designs inform component structure and styling — always cross-reference Figma when building UI
