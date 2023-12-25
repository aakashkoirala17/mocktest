import React, { useEffect, useState } from "react";
import ProfileDetails from "../components/profileDetails";
import { civilQuizData } from "../set/civilSets";
import { compQuizData } from "../set/computerSet";
import electricQuizData from "../set/electricalSet";
import { electronicQuizData } from "../set/electrnoicsSet";
import { mechanicalQuizData } from "../set/mechanicalSet";
const questionsPerPage = 20; // Number of questions to show per page
const timeLimit = 2 * 60 * 60; // Time limit in seconds
const passMark = 50; // Pass mark for the quiz

function QuizScreen(props) {
  const { selectedFaculty } = props;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [selectedOptions, setSelectedOptions] = useState({}); // The options selected by the user for each question
  const [isFinished, setIsFinished] = useState(false); // Whether the quiz is finished or not
  const [quizData, setQuizData] = useState([]);
  const [shuffledQuizData, setShuffledQuizData] = useState([]);

  useEffect(() => {
    switch (selectedFaculty) {
      case "Civil Engineering":
        setQuizData(civilQuizData);
        break;
      case "Computer Engineering":
        setQuizData(compQuizData);
        break;
      case "Mechanical Engineering":
        setQuizData(mechanicalQuizData);
        break;
      case "Electrical Engineering":
        setQuizData(electricQuizData);
        break;
      default:
        setQuizData(electronicQuizData);
    }
  }, []);

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
      if (
        selectedOptions[questionIndex] ===
        shuffledQuizData[questionIndex].answer
      ) {
        // Update the score based on the question's mark
        setScore(score + shuffledQuizData[questionIndex].mark);
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
  // get random data
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getRandomQuestionsByMark(mark) {
    const filteredQuestions = quizData.filter(
      (question) => question.mark === mark
    );

    const shuffledQuestions = shuffleArray([...filteredQuestions]);

    return shuffledQuestions;
  }
  useEffect(() => {
    const randomMark1Questions = getRandomQuestionsByMark(1);
    const randomMark2Questions = getRandomQuestionsByMark(2);

    const shuffledQuestions = shuffleArray([
      ...randomMark1Questions,
      ...randomMark2Questions,
    ]);
    setShuffledQuizData(shuffledQuestions);
  }, [quizData]);

  return (
    <div className="min-h-screen bg-gray-100">
      <ProfileDetails />

      <div className="max-w-lg p-8 bg-white shadow-md rounded-md mx-auto mt-16">
        <h1 className="text-2xl font-semibold mb-6">
          NEC MOCK TEST (<span className="text-sm">{selectedFaculty}</span>)
        </h1>
        {isFinished ? (
          <div>
            <h2 className="text-xl font-semibold mb-2">Test Completed!</h2>
            <p className="text-gray-800">Your final score is {score}.</p>
            {score >= passMark ? (
              <p className="text-green-600">You have passed the Test!</p>
            ) : (
              <p className="text-red-600">You have failed the Test.</p>
            )}
          </div>
        ) : (
          <div>
            {shuffledQuizData
              .slice(currentQuestion, currentQuestion + questionsPerPage)
              .map((question, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {index + 1}. {question.question}
                  </h3>

                  <p className="text-gray-600">{question.mark} mark(s).</p>
                  <form className="mt-4">
                    {question.options.map((option) => (
                      <div key={option} className="mb-2 flex items-center">
                        <input
                          type="radio"
                          id={option}
                          name={index}
                          value={option}
                          checked={selectedOptions[index] === option}
                          onChange={handleOptionChange}
                          className="mr-2 text-blue-500"
                        />
                        <label
                          htmlFor={option}
                          className="text-sm text-gray-800"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </form>
                </div>
              ))}

            <div className="flex justify-between">
              {currentQuestion > 0 && (
                <button
                  onClick={handlePreviousPage}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                >
                  Previous Page
                </button>
              )}
              {currentQuestion < shuffledQuizData.length - questionsPerPage && (
                <button
                  onClick={handleNextPage}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                >
                  Next Page
                </button>
              )}
              <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green"
              >
                Submit
              </button>
            </div>

            <div className="mt-8 text-center text-gray-600">
              <p>Time left: {formatTime(timeLeft)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizScreen;
