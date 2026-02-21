import React, { useState, useEffect } from 'react';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({
    total_predictions: 0,
    high_risk_percentage: 0,
    low_risk_percentage: 0,
    average_risk_score: 0,
    recent_predictions: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('http://localhost:5000/analytics');
      const data = await response.json();
      setAnalytics(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="analytics-container">
        <div className="loading">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2>📊 Real-Time Risk Dashboard</h2>
        <p>Live analytics from patient readmission predictions</p>
      </div>

      <div className="analytics-grid">
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>{analytics.total_predictions}</h3>
            <p>Total Predictions</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3>{analytics.high_risk_percentage}%</h3>
            <p>High Risk Patients</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{analytics.low_risk_percentage}%</h3>
            <p>Low Risk Patients</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{analytics.average_risk_score}%</h3>
            <p>Average Risk Score</p>
          </div>
        </div>
      </div>

      <div className="recent-predictions">
        <h3>Recent Predictions</h3>
        <div className="predictions-list">
          {analytics.recent_predictions.map((prediction, index) => (
            <div key={index} className="prediction-item">
              <div className={`risk-badge ${prediction.risk_level === 'HIGH RISK' ? 'high' : 'low'}`}>
                {prediction.risk_level}
              </div>
              <div className="risk-score">{prediction.probability}%</div>
              <div className="prediction-time">
                {new Date(prediction.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
