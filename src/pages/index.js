"use client";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/home");
    }
  }, [sessionStatus, router]);

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="mainContainer">
        <div className="xLogoDiv">
          <img src="/images/xLogo.png" alt="X Logo" />
        </div>
        <div className="loginRegisterDiv">
          <h1>Happening Now</h1> <br /> <br />
          <div className="registerDiv">
            <h2>Join today.</h2> <br /> <br />
            <button
              className="btn btnSignUp"
              onClick={() => {
                signIn("github");
              }}
            >
              <img src="/images/githubLogo.png" id="githubLogo" /> Sign up with
              Github
            </button>
            <div className="orDiv">
              <hr /> <span>or</span> <hr />
            </div>{" "}
            <br />
            <Link href="/register">
              <button className="btn btnBlue">Create account</button>
            </Link>
            <p>
              By signing up, you agree to the <span>Terms of Service</span>,{" "}
              <span>Privacy Policy</span>, including <span>Cookie Use</span>.
            </p>
          </div>
          <div className="loginDiv">
            <h4>Already have an account?</h4> <br />
            <Link href="/login">
              <button className="btn btnTransparent">Sign in</button>
            </Link>
          </div>
        </div>
      </div>
    )
  );
}
