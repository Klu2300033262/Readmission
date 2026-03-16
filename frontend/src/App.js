import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardStats from './components/DashboardStats';
import RiskCharts from './components/RiskCharts';
import RecentActivity from './components/RecentActivity';
import PatientFormNew from './components/PatientFormNew';
import PredictionResult from './components/PredictionResult';
import LoginPage from './components/LoginPage';
import './AppNew.css';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [formKey, setFormKey] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    window.scrollTo(0, 0);
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('http://localhost:5000/analytics');
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
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Prediction failed');
      }

      const data = await response.json();
      setResult(data);
      fetchAnalytics();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setFormKey((k) => k + 1);
  };

  const handleDownloadReport = async () => {
    if (!result) return;
    try {
      const response = await fetch('http://localhost:5000/download_report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Report generation failed');
      }

      const data = await response.json();
      const link = document.createElement('a');
      link.href = `data:${data.report.mime_type};base64,${data.report.content}`;
      link.download = data.report.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isAuthenticated && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
          >
            <LoginPage onLogin={() => setIsAuthenticated(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {isAuthenticated && (
        <div className="min-h-screen app-bg">
          {/* ── Header ── */}
          <motion.header
            className="relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 40%, #7c3aed 100%)' }}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Decorative grid overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 0h1v40H0zM40 0h1v40H0zM0 0v1h40V0zM0 39v1h40v-1z' fill='rgba(255,255,255,0.3)'/%3E%3C/svg%3E\")",
              }}
            />
            {/* Glow blobs */}
            <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-blue-400/20 blur-3xl" />

            <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shadow-lg border border-white/30">
                  🏥
                </div>
                <div>
                  <h1 className="text-white font-bold text-xl md:text-2xl tracking-tight drop-shadow-md leading-tight">
                    AI-Powered Hospital Readmission
                  </h1>
                  <p className="text-blue-100/90 text-sm font-medium tracking-wide">
                    Risk Intelligence Platform
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-3">
                  <div className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-medium">
                    🟢 System Online
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-medium">
                    🤖 AI Model Active
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsAuthenticated(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-semibold hover:bg-white/25 transition-all duration-200"
                >
                  🚪 Logout
                </motion.button>
              </div>
            </div>
          </motion.header>

          {/* ── Main Content ── */}
          <main className="max-w-screen-xl mx-auto px-4 md:px-6 py-8 space-y-6">

            {/* Dashboard Stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <DashboardStats analytics={analytics} />
            </motion.div>

            {/* Charts + Recent Activity */}
            {analytics && (
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <div className="lg:col-span-2">
                  <RiskCharts analytics={analytics} />
                </div>
                <div className="lg:col-span-1">
                  <RecentActivity analytics={analytics} />
                </div>
              </motion.div>
            )}

            {/* Patient Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <PatientFormNew key={formKey} onSubmit={handleSubmit} loading={loading} />
            </motion.div>

            {/* Loading State */}
            <AnimatePresence>
              {loading && !result && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl flex items-center justify-center py-20"
                >
                  <div className="text-center space-y-5">
                    <div className="relative w-20 h-20 mx-auto">
                      <div className="spinner mx-auto" style={{ width: 64, height: 64 }} />
                      <div className="absolute inset-0 flex items-center justify-center text-2xl">🧠</div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Analyzing Patient Data...</h2>
                      <p className="text-slate-500 text-sm mt-1">Our AI is processing risk assessment</p>
                    </div>
                    <div className="flex justify-center gap-2">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-blue-500"
                          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error State */}
            <AnimatePresence>
              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-3xl bg-red-50/90 backdrop-blur-xl border border-red-200 shadow-xl p-8 text-center"
                >
                  <div className="text-5xl mb-4">⚠️</div>
                  <h2 className="text-xl font-bold text-red-600 mb-2">Prediction Error</h2>
                  <p className="text-slate-600 mb-6">{error}</p>
                  <motion.button
                    onClick={handleReset}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-gradient inline-flex items-center gap-2"
                  >
                    🔄 Try Again
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Prediction Result */}
            <AnimatePresence>
              {result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <PredictionResult result={result} />

                  {/* Action Buttons */}
                  <motion.div
                    className="flex flex-wrap gap-4 justify-center mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.button
                      onClick={handleDownloadReport}
                      whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(37,99,235,0.4)' }}
                      whileTap={{ scale: 0.97 }}
                      className="btn-gradient inline-flex items-center gap-2 px-8 py-3.5 text-sm"
                    >
                      📄 Download Risk Report
                    </motion.button>
                    <motion.button
                      onClick={handleReset}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 shadow-sm"
                    >
                      🆕 New Prediction
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* ── Footer ── */}
          <footer className="mt-12 bg-white/60 backdrop-blur-md border-t border-slate-200/60 py-6 text-center">
            <p className="text-slate-500 text-sm">
              © 2024{' '}
              <span className="font-semibold text-gradient">
                AI-Powered Hospital Readmission Platform
              </span>{' '}
              &nbsp;|&nbsp; Built with ❤️ for Healthcare Innovation
            </p>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
