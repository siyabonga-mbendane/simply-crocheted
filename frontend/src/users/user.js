import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null,

            // signup
            signup: async (userData) => {
                set({ loading: true, error: null });
                try {
                    const res = await fetch("/api/users/signup", {method: "POST",headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(userData)
                    });

                    const data = await res.json();
                    
                    if (!data.success) {
                        set({ error: data.message, loading: false });
                        return { success: false, message: data.message };
                    }

                    set({ user: data.data, token: data.token, isAuthenticated: true, loading: false });
                    return { success: true, message: "Signup successful!" };

                } catch (error) {
                    set({ error: error.message, loading: false });
                    return { success: false, message: "Network error. Please try again." };
                }
            },

            // login
            login: async (credentials) => {
                set({ loading: true, error: null });
                try {
                    const res = await fetch("/api/users/login", {method: "POST",headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(credentials)
                    });

                    const data = await res.json();
                    
                    if (!data.success) {
                        set({ error: data.message, loading: false });
                        return { success: false, message: data.message };
                    }

                    set({ user: data.data, token: data.token, isAuthenticated: true, loading: false });
                    return { success: true, message: "Login successful!" };
                } catch (error) {
                    set({ error: error.message, loading: false });
                    return { success: false, message: "Network error. Please try again." };
                }
            },

            // signout
            logout: () => {
                set({ user: null, token: null, isAuthenticated: false, error: null });
            },

            // current user
            getCurrentUser: () => {
                return get().user;
            },

            // admin?
            isAdmin: () => {
                const user = get().user;
                return user && user.role === 'admin';
            }
        }),
        {
            name: 'user-storage', // name for localStorage
            partialize: (state) => ({ 
                user: state.user, 
                token: state.token, 
                isAuthenticated: state.isAuthenticated 
            })
        }
    )
);