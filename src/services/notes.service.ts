import { supabase } from '../lib/supabase';
import type { Note } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export interface CreateNoteData {
  title: string;
  content: string;
  tags?: string[];
  is_pinned?: boolean;
  ai_summary?: string;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  tags?: string[];
  is_pinned?: boolean;
  is_archived?: boolean;
  ai_summary?: string;
}

export class NotesService {
  /**
   * Kullanıcının tüm notlarını getir
   */
  static async getUserNotes(): Promise<{ data: Note[] | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('is_archived', false)
        .order('is_pinned', { ascending: false })
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get Notes Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Notlar alınamadı' 
        } 
      };
    }
  }

  /**
   * Belirli bir notu getir
   */
  static async getNote(noteId: string): Promise<{ data: Note | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', noteId)
        .eq('user_id', user.user.id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get Note Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Not bulunamadı' 
        } 
      };
    }
  }

  /**
   * Yeni not oluştur
   */
  static async createNote(noteData: CreateNoteData): Promise<{ data: Note | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { data, error } = await supabase
        .from('notes')
        .insert([
          {
            user_id: user.user.id,
            ...noteData,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Create Note Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Not oluşturulamadı' 
        } 
      };
    }
  }

  /**
   * Notu güncelle
   */
  static async updateNote(noteId: string, updates: UpdateNoteData): Promise<{ data: Note | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { data, error } = await supabase
        .from('notes')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', noteId)
        .eq('user_id', user.user.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Update Note Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Not güncellenemedi' 
        } 
      };
    }
  }

  /**
   * Notu sil
   */
  static async deleteNote(noteId: string): Promise<{ error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId)
        .eq('user_id', user.user.id);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Delete Note Error:', error);
      return { 
        error: { 
          message: error.message || 'Not silinemedi' 
        } 
      };
    }
  }

  /**
   * Notu sabitle/sabitlemeden çıkar
   */
  static async togglePin(noteId: string): Promise<{ data: Note | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      // Önce mevcut durumu al
      const { data: currentNote, error: fetchError } = await supabase
        .from('notes')
        .select('is_pinned')
        .eq('id', noteId)
        .eq('user_id', user.user.id)
        .single();

      if (fetchError) throw fetchError;

      // Pin durumunu tersine çevir
      const { data, error } = await supabase
        .from('notes')
        .update({
          is_pinned: !currentNote.is_pinned,
          updated_at: new Date().toISOString(),
        })
        .eq('id', noteId)
        .eq('user_id', user.user.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Toggle Pin Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Not sabitleme durumu değiştirilemedi' 
        } 
      };
    }
  }

  /**
   * Notu arşivle/arşivden çıkar
   */
  static async toggleArchive(noteId: string): Promise<{ data: Note | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      // Önce mevcut durumu al
      const { data: currentNote, error: fetchError } = await supabase
        .from('notes')
        .select('is_archived')
        .eq('id', noteId)
        .eq('user_id', user.user.id)
        .single();

      if (fetchError) throw fetchError;

      // Arşiv durumunu tersine çevir
      const { data, error } = await supabase
        .from('notes')
        .update({
          is_archived: !currentNote.is_archived,
          updated_at: new Date().toISOString(),
        })
        .eq('id', noteId)
        .eq('user_id', user.user.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Toggle Archive Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Not arşivleme durumu değiştirilemedi' 
        } 
      };
    }
  }

  /**
   * Arşivlenmiş notları getir
   */
  static async getArchivedNotes(): Promise<{ data: Note[] | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('is_archived', true)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get Archived Notes Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Arşivlenmiş notlar alınamadı' 
        } 
      };
    }
  }

  /**
   * Notlarda arama yap
   */
  static async searchNotes(query: string): Promise<{ data: Note[] | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('is_archived', false)
        .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
        .order('is_pinned', { ascending: false })
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Search Notes Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Arama yapılamadı' 
        } 
      };
    }
  }

  /**
   * Etiketlere göre notları getir
   */
  static async getNotesByTag(tag: string): Promise<{ data: Note[] | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('is_archived', false)
        .contains('tags', [tag])
        .order('is_pinned', { ascending: false })
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get Notes By Tag Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Etiketli notlar alınamadı' 
        } 
      };
    }
  }

  /**
   * Kullanıcının tüm etiketlerini getir
   */
  static async getAllTags(): Promise<{ data: string[] | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { data, error } = await supabase
        .from('notes')
        .select('tags')
        .eq('user_id', user.user.id)
        .eq('is_archived', false);

      if (error) throw error;

             // Tüm etiketleri birleştir ve benzersiz olanları al
       const allTags = new Set<string>();
       data?.forEach((note) => {
         note.tags?.forEach((tag: string) => {
           if (tag.trim()) allTags.add(tag.trim());
         });
       });

      return { data: Array.from(allTags).sort(), error: null };
    } catch (error: any) {
      console.error('Get All Tags Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Etiketler alınamadı' 
        } 
      };
    }
  }

  /**
   * Not istatistikleri
   */
  static async getNoteStats(): Promise<{ data: any; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { data, error } = await supabase
        .from('notes')
        .select('id, is_pinned, is_archived, created_at, tags')
        .eq('user_id', user.user.id);

      if (error) throw error;

      const stats = {
        total: data?.length || 0,
        pinned: data?.filter(note => note.is_pinned).length || 0,
        archived: data?.filter(note => note.is_archived).length || 0,
        active: data?.filter(note => !note.is_archived).length || 0,
        thisWeek: data?.filter(note => {
          const noteDate = new Date(note.created_at);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return noteDate >= weekAgo;
        }).length || 0,
        uniqueTags: new Set(
          data?.flatMap(note => note.tags || []).filter(tag => tag.trim())
        ).size || 0,
      };

      return { data: stats, error: null };
    } catch (error: any) {
      console.error('Get Note Stats Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'İstatistikler alınamadı' 
        } 
      };
    }
  }

  /**
   * Gerçek zamanlı not değişikliklerini dinle
   */
  static subscribeToNotes(callback: (payload: any) => void) {
    return supabase
      .channel('notes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notes',
        },
        callback
      )
      .subscribe();
  }
} 