import { Globe2, Mail, MapPin, MessageCircle, Phone, Share2 } from 'lucide-react'
import BrandLogo from '../common/BrandLogo'
const socials = [
  [Globe2, 'Company website'],
  [MessageCircle, 'Community'],
  [Share2, 'Social media'],
]
export default function Footer() {
  return (
    <footer id="contact" className="bg-navy-950 text-slate-300">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a
            href="#home"
            aria-label="SM Global Solution Hub home"
            className="mb-5 inline-flex rounded"
          >
            <BrandLogo dark />
          </a>
          <p className="text-sm leading-6 text-slate-400">
            A curated marketplace of proven digital products, built to help modern businesses move
            faster.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map(([Icon, label]) => (
              <a
                key={label}
                href="#home"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 hover:bg-electric"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-semibold text-white">Projects</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#projects" className="hover:text-cyan">
                Featured Projects
              </a>
            </li>
            <li>
              <a href="#categories" className="hover:text-cyan">
                Solution Categories
              </a>
            </li>
            <li>
              <a href="/live-demos" className="hover:text-cyan">
                Live Demos
              </a>
            </li>
            <li>
              <a href="/customization-request" className="hover:text-cyan">
                Request Customization
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold text-white">Company</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#about" className="hover:text-cyan">
                About SM Global
              </a>
            </li>
            <li>
              <a href="#process" className="hover:text-cyan">
                How It Works
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-cyan">
                Contact
              </a>
            </li>
            <li>
              <a href="#home" className="hover:text-cyan">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold text-white">Get in touch</h3>
          <address className="space-y-4 text-sm not-italic">
            <p className="flex gap-3">
              <Mail className="shrink-0 text-cyan" size={17} />
              hello@smglobalsolutions.com
            </p>
            <p className="flex gap-3">
              <Phone className="shrink-0 text-cyan" size={17} />
              +91 98765 43210
            </p>
            <p className="flex gap-3">
              <MapPin className="shrink-0 text-cyan" size={17} />
              India · Serving clients worldwide
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-5 text-center text-xs text-slate-500 sm:text-left">
          © {new Date().getFullYear()} SM Global Tech Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
