import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Container, CssBaseline } from '@mui/material'
import { AppRoutes } from './routes/AppRoutes'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline/>
      <Container maxWidth="lg">
        <AppRoutes />
      </Container>
    </BrowserRouter>
  )
}

export default App
