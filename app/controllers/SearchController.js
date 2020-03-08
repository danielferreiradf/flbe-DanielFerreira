class SearchController {
  async searchItems(req, res) {
    try {
      return res.send("/search");
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new SearchController();
