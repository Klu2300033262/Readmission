import React from 'react';
import { motion } from 'framer-motion';

const getRiskConfig = (level) => {
  switch (level) {
    case 'HIGH RISK':
      return {
        color: '#ef4444',
        bgClass: 'bg-red-50',
        borderClass: 'border-red-200',
        badgeBg: 'bg-red-500',
        badgeText: 'HIGH RISK',
        glow: '0 0 40px rgba(239,68,68,0.25)',
        icon: '🔴',
        emoji: '⚠️',
        gradient: 'from-red-500 to-rose-600',
      };
    case 'MODERATE RISK':
      return {
        color: '#f59e0b',
        bgClass: 'bg-amber-50',
        borderClass: 'border-amber-200',
        badgeBg: 'bg-amber-500',
        badgeText: 'MODERATE RISK',
        glow: '0 0 40px rgba(245,158,11,0.25)',
        icon: '🟡',
        emoji: '⚡',
        gradient: 'from-amber-500 to-orange-500',
      };
    default:
      return {
        color: '#22c55e',
        bgClass: 'bg-emerald-50',
        borderClass: 'border-emerald-200',
        badgeBg: 'bg-emerald-500',
        badgeText: 'LOW RISK',
        glow: '0 0 40px rgba(34,197,94,0.25)',
        icon: '🟢',
        emoji: '✅',
        gradient: 'from-emerald-500 to-green-600',
      };
  }
};

const CircularProgress = ({ probability, color }) => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - probability / 100);

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        {/* Track */}
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        {/* Progress */}
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold text-slate-800 leading-none">{probability}%</span>
        <span className="text-xs text-slate-400 font-medium mt-1">Risk Score</span>
      </div>
    </div>
  );
};

const FEATURES_CONFIG = [
  {
    key: 'number_inpatient',
    label: 'Inpatient Visits',
    icon: '🏥',
    impact: 'High',
    impactColor: 'text-red-600 bg-red-100',
  },
  {
    key: 'time_in_hospital',
    label: 'Hospital Stay Duration',
    icon: '📅',
    impact: 'Medium',
    impactColor: 'text-amber-600 bg-amber-100',
    suffix: ' days',
  },
  {
    key: 'num_medications',
    label: 'Active Medications',
    icon: '💊',
    impact: 'High',
    impactColor: 'text-red-600 bg-red-100',
  },
];

const AI_RECOMMENDATIONS = [
  { icon: '📆', text: 'Schedule follow-up appointment within 7 days of discharge' },
  { icon: '🩺', text: 'Monitor vital signs daily for the first 72 hours' },
  { icon: '💊', text: 'Review medication adherence and adjust treatment plan if necessary' },
  { icon: '🏠', text: 'Consider home health services for high-risk patients' },
];

const PredictionResult = ({ result }) => {
  if (!result) return null;

  const config = getRiskConfig(result.risk_level);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-5"
    >
      {/* ── Main Result Card ── */}
      <div
        className={`rounded-3xl border ${config.borderClass} ${config.bgClass} shadow-2xl overflow-hidden`}
        style={{ boxShadow: config.glow }}
      >
        {/* Top Banner */}
        <div className={`bg-gradient-to-r ${config.gradient} px-8 py-5 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{config.emoji}</span>
            <div>
              <p className="text-white/80 text-sm font-medium">Risk Assessment Complete</p>
              <h2 className="text-white text-2xl font-extrabold tracking-tight">{config.badgeText}</h2>
            </div>
          </div>
          <motion.div
            className="px-5 py-2.5 rounded-full bg-white/25 backdrop-blur-sm text-white font-bold text-sm border border-white/30"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            {result.risk_level}
          </motion.div>
        </div>

        {/* Progress + Patient Info */}
        <div className="px-8 py-7 flex flex-col md:flex-row items-center gap-8">
          <CircularProgress probability={result.probability} color={config.color} />

          <div className="flex-1 space-y-3">
            <h3 className="text-xl font-bold text-slate-800">
              {result.patient_name && `Patient: ${result.patient_name}`}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Based on the clinical data provided, the AI model estimates a{' '}
              <span className="font-bold" style={{ color: config.color }}>{result.probability}%</span>{' '}
              probability of hospital readmission within 30 days.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { label: 'Risk Level', value: result.risk_level?.split(' ')[0] || '—', color: config.color },
                { label: 'Probability', value: `${result.probability}%`, color: config.color },
                { label: 'Confidence', value: 'High', color: '#2563eb' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-white/60 rounded-xl p-3 text-center border border-white/40">
                  <p className="text-xs text-slate-400 mb-1">{label}</p>
                  <p className="font-bold text-sm" style={{ color }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column: Insights + Recommendations ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Risk Intelligence Insights */}
        <motion.div
          className="rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            <span className="text-xl">🧠</span>
            <h3 className="font-bold text-slate-800">Risk Intelligence Insights</h3>
          </div>
          <div className="p-5 space-y-3">
            {FEATURES_CONFIG.map((feat, i) => (
              <motion.div
                key={feat.key}
                className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                  {feat.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{feat.label}</p>
                  <p className="text-xs text-slate-400">
                    Value:{' '}
                    <span className="font-bold text-slate-600">
                      {result[feat.key] ?? '—'}{feat.suffix || ''}
                    </span>
                  </p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${feat.impactColor} flex-shrink-0`}>
                  {feat.impact} Impact
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          className="rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <h3 className="font-bold text-slate-800">AI-Powered Recommendations</h3>
          </div>
          <div className="p-5 space-y-3">
            {AI_RECOMMENDATIONS.map((rec, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.08 }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm flex-shrink-0 shadow-sm">
                  {rec.icon}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{rec.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PredictionResult;
