import Link from "next/link";

const VARIANTS = {
  outline: "border border-gold text-black hover:bg-gold hover:text-black",
  solid: "border border-gold bg-gold text-black hover:bg-gold-soft",
  ghostLight: "border border-gold text-ivory hover:bg-gold hover:text-black",
};

export default function Button({
  href,
  variant = "outline",
  children,
  className = "",
  ...props
}) {
  const classes = `inline-flex items-center gap-3.5 font-body font-medium text-[11.5px] tracking-[0.32em] uppercase px-[34px] py-4 transition-colors duration-300 ease-out cursor-pointer ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
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
