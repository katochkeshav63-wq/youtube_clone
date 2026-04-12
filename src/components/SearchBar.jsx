import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

export default function SearchBar({ autoFocus = false }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    navigate(`/search/${encodeURIComponent(trimmedQuery)}`);
  };

  const clearInput = () => {
    setQuery("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center w-full max-w-2xl bg-[#121212] border border-gray-700 rounded-full overflow-hidden focus-within:border-red-500 transition"
    >

      <input
        type="text"
        placeholder="Search"
        value={query}
        autoFocus={autoFocus}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 bg-transparent text-white placeholder-gray-400 outline-none"
      />


      {query && (
        <button
          type="button"
          onClick={clearInput}
          className="px-2 text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>
      )}

      <button
        type="submit"
        className="px-5 py-2 bg-gray-800 hover:bg-gray-700 border-l border-gray-700"
      >
        <Search size={18} className="text-white" />
      </button>
    </form>
  );
}