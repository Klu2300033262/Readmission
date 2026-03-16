import React from 'react';
import { motion } from 'framer-motion';
import './RiskFactors.css';

const RiskFactors = ({ factors }) => {
  const getFactorIcon = (factorName) => {
    if (factorName.toLowerCase().includes('admission')) return '🏥';
    if (factorName.toLowerCase().includes('emergency')) return '🚑';
    if (factorName.toLowerCase().includes('stay') || factorName.toLowerCase().includes('hospital')) return '📅';
    if (factorName.toLowerCase().includes('diagnos')) return '🔬';
    if (factorName.toLowerCase().includes('medication')) return '💊';
    if (factorName.toLowerCase().includes('age')) return '👴';
    if (factorName.toLowerCase().includes('insulin')) return '💉';
    return '⚠️';
  };

  const getScoreColor = (score) => {
    if (score >= 20) return '#ef4444'; // red
    if (score >= 15) return '#f59e0b'; // amber
    return '#10b981'; // green
  };

  return (
    <div className="risk-factors-container">
      <div className="risk-factors-header">
        <h3>� Top Risk Drivers</h3>
        <p>Key factors contributing to patient's risk score</p>
      </div>
      
      <div className="risk-factors-list">
        {factors.map((factor, index) => (
          <motion.div
            key={index}
            className="risk-factor-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <div className="risk-factor-content">
              <div className="risk-factor-icon">
                <span>{getFactorIcon(factor.factor)}</span>
                <div className="factor-number">{index + 1}</div>
              </div>
              <div className="risk-factor-details">
                <h4>{factor.factor}</h4>
                <p>{factor.details}</p>
              </div>
              <div className="risk-factor-score">
                <div className="score-bar">
                  <motion.div 
                    className="score-fill" 
                    style={{ backgroundColor: getScoreColor(factor.score) }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((factor.score / 25) * 100, 100)}%` }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  ></motion.div>
                </div>
                <span className="score-text" style={{ color: getScoreColor(factor.score) }}>
                  {factor.score}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {factors.length === 0 && (
        <div className="no-risk-factors">
          <p>No significant risk factors identified</p>
        </div>
      )}
    </div>
  );
};

export default RiskFactors;
