import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { getFullImageUrl } from "@/lib/utils";

const categories = [
  {
    title: "Real Life Help",
    // Fixes, Moving, Heavy Lifting
    image: "https://images.unsplash.com/photo-1581578731117-104f2a8d46a8?auto=format&fit=crop&q=80&w=800",
    link: "/explore"
  },
  {
    title: "Human Presence",
    // Travel, Events, Companionship
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
    link: "/explore"
  },
  {
    title: "Emotional Support",
    // Listening, Stress Relief
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800", 
    link: "/explore"
  },
  {
    title: "Utility Support",
    // Errands, Medical, Pickup
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    link: "/explore"
  },
  {
    title: "Lifestyle Buddy",
    // Gym, Movies, Exploration
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800",
    link: "/explore"
  },
  {
    title: "Night Safety",
    // Late night travel companion
    image: "https://images.unsplash.com/photo-1468078809804-4c7b3e60a478?auto=format&fit=crop&q=80&w=800",
    link: "/explore"
  }
];

export function CategoriesGrid() {
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="container-custom">
        <FadeIn>
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            Explore Categories
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {categories.map((category, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <Link href={category.link} className="group relative block cursor-pointer">
                {/* Tilted Shadow Layer - Rotated & Scaled */}
                <div className="absolute inset-0 w-full h-full rounded-[2rem] bg-gray-200 -z-10 translate-x-3 translate-y-3 rotate-3 transition-transform duration-500 group-hover:rotate-6 group-hover:translate-x-4 group-hover:translate-y-4" />
                
                {/* Main Card Container */}
                <div className="relative h-48 rounded-[2rem] overflow-hidden bg-white shadow-sm transition-transform duration-500 group-hover:-translate-y-1 ring-1 ring-black/5">
                  {/* Image */}
                  <img 
                    src={getFullImageUrl(category.image)} 
                    alt={category.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                  
                  {/* Text */}
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {category.title}
                    </h3>
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
