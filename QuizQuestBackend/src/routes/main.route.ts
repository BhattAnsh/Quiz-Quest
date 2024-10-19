import questionRouter from "./quizHandling/question.route";
import quizRouter from "./quizHandling/quiz.route";
import authRouter from "./userHandling/register.route";
import userRouter from "./userHandling/user.route";

export const setUpRoutes = async (app: any) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/quiz", questionRouter, quizRouter);
};
