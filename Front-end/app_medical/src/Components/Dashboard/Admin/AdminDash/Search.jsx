import React from 'react';
import { Bell,MessageCircle } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { readAllNotifications } from '../../../../redux/slices/Contact/allContact';

function Search() {
  const { user } = useSelector((state) => state.auth);
  const { contacts } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { messagesByUser } = useSelector((state) => state.messages);
  const currentUser = useSelector((state) => state.auth.user);

  const unreadCount = contacts.filter(c => !c.read).length;

  const handleBellClick = () => {
    dispatch(readAllNotifications());
    navigate('/admin/contact-history');
  };

  return (
    <div className="flex justify-between items-center p-4  shadow-md rounded-xl">
      <div className="font-semibold text-gray-800 text-lg">
        WELCOME, {user?.name.toUpperCase()}
      </div>
      {
        user.role==='admin'?(
        <div
        className="relative cursor-pointer group transition-transform hover:scale-110"
        onClick={handleBellClick}
      >
        
        <Bell className="transition-colors duration-200 text-blue-500" hover:size={28} />

        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold 
                           rounded-full w-6 h-6 flex items-center justify-center shadow-md 
                           animate-pulse">
            {unreadCount}
          </span>
        )}
      </div>):(   
        <>  
        <MessageCircle size={22} />
          
          {Object.values(messagesByUser || {})
            .flat()
            .filter(msg => msg.receiver_id === currentUser.id && msg.is_read === 0)
            .length > 0 && (
              <span className="absolute top-8 right-8 bg-[#DBF5F3] text-blue-600 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {Object.values(messagesByUser || {})
                  .flat()
                  .filter(msg => msg.receiver_id === currentUser.id && msg.is_read === 0)
                  .length}
              </span>
          )}
        </>
      )
      }
      
    </div>
  );
}

export default Search;
