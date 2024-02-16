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

const Newsfeed = ({ userEmail, SessionUsername, id }) => {
  const [userData, setUserData] = useState(null);
  const [newsfeedData, setNewsfeedData] = useState(null);
  const [postText, setPostText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [postSubmitted, setPostSubmitted] = useState(false);

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
    const fetchNewsfeedData = async () => {
      try {
        const response = await getNewsFeedPosts();
        if (response.status === 200) {
          console.log(response.data);
          setNewsfeedData(response.data.posts);
        }
      } catch (error) {
        console.error("Error fetching newsfeed posts.");
      }
    };
    if (postSubmitted) {
      fetchUserData();
      setPostSubmitted(false);
      return;
    }
    fetchUserData();
    fetchNewsfeedData();
  }, [postSubmitted]);

  console.log({ userData, newsfeedData });

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
        userEmail,
        name: userData?.name,
        username: userData?.username,
        isImageThere: false,
        postText: postText,
        imageURL: imageURL ? imageURL : "",
      };
      await createNewPost({ post });
      setPostText("");
      setUploading(false);
      setSelectedImage("");
      setSelectedFile("");
      imageURL = null;
      setPostSubmitted(true);
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
            <img src="images/dp.jpg" alt="" className={`${styles.dp}`} />
            <form className={`${styles.postForm}`} onSubmit={handlePostSubmit}>
              <div>
                <input
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
                          setSelectedImage(URL.createObjectURL(file));
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

          {newsfeedData?.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        <RightSideBar className={`${styles.rightSideBar}`} />
      </div>
    </div>
  );
};

export default Newsfeed;
