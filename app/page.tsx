"use client";

import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import ReviewsSlideshow from "@/components/home/ReviewsSlideshow";
import FAQSection from "@/components/home/FAQSection";
import Link from "next/link";
import { Hammer, PenTool, Mail } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { fadeInLeft, fadeInRight, containerVariants, staggerItem } from "@/utils/animations";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <Hero />
      <FeaturedProducts />
      <FeaturesSection />
      <FeaturedCategories />
      <HowItWorks />

      {/* Modification Service Teaser */}
      <AnimatedSection className="py-20 bg-slate-900 text-white">
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="container-safe grid lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={fadeInLeft}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1 mb-4 rounded bg-brand-orange/20 text-brand-orange text-sm font-bold uppercase tracking-wider"
            >
              Custom Fabrication
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6">
              DESIGN YOUR DREAM <br /> CONTAINER BUILD
            </h2>
            <p className="text-slate-400 mb-8 text-lg leading-relaxed">
              From simple windows and doors to full-scale mobile offices and pop-up shops.
              Our fabrication team can modify any container to meet your exact specifications.
            </p>

            <motion.div
                variants={containerVariants}
                className="grid sm:grid-cols-2 gap-6 mb-8"
            >
              <motion.div variants={staggerItem} className="flex gap-4">
                <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="bg-slate-800 p-3 rounded h-fit"
                >
                  <PenTool className="text-brand-orange" size={24} />
                </motion.div>
                <div>
                  <h4 className="font-bold mb-1">Custom Design</h4>
                  <p className="text-sm text-slate-400">Work with our engineers to create blueprints.</p>
                </div>
              </motion.div>
              <motion.div variants={staggerItem} className="flex gap-4">
                <motion.div
                    whileHover={{ rotate: -5, scale: 1.1 }}
                    className="bg-slate-800 p-3 rounded h-fit"
                >
                  <Hammer className="text-brand-orange" size={24} />
                </motion.div>
                <div>
                  <h4 className="font-bold mb-1">Expert Build</h4>
                  <p className="text-sm text-slate-400">Fabricated in-house by certified welders.</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/customizations" className="inline-block bg-brand-orange text-white px-8 py-3.5 font-bold rounded hover:bg-orange-600 transition-colors">
                Start a Custom Project
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
              variants={fadeInRight}
              className="relative h-[500px] bg-slate-800 rounded-2xl overflow-hidden border border-slate-700"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000"
              alt="Container Modification Process"
              className="w-full h-full object-cover opacity-80"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </motion.div>
      </AnimatedSection>

      <Testimonials />
      <ReviewsSlideshow />
      <FAQSection />

      {/* CTA Section */}
      <AnimatedSection className="py-24 bg-brand-orange">
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="container-safe text-center"
        >
          <motion.h2
              variants={staggerItem}
              className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6"
          >
            READY TO GET STARTED?
          </motion.h2>
          <motion.p
              variants={staggerItem}
              className="text-white/90 text-lg max-w-2xl mx-auto mb-10"
          >
            Whether you need a single storage unit or a fleet of containers,
            our team is here to help you find the perfect solution.
          </motion.p>
          <motion.div
              variants={containerVariants}
              className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/containers" className="px-8 py-3.5 bg-white text-brand-orange font-bold rounded hover:bg-slate-50 transition-colors">
                Browse Inventory
              </Link>
            </motion.div>
            <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact" className="px-8 py-3.5 bg-brand-orange border-2 border-white text-white font-bold rounded hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <Mail size={20} /> Contact Sales
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatedSection>
    </div>
  );
}
