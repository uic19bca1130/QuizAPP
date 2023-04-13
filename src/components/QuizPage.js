import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleAnswerButtonClick = (answer) => {
    //console.log(questions[currentQuestion].answer);
    //debugger;
    if (questions[currentQuestion].answer === answer) {
      //console.log(answer);
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      //alert('you reached end of the quiz');
      setShowScore(true);
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  function getAllQuestions() {
    axios
      .get("http://localhost:8080/api/questions")
      .then((response) => {
        setQuestions(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch questions:", error);
        setError("Failed to fetch questions. Please try again later.");
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (questions.length === 0) {
      navigate("/QuizPage");
    }
  }, [navigate, questions]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong with the API</div>;
  }

  if (!questions || currentQuestion >= questions.length) {
    return <div>Question not found</div>;
  }
  //console.log(questions[currentQuestion].answer)
  console.log(score);
 

  return (
    <div className="quiz-page">
      {showScore ? (
        <div className="score-section">
          <h1>
            You scored {score} out of {questions.length}!
          </h1>
          <button onClick={() => navigate("/ResultPage")}>
            Go back to HomePage
          </button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].text}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].options &&
              questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerButtonClick(option)}
                >
                  {option}
                </button>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default QuizPage;
