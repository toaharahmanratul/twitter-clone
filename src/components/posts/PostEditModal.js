import React, { useState } from "react";
import styles from "./styles/post-edit-modal.module.css";
import { FiCamera } from "react-icons/fi";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";

const PostEditModal = ({ onCancel, onSave, post }) => {
  const [newPostText, setNewPostText] = useState(post?.postText);
  const [newImageURL, setNewImageURL] = useState(post?.imageURL);
  const [likes, setLikes] = useState(post?.likes);

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    let newImageURLVar = newImageURL;
    if (selectedImage) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("myImage", selectedFile);
        const { data } = await axios.post("/api/image", formData);
        newImageURLVar = data.imageURL;
      } catch (error) {
        console.error("Error uploading image:", error.message);
        console.error(error.stack);
      }
      setUploading(false);
    }
    const editedPost = {
      newPostText,
      newImageURL: newImageURLVar,
      likes: likes,
    };

    onSave(editedPost);

    setNewPostText("");
    setNewImageURL("");
    setSelectedImage("");
    setSelectedFile(null);
  };

  const handleRemoveImage = () => {
    setNewImageURL("");
    setSelectedImage("");
    setSelectedFile(null);
  };

  return (
    <div className={`${styles.modalContainer}`}>
      <div className={`${styles.modalContent}`}>
        <form onSubmit={handleSaveChanges} className={`${styles.editForm}`}>
          <div className={`${styles.formTopDiv}`}>
            <h3 className={`${styles.modalHeadings}`}>Edit your post</h3>
            <button type="submit" className={`${styles.saveButton}`}>
              Save changes
            </button>
          </div>
          <label className={`${styles.labelTextArea}`}>
            Tweet
            <textarea
              className={`${styles.tweetTextArea}`}
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />
          </label>
          {(newImageURL || selectedImage) && (
            <div className={`${styles.closeButtonDiv}`}>
              <IoMdCloseCircle
                className={`${styles.closeButton}`}
                onClick={handleRemoveImage}
              />
            </div>
          )}

          <label>
            <FiCamera className={`${styles.cameraIconOnImage}`} />
            <input
              type="file"
              hidden
              onChange={({ target }) => {
                if (target.files) {
                  const file = target.files[0];
                  setSelectedImage(URL?.createObjectURL(file));
                  setSelectedFile(file);
                }
              }}
            />
          </label>
          <div className={`${styles.postImageDiv}`}>
            {selectedImage && (
              <img
                src={selectedImage}
                alt=""
                className={`${styles.postImage}`}
              />
            )}
            {!selectedImage && (
              <img src={newImageURL} alt="" className={`${styles.postImage}`} />
            )}
          </div>
        </form>

        <button className={`${styles.cancelButton}`} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PostEditModal;
