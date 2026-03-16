import React from 'react';
import { motion } from 'framer-motion';

const STATS = (analytics) => [
  {
    title: 'Total Predictions',
    value: analytics?.total_predictions ?? 0,
    icon: '📊',
    accent: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    textColor: 'text-blue-600',
    description: 'Assessments run',
  },
  {
    title: 'High Risk %',
    value: `${analytics?.high_risk_percentage ?? 0}%`,
    icon: '🔴',
    accent: 'from-red-500 to-rose-600',
    bg: 'bg-red-50',
    iconBg: 'bg-red-100',
    textColor: 'text-red-600',
    description: 'Flagged patients',
  },
  {
    title: 'Low Risk %',
    value: `${analytics?.low_risk_percentage ?? 0}%`,
    icon: '🟢',
    accent: 'from-emerald-500 to-green-600',
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    textColor: 'text-emerald-600',
    description: 'Safe discharges',
  },
  {
    title: 'Avg Risk Score',
    value: `${analytics?.average_risk_score ?? 0}%`,
    icon: '📈',
    accent: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    iconBg: 'bg-violet-100',
    textColor: 'text-violet-600',
    description: 'Mean probability',
  },
];

const DashboardStats = ({ analytics }) => {
  const stats = STATS(analytics);

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1.5 h-7 rounded-full bg-gradient-to-b from-blue-500 to-purple-600" />
        <h2 className="text-lg font-bold text-slate-800">Dashboard Overview</h2>
        {!analytics && (
          <span className="ml-2 text-xs text-slate-400 italic">Connect backend to see live stats</span>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg stat-card-hover cursor-default"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            {/* Top accent bar */}
            <div className={`h-1 w-full bg-gradient-to-r ${stat.accent}`} />

            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${stat.iconBg} flex items-center justify-center text-xl shadow-sm`}>
                  {stat.icon}
                </div>
                <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${stat.bg} ${stat.textColor}`}>
                  LIVE
                </div>
              </div>

              <div className="space-y-1">
                <p className={`text-3xl font-extrabold tracking-tight ${stat.textColor}`}>
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-slate-700">{stat.title}</p>
                <p className="text-xs text-slate-400">{stat.description}</p>
              </div>
            </div>

            {/* Decorative circle */}
            <div
              className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${stat.accent} opacity-5`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;
