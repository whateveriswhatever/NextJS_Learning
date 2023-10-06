"use client";
import React from "react";
import User from "@/models/userModel";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import img from "@/img/none_avatar.jpg";
import { useState, useEffect } from "react";
import Link from "next/link";

const UserProfilePage = ({ params }: any) => {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isWantedToSeeMore, setIsWantedToSeeMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (isWantedToSeeMore) {
  //     try {
  //       setIsLoading(true);
  //       retriveUserInfor();
  //     } catch (err: any) {
  //       console.log(`Error: ${err}`);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // }, [isWantedToSeeMore]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        retriveUserInfor();
      } catch (err: any) {
        console.log(`Error: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (isWantedToSeeMore) {
      fetchData();
    }
  }, [isWantedToSeeMore]);

  const retriveUserInfor = async () => {
    const data = await axios.get("/api/users/me");
    console.log(`username: ${data.data.data.username}`);
    console.log(`email: ${data.data.data.email}`);
    setUsername(data.data.data.username);
    setUserEmail(data.data.data.email);
  };

  const handleToggleSeeMore = () => {
    setIsWantedToSeeMore((prev) => !prev);
  };

  return (
    <div
      style={{
        minWidth: "100vw",
        width: "100vw",
        // maxHeight: "92px",
        // height: "100%",
        // position: "relative",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <NavBar />

      <Main user_id={params.id} />

      <FurthurDetailsOption
        setIsWantedToSeeMore={setIsWantedToSeeMore}
        optionIcon={
          isWantedToSeeMore ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-down-short"
              viewBox="0 0 16 16"
              style={{
                position: "relative",
                marginTop: "-1.2rem",
                marginLeft: "8rem",
              }}
            >
              <path
                fill-rule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-up-short"
              viewBox="0 0 16 16"
              style={{
                position: "relative",
                marginTop: "-1.2rem",
                marginLeft: "8rem",
              }}
            >
              <path
                fill-rule="evenodd"
                d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
              />
            </svg>
          )
        }
      />

      {isWantedToSeeMore && !isLoading ? (
        <DisplayingUserInfor username={username} user_email={userEmail} />
      ) : (
        <div>Processing...</div>
      )}
    </div>
  );
};

export default UserProfilePage;

const NavBar: React.FC = () => {
  const router = useRouter();

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully !");
      router.push("/login");
    } catch (err: any) {
      console.log(`Failed to log out! >>>> ${err.message}`);
      toast.error(err.message);
    }
  };

  return (
    <div style={{ display: "flex", marginLeft: "110rem" }}>
      <button onClick={onLogout} className="bg-pink-700 text-white p-2">
        Log out
      </button>
      <div
        style={{ marginLeft: "1rem" }}
        className="bg-emerald-400 p-2 text-white"
      >
        <Link href="/">Home</Link>
      </div>
    </div>
    // <div
    // // style={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}
    // // style={{ display: "inline-block" }}
    // >
    // <div
    //   id="logout_btn"
    //   style={{
    //     position: "relative",
    //     top: "0",
    //     // marginTop: "-25rem",
    //     // marginLeft: "80rem",
    //     float: "right",
    //     marginRight: "4rem",
    //   }}
    //   onClick={() => console.log("Clicked div!")}
    // >
    //   <button
    //     className="bg-gray-600 p-2 text-white"
    //     style={{ cursor: "pointer" }}
    //     onClick={() => console.log("Clicked!")}
    //   >
    //     Log out
    //   </button>
    //   {/* <div
    //       className="bg-emerald-300 p-2 text-white"
    //       style={{ textAlign: "center" }}
    //     >
    //       <Link href="/">Home</Link>
    //     </div> */}
    // </div>
    // //   {/* <div
    // //     className="bg-emerald-300 p-2 text-white"
    // //     style={{ textAlign: "center" }}
    // //   >
    // //     <Link href="/">Home</Link>
    // //   </div> */}
    // // </div>
  );
};

const AvatarSection: React.FC = () => {
  return (
    <div style={{ marginTop: "-10rem", marginLeft: "-8rem" }}>
      {/* <div
        style={{
          backgroundImage:
            "url(https://th.bing.com/th/id/R.cb2cf13c51c606c1f45d372bbf3c7c16?rik=XFGgFrGojHIhPQ&riu=http%3a%2f%2fbestnycacupuncturist.com%2fwp-content%2fuploads%2f2016%2f11%2fanonymous-avatar-sm.jpg&ehk=qfKiOTg2QcFuD5v5feNcpH%2fFb47mUUcoSo86n97z7Es%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1)",
        }}
      ></div> */}
      <img
        src="https://th.bing.com/th/id/R.cb2cf13c51c606c1f45d372bbf3c7c16?rik=XFGgFrGojHIhPQ&riu=http%3a%2f%2fbestnycacupuncturist.com%2fwp-content%2fuploads%2f2016%2f11%2fanonymous-avatar-sm.jpg&ehk=qfKiOTg2QcFuD5v5feNcpH%2fFb47mUUcoSo86n97z7Es%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
        alt="User's Avatar"
        width="200"
        height="250"
        style={{ marginTop: "-4rem", marginLeft: "8rem" }}
      />
    </div>
  );
};

interface IMain {
  user_id: string;
}

const Main: React.FC<IMain> = ({ user_id }) => {
  return (
    <div
      style={{
        width: "100vw",
        maxHeight: "92px",
        height: "100%",
        position: "relative",
        textAlign: "center",
      }}
    >
      <div
        className="flex justify-center align-middle justify-items-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "30vw",
          marginLeft: "1rem",
          fontSize: "2.2rem",
          fontWeight: "bold",
        }}
      >
        Profile
        {/* <AvatarSection /> */}
      </div>

      <div className="flex justify-center" style={{}}>
        <AvatarSection />
      </div>

      <div id="user_id" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        @{user_id}
      </div>
      <div></div>
    </div>
  );
};

interface IUserInfor {
  username: string;
  user_email: string;
}

const DisplayingUserInfor: React.FC<IUserInfor> = ({
  username,
  user_email,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: "-33rem",
        height: "20vw",
      }}
    >
      <div
        style={{
          flexDirection: "column",
          border: "1px solid #000",
          padding: "1rem",
        }}
      >
        <div>
          {/* <span>Username: </span>
          {username} */}
          <p>
            Username: <span style={{ fontWeight: "bold" }}>{username}</span>
          </p>
        </div>
        <br />
        <div>
          {/* <span>Email: </span>
          {user_email} */}
          <p>
            Email: <span style={{ fontWeight: "bold" }}>{user_email}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

interface IFurthurOptions {
  gettingMoreOption?: any;
  setIsWantedToSeeMore: any;
  optionIcon: any;
}

const FurthurDetailsOption: React.FC<IFurthurOptions> = ({
  // gettingMoreOption,
  setIsWantedToSeeMore,
  optionIcon,
}) => {
  const handleToggleSeeMore = () => {
    setIsWantedToSeeMore((prev: any) => !prev);
  };
  return (
    <div
      id="see_more"
      style={{
        height: "58vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* <div style={{ display: "inline-block" }}>
        <button onClick={handleToggleSeeMore}>More details</button>
        {optionIcon}
      </div> */}
      <button onClick={handleToggleSeeMore}>More details {optionIcon}</button>
      {/* {optionIcon} */}
      {/* <span>
        <button onClick={handleToggleSeeMore}>More details</button>
        {optionIcon}
      </span> */}
    </div>
  );
};
