import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './RiskMeter.css';

const RiskMeter = ({ probability, riskCategory }) => {
  const [animatedProbability, setAnimatedProbability] = useState(0);

  useEffect(() => {
    // Animate probability on mount
    const timer = setTimeout(() => {
      setAnimatedProbability(probability);
    }, 100);
    return () => clearTimeout(timer);
  }, [probability]);

  const getRiskColor = (category) => {
    switch (category) {
      case 'Low':
        return '#22C55E';
      case 'Moderate':
        return '#F59E0B';
      case 'High':
        return '#EF4444';
      default:
        return '#64748B';
    }
  };

  const getRiskGradient = (category) => {
    const color = getRiskColor(category);
    return `conic-gradient(from 180deg, ${color} 0deg, ${color} ${animatedProbability * 3.6}deg, #E5E7EB ${animatedProbability * 3.6}deg)`;
  };

  const riskColor = getRiskColor(riskCategory);

  return (
    <div className="risk-meter-container">
      <div className="risk-meter">
        <motion.div 
          className="gauge"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="gauge-background"></div>
          <motion.div 
            className="gauge-fill" 
            style={{ background: getRiskGradient(riskCategory) }}
            initial={{ rotate: -90 }}
            animate={{ rotate: animatedProbability * 3.6 - 90 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          ></motion.div>
          <div className="gauge-center">
            <motion.div 
              className="risk-percentage"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              {probability}%
            </motion.div>
            <motion.div 
              className="risk-category"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              {riskCategory} Risk
            </motion.div>
            <motion.div 
              className="risk-indicator"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9, duration: 0.3 }}
            >
              {riskCategory === 'High' ? '🔴' : riskCategory === 'Moderate' ? '🟡' : '🟢'}
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="risk-legend"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
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
      </motion.div>
    </div>
  );
};

export default RiskMeter;
