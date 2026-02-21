import React from 'react';
import './RiskMeter.css';

const RiskMeter = ({ probability, riskCategory, riskLevel }) => {
  const getRiskColor = (category) => {
    switch (category) {
      case 'Low':
        return '#10b981'; // green-500
      case 'Moderate':
        return '#f59e0b'; // amber-500
      case 'High':
        return '#ef4444'; // red-500
      default:
        return '#6b7280'; // gray-500
    }
  };

  const getRotation = () => {
    // Map probability to rotation angle (0-180 degrees)
    return (probability / 100) * 180 - 90;
  };

  const riskColor = getRiskColor(riskCategory);
  const rotation = getRotation();

  return (
    <div className="risk-meter-container">
      <div className="risk-meter">
        <div className="gauge">
          <div className="gauge-background"></div>
          <div className="gauge-fill" style={{ 
            background: `conic-gradient(from 180deg, ${riskColor} 0deg, ${riskColor} ${probability * 3.6}deg, #e5e7eb ${probability * 3.6}deg)`
          }}></div>
          <div className="gauge-center">
            <div className="risk-percentage">{probability}%</div>
            <div className="risk-category">{riskCategory}</div>
            <div className="risk-level">{riskLevel}</div>
          </div>
        </div>
      </div>
      
      <div className="risk-legend">
        <div className="legend-item low">
          <div className="legend-color"></div>
          <span>Low (0-30%)</span>
        </div>
        <div className="legend-item moderate">
          <div className="legend-color"></div>
          <span>Moderate (30-60%)</span>
        </div>
        <div className="legend-item high">
          <div className="legend-color"></div>
          <span>High (60%+)</span>
        </div>
      </div>
    </div>
  );
};

export default RiskMeter;
