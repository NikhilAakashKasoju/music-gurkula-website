"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const emptySubscribe = () => () => {};

/** True only once the component has mounted in the browser. */
function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/**
 * Renders children only after the component has mounted in the browser.
 * Used to keep three.js / WebGL work entirely out of server rendering.
 */
export default function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const isClient = useIsClient();

  if (!isClient) return <>{fallback}</>;
  return <>{children}</>;
}
