import { Route, Routes } from 'react-router';
import Layout from '@/components/Layout';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import HomePage from '@/pages/HomePage';
import LegalNoticePage from '@/pages/LegalNoticePage';
import MenuDetailPage from '@/pages/MenuDetailPage';
import MenusPage from '@/pages/MenusPage';
import NotFoundPage from '@/pages/NotFoundPage';
import PrivacyPage from '@/pages/PrivacyPage';

/** Pages du site. Le routeur est fourni par main.tsx (navigateur) ou entry-server.tsx (pré-rendu). */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="menus" element={<MenusPage />} />
        <Route path="menus/:slug" element={<MenuDetailPage />} />
        <Route path="a-propos" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="mentions-legales" element={<LegalNoticePage />} />
        <Route path="politique-confidentialite" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
