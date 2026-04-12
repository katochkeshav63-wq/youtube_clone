
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0f0f0f] border-b border-gray-800">
      
      <div className="flex items-center justify-between px-4 md:px-6 h-14">
        
        {/* 🔴 LEFT - Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-lg md:text-xl font-semibold text-white cursor-pointer tracking-tight"
        >
          <span className="text-red-500">Tube</span>X
        </h1>

        {/* 🔍 DESKTOP SEARCH */}
<div className="hidden md:flex justify-end w-full">
  <div className="w-full max-w-2xl">
    <SearchBar />
  </div>
</div>

        {/* 🔵 RIGHT - Icons */}
        <div className="flex items-center gap-4 text-white">
          
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowSearch(true)}
            className="md:hidden"
          >
            <Search size={20} />
          </button>

        </div>
      </div>

      {/* 📱 MOBILE SEARCH OVERLAY */}
      {showSearch && (
        <div className="md:hidden flex items-center gap-2 px-4 pb-3">
          
          <button onClick={() => setShowSearch(false)}>
            <X size={22} className="text-white" />
          </button>

          <div className="flex-1">
            <SearchBar autoFocus />
          </div>
        </div>
      )}
    </header>
  );
}