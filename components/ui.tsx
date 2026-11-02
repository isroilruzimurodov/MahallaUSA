import Link from "next/link";
import type { ReactNode } from "react";
import { isMissing } from "@/content/site";

/** Renders a site fact; a missing one is highlighted so the team can spot it. */
export function Fact({ value }: { value: string }) {
  if (isMissing(value)) return <span className="todo">{value}</span>;
  return <>{value}</>;
}

type Variant = "primary" | "accent" | "outline" | "light" | "outline-light";
const variants: Record<Variant, string> = {
  primary: "bg-teal text-white hover:bg-teal-strong hover:text-white",
  accent: "bg-red text-white hover:bg-red-strong hover:text-white",
  outline: "border border-line-strong text-ink hover:bg-quiet hover:text-ink",
  light: "bg-white text-ink hover:bg-paper hover:text-ink",
  "outline-light": "border border-white text-white hover:bg-white/10 hover:text-white",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  external?: boolean;
}) {
  const cls = `inline-flex items-center justify-center rounded-md text-center font-semibold no-underline transition-colors ${
    size === "lg" ? "min-h-[52px] px-7 text-[17px]" : "min-h-[48px] px-6 py-2"
  } ${variants[variant]}`;
  if (external || href.startsWith("http"))
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-page px-4 sm:px-8 ${className}`}>{children}</div>;
}

export function TwinRule({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <div className="h-[3px] bg-red" />
      <div className="mt-[3px] h-[3px] bg-flag" />
    </div>
  );
}

export function Eyebrow({ children, className = "text-teal" }: { children: ReactNode; className?: string }) {
  return <p className={`mb-4 text-[13px] font-semibold uppercase leading-4 tracking-[0.06em] ${className}`}>{children}</p>;
}

export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`font-display text-[30px] font-semibold leading-[36px] sm:text-[36px] sm:leading-[42px] ${className}`}>{children}</h2>;
}

export function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[18px] leading-[28px] text-muted ${className}`}>{children}</p>;
}

export function PageHeader({ eyebrow, title, lead }: { eyebrow?: string; title: string; lead?: string }) {
  return (
    <div className="border-b border-line bg-card">
      <Container className="py-12 sm:py-16">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="max-w-[820px] font-display text-[38px] font-semibold leading-[44px] sm:text-[48px] sm:leading-[54px]">{title}</h1>
        {lead && <Lead className="mt-5 max-w-read">{lead}</Lead>}
      </Container>
      <TwinRule />
    </div>
  );
}

export function Stat({ value, label, dark, className = "" }: { value: string; label: string; dark?: boolean; className?: string }) {
  return (
    <div className={`flex flex-col-reverse gap-1 ${className}`}>
      <dt className={`text-[15px] ${dark ? "text-night-muted" : "text-muted"}`}>{label}</dt>
      {isMissing(value) ? (
        <dd className="flex min-h-[52px] items-end text-[15px] leading-5">
          <Fact value={value} />
        </dd>
      ) : (
        <dd className={`font-display text-[40px] font-semibold leading-[44px] sm:text-[48px] sm:leading-[52px] ${dark ? "text-white" : "text-teal-strong"}`}>{value}</dd>
      )}
    </div>
  );
}

/** Stand-in for a real photo until MahallaUSA supplies one (with photo releases). */
export function PhotoSlot({ label, tone = "teal", className = "" }: { label: string; tone?: "teal" | "red"; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex items-end overflow-hidden rounded-lg ${tone === "teal" ? "bg-teal" : "bg-red"} ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 400 300" preserveAspectRatio="xMaxYMin slice" className="absolute inset-0 h-full w-full">
        <g fill="#FBF9F5" opacity="0.9">
          {[
            [300, 40], [340, 40], [380, 40], [340, 80], [380, 80], [380, 120],
          ].map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x - 7} y={y - 7} width="14" height="14" transform={`rotate(45 ${x} ${y})`} />
          ))}
        </g>
      </svg>
      <span className="relative m-5 rounded-sm bg-white px-3 py-2 text-[14px] leading-5 text-ink">{label}</span>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-line bg-card p-6 ${className}`}>{children}</div>;
}
