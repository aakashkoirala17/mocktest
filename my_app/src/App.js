import React, { useState, useEffect } from 'react';
import './App.css';

const quizData = [
  // Section A: 60 questions, 1 mark each
  {
    question: '1. What is an operating system?',
    answer: 'd',
    section: 'A',
    mark: 1,
    options: [
      'a) interface between the hardware and application programs',
      'b) collection of programs that manages hardware resources',
      'c) system service provider to the application programs',
      'd) all of the mentioned',
    ],
  },
  {
    question: '2. What is the main function of the command interpreter?',
    answer: 'c',
    section: 'A',
    mark: 1,
    options: [
      'a) to provide the interface between the API and application program',
      'b) to handle the files in the operating system',
      'c) to get and execute the next user-specified command',
      'd) none of the mentioned',
    ],
  },
  {
    question: '3. In Operating Systems, which of the following is/are CPU scheduling algorithms?',
    answer: 'd',
    section: 'A',
    mark: 1,
    options: ['a) Priority', 'b) Round Robin', 'c) Shortest Job First', 'd) All of the mentioned'],
  },
  {
    question: '4. To access the services of the operating system, the interface is provided by the ___________',
    answer: 'b',
    section: 'A',
    mark: 1,
    options: ['a) Library', 'b) System calls', 'c) Assembly instructions', 'd) API'],
  },
  {
    question: '5. CPU scheduling is the basis of ___________',
    answer: 'a',
    section: 'A',
    mark: 1,
    options: [
      'a) multiprogramming operating systems',
      'b) larger memory sized systems',
      'c) multiprocessor systems',
      'd) none of the mentioned',
    ],
  },
  {
    question: '6. Which one of the following is not true?',
    answer: 'b',
    section: 'A',
    mark: 1,
    options: [
      'a) kernel remains in the memory during the entire computer session',
      'b) kernel is made of various modules which can not be loaded in running operating system',
      'c) kernel is the first part of the operating system to load into memory during booting',
      'd) kernel is the program that constitutes the central core of the operating system',
    ],
  },
  {
    question: '7. Which one of the following errors will be handle by the operating system?',
    answer: 'd',
    section: 'A',
    mark: 1,
    options: [
      'a) lack of paper in printer',
      'b) connection failure in the network',
      'c) power failure',
      'd) all of the mentioned',
    ],
  },
  {
    question: '8. Where is the operating system placed in the memory?',
    answer: 'a',
    section: 'A',
    mark: 1,
    options: [
      'a) either low or high memory (depending on the location of interrupt vector)',
      'b) in the low memory',
      'c) in the high memory',
      'd) none of the mentioned',
    ],
  },
  {
    question: '9. If a process fails, most operating system write the error information to a ______',
    answer: 'c',
    section: 'A',
    mark: 1,
    options: ['a) new file', 'b) another running process', 'c) log file', 'd) none of the mentioned'],
  },

  {
    question: '10. Which one of the following is not a real time operating system?',
    answer: 'b',
    section: 'A',
    mark: 1,
    options: ['a) RTLinux', 'b) Palm OS', 'c) QNX', 'd) VxWorks'],
  },
  {
    question: '11. What does OS X has?',
    answer: 'd',
    section: 'A',
    mark: 1,
    options: ['a) monolithic kernel with modules', 'b) microkernel', 'c) monolithic kernel', 'd) hybrid kernel'],
  },
  {
    question: '12. In operating system, each process has its own __________',
    answer: 'd',
    section: 'A',
    mark: 1,
    options: ['a) open files', 'b) pending alarms, signals, and signal handlers', 'c) address space and global variables', 'd) all of the mentioned'],
  },
  {
    question: '13. In a timeshare operating system, when the time slot assigned to a process is completed, the process switches from the current state to?',
    answer: 'c',
    section: 'A',
    mark: 1,
    options: ['a) Suspended state', 'b) Terminated state', 'c) Ready state', 'd) Blocked state'],
  },
  {
    question: '14. Cascading termination refers to the termination of all child processes if the parent process terminates ______',
    answer: 'a',
    section: 'A',
    mark: 1,
    options: ['a) Normally or abnormally', 'b) Abnormally', 'c) Normally', 'd) None of the mentioned'],
  },
  {
    question: '15. When a process is in a “Blocked” state waiting for some I/O service. When the service is completed, it goes to the __________',
    answer: 'd',
    section: 'A',
    mark: 1,
    options: ['a) Terminated state', 'b) Suspended state', 'c) Running state', 'd) Ready state'],
  },
  {
    question: '16. Transient operating system code is a code that ____________',
    answer: 'c',
    section: 'A',
    mark: 1,
    options: ['a) stays in the memory always', 'b) never enters the memory space', 'c) comes and goes as needed', 'd) is not easily accessible'],
  },
  {
    question: '17. The portion of the process scheduler in an operating system that dispatches processes is concerned with ____________',
    answer: 'c',
    section: 'A',
    mark: 1,
    options: ['a) assigning ready processes to waiting queue', 'b) assigning running processes to blocked queue', 'c) assigning ready processes to CPU', 'd) all of the mentioned'],
  },
  {
    question: '18. The FCFS algorithm is particularly troublesome for ____________',
    answer: 'c',
    section: 'A',
    mark: 1,
    options: ['a) operating systems', 'b) multiprocessor systems', 'c) time sharing systems', 'd) multiprogramming systems'],
  },
  {
    question: '19. For an effective operating system, when to check for deadlock?',
    answer: 'a',
    section: 'A',
    mark: 1,
    options: ['a) every time a resource request is made at fixed time intervals', 'b) at fixed time intervals', 'c) every time a resource request is made', 'd) none of the mentioned'],
  },
  // Add more questions for section A here
  // Section B: 20 questions, 2 marks each
  {
    question: 'Question B1',
    answer: 'Answer B1',
    section: 'B',
    mark: 2,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
  },
  {
    question: 'Question B2',
    answer: 'Answer B2',
    section: 'B',
    mark: 2,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
  },
  // Add more questions for section B here
];

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
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="App">
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
                  <p>
                     {question.mark} mark(s).
                  </p>
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
