import { Search, MessageCircle, HeartHandshake } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';
import BackgroundBlobs from '@/components/ui/BackgroundBlobs';
import Link from 'next/link';

export function HowItWorks() {
  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">
      <BackgroundBlobs intensity="light" />
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-20">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">How HireBuddy works</h2>
            <p className="text-base text-gray-500 max-w-2xl mx-auto">Simple, safe, and designed for real connections.</p>
          </FadeIn>
        </div>

        <div className="relative max-w-6xl mx-auto min-h-[400px] sm:min-h-[500px] md:min-h-[500px]">
           {/* SVG Arrows Layer - Desktop Only */}
           <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
              <svg className="w-full h-full" viewBox="0 0 1000 500" fill="none" preserveAspectRatio="none">
                 {/* Arrow 1: Card 1 to Card 2 */}
                 <path 
                   d="M 320 100 C 400 100, 450 150, 580 120" 
                   stroke="#E5E7EB" 
                   strokeWidth="2" 
                   strokeDasharray="6 6" 
                   markerEnd="url(#arrowhead)" 
                 />
                 {/* Arrow 2: Card 2 to Card 3 */}
                 <path 
                   d="M 850 180 C 850 300, 750 350, 680 380" 
                   stroke="#E5E7EB" 
                   strokeWidth="2" 
                   strokeDasharray="6 6" 
                   markerEnd="url(#arrowhead)" 
                 />
                 
                 <defs>
                   <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                     <polygon points="0 0, 10 3.5, 0 7" fill="#D1D5DB" />
                   </marker>
                 </defs>
              </svg>
           </div>

           <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-0">
              {/* Step 1 - Top Left */}
              <div className="md:col-span-1 md:mr-12">
                 <StepCard
                   icon={Search}
                   title="1. Discover"
                   desc="Search for buddies by category, location, or shared interests."
                   color="text-green-500"
                   tilt="-rotate-2"
                   delay={0}
                   href="/how-it-works/discover"
                 />
              </div>

              {/* Spacer for proper flow layout */}
              <div className="hidden md:block col-span-1"></div>

              {/* Step 2 - Top Right Offset */}
              <div className="md:col-span-1 md:mt-12 md:ml-12">
                 <StepCard
                   icon={MessageCircle}
                   title="2. Choose"
                   desc="Check verified profiles, read reviews, and find your perfect match."
                   color="text-purple-500"
                   tilt="rotate-2"
                   delay={0.2}
                   href="/how-it-works/choose"
                 />
              </div>
              
              {/* Step 3 - Bottom Center */}
              <div className="md:col-start-2 md:col-span-1 md:mt-24 md:-ml-12">
                 <StepCard
                   icon={HeartHandshake}
                   title="3. Connect"
                   desc="Book instantly or send a request. Meet safely and enjoy."
                   color="text-orange-500"
                   tilt="-rotate-1"
                   delay={0.4}
                   href="/how-it-works/connect"
                 />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}

interface StepCardProps {
  icon: any;
  title: string;
  desc: string;
  color: string;
  tilt: string;
  delay: number;
  href: string;
}

function StepCard({ icon: Icon, title, desc, color, tilt, delay, href }: StepCardProps) {
  return (
    <FadeIn delay={delay}>
      <div className="group relative">
        {/* Tilt Shadow Layer */}
        <div className={`absolute top-4 left-4 w-full h-full rounded-[2rem] bg-gray-100 -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 ${tilt}`} />
        
        {/* Main Card */}
        <div className="relative bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-transform duration-300 group-hover:-translate-y-1 flex items-start gap-4">
          <div className={`p-3 rounded-2xl bg-gray-50 ${color}`}>
            <Icon className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 leading-relaxed font-medium text-sm">
              {desc}
            </p>
            <Link href={href} className="mt-3 inline-block text-primary font-bold text-sm hover:underline">
               Learn more &rarr;
             </Link>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
