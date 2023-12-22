import React, { useEffect, useState } from "react";
import { aakash } from "../assets";
import "../index.css";

function ProfileDetails() {
  const [profileName, setProfileName] = useState("John Doe");
  const [rollNo, setRollNo] = useState("123456");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [timer, setTimer] = useState(2 * 60 * 60); // 2 hours in seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsRemaining = seconds % 60;

    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      secondsRemaining
    ).padStart(2, "0")}`;
  };

  return (
    <div className="fixed top-0 right-0 p-4 bg-white shadow-md flex items-center justify-between w-64">
      <div className="flex items-center">
        <img src={aakash} alt="User" className="w-10 h-10 rounded-full mr-2" />
        <div>
          <h1 className="text-lg font-semibold">{profileName}</h1>
          <p className="text-sm text-gray-600">Roll No: {rollNo}</p>
          <p className="text-sm text-gray-600">Date: {date}</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600">
          Time Remaining: {formatTime(timer)}
        </p>
      </div>
    </div>
  );
}

export default ProfileDetails;
