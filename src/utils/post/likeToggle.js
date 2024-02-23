const handleLikeToggle = async (post, SessionUsername, handleSavePostEdit) => {
  const isLiked = post.likes.includes(SessionUsername);
  let updatedLikes;
  if (isLiked) {
    updatedLikes = post.likes.filter((user) => user !== SessionUsername);
  } else {
    updatedLikes = [...post.likes, SessionUsername];
  }
  const newPostText = post.postText;
  const newImageURL = post.imageURL;

  const updatedPost = { newPostText, newImageURL, likes: updatedLikes };
  await handleSavePostEdit(updatedPost);

  return !isLiked;
};

export default handleLikeToggle;
