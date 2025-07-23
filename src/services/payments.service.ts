import { supabase } from '../lib/supabase';
import type { Reminder } from '../lib/supabase';

export interface CreateReminderData {
  title: string;
  amount: number;
  due_date: string;
  frequency?: 'tek_sefer' | 'aylık' | 'haftalık' | 'yıllık';
  category?: string;
  notes?: string;
}

export interface UpdateReminderData {
  title?: string;
  amount?: number;
  due_date?: string;
  frequency?: 'tek_sefer' | 'aylık' | 'haftalık' | 'yıllık';
  is_paid?: boolean;
  notified?: boolean;
  category?: string;
  notes?: string;
}

export class PaymentsService {
  /**
   * Kullanıcının tüm hatırlatmalarını getir
   */
  static async getUserReminders(): Promise<{ data: Reminder[] | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.user.id)
        .order('due_date', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get Reminders Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Hatırlatmalar alınamadı' 
        } 
      };
    }
  }

  /**
   * Belirli bir hatırlatmayı getir
   */
  static async getReminder(reminderId: string): Promise<{ data: Reminder | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('id', reminderId)
        .eq('user_id', user.user.id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get Reminder Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Hatırlatma bulunamadı' 
        } 
      };
    }
  }

  /**
   * Yeni hatırlatma oluştur
   */
  static async createReminder(reminderData: CreateReminderData): Promise<{ data: Reminder | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { data, error } = await supabase
        .from('reminders')
        .insert([
          {
            user_id: user.user.id,
            ...reminderData,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Create Reminder Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Hatırlatma oluşturulamadı' 
        } 
      };
    }
  }

  /**
   * Hatırlatmayı güncelle
   */
  static async updateReminder(reminderId: string, updates: UpdateReminderData): Promise<{ data: Reminder | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { data, error } = await supabase
        .from('reminders')
        .update(updates)
        .eq('id', reminderId)
        .eq('user_id', user.user.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Update Reminder Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Hatırlatma güncellenemedi' 
        } 
      };
    }
  }

  /**
   * Hatırlatmayı sil
   */
  static async deleteReminder(reminderId: string): Promise<{ error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { error } = await supabase
        .from('reminders')
        .delete()
        .eq('id', reminderId)
        .eq('user_id', user.user.id);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Delete Reminder Error:', error);
      return { 
        error: { 
          message: error.message || 'Hatırlatma silinemedi' 
        } 
      };
    }
  }

  /**
   * Ödeme durumunu değiştir (ödendi/ödenmedi)
   */
  static async togglePaid(reminderId: string): Promise<{ data: Reminder | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      // Önce mevcut durumu al
      const { data: currentReminder, error: fetchError } = await supabase
        .from('reminders')
        .select('is_paid')
        .eq('id', reminderId)
        .eq('user_id', user.user.id)
        .single();

      if (fetchError) throw fetchError;

      // Ödeme durumunu tersine çevir
      const { data, error } = await supabase
        .from('reminders')
        .update({
          is_paid: !currentReminder.is_paid,
        })
        .eq('id', reminderId)
        .eq('user_id', user.user.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Toggle Paid Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Ödeme durumu değiştirilemedi' 
        } 
      };
    }
  }

  /**
   * Yaklaşan ödemeleri getir (önümüzdeki 7 gün)
   */
  static async getUpcomingReminders(): Promise<{ data: Reminder[] | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const today = new Date().toISOString().split('T')[0];
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      const nextWeekStr = nextWeek.toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('is_paid', false)
        .gte('due_date', today)
        .lte('due_date', nextWeekStr)
        .order('due_date', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get Upcoming Reminders Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Yaklaşan ödemeler alınamadı' 
        } 
      };
    }
  }

  /**
   * Geciken ödemeleri getir
   */
  static async getOverdueReminders(): Promise<{ data: Reminder[] | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const today = new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('is_paid', false)
        .lt('due_date', today)
        .order('due_date', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get Overdue Reminders Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Geciken ödemeler alınamadı' 
        } 
      };
    }
  }

  /**
   * Kategoriye göre hatırlatmaları getir
   */
  static async getRemindersByCategory(category: string): Promise<{ data: Reminder[] | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('category', category)
        .order('due_date', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get Reminders By Category Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Kategorili hatırlatmalar alınamadı' 
        } 
      };
    }
  }

  /**
   * Tüm kategorileri getir
   */
  static async getAllCategories(): Promise<{ data: string[] | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { data, error } = await supabase
        .from('reminders')
        .select('category')
        .eq('user_id', user.user.id);

      if (error) throw error;

      // Benzersiz kategorileri al
      const uniqueCategories = new Set<string>();
      data?.forEach((reminder) => {
        if (reminder.category && reminder.category.trim()) {
          uniqueCategories.add(reminder.category.trim());
        }
      });

      return { data: Array.from(uniqueCategories).sort(), error: null };
    } catch (error: any) {
      console.error('Get All Categories Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Kategoriler alınamadı' 
        } 
      };
    }
  }

  /**
   * Ödeme istatistikleri
   */
  static async getPaymentStats(): Promise<{ data: any; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { data, error } = await supabase
        .from('reminders')
        .select('id, amount, is_paid, due_date, frequency, category')
        .eq('user_id', user.user.id);

      if (error) throw error;

      const today = new Date().toISOString().split('T')[0];

      const stats = {
        total: data?.length || 0,
        paid: data?.filter(reminder => reminder.is_paid).length || 0,
        unpaid: data?.filter(reminder => !reminder.is_paid).length || 0,
        overdue: data?.filter(reminder => !reminder.is_paid && reminder.due_date < today).length || 0,
        upcoming: data?.filter(reminder => {
          const dueDate = new Date(reminder.due_date);
          const nextWeek = new Date();
          nextWeek.setDate(nextWeek.getDate() + 7);
          return !reminder.is_paid && dueDate >= new Date() && dueDate <= nextWeek;
        }).length || 0,
        totalAmount: data?.reduce((sum, reminder) => sum + parseFloat(reminder.amount.toString()), 0) || 0,
        paidAmount: data?.filter(reminder => reminder.is_paid)
          .reduce((sum, reminder) => sum + parseFloat(reminder.amount.toString()), 0) || 0,
        unpaidAmount: data?.filter(reminder => !reminder.is_paid)
          .reduce((sum, reminder) => sum + parseFloat(reminder.amount.toString()), 0) || 0,
        monthlyRecurring: data?.filter(reminder => reminder.frequency === 'aylık').length || 0,
        uniqueCategories: new Set(
          data?.map(reminder => reminder.category).filter(cat => cat && cat.trim())
        ).size || 0,
      };

      return { data: stats, error: null };
    } catch (error: any) {
      console.error('Get Payment Stats Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'İstatistikler alınamadı' 
        } 
      };
    }
  }

  /**
   * Aylık harcama analizi
   */
  static async getMonthlySpending(year: number = new Date().getFullYear()): Promise<{ data: any; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { data, error } = await supabase
        .from('reminders')
        .select('amount, due_date, is_paid, category')
        .eq('user_id', user.user.id)
        .eq('is_paid', true)
        .gte('due_date', `${year}-01-01`)
        .lte('due_date', `${year}-12-31`)
        .order('due_date');

      if (error) throw error;

      // Aylık harcamaları grupla
      const monthlyData = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        monthName: new Date(year, i).toLocaleDateString('tr-TR', { month: 'long' }),
        total: 0,
        count: 0,
        categories: {} as Record<string, number>,
      }));

      data?.forEach((payment) => {
        const month = new Date(payment.due_date).getMonth();
        const amount = parseFloat(payment.amount.toString());
        
        monthlyData[month].total += amount;
        monthlyData[month].count += 1;
        
        if (payment.category) {
          monthlyData[month].categories[payment.category] = 
            (monthlyData[month].categories[payment.category] || 0) + amount;
        }
      });

      return { data: monthlyData, error: null };
    } catch (error: any) {
      console.error('Get Monthly Spending Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Aylık harcama analizi alınamadı' 
        } 
      };
    }
  }

  /**
   * Gerçek zamanlı hatırlatma değişikliklerini dinle
   */
  static subscribeToReminders(callback: (payload: any) => void) {
    return supabase
      .channel('reminders-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reminders',
        },
        callback
      )
      .subscribe();
  }

  /**
   * Bildirim gönderildi olarak işaretle
   */
  static async markAsNotified(reminderId: string): Promise<{ error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { error } = await supabase
        .from('reminders')
        .update({ notified: true })
        .eq('id', reminderId)
        .eq('user_id', user.user.id);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Mark As Notified Error:', error);
      return { 
        error: { 
          message: error.message || 'Bildirim durumu güncellenemedi' 
        } 
      };
    }
  }
} 