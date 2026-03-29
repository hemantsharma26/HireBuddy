import { ShieldCheck, UserCheck, Clock, Heart } from 'lucide-react';
import BackgroundBlobs from '@/components/ui/BackgroundBlobs';

export function TrustSection() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Your safety is our priority",
      desc: "Every buddy is ID-verified and background checked."
    },
    {
      icon: UserCheck,
      title: "Real people, real profiles",
      desc: "We manually review every profile to ensure authenticity."
    },
    {
      icon: Clock,
      title: "Support when you need it",
      desc: "Our team is available 24/7 for any concerns."
    },
    {
      icon: Heart,
      title: "Community Guidelines",
      desc: "We maintain a respectful, safe environment for everyone."
    }
  ];

  return (
    <section className="relative overflow-hidden py-12 md:py-20 bg-white border-t border-gray-100">
      <BackgroundBlobs intensity="medium" />
      <div className="container-custom">
        <h2 className="text-2xl font-bold mb-12 text-center md:text-left">Trusted by thousands</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="mb-4 p-3 bg-gray-50 rounded-full inline-block">
                  <Icon className="h-6 w-6 text-gray-700" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
