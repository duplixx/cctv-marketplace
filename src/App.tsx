import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Solutions from './components/Solutions';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Auth from './components/Auth';
import RequestDemo from './components/RequestDemo';
import Checkout from './components/Checkout';
import CheckoutSuccess from './components/CheckoutSuccess';
import VideoAnalytics from './components/VideoAnalytics';
import VideoAnalyticsPreview from './components/VideoPreview';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Products />
            <VideoAnalyticsPreview />
            <Solutions />
          </>
        } />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/request-demo" element={<RequestDemo />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/video-analytics" element={<VideoAnalytics />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;