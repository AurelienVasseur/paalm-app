"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { assetTypesList } from "@/models/assetTypes";
import { createProvider, updateProvider } from "./actions";
import { Loader2 } from "lucide-react";
import { PostgrestError } from "@supabase/supabase-js";
import { Tables } from "@/database.types";

export const formSchema = z.object({
  label: z.string().min(2).max(50),
  description: z.string().min(2).max(100).optional(),
});

type Props = {
  onSave: (
    data: Tables<"providers"> | null,
    error: PostgrestError | null
  ) => void;
  onCancel: () => void;
  provider?: Tables<"providers">;
};

export default function ProvderForm({ onSave, onCancel, provider }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: provider?.label || "",
      description: provider?.description || undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { data, error } = provider
      ? await updateProvider(provider.id, values)
      : await createProvider(values);
    setIsLoading(false);
    onSave(data ? data[0] : null, error);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Coinbase" {...field} />
              </FormControl>
              <FormDescription>
                This is the provider display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder="Low fees centralized exchange..."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormDescription>A few words about the provider.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Please wait" : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
