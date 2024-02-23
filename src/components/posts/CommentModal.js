import React, { useState } from "react";
import styles from "./styles/comment-modal.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { LuDot, LuShare } from "react-icons/lu";
import Link from "next/link";
import renderPostText from "@/utils/post/postTextRenderer";

const CommentModal = ({ onClose, onReply, post, elapsedTime }) => {
  const [commentText, setCommentText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  return (
    <div className={`${styles.modalContainer}`}>
      <div className={`${styles.modalContent}`}>
        <div className={`${styles.topDiv}`}>
          <IoCloseSharp onClick={onClose} className={`${styles.close}`} />
        </div>
        <div className={`${styles.postInfoDiv} border`}>
          <div className={`${styles.dpDiv}`}>
            <img
              src={post?.dpURL}
              alt="Profile Preview"
              className={`${styles.dp}`}
            />
          </div>
          <div className={`${styles.userInfoDiv}`}>
            <div className={`${styles.postOwnerInfoDiv}`}>
              <div>
                <Link href={`/profile/${post.username}`}>{post.name}</Link>
                <Link href={`/profile/${post.username}`}>
                  <p>{`@${post.username}`}</p>
                </Link>
                <LuDot /> &nbsp;
                <p className={`${styles.elapsedTImeStyle}`}>{elapsedTime}</p>
              </div>
            </div>
            <div className={`${styles.postTextDiv}`}>
              <p>{renderPostText(post.postText)}</p>
              <p
                className={`${styles.replyingToStyle}`}
              >{`Replying to @${post.username}`}</p>
            </div>
          </div>
        </div>
        <div className={`${styles.commenterDiv} border`}>
          <div className={`${styles.dpDiv}`}>
            <img
              src={post?.dpURL}
              alt="Profile Preview"
              className={`${styles.dp}`}
            />
          </div>
          <div className={`${styles.replyDiv} border`}>
            <input type="text" placeholder="Post your reply" />
          </div>
        </div>
        <div className={`${styles.bottomDiv} border`}>
          <div className={`${styles.bottomElementsDiv} border`}></div>
          <button className={`${styles.btnReply}`}>Reply</button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
