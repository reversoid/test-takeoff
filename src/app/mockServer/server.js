const axios = require("axios");
const jsonServer = require("json-server");
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const jwt = require("jsonwebtoken");
const express = require('express');
const app = express();


const PRIVATE_KEY = "5a12321312B3S0s4a8v4x479590zzz5ze59t38yXXX";

function createJWT(payload) {
  return jwt.sign(payload, PRIVATE_KEY, { expiresIn: "7d" });
}

app.use(middlewares);
app.use(jsonServer.bodyParser);

app.post("/api/auth/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!(login && password))
      return res.status(400).json({ message: "Pass all required values" });
    const response = await axios.get(
      `http://localhost:4444/api/users?login=${login}`
    );
    if (response.data.length === 0)
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });

    if (response.data[0].password === password)
      return res
        .status(200)
        .json({ token: createJWT({ login: response.data[0].login }) });
    return res.status(400).json({ message: "Incorrect username or password" });
  } catch (error) {
    return res.status(500).json({ message: "Internal service error", info: error });
  }
});

app.post("/api/auth/registration", async (req, res) => {
  try {
    const { name, login, password } = req.body;
    if (!(login && password && name))
      return res.status(400).json({ message: "Pass all required values" });

    const response = await axios.get(
      `http://localhost:4444/api/users?login=${login}`
    );
    if (response.data.length)
      return res.status(400).json({ message: "User already exists" });

    await axios.post(`http://localhost:4444/api/users`, {
      name,
      login,
      password,
    });
    return res
      .status(200)
      .json({ token: createJWT({ login }) });
  } catch (error) {
    return res.status(500).json({ message: "Internal service error", info: error });

  }
});

app.use('/api/contacts', async (req, res, next) => {
  const {token} = req.headers;
  try {
    await jwt.verify(token, PRIVATE_KEY);
    next();
  } catch (error) {
    res.status(401).json({message: "You are not authorized"});
  }
})


app.use("/api", router);

app.listen(4444, () => {
  console.log("JSON Server is running");
});
