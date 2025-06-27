import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/FeedbackDisplay.css';
// import feedbackBg from '../foodimages/FeedbackDisplay.jpg';
function FeedbackDisplay() {
    const [allFeedbacks, setAllFeedbacks] = useState([]);
    const [currentRating, setCurrentRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);

    useEffect(() => {
        const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]')
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setAllFeedbacks(storedFeedbacks);
        // document.body.style.backgroundImage = `url(${feedbackBg}) !important`;
        // document.body.style.backgroundSize = "cover";
        // document.body.style.backgroundRepeat = "no-repeat";
        // document.body.style.backgroundPosition = "center";

        // Optional: clean up when component unmounts
        // return () => {
        //     document.body.style.backgroundImage = '';
        // };
    }, []);

    const handleDelete = (feedbackId) => {
        const updatedFeedbacks = allFeedbacks.filter(feedback => feedback.id !== feedbackId);
        setAllFeedbacks(updatedFeedbacks);
        localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
    };
    
    const handleStarClick = (rating) => {
        setCurrentRating(rating);
    };

    const handleStarHover = (rating) => {
        setHoveredRating(rating);
    };

    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric'
        });
    };

    const formatTime = (timeStr) => {
        const time = new Date(`2000-01-01T${timeStr}`);
        return time.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
        });
    };

    return (
        <div className="feedback-display">
            <div className="background-image" />
            <div className="feedback-content">
                <div className="rating-section">
                    <h2>Please Rate your Experience</h2>
                    <div className="star-rating" onMouseLeave={handleMouseLeave}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <div 
                                key={star} 
                                className="rating-item"
                                onClick={() => handleStarClick(star)}
                                onMouseEnter={() => handleStarHover(star)}
                            >
                                <FaStar 
                                    className={star <= (hoveredRating || currentRating) ? "star filled" : "star"}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="rating-labels">
                        <span>Hated it</span>
                        <span>Loved it</span>
                    </div>
                </div>

                <div className="reviews-section">
                    {allFeedbacks.map((feedback) => (
                        <div key={feedback.id} className="review-card">
                            <div className="review-header">
                                <div className="reviewer-info">
                                    <div className="avatar">
                                        {feedback.profilePicture ? (
                                            <img 
                                                src={feedback.profilePicture} 
                                                alt={feedback.name} 
                                                className="avatar-image"
                                            />
                                        ) : (
                                            feedback.name[0].toUpperCase()
                                        )}
                                    </div>
                                    <div className="reviewer-details">
                                        <span className="reviewer-name">{feedback.name}</span>
                                    </div>
                                </div>
                                <div className="review-actions">
                                    <div className="review-rating">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar 
                                                key={star}
                                                className={star <= feedback.rating ? "star filled" : "star"}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="review-content">
                                <p className="review-text">{feedback.comment || feedback.feedback}</p>
                                <div className="review-footer">
                                    <button 
                                        className="delete-button"
                                        onClick={() => handleDelete(feedback.id)}
                                    >
                                        <DeleteIcon style={{ color: '#000000' }} />
                                    </button>
                                    <span className="review-date">
                                        {formatDate(feedback.date)}<br />{formatTime(feedback.time)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FeedbackDisplay; 