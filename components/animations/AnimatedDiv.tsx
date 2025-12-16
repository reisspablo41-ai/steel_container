"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Variants } from 'framer-motion';

interface AnimatedDivProps {
    children: ReactNode;
    className?: string;
    variants?: Variants;
    delay?: number;
    once?: boolean;
}

export default function AnimatedDiv({
    children,
    className = '',
    variants,
    delay = 0,
    once = true,
}: AnimatedDivProps) {
    const defaultVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay,
                ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.2 }}
            variants={variants || defaultVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

