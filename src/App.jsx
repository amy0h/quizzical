import React from 'react'
import QuizSetup from './components/QuizSetup'
import QuizPage from './components/QuizPage'
import './App.css'

function App() {
  const [showModal, toggleShowModal] = React.useState(false)
  const [quizStatus, setQuizStatus] = React.useState(false)
  const [quizOption, setQuizOption] = React.useState(
    {
        category: '',
        difficulty: '',
        type: ''
})

function handleBeginQuiz() {
  toggleShowModal(true)
}

  return (
    <main> 
      <img className='blob-top' src='/1.svg'/>
      <h1 className='title'>Quizzical</h1>
      <p className='desc'>Some desc</p>
      <button className='start-btn' onClick={handleBeginQuiz}>Start Quiz</button>
      {showModal && 
      <QuizSetup
        quizOption={quizOption}
        setQuizOption={setQuizOption}
        setQuizStatus={setQuizStatus}
        toggleShowModal={toggleShowModal}
        /> }
      {quizStatus && <QuizPage quizOption={quizOption}/>}
        <img className='blob-bottom' src='/2.svg'/>
    </main>
  )
}

export default App
