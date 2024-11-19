import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [propriedade, setPropriedade] = useState(null);
  const [token, setToken] = useState(null); // Adiciona o estado do token

  return (
    <UserContext.Provider value={{ user, setUser, propriedade, setPropriedade, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};