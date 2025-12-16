"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { slideInTop } from '@/utils/animations';

interface AnimatedHeadingProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export default function AnimatedHeading({
    children,
    className = '',
    delay = 0,
}: AnimatedHeadingProps) {
    const variants = {
        hidden: slideInTop.hidden,
        visible: {
            ...slideInTop.visible,
            transition: {
                ...(typeof slideInTop.visible === 'object' && 'transition' in slideInTop.visible 
                    ? slideInTop.visible.transition 
                    : {}),
                delay,
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

