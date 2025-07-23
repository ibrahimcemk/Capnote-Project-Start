import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  DocumentTextIcon,
  CreditCardIcon,
  SparklesIcon,
  CalendarIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  UserIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { AdminService, UserWithStats } from '../services/admin.service';
import { LoadingSpinner } from './LoadingSpinner';

interface AdminUsersPanelProps {
  onBack: () => void;
}

export function AdminUsersPanel({ onBack }: AdminUsersPanelProps) {
  const [users, setUsers] = useState<UserWithStats[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'user' | 'admin' | 'super_admin'>('all');
  const [sortBy, setSortBy] = useState<'created_at' | 'lastActive' | 'notesCount'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedUser, setSelectedUser] = useState<UserWithStats | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterAndSortUsers();
  }, [users, searchTerm, filterRole, sortBy, sortOrder]);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await AdminService.getAllUsersWithStats();
      
      if (error) {
        setError(error.message);
        return;
      }

      setUsers(data || []);
    } catch (err) {
      setError('Kullanıcı verileri yüklenirken hata oluştu');
      console.error('Load users error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortUsers = () => {
    let filtered = users.filter(user => {
      const matchesSearch = 
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      
      return matchesSearch && matchesRole;
    });

    // Sort users
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'created_at':
          aValue = new Date(a.created_at);
          bValue = new Date(b.created_at);
          break;
        case 'lastActive':
          aValue = new Date(a.lastActive);
          bValue = new Date(b.lastActive);
          break;
        case 'notesCount':
          aValue = a.notesCount;
          bValue = b.notesCount;
          break;
        default:
          aValue = a.created_at;
          bValue = b.created_at;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredUsers(filtered);
  };

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin' | 'super_admin') => {
    try {
      const { error } = await AdminService.updateUserRole(userId, newRole);
      
      if (error) {
        alert('Rol güncellenirken hata oluştu: ' + error.message);
        return;
      }

      // Kullanıcı listesini güncelle
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      setShowRoleModal(false);
      setSelectedUser(null);
    } catch (err) {
      alert('Rol güncellenirken hata oluştu');
      console.error('Role update error:', err);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <ShieldCheckIcon className="h-4 w-4 text-red-600" />;
      case 'admin':
        return <ShieldExclamationIcon className="h-4 w-4 text-yellow-600" />;
      default:
        return <UserIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'admin':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const formatRole = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'Süper Admin';
      case 'admin':
        return 'Admin';
      default:
        return 'Kullanıcı';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" text="Kullanıcılar yükleniyor..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Geri Dön
          </button>
        </div>
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={loadUsers}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Geri Dön
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Kullanıcı Yönetimi
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredUsers.length} kullanıcı gösteriliyor
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Kullanıcı ara (e-posta veya isim)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Role Filter */}
          <div className="relative">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as any)}
              className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm Roller</option>
              <option value="user">Kullanıcı</option>
              <option value="admin">Admin</option>
              <option value="super_admin">Süper Admin</option>
            </select>
            <ChevronDownIcon className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={`${sortBy}_${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('_');
                setSortBy(field as any);
                setSortOrder(order as any);
              }}
              className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="created_at_desc">En Yeni</option>
              <option value="created_at_asc">En Eski</option>
              <option value="lastActive_desc">Son Aktif</option>
              <option value="notesCount_desc">En Çok Not</option>
            </select>
            <ChevronDownIcon className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            {/* User Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {user.full_name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {user.full_name || 'İsimsiz Kullanıcı'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setShowRoleModal(true);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <EllipsisVerticalIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Role Badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                {getRoleIcon(user.role)}
                <span className="ml-1">{formatRole(user.role)}</span>
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <DocumentTextIcon className="h-4 w-4 text-blue-600 mr-1" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {user.notesCount}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Not</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <CreditCardIcon className="h-4 w-4 text-purple-600 mr-1" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {user.remindersCount}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Hatırlatma</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <SparklesIcon className="h-4 w-4 text-pink-600 mr-1" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {user.aiRequestsCount}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">AI</p>
              </div>
            </div>

            {/* Last Active */}
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span>
                Katılım: {new Date(user.created_at).toLocaleDateString('tr-TR')}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Role Change Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Rol Değiştir
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>{selectedUser.full_name || selectedUser.email}</strong> kullanıcısının rolünü değiştir:
            </p>
            
            <div className="space-y-2 mb-6">
              {['user', 'admin', 'super_admin'].map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleChange(selectedUser.id, role as any)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedUser.role === role
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    {getRoleIcon(role)}
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {formatRole(role)}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRoleModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                İptal
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Empty State */}
      {filteredUsers.length === 0 && !loading && (
        <div className="text-center py-12">
          <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Kullanıcı Bulunamadı
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Arama kriterlerinize uygun kullanıcı bulunamadı.
          </p>
        </div>
      )}
    </div>
  );
} 