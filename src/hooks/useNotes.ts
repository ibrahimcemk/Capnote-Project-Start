import { useState, useEffect } from 'react';
import { NotesService } from '../services/notes.service';
import { Note, ChecklistItem } from '../types';
import { useAuth } from './useAuth';
import { useNotifications } from './useNotifications';
import type { Note as SupabaseNote } from '../lib/supabase';

// Supabase Note'u frontend Note'a çevir (backward compatibility)
const mapSupabaseToFrontend = (supabaseNote: SupabaseNote): Note => ({
  id: supabaseNote.id,
  title: supabaseNote.title,
  description: supabaseNote.content,
  tag: supabaseNote.tags?.[0] || 'Genel',
  tagColor: '#3B82F6', // Default blue color
  isPinned: supabaseNote.is_pinned,
  reminderTime: supabaseNote.reminder_time ? new Date(supabaseNote.reminder_time) : undefined,
  createdAt: new Date(supabaseNote.created_at),
  updatedAt: new Date(supabaseNote.updated_at),
  checklist: [], // Checklist'ler ayrı servisten gelecek
});

// Frontend Note'u Supabase formatına çevir
const mapFrontendToSupabase = (note: Partial<Note>) => ({
  title: note.title || '',
  content: note.description || '',
  tags: note.tag ? [note.tag] : [],
  is_pinned: note.isPinned || false,
  reminder_time: note.reminderTime?.toISOString(),
});

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { scheduleNoteReminder } = useNotifications();

  // Notları yükle
  const fetchNotes = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const { data, error: fetchError } = await NotesService.getUserNotes();
      if (fetchError) {
        setError(fetchError.message);
        return;
      }
      
      const formattedNotes: Note[] = (data || []).map(mapSupabaseToFrontend);
      setNotes(formattedNotes);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Notlar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Not kaydet
  const saveNote = async (noteData: Partial<Note>) => {
    if (!user) return;

    try {
      const supabaseData = mapFrontendToSupabase(noteData);
      
      if (noteData.id) {
        // Güncelleme
        const { error: updateError } = await NotesService.updateNote(noteData.id, supabaseData);
        if (updateError) {
          setError(updateError.message);
          return;
        }
      } else {
        // Yeni not
        const { error: createError } = await NotesService.createNote(supabaseData);
        if (createError) {
          setError(createError.message);
          return;
        }
      }

      await fetchNotes(); // Notları yeniden yükle
      
      // Hatırlatma varsa zamanla
      if (noteData.reminderTime && noteData.reminderTime > new Date()) {
        await scheduleNoteReminder(
          noteData.title!,
          noteData.reminderTime,
          noteData.id || 'new-note'
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Not kaydedilirken hata oluştu');
    }
  };

  // Not sil
  const deleteNote = async (id: string) => {
    try {
      const { error: deleteError } = await NotesService.deleteNote(id);
      if (deleteError) {
        setError(deleteError.message);
        return;
      }

      await fetchNotes(); // Notları yeniden yükle
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Not silinirken hata oluştu');
    }
  };

  // Not sabitle/sabitleme kaldır
  const togglePin = async (id: string) => {
    try {
      const { error: toggleError } = await NotesService.togglePin(id);
      if (toggleError) {
        setError(toggleError.message);
        return;
      }

      await fetchNotes(); // Notları yeniden yükle
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Not güncellenirken hata oluştu');
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotes();
    } else {
      setNotes([]);
      setLoading(false);
    }
  }, [user]);

  return {
    notes,
    loading,
    error,
    saveNote,
    deleteNote,
    togglePin,
    refetch: fetchNotes,
  };
}