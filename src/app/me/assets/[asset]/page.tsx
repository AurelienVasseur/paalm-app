import BreadcrumbNav from '@/components/BreadcrumbNav'
import Info from '@/components/me/assets/asset/Info'
import React from 'react'

export default function Asset({ params }: { params: { asset: string } }) {
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
