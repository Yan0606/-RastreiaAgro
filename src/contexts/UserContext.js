import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [usuarioId, setUsuarioId] = useState(null); // Novo estado para armazenar o ID do usuário

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, usuarioId, setUsuarioId }}>
      {children}
    </UserContext.Provider>
  );
};
