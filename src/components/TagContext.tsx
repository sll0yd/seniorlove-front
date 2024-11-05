import type React from 'react';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import AxiosInstance from '../utils/axios';
import type { ITag } from '../@types';

interface TagContextType {
  tags: ITag[];
}

// Créer le contexte
const TagContext = createContext<TagContextType | undefined>(undefined);

// Fournisseur de contexte
interface TagProviderProps {
  children: ReactNode; // Spécifie que children peut être de type ReactNode
}

export const TagProvider: React.FC<TagProviderProps> = ({ children }) => {
  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(() => {
    AxiosInstance.get('/tags')
      .then((response) => {
        setTags(response.data.tags);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des tags:', error);
      });
  }, []);

  return <TagContext.Provider value={{ tags }}>{children}</TagContext.Provider>;
};

// Hook pour utiliser le contexte des tags
export const useTags = () => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error('useTags doit être utilisé dans un TagProvider');
  }
  return context;
};
