import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
    base: 'rounded-lg px-5 font-medium flex items-center justify-center gap-2 outline-none',
    
    variants: {
        variant: {
            primary: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
            secondary: 'bg-gray-800 text-gray-200 hover:bg-gray-700',
            danger: 'bg-red-500 text-white hover:bg-red-600',
        },

        size: {
            default: 'py-2',
            full: 'w-full h-11'
        },
    },
    
    defaultVariants: {
        variant: 'primary',
        size: 'default'
    }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants>{
    children: ReactNode
}

export function Button({ children, variant, size, ...props }: ButtonProps) {
    return (
        <button  {...props} className={buttonVariants({ variant, size })}>
            {children}
        </button>
    )
}