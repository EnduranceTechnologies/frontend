import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '@/pages/public/login.tsx';
import PrivateRoute from './private.routes.tsx';
import { useTheme } from '@/context/theme-context.tsx';
import { ToastContainer } from 'react-toastify';
import { SidebarProvider } from '@/components/ui/sidebar.tsx';
import { AppSidebar } from '@/components/app-sidebar/app-sidebar.tsx';
import ForgotPassword from '@/pages/public/forgot-password.tsx';
import RecoverPassword from '@/pages/public/recover-password.tsx';
import Account from '@/pages/private/account.tsx';
import { useAuth } from '@/context/auth-context.tsx';
import RegisterAccess from '@/pages/public/register-access.tsx';
import RegisterInfo from '@/pages/public/register-info.tsx';
import ValidateEmail from '@/pages/public/validate-email.tsx';

export const AppRoute = () => {
  const { theme } = useTheme();
  const { user } = useAuth();

  const pages = [
    {
      path: '/account',
      allowedRoles: ['ADMIN', 'MEMBER'],
      component: Account,
    },
  ];

  return (
    <>
      <ToastContainer theme={theme} />
      <Router>
        <Routes>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register-access'} element={<RegisterAccess />} />
          <Route path={'/register-info'} element={<RegisterInfo />} />
          <Route path={'/validate-email'} element={<ValidateEmail />} />
          <Route path={'/forgot-password'} element={<ForgotPassword />} />
          <Route path={'/recover/:token/:email'} element={<RecoverPassword />} />
          <Route path={'/*'} element={<Login />} />

          {pages
            .filter((e) => e.allowedRoles.includes(user!.role))
            .map((e) => (
              <Route
                key={e.path}
                path={e.path}
                element={
                  <PrivateRoute>
                    <SidebarProvider>
                      <AppSidebar side="left" />
                      <e.component />
                    </SidebarProvider>
                  </PrivateRoute>
                }
              />
            ))}
        </Routes>
      </Router>
    </>
  );
};
