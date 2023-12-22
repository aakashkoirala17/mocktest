// FacultySelection.js

import React from "react";

const FacultySelection = ({ onSelectFaculty }) => {
  const faculties = [
    "Civil Engineering",
    "Computer Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Electronics Engineering",
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg p-8 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-semibold mb-4">
          Welcome to NEC Mock Test
        </h1>
        <p className="text-gray-600 mb-6">
          Please select your faculty to begin the test.
        </p>
        <div className="grid grid-cols-1 gap-4">
          {faculties.map((faculty) => (
            <button
              key={faculty}
              onClick={() => onSelectFaculty(faculty)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
            >
              {faculty}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultySelection;
