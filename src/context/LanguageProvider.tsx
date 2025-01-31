/* import React, { createContext, useContext, useState, useEffect } from "react";
import i18next from "../services/i18next"; // Importa a configuração do i18next

type LanguageContextType = {
  language: string;
  changeLanguage: (lang: string) => void;
};

// Criar o contexto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(i18next.language || "ptbr");

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para acessar o contexto facilmente
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage deve ser usado dentro de um LanguageProvider");
  }
  return context;
}; */
