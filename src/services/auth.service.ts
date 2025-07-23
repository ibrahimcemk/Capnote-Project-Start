import { supabase } from '../lib/supabase';
import type { Profile } from '../lib/supabase';

export interface SignUpData {
  email: string;
  password: string;
  fullName?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export class AuthService {
  /**
   * Kullanıcı kaydı
   */
  static async signUp({ email, password, fullName }: SignUpData) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || email.split('@')[0],
          },
        },
      });

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('SignUp Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Kayıt işlemi sırasında bir hata oluştu' 
        } 
      };
    }
  }

  /**
   * Kullanıcı girişi
   */
  static async signIn({ email, password }: SignInData) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('SignIn Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Giriş işlemi sırasında bir hata oluştu' 
        } 
      };
    }
  }

  /**
   * Demo hesap girişi
   */
  static async signInWithDemo() {
    try {
      // Demo hesap bilgileri
      const demoEmail = 'demo@capnote.com';
      const demoPassword = 'demo123456';

      // Demo hesap var mı kontrol et
      const { data: existingUser, error: checkError } = await supabase.auth.signInWithPassword({
        email: demoEmail,
        password: demoPassword,
      });

      if (!checkError && existingUser.user) {
        return { data: existingUser, error: null };
      }

      // Demo hesap yoksa oluştur
      const { data, error } = await supabase.auth.signUp({
        email: demoEmail,
        password: demoPassword,
        options: {
          data: {
            full_name: 'Demo Kullanıcı',
          },
        },
      });

      if (error) throw error;

      // Demo verilerini oluştur
      await this.createDemoData(data.user?.id);

      return { data, error: null };
    } catch (error: any) {
      console.error('Demo SignIn Error:', error);
      return { 
        data: null, 
        error: { 
          message: 'Demo hesabına giriş yapılamadı' 
        } 
      };
    }
  }

  /**
   * Kullanıcı çıkışı
   */
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('SignOut Error:', error);
      return { 
        error: { 
          message: error.message || 'Çıkış işlemi sırasında bir hata oluştu' 
        } 
      };
    }
  }

  /**
   * Şifre sıfırlama
   */
  static async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Reset Password Error:', error);
      return { 
        error: { 
          message: error.message || 'Şifre sıfırlama e-postası gönderilemedi' 
        } 
      };
    }
  }

  /**
   * Şifre güncelleme
   */
  static async updatePassword(newPassword: string) {
    try {
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Update Password Error:', error);
      return { 
        error: { 
          message: error.message || 'Şifre güncellenemedi' 
        } 
      };
    }
  }

  /**
   * Kullanıcı profili getir
   */
  static async getProfile(): Promise<{ data: Profile | null; error: any }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { data: null, error: { message: 'Kullanıcı bulunamadı' } };
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.user.id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get Profile Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Profil bilgileri alınamadı' 
        } 
      };
    }
  }

  /**
   * Kullanıcı profili güncelle
   */
  static async updateProfile(updates: Partial<Profile>) {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Kullanıcı bulunamadı');

      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.user.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Update Profile Error:', error);
      return { 
        data: null, 
        error: { 
          message: error.message || 'Profil güncellenemedi' 
        } 
      };
    }
  }

  /**
   * Auth durumunu izle
   */
  static onAuthStateChange(callback: (user: any) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user || null);
    });
  }

  /**
   * Demo verilerini oluştur
   */
  private static async createDemoData(userId?: string) {
    if (!userId) return;

    try {
      // Demo notları oluştur
      const demoNotes = [
        {
          user_id: userId,
          title: '🎯 CapNote\'a Hoş Geldiniz!',
          content: 'Bu demo hesabında CapNote\'un tüm özelliklerini keşfedebilirsiniz. Notlar oluşturun, düzenleyin ve organize edin.',
          tags: ['Önemli', 'Demo'],
          is_pinned: true,
        },
        {
          user_id: userId,
          title: '📝 Yapılacaklar Listesi',
          content: 'Bu not yapılacaklar listesi özelliğini gösteriyor. Maddeleri tamamlayabilir ve ilerlemenizi takip edebilirsiniz.',
          tags: ['İş', 'Görevler'],
          is_pinned: false,
        },
      ];

      await supabase.from('notes').insert(demoNotes);

      // Demo hatırlatmalar oluştur
      const demoReminders = [
        {
          user_id: userId,
          title: 'İnternet Faturası',
          amount: 89.90,
          due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          category: 'Faturalar',
          frequency: 'aylık',
        },
        {
          user_id: userId,
          title: 'Spotify Aboneliği',
          amount: 17.99,
          due_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          category: 'Eğlence',
          frequency: 'aylık',
        },
      ];

      await supabase.from('reminders').insert(demoReminders);

    } catch (error) {
      console.error('Demo data creation error:', error);
    }
  }
} 