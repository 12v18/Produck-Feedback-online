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

## Output:
<img width="1885" height="966" alt="Image" src="https://github.com/user-attachments/assets/cc608195-bf04-4f55-bbfc-332aa5205bf4" />
<img width="953" height="407" alt="Image" src="https://github.com/user-attachments/assets/36462635-d4c1-4cff-a0c4-6a73c62bd947" />
<img width="951" height="410" alt="Image" src="https://github.com/user-attachments/assets/860438a8-a7da-4275-9533-11bfb1b00f4f" />
<img width="946" height="416" alt="Image" src="https://github.com/user-attachments/assets/57b98681-043b-458e-8b51-8764fd03da96" />
<img width="937" height="415" alt="Image" src="https://github.com/user-attachments/assets/53eef4ce-d7b6-4b38-a83c-d4267d640b09" />
<img width="949" height="422" alt="Image" src="https://github.com/user-attachments/assets/5c208241-e5fc-4ae7-b12a-a932d1d9a04e" />

## License
This project is for educational purposes only.
