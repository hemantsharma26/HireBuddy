import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-16 md:py-20 text-sm">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 max-w-6xl mx-auto mb-16">
          
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
               <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500">
                 HireBuddy
               </span>
            </Link>
            <p className="text-gray-500 leading-relaxed">
              Helping people find people — the human way.<br />
              Making everyday support more accessible, personal, and real.
            </p>
            <div className="flex gap-4 pt-2">
               <SocialIcon icon={Twitter} href="#" />
               <SocialIcon icon={Facebook} href="#" />
               <SocialIcon icon={Instagram} href="#" />
               <SocialIcon icon={Linkedin} href="#" />
            </div>
          </div>

          {/* Business Columns */}
          <FooterColumn 
            title="Account" 
            links={[
              { label: "Help Center", href: "/help-center" },
              { label: "Safety", href: "/security" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "User Agreement", href: "/terms" },
            ]} 
          />

          <FooterColumn 
            title="Explore" 
            links={[
              { label: "Groups", href: "/groups" },
              { label: "Events", href: "/events" },
              { label: "Topics", href: "/topics" },
              { label: "Cities", href: "/cities" },
            ]} 
          />

          <FooterColumn 
            title="Company" 
            links={[
              { label: "About us", href: "/about" },
              { label: "Blog", href: "/blog" },
              { label: "Careers", href: "/careers" },
              { label: "Contact", href: "/contact" },
            ]} 
          />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs">
          <p>© 2026 HireBuddy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-gray-900 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string, links: { label: string, href: string }[] }) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-gray-500 hover:text-gray-900 transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ icon: Icon, href }: { icon: any, href: string }) {
  return (
    <Link href={href} className="text-gray-400 hover:text-primary transition-colors">
      <Icon className="h-5 w-5" />
    </Link>
  );
}
