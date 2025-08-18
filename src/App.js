import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

import Landing from "./pages/Landing";
import PurchaseHistoryPage from "./pages/Purchasehistory";
import Producermain from "./pages/Producermain";
import SalesSettlement from "./pages/SalesSettlement";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/purchase-history" element={<PurchaseHistoryPage />} />
          <Route path="/producermain" element={<Producermain />} />

          <Route path="/sales-settlement" element={<SalesSettlement />} />

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
