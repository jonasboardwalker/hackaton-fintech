import {
  CardContent as UIContent,
  CardHeader as UICardHeader,
  CardTitle as UICardTitle,
  Card as UICard,
} from "@admin-shad-template/ui";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export function Card({ title, children }: Props) {
  return (
    <UICard className="mx-0 mb-4 w-full rounded-lg border shadow-none last:mb-0 md:mx-0">
      {!!title && (
        <UICardHeader className="px-4">
          <UICardTitle>{title}</UICardTitle>
        </UICardHeader>
      )}
      <UIContent className="px-4">{children}</UIContent>
    </UICard>
  );
}
