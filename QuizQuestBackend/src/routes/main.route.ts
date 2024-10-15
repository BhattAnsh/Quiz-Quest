import questionRouter from "./quizHandling/question.route";
import quizRouter from "./quizHandling/quiz.route";
import authRouter from "./userHandling/register.route";
import userRouter from "./userHandling/user.route";

export const setUpRoutes = async (app: any) => {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/quiz", questionRouter, quizRouter);
};
