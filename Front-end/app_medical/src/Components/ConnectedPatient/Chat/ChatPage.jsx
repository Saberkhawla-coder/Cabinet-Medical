import React, { useState, useEffect, useRef } from "react";
import { Send, CloudUpload } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyAppointments } from "../../../redux/slices/Appointments/myAppointmentsSlice";
import { fetchMessages, sendMessage } from "../../../redux/slices/Chat/chatSlice";
import { FaUserDoctor } from "react-icons/fa6";
import {markMessagesAsRead} from '../../../redux/slices/Chat/chatSlice'
import {Link} from 'react-router-dom'
export default function ChatPage() {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.myAppointments);
  const { messagesByUser, loading } = useSelector((state) => state.messages);
  const currentUser = useSelector((state) => state.auth.user);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMyAppointments());
  }, [dispatch]);

  useEffect(() => {
    if (selectedDoctor) {
      dispatch(fetchMessages(selectedDoctor?.user?.id));
    }
  }, [dispatch, selectedDoctor]);

  useEffect(() => {
    setTimeout(() => chatRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, [messagesByUser, selectedDoctor]);


  const handleSendText = async () => {
  if (!newMessage.trim() || !selectedDoctor) return;

  const msgPayload = {
    receiver_id: selectedDoctor.user.id,
    type: "text",
    message: newMessage,
  };

 await dispatch(sendMessage(msgPayload)).unwrap();

  setNewMessage("");
};


  const handleUpload = async (e) => {
    if (!selectedDoctor) return;
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("receiver_id", selectedDoctor?.user?.id);
    formData.append("type", file.type.startsWith("image") ? "image" : "file");
    formData.append("file", file);

    await dispatch(sendMessage(formData)).unwrap();
    dispatch(fetchMessages(selectedDoctor?.user?.id));
  };

  const doctors = appointments
    .map((appt) => appt.doctor)
    .filter((doc, index, self) => index === self.findIndex((d) => d.id === doc.id));

  const selectedUserId = selectedDoctor?.user?.id;


 const msgs =
  selectedUserId && Array.isArray(messagesByUser[selectedUserId])
    ? messagesByUser[selectedUserId]
    : [];
  const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
useEffect(() => {
  if (selectedDoctor) {
    dispatch(fetchMessages(selectedDoctor.user.id));
    dispatch(markMessagesAsRead(selectedDoctor.user.id)); 
  }
}, [dispatch, selectedDoctor]);

  return (
    <div className="min-h-screen">
      <header className="text-center py-4 ">
        <Link to='/' className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
          HealthCare Chat
        </Link>
      </header>

      <div className="flex h-[85vh] max-w-7xl mx-auto mt-6 shadow-2xl rounded-xl overflow-hidden bg-white">
       
        <aside className="w-64 bg-gray-50 p-4 border-r border-gray-200 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">My Doctors</h2>
          <ul className="space-y-3">
            {doctors.map((doc) => (
              <li
                key={doc.id}
                onClick={() => setSelectedDoctor(doc)}
                className={`p-3 rounded-xl cursor-pointer flex items-center gap-3 hover:bg-blue-100 transition-all ${
                  selectedDoctor?.id === doc.id ? "bg-blue-200 font-semibold shadow" : ""
                }`}
              >
                {doc.img ? (
                  <img
                    src={`http://127.0.0.1:8000/storage/${doc.img}`}
                    alt={doc.user.name}
                    className="w-12 h-12 rounded-full object-cover shadow-sm"
                  />
                ) : (
                  <FaUserDoctor className="w-12 h-12 text-sky-600" />
                )}
                <div className="flex flex-col">
                  <span className="text-gray-800">{doc.user.name}</span>
                  <small className="text-gray-500">{doc.specialty}</small>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col bg-gray-50">
          <header className="flex items-center justify-between p-4 border-b border-sky-600 bg-white shadow-sm">
            <div>
              <h3 className="text-xl font-bold">
                {selectedDoctor?.user.name || "Select a doctor"}
              </h3>
              <p className="text-sm text-gray-500">{selectedDoctor?.specialty}</p>
            </div>
          </header>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {loading && <p className="text-gray-400 text-center mt-4">Loading messages...</p>}
            {!loading && msgs.length === 0 && selectedDoctor && (
              <p className="text-gray-400 text-center mt-4">No messages yet</p>
            )}

            {msgs.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender_id === currentUser.id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-xs shadow-md break-words ${
                    msg.sender_id === currentUser.id
                      ? "bg-sky-600 text-white"
                      : "bg-gray-200 text-gray-800 border border-gray-200"
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
                      Download the file
                    </a>
                  )}
                  {msg.created_at && (
                    <span className="text-xs opacity-70 block mt-1 text-right">
                      {formatTime(msg.created_at)}
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            <div ref={chatRef} />
          </div>

        
          <div className="p-4 border-t border-gray-200 flex items-center gap-3 bg-white sticky bottom-0 shadow-inner">
            <input type="file" onChange={handleUpload} className="hidden" id="fileUpload" />
            <label
              htmlFor="fileUpload"
              className="flex items-center gap-2 px-4 py-2 border border-gray-500 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <CloudUpload size={18} /> Upload
            </label>

            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendText()}
              placeholder="Write a message..."
              className="flex-1 p-2 border border-gray-500 rounded-full"
            />

            <button onClick={handleSendText} className="bg-blue-600 text-white p-3 cursor-pointer rounded-full">
              <Send size={18} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
