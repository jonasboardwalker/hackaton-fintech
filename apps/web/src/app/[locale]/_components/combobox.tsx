import { useTranslations } from "next-intl";
import { Combobox as UICombobox, ComboboxProps } from "@admin-shad-template/ui";

export const Combobox = (props: ComboboxProps) => {
  const t = useTranslations("ui.combobox");
  return (
    <UICombobox
      selectLabelText={t("select_label_text")}
      placeholder={t("placeholder")}
      noResultsText={t("no_results_text")}
      {...props}
    />
  );
};
