import { Quiz, Question, Code } from "../models/quiz.model.js";


export const codeCreation = async (req, res) =>{
    let data = await Code.find({});
    res.status(200).json({
        codes:(!data)
    })
}
export const createQuiz = async (req, res) =>{
    //createdBy will be the user id which will stored in the localstorage of the user.
    let {name, description, liveUntil, questions, createdBy} = req.body;
    try{
        let existQuiz = await Quiz.findOne({name:name});

        if (!existQuiz){
            let newQuiz = new Quiz({name, description, liveUntil, questions, createdBy});
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
export const addQuestion = async (req, res) => {
    // getting the data from the form
    let { question, options, correctOption } = req.body;

    try {
        //adding new question in question schema
        let newQuestion = new Question({
            question, options, correctOption
        });
        const q = await newQuestion.save();

        // Fetch the quiz so we can add the question id's to link it with the quiz
        const quiz = await Quiz.findById("66e2f6faff450d7f627dc1b0"); //id will come from the form data

        // Check if quiz.questions exists, if not initialize it as an empty array
        //this step is taken because we have to add multiple question in the quiz
        if (!quiz.questions) {
            quiz.questions = [];
        }

        // Add the question to the quiz
        quiz.questions.push(q._id);
        await quiz.save();

        res.status(200).json({
            message: "Added question to quiz"
        });
        return;

    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Internal server Error"
        });
        return;
    }
};
