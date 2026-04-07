import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Watch from "./pages/watch";
import Navbar from "./components/navbar";
import SearchBar from "./pages/search";
function App() {
  return (
    <BrowserRouter>
      <div className="bg-black text-white min-h-screen">
        
        {/* 🔴 Global Navbar */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:id" element={<Watch />} />
            <Route path="/search/:query" element={<SearchBar />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;