import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Menus from "./pages/Menus";
import MenuDetail from "./pages/MenuDetail";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="menus" element={<Menus />} />
        <Route path="menus/:slug" element={<MenuDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="mentions-legales" element={<Legal />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
