# Prisma Authentication API

A Node.js + TypeScript + Express backend with **Prisma ORM** implementing **user registration, login, JWT authentication, and profile management**.

---

## Features

- User Registration (`POST /register`)
- User Login (`POST /login`)
- JWT-based authentication
- Protected profile route (`GET /profile`)
- CRUD operations for users
- Password hashing using **bcrypt**
- Prisma ORM with MySQL
- TypeScript support

---

## Tech Stack

- **Node.js** v22+
- **TypeScript**
- **Express.js**
- **Prisma ORM** v7.x
- **MySQL**
- **bcrypt** (password hashing)
- **jsonwebtoken** (JWT auth)
- **nodemon / tsx** for development

## Installation

1. Clone the repository:

```bash
 git clone https://github.com/bonssss/Prisma
cd Prisma
```

## Prerequisites

- Node.js v22+
- MySQL v8+
- npm v10+

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=prisma_auth
JWT_SECRET=your-secret-key
```

3. Run migrations:

```bash
npx prisma migrate dev
```

4. Start the server:

```bash
npm run dev
```

## Usage

- Register a new user: `POST /register`
- Login: `POST /login`
- Get profile: `GET /profile` (protected route)

## API Endpoints

- `POST /register`
- `POST /login`
- `GET /profile` (protected route)

## Technologies Used

- Node.js
- TypeScript
- Express.js
- Prisma ORM
- MySQL
- bcrypt
- jsonwebtoken

## License

MIT License


