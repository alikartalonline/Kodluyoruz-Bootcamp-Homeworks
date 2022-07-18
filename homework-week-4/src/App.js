import React from "react"
import { ErrorBoundary } from "./components/error-boundary"
import { Header } from "./components/header"
import { Products } from "./components/products"
import { ShoppingCart } from "./components/shopping-cart"
import { AppProvider } from "./context"
import { ToastProvider } from "./context/toast"
import "./example-app.css"


import { Routes, Route } from "react-router-dom";

import Sepetim from "./components/sepetim/sepetim";
import Error from './components/error404/error';
import About from './components/About/about';
import Contact from './components/Contact/contact';
import ProductDetail from "./components/ProductDetail/productdetail"

export default function () {

  return (
    <>

      <Header />

      <Routes>
        <Route path="/" element={<div className="container example-app"><Products /></div>} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/" element={<ErrorBoundary><ShoppingCart /></ErrorBoundary>} />
        <Route path="/Sepetim" element={<Sepetim />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />

        <Route path="/*" element={<Error />} />
  {/* hiçbir şey ile eşleşmez ise Error ile eşleşecek */}

      </Routes>
    </>
  )
}
