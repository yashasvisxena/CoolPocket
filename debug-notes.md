# Debug Notes — CoolPockett

Notes on decisions, gotchas, and things worth knowing if you're debugging or extending this codebase.

## Zustand Persist + React Hook Form Sync

The form data lives in two places: React Hook Form (local to each step component) and Zustand (global, persisted to localStorage). The flow is:

1. On mount → `useEffect` calls `reset(formData.stepN)` to hydrate the form from the store
2. While typing → `useAutoSave` hook watches form values, debounces (400ms), and pushes them to the store
3. On submit → `onSubmit` saves final validated data to store and advances the step

**Gotcha:** If you see stale data after reload, check that the `useAutoSave` hook is actually connected. The debounce means the very last keystroke before a hard refresh might not be saved (~400ms window).

## Step 3 Dynamic Schema

`getStep3Schema()` builds a Zod schema on the fly based on `accountType` and `country`. Because it starts from `z.object({})` and extends it, the TypeScript types don't perfectly align with `Step3Data`. That's why there's an `as any` cast on the resolver — it's the pragmatic choice since the runtime behavior is correct.

If you wanted to fix it properly, you'd need to define separate schemas for each combination (individual+US, business+IN, etc.) and use a discriminated union. Not worth the complexity for a wizard this size.

## Country Type Narrowing

`Step1Data.country` is typed as `Country | ''` (the empty string is for "no selection yet"). This means comparisons like `country !== ''` trigger TS errors because `Country` doesn't include `''` once it's narrowed through the enum check. We handle this with `as string` casts where needed.

## Password Field

The `PasswordInput` component handles both show/hide toggle and the strength indicator. The strength calculation is inline rather than in a separate hook (the plan mentioned `usePasswordStrength` but it's simple enough to keep in-component). Strength tiers:

- **Weak** — less than 3 criteria met
- **Fair** — 3 criteria met
- **Strong** — all 4 criteria met (length ≥ 8, uppercase, lowercase, number)

## Code Splitting

Each step page is lazy-loaded via `React.lazy()` in `App.tsx`. The production build confirms this — you'll see separate chunks:

```
Step1AccountBasics-xxx.js
Step2AccountSetup-xxx.js
Step3Details-xxx.js
Step4Review-xxx.js
```

This means Step 3 and 4 code isn't loaded until the user actually reaches those steps.

## Animations

- `animate-fadeIn` — used on step content transitions (left-to-right slide)
- `animate-slideUp` — used on the success state after submission
- All animations respect `prefers-reduced-motion` via a CSS media query

## localStorage Key

The Zustand store persists under the key `coolpockett-wizard`. To reset all state during development:

```js
localStorage.removeItem("coolpockett-wizard");
```
