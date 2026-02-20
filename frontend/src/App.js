import React, { useState } from 'react';
import PatientForm from './components/PatientForm';
import ResultCard from './components/ResultCard';
import './App.css';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Prediction failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>🏥 Patient Readmission Predictor</h1>
          <p>AI-Powered Risk Assessment for Hospital Readmission</p>
        </header>

        <main className="main-content">
          <div className="card">
            <PatientForm onSubmit={handleSubmit} loading={loading} />
            
            {error && (
              <div className="error-message">
                <strong>Error:</strong> {error}
                <button onClick={handleReset} className="retry-btn">
                  Try Again
                </button>
              </div>
            )}
          </div>

          {result && (
            <div className="card">
              <ResultCard result={result} loading={loading} />
              <button onClick={handleReset} className="new-prediction-btn">
                New Prediction
              </button>
            </div>
          )}
        </main>

        <footer className="app-footer">
          <p>
            This tool uses machine learning to predict 30-day readmission risk. 
            Always consult with healthcare professionals for medical decisions.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
