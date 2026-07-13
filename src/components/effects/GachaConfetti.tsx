import { useWindowSize } from "react-use";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

type Tier = "SS" | "S" | "A" | "B" | "C" | "D" | "E";

const CONFETTI_TIERS: Tier[] = ["SS", "S", "A"];

interface Props {
  isRevealing: boolean;
  tier: Tier;
}

export function GachaConfetti({ isRevealing, tier }: Props) {
  const { width, height } = useWindowSize();
  const [show, setShow] = useState(false);

  // Tier-based color palettes
  const tierColors = {
    SS: ["#FF0000", "#FF4444", "#FFD700", "#FFFFFF", "#FF6B6B"],
    S: ["#FFD700", "#FFA500", "#FFFFFF", "#FFE066"],
    A: ["#9B59B6", "#6C3483", "#D7BDE2", "#FFFFFF"],
    B: ["#F39C12", "#E67E22", "#FAD7A0", "#FFFFFF"],
    C: ["#2ECC71", "#27AE60", "#A9DFBF", "#FFFFFF"],
    D: ["#3498DB", "#2980B9", "#AED6F1", "#FFFFFF"],
    E: ["#95A5A6", "#7F8C8D", "#D5D8DC", "#FFFFFF"],
  };

  const colors = tierColors[tier] || tierColors.C;

  useEffect(() => {
    if (isRevealing && CONFETTI_TIERS.includes(tier)) {
      // Slight delay so light hits first
      const t = setTimeout(() => setShow(true), 300);
      return () => clearTimeout(t);
    } else {
      setShow(false);
    }
  }, [isRevealing, tier]);

  if (!show) return null;

  return (
    <Confetti
      width={width}
      height={height}
      colors={colors}
      numberOfPieces={300}
      recycle={false}
      gravity={0.25}
      initialVelocityY={15}
      tweenDuration={4000}
      style={{ position: "fixed", top: 0, left: 0, zIndex: 999 }}
    />
  );
}
