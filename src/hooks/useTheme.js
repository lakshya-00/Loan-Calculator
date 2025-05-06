import { useContext } from 'react';
import { ColorModeContext } from '../context/ThemeContext';
import { useTheme as useMuiTheme } from '@mui/material/styles';

/**
 * Custom hook to access theme context
 * @returns {Object} - Theme context and MUI theme
 */
export const useTheme = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useMuiTheme();
  
  return {
    ...colorMode,
    theme,
  };
};
