import React from 'react';

const ResultCard = ({ result, loading }) => {
  if (loading) {
    return (
      <div className="result-card loading">
        <div className="loading-spinner"></div>
        <p>Analyzing patient data...</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const { prediction, risk_level, probability } = result;
  const isHighRisk = prediction === 1;

  return (
    <div className={`result-card ${isHighRisk ? 'high-risk' : 'low-risk'}`}>
      <div className="result-header">
        <div className="risk-badge">
          {isHighRisk ? '⚠️' : '✅'}
          <span>{risk_level}</span>
        </div>
      </div>
      
      <div className="result-content">
        <div className="probability-section">
          <h3>Risk Probability</h3>
          <div className="probability-display">
            <div className="probability-bar">
              <div 
                className={`probability-fill ${isHighRisk ? 'high' : 'low'}`}
                style={{ width: `${probability}%` }}
              ></div>
            </div>
            <span className="probability-text">{probability}%</span>
          </div>
        </div>

        <div className="recommendations">
          <h4>Recommendations</h4>
          {isHighRisk ? (
            <ul>
              <li>Consider extended monitoring period</li>
              <li>Schedule follow-up appointment within 7 days</li>
              <li>Review medication adherence</li>
              <li>Coordinate with care management team</li>
            </ul>
          ) : (
            <ul>
              <li>Standard discharge protocols apply</li>
              <li>Routine follow-up care</li>
              <li>Patient education on warning signs</li>
              <li>Maintain current medication regimen</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
