import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area
} from 'recharts';
import {
  Sun, Users, DollarSign, Zap, TrendingUp, AlertCircle,
  CheckCircle, Clock, Battery, Calendar
} from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ElementType;
  change?: number;
  color?: "orange" | "green" | "blue" | "yellow";
  onClick?: () => void;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, change, color = "orange", onClick }) => (
  <div
    className={`bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-600 hover:bg-gray-800 transition-all duration-300 ${
      onClick ? 'cursor-pointer hover:scale-105' : ''
    }`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
        {change !== undefined && (
          <p className={`text-sm mt-1 flex items-center ${
            change > 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            <TrendingUp size={16} className="mr-1" />
            {change > 0 ? '+' : ''}{change}%
          </p>
        )}
      </div>
      <div className={`p-3 rounded-full ${
        color === 'orange' ? 'bg-orange-500' :
        color === 'green' ? 'bg-green-500' :
        color === 'blue' ? 'bg-blue-500' :
        'bg-yellow-500'
      }`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

type AlertType = 'success' | 'warning' | 'info';

type AlertCardProps = {
  type: AlertType;
  message: string;
  time: string;
  onDismiss?: () => void;
};

const AlertCard: React.FC<AlertCardProps> = ({ type, message, time, onDismiss }) => (
  <div className="flex items-start space-x-3 p-3 bg-gray-900 rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors">
    <div className={`p-2 rounded-full ${
      type === 'success' ? 'bg-green-500' :
      type === 'warning' ? 'bg-yellow-500' :
      'bg-blue-500'
    }`}>
      {type === 'success' ? <CheckCircle size={16} className="text-white" /> :
       type === 'warning' ? <AlertCircle size={16} className="text-white" /> :
       <Clock size={16} className="text-white" />}
    </div>
    <div className="flex-1">
      <p className="text-white text-sm">{message}</p>
      <p className="text-gray-400 text-xs mt-1">{time}</p>
    </div>
    {onDismiss && (
      <button
        onClick={onDismiss}
        className="text-gray-400 hover:text-white transition-colors"
      >
        ×
      </button>
    )}
  </div>
);

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [realTimeData, setRealTimeData] = useState(0);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => {
        const variation = (Math.random() - 0.5) * 100;
        const newValue = Math.max(0, Math.min(1000, prev + variation));
        return Math.round(newValue);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const energyData = [
    { name: 'Mon', uv: 400 },
    { name: 'Tue', uv: 300 },
    { name: 'Wed', uv: 500 },
    { name: 'Thu', uv: 200 },
    { name: 'Fri', uv: 450 },
    { name: 'Sat', uv: 380 },
    { name: 'Sun', uv: 600 },
  ];

  const clientTypeData = [
    { name: 'Residential', value: 60 },
    { name: 'Commercial', value: 30 },
    { name: 'Industrial', value: 10 },
  ];

  const projectStatusData = [
    { name: 'Completed', value: 70 },
    { name: 'In Progress', value: 20 },
    { name: 'Pending', value: 10 },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 5000 },
    { name: 'Feb', revenue: 7000 },
    { name: 'Mar', revenue: 6500 },
    { name: 'Apr', revenue: 8000 },
    { name: 'May', revenue: 9000 },
    { name: 'Jun', revenue: 7500 },
    { name: 'Jul', revenue: 8200 },
  ];

  const dailyEnergyData = [
    { name: '00:00', energy: 20 },
    { name: '06:00', energy: 40 },
    { name: '12:00', energy: 80 },
    { name: '18:00', energy: 60 },
    { name: '23:59', energy: 30 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Projects" value="12" icon={Sun} change={5} color="orange" />
        <StatCard title="Clients" value="154" icon={Users} change={8} color="green" />
        <StatCard title="Revenue" value="$24.5K" icon={DollarSign} change={10} color="blue" />
        <StatCard title="Energy Saved" value="12.4 MWh" icon={Zap} change={3} color="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-600 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Energy Generation</h2>
            <select
              className="bg-gray-800 text-white rounded p-1"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={energyData}>
              <CartesianGrid stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="uv" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-600">
            <h2 className="text-lg font-semibold text-white mb-4">Client Types</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={clientTypeData} dataKey="value" nameKey="name" outerRadius={80}>
                  {clientTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={['#34D399', '#60A5FA', '#FBBF24'][index % 3]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-600">
            <h2 className="text-lg font-semibold text-white mb-4">Project Status</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={projectStatusData}>
                <CartesianGrid stroke="#444" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-600 lg:col-span-2">
          <h2 className="text-lg font-semibold text-white mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#FBBF24" fill="#FBBF24" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-600">
          <h2 className="text-lg font-semibold text-white mb-4">Real-Time Monitoring</h2>
          <div className="text-4xl font-bold text-green-400 text-center">{realTimeData} kW</div>
          <p className="text-gray-400 text-center mt-2">Current Power Output</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-600">
          <h2 className="text-lg font-semibold text-white mb-4">Energy Usage Today</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dailyEnergyData}>
              <CartesianGrid stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="energy" stroke="#60A5FA" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-600 space-y-4">
          <h2 className="text-lg font-semibold text-white">Alerts & Notifications</h2>
          <AlertCard type="success" message="New project successfully deployed!" time="Just now" />
          <AlertCard type="warning" message="Battery levels low at Site B." time="15 mins ago" />
          <AlertCard type="info" message="Scheduled maintenance upcoming tomorrow." time="2 hrs ago" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
