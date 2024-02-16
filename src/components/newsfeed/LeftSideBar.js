"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/left-sidebar.module.css";
import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { RiNotification2Line } from "react-icons/ri";
import { FaRegEnvelope } from "react-icons/fa";
import { RiFileListLine } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa6";
import { BsPeople } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { CiCircleMore } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getUser } from "@/lib/apiRoutes";

const LeftSideBar = () => {
  const [userData, setUserData] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  const { data: session, status: sessionStatus } = useSession();

  const SessionUsername = session?.user?.username;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser(session.user.username);
        if (response.status === 200) {
          setUserData(response.data.userData);
        }
      } catch (error) {
        console.error("Error fetching user data.");
      }
    };
    fetchUserData();
  }, [session]);

  const handleLogoutClick = () => {
    signOut();
    router.push("/");
  };

  return (
    <div className={`${styles.mainContainer}`}>
      <div></div>
      <div className={`${styles.contentDiv}`}>
        <Link href="/home">
          <img
            src="/images/xLogo.png"
            alt="X Logo"
            className={`${styles.xLogo}`}
          />
        </Link>{" "}
        <Link href="/home">
          <button id={`${styles.boldHome}`}>
            <GoHomeFill /> Home
          </button>
        </Link>
        <Link href="/explore">
          <button>
            <IoSearchOutline /> Explore
          </button>
        </Link>
        <Link href="/notifications">
          <button>
            <RiNotification2Line /> Notifications
          </button>
        </Link>
        <Link href="/messages">
          <button>
            <FaRegEnvelope /> Messages
          </button>
        </Link>
        <Link href="/lists">
          <button>
            <RiFileListLine /> Lists
          </button>
        </Link>
        <Link href="/bookmarks">
          <button>
            <FaRegBookmark /> Bookmarks
          </button>
        </Link>
        <Link href="/communities">
          <button>
            <BsPeople /> Communities
          </button>
        </Link>
        <Link href="/premium">
          <button>
            <BsTwitterX /> Premium
          </button>
        </Link>
        <Link href={`/profile/${SessionUsername}`}>
          <button>
            <IoPersonOutline /> Profile
          </button>
        </Link>
        <Link href="/more">
          <button>
            <CiCircleMore /> More
          </button>
        </Link>
        <Link href="/post">
          <button className={`${styles.btnPost}`}>Post</button>
        </Link>
        {showLogout && (
          <button className={styles.logoutOption} onClick={handleLogoutClick}>
            Logout @{userData?.username}
          </button>
        )}
        <div
          className={`${styles.fixedBottomElement}`}
          onClick={() => setShowLogout(!showLogout)}
        >
          <img src="/images/dp.jpg" alt="" className={`${styles.dp}`} />
          <div>
            <p className={styles.boldText}>{userData?.name}</p>
            <p className={styles.grayText}>@{userData?.username}</p>
          </div>
          <IoIosMore className={`${styles.moveRight}`} />
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
