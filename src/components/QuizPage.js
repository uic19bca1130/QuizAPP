import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  function getAllQuestions() {
    axios
      .get('http://localhost:8080/api/questions')
      .then((response) => {
        setQuestions(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (questions.length === 0) {
      navigate('/QuizPage');
    }
  }, [navigate, questions]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong with the API Please try again later.</div>;
  }

  if (!questions || currentQuestion >= questions.length) {
    return <div>Question not found</div>;
  }


  return (
    <div className="quiz-page">
      {showScore ? (
        <div className="score-section">
          <h1>
            You scored {score} out of {questions.length}!
          </h1>
          <button onClick={() => navigate('/LandingPage')}>Go back to homepage</button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">{questions[currentQuestion].question}</div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answers &&
              questions[currentQuestion].answers.map((answer, index) => (
                <button key={index} onClick={() => handleAnswerButtonClick(answer.isCorrect)}>
                  {answer.answerText}
                </button>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default QuizPage;
