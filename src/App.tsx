import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ProductsPage from "./pages/ProductsPage";
import AuctionPage from "./pages/AuctionPage.tsx";
import MemberRegistration from "./pages/MemberRegistration";
import MerchantRegistration from "./pages/MerchantRegistration";
import WholesaleRegistration from "./pages/WholesaleRegistration";
import ScrollToTop from "./pages/ScrollToTop";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/auction" element={<AuctionPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/register/member" element={<MemberRegistration />} />
<Route path="/register/merchant" element={<MerchantRegistration />} />
<Route path="/register/wholesale" element={<WholesaleRegistration />} />
<Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
