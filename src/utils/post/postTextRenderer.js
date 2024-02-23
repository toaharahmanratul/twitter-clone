// postTextRenderer.js
import React from "react";
import styles from "../../components/posts/styles/post-card.module.css";

const renderPostText = (postText) => {
  const words = postText.split(/\s+/);

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

export default renderPostText;
