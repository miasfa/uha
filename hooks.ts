
import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T,>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export const useFavorites = (initialFavorites: string[] = []) => {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', initialFavorites);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  }, [setFavorites]);
  
  const isFavorite = useCallback((id: string) => {
    return favorites.includes(id);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite };
};
