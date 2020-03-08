const { Router } = require("express");

// Instantiate routes object
const routes = new Router();

const SearchController = require("./app/controllers/SearchController");

routes.get("/search", SearchController.searchItems);

module.exports = routes;
