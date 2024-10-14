import React, { useState } from 'react';
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

const CreateQuiz = () => {
  const [step, setStep] = useState(0);
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    type: '',
    question: '',
    options: [''],
    answer: '',
    isMandatory: false,
    points: 1
  });
  const [generatedCode, setGeneratedCode] = useState('');
  
  const resetCurrentQuestion = () => {
    setCurrentQuestion({
      type: '',
      question: '',
      options: [''],
      answer: '',
      isMandatory: false,
      points: 1
    });
  };
  
  const handleRemoveQuestion = (index) => {
    setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
    toast.success('Question removed successfully!');
  };

  const handleGoBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
    if (step === 3) {
      setStep(0);
    }
  };
  
  const handleGoNext = () => {
    if (step === 0) {
      if (quizTitle.trim() === '') {
        toast.error('Please enter a quiz title before proceeding.');
        return;
      }
      setStep(1);
    } else if (step === 1) {
      if (questions.length === 0) {
        toast.error('Please add at least one question.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };
  
  const validateCurrentQuestion = () => {
    if (currentQuestion.type === '' || currentQuestion.question.trim() === '' || currentQuestion.answer.trim() === '') {
      toast.error('Please fill in all required fields before adding the question.');
      return false;
    }
  
    if (currentQuestion.type === 'multiple-choice') {
      const hasEmptyOption = currentQuestion.options.some(option => option.trim() === '');
      if (hasEmptyOption) {
        toast.error('Please fill in all options before adding the question.');
        return false;
      }
    }
  
    return true;
  };
  
  const handleAddQuestion = () => {
    if (!validateCurrentQuestion()) return;
    setQuestions([...questions, currentQuestion]);
    resetCurrentQuestion();
    toast.success('Question added successfully!');
  };
  
  const handleCreateQuiz = () => {
    try {
      const quizCode = "TESTCODE";
      setGeneratedCode(quizCode);
      setStep(3);
      toast.success('Quiz created successfully!');
    } catch (err) {
      toast.error('Failed to create quiz!', err);
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
              <Button variant="ghost" onClick={handleGoNext}> <ArrowRight size={20} /> </Button>
            </div>
            <CardHeader>
              <CardTitle>Create Your Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Enter quiz title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="mb-4"
              />
              <Button onClick={handleGoNext}>Add Questions</Button>
            </CardContent>
          </motion.div>
        );
  
      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className='flex flex-row justify-end'>
              <Button variant="ghost" onClick={handleGoBack}> <ArrowLeft size={20} /> </Button>
              <Button variant="ghost" onClick={handleGoNext}> <ArrowRight size={20} /> </Button>
            </div>
            <CardHeader className="flex items-center space-x-2">
              <CardTitle>Add Question</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={(value) => setCurrentQuestion({ ...currentQuestion, type: value })}>
                <SelectTrigger className="mb-4">
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                  <SelectItem value="true-false">True/False</SelectItem>
                  <SelectItem value="short-answer">Short Answer</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Enter question"
                value={currentQuestion.question}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                className="mb-4"
              />
              {currentQuestion.type === 'multiple-choice' && (
                <>
                  {currentQuestion.options.map((option, index) => (
                    <Input
                      key={index}
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...currentQuestion.options];
                        newOptions[index] = e.target.value;
                        setCurrentQuestion({ ...currentQuestion, options: newOptions });
                      }}
                      className="mb-2"
                    />
                  ))}
                  <Button
                    onClick={() => setCurrentQuestion({ ...currentQuestion, options: [...currentQuestion.options, ''] })}
                    className="mb-4"
                  >
                    Add Option
                  </Button>
                  <Input
                    placeholder="Enter correct answer"
                    value={currentQuestion.answer}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, answer: e.target.value })}
                    className="mb-4"
                  />
                </>
              )}
              {(currentQuestion.type === 'short-answer' || currentQuestion.type === 'true-false') && (
                <Input
                  placeholder="Enter correct answer"
                  value={currentQuestion.answer}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, answer: e.target.value })}
                  className="mb-4"
                />
              )}
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="mandatory"
                  checked={currentQuestion.isMandatory}
                  onCheckedChange={(checked) =>
                    setCurrentQuestion({ ...currentQuestion, isMandatory: checked })
                  }
                />
                <Label htmlFor="mandatory">Mandatory question</Label>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <Label htmlFor="points">Points:</Label>
                <Input
                  id="points"
                  type="number"
                  min="0"
                  value={currentQuestion.points}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: parseInt(e.target.value) || 0 })}
                  className="w-20"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddQuestion} className="mr-2">Add Question</Button>
              <Button onClick={handleGoNext}>Review and Create</Button>
            </CardFooter>
          </motion.div>
        );
  
      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CardHeader className="flex items-center space-x-2">
              <CardTitle>Please Review Your Quiz Carefully</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-300 shadow-sm p-4 mb-4 rounded-lg bg-gray-100">
              <p className='text-lg font-bold px-4'>{`Title: ${quizTitle}`}</p>
              </div>
            {questions.map((question, index) => (
              <div key={index} className="border border-gray-300 shadow-sm p-4 mb-4 rounded-lg bg-gray-100">
                <h4 className="text-lg font-semibold mb-2">{`Question ${index + 1}: ${question.question}`}</h4>
                <label className="text-sm text-violet-900 mb-2 rounded-lg p-[1px] px-1 bg-gray-200">{`${question.type}`}</label>
                
                {question.type === 'multiple-choice' && (
                  <ul className="list-disc list-inside ml-4 mb-2">
                    {question.options.map((option, idx) => (
                      <li key={idx} className="text-sm text-gray-700">{option}</li>
                    ))}
                  </ul>
                )}
                
                <p className="text-sm font-medium text-green-600 mb-2">{`Correct Answer: ${question.answer}`}</p>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleRemoveQuestion(index)} 
                    className="text-whiteborder-red-600 bg-red-400 hover:bg-red-300 mr-2"
                  >
                    Remove
                  </Button>
              </div>
            ))}

            </CardContent>
            <CardFooter>
              <Button onClick={()=>setStep(1)} className="mr-2">Add Questions</Button>
              <Button onClick={handleCreateQuiz} className="mr-2">Generate Code</Button>
            </CardFooter>
          </motion.div>
        );
  
      case 3:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className='flex flex-row justify-end'>
              <Button variant="ghost" onClick={()=>setStep(2)}> <ArrowLeft size={20} /> </Button>
            </div>
            <CardHeader className="flex items-center space-x-2">
              <CardTitle>Generated Quiz Code</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{generatedCode}</code>
              </pre>
              <Button onClick={copyToClipboard} className="mt-4">Copy to Clipboard</Button>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCreateQuiz} className="mr-2">Generate Code</Button>
            </CardFooter>
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