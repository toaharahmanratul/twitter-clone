export const calculateElapsedTime = (postDate) => {
  const now = new Date();

  const diffInMilliseconds = now - postDate;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInMinutes < 1) {
    return `${diffInSeconds}s`;
  } else if (diffInHours < 1) {
    return `${diffInMinutes}m`;
  } else if (diffInDays < 1) {
    return `${diffInHours}h`;
  } else if (diffInWeeks < 1) {
    return `${diffInDays}d`;
  } else {
    return `${diffInWeeks}w`;
  }
};
