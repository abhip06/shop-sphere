import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { UserType } from "@/types/types";

interface UserPref {
    // token: string | null;
    user: UserType | null;
    authStatus: boolean;
    hydrated: boolean;
}

interface AuthActions {
    setHydrated(): void;
    login: (user: UserType) => void;
    logout: () => void;
}

export const authStore = create<UserPref & AuthActions>()(
    persist(
        immer((set) => ({
            // token: null,
            user: null,
            authStatus: false,
            hydrated: false,

            setHydrated() {
                set({ hydrated: true });
            },

            login(user: UserType) {
                if (user) {
                    set((state) => {
                        state.user = user;
                        state.authStatus = true;
                    });
                }
            },

            logout() {
                set((state) => {
                    state.user = null;
                    state.authStatus = false;
                });
            },
        })),
        {
            name: "auth",
            onRehydrateStorage() {
                return (state, error) => {
                    if (error) {
                        console.error("Error during auth storage hydration", error);
                    } else {
                        state?.setHydrated();
                    }
                }
            },
        }
    )
);