"use client";

/**
 * A stylised ghungroo (dance ankle bells) ring, standing in for Bharatanatyam.
 */
export default function Ghungroo() {
  const bells = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    return {
      x: Math.cos(angle) * 0.58,
      z: Math.sin(angle) * 0.58,
    };
  });

  return (
    <group rotation={[0.35, 0, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.58, 0.035, 12, 48]} />
        <meshStandardMaterial color="#5b3a24" roughness={0.6} />
      </mesh>
      {bells.map((b, i) => (
        <mesh key={i} position={[b.x, -0.22, b.z]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#d9a53c" metalness={0.8} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}
