import { Quiz } from "../models/quiz.model.js";

export const createQuiz = async (req, res) =>{
    const {name, discription, liveUntil, questions} = req.body;
    try{
        const existQuiz = await Quiz.findOne(name = name);

        if (!existQuiz){
            const newQuiz = new Quiz({name, discription, liveUntil, questions});
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