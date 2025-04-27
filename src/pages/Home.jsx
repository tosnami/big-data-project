import SearchBar from "../components/SearchBar";
import Shortcut from "../components/Shortcut";

function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-green-900 text-white px-4">
      <h1 className="text-6xl font-bold mb-8">big data searh</h1>

      <SearchBar />

      <div className="flex flex-wrap gap-6 justify-center mt-8 ">
        <Shortcut label="GitHub" link="https://github.com" />
        <Shortcut label="YouTube" link="https://youtube.com" />
        <Shortcut label="LinkedIn" link="https://linkedin.com" />
        <Shortcut label="Gmail" link="https://mail.google.com" />
        <Shortcut label="ChatGPT" link="https://chat.openai.com" />
      </div>

      <button className="mt-10 bg-green-700 px-6 py-3 rounded-md hover:bg-green-600 transition">
        Customize Chrome
      </button>
    </div>
  );
}

export default Home;