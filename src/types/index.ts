export interface Note {
  id: string;
  title: string;
  description: string;
  tag: string;
  tagColor: string;
  isPinned: boolean;
  reminderTime?: Date;
  createdAt: Date;
  updatedAt: Date;
  checklist: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  isDone: boolean;
}

export interface Payment {
  id: string;
  title: string;
  amount: number;
  dueDate: Date;
  isPaid: boolean;
  recurrence: 'once' | 'monthly' | 'yearly';
  reminderTime?: Date;
  notes: string;
  receiptUrl?: string;
}

export interface Tag {
  name: string;
  color: string;
}

export type Theme = 'light' | 'dark';
export type FilterType = 'all' | 'today' | 'week' | 'notes' | 'payments';