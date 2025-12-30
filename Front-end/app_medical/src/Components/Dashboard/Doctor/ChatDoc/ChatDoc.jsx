import React, { useState, useEffect, useRef } from "react";
import { Send, CloudUpload } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDoctorPatients } from "../../../../redux/slices/Doctors/doctorPatients";
import { fetchMessages, sendMessage } from "../../../../redux/slices/Chat/chatSlice";
import { FaUserNurse } from "react-icons/fa";
export default function ChatDoctor() {
  const dispatch = useDispatch();
  const { patients } = useSelector((state) => state.doctorPatients);
  const { messagesByUser, loading } = useSelector((state) => state.messages);
  const currentUser = useSelector((state) => state.auth.user);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    dispatch(fetchDoctorPatients());
  }, [dispatch]);

  useEffect(() => {
    if (selectedPatient) {
      dispatch(fetchMessages(selectedPatient?.user?.id));
    }
  }, [dispatch, selectedPatient]);

  useEffect(() => {
    setTimeout(() => chatRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, [messagesByUser, selectedPatient]);

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedPatient) return;

    await dispatch(
      sendMessage({
        receiver_id: selectedPatient?.user?.id,
        type: "text",
        message: newMessage,
      })
    ).unwrap();

    setNewMessage("");
    dispatch(fetchMessages(selectedPatient?.user?.id));
  };

  const handleUpload = async (e) => {
    if (!selectedPatient) return;
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("receiver_id", selectedPatient?.user?.id);
    formData.append("type", file.type.startsWith("image") ? "image" : "file");
    formData.append("file", file);

    await dispatch(sendMessage(formData)).unwrap();
    dispatch(fetchMessages(selectedPatient.user.id));
  };

  const msgs =
    selectedPatient && Array.isArray(messagesByUser[selectedPatient?.user?.id])
      ? messagesByUser[selectedPatient?.user?.id]
      : [];

  return (
    <div className="flex h-[85vh] bg-white shadow-xl rounded-xl overflow-hidden">
      {/* Sidebar Patients */}
      <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
        <h2 className="font-bold text-lg mb-3">Patients</h2>

        {patients.map((pt) => (
          <div
            key={pt.id}
            onClick={() => setSelectedPatient(pt)}
            className={`p-3 rounded-lg cursor-pointer mb-2 hover:bg-blue-100 ${
              selectedPatient?.id === pt.id ? "bg-blue-200 " : ""
            }`}
          >
            <div className="flex items-center gap-4 ">
                <FaUserNurse size={25} className="text-blue-600"/>
            <h1 className="text-lg">{pt.user.name}</h1> 
            </div>
           
           
          </div>
        ))}
      </aside>

      {/* Chat */}
      <main className="flex-1 flex flex-col">
        <header className="p-4 border-b border-gray-200 bg-white shadow-sm">
          <h3 className="text-xl font-bold">
            {selectedPatient?.user?.name || "Select a patient"}
          </h3>
        </header>

        <div className="flex-1 p-4 overflow-y-auto">
          {loading && <p className="text-gray-400 text-center">Loading messages...</p>}

          {!loading && msgs.length === 0 && selectedPatient && (
            <p className="text-gray-400 text-center">No messages yet</p>
          )}

          {msgs.map((m, i) => (
            <div
              key={i}
              className={`flex mb-2 ${m.sender_id === currentUser.id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-xl max-w-xs ${
                  m.sender_id === currentUser.id ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {m.type === "text" && <p>{m.message}</p>}
                {m.type === "image" && m.message && (
                  <img
                    src={m.message.startsWith("http") ? m.message : `http://127.0.0.1:8000${m.message}`}
                    alt="upload"
                    className="rounded-md max-h-60 mt-1"
                  />
                )}
                {m.type === "file" && m.message && (
                  <a
                    href={m.message.startsWith("http") ? m.message : `http://127.0.0.1:8000${m.message}`}
                    download
                    className="underline text-sm block mt-1"
                  >
                    Download the file
                  </a>
                )}
              </div>
            </div>
          ))}
          <div ref={chatRef} />
        </div>

        <div className="p-4 flex gap-2 border-t border-gray-300">
          <input type="file" onChange={handleUpload} className="hidden" id="fileUpload" />
          <label
            htmlFor="fileUpload"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-blue-600 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <CloudUpload size={18} /> Upload
          </label>

          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Write a message..."
            className="flex-1 p-2 border border-gray-300 rounded-full"
          />
          <button onClick={handleSend} className="bg-blue-600  text-white px-5 rounded-full">
            <Send size={18} />
          </button>
        </div>
      </main>
    </div>
  );
}
