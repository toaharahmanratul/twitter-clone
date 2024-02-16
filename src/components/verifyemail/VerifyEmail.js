import { verifyEmail } from "@/lib/apiRoutes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./styles/verify-email.module.css";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verify();
    }
  }, [token]);

  const verify = async () => {
    try {
      await verifyEmail({ token });
      setVerified(true);
    } catch (error) {
      setError(error);
      console.log(error.response.data);
    }
  };

  return (
    <div className={`${styles.mainContainer}`}>
      <h1>Email Verification</h1> <br /> <br />
      <h2>{token ? `Token: ${token}` : "No valid token found!"}</h2>
      {verified && (
        <div>
          <h2>Your email verified successfully!</h2>
          <Link href="/login">
            <button className="btn">Login</button>
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2>Something gone wrong!</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
