# Snappic Node Server

This repository contains a Node.js server for the Snappic application. It provides backend functionality for handling the streaming sessions, and other server-side logic needed by the Snappic Angular frontend.

## Features

- Simple Node.js server for Snappic
- Designed to run locally for development
- Hot-reloading using `nodemon`
- Default port: **8000**

## Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- `nodemon` globally installed (optional but recommended for development)

## Getting Started

1. **Clone the repository:**
```bash
git clone https://github.com/manneJan89/snappic_node
cd snappic_node
```

2. **Install the project dependencies**

```bash
npm install
```

---

## Running the server

### Start the Node Backend Server

Run the following command to start the backend server:

```bash
nodemon
```

The API will be availalble at `http://localhost:8000`

---

## API Overview

This backend provides a RESTful API for interacting with the application data. Below are the key endpoints:

### Endpoints

1. Get All Streams

```http
GET /api/stream
```

Retrieves a list of all streams

2. Add a New Stream

```http
POST /api/stream
```

Adds a new sstream to the dataabase

---

## Development Notes

- This backend uses Express.js as the web framework.
- Live reload during development is enabled using nodemon.
- Use tools like Postman or cURL to test API endpoints.