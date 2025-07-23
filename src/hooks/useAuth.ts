import { useState, useEffect } from 'react';
import { AuthService } from '../services/auth.service';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mevcut oturumu kontrol et
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    getInitialSession();

    // Auth durumu değişikliklerini dinle
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        setUser(session?.user || null);
    setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    setLoading(true);
    try {
      const result = await AuthService.signUp({ email, password, fullName });
      return result;
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: null, error: { message: 'Kayıt işlemi başarısız' } };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log('SignIn çağrıldı:', email);
      const result = await AuthService.signIn({ email, password });
      console.log('SignIn result:', result);
      return result;
    } catch (error) {
      console.error('SignIn hatası:', error);
      return { data: null, error: { message: 'Giriş işlemi başarısız' } };
    } finally {
      setLoading(false);
    }
  };

  const signInWithDemo = async () => {
    setLoading(true);
    try {
      console.log('Demo SignIn çağrıldı');
      const result = await AuthService.signInWithDemo();
      console.log('Demo SignIn result:', result);
      return result;
    } catch (error) {
      console.error('Demo SignIn hatası:', error);
      return { data: null, error: { message: 'Demo hesabına giriş başarısız' } };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const result = await AuthService.signOut();
      console.log('SignOut completed');
      return result;
    } catch (error) {
      console.error('SignOut hatası:', error);
      return { error: { message: 'Çıkış işlemi başarısız' } };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    return await AuthService.resetPassword(email);
  };

  const updatePassword = async (newPassword: string) => {
    return await AuthService.updatePassword(newPassword);
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signInWithDemo,
    signOut,
    resetPassword,
    updatePassword,
  };
}