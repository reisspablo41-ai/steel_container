"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/animations/AnimatedSection";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import { containerVariants, fadeInUp } from "@/utils/animations";

export default function FAQSection() {
    const faqs = [
        {
            question: "What is the difference between 'One Trip' and 'Used'?",
            answer: "A 'One Trip' container is essentially new; it has only made one voyage from the factory in Asia to the US. It may have minor scuffs but no rust or dents. 'Used' containers have been in service for 10-15 years and will show signs of wear, surface rust, and dents, but are guaranteed wind and watertight."
        },
        {
            question: "Do I need to prepare the ground before delivery?",
            answer: "Yes. The delivery site must be level, firm, and dry. We recommend a gravel pad, concrete blocks, or railroad ties at the corners to keep the container off the ground and allow for airflow. Ensure there is enough space for a tilt-bed truck to maneuver (approx 100ft straight clearance for 40ft containers)."
        },
        {
            question: "How is the container delivered?",
            answer: "We typically deliver using a tilt-bed truck. The driver will back into the spot, tilt the bed, and gently slide the container off the back as they pull forward. No crane is needed unless you have specific site restrictions."
        },
        {
            question: "How much does delivery cost?",
            answer: "Delivery depends on your ZIP code and the distance from the nearest depot. Since we quote every order individually to get you the best market rate, please add items to your quote request to get an exact delivery price."
        },
        {
            question: "Is there a warranty?",
            answer: "Yes. We offer a 1-year warranty against structural leaks for all Wind & Watertight and Cargo Worthy containers. 'One Trip' containers come with a 5-year structural warranty."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <AnimatedSection className="py-24 bg-white">
            <div className="container-safe max-w-4xl">
                <AnimatedHeading className="text-center mb-12">
                     <span className="text-brand-orange font-bold uppercase tracking-wider text-sm">Common Questions</span>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mt-2">
                        Frequently Asked Questions
                    </h2>
                </AnimatedHeading>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="space-y-4"
                >
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="border border-slate-200 rounded-lg overflow-hidden"
                        >
                            <motion.button
                                whileHover={{ backgroundColor: "#f8fafc" }}
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex justify-between items-center p-6 text-left bg-white transition-colors"
                            >
                                <span className={`font-bold text-lg ${openIndex === index ? 'text-brand-orange' : 'text-slate-900'}`}>
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {openIndex === index ? <ChevronUp className="text-brand-orange" /> : <ChevronDown className="text-slate-400" />}
                                </motion.div>
                            </motion.button>
                            
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 bg-white text-slate-600 leading-relaxed border-t border-slate-100">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </AnimatedSection>
    );
}
