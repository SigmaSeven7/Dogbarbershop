import { cn } from "../../lib/utils";  

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Should the marquee scroll horizontally or vertically.
   * If set to `true`, the marquee will scroll vertically.
   *
   * @default false
   */
  vertical?: boolean;

  /**
   * The number of times to repeat the children. Set this value so that the repeated children overflow the container.
   * @default 5
   */
  repeat?: number;

  /**
   * Reverse the marquee direction.
   */
  reverse?: boolean;

  /**
   * Pause the marquee animation on hover.
   */
  pauseOnHover?: boolean;

  /**
   * Apply a gradient mask to the marquee.
   * @default true
   */
  applyMask?: boolean;

  isMobile?: boolean;
}

export default function Marquee({
  children,
  isMobile,
  vertical = false,
  repeat = 5,
  pauseOnHover = false,
  reverse = false,
  className,
  applyMask = true,
  ...props
}: MarqueeProps) {
  return (
    <>
      <div
        {...props}
        className={cn(
          "group relative flex justify-center overflow-hidden p-2 [--duration:10s] [--gap:12px] [gap:var(--gap)]",
          {
            "flex-col": vertical,
            "flex-row": !vertical,
          },
          {"w-full": !isMobile},
          className,
        )}
      >
        {Array.from({ length: repeat }).map((_, index) => (
          <div
            key={`item-${index}`}
            className={cn("flex shrink-0 [gap:var(--gap)]", {
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
              "animate-marquee-horizontal flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
            })}
          >
            {children}
          </div>
        ))}
      </div>
      {applyMask && (
        <div
          className={cn("pointer-events-none absolute z-10 w-full", {
          
          })}
        />
      )}
    </>
  );
}
