import { Scale, Users, HeartHandshake, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  const terms = [
    {
      title: "1. Community Guidelines",
      content: "HireBuddy is built on trust and empathy. Users must treat each other with respect, kindness, and understanding. Harassment, discrimination, or abusive behavior will lead to immediate account suspension.",
      icon: HeartHandshake
    },
    {
      title: "2. User Responsibilities",
      content: "You are responsible for the information you share and the connections you make. While we verify buddies, we encourage all users to practice safety and common sense when interacting with others.",
      icon: Users
    },
    {
      title: "3. Service Limitations",
      content: "HireBuddy is a platform for human support and companionship. We are not a medical service or an emergency response team. If you are in immediate danger or a medical crisis, please contact local emergency services.",
      icon: AlertCircle
    },
    {
      title: "4. Account Integrity",
      content: "By creating an account, you agree to provide accurate information and maintain the security of your credentials. Multiple fake accounts or misleading profile information are not permitted.",
      icon: Scale
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 pb-20">
      <div className="container-custom max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">User Agreement</h1>
            <p className="text-gray-500 text-lg">Last updated: February 22, 2026</p>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              Welcome to HireBuddy. By using our platform, you agree to follow these terms and conditions. These guidelines ensure a safe and supportive environment for everyone in our community.
            </p>

            <div className="space-y-12">
              {terms.map((term, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
                      <term.icon className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{term.title}</h2>
                    <p className="text-gray-600 leading-relaxed">
                      {term.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 bg-orange-50/50 rounded-2xl border border-orange-100/50">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Acceptance of Terms</h3>
              <p className="text-gray-600">
                By clicking "Sign Up" or using HireBuddy, you signify that you have read, understood, and agreed to be bound by this User Agreement and our Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
