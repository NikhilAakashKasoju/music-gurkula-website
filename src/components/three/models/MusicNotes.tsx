"use client";

import { useMemo } from "react";
import { Float } from "@react-three/drei";

/** Deterministic pseudo-random value in [0, 1) — keeps render pure (no Math.random). */
function seeded(n: number): number {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function Note({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, -0.32, 0]} rotation={[0, 0, -0.3]}>
        <sphereGeometry args={[0.17, 20, 20]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.15} />
      </mesh>
      <mesh position={[0.16, 0.15, 0]}>
        <boxGeometry args={[0.045, 0.9, 0.045]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.15} />
      </mesh>
      <mesh position={[0.16, 0.56, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.16, 0.045, 8, 16, Math.PI]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.15} />
      </mesh>
    </group>
  );
}

interface MusicNotesProps {
  count?: number;
  area?: number;
  palette?: string[];
}

/**
 * A cluster of independently floating stylised music notes.
 */
export default function MusicNotes({
  count = 5,
  area = 2.6,
  palette,
}: MusicNotesProps) {
  const items = useMemo(() => {
    const colors =
      palette ?? ["#4c8a5c", "#7fb489", "#d9a53c", "#275036", "#b8842a"];

    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2 + seeded(i * 3.1 + 1) * 0.6;
      const radius = area * (0.35 + seeded(i * 5.7 + 2) * 0.65);
      return {
        position: [
          Math.cos(angle) * radius,
          (seeded(i * 7.3 + 3) - 0.5) * area * 0.7,
          Math.sin(angle) * radius * 0.4,
        ] as [number, number, number],
        scale: 0.55 + seeded(i * 2.4 + 4) * 0.5,
        rotationZ: (seeded(i * 9.1 + 5) - 0.5) * 0.8,
        color: colors[i % colors.length],
        speed: 0.7 + seeded(i * 4.6 + 6) * 0.9,
      };
    });
  }, [count, area, palette]);

  return (
    <>
      {items.map((it, i) => (
        <Float
          key={i}
          speed={it.speed}
          rotationIntensity={0.6}
          floatIntensity={1.3}
          position={it.position}
        >
          <group scale={it.scale} rotation={[0, 0, it.rotationZ]}>
            <Note color={it.color} />
          </group>
        </Float>
      ))}
    </>
  );
}
