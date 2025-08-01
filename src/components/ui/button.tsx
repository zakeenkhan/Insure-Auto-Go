import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        black:
          "border border-black bg-black text-white hover:text-black font-semibold hover:bg-white shadow-[inset_0_0px_0_#ffffff] hover:shadow-[inset_0_70px_0_#ffffff] transition duration-300",
        orange:
          "border border-[#E18B20] bg-[#E18B20] text-white hover:text-[#E18B20] font-semibold hover:bg-white shadow-[inset_0_0px_0_#ffffff] hover:shadow-[inset_0_70px_0_#ffffff] transition duration-300",
        orangeSecondary:
          "border border-[#E18B20] bg-[#E18B20] text-white  font-semibold  shadow-[inset_0_0px_0_#ffffff] transition duration-300",
        blue: "bg-[#15182E] hover:bg-[#377384] text-white transition duration-300",
        green:
          "bg-green-500 hover:opacity-70 text-white transition duration-300",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-2 text-xs",
        md: "h-10 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-4 text-md",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
