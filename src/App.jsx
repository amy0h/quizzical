import React, { useState, useEffect } from 'react'
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
useEffect(() => {
  const titleElement = document.querySelector('.title');
  const descElement = document.querySelector('.desc');
  const btnElement = document.querySelector('.start-btn')
  // Add the 'animate' class after a short delay
  setTimeout(() => {
    titleElement.classList.add('animate');
    descElement.classList.add('animate');
    btnElement.classList.add('animate')
  }, 500);
}, []);

  return (
    <main>
      <img className='blob-top' src='/1.svg'/>
      {quizStatus === false ?
        <div>
          <h1 className='title'>Quizzical</h1>
          <p className='desc'>Explore Your Knowledge</p>
          <button className='start-btn' onClick={handleBeginQuiz}>Ready to Play?</button>
        </div> :
          <QuizPage quizOption={quizOption}/>
            }
      <div>
        <h1 className='title'>Quizzical</h1>
        <p className='desc'>Explore Your Knowledge</p>
        <button className='start-btn' onClick={handleBeginQuiz}>Ready to Play?</button>
      </div>

      {showModal && 
      <QuizSetup
        quizOption={quizOption}
        setQuizOption={setQuizOption}
        setQuizStatus={setQuizStatus}
        toggleShowModal={toggleShowModal}
        /> }

        <img className='blob-bottom' src='/2.svg'/>
    </main>
  )
}

export default App
