import Link from "next/link";
import { Github, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.5 17.5L14 14.5L7 9.5L17.5 6.5"
                    stroke="#0f172a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">FitMuscle</h3>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Your ultimate companion for muscle growth, strength gains, and fitness progression. Train smarter, not
              harder.
            </p>
            {/* <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                <Facebook size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                <Twitter size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                <Instagram size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                <Youtube size={20} />
              </Button>
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                  Muscle Chart
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/exercises" className="text-slate-400 hover:text-white transition-colors">
                  Exercise Library
                </Link>
              </li>
              {/* <li>
                <Link href="/workouts" className="text-slate-400 hover:text-white transition-colors">
                  Workout Plans
                </Link>
              </li>
              <li>
                <Link href="/progress" className="text-slate-400 hover:text-white transition-colors">
                  Progress Tracker
                </Link>
              </li>
              <li>
                <Link href="/nutrition" className="text-slate-400 hover:text-white transition-colors">
                  Nutrition Guide
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Resources */}
          {/* <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/beginner-guide" className="text-slate-400 hover:text-white transition-colors">
                  Beginner&apos;s Guide
                </Link>
              </li>
              <li>
                <Link href="/training-tips" className="text-slate-400 hover:text-white transition-colors">
                  Training Tips
                </Link>
              </li>
              <li>
                <Link href="/injury-prevention" className="text-slate-400 hover:text-white transition-colors">
                  Injury Prevention
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-slate-400 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Contact & Newsletter */}
          {/* <div>
            <h4 className="text-lg font-semibold text-white mb-4">Stay Connected</h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-slate-400">
                <Mail size={16} />
                <span className="text-sm">support@fitmuscle.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Phone size={16} />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Clock size={16} />
                <span className="text-sm">Mon-Fri 9AM-6PM EST</span>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium text-white mb-3">Subscribe to our newsletter</h5>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-slate-500"
                />
                <Button className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 px-4">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Get weekly fitness tips and muscle-building advice delivered to your inbox.
              </p>
            </div>
          </div>
        </div> */}
      </div>
      </div>

      <Separator className="bg-slate-800" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-slate-400">
            <p>&copy; 2024 FitMuscle. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div> */}

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by</span>
              <Link
                href="https://github.com/rodionspi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                Rodion
              </Link>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white" asChild>
              <Link href="https://github.com/rodionspi" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Support Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-white">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Support the development of FitMuscle</span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              >
                <Heart className="w-4 h-4 mr-2" />
                Donate
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                Share App
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
