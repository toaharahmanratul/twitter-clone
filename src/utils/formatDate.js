export const formatJoinDate = (createdAt) => {
  if (!createdAt) return "";

  const joinDate = new Date(createdAt);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedDate = `${
    monthNames[joinDate.getMonth()]
  } ${joinDate.getFullYear()}`;
  return formattedDate;
};
