import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  href?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-navy text-cream hover:bg-navy-light border border-navy",
  secondary:
    "bg-gold text-navy hover:bg-gold-light border border-gold",
  outline:
    "bg-transparent text-navy border border-navy hover:bg-navy hover:text-cream",
};

const baseClasses =
  "inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200";

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
