import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type UserRole = "client" | "guide" | "proprietaire" | "admin";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  avatar?: string;
}

export interface BookingRecord {
  id: string;
  ref: string;
  itemId: string;
  itemTitle: string;
  itemSubtitle?: string;
  itemImage: string;
  date: string;
  qty: number;
  unit: string;
  total: number;
  method: "card" | "cib" | "edahabia" | "free";
  status: "confirmed" | "pending";
  createdAt: string;
}

interface AuthContextValue {
  user: UserProfile | null;
  bookings: BookingRecord[];
  favorites: string[];
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string; role?: UserRole }>;
  signInAdmin: (email: string, password: string, accessCode: string) => Promise<{ error?: string; role?: UserRole }>;
  signUp: (name: string, email: string, password: string, role?: UserRole) => Promise<{ error?: string; role?: UserRole }>;
  signOut: () => void;
  addBooking: (b: Omit<BookingRecord, "id" | "createdAt">) => BookingRecord;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const USERS_KEY = "lm-users";
const SESSION_KEY = "lm-session";
const dataKey = (uid: string, kind: string) => `lm-${kind}-${uid}`;

interface StoredUser extends UserProfile {
  password: string;
}

const readUsers = (): StoredUser[] => {
  try {
    const arr = JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
    // backfill legacy users without role
    return arr.map((u: StoredUser) => ({ ...u, role: u.role ?? "client" }));
  } catch {
    return [];
  }
};

const writeUsers = (u: StoredUser[]) => localStorage.setItem(USERS_KEY, JSON.stringify(u));

const readJSON = <T,>(k: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(k);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const dashboardPathForRole = (role: UserRole) => {
  switch (role) {
    case "guide":
      return "/guide";
    case "proprietaire":
      return "/proprietaire";
    case "admin":
      return "/admin";
    default:
      return "/client";
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sid = localStorage.getItem(SESSION_KEY);
    if (sid) {
      const u = readUsers().find((x) => x.id === sid);
      if (u) {
        const { password: _pw, ...profile } = u;
        setUser(profile);
        setBookings(readJSON<BookingRecord[]>(dataKey(u.id, "bookings"), []));
        setFavorites(readJSON<string[]>(dataKey(u.id, "favorites"), []));
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem(dataKey(user.id, "bookings"), JSON.stringify(bookings));
  }, [bookings, user]);

  useEffect(() => {
    if (user) localStorage.setItem(dataKey(user.id, "favorites"), JSON.stringify(favorites));
  }, [favorites, user]);

  const signUp: AuthContextValue["signUp"] = async (name, email, password, role = "client") => {
    const users = readUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { error: "auth.error.emailTaken" };
    }
    const newUser: StoredUser = {
      id: `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
      email,
      name,
      role,
      password,
      createdAt: new Date().toISOString(),
    };
    writeUsers([...users, newUser]);
    localStorage.setItem(SESSION_KEY, newUser.id);
    const { password: _pw, ...profile } = newUser;
    setUser(profile);
    setBookings([]);
    setFavorites([]);
    return { role };
  };

  const signIn: AuthContextValue["signIn"] = async (email, password) => {
    const users = readUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { error: "auth.error.badCredentials" };
    localStorage.setItem(SESSION_KEY, found.id);
    const { password: _pw, ...profile } = found;
    setUser(profile);
    setBookings(readJSON<BookingRecord[]>(dataKey(found.id, "bookings"), []));
    setFavorites(readJSON<string[]>(dataKey(found.id, "favorites"), []));
    return { role: found.role };
  };

  const ADMIN_ACCESS_CODE = "MEDINA-2026";
  const ADMIN_EMAIL = "plateformeadmin@gmail.com";
  const ADMIN_PASSWORD = "adminplateforme 123";

  const signInAdmin: AuthContextValue["signInAdmin"] = async (email, password, accessCode) => {
    // Strict whitelist: only the unique authorized administrator can pass.
    const emailOk = email.trim().toLowerCase() === ADMIN_EMAIL;
    const passwordOk = password === ADMIN_PASSWORD;
    const codeOk = accessCode.trim().toUpperCase() === ADMIN_ACCESS_CODE;

    if (!codeOk) return { error: "auth.admin.error.badCode" };
    if (!emailOk || !passwordOk) return { error: "auth.admin.error.notAdmin" };

    const users = readUsers();
    let admin = users.find((u) => u.email.toLowerCase() === ADMIN_EMAIL);
    if (!admin) {
      admin = {
        id: `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
        email: ADMIN_EMAIL,
        name: "Administrateur Plateforme",
        role: "admin",
        password: ADMIN_PASSWORD,
        createdAt: new Date().toISOString(),
      };
      writeUsers([...users, admin]);
    } else if (admin.role !== "admin" || admin.password !== ADMIN_PASSWORD) {
      // Keep stored admin record aligned with the canonical credentials.
      admin = { ...admin, role: "admin", password: ADMIN_PASSWORD };
      writeUsers(users.map((u) => (u.id === admin!.id ? admin! : u)));
    }

    localStorage.setItem(SESSION_KEY, admin.id);
    const { password: _pw, ...profile } = admin;
    setUser(profile);
    setBookings(readJSON<BookingRecord[]>(dataKey(admin.id, "bookings"), []));
    setFavorites(readJSON<string[]>(dataKey(admin.id, "favorites"), []));
    return { role: "admin" };
  };

  const signOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setBookings([]);
    setFavorites([]);
  };

  const addBooking: AuthContextValue["addBooking"] = (b) => {
    const record: BookingRecord = {
      ...b,
      id: `b_${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
    };
    if (user) {
      setBookings((prev) => [record, ...prev]);
    }
    return record;
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <AuthContext.Provider
      value={{ user, bookings, favorites, isLoading, signIn, signInAdmin, signUp, signOut, addBooking, toggleFavorite, isFavorite }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
