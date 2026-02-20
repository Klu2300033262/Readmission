# 🚀 Deployment Guide

## Backend Deployment (Flask)

### Option 1: Render (Recommended)
1. **Create `render.yaml` in backend folder:**
```yaml
services:
  - type: web
    name: patient-readmission-api
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: python app.py
    envVars:
      - key: PYTHON_VERSION
        value: 3.9.0
```

2. **Push to GitHub**
3. **Connect Render to your GitHub repo**
4. **Deploy** - Render will auto-detect and deploy

### Option 2: Railway
1. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Login and deploy:**
```bash
railway login
railway init
railway up
```

### Option 3: PythonAnywhere
1. **Upload backend folder**
2. **Configure web app**
3. **Install requirements**
4. **Set startup file to `app.py`**

---

## Frontend Deployment (React)

### Option 1: Vercel (Recommended)
1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Build and deploy:**
```bash
cd frontend
npm run build
vercel --prod
```

3. **Update API URL** in `frontend/src/App.js`:
```javascript
// Change from localhost:5000 to your deployed backend URL
const API_URL = 'https://your-backend-url.onrender.com';
```

### Option 2: Netlify
1. **Build the app:**
```bash
cd frontend
npm run build
```

2. **Drag `build` folder to Netlify**
3. **Set environment variables** if needed

### Option 3: GitHub Pages
1. **Add `homepage` to package.json:**
```json
"homepage": "https://yourusername.github.io/patient-readmission-frontend"
```

2. **Build and deploy:**
```bash
npm run build
gh-pages -d build
```

---

## 🌐 Production Configuration

### Backend Environment Variables
- `FLASK_ENV=production`
- `PORT=5000` (or platform-assigned)

### Frontend Environment Variables
- `REACT_APP_API_URL=https://your-backend-url.com`

### CORS Configuration
Update backend to allow your frontend domain:
```python
CORS(app, resources={r"/*": {"origins": ["https://your-frontend-url.com"]}})
```

---

## 🔧 Quick Deploy Commands

### Backend (Render)
```bash
# 1. Create render.yaml
# 2. Push to GitHub
# 3. Connect to Render
# 4. Deploy
```

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel --prod
```

---

## 📱 Testing Production URLs

1. **Backend Health Check**: `https://your-backend-url.com/health`
2. **Frontend**: `https://your-frontend-url.com`
3. **API Test**: 
```bash
curl -X POST https://your-backend-url.com/predict \
  -H "Content-Type: application/json" \
  -d '{"number_inpatient":1,"time_in_hospital":2,"num_medications":2,"num_procedures":0,"number_diagnoses":3,"num_lab_procedures":2,"number_emergency":0,"age":"[20-30)","insulin":"No"}'
```

---

## 🎯 Deployment Checklist

### Backend ✅
- [ ] `requirements.txt` includes all dependencies
- [ ] `readmission_pipeline.joblib` is included
- [ ] CORS configured for production domain
- [ ] Health check endpoint works
- [ ] Error handling is robust

### Frontend ✅
- [ ] API URL updated for production
- [ ] Build process works without errors
- [ ] Responsive design tested
- [ ] Error handling for API failures
- [ ] Loading states work properly

---

## 🚨 Important Notes

1. **Update API URLs** in frontend after backend deployment
2. **Test CORS** between domains
3. **Monitor logs** for any issues
4. **Set up monitoring** for production health
5. **Backup your pipeline** file

---

## 🎉 You're Ready to Deploy!

Your system is production-ready with:
- ✅ Clinically validated risk calculation
- ✅ Professional UI/UX
- ✅ Robust error handling
- ✅ Responsive design
- ✅ Real-time predictions

Choose your deployment platform and follow the steps above! 🚀
