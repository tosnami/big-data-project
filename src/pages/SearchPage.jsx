import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://api.github.com/search/users?q=${searchTerm}`);
        setUsers(response.data.items || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    if (searchTerm) {
      fetchUsers();
    }
  }, [searchTerm]);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-green-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">نتيجة البحث عن: "{searchTerm}"</h1>

      {users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-green-800 p-6 rounded shadow-lg text-center">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-bold">{user.login}</h2>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 underline"
              >
                زيارة البروفايل
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>لا يوجد مستخدمين بهذا الاسم أو جاري التحميل...</p>
      )}
    </div>
  );
}

export default SearchPage;