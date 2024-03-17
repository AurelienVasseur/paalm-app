"use client";

import { useRouter } from "next/navigation";
import BentoCardTitle from "./BentoCardTitle";

type BentoCardProps = {
  children: React.ReactNode;
  title?: string;
  navigateTo?: string;
};

export default function BentoCard({
  children,
  title,
  navigateTo,
}: BentoCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (navigateTo) {
      router.push(navigateTo);
    }
  };

  return (
    <div
      className={`h-full flex flex-col gap-7 p-10 rounded-xl bg-white border border-slate-200 shadow-md ${
        navigateTo ? "hover:shadow-lg cursor-pointer" : ""
      } transition ease-in-out`}
      onClick={handleClick}
    >
      {title && <BentoCardTitle title={title} />}
      {children}
    </div>
  );
}
