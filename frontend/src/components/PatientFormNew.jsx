import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FIELD_ICONS = {
  patient_name: '👤',
  number_inpatient: '🏥',
  time_in_hospital: '📅',
  num_medications: '💊',
  num_procedures: '🔬',
  number_diagnoses: '📋',
  num_lab_procedures: '🧪',
  number_emergency: '🚨',
};

const formFields = [
  { name: 'patient_name', label: 'Patient Name', type: 'text', placeholder: 'e.g. John Doe', required: true },
  { name: 'number_inpatient', label: 'Inpatient Visits', type: 'number', placeholder: '0', required: true },
  { name: 'time_in_hospital', label: 'Days in Hospital', type: 'number', placeholder: '0', required: true },
  { name: 'num_medications', label: 'Medications', type: 'number', placeholder: '0', required: true },
  { name: 'num_procedures', label: 'Procedures', type: 'number', placeholder: '0', required: true },
  { name: 'number_diagnoses', label: 'Diagnoses', type: 'number', placeholder: '0', required: true },
  { name: 'num_lab_procedures', label: 'Lab Procedures', type: 'number', placeholder: '0', required: true },
  { name: 'number_emergency', label: 'Emergency Visits', type: 'number', placeholder: '0', required: true },
];

const AGE_OPTIONS = ['[0-10)', '[10-20)', '[20-30)', '[30-40)', '[40-50)', '[50-60)', '[60-70)', '[70-80)', '[80-90)', '[90-100)'];
const INSULIN_OPTIONS = ['No', 'Steady', 'Up', 'Down'];

const PatientForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    patient_name: '',
    number_inpatient: '',
    time_in_hospital: '',
    num_medications: '',
    num_procedures: '',
    number_diagnoses: '',
    num_lab_procedures: '',
    number_emergency: '',
    age: '[60-70)',
    insulin: 'Steady',
  });

  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.patient_name.trim()) {
      newErrors.patient_name = 'Patient name is required';
    }
    formFields.forEach(({ name }) => {
      if (name !== 'patient_name') {
        if (!formData[name] || formData[name] === '') {
          newErrors[name] = 'Required';
        } else if (isNaN(formData[name])) {
          newErrors[name] = 'Enter a valid number';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        number_inpatient: parseInt(formData.number_inpatient),
        time_in_hospital: parseInt(formData.time_in_hospital),
        num_medications: parseInt(formData.num_medications),
        num_procedures: parseInt(formData.num_procedures),
        number_diagnoses: parseInt(formData.number_diagnoses),
        num_lab_procedures: parseInt(formData.num_lab_procedures),
        number_emergency: parseInt(formData.number_emergency),
      });
    }
  };

  const inputClass = (name) =>
    `w-full px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-300 bg-white/80 placeholder-slate-300 ${errors[name]
      ? 'border-red-400 focus:border-red-500 text-red-700'
      : focusedField === name
        ? 'border-blue-500 shadow-[0_0_0_3px_rgba(37,99,235,0.15)]'
        : 'border-slate-200 hover:border-slate-300 text-slate-700'
    }`;

  const selectClass = `w-full px-4 py-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 text-sm font-medium bg-white/80 text-slate-700 transition-all duration-300 cursor-pointer appearance-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.15)]`;

  return (
    <motion.div
      className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Card Header */}
      <div
        className="px-8 py-6 border-b border-slate-100"
        style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f3f0ff 100%)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl shadow-lg">
            🩺
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Patient Risk Assessment</h2>
            <p className="text-slate-500 text-sm mt-0.5">Enter clinical data to predict 30-day readmission risk</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        {/* 2-column grid for fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {formFields.map((field) => (
            <div key={field.name} className="space-y-1.5">
              <label htmlFor={field.name} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <span className="text-base">{FIELD_ICONS[field.name]}</span>
                {field.label}
                {field.required && <span className="text-red-500 text-xs">*</span>}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                onFocus={() => setFocusedField(field.name)}
                onBlur={() => setFocusedField(null)}
                placeholder={field.placeholder}
                min={field.type === 'number' ? 0 : undefined}
                className={inputClass(field.name)}
                style={{ outline: 'none' }}
              />
              <AnimatePresence>
                {errors[field.name] && (
                  <motion.p
                    className="text-xs text-red-500 font-medium flex items-center gap-1"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    ⚠ {errors[field.name]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Age Group */}
          <div className="space-y-1.5">
            <label htmlFor="age" className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <span className="text-base">📆</span> Age Group
            </label>
            <div className="relative">
              <select
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={selectClass}
                style={{ outline: 'none' }}
              >
                {AGE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">▼</div>
            </div>
          </div>

          {/* Insulin Status */}
          <div className="space-y-1.5">
            <label htmlFor="insulin" className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <span className="text-base">💉</span> Insulin Status
            </label>
            <div className="relative">
              <select
                id="insulin"
                name="insulin"
                value={formData.insulin}
                onChange={handleChange}
                className={selectClass}
                style={{ outline: 'none' }}
              >
                {INSULIN_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">▼</div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={!loading ? { scale: 1.02, boxShadow: '0 12px 40px rgba(37,99,235,0.45)' } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
          className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: loading
              ? 'linear-gradient(135deg, #93a5cf, #a78bfa)'
              : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            boxShadow: loading ? 'none' : '0 8px 30px rgba(37,99,235,0.35)',
          }}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              🔍 Assess Readmission Risk
            </>
          )}
        </motion.button>

        <p className="text-center text-xs text-slate-400 mt-4">
          Powered by AI · HIPAA Compliant · Results for clinical decision support only
        </p>
      </form>
    </motion.div>
  );
};

export default PatientForm;
