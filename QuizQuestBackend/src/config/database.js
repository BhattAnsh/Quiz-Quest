import mongoose from "mongoose";

export const connectdb = async() =>{
    await mongoose.connect("mongodb+srv://vimalbhatt906:9013@quizquest.ayreo.mongodb.net/?retryWrites=true&w=majority&appName=QuizQuest").then(() =>{
        console.log("Database is connected");
    }).catch((err)=>{
        console.log(err);
    });
};