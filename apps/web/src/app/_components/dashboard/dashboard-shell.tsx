import { cn } from "@admin-shad-template/ui"

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className={cn("grid items-start gap-8 p-1", className)} {...props}>
      {children}
    </div>
  )
} 