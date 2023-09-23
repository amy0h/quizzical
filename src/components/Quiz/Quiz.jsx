import React from 'react';
import { decode } from 'html-entities';
import './Quiz.css';

export default function Quiz({
    quiz,
    userAnswer,
    showResults,
    handleAnswerSelection
}) {
    const decodedQuestion = decode(quiz.question);

    // Determine classes for answer based on condition
    const getButtonClasses = (answer) => {
        let classes = 'answer';
        // Highlight currently selected answer
        if (userAnswer === answer) {
            classes += ' selected-answer';
        }
  // When user submits their answers
  if (showResults) {
    // Highlight the correct answer
    if (answer === quiz.correct_answer) {
      classes += ' correct-answer';
    }
    // Highlight user's incorrect answer
    else if (userAnswer === answer && userAnswer !== quiz.correct_answer) {
      classes += ' incorrect-answer';
    }
  }
        return classes;
    };

    // Render Answers
    const renderAnswerButtons = () => {
        return quiz.answers.map((answer, index) => (
            <button
                key={index}
                className={getButtonClasses(answer)}
                onClick={() => handleAnswerSelection(answer)}
                disabled={showResults}
            >
                {decode(answer)}
            </button>
        ));
    };

    return (
        <div>
            <h2 className='quiz-question'>{decodedQuestion}</h2>
            <div className='quiz-answer-container'>
                {renderAnswerButtons()}
            </div>
            <div className='divider'></div>
        </div>
    );
}