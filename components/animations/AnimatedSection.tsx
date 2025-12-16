"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Variants } from 'framer-motion';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    variants?: Variants;
    delay?: number;
}

export default function AnimatedSection({
    children,
    className = '',
    variants,
    delay = 0,
}: AnimatedSectionProps) {
    const defaultVariants: Variants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay,
                ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
            },
        },
    };

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={variants || defaultVariants}
            className={className}
        >
            {children}
        </motion.section>
    );
}

