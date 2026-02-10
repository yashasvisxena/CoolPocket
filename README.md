# CoolPockett — Account Opening Wizard

A mobile-first, responsive 4-step account opening wizard built with React 19, TypeScript, and modern tooling.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

| Tool                | Purpose                                 |
| ------------------- | --------------------------------------- |
| **React 19**        | UI framework                            |
| **TypeScript**      | Type safety                             |
| **Vite**            | Build tool + HMR                        |
| **Tailwind CSS v4** | Utility-first styling                   |
| **React Hook Form** | Form state management                   |
| **Zod**             | Schema validation                       |
| **Zustand**         | Global state + localStorage persistence |
| **React Compiler**  | Auto-memoization                        |

## Wizard Steps

1. **Account Basics** — Name, email, phone, country, password (with strength indicator)
2. **Account Setup** — Account type (Individual/Business), product goal (Spend/Save/Invest), monthly volume slider
3. **Details** — Conditional fields based on account type and country (e.g., PAN for India, SSN for US)
4. **Review & Submit** — Summary of all entered data with account preview

## Key Features

- **Resume after reload** — Form data auto-saves to localStorage as you type (debounced), so you can refresh and pick up exactly where you left off
- **Step-level validation** — Can't advance to the next step without passing Zod validation
- **Conditional rendering** — Step 3 dynamically shows different fields based on account type (Individual vs Business) and country (US, India, Other)
- **Code splitting** — Each step is lazy-loaded for fast initial page load
- **Accessible** — Respects `prefers-reduced-motion`, proper ARIA labels, keyboard-navigable
- **Mobile-first** — Designed for touch with 44px minimum tap targets

## Project Structure

```
src/
├── components/
│   ├── ui/            # Reusable primitives (Input, Select, Button, etc.)
│   └── wizard/        # WizardLayout (header + footer + progress dots)
├── pages/             # Step pages (lazy loaded)
├── store/             # Zustand store with persist middleware
├── schemas/           # Zod validation schemas
├── hooks/             # Custom hooks (useAutoSave)
└── types/             # TypeScript interfaces + constants
```

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build (tsc + vite build)
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Trade-offs

- **Custom UI over libraries** — Built all components from scratch for learning/demo purposes. A real app would probably use Radix or similar for accessibility.
- **localStorage persistence** — Simple but not secure for sensitive data like passwords. Production would use encrypted storage or server-side sessions.