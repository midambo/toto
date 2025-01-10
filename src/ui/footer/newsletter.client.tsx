"use client";

import { useTranslations } from "@/i18n/client";
import { signForNewsletter } from "@/ui/footer/actions";
import { Button } from "@/ui/shadcn/button";
import { Input } from "@/ui/shadcn/input";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Newsletter = () => {
  const t = useTranslations("Footer.newsletter");
  const [loading, setLoading] = useState(false);
  return (
    <form
      className="flex gap-x-2"
      onSubmit={() => {
        setLoading(true);
      }}
      action={async (formData) => {
        try {
          const result = await signForNewsletter(formData);
          if (result?.status && result.status < 400) {
            toast.info(t("successMessage"), {
              position: "bottom-left",
            });
          } else {
            toast.error(t("errorMessage"), { position: "bottom-left" });
          }
        } catch (error) {
          toast.error(t("errorMessage"), { position: "bottom-left" });
        } finally {
          setLoading(false);
        }
      }}
    >
      <Input
        type="email"
        name="email"
        required
        placeholder={t("emailPlaceholder")}
        className="max-w-xs"
      />
      <Button type="submit" disabled={loading}>
        {loading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : t("subscribeButton")}
      </Button>
    </form>
  );
};
