import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { TrendingUp } from "lucide-react"; 

const data = [
  { name: "Jan", rdv: 40, fill: "#3b82f6" },
  { name: "Fév", rdv: 65, fill: "#8b5cf6" },
  { name: "Mar", rdv: 30, fill: "#10b981" },
  { name: "Avr", rdv: 80, fill: "#f59e0b" },
];
function GraphiquePatients() {
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 bg-gray-50 ">
        
     
      <div className="lg:col-span-2  rounded-2xl shadow-xl border border-gray-200 p-6 h-[400px] flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-blue-100">
        <div className="mb-6 flex justify-between items-center">
        
            <h3 className="text-2xl font-bold text-gray-900">
              Appointments per month
            </h3>
          </div>
          
       

        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false}
                stroke="#e5e7eb"
              />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 14, fontWeight: 500 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 14 }}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  background: "white",
                  padding: "16px",
                  fontSize: "14px",
                }}
                formatter={(value) => [`${value} RDV`, "Nombre"]}
                labelStyle={{ fontWeight: "bold", color: "#374151" }}
                cursor={{ fill: "rgba(59, 130, 246, 0.05)" }}
              />
              <Bar
                dataKey="rdv"
                radius={[8, 8, 0, 0]}
                barSize={50}
                className="transition-all duration-300 hover:opacity-90"
                animationDuration={1500}
                animationEasing="ease-in-out"
              >
                {data.map((entry, index) => (
                  <rect
                    key={`bar-${index}`}
                    fill={entry.fill}
                    style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.05))" }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 flex items-center justify-center space-x-6">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-sm text-gray-600 font-medium">
                {item.name}: {item.rdv} RDV
              </span>
            </div>
          ))}
        </div>
      </div>

        
      <div className=" rounded-2xl shadow-xl border border-gray-200 p-6 h-[400px] flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-blue-100">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Calendar
          </h3>
          
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full h-full">
            <Calendar
              className="custom-calendar rounded-xl border border-gray-200 shadow-sm w-full h-full"
              tileClassName="rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:font-semibold"
              navigationLabel={({ label}) => (
                <span className="font-bold text-gray-800">{label}</span>
              )}
              formatShortWeekday={(locale, date) => 
                ['D', 'L', 'M', 'M', 'J', 'V', 'S'][date.getDay()]
              }
              tileContent={({ date, view }) => 
                view === 'month' && date.getDate() === new Date().getDate() ? (
                  <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></div>
                ) : null
              }
            />
          </div>
        </div>

      
      </div>
    </div>
  );
}

export default GraphiquePatients;