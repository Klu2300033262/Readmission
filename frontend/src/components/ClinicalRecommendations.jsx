import React from 'react';
import './ClinicalRecommendations.css';

const ClinicalRecommendations = ({ recommendations, riskLevel }) => {
  const getRecommendationIcon = (recommendation) => {
    if (recommendation.includes('follow-up')) return '📅';
    if (recommendation.includes('medication')) return '💊';
    if (recommendation.includes('monitoring')) return '📊';
    if (recommendation.includes('education')) return '📚';
    if (recommendation.includes('consultation')) return '👨‍⚕️';
    return '✅';
  };

  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <h3>
          {riskLevel === 'HIGH RISK' ? '⚠️' : '✅'} 
          {' '}Clinical Recommendations
        </h3>
        <p>
          {riskLevel === 'HIGH RISK' 
            ? 'High-risk patients require immediate attention and close monitoring'
            : 'Standard care recommendations for low-risk patients'
          }
        </p>
      </div>
      
      <div className="recommendations-list">
        {recommendations.map((recommendation, index) => (
          <div 
            key={index} 
            className={`recommendation-item ${riskLevel === 'HIGH RISK' ? 'high-risk' : 'low-risk'}`}
          >
            <div className="recommendation-icon">
              {getRecommendationIcon(recommendation)}
            </div>
            <div className="recommendation-text">
              <p>{recommendation}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="recommendations-footer">
        <div className="urgency-indicator">
          <div className={`urgity-level ${riskLevel === 'HIGH RISK' ? 'urgent' : 'routine'}`}>
            {riskLevel === 'HIGH RISK' ? '🔴 URGENT' : '🟢 ROUTINE'}
          </div>
        </div>
        <div className="disclaimer">
          <p>
            <small>
              These recommendations are based on clinical guidelines and should be 
              reviewed by healthcare professionals.
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClinicalRecommendations;
