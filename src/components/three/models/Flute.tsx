"use client";

/**
 * A stylised bansuri (bamboo flute) built from primitive geometry.
 * Oriented along the Y axis; rotate the parent group for a diagonal hold.
 */
export default function Flute({ color = "#4a3222" }: { color?: string }) {
  const holeYs = [-0.75, -0.4, -0.05, 0.3, 0.65, 1.0];

  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.1, 0.105, 2.5, 32]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.08} />
      </mesh>

      {[-1.15, 1.15].map((y, i) => (
        <mesh key={`band-${i}`} position={[0, y, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.09, 32]} />
          <meshStandardMaterial color="#d9a53c" roughness={0.35} metalness={0.6} />
        </mesh>
      ))}

      {holeYs.map((y, i) => (
        <mesh
          key={`hole-${i}`}
          position={[0.098, y, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.032, 0.032, 0.06, 16]} />
          <meshStandardMaterial color="#140d07" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}
