import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  active,
  className,
}: {
  project: Project;
  active: boolean;
  className?: string;
}) {
  const isPortrait = project.imageOrientation === "portrait";
  const shouldContain = !isPortrait && project.imageFit === "contain";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl bg-surface",
        isPortrait
          ? "aspect-[9/16] h-[60vh] max-h-[60vh] lg:h-[min(28.2vw,70vh)] lg:max-h-[70vh] w-auto mx-auto"
          : "aspect-[16/10] w-full",
        active ? "border-2 border-foreground shadow-glow" : "border border-border",
        className,
      )}
    >
      {/* Blurred backdrop to fill space softly when contained */}
      {shouldContain && (
        <img
          src={project.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-125 object-cover opacity-35 blur-xl pointer-events-none"
        />
      )}

      {/* Main screenshot image */}
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        width={isPortrait ? 472 : 1280}
        height={isPortrait ? 853 : 800}
        loading="lazy"
        className={cn(
          "relative z-10 transition-[filter] duration-700",
          isPortrait
            ? "h-full w-full object-cover object-top"
            : shouldContain
              ? "h-full w-full object-contain object-center p-2 sm:p-3"
              : "h-full w-full object-cover",
          active ? "grayscale-0" : "grayscale",
        )}
      />

      {/* Title overlay: only shown for full-bleed landscape cover cards */}
      {!isPortrait && !shouldContain && (
        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-ink/90 to-transparent p-5 pt-16">
          <span className="text-lg font-bold tracking-tight text-ink-foreground">
            {project.title}
          </span>
        </div>
      )}
    </div>
  );
}
