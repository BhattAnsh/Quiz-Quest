import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllQuestionsByQuiz, deleteQuestion, publishQuiz } from '../api/apiRequests';
import toast from 'react-hot-toast';
import { Label } from './ui/label';

const ReviewQuiz = ({ quizId, quizTitle }) => {
  const [loading, setLoading] = useState(true);
  const [ques, setQues] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const fetchedQuestions = await getAllQuestionsByQuiz(quizId);
        if (fetchedQuestions.success) {
          setQues(fetchedQuestions.data); 
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [quizId]);

  const handleRemoveQuestion = async (index) => {
    const questionId = ques[index]._id;
    console.log("Deleting question with ID:", questionId); 
    try {
      await deleteQuestion(questionId);
      setQues((prev) => prev.filter((_, i) => i !== index));
      toast.success('Question removed successfully!');
    } catch (error) {
      console.error('Error deleting question:', error);
      toast.error('Failed to remove question');
    }
  };
  
  const handlePublishQuiz = async () => {
    try {
      await publishQuiz(quizId);
      toast.success('Quiz published successfully!');
    } catch (error) {
      toast.error('Failed to publish quiz: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <CardHeader>
        <CardTitle>Review Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full space-y-2">
          <span className="m-2">
            <strong>Quiz title: {quizTitle}</strong>
          </span>
          {loading ? (
            <p>Loading questions...</p>
          ) : ques.length === 0 ? (
            <p>No questions available.</p>
          ) : (
            ques.map((question, index) => {
              const { questionText, type, points, options, correctOptions } = question;

              return (
                <div key={index} className="flex flex-col space-y-2 p-4 bg-gray-100">
                  <p><strong>Question Text:</strong> {questionText}</p>
                  <Label>{type}</Label>
                  <p><strong>Points:</strong> {points ?? 'N/A'}</p> {/* Handle undefined points */}
              
                  {options && options.length > 0 && (
                    <div>
                      <p><strong>Options:</strong></p>
                      <ul>
                        {options.map((option, optionIndex) => (
                          <li key={optionIndex}>
                            {option.label}: {option.value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {correctOptions && correctOptions.length > 0 && (
                    <p><strong>Correct Answers:</strong> {correctOptions.join(', ')}</p>
                  )}

                  <div className="flex space-x-2">
                    <Button variant="destructive" onClick={() => handleRemoveQuestion(index)}>
                      Remove
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handlePublishQuiz} disabled={ques.length === 0}>
          Publish Quiz
        </Button>
      </CardFooter>
    </motion.div>
  );
};

export default ReviewQuiz;
