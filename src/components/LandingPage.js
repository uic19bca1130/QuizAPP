import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate(); // Initialize useHistory hook to allow redirect to quiz page

  const handleClick = () => {
    navigate('/QuizPage'); // Navigate to quiz page when button is clicked
  };

  return (
    <div>
      <h1>Welcome to the Quiz App</h1>
      <button onClick={handleClick}>Start Quiz</button>
    </div>
  );
}

export default LandingPage;
