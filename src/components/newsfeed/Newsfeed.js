import React, { useEffect, useState } from "react";
import styles from "./styles/newsfeed.module.css";
import { createNewPost, getNewsFeedPosts, getUser } from "@/lib/apiRoutes";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import { MdOutlinePoll } from "react-icons/md";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { GrSchedulePlay } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import Link from "next/link";
import PostCard from "../posts/PostCard";
import axios from "axios";

const Newsfeed = ({ userEmail, SessionUsername, id, sessionDPURL }) => {
  const [userData, setUserData] = useState(null);
  const [newsfeedPosts, setNewsfeedPosts] = useState(null);
  const [postText, setPostText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [postChanged, setPostChanged] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser(SessionUsername);
        if (response.status === 200) {
          setUserData(response.data.userData);
        }
      } catch (error) {
        console.error("Error fetching user data.");
      }
    };
    const fetchNewsfeedPosts = async () => {
      try {
        const response = await getNewsFeedPosts();
        if (response.status === 200) {
          console.log(response.data);
          setNewsfeedPosts(response.data.posts);
        }
      } catch (error) {
        console.error("Error fetching newsfeed posts.");
      }
    };
    if (postChanged) {
      fetchUserData();
      setPostChanged(false);
      return;
    }
    fetchUserData();
    fetchNewsfeedPosts();
  }, [postChanged]);
  console.log({ userData, newsfeedPosts });

  const handlePostDeleteAndEdit = () => {
    setPostChanged(true);
  };
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    var imageURL = null;
    if (selectedImage) {
      setUploading(true);
      try {
        if (selectedFile) {
          const formData = new FormData();
          formData.append("myImage", selectedFile);
          const { data } = await axios.post("/api/image", formData);
          imageURL = data.imageURL;
        }
      } catch (error) {
        console.log(error.response?.data);
      }
      setUploading(false);
    }
    try {
      const post = {
        username: userData?.username,
        postText: postText,
        imageURL: imageURL ? imageURL : "",
      };
      const res = await createNewPost({ post });
      const data = res.data;
      setPostText("");
      setUploading(false);
      setSelectedImage("");
      setSelectedFile("");
      imageURL = null;
      setPostChanged(true);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <LeftSideBar className={`${styles.leftSideBar}`} />

      <div className={`${styles.mainContainer}`}>
        <div className={`${styles.newsfeedDiv}`}>
          <div className={`${styles.topDiv}`}>
            <h4 className={`${styles.grayText}`}>For you</h4>
            <h4 className={`${styles.followingText}`}>Following</h4>
          </div>

          <div className={`${styles.createPostDiv}`}>
            <img
              src={sessionDPURL || "/images/dp_default.jpg"}
              alt=""
              className={`${styles.dp}`}
            />
            <form className={`${styles.postForm}`} onSubmit={handlePostSubmit}>
              <div>
                <textarea
                  type="text"
                  placeholder="What is happening?!"
                  onChange={(e) => setPostText(e.target.value)}
                  value={postText}
                />
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Image"
                    className={`${styles.uploadedImage}`}
                  />
                )}
                <p className={`${styles.postPrivacyDiv}`}>
                  <FaEarthAmericas /> &nbsp;Everyone can reply
                </p>
              </div>

              <div className={`${styles.mediaElementDiv}`}>
                <div className={`${styles.elementsDiv}`}>
                  <label>
                    <IoImageOutline />
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

                  <MdOutlineGifBox />
                  <MdOutlinePoll />
                  <MdOutlineEmojiEmotions />
                  <GrSchedulePlay />
                  <IoLocationOutline />
                </div>
                <button
                  type="submit"
                  className={`${styles.btnPostsPost}`}
                  disabled={!(postText || selectedImage)}
                >
                  {uploading ? "Uploading.." : "Post"}
                </button>
              </div>
            </form>
            <div className={`${styles.mediaDiv}`}></div>
          </div>

          {newsfeedPosts?.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              SessionUsername={SessionUsername}
              onPostDeleteAndEdit={handlePostDeleteAndEdit}
            />
          ))}
        </div>

        <RightSideBar className={`${styles.rightSideBar}`} />
      </div>
    </div>
  );
};

export default Newsfeed;
