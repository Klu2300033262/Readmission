import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardStats from './components/DashboardStats';
import RiskCharts from './components/RiskCharts';
import RecentActivity from './components/RecentActivity';
import PatientFormNew from './components/PatientFormNew';
import PredictionResult from './components/PredictionResult';
import './AppNew.css';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    // Force scroll to top and prevent browser scroll restoration
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    // Execute immediately
    scrollToTop();
    
    // Also execute after a short delay to ensure it works
    setTimeout(scrollToTop, 100);
    
    // Fetch analytics data on component mount
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/analytics`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        // Refresh analytics after successful prediction
        fetchAnalytics();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Prediction failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  const handleDownloadReport = async () => {
    if (!result) return;
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/download_report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      });

      if (response.ok) {
        const data = await response.json();
        const blob = new Blob([data.content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `readmission-risk-report-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Failed to download report:', err);
    }
  };

  return (
    <div className="app">
      {/* Modern Header */}
      <motion.header 
        className="app-header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="header-content">
          <h1 className="app-title">
            🏥 AI-Powered Hospital Readmission Risk Intelligence Platform
          </h1>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-grid">
          {/* Dashboard Overview Section */}
          {analytics && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <DashboardStats analytics={analytics} />
            </motion.div>
          )}

          {/* Risk Charts Section */}
          {analytics && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <RiskCharts analytics={analytics} />
            </motion.div>
          )}

          {/* Recent Activity Panel */}
          {analytics && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <RecentActivity analytics={analytics} />
            </motion.div>
          )}

          {/* Patient Input Form */}
          <motion.div
            className="form-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <PatientFormNew onSubmit={handleSubmit} loading={loading} />
          </motion.div>
        </div>

        {/* Error State */}
        {error && (
          <motion.div
            className="error-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="error-content">
              <h2 className="error-title">⚠️ Prediction Error</h2>
              <p className="error-message">{error}</p>
              <motion.button
                onClick={() => { handleReset(); }}
                className="retry-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔄 Try Again
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && !result && (
          <motion.div
            className="loading-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="loading-content">
              <div className="loading-spinner"></div>
              <h2>Analyzing Patient Data...</h2>
              <p>Our AI is processing the risk assessment</p>
            </div>
          </motion.div>
        )}

        {/* Prediction Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <PredictionResult result={result} />
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <motion.button
                onClick={handleDownloadReport}
                className="retry-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📄 Download Risk Report
              </motion.button>
              <motion.button
                onClick={handleReset}
                className="retry-button"
                style={{ marginLeft: '1rem' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🆕 New Prediction
              </motion.button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Modern Footer */}
      <footer className="app-footer">
        <p>
          © 2024 AI-Powered Hospital Readmission Platform | 
          Built with ❤️ for Healthcare Innovation
        </p>
        </footer>
    </div>
  );
}

export default App;
