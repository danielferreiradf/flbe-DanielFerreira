const express = require("express");

// Import Routes
const routes = require("./routes");

class App {
  constructor() {
    this.server = express();

    this.routes();
    this.middlewares();
  }
  routes() {
    this.server.use(routes);
  }
  middlewares() {
    this.server.use(express.json());
  }
}

// Creates new instance of app object with the property server
const app = new App().server;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
