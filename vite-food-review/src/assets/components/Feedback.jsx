import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaCamera, FaCalendarAlt, FaClock } from 'react-icons/fa';
import '../styles/Feedback.css';

function Feedback() {
    const navigate = useNavigate();
    const currentDate = new Date();
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };
    
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        rating: 5,
        feedback: '',
        profilePicture: null
    });

    const [displayDate, setDisplayDate] = useState('');
    const [displayTime, setDisplayTime] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'date' && value) {
            setDisplayDate(formatDate(value));
        } else if (name === 'time' && value) {
            setDisplayTime(formatTime(value));
        }
    };

    const handleRatingClick = (rating) => {
        setFormData(prevState => ({
            ...prevState,
            rating
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 500 * 1024) {
                alert('Image size should be less than 500KB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData(prevState => ({
                    ...prevState,
                    profilePicture: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save feedback to localStorage
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
        feedbacks.push({
            ...formData,
            id: Date.now(),
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
        
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            navigate('/feedback-display');
        }, 2000);
    };

    return (
        <>
          <div className="feedback-bg"></div>
          <div className="feedback-form-wrapper">
            {showSuccess && (
                <div className="success-message">
                    Feedback submitted successfully!
                </div>
            )}
            <div className="feedback-container">
                <form onSubmit={handleSubmit} className="feedback-form">
                    <h2>Share Your Feedback</h2>
                    
                    <div className="profile-section">
                        <div className="profile-picture">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Profile" />
                            ) : (
                                <div className="profile-placeholder">
                                    <FaCamera />
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            id="profilePic"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="file-input"
                        />
                        <label htmlFor="profilePic" className="upload-label">
                            {imagePreview ? 'Change Photo' : 'Add Photo'}
                        </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <div className="input-with-icon">
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                />
                                  <svg style={{position: "absolute",top: "20%",zIndex: "100",left: "5px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#ff9100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar">
  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
  <line x1="16" y1="2" x2="16" y2="6"/>
  <line x1="8" y1="2" x2="8" y2="6"/>
  <line x1="3" y1="10" x2="21" y2="10"/>
</svg>
                                <span className="display-value">{displayDate}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Time</label>
                            <div className="input-with-icon">
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    required
                                />
                              

                              <svg style={{position: "absolute",top: "20%",zIndex: "100",left: "5px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#ff9100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock">
  <circle cx="12" cy="12" r="10"/>
  <polyline points="12 6 12 12 16 14"/>
</svg>

                                <span className="display-value">{displayTime}</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <div className="rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    className={`star ${star <= formData.rating ? 'active' : ''}`}
                                    onClick={() => handleRatingClick(star)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="feedback">Your Feedback</label>
                        <textarea
                            id="feedback"
                            name="feedback"
                            value={formData.feedback}
                            onChange={handleInputChange}
                            required
                            placeholder="Share your experience..."
                            rows="4"
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    </>
    );
}

export default Feedback; 