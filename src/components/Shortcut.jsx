function Shortcut({ label, link }) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center"
      >
        <div className="bg-white rounded-full p-4 hover:bg-black">
          {label[0]}
        </div>
        <span className="mt-2 text-sm">{label}</span>
      </a>
    );
  }
  
  export default Shortcut;