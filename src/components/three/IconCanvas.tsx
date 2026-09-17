"use client";

import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense } from "react";
import ClientOnly from "@/components/ClientOnly";
import Flute from "./models/Flute";
import Tabla from "./models/Tabla";
import Ghungroo from "./models/Ghungroo";
import MusicNotes from "./models/MusicNotes";
import type { Model3D } from "@/lib/programs";

function ModelBySlug({ model }: { model: Model3D }) {
  switch (model) {
    case "flute":
      return (
        <Float speed={1.3} rotationIntensity={0.5} floatIntensity={0.9}>
          <group rotation={[0, 0, 1.05]} scale={0.85}>
            <Flute />
          </group>
        </Float>
      );
    case "tabla":
      return (
        <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.7}>
          <group scale={0.95}>
            <Tabla />
          </group>
        </Float>
      );
    case "ghungroo":
      return (
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
          <Ghungroo />
        </Float>
      );
    case "notes":
    default:
      return <MusicNotes count={3} area={1.6} />;
  }
}

export default function IconCanvas({
  model,
  className,
}: {
  model: Model3D;
  className?: string;
}) {
  return (
    <div className={className} aria-hidden="true">
      <ClientOnly fallback={<div className="h-full w-full" />}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 4.2], fov: 40 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[3, 4, 5]} intensity={1.1} />
          <directionalLight position={[-3, -2, -4]} intensity={0.35} />
          <Suspense fallback={null}>
            <ModelBySlug model={model} />
          </Suspense>
        </Canvas>
      </ClientOnly>
    </div>
  );
}
