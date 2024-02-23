// components/PostCard.js
import React, { useEffect, useState } from "react";
import styles from "./styles/post-card.module.css";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { CiViewBoard } from "react-icons/ci";
import { LuDot, LuShare } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import { RiDeleteBinLine } from "react-icons/ri";
import Link from "next/link";
import { deletePost, updatePost } from "@/lib/apiRoutes";
import PostEditModal from "./PostEditModal";
import handleLikeToggle from "@/utils/post/likeToggle";
import renderPostText from "@/utils/post/postTextRenderer";
import { calculateElapsedTime } from "@/utils/post/elapsedTimeGenerator";
import CommentModal from "./CommentModal";

const PostCard = ({ post, SessionUsername, onPostDeleteAndEdit }) => {
  const [elapsedTime, setElapsedTime] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(post.likes.includes(SessionUsername));

  useEffect(() => {
    const postDate = new Date(post.createdAt);
    setElapsedTime(calculateElapsedTime(postDate));

    const intervalId = setInterval(() => {
      calculateElapsedTime();
    }, 20000);
    return () => clearInterval(intervalId);
  }, [post.createdAt, isLiked]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  const handleEditClick = () => {
    closeDropdown();
    setIsEditModalOpen(true);
  };
  const handleDeleteClick = () => {
    toggleDropdown();
    setIsDeleteModalOpen(true);
  };
  const handleDeleteConfirmation = async () => {
    const response = await deletePost(post._id);
    const data = response.json;
    setIsDeleteModalOpen(false);
    onPostDeleteAndEdit && onPostDeleteAndEdit();
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleLikeToggleWrapper = async () => {
    const updatedLikeStatus = await handleLikeToggle(
      post,
      SessionUsername,
      handleSavePostEdit
    );
    setIsLiked(updatedLikeStatus);
  };

  const handleSavePostEdit = async (editedPost) => {
    console.log("Edited post:", editedPost);
    const { newPostText, newImageURL, likes } = editedPost;
    try {
      const response = await updatePost(post._id, {
        newPostText,
        newImageURL,
        likes,
      });
      const data = response.data;
      console.log("PostEdit server response:", { data });
      setIsEditModalOpen(false);
      onPostDeleteAndEdit && onPostDeleteAndEdit();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className={`${styles.postCard}`}>
      <div className={`${styles.dpDiv}`}>
        <img
          src={post.dpURL || "/images/dp_default.jpg"}
          alt=""
          className={`${styles.dp}`}
        />
      </div>
      <div className={`${styles.postContentDiv}`}>
        <div className={`${styles.postInfoDiv}`}>
          <div>
            <Link href={`/profile/${post.username}`}>{post.name}</Link>
            <Link href={`/profile/${post.username}`}>
              <p>{`@${post.username}`}</p>
            </Link>
            <LuDot /> &nbsp;
            <p className={`${styles.elapsedTImeStyle}`}>{elapsedTime}</p>
          </div>
          {post.username === SessionUsername && (
            <div className={`${styles.postOptionsDiv}`}>
              <p className={`${styles.postOptions}`} onClick={toggleDropdown}>
                <SlOptions />
              </p>
              {isDropdownOpen && (
                <div className={`${styles.dropdown}`}>
                  <p
                    className={`${styles.deletePost}`}
                    onClick={handleDeleteClick}
                  >
                    <RiDeleteBinLine /> Delete
                  </p>
                  <p onClick={handleEditClick}>Edit post</p>
                </div>
              )}
            </div>
          )}
          {isDeleteModalOpen && (
            <DeleteConfirmationModal
              onDelete={handleDeleteConfirmation}
              onCancel={handleDeleteCancel}
            />
          )}
          {isEditModalOpen && (
            <PostEditModal
              onCancel={() => setIsEditModalOpen(false)}
              onSave={handleSavePostEdit}
              post={post}
            />
          )}
          {isCommentModalOpen && (
            <CommentModal
              onClose={() => setIsCommentModalOpen(false)}
              onReply=""
              post={post}
              elapsedTime={elapsedTime}
            />
          )}
        </div>

        {renderPostText(post.postText)}
        {post.imageURL && (
          <div>
            <img
              src={post.imageURL}
              alt="Preview"
              className={`${styles.postImage}`}
            />
          </div>
        )}
        <div className={`${styles.postElementDiv}`}>
          <div>
            <FaRegComment onClick={() => setIsCommentModalOpen(true)} />
          </div>
          <div>
            <BiRepost />
          </div>
          <div className={`${styles.likesDiv}`}>
            {isLiked ? (
              <GoHeartFill
                onClick={handleLikeToggleWrapper}
                className={`${styles.likedColor}`}
              />
            ) : (
              <GoHeart onClick={handleLikeToggleWrapper} />
            )}{" "}
            <p className={isLiked ? `${styles.likedColor}` : ""}>
              {post.likes.length}
            </p>
          </div>
          <div>
            <CiViewBoard />
          </div>
          <div>
            <LuShare />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
