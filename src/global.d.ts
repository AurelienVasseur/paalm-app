import { Database as DB, Enums, Tables, TablesInsert } from "@/database.types";

type TransactionAsset = Tables<"transaction_asset_metadata"> & {
  asset: Tables<"assets">;
};

type TransactionAssetLight = {
  quantity: number;
  asset: {
    type: Enums<"asset_type">;
    label: string;
    ticker: string;
  };
};

type TransactionProvider = Tables<"transaction_provider_metadata"> & {
  provider: Tables<"providers">;
};

type TransactionProviderLight = {
  provider: {
    label: string;
  };
};

declare global {
  // note: we cannot have the same name in right side and left side
  type Database = DB;
  type TransactionWithMetadata = Tables<"transactions"> & {
    from: TransactionAsset;
    to: TransactionAsset;
    provider: TransactionProvider;
  };
  type TransactionWithMetadataLight = {
    date: string;
    from: TransactionAssetLight;
    to: TransactionAssetLight;
    provider: TransactionProviderLight;
  };
}
