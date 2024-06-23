import { CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from './Routes';
import theme from './styles/theme';
import './styles/App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
