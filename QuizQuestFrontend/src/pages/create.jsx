import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BackgroundBeamsWithCollision } from '../components/Background.jsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import toast, { Toaster } from 'react-hot-toast';
import { createQuiz, addQuestion, deleteQuestion } from '../api/apiRequests';
import ReviewQuiz from '../components/ReviewQuiz.jsx';

const CreateQuiz = () => {
  const [step, setStep] = useState(0);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDesc, setQuizDesc] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: '',
    type: '',
    options: [''],
    correctOptions: [], 
    validation: { 
      required: false,
      regex: null,
      errorMessage: ''
    },
    mandatory: false,
    points: 1,
    sectionIndex: 0
  });
  const [quizId, setQuizId] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const resetCurrentQuestion = () => {
    setCurrentQuestion({
      questionText: '',
      type: '',
      options: [''],
      correctOptions: '',
      validation: 'valid',
      mandatory: false,
      points: 1,
      sectionIndex: 0
    });
  };

  const handleRemoveQuestion = async (index) => {
    const questionToRemove = questions[index];
    try {
      if (questionToRemove._id) {
        await deleteQuestion(questionToRemove._id);
      }
      setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
      toast.success('Question removed successfully!');
    } catch (error) {
      toast.error('Failed to remove question: ' + error.message);
    }
  };

  const handleGoBack = () => {
    setStep(step > 0 ? step - 1 : 0);
  };

  const handleGoNext = () => {
    if (step === 0 && quizTitle.trim() === '') {
      toast.error('Please enter a quiz title before proceeding.');
      return;
    }
    if (step === 1 && questions.length === 0) {
      toast.error('Please add at least one question.');
      return;
    }
    setStep(step + 1);
  };

  const validateCurrentQuestion = () => {
    if (!currentQuestion.type || !currentQuestion.questionText.trim()) {
      toast.error('Please fill in all required fields before adding the question.');
      return false;
    }

    if (currentQuestion.type === 'multiple-choice') {
      const hasEmptyOption = currentQuestion.options.some(option => option.value.trim() === '');
      
      const hasNoCorrectOption = !currentQuestion.correctOptions || currentQuestion.correctOptions.length === 0;
    
      if (hasEmptyOption || hasNoCorrectOption) {
        toast.error('Please fill in all options and the correct answer.');
        return false;
      }
    }
    

    if (currentQuestion.points <= 0) {
      toast.error('Points must be a positive integer.');
      return false;
    }

    return true;
  };


// hard coding labels cuz yes
const Labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');


const handleQuestionTypeChange = (value) => {
  setCurrentQuestion({
    ...currentQuestion,
    type: value,
    options: (value === 'multiple-choice' || value === 'checkboxes' || value === 'dropdown')
      ? [{ label: 'A', value: '' }] 
      : [],
    correctOptions: [], 
    validation: { 
      required: false,
      regex: null,
      errorMessage: ''
    }
  });
};

const initializeOptions = (options) => {
  return options.map((option, index) => ({
    ...option,
    label: Labels[index] || `Option ${index + 1}`
  }));
};

const handleOptionChange = (index, value) => {
  setCurrentQuestion(prev => ({
    ...prev,
    options: prev.options.map((option, i) => 
      i === index 
        ? { ...option, value: value.trim(), label: Labels[i] }
        : option
    )
  }));
};

useEffect(() => {
  if (currentQuestion.options.length > 0) {
    setCurrentQuestion(prev => ({
      ...prev,
      options: initializeOptions(prev.options)
    }));
  }
}, []); 

const addOption = () => {
  setCurrentQuestion(prev => {
    const newIndex = prev.options.length;
    const label = newIndex < Labels.length 
      ? Labels[newIndex] 
      : `Option ${newIndex + 1}`;

    return {
      ...prev,
      options: [
        ...prev.options,
        { label, value: '' }
      ]
    };
  });
};

const removeOption = (index) => {
  setCurrentQuestion(prev => ({
    ...prev,
    options: prev.options
      .filter((_, i) => i !== index)
      .map((option, i) => ({ 
        ...option, 
        label: Labels[i] 
      }))
  }));
};

const handleAddQuestion = async () => {
  if (!validateCurrentQuestion()) return;
    
  try {
    const questionData = {
      ...currentQuestion,
      options: currentQuestion.options.map((option, index) => ({
        ...option,
        label: Labels[index]
      })),
      correctOptions: formatCorrectOptions(currentQuestion.type, currentQuestion.correctOptions),
      validation: {
        required: currentQuestion.mandatory,
        regex: null,
        errorMessage: 'This field is required'
      },
      quizId
    };
    
    const response = await addQuestion(questionData);
    setQuestions(prev => [...prev, response.data]);
    resetCurrentQuestion();
    toast.success('Question added successfully!');
  } catch (error) {
    toast.error('Failed to add question: ' + (error.response?.data?.message || error.message));
  }
};
  const formatCorrectOptions = (type, value) => {
    switch (type) {
      case 'multiple-choice':
        return typeof value === 'string' ? value.split(',').map(v => v.trim()) : Array.isArray(value) ? value : [value];
      case 'true-false':
        return [value.toLowerCase() === 'true'];
      case 'short-answer':
        return [value];
      default:
        return [];
    }
  };

  const handleCreateQuiz = async () => {
    try {
      const quizData = {
        title: quizTitle,
        description: quizDesc,
        sections: [{
          title: 'Default Section',
          description: 'Default section description',
          questions: []
        }]
      };
      
      const response = await createQuiz(quizData);
      setQuizId(response.data._id);
      setGeneratedCode(response.data.quizCode);
      toast.success('Quiz created successfully!');
      return response.data._id;
    } catch (error) {
      toast.error('Failed to create quiz: ' + (error.response?.data?.message || error.message));
      return null;
    }
  };

  const handleCreateAndGoNext = async () => {
    const createdQuizId = await handleCreateQuiz();
    if (createdQuizId) {
      handleGoNext();
    }
  };
  

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success('Copied to clipboard!');
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className='flex flex-row justify-end'>
              <Button variant="ghost" onClick={handleGoNext}><ArrowRight size={20} /></Button>
            </div>
            <CardHeader>
              <CardTitle>Create Your Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Quiz title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="mb-2"
              />
              <Input
                placeholder="Quiz description"
                value={quizDesc}
                onChange={(e) => setQuizDesc(e.target.value)}
                className="mb-4"
              />
              <Button onClick={handleCreateAndGoNext}>Add Questions</Button>
            </CardContent>
          </motion.div>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className='flex flex-row justify-end'>
              <Button variant="ghost" onClick={handleGoBack}><ArrowLeft size={20} /></Button>
              <Button variant="ghost" onClick={handleGoNext}><ArrowRight size={20} /></Button>
            </div>
            <CardHeader>
              <CardTitle>Add Question</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={handleQuestionTypeChange}>
                <SelectTrigger className="mb-4">
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                  <SelectItem value="true-false">True/False</SelectItem>
                  <SelectItem value="short-answer">Short Answer</SelectItem>
                  {/* <SelectItem value="checkboxes">Checkboxes</SelectItem> */}
                  {/* <SelectItem value="dropdown">Dropdown</SelectItem> */}
                </SelectContent>
              </Select>
              <Input
                placeholder="Enter question"
                value={currentQuestion.questionText}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, questionText: e.target.value })}
                className="mb-4"
              />
              {['multiple-choice', 'checkboxes', 'dropdown'].includes(currentQuestion.type) && (
                <div>
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className='flex flex-row m-2 mb-1'>
                      <span className="mt-2 mr-3">{option.label}</span> 
                      <Input
                        type="text"
                        placeholder="Option Value"
                        value={option.value}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="mt-2"
                      />
                      <Button variant="destructive" className="m-2" onClick={() => removeOption(index)}>Remove</Button>
                    </div>
                  ))}
                  <Button onClick={addOption}>Add Option</Button>
                  <Input
                    placeholder="Enter correct answer"
                    value={currentQuestion.correctOptions}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctOptions: e.target.value })}
                    className="mb-4 mt-2"
                  />
                </div>
              )}

              {(currentQuestion.type === 'short-answer' || currentQuestion.type === 'true-false') && (
                <Input
                  placeholder="Enter correct answer"
                  value={currentQuestion.correctOptions}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctOptions: e.target.value })}
                  className="mb-4"
                />
              )}
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="mandatory"
                  checked={currentQuestion.mandatory}
                  onCheckedChange={(checked) => setCurrentQuestion({ ...currentQuestion, mandatory: checked })}
                />
                <Label htmlFor="mandatory">Mandatory question</Label>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <Label htmlFor="points">Points:</Label>
                <Input
                  id="points"
                  type="number"
                  min="1"
                  value={currentQuestion.points}
                  onChange={(e) => setCurrentQuestion({
                    ...currentQuestion,
                    points: Math.max(1, parseInt(e.target.value) || 1)
                  })}
                  className="w-20"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <div>
              <Button onClick={handleAddQuestion} className="mb-4 mr-2">Add Question</Button>
              <Button onClick={handleGoNext}>Review and Create</Button>
              </div>

              <div className="w-full space-y-2">
                {questions.map((q, index) => (
                  <div key={index} className="flex items-center justify-between w-full p-2 bg-gray-50 rounded">
                    <span className="truncate mr-2">{q.questionText}</span>
                    <Button variant="destructive" onClick={() => handleRemoveQuestion(index)}>Remove</Button>
                  </div>
                ))}
              </div>

            </CardFooter>
          </motion.div>
        );

      case 2:
        return (
          <ReviewQuiz 
              quizId={quizId}
              quizTitle={quizTitle} 
              setStep={setStep}
              step={step} questions={questions} setQuestions={setQuestions}
          />
        );

        case 3:
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CardHeader>
                <CardTitle>Your Quiz Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='p-4 bg-gray-100 rounded-lg mt-2 mb-2'>
                <p>{generatedCode}</p>
                </div>
                <Button onClick={copyToClipboard}>Copy Code</Button>
              </CardContent>
            </motion.div>
          );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col justify-center items-center h-full w-full"
        >
    <BackgroundBeamsWithCollision className="custom-class">
      <div className="flex justify-center items-center w-full h-max min-h-screen mt-10 z-20">
        <Card className="w-2/5 bg-white shadow-lg max-w-1/2 mx-auto">
        <motion.div
        key={step} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        transition={{duration: 0.5}}
      >
            {renderStep()}
          </motion.div>
        </Card>
        <Toaster position='bottom-right'/>
      </div>
    </BackgroundBeamsWithCollision>
    </motion.div>
    </div>
  );
};

export default CreateQuiz;