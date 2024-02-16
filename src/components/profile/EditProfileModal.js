import React, { useState } from "react";
import styles from "./styles/edit-profile-modal.module.css";

const EditProfileModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  

  const handleSave = () => {
    console.log("Saving changes:", { name, bio });
    onClose();
  };

  return (
    <div className={`${styles.modal} ${isOpen && styles.modalOpen}`}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <span className={styles.closeButton} onClick={onClose}>
            &times;
          </span>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
        </div>
        <div className={styles.modalBody}>
          <label className={styles.modalLabel} htmlFor="name">
            Name:
          </label>
          <input
            className={styles.inputField}
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className={styles.modalLabel} htmlFor="bio">
            Bio:
          </label>
          <textarea
            className={styles.inputField}
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
