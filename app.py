from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
import sqlite3
from sqlite3 import Error
import os

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Change this for production

# Database Configuration
DATABASE = 'database.db'

def create_connection(db_file=DATABASE):
    """Create a database connection to SQLite database"""
    try:
        conn = sqlite3.connect(db_file)
        conn.execute("PRAGMA foreign_keys = ON")
        return conn
    except Error as e:
        print(f"Error connecting to database: {e}")
    return None

def initialize_database():
    """Create all database tables if they don't exist"""
    conn = create_connection()
    if conn:
        try:
            cursor = conn.cursor()
            
            # Users table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password_hash TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            # Feedback table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS feedback (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
                    comment TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
                )
            """)
            
            # Admin table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS admin (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE,
                    password_hash TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            conn.commit()
            print("Database tables initialized successfully")
        except Error as e:
            print(f"Error initializing database: {e}")
        finally:
            conn.close()

# Initialize database when starting the app
initialize_database()

# Helper Functions
def submit_feedback(feedback_data):
    """Helper function to submit feedback to database"""
    conn = create_connection()
    if not conn:
        return False, "Database connection error"
    
    try:
        cursor = conn.cursor()
        
        user_id = None
        if 'user_id' in session:
            user_id = session['user_id']
        
        cursor.execute(
            """INSERT INTO feedback 
            (user_id, name, email, rating, comment) 
            VALUES (?, ?, ?, ?, ?)""",
            (
                user_id,
                feedback_data['name'],
                feedback_data['email'],
                int(feedback_data['rating']),
                feedback_data.get('comment', '')
            )
        )
        
        conn.commit()
        return True, "Thank you for your feedback!"
    except Error as e:
        return False, f"Error submitting feedback: {str(e)}"
    finally:
        conn.close()

def get_feedback_stats():
    """Get feedback statistics for dashboard"""
    conn = create_connection()
    if not conn:
        return None
    
    try:
        cursor = conn.cursor()
        
        # Get total feedback count
        cursor.execute("SELECT COUNT(*) FROM feedback")
        total = cursor.fetchone()[0]
        
        # Get average rating
        cursor.execute("SELECT AVG(rating) FROM feedback")
        avg_rating = cursor.fetchone()[0] or 0
        
        # Get recent feedback (last 7 days)
        cursor.execute("""
            SELECT COUNT(*) 
            FROM feedback 
            WHERE created_at >= datetime('now', '-7 days')
        """)
        recent = cursor.fetchone()[0]
        
        return {
            'total': total,
            'average': round(float(avg_rating), 1),
            'recent': recent
        }
        
    except Error as e:
        print(f"Error getting feedback stats: {e}")
        return None
    finally:
        conn.close()

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/feedback', methods=['GET', 'POST'])
def feedback():
    if request.method == 'POST':
        feedback_data = {
            'name': request.form.get('name', '').strip(),
            'email': request.form.get('email', '').strip(),
            'rating': request.form.get('rating', 0),
            'comment': request.form.get('comment', '').strip()
        }
        
        # Basic validation
        if not feedback_data['name'] or not feedback_data['email']:
            flash('Name and email are required', 'error')
        elif not feedback_data['rating'] or int(feedback_data['rating']) < 1 or int(feedback_data['rating']) > 5:
            flash('Please provide a valid rating (1-5)', 'error')
        else:
            success, message = submit_feedback(feedback_data)
            if success:
                flash(message, 'success')
                return redirect(url_for('feedback'))
            else:
                flash(message, 'error')
    
    return render_template('feedback.html')

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        # Basic admin validation
        if username == 'admin' and password == 'admin123':  # In production, use proper auth
            session['admin_logged_in'] = True
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Invalid credentials', 'error')
    
    return render_template('admin_login.html')

@app.route('/admin/dashboard')
def admin_dashboard():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    stats = get_feedback_stats()
    
    conn = create_connection()
    feedback_list = []
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, name, email, rating, comment, created_at 
                FROM feedback 
                ORDER BY created_at DESC
            """)
            feedback_list = cursor.fetchall()
        except Error as e:
            print(f"Error fetching feedback: {e}")
        finally:
            conn.close()
    
    return render_template('admin_dashboard.html', stats=stats, feedback_list=feedback_list)

@app.route('/admin/logout')
def admin_logout():
    session.pop('admin_logged_in', None)
    return redirect(url_for('admin_login'))

@app.route('/api/feedback', methods=['POST'])
def api_submit_feedback():
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "No data provided"}), 400
    
    feedback_data = {
        'name': data.get('name'),
        'email': data.get('email'),
        'rating': data.get('rating'),
        'comment': data.get('comment', '')
    }
    
    success, message = submit_feedback(feedback_data)
    return jsonify({"success": success, "message": message})

if __name__ == '__main__':
    # Insert sample feedbacks if not already present
    def insert_sample_feedback():
        conn = create_connection()
        if conn:
            cursor = conn.cursor()
            # Insert or update each feedback individually to avoid UNIQUE constraint errors
            feedbacks = [
                ('Amit', 'amit_gsmx5@example.com', 5, 'GSMx5 is a great value phone!'),
                ('Priya', 'priya_gsmx6@example.com', 4, 'GSMx6 performance is smooth and battery lasts long.'),
                ('Rahul', 'rahul_gsmx7@example.com', 5, 'GSMx7 camera is amazing, very happy!'),
                ('Sneha', 'sneha_gsmx8@example.com', 4, 'GSMx8 display is vibrant and clear.'),
            ]
            for name, email, rating, comment in feedbacks:
                cursor.execute("SELECT id FROM feedback WHERE email = ?", (email,))
                exists = cursor.fetchone()
                if not exists:
                    cursor.execute(
                        "INSERT INTO feedback (name, email, rating, comment) VALUES (?, ?, ?, ?)",
                        (name, email, rating, comment)
                    )
            conn.commit()
            conn.close()

    insert_sample_feedback()
    app.run(debug=True)
