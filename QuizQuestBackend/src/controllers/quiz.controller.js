import { Quiz, Question, Code } from "../models/quiz.model.js";
import crypto from 'crypto'


const codeCreation =() =>{
    let code = crypto.randomBytes(4).toString("hex");
    return code;
}

//deletion of related details of quiz
export const delQuestion = async (id) =>{
    try{
        let quiz = await Quiz.findById(id).select("questions");
        quiz.questions.forEach(async (qId) => {
            await Question.findByIdAndDelete(qId);
        });
    }catch(err){
        console.log(err)
    }
}
//deletion for quiz related code
export const delCode = async (id) =>{
    try{
        let quiz = await Quiz.findById(id).select("quizCode");
        await Code.findByIdAndDelete(quiz.quizCode);
    }catch(err){
        console.log(err)
    }
}

//create quiz
export const createQuiz = async (req, res) =>{
    //createdBy will be the user id which will stored in the localstorage of the user.
    let {name, description, liveUntil, questions, createdBy} = req.body;
    try{
        let existQuiz = await Quiz.findOne({name:name});

        if (!existQuiz){
            let code = codeCreation()//created code
            let newCode = new Code({code});//adding the created code in db
            let quizCode = (await newCode.save())._id//getting the id of the code assigned to perticular quiz
            let newQuiz = new Quiz({name, description, liveUntil, questions, createdBy, quizCode});
            await newQuiz.save().then(() =>{
                res.status(200).json({
                    message:"Quiz Created",
                })
                return;
            });
        };
    }catch(err){
        console.log(err)
        res.status(400).json({
            message:"Internal server Error"
        });
        return;
    };
};
//edit quiz
export const editQuiz = async (req, res) =>{
    let {name, description} = req.body;
    let quizId = req.query.q_id
    try{
        let updatedQuiz = await Quiz.findByIdAndUpdate(quizId, {name, description}, {new :true});
        if (updatedQuiz){
            res.status(200).json({
                message:"Quiz is updated",
                updatedQuiz
            })
        }
        else{
            res.status(404).json({
                message:"Quiz not found"
            })
        }
    }catch(error){
        res.status(400).json({
            message:"internal Server Error",
            error:error,
        })
    }
}
//delete Quiz
export const deleteQuiz = async (req, res) =>{
    let quizId = req.query.quiz_id;
    try{
        await delQuestion(quizId);
        await delCode(quizId);
        const deletedQuiz = await Quiz.findByIdAndDelete(quizId)

        if (deletedQuiz){
            res.status(200).json({
                message:"Quiz is deleted successfully"
            })
        }
        else{
            res.status(404).json({
                message:"Quiz dosen't exists"
            })
        }
    }catch(err){
        res.status(400).json({
            message:"internal Server error",
            error:err
        })
    }
}
//addquestion
//add quiz id in the query
export const addQuestion = async (req, res) =>{
    // getting the data from the form
    let { question, options, correctOption } = req.body;
    let quizId = req.query.quiz_id; // id coming from query parameters

    try {
        // Adding new question in the Question schema
        let newQuestion = new Question({
            question, options, correctOption
        });
        const q = await newQuestion.save();

        // Fetch the quiz to link the question to it
        const quiz = await Quiz.findById(quizId); // id coming from query params

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz doesn't exist",
            });
        }

        // Check if quiz.questions exists, if not, initialize it as an empty array
        if (!quiz.questions) {
            quiz.questions = [];
        }

        // Add the new question's ID to the quiz
        quiz.questions.push(q._id);
        await quiz.save();

        res.status(200).json({
            message: "Added question to quiz",
            questionId: q._id,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

//editQuestion
//add question id in the query
export const editQuestion = async (req, res) =>{
    let {question, options, correctOption} = req.body;
    let questionId = req.query.question_id;
    try{
        let updatedQuestion = await Question.findByIdAndUpdate(questionId, {question, options, correctOption}, {new :true});
        if (updatedQuestion){
            res.status(200).json({
                message:"Question is updated",
                updatedQuestion
            })
        }
        else{
            res.status(404).json({
                message:"Question not found"
            })
        }
    }catch(err){
        res.status(400).json({
            message:"internal Server Error",
            error:err,
        })
        console.log(err)
    }
}
//deleteQuestion
//add question id in the query
export const deleteQuestion = async (req, res) =>{
    let questionId = req.query.question_id;
    try{
        const deletedQuestion = await Question.findByIdAndDelete(questionId)

        if (deletedQuestion){
            res.status(200).json({
                message:"Question is deleted successfully"
            })
        }
        else{
            res.status(404).json({
                message:"Question dosen't exists"
            })
        }
    }catch(err){
        res.status(400).json({
            message:"internal Server error",
            error:err
        })
    }
}