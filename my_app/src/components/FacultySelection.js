// FacultySelection.js

import React from "react";
import { GiNotebook } from "react-icons/gi";

const FacultySelection = ({ onSelectFaculty }) => {
  const faculties = [
    {
      name: "Civil Engineering",
      syllabus:
        "https://nec.gov.np/uploads/brochure/7MwJ7vhQgt220920010952.pdf",
    },
    {
      name: "Computer Engineering",
      syllabus:
        "https://nec.gov.np/uploads/brochure/9cg9z4cTKe220920011047.pdf",
    },
    {
      name: "Mechanical Engineering",
      syllabus:
        "https://nec.gov.np/uploads/brochure/wpTiMw652H220920012126.pdf",
    },
    {
      name: "Electrical Engineering",
      syllabus:
        "https://nec.gov.np/uploads/brochure/eucw1wPHHZ220920011134.pdf",
    },
    {
      name: "Electronics Engineering",
      syllabus:
        "https://nec.gov.np/uploads/brochure/Ghq9etVLdy220920011235.pdf",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg p-8 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-semibold mb-4">
          Welcome to NEC Mock Test
        </h1>
        <p className="text-gray-600 mb-6">
          Please select your faculty to begin the test.
          <br /> (Note: Syllabus at side)
        </p>
        <div className="grid grid-cols-1 gap-4">
          {faculties.map((faculty) => (
            <div key={faculty.name} className="flex items-center gap-4">
              <button
                onClick={() => onSelectFaculty(faculty.name)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue w-96"
              >
                {faculty.name}
              </button>
              <a
                href={faculty.syllabus}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
                title="syllabus"
              >
                <GiNotebook size="30" color="green" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultySelection;
