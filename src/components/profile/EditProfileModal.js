import React, { useEffect, useState } from "react";
import styles from "./styles/edit-profile-modal.module.css";
import { FiCamera } from "react-icons/fi";
import axios from "axios";
import { updateProfile } from "@/lib/apiRoutes";

const EditProfileModal = ({ isOpen, onClose, userData }) => {
  const [newDPURL, setNewDPURL] = useState(userData?.dpURL);
  const [newCoverURL, setNewCoverURL] = useState(userData?.coverURL);
  const [newName, setNewName] = useState(userData?.name);
  const [newBio, setNewBio] = useState(userData?.bio);
  const [uploadingDP, setUploadingDP] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [selectedCover, setSelectedCover] = useState("");
  const [selectedCoverFile, setSelectedCoverFile] = useState("");
  const [selectedDP, setSelectedDP] = useState("");
  const [selectedDPFile, setSelectedDPFile] = useState("");

  useEffect(() => {
    setNewDPURL(userData?.dpURL);
    setNewCoverURL(userData?.coverURL);
    setNewName(userData?.name);
    setNewBio(userData?.bio);
    setUploadingDP(false);
    setUploadingCover(false);
    setSelectedCover("");
    setSelectedCoverFile("");
    setSelectedDP("");
    setSelectedDPFile("");
  }, [userData, onClose]);

  const handleSubmit = async () => {
    let newDpUrl = newDPURL;
    let newCoverUrl = newCoverURL;

    if (selectedDPFile) {
      setUploadingDP(true);
      try {
        const formData = new FormData();
        formData.append("myImage", selectedDPFile);
        const { data } = await axios.post("/api/image", formData);
        newDpUrl = data.imageURL;
      } catch (error) {
        console.error("Error uploading DP image:", error.message);
        console.error(error.stack);
        // console.log("Error uploading DP image:", error.response?.data);
      }
      setUploadingDP(false);
    }

    if (selectedCoverFile) {
      setUploadingCover(true);
      try {
        const formData = new FormData();
        formData.append("myImage", selectedCoverFile);
        const { data } = await axios.post("/api/image", formData);
        newCoverUrl = data.imageURL;
      } catch (error) {
        console.error("Error uploading Cover image:", error.message);
        console.error(error.stack);
      }
      setUploadingCover(false);
    }

    const payload = {
      dpURL: newDpUrl,
      coverURL: newCoverUrl,
      name: newName,
      bio: newBio,
    };

    const response = await updateProfile(userData?.username, payload);
    const data = response.json();
    console.log("Response from updateProfile: ", data);

    // console.log("Saving changes from modal:", payload);
  };

  // console.log("From Modal: ", { newDPURL, newCoverURL, newName, newBio });

  return (
    <div className={`${styles.modal} ${isOpen && styles.modalOpen}`}>
      <div className={`${styles.modalContent}`}>
        <form onSubmit={handleSubmit}>
          <div className={`${styles.modalHeader}`}>
            <span className={`${styles.closeButton}`} onClick={onClose}>
              &times;
            </span>
            <button type="submit" className={`${styles.saveButton}`}>
              Save
            </button>
          </div>
          <div className={`${styles.dpCoverDiv}`}>
            <div className={`${styles.coverPhotoDiv}`}>
              <label>
                <FiCamera className={`${styles.cameraIconOnCover}`} />
                <input
                  type="file"
                  hidden
                  onChange={({ target }) => {
                    if (target.files) {
                      const file = target.files[0];
                      setSelectedCover(URL?.createObjectURL(file));
                      setSelectedCoverFile(file);
                    }
                  }}
                />
              </label>
              {selectedCover && (
                <img
                  src={selectedCover || ""}
                  alt=""
                  className={`${styles.profileCover}`}
                />
              )}
              {!selectedCover && (
                <img
                  src={newCoverURL || ""}
                  alt=""
                  className={`${styles.profileCover}`}
                />
              )}
            </div>
            <div className={`${styles.profileDPDiv}`}>
              <label className={`${styles.cameraIconOnDP}`}>
                <FiCamera />
                <input
                  type="file"
                  hidden
                  onChange={({ target }) => {
                    if (target.files) {
                      const file = target.files[0];
                      setSelectedDP(URL?.createObjectURL(file));
                      setSelectedDPFile(file);
                    }
                  }}
                />
              </label>
              {selectedDP && (
                <img
                  src={selectedDP || ""}
                  alt={`${newName}'s Profile`}
                  className={`${styles.profileDP}`}
                />
              )}
              {!selectedDP && (
                <img
                  src={newDPURL || "/images/dp_default.jpg"}
                  alt={`${newName}'s Profile`}
                  className={`${styles.profileDP}`}
                />
              )}
            </div>
          </div>
          <div className={`${styles.modalBody}`}>
            <label className={`${styles.modalLabel}`} htmlFor="name">
              Name:
            </label>
            <input
              className={`${styles.inputFieldName}`}
              type="text"
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />

            <label className={`${styles.modalLabel}`} htmlFor="bio">
              Bio:
            </label>
            <textarea
              className={`${styles.inputFieldBio}`}
              id="bio"
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
