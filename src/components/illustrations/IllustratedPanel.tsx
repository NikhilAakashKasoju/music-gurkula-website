import FigureScene from "./FigureScene";
import { PROGRAM_COLORS, PROGRAM_ILLUSTRATION_VARS } from "@/lib/programColors";
import type { ProgramIcon, ProgramSlug } from "@/lib/programs";
import { cn } from "@/lib/utils";

/**
 * Replaces the old dashed-border "photograph" placeholder with a small
 * illustrated scene: a soft program-colored backdrop behind a faceless
 * silhouette practicing the discipline, standing/seated on a strip of
 * stylized ground foliage. Used anywhere a real photo would eventually go
 * (hero, program pages, path cards, gallery).
 */
export default function IllustratedPanel({
  icon,
  slug,
  label,
  crop = "full",
  className,
  rounded = "rounded-2xl",
}: {
  icon: ProgramIcon;
  slug?: ProgramSlug;
  label: string;
  crop?: "full" | "bust" | "wide";
  className?: string;
  rounded?: string;
}) {
  const vars = slug
    ? PROGRAM_ILLUSTRATION_VARS[slug]
    : PROGRAM_ILLUSTRATION_VARS["hindustani-vocals"];
  const backdrop = slug
    ? PROGRAM_COLORS[slug].badgeGradient
    : "bg-gradient-to-br from-lavender-400 to-begonia-300";

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative overflow-hidden bg-cream-100",
        rounded,
        className
      )}
    >
      <div className={cn("absolute inset-0 opacity-20", backdrop)} />
      <FigureScene
        icon={icon}
        vars={vars}
        crop={crop}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
