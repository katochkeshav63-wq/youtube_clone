import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    // ✅ Encode query (VERY IMPORTANT)
    navigate(`/search/${encodeURIComponent(trimmedQuery)}`);

    // ✅ optional: clear input after search
    // setQuery("");
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-xl">
      <input
        type="text"
        placeholder="Search YouTube..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 bg-gray-700 rounded-l-lg outline-none"
      />

      <button
        type="submit"
        className="px-6 bg-red-600 rounded-r-lg hover:bg-red-700"
      >
        Search
      </button>
    </form>
  );
}