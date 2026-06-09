import { icons, HelpCircle, type LucideProps } from "lucide-react";

/** Resolves any Lucide icon by its PascalCase name (keeps seed data serialisable). */
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = (icons as Record<string, React.ComponentType<LucideProps>>)[name] ?? HelpCircle;
  return <Cmp {...props} />;
}
