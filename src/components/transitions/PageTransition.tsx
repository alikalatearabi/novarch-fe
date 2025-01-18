'use client';

import React, { forwardRef, useMemo } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

type PageTransitionProps = HTMLMotionProps<'div'>
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>

function PageTransition({ children, ...rest }: PageTransitionProps, ref: PageTransitionRef) {
	const initial = { scale: 0.95, opacity: 0.8 }
	const animate = { scale: 1, opacity: 1 }
	const exit = { opacity: 0, scale: 0.85 }

	const transition = { duration: 0.3, ease: 'easeInOut' }

	return (
		<motion.div
			ref={ref}
			initial={initial}
			animate={animate}
			exit={exit}
			transition={transition}
			{...rest}
		>
			{children}
		</motion.div>
	)
}

export default forwardRef(PageTransition)