export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && <span className="divider-gold">{eyebrow}</span>}
      <h2 className="mt-4 text-4xl md:text-5xl font-display leading-tight">{title}</h2>
      {subtitle && <p className="mt-5 text-muted-foreground leading-relaxed">{subtitle}</p>}
    </div>
  );
}
