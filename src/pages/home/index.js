import Newsfeed from "@/components/newsfeed/Newsfeed";
import { getSession } from "next-auth/react";

const Index = ({ userEmail, SessionUsername, id, sessionDPURL }) => {
  return (
    <Newsfeed
      userEmail={userEmail}
      SessionUsername={SessionUsername}
      id={id}
      sessionDPURL={sessionDPURL}
    />
  );
};

export default Index;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log({ session });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const userEmail = session.user?.email;
  const SessionUsername = session.user?.username;
  const id = session.user?._id;
  const sessionDPURL = session.user.dpURL;

  return {
    props: {
      userEmail,
      SessionUsername,
      id,
      sessionDPURL,
    },
  };
}
