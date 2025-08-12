import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
