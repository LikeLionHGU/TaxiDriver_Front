import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

import Landing from "./pages/Landing";
import PurchaseHistoryPage from "./pages/Purchasehistory";
import Producermain from "./pages/Producermain";
import SalesSettlement from "./pages/SalesSettlement";
import Produceregistar from "./pages/Produceregistar";
import Auction from "./pages/AuctionPage";
import Review from "./pages/Review";
import AuctionDetail from "./pages/AuctionDetail";
import Confirm from "./pages/ConfirmReceiptPage"
import ConsignmentCompanyForm from "./pages/ConsignmentCompanyForm";
import BuyerForm from "./pages/BuyerForm";
import FishmanForm from "./pages/FishmanForm";


import Header from "./components/Header";
import Footer from "./components/Footer";

import { AuthProvider } from "./auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/purchase-history" element={<PurchaseHistoryPage />} />
            <Route path="/sales-settlement" element={<SalesSettlement />} />
            <Route path="/producermain" element={<Producermain />} />
            <Route path="/register" element={<Produceregistar />} />
            <Route path="/auction" element={<Auction />} />
            <Route path="/auction/detail/:id" element={<AuctionDetail />} />
            <Route path="/confirm-receipt" element={<Confirm />} />

            <Route path="/review" element={<Review />} />
            <Route path="/consignment-company" element={<ConsignmentCompanyForm />} /> 
            <Route path="/buyer" element={<BuyerForm />} />
            <Route path="/fishman" element={<FishmanForm />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
