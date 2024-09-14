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

## Usage

To run the backend server, use the following command:

```sh
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

Here are some of the main API endpoints available:

- `GET /api/quizzes` - Retrieve a list of quizzes
- `POST /api/quizzes` - Create a new quiz
- `GET /api/quizzes/:id` - Retrieve a specific quiz by ID
- `PUT /api/quizzes/:id` - Update a specific quiz by ID
- `DELETE /api/quizzes/:id` - Delete a specific quiz by ID

## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.