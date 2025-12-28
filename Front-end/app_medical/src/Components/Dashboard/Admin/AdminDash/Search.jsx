import React from 'react';
import { Bell } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { readAllNotifications } from '../../../../redux/slices/Contact/allContact';

function Search() {
  const { user } = useSelector((state) => state.auth);
  const { contacts } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const unreadCount = contacts.filter(c => !c.read).length;

  const handleBellClick = () => {
    dispatch(readAllNotifications());
    navigate('/admin/contact-history');
  };

  return (
    <div className="flex justify-between items-center p-4  shadow-md rounded-xl">
      <div className="font-semibold text-gray-800 text-lg">
        BIENVENUE, {user?.name.toUpperCase()}
      </div>

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
      </div>
    </div>
  );
}

export default Search;
