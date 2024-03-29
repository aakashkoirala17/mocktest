import React, { useEffect, useRef, useState } from "react";
import ProfileDetails from "../components/profileDetails";
import { civilQuizData } from "../set/civilSets";
import { compQuizData } from "../set/computerSet";
import electricQuizData from "../set/electricalSet";
import { electronicQuizData } from "../set/electrnoicsSet";
import { mechanicalQuizData } from "../set/mechanicalSet";
import { FaArrowUp } from "react-icons/fa";

const questionsPerPage = 20;
const timeLimit = 2 * 60 * 60;
const passMark = 50;

function QuizScreen(props) {
  const { selectedFaculty } = props;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [shuffledQuizData, setShuffledQuizData] = useState([]);
  const [uncheckedIndices, setUncheckedIndices] = useState([]);

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
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    const nameKey = currentQuestion + Number(name);

    setSelectedOptions((prevSelectedOptions) => {
      const updatedSelectedOptions = {
        ...prevSelectedOptions,
        [nameKey.toString()]: value,
      };

      // Calculate unchecked qs dynamically from all shuffledQuizData
      const updatedUncheckedIndices = shuffledQuizData
        .slice(currentQuestion, currentQuestion + questionsPerPage)
        .map((_, index) => currentQuestion + index)
        .filter((index) => !updatedSelectedOptions.hasOwnProperty(index))
        .map((a) => a + 1);

      setUncheckedIndices(updatedUncheckedIndices);

      return updatedSelectedOptions;
    });
  };

  const handleSubmit = () => {
    // Check if there are any unanswered questions
    const unansweredQuestions = shuffledQuizData
      .map((_, index) => index)
      .filter((index) => !selectedOptions.hasOwnProperty(index))
      .map((a) => a + 1);

    if (unansweredQuestions.length > 0) {
      const confirmation = window.confirm(
        `You have unanswered questions (${unansweredQuestions.join(
          ", "
        )}). Are you sure you want to submit?`
      );

      if (!confirmation) {
        return;
      }
    }

    let totalRightMarks = 0;
    let totalWrongMarks = 0;

    // Calculate total marks for answered questions
    for (let index = 0; index < shuffledQuizData.length; index++) {
      const questionIndex = index;
      if (selectedOptions.hasOwnProperty(questionIndex.toString())) {
        if (
          selectedOptions[questionIndex.toString()] ===
          shuffledQuizData[index].answer
        ) {
          totalRightMarks += shuffledQuizData[index].mark;
        } else {
          // Deduct fixed marks for wrong answers (modify as needed)
          totalWrongMarks += 1; // You may change this to any fixed value
        }
      }
      setScore(totalRightMarks);
    }

    // Finish the quiz
    setIsFinished(true);
  };

  const handleNextPage = () => {
    const nextQuestionIndex = currentQuestion + questionsPerPage;
    setCurrentQuestion(nextQuestionIndex);
    setUncheckedIndices([]); // Reset uncheckedIndices when changing pages
  };

  const handlePreviousPage = () => {
    setCurrentQuestion(currentQuestion - questionsPerPage);
    setUncheckedIndices([]); // Reset uncheckedIndices when changing pages
  };

  const formatTime = (seconds) => {
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

    const shuffledQuestions = [
      ...randomMark1Questions.slice(0, 60),
      ...randomMark2Questions.slice(0, 20),
    ];
    setShuffledQuizData(shuffledQuestions);
  }, [quizData]);

  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      setShowScrollToTop(isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="absolute web-view ">
      <ProfileDetails uncheckedIndices={uncheckedIndices} />
      <div className="flex flex-col items-center justify-between max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl p-8 bg-gray-100 shadow-md rounded-md mx-auto mb-8 md:mb-16 web-view-qs mt-32">
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
                    {currentQuestion + index + 1}. {question.question}
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
                          checked={
                            selectedOptions[currentQuestion + index] === option
                          }
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

            <div className="flex flex-col md:flex-row justify-between">
              {currentQuestion > 0 && (
                <button
                  onClick={handlePreviousPage}
                  className="md:mr-4 mb-2 md:mb-0 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                >
                  Previous Page
                </button>
              )}
              <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green mb-2 md:mb-0"
              >
                Submit
              </button>
              {currentQuestion < shuffledQuizData.length - questionsPerPage && (
                <button
                  onClick={handleNextPage}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue mb-2 md:mb-0"
                >
                  Next Page
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <button
        title="scroll to top"
        onClick={scrollToTop}
        className="z-10 fixed bottom-16 left-4 md:left-[calc(50%+500px)] bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
      >
        <FaArrowUp />
      </button>
    </div>
  );
}

export default QuizScreen;
