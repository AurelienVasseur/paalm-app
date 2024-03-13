import SignInCard from "@/components/auth/SignInCard";
import * as React from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function LoginPage({ searchParams }: Props) {
  const callback = searchParams.callback
    ? String(searchParams.callback)
    : "/me";

  return (
    <>
      <SignInCard callback={callback} />
    </>
  );
}
