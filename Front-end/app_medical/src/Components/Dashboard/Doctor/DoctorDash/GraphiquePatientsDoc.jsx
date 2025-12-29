import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import { parseISO, getMonth, getYear } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function GraphiquePatientsDoc() {
  const { appointments: myAppointments } = useSelector(state => state.myAppointmentsDoc);

  const monthNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
  const counts = {}; 

  myAppointments?.forEach(appt => {
    if (appt?.appointment_date && appt?.appointment_time) {
      const isoDate = `${appt.appointment_date}T${appt.appointment_time}`;
      const date = parseISO(isoDate);
      const monthYear = `${monthNames[getMonth(date)]} ${getYear(date)}`;
      
      if (!counts[monthYear]) counts[monthYear] = 0;
      counts[monthYear] += 1;
    }
  });

  const data = Object.keys(counts).map(key => ({
    name: key,
    rdv: counts[key],
    fill: "#66CDAA"
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      
      <div className="lg:col-span-2 rounded-2xl shadow-xl border border-gray-200 p-6 h-[400px] flex flex-col">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Rendez-vous par mois</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "gray", fontSize: 14 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "gray", fontSize: 14 }} />
            <Tooltip formatter={(value) => [`${value} RDV`, "Nombre"]} />
            <Bar dataKey="rdv" radius={[8, 8, 0, 0]} barSize={50} animationDuration={1500} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl shadow-xl border border-gray-200 p-6 h-[400px] flex flex-col">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Calendrier</h3>
        <div className="flex-1">
          <Calendar
            className="custom-calendar rounded-xl border border-gray-200 shadow-sm w-full h-full"
            tileClassName="rounded-lg transition-all duration-200   hover:font-semibold"
            navigationLabel={({ label }) => <span className="font-bold text-gray-800">{label}</span>}
            formatShortWeekday={(locale, date) => ['D', 'L', 'M', 'M', 'J', 'V', 'S'][date.getDay()]}
            tileContent={({ date, view }) =>
              view === 'month' && date.getDate() === new Date().getDate() ? (
                <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></div>
              ) : null
            }
          />
        </div>
      </div>
    </div>
  );
}

export default GraphiquePatientsDoc;
