"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

import { HTMLMotionProps } from "framer-motion"; // Import HTMLMotionProps

export interface ButtonProps
  extends HTMLMotionProps<"button">, // Extend HTMLMotionProps for Framer Motion compatibility
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children?: React.ReactNode; // Explicitly define children
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => { // Don't destructure style here
    const Comp = asChild ? Slot : motion.button;

    /* eslint-disable @typescript-eslint/no-unused-vars */
    // Separate framer-motion specific props and event handlers from standard HTML props
    const {
      initial, animate, transition, variants, whileHover, whileTap, whileDrag,
      whileFocus, whileInView, onAnimationStart, onAnimationComplete, onUpdate,
      layout, layoutId, layoutRoot, drag, dragConstraints, dragElastic,
      dragMomentum, dragPropagation, dragTransition, dragControls, onDragStart,
      onDrag, onDragEnd, onPan, onPanStart, onPanEnd, onTap, onTapStart,
      onTapCancel, onHoverStart, onHoverEnd,
      style, // Extract style here
      ...restHtmlProps // These should be safe for Slot
    } = props;
    /* eslint-enable @typescript-eslint/no-unused-vars */

    // Conditionally pass props based on whether it's a Slot or motion.button
    const componentProps = asChild
      ? restHtmlProps // Pass only standard HTML props to Slot, style is omitted
      : { ...props }; // Pass all HTMLMotionProps to motion.button (including style)

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          "relative z-10 group"
        )}
        ref={ref}
        {...componentProps}
      >
        {children}
        <motion.span
          className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
        />
        <motion.span
          className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 0.5, ease: "linear", delay: 0.25 }}
        />
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
