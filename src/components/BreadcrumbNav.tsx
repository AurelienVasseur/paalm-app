import React, { Fragment } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

type Props = {
  history?: {
    path: string;
    label: string;
  }[];
  current: string;
};

export default function BreadcrumbNav({ history, current }: Props) {
  return (
    <section className="max-container padding-container py-10">
      <Breadcrumb>
        <BreadcrumbList>
          {history?.map((h) => (
            <Fragment key={h.label}>
              <BreadcrumbItem key={h.label}>
                <BreadcrumbLink asChild>
                  <Link href={h.path}>{h.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage>{current}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  );
}
