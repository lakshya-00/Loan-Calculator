import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeContextProvider } from './context/ThemeContext';
import { AppContextProvider } from './context/AppContext';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ThemeContextProvider>
      <AppContextProvider>
        <Router>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ErrorBoundary>
            </Box>
          </Box>
        </Router>
      </AppContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
