import React from "react";
import { Badge } from "../ui/badge";
import BentoCard from "../BentoCard";

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
const assets = ["ETH Ethereum", "BTC Bitcoin", "EGLD MultiversX", "EUR Euro"];
const providers = ["Kraken", "Binance", "Boursorama", "Coinbase"];

export default function BentoGrid() {
  return (
    <section className="max-container padding-container flex flex-col justify-center gap-7">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <BentoCard title="Transactions" navigateTo="#">
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
            <div className="flex gap-2">
              {assets.map((asset) => (
                <Badge key={asset} variant="outline">
                  {asset}
                </Badge>
              ))}
            </div>
          </BentoCard>
          <BentoCard title="Providers" navigateTo="#">
            <div className="flex gap-2">
              {providers.map((provider) => (
                <Badge key={provider} variant="outline">
                  {provider}
                </Badge>
              ))}
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
