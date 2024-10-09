# QuizQuest Backend

Welcome to the QuizQuest Backend! This project serves as the backend for the QuizQuest application, providing APIs and database management for the quiz functionalities.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the QuizQuest Backend, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/BhattAnsh/QuizQuestBackend.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd QuizQuestBackend
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Get .env set up:**
   Please read our [.env Guidelines](env.md)

## Usage

To run the backend server, use the following command:

```sh
npm run dev
```

The server will start on `http://localhost:8000`, you can change it on your .env file.

## API Endpoints

Here are some of the main API endpoints available:

- `POST http://localhost:8000/auth/register` - Register.
- `POST http://localhost:8000/quiz/create` - Create a new quiz.
- `POST http://localhost:8000/auth/login` - Login after checking all credentials.
- `POST http://localhost:8000/user/updateUserInfo` - Updates user info.

## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
