import React from 'react';
import { useNavigate } from "react-router-dom";

function ResultPage({ score, totalQuestions, message }) {
  const navigate = useNavigate(); 

  const handlePlayAgainButtonClick = () => {
    navigate('/LandingPage'); 
  };
  return (
    <div className="result-page">
      <h1>{message} You scored {score} out of {totalQuestions}!</h1>
      <button onClick={handlePlayAgainButtonClick}>Play again</button>
    </div>
  );
}

export default ResultPage; 
