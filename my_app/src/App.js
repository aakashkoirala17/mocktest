import React, { useState, useEffect } from "react";
import FacultySelection from "./components/FacultySelection";
import QuizScreen from "./QuizScreen";

function App() {
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  // Function to handle faculty selection
  const handleFacultySelect = (faculty) => {
    setSelectedFaculty(faculty);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {selectedFaculty ? (
        // Show the Main Application if a faculty is selected
        <QuizScreen selectedFaculty={selectedFaculty} />
      ) : (
        // Show the FacultySelection component if no faculty is selected
        <FacultySelection onSelectFaculty={handleFacultySelect} />
      )}
    </div>
  );
}

export default App;
