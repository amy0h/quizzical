import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import Quiz from '../Quiz/Quiz'; 
import '../QuizPage/QuizPage.css';

export default function QuizPage({ quizOption, setQuizStatus }) {
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [userScore, setUserScore] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, [quizOption]);

  useEffect(() => {
    const allAnswersSelected = Object.values(userAnswers).every((value) => value !== null);
    setShowBtn(allAnswersSelected);
  }, [userAnswers]);

  async function fetchQuestions() {
    setIsLoading(true);

    const baseUrl = 'https://opentdb.com/api.php?amount=5';
    const apiUrl = `${baseUrl}${
      quizOption.category !== '' ? `&category=${quizOption.category}` : ''
    }${
      quizOption.difficulty !== '' ? `&difficulty=${quizOption.difficulty}` : ''
    }${
      quizOption.type !== '' ? `&type=${quizOption.type}` : ''
    }`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const questionsData = await response.json();
      const shuffledQuizData = questionsData.results.map((quiz) => ({
        ...quiz,
        answers: shuffleArray([quiz.correct_answer, ...quiz.incorrect_answers]),
      }));
      setQuizData(shuffledQuizData);

      const initialAnswers = {};
      shuffledQuizData.forEach((quiz) => {
        initialAnswers[quiz.question] = null;
      });
      setUserAnswers(initialAnswers);
      setIsLoading(false);
    } catch (error) {
      console.error('Error during API request:', error.message);
      setIsLoading(false);
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handleAnswerSelection(question, selectedAnswer) {
    if (!showResults) {
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [question]: selectedAnswer,
      }));
    }
  }

  function checkAnswers() {
    const score = calculateScore();
    setUserScore(score);
    setShowResults(true);
    /* setShowBtn(false) */
  }

  function calculateScore() {
    let score = 0;
    quizData.forEach((quiz) => {
      if (userAnswers[quiz.question] === quiz.correct_answer) {
        score++;
      }
    });
    return score;
  }

  function handleRestart() {
    setUserAnswers({});
    setShowResults(false);
    fetchQuestions();
  }

  function handleBackToMain() {
    // Navigate back to the main page
    setQuizStatus(false);
  }

  return (
    <div>
      {isLoading ? (
        <div className="loading-container">
          <ReactLoading type='bubbles' color='#4D5B9E' height={'100px'} width={'100px'} />
        </div>
      ) : (
        <div className='quiz-container'>
          {quizData.map((quiz, index) => (
            <Quiz
              key={index}
              quiz={quiz}
              userAnswer={userAnswers[quiz.question]}
              showResults={showResults}
              handleAnswerSelection={(selectedAnswer) => handleAnswerSelection(quiz.question, selectedAnswer)}
            />
          ))}
          {showResults ? (
            <div className='score-section'>
              <span className='score-message'>
                You scored {userScore}/{quizData.length} correct answers
              </span>
              {userScore === 5 && (
                <span className='score-message'>
                  . You rock!
                </span>
              )}
              <div className='btn-container'>
                <button onClick={handleRestart}>Restart Game</button>
                <button onClick={handleBackToMain}>Back to Main</button>
              </div>
            </div>
          ) : (
            showBtn ? (
              <button
                className='check-answer-btn'
                onClick={checkAnswers}
              >
                Check answers
              </button>
            ) : (
              <p className='score-message'>
                Please answer all questions to check your answers
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}