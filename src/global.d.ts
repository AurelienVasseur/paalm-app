import { Database as DB } from "@/database.types";

declare global {
  // note: we cannot have the same name in right side and left side
  type Database = DB;
}
