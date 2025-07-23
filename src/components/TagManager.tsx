import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Tag } from '../types';
import clsx from 'clsx';

interface TagManagerProps {
  tags: Tag[];
  onAddTag: (tag: Tag) => void;
  onUpdateTag: (oldName: string, newTag: Tag) => void;
  onDeleteTag: (tagName: string) => void;
  selectedTag?: string;
  onSelectTag?: (tagName: string) => void;
}

const defaultColors = [
  '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444',
  '#06B6D4', '#F97316', '#84CC16', '#EC4899', '#6B7280'
];

export function TagManager({ 
  tags, 
  onAddTag, 
  onUpdateTag, 
  onDeleteTag, 
  selectedTag, 
  onSelectTag 
}: TagManagerProps) {
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState(defaultColors[0]);

  const handleAddTag = () => {
    if (!newTagName.trim()) return;
    
    const tagExists = tags.some(tag => tag.name.toLowerCase() === newTagName.toLowerCase());
    if (tagExists) return;

    onAddTag({
      name: newTagName.trim(),
      color: newTagColor
    });

    setNewTagName('');
    setNewTagColor(defaultColors[0]);
    setIsAddingTag(false);
  };

  const handleUpdateTag = (oldName: string) => {
    if (!newTagName.trim()) return;
    
    const tagExists = tags.some(tag => 
      tag.name.toLowerCase() === newTagName.toLowerCase() && tag.name !== oldName
    );
    if (tagExists) return;

    onUpdateTag(oldName, {
      name: newTagName.trim(),
      color: newTagColor
    });

    setNewTagName('');
    setNewTagColor(defaultColors[0]);
    setEditingTag(null);
  };

  const startEditing = (tag: Tag) => {
    setEditingTag(tag.name);
    setNewTagName(tag.name);
    setNewTagColor(tag.color);
  };

  const cancelEditing = () => {
    setEditingTag(null);
    setIsAddingTag(false);
    setNewTagName('');
    setNewTagColor(defaultColors[0]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Etiketler
        </h4>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddingTag(true)}
          className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          title="Yeni etiket ekle"
        >
          <PlusIcon className="h-4 w-4" />
        </motion.button>
      </div>

      <div className="space-y-3">
        {/* Mevcut etiketler - Yatay düzen */}
        <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {/* Mevcut etiketler */}
          {tags.map((tag) => (
            <motion.div
              key={tag.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="group"
            >
              {editingTag === tag.name ? (
                <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <input
                    type="text"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Etiket adı"
                    autoFocus
                  />
                  <div className="flex space-x-1">
                    {defaultColors.slice(0, 5).map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setNewTagColor(color)}
                        className={clsx(
                          "w-6 h-6 rounded-full border-2 transition-all",
                          newTagColor === color 
                            ? "border-gray-400 scale-110" 
                            : "border-gray-200 dark:border-gray-600"
                        )}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUpdateTag(tag.name)}
                    className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
                  >
                    <CheckIcon className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <motion.button
                    className="group relative"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectTag && onSelectTag(tag.name)}
                  >
                    <div className={clsx(
                      "flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all text-sm",
                      selectedTag === tag.name 
                        ? "border-gray-400 bg-gray-100 dark:bg-gray-700 font-medium" 
                        : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    )}>
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: tag.color }}
                      />
                      <span className="text-xs text-gray-700 dark:text-gray-300">
                        {tag.name}
                      </span>
                    </div>
                    <div className="absolute -top-1 -right-1 flex items-center space-x-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 rounded-full p-0.5 border border-gray-200 dark:border-gray-600">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(tag);
                        }}
                        className="p-0.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                      >
                        <PencilIcon className="h-2.5 w-2.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteTag(tag.name);
                        }}
                        className="p-0.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      >
                        <TrashIcon className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  </motion.button>
                </div>
              )}
            </motion.div>
          ))}
          </AnimatePresence>
        </div>

        {/* Yeni etiket ekleme */}
        <AnimatePresence>
          {isAddingTag && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Yeni etiket adı"
                autoFocus
              />
              <div className="flex space-x-1">
                {defaultColors.slice(0, 5).map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setNewTagColor(color)}
                    className={clsx(
                      "w-6 h-6 rounded-full border-2 transition-all",
                      newTagColor === color 
                        ? "border-gray-400 scale-110" 
                        : "border-gray-200 dark:border-gray-600"
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddTag}
                className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
              >
                <CheckIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={cancelEditing}
                className="p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {tags.length === 0 && !isAddingTag && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Henüz etiket yok
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddingTag(true)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            İlk etiketinizi ekleyin
          </motion.button>
        </div>
      )}
    </div>
  );
}