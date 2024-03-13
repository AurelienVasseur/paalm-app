"use client";

import { useRouter } from "next/navigation";

type BentoCardProps = {
  children: React.ReactNode;
  title: string;
  navigateTo?: string;
};

export default function BentoCard({
  children,
  title,
  navigateTo,
}: BentoCardProps) {
  const router = useRouter()
  
  const handleClick = () => {
    if (navigateTo) {
      router.push(navigateTo);
    }
  };

  return (
    <div
      className={`h-full p-10 rounded-xl bg-white border border-slate-200 shadow-md ${
        navigateTo ? "hover:shadow-lg cursor-pointer" : ""
      } transition ease-in-out`}
      onClick={handleClick}
    >
      <h3 className="text-xl font-light text-slate-700">{title}</h3>
      <div className="mt-7">{children}</div>
    </div>
  );
}
