import BreadcrumbNav from "@/components/BreadcrumbNav";
import AssetList from "@/components/me/assets/AssetList";

export default async function Assets() {
  return (
    <>
      <BreadcrumbNav
        history={[{ path: "/me", label: "Home" }]}
        current="Assets"
      />
      <AssetList />
    </>
  );
}
