"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import {
  HeartHandshake,
  MessageCircle,
  Phone,
  Video,
  MapPin,
  ShieldCheck,
  Clock,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Star,
  Users,
} from "lucide-react";

const connectWays = [
  {
    icon: MessageCircle,
    title: "In-app chat",
    description:
      "Start a private conversation before you commit. Ask questions, clarify expectations, and feel comfortable.",
  },
  {
    icon: Phone,
    title: "Voice call",
    description:
      "Prefer hearing their voice first? Make a secure call through the app without sharing your number.",
  },
  {
    icon: Video,
    title: "Video call",
    description:
      "For emotional support or just a face-to-face chat — connect via video from wherever you are.",
  },
  {
    icon: MapPin,
    title: "Meet in person",
    description:
      "For hands-on help like repairs, companionship, or adventures — meet safely at a public spot.",
  },
];

const safetyFeatures = [
  {
    icon: ShieldCheck,
    title: "Identity verified",
    description: "Every buddy goes through government ID verification before accepting tasks.",
  },
  {
    icon: CreditCard,
    title: "Payment in escrow",
    description: "Your money is held safely until the task is completed to your satisfaction.",
  },
  {
    icon: Clock,
    title: "24/7 support",
    description: "Real humans are always available if you need help or feel uncomfortable.",
  },
  {
    icon: Star,
    title: "Rate & review",
    description: "After every interaction, share your experience to help the community grow stronger.",
  },
];

const connectionSteps = [
  {
    num: "01",
    title: "Send a request",
    desc: "Pick your buddy and send a request with your need, budget, and preferred time.",
  },
  {
    num: "02",
    title: "Chat first",
    desc: "Have a quick conversation to confirm details and make sure you feel comfortable.",
  },
  {
    num: "03",
    title: "Meet & enjoy",
    desc: "Connect in person, on call, or via video. You're always in control.",
  },
  {
    num: "04",
    title: "Review & repeat",
    desc: "Rate your buddy, leave a review, and save them as a favorite for next time.",
  },
];

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-orange-50/50 to-white pt-16 md:pt-28 pb-10 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to How It Works
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-orange-600">
                Step 3
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              Connect your way,
              <br />
              <span className="text-gray-400">on your terms</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
              Book instantly or send a request. Meet safely — chat, call, video,
              or in real life. You stay in control, always.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Connection Flow */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              How connection happens
            </h2>
            <p className="text-gray-500 text-center max-w-lg mx-auto mb-14">
              From request to review — every step is designed for comfort.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {connectionSteps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.08}>
                <div className="text-center group">
                  <span className="text-xs font-bold text-gray-300 tracking-widest block mb-3">
                    {step.num}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-50 group-hover:border-orange-200 transition-colors">
                    <span className="text-xl font-bold text-gray-900">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Connect */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              Your connection, your way
            </h2>
            <p className="text-gray-500 text-center max-w-lg mx-auto mb-14">
              Choose how you want to interact — HireBuddy supports every
              preference.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {connectWays.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="group bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-5 group-hover:bg-orange-50 group-hover:border-orange-200 transition-colors">
                    <item.icon className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Safety During Connection */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              Safety at every step
            </h2>
            <p className="text-gray-500 text-center max-w-lg mx-auto mb-14">
              We've built multiple layers of protection — so you can relax and
              focus on the moment.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {safetyFeatures.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center h-full">
                  <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Ready to connect with
              <br />
              <span className="text-gray-400">someone real?</span>
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Whatever you need — you don't have to do it alone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/buddies"
                className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Find a Buddy
              </Link>
              <Link
                href="/hire"
                className="px-8 py-4 bg-white text-gray-700 font-bold rounded-full border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all inline-flex items-center gap-2"
              >
                Post Your Need
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
