import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CloudUpload, Send } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllDoctors } from "../../../redux/slices/Doctors/allDoctors";

export default function ChatPage() {
  const { doctors } = useSelector((state) => state.doctors);
  const dispatch = useDispatch();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [messages, setMessages] = useState([
    { sender: "doctor", type: "text", message: "Hello, how can I help you?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAllDoctors());
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [dispatch, messages]);

  const sendText = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { sender: "patient", type: "text", message: newMessage }]);
    setNewMessage("");
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const fileType = file.type.startsWith("image") ? "image" : "file";
    setMessages([...messages, { sender: "patient", type: fileType, file, url }]);
  };

  return (
    <div className="min-h-screen ">
      <header className="text-center ">
        <Link to="/" className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
          HealthCare
        </Link>
      </header>

      <div className="flex h-[85vh] max-w-7xl mx-auto mt-6 shadow-2xl rounded-xl overflow-hidden bg-white">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-blue-50 to-white p-4 border-r border-gray-200 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Doctors</h2>
          <ul className="space-y-3">
            {doctors.map((doc) => (
              <li
                key={doc?.id}
                onClick={() => setSelectedDoctor(doc)}
                className={`p-3 rounded-xl cursor-pointer flex items-center gap-3 transition-all hover:bg-blue-100
                ${selectedDoctor?.id === doc?.id ? "bg-blue-200 font-semibold shadow" : ""}`}
              >
                <img
                  src={`http://127.0.0.1:8000/storage/${doc?.img}`}
                  className="w-12 h-12 rounded-full object-cover shadow-sm"
                  alt={doc?.user?.name}
                />
                <div className="flex flex-col">
                  <span className="text-gray-800">{doc?.user?.name}</span>
                  <small className="text-gray-500">{doc?.specialty}</small>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col bg-gray-50">
          {/* Chat Header */}
          <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm">
            <div>
              <h3 className="text-xl font-bold">{selectedDoctor?.user?.name || "Select a doctor"}</h3>
              <p className="text-sm text-gray-500">{selectedDoctor?.specialty}</p>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-xs shadow-md break-words
                  ${msg.sender === "patient" ? "bg-blue-600 text-white" : "bg-white text-gray-800 border border-gray-200"}`}
                >
                  {msg.type === "text" && <p>{msg.message}</p>}
                  {msg.type === "image" && <img src={msg.url} alt="upload" className="rounded-md max-h-60 mt-1" />}
                  {msg.type === "file" && (
                    <a href={msg.url} download className="underline text-sm block mt-1">
                      Download file
                    </a>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 flex items-center gap-3 bg-white sticky bottom-0 shadow-inner">
            <input
              type="file"
              onChange={handleUpload}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-all"
            >
              <CloudUpload className="w-5 h-5" /> Upload
            </label>

            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendText()}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
            />

            <button
              onClick={sendText}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition-all"
            >
              <Send className="w-5 h-5" /> Send
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
