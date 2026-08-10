import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0f172a',
            color: '#ffffff',
            fontSize: '0.875rem',
            borderRadius: '8px'
          }
        }}
      />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;