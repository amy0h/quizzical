import React from 'react';

export default function QuizSetup({
    quizOption,
    setQuizOption,
    setQuizStatus,
    toggleShowModal
}) {

    function handleChange() {
        const { name, value } = event.target;
        setQuizOption(prevOption => ({
            ...prevOption,
            [name]: value
        }));
    }

    // Hide modal and begin quiz
    function handleBeginQuiz() {
        toggleShowModal(false);
        setQuizStatus(true);
    }

    return (
        <div className='modal'>
            <div className='modal-content'>
                <p className='modal-content-title'>Customize Your Quiz</p>
                <label htmlFor='category'>Pick a Quiz Category</label>
                <select
                    value={quizOption.category}
                    name='category'
                    id='category'
                    onChange={handleChange}
                >
                    <option value=''>Any Category</option>
                    <option value='9'>General Knowledge</option>
                    <option value='10'>Entertainment: Books</option>
                    <option value='11'>Entertainment: Film</option>
                    <option value='12'>Entertainment: Music</option>
                    <option value='13'>Entertainment: Musicals &amp; Theatres</option>
                    <option value='14'>Entertainment: Television</option>
                    <option value='15'>Entertainment: Video Games</option>
                    <option value='16'>Entertainment: Board Games</option>
                    <option value='17'>Science &amp; Nature</option>
                    <option value='18'>Science: Computers</option>
                    <option value='19'>Science: Mathematics</option>
                    <option value='20'>Mythology</option>
                    <option value='21'>Sports</option>
                    <option value='22'>Geography</option>
                    <option value='23'>History</option>
                    <option value='24'>Politics</option>
                    <option value='25'>Art</option>
                    <option value='26'>Celebrities</option>
                    <option value='27'>Animals</option>
                    <option value='28'>Vehicles</option>
                    <option value='29'>Entertainment: Comics</option>
                    <option value='30'>Science: Gadgets</option>
                    <option value='31'>Entertainment: Japanese Anime &amp; Manga</option>
                    <option value='32'>Entertainment: Cartoon &amp; Animations</option>
                </select>

                <label htmlFor='difficulty'>Pick a Quiz Difficulty Level</label>
                <select
                    value={quizOption.difficulty}
                    name='difficulty'
                    id='difficulty'
                    onChange={handleChange}
                >
                    <option value=''>Any Difficulty</option>                        
                    <option value='easy'>Easy</option>        
                    <option value='medium'>Medium</option>
                    <option value='hard'>Hard</option>
                </select>

                <label htmlFor='type'>Pick Question Format</label>
                <select
                    value={quizOption.type}
                    name='type'
                    id='type'
                    onChange={handleChange}
                >
                    <option value=''>Any Type</option>                        
                    <option value='multiple'>Multiple Choice</option>        
                    <option value='boolean'>True / False</option>
                </select>
                <button
                    className='modal-content-btn'
                    onClick={handleBeginQuiz}
                >
                    Start Quiz
                </button>
            </div>
        </div>
    );
}