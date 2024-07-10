import { User } from "../models/user.model.js";
import { generateToken } from "../config/generate.js";

export const login = async (req, res) =>{
       const {username, password} = req.body;
       const userInfo = await User.findOne({
        username : username
       }).lean();
       try{
           if (userInfo){
            const pass = userInfo.password;
            if (password == pass){
                const userId = userInfo._id;
                var token = generateToken(userId);
                res.status(200).json({
                    message:"singup successfull", 
                    username: username,
                    userid: userId,
                    token:token
                })
                return;
            }
            res.status(400).json({
                message:"User Credential is wrong"
            })
           }
       }
       catch(err){
            res.status(500).json({
                error:"Internal Server error"
            })
       }
    
}