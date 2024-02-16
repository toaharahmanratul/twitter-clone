import UserProfile from "@/components/profile/UserProfile";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const Index = ({ userEmail, SessionUsername, id, currentProfileUsername }) => {
  return (
    <UserProfile
      userEmail={userEmail}
      SessionUsername={SessionUsername}
      id={id}
      currentProfileUsername={currentProfileUsername}
    />
  );
};

export default Index;

export async function getServerSideProps(context) {
  const currentProfileUsername = context.params.username;

  const session = await getSession(context);
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

  return {
    props: {
      userEmail,
      SessionUsername,
      id,
      currentProfileUsername,
    },
  };
}
