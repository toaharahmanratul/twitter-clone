import React from "react";
import styles from "./styles/delete-confirmation-modal.module.css";

const DeleteConfirmationModal = ({ onCancel, onDelete }) => {
  return (
    <div className={`${styles.modalContainer}`}>
      <div className={`${styles.modalContent}`}>
        <div>
          <h3 className={`${styles.modalHeadings}`}>Delete post?</h3>
          <p className={`${styles.modalMessage}`}>
            This can’t be undone and it will be removed from your profile, the
            timeline of any accounts that follow you, and from search results.{" "}
          </p>
        </div>
        <div className={`${styles.modalButtons}`}>
          <button className={`${styles.yes}`} onClick={onDelete}>
            Delete
          </button>
          <button className={`${styles.no}`} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
