import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  TagIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { Note, ChecklistItem, Tag } from '../types';
import { SmartSuggestions } from './SmartSuggestions';
import { TagManager } from './TagManager';
import { useTags } from '../hooks/useTags';
import clsx from 'clsx';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
  onSave: (note: Partial<Note>) => void;
  onDelete?: (id: string) => void;
}

export function NoteModal({ isOpen, onClose, note, onSave, onDelete }: NoteModalProps) {
  const { tags, addTag, updateTag, deleteTag } = useTags();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: 'İş',
    tagColor: '#3B82F6',
    isPinned: false,
    reminderTime: '',
    checklist: [] as ChecklistItem[],
  });

  const [newChecklistItem, setNewChecklistItem] = useState('');

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        description: note.description,
        tag: note.tag,
        tagColor: note.tagColor,
        isPinned: note.isPinned,
        reminderTime: note.reminderTime ? new Date(note.reminderTime).toISOString().slice(0, 16) : '',
        checklist: note.checklist || [],
      });
    } else {
      setFormData({
        title: '',
        description: '',
        tag: 'İş',
        tagColor: '#3B82F6',
        isPinned: false,
        reminderTime: '',
        checklist: [],
      });
    }
  }, [note, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const noteData = {
      ...formData,
      reminderTime: formData.reminderTime ? new Date(formData.reminderTime) : undefined,
    };

    onSave(noteData);
    onClose();
  };

  const addChecklistItem = () => {
    if (!newChecklistItem.trim()) return;

    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      title: newChecklistItem.trim(),
      isDone: false,
    };

    setFormData(prev => ({
      ...prev,
      checklist: [...prev.checklist, newItem],
    }));
    setNewChecklistItem('');
  };

  const toggleChecklistItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      checklist: prev.checklist.map(item =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      ),
    }));
  };

  const removeChecklistItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      checklist: prev.checklist.filter(item => item.id !== id),
    }));
  };

  const selectedTag = tags.find(tag => tag.name === formData.tag) || tags[0];

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    {note ? 'Not Düzenle' : 'Yeni Not'}
                  </Dialog.Title>
                  <div className="flex items-center space-x-2">
                    {note && onDelete && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          onDelete(note.id);
                          onClose();
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
              {/* AI Önerileri */}
              {(formData.title || formData.description) && (
                <SmartSuggestions
                  title={formData.title}
                  description={formData.description}
                  onCategorySelect={(category, color) => {
                    setFormData(prev => ({ ...prev, tag: category, tagColor: color }));
                  }}
                  onReminderSelect={(date) => {
                    setFormData(prev => ({ ...prev, reminderTime: date.toISOString().slice(0, 16) }));
                  }}
                  dueDate={formData.reminderTime ? new Date(formData.reminderTime) : undefined}
                />
              )}

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Başlık *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Not başlığı girin..."
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Açıklama
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Not açıklaması..."
                    />
                  </div>

                  {/* Tag Selection - Kompakt tasarım */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <TagManager
                      tags={tags}
                      selectedTag={formData.tag}
                      onSelectTag={(tagName) => {
                        const selectedTag = tags.find(t => t.name === tagName);
                        if (selectedTag) {
                          setFormData(prev => ({ 
                            ...prev, 
                            tag: selectedTag.name, 
                            tagColor: selectedTag.color 
                          }));
                        }
                      }}
                      onAddTag={addTag}
                      onUpdateTag={updateTag}
                      onDeleteTag={deleteTag}
                    />
                  </div>

                  {/* Reminder ve Pin - Yan yana */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Hatırlatma
                    </label>
                    <div className="relative">
                      <input
                        type="datetime-local"
                        value={formData.reminderTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, reminderTime: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <ClockIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                    </div>
                    
                    {/* Pin toggle */}
                    <div className="flex items-end">
                      <div className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
                        <input
                          type="checkbox"
                          id="isPinned"
                          checked={formData.isPinned}
                          onChange={(e) => setFormData(prev => ({ ...prev, isPinned: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isPinned" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Notu sabitle
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Yapılacaklar Listesi
                    </label>
                    <div className="space-y-2">
                      {formData.checklist.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <input
                            type="checkbox"
                            checked={item.isDone}
                            onChange={() => toggleChecklistItem(item.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className={clsx(
                            "flex-1 text-sm",
                            item.isDone ? "line-through text-gray-500" : "text-gray-900 dark:text-white"
                          )}>
                            {item.title}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeChecklistItem(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newChecklistItem}
                          onChange={(e) => setNewChecklistItem(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addChecklistItem())}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                          placeholder="Yeni madde ekle..."
                        />
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={addChecklistItem}
                          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-3 pt-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      İptal
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {note ? 'Güncelle' : 'Kaydet'}
                    </motion.button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}