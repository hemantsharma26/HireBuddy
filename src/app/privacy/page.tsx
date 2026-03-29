import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, post a request, or communicate with other users. This may include your name, email, profile picture, and any details you share in your support requests.",
      icon: FileText
    },
    {
      title: "2. How We Use Your Information",
      content: "We use your information to facilitate connections between buddies and people needing support, to personalize your experience, and to maintain the safety and security of our platform.",
      icon: Eye
    },
    {
      title: "3. Privacy for Anonymous Requests",
      content: "When you post an anonymous request, we take extra care to hide your identity. While your situation is shared, your name and profile picture are not visible to other users until you choose to connect directly.",
      icon: Shield
    },
    {
      title: "4. Data Security",
      content: "We implement robust security measures to protect your personal data from unauthorized access, alteration, or disclosure. Your trust is our priority.",
      icon: Lock
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 pb-20">
      <div className="container-custom max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Privacy Policy</h1>
            <p className="text-gray-500 text-lg">Last updated: February 22, 2026</p>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              At HireBuddy, we take your privacy seriously. This policy explains how we collect, use, and protect your information when you use our platform to find human support and connection.
            </p>

            <div className="space-y-12">
              {sections.map((section, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{section.title}</h2>
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Questions?</h3>
              <p className="text-gray-600 mb-6">
                If you have any questions about this Privacy Policy, please reach out to our team.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center font-bold text-primary hover:text-primary/80 transition-colors"
              >
                Contact Privacy Team →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
