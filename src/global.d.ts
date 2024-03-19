import { Database as DB, Enums, Tables } from "@/database.types";

type TransactionAsset = {
  id: string;
  quantity: number;
  price_unit: number;
  price_total: number;
  asset: {
    id: string;
    type: Enums<"asset_type">;
    label: string;
    ticker: string;
  };
};

type TransactionProvider = {
  id: string;
  fees: number;
  method: label;
  receipt_url: string | null;
  network_transaction_id: string | null;
  provider_transaction_id: string | null;
  provider: {
    id: string;
    label: string;
    description: string | null;
  };
};

declare global {
  // note: we cannot have the same name in right side and left side
  type Database = DB;
  type TransactionWithMetadata = {
    id: string;
    description: string;
    date: string;
    from: TransactionAsset;
    to: TransactionAsset;
    provider: TransactionProvider;
  };
}

// Example:
// type TweetWithAuthor = Tweet & {
//   author: Profile;
//   likes: number;
//   user_has_liked_tweet: boolean;
// };
