// components/PostCard.js
import React, { useEffect, useState } from "react";
import styles from "./styles/post-card.module.css";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { CiViewBoard } from "react-icons/ci";
import { LuDot, LuShare } from "react-icons/lu";
import Link from "next/link";

const PostCard = ({ post }) => {
  // console.log("In PostCard", post);
  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    const calculateElapsedTime = () => {
      const now = new Date();
      const postDate = new Date(post.createdAt);

      const diffInMilliseconds = now - postDate;
      const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInWeeks = Math.floor(diffInDays / 7);

      if (diffInMinutes < 1) {
        setElapsedTime(`${diffInSeconds}s`);
      } else if (diffInHours < 1) {
        setElapsedTime(`${diffInMinutes}m`);
      } else if (diffInDays < 1) {
        setElapsedTime(`${diffInHours}h`);
      } else if (diffInWeeks < 1) {
        setElapsedTime(`${diffInDays}d`);
      } else {
        setElapsedTime(`${diffInWeeks}w`);
      }
    };

    calculateElapsedTime();

    const intervalId = setInterval(() => {
      calculateElapsedTime();
    }, 20000);
    return () => clearInterval(intervalId);
  }, [post.createdAt]);

  const renderPostText = () => {
    const words = post.postText.split(/\s+/);
    return (
      <p className={`${styles.postStyle}`}>
        {words.map((word, index) => {
          if (word.startsWith("#")) {
            // Hashtag found, apply custom style
            return (
              <span key={index} className={`${styles.hashtag}`}>
                {word}{" "}
              </span>
            );
          } else {
            return <span key={index}>{word} </span>;
          }
        })}
      </p>
    );
  };

  return (
    <div className={`${styles.postCard}`}>
      <div className={`${styles.dpDiv}`}>
        <img src="/images/dp.jpg" alt="" className={`${styles.dp}`} />
      </div>
      <div className={`${styles.postContentDiv}`}>
        <div className={`${styles.postInfoDiv}`}>
          <Link href={`/profile/${post.username}`}>{post.name}</Link>
          <Link href={`/profile/${post.username}`}>
            <p>{`@${post.username}`}</p>
          </Link>
          <LuDot /> &nbsp;
          <p className={`${styles.elapsedTImeStyle}`}>{elapsedTime}</p>
        </div>

        {renderPostText()}
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
          <FaRegComment />
          <BiRepost />
          <GoHeart />
          <CiViewBoard />
          <LuShare />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
