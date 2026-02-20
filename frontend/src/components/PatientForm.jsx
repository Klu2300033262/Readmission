import React, { useState } from 'react';

const PatientForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    number_inpatient: '',
    time_in_hospital: '',
    num_medications: '',
    num_procedures: '',
    number_diagnoses: '',
    num_lab_procedures: '',
    number_emergency: '',
    age: '[60-70)',
    insulin: 'Steady'
  });

  const [errors, setErrors] = useState({});

  const ageOptions = [
    '[0-10)', '[10-20)', '[20-30)', '[30-40)', '[40-50)', 
    '[50-60)', '[60-70)', '[70-80)', '[80-90)', '[90-100)'
  ];

  const insulinOptions = ['No', 'Steady', 'Up', 'Down'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate integer fields
    const integerFields = [
      'number_inpatient', 'time_in_hospital', 'num_medications',
      'num_procedures', 'number_diagnoses', 'num_lab_procedures', 'number_emergency'
    ];
    
    integerFields.forEach(field => {
      const value = formData[field];
      if (!value) {
        newErrors[field] = 'This field is required';
      } else if (isNaN(value) || parseInt(value) < 0) {
        newErrors[field] = 'Must be a non-negative integer';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Convert integer fields to numbers
      const submissionData = {
        ...formData,
        number_inpatient: parseInt(formData.number_inpatient),
        time_in_hospital: parseInt(formData.time_in_hospital),
        num_medications: parseInt(formData.num_medications),
        num_procedures: parseInt(formData.num_procedures),
        number_diagnoses: parseInt(formData.number_diagnoses),
        num_lab_procedures: parseInt(formData.num_lab_procedures),
        number_emergency: parseInt(formData.number_emergency)
      };
      
      onSubmit(submissionData);
    }
  };

  return (
    <div className="patient-form">
      <h2>Patient Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Integer Fields */}
          {[
            { name: 'number_inpatient', label: 'Number of Inpatient Visits' },
            { name: 'time_in_hospital', label: 'Time in Hospital (days)' },
            { name: 'num_medications', label: 'Number of Medications' },
            { name: 'num_procedures', label: 'Number of Procedures' },
            { name: 'number_diagnoses', label: 'Number of Diagnoses' },
            { name: 'num_lab_procedures', label: 'Number of Lab Procedures' },
            { name: 'number_emergency', label: 'Number of Emergency Visits' }
          ].map(({ name, label }) => (
            <div key={name} className="form-group">
              <label htmlFor={name}>{label}</label>
              <input
                type="number"
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                min="0"
                className={errors[name] ? 'error' : ''}
              />
              {errors[name] && <span className="error-message">{errors[name]}</span>}
            </div>
          ))}

          {/* Dropdown Fields */}
          <div className="form-group">
            <label htmlFor="age">Age Range</label>
            <select
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            >
              {ageOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="insulin">Insulin Status</label>
            <select
              id="insulin"
              name="insulin"
              value={formData.insulin}
              onChange={handleChange}
            >
              {insulinOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          className="predict-btn"
          disabled={loading}
        >
          {loading ? 'Predicting...' : 'Predict Readmission Risk'}
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
