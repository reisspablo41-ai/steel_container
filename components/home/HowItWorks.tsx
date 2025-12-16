"use client";

import Link from "next/link";
import { MousePointerClick, FileText, PackageCheck } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { fadeInLeft, fadeInRight, containerVariants, rotateScale } from "@/utils/animations";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: <MousePointerClick size={32} />,
      title: "Select Your Container",
      description: "Browse our inventory of 20ft, 40ft, and specialty containers. Choose the size and condition that fits your project."
    },
    {
      number: "02",
      icon: <FileText size={32} />,
      title: "Request a Quote",
      description: "Fill out our simple quote form. We'll calculate the exact delivery cost to your ZIP code within 24 hours."
    },
    {
      number: "03",
      icon: <PackageCheck size={32} />,
      title: "Fast Delivery",
      description: "Once confirmed, we schedule a tilt-bed truck to deliver and offload your container right at your desired spot."
    }
  ];

  return (
    <AnimatedSection className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
        >
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-orange rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        </motion.div>

      <div className="container-safe relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInLeft}
                className="lg:w-1/2"
            >
                <span className="text-brand-orange font-bold uppercase tracking-wider text-sm">Simple Process</span>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold mt-2 mb-6">
                    From Port to Property in 3 Simple Steps
                </h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    Buying a shipping container shouldn't be complicated. We've streamlined the entire logistics chain to make it as easy as ordering a pizza, but bigger.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/containers" className="inline-block bg-white text-slate-900 px-8 py-3.5 font-bold rounded hover:bg-brand-orange hover:text-white transition-colors">
                        Get Started Now
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="lg:w-1/2 grid gap-6"
            >
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        variants={fadeInRight}
                        whileHover={{ scale: 1.02, x: 10 }}
                        className="flex gap-6 p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-brand-orange/50 transition-colors"
                    >
                        <motion.div
                            variants={rotateScale}
                            className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-slate-700 rounded-full text-brand-orange font-bold font-heading text-xl"
                        >
                            {step.number}
                        </motion.div>
                        <div>
                            <div className="flex items-center gap-3 mb-2 text-white">
                                {step.icon}
                                <h3 className="text-xl font-bold">{step.title}</h3>
                            </div>
                            <p className="text-slate-400">
                                {step.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

        </div>
      </div>
    </AnimatedSection>
  );
}
