import React, {useEffect} from 'react';
import ContactHistory from './ContactHistory';
import { User, Mail, Calendar, Plus ,MessageSquareHeart} from "lucide-react";
import {useSelector } from 'react-redux';
import { toast } from 'sonner';


function ContactHisCard() {
  const { contacts } = useSelector((state) => state.contacts);

const now = new Date();

const startOfWeek = new Date(now);
startOfWeek.setDate(now.getDate() - now.getDay());
startOfWeek.setHours(0, 0, 0, 0);

const messagesThisWeek = contacts.filter((msg) => {
  const date = new Date(msg.created_at);
  return date >= startOfWeek;
}).length;


const messagesThisMonth = contacts.filter((msg) => {
  const date = new Date(msg.created_at);
  return (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}).length;
const unread = contacts.filter(c => !c.read).length;
  useEffect(() => {
    if (unread > 0) {
        toast.info(
    <div className="flex items-center gap-2">
      <MessageSquareHeart className="w-5 h-5" />
      <span>Vous avez {unread} nouveau(x) message(s)</span>
    </div>
  );
    }
  }, [unread]);
  return (
    <div className="m-8">
    

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Historique des Contacts</h1>
        <p className="text-gray-600 mt-2">
          Consultez et gérez tous les messages envoyés via le formulaire de contact
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-xl">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Total Messages</p>
              <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
            </div>
          </div>
        </div>

       

        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Messages cette semaine</p>
              <p className="text-2xl font-bold text-gray-900">{messagesThisWeek}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Plus className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Nouveaux ce mois</p>
              <p className="text-2xl font-bold text-gray-900">{messagesThisMonth}</p>
            </div>
          </div>
        </div>
      </div>

     
      <ContactHistory />
    </div>
  );
}

export default ContactHisCard;
