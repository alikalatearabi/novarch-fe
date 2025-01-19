'use client';

import React, { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

type PageTransitionProps = HTMLMotionProps<'div'>
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>

function MotionDiv({ children, ...rest }: PageTransitionProps, ref: PageTransitionRef) {
	return (
		<motion.div
			ref={ref}
			{...rest}
		>
			{children}
		</motion.div>
	)
}

export default forwardRef(MotionDiv)