// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-4 md:px-6 py-2 bg-[#0f0f0f] border-b border-gray-800 sticky top-0 z-50">

      {/* 🔴 LEFT (Menu + Logo) */}
      <div className="flex items-center gap-4">
        
       
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-semibold text-white cursor-pointer tracking-tight"
        >
          <span className="text-red-500">Tube</span>X
        </h1>
      </div>

     
      <div className="flex-1 flex justify-end ">
        <div className="w-full max-w-2xl">
          <SearchBar />
        </div>
      </div>

    
    

      </div>
 
  );
}