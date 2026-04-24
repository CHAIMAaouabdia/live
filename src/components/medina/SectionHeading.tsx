interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export const SectionHeading = ({ eyebrow, title, subtitle, align = "center" }: Props) => (
  <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} mb-14`}>
    <div className={`ornament mb-5 ${align === "center" ? "" : "[&::after]:hidden"}`}>
      <span className="eyebrow">{eyebrow}</span>
    </div>
    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.1] mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </div>
);
