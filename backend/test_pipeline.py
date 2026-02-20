import joblib
import pandas as pd
import numpy as np

# Load the pipeline
print("Loading pipeline...")
pipeline = joblib.load('readmission_pipeline.joblib')
print(f"Pipeline type: {type(pipeline)}")
print(f"Pipeline steps: {pipeline.steps}")

# Test data - High risk scenario
test_data = pd.DataFrame({
    'number_inpatient': [5],
    'time_in_hospital': [15],
    'num_medications': [25],
    'num_procedures': [4],
    'number_diagnoses': [10],
    'num_lab_procedures': [100],
    'number_emergency': [5],
    'age': ['[80-90)'],
    'insulin': ['Steady']
})

print("\nTest data:")
print(test_data)

# Make prediction
prediction = pipeline.predict(test_data)[0]
probability = pipeline.predict_proba(test_data)[0]

print(f"\nPrediction: {prediction}")
print(f"Probability [class_0, class_1]: {probability}")
print(f"Risk Level: {'HIGH RISK' if prediction == 1 else 'LOW RISK'}")

# Test with multiple scenarios
print("\n" + "="*50)
print("TESTING MULTIPLE SCENARIOS")
print("="*50)

scenarios = [
    {"name": "Very Low Risk", "data": {
        'number_inpatient': [0], 'time_in_hospital': [1], 'num_medications': [2],
        'num_procedures': [0], 'number_diagnoses': [1], 'num_lab_procedures': [10],
        'number_emergency': [0], 'age': ['[20-30)'], 'insulin': ['No']
    }},
    {"name": "Low Risk", "data": {
        'number_inpatient': [0], 'time_in_hospital': [2], 'num_medications': [5],
        'num_procedures': [1], 'number_diagnoses': [3], 'num_lab_procedures': [20],
        'number_emergency': [0], 'age': ['[40-50)'], 'insulin': ['No']
    }},
    {"name": "Medium Risk", "data": {
        'number_inpatient': [1], 'time_in_hospital': [4], 'num_medications': [8],
        'num_procedures': [1], 'number_diagnoses': [5], 'num_lab_procedures': [35],
        'number_emergency': [1], 'age': ['[60-70)'], 'insulin': ['Steady']
    }},
    {"name": "High Risk", "data": {
        'number_inpatient': [3], 'time_in_hospital': [8], 'num_medications': [15],
        'num_procedures': [2], 'number_diagnoses': [7], 'num_lab_procedures': [60],
        'number_emergency': [2], 'age': ['[70-80)'], 'insulin': ['Steady']
    }},
    {"name": "Extreme High Risk", "data": {
        'number_inpatient': [5], 'time_in_hospital': [15], 'num_medications': [25],
        'num_procedures': [4], 'number_diagnoses': [10], 'num_lab_procedures': [100],
        'number_emergency': [5], 'age': ['[80-90)'], 'insulin': ['Steady']
    }}
]

for scenario in scenarios:
    df = pd.DataFrame(scenario["data"])
    pred = pipeline.predict(df)[0]
    prob = pipeline.predict_proba(df)[0]
    print(f"\n{scenario['name']}:")
    print(f"  Prediction: {pred} | Probability: [{prob[0]:.3f}, {prob[1]:.3f}] | Risk: {'HIGH' if pred == 1 else 'LOW'}")

# Check model parameters if available
print("\n" + "="*50)
print("MODEL ANALYSIS")
print("="*50)

if hasattr(pipeline, 'named_steps'):
    for step_name, step_obj in pipeline.named_steps.items():
        print(f"\nStep: {step_name}")
        print(f"  Type: {type(step_obj)}")
        
        if hasattr(step_obj, 'classes_'):
            print(f"  Classes: {step_obj.classes_}")
        
        if hasattr(step_obj, 'feature_importances_'):
            print(f"  Feature Importances available: Yes")
        
        if hasattr(step_obj, 'coef_'):
            print(f"  Coefficients shape: {step_obj.coef_.shape}")
