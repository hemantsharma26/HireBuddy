"use client";

import { Search, Star, ShieldCheck, Zap } from 'lucide-react';
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { SocialProofStrip } from "@/components/trust";

export function Hero() {
  return (
    <section className="relative bg-white pt-10 pb-16 md:pt-16 md:pb-12 overflow-hidden">
      <div className="container-custom grid lg:grid-cols-[1fr_1.5fr_1fr] md:grid-cols-[1fr_2fr_1fr] gap-4 items-center min-h-[350px] md:min-h-[500px]">
        
        {/* Left Col: Blob Image Cluster */}
        <div className="hidden md:flex flex-col items-end relative">
          {/* Blob SVG */}
          <svg viewBox="0 0 200 200" className="absolute top-10 right-10 w-[140%] h-[140%] text-purple-100 z-0 opacity-80" fill="currentColor">
            <path d="M44.5,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.8C91.4,-34.5,98.1,-20,96.3,-6.2C94.5,7.6,84.2,20.7,73.1,31.7C62,42.7,50,51.6,37.5,60.8C25,70,12,79.5,-1.2,81.6C-14.4,83.7,-28.8,78.4,-41.1,70.2C-53.4,62,-63.6,50.9,-71.4,38.1C-79.2,25.3,-84.6,10.8,-83.1,-2.9C-81.6,-16.6,-73.2,-29.5,-63.3,-40.5C-53.4,-51.5,-42,-60.7,-29.8,-69.1C-17.6,-77.5,-4.6,-85.1,9.4,-99.8L44.5,-76.4Z" transform="translate(100 100)" />
          </svg>
          
          <div className="relative z-10 grid gap-6 pr-8">
            <motion.img 
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=300" 
              className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-white"
              alt="Friend Group"
            />
             <motion.img 
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=300" 
              className="w-48 h-32 rounded-3xl object-cover shadow-lg border-4 border-white ml-12"
              alt="Party"
            />
          </div>
        </div>

        {/* Center Col: Text Content */}
        <div className="text-center z-20 px-4">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.15] tracking-tight mb-6">
              Bharat's trusted hiring network for <br/>
              real people.
            </h1>
          </FadeIn>
          
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10 font-medium">
              Hire a buddy, not a worker. <br className="hidden md:block" />
              Real help. Real people. Right when you need it.
            </p>
          
          {/* Search Bar */}
          <FadeIn delay={0.3} className="w-full max-w-lg mx-auto mb-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-200 to-purple-200 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-white p-2 pl-6 rounded-full shadow-lg border border-gray-200 flex items-center transition-all focus-within:ring-2 focus-within:ring-primary/20">
                <Search className="h-6 w-6 text-gray-400 mr-3" />
                <input 
                  type="text" 
                  placeholder="What kind of buddy do you need today?" 
                  className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 h-10 md:h-12 text-base md:text-lg"
                />
                <button className="bg-primary hover:bg-[#F03541] text-white rounded-full p-3 md:px-6 md:py-3 font-bold transition-transform active:scale-95 shadow-md">
                   <Search className="h-5 w-5 md:hidden" />
                   <span className="hidden md:inline">Search</span>
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Trust Row */}
          <FadeIn delay={0.4}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm font-medium text-gray-500">
               <div className="flex items-center gap-2">
                 <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                 <span>Trusted by early users across India</span>
               </div>
               <div className="flex items-center gap-2">
                 <ShieldCheck className="h-4 w-4 text-green-600" />
                 <span>Verified & safety-first buddies</span>
               </div>
               <div className="flex items-center gap-2">
                 <Zap className="h-4 w-4 text-blue-600" fill="currentColor" />
                 <span>Available when you need them</span>
               </div>
            </div>
          </FadeIn>

          {/* Social proof */}
          <FadeIn delay={0.5}>
            <SocialProofStrip variant="dark" className="mt-6" />
          </FadeIn>
        </div>

        {/* Right Col: Blob Image Cluster */}
        <div className="hidden md:flex flex-col items-start relative">
          {/* Blob SVG */}
           <svg viewBox="0 0 200 200" className="absolute top-20 left-0 w-[140%] h-[140%] text-pink-100 z-0 opacity-80" fill="currentColor">
            <path d="M41.7,-74C53.3,-65.4,61.6,-51.7,69.5,-38.1C77.4,-24.5,84.9,-11,83.9,2.1C82.9,15.2,73.4,27.9,63.4,39.1C53.4,50.3,42.9,60,31.2,66.4C19.5,72.8,6.6,75.9,-5.8,75.2C-18.2,74.5,-29.9,70,-42.6,64.1C-55.3,58.2,-68.9,50.9,-76.3,38.9C-83.7,26.9,-85,10.2,-81.4,-5.2C-77.8,-20.6,-69.3,-34.7,-58.4,-45.3C-47.5,-55.9,-34.2,-63,-21.3,-69.9C-8.4,-76.8,4.1,-83.5,15,-92.7L41.7,-74Z" transform="translate(100 100)" />
          </svg>

           <div className="relative z-10 grid gap-8 pl-8 pt-12">
            <motion.img 
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=300" 
              className="w-48 h-36 rounded-3xl object-cover shadow-lg border-4 border-white rotate-3"
              alt="Cooking Class"
            />
             <motion.img 
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=300" 
              className="w-36 h-36 rounded-full object-cover shadow-lg border-4 border-white self-center -ml-8"
              alt="Hiker Group"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
