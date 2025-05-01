/* eslint-disable */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [exactUser, setExactUser] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?q=${query}`);
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 1) {
        try {
          // أولًا نجيب suggestions
          const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
          const users = response.data.items.slice(0, 5); // أول ٥ اقتراحات
          setSuggestions(users);

          // ثانيًا نحاول نجيب username بالظبط
          try {
            const exactResponse = await axios.get(`https://api.github.com/users/${query}`);
            setExactUser(exactResponse.data);
          } catch (exactError) {
            setExactUser(null); // لو مفيش يوزر بنفس الاسم
          }

        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
          setExactUser(null);
        }
      } else {
        setSuggestions([]);
        setExactUser(null);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSuggestionClick = (username) => {
    setQuery(username);
    navigate(`/search?q=${username}`);
  };

  return (
    <div className="w-full max-w-md relative">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          placeholder="Search GitHub users"
          className="flex-grow p-3 rounded-l-full text-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-700 p-3 rounded-r-full hover:bg-green-600"
        >
          Search
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {query.length > 1 && (
        <ul className="absolute bg-white text-black w-full mt-1 rounded shadow-lg z-10 max-h-60 overflow-y-auto">
          {/* اول حاجة نعرض المستخدم المطابق لو موجود */}
          {exactUser && (
            <li
              key={exactUser.id}
              onClick={() => handleSuggestionClick(exactUser.login)}
              className="p-2 hover:bg-gray-200 cursor-pointer font-bold bg-green-100"
            >
              {exactUser.login} (مطابق تمامًا)
            </li>
          )}

          {/* بعدين نعرض الاقتراحات العادية */}
          {suggestions.length > 0 ? (
            suggestions.map((user) => (
              <li
                key={user.id}
                onClick={() => handleSuggestionClick(user.login)}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {user.login}
              </li>
            ))
          ) : (
            !exactUser && (
              <li className="p-2 text-black">لا يوجد اقتراحات.</li>
            )
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;