import React, { useState } from "react";
import styles from "./styles/right-sidebar.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { VscVerifiedFilled } from "react-icons/vsc";

const RightSideBar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className={`${styles.mainContainer}`}>
      <div className={`${styles.contentDiv}`}>
        <div
          className={`${styles.searchDiv} ${
            isSearchFocused ? styles.focused : ""
          }`}
          onClick={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        >
          <IoSearchOutline />
          <input type="text" placeholder="Search" />
        </div>
        <div className={`${styles.subscribeDiv}`}>
          <h3>Subscribe to Premium</h3>
          <p>
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </p>
          <button className={`${styles.btnSubscribe} btn`}>Subscribe</button>
        </div>
        <div className={`${styles.trendsDiv}`}>
          <h3>Trends for you</h3>
          <div className={`${styles.trendCard}`}>
            <p>Trending in Bangladesh</p>
            <h4>#HaniaAmir</h4>
            <p>5,927 posts</p>
          </div>
          <div className={`${styles.trendCard}`}>
            <p>Trending in Bangladesh</p>
            <h4>#BoycottBollywoodCompletely</h4>
            <p>1,209 posts</p>
          </div>
          <div className={`${styles.trendCard}`}>
            <p>Trending in Bangladesh</p>
            <h4>#Dhaka</h4>
            <p>8,029 posts</p>
          </div>
        </div>
        <div className={`${styles.whoToFollowDiv}`}>
          <h3>Who to follow</h3>
          <div className={`${styles.followCard}`}>
            <img src="/images/atif.jpg" alt="" className={`${styles.dp}`} />
            <div>
              <h4>
                Atif Aslam
                <VscVerifiedFilled className={`${styles.verified}`} />
              </h4>
              <p>@itsaadee</p>
            </div>
            <button className={`${styles.btnFollow}`}>Follow</button>
          </div>
          <div className={`${styles.followCard}`}>
            <img src="/images/sachin.jpg" alt="" className={`${styles.dp}`} />
            <div>
              <h4>
                Sachin Tendulkar{" "}
                <VscVerifiedFilled className={`${styles.verified}`} />
              </h4>
              <p>@sachin_rt</p>
            </div>
            <button className={`${styles.btnFollow}`}>Follow</button>
          </div>
        </div>
        <div className={`${styles.footerDiv}`}>
          <p>
            Terms of Service &nbsp; Privacy Policy &nbsp; Cookie Policy &nbsp;
            Accessibility &nbsp; Ads info &nbsp; More... &nbsp; © 2024 X Corp.
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default RightSideBar;
