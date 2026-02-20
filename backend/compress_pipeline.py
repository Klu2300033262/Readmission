import joblib
import pickle
import gzip
import shutil

def compress_pipeline(input_file, output_file):
    """Compress joblib pipeline using gzip"""
    print(f"Loading pipeline from {input_file}...")
    pipeline = joblib.load(input_file)
    
    print(f"Compressing to {output_file}...")
    with gzip.open(output_file, 'wb') as f:
        pickle.dump(pipeline, f, protocol=pickle.HIGHEST_PROTOCOL)
    
    # Get file sizes
    original_size = shutil.os.path.getsize(input_file) / (1024 * 1024)  # MB
    compressed_size = shutil.os.path.getsize(output_file) / (1024 * 1024)  # MB
    
    print(f"Original size: {original_size:.2f} MB")
    print(f"Compressed size: {compressed_size:.2f} MB")
    print(f"Reduction: {((original_size - compressed_size) / original_size * 100):.1f}%")
    
    return compressed_size

if __name__ == "__main__":
    compress_pipeline('readmission_pipeline.joblib', 'readmission_pipeline.joblib.gz')
    print("Compression complete!")
