import joblib
import gzip
import pickle

def load_compressed_pipeline(compressed_file):
    """Load compressed pipeline for use in Flask app"""
    with gzip.open(compressed_file, 'rb') as f:
        pipeline = pickle.load(f)
    return pipeline

# Test loading
if __name__ == "__main__":
    pipeline = load_compressed_pipeline('readmission_pipeline.joblib.gz')
    print("Pipeline loaded successfully from compressed file!")
    print(f"Pipeline type: {type(pipeline)}")
