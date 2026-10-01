import Image from 'next/image';

// Intrinsic dimensions of `public/logo.png`. Declared so `next/image` reserves the
// correct box before load and builds a `srcset` large enough for the rendered size.
// Declaring a square here is what previously made the navbar logo render muddy:
// the browser picked a 40px-wide candidate and upscaled it.
const LOGO_WIDTH = 1063;
const LOGO_HEIGHT = 195;

// 1063 / 195 = 5.451, so a 40px-tall logo is ~218px wide and an 32px-tall one ~174px.
// The footer's first column is only ~156px wide at `md`, hence the smaller `sm`.
const SIZES = {
  sm: { heightClass: 'h-8', renderedWidth: 174 },
  md: { heightClass: 'h-10', renderedWidth: 218 },
} as const;

export type LogoSize = keyof typeof SIZES;

export function Logo({
  className,
  size = 'md',
  priority = false,
  alt = "NATURALVER'S",
}: {
  className?: string;
  size?: LogoSize;
  priority?: boolean;
  alt?: string;
}) {
  const { heightClass, renderedWidth } = SIZES[size];

  return (
    <Image
      src="/logo.png"
      alt={alt}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      sizes={`${renderedWidth}px`}
      priority={priority}
      // Constrain by height only and let width follow the asset's own ratio, so the
      // reserved box and the rendered box agree and nothing is squashed or clipped.
      className={`w-auto ${heightClass} ${className ?? ''}`}
    />
  );
}