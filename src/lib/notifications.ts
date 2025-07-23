// Notification utility functions
export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  tag?: string;
  requireInteraction?: boolean;
}

export class NotificationManager {
  private static instance: NotificationManager;
  private permission: NotificationPermission = 'default';

  private constructor() {
    this.permission = Notification.permission;
  }

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  async requestPermission(): Promise<NotificationPermission> {
    if ('Notification' in window) {
      this.permission = await Notification.requestPermission();
      return this.permission;
    }
    return 'denied';
  }

  canSendNotifications(): boolean {
    return 'Notification' in window && this.permission === 'granted';
  }

  sendNotification(options: NotificationOptions): Notification | null {
    if (!this.canSendNotifications()) {
      console.warn('Notifications not supported or permission denied');
      return null;
    }

    const notification = new Notification(options.title, {
      body: options.body,
      icon: options.icon || '/favicon.ico',
      tag: options.tag,
      requireInteraction: options.requireInteraction || false,
    });

    return notification;
  }

  scheduleNotification(options: NotificationOptions, delay: number): number {
    return window.setTimeout(() => {
      this.sendNotification(options);
    }, delay);
  }

  sendReminderNotification(title: string, message: string): void {
    this.sendNotification({
      title: `📝 ${title}`,
      body: message,
      tag: 'reminder',
      requireInteraction: true,
    });
  }

  sendPaymentNotification(title: string, amount: string, dueDate: string): void {
    this.sendNotification({
      title: `💳 Ödeme Hatırlatması`,
      body: `${title} - ${amount} (Son tarih: ${dueDate})`,
      tag: 'payment',
      requireInteraction: true,
    });
  }
}

export const notificationManager = NotificationManager.getInstance();