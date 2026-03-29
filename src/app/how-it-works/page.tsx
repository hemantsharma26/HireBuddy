"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search, Edit, Sparkles, Star, ShieldCheck, Heart, User, Clock, Zap, MessageCircle, HeartHandshake } from 'lucide-react';
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import { cn, getFullImageUrl } from "@/lib/utils";

// --- Components for Sections ---

// 1. Hero Section
const HeroSection = () => (
  <section className="relative pt-10 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white">
    <div className="container-custom relative z-10">
      {/* Top badge */}
      <FadeIn>
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-bold">
            <Sparkles className="w-4 h-4" />
            Simple. Safe. Human.
          </div>
        </div>
      </FadeIn>

      {/* Headline */}
      <FadeIn delay={0.05}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1] text-center">
          How HireBuddy Works
        </h1>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-xl md:text-2xl font-medium text-gray-900 mb-4 max-w-2xl mx-auto text-center">
          Real people. Real help. On your terms.
        </p>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed text-center mb-12">
          From everyday tasks to emotional support — HireBuddy lets you find trusted people nearby who can step in when you need them most.
        </p>
      </FadeIn>

      {/* CTA buttons */}
      <FadeIn delay={0.15}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/hire"
            className="px-8 py-4 bg-primary hover:bg-[#e0353d] text-white rounded-full font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/15"
          >
            Find a Buddy Now
          </Link>
          <Link
            href="/explore"
            className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 rounded-full font-bold text-base border border-gray-200 hover:border-gray-300 transition-all"
          >
            Explore Categories
          </Link>
        </div>
      </FadeIn>

      {/* Visual proof strip — 3 mini step cards */}
      <FadeIn delay={0.2}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { icon: Edit, step: "1", label: "Post what you need", color: "text-blue-500", bg: "bg-blue-50" },
            { icon: Sparkles, step: "2", label: "Get matched instantly", color: "text-purple-500", bg: "bg-purple-50" },
            { icon: HeartHandshake, step: "3", label: "Connect & get help", color: "text-primary", bg: "bg-red-50" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", item.bg)}>
                  <Icon className={cn("w-5 h-5", item.color)} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Step {item.step}</p>
                  <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>

      {/* Trust signals */}
      <FadeIn delay={0.25}>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 text-sm text-gray-400 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            Verified Buddies
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400" />
            4.9 avg rating
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-400" />
            Avg 3 min match
          </span>
          <span className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-primary" />
            2,000+ connections
          </span>
        </div>
      </FadeIn>
    </div>

    {/* Background decorative elements */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      <div className="absolute -top-[15%] -left-[10%] w-[45%] h-[45%] bg-orange-50 rounded-full blur-[100px] opacity-70" />
      <div className="absolute -bottom-[15%] -right-[10%] w-[45%] h-[45%] bg-purple-50 rounded-full blur-[100px] opacity-70" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-pink-50 rounded-full blur-[100px] opacity-40" />
    </div>
  </section>
);

// 2. 3-Step Core Flow
const StepCard = ({ number, title, text, icon: Icon, delay, tags }: { number: string; title: string; text: string; icon: any; delay: number; tags?: string[] }) => (
  <FadeIn delay={delay} className="flex-1">
    <div className="relative h-full p-8 md:p-10 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start text-left group">
       <div className="absolute top-0 right-0 p-4 opacity-5 text-9xl font-black text-gray-900 leading-none select-none pointer-events-none font-sans">
         {number}
       </div>
       
       <div className="mb-6 p-4 rounded-full bg-gray-50 text-gray-900 group-hover:bg-[#FFF0F0] group-hover:text-primary transition-colors duration-300">
         <Icon className="w-8 h-8" />
       </div>
       
       <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">{title}</h3>
       <p className="text-gray-500 leading-relaxed mb-6 font-medium relative z-10">{text}</p>
       
       {tags && (
         <div className="mt-auto flex flex-wrap gap-2 relative z-10">
           {tags.map((tag, i) => (
             <span key={i} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-bold uppercase tracking-wide rounded-full border border-gray-100">
               {tag}
             </span>
           ))}
         </div>
       )}
    </div>
  </FadeIn>
);

const CoreFlowSection = () => (
  <section className="py-20 md:py-24 bg-white">
     <div className="container-custom">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 relative">
           {/* Connecting Line (Desktop) */}
           <div className="hidden md:block absolute top-[80px] left-0 w-full h-0.5 bg-gray-100 -z-10" />

           <StepCard 
             number="1"
             title="Tell us what you need"
             text="Need help fixing something? Someone to talk to? A travel buddy? Just post your need in seconds — simple, private, and flexible."
             icon={Edit}
             delay={0}
           />
           <StepCard 
             number="2"
             title="Get trusted people nearby"
             text="Real people nearby respond with offers. See ratings, trust badges, vibes, and pricing — all in one place. Not just cheapest — best match for you."
             icon={Sparkles}
             delay={0.2}
             tags={["Ratings", "Trust Score", "Vibe Tags", "Availability"]}
           />
           <StepCard 
             number="3"
             title="Choose and connect instantly"
             text="Pick someone you feel comfortable with and connect instantly — chat, call, video, or meet in real life. You stay in control, always."
             icon={HeartHandshake}
             delay={0.4}
           />
        </div>
     </div>
  </section>
);

// 3. Use Cases
const UseCaseCard = ({ title, text, image, delay }: { title: string; text: string; image: string; delay: number }) => (
  <FadeIn delay={delay} className="group relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-square">
    <img 
      src={getFullImageUrl(image)} 
      alt={title} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
    <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/80 text-sm leading-relaxed">{text}</p>
    </div>
  </FadeIn>
);

const UseCasesSection = () => (
  <section className="py-12 md:py-20 bg-gray-50">
    <div className="container-custom">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Endless ways people use HireBuddy</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <UseCaseCard 
          title="Everyday help"
          text="Repairs, errands, and quick tasks."
          image="https://images.unsplash.com/photo-1581578731117-104f2a863a17?auto=format&fit=crop&q=80&w=400"
          delay={0}
        />
        <UseCaseCard 
          title="Companionship"
          text="Movies, travel, and events."
          image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400"
          delay={0.1}
        />
        <UseCaseCard 
          title="Emotional support"
          text="Just need someone to talk to."
          image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400"
          delay={0.2}
        />
        <UseCaseCard 
          title="Emergency help"
          text="Medicine, late-night support."
          image="https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&q=80&w=400"
          delay={0.3}
        />
        <UseCaseCard 
          title="Social connection"
          text="New city? Find friends."
          image="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400"
          delay={0.4}
        />
      </div>
    </div>
  </section>
);

// 4. Pricing Model
const PricingCard = ({ title, text, highlight }: { title: string; text: string; highlight?: boolean }) => (
  <div className={cn("p-6 rounded-2xl border", highlight ? "bg-white border-primary/20 shadow-md relative overflow-hidden" : "bg-gray-50 border-transparent")}>
    {highlight && <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent -mr-8 -mt-8 rounded-full" />}
    <h3 className="font-bold text-lg mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
  </div>
);

const PricingSection = () => (
   <section className="py-20 md:py-24 bg-white text-center">
     <div className="container-custom max-w-4xl">
       <FadeIn>
         <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">Fair pricing for everyone</h2>
         <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
            HireBuddy uses a smart hybrid pricing system that protects both sides. No race to the bottom. No hidden charges.
         </p>
         
         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
           <PricingCard 
             title="Instant Hire"
             text="Fixed price. Fast match for when you need help now."
           />
           <PricingCard 
             title="Smart Bids"
             text="People send offers within a fair range. You choose the best value — not just the cheapest."
             highlight
           />
           <PricingCard 
             title="Premium Buddies"
             text="Top trusted, verified people. No bidding, just premium experience."
           />
         </div>
         
         <div className="mt-10 inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
            <ShieldCheck className="w-4 h-4" />
            We ensure minimum earning protection so no one undervalues themselves.
         </div>
       </FadeIn>
     </div>
   </section>
);

// 5. Trust & Safety
const TrustSection = () => (
  <section className="py-16 md:py-24 bg-white border-t border-gray-100">
    <div className="container-custom">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <FadeIn>
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-bold mb-6">
              <ShieldCheck className="w-4 h-4" />
              Safety First Guarantee
           </div>
           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">Built on trust, verified by humans</h2>
           <p className="text-lg text-gray-500">
             We don't just match you with anyone. We've built a multi-layer safety system to ensure every interaction on HireBuddy is secure, respectful, and real.
           </p>
        </FadeIn>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            icon: User,
            title: "100% Verified Profiles",
            desc: "Every buddy goes through a mandatory ID check and profile review before they can accept tasks."
          },
          {
            icon: Star,
            title: "Real Community Ratings",
            desc: "Honest reviews from real people. We monitor for fake activity to keep the system fair."
          },
          {
            icon: ShieldCheck,
            title: "Secure Payments",
            desc: "Your money is held safely in escrow until the task is completed to your satisfaction."
          },
          {
            icon: MessageCircle,
            title: "Private Communication",
            desc: "Chat safely within the app without sharing your personal phone number until you're ready."
          },
          {
            icon: Zap,
            title: "Zero Tolerance Policy",
            desc: "We take immediate action against any reports of harassment or unsafe behavior."
          },
          {
            icon: Heart,
            title: "24/7 Support Team",
            desc: "Real humans are always available to help if you ever feel uncomfortable or need assistance."
          }
        ].map((item, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="h-full p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-lg transition-all duration-300">
               <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-green-600 mb-6 shadow-sm">
                 <item.icon className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
               <p className="text-gray-500 leading-relaxed font-medium text-sm">
                 {item.desc}
               </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

// 6. Emotional Layer
const EmotionalLayer = () => (
  <section className="py-24 md:py-32 bg-white text-center">
    <div className="container-custom max-w-3xl">
      <FadeIn>
        <span className="block text-primary font-bold tracking-wide uppercase mb-4 text-sm">More than a service</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
          Sometimes you don’t need a service.<br />
          You just need someone.
        </h2>
        <p className="text-xl text-gray-500 leading-relaxed font-medium">
          HireBuddy exists for the moments where life feels heavy, lonely, or uncertain — and a real human makes all the difference.
        </p>
      </FadeIn>
    </div>
  </section>
);

// 7. CTA Section
const CTASection = () => (
  <section className="py-24 md:py-32 bg-[#111827] text-white text-center rounded-t-[3rem] -mt-10 relative z-20 overflow-hidden">
    
    {/* Background Glows */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
       <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
       <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/40 rounded-full blur-[120px]" />
    </div>

    <div className="container-custom max-w-4xl relative z-10">
      <FadeIn>
        
        {/* Community Avatar Cluster */}
        <div className="flex justify-center -space-x-4 mb-8">
          {[
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
          ].map((src, i) => (
            <div key={i} className="relative w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-[#111827] overflow-hidden hover:scale-110 transition-transform duration-300 z-0 hover:z-10">
              <img src={getFullImageUrl(src)} alt="Community Member" className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-[#111827] bg-gray-800 flex items-center justify-center text-xs md:text-sm font-bold text-white">
            +2k
          </div>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
          Ready to find <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]">your buddy?</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          Whatever life throws at you — you don’t have to handle it alone. Join a community that cares.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/hire" 
            className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-primary to-[#ff5252] hover:from-[#d12c35] hover:to-[#ff3838] rounded-full text-white font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
          >
            Find a Buddy Now
          </Link>
          <Link 
            href="/become-buddy" 
            className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 rounded-full text-white font-bold text-lg transition-colors backdrop-blur-sm border border-white/10"
          >
            Become a Buddy
          </Link>
        </div>
        
        <p className="mt-8 text-sm text-gray-500 font-medium">
           No hidden fees • Verified Profiles • Secure Payments
        </p>

      </FadeIn>
    </div>
  </section>
);


export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <CoreFlowSection />
      <UseCasesSection />
      <PricingSection />
      <TrustSection />
      <EmotionalLayer />
      <CTASection />
      {/* Footer is automatically included in layout */}
    </div>
  );
}
