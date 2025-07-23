import { useEffect } from 'react';
import { localStorageManager } from '../lib/localStorage';
import { useAuth } from './useAuth';

export function useDemoData() {
  const { user } = useAuth();

  const createDemoData = async () => {
    if (!user) return;
    
    // Demo hesap kontrolü - email'e bakarak
    const isDemoAccount = user.email === 'demo@capnote.com' || user.id === 'demo-user';
    if (!isDemoAccount) return;

    try {
      // Demo verilerini kontrol et
      const existingNotes = localStorageManager.getNotes().filter(n => n.userId === user.id);
      if (existingNotes.length > 0) return;

      // Demo notları oluştur
      const demoNotes = [
        {
          id: 'demo-note-1',
          title: '🎯 CapNote\'a Hoş Geldiniz!',
          description: 'Bu demo hesabında CapNote\'un tüm özelliklerini keşfedebilirsiniz. Notlar oluşturun, düzenleyin ve organize edin.',
          tag: 'Önemli',
          tagColor: '#F59E0B',
          isPinned: true,
          userId: user.id,
          checklist: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'demo-note-2',
          title: '📝 Yapılacaklar Listesi',
          description: 'Bu not yapılacaklar listesi özelliğini gösteriyor. Maddeleri tamamlayabilir ve ilerlemenizi takip edebilirsiniz.',
          tag: 'İş',
          tagColor: '#3B82F6',
          isPinned: false,
          userId: user.id,
          checklist: [
            { id: 'check-1', title: 'E-postaları kontrol et', isDone: true },
            { id: 'check-2', title: 'Proje sunumunu hazırla', isDone: false },
            { id: 'check-3', title: 'Toplantı notlarını düzenle', isDone: false },
            { id: 'check-4', title: 'Haftalık raporu tamamla', isDone: true },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'demo-note-3',
          title: '🛒 Alışveriş Listesi',
          description: 'Market alışverişi için hatırlatma notu. Etiketler ile notlarınızı kategorize edebilirsiniz.',
          tag: 'Alışveriş',
          tagColor: '#EF4444',
          isPinned: false,
          userId: user.id,
          checklist: [
            { id: 'shop-1', title: 'Süt', isDone: false },
            { id: 'shop-2', title: 'Ekmek', isDone: true },
            { id: 'shop-3', title: 'Meyve', isDone: false },
            { id: 'shop-4', title: 'Deterjan', isDone: false },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'demo-note-4',
          title: '💡 Proje Fikirleri',
          description: 'Yeni proje fikirleri ve yaratıcı düşünceler için not alanı. Fikirlerinizi kaybolmasın!',
          tag: 'İdea',
          tagColor: '#8B5CF6',
          isPinned: false,
          userId: user.id,
          checklist: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'demo-note-5',
          title: '🏠 Ev İşleri',
          description: 'Haftalık ev işleri planı ve temizlik programı.',
          tag: 'Kişisel',
          tagColor: '#10B981',
          isPinned: false,
          userId: user.id,
          checklist: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];

      // Demo notları kaydet
      demoNotes.forEach(note => {
        localStorageManager.saveNote(note);
      });

      // Demo ödemeleri oluştur
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);

      const demoPayments = [
        {
          id: 'demo-payment-1',
          title: '💡 Elektrik Faturası',
          amount: 245.50,
          dueDate: nextWeek.toISOString(),
          isPaid: false,
          recurrence: 'monthly',
          notes: 'TEDAŞ elektrik faturası - otomatik ödeme',
          userId: user.id,
        },
        {
          id: 'demo-payment-2',
          title: '🏠 Kira Ödemesi',
          amount: 3500.00,
          dueDate: nextMonth.toISOString(),
          isPaid: false,
          recurrence: 'monthly',
          notes: 'Aylık kira ödemesi',
          userId: user.id,
        },
        {
          id: 'demo-payment-3',
          title: '📱 Telefon Faturası',
          amount: 89.90,
          dueDate: today.toISOString(),
          isPaid: true,
          recurrence: 'monthly',
          notes: 'Turkcell faturası - ödendi',
          userId: user.id,
        },
        {
          id: 'demo-payment-4',
          title: '🚗 Araç Sigortası',
          amount: 1250.00,
          dueDate: new Date(today.getFullYear(), today.getMonth() + 2, 15).toISOString(),
          isPaid: false,
          recurrence: 'yearly',
          notes: 'Yıllık kasko sigortası',
          userId: user.id,
        },
        {
          id: 'demo-payment-5',
          title: '🎵 Spotify Premium',
          amount: 17.99,
          dueDate: new Date(today.getFullYear(), today.getMonth(), 25).toISOString(),
          isPaid: true,
          recurrence: 'monthly',
          notes: 'Müzik aboneliği',
          userId: user.id,
        }
      ];

      // Demo ödemeleri kaydet
      demoPayments.forEach(payment => {
        localStorageManager.savePayment(payment);
      });

      console.log('✅ Demo verileri başarıyla oluşturuldu!');
    } catch (error) {
      console.error('❌ Demo verileri oluşturulurken hata:', error);
    }
  };

  useEffect(() => {
    if (user) {
      const isDemoAccount = user.email === 'demo@capnote.com' || user.id === 'demo-user';
      if (isDemoAccount) {
      // Demo verileri oluşturmak için kısa bir gecikme
      setTimeout(createDemoData, 1000);
      }
    }
  }, [user]);

  return { createDemoData };
}