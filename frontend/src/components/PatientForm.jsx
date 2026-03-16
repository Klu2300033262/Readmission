import React, { useState } from 'react';
import './PatientForm.css';

const PatientForm = ({ onSubmit, loading, onReset }) => {
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
    insulin: 'Steady'
  });

  const [errors, setErrors] = useState({});

  // Reset form function
  const resetForm = () => {
    setFormData({
      patient_name: '',
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
    setErrors({});
  };

  // Call reset function when onReset prop changes
  React.useEffect(() => {
    if (onReset && typeof onReset === 'function') {
      onReset(resetForm);
    }
  }, [onReset]);

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
    
    // Validate patient name
    if (!formData.patient_name || formData.patient_name.trim() === '') {
      newErrors.patient_name = 'Patient name is required';
    }
    
    // Validate integer fields
    const integerFields = [
      'number_inpatient', 'time_in_hospital', 'num_medications',
      'num_procedures', 'number_diagnoses', 'num_lab_procedures', 'number_emergency'
    ];
    
    integerFields.forEach(field => {
      const value = formData[field];
      if (!value || value === '') {
        newErrors[field] = 'This field is required';
      } else if (isNaN(value) || parseInt(value) < 0) {
        newErrors[field] = 'Must be a non-negative number';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Convert string values to integers
      const submitData = {
        ...formData,
        number_inpatient: parseInt(formData.number_inpatient),
        time_in_hospital: parseInt(formData.time_in_hospital),
        num_medications: parseInt(formData.num_medications),
        num_procedures: parseInt(formData.num_procedures),
        number_diagnoses: parseInt(formData.number_diagnoses),
        num_lab_procedures: parseInt(formData.num_lab_procedures),
        number_emergency: parseInt(formData.number_emergency)
      };
      
      onSubmit(submitData);
    }
  };

  // Direct reset function for immediate use
  const directReset = () => {
    console.log('Direct reset called'); // Debug log
    setFormData({
      patient_name: '',
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
    setErrors({});
  };

  const formFields = [
    { 
      name: 'patient_name', 
      label: 'Patient Name', 
      type: 'text',
      placeholder: 'e.g., John Doe'
    },
    { 
      name: 'number_inpatient', 
      label: 'Number of Inpatient Visits', 
      type: 'number',
      placeholder: 'e.g., 2'
    },
    { 
      name: 'time_in_hospital', 
      label: 'Time in Hospital (days)', 
      type: 'number',
      placeholder: 'e.g., 5'
    },
    { 
      name: 'num_medications', 
      label: 'Number of Medications', 
      type: 'number',
      placeholder: 'e.g., 10'
    },
    { 
      name: 'num_procedures', 
      label: 'Number of Procedures', 
      type: 'number',
      placeholder: 'e.g., 1'
    },
    { 
      name: 'number_diagnoses', 
      label: 'Number of Diagnoses', 
      type: 'number',
      placeholder: 'e.g., 6'
    },
    { 
      name: 'num_lab_procedures', 
      label: 'Number of Lab Procedures', 
      type: 'number',
      placeholder: 'e.g., 40'
    },
    { 
      name: 'number_emergency', 
      label: 'Number of Emergency Visits', 
      type: 'number',
      placeholder: 'e.g., 1'
    }
  ];

  return (
    <div className="patient-form">
      <div className="form-header">
        <h2>Patient Information</h2>
        <p>Enter patient data to assess readmission risk</p>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        {formFields.map(field => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={errors[field.name] ? 'error' : ''}
            />
            {errors[field.name] && (
              <span className="error-text">{errors[field.name]}</span>
            )}
          </div>
        ))}

        <div className="form-group">
          <label htmlFor="age">Age Group</label>
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

        <div className="form-actions">
          <button 
            type="button" 
            onClick={directReset}
            className="reset-btn"
            style={{ marginRight: '10px', background: '#64748B', color: 'white' }}
          >
            Clear Form
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Analyzing...
              </>
            ) : (
              'Assess Risk'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
