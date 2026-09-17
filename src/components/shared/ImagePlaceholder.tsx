import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

/**
 * Stands in for a real photograph. Nothing here is a licensed image —
 * swap the wrapping element's background for a real <Image> when photos
 * are ready.
 */
export default function ImagePlaceholder({
  label,
  className,
  rounded = "rounded-2xl",
}: {
  label: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={cn(
        "image-placeholder relative flex items-center justify-center overflow-hidden border border-dashed border-lavender-700/30 bg-lavender-100 text-lavender-800",
        rounded,
        className
      )}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <ImageIcon className="h-6 w-6 opacity-50" strokeWidth={1.5} />
        <span className="text-xs font-medium uppercase tracking-wide opacity-60">
          {label}
        </span>
      </div>
    </div>
  );
}
