export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assets: {
        Row: {
          created_at: string
          description: string | null
          id: string
          label: string
          ticker: string
          type: Database["public"]["Enums"]["asset_type"]
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          label: string
          ticker: string
          type: Database["public"]["Enums"]["asset_type"]
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          label?: string
          ticker?: string
          type?: Database["public"]["Enums"]["asset_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_assets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
        }
        Insert: {
          created_at?: string
          id?: string
        }
        Update: {
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      providers: {
        Row: {
          created_at: string
          description: string | null
          id: string
          label: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          label: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          label?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_providers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      transaction_asset_metadata: {
        Row: {
          asset_id: string
          created_at: string
          id: string
          price_total: number
          price_unit: number
          quantity: number
          user_id: string
        }
        Insert: {
          asset_id: string
          created_at?: string
          id?: string
          price_total: number
          price_unit: number
          quantity: number
          user_id: string
        }
        Update: {
          asset_id?: string
          created_at?: string
          id?: string
          price_total?: number
          price_unit?: number
          quantity?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_transaction_asset_metadata_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_transaction_asset_metadata_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      transaction_provider_metadata: {
        Row: {
          created_at: string
          fees: number
          id: string
          method: string
          network_transaction_id: string | null
          provider_id: string
          provider_transaction_id: string | null
          receipt_url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          fees: number
          id?: string
          method: string
          network_transaction_id?: string | null
          provider_id: string
          provider_transaction_id?: string | null
          receipt_url?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          fees?: number
          id?: string
          method?: string
          network_transaction_id?: string | null
          provider_id?: string
          provider_transaction_id?: string | null
          receipt_url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_transaction_provider_metadata_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_transaction_provider_metadata_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      transactions: {
        Row: {
          created_at: string
          date: string
          description: string | null
          from_asset_metadata: string
          id: string
          provider_metadata: string
          to_asset_metadata: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          description?: string | null
          from_asset_metadata: string
          id?: string
          provider_metadata: string
          to_asset_metadata: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string | null
          from_asset_metadata?: string
          id?: string
          provider_metadata?: string
          to_asset_metadata?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_transactions_from_asset_metadata_fkey"
            columns: ["from_asset_metadata"]
            isOneToOne: false
            referencedRelation: "transaction_asset_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_transactions_provider_metadata_fkey"
            columns: ["provider_metadata"]
            isOneToOne: false
            referencedRelation: "transaction_provider_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_transactions_to_asset_metadata_fkey"
            columns: ["to_asset_metadata"]
            isOneToOne: false
            referencedRelation: "transaction_asset_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      asset_type: "FIAT" | "STOCK" | "CRYPTO" | "NFT"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
