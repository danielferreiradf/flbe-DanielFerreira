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

      const filteredItems = parsedItems
        .filter(item =>
          item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 20);

      const filtersItemWithUsers = filteredItems.map(item => {
        return {
          ...item,
          user: parsedUsers.find(user => item.user_id === user.id)
        };
      });

      return res.json(filtersItemWithUsers);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new SearchController();
