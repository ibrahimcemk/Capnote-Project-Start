import { supabase } from '../lib/supabase';
import type { Profile, Note, Reminder, AILog, AdminLog } from '../lib/supabase';

export interface AdminStats {
  totalUsers: number;
  totalNotes: number;
  totalReminders: number;
  totalAIRequests: number;
  activeUsers: number;
  newUsersThisWeek: number;
  averageNotesPerUser: number;
  averageAIRequestsPerUser: number;
}

export interface UserWithStats extends Profile {
  notesCount: number;
  remindersCount: number;
  aiRequestsCount: number;
  lastActive: string;
}

export class AdminService {
  /**
   * Admin yetkisini kontrol et
   */
  static async checkAdminRole(): Promise<{ isAdmin: boolean; role?: string }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { isAdmin: false };
      }

      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.user.id)
        .single();

      if (error) throw error;

      const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin';
      return { isAdmin, role: profile?.role };
    } catch (error) {
      console.error('Admin role check error:', error);
      return { isAdmin: false };
    }
  }

  /**
   * Admin dashboard istatistikleri
   */
  static async getDashboardStats(): Promise<{ data: AdminStats | null; error: any }> {
    try {
      const { isAdmin } = await this.checkAdminRole();
      if (!isAdmin) {
        return { data: null, error: { message: 'Yetkisiz işlem' } };
      }

      // Paralel olarak tüm istatistikleri al
      const [usersResult, notesResult, remindersResult, aiLogsResult] = await Promise.all([
        supabase.from('user_profiles').select('id, created_at'),
        supabase.from('notes').select('id, user_id'),
        supabase.from('reminders').select('id'),
        supabase.from('ai_logs').select('id, user_id'),
      ]);

      if (usersResult.error) throw usersResult.error;
      if (notesResult.error) throw notesResult.error;
      if (remindersResult.error) throw remindersResult.error;
      if (aiLogsResult.error) throw aiLogsResult.error;

      const users = usersResult.data || [];
      const notes = notesResult.data || [];
      const reminders = remindersResult.data || [];
      const aiLogs = aiLogsResult.data || [];

      // Bu haftaki yeni kullanıcılar
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const newUsersThisWeek = users.filter(user => 
        new Date(user.created_at) >= weekAgo
      ).length;

      // Aktif kullanıcılar (son 30 gün içinde not veya AI isteği olanlar)
      const monthAgo = new Date();
      monthAgo.setDate(monthAgo.getDate() - 30);
      
      const activeUserIds = new Set([
        ...notes.map(note => note.user_id),
        ...aiLogs.map(log => log.user_id),
      ]);

      const stats: AdminStats = {
        totalUsers: users.length,
        totalNotes: notes.length,
        totalReminders: reminders.length,
        totalAIRequests: aiLogs.length,
        activeUsers: activeUserIds.size,
        newUsersThisWeek,
        averageNotesPerUser: users.length > 0 ? Math.round(notes.length / users.length * 100) / 100 : 0,
        averageAIRequestsPerUser: users.length > 0 ? Math.round(aiLogs.length / users.length * 100) / 100 : 0,
      };

      return { data: stats, error: null };
    } catch (error: any) {
      console.error('Get dashboard stats error:', error);
      return { 
        data: null, 
        error: { message: error.message || 'İstatistikler alınamadı' } 
      };
    }
  }

  /**
   * Tüm kullanıcıları istatistiklerle birlikte getir
   */
  static async getAllUsersWithStats(): Promise<{ data: UserWithStats[] | null; error: any }> {
    try {
      const { isAdmin } = await this.checkAdminRole();
      if (!isAdmin) {
        return { data: null, error: { message: 'Yetkisiz işlem' } };
      }

      // Kullanıcı profilleri
      const { data: profiles, error: profilesError } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Her kullanıcı için istatistikleri hesapla
      const usersWithStats = await Promise.all(
        profiles.map(async (profile) => {
          const [notesResult, remindersResult, aiLogsResult] = await Promise.all([
            supabase.from('notes').select('id').eq('user_id', profile.id),
            supabase.from('reminders').select('id').eq('user_id', profile.id),
            supabase.from('ai_logs').select('id, created_at').eq('user_id', profile.id).order('created_at', { ascending: false }).limit(1),
          ]);

          const lastAILog = aiLogsResult.data?.[0];
          
          return {
            ...profile,
            notesCount: notesResult.data?.length || 0,
            remindersCount: remindersResult.data?.length || 0,
            aiRequestsCount: aiLogsResult.data?.length || 0,
            lastActive: lastAILog?.created_at || profile.created_at,
          } as UserWithStats;
        })
      );

      return { data: usersWithStats, error: null };
    } catch (error: any) {
      console.error('Get users with stats error:', error);
      return { 
        data: null, 
        error: { message: error.message || 'Kullanıcı verileri alınamadı' } 
      };
    }
  }

  /**
   * Kullanıcı rolünü güncelle
   */
  static async updateUserRole(userId: string, newRole: 'user' | 'admin' | 'super_admin'): Promise<{ error: any }> {
    try {
      const { isAdmin, role } = await this.checkAdminRole();
      if (!isAdmin) {
        return { error: { message: 'Yetkisiz işlem' } };
      }

      // Super admin olmayan adminler başka adminlerin rolünü değiştiremez
      if (role !== 'super_admin' && newRole === 'super_admin') {
        return { error: { message: 'Sadece süper adminler bu işlemi yapabilir' } };
      }

      const { error } = await supabase
        .from('user_profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      // Admin log kaydı
      await this.logAdminAction('update_user_role', userId, { 
        newRole, 
        timestamp: new Date().toISOString() 
      });

      return { error: null };
    } catch (error: any) {
      console.error('Update user role error:', error);
      return { 
        error: { message: error.message || 'Kullanıcı rolü güncellenemedi' } 
      };
    }
  }

  /**
   * AI kullanım loglarını getir
   */
  static async getAILogs(limit: number = 100, offset: number = 0): Promise<{ data: AILog[] | null; error: any }> {
    try {
      const { isAdmin } = await this.checkAdminRole();
      if (!isAdmin) {
        return { data: null, error: { message: 'Yetkisiz işlem' } };
      }

      const { data, error } = await supabase
        .from('ai_logs')
        .select(`
          *,
          user_profiles(email, full_name)
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get AI logs error:', error);
      return { 
        data: null, 
        error: { message: error.message || 'AI logları alınamadı' } 
      };
    }
  }

  /**
   * AI kullanım istatistikleri
   */
  static async getAIStats(): Promise<{ data: any; error: any }> {
    try {
      const { isAdmin } = await this.checkAdminRole();
      if (!isAdmin) {
        return { data: null, error: { message: 'Yetkisiz işlem' } };
      }

      const { data: logs, error } = await supabase
        .from('ai_logs')
        .select('type, success, created_at, model_version');

      if (error) throw error;

      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const stats = {
        totalRequests: logs?.length || 0,
        successfulRequests: logs?.filter(log => log.success).length || 0,
        failedRequests: logs?.filter(log => !log.success).length || 0,
        todayRequests: logs?.filter(log => log.created_at.startsWith(today)).length || 0,
        weekRequests: logs?.filter(log => new Date(log.created_at) >= weekAgo).length || 0,
        typeBreakdown: {
          summary: logs?.filter(log => log.type === 'summary').length || 0,
          insight: logs?.filter(log => log.type === 'insight').length || 0,
          tagging: logs?.filter(log => log.type === 'tagging').length || 0,
          suggestion: logs?.filter(log => log.type === 'suggestion').length || 0,
        },
        modelVersions: logs?.reduce((acc, log) => {
          acc[log.model_version] = (acc[log.model_version] || 0) + 1;
          return acc;
        }, {} as Record<string, number>) || {},
        successRate: logs?.length ? 
          Math.round((logs.filter(log => log.success).length / logs.length) * 100) : 0,
      };

      return { data: stats, error: null };
    } catch (error: any) {
      console.error('Get AI stats error:', error);
      return { 
        data: null, 
        error: { message: error.message || 'AI istatistikleri alınamadı' } 
      };
    }
  }

  /**
   * Sistem ayarlarını getir
   */
  static async getSystemSettings(): Promise<{ data: Record<string, any> | null; error: any }> {
    try {
      const { isAdmin } = await this.checkAdminRole();
      if (!isAdmin) {
        return { data: null, error: { message: 'Yetkisiz işlem' } };
      }

      const { data, error } = await supabase
        .from('system_settings')
        .select('*');

      if (error) throw error;

      const settings = data?.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, any>) || {};

      return { data: settings, error: null };
    } catch (error: any) {
      console.error('Get system settings error:', error);
      return { 
        data: null, 
        error: { message: error.message || 'Sistem ayarları alınamadı' } 
      };
    }
  }

  /**
   * Sistem ayarını güncelle
   */
  static async updateSystemSetting(key: string, value: any): Promise<{ error: any }> {
    try {
      const { isAdmin, role } = await this.checkAdminRole();
      if (!isAdmin || role !== 'super_admin') {
        return { error: { message: 'Sadece süper adminler sistem ayarlarını değiştirebilir' } };
      }

      const { error } = await supabase
        .from('system_settings')
        .upsert({
          key,
          value,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      // Admin log kaydı
      await this.logAdminAction('update_system_setting', null, { 
        key, 
        value, 
        timestamp: new Date().toISOString() 
      });

      return { error: null };
    } catch (error: any) {
      console.error('Update system setting error:', error);
      return { 
        error: { message: error.message || 'Sistem ayarı güncellenemedi' } 
      };
    }
  }

  /**
   * Kullanıcı geri bildirimlerini getir
   */
  static async getFeedbacks(): Promise<{ data: any[] | null; error: any }> {
    try {
      const { isAdmin } = await this.checkAdminRole();
      if (!isAdmin) {
        return { data: null, error: { message: 'Yetkisiz işlem' } };
      }

      const { data, error } = await supabase
        .from('feedbacks')
        .select(`
          *,
          user_profiles(email, full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get feedbacks error:', error);
      return { 
        data: null, 
        error: { message: error.message || 'Geri bildirimler alınamadı' } 
      };
    }
  }

  /**
   * Admin işlem logu kaydet
   */
  static async logAdminAction(actionType: string, targetId: string | null = null, details: Record<string, any> = {}): Promise<void> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      await supabase
        .from('admin_logs')
        .insert([{
          admin_id: user.user.id,
          action_type: actionType,
          target_id: targetId,
          details,
        }]);
    } catch (error) {
      console.error('Log admin action error:', error);
    }
  }

  /**
   * Admin loglarını getir
   */
  static async getAdminLogs(limit: number = 100): Promise<{ data: AdminLog[] | null; error: any }> {
    try {
      const { isAdmin } = await this.checkAdminRole();
      if (!isAdmin) {
        return { data: null, error: { message: 'Yetkisiz işlem' } };
      }

      const { data, error } = await supabase
        .from('admin_logs')
        .select(`
          *,
          user_profiles(email, full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get admin logs error:', error);
      return { 
        data: null, 
        error: { message: error.message || 'Admin logları alınamadı' } 
      };
    }
  }

  /**
   * Kullanıcıyı askıya al/aktif et
   */
  static async toggleUserStatus(userId: string, suspend: boolean): Promise<{ error: any }> {
    try {
      const { isAdmin } = await this.checkAdminRole();
      if (!isAdmin) {
        return { error: { message: 'Yetkisiz işlem' } };
      }

      // Bu özellik için user_profiles tablosuna status kolonu eklenebilir
      // Şimdilik sadece log kaydı tutalım
      await this.logAdminAction(
        suspend ? 'suspend_user' : 'activate_user', 
        userId, 
        { 
          action: suspend ? 'suspended' : 'activated',
          timestamp: new Date().toISOString() 
        }
      );

      return { error: null };
    } catch (error: any) {
      console.error('Toggle user status error:', error);
      return { 
        error: { message: error.message || 'Kullanıcı durumu değiştirilemedi' } 
      };
    }
  }

  /**
   * Bulk işlemler için kullanıcı verilerini export et
   */
  static async exportUserData(format: 'json' | 'csv' = 'json'): Promise<{ data: any; error: any }> {
    try {
      const { isAdmin, role } = await this.checkAdminRole();
      if (!isAdmin || role !== 'super_admin') {
        return { data: null, error: { message: 'Sadece süper adminler bu işlemi yapabilir' } };
      }

      const { data: users } = await this.getAllUsersWithStats();
      if (!users) {
        return { data: null, error: { message: 'Veri alınamadı' } };
      }

      // Log kaydı
      await this.logAdminAction('export_user_data', null, { 
        format, 
        userCount: users.length,
        timestamp: new Date().toISOString() 
      });

      return { data: users, error: null };
    } catch (error: any) {
      console.error('Export user data error:', error);
      return { 
        data: null, 
        error: { message: error.message || 'Veri export edilemedi' } 
      };
    }
  }
} 