import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * HireBuddy Global Store (Zustand)
 * 
 * Slices:
 * - auth: User authentication state
 * - ui: UI state (modals, toasts, mobile menu)
 * - chat: Unread counts, active chat
 */

export const useStore = create(
  persist(
    (set, get) => ({
      // ===== AUTH SLICE =====
      user: null,
      token: null,
      isAuthenticated: false,
      authLoading: true,
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      setToken: (token) => set({ token }),
      
      login: (token, user) => set({
        token,
        user,
        isAuthenticated: true,
        authLoading: false
      }),
      
      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },
      
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
      
      setAuthLoading: (loading) => set({ authLoading: loading }),
      
      // ===== UI SLICE =====
      isMobileMenuOpen: false,
      activeModal: null,
      toasts: [],
      
      toggleMobileMenu: () => set((state) => ({
        isMobileMenuOpen: !state.isMobileMenuOpen
      })),
      
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),
      
      openModal: (modalName) => set({ activeModal: modalName }),
      
      closeModal: () => set({ activeModal: null }),
      
      addToast: (toast) => set((state) => ({
        toasts: [...state.toasts, { id: Date.now(), ...toast }]
      })),
      
      removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      })),
      
      // ===== CHAT SLICE =====
      unreadCount: 0,
      activeChatId: null,
      
      setUnreadCount: (count) => set({ unreadCount: count }),
      
      incrementUnreadCount: () => set((state) => ({
        unreadCount: state.unreadCount + 1
      })),
      
      setActiveChatId: (chatId) => set({ activeChatId: chatId }),
      
      clearActiveChatId: () => set({ activeChatId: null }),
    }),
    {
      name: 'hirebuddy-storage',
      partialize: (state) => ({
        // Only persist auth data
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

// Selector hooks for better performance
export const useAuth = () => useStore((state) => ({
  user: state.user,
  token: state.token,
  isAuthenticated: state.isAuthenticated,
  authLoading: state.authLoading,
  login: state.login,
  logout: state.logout,
  setUser: state.setUser,
  updateUser: state.updateUser
}));

export const useUI = () => useStore((state) => ({
  isMobileMenuOpen: state.isMobileMenuOpen,
  activeModal: state.activeModal,
  toggleMobileMenu: state.toggleMobileMenu,
  closeMobileMenu: state.closeMobileMenu,
  openModal: state.openModal,
  closeModal: state.closeModal
}));

export const useChat = () => useStore((state) => ({
  unreadCount: state.unreadCount,
  activeChatId: state.activeChatId,
  setUnreadCount: state.setUnreadCount,
  incrementUnreadCount: state.incrementUnreadCount,
  setActiveChatId: state.setActiveChatId,
  clearActiveChatId: state.clearActiveChatId
}));

export default useStore;
