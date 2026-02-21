import React from 'react';
import './RiskFactors.css';

const RiskFactors = ({ riskFactors }) => {
  return (
    <div className="risk-factors-container">
      <div className="risk-factors-header">
        <h3>🔎 Key Risk Drivers</h3>
        <p>Top factors contributing to patient's risk score</p>
      </div>
      
      <div className="risk-factors-list">
        {riskFactors.map((factor, index) => (
          <div key={index} className="risk-factor-item">
            <div className="risk-factor-content">
              <div className="risk-factor-icon">
                <span>{index + 1}</span>
              </div>
              <div className="risk-factor-details">
                <h4>{factor.factor}</h4>
                <p>{factor.details}</p>
              </div>
              <div className="risk-factor-score">
                <div className="score-bar">
                  <div 
                    className="score-fill" 
                    style={{ width: `${Math.min(factor.score, 100)}%` }}
                  ></div>
                </div>
                <span className="score-text">{factor.score}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {riskFactors.length === 0 && (
        <div className="no-risk-factors">
          <p>No significant risk factors identified</p>
        </div>
      )}
    </div>
  );
};

export default RiskFactors;
