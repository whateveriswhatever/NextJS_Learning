"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [data, setData] = useState("");
  const router = useRouter();
  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully!");
      router.push("/login");
    } catch (err: any) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(`This is res.data: ${res.data}`);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-3 rounded bg-green-500">
        {data === "" ? (
          "Unknown"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <br />

      <div>
        <button
          className="bg-blue-500 mt-4 hover:bg-blue-700 font-bold py-2 px-4 rounded text-white"
          onClick={onLogout}
          style={{ marginRight: "1rem" }}
        >
          Log out
        </button>

        <button
          className="bg-green-900 mt-4 hover:bg-blue-700 font-bold py-2 px-4 rounded text-white"
          onClick={getUserDetails}
        >
          Profile
        </button>
      </div>
      {/* <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 font-bold py-2 px-4 rounded text-white"
        onClick={onLogout}
      >
        Log out
      </button>

      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 font-bold py-2 px-4 rounded text-white"
        onClick={getUserDetails}
      >
        Profile
      </button> */}
    </div>
  );
};

export default ProfilePage;
