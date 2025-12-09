import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Admin - Delta Indonesia',
  description: 'Admin Dashboard for Delta Indonesia',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      {children}
      <Toaster position="top-right" />
    </AdminAuthProvider>
  );
}
