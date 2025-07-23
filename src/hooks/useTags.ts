import { useState, useEffect } from 'react';
import { localStorageManager } from '../lib/localStorage';
import { Tag } from '../types';
import { useAuth } from './useAuth';

const defaultTags: Tag[] = [
  { name: 'İş', color: '#3B82F6' },
  { name: 'Kişisel', color: '#10B981' },
  { name: 'Önemli', color: '#F59E0B' },
  { name: 'İdea', color: '#8B5CF6' },
  { name: 'Alışveriş', color: '#EF4444' },
];

export function useTags() {
  const [tags, setTags] = useState<Tag[]>(defaultTags);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Etiketleri yükle
  const fetchTags = () => {
    if (!user) {
      setTags(defaultTags);
      setLoading(false);
      return;
    }

    try {
      const savedTags = localStorageManager.getTags(user.id);
      if (savedTags.length > 0) {
        setTags(savedTags);
      } else {
        // İlk kez kullanıyorsa varsayılan etiketleri kaydet
        defaultTags.forEach(tag => {
          localStorageManager.saveTag(user.id, tag);
        });
        setTags(defaultTags);
      }
    } catch (error) {
      console.error('Error loading tags:', error);
      setTags(defaultTags);
    } finally {
      setLoading(false);
    }
  };

  // Etiket ekle
  const addTag = (tag: Tag) => {
    if (!user) return;

    try {
      localStorageManager.saveTag(user.id, tag);
      setTags(prev => [...prev, tag]);
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  // Etiket güncelle
  const updateTag = (oldName: string, newTag: Tag) => {
    if (!user) return;

    try {
      localStorageManager.updateTag(user.id, oldName, newTag);
      setTags(prev => prev.map(tag => 
        tag.name === oldName ? newTag : tag
      ));
    } catch (error) {
      console.error('Error updating tag:', error);
    }
  };

  // Etiket sil
  const deleteTag = (tagName: string) => {
    if (!user) return;

    try {
      localStorageManager.deleteTag(user.id, tagName);
      setTags(prev => prev.filter(tag => tag.name !== tagName));
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, [user]);

  return {
    tags,
    loading,
    addTag,
    updateTag,
    deleteTag,
    refetch: fetchTags,
  };
}