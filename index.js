const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const app = express();
const port = 3000;
const db = require("./db/db.json");

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users CRUD API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */
app.get("/users", (req, res) => {
  res.json(db.users);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Fetches a user from the database using their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Not Found!
 */
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = db.users.find((user) => user.id === parseInt(id));

  if (user) {
    res.json(user);
  }

  res.status(404).json({ message: "User Not Found !" });
});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Creates a new User
 *     description: Creates a new User and adds it to the Database.
 *     responses:
 *       201:
 *         description: User Created.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               properties:
 *                 name:
 *                   type: string
 *                   example: John Doe
 */
app.post("/user", (req, res) => {
  const newUser = {
    id: Date.now().toString(),
    name: req.body.name,
  };

  db.users.push(newUser);

  res.status(201).json({ message: "Created !" });
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user's information
 *     description: Updates the name of a user identified by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *     responses:
 *       200:
 *         description: The updated user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Jane Doe
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Not Found!
 */
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = db.users.find((user) => user.id === parseInt(id));

  if (user) {
    user.name = req.body.name;
    res.json(user);
  }

  res.status(404).json({ message: "User Not Found !" });
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Removes a user from the database using their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: deleted!
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Not Found!
 */
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = db.users.findIndex((user) => user.id === parseInt(id));

  if (userIndex !== -1) {
    db.users.splice(userIndex, 1);
    res.json({ message: "deleted !" });
  }

  res.status(404).json({ message: "User Not Found !" });
});

app.listen(port, () => {
  console.log(`Running Server at http://localhost:${port}/*`);
  console.log(`Swagger UI is available at http://localhost:${port}/api-docs`);
});
