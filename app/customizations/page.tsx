"use client";

import Link from "next/link";
import { PenTool, Hammer, Wrench, Paintbrush, DoorOpen, Square, Zap, Droplets, Shield, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animations/AnimatedSection";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import { fadeInUp, fadeInLeft, fadeInRight, containerVariants, scaleIn, zoomIn, staggerItem, flip } from "@/utils/animations";

export default function CustomizationsPage() {
    const modifications = [
        {
            icon: DoorOpen,
            title: "Doors & Entry Points",
            description: "Custom door configurations including roll-up doors, double doors, or additional entry points.",
            features: ["Roll-up doors", "Double doors", "Side doors", "Custom door sizes", "Security locks"]
        },
        {
            icon: Square,
            title: "Windows & Ventilation",
            description: "Add windows, skylights, and ventilation systems for natural light and air circulation.",
            features: ["Standard windows", "Skylights", "Whirlybird vents", "AC units", "Exhaust fans"]
        },
        {
            icon: Zap,
            title: "Electrical & Lighting",
            description: "Complete electrical systems with outlets, lighting, and power distribution panels.",
            features: ["110V/220V wiring", "LED lighting", "GFCI outlets", "Breaker panels", "Solar ready"]
        },
        {
            icon: Droplets,
            title: "Plumbing & Water",
            description: "Full plumbing installations for sinks, showers, toilets, and water supply systems.",
            features: ["Sink installations", "Shower systems", "Toilet hookups", "Water heaters", "Drainage"]
        },
        {
            icon: Paintbrush,
            title: "Paint & Finishing",
            description: "Custom paint jobs, powder coating, and protective finishes in any color or design.",
            features: ["Custom colors", "Powder coating", "Rust protection", "Logo/branding", "Decorative finishes"]
        },
        {
            icon: Shield,
            title: "Insulation & Climate Control",
            description: "Spray foam, panel insulation, and HVAC systems for temperature-controlled environments.",
            features: ["Spray foam insulation", "Panel insulation", "HVAC systems", "Vapor barriers", "Thermal breaks"]
        },
        {
            icon: Wrench,
            title: "Structural Modifications",
            description: "Cutting, welding, and structural changes to create custom layouts and configurations.",
            features: ["Wall removal", "Room dividers", "Mezzanine floors", "Staircases", "Custom framing"]
        },
        {
            icon: Hammer,
            title: "Interior Finishing",
            description: "Complete interior build-outs with drywall, flooring, cabinetry, and fixtures.",
            features: ["Drywall installation", "Flooring options", "Cabinetry", "Countertops", "Fixtures"]
        }
    ];

    const popularProjects = [
        {
            title: "Mobile Office",
            description: "Fully equipped office space with electrical, HVAC, and professional finishes.",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
            price: "Starting at $15,000"
        },
        {
            title: "Pop-Up Shop",
            description: "Retail-ready container with storefront, lighting, and display systems.",
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
            price: "Starting at $12,000"
        },
        {
            title: "Tiny Home",
            description: "Complete residential conversion with kitchen, bathroom, and living space.",
            image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=800",
            price: "Starting at $25,000"
        },
        {
            title: "Workshop/Studio",
            description: "Dedicated workspace with power, lighting, and storage solutions.",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
            price: "Starting at $8,000"
        }
    ];

    const processSteps = [
        {
            number: "01",
            title: "Consultation",
            description: "Discuss your vision, requirements, and budget with our design team."
        },
        {
            number: "02",
            title: "Design & Quote",
            description: "Receive detailed blueprints and a comprehensive quote for your project."
        },
        {
            number: "03",
            title: "Approval",
            description: "Review and approve the design, then we'll schedule your build."
        },
        {
            number: "04",
            title: "Fabrication",
            description: "Our certified team builds your custom container in our facility."
        },
        {
            number: "05",
            title: "Delivery",
            description: "We deliver your finished container directly to your location."
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-slate-900 py-20 text-center"
            >
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="container-safe"
                >
                    <motion.div
                        variants={staggerItem}
                        className="inline-block px-3 py-1 mb-6 rounded bg-brand-orange/20 text-brand-orange text-sm font-bold uppercase tracking-wider"
                    >
                        Custom Fabrication
                    </motion.div>
                    <motion.h1
                        variants={staggerItem}
                        className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white mb-6"
                    >
                        DESIGN YOUR DREAM<br />CONTAINER BUILD
                    </motion.h1>
                    <motion.p
                        variants={staggerItem}
                        className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed"
                    >
                        From simple windows and doors to full-scale mobile offices and pop-up shops.
                        Our fabrication team can modify any container to meet your exact specifications.
                    </motion.p>
                    <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            href="/contact"
                            className="inline-block bg-brand-orange text-white px-8 py-4 font-bold rounded hover:bg-orange-600 transition-colors text-lg"
                        >
                            Start Your Custom Project
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Modification Services */}
            <AnimatedSection className="py-20 bg-slate-50">
                <div className="container-safe">
                    <AnimatedHeading className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mb-4">
                            Our Modification Services
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            We offer comprehensive customization services to transform your container into exactly what you need.
                        </p>
                    </AnimatedHeading>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {modifications.map((mod, index) => {
                            const Icon = mod.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={scaleIn}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-lg transition-all hover:border-brand-orange"
                                >
                                    <motion.div
                                        whileHover={{ rotate: 5, scale: 1.1 }}
                                        className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4"
                                    >
                                        <Icon className="text-brand-orange" size={24} />
                                    </motion.div>
                                    <h3 className="font-bold text-slate-900 mb-2">{mod.title}</h3>
                                    <p className="text-sm text-slate-600 mb-4">{mod.description}</p>
                                    <ul className="space-y-2">
                                        {mod.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                                                <Check size={14} className="text-brand-orange flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </AnimatedSection>

            {/* Popular Projects */}
            <AnimatedSection className="py-20 bg-white">
                <div className="container-safe">
                    <AnimatedHeading className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mb-4">
                            Popular Custom Projects
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            See some of our most requested customization projects
                        </p>
                    </AnimatedHeading>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {popularProjects.map((project, index) => (
                            <motion.div
                                key={index}
                                variants={zoomIn}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow"
                            >
                                <div className="h-64 overflow-hidden">
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.7 }}
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{project.title}</h3>
                                    <p className="text-slate-600 mb-4">{project.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-brand-orange">{project.price}</span>
                                        <Link
                                            href="/contact"
                                            className="flex items-center gap-2 text-slate-900 font-bold hover:text-brand-orange transition-colors"
                                        >
                                            Get Quote <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </AnimatedSection>

            {/* Process Section */}
            <AnimatedSection className="py-20 bg-slate-900 text-white">
                <div className="container-safe">
                    <AnimatedHeading className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
                            Our Customization Process
                        </h2>
                        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                            From concept to delivery, we guide you through every step
                        </p>
                    </AnimatedHeading>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                        className="grid md:grid-cols-5 gap-6"
                    >
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                variants={flip}
                                whileHover={{ scale: 1.05 }}
                                className="text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, type: "spring" }}
                                    className="text-6xl font-bold text-brand-orange/20 mb-4"
                                >
                                    {step.number}
                                </motion.div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </AnimatedSection>

            {/* Why Choose Us */}
            <AnimatedSection className="py-20 bg-slate-50">
                <div className="container-safe">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        <motion.div variants={fadeInLeft}>
                            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mb-6">
                                Why Choose Steel Container Store for Customization?
                            </h2>
                            <motion.div
                                variants={containerVariants}
                                className="space-y-6"
                            >
                                {[
                                    { icon: Hammer, title: "Certified Welders", desc: "Our team includes AWS-certified welders with years of experience in container modification." },
                                    { icon: PenTool, title: "Custom Design", desc: "Work with our engineers to create detailed blueprints tailored to your specific needs." },
                                    { icon: Shield, title: "Quality Guarantee", desc: "All modifications are backed by our quality guarantee and meet industry standards." },
                                    { icon: Zap, title: "Fast Turnaround", desc: "Most projects completed in 2-6 weeks depending on complexity." }
                                ].map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <motion.div
                                            key={index}
                                            variants={staggerItem}
                                            className="flex gap-4"
                                        >
                                            <motion.div
                                                whileHover={{ rotate: 5, scale: 1.1 }}
                                                className="bg-brand-orange/10 p-3 rounded-lg h-fit"
                                            >
                                                <Icon className="text-brand-orange" size={24} />
                                            </motion.div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                                                <p className="text-slate-600">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
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
                </div>
            </AnimatedSection>

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
                        READY TO START YOUR CUSTOM PROJECT?
                    </motion.h2>
                    <motion.p
                        variants={staggerItem}
                        className="text-white/90 text-lg max-w-2xl mx-auto mb-10"
                    >
                        Contact our customization team today for a free consultation and quote.
                        Let's bring your vision to life.
                    </motion.p>
                    <motion.div
                        variants={containerVariants}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href="/contact"
                                className="px-8 py-3.5 bg-white text-brand-orange font-bold rounded hover:bg-slate-50 transition-colors"
                            >
                                Get Free Quote
                            </Link>
                        </motion.div>
                        <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href="/containers"
                                className="px-8 py-3.5 bg-brand-orange border-2 border-white text-white font-bold rounded hover:bg-white/10 transition-colors"
                            >
                                Browse Containers
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </AnimatedSection>
        </div>
    );
}

