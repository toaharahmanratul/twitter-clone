import React, { useEffect, useState } from "react";
import styles from "./styles/user-profile.module.css";
import { createNewPost, getUser, getUserPosts } from "@/lib/apiRoutes";
import { FaArrowLeft } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import Link from "next/link";

import LeftSideBar from "../newsfeed/LeftSideBar";
import RightSideBar from "../newsfeed/RightSideBar";
import { useRouter } from "next/router";
import EditProfileModal from "./EditProfileModal";
import { formatJoinDate } from "@/utils/profile/formatDate";
import PostCard from "../posts/PostCard";

const UserProfile = ({
  userEmail,
  SessionUsername,
  id,
  currentProfileUsername,
}) => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Posts");
  const [postChanged, setPostChanged] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser(currentProfileUsername);
        if (response.status === 200) {
          setUserData(response.data.userData);
        }
      } catch (error) {
        console.error("Error fetching user data.");
      }
    };
    const fetchUserPosts = async () => {
      try {
        const response = await getUserPosts(currentProfileUsername);
        if (response.status === 200) {
          setUserPosts(response.data.posts);
        }
      } catch (error) {
        console.error("Error fetching user data.");
      }
    };
    if (postChanged) {
      fetchUserPosts();
      setPostChanged(false);
      return;
    }
    fetchUserData();
    fetchUserPosts();
  }, [router, postChanged]);

  const handlePostDeleteAndEdit = () => {
    setPostChanged(true);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (!userData) {
    return <div>User Not Found</div>;
  }

  console.log({ userData, userPosts });

  return (
    <div>
      <LeftSideBar className={`${styles.leftSideBar}`} />

      <div className={`${styles.mainContainer}`}>
        <div className={`${styles.middleDiv}`}>
          <div className={`${styles.topDiv}`}>
            <Link href="/home" className={`${styles.arrowBackHomeDiv}`}>
              <FaArrowLeft />
            </Link>
            <div>
              <h3>{userData?.name}</h3>
              <p>{`${userPosts?.length} ${
                userPosts?.length > 1 ? "posts" : "post"
              }`}</p>
            </div>
          </div>

          <div className={`${styles.dpCoverDiv}`}>
            <div className={`${styles.coverPhotoDiv}`}>
              <img src={userData?.coverURL || ""} alt="" />
            </div>
            <div className={`${styles.profileDPDiv}`}>
              <img
                src={userData?.dpURL || "/images/dp_default.jpg"}
                alt={`${userData?.name}'s Profile`}
                className={`${styles.profileDP}`}
              />
              <div className={`${styles.btnEditProfileDiv}`}>
                {SessionUsername === currentProfileUsername && (
                  <button
                    onClick={openEditModal}
                    className={`${styles.btnEditProfile}`}
                  >
                    Edit profile
                  </button>
                )}

                <EditProfileModal
                  isOpen={isEditModalOpen}
                  onClose={closeEditModal}
                  userData={userData}
                />

                {SessionUsername !== currentProfileUsername && (
                  <button className={`${styles.btnEditProfile}`}>Follow</button>
                )}
              </div>
            </div>
          </div>

          <div className={`${styles.profileInfoDiv}`}>
            <h3>{userData?.name}</h3>
            <p
              className={`${styles.grayText}`}
            >{`@${userData?.username}`}</p>{" "}
            {userData?.bio && (
              <p className={`${styles.bio}`}>{userData?.bio}</p>
            )}
            <p className={`${styles.grayText}`}>
              <FaRegCalendarAlt />{" "}
              {`Joined ${formatJoinDate(userData?.createdAt)}`}
            </p>
            <div>
              <p className={`${styles.boldWhiteText} inlineBlock`}>
                {userData?.following.length}
                <span className={`${styles.grayText}`}> Following</span>
              </p>{" "}
              &nbsp;
              <p className={`${styles.boldWhiteText} inlineBlock`}>
                {userData?.followers.length}
                <span className={`${styles.grayText}`}> Followers</span>
              </p>
            </div>
          </div>

          <div className={`${styles.tabs}`}>
            <button
              onClick={() => handleTabChange("Posts")}
              className={`${styles.tab} ${
                activeTab === "Posts" && styles.activeTab
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => handleTabChange("Following")}
              className={`${styles.tab} ${
                activeTab === "Following" && styles.activeTab
              }`}
            >
              Following
            </button>
            <button
              onClick={() => handleTabChange("Followers")}
              className={`${styles.tab} ${
                activeTab === "Followers" && styles.activeTab
              }`}
            >
              Followers
            </button>
            <button
              onClick={() => handleTabChange("Media")}
              className={`${styles.tab} ${
                activeTab === "Media" && styles.activeTab
              }`}
            >
              Media
            </button>
            <button
              onClick={() => handleTabChange("Likes")}
              className={`${styles.tab} ${
                activeTab === "Likes" && styles.activeTab
              }`}
            >
              Likes
            </button>
          </div>

          {activeTab === "Posts" && (
            <div className={`${styles.tabContentDiv}`}>
              {userPosts?.map((post) => {
                return (
                  <PostCard
                    key={post._id}
                    post={{
                      ...post,
                      name: userData?.name,
                      dpURL: userData?.dpURL,
                    }}
                    SessionUsername={SessionUsername}
                    onPostDeleteAndEdit={handlePostDeleteAndEdit}
                  />
                );
              })}
            </div>
          )}
          {activeTab === "Media" && (
            <div className={`${styles.mediaContentDiv}`}>
              {userPosts?.map((post) => {
                if (post.imageURL) {
                  return (
                    <img src={post.imageURL} className={`${styles.mediaImg}`} />
                  );
                }
              })}
            </div>
          )}
          
        </div>

        <RightSideBar className={`${styles.rightSideBar}`} />
      </div>
    </div>
  );
};

export default UserProfile;
