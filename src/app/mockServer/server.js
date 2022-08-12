const axios = require("axios");
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const jwt = require('jsonwebtoken');

const PRIVATE_KEY = '5a12321312B3S0s4a8v4x479590zzz5ze59t38yXXX';

function createJWT(payload) {
  return jwt.sign(payload, PRIVATE_KEY, {expiresIn: '7d'});
}

server.use(middlewares);
server.use(jsonServer.bodyParser);


server.post('/api/auth/login', async (req, res) => {
  const { login, password } = req.body;
  if (!(login && password)) return res.status(400).json({message: "Pass all required values"});
  const response = await axios.get(`http://localhost:4444/api/users?login=${login}`);
  if (response.data.length === 0) return res.status(400).json({message: "Incorrect username or password"});

  if (response.data[0].password === password) return res.status(200).json({token: createJWT({login: response.data[0].login})})
  return res.status(400).json({message: "Incorrect username or password"});
})

server.post('/api/auth/registration', (req, res) => {
  res.json(req.body);
})


server.use("/api", router);



server.listen(4444, () => {
  console.log("JSON Server is running");
});
