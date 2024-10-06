import { app } from "./app";
import { setUpRoutes } from "./src/routes/main.route";
import connectDB from "./src/config/db";
import { v2 as cloudinary } from "cloudinary";

require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});
// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
//   connectDB();
// });
export const startServer = () => {
  app.listen(process.env.PORT, () => {
    setUpRoutes(app);
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};
