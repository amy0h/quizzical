import React, { useState, useEffect } from 'react'

export default function QuizPage({ quizOption }) {

  const [quizData, setQuizData] = useState([])
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false)
  
  useEffect(() => {
    fetchQuestions()
  }, [quizOption])

async function fetchQuestions() {
  const baseUrl = 'https://opentdb.com/api.php?amount=5';
  const apiUrl = `${baseUrl}${
    quizOption.category !== '' ? `&category=${quizOption.category}` : ''
  }${
    quizOption.difficulty !== '' ? `&difficulty=${quizOption.difficulty}` : ''
  }${
    quizOption.type !== '' ? `&type=${quizOption.type}` : ''
  }`
  
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
    
    const initialAnswers = {}
    shuffledQuizData.forEach((quiz) => {
      initialAnswers[quiz.question] = null
    })
    setUserAnswers(initialAnswers)

  } catch (error) {
    console.error('Error during API request:', error.message);
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
  console.log(question, selectedAnswer)
  setUserAnswers((prevAnswers) => ({
    ...prevAnswers,
    [question]: selectedAnswer,
  }))
}

  function checkAnswers() {
    setShowResults(true)
  }
  
  return (
    <div>
      {quizData.map((quiz, index) => (
        <div key={index}>
          <h2 className='quiz-question'>{quiz.question}</h2>
          <div className='quiz-answer-container'>
            {quiz.answers.map((answer, index) => (
            <button
              key={index}
              className={`answers ${
                userAnswers[quiz.question] === answer ? 'selected-answer' : ''
              } ${
                showResults && answer === quiz.correct_answer
                  ? 'correct-answer'
                  : showResults && answer === userAnswers[quiz.question]
                  ? 'incorrect-answer'
                  : ''
              }`}
              onClick={() => handleAnswerSelection(quiz.question, answer)}
            >
              {answer}
            </button>
            ))}
          </div>
        </div>
      ))}
      <button onClick={checkAnswers}>Check answers</button>
    </div>
  );
}