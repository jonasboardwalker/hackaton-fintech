import { type LucideIcon } from "lucide-react";
import { RoutePath } from "~/app/_lib/routes";

export type NavigationItemType = {
  icon: LucideIcon;
  label: string;
  href: RoutePath;
};
