export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          acknowledged_at: string | null
          created_at: string | null
          id: string
          node_id: string | null
          resolved_at: string | null
          severity: string | null
          status: string | null
          trigger_reason: string | null
          zone_label: string | null
        }
        Insert: {
          acknowledged_at?: string | null
          created_at?: string | null
          id?: string
          node_id?: string | null
          resolved_at?: string | null
          severity?: string | null
          status?: string | null
          trigger_reason?: string | null
          zone_label?: string | null
        }
        Update: {
          acknowledged_at?: string | null
          created_at?: string | null
          id?: string
          node_id?: string | null
          resolved_at?: string | null
          severity?: string | null
          status?: string | null
          trigger_reason?: string | null
          zone_label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alerts_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "sensor_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      mesh_links: {
        Row: {
          id: string
          last_seen: string | null
          link_type: string | null
          node_a_id: string | null
          node_b_id: string | null
          rssi: number | null
        }
        Insert: {
          id?: string
          last_seen?: string | null
          link_type?: string | null
          node_a_id?: string | null
          node_b_id?: string | null
          rssi?: number | null
        }
        Update: {
          id?: string
          last_seen?: string | null
          link_type?: string | null
          node_a_id?: string | null
          node_b_id?: string | null
          rssi?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mesh_links_node_a_id_fkey"
            columns: ["node_a_id"]
            isOneToOne: false
            referencedRelation: "sensor_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mesh_links_node_b_id_fkey"
            columns: ["node_b_id"]
            isOneToOne: false
            referencedRelation: "sensor_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      mine_sites: {
        Row: {
          created_at: string | null
          id: string
          name: string
          panel_label: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          panel_label?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          panel_label?: string | null
        }
        Relationships: []
      }
      risk_assessments: {
        Row: {
          anomaly_score: number | null
          assessed_at: string | null
          contributing_factors: Json | null
          deformation_trend: string | null
          id: number
          node_id: string | null
          persistence_minutes: number | null
          risk_level: string | null
          sensor_agreement: string | null
          spatial_correlation: string | null
        }
        Insert: {
          anomaly_score?: number | null
          assessed_at?: string | null
          contributing_factors?: Json | null
          deformation_trend?: string | null
          id?: never
          node_id?: string | null
          persistence_minutes?: number | null
          risk_level?: string | null
          sensor_agreement?: string | null
          spatial_correlation?: string | null
        }
        Update: {
          anomaly_score?: number | null
          assessed_at?: string | null
          contributing_factors?: Json | null
          deformation_trend?: string | null
          id?: never
          node_id?: string | null
          persistence_minutes?: number | null
          risk_level?: string | null
          sensor_agreement?: string | null
          spatial_correlation?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "risk_assessments_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "sensor_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      sensor_nodes: {
        Row: {
          id: string
          installed_at: string | null
          latitude: number | null
          longitude: number | null
          mine_site_id: string | null
          node_code: string
          position_type: string | null
          status: string | null
          zone_label: string | null
        }
        Insert: {
          id?: string
          installed_at?: string | null
          latitude?: number | null
          longitude?: number | null
          mine_site_id?: string | null
          node_code: string
          position_type?: string | null
          status?: string | null
          zone_label?: string | null
        }
        Update: {
          id?: string
          installed_at?: string | null
          latitude?: number | null
          longitude?: number | null
          mine_site_id?: string | null
          node_code?: string
          position_type?: string | null
          status?: string | null
          zone_label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sensor_nodes_mine_site_id_fkey"
            columns: ["mine_site_id"]
            isOneToOne: false
            referencedRelation: "mine_sites"
            referencedColumns: ["id"]
          },
        ]
      }
      sensor_readings: {
        Row: {
          battery_pct: number | null
          crack_width: number | null
          displacement: number | null
          id: number
          inter_node_distance: number | null
          is_simulated: boolean | null
          node_id: string | null
          recorded_at: string | null
          signal_strength: number | null
          temperature: number | null
          tilt_x: number | null
          tilt_y: number | null
          vibration: number | null
        }
        Insert: {
          battery_pct?: number | null
          crack_width?: number | null
          displacement?: number | null
          id?: never
          inter_node_distance?: number | null
          is_simulated?: boolean | null
          node_id?: string | null
          recorded_at?: string | null
          signal_strength?: number | null
          temperature?: number | null
          tilt_x?: number | null
          tilt_y?: number | null
          vibration?: number | null
        }
        Update: {
          battery_pct?: number | null
          crack_width?: number | null
          displacement?: number | null
          id?: never
          inter_node_distance?: number | null
          is_simulated?: boolean | null
          node_id?: string | null
          recorded_at?: string | null
          signal_strength?: number | null
          temperature?: number | null
          tilt_x?: number | null
          tilt_y?: number | null
          vibration?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sensor_readings_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "sensor_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      validation_tests: {
        Row: {
          detected_result: string | null
          detection_time_seconds: number | null
          expected_result: string | null
          false_alarm: boolean | null
          id: string
          passed: boolean | null
          run_at: string | null
          test_name: string | null
        }
        Insert: {
          detected_result?: string | null
          detection_time_seconds?: number | null
          expected_result?: string | null
          false_alarm?: boolean | null
          id?: string
          passed?: boolean | null
          run_at?: string | null
          test_name?: string | null
        }
        Update: {
          detected_result?: string | null
          detection_time_seconds?: number | null
          expected_result?: string | null
          false_alarm?: boolean | null
          id?: string
          passed?: boolean | null
          run_at?: string | null
          test_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
