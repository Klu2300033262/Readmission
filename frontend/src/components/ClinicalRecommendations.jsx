import React from 'react';
import { motion } from 'framer-motion';
import './ClinicalRecommendations.css';

const ClinicalRecommendations = ({ recommendations, isHighRisk }) => {
  const getRecommendationIcon = (recommendation) => {
    if (recommendation.includes('follow-up')) return '📅';
    if (recommendation.includes('medication')) return '💊';
    if (recommendation.includes('monitoring')) return '📊';
    if (recommendation.includes('education')) return '📚';
    if (recommendation.includes('consultation')) return '👨‍⚕️';
    if (recommendation.includes('discharge')) return '🏠';
    if (recommendation.includes('telehealth')) return '💻';
    if (recommendation.includes('home health')) return '🏥';
    return '✅';
  };

  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <h3>
          {isHighRisk ? '⚠️' : '✅'} 
          {' '}Smart Clinical Recommendations
        </h3>
        <p>
          {isHighRisk 
            ? 'High-risk patients require immediate attention and close monitoring'
            : 'Standard care recommendations for low-risk patients'
          }
        </p>
      </div>
      
      <div className="recommendations-list">
        {recommendations.map((recommendation, index) => (
          <motion.div
            key={index}
            className={`recommendation-item ${isHighRisk ? 'high-risk' : 'low-risk'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <div className="recommendation-icon">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.2 }}
              >
                {getRecommendationIcon(recommendation)}
              </motion.span>
            </div>
            <div className="recommendation-text">
              <p>{recommendation}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="recommendations-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: recommendations.length * 0.1, duration: 0.5 }}
      >
        <div className="urgency-indicator">
          <div className={`urgency-level ${isHighRisk ? 'urgent' : 'routine'}`}>
            {isHighRisk ? '🔴 URGENT - Action Required' : '🟢 ROUTINE - Standard Care'}
          </div>
        </div>
        <div className="disclaimer">
          <p>
            <small>
              💡 These AI-generated recommendations are based on clinical guidelines 
              and should be reviewed by healthcare professionals before implementation.
            </small>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ClinicalRecommendations;
