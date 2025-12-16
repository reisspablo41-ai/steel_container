"use client";

import { ShieldCheck, Truck, Banknote, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animations/AnimatedSection";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import { containerVariants, staggerItem, scaleIn } from "@/utils/animations";

export default function FeaturesSection() {
  const features = [
    {
      icon: <ShieldCheck size={40} className="text-brand-orange" />,
      title: "Guaranteed Quality",
      description: "Every container is inspected to meet strict Wind & Watertight (WWT) or Cargo Worthy standards."
    },
    {
      icon: <Truck size={40} className="text-brand-orange" />,
      title: "Nationwide Delivery",
      description: "Fast, reliable deployment to your site within 3-7 business days through our logistics network."
    },
    {
      icon: <Banknote size={40} className="text-brand-orange" />,
      title: "Best Price Guarantee",
      description: "We work directly with depots to cut out middlemen, passing the wholesale savings on to you."
    },
    {
      icon: <Leaf size={40} className="text-brand-orange" />,
      title: "Eco-Friendly Choice",
      description: "Repurposing shipping containers reduces construction waste and carbon footprint."
    }
  ];

  return (
    <AnimatedSection className="py-24 bg-white">
      <div className="container-safe">
        <AnimatedHeading className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-orange font-bold uppercase tracking-wider text-sm">Why Choose Us</span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mt-2">
            Built on Trust, Delivered with Speed
          </h2>
          <p className="text-slate-600 mt-4 text-lg">
            We simplify the process of buying shipping containers with transparent pricing and expert support.
          </p>
        </AnimatedHeading>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              className="p-8 bg-slate-50 rounded-xl hover:shadow-lg transition-shadow border border-slate-100 group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mb-6 p-4 bg-white rounded-full w-fit shadow-sm transition-transform duration-300"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
