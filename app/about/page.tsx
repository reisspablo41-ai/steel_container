"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/animations/AnimatedSection";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import { fadeInLeft, fadeInRight, containerVariants, bounceIn } from "@/utils/animations";

export default function AboutPage() {
    return (
        <div className="bg-white">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-slate-900 py-20 text-center"
            >
                <div className="container-safe">
                    <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">Built Strong.</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        We provide the highest quality shipping containers for storage, transport, and innovative modification projects across the country.
                    </p>
                </div>
            </motion.div>
            
            <div className="container-safe py-16">
                 <AnimatedSection className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInLeft}
                    >
                        <h2 className="text-3xl font-heading font-bold text-slate-900 mb-6">Our Story</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Founded in 2010, Steel Container Store began with a simple mission: to make buying and renting shipping containers transparent, easy, and reliable. 
                            What started as a local depot has grown into a nationwide network, serving thousands of satisfied customers from construction giants to small business owners.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            We believe in the versatility of steel. Whether it's keeping tools safe on a job site or creating a modern pop-up cafe, our containers are the foundation for your success.
                        </p>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInRight}
                        className="h-80 bg-slate-100 rounded-lg overflow-hidden"
                    >
                        <motion.img 
                            src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=1000" 
                            alt="Container Depot" 
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                        />
                    </motion.div>
                 </AnimatedSection>

                 <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="grid sm:grid-cols-3 gap-8 text-center"
                 >
                    {[
                        { number: "15+", label: "Years in Business" },
                        { number: "50k+", label: "Containers Delivered" },
                        { number: "100%", label: "Satisfaction Guarantee" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={bounceIn}
                            className="p-6 bg-slate-50 rounded-lg"
                        >
                            <div className="text-4xl font-bold text-brand-orange mb-2">{stat.number}</div>
                            <div className="font-bold text-slate-900">{stat.label}</div>
                        </motion.div>
                    ))}
                 </motion.div>
            </div>
        </div>
    );
}
