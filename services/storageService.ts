/**
 * Service to handle localStorage data operations
 */
export const storageService = {
  /**
   * Save data to localStorage
   * @param key - Storage key
   * @param data - Data to store
   */
  save: <T>(key: string, data: T): void => {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error saving data to localStorage (${key}):`, error);
    }
  },

  /**
   * Load data from localStorage
   * @param key - Storage key
   * @returns The stored data or null if not found/error
   */
  load: <T>(key: string): T | null => {
    try {
      const serialized = localStorage.getItem(key);
      if (serialized === null) return null;
      return JSON.parse(serialized) as T;
    } catch (error) {
      console.error(`Error loading data from localStorage (${key}):`, error);
      return null;
    }
  },

  /**
   * Remove data from localStorage
   * @param key - Storage key
   */
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing data from localStorage (${key}):`, error);
    }
  },

  /**
   * Check if data exists in localStorage
   * @param key - Storage key
   * @returns True if the key exists
   */
  exists: (key: string): boolean => {
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Error checking localStorage (${key}):`, error);
      return false;
    }
  }
};
