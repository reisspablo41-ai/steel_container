import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { WEBSITE_EMAIL } from "@/utils/email";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
            <div className="container-safe grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">

                {/* Brand & Social */}
                <div className="space-y-6">
                    <Link href="/" className="text-2xl font-heading font-bold text-white tracking-tight">
                        STEEL <span className="text-brand-orange">CONTAINER</span> STORE
                    </Link>
                    <p className="leading-relaxed text-slate-400">
                        Premium shipping containers for sale and rent. Nationwide delivery.
                        Industrial-grade durability for storage, office, or custom projects.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>

                {/* Inventory */}
                <div>
                    <h3 className="text-white font-bold uppercase tracking-wider mb-6">Inventory</h3>
                    <ul className="space-y-3">
                        <li><Link href="/containers?type=sale" className="hover:text-brand-orange transition-colors">Shipping containers for sale</Link></li>
                        <li><Link href="/rent" className="hover:text-brand-orange transition-colors">Rent storage container & offices</Link></li>
                        <li><Link href="/containers?type=reefer" className="hover:text-brand-orange transition-colors">Cold storage containers</Link></li>
                        <li><Link href="/containers" className="hover:text-brand-orange transition-colors">Shop All</Link></li>
                    </ul>
                </div>

                {/* Company & Support */}
                <div>
                    <h3 className="text-white font-bold uppercase tracking-wider mb-6">Company</h3>
                    <ul className="space-y-3">
                        <li><Link href="/about" className="hover:text-brand-orange transition-colors">About us</Link></li>
                        <li><Link href="/reviews" className="hover:text-brand-orange transition-colors">Customer Reviews</Link></li>
                        <li><Link href="/careers" className="hover:text-brand-orange transition-colors">Careers</Link></li>
                        <li><Link href="/blog" className="hover:text-brand-orange transition-colors">Blog</Link></li>
                        <li><Link href="/affiliate" className="hover:text-brand-orange transition-colors">Join affiliate program</Link></li>
                        <li><Link href="/contact" className="hover:text-brand-orange transition-colors">Contact us</Link></li>
                    </ul>
                    <div className="mt-6 pt-6 border-t border-slate-800">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Mail size={16} />
                            <a href={`mailto:${WEBSITE_EMAIL}`} className="hover:text-brand-orange transition-colors">
                                {WEBSITE_EMAIL}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Resources & Setup */}
                <div>
                    <h3 className="text-white font-bold uppercase tracking-wider mb-6">Resources</h3>
                    <ul className="space-y-3">
                        <li><Link href="/w9" className="hover:text-brand-orange transition-colors">Looking for our W-9?</Link></li>
                        <li><Link href="/credit-application" className="hover:text-brand-orange transition-colors">Credit application (fillable)</Link></li>
                        <li><Link href="/terms" className="hover:text-brand-orange transition-colors">Terms & conditions</Link></li>
                        <li><Link href="/search" className="hover:text-brand-orange transition-colors">Search</Link></li>
                        <li className="pt-2"><Link href="/login" className="inline-block border border-slate-700 rounded px-4 py-2 hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all">My account (log in)</Link></li>
                    </ul>
                </div>
            </div>

            <div className="container-safe mt-16 pt-8 border-t border-slate-800 text-xs text-center text-slate-500">
                &copy; {new Date().getFullYear()} Steel Container Store. All rights reserved.
            </div>
        </footer>
    );
}
