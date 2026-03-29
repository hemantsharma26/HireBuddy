import Link from 'next/link';
import { FadeIn } from "@/components/ui/FadeIn";

export function EmotionalCTA() {
  return (
    <section className="py-24 md:py-32 bg-white text-center">
      <div className="container-custom max-w-4xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.1]">
            Find the right person,<br className="hidden md:block" /> right when you need them.
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
             From everyday help to meaningful companionship.<br className="hidden md:block" /> 
             We connect you with people who genuinely care.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <div className="flex flex-col items-center">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link 
                href="/hire" 
                className="inline-block bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-full px-10 py-5 font-bold text-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl shadow-red-200"
              >
                Find your buddy
              </Link>
              <Link 
                href="/post-request" 
                className="inline-block bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8 py-5 font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
              >
                Post your situation
              </Link>
            </div>
            
            <p className="mt-6 text-sm text-gray-400 font-medium">
              Trusted by thousands finding real connections • Safe & Verified
            </p>
            <p className="mt-2 text-xs text-gray-300 italic">This is a safe space. You are not alone.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
