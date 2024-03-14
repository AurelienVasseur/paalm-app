import React from "react";

type Props = {
  title: string;
};

export default function BentoCardTitle({ title }: Props) {
  return <h3 className="text-xl font-light text-slate-700">{title}</h3>;
}
