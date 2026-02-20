# 🏥 Patient Readmission Prediction System

An AI-powered web application that predicts hospital readmission risk within 30 days using machine learning.

## 🚀 Features

- **Real-time Prediction**: Get instant risk assessment based on patient data
- **Clean UI**: Modern, responsive interface with medical theme
- **RESTful API**: Flask backend with proper error handling
- **ML Integration**: Uses trained pipeline for accurate predictions
- **Risk Visualization**: Clear display of probability and recommendations

## 🏗️ Architecture

```
React Frontend (Port 3000)
      ↓
   HTTP Request
      ↓
Flask Backend (Port 5000)
      ↓
ML Pipeline Inference
      ↓
JSON Response
```

## 📋 Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

## 🛠️ Installation

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📊 API Documentation

### POST /predict

Predicts readmission risk for a patient.

**Request Body:**
```json
{
  "number_inpatient": 0,
  "time_in_hospital": 5,
  "num_medications": 10,
  "num_procedures": 0,
  "number_diagnoses": 6,
  "num_lab_procedures": 40,
  "number_emergency": 0,
  "age": "[60-70)",
  "insulin": "Steady"
}
```

**Response:**
```json
{
  "prediction": 1,
  "risk_level": "HIGH RISK",
  "probability": 78.45
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "pipeline_loaded": true
}
```

## 🎨 UI Components

### PatientForm
- Collects 9 patient data fields
- Real-time validation
- Clean form layout with proper error handling

### ResultCard
- Displays risk level with color coding
- Shows probability with progress bar
- Provides recommendations based on risk level

## 🚀 Deployment

### Backend (Render/Railway)
1. Deploy Flask app to your preferred platform
2. Ensure `readmission_pipeline.joblib` is included
3. Set environment variables if needed

### Frontend (Vercel/Netlify)
1. Build the React app: `npm run build`
2. Deploy the build folder to your platform
3. Update API endpoint if backend is deployed elsewhere

## 🔧 Configuration

The application includes a fallback dummy pipeline for demonstration. To use your actual `readmission_pipeline.joblib`:

1. Place the file in the `backend/` directory
2. Restart the Flask server
3. The system will automatically load your pipeline

## 📱 Features

- **Responsive Design**: Works on desktop and mobile
- **Input Validation**: Prevents invalid data submission
- **Error Handling**: Graceful error messages and recovery
- **Loading States**: Visual feedback during prediction
- **Medical Theme**: Professional healthcare color scheme

## 🧪 Testing

### Backend Testing
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"number_inpatient":1,"time_in_hospital":5,"num_medications":10,"num_procedures":0,"number_diagnoses":6,"num_lab_procedures":40,"number_emergency":0,"age":"[60-70)","insulin":"Steady"}'
```

### Frontend Testing
Open `http://localhost:3000` in your browser and test the form submission.

## 📈 Future Enhancements

- User authentication system
- Patient history storage
- Analytics dashboard
- Model performance tracking
- Docker containerization
- Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational and demonstration purposes.

## ⚠️ Disclaimer

This tool uses machine learning predictions for educational purposes. Always consult with qualified healthcare professionals for medical decisions.
