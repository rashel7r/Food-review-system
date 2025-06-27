// UserProfile component displays the user's profile information, including posts, stats, and allows editing the profile.
import './UserProfile.css';
import { useRef, useState } from 'react';
import { MdOutlineImage, MdOutlineMovie, MdOutlineBookmarkBorder, MdOutlineLocalOffer, MdOutlineRateReview } from 'react-icons/md';
import { BsThreeDotsVertical, BsCheckCircleFill } from 'react-icons/bs';
import Cappuccino from "../foodimages/Cappuccino.jpg";
import Salad from "../foodimages/Salad.jpg";
import Pancakes from "../foodimages/Pancakes.jpg";
import Pasta from "../foodimages/Pasta.jpg";
import FriedFish from "../foodimages/FriedFish.jpg";
import Spagetti from "../foodimages/Spagetti.jpg";
import EditProfile from './EditProfile';
import IconButton from '@mui/material/IconButton';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useNavigate } from 'react-router-dom';
import AddReviewModal from './AddReviewModal';

function UserProfile({ initialUser, onLogout }) {
  const navigate = useNavigate();
  // Ref for file input to trigger file dialog programmatically
  const fileInputRef = useRef(null);
  // State for posts and user information
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [taggedPosts, setTaggedPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('post');
  const [user, setUser] = useState({
    name: initialUser?.username || '',
    username: initialUser?.username || '',
    email: initialUser?.email || '',
    avatar: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&h=256&q=80",
    reviews: posts.length,
    followers: 89,
    following: 300,
    about: "Food Explorer"
  });
  const [showEdit, setShowEdit] = useState(false);
  const [menuOpenIdx, setMenuOpenIdx] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const [editReviewIdx, setEditReviewIdx] = useState(null);
  const [editReviewData, setEditReviewData] = useState(null);

  // Handle adding a new review (open modal)
  const handleAddPostClick = () => {
    setEditReviewIdx(null);
    setEditReviewData(null);
    setShowAddReview(true);
  };

  // Handle file change for new post
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPosts = [event.target.result, ...posts];
        setPosts(newPosts);
        setUser(prev => ({ ...prev, reviews: newPosts.length }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Open edit profile modal
  const handleEditProfile = () => {
    setShowEdit(true);
  };

  // Close edit profile modal
  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  // Save updated profile information
  const handleSaveEdit = (updated) => {
    setUser((prev) => ({ ...prev, ...updated }));
    setShowEdit(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // Open menu for a specific post
  const handleMenuOpen = (idx) => {
    setMenuOpenIdx(idx);
  };

  // Close menu
  const handleMenuClose = () => {
    setMenuOpenIdx(null);
  };

  // Delete a post
  const handleDeletePost = (idx) => {
    const newPosts = posts.filter((_, i) => i !== idx);
    setPosts(newPosts);
    setUser(prev => ({ ...prev, reviews: newPosts.length }));
    setMenuOpenIdx(null);
  };

  // Handle save/unsave review
  const handleSaveReview = (review) => {
    if (!savedPosts.some(r => r.id === review.id)) {
      setSavedPosts([...savedPosts, review]);
    }
    setMenuOpenIdx(null);
  };

  const handleUnsaveReview = (review) => {
    setSavedPosts(savedPosts.filter(r => r.id !== review.id));
    setMenuOpenIdx(null);
  };

  // Handle tag/untag review
  const handleTagReview = (review) => {
    if (!taggedPosts.some(r => r.id === review.id)) {
      setTaggedPosts([...taggedPosts, review]);
    }
    setMenuOpenIdx(null);
  };

  const handleUntagReview = (review) => {
    setTaggedPosts(taggedPosts.filter(r => r.id !== review.id));
    setMenuOpenIdx(null);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle submit from AddReviewModal (add or update)
  const handleAddReviewSubmit = (reviewData) => {
    if (editReviewIdx !== null) {
      // Update existing review
      const updatedPosts = posts.map((r, idx) => idx === editReviewIdx ? { ...r, ...reviewData } : r);
      setPosts(updatedPosts);
      setEditReviewIdx(null);
      setEditReviewData(null);
    } else {
      // Add new review
      const newReview = {
        ...reviewData,
        id: Date.now(),
      };
      setPosts([newReview, ...posts]);
      setUser(prev => ({ ...prev, reviews: posts.length + 1 }));
    }
    setShowAddReview(false);
  };

  // Handle edit review
  const handleEditReview = (idx) => {
    setEditReviewIdx(idx);
    setEditReviewData(posts[idx]);
    setShowAddReview(true);
  };

  // Handle delete review
  const handleDeleteReview = (idx) => {
    const newPosts = posts.filter((_, i) => i !== idx);
    setPosts(newPosts);
    setUser(prev => ({ ...prev, reviews: newPosts.length }));
    setMenuOpenIdx(null);
  };

  // Get posts to display based on active tab
  const getDisplayPosts = () => {
    switch (activeTab) {
      case 'reviews':
        return posts;
      case 'saved':
        return savedPosts;
      case 'tagged':
        return taggedPosts;
      default:
        return [];
    }
  };

  // Handle logout
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  // Render the user profile UI
  return (
    <div className="profile-container">
      <div className="user-profile">
        <div className="profile-header">
          <img className="profile-avatar" src={user.avatar} alt="Profile" />
          <div className="profile-details">
            <div className="profile-main-info">
              <div className="profile-name-container">
                <span className="profile-name">{user.name}</span>
                <span className="profile-username">@{user.username}</span>
              </div>
              <button className="edit-profile-btn" onClick={handleEditProfile}>Edit Profile</button>
              <IconButton color="primary" aria-label="feedback" onClick={() => navigate('/feedback')} style={{ marginLeft: 8 }} className="book-icon-bordered">
                <MenuBookIcon />
              </IconButton>
            </div>
            <div className="profile-stats">
              <div>
                <div className="stat-number">{posts.length}</div>
                <div className="stat-label">Reviews</div>
              </div>
              <div>
                <div className="stat-number">{user.followers}</div>
                <div className="stat-label">Followers</div>
              </div>
              <div>
                <div className="stat-number">{user.following}</div>
                <div className="stat-label">Following</div>
              </div>
            </div>
            <div className="profile-about">{user.about}</div>
          </div>
        </div>
        <hr className="divider" />
        <div className="profile-tabs-row">
          <div className="profile-tabs">
            <TabIcon 
              icon={<MdOutlineImage />} 
              label="Post" 
              active={activeTab === 'post'} 
              onClick={() => handleTabChange('post')}
            />
            <TabIcon 
              icon={<MdOutlineRateReview />} 
              label="Reviews" 
              active={activeTab === 'reviews'}
              onClick={() => handleTabChange('reviews')}
            />
            <TabIcon 
              icon={<MdOutlineBookmarkBorder />} 
              label="Saved" 
              active={activeTab === 'saved'}
              onClick={() => handleTabChange('saved')}
            />
            <TabIcon 
              icon={<MdOutlineLocalOffer />} 
              label="Tagged" 
              active={activeTab === 'tagged'}
              onClick={() => handleTabChange('tagged')}
            />
          </div>
          <div className="profile-actions">
            {activeTab === 'post' && (
              <button className="add-post-btn" onClick={handleAddPostClick}>Add Review</button>
            )}
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
        <div className="profile-posts-grid" style={['reviews','saved','tagged'].includes(activeTab) ? { gap: '18px' } : {}}>
          {getDisplayPosts().map((review, idx) => (
            <div className="profile-post-img-wrapper horizontal-review" key={review.id || idx} onMouseLeave={handleMenuClose} style={{width:"400px",height:"80px"}}>
              <div className="review-avatar-section">
                {review.avatar ? (
                  <img src={review.avatar} alt="avatar" className="review-avatar" />
                ) : (
                  <div className="review-avatar-placeholder" />
                )}
              </div>
              <div className="review-details-section">
                <div className="review-product-name">{review.foodName}</div>
                <div className="review-food-type">{review.foodType}</div>
                <div className="review-meta">
                  <span>{review.date}</span> | <span>{review.time}</span>
                </div>
                <div className="review-text">{review.review}</div>
              </div>
              <div className="post-menu-icon-wrapper">
                <BsThreeDotsVertical
                  className="post-menu-icon"
                  onClick={() => handleMenuOpen(idx)}
                />
                {menuOpenIdx === idx && (
                  <div className="post-menu-popup">
                    {activeTab === 'reviews' && (
                      <>
                        <button onClick={() => handleSaveReview(review)} className="post-menu-save">Save</button>
                        <button onClick={() => handleTagReview(review)} className="post-menu-tag">Tag</button>
                        <button onClick={() => handleEditReview(idx)} className="post-menu-tag">Edit</button>
                        <button onClick={() => handleDeleteReview(idx)} className="post-menu-delete">Delete</button>
                      </>
                    )}
                    {activeTab === 'saved' && (
                      <button onClick={() => handleUnsaveReview(review)} className="post-menu-unsave">Unsave</button>
                    )}
                    {activeTab === 'tagged' && (
                      <button onClick={() => handleUntagReview(review)} className="post-menu-untag">Untag</button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {showEdit && (
        <EditProfile user={user} onClose={handleCloseEdit} onSave={handleSaveEdit} />
      )}
      {showSuccess && (
        <div className="profile-success-popup">
          <BsCheckCircleFill className="profile-success-icon" />
          <span>Profile Successfully Updated</span>
        </div>
      )}
      <AddReviewModal
        isOpen={showAddReview}
        onClose={() => { setShowAddReview(false); setEditReviewIdx(null); setEditReviewData(null); }}
        onSubmit={handleAddReviewSubmit}
        initialData={editReviewData}
        isEdit={editReviewIdx !== null}
        buttonLabel={editReviewIdx !== null ? 'Update' : 'Submit'}
      />
    </div>
  );
}

// TabIcon component for displaying tab icons
function TabIcon({ icon, label, active, onClick }) {
  return (
    <div className={`tab-icon${active ? ' active' : ''}`} onClick={onClick}>
      <span style={{ marginRight: 6, fontSize: 22 }}>{icon}</span>
      {label}
    </div>
  );
}

// Export the UserProfile component as default
export default UserProfile; 