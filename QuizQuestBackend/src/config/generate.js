import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const generateToken = (userId) => {
    try{
        return jwt.sign({userId}, process.env.JSON_TOKEN, { expiresIn: '1h' });
    }
    catch(err) {
        console.log(err);
        return;
    }
};
