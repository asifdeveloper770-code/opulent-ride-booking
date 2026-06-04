export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="border border-dashed border-border bg-card/30 p-10 text-center">
      <h3 className="font-display text-xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
