import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/QuizPage'); 
  };

  return (
    <div>
      <h1>Welcome to the Quiz App</h1>
      <button onClick={handleClick}>Start Quiz</button>
    </div>
  );
}

export default LandingPage;
