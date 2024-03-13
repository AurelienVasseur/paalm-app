import BreadcrumbNav from '@/components/BreadcrumbNav'
import Info from '@/components/me/assets/asset/Info'
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Asset({ params }: { params: { asset: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect(`/auth?callback=/me/assets/${params.asset}`);
  }

  return (
    <>
      <BreadcrumbNav
        history={[{ path: "/me", label: "Home" }, {path: "/me/assets", label: "Assets"}]}
        current={params.asset}
      />
      <Info asset={params.asset} type='crypto' />
    </>
  )
}
