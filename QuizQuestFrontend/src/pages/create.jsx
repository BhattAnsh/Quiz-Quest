import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BoxesCore } from '../components/Background.jsx';

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([
    { questionText: '', questionType: 'MCQ', options: [''], answer: '', mandatory: false, points: 0 },
  ]);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const newQuestions = [...questions];
    if (newQuestions[qIndex].questionType === 'MCQ') {
      newQuestions[qIndex].options[aIndex] = value;
    } else {
      newQuestions[qIndex].answer = value;
    }
    setQuestions(newQuestions);
  };

  const handleQuestionTypeChange = (qIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].questionType = value;
    if (value !== 'MCQ') {
      newQuestions[qIndex].options = [];
    } else if (!newQuestions[qIndex].options) {
      newQuestions[qIndex].options = [''];
    }
    setQuestions(newQuestions);
  };

  const addAnswer = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push('');
    setQuestions(newQuestions);
  };

  const handleMandatoryChange = (qIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].mandatory = value;
    setQuestions(newQuestions);
  };

  const handlePointsChange = (qIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].points = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', questionType: 'MCQ', options: [''], answer: '', mandatory: false, points: 0 },
    ]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    // Add API call
    return;
  };

  return (
    <>
      <div className="relative h-max w-full flex flex-col items-center pt-24 py-3 px-4 md:px-20">
      <BoxesCore className=""/>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-4xl"
        >
          <h1 className="text-3xl md:text-5xl pt-3 font-bold text-center text-gray-100 mb-6">
            Create Your Quiz
          </h1>

          {/* Form  */}
          <div className="flex flex-col gap-10">
            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="p-4 bg-white/20 bg-opacity-60 bg-blur-lg rounded-lg shadow-md border border-gray-200 relative" 
              >
                <div className="flex items-center justify-between">
                  <label className="text-lg text-white font-semibold">Question {qIndex + 1}</label>
                  <button
                    onClick={() => removeQuestion(qIndex)}
                    className="bg-red-500 text-white  px-3 py-1 rounded-md"
                  >
                    Remove
                  </button>
                </div>

                {/* Question Input */}
                <input
                  type="text"
                  className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                  placeholder="Enter your question"
                  value={q.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                />

                {/* Question Type */}
                <label className="mt-2 font-semibold text-lg text-white">Question Type:</label>
                <select
                  value={q.questionType}
                  onChange={(e) => handleQuestionTypeChange(qIndex, e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                >
                  <option value="MCQ">Multiple Choice (MCQ)</option>
                  <option value="Short Answer">Short Answer</option>
                  <option value="True/False">True/False</option>
                </select>

                {/* Options for MCQ */}
                {q.questionType === 'MCQ' && (
                  <>
                    {q.options?.map((a, aIndex) => (
                      <input
                        key={aIndex}
                        type="text"
                        className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                        placeholder={`Option ${aIndex + 1}`}
                        value={a}
                        onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                      />
                    ))}

                    {/* Add Answer Option */}
                    <button
                      onClick={() => addAnswer(qIndex)}
                      className="mt-2 bg-[#CFF466] text-[#1E5128] px-4 py-2 rounded-lg"
                    >
                      Add Answer Option
                    </button>
                  </>
                )}

                <div className='flex flex-row justify-between'>

               <div className="mt-2">
                  <label className="text-lg text-white font-semibold">Points:</label>
                  <input
                    type="number"
                    className="ml-2 w-16 border border-gray-300 rounded-md px-3 py-1 focus:outline-none"
                    value={q.points}
                    onChange={(e) => handlePointsChange(qIndex, Number(e.target.value))}
                  />
                </div>
                <div className="mt-2">
                  <label className="text-lg text-white font-semibold">Mandatory:</label>
                  <input
                    type="checkbox"
                    className="ml-2"
                    checked={q.mandatory}
                    onChange={(e) => handleMandatoryChange(qIndex, e.target.checked)}
                  />
                </div>

                </div>
              </div>
            ))}

            {/* Add Question Button */}
            <button
              onClick={addQuestion}
              className="mt-1 bg-[#CFF466] text-[#1E5128] px-6 py-3 rounded-lg"
            >
              Add New Question
            </button>
            <button
              className="mt-1 bg-blue-200 text-[#1E5128] px-6 py-3 rounded-lg"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CreateQuiz;
