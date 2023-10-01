"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage: React.FC = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/users/login", user);

      console.log("Loged in successfully !", res.data);
      toast.success("Loged in successfully !");
      router.push("/profile");
    } catch (err: any) {
      console.log(`Oops! Log in failed >>>> ${err.message}`);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-black text-2xl">
        {loading ? "Processing..." : "Log in"}
      </h1>
      <hr />

      <>
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="username"
          placeholder="Username"
          value={user.email}
          onChange={(e) => {
            setUser({
              ...user,
              email: e.target.value,
            });
          }}
        />
      </>

      <>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => {
            setUser({
              ...user,
              password: e.target.value,
            });
          }}
        />
      </>

      <>
        <button
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          onClick={onLogin}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Can't log in" : "Log in"}
        </button>
      </>

      <div className="flex gap-y-2 space-x-20">
        <Link href="/">Back to Home</Link>
        <Link href="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginPage;

// interface sectionProperties {
//   htmlFor: string;
//   sectionName: string;
//   // whatWannaChange: string;
//   inputType: string;
//   value: any;
//   onChange: any;
// }

// const Section: React.FC<sectionProperties> = ({
//   htmlFor,
//   sectionName,
//   // whatWannaChange,
//   inputType,
//   value,
//   onChange,
// }) => {
//   return (
//     <>
//       <label htmlFor={htmlFor}>sectionName</label>
//       <input
//         type={inputType}
//         id={sectionName}
//         placeholder={sectionName}
//         value={value}
//         onChange={onChange}
//       />
//     </>
//   );
// };
