export type Tier = "SS" | "S" | "A" | "B" | "C" | "D" | "E";

// Three.js rotations are in radians. Wrap degree values with this when
// writing a `transform.rotation`, e.g. rotation: [deg(15), deg(90), 0].
export const deg = (d: number) => (d * Math.PI) / 180;

// Per-prize display transform for the reveal pedestal. `rotation` is the
// static base tilt [x, y, z] in radians (see `deg` above) — the reveal
// spin is added to `y` on top of this at runtime. Leave a field unset to
// fall back to DEFAULT_PRIZE_TRANSFORM.
export interface PrizeTransform {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const DEFAULT_PRIZE_TRANSFORM: Required<PrizeTransform> = {
  position: [0.4, -0.5, 3],
  rotation: [0.3, 0, 0],
  scale: 0.4,
};

export interface Prize {
  id: string;
  name: string;
  modelPath: string;
  tier: Tier;
  transform?: PrizeTransform;
}

// Equal-chance pool for UI testing. Swap `pickRandomPrize` for a
// weighted pick (e.g. by tier drop rate) once real rates are defined.
// Tweak `transform` per prize to fix scale/orientation for that model.
export const PRIZES: Prize[] = [
  {
    id: "rice-stack",
    name: "Rice Stack",
    modelPath: "/prizes/ss/rice-stack.glb",
    tier: "SS",
    transform: { rotation: [0, deg(120), 0], scale: 1.3 },
  },
  {
    id: "ojisan-pachinko",
    name: "Ojisan Pachinko",
    modelPath: "/prizes/s/ojisan-pachinko.glb",
    tier: "S",
    transform: { rotation: [0, deg(180), 0], scale: 1.2 },
  },
  {
    id: "onigiri-gold-trophy",
    name: "Onigiri Gold Trophy",
    modelPath: "/prizes/a/onigiri-gold-trophy.glb",
    tier: "A",
    transform: { rotation: [0, deg(140), 0], scale: 0.35 },
  },
  {
    id: "ojisan-pillow",
    name: "Ojisan Pillow",
    modelPath: "/prizes/b/ojisan-pillow.glb",
    tier: "B",
    transform: { rotation: [0, deg(145), 0], scale: 0.5 },
  },
  {
    id: "cat-ice-cream-figurine",
    name: "Fat Orange Cat Ice Cream Figurine",
    modelPath: "/prizes/c/figurine-fat-orange-cat-ice_cream.glb",
    tier: "C",
    transform: { rotation: [0, deg(145), 0], scale: 0.35 },
  },
  {
    id: "dog-keychain-chicken",
    name: "Dog Keychain (Chicken)",
    modelPath: "/prizes/d/dog-keychain_chicken.glb",
    tier: "D",
    transform: { rotation: [0, deg(135), 0], scale: 0.25 },
  },
  {
    id: "tuna-sandwich",
    name: "Tuna Sandwich",
    modelPath: "/prizes/d/tuna-sandwich.glb",
    tier: "D",
    transform: { rotation: [0, deg(235), 0], scale: 0.3 },
  },
  {
    id: "deluxe-choco-wasabi",
    name: "Deluxe Choco Wasabi",
    modelPath: "/prizes/e/deluxe-choco-wasabi.glb",
    tier: "E",
    transform: { rotation: [0, deg(145), 0], scale: 0.25 },
  },
  {
    id: "tissue-packet",
    name: "Tissue Packet",
    modelPath: "/prizes/e/tissue-packet.glb",
    tier: "E",
    transform: { rotation: [0, deg(135), 0], scale: 0.25 },
  },
];

export function pickRandomPrize(): Prize {
  const index = Math.floor(Math.random() * PRIZES.length);
  return PRIZES[index];
}
