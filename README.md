# Produck-Feedback-online
Educational Purpose Only

# GS Mobile Feedback System

A web-based feedback system for GS Mobile smartphones (GSMx5, GSMx6, GSMx7, GSMx8) built with Flask, SQLite, HTML, CSS, and JavaScript.

## Features
- Submit feedback for GS Mobile phones
- Admin dashboard to view all feedbacks, stats, and export data
- Dynamic feedback cards and rating visualization
- Branch and company info pages
- Custom build option for users

## Project Structure
```
├── app.py                  # Main Flask application
├── database.db             # SQLite database
├── requirements.txt        # Python dependencies
├── env/                    # Python virtual environment
├── static/
│   ├── css/style.css       # Stylesheets
│   ├── js/script.js        # JavaScript
│   └── images/             # Images and icons
├── templates/
│   ├── index.html          # Home page
│   ├── about.html          # About/Company info
│   ├── feedback.html       # Feedback form
│   ├── admin_login.html    # Admin login & dashboard
│   ├── admin_dashboard.html# Admin dashboard (classic)
│   └── layout.html         # Base template
└── README.md               # Project documentation
```

## Getting Started
1. **Clone the repository**
2. **Set up Python environment**
   - `python -m venv env`
   - `env\Scripts\activate` (Windows)
3. **Install dependencies**
   - `pip install -r requirements.txt`
4. **Run the application**
   - `python app.py`
5. **Access the app**
   - Open `http://127.0.0.1:5000/` in your browser

## Admin Login
- Default credentials:
  - **ID:** admin
  - **Password:** admin123

## Feedback Demo Data
- Sample feedbacks for GSMx5, GSMx6, GSMx7, GSMx8 are auto-inserted on first run.

## Customization
- Edit templates in `/templates` for UI changes
- Update `app.py` for backend logic
- Add images to `/static/images` for new models/branches
- 
## License
This project is for educational purposes only.
