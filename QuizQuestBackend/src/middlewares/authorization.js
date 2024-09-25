import { Quiz } from "../models/quiz.model.js";
export const authorization = async(req, res, next) => {
    try{
        let user_id = req.query.id;
        let quiz_id = req.query.quiz_id;
        let quizOwnerId = await Quiz.findById(quiz_id).select("createdBy");
        console.log(quizOwnerId);
        if(quizOwnerId.createdBy == user_id){
            next();
        }
        else{
            res.status(403).send("This quiz is not created by you");
        }   
    }catch(err){
        console.log(err);   
        res.status(400).send("Internal server error");
    }
}