import React, { useState, useRef, useEffect } from 'react';
import './AddReviewModal.css';
import { FaCamera, FaCheckCircle } from 'react-icons/fa';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function AddReviewModal({ isOpen, onClose, onSubmit, initialData = {}, isEdit = false, buttonLabel = 'Submit' }) {
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [foodName, setFoodName] = useState('');
  const [foodType, setFoodType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [review, setReview] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isEdit && initialData) {
      setAvatar(null);
      setAvatarPreview(initialData.avatar || null);
      setFoodName(initialData.foodName || initialData.productName || '');
      setFoodType(initialData.foodType || '');
      setDate(initialData.date || '');
      setTime(initialData.time || '');
      setReview(initialData.review || '');
    } else if (isOpen && !isEdit) {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const hh = String(now.getHours() + 0).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      setAvatar(null);
      setAvatarPreview(null);
      setFoodName('');
      setFoodType('');
      setDate(`${yyyy}-${mm}-${dd}`);
      setTime(`${hh}:${min}`);
      setReview('');
    } else if (!isOpen) {
      setAvatar(null);
      setAvatarPreview(null);
      setFoodName('');
      setFoodType('');
      setDate('');
      setTime('');
      setReview('');
    }
    setShowSuccess(false);
  }, [isEdit, initialData, isOpen]);

  if (!isOpen) return null;

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(file);
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!foodName || !foodType || !date || !time || !review) return;
    
    // Show success message
    setShowSuccess(true);
    
    // Submit the review data
    onSubmit({
      avatar: avatarPreview,
      foodName,
      foodType,
      date,
      time,
      review
    });

    // Reset form and close modal after delay
    setTimeout(() => {
      setShowSuccess(false);
      setAvatar(null);
      setAvatarPreview(null);
      setFoodName('');
      setFoodType('');
      setDate('');
      setTime('');
      setReview('');
      onClose();
    }, 2000);
  };

  return (
    <div className="add-review-modal-overlay">
      <div className={`add-review-modal${showSuccess ? ' success-blur' : ''}`}>
        {showSuccess && (
          <div className="review-success-popup">
            <FaCheckCircle className="review-success-icon" />
            {isEdit ? 'Review updated successfully!' : 'Review added successfully!'}
          </div>
        )}
        <h2>{isEdit ? 'Edit Review' : 'Add Review'}</h2>
        <form onSubmit={handleSubmit} className="add-review-form">
          <div className="avatar-upload-section">
            <div className="avatar-preview">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" />
              ) : (
                <div className="avatar-placeholder"><FaCamera /></div>
              )}
            </div>
            <button type="button" className="avatar-upload-btn" onClick={handleAvatarUploadClick}>
              {avatarPreview ? 'Change Photo' : 'Upload Photo'}
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
          </div>
          <div className="form-group">
            <label>Food Name</label>
            <input
              type="text"
              value={foodName}
              onChange={e => setFoodName(e.target.value)}
              required
              placeholder="Enter food name"
            />
          </div>
          <div className="form-group">
            <label>Food Type</label>
            <input
              type="text"
              value={foodType}
              onChange={e => setFoodType(e.target.value)}
              required
              placeholder="e.g. Dessert, Main Course, Snack"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <div className="input-with-icon">
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                />
                     <svg style={{position: "absolute",top: "20%",zIndex: "100",left: "5px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#ff9100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar">
  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
  <line x1="16" y1="2" x2="16" y2="6"/>
  <line x1="8" y1="2" x2="8" y2="6"/>
  <line x1="3" y1="10" x2="21" y2="10"/>
</svg>
              </div>
            </div>
            <div className="form-group">
              <label>Time</label>
              <div className="input-with-icon">
                <input
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  required
                />
                 <svg style={{position: "absolute",top: "20%",zIndex: "100",left: "5px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#ff9100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock">
  <circle cx="12" cy="12" r="10"/>
  <polyline points="12 6 12 12 16 14"/>
</svg>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Review</label>
            <textarea
              value={review}
              onChange={e => setReview(e.target.value)}
              required
              placeholder="Write your review..."
              rows="3"
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn">{buttonLabel}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReviewModal; 