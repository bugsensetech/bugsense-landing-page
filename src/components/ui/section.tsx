import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "footer";
  innerClassName?: string;
}

export function Section({
  as: Tag = "section",
  className,
  innerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn("w-full", className)} {...props}>
      <div className={cn("mx-auto max-w-[1100px] px-8 lg:px-16", innerClassName)}>
        {children}
      </div>
    </Tag>
  );
}
