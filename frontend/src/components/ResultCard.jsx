import React from 'react';
import RiskMeter from './RiskMeter';
import RiskFactors from './RiskFactors';
import ClinicalRecommendations from './ClinicalRecommendations';
import './ResultCard.css';

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

  const { risk_level, probability, risk_category, risk_factors, recommendations } = result;
  const isHighRisk = risk_level === 'HIGH RISK';

  return (
    <div className={`result-card ${isHighRisk ? 'high-risk' : 'low-risk'}`}>
      <div className="result-header">
        <div className="risk-badge">
          {isHighRisk ? '⚠️' : '✅'}
          <span>{risk_level}</span>
        </div>
        <div className="risk-category">
          Category: <span className={`category-badge ${risk_category.toLowerCase()}`}>{risk_category}</span>
        </div>
      </div>
      
      <div className="result-content">
        {/* Risk Intelligence Panel */}
        <div className="risk-intelligence-panel">
          <h3>🧠 Risk Intelligence Panel</h3>
          <RiskMeter probability={probability} riskCategory={risk_category} />
        </div>

        {/* Top Risk Factors */}
        <div className="risk-factors-section">
          <h3>🔍 Top Risk Drivers</h3>
          <RiskFactors factors={risk_factors} />
        </div>

        {/* Clinical Recommendations */}
        <div className="recommendations-section">
          <h3>💡 Smart Clinical Recommendations</h3>
          <ClinicalRecommendations 
            recommendations={recommendations} 
            isHighRisk={isHighRisk}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
