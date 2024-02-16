"use client";
import Link from "next/link";
import styles from "./styles/register.module.css";
import { useRouter } from "next/router";
import { createNewUser } from "@/lib/apiRoutes";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Register = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/home");
    }
  }, [sessionStatus, router]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const username = email.split("@")[0];
      await createNewUser({ name, username, email, password });
      alert("Registration is successful!");
      router.push("/login");
    } catch (error) {
      if (error.response) {
        console.error("Server Error Response Data:", error.response.data);
        alert(error.response.data);
      } else if (error.request) {
        console.error("No Response Received:", error.request);
      } else {
        console.error("Request Setup Error:", error.message);
      }
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className={styles.regParentDiv}>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            Register
          </button>
        </form>
        <br />
        <Link href="/login">Login with an existing account</Link>
      </div>
    )
  );
};

export default Register;
