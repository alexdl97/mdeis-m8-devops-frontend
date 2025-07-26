import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Container } from '@mui/material'
import { AppRoutes } from './routes/AppRoutes'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from './themes/ThemeProvider';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
          <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
