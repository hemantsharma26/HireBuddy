"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Users, Briefcase, Building2 } from "lucide-react";

const stats = [
  { id: 1, name: 'Buddy Find', value: '12,842', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 2, name: 'Meet Buddy', value: '4,221', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
  { id: 3, name: 'Buddies', value: '800+', icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50' },
];

export function SocialProof() {
  return (
    <section className="bg-white border-b border-gray-100 py-8">
      <div className="container-custom">
        <div className="grid grid-cols-3 gap-4 md:gap-8 divide-x divide-gray-100">
          {stats.map((stat, idx) => (
            <FadeIn key={stat.id} delay={idx * 0.1}>
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-center md:text-left p-2">
                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                   <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <div className="text-xl md:text-3xl font-black text-gray-900 tracking-tight leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {stat.name}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
