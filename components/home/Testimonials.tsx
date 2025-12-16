"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animations/AnimatedSection";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import { containerVariants, fadeInUp, scaleIn } from "@/utils/animations";

export default function Testimonials() {
  const reviews = [
    {
      author: "Mike Stevenson",
      role: "Construction Manager",
      text: "The 40ft High Cube we ordered for our job site storage is solid. Delivery driver was a pro - dropped it exactly where we marked it.",
      company: "Apex Builders"
    },
    {
      author: "Sarah Jenning",
      role: "Tiny Home Builder",
      text: "Bought a 'One Trip' 20ft container and it looks brand new. Perfect base for my guest house project. The sales team was super helpful with specs.",
      company: "DIY Enthusiast"
    },
    {
      author: "Robert Chen",
      role: "Logistics Coordinator",
      text: "We needed 5 units ASAP for seasonal inventory. They coordinated the whole fleet delivery in under 4 days. Unbeatable service.",
      company: "Global Imports Inc."
    }
  ];

  return (
    <AnimatedSection className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="container-safe">
        <AnimatedHeading className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-1 mb-4"
            >
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Star size={20} className="fill-brand-orange text-brand-orange" />
                    </motion.div>
                ))}
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
                Trusted by Businesses & Builders
            </h2>
        </AnimatedHeading>

        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
        >
            {reviews.map((review, index) => (
                <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full"
                >
                    <div className="text-slate-600 mb-6 flex-grow italic leading-relaxed">
                        "{review.text}"
                    </div>
                    <div>
                        <div className="font-bold text-slate-900">{review.author}</div>
                        <div className="text-sm text-slate-500">
                            {review.role}, <span className="text-brand-orange">{review.company}</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
