import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRoutes from './routes';
import './i18n';

function App() {
  return (
      <ThemeProvider>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: '100vh'
        }}>
          <Header />
          <main style={{ flex: 1 }}>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
  );
}

export default App;
