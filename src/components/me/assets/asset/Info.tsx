import { Badge } from "@/components/ui/badge";
import React from "react";

type Props = {
  asset: string;
  type: string;
};

export default function Info(props: Props) {
  return (
    <section className="max-container padding-container">
      <div className="flex flex-row items-center gap-4 ">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {props.asset}
        </h1>
        <Badge variant="outline">{props.type}</Badge>
      </div>
    </section>
  );
}
