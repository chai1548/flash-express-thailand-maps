
// Dummy authentication utilities
export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
};

const USERS_KEY = 'flash_express_users';
const CURRENT_USER_KEY = 'flash_express_current_user';

export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  const existingUserIndex = users.findIndex(u => u.email === user.email);
  
  if (existingUserIndex >= 0) {
    users[existingUserIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const login = (email: string, password: string): User | null => {
  // In a real app, you would validate password using secure methods
  // This is just for demonstration
  const users = getUsers();
  const user = users.find(u => u.email === email);
  
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  }
  
  return null;
};

export const register = (name: string, email: string, password: string): User => {
  const newUser: User = {
    id: Math.random().toString(36).substring(2, 11),
    name,
    email
  };
  
  saveUser(newUser);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  return newUser;
};

export const logout = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const isLoggedIn = (): boolean => {
  return !!getCurrentUser();
};
