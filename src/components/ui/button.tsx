import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent text-sm font-bold whitespace-nowrap transition-all outline-none select-none uppercase tracking-wider gap-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-p-600 text-white hover:bg-p-400 hover:-translate-y-px",
        outline:
          "border-white/15 bg-transparent text-white/60 hover:bg-white/5 hover:text-white",
        ghost:
          "bg-transparent text-white/50 hover:bg-white/5 hover:text-white",
        "outline-dark":
          "border-p-600/30 bg-transparent text-p-600 hover:bg-p-600/5 hover:text-p-800",
        secondary:
          "bg-p-50 text-p-600 hover:bg-p-100",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20",
        link:
          "text-p-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 text-xs",
        sm: "h-8 px-4 text-[11px]",
        lg: "h-12 px-7 text-sm",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
