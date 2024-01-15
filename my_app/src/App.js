import React, { useState, useEffect } from "react";
import FacultySelection from "./components/FacultySelection";
import Footer from "./components/footer";
import QuizScreen from "./QuizScreen";

function App() {
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const handleFacultySelect = (faculty) => {
    setSelectedFaculty(faculty);
  };

  return (
    <div className="bg-gray-100">
      {selectedFaculty ? (
        <QuizScreen selectedFaculty={selectedFaculty} />
      ) : (
        <FacultySelection onSelectFaculty={handleFacultySelect} />
      )}
     <Footer /> 
    </div>
  );
}

export default App;
