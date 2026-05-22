import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
    userId: number;
    email: string;
    role: string; // 'ADMIN' | 'SUPER_ADMIN'
}

interface AuthState {
    accessToken: string | null;
    user: User | null;
    isAuthenticated: boolean;

    // Actions
    setAuth: (token: string, user: User) => void;
    setAccessToken: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            user: null,
            isAuthenticated: false,

            setAuth: (token, user) => set({
                accessToken: token,
                user,
                isAuthenticated: true
            }),

            setAccessToken: (token) => set({ accessToken: token }),

            logout: () => {
                localStorage.removeItem('admin-auth-storage');
                set({ accessToken: null, user: null, isAuthenticated: false });
            },
        }),
        {
            name: 'admin-auth-storage',
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                isAuthenticated: state.isAuthenticated
            }),
            storage: createJSONStorage(() => localStorage),
        }
    )
);
