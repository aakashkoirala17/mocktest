import React, { useEffect, useState } from "react";
import { aakash } from "../assets";
import "../index.css";

function ProfileDetails(props) {
  const { uncheckedIndices } = props;
  const [timer, setTimer] = useState(2 * 60 * 60); 
  const [showUnanswerQS, setShowUnanswerQS] = useState(false); 

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
    <div className="fixed  top-0  right-0 p-4 bg-white shadow-md w-96">
      <div className="flex">
        <div className="flex items-center">
          <img
            src={aakash}
            alt="User"
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <h1 className="text-lg font-semibold">USER</h1>
            <p className="text-sm text-gray-600">Roll No: 12312312</p>
            <p className="text-sm text-gray-600">
              Date: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600">
            Time Remaining: {formatTime(timer)}
          </p>
        </div>
      </div>
      <button 
      className="bg-green-500 hover:bg-green-700 text-white font-semibold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline-green"
       onClick={()=>setShowUnanswerQS(!showUnanswerQS)}>show unanswered QS</button>
      {showUnanswerQS ? 
        <>
        {uncheckedIndices.length > 0 && (
          <div className="mt-4 text-red-500">
          <p>
          Questions {uncheckedIndices.join(", ")} have not been answered.
          </p>
          </div>
          )}
          </>
          :''
      }
    </div>
  );
}

export default ProfileDetails;
