import React, { useState, useEffect } from "react";
import ReactGA from "react-ga"; // Import the react-ga library
import FacultySelection from "./components/FacultySelection";
import Footer from "./components/footer";
import QuizScreen from "./QuizScreen";

function App() {
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  useEffect(() => {
    ReactGA.initialize("G-SREY4XGGZW");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const handleFacultySelect = (faculty) => {
    setSelectedFaculty(faculty);
    // Track faculty selection event
    ReactGA.event({
      category: "Faculty",
      action: "Selected",
      label: faculty,
    });
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      {selectedFaculty ? (
        <div className="flex-grow">
          <QuizScreen selectedFaculty={selectedFaculty} />
        </div>
      ) : (
        <FacultySelection onSelectFaculty={handleFacultySelect} />
      )}
      <Footer />
    </div>
  );
}

export default App;
