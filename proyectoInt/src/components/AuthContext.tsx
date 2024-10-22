// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definir la interfaz del contexto
interface AuthContextProps {
  userId: string | null;
  username: string | null;
  login: (userId: string, username: string) => void;
  logout: () => void;
}

// Crear el contexto con valores iniciales
const AuthContext = createContext<AuthContextProps>({
  userId: null,
  username: null,
  login: () => {},
  logout: () => {},
});

// Hook para usar el AuthContext
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Función para iniciar sesión
  const login = (userId: string, username: string) => {
    setUserId(userId);
    setUsername(username);
    localStorage.setItem('userId', userId); // Guardar en localStorage
    localStorage.setItem('username', username); // Guardar en localStorage
  };

  // Función para cerrar sesión
  const logout = () => {
    setUserId(null);
    setUsername(null);
    localStorage.removeItem('userId'); // Eliminar de localStorage
    localStorage.removeItem('username'); // Eliminar de localStorage
  };

  // Recuperar datos del usuario del localStorage al cargar el contexto
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');

    if (storedUserId && storedUsername) {
      setUserId(storedUserId);
      setUsername(storedUsername);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userId, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
