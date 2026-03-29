"use client";

import { Share2, Copy, Check } from "lucide-react";
import { useState } from "react";

export function ShareBlock({ title = "Share this profile", url = "https://hirebuddy.app" }: { title?: string, url?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this buddy on HireBuddy: ${url}`)}`, '_blank');
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-white p-2 rounded-full shadow-sm">
           <Share2 className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
          <p className="text-xs text-gray-500">Boost reach by sharing to WhatsApp</p>
        </div>
      </div>

      <div className="flex gap-2 w-full md:w-auto">
        <button 
          onClick={handleWhatsApp}
          className="flex-1 md:flex-none bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2"
        >
          WhatsApp
        </button>
        <button 
          onClick={handleCopy}
          className="flex-1 md:flex-none bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}
