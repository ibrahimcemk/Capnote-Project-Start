import { createClient } from '@supabase/supabase-js';

// Supabase konfigürasyonu
const supabaseUrl = 'https://yxfmmodhodogouqynqwc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4Zm1tb2Rob2RvZ291cXlucXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNjc4MzMsImV4cCI6MjA2ODc0MzgzM30.-ogfFpCEG0qisRtC2iUUrBTVt6Vvu14cR7w3KUSKHTM';

// Supabase client oluştur
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Veritabanı tablo tipleri
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: 'user' | 'admin' | 'super_admin';
          avatar_url: string | null;
          created_at: string;
          theme_preference: 'light' | 'dark' | 'system';
          notification_settings: {
            email: boolean;
            push: boolean;
            ai_tips_enabled: boolean;
          };
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: 'user' | 'admin' | 'super_admin';
          avatar_url?: string | null;
          theme_preference?: 'light' | 'dark' | 'system';
          notification_settings?: {
            email: boolean;
            push: boolean;
            ai_tips_enabled: boolean;
          };
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: 'user' | 'admin' | 'super_admin';
          avatar_url?: string | null;
          theme_preference?: 'light' | 'dark' | 'system';
          notification_settings?: {
            email: boolean;
            push: boolean;
            ai_tips_enabled: boolean;
          };
        };
      };
      notes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: string;
          tags: string[];
          ai_summary: string | null;
          version: number;
          created_at: string;
          updated_at: string;
          is_pinned: boolean;
          is_archived: boolean;
          reminder_time: string | null;
        };
        Insert: {
          user_id: string;
          title: string;
          content: string;
          tags?: string[];
          ai_summary?: string | null;
          version?: number;
          is_pinned?: boolean;
          is_archived?: boolean;
          reminder_time?: string | null;
        };
        Update: {
          title?: string;
          content?: string;
          tags?: string[];
          ai_summary?: string | null;
          version?: number;
          is_pinned?: boolean;
          is_archived?: boolean;
          reminder_time?: string | null;
          updated_at?: string;
        };
      };
              reminders: {
          Row: {
            id: string;
            user_id: string;
            title: string;
            amount: number;
            due_date: string;
            frequency: 'tek_sefer' | 'aylık' | 'haftalık' | 'yıllık';
            is_paid: boolean;
            notified: boolean;
            reminder_time: string | null;
            created_at: string;
            category: string;
            notes: string;
          };
        Insert: {
          user_id: string;
          title: string;
          amount: number;
          due_date: string;
          frequency?: 'tek_sefer' | 'aylık' | 'haftalık' | 'yıllık';
          is_paid?: boolean;
          reminder_time?: string | null;
          category?: string;
          notes?: string;
        };
        Update: {
          title?: string;
          amount?: number;
          due_date?: string;
          frequency?: 'tek_sefer' | 'aylık' | 'haftalık' | 'yıllık';
          is_paid?: boolean;
          notified?: boolean;
          reminder_time?: string | null;
          category?: string;
          notes?: string;
        };
      };
      ai_logs: {
        Row: {
          id: string;
          user_id: string;
          input_text: string;
          output_text: string;
          type: 'summary' | 'insight' | 'tagging' | 'suggestion';
          model_version: string;
          success: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          input_text: string;
          output_text: string;
          type: 'summary' | 'insight' | 'tagging' | 'suggestion';
          model_version?: string;
          success?: boolean;
        };
        Update: {
          success?: boolean;
        };
      };
      admin_logs: {
        Row: {
          id: string;
          admin_id: string;
          action_type: string;
          target_id: string | null;
          details: Record<string, any>;
          created_at: string;
        };
        Insert: {
          admin_id: string;
          action_type: string;
          target_id?: string | null;
          details?: Record<string, any>;
        };
        Update: never;
      };
    };
  };
}

// Type helpers
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Note = Database['public']['Tables']['notes']['Row'];
export type Reminder = Database['public']['Tables']['reminders']['Row'];
export type AILog = Database['public']['Tables']['ai_logs']['Row'];
export type AdminLog = Database['public']['Tables']['admin_logs']['Row']; 