import React, { useEffect, useState } from "react";
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
    <div className="profile-details">
      <h1>Profile Details</h1>
      <div>
        <strong>Profile Name:</strong> {profileName}
      </div>
      <div>
        <strong>Roll No:</strong> {rollNo}
      </div>
      <div>
        <strong>Date:</strong> {date}
      </div>
      <div>
        <strong>Time Remaining:</strong> {formatTime(timer)}
      </div>
    </div>
  );
}

export default ProfileDetails;
