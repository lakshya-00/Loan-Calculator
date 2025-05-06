import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

/**
 * Custom hook to access app context
 * @returns {Object} - App context
 */
export const useApp = () => {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useApp must be used within an AppContextProvider');
  }
  
  return context;
};
