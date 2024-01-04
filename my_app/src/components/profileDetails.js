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
    <div className="fixed top-0  right-0 p-4 bg-gray-100 mt-4 shadow-md w-96">
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
      {uncheckedIndices.length > 0 &&
        (!showUnanswerQS ? (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-semibold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline-green"
            onClick={() => setShowUnanswerQS(!showUnanswerQS)}
          >
            show unanswered QS
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline-green"
            onClick={() => setShowUnanswerQS(!showUnanswerQS)}
          >
            hide unanswered QS
          </button>
        ))}
      {showUnanswerQS ? (
        <>
          <div className="mt-4 text-red-500">
            <p>
              Questions {uncheckedIndices.join(", ")} have not been answered.
            </p>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProfileDetails;
