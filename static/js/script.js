// ================================================
// UNIVERSAL SCRIPT FOR ALL PAGES
// ================================================

/**
 * DOM Ready Handler
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNavigation();
    initFeedbackForm();
    initAdminLogin();
    initImageCarousel();
});

/**
 * ================================================
 * NAVIGATION FUNCTIONALITY
 * ================================================
 */
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

/**
 * ================================================
 * FEEDBACK FORM FUNCTIONALITY
 * ================================================
 */
function initFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    if (!feedbackForm) return;

    // Star Rating System
    const stars = document.querySelectorAll('.star-rating .star');
    const ratingInput = document.getElementById('rating');
    const ratingText = document.getElementById('ratingText');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            ratingInput.value = rating;
            
            // Update visual display
            stars.forEach((s, idx) => {
                s.classList.toggle('active', idx < rating);
            });
            
            // Update rating text
            const ratingMessages = [
                "Please select a rating",
                "Poor",
                "Fair",
                "Good",
                "Very Good",
                "Excellent"
            ];
            ratingText.textContent = ratingMessages[rating];
        });
    });

    // Form Submission
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        
        // Show loading state
        submitBtn.classList.add('loading');
        
        // Simulate form submission (replace with actual AJAX call)
        setTimeout(() => {
            // Randomly determine success/failure for demo
            const isSuccess = Math.random() > 0.3;
            
            if (isSuccess) {
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                this.reset();
                
                // Reset stars
                stars.forEach(star => star.classList.remove('active'));
                ratingText.textContent = "Please select a rating";
            } else {
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            }
            
            submitBtn.classList.remove('loading');
            
            // Hide messages after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
                errorMessage.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}

/**
 * ================================================
 * ADMIN LOGIN & DASHBOARD FUNCTIONALITY
 * ================================================
 */
function initAdminLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const loginBtn = this.querySelector('.login-btn');
        const errorModal = document.getElementById('errorModal');
        
        // Show loading state
        loginBtn.classList.add('loading');
        
        // Simulate login (replace with real authentication)
        setTimeout(() => {
            // For demo, accept any adminId that starts with "admin" and password length > 5
            const adminId = this.adminId.value;
            const password = this.password.value;
            const isValid = adminId.toLowerCase().startsWith('admin') && password.length >= 6;
            
            if (isValid) {
                // Successful login - redirect or show dashboard
                if (document.getElementById('dashboardSection')) {
                    // Already on the page, just show dashboard
                    document.getElementById('loginSection').style.display = 'none';
                    document.getElementById('dashboardSection').style.display = 'block';
                    initDashboard();
                } else {
                    // In a real app, redirect to dashboard
                    console.log('Redirecting to dashboard...');
                }
            } else {
                // Show error modal
                errorModal.style.display = 'flex';
            }
            
            loginBtn.classList.remove('loading');
        }, 1200);
    });

    // Close modal button
    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            document.getElementById('errorModal').style.display = 'none';
        });
    }

    // Logout button (if on dashboard)
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            document.getElementById('dashboardSection').style.display = 'none';
            document.getElementById('loginSection').style.display = 'block';
        });
    }
}

/**
 * Initialize Dashboard Functionality
 */
function initDashboard() {
    // Simulate loading data
    setTimeout(() => {
        document.getElementById('totalFeedback').textContent = '247';
        document.getElementById('avgRating').textContent = '4.2';
        document.getElementById('todayFeedback').textContent = '12';
        document.getElementById('unreadCount').textContent = '5';
        
        // Initialize chart if on dashboard page
        if (document.getElementById('ratingChart')) {
            initRatingChart();
        }
    }, 1000);

    // Handle export button
    const exportBtn = document.getElementById('exportCsvBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            alert('Exporting data to CSV...');
        });
    }

    // Toggle read/unread status
    document.querySelectorAll('.feedback-card').forEach(card => {
        const readBtn = card.querySelector('.mark-read-btn, .mark-unread-btn');
        const readStatus = card.querySelector('.read-status');
        
        if (readBtn && readStatus) {
            readBtn.addEventListener('click', function() {
                const isRead = readStatus.classList.contains('read');
                
                if (isRead) {
                    readStatus.classList.remove('read');
                    readStatus.classList.add('unread');
                    readStatus.title = 'Unread';
                    readBtn.textContent = 'Mark as Read';
                    readBtn.classList.remove('mark-unread-btn');
                    readBtn.classList.add('mark-read-btn');
                } else {
                    readStatus.classList.remove('unread');
                    readStatus.classList.add('read');
                    readStatus.title = 'Read';
                    readBtn.textContent = 'Mark as Unread';
                    readBtn.classList.remove('mark-read-btn');
                    readBtn.classList.add('mark-unread-btn');
                }
            });
        }
    });
}

/**
 * Initialize Rating Chart (Dashboard)
 */
function initRatingChart() {
    // For demo purposes - in a real app you would use Chart.js or similar
    console.log('Initializing rating chart visualization');
    
    // This would be replaced with actual chart initialization code
    // Example if using Chart.js:
    /*
    const ctx = document.getElementById('ratingChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
            datasets: [{
                label: 'Rating Distribution',
                data: [12, 19, 33, 78, 105],
                backgroundColor: '#667eea'
            }]
        }
    });
    */
}

/**
 * ================================================
 * PRODUCT IMAGE CAROUSEL (INDEX PAGE)
 * ================================================
 */
function initImageCarousel() {
    const mainImage = document.querySelector('.main-phone-image');
    if (!mainImage) return;

    const thumbnails = document.querySelectorAll('.thumbnail');
    const images = document.querySelectorAll('.phone-img');
    
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update main image
            const imgIndex = this.getAttribute('data-index');
            images.forEach(img => img.classList.remove('active'));
            images[imgIndex].classList.add('active');
        });
    });

    // Auto-rotate every 5 seconds if implemented
}

/**
 * ================================================
 * UTILITY FUNCTIONS
 * ================================================
 */

/**
 * Show a toast notification
 */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Toggle hiding the scrollbar by toggling a class on body
 */
function toggleScrollbar(hide) {
    if (hide) {
        document.body.classList.add('hide-scrollbar');
    } else {
        document.body.classList.remove('hide-scrollbar');
    }
}

/**
 * Show the logo image popup modal
 */
function showLogoPopup() {
    const modal = document.getElementById('logoModal');
    if (modal) {
        modal.classList.add('show');
        toggleScrollbar(true);
    }
}

/**
 * Hide the logo image popup modal
 */
function hideLogoPopup() {
    const modal = document.getElementById('logoModal');
    if (modal) {
        modal.classList.remove('show');
        toggleScrollbar(false);
    }
}

// Add event listener to close button of logo modal
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.getElementById('closeLogoModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideLogoPopup);
    }
});
