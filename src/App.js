import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

import Landing from "./pages/Landing";
import PurchaseHistoryPage from "./pages/Purchasehistory";
import Producermain from "./pages/Producermain";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/purchase-history" element={<PurchaseHistoryPage />} />
          <Route path="/producermain" element={<Producermain />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
