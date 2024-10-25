# 🎉 QuizQuest 🎉

**QuizQuest** is a web-based application designed to create, manage, and take quizzes. It is built with modern web development technologies to provide a seamless and interactive user experience.

## 🚀 Features

- **Create and manage quizzes**  
- **Multiple question types:**
  - ✅ Multiple choice
  - ✅ True/False
  - ✅ Short answer
  - ✅ Essay questions 📝
- **Real-time quiz results** 📊
- **User authentication and profiles** 🔑
- **Responsive design** for mobile and desktop 📱💻
- **Timed quizzes** ⏳
- **Question banks** for reusability and randomization 🔄
- **Leaderboards** to encourage competition among users 🏆
- **Feedback system** for users to rate quizzes and provide suggestions 💬
- **Customizable quiz settings** (e.g., time limits, attempts, scoring) ⚙️
- **Export quiz results** to CSV for analysis 📈
- **Dark mode and light mode** for a personalized user experience 🌙☀️

## 💻 Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- TypeScript (For backend)
- React.js
- Node.js
- Express.js
- MongoDB

**##Frontend Deployment Link**
https://quiz-quest-zeta.vercel.app/

## Project Structure

<!-- START_STRUCTURE -->
```
├── Code_Of_Conduct.md
├── Contribution.md
├── Issue_Template.md
├── License.md
├── QuizQuestBackend/
│   ├── README.md
│   ├── app.ts
│   ├── env.md
│   ├── package-lock.json
│   ├── package.json
│   ├── server.ts
│   ├── src/
│   │   ├── @types/
│   │   │   └── custom.d.ts
│   │   ├── config/
│   │   │   ├── db.ts
│   │   │   ├── jwt.ts
│   │   │   └── redis.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── question.controller.ts
│   │   │   ├── quiz.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── mails/
│   │   │   └── activation-mail.ejs
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── catchAsyncErrors.ts
│   │   │   ├── error.ts
│   │   │   ├── quizAuth.ts
│   │   │   └── validators.ts
│   │   ├── models/
│   │   │   ├── quiz.model.ts
│   │   │   └── user.model.ts
│   │   ├── routes/
│   │   │   ├── main.route.ts
│   │   │   ├── quizHandling/
│   │   │   │   ├── question.route.ts
│   │   │   │   └── quiz.route.ts
│   │   │   └── userHandling/
│   │   │       ├── register.route.ts
│   │   │       └── user.route.ts
│   │   └── utils/
│   │       ├── errorHandler.ts
│   │       └── sendMail.ts
│   └── tsconfig.json
├── QuizQuestFrontend/
│   ├── README.md
│   ├── components.json
│   ├── index.html
│   ├── jsconfig.json
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public/
│   │   ├── images/
│   │   │   ├── bgImage.avif
│   │   │   └── quiz.jpg
│   │   └── vite.svg
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── api/
│   │   │   └── apiRequests.js
│   │   ├── assets/
│   │   │   ├── react.svg
│   │   │   └── spotlight.svg
│   │   ├── components/
│   │   │   ├── Background.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProfileCard.jsx
│   │   │   ├── ReviewQuiz.jsx
│   │   │   ├── Spotlight.jsx
│   │   │   ├── navbar.jsx
│   │   │   └── ui/
│   │   │       ├── button.jsx
│   │   │       ├── card.jsx
│   │   │       ├── checkbox.jsx
│   │   │       ├── input.jsx
│   │   │       ├── label.jsx
│   │   │       └── select.jsx
│   │   ├── images/
│   │   │   ├── google-img.jpg
│   │   │   └── right-img.svg
│   │   ├── index.css
│   │   ├── lib/
│   │   │   └── utils.js
│   │   ├── main.jsx
│   │   └── pages/
│   │       ├── Error404.jsx
│   │       ├── Login.jsx
│   │       ├── Signup.jsx
│   │       ├── create.jsx
│   │       └── home.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
├── README.md
└── repo_structure.txt
```
<!-- END_STRUCTURE -->

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BhattAnsh/QuizQuest.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd QuizQuest
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## 🎉 Usage

1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and go to `http://localhost:3000`

## 🤝 Contributing

Contributions are welcome! Please read the [contributing guidelines](Contribution.md) for more information.

## 🌟 Our Valuable Contributors ❤️✨

<a href="https://github.com/BhattAnsh/Quiz-Quest/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=BhattAnsh/Quiz-Quest" />
</a>

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](License.md) file for details.

## 📬 Contact

For any inquiries, please contact [anshbat](https://github.com/BhattAnsh).
