import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { LearnMore } from './pages/LearnMore';
import { Products } from './pages/Products';
import { About } from './pages/About';
import { CartPage } from './pages/CartPage';
import { Checkout } from './pages/Checkout';
import { Mpesa } from './pages/Mpesa';
import { Card } from './pages/Card';
import { VisitPage } from './pages/VisitPage';
import { BookTour } from './pages/BookTour';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cream-50 text-brown-900">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn-more/:id" element={<LearnMore />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout-with-mpesa-or-card" element={<Checkout />} />
            <Route path="/mpesa" element={<Mpesa />} />
            <Route path="/card" element={<Card />} />
            <Route path="/visit" element={<VisitPage />} />
            <Route path="/booking" element={<BookTour />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
