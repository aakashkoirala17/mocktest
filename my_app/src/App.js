import React, { useState, useEffect } from "react";
import "./App.css";
import ProfileDetails from "./components/profileDetails";
import { quizData } from "./set/computerSet";

const questionsPerPage = 20; // Number of questions to show per page
const timeLimit = 2 * 60 * 60; // Time limit in seconds
const passMark = 50; // Pass mark for the quiz

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [selectedOptions, setSelectedOptions] = useState({}); // The options selected by the user for each question
  const [isFinished, setIsFinished] = useState(false); // Whether the quiz is finished or not

  useEffect(() => {
    // Set up a timer to count down the time left
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    // Clear the timer when the component unmounts or the time runs out
    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  const handleSubmit = () => {
    // Loop through the selected options and update the score accordingly
    for (let questionIndex in selectedOptions) {
      // Check if the selected option is correct
      if (selectedOptions[questionIndex] === quizData[questionIndex].answer) {
        // Update the score based on the question's mark
        setScore(score + quizData[questionIndex].mark);
      }
    }
    // Finish the quiz
    setIsFinished(true);
  };

  const handleNextPage = () => {
    // Move to the next page
    setCurrentQuestion(currentQuestion + questionsPerPage);
  };

  const handlePreviousPage = () => {
    // Move to the previous page
    setCurrentQuestion(currentQuestion - questionsPerPage);
  };

  const handleOptionChange = (event) => {
    // Set the selected option for the current question to the value of the radio button
    setSelectedOptions({
      ...selectedOptions,
      [event.target.name]: event.target.value,
    });
  };

  const formatTime = (seconds) => {
    // Format the time left in hh:mm:ss
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="App">
      <ProfileDetails />
      <h1>NEC MOCK TEST</h1>
      {isFinished ? (
        <div>
          <h2>Test Completed!</h2>
          <p>Your final score is {score}.</p>
          {score >= passMark ? (
            <p>You have passed the Test!</p>
          ) : (
            <p>You have failed the Test.</p>
          )}
        </div>
      ) : (
        <div>
          <div className="questions">
            {quizData
              .slice(currentQuestion, currentQuestion + questionsPerPage)
              .map((question, index) => (
                <div className="question" key={index}>
                  <h3>{question.question}</h3>
                  <p>{question.mark} mark(s).</p>
                  <form>
                    {question.options.map((option) => (
                      <div key={option}>
                        <input
                          type="radio"
                          id={option}
                          name={index}
                          value={option}
                          checked={selectedOptions[index] === option}
                          onChange={handleOptionChange}
                        />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    ))}
                  </form>
                </div>
              ))}
          </div>
          <div className="buttons">
            {currentQuestion > 0 && (
              <button onClick={handlePreviousPage}>Previous Page</button>
            )}
            {currentQuestion < quizData.length - questionsPerPage && (
              <button onClick={handleNextPage}>Next Page</button>
            )}
            <button onClick={handleSubmit}>Submit</button>
          </div>
          <div className="score">
            <p>Time left: {formatTime(timeLeft)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
