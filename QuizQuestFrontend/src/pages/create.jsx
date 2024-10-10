import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BoxesCore } from '../components/Background.jsx';

const CreateQuiz = () => {
  const [quizName, setQuizName] = useState('');
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
    console.log('Quiz submitted:', { quizName, questions });
  };

  return (
    <div className="min-h-screen mt-16 pt-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <BoxesCore className="z-0" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <label htmlFor="quizName" className="block text-sm font-medium text-gray-300">
              Quiz Name
            </label>
            <input
              type="text"
              name="quizName"
              id="quizName"
              className="mt-1 block w-full border-gray-700 bg-gray-700 text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              placeholder="Enter quiz name"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
            />
          </div>
        </div>

        {questions.map((q, qIndex) => (
          <div key={qIndex} className="bg-gray-800 shadow-md rounded-lg overflow-hidden mb-8">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-300">Question {qIndex + 1}</h3>
                <button
                  onClick={() => removeQuestion(qIndex)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor={`question-${qIndex}`} className="block text-sm font-medium text-gray-300">
                    Question
                  </label>
                  <input
                    type="text"
                    name={`question-${qIndex}`}
                    id={`question-${qIndex}`}
                    className="mt-1 block w-full border-gray-700 bg-gray-700 text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    placeholder="Enter your question"
                    value={q.questionText}
                    onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor={`questionType-${qIndex}`} className="block text-sm font-medium text-gray-300">
                    Question Type
                  </label>
                  <select
                    id={`questionType-${qIndex}`}
                    name={`questionType-${qIndex}`}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={q.questionType}
                    onChange={(e) => handleQuestionTypeChange(qIndex, e.target.value)}
                  >
                    <option value="MCQ">Multiple Choice (MCQ)</option>
                    <option value="Short Answer">Short Answer</option>
                    <option value="True/False">True/False</option>
                  </select>
                </div>

                {q.questionType === 'MCQ' && (
                  <div className="space-y-2">
                    {q.options?.map((a, aIndex) => (
                      <input
                        key={aIndex}
                        type="text"
                        className="block w-full border-gray-700 bg-gray-700 text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                        placeholder={`Option ${aIndex + 1}`}
                        value={a}
                        onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => addAnswer(qIndex)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Option
                    </button>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div>
                    <label htmlFor={`points-${qIndex}`} className="block text-sm font-medium text-gray-300">
                      Points
                    </label>
                    <input
                      type="number"
                      name={`points-${qIndex}`}
                      id={`points-${qIndex}`}
                      className="mt-1 block w-24 border-gray-700 bg-gray-700 text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                      value={q.points}
                      onChange={(e) => handlePointsChange(qIndex, Number(e.target.value))}
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      id={`mandatory-${qIndex}`}
                      name={`mandatory-${qIndex}`}
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={q.mandatory}
                      onChange={(e) => handleMandatoryChange(qIndex, e.target.checked)}
                    />
                    <label htmlFor={`mandatory-${qIndex}`} className="ml-2 block text-sm text-gray-300">
                      Mandatory
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addQuestion}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New Question
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Create Quiz
          </button>
        </div>
      </motion.div>
   

    </div>
  );
};

export default CreateQuiz;
