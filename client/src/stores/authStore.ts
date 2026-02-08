import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserData {
  userName: string;
  email: string;
  password?: string;
}

interface AuthState {
  userData: UserData | null;
  error: string | null;
  loading: boolean;
}

interface AuthActions {
  signup: (
    userName: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  login: (userName: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

const MOCK_DB_KEY = "scribe-mock-users-db";

const getMockUsers = (): UserData[] => {
  const users = localStorage.getItem(MOCK_DB_KEY);
  return users ? JSON.parse(users) : [];
};

const addMockUser = (user: UserData) => {
  const users = getMockUsers();
  users.push(user);
  localStorage.setItem(MOCK_DB_KEY, JSON.stringify(users));
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      userData: null,
      error: null,
      loading: false,

      signup: async (userName, email, password) => {
        set({ loading: true, error: null });

        await new Promise((resolve) => setTimeout(resolve, 800));

        const existingUsers = getMockUsers();
        if (existingUsers.find((u) => u.email === email)) {
          set({ loading: false, error: "User already exists" });
          return false;
        }

        const newUser = { userName, email, password };
        addMockUser(newUser); // Save to our "Mock DB"

        set({ userData: newUser, loading: false });
        return true;
      },

      login: async (userName, password) => {
        set({ loading: true, error: null });

        await new Promise((resolve) => setTimeout(resolve, 800));

        const users = getMockUsers();
        const user = users.find(
          (u) =>
            (u.userName === userName || u.email === userName) &&
            u.password === password
        );

        if (user) {
          set({ userData: user, loading: false });
          return true;
        } else {
          set({ error: "Invalid credentials", loading: false });
          return false;
        }
      },

      logout: async () => {
        set({ userData: null, error: null });
        return true;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ userData: state.userData }),
    }
  )
);
