"use client";

import { Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import ContactForm from "@/components/contact/ContactForm";
import { WEBSITE_EMAIL } from "@/utils/email";
import { fadeInLeft, fadeInRight, containerVariants, staggerItem, scaleIn } from "@/utils/animations";

export default function ContactPage() {
    return (
        <div className="container-safe py-16">
            <AnimatedHeading className="mb-12 text-center">
                <h1 className="text-3xl font-heading font-bold text-slate-900">Contact Us</h1>
            </AnimatedHeading>
            
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="grid lg:grid-cols-3 gap-8"
            >
                {/* Contact Info Cards */}
                <motion.div variants={fadeInLeft} className="space-y-4">
                    <motion.div
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-slate-50 p-6 rounded-lg text-center"
                    >
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-brand-orange"
                        >
                            <Mail size={24} />
                        </motion.div>
                        <h3 className="font-bold text-slate-900 mb-2">Email Us</h3>
                        <p className="text-sm text-slate-500 mb-2">We'll respond within 24 hours</p>
                        <a href={`mailto:${WEBSITE_EMAIL}`} className="text-lg font-bold text-brand-orange hover:underline">{WEBSITE_EMAIL}</a>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-slate-50 p-6 rounded-lg text-center"
                    >
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-brand-orange"
                        >
                            <MapPin size={24} />
                        </motion.div>
                        <h3 className="font-bold text-slate-900 mb-2">Visit Us</h3>
                        <p className="text-sm text-slate-500">
                            1251 Taney St<br/>
                            North Kansas City, MO 64116
                        </p>
                    </motion.div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    variants={fadeInRight}
                    className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-8 shadow-sm"
                >
                    <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                    <ContactForm />
                </motion.div>
            </motion.div>
        </div>
    );
}
