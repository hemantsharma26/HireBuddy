import Link from 'next/link';
import { buddies } from "@/data/buddies";
import { Star, ShieldCheck } from 'lucide-react';
import { FadeIn } from "@/components/ui/FadeIn";
import { getFullImageUrl } from "@/lib/utils";

export function BuddyCarousel() {
  // Take only top 5 buddies
  const topBuddies = buddies.slice(0, 5);

  return (
    <section className="py-16 md:py-20 bg-white border-t border-gray-100">
      <div className="container-custom">
        <div className="flex justify-between items-end mb-10 px-2">
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Trusted buddies near you
            </h2>
            <p className="text-gray-500 text-lg">Real people, verified and ready to help.</p>
          </FadeIn>
          <Link href="/buddies" className="text-primary font-bold hover:underline hidden md:block">
            See all buddies
          </Link>
        </div>

        {/* Grid Container - No Scroll, Top 5 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {topBuddies.map((buddy, idx) => (
            <FadeIn key={buddy.id} delay={idx * 0.1}>
              <Link 
                href={`/buddies/${buddy.id}`}
                className="group relative block w-full"
              >
                 {/* Hover Shadow Blob */}
                 <div className="absolute inset-0 bg-blue-100 rounded-[2rem] transform translate-y-4 scale-90 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-2 -z-10" />

                {/* Main Card */}
                <div className="relative h-[340px] bg-white rounded-[1.5rem] overflow-hidden shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl border border-gray-100 flex flex-col">
                  
                  {/* Image Area with Wavy Bottom */}
                  <div className="relative h-[60%] w-full overflow-hidden">
                    <img 
                      src={getFullImageUrl(buddy.image)} 
                      alt={buddy.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Activity Badge - Top Right */}
                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1.5 border border-white/10">
                       <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                       <span className="text-[10px] font-medium text-white tracking-wide">
                         Active {buddy.lastActive}
                       </span>
                    </div>

                    {/* Wavy Mask SVG */}
                   <div className="absolute bottom-[-1px] left-0 w-full leading-none z-10">
                      <svg className="block w-full h-[25px] text-white fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="opacity-0"></path>
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" transform="scale(1, -1) translate(0, -120)"></path> 
                      </svg>
                   </div>
                  </div>

                  {/* Content Area */}
                  <div className="relative flex-1 px-4 pb-4 pt-5 text-center flex flex-col items-center justify-start">
                     {/* Rating Badge */}
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white p-1 rounded-full shadow-md z-20">
                        <div className="bg-gray-50 px-3 py-0.5 rounded-full flex items-center gap-1 text-xs font-bold text-gray-900 border border-gray-100">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          {buddy.rating}
                        </div>
                     </div>

                    <h3 className="font-bold text-lg text-gray-900 mb-0.5 flex items-center justify-center gap-1.5">
                      {buddy.name}
                      {/* Verification Badge Logic */}
                      {buddy.verificationLevel === 3 && (
                        <div className="group/verify relative">
                          <ShieldCheck className="h-4 w-4 text-purple-600" aria-label="Govt ID Verified" />
                          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/verify:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Govt ID Verified</span>
                        </div>
                      )}
                      {buddy.verificationLevel === 2 && (
                        <div className="group/verify relative">
                          <ShieldCheck className="h-4 w-4 text-blue-600" aria-label="Company Verified" />
                          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/verify:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Company Verified</span>
                        </div>
                      )}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium mb-3">{buddy.category} • {buddy.jobsCompleted} hires</p>
                    
                    <div className="mt-auto flex items-center justify-between w-full px-2">
                       <div className="text-[10px] text-gray-400 font-medium">
                         Replies in {buddy.responseTime}
                       </div>
                       <div className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 bg-gray-100/80 px-2.5 py-1 rounded-full">
                         <span>₹{buddy.price}</span>
                         <span className="text-gray-400 font-normal">/hr</span>
                       </div>
                    </div>
                  </div>

                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
