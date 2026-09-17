"use client";

import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense } from "react";
import ClientOnly from "@/components/ClientOnly";
import Flute from "./models/Flute";
import MusicNotes from "./models/MusicNotes";

/**
 * Decorative 3D layer for the homepage hero: a floating flute and a
 * scattering of music notes, drawn with a transparent background so it
 * can sit over/around the hero photo placeholder.
 */
export default function HeroCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <ClientOnly>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 6.2], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[4, 5, 5]} intensity={1.1} />
          <directionalLight position={[-4, -2, -3]} intensity={0.3} />
          <Suspense fallback={null}>
            <group position={[2.6, 1.7, 0]}>
              <Float speed={1} rotationIntensity={0.35} floatIntensity={1}>
                <group rotation={[0, 0, 1]} scale={0.65}>
                  <Flute />
                </group>
              </Float>
            </group>
            <MusicNotes count={5} area={3.6} />
          </Suspense>
        </Canvas>
      </ClientOnly>
    </div>
  );
}
