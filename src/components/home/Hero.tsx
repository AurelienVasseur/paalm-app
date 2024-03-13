import React from "react";
import { Badge } from "../ui/badge";

export default function Hero() {
  return (
    <section className="max-container padding-container flex flex-col justify-center gap-7 py-10 pb-32 lg:py-20">
      <div className="flex justify-center">
        <Badge variant="outline">Paalm</Badge>
      </div>
      <div>
        <div className="flex justify-center">
          <h3 className="text-xl font-light text-slate-700">
            Unleash the power of your investments
          </h3>
        </div>
        <div className="flex justify-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Invest. Track. Manage.
          </h1>
        </div>
      </div>
    </section>
  );
}
