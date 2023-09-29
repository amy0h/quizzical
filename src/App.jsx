import React, { useState, useEffect } from 'react';
import QuizSetup from './components/QuizSetup/QuizSetup';
import QuizPage from './components/QuizPage/QuizPage';
import './App.css';

function App() {
  const [showModal, toggleShowModal] = React.useState(false);
  const [quizStatus, setQuizStatus] = React.useState(false);
  const [quizOption, setQuizOption] = React.useState({
    category: '',
    difficulty: '',
    type: '',
  });

  useEffect(() => {
    // Function to apply animations to title page elements
    function applyAnimation() {
      const titleElement = document.querySelector('.title');
      const descElement = document.querySelector('.desc');
      const btnElement = document.querySelector('.start-btn');

      if (titleElement && descElement && btnElement) {
        setTimeout(() => {
          titleElement.classList.add('animate');
          descElement.classList.add('animate');
        }, 500);

        setTimeout(() => {
          btnElement.classList.add('animate');
        }, 1000);
      }
    }

    // Call applyAnimation when the component mounts
    // or when gameStatus changes
    applyAnimation();
  }, [quizStatus]);

  function handleShowModal() {
    toggleShowModal(true);
  }

  return (
    <div className='main-content-container'>
      <main>
        <img className='blob-top' src='/1.svg' alt='Top Blob' />
        {!quizStatus ? (
          <div>
            <h1 className='title'>Quizzical</h1>
            <p className='desc'>Explore Your Knowledge</p>
            <button className='start-btn' onClick={handleShowModal}>
              Ready to Play?
            </button>
          </div>
        ) : (
          <QuizPage
            quizOption={quizOption}
            setQuizStatus={setQuizStatus} 
          />
        )}

        {showModal && (
          <QuizSetup
            quizOption={quizOption}
            setQuizOption={setQuizOption}
            setQuizStatus={setQuizStatus}
            toggleShowModal={toggleShowModal}
          />
        )}

        <img className='blob-bottom' src='/2.svg' alt='Bottom Blob' />
      </main>

      <footer>
        <p>Created with 💜 by <a href="https://github.com/amy0h" target="_blank">Amy</a></p>
      </footer>
    </div>
  );
}

export default App;