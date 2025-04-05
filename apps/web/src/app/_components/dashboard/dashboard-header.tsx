import { cn } from "~/lib/utils";

interface DashboardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({
  heading,
  text,
  children,
  className,
  ...props
}: DashboardHeaderProps) {
  return (
    <div
      className={cn("flex items-center justify-between px-2", className)}
      {...props}
    >
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-muted-foreground text-lg">{text}</p>}
      </div>
      {children}
    </div>
  );
}