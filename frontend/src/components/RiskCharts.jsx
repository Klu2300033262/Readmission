import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { motion } from 'framer-motion';

const HIGH_COLOR = '#ef4444';
const LOW_COLOR = '#22c55e';
const MOD_COLOR = '#f59e0b';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip text-slate-700">
        <p className="font-semibold">{payload[0].name}</p>
        <p className="text-blue-600 font-bold">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const BarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip text-slate-700">
        <p className="font-semibold text-xs text-slate-500 mb-1">{label}</p>
        <p className="font-bold text-base">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const getRiskColor = (level) => {
  if (level === 'HIGH RISK') return HIGH_COLOR;
  if (level === 'MODERATE RISK') return MOD_COLOR;
  return LOW_COLOR;
};

const RiskCharts = ({ analytics }) => {
  const pieData = [
    { name: 'High Risk', value: analytics?.high_risk_percentage || 0 },
    { name: 'Low Risk', value: analytics?.low_risk_percentage || 0 },
  ];

  const barData = (analytics?.recent_predictions || [])
    .slice(-8)
    .map((pred, i) => ({
      name: pred.patient_name || `Patient ${i + 1}`,
      risk: pred.probability,
      level: pred.risk_level,
      fill: getRiskColor(pred.risk_level),
    }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
      {/* Donut Chart */}
      <motion.div
        className="rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg p-5"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-blue-500 to-purple-600" />
          <h3 className="font-bold text-slate-800 text-base">Risk Distribution</h3>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={HIGH_COLOR} />
              <Cell fill={LOW_COLOR} />
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <span className="legend-dot" style={{ backgroundColor: HIGH_COLOR }} />
            <span className="text-xs text-slate-600 font-medium">High Risk</span>
            <span className="text-xs font-bold text-red-600">{pieData[0].value}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="legend-dot" style={{ backgroundColor: LOW_COLOR }} />
            <span className="text-xs text-slate-600 font-medium">Low Risk</span>
            <span className="text-xs font-bold text-emerald-600">{pieData[1].value}%</span>
          </div>
        </div>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        className="rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg p-5"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-blue-500 to-purple-600" />
          <h3 className="font-bold text-slate-800 text-base">Recent Risk Scores</h3>
        </div>

        {barData.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-slate-400 text-sm">
            No recent predictions yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<BarTooltip />} cursor={{ fill: 'rgba(148,163,184,0.08)' }} />
              <Bar dataKey="risk" radius={[6, 6, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </motion.div>
    </div>
  );
};

export default RiskCharts;
