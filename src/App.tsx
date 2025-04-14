import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { NextUIProvider } from "@nextui-org/react";
import Index from "./pages/Index";
import RestaurantDetails from "./pages/RestaurantDetails";
import NotFound from "./pages/NotFound";
import Restaurants from "./pages/Restaurants";
import About from "./pages/About";
import Checkout from "./pages/Checkout";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <NextUIProvider>
          <TooltipProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/restaurants" element={<Restaurants />} />
                  <Route path="/restaurants/:id" element={<RestaurantDetails />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/checkout" element={<Checkout />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </TooltipProvider>
        </NextUIProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
