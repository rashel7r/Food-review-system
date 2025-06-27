// EditProfile component allows users to edit their profile information, including name, username, email, bio, and avatar.
import React, { useRef, useState } from 'react';
import './EditProfile.css';

// Main functional component definition
function EditProfile({ user, onClose, onSave }) {
  // State hooks for form fields and their error messages
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username || '');
  const [email, setEmail] = useState(user.email || '');
  const [bio, setBio] = useState(user.about);
  const [avatar, setAvatar] = useState(user.avatar);
  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [bioError, setBioError] = useState('');
  // Ref for file input to trigger file dialog programmatically
  const fileInputRef = useRef(null);

  // Handle avatar photo change (when user selects a new image)
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result); // Set avatar to base64 image
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click to update photo
  const handleUpdatePhoto = () => {
    fileInputRef.current.click();
  };

  // Reset avatar to default image
  const handleRemovePhoto = () => {
    setAvatar('https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&h=256&q=80');
  };

  // Handlers for form field changes and validation
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value) setNameError('');
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value) setUsernameError('');
  };

  // Validate email format and presence
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!value) {
      setEmailError('field is required');
    } else if (!value.includes('@')) {
      setEmailError("'@' is missing, invalid email");
    } else {
      setEmailError('');
    }
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
    if (e.target.value) setBioError('');
  };

  // Handle form submission, validate all fields, and call onSave if valid
  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (!name) {
      setNameError('field is required');
      valid = false;
    }
    if (!username) {
      setUsernameError('field is required');
      valid = false;
    }
    if (!email) {
      setEmailError('field is required');
      valid = false;
    } else if (!email.includes('@')) {
      setEmailError("'@' is missing, invalid email");
      valid = false;
    }
    if (!bio) {
      setBioError('field is required');
      valid = false;
    }
    if (!valid) return;
    // Pass updated user data to parent component
    onSave({ name, username, email, about: bio, avatar });
  };

  // Render the edit profile modal UI
  return (
    <div className="edit-profile-modal-overlay">
      <div className="edit-profile-modal">
        <h2>Edit Profile</h2>
        {/* Profile photo and update/remove buttons */}
        <div className="edit-profile-photo-row">
          <img className="edit-profile-avatar" src={avatar} alt="Profile" />
          <div className="edit-profile-info">
            <div className="edit-profile-name">{name}</div>
            <div className="edit-profile-username">{username || 'Janedoe123'}</div>
          </div>
          <div className="edit-profile-photo-btns">
            <button className="edit-profile-photo-btn update" type="button" onClick={handleUpdatePhoto}>Update Photo</button>
            <button className="edit-profile-photo-btn remove" type="button" onClick={handleRemovePhoto}>Remove Photo</button>
            {/* Hidden file input for photo upload */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handlePhotoChange}
            />
          </div>
        </div>
        {/* Profile edit form */}
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <label>Name
            <input type="text" value={name} onChange={handleNameChange} />
            {nameError && <div className="edit-profile-error">{nameError}</div>}
          </label>
          <label>Username
            <input type="text" value={username} onChange={handleUsernameChange} />
            {usernameError && <div className="edit-profile-error">{usernameError}</div>}
          </label>
          <label>Email
            <input type="email" value={email} onChange={handleEmailChange} />
            {emailError && <div className="edit-profile-error">{emailError}</div>}
          </label>
          <label>Bio
            <input type="text" value={bio} onChange={handleBioChange} />
            {bioError && <div className="edit-profile-error">{bioError}</div>}
          </label>
          <div className="edit-profile-actions">
            <button type="button" className="edit-profile-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="edit-profile-save">Update Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Export the EditProfile component as default
export default EditProfile; 