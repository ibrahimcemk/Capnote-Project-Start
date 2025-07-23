/**
 * ===============================================
 * 📱 CapNote v3.0 - DASHBOARD APP
 * ===============================================
 * 
 * Ana dashboard uygulama komponenti
 * Routing'den sonra gelen içerik
 * 
 * 📋 FEATURES:
 * - Complete dashboard functionality
 * - Notes & payments management
 * - Admin panel integration
 * - AI insights & analytics
 * - Notification management
 * ===============================================
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useNotes } from '../hooks/useNotes';
import { usePayments } from '../hooks/usePayments';
import { useTags } from '../hooks/useTags';
import { useTranslation } from '../hooks/useTranslation';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Dashboard } from './Dashboard';
import { NoteModal } from './NoteModal';
import { PaymentModal } from './PaymentModal';
import { FloatingActionButton } from './FloatingActionButton';
import { AuthModal } from './AuthModal';
import { LoadingSpinner } from './LoadingSpinner';
import { NotificationPermissionModal } from './NotificationPermissionModal';
import { AIInsightsPanel } from './AIInsightsPanel';
import { AnalyticsPanel } from './AnalyticsPanel';
import { AdminPanel } from './AdminPanel';
import { useNotifications } from '../hooks/useNotifications';
import { FilterType } from '../types';

// ===============================================
// 📱 DASHBOARD APP COMPONENT
// ===============================================

export const DashboardApp: React.FC = () => {
  
  const { t } = useTranslation();
  const { user, signOut, signInWithDemo } = useAuth();
  const { permission, requestPermission } = useNotifications();
  const isPermissionGranted = permission === 'granted';
  const { notes, loading: notesLoading, saveNote, deleteNote, togglePin } = useNotes();
  const { payments, loading: paymentsLoading, savePayment, deletePayment, togglePaid } = usePayments();
  const { tags } = useTags();
  
  // ===============================================
  // 🎯 STATE MANAGEMENT
  // ===============================================
  
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Modal states
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isAIInsightsOpen, setIsAIInsightsOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<any>(null);
  const [editingPayment, setEditingPayment] = useState<any>(null);

  // ===============================================
  // 🎛️ NOTE HANDLERS
  // ===============================================
  
  const handleCreateNote = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setEditingNote(null);
    setIsNoteModalOpen(true);
  };

  const handleEditNote = (note: any) => {
    setEditingNote(note);
    setIsNoteModalOpen(true);
  };

  const handleSaveNote = async (noteData: any) => {
    await saveNote(editingNote ? { ...noteData, id: editingNote.id } : noteData);
  };

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id);
  };

  const handleTogglePin = async (id: string) => {
    await togglePin(id);
  };

  // ===============================================
  // 💰 PAYMENT HANDLERS
  // ===============================================
  
  const handleCreatePayment = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setEditingPayment(null);
    setIsPaymentModalOpen(true);
  };

  const handleEditPayment = (payment: any) => {
    setEditingPayment(payment);
    setIsPaymentModalOpen(true);
  };

  const handleSavePayment = async (paymentData: any) => {
    await savePayment(editingPayment ? { ...paymentData, id: editingPayment.id } : paymentData);
  };

  const handleDeletePayment = async (id: string) => {
    await deletePayment(id);
  };

  const handleTogglePaid = async (id: string) => {
    await togglePaid(id);
  };

  const handleDemoLogin = async () => {
    try {
      await signInWithDemo();
    } catch (error) {
      console.error('Demo login error:', error);
    }
  };

  // ===============================================
  // 🔔 NOTIFICATION PERMISSION
  // ===============================================
  
  // Bildirim izni kontrolü
  React.useEffect(() => {
    if (user && !isPermissionGranted) {
      // 3 saniye sonra bildirim izni modal'ını göster
      const timer = setTimeout(() => {
        setIsNotificationModalOpen(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [user, isPermissionGranted]);

  // ===============================================
  // 🔘 COMPONENT RENDER
  // ===============================================
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200">
      
      <Header 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        user={user}
        onSignOut={signOut}
        onAIInsights={() => setIsAIInsightsOpen(true)}
        onAnalytics={() => setIsAnalyticsOpen(true)}
        onAdmin={() => setIsAdminPanelOpen(true)}
      />
      
      <div className="flex relative z-10">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        
        <main className="flex-1">
          {notesLoading || paymentsLoading ? (
            <LoadingSpinner size="lg" text={t('LOADING.DATA', 'Veriler yükleniyor...')} />
          ) : (
            <Dashboard
              notes={notes}
              payments={payments}
              activeFilter={activeFilter}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onEditNote={handleEditNote}
              onEditPayment={handleEditPayment}
              onTogglePin={handleTogglePin}
              onTogglePaid={handleTogglePaid}
              onAIInsights={() => setIsAIInsightsOpen(true)}
            />
          )}
        </main>
      </div>

      <FloatingActionButton
        onCreateNote={handleCreateNote}
        onCreatePayment={handleCreatePayment}
      />

      {/* =============================================== */}
      {/* 🎭 MODALS */}
      {/* =============================================== */}
      
      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        note={editingNote}
        onSave={handleSaveNote}
        onDelete={handleDeleteNote}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        payment={editingPayment}
        onSave={handleSavePayment}
        onDelete={handleDeletePayment}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <NotificationPermissionModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        onRequestPermission={requestPermission}
      />

      <AIInsightsPanel
        notes={notes}
        payments={payments}
        isOpen={isAIInsightsOpen}
        onClose={() => setIsAIInsightsOpen(false)}
      />

      <AnalyticsPanel
        notes={notes}
        payments={payments}
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />

      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />
      
    </div>
  );
};

// ===============================================
// 📱 DEFAULT EXPORT
// ===============================================

export default DashboardApp; 