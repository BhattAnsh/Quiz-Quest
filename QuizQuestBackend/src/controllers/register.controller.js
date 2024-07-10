import { User } from "../models/user.model.js";
import { generateToken } from "../config/generate.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try{
      const existingUser = await User.findOne({
        username: username,
      });
      const existingEmail = await User.findOne({
        email: email,
      });
      if (existingUser || existingEmail) {
        return res.status(401).json({
            message: "user already exists",
          });
      }
      const newUser = new User({ username, email, password });
      const userId = newUser._id.toString();
      console.log(userId)
      await newUser
        .save()
        .then(() => {
            var jwtToken = generateToken(userId);
            res.status(201).json({
            message: "User created",
            userID: userId,
            userName: username,
            token : jwtToken,
          });
          return;
        })
        .catch((err) => {
          return res.status(500).json({
            message: "error 2",
          });
        });
  }catch(err){
    return res.status(500).json({
        message: "error1",
    })
  }

};
