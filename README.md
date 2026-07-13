# Gacha Reveal v.1

A 3D gacha-machine reveal built with React Three Fiber. Click "Open Gacha" to spin a random prize on a convenience-store set, with tier-based confetti (SS/S/A).

Demo: [Link](https://LewisLim.github.io/gacha-reveal-v1/)

## Stack

React 19 · TypeScript · Vite · Three.js · @react-three/fiber + drei · Tailwind

## Getting started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` – start dev server
- `npm run build` – typecheck + production build
- `npm run lint` – run ESLint
- `npm run preview` – preview production build

## Project layout

- `src/components/scenes/CombiniScene.tsx` – store scene, prize reveal logic
- `src/components/effects/GachaConfetti.tsx` – tiered confetti effect
- `src/data/prizes.ts` – prize pool, tiers, per-prize transforms
- `public/scene`, `public/prizes`, `public/people` – GLB models
