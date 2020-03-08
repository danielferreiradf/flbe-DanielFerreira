const neatCsv = require("neat-csv");
const path = require("path");
const { promises: fs } = require("fs");

class SearchController {
  async searchItems(req, res) {
    try {
      // Destructures searchTerm from req.query
      const { searchTerm } = req.query;

      const loadedItemsFromCSV = await fs.readFile(
        path.join(__dirname, "..", "..", "database/items.csv")
      );
      const loadedUsersFromCSV = await fs.readFile(
        path.join(__dirname, "..", "..", "database/users.csv")
      );
      const parsedItems = await neatCsv(loadedItemsFromCSV);
      const parsedUsers = await neatCsv(loadedUsersFromCSV);

      return res.json(searchTerm);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new SearchController();
