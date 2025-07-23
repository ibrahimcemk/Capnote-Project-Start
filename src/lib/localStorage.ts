// Local storage utilities for offline data management
export interface StorageData {
  notes: any[];
  payments: any[];
  tags: any[];
  user: any;
  settings: any;
}

class LocalStorageManager {
  private static instance: LocalStorageManager;
  private storageKey = 'capnote_data';

  private constructor() {}

  static getInstance(): LocalStorageManager {
    if (!LocalStorageManager.instance) {
      LocalStorageManager.instance = new LocalStorageManager();
    }
    return LocalStorageManager.instance;
  }

  private getStorageData(): StorageData {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : {
        notes: [],
        payments: [],
        tags: [],
        user: null,
        settings: { theme: 'light', notifications: true }
      };
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return {
        notes: [],
        payments: [],
        tags: [],
        user: null,
        settings: { theme: 'light', notifications: true }
      };
    }
  }

  private saveStorageData(data: StorageData): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  // User management
  getUser(): any {
    const data = this.getStorageData();
    console.log('getUser çağrıldı, mevcut user:', data.user);
    return data.user;
  }

  setUser(user: any): void {
    console.log('setUser çağrıldı:', user);
    const data = this.getStorageData();
    data.user = user;
    this.saveStorageData(data);
    console.log('User kaydedildi, yeni data:', data);
  }

  clearUser(): void {
    console.log('clearUser çağrıldı');
    const data = this.getStorageData();
    data.user = null;
    this.saveStorageData(data);
  }

  // Notes management
  getNotes(): any[] {
    return this.getStorageData().notes;
  }

  saveNote(note: any): void {
    const data = this.getStorageData();
    const existingIndex = data.notes.findIndex(n => n.id === note.id);
    
    if (existingIndex >= 0) {
      data.notes[existingIndex] = { ...note, updatedAt: new Date().toISOString() };
    } else {
      const newNote = {
        ...note,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      data.notes.push(newNote);
    }
    
    this.saveStorageData(data);
  }

  deleteNote(id: string): void {
    const data = this.getStorageData();
    data.notes = data.notes.filter(n => n.id !== id);
    this.saveStorageData(data);
  }

  // Payments management
  getPayments(): any[] {
    return this.getStorageData().payments;
  }

  savePayment(payment: any): void {
    const data = this.getStorageData();
    const existingIndex = data.payments.findIndex(p => p.id === payment.id);
    
    if (existingIndex >= 0) {
      data.payments[existingIndex] = payment;
    } else {
      const newPayment = {
        ...payment,
        id: Date.now().toString()
      };
      data.payments.push(newPayment);
    }
    
    this.saveStorageData(data);
  }

  deletePayment(id: string): void {
    const data = this.getStorageData();
    data.payments = data.payments.filter(p => p.id !== id);
    this.saveStorageData(data);
  }

  // Settings management
  getSettings(): any {
    return this.getStorageData().settings;
  }

  saveSettings(settings: any): void {
    const data = this.getStorageData();
    data.settings = { ...data.settings, ...settings };
    this.saveStorageData(data);
  }

  // Clear all data
  clearAll(): void {
    localStorage.removeItem(this.storageKey);
  }

  // Tags management
  getTags(userId: string): any[] {
    const data = this.getStorageData();
    return data.tags?.filter((tag: any) => tag.userId === userId) || [];
  }

  saveTag(userId: string, tag: any): void {
    const data = this.getStorageData();
    if (!data.tags) data.tags = [];
    
    const tagWithUser = { ...tag, userId };
    const existingIndex = data.tags.findIndex((t: any) => 
      t.name === tag.name && t.userId === userId
    );
    
    if (existingIndex >= 0) {
      data.tags[existingIndex] = tagWithUser;
    } else {
      data.tags.push(tagWithUser);
    }
    
    this.saveStorageData(data);
  }

  updateTag(userId: string, oldName: string, newTag: any): void {
    const data = this.getStorageData();
    if (!data.tags) data.tags = [];
    
    const tagIndex = data.tags.findIndex((t: any) => 
      t.name === oldName && t.userId === userId
    );
    
    if (tagIndex >= 0) {
      data.tags[tagIndex] = { ...newTag, userId };
      this.saveStorageData(data);
    }
  }

  deleteTag(userId: string, tagName: string): void {
    const data = this.getStorageData();
    if (!data.tags) return;
    
    data.tags = data.tags.filter((t: any) => 
      !(t.name === tagName && t.userId === userId)
    );
    this.saveStorageData(data);
  }
}

export const localStorageManager = LocalStorageManager.getInstance();