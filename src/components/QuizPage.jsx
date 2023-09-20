import React from 'react'

export default function QuizPage({ quizOption }) {

  const [quizData, setQuizData] = React.useState([])

  React.useEffect(() => {
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
  }`;

  console.log(apiUrl)
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const questionsData = await response.json();
    setQuizData(questionsData.results)

  } catch (error) {
    console.error('Error during API request:', error.message);
  }
}

function handleAnswerSelection(question, selectedAnswer) {
  if (selectedAnswer === question.correct_answer) {
    console.log('rignt!')
  } else {
    console.log('wrong!')
  }

}

console.log(quizData)
  return (
    <div> 
      {quizData.map((quiz, index) => (
        <div key={index}>
          <p>Question: {quiz.question}</p>
          <div>
            <p>Answers:</p>
            <button
              onClick={() => handleAnswerSelection(quiz, quiz.correct_answer)}>
              {quiz.correct_answer}
            </button>
            {quiz.incorrect_answers.map((answer, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelection(quiz, answer)}>
                {answer}
              </button>
            ))}
              </div>
        </div> 
      ))}
      <button>Check answers</button>
    </div>
  )
}