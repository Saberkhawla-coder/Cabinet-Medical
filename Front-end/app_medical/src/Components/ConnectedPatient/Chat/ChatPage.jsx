import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CloudUpload, Send } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllDoctors } from "../../../redux/slices/Doctors/allDoctors";
import { fetchMessages ,sendMessage} from "../../../redux/slices/Chat/chatSlice";
export default function ChatPage() {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctors);
  const currentUserId = useSelector((state) => state.auth.user.id);
  const { messagesByDoctor, loading } = useSelector((state) => state.messages);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

  useEffect(() => {
    if (selectedDoctor) {
      dispatch(fetchMessages(selectedDoctor.id));
    }
  }, [dispatch, selectedDoctor]);

  useEffect(() => {
    setTimeout(() => {
      chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messagesByDoctor, selectedDoctor]);

  const handleSendText = async () => {
    if (!newMessage.trim() || !selectedDoctor) return;

    await dispatch(
      sendMessage({
        receiver_id: selectedDoctor.id,
        type: "text",
        message: newMessage,
      })
    ).unwrap();

    setNewMessage("");
    dispatch(fetchMessages(selectedDoctor.id));
  };

  const handleUpload = async (e) => {
    if (!selectedDoctor) return;
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("receiver_id", selectedDoctor.id);
    formData.append("type", file.type.startsWith("image") ? "image" : "file");
    formData.append("file", file);

    await dispatch(sendMessage(formData)).unwrap();
  };

  const doctorId = selectedDoctor?.id;
  const filteredMessages =
    selectedDoctor && Array.isArray(messagesByDoctor[doctorId])
      ? messagesByDoctor[doctorId]
      : [];

  return (
    <div className="min-h-screen">
      <header className="text-center">
        <Link
          to="/"
          className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500"
        >
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
                className={`p-3 rounded-xl cursor-pointer flex items-center gap-3 transition-all hover:bg-blue-100 ${
                  selectedDoctor?.id === doc?.id
                    ? "bg-blue-200 font-semibold shadow"
                    : ""
                }`}
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

        {/* Chat area */}
        <main className="flex-1 flex flex-col bg-gray-50">
          <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm">
            <div>
              <h3 className="text-xl font-bold">
                {selectedDoctor?.name || "Select a doctor"}
              </h3>
              <p className="text-sm text-gray-500">{selectedDoctor?.specialty}</p>
            </div>
          </header>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {loading && <p className="text-gray-400 text-center mt-4">Loading messages...</p>}
            {!loading && filteredMessages.length === 0 && selectedDoctor && (
              <p className="text-gray-400 text-center mt-4">No messages yet</p>
            )}

            {filteredMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender_id === currentUserId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-xs shadow-md break-words ${
                    msg.sender_id === currentUserId
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  {msg.type === "text" && <p>{msg.message}</p>}

                  {msg.type === "image" && msg.message && (
                    <img
                      src={msg.message.startsWith("http") ? msg.message : `http://127.0.0.1:8000${msg.message}`}
                      alt="upload"
                      className="rounded-md max-h-60 mt-1"
                    />
                  )}

                  {msg.type === "file" && msg.message && (
                    <a
                      href={msg.message.startsWith("http") ? msg.message : `http://127.0.0.1:8000${msg.message}`}
                      download
                      className="underline text-sm block mt-1"
                    >
                      Download file
                    </a>
                  )}
                </div>
              </div>
            ))}

            <div ref={chatRef} />
          </div>

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
              onKeyDown={(e) => e.key === "Enter" && handleSendText()}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
            />

            <button
              onClick={handleSendText}
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
