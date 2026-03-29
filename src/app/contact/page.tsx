"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Mail,
  MapPin,
  Send,
  Shield,
  Handshake,
  CheckCircle2,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";
import { contactChannels, contactTopics } from "@/data/company";

/* ═══════════════════════════════════════════════════
   Contact — We'd love to hear from you.
   ═══════════════════════════════════════════════════ */

const channelIcons = [Mail, Handshake, Shield];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In production, send to API
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
        <div className="hidden sm:block absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="container-custom relative pt-20 md:pt-28 pb-16 md:pb-24 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/70 text-xs font-semibold mb-6 border border-white/10">
              <Mail className="w-3.5 h-3.5 text-primary" />
              Contact
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight leading-[1.1] max-w-3xl mx-auto">
              We&rsquo;d love to hear from you.
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto leading-relaxed font-medium">
              Questions, ideas, or just a hello — we&rsquo;re listening.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="container-custom py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 max-w-6xl mx-auto">
          {/* ── LEFT: FORM ── */}
          <div className="lg:col-span-3">
            <FadeIn>
              {submitted ? (
                <div className="text-center py-16 px-6 bg-gray-50 rounded-[1.5rem]">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-5" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Message sent!
                  </h2>
                  <p className="text-gray-500 mb-6">
                    We&rsquo;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: "",
                        email: "",
                        topic: "",
                        message: "",
                      });
                    }}
                    className="text-primary font-semibold text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">
                    Send us a message
                  </h2>
                  <p className="text-gray-500 text-sm mb-6">
                    We read every single one.
                  </p>

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    />
                  </div>

                  {/* Topic */}
                  <div>
                    <label
                      htmlFor="topic"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Topic
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      value={formState.topic}
                      onChange={handleChange}
                      required
                      className={cn(
                        "w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all appearance-none",
                        formState.topic ? "text-gray-900" : "text-gray-400"
                      )}
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      {contactTopics.map((t) => (
                        <option key={t} value={t} className="text-gray-900">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us what's on your mind..."
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-full px-8 py-4 font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-500/20"
                  >
                    Send us a note
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </FadeIn>
          </div>

          {/* ── RIGHT: CONTACT INFO ── */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.1}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Other ways to reach us
                </h2>

                {contactChannels.map((ch, i) => {
                  const Icon = channelIcons[i];
                  return (
                    <div
                      key={ch.label}
                      className="bg-gray-50 rounded-[1.25rem] p-6 hover:bg-gray-100/80 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900">
                          {ch.label}
                        </h3>
                      </div>
                      <p className="text-gray-500 text-sm mb-2">
                        {ch.description}
                      </p>
                      <a
                        href={`mailto:${ch.email}`}
                        className="text-primary text-sm font-semibold hover:underline"
                      >
                        {ch.email}
                      </a>
                    </div>
                  );
                })}

                {/* Location */}
                <div className="bg-gray-50 rounded-[1.25rem] p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">
                      Location
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Remote-first, built in India 🇮🇳
                  </p>
                </div>

                {/* Reassurance */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-primary/60" />
                    We read every message. Expect a reply within 24 hours.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      <section className="container-custom pb-16 md:pb-24">
        <FadeIn>
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-[1.5rem] px-6 py-10 md:px-12 md:py-14 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            <div className="relative z-10">
              <Heart className="w-8 h-8 text-primary/80 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                Want to be part of the mission?
              </h2>
              <p className="text-white/50 max-w-md mx-auto mb-8">
                Whether as a user, buddy, or builder — there&rsquo;s a place for
                you here.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-full px-8 py-4 font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-500/20"
                >
                  Join HireBuddy
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/careers"
                  className="inline-flex items-center gap-2 text-white/50 hover:text-white font-semibold px-5 py-3 rounded-full transition-colors text-sm border border-white/10 hover:border-white/20"
                >
                  See open roles
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
