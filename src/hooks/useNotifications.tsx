import { useState, useEffect } from 'react';
import { notificationManager } from '../lib/notifications';

export interface NotificationSettings {
  push: boolean;
  email: boolean;
  reminders: boolean;
}

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [settings, setSettings] = useState<NotificationSettings>({
    push: true,
    email: true,
    reminders: true
  });

  useEffect(() => {
    // Check current notification permission
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    try {
      const result = await notificationManager.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const scheduleNoteReminder = async (title: string, scheduledTime: Date, noteId: string) => {
    if (permission !== 'granted' || !settings.reminders) {
      return false;
    }

    try {
      const delay = scheduledTime.getTime() - Date.now();
      if (delay > 0) {
        await notificationManager.scheduleNotification(
          `📝 ${title}`,
          'Not hatırlatmanız var!',
          { delay, tag: `note-${noteId}` }
        );
      }
      return true;
    } catch (error) {
      console.error('Error scheduling note reminder:', error);
      return false;
    }
  };

  const schedulePaymentReminder = async (title: string, amount: number, dueDate: Date, paymentId: string) => {
    if (permission !== 'granted' || !settings.reminders) {
      return false;
    }

    try {
      const delay = dueDate.getTime() - Date.now();
      if (delay > 0) {
        await notificationManager.scheduleNotification(
          `💳 ${title}`,
          `${amount} TL ödeme tarihi yaklaşıyor!`,
          { delay, tag: `payment-${paymentId}` }
        );
      }
      return true;
    } catch (error) {
      console.error('Error scheduling payment reminder:', error);
      return false;
    }
  };

  const updateSettings = async (newSettings: Partial<NotificationSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);

    // Save to local storage
    try {
      localStorage.setItem('notification_settings', JSON.stringify(updatedSettings));
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  };

  const sendTestNotification = () => {
    if (permission === 'granted') {
      notificationManager.sendReminderNotification(
        'CapNote Test',
        'Bildirimler başarıyla çalışıyor! 🎉'
      );
    }
  };

  return {
    permission,
    settings,
    requestPermission,
    scheduleNoteReminder,
    schedulePaymentReminder,
    updateSettings,
    sendTestNotification
  };
}