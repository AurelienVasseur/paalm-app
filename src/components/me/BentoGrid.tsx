import React from "react";
import { Badge } from "../ui/badge";
import BentoCard from "../BentoCard";
import { createClient } from "@/lib/supabase/server";
import AssetBadge from "../AssetBadge";

const transactions = [
  {
    id: 1,
    from: {
      label: "ETH Ethereum",
      amount: 104.78,
    },
    to: {
      label: "EUR Euro",
      amount: 500,
    },
  },
  {
    id: 2,
    from: {
      label: "ETH Ethereum",
      amount: 104.78,
    },
    to: {
      label: "EUR Euro",
      amount: 500,
    },
  },
  {
    id: 3,
    from: {
      label: "BTC Bitcoin",
      amount: 104.78,
    },
    to: {
      label: "EGLD MultiversX",
      amount: 500,
    },
  },
];

export default async function BentoGrid() {
  const supabase = createClient();
  // Assets
  const resCountAssets = await supabase
    .from("assets")
    .select("*", { count: "exact", head: true });
  const assetsCounter = resCountAssets.count || 0;
  const resAssets = await supabase
    .from("assets")
    .select("*")
    .order("ticker", { ascending: true })
    .limit(10);
  const assets = resAssets.data || [];
  // Providers
  const resCountProviders = await supabase
    .from("providers")
    .select("*", { count: "exact", head: true });
  const providersCounter = resCountProviders.count || 0;
  const resProviders = await supabase
    .from("providers")
    .select("*")
    .order("label", { ascending: true })
    .limit(10);
  const providers = resProviders.data || [];

  return (
    <section className="max-container padding-container flex flex-col justify-center gap-7">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <BentoCard title="Transactions" navigateTo="/me/transactions">
            <div className="flex flex-col gap-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex flex-row">
                  <div className="flex flex-col gap-2">
                    <div>
                      <Badge variant="outline">{transaction.from.label}</Badge>
                    </div>
                    <span className="text-sm font-light text-slate-700">
                      {transaction.from.amount}
                    </span>
                  </div>
                  <div className="items-center flex-1 px-5">
                    <div className="border w-full inline-block border-slate-600 border-dashed"></div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <div>
                      <Badge variant="outline">{transaction.to.label}</Badge>
                    </div>
                    <span className="text-sm font-light text-slate-700">
                      {transaction.to.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>
        <div className="flex gap-4 flex-col">
          <BentoCard title="Assets" navigateTo="/me/assets">
            <div className="flex gap-2 flex-wrap">
              {assets.map((asset) => (
                <AssetBadge key={asset.id} asset={asset} />
              ))}
              {assetsCounter > assets.length && (
                <Badge variant="outline">
                  +{assetsCounter - assets.length}
                </Badge>
              )}
            </div>
          </BentoCard>
          <BentoCard title="Providers" navigateTo="/me/providers">
            <div className="flex gap-2 flex-wrap">
              {providers.map((provider) => (
                <Badge key={provider.id} variant="outline">
                  {provider.label}
                </Badge>
              ))}
              {providersCounter > providers.length && (
                <Badge variant="outline">
                  +{providersCounter - providers.length}
                </Badge>
              )}
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
