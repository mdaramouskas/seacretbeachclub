import Image from "next/image";

interface PageHeroProps {
  image: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ image, title, subtitle }: PageHeroProps) {
  return (
    <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="text-[#00ffb8] text-xs tracking-[0.3em] uppercase mb-3">
          Seacret Beach Club
        </p>
        <h1 className="text-white text-4xl md:text-6xl font-light tracking-widest uppercase">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/70 text-sm mt-4 max-w-2xl font-light tracking-wide">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
