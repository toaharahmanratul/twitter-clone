"use client";
import Link from "next/link";
import styles from "./styles/login.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/home");
    }
  }, [sessionStatus, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setError(error);
    } else if (res?.url) {
      router.replace(res.url);
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className={styles.logParentDiv}>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit" className="btn">
            Login
          </button>
          <br />
          <p>{error}</p>
        </form>
        <br />
        <button
          className="btn btnSignUp"
          onClick={() => {
            signIn("github");
          }}
        >
          <img src="/images/githubLogo.png" id="githubLogo" /> Sign in with
          Github
        </button>
        <br />
        <Link href="/register">Register here</Link>
      </div>
    )
  );
};

export default Login;
