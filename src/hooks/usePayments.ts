import { useState, useEffect } from 'react';
import { PaymentsService } from '../services/payments.service';
import { Payment } from '../types';
import { useAuth } from './useAuth';
import { useNotifications } from './useNotifications';
import type { Reminder } from '../lib/supabase';

// Supabase Reminder'ı frontend Payment'a çevir (backward compatibility)
const mapSupabaseToFrontend = (reminder: Reminder): Payment => ({
  id: reminder.id,
  title: reminder.title,
  amount: reminder.amount,
  dueDate: new Date(reminder.due_date),
  isPaid: reminder.is_paid,
  recurrence: reminder.frequency as Payment['recurrence'],
  reminderTime: reminder.reminder_time ? new Date(reminder.reminder_time) : undefined,
  notes: reminder.notes || '',
  receiptUrl: undefined, // receiptUrl şu an desteklenmiyor
});

// Frontend Payment'ı Supabase formatına çevir
const mapFrontendToSupabase = (payment: Partial<Payment>) => ({
  title: payment.title || '',
  amount: payment.amount || 0,
  due_date: payment.dueDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
  is_paid: payment.isPaid || false,
  frequency: (payment.recurrence || 'tek_sefer') as 'tek_sefer' | 'aylık' | 'haftalık' | 'yıllık',
  reminder_time: payment.reminderTime?.toISOString(),
  notes: payment.notes || '',
  category: 'Genel', // Varsayılan kategori
});

export function usePayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { schedulePaymentReminder } = useNotifications();

  // Ödemeleri yükle
  const fetchPayments = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const { data, error: fetchError } = await PaymentsService.getUserReminders();
      if (fetchError) {
        setError(fetchError.message);
        return;
      }
      
      const formattedPayments: Payment[] = (data || []).map(mapSupabaseToFrontend);
      setPayments(formattedPayments);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ödemeler yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Ödeme kaydet
  const savePayment = async (paymentData: Partial<Payment>) => {
    if (!user) return;

    try {
      const supabaseData = mapFrontendToSupabase(paymentData);
      
      if (paymentData.id) {
        // Güncelleme
        const { error: updateError } = await PaymentsService.updateReminder(paymentData.id, supabaseData);
        if (updateError) {
          setError(updateError.message);
          return;
        }
      } else {
        // Yeni ödeme
        const { error: createError } = await PaymentsService.createReminder(supabaseData);
        if (createError) {
          setError(createError.message);
          return;
        }
      }

      await fetchPayments(); // Ödemeleri yeniden yükle
      
      // Ödeme hatırlatması zamanla
      if (paymentData.dueDate && !paymentData.isPaid) {
        await schedulePaymentReminder(
          paymentData.title!,
          paymentData.amount!,
          paymentData.dueDate,
          paymentData.id || 'new-payment'
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ödeme kaydedilirken hata oluştu');
    }
  };

  // Ödeme sil
  const deletePayment = async (id: string) => {
    try {
      const { error: deleteError } = await PaymentsService.deleteReminder(id);
      if (deleteError) {
        setError(deleteError.message);
        return;
      }

      await fetchPayments(); // Ödemeleri yeniden yükle
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ödeme silinirken hata oluştu');
    }
  };

  // Ödeme durumunu değiştir
  const togglePaid = async (id: string) => {
    try {
      const { error: toggleError } = await PaymentsService.togglePaid(id);
      if (toggleError) {
        setError(toggleError.message);
        return;
      }

      await fetchPayments(); // Ödemeleri yeniden yükle
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ödeme güncellenirken hata oluştu');
    }
  };

  useEffect(() => {
    if (user) {
      fetchPayments();
    } else {
      setPayments([]);
      setLoading(false);
    }
  }, [user]);

  return {
    payments,
    loading,
    error,
    savePayment,
    deletePayment,
    togglePaid,
    refetch: fetchPayments,
  };
}