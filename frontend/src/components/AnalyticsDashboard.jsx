import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = ({ analytics }) => {
  const riskData = [
    { name: 'High Risk', value: analytics.high_risk_percentage, color: '#EF4444' },
    { name: 'Low Risk', value: analytics.low_risk_percentage, color: '#22C55E' }
  ];

  // Safety check for recent_predictions
  const recentPredictions = analytics.recent_predictions || [];
  console.log('Recent predictions data:', recentPredictions); // Debug log

  const recentData = recentPredictions.map((pred, index) => ({
    label: `${pred.patient_name || 'Unknown Patient'} – ${new Date(pred.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    patient_name: pred.patient_name || 'Unknown Patient',
    time: new Date(pred.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    risk: pred.probability,
    level: pred.risk_level,
    // Force side-by-side layout by manipulating data
    x: index * 50, // Fixed position for each bar
    width: 45, // Fixed width for all bars
    barSize: 45,
    maxBarSize: 45
  }));

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2>📊 Real-Time Risk Dashboard</h2>
        <p>Live analytics from patient readmission predictions</p>
      </div>

      <div className="analytics-grid">
        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>{analytics.total_predictions}</h3>
            <p>Total Predictions</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3>{analytics.high_risk_percentage}%</h3>
            <p>High Risk Patients</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{analytics.low_risk_percentage}%</h3>
            <p>Low Risk Patients</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{analytics.average_risk_score}%</h3>
            <p>Average Risk Score</p>
          </div>
        </motion.div>
      </div>

      <div className="analytics-charts">
        <motion.div 
          className="chart-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                backgroundColor="#E5E7EB"
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="chart-legend">
            {riskData.map((item, index) => (
              <div key={index} className="legend-item">
                <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                <span>{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="chart-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3>Recent Predictions</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width={1200} height={300}>
              <BarChart data={recentData} margin={{ top: 20, right: 30, left: 80, bottom: 100 }} barGap={0}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="label"
                  tick={{ fill: '#64748B', fontSize: 11 }}
                  stroke="#E5E7EB"
                  angle={0}
                  textAnchor="middle"
                  interval={0}
                  height={60}
                />
                <YAxis 
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  stroke="#E5E7EB"
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                  formatter={(value, name, props) => {
                    if (props.payload) {
                      const name = props.payload.patient_name || 'Unknown Patient';
                      const truncatedName = name.length > 18 ? name.substring(0, 18) + '...' : name;
                      return [
                        `Patient: ${truncatedName}`,
                        `Time: ${props.payload.time}`,
                        `Risk: ${props.payload.risk}%`
                      ];
                    }
                    return value;
                  }}
                />
                <Bar 
                  dataKey="risk" 
                  fill={(entry) => entry.level === 'HIGH RISK' ? '#1F2937' : '#059669'}
                  radius={[8, 8, 0, 0]}
                  barSize={45}
                  maxBarSize={45}
                  barGap={0}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="recent-predictions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h3>Recent Activity</h3>
        <div className="predictions-list">
          {recentPredictions.reverse().map((prediction, index) => (
            <motion.div
              key={index}
              className="prediction-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className={`risk-badge ${prediction.risk_level === 'HIGH RISK' ? 'high' : 'low'}`}>
                {prediction.risk_level}
              </div>
              <div className="prediction-details">
                <div className="patient-name-row">
                  Patient: {prediction.patient_name || 'Unknown Patient'}
                </div>
                <div className="prediction-info-row">
                  <span className="risk-score">{prediction.probability}%</span>
                  <span className="prediction-time">
                    {new Date(prediction.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;
