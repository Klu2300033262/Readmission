import React from 'react';
import { motion } from 'framer-motion';

const getRiskConfig = (level) => {
  if (level === 'HIGH RISK') {
    return {
      badge: 'bg-red-100 text-red-700 border border-red-200',
      dot: 'bg-red-500',
      text: 'HIGH',
      icon: '🔴',
    };
  }
  if (level === 'MODERATE RISK') {
    return {
      badge: 'bg-amber-100 text-amber-700 border border-amber-200',
      dot: 'bg-amber-500',
      text: 'MOD',
      icon: '🟡',
    };
  }
  return {
    badge: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    dot: 'bg-emerald-500',
    text: 'LOW',
    icon: '🟢',
  };
};

const formatTime = (ts) => {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '--:--';
  }
};

const formatDate = (ts) => {
  try {
    return new Date(ts).toLocaleDateString([], { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
};

const RecentActivity = ({ analytics }) => {
  const predictions = (analytics?.recent_predictions || []).slice(-12).reverse();

  return (
    <motion.div
      className="h-full rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.35 }}
    >
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-blue-500 to-purple-600" />
          <h3 className="font-bold text-slate-800 text-base">Recent Activity</h3>
        </div>
        <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
          {predictions.length} records
        </span>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ maxHeight: 340 }}>
        {predictions.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-slate-400 gap-2">
            <span className="text-3xl">📋</span>
            <p className="text-sm">No predictions yet</p>
            <p className="text-xs">Run an assessment to see activity</p>
          </div>
        ) : (
          predictions.map((pred, index) => {
            const config = getRiskConfig(pred.risk_level);
            return (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200 group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                {/* Risk dot */}
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${config.dot}`} />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${config.badge}`}>
                      {config.text}
                    </span>
                    {pred.patient_name && (
                      <span className="text-xs text-slate-600 font-medium truncate">
                        {pred.patient_name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {formatDate(pred.timestamp)} · {formatTime(pred.timestamp)}
                  </p>
                </div>

                {/* Probability */}
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-slate-700">{pred.probability}%</p>
                  <p className="text-xs text-slate-400">risk</p>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-100">
        <p className="text-xs text-slate-400 text-center">Showing last {Math.min(predictions.length, 12)} predictions</p>
      </div>
    </motion.div>
  );
};

export default RecentActivity;
