import Link from 'next/link';
import { cn, getFullImageUrl } from "@/lib/utils";
import { FadeIn } from "@/components/ui/FadeIn";

interface FeatureBlockProps {
  title: string;
  description: string;
  image: string;
  align?: 'left' | 'right';
  className?: string;
}

export function FeatureBlock({ title, description, image, align = 'left', className }: FeatureBlockProps) {
  return (
    <section className={cn("py-12 md:py-16 overflow-hidden", className)}>
      <div className="container-custom">
        <div className={cn(
          "flex flex-col md:flex-row items-center gap-8 md:gap-12",
          align === 'right' ? "md:flex-row-reverse" : ""
        )}>
          
          {/* Text Content */}
          <div className="flex-1 space-y-4 md:text-left">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 leading-tight mb-3">
                {title}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-sm">
                {description}
              </p>
            </FadeIn>
          </div>

          {/* Image */}
          <div className="flex-1 w-full">
            <FadeIn delay={0.3}>
              <div className="relative aspect-[3/2] md:aspect-[16/10] rounded-xl overflow-hidden shadow-sm">
                <img 
                  src={getFullImageUrl(image)} 
                  alt={title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </FadeIn>
          </div>
          
        </div>
      </div>
    </section>
  );
}
