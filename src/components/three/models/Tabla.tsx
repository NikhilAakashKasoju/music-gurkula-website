"use client";

/**
 * A stylised tabla pair (bayan + dayan) built from primitive geometry.
 */
export default function Tabla() {
  return (
    <group>
      {/* Bayan — metal, wider and shorter, on the left */}
      <group position={[-0.78, -0.05, 0]}>
        <mesh position={[0, -0.16, 0]}>
          <cylinderGeometry args={[0.62, 0.48, 0.55, 32]} />
          <meshStandardMaterial color="#868c92" roughness={0.35} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.135, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.05, 32]} />
          <meshStandardMaterial color="#e9dfc6" roughness={0.75} />
        </mesh>
        <mesh position={[0, 0.165, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.02, 32]} />
          <meshStandardMaterial color="#1c1c1c" roughness={0.6} />
        </mesh>
      </group>

      {/* Dayan — wood, narrower and taller, on the right */}
      <group position={[0.55, 0.08, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.4, 0.3, 0.78, 32]} />
          <meshStandardMaterial color="#5b3a24" roughness={0.55} metalness={0.05} />
        </mesh>
        <mesh position={[0, 0.195, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.05, 32]} />
          <meshStandardMaterial color="#e9dfc6" roughness={0.75} />
        </mesh>
        <mesh position={[0, 0.225, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.02, 32]} />
          <meshStandardMaterial color="#1c1c1c" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
