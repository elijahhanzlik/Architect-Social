'use client';

// Simple admin authentication
// In production, replace with NextAuth.js, Clerk, or your backend auth

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123', // Change this in production!
};

export interface AdminUser {
  username: string;
  isAuthenticated: boolean;
}

export const adminAuth = {
  login: (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminUser', username);
      }
      return true;
    }
    return false;
  },

  logout: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminAuth');
      localStorage.removeItem('adminUser');
    }
  },

  isAuthenticated: (): boolean => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminAuth') === 'true';
    }
    return false;
  },

  getUser: (): AdminUser | null => {
    if (typeof window !== 'undefined' && adminAuth.isAuthenticated()) {
      return {
        username: localStorage.getItem('adminUser') || '',
        isAuthenticated: true,
      };
    }
    return null;
  },
};
