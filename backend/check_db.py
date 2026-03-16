import sqlite3
import os


def main():
    db_path = os.path.join(os.path.dirname(__file__), 'readmission.db')

    if not os.path.exists(db_path):
        print(f"Database not found at: {db_path}")
        print("Make sure you have run the Flask app and submitted at least one prediction.")
        return

    conn = sqlite3.connect(db_path)
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM patient_predictions LIMIT 10")
        rows = cursor.fetchall()

        if not rows:
            print("No rows found in patient_predictions table.")
            return

        for row in rows:
            print(row)
    except Exception as e:
        print(f"Error reading from database: {e}")
    finally:
        conn.close()


if __name__ == '__main__':
    main()
