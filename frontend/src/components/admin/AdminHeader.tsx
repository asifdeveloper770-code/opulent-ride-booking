export function AdminHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-8">
      <p className="text-xs uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-display md:text-4xl">{title}</h1>
      {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>}
    </header>
  );
}
