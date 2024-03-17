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
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { assetTypesList } from "@/models/assetTypes";
import { createAsset, updateAsset } from "./actions";
import { Loader2 } from "lucide-react";
import { PostgrestError } from "@supabase/supabase-js";

export const formSchema = z.object({
  label: z.string().min(2).max(50),
  ticker: z.string().min(2).max(5),
  type: z.enum(["FIAT", "STOCK", "CRYPTO", "NFT"]),
  description: z.string().min(2).max(100).optional(),
});

type Props = {
  onSave: (
    data: Database["public"]["Tables"]["assets"]["Row"] | null,
    error: PostgrestError | null
  ) => void;
  onCancel: () => void;
  asset?: Database["public"]["Tables"]["assets"]["Row"];
};

export default function AssetForm({ onSave, onCancel, asset }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: asset?.label || "",
      ticker: asset?.ticker || "",
      type: asset?.type || "CRYPTO",
      description: asset?.description || undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { data, error } = asset
      ? await updateAsset(asset.id, values)
      : await createAsset(values);
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
                <Input disabled={isLoading} placeholder="Bitcoin" {...field} />
              </FormControl>
              <FormDescription>This is the asset display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ticker"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticker</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="BTC" {...field} />
              </FormControl>
              <FormDescription>Short identifier.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {assetTypesList.map((assetType) => (
                    <SelectItem key={assetType.value} value={assetType.value}>
                      <div className="flex flex-row gap-2 items-center">
                        <assetType.icon className="h-4 w-4" />
                        {assetType.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Nature of the asset.</FormDescription>
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
                  placeholder="Blue chip crypto token..."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                What does the asset consists of.
              </FormDescription>
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
